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

  function setAuthMode(register) {
    isRegisterMode = register;
    byId("auth-title").textContent = register ? "إنشاء حساب إدارة" : "تسجيل دخول الإدارة";
    byId("auth-description").textContent = register
      ? "أنشئ الحساب أولًا ثم امنحه صلاحية admin من Supabase SQL Editor."
      : "سجل الدخول بحساب مخول كمدير في Supabase.";
    byId("auth-submit").textContent = register ? "إنشاء الحساب" : "دخول";
    byId("auth-toggle").textContent = register ? "العودة إلى تسجيل الدخول" : "إنشاء حساب إدارة جديد";
    byId("auth-form").elements.password.autocomplete = register ? "new-password" : "current-password";
  }

  async function checkAdminSession() {
    if (!requireConfig()) return;
    const { data: { session }, error: sessionError } = await client.auth.getSession();
    if (sessionError) {
      console.error("Could not check the Supabase session.", sessionError);
      showToast("تعذر التحقق من جلسة الدخول.");
      return;
    }
    if (!session) return;

    const { data: profile, error } = await client
      .from("profiles")
      .select("role, email")
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
    authView.hidden = true;
    dashboardView.hidden = false;
    byId("admin-email").textContent = profile.email || session.user.email || "";
    await loadDashboard();
  }

  async function loadDashboard() {
    const [ordersResult, professionalsResult, settingsResult] = await Promise.all([
      client.from("service_orders").select("*").order("created_at", { ascending: false }),
      client.from("professionals").select("*").order("created_at", { ascending: false }),
      client.from("site_settings").select("value").eq("key", "payment_accounts").maybeSingle()
    ]);

    if (ordersResult.error) {
      console.error("Could not load service orders.", ordersResult.error);
      showToast("تعذر تحميل الطلبات. راجع سياسات RLS وتشغيل ملف SQL.");
    } else {
      allOrders = ordersResult.data || [];
      renderOrders();
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
  }

  function renderMetrics() {
    byId("metric-orders").textContent = String(allOrders.length);
    byId("metric-pending").textContent = String(allOrders.filter((order) => order.status === "قيد المراجعة").length);
    const paidOrders = allOrders.filter((order) => order.payment_status === "مدفوع");
    const paidTotal = paidOrders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
    const commission = paidOrders.reduce((sum, order) => sum + Number(order.admin_commission || 0), 0);
    byId("metric-paid").textContent = `${formatter.format(paidTotal)} ج.م`;
    byId("metric-commission").textContent = `${formatter.format(commission)} ج.م`;
  }

  function filteredOrders() {
    const term = byId("search-input").value.trim().toLocaleLowerCase("ar");
    const status = byId("status-filter").value;
    const payment = byId("payment-filter").value;
    return allOrders.filter((order) => {
      const searchable = [
        order.customer_name, order.phone, order.trade,
        ...(Array.isArray(order.services) ? order.services : []),
        order.governorate, order.area
      ].join(" ").toLocaleLowerCase("ar");
      return (!term || searchable.includes(term))
        && (!status || order.status === status)
        && (!payment || order.payment_method === payment);
    });
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
      const description = [
        serviceList,
        [order.governorate, order.area].filter(Boolean).join("، "),
        order.phone,
        order.address,
        order.details,
        order.area_size_sqm ? `المساحة: ${order.area_size_sqm} م²` : "",
        order.transaction_id ? `رقم المعاملة: ${order.transaction_id}` : "",
        order.cash_location_details ? `موقع الدفع النقدي: ${order.cash_location_details}` : "",
        `الدفع: ${paymentLabel(order.payment_method)}`,
        new Date(order.created_at).toLocaleString("ar-EG")
      ].filter(Boolean).join(" · ");
      card.append(text("div", "record-info", ""));
      card.lastElementChild.replaceChildren(
        text("strong", "", `${order.customer_name} — ${order.trade}`),
        text("span", "", description)
      );

      const amountLabel = text("label", "record-controls", "السعر الإجمالي (ج.م)");
      const amountInput = document.createElement("input");
      amountInput.type = "number";
      amountInput.min = "0";
      amountInput.step = "0.01";
      amountInput.value = order.total_amount == null ? "" : String(order.total_amount);
      amountInput.dataset.field = "total_amount";
      amountLabel.append(amountInput);
      card.append(amountLabel);

      const status = selectControl("حالة الطلب", order.status, [
        ["قيد المراجعة", "قيد المراجعة"], ["تم التأكيد", "تم التأكيد"],
        ["قيد التنفيذ", "قيد التنفيذ"], ["مكتمل", "مكتمل"], ["ملغي", "ملغي"]
      ], "order-status");
      card.append(status.label);
      const paid = selectControl("حالة الدفع", order.payment_status, [
        ["غير مدفوع", "غير مدفوع"], ["مدفوع", "مدفوع"]
      ], "payment-status");
      card.append(paid.label);
      const controls = text("div", "record-controls", "حصة الإدارة عند الدفع: 20%");
      controls.classList.add("commission-hint");
      controls.textContent = `حصة الإدارة (20%): ${formatter.format(Number(order.total_amount || 0) * 0.2)} ج.م · صافي الحرفي (80%): ${formatter.format(Number(order.total_amount || 0) * 0.8)} ج.م عند الدفع`;
      card.append(controls);
      const actions = document.createElement("div");
      actions.className = "record-actions";
      if (order.payment_receipt_path) {
        const receiptButton = actionButton("عرض إيصال الدفع", "view-payment-receipt");
        receiptButton.dataset.path = order.payment_receipt_path;
        actions.append(receiptButton);
      }
      actions.append(actionButton("حفظ التعديلات", "save-order"));
      card.append(actions);
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
        text("span", "", `${professional.phone} · ${professional.governorate}، ${professional.area} · الخبرة: ${professional.experience} · استلام الأرباح: ${paymentLabel(professional.payout_method)} · الحالة: ${professional.status}`)
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
    const amountText = card.querySelector('[data-field="total_amount"]').value;
    const totalAmount = amountText === "" ? null : Number(amountText);
    if (totalAmount !== null && (!Number.isFinite(totalAmount) || totalAmount < 0)) {
      showToast("أدخل سعرًا صحيحًا أكبر من أو يساوي صفرًا.");
      return;
    }
    const updated = {
      total_amount: totalAmount,
      status: card.querySelector(".order-status").value,
      payment_status: card.querySelector(".payment-status").value
    };
    const { error } = await client.from("service_orders").update(updated).eq("id", card.dataset.orderId);
    if (error) {
      console.error("Could not update the service order.", error);
      showToast("تعذر حفظ العملية. تأكد من صلاحية الإدارة وسياسات قاعدة البيانات.");
      return;
    }
    showToast("تم تحديث العملية وحساب حصة الإدارة.");
    await loadDashboard();
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
    const credentials = {
      email: String(formData.get("email")).trim(),
      password: String(formData.get("password"))
    };
    const result = isRegisterMode
      ? await client.auth.signUp(credentials)
      : await client.auth.signInWithPassword(credentials);
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
  byId("signout-button").addEventListener("click", async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      console.error("Could not sign out.", error);
      showToast("تعذر تسجيل الخروج.");
      return;
    }
    dashboardView.hidden = true;
    authView.hidden = false;
    showToast("تم تسجيل الخروج.");
  });
  byId("search-input").addEventListener("input", renderOrders);
  byId("status-filter").addEventListener("change", renderOrders);
  byId("payment-filter").addEventListener("change", renderOrders);
  byId("refresh-button").addEventListener("click", loadDashboard);

  byId("orders-list").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (button?.dataset.action === "save-order") await handleOrderSave(button);
    if (button?.dataset.action === "view-payment-receipt") await handlePaymentReceipt(button);
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
      total_amount: Number(data.get("total_amount")),
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
