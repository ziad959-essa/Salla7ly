(() => {
  "use strict";

  const client = window.salla7lySupabase;
  const hasSupabaseConfig = Boolean(
    client
    && window.SALLA7LY_SUPABASE_CONFIG
    && !window.SALLA7LY_SUPABASE_CONFIG.url.includes("YOUR_PROJECT_ID")
    && !window.SALLA7LY_SUPABASE_CONFIG.anonKey.includes("YOUR_SUPABASE_ANON_KEY")
  );
  const byId = (id) => document.getElementById(id);
  const authView = byId("auth-view");
  const dashboardView = byId("dashboard-view");
  const toast = byId("toast");
  const formatter = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 2 });
  let toastTimer;
  let isRegisterMode = false;
  let allOrders = [];
  let professionals = [];
  let ordersRealtimeChannel = null;
  let orderRefreshTimer = null;
  let adminSessionCheck = null;
  let authorizedAdminUserId = "";

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 4000);
  }

  function requireConfig() {
    if (hasSupabaseConfig) return true;
    showToast("أضف رابط المشروع و anon key في supabase-config.js أولًا.");
    return false;
  }

  function text(tag, className, value) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = value == null ? "" : String(value);
    return element;
  }

  function paymentLabel(method) {
    if (method === "instapay") return "InstaPay";
    if (method === "vodafone_cash") return "Vodafone Cash";
    if (method === "cash") return "كاش";
    return "غير محددة";
  }

  function normalizeAdminPhone(value) {
    const digits = String(value || "")
      .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
      .replace(/[^\d]/g, "");
    const local = digits.startsWith("0020")
      ? digits.slice(4)
      : digits.startsWith("20")
        ? digits.slice(2)
        : digits;
    const national = local.startsWith("0") ? local : `0${local}`;
    return /^01[0125]\d{8}$/.test(national) ? `+20${national.slice(1)}` : "";
  }

  function isInvalidCredentials(error) {
    return /invalid login credentials|invalid credentials/i.test(error?.message || "");
  }

  async function signInAdmin(identifier, password) {
    if (identifier.includes("@")) {
      return client.auth.signInWithPassword({ email: identifier, password });
    }

    const phone = normalizeAdminPhone(identifier);
    if (!phone) return { data: null, error: { message: "اكتب بريدًا إلكترونيًا أو رقم موبايل مصري صحيحًا." } };

    const digits = phone.replace(/\D/g, "");
    const emails = [`${digits}@app.local`, `${digits}@accounts.salla7ly.app`];
    let result;
    for (const email of emails) {
      result = await client.auth.signInWithPassword({ email, password });
      if (!result.error || !isInvalidCredentials(result.error)) return result;
    }
    return client.auth.signInWithPassword({ phone, password });
  }

  function setAuthMode(register) {
    isRegisterMode = register;
    const identifier = byId("auth-form").elements.identifier;
    identifier.setCustomValidity("");
    byId("auth-title").textContent = register ? "إنشاء حساب إدارة" : "تسجيل دخول الإدارة";
    byId("auth-description").textContent = register
      ? "أنشئ الحساب أولًا ثم امنحه صلاحية admin من Supabase SQL Editor."
      : "سجل الدخول بالبريد الإلكتروني أو رقم الموبايل وكلمة المرور.";
    byId("auth-identifier-label").firstChild.textContent = register ? "البريد الإلكتروني" : "البريد الإلكتروني أو رقم الموبايل";
    identifier.type = register ? "email" : "text";
    identifier.autocomplete = register ? "email" : "username";
    identifier.placeholder = register ? "admin@example.com" : "admin@example.com أو 01012345678";
    byId("auth-submit").textContent = register ? "إنشاء الحساب" : "دخول";
    byId("auth-toggle").textContent = register ? "العودة إلى تسجيل الدخول" : "إنشاء حساب إدارة جديد";
    byId("auth-form").elements.password.autocomplete = register ? "new-password" : "current-password";
  }

  async function checkAdminSession(providedSession = null) {
    if (!requireConfig()) return;
    if (adminSessionCheck) return adminSessionCheck;
    adminSessionCheck = (async () => {
      let session = providedSession;
      if (!session) {
        const { data, error: sessionError } = await client.auth.getSession();
        if (sessionError) {
          console.error("Could not check the Supabase session.", sessionError);
          showToast("تعذر التحقق من جلسة الدخول.");
          return;
        }
        session = data.session;
      }
      if (!session) return;
      if (session.user.id === authorizedAdminUserId && !dashboardView.hidden) return;

      const { data: profile, error } = await client
        .from("profiles")
        .select("role, email, phone")
        .eq("id", session.user.id)
        .maybeSingle();
      if (error) {
        console.error("Could not load the administrator profile.", error);
        showToast("تعذر التحقق من صلاحيات الحساب. تأكد من تشغيل ملف SQL.");
        return;
      }
      if (!profile || profile.role !== "admin") {
        const { error: signOutError } = await client.auth.signOut();
        if (signOutError) console.error("Could not clear the unauthorized session.", signOutError);
        showToast("الحساب غير مخول كمدير. نفّذ استعلام ترقية الحساب من ملف SQL.");
        return;
      }
      authorizedAdminUserId = session.user.id;
      authView.hidden = true;
      dashboardView.hidden = false;
      byId("admin-email").textContent = profile.email || session.user.email || profile.phone || session.user.phone || "";
      await loadDashboard();
      subscribeToOrderUpdates();
    })();
    try {
      await adminSessionCheck;
    } finally {
      adminSessionCheck = null;
    }
  }

  async function loadDashboard() {
    const [ordersResult, professionalsResult, settingsResult, chatLogsResult] = await Promise.all([
      client.rpc("get_admin_service_orders"),
      client.rpc("get_admin_professionals"),
      client.from("site_settings").select("value").eq("key", "payment_accounts").maybeSingle(),
      client.rpc("get_admin_chat_logs")
    ]);

    if (ordersResult.error) {
      console.error("Could not load service orders.", ordersResult.error);
      showToast("تعذر تحميل الطلبات. راجع سياسات RLS وتشغيل ملف SQL.");
    } else {
      allOrders = ordersResult.data || [];
      renderOrders();
      renderFinancialTransactions();
      renderMetrics();
    }
    if (professionalsResult.error) {
      console.error("Could not load professional applications.", professionalsResult.error);
      showToast("تعذر تحميل طلبات الحرفيين.");
    } else {
      professionals = professionalsResult.data || [];
      renderProfessionals();
    }
    if (settingsResult.error) {
      console.error("Could not load payment settings.", settingsResult.error);
      showToast("تعذر تحميل بيانات الدفع.");
    } else {
      const settings = settingsResult.data?.value || {};
      byId("payment-settings-form").elements.instapay.value = settings.instapay || "01063459472";
      byId("payment-settings-form").elements.vodafone_cash.value = settings.vodafone_cash || "01063459472";
    }
    if (chatLogsResult.error) {
      console.error("Could not load inquiry chat logs.", chatLogsResult.error);
      showToast("تعذر تحميل سجل المحادثات.");
    } else {
      renderChatLogs(chatLogsResult.data || []);
    }
  }

  async function refreshOrdersFromRealtime() {
    const { data, error } = await client.rpc("get_admin_service_orders");
    if (error) {
      console.error("Could not refresh service orders after a realtime update.", error);
      showToast("تعذر تحديث الطلبات لحظيًا. استخدم زر التحديث للمحاولة مجددًا.");
      return;
    }
    allOrders = data || [];
    renderOrders();
    renderFinancialTransactions();
    renderMetrics();
  }

  function subscribeToOrderUpdates() {
    if (ordersRealtimeChannel) return;
    ordersRealtimeChannel = client.channel("admin-service-orders")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "service_orders"
      }, () => {
        window.clearTimeout(orderRefreshTimer);
        orderRefreshTimer = window.setTimeout(() => void refreshOrdersFromRealtime(), 150);
      })
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "service_order_matches"
      }, () => {
        window.clearTimeout(orderRefreshTimer);
        orderRefreshTimer = window.setTimeout(() => void refreshOrdersFromRealtime(), 150);
      })
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "professionals"
      }, () => {
        window.clearTimeout(orderRefreshTimer);
        orderRefreshTimer = window.setTimeout(() => void refreshOrdersFromRealtime(), 150);
      })
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error("Admin service-order realtime subscription failed.", status);
          showToast("تعذر تفعيل تحديث الطلبات اللحظي. تحقق من إعدادات Realtime في Supabase.");
        }
      });
  }

  async function unsubscribeFromOrderUpdates() {
    window.clearTimeout(orderRefreshTimer);
    orderRefreshTimer = null;
    if (!ordersRealtimeChannel) return;
    const channel = ordersRealtimeChannel;
    ordersRealtimeChannel = null;
    const status = await client.removeChannel(channel);
    if (status === "error") {
      console.error("Could not stop the admin service-order realtime subscription.");
    }
  }

  function renderMetrics() {
    byId("metric-orders").textContent = String(allOrders.length);
    byId("metric-pending").textContent = String(allOrders.filter((order) => getOrderStatusCategory(order.status) === "pending").length);
    const paidOrders = allOrders.filter((order) => order.payment_status === "مدفوع");
    const paidTotal = allOrders.reduce((sum, order) => {
      if (order.payment_status === "مدفوع") return sum + Number(order.total_amount || 0);
      if (order.deposit_status === "تم الدفع") return sum + Number(order.deposit_amount || Number(order.total_amount || 0) * 0.5);
      return sum;
    }, 0);
    const commission = paidOrders.reduce((sum, order) =>
      sum + Number(order.admin_commission || 0) + Number(order.customer_service_fee || 0), 0);
    const confirmedDeposits = allOrders.filter((order) =>
      order.deposit_status === "تم الدفع"
      && ["deposit_confirmed", "عربون مدفوع", "مدفوع"].includes(order.payment_status)
    );
    const approvedDepositTotal = confirmedDeposits.reduce((sum, order) =>
      sum + Number(order.deposit_amount || Number(order.total_amount || 0) * 0.5), 0);
    const depositProfit = confirmedDeposits.reduce((sum, order) => {
      const base = Number(order.service_base_amount || 0);
      return sum + Number(order.customer_service_fee || base * 0.10) + Number(order.admin_commission || base * 0.10);
    }, 0);
    const pendingTransfers = getPendingTransfers();
    const pendingTransferTotal = pendingTransfers.reduce((sum, order) =>
      sum + Number(order.deposit_amount || Number(order.total_amount || 0) * 0.5), 0);
    byId("metric-paid").textContent = `${formatter.format(paidTotal)} ج.م`;
    byId("metric-commission").textContent = `${formatter.format(commission)} ج.م`;
    byId("metric-approved-deposits").textContent = `${formatter.format(approvedDepositTotal)} ج.م`;
    byId("metric-deposit-profit").textContent = `${formatter.format(depositProfit)} ج.م`;
    byId("metric-pending-transfers").textContent = `${formatter.format(pendingTransferTotal)} ج.م`;
  }

  function getPendingTransfers() {
    return allOrders.filter((order) =>
      order.deposit_status === "بانتظار المراجعة"
      && ["instapay", "vodafone_cash"].includes(order.payment_method)
      && (order.transaction_id || order.payment_receipt_path)
    );
  }

  function renderFinancialTransactions() {
    const host = byId("transactions-list");
    const transfers = getPendingTransfers();
    host.replaceChildren();
    byId("transactions-empty").hidden = transfers.length > 0;
    transfers.forEach((order) => {
      const card = document.createElement("article");
      card.className = "record transaction-record";
      card.dataset.orderId = order.id;
      const info = text("div", "record-info", "");
      info.append(
        text("strong", "", `${order.customer_name || "عميل"} — ${paymentLabel(order.payment_method)}`),
        text("span", "", [
          `العربون: ${formatter.format(Number(order.deposit_amount || Number(order.total_amount || 0) * 0.5))} ج.م`,
          order.transaction_id ? `رقم المعاملة: ${order.transaction_id}` : "",
          order.phone,
          new Date(order.created_at).toLocaleString("ar-EG")
        ].filter(Boolean).join(" · "))
      );
      card.append(info);
      const actions = document.createElement("div");
      actions.className = "record-actions";
      if (order.payment_receipt_path) {
        const receiptButton = actionButton("عرض إيصال التحويل", "view-payment-receipt");
        receiptButton.dataset.path = order.payment_receipt_path;
        actions.append(receiptButton);
      }
      actions.append(
        actionButton("تأكيد الاستلام", "confirm-deposit"),
        actionButton("رفض", "reject-deposit")
      );
      actions.lastElementChild.classList.add("danger");
      card.append(actions);
      host.append(card);
    });
  }

  function filteredOrders() {
    const term = byId("search-input").value.trim().toLocaleLowerCase("ar");
    const status = byId("status-filter").value;
    const payment = byId("payment-filter").value;
    return allOrders.filter((order) => {
      const searchable = [
        order.customer_name, order.professional_name, order.phone, order.trade,
        ...(Array.isArray(order.services) ? order.services : []),
        order.governorate, order.area
      ].join(" ").toLocaleLowerCase("ar");
      return (!term || searchable.includes(term))
        && (!status || getOrderStatusCategory(order.status) === status)
        && (!payment || order.payment_method === payment);
    });
  }

  function getOrderStatusCategory(status) {
    if (["قيد المراجعة", "بانتظار مراجعة العربون", "بانتظار مراجعة العربون النقدي"].includes(status)) return "pending";
    if (status === "تم التأكيد") return "accepted";
    if (["تم دفع العربون - قيد التنفيذ", "الحرفي في الطريق", "بانتظار تأكيد العميل"].includes(status)) return "in_progress";
    if (["مكتمل نهائياً", "مكتمل"].includes(status)) return "completed";
    if (status === "ملغي") return "cancelled";
    return "";
  }

  function selectControl(labelText, value, options, className) {
    const label = text("label", "record-controls", labelText);
    const select = document.createElement("select");
    select.className = className;
    options.forEach(([optionValue, optionLabel]) => {
      const option = new Option(optionLabel, optionValue);
      option.selected = optionValue === value;
      select.add(option);
    });
    label.append(select);
    return { label, control: select };
  }

  function renderOrders() {
    const host = byId("orders-list");
    host.replaceChildren();
    const orders = filteredOrders();
    byId("orders-empty").hidden = orders.length > 0;
    orders.forEach((order) => {
      const card = document.createElement("article");
      card.className = "record";
      card.dataset.orderId = order.id;
      const serviceList = Array.isArray(order.services) ? order.services.join("، ") : "";
      const details = [
        [order.governorate, order.area].filter(Boolean).join("، "),
        order.phone,
        order.address,
        order.location_latitude != null && order.location_longitude != null
          ? `إحداثيات الموقع: ${order.location_latitude}, ${order.location_longitude}`
          : "",
        order.details,
        order.area_size_sqm ? `المساحة: ${order.area_size_sqm} م²` : "",
        order.transaction_id ? `رقم المعاملة: ${order.transaction_id}` : "",
        order.final_transaction_id ? `معاملة الدفعة النهائية: ${order.final_transaction_id}` : "",
        order.cash_location_details ? `موقع الدفع النقدي: ${order.cash_location_details}` : "",
        order.estimated_arrival_minutes ? `الوصول المتوقع خلال: ${order.estimated_arrival_minutes} دقيقة` : "",
        `حالة العربون: ${order.deposit_status || order.payment_status}`,
        `الحالة: ${order.status}`,
        `الدفع: ${paymentLabel(order.payment_method)}`,
        new Date(order.created_at).toLocaleString("ar-EG")
      ].filter(Boolean);
      const info = text("div", "record-info", "");
      info.append(text("strong", "", order.customer_name || "عميل"));
      if (order.proposed_price != null) {
        info.append(text("span", "proposed-price", `السعر المقترح: ${formatter.format(Number(order.proposed_price))} ج.م`));
      }
      const detailsGrid = text("div", "record-details", "");
      details.forEach((detail) => detailsGrid.append(text("span", "", detail)));
      info.append(detailsGrid);
      card.append(info);
      const summary = text("div", "order-summary", "");
      [
        ["اسم العميل", order.customer_name || "—"],
        ["الحرفي المقترن", order.professional_name || "لم يتم قبول عرض بعد"],
        ["نوع الخدمة", `${order.trade || "—"}${serviceList ? ` — ${serviceList}` : ""}`],
        ["السعر المتفق عليه", order.service_base_amount == null
          ? "بانتظار الاتفاق"
          : `${formatter.format(Number(order.service_base_amount))} ج.م`],
        ["حالة الطلب", order.status || "غير محددة"]
      ].forEach(([label, value]) => {
        const item = text("div", "order-summary-item", "");
        item.append(text("span", "", label), text("strong", "", value));
        summary.append(item);
      });
      card.append(summary);

      const amountLabel = text("label", "record-controls", "السعر الأساسي للخدمة (ج.م)");
      const amountInput = document.createElement("input");
      amountInput.type = "number";
      amountInput.min = "0";
      amountInput.step = "0.01";
      amountInput.value = order.service_base_amount == null ? "" : String(order.service_base_amount);
      amountInput.dataset.field = "service_base_amount";
      amountLabel.append(amountInput);
      card.append(amountLabel);

      card.append(text("div", "record-controls", `حالة الطلب: ${order.status}`));
      const depositStatus = selectControl("حالة العربون", order.deposit_status || "غير مدفوع", [
        ["غير مدفوع", "غير مدفوع"],
        ["بانتظار المراجعة", "بانتظار المراجعة"],
        ["تم الدفع", "تم الدفع"]
      ], "deposit-status");
      card.append(depositStatus.label);
      const base = Number(order.service_base_amount || 0);
      const customerFee = Number(order.customer_service_fee || 0);
      const professionalFee = base * 0.10;
      const controls = text("div", "record-controls", "");
      controls.classList.add("commission-hint");
      controls.textContent = `العميل: ${formatter.format(Number(order.total_amount || 0))} ج.م (أساسي ${formatter.format(base)} + رسوم ${formatter.format(customerFee)}) · الحرفي: صافي ${formatter.format(Number(order.professional_net || base * 0.90))} ج.م (خصم ${formatter.format(professionalFee)}) · العربون: ${formatter.format(Number(order.total_amount || 0) * 0.5)} ج.م`;
      card.append(controls);
      const actions = document.createElement("div");
      actions.className = "record-actions";
      if (order.payment_receipt_path) {
        const receiptButton = actionButton("عرض إيصال الدفع", "view-payment-receipt");
        receiptButton.dataset.path = order.payment_receipt_path;
        actions.append(receiptButton);
      }

      if (order.final_payment_receipt_path) {
        const finalReceiptButton = actionButton("عرض إيصال الدفعة النهائية", "view-payment-receipt");
        finalReceiptButton.dataset.path = order.final_payment_receipt_path;
        actions.append(finalReceiptButton);
      }
      actions.append(actionButton("حفظ التعديلات", "save-order"));
      card.append(actions);
      host.append(card);
    });
  }

  function renderChatLogs(logs) {
    const host = byId("chat-logs-list");
    host.replaceChildren();
    byId("chat-logs-empty").hidden = logs.length > 0;
    logs.forEach((log) => {
      const card = document.createElement("article");
      card.className = "chat-log";
      card.append(
        text("strong", "", `${log.customer_name} · ${log.professional_name} — ${log.service}`),
        text("span", "", `${log.sender_role === "customer" ? "العميل" : "الحرفي"} · ${new Date(log.created_at).toLocaleString("ar-EG")}`),
        text("p", "", log.message)
      );
      host.append(card);
    });
  }

  function actionButton(label, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button primary";
    button.dataset.action = action;
    button.textContent = label;
    return button;
  }

  function renderProfessionals() {
    const host = byId("professionals-list");
    host.replaceChildren();
    byId("professionals-empty").hidden = professionals.length > 0;
    professionals.forEach((professional) => {
      const card = document.createElement("article");
      card.className = "record";
      const info = document.createElement("div");
      info.className = "record-info";
      info.append(
        text("strong", "", `${professional.name} — ${professional.trade}`),
        text("span", "", `${professional.phone} · ${professional.governorate}، ${professional.area} · الخبرة: ${professional.experience} · استلام الأرباح: ${paymentLabel(professional.payout_method)}${professional.payout_account ? ` (${professional.payout_account})` : ""} · الحالة: ${professional.status}`)
      );
      card.append(info);
      const actions = document.createElement("div");
      actions.className = "record-actions";
      const imageButton = actionButton("عرض صورة الهوية", "view-id");
      imageButton.dataset.path = professional.id_image_path;
      imageButton.disabled = !professional.id_image_path;
      actions.append(imageButton);
      (professional.portfolio_paths || []).forEach((path, index) => {
        const portfolioButton = actionButton(`معاينة العمل ${index + 1}`, "view-portfolio");
        portfolioButton.dataset.path = path;
        actions.append(portfolioButton);
      });
      if (professional.status !== "مقبول") {
        const approve = actionButton("اعتماد الحرفي", "approve-professional");
        approve.dataset.professionalId = professional.id;
        actions.append(approve);
      }
      card.append(actions);
      host.append(card);
    });
  }

  async function handleOrderSave(button) {
    const card = button.closest("[data-order-id]");
    const amountText = card.querySelector('[data-field="service_base_amount"]').value;
    const baseAmount = amountText === "" ? null : Number(amountText);
    if (baseAmount !== null && (!Number.isFinite(baseAmount) || baseAmount < 0)) {
      showToast("أدخل سعرًا صحيحًا أكبر من أو يساوي صفرًا.");
      return;
    }
    const updated = {
      service_base_amount: baseAmount,
      deposit_status: card.querySelector(".deposit-status").value,
      payment_status: card.querySelector(".deposit-status").value === "تم الدفع"
        ? (allOrders.find((order) => order.id === card.dataset.orderId)?.payment_status === "مدفوع" ? "مدفوع" : "deposit_confirmed")
        : "غير مدفوع"
    };
    const existing = allOrders.find((order) => order.id === card.dataset.orderId);
    if (updated.deposit_status === "تم الدفع"
      && !["بانتظار تأكيد العميل", "مكتمل نهائياً"].includes(existing?.status)) {
      updated.status = "تم دفع العربون - قيد التنفيذ";
    } else if (updated.deposit_status === "غير مدفوع"
      && ["قيد المراجعة", "بانتظار مراجعة العربون", "بانتظار مراجعة العربون النقدي"].includes(existing?.status)) {
      updated.status = "قيد المراجعة";
    }
    const { error } = await client.from("service_orders").update(updated).eq("id", card.dataset.orderId);
    if (error) {
      console.error("Could not update the service order.", error);
      showToast("تعذر حفظ العملية. تأكد من صلاحية الإدارة وسياسات قاعدة البيانات.");
      return;
    }
    showToast("تم تحديث العملية وحساب حصة الإدارة.");
    await loadDashboard();
  }

  async function handleFinancialTransaction(button) {
    const card = button.closest("[data-order-id]");
    const order = allOrders.find((item) => item.id === card?.dataset.orderId);
    if (!order || order.deposit_status !== "بانتظار المراجعة") {
      showToast("تمت مراجعة هذا التحويل بالفعل. حدّث القائمة للتحقق من حالته.");
      return;
    }

    const confirming = button.dataset.action === "confirm-deposit";
    card.querySelectorAll("button").forEach((item) => { item.disabled = true; });
    const update = confirming
      ? {
          deposit_status: "تم الدفع",
          payment_status: "deposit_confirmed",
          status: "تم دفع العربون - قيد التنفيذ"
        }
      : {
          deposit_status: "غير مدفوع",
          payment_status: "غير مدفوع",
          payment_receipt_path: null,
          transaction_id: null,
          status: "تم التأكيد"
        };
    const { data, error } = await client.from("service_orders")
      .update(update)
      .eq("id", order.id)
      .eq("deposit_status", "بانتظار المراجعة")
      .select("id")
      .maybeSingle();
    if (error) {
      console.error("Could not review the pending order deposit.", error);
      card.querySelectorAll("button").forEach((item) => { item.disabled = false; });
      showToast("تعذرت مراجعة التحويل. تحقق من صلاحيات الإدارة ثم أعد المحاولة.");
      return;
    }
    if (!data) {
      showToast("تمت مراجعة هذا التحويل من جلسة أخرى. حدّث القائمة.");
      await refreshOrdersFromRealtime();
      return;
    }
    showToast(confirming ? "تم تأكيد استلام العربون." : "تم رفض التحويل وإتاحة إعادة إرسال الإثبات للعميل.");
    await refreshOrdersFromRealtime();
  }

  async function handlePaymentReceipt(button) {
    const { data, error } = await client.storage.from("payment-receipts")
      .createSignedUrl(button.dataset.path, 60);
    if (error) {
      console.error("Could not create a private payment receipt link.", error);
      showToast("تعذر فتح إيصال الدفع.");
      return;
    }
    const link = document.createElement("a");
    link.className = "button primary";
    link.href = data.signedUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "فتح إيصال الدفع";
    button.replaceWith(link);
  }

  async function handleProfessionalAction(button) {
    if (button.dataset.action === "view-id" || button.dataset.action === "view-portfolio") {
      const isPortfolio = button.dataset.action === "view-portfolio";
      const bucket = isPortfolio ? "professional-portfolio" : "professional-ids";
      const { data, error } = await client.storage
        .from(bucket)
        .createSignedUrl(button.dataset.path, 60);
      if (error) {
        console.error("Could not create a private professional image link.", error);
        showToast(isPortfolio ? "تعذر فتح صورة معرض الأعمال." : "تعذر فتح صورة الهوية.");
        return;
      }
      const link = document.createElement("a");
      link.className = "button primary";
      link.href = data.signedUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = isPortfolio ? "فتح صورة من معرض الأعمال" : "فتح صورة الهوية";
      button.replaceWith(link);
      return;
    }
    const { error } = await client.from("professionals")
      .update({ status: "مقبول" })
      .eq("id", button.dataset.professionalId);
    if (error) {
      console.error("Could not approve the professional.", error);
      showToast("تعذر اعتماد الحرفي.");
      return;
    }
    showToast("تم اعتماد الحرفي.");
    await loadDashboard();
  }

  byId("auth-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!requireConfig() || !event.currentTarget.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    const identifier = String(formData.get("identifier")).trim();
    const password = String(formData.get("password"));
    if (isRegisterMode && !identifier.includes("@")) {
      byId("auth-form").elements.identifier.setCustomValidity("إنشاء حساب الإدارة يتطلب بريدًا إلكترونيًا.");
      byId("auth-form").elements.identifier.reportValidity();
      return;
    }
    byId("auth-form").elements.identifier.setCustomValidity("");
    const result = isRegisterMode
      ? await client.auth.signUp({ email: identifier, password })
      : await signInAdmin(identifier, password);
    if (result.error) {
      console.error("Supabase authentication failed.", result.error);
      showToast(result.error.message || "تعذر تسجيل الدخول.");
      return;
    }
    event.currentTarget.reset();
    if (isRegisterMode) {
      showToast(result.data.session
        ? "تم إنشاء الحساب. امنحه صلاحية admin من استعلام SQL."
        : "تم إنشاء الحساب. أكّد بريدك الإلكتروني ثم نفّذ استعلام ترقية المدير.");
      return;
    }
    await checkAdminSession();
  });

  byId("auth-toggle").addEventListener("click", () => setAuthMode(!isRegisterMode));
  client?.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session && !isRegisterMode) {
      window.setTimeout(() => void checkAdminSession(session), 0);
    }
    if (event === "SIGNED_OUT") authorizedAdminUserId = "";
  });
  byId("signout-button").addEventListener("click", async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      console.error("Could not sign out.", error);
      showToast("تعذر تسجيل الخروج.");
      return;
    }
    await unsubscribeFromOrderUpdates();
    dashboardView.hidden = true;
    authView.hidden = false;
    showToast("تم تسجيل الخروج.");
  });
  byId("search-input").addEventListener("input", renderOrders);
  byId("status-filter").addEventListener("change", renderOrders);
  byId("payment-filter").addEventListener("change", renderOrders);
  byId("refresh-button").addEventListener("click", loadDashboard);
  byId("refresh-chat-button").addEventListener("click", loadDashboard);

  byId("orders-list").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (button?.dataset.action === "save-order") await handleOrderSave(button);
    if (button?.dataset.action === "view-payment-receipt") await handlePaymentReceipt(button);
  });
  byId("transactions-list").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (button?.dataset.action === "view-payment-receipt") await handlePaymentReceipt(button);
    if (["confirm-deposit", "reject-deposit"].includes(button?.dataset.action)) {
      await handleFinancialTransaction(button);
    }
  });
  byId("professionals-list").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (button) await handleProfessionalAction(button);
  });

  byId("manual-order-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const { error } = await client.from("service_orders").insert({
      customer_name: String(data.get("customer_name")).trim(),
      phone: String(data.get("phone")).trim(),
      trade: String(data.get("trade")).trim(),
      services: [],
      governorate: "غير محدد",
      area: "غير محدد",
      address: "اتفاق خارج الموقع",
      service_base_amount: Number(data.get("service_base_amount")),
      payment_method: data.get("payment_method") || null,
      status: "تم التأكيد",
      payment_status: "غير مدفوع"
    });
    if (error) {
      console.error("Could not create a manual service order.", error);
      showToast("تعذرت إضافة العملية.");
      return;
    }
    event.currentTarget.reset();
    showToast("تمت إضافة العملية.");
    await loadDashboard();
  });

  byId("payment-settings-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { error } = await client.from("site_settings").upsert({
      key: "payment_accounts",
      value: {
        instapay: String(data.get("instapay")).trim(),
        vodafone_cash: String(data.get("vodafone_cash")).trim()
      },
      updated_at: new Date().toISOString()
    });
    if (error) {
      console.error("Could not save payment account settings.", error);
      showToast("تعذر حفظ بيانات الدفع.");
      return;
    }
    showToast("تم حفظ بيانات استقبال الدفع.");
  });

  const savedTheme = localStorage.getItem("salla7ly-v2-theme");
  const isDarkTheme = savedTheme === "dark";
  if (isDarkTheme) document.documentElement.dataset.theme = "dark";
  byId("theme-toggle").addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("salla7ly-v2-theme", dark ? "dark" : "light");
    byId("theme-toggle").textContent = dark ? "الوضع الفاتح" : "الوضع الداكن";
    byId("theme-toggle").setAttribute("aria-label", dark ? "تشغيل الوضع الفاتح" : "تشغيل الوضع الليلي");
  });
  byId("theme-toggle").textContent = isDarkTheme ? "الوضع الفاتح" : "الوضع الداكن";
  byId("theme-toggle").setAttribute("aria-label", isDarkTheme ? "تشغيل الوضع الفاتح" : "تشغيل الوضع الليلي");
  setAuthMode(false);
  checkAdminSession();
})();
