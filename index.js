(() => {
  "use strict";

  const trades = [
    { name: "سباكة", icon: "⌁", color: "coral", description: "إصلاح وتركيب وتأسيس أعمال السباكة المنزلية.", services: ["تصليح تسريبات", "تركيب أدوات صحية", "صيانة مضخات", "تأسيس سباكة", "تسليك أحواض ومواسير", "تركيب سخانات", "أخرى"] },
    { name: "كهرباء", icon: "ϟ", color: "yellow", description: "خدمات الكهرباء المنزلية من الصيانة حتى التأسيس.", services: ["أعطال الكهرباء", "تركيب وحدات إضاءة", "تركيب مفاتيح وبرايز", "تأسيس كهرباء", "تركيب مراوح وشفاطات", "صيانة لوحات كهرباء", "أخرى"] },
    { name: "نجارة", icon: "⌂", color: "blue", description: "تفصيل وإصلاح وتركيب الأبواب والأثاث الخشبي.", services: ["تصليح أبواب", "تركيب أثاث", "تفصيل مطابخ", "تصليح موبيليا", "تركيب أقفال", "أعمال خشب وديكور", "أخرى"] },
    { name: "ألوميتال", icon: "▤", color: "purple", description: "شبابيك وأبواب ومطابخ ألوميتال وصيانة الإكسسوارات.", services: ["تصنيع وتركيب شبابيك", "تصنيع وتركيب أبواب", "مطابخ ألوميتال", "تغيير إكسسوارات", "صيانة مفصلات وسلك", "زجاج وألوميتال", "أخرى"] },
    { name: "حدادة منزلية", icon: "⚒", color: "orange", description: "أعمال الحديد والتجهيزات المعدنية للمنزل.", services: ["أبواب وبوابات حديد", "شبابيك وحمايات", "إصلاح لحام", "تركيب درابزين", "مظلات وسلالم", "تفصيل حديد حسب الطلب", "أخرى"] },
    { name: "سيراميك وبلاط", icon: "▦", color: "green", description: "تركيب وتجديد وإصلاح السيراميك والبلاط والرخام.", services: ["تركيب سيراميك", "تركيب بلاط", "تركيب رخام وجرانيت", "إصلاح فواصل", "تغيير قطع مكسورة", "عزل أرضيات وحوائط", "أخرى"] },
    { name: "تكييف وتبريد", icon: "❄", color: "cyan", description: "تركيب وصيانة وتنظيف أجهزة التكييف والتبريد.", services: ["تركيب تكييف", "صيانة تكييف", "تنظيف فلاتر ووحدات", "شحن فريون", "نقل وفك وتركيب", "صيانة ثلاجات وديب فريزر", "أخرى"] },
    { name: "دهانات ونقاشة", icon: "◒", color: "pink", description: "تجديد الحوائط والدهانات والتشطيبات الداخلية.", services: ["دهان شقة", "دهان غرفة", "معالجة شروخ ورطوبة", "معجون وتجهيز حوائط", "ورق حائط", "ديكورات ودهانات خاصة", "أخرى"] },
    { name: "محارة وجبس", icon: "⌑", color: "sand", description: "أعمال المحارة والجبس والأسقف والتشطيبات.", services: ["محارة حوائط", "أسقف جبس بورد", "كرانيش وزخارف", "إصلاح أسقف", "تجهيز للتشطيب", "أخرى"] },
    { name: "عزل", icon: "⛨", color: "blue", description: "حلول عزل مائي وحراري للأسطح والحمامات.", services: ["عزل أسطح", "عزل حمامات", "عزل خزانات", "معالجة تسريب", "عزل حراري", "أخرى"] },
    { name: "زجاج ومرايا", icon: "◇", color: "cyan", description: "تركيب وصيانة الزجاج والمرايا والفواصل.", services: ["تركيب زجاج شبابيك", "تركيب مرايا", "كبائن شاور", "واجهات وفواصل", "استبدال زجاج مكسور", "أخرى"] },
    { name: "أجهزة منزلية", icon: "▣", color: "purple", description: "صيانة وإصلاح الأجهزة المنزلية الأساسية.", services: ["صيانة غسالات", "صيانة ثلاجات", "صيانة بوتاجازات", "صيانة أفران", "صيانة سخانات", "أخرى"] },
    { name: "تنظيف", icon: "✧", color: "green", description: "تنظيف المنازل والمفروشات قبل أو بعد الاستخدام.", services: ["تنظيف شقة", "تنظيف عميق", "تنظيف بعد التشطيب", "تنظيف كنب وسجاد", "تنظيف خزانات", "أخرى"] },
    { name: "نجيل وحدائق", icon: "♧", color: "green", description: "تنسيق وصيانة الحدائق والمساحات الخضراء.", services: ["تنسيق حديقة", "قص وتقليم", "تركيب نجيل", "شبكات ري", "زراعة أشجار ونباتات", "أخرى"] },
    { name: "كاميرات وشبكات", icon: "◎", color: "blue", description: "تركيب أنظمة المراقبة والشبكات المنزلية.", services: ["تركيب كاميرات مراقبة", "صيانة كاميرات", "تمديد شبكة إنترنت", "تركيب جرس وإنتركم", "أجهزة إنذار", "أخرى"] },
    { name: "نقل وفك وتركيب", icon: "⇄", color: "orange", description: "نقل الأثاث وفكه وتركيبه بعناية.", services: ["نقل أثاث", "فك وتركيب غرف نوم", "تغليف عفش", "رفع وتنزيل", "نقل أجهزة", "أخرى"] },
    { name: "مكافحة حشرات", icon: "⌁", color: "pink", description: "مكافحة آفات منزلية مع تحديد نوع المشكلة.", services: ["مكافحة صراصير", "مكافحة نمل", "مكافحة بق", "مكافحة قوارض", "رش وقائي", "أخرى"] },
    { name: "رخام وجرانيت", icon: "⬡", color: "sand", description: "توريد وتركيب وصيانة الرخام والجرانيت.", services: ["رخام مطابخ", "رخام حمامات", "جلي وتلميع", "إصلاح حواف", "تركيب عتبات", "أخرى"] },
    { name: "مطابخ", icon: "▱", color: "coral", description: "تركيب وصيانة وحدات المطابخ وتجهيزاتها.", services: ["تركيب مطبخ", "تعديل وحدات", "تغيير مفصلات", "تركيب رخامة", "تجديد مطبخ", "أخرى"] },
    { name: "أقفال ومفاتيح", icon: "⚿", color: "yellow", description: "صيانة الأقفال وتركيب وتغيير المفاتيح.", services: ["تغيير كالون", "فتح باب", "تركيب قفل أمان", "نسخ مفاتيح", "صيانة أقفال", "أخرى"] },
    { name: "تشطيبات عامة", icon: "✳", color: "purple", description: "أعمال ترميم وتجديد وتشطيبات منزلية متنوعة.", services: ["ترميم شقة", "تجديد حمام", "تجديد مطبخ", "تشطيب غرفة", "معاينة أعمال", "أخرى"] },
    { name: "أخرى", icon: "+", color: "sand", description: "مش لاقي الخدمة؟ اكتب المطلوب بالتفصيل في طلبك.", services: ["خدمة منزلية أخرى", "معاينة وتحديد المطلوب"] }
  ];

  const governorates = [
    "القاهرة", "الجيزة",     "الإسكندرية", "القليوبية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", "الشرقية",
    "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "أسوان", "أسيوط", "بني سويف",
    "بورسعيد", "دمياط", "جنوب سيناء", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "شمال سيناء", "سوهاج"
  ].filter((name, index, list) => list.indexOf(name) === index);

  const tradeImages = {
    "سباكة": "photo-1607472586893-edb57bdc0e39",
    "كهرباء": "photo-1621905252507-b35492cc74b4",
    "نجارة": "photo-1620626011761-996317b8d101",
    "ألوميتال": "photo-1505798577917-a65157d3320a",
    "حدادة منزلية": "photo-1504307651254-35680f356dfd",
    "سيراميك وبلاط": "photo-1600607687939-ce8a6c25118c",
    "تكييف وتبريد": "photo-1581092160562-40aa08e78837",
    "دهانات ونقاشة": "photo-1562259949-e8e7689d7828",
    "محارة وجبس": "photo-1503387762-592deb58ef4e",
    "عزل": "photo-1621905251189-08b45d6a269e",
    "زجاج ومرايا": "photo-1600210492486-724fe5c67fb0",
    "أجهزة منزلية": "photo-1556911220-bff31c812dba",
    "تنظيف": "photo-1581578731548-c64695cc6952",
    "نجيل وحدائق": "photo-1416879595882-3373a0480b5b",
    "كاميرات وشبكات": "photo-1558002038-1055907df827",
    "نقل وفك وتركيب": "photo-1600518464441-9154a4dea21b",
    "مكافحة حشرات": "photo-1584820927498-cfe5211fd8bf",
    "رخام وجرانيت": "photo-1600607687920-4e2a09cf159d",
    "مطابخ": "photo-1600585154340-be6161a56a0c",
    "أقفال ومفاتيح": "photo-1558002038-1055907df827",
    "تشطيبات عامة": "photo-1600607687939-ce8a6c25118c",
    "أخرى": "photo-1621905251918-48416bd8575a"
  };
  const translations = {
    "الرئيسية": "Home", "طلباتي": "My Orders", "ومحادثاتي.": "and chats.", "الحرف والخدمات": "Trades & Services", "اطلب خدمة": "Request a Service",
    "حساب العميل": "Customer account",
    "تابع طلباتك الحالية والسابقة وافتح المحادثة المباشرة مع الحرفي.": "Track current and previous requests and open a live chat with the professional.",
    "افتح المحادثة المباشرة": "Open live chat",
    "تفاصيل الطلب والمحادثة": "Order details and chat",
    "تابع حالة طلبك وتحدث مباشرةً مع الحرفيين المهتمين.": "Track your order and chat directly with interested professionals.",
    "لا توجد طلبات مرتبطة بهذا الحساب حتى الآن.": "No requests are linked to this account yet.",
    "تحتاج قائمة طلباتك إلى تسجيل الدخول وإعداد Supabase.": "Sign in and configure Supabase to view your orders.",
    "إجمالي العميل:": "Customer total:",
    "تعذر تحميل طلباتك. تأكد من تحديث قاعدة البيانات.": "Could not load your orders. Make sure the database is up to date.",
    "قائمة طلبات الحساب تحتاج إعداد Supabase.": "The account orders list requires Supabase configuration.",
    "تعذر التحقق من الحساب. حاول تسجيل الدخول مرة أخرى.": "Could not verify the account. Please sign in again.",
    "سجّل كحرفي": "Join as a Tradesperson", "لوحة الإدارة": "Dashboard", "سجّل دلوقتي ↗": "Sign up ↗",
    "طلبك يوصل لصاحب الموقع للمراجعة — مفيش فنيين من غير موافقتك": "Your request goes to the site owner for review — no tradesperson appears without approval",
    "اختار خدمة ←": "Browse services ←", "من الحرفي لحد باب بيتك": "From skilled hands to your doorstep",
    "البيت محتاج حاجة؟": "Need something fixed at home?", "إحنا نسهّلهالك.": "We'll make it easy.",
    "اختار الحرفة والخدمة، اكتب عنوانك، وطلبك يوصل لصاحب الموقع عشان يراجعه ويختارلك الفني المناسب.": "Choose a trade and service, enter your address, and the site owner will review your request and find the right professional.",
    "ابحث عن خدمة": "Search for a service", "سباكة، ألوميتال، سيراميك...": "Plumbing, aluminum, tiling...",
    "المحافظة": "Governorate", "كل المحافظات": "All governorates", "اختار خدمتك ←": "Find a service ←",
    "تفاصيل كل حرفة قدامك": "Explore each trade and service", "لا يظهر حرفي قبل اعتمادك": "Professionals appear only after approval",
    "فني يعمل على إصلاحات منزلية": "Home repair professional at work", "فني صيانة يعمل على إصلاح كهرباء منزلية": "A professional repairing home electrical systems",
    "حرفي شاطر، وشغل يطمن": "Skilled hands. Work you can trust", "بيتك": "Your home", "أمانة": "In good hands",
    "في حرفي متصل قريب منك": "A professional is online nearby",
    "تم إرسال طلبك للحرفيين المطابقين": "Your request was sent to matching professionals",
    "لقينا حرفيين معتمدين ومتصلين في منطقتك. ستظهر عروض الأسعار ووقت الوصول هنا، وتظهر بيانات التواصل بعد تأكيد الحجز.": "Approved professionals are online nearby. Offers and arrival times will appear here; contact details are shown after booking confirmation.",
    "تم تسجيل طلبك وسيظهر للحرفيين المعتمدين في منطقتك عند اتصالهم.": "Your request is registered and will appear to approved local professionals when they come online.",
    "شغل بيتك يبدأ بخطوة": "A better home starts with one step", "من كل محافظة": "Across every governorate",
    "حرفة مناسبة لبيتك": "The right trade for your home", "كل الحرف ←": "All trades ←", "كل الحرف": "All trades",
    "دليل الحرف والخدمات": "Trade & service directory", "اختار الحرفة،": "Choose a trade,", "وشوف تفاصيلها.": "see what we can do.",
    "كل الحرف والخدمات ←": "All trades & services ←", "صوتك يفرق": "Your voice matters",
    "احكيلنا رأيك": "Tell us what you think", "في تجربتك.": "about your experience.",
    "قيّم الخدمة أو شارك اقتراحك. رأيك يوصل لصاحب الموقع ويتراجع قبل ما يظهر للناس.": "Rate a service or share a suggestion. Reviews are checked by the site owner before they are published.",
    "تقييم منشور": "Published reviews", "حتى الآن": "so far", "تقييم الخدمة": "Rate a service",
    "رأيك يهمنا": "We value your feedback", "اسمك": "Your name", "الخدمة اللي جربتها": "Service you used",
    "اختار الخدمة": "Choose a service", "تقييمك": "Your rating", "التقييم": "Rating",
    "نجمة واحدة": "1 star", "نجمتان": "2 stars", "ثلاث نجوم": "3 stars", "أربع نجوم": "4 stars", "خمس نجوم": "5 stars",
    "اكتب رأيك": "Write your review", "إيه اللي عجبك؟ وإيه ممكن نحسّنه؟": "What did you like? What could we improve?",
    "إرسال التقييم ←": "Submit review ←", "فكرة في بالك؟": "Have an idea?",
    "اقتراحك ممكن": "Your suggestion can", "يفرق معانا.": "make a difference.",
    "خدمة جديدة، تحسين، أو حتى شكوى — اكتبها وهتوصل لصاحب الموقع مباشرة.": "A new service, an improvement, or a complaint — send it directly to the site owner.",
    "رقم الدعم الفني": "Support phone", "يُضاف من إعدادات الموقع": "Set in site settings",
    "اسمك (اختياري)": "Your name (optional)", "نوع الرسالة": "Message type",
    "اختار نوع الرسالة": "Choose a message type", "اقتراح": "Suggestion", "شكوى": "Complaint",
    "استفسار": "Question", "التفاصيل": "Details", "اكتب اقتراحك أو تفاصيل الشكوى...": "Share your suggestion or complaint...",
    "إرسال لصاحب الموقع ↗": "Send to site owner ↗", "دليل الحرف": "Trade directory",
    "خدمات البيت": "Home services", "كلها هنا.": "All in one place.",
    "اختار الحرفة عشان تظهرلك تفاصيل الأعمال المتاحة. لا نعرض بيانات حرفيين للزوار.": "Choose a trade to see available services. Tradespeople's personal details are never shown to visitors.",
    "اختيارك": "Your choice", "يوصل لصاحب الموقع ✳": "Goes to the site owner ✳",
    "ابحث في الحرف": "Search trades", "دور على حرفة أو خدمة...": "Search for a trade or service...",
    "ملقيناش الحرفة دي. جرّب كلمة تانية.": "No matching trade found. Try another search.",
    "الحرفيون المتاحون": "Available professionals",
    "حرفيون جاهزون": "Professionals ready",
    "في منطقتك.": "in your area.",
    "كل المناطق": "All areas",
    "المحافظة / المنطقة": "Governorate / area",
    "متصل ومتاح": "Online and available",
    "لا يوجد حرفيون متصلون حاليًا.": "No professionals are online right now.",
    "لا يوجد حرفيون متاحون في المنطقة المختارة.": "No available professionals in the selected area.",
    "طلبك يوصل لصاحب الموقع": "Your request goes to the site owner", "قولنا محتاج": "Tell us what you need",
    "إيه وفين.": "and where.", "حدد المحافظة والمنطقة والعنوان أو استخدم GPS. صاحب الموقع يراجع الطلب ويتابع معاك.": "Choose governorate and district, enter the address or use GPS. The site owner will review and follow up.",
    "اختار الحرفة والخدمة": "Choose a trade and service", "حدد نوع الشغل بالتفصيل": "Select the specific work",
    "حدد المحافظة والمنطقة": "Choose governorate and district", "واكتب العنوان بالتفصيل": "Enter your full address",
    "صاحب الموقع يراجع الطلب": "The site owner reviews your request", "ويتابع معاك الخطوة الجاية": "and follows up on next steps",
    "نسخة تجريبية: البيانات محفوظة على الجهاز الحالي فقط.": "Demo version: data is stored only on this device.",
    "طلب خدمة منزلية": "Home service request", "تفاصيل الطلب": "Request details",
    "الحرفة": "Trade", "الخدمة المطلوبة": "Services requested", "اختار الحرفة": "Choose a trade",
    "اختار الحرفة الأول": "Choose a trade first", "اختار الخدمة المطلوبة": "Choose services",
    "اختار المحافظة": "Choose a governorate", "المنطقة / المركز / الحي": "District / city / neighborhood",
    "اختار المنطقة أو المركز": "Choose a district or city", "اختار المحافظة الأول": "Choose a governorate first",
    "منطقة أخرى / غير مدرجة": "Other / not listed", "اكتب اسم المنطقة أو المركز": "Enter district or city",
    "الشارع والعنوان بالتفصيل": "Street and full address", "اسم الشارع، رقم العمارة، الدور، علامة مميزة...": "Street, building, floor, nearby landmark...",
    "استخدم موقعي الحالي": "Use my current location",
    "نطاق البحث الجغرافي": "Geographic search radius",
    "من متر واحد إلى 10 كم. حدّد موقعك عبر GPS للبحث بالمسافة؛ من دونه نطابق المحافظة والمنطقة.": "From 1 meter to 10 km. Pin your location to match by distance; otherwise, matching uses governorate and area.",
    "حدّد موقع العمل عبر GPS (اختياري)": "Pin your work location using GPS (optional)",
    "موقع العمل محفوظ وسيُستخدم لمطابقة الطلبات القريبة.": "Work location saved and will be used to match nearby requests.",
    "موقع العمل غير محدد؛ ستعتمد المطابقة على المنطقة.": "Work location is not set; matching will use the selected area.",
    "أدخل العنوان يدويًا أو حدّد موقعك عبر GPS.": "Enter the address or pin your location using GPS.",
    "جارٍ تحديد موقعك...": "Getting your location...",
    "تم تحديد موقعك وإرفاقه بالطلب.": "Your location has been pinned to the request.",
    "تعذر الوصول للموقع. اكتب العنوان يدويًا أو حاول مرة أخرى.": "Could not access your location. Enter the address manually or try again.",
    "السعر المقترح / ميزانيتك (جنيه)": "Proposed price / your budget (EGP)",
    "اختياري — مثال: 500": "Optional — e.g. 500",
    "السعر المقترح من العميل": "Customer's proposed price",
    "عرض الموقع على الخريطة": "View location on map",
    "تأكد من تشغيل supabase-setup.sql لتحديث أعمدة الطلب ثم أعد المحاولة.": "Run supabase-setup.sql to update the service-order columns, then try again.",
    "وصف إضافي للشغل": "Additional work details", "اشرح المشكلة أو المطلوب والوقت المناسب...": "Describe the work and a suitable time...",
    "اسم العميل": "Customer name", "الاسم بالكامل": "Full name", "رقم الموبايل": "Mobile number",
    "01xxxxxxxxx": "01xxxxxxxxx", "اكتب رقم موبايل مصري صحيح": "Enter a valid Egyptian mobile number",
    "إرسال الطلب لصاحب الموقع ←": "Send request to site owner ←", "لن يظهر أي حرفي قبل اعتماد صاحب الموقع.": "No tradesperson appears until approved by the site owner.",
    "باب التقديم مفتوح": "Applications are open", "حرفي شاطر؟": "Are you a skilled tradesperson?",
    "قدّم طلبك.": "Apply to join.", "سجل بياناتك. طلبك هيفضل قيد المراجعة ومش هتظهر بياناتك للناس إلا بعد موافقة صاحب الموقع.": "Submit your details. Your application stays under review and won't be public without the site owner's approval.",
    "تقديم": "Application", "ومراجعة يدوية": "Manually reviewed", "تسجيل الفنيين": "Professional registration",
    "بياناتك عند": "Your details stay with", "صاحب الموقع.": "the site owner.",
    "املأ بياناتك وتخصصك": "Add your details and trade", "حدد المحافظة والمنطقة اللي بتشتغل فيها.": "Choose the governorate and area where you work.",
    "قدّم صورة الهوية": "Upload an ID image", "للمراجعة، ومش هتظهر للزوار.": "For review only. It won't appear to visitors.",
    "استنى قرار القبول": "Wait for approval", "مفيش ظهور تلقائي للحرفيين.": "Tradespeople are never published automatically.",
    "نسخة تجريبية: لا تستخدم بيانات أو صور بطاقة حقيقية.": "Demo version: do not use real personal details or ID images.",
    "تسجيل جديد للمراجعة": "New application for review", "بيانات الحرفي": "Professional details",
    "الحرفة / التخصص": "Trade / specialty", "سنين الخبرة": "Years of experience",
    "اختار": "Choose", "أقل من سنة": "Less than a year", "1 - 3 سنين": "1–3 years", "4 - 7 سنين": "4–7 years", "أكتر من 7 سنين": "More than 7 years",
    "منطقة العمل": "Work area", "العنوان بالتفصيل": "Full address", "الشارع، المنطقة، المدينة": "Street, district, city",
    "صورة بطاقة الرقم القومي": "National ID image", "JPG أو PNG أو WebP — بحد أقصى 5 ميجابايت": "JPG, PNG or WebP — max 5 MB",
    "اختار صورة البطاقة": "Choose an ID image", "لا ترفع صورة حقيقية في النموذج التجريبي": "Do not upload a real ID in this demo",
    "أقر بصحة بياناتي وأوافق على مراجعتها.": "I confirm my details are correct and agree to their review.",
    "إرسال طلب التسجيل ←": "Submit application ←", "البيانات والصورة لا تُرسل لخادم في هذه النسخة التجريبية.": "Details and images are not sent to a server in this demo.",
    "حسابك وإدارة الموقع": "Your account & site management", "لوحة": "Management", "المتابعة.": "dashboard.",
    "البيانات هنا محفوظة على المتصفح الحالي للتجربة فقط.": "This demo stores data in the current browser only.",
    "+ طلب خدمة": "+ Request a service",
    "⚠ لوحة تجريبية محلية. اعتماد الفنيين وحفظ بيانات العملاء بشكل آمن يتطلب خادمًا وتسجيل دخول لصاحب الموقع.": "⚠ Local demo dashboard. Approving professionals and securely storing customer data requires a server and site-owner login.",
    "طلبات العملاء": "Customer requests", "طلبات الحرفيين": "Professional applications", "آراء واقتراحات": "Feedback & suggestions",
    "إعدادات الدعم": "Support settings", "مفيش طلبات لسه": "No requests yet",
    "طلبات العملاء هتظهر هنا بالتفاصيل.": "Customer requests and their details will appear here.",
    "جرّب تبعت طلب ←": "Try a request ←", "مفيش طلبات انضمام": "No applications yet",
    "طلبات الحرفيين هتظهر هنا للمراجعة والقبول.": "Professional applications will appear here for review.",
    "سجّل حرفي ←": "Register as a professional ←", "مفيش رسائل لسه": "No messages yet",
    "التقييمات والاقتراحات والشكاوى هتظهر هنا.": "Reviews, suggestions and complaints will appear here.",
    "بيانات التواصل مع الدعم": "Support contact details", "اكتب رقم الدعم الفني عشان يظهر للزوار.": "Enter a support phone number to show visitors.",
    "حفظ رقم الدعم": "Save support number", "© 2026 صلّحلي. كل الحقوق محفوظة.": "© 2026 Salla7ly. All rights reserved.",
    "الدعم الفني:": "Support:", "تفاصيل الحرفة": "Trade details", "اطلب الخدمة دي ←": "Request these services ←",
    "حساب العميل": "Customer account", "سجّل حسابك.": "Create your account.",
    "بياناتك تساعدنا نتابع طلباتك.": "Your details help us follow up on your requests.",
    "حفظ بياناتي ←": "Save my details ←", "نسخة تجريبية محلية: لا ترسل بيانات حقيقية في الوقت الحالي.": "Local demo: do not submit real personal data.",
    "مراجعة البيانات": "Review details", "مراجعة بيانات الحرفي": "Review professional application",
    "مراجعة طلب الانضمام": "Review application", "صورة بطاقة الحرفي": "Professional ID image",
    "الصورة والبيانات محفوظة محليًا على هذا المتصفح في النسخة التجريبية.": "The image and details are stored locally in this browser in this demo.",
    "الاسم": "Name", "المنطقة": "Area", "تاريخ التقديم": "Application date",
    "صورة البطاقة": "ID image", "الملف المرفق": "Attached file",
    "صورة البطاقة غير متاحة في هذا الطلب القديم.": "The ID image is unavailable for this older application.",
    "اقبل الحرفي بعد المراجعة": "Approve after review", "إغلاق": "Close",
    "تعذر تجهيز صورة البطاقة. اختار صورة أخرى.": "Could not prepare the ID image. Choose another image.",
    "في حرفي متاح قريب منك": "A professional is available nearby",
    "لقينا حرفي معتمد في نفس منطقتك، تقدر تتواصل معاه مباشرة.": "We found an approved professional in your area. You can contact them directly.",
    "لسه مفيش حرفي معتمد قريب منك. طلبك وصل لصاحب الموقع وهيتابع معاك.": "No approved professional is available nearby yet. Your request was sent to the site owner, who will follow up.",
    "تواصل مع الحرفي": "Contact the professional", "اتصال": "Call",
    "واتساب": "WhatsApp", "تم إرسال طلبك لصاحب الموقع": "Your request was sent to the site owner",
    "تحديث طلبك": "Request update",
    "حرفتك، خدمتك، وبيتك على مزاجك.": "Your trade, your service, your home."
  };
  const provinceEnglish = {
    "القاهرة": "Cairo", "الجيزة": "Giza", "الإسكندرية": "Alexandria", "القليوبية": "Qalyubia",
    "الدقهلية": "Dakahlia", "البحر الأحمر": "Red Sea", "البحيرة": "Beheira", "الفيوم": "Faiyum",
    "الغربية": "Gharbia", "الشرقية": "Sharqia", "الإسماعيلية": "Ismailia", "المنوفية": "Monufia",
    "المنيا": "Minya", "الوادي الجديد": "New Valley", "السويس": "Suez", "أسوان": "Aswan",
    "أسيوط": "Asyut", "بني سويف": "Beni Suef", "بورسعيد": "Port Said", "دمياط": "Damietta",
    "جنوب سيناء": "South Sinai", "كفر الشيخ": "Kafr El Sheikh", "مطروح": "Matrouh",
    "الأقصر": "Luxor", "قنا": "Qena", "شمال سيناء": "North Sinai", "سوهاج": "Sohag"
  };
  const tradeEnglish = {
    "سباكة": "Plumbing", "كهرباء": "Electrical", "نجارة": "Carpentry", "ألوميتال": "Aluminum work",
    "حدادة منزلية": "Home metalwork", "سيراميك وبلاط": "Tiles & ceramics", "تكييف وتبريد": "AC & refrigeration",
    "دهانات ونقاشة": "Painting", "محارة وجبس": "Plaster & gypsum", "عزل": "Waterproofing & insulation",
    "زجاج ومرايا": "Glass & mirrors", "أجهزة منزلية": "Home appliances", "تنظيف": "Cleaning",
    "نجيل وحدائق": "Gardening", "كاميرات وشبكات": "Cameras & networking", "نقل وفك وتركيب": "Moving & assembly",
    "مكافحة حشرات": "Pest control", "رخام وجرانيت": "Marble & granite", "مطابخ": "Kitchens",
    "أقفال ومفاتيح": "Locks & keys", "تشطيبات عامة": "General finishing", "أخرى": "Other"
  };
  const serviceEnglish = {
    "تصليح تسريبات": "Leak repairs", "تركيب أدوات صحية": "Plumbing fixture installation", "صيانة مضخات": "Pump maintenance", "تأسيس سباكة": "Plumbing installation", "تسليك أحواض ومواسير": "Drain unclogging", "تركيب سخانات": "Water heater installation",
    "أعطال الكهرباء": "Electrical fault repair", "تركيب وحدات إضاءة": "Lighting installation", "تركيب مفاتيح وبرايز": "Switch and outlet installation", "تأسيس كهرباء": "Electrical wiring", "تركيب مراوح وشفاطات": "Fan and extractor installation", "صيانة لوحات كهرباء": "Electrical panel maintenance",
    "تصليح أبواب": "Door repair", "تركيب أثاث": "Furniture assembly", "تفصيل مطابخ": "Custom kitchens", "تصليح موبيليا": "Furniture repair", "تركيب أقفال": "Lock installation", "أعمال خشب وديكور": "Woodwork and decor",
    "تصنيع وتركيب شبابيك": "Window fabrication and installation", "تصنيع وتركيب أبواب": "Door fabrication and installation", "مطابخ ألوميتال": "Aluminum kitchens", "تغيير إكسسوارات": "Hardware replacement", "صيانة مفصلات وسلك": "Hinges and screens repair", "زجاج وألوميتال": "Glass and aluminum",
    "أبواب وبوابات حديد": "Iron doors and gates", "شبابيك وحمايات": "Windows and security grilles", "إصلاح لحام": "Welding repairs", "تركيب درابزين": "Railing installation", "مظلات وسلالم": "Canopies and stairs", "تفصيل حديد حسب الطلب": "Custom metalwork",
    "تركيب سيراميك": "Ceramic tile installation", "تركيب بلاط": "Floor tile installation", "تركيب رخام وجرانيت": "Marble and granite installation", "إصلاح فواصل": "Grout repair", "تغيير قطع مكسورة": "Broken tile replacement", "عزل أرضيات وحوائط": "Floor and wall waterproofing",
    "تركيب تكييف": "AC installation", "صيانة تكييف": "AC maintenance", "تنظيف فلاتر ووحدات": "Filter and unit cleaning", "شحن فريون": "Refrigerant recharge", "نقل وفك وتركيب": "AC relocation", "صيانة ثلاجات وديب فريزر": "Refrigerator and freezer repair",
    "دهان شقة": "Apartment painting", "دهان غرفة": "Room painting", "معالجة شروخ ورطوبة": "Crack and damp treatment", "معجون وتجهيز حوائط": "Wall preparation", "ورق حائط": "Wallpaper installation", "ديكورات ودهانات خاصة": "Decorative finishes",
    "محارة حوائط": "Wall plastering", "أسقف جبس بورد": "Gypsum board ceilings", "كرانيش وزخارف": "Cornices and ornaments", "إصلاح أسقف": "Ceiling repairs", "تجهيز للتشطيب": "Finishing preparation",
    "عزل أسطح": "Roof waterproofing", "عزل حمامات": "Bathroom waterproofing", "عزل خزانات": "Tank waterproofing", "معالجة تسريب": "Leak treatment", "عزل حراري": "Thermal insulation",
    "تركيب زجاج شبابيك": "Window glass installation", "تركيب مرايا": "Mirror installation", "كبائن شاور": "Shower enclosures", "واجهات وفواصل": "Glass partitions", "استبدال زجاج مكسور": "Broken glass replacement",
    "صيانة غسالات": "Washing machine repair", "صيانة ثلاجات": "Refrigerator repair", "صيانة بوتاجازات": "Stove repair", "صيانة أفران": "Oven repair", "صيانة سخانات": "Water heater repair",
    "تنظيف شقة": "Apartment cleaning", "تنظيف عميق": "Deep cleaning", "تنظيف بعد التشطيب": "Post-construction cleaning", "تنظيف كنب وسجاد": "Upholstery and carpet cleaning", "تنظيف خزانات": "Tank cleaning",
    "تنسيق حديقة": "Garden landscaping", "قص وتقليم": "Pruning", "تركيب نجيل": "Lawn installation", "شبكات ري": "Irrigation systems", "زراعة أشجار ونباتات": "Planting",
    "تركيب كاميرات مراقبة": "Security camera installation", "صيانة كاميرات": "Camera maintenance", "تمديد شبكة إنترنت": "Network cabling", "تركيب جرس وإنتركم": "Doorbell and intercom installation", "أجهزة إنذار": "Alarm systems",
    "نقل أثاث": "Furniture moving", "فك وتركيب غرف نوم": "Bedroom disassembly and assembly", "تغليف عفش": "Furniture packing", "رفع وتنزيل": "Loading and unloading", "نقل أجهزة": "Appliance moving",
    "مكافحة صراصير": "Cockroach control", "مكافحة نمل": "Ant control", "مكافحة بق": "Bed bug control", "مكافحة قوارض": "Rodent control", "رش وقائي": "Preventive treatment",
    "رخام مطابخ": "Kitchen marble", "رخام حمامات": "Bathroom marble", "جلي وتلميع": "Polishing", "إصلاح حواف": "Edge repair", "تركيب عتبات": "Threshold installation",
    "تركيب مطبخ": "Kitchen installation", "تعديل وحدات": "Cabinet modifications", "تغيير مفصلات": "Hinge replacement", "تركيب رخامة": "Countertop installation", "تجديد مطبخ": "Kitchen renovation",
    "تغيير كالون": "Lock replacement", "فتح باب": "Door unlocking", "تركيب قفل أمان": "Security lock installation", "نسخ مفاتيح": "Key duplication", "صيانة أقفال": "Lock maintenance",
    "ترميم شقة": "Apartment restoration", "تجديد حمام": "Bathroom renovation", "تجديد مطبخ": "Kitchen renovation", "تشطيب غرفة": "Room finishing", "معاينة أعمال": "Site inspection",
    "خدمة منزلية أخرى": "Other home service", "معاينة وتحديد المطلوب": "Inspection and assessment"
  };
  const districtEnglish = {
    "مدينة نصر": "Nasr City", "مصر الجديدة": "Heliopolis", "المعادي": "Maadi", "التجمع الأول": "First Settlement",
    "التجمع الخامس": "Fifth Settlement", "الشروق": "El Shorouk", "بدر": "Badr City", "حلوان": "Helwan",
    "شبرا": "Shubra", "عين شمس": "Ain Shams", "المطرية": "El Matareya", "الزيتون": "El Zaytoun",
    "حدائق القبة": "Hadayek El Kobba", "العباسية": "Abbassia", "وسط البلد": "Downtown", "الزمالك": "Zamalek",
    "العاصمة الإدارية": "New Administrative Capital", "الدقي": "Dokki", "المهندسين": "Mohandessin",
    "العجوزة": "Agouza", "فيصل": "Faisal", "الهرم": "Haram", "السادس من أكتوبر": "6th of October",
    "الشيخ زايد": "Sheikh Zayed", "حدائق أكتوبر": "Hadayek October", "إمبابة": "Imbaba", "الوراق": "Warraq",
    "بولاق الدكرور": "Boulaq El Dakrour", "أوسيم": "Oseem", "كرداسة": "Kerdasa", "أبو النمرس": "Abu El Nomros",
    "الحوامدية": "Hawamdeya", "طنطا": "Tanta", "المحلة الكبرى": "El Mahalla El Kubra", "كفر الزيات": "Kafr El Zayat",
    "زفتى": "Zefta", "السنطة": "El Santa", "قطور": "Qutur", "بسيون": "Basyoun", "سمنود": "Samannoud"
  };
  const descriptionEnglish = {
    "إصلاح وتركيب وتأسيس أعمال السباكة المنزلية.": "Home plumbing repairs, installations and rough-ins.",
    "خدمات الكهرباء المنزلية من الصيانة حتى التأسيس.": "Home electrical services, from repairs to wiring.",
    "تفصيل وإصلاح وتركيب الأبواب والأثاث الخشبي.": "Custom, repair and installation of wooden doors and furniture.",
    "شبابيك وأبواب ومطابخ ألوميتال وصيانة الإكسسوارات.": "Aluminum windows, doors, kitchens and hardware repairs.",
    "أعمال الحديد والتجهيزات المعدنية للمنزل.": "Metalwork and steel fixtures for the home.",
    "تركيب وتجديد وإصلاح السيراميك والبلاط والرخام.": "Ceramic, tile and marble installation and repair.",
    "تركيب وصيانة وتنظيف أجهزة التكييف والتبريد.": "Air conditioning and refrigeration installation and maintenance.",
    "تجديد الحوائط والدهانات والتشطيبات الداخلية.": "Wall painting and interior finishing.",
    "أعمال المحارة والجبس والأسقف والتشطيبات.": "Plaster, gypsum, ceiling and finishing work.",
    "حلول عزل مائي وحراري للأسطح والحمامات.": "Waterproofing and thermal insulation for roofs and bathrooms.",
    "تركيب وصيانة الزجاج والمرايا والفواصل.": "Glass and mirror installation and repairs.",
    "صيانة وإصلاح الأجهزة المنزلية الأساسية.": "Repairs for essential home appliances.",
    "تنظيف المنازل والمفروشات قبل أو بعد الاستخدام.": "Home and upholstery cleaning.",
    "تنسيق وصيانة الحدائق والمساحات الخضراء.": "Garden landscaping and maintenance.",
    "تركيب أنظمة المراقبة والشبكات المنزلية.": "Home security camera and network installation.",
    "نقل الأثاث وفكه وتركيبه بعناية.": "Careful furniture moving, disassembly and assembly.",
    "مكافحة آفات منزلية مع تحديد نوع المشكلة.": "Residential pest control for common household pests.",
    "توريد وتركيب وصيانة الرخام والجرانيت.": "Marble and granite supply, installation and repairs.",
    "تركيب وصيانة وحدات المطابخ وتجهيزاتها.": "Kitchen units and fixture installation and maintenance.",
    "صيانة الأقفال وتركيب وتغيير المفاتيح.": "Lock repair, replacement and key services.",
    "أعمال ترميم وتجديد وتشطيبات منزلية متنوعة.": "Home restoration, renovation and finishing.",
    "مش لاقي الخدمة؟ اكتب المطلوب بالتفصيل في طلبك.": "Can't find it? Describe the work in your request."
  };
  Object.assign(translations, {
    "خدمات": "services", "صورة حرفي يعمل في هذه الخدمة": "a tradesperson at work",
    "عرض خدمات": "View services", "اطلب الخدمات المحددة ←": "Request selected services ←",
    "نشر التقييم": "Publish review", "رفض": "Reject", "قبول الحرفي": "Approve professional",
    "قيد المراجعة": "Pending review", "وصلت لصاحب الموقع": "Sent to the site owner",
    "بدون اسم": "No name", "بدون وصف إضافي": "No additional details",
    "تم اعتماد الحرفي. تقدر تعرضه للزوار بعد ربط النظام بخادم.": "Professional approved. Public listings require a connected server.",
    "تم تحديث رقم الدعم الفني.": "Support phone updated.",
    "الخدمات المطلوبة": "Services requested",
    "الدعم والشكاوى": "Support & complaints",
    "منطقة أخرى / غير مدرجة": "Other / not listed",
    "بيانات الطلب تُرسل إلى قاعدة بيانات Supabase.": "Requests are sent to the Supabase database.",
    "وضع تجريبي: أضف إعدادات Supabase لإرسال الطلبات إلى قاعدة البيانات.": "Demo mode: configure Supabase to send requests to the database.",
    "تُحفظ بيانات الحرفي وصورة الهوية في مساحة خاصة لا يراها إلا المدير المخول.": "Professional details and ID images are stored privately and are only accessible to authorized admins.",
    "وضع تجريبي محلي: لا ترفع بيانات أو صور هوية حقيقية قبل إعداد Supabase.": "Local demo: do not upload real personal details or ID images before configuring Supabase.",
    "بيانات الهوية مخزنة في مساحة خاصة ومقيدة بصلاحيات المدير.": "ID images are stored privately and restricted to administrators.",
    "وضع تجريبي محلي: بيانات وصور الهوية لا تُرفع إلى خادم.": "Local demo: personal details and ID images are not uploaded to a server.",
    "طريقة الدفع": "Payment method",
    "اختار وسيلة الدفع المناسبة. التحويل يتم يدويًا بعد تأكيد السعر.": "Choose a payment option. Transfers are manual after the price is confirmed.",
    "تم تأكيد عربونك بنجاح": "Your deposit has been confirmed successfully.",
    "طريقة الدفع المفضلة": "Preferred payment method",
    "اختار طريقة الدفع": "Choose a payment method",
    "كاش عند تقديم الخدمة": "Cash when service is provided",
    "رفع صورة الإيصال (اختياري إذا كتبت رقم المعاملة)": "Upload receipt (optional if you enter a transaction ID)",
    "أو رقم Transaction ID": "Or transaction ID",
    "اكتب رقم المعاملة": "Enter the transaction ID",
    "تفاصيل مكان الدفع النقدي": "Cash collection location details",
    "اكتب العنوان بالتفصيل وأقرب علامة مميزة لاستلام الخدمة نقدًا": "Enter the full address and a nearby landmark for cash payment",
    "المساحة بالمتر المربع": "Area size in square meters",
    "صور معرض الأعمال (اختياري)": "Portfolio photos (optional)",
    "يمكنك اختيار حتى 5 صور، بحد أقصى 5 ميجابايت للصورة.": "Select up to 5 photos, with a 5 MB maximum per image.",
    "طريقة استلام الأرباح": "Payout method",
    "اختار طريقة استلام الأرباح": "Choose a payout method",
    "رقم محفظة Vodafone Cash": "Vodafone Cash wallet number",
    "رقم الهاتف أو الحساب المرتبط بـ InstaPay": "Phone number or InstaPay account",
    "كاش": "Cash",
    "الرقم القومي": "National ID",
    "14 رقمًا": "14 digits",
    "إرسال كود التحقق": "Send verification code",
    "تأكيد الكود": "Verify code",
    "تسجيل دخول العميل": "Customer login",
    "إنشاء حساب عميل": "Create customer account",
    "استخدم رقم الموبايل وكلمة المرور فقط. لا يلزم رمز تحقق عند تسجيل الدخول.": "Sign in with your mobile number and password only. No verification code is required.",
    "سيُنشأ الحساب ببريد داخلي مرتبط برقم الهاتف دون إرسال SMS.": "An internal email alias will be created for your phone number; no SMS is sent.",
    "يُنشأ حساب الحرفي ببريد داخلي مرتبط برقم الهاتف دون SMS. بيانات الهوية ومعرض الأعمال مخزنة في مساحة خاصة ومقيدة بصلاحيات المدير.": "The professional account uses an internal email alias linked to the phone number, without SMS. ID and portfolio images are stored privately and accessible only to authorized admins.",
    "التسجيل والدخول برقم الهاتف وكلمة المرور دون SMS؛ استعادة SMS تتطلب مزودًا ورقم هاتف موثقًا في Supabase، والحسابات المنشأة ببريد داخلي محلي لا تستقبل SMS.": "Sign-up and login use your phone number and password without SMS. SMS recovery requires a provider and a verified Supabase phone; local alias accounts cannot receive SMS.",
    "نسيت كلمة المرور؟": "Forgot password?",
    "تواصل مع الدعم لحذف الحساب وإعادة التسجيل": "Contact support to delete your account and register again",
    "إعادة تعيين كلمة المرور": "Reset password",
    "استعادة SMS متاحة فقط للحسابات المرتبطة برقم هاتف موثق في Supabase؛ الحسابات المنشأة ببريد داخلي محلي لا تستقبل SMS.": "SMS recovery is available only for accounts linked to a verified Supabase phone; local alias accounts cannot receive SMS.",
    "رمز التحقق": "Verification code",
    "كلمة المرور الجديدة": "New password",
    "إرسال رمز التحقق": "Send verification code",
    "العودة لتسجيل الدخول": "Back to sign in",
    "تأكيد رقم الهاتف": "Verify phone number",
    "بيانات التواصل تظهر بعد تأكيد الحجز.": "Contact details appear after the booking is confirmed.",
    "سيظهر رقم التحويل بعد تأكيد الحجز.": "The transfer number will appear after the booking is confirmed.",
    "تنبيه: التحويل إلى InstaPay أو Vodafone Cash يتم مباشرةً إلى حساب الحرفي أو رقم الاستقبال البديل بعد تأكيد الحجز. لا تحتجز المنصة الأموال فعليًا.": "Note: InstaPay and Vodafone Cash transfers go directly to the professional's account or the fallback recipient after booking confirmation. The platform does not hold funds.",
    "رقم الحرفي بعد تأكيد الحجز": "Professional number after booking confirmation",
    "رقم العميل بعد تأكيد الحجز": "Customer number after booking confirmation",
    "أدخل رمز SMS المرسل إلى": "Enter the SMS code sent to",
    "سنرسل كود تحقق إلى رقم موبايلك.": "We will send a verification code to your phone.",
    "لديك حساب؟ تسجيل الدخول": "Already have an account? Log in",
    "حساب جديد؟ سجّل الآن": "New here? Sign up",
    "حساب الحرفي": "Professional account",
    "🛡️ ضمان صلحلي": "🛡️ Salla7ly guarantee",
    "متابعة آخر طلب": "Track latest order",
    "متابعة الطلب والدفع": "Order and payment tracking",
    "إيصال تحويل العربون 50% (اختياري عند إدخال رقم المعاملة)": "50% deposit receipt (optional when entering a transaction ID)",
    "رقم معاملة العربون (أو ارفع الإيصال)": "Deposit transaction ID (or upload a receipt)",
    "إرسال إثبات العربون": "Submit deposit proof",
    "إيصال الدفعة المتبقية (اختياري عند إدخال رقم المعاملة)": "Remaining payment receipt (optional when entering a transaction ID)",
    "رقم معاملة الدفعة المتبقية": "Remaining payment transaction ID",
    "تأكيد واستلام الخدمة": "Confirm and receive service",
    "تم تنفيذ الخدمة": "Service completed",
    "مكتمل نهائياً": "Completed",
    "بانتظار تأكيد العميل": "Awaiting customer confirmation",
    "تم دفع العربون - قيد التنفيذ": "Deposit paid - in progress",
    "الحرفي في الطريق": "The professional is on the way",
    "الحرفي بدأ التحرك إليك. رسوم المنصة 10% محسوبة ضمن إجمالي الطلب بالفعل؛ لا تدفع رسومًا إضافية.": "The professional is on the way. The 10% platform fee is already included in your order total; do not pay an extra fee.",
    "بدء التحرك للعميل": "Start traveling to customer",
    "تم إشعار العميل بأنك في الطريق. رسوم المنصة 10% محسوبة ضمن إجمالي الطلب.": "The customer was notified that you are on the way. The 10% platform fee is included in the order total.",
    "بانتظار اعتماد السعر؛ العربون 50% والباقي 50% بعد إتمام الخدمة.": "Waiting for a price quote; 50% deposit and the remaining 50% after service completion.",
    "لا تُصرف مستحقات الحرفي من المنصة قبل تأكيدك رضاك واستلام الخدمة.": "The professional's platform payout is not released before you confirm satisfaction and receipt.",
    "تنبيه: التحويل إلى InstaPay أو Vodafone Cash في النسخة الحالية يتم مباشرةً إلى رقم الاستقبال، ولا تحتجز المنصة الأموال فعليًا. يلزم ربط بوابة دفع/حساب ضمان لتفعيل الحجز والإفراج الآلي.": "Note: InstaPay and Vodafone Cash transfers currently go directly to the recipient; the platform does not hold funds. A payment gateway/escrow account is required for actual holds and automatic release."
  });

  function localized(value) {
    if (document.documentElement.lang === "ar") return value;
    return translations[value] || tradeEnglish[value] || serviceEnglish[value] || provinceEnglish[value] || districtEnglish[value] || descriptionEnglish[value] || value;
  }

  function localizePage() {
    const english = document.documentElement.lang === "en";
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const original = node.nodeValue.trim();
      const translated = english ? (translations[original] || tradeEnglish[original] || serviceEnglish[original] || provinceEnglish[original] || districtEnglish[original] || descriptionEnglish[original]) : reverseTranslations.get(original);
      if (translated) node.nodeValue = node.nodeValue.replace(original, translated);
    }
    document.querySelectorAll("[placeholder]").forEach((element) => {
      const original = element.getAttribute("placeholder");
      const next = english ? translations[original] || original : reverseTranslations.get(original) || original;
      element.setAttribute("placeholder", next);
    });
    document.querySelectorAll("[aria-label]").forEach((element) => {
      const original = element.getAttribute("aria-label");
      const next = english ? translations[original] || original : reverseTranslations.get(original) || original;
      element.setAttribute("aria-label", next);
    });
    document.documentElement.lang = english ? "en" : "ar";
    document.documentElement.dir = english ? "ltr" : "rtl";
    document.title = english ? "Salla7ly | Home services, made easy" : "صلّحلي | البيت يتظبط على مزاجك";
    byId("language-toggle").textContent = english ? "عربي" : "EN";
    byId("language-toggle").setAttribute("aria-label", english ? "التغيير إلى العربية" : "Switch to English");
    byId("theme-toggle").setAttribute("aria-label", english ? (document.documentElement.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : (document.documentElement.dataset.theme === "dark" ? "تشغيل الوضع الفاتح" : "تشغيل الوضع الليلي"));
    byId("theme-toggle").title = byId("theme-toggle").getAttribute("aria-label");
    localStorage.setItem("salla7ly-v2-language", english ? "en" : "ar");
    renderTradeCards(trades, byId("home-trade-grid"));
    filterTrades();
    refreshSelectLabels();
    if (byId("details-dialog").open) {
      byId("details-dialog").close();
      showTradeDetails(selectedTrade, [...selectedServices][0] || "");
    }
  }
  const reverseTranslations = new Map([
    ...Object.entries(translations).map(([arabic, english]) => [english, arabic]),
    ...Object.entries(tradeEnglish).map(([arabic, english]) => [english, arabic]),
    ...Object.entries(serviceEnglish).map(([arabic, english]) => [english, arabic]),
    ...Object.entries(provinceEnglish).map(([arabic, english]) => [english, arabic]),
    ...Object.entries(districtEnglish).map(([arabic, english]) => [english, arabic]),
    ...Object.entries(descriptionEnglish).map(([arabic, english]) => [english, arabic])
  ]);
  let selectedServices = new Set();
  function refreshSelectLabels() {
    document.querySelectorAll("select").forEach((select) => {
      Array.from(select.options).forEach((option) => {
        const english = document.documentElement.lang === "en";
        const translated = english
          ? translations[option.textContent] || tradeEnglish[option.textContent] || serviceEnglish[option.textContent] || provinceEnglish[option.textContent] || districtEnglish[option.textContent] || descriptionEnglish[option.textContent]
          : reverseTranslations.get(option.textContent);
        if (translated) option.textContent = translated;
      });
    });
    document.querySelectorAll("[data-i18n-ar]").forEach((element) => {
      const english = document.documentElement.lang === "en";
      element.textContent = english ? element.dataset.i18nEn : element.dataset.i18nAr;
    });
  }
  const districts = {
    "القاهرة": ["مدينة نصر", "مصر الجديدة", "المعادي", "التجمع الأول", "التجمع الخامس", "الشروق", "بدر", "حلوان", "شبرا", "عين شمس", "المطرية", "الزيتون", "حدائق القبة", "العباسية", "وسط البلد", "الزمالك", "العاصمة الإدارية"],
    "الجيزة": ["الدقي", "المهندسين", "العجوزة", "فيصل", "الهرم", "السادس من أكتوبر", "الشيخ زايد", "حدائق أكتوبر", "إمبابة", "الوراق", "بولاق الدكرور", "أوسيم", "كرداسة", "أبو النمرس", "الحوامدية"],
    "الإسكندرية": ["المنتزه", "شرق", "وسط", "غرب", "الجمرك", "العامرية", "برج العرب", "العجمي", "سيدي جابر", "سموحة", "محرم بك"],
    "القليوبية": ["بنها", "شبرا الخيمة", "قليوب", "القناطر الخيرية", "طوخ", "قها", "كفر شكر", "الخانكة", "الخصوص", "شبين القناطر", "العبور"],
    "الدقهلية": ["المنصورة", "طلخا", "ميت غمر", "دكرنس", "أجا", "السنبلاوين", "منية النصر", "بلقاس", "شربين", "نبروه", "تمي الأمديد"],
    "البحر الأحمر": ["الغردقة", "رأس غارب", "سفاجا", "القصير", "مرسى علم", "الشلاتين", "حلايب"],
    "البحيرة": ["دمنهور", "كفر الدوار", "رشيد", "إدكو", "أبو حمص", "أبو المطامير", "الدلنجات", "حوش عيسى", "شبراخيت", "إيتاي البارود", "كوم حمادة", "وادي النطرون"],
    "الفيوم": ["مدينة الفيوم", "سنورس", "إطسا", "طامية", "إبشواي", "يوسف الصديق"],
    "الغربية": ["طنطا", "المحلة الكبرى", "كفر الزيات", "زفتى", "السنطة", "قطور", "بسيون", "سمنود"],
    "الشرقية": ["الزقازيق", "العاشر من رمضان", "بلبيس", "منيا القمح", "أبو حماد", "فاقوس", "ههيا", "أبو كبير", "ديرب نجم", "كفر صقر", "الحسينية", "الإبراهيمية"],
    "الإسماعيلية": ["مدينة الإسماعيلية", "فايد", "القنطرة شرق", "القنطرة غرب", "التل الكبير", "أبو صوير", "القصاصين"],
    "المنوفية": ["شبين الكوم", "منوف", "السادات", "أشمون", "قويسنا", "بركة السبع", "تلا", "الباجور", "سرس الليان", "الشهداء"],
    "المنيا": ["مدينة المنيا", "مغاغة", "بني مزار", "مطاي", "سمالوط", "أبو قرقاص", "ملوي", "دير مواس", "العدوة"],
    "الوادي الجديد": ["الخارجة", "الداخلة", "الفرافرة", "باريس", "بلاط"],
    "السويس": ["حي السويس", "حي الأربعين", "حي فيصل", "حي عتاقة", "حي الجناين"],
    "أسوان": ["مدينة أسوان", "دراو", "كوم أمبو", "نصر النوبة", "إدفو", "أبو سمبل"],
    "أسيوط": ["مدينة أسيوط", "ديروط", "القوصية", "منفلوط", "أبنوب", "أبو تيج", "الغنايم", "ساحل سليم", "البداري", "صدفا"],
    "بني سويف": ["مدينة بني سويف", "الواسطى", "ناصر", "إهناسيا", "ببا", "سمسطا", "الفشن"],
    "بورسعيد": ["حي الشرق", "حي العرب", "حي المناخ", "حي الضواحي", "حي الزهور", "حي الجنوب", "مدينة بورفؤاد"],
    "دمياط": ["مدينة دمياط", "رأس البر", "فارسكور", "الزرقا", "كفر سعد", "دمياط الجديدة"],
    "جنوب سيناء": ["شرم الشيخ", "الطور", "دهب", "نويبع", "طابا", "سانت كاترين", "أبو رديس", "أبو زنيمة", "رأس سدر"],
    "كفر الشيخ": ["مدينة كفر الشيخ", "دسوق", "فوه", "مطوبس", "بيلا", "الحامول", "بلطيم", "سيدي سالم", "قلين", "الرياض"],
    "مطروح": ["مرسى مطروح", "الحمام", "العلمين", "الضبعة", "سيدي براني", "النجيلة", "السلوم", "سيوة"],
    "الأقصر": ["مدينة الأقصر", "القرنة", "البياضية", "الزينية", "أرمنت", "الطود", "إسنا"],
    "قنا": ["مدينة قنا", "نجع حمادي", "دشنا", "قفط", "قوص", "أبو تشت", "فرشوط", "نقادة", "الوقف"],
    "شمال سيناء": ["العريش", "بئر العبد", "رفح", "الشيخ زويد", "الحسنة", "نخل"],
    "سوهاج": ["مدينة سوهاج", "أخميم", "جرجا", "طهطا", "المراغة", "البلينا", "المنشأة", "دار السلام", "ساقلتة", "طما"]
  };

  const pageNames = new Set(["home", "services", "request", "join", "artisan", "orders"]);
  const supportPhone = "01068076603";
  const supportWhatsApp = "https://wa.me/201068076603";
  const paymentPhone = "01063459472";
  const currencyFormatter = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 2 });
  const storageKeys = {
    orders: "salla7ly-v2-orders",
    workers: "salla7ly-v2-worker-applications",
    messages: "salla7ly-v2-messages",
    reviews: "salla7ly-v2-reviews",
    trackingToken: "salla7ly-v2-tracking-token"
  };
  const nav = document.querySelector(".main-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const toast = document.getElementById("toast");
  let toastTimer;
  let selectedRating = 0;
  let selectedTrade = "";
  let requestedGovernorate = "";
  let pendingOrdersOpen = false;
  let idImagePromise = Promise.resolve("");
  const byId = (id) => document.getElementById(id);
  const supabaseClient = window.salla7lySupabase;
  const supabaseConfigured = Boolean(
    supabaseClient
    && window.SALLA7LY_SUPABASE_CONFIG
    && !window.SALLA7LY_SUPABASE_CONFIG.url.includes("YOUR_PROJECT_ID")
    && !window.SALLA7LY_SUPABASE_CONFIG.anonKey.includes("YOUR_SUPABASE_ANON_KEY")
  );

  function readStore(key, fallback = []) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return value === null ? fallback : value;
    } catch (error) {
      console.error(`Could not read local data "${key}".`, error);
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Could not save local data "${key}".`, error);
      showToast("تعذر الحفظ على هذا المتصفح. جرّب مساحة تخزين أخرى.");
      return false;
    }
  }

  function showToast(message) {
    if (!toast) return;
    const host = document.querySelector("dialog[open]") || document.body;
    if (toast.parentElement !== host) host.append(toast);
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
      if (toast.parentElement !== document.body) document.body.append(toast);
    }, 4200);
  }

  function createSupportLink(button) {
    const link = document.createElement("a");
    link.id = button.id;
    link.className = button.className;
    link.href = supportWhatsApp;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = localized("تواصل مع الدعم لحذف الحساب وإعادة التسجيل");
    button.replaceWith(link);
    return link;
  }

  function navigate(page, updateHistory = true) {
    if (!pageNames.has(page)) return;
    document.querySelectorAll("[data-page]").forEach((section) => {
      const active = section.dataset.page === page;
      section.hidden = !active;
      section.classList.toggle("is-visible", active);
    });
    document.querySelectorAll(".nav-link[data-page-link]").forEach((link) => {
      const active = link.dataset.pageLink === page;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (updateHistory && location.hash !== `#${page}`) history.pushState(null, "", `#${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page === "account") renderDashboard();
  }

  function fillSelect(select, values, placeholder) {
    select.replaceChildren(new Option(localized(placeholder), ""));
    values.forEach((value) => select.add(new Option(localized(value), value)));
  }

  function populateSelects() {
    const tradeNames = trades.map((trade) => trade.name);
    ["request-trade", "join-trade", "trade-filter"].forEach((id) => fillSelect(byId(id), id === "trade-filter" ? ["", ...tradeNames].filter(Boolean) : tradeNames, id === "trade-filter" ? "كل الحرف" : "اختار الحرفة"));
    ["search-governorate", "request-governorate", "join-governorate"].forEach((id) => fillSelect(byId(id), governorates, id === "search-governorate" ? "كل المحافظات" : "اختار المحافظة"));
    const allServices = [...new Set(trades.flatMap((trade) => trade.services))];
    fillSelect(byId("review-service"), allServices, "اختار الخدمة");
  }

  function setupServicePicker() {
    const oldSelect = byId("request-service");
    const oldLabel = oldSelect.closest(".form-label");
    const wrapper = document.createElement("div");
    wrapper.className = "form-label service-picker-field";
    const heading = document.createElement("span");
    heading.className = "service-picker-heading";
    heading.dataset.i18nAr = "الخدمة المطلوبة *";
    heading.dataset.i18nEn = "Services requested *";
    const host = document.createElement("div");
    host.id = "request-service-options";
    host.className = "request-service-options";
    host.setAttribute("role", "group");
    host.setAttribute("aria-label", "الخدمات المطلوبة");
    wrapper.append(heading, host);
    oldLabel.replaceWith(wrapper);
  }

  function setupDistrictSelects() {
    [
      { form: "request-form", governorate: "request-governorate", inputName: "area", id: "request-area" },
      { form: "join-form", governorate: "join-governorate", inputName: "area", id: "join-area" }
    ].forEach((config) => {
      const label = byId(config.form).querySelector(`[name="${config.inputName}"]`).closest(".form-label");
      const textInput = label.querySelector("input");
      const districtSelect = document.createElement("select");
      districtSelect.id = config.id;
      districtSelect.name = config.inputName;
      districtSelect.dataset.districtSelect = "true";
      districtSelect.required = true;
      districtSelect.disabled = true;
      districtSelect.append(new Option("اختار المحافظة الأول", ""));
      const otherInput = document.createElement("input");
      otherInput.name = "area_other";
      otherInput.type = "text";
      otherInput.placeholder = "اكتب اسم المنطقة أو المركز";
      otherInput.hidden = true;
      otherInput.required = false;
      otherInput.autocomplete = "address-level2";
      textInput.replaceWith(districtSelect);
      label.append(otherInput);
      const governorateSelect = byId(config.governorate);
      governorateSelect.addEventListener("change", () => {
        const allowed = districts[governorateSelect.value] || [];
        fillSelect(districtSelect, allowed, "اختار المنطقة أو المركز");
        districtSelect.add(new Option("منطقة أخرى / غير مدرجة", "__other__"));
        districtSelect.disabled = !governorateSelect.value;
        otherInput.value = "";
        otherInput.hidden = true;
        otherInput.required = false;
      });
      districtSelect.addEventListener("change", () => {
        const isOther = districtSelect.value === "__other__";
        otherInput.hidden = !isOther;
        otherInput.required = isOther;
        if (isOther) otherInput.focus();
      });
    });
  }

  function resetDistrictSelect(formId, selectId) {
    const select = byId(selectId);
    select.replaceChildren(new Option("اختار المحافظة الأول", ""));
    select.disabled = true;
    const other = byId(formId).elements.namedItem("area_other");
    other.value = "";
    other.hidden = true;
    other.required = false;
  }

  function createFormField(labelText, name, type, attributes = {}) {
    const label = document.createElement("label");
    label.className = "form-label";
    label.append(document.createTextNode(labelText));
    const input = document.createElement(type === "textarea" ? "textarea" : "input");
    if (type !== "textarea") input.type = type;
    input.name = name;
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "required") input.required = Boolean(value);
      else if (key === "hidden") input.hidden = Boolean(value);
      else input.setAttribute(key, String(value));
    });
    label.append(input);
    return { label, input };
  }

  function normalizeEgyptianMobile(value) {
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

  function accountEmailFromPhone(phone) {
    return `${String(phone).replace(/\D/g, "")}@app.local`;
  }

  function describeAuthError(error, fallback) {
    const message = String(error?.message || error?.error_description || "").trim();
    const lower = message.toLowerCase();
    if (/already registered|already been registered|user already exists/.test(lower)) {
      return "هذا الرقم مسجل مسبقًا. استخدم تسجيل الدخول.";
    }
    if (/invalid login credentials|invalid credentials/.test(lower)) {
      return "رقم الموبايل أو كلمة المرور غير صحيحة.";
    }
    if (/email not confirmed/.test(lower)) {
      return "تعذر تفعيل الحساب. عطّل Confirm email في إعدادات Authentication داخل Supabase ثم أعد المحاولة.";
    }
    if (/sms|otp|phone provider|unsupported phone|signups not allowed for otp/.test(lower)) {
      return "تعذر التحقق عبر SMS. تأكد من إعداد مزود الرسائل وتفعيل تسجيل الهاتف في Supabase.";
    }
    return message || fallback;
  }

  function describePhoneLoginError(error, fallback) {
    const message = String(error?.message || error?.error_description || "").trim();
    const lower = message.toLowerCase();
    if (/invalid login credentials|invalid credentials/.test(lower)) {
      return "رقم الموبايل أو كلمة المرور غير صحيحة.";
    }
    if (/sms|otp|phone provider/.test(lower)) {
      return "تعذر تسجيل الدخول برقم الهاتف وكلمة المرور. تحقق من إعداد تسجيل الهاتف في Supabase.";
    }
    return message || fallback;
  }

  async function signUpCustomerAccount({ phone, password, fullName, nationalId }) {
    const email = accountEmailFromPhone(phone);
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || "",
          national_id: nationalId || "",
          phone
        }
      }
    });
    if (error) return { data, error, email };
    if (data?.session) return { data, error: null, email };
    const login = await supabaseClient.auth.signInWithPassword({ email, password });
    return { data: login.data, error: login.error, email };
  }

  async function signInWithPhone({ phone, password }) {
    const digits = String(phone).replace(/\D/g, "");
    const currentEmail = accountEmailFromPhone(phone);
    const legacyEmails = [`${digits}@accounts.salla7ly.app`];
    let result = await supabaseClient.auth.signInWithPassword({
      email: currentEmail,
      password
    });
    if (!result.error || !/invalid login credentials|invalid credentials/i.test(result.error.message || "")) {
      return result;
    }
    for (const email of legacyEmails) {
      result = await supabaseClient.auth.signInWithPassword({ email, password });
      if (!result.error || !/invalid login credentials|invalid credentials/i.test(result.error.message || "")) {
        return result;
      }
    }
    return supabaseClient.auth.signInWithPassword({ phone, password });
  }

  async function persistCustomerProfile({ userId, email, phone, fullName, nationalId }) {
    if (!userId) return;
    const { error } = await supabaseClient.from("profiles").upsert({
      id: userId,
      email,
      phone,
      full_name: fullName || "",
      national_id: nationalId || ""
    }, { onConflict: "id" });
    if (error) {
      console.error("Could not save the customer profile.", error);
      showToast("تم إنشاء الحساب لكن تعذر حفظ الاسم أو الرقم القومي. أعد تشغيل سكربت supabase-setup.sql ثم حاول مرة أخرى.");
    }
  }

  function addPasswordField(afterElement, name, labelText, autocomplete = "new-password") {
    const field = createFormField(labelText, name, "password", {
      autocomplete,
      minlength: "8",
      required: true,
      placeholder: "8 أحرف أو أرقام على الأقل"
    });
    afterElement.after(field.label);
    return field.input;
  }

  function setupRequestExperience() {
    const form = byId("request-form");
    const locationButton = byId("request-location-button");
    const locationStatus = byId("request-location-status");
    const latitudeInput = byId("request-location-latitude");
    const longitudeInput = byId("request-location-longitude");
    const radiusLabel = document.createElement("label");
    radiusLabel.className = "form-label distance-radius-label";
    const radiusTitle = document.createElement("span");
    radiusTitle.textContent = localized("نطاق البحث الجغرافي");
    const radiusValue = document.createElement("output");
    radiusValue.className = "distance-radius-value";
    const radiusInput = document.createElement("input");
    radiusInput.type = "range";
    radiusInput.name = "matching_radius_meters";
    radiusInput.min = "1";
    radiusInput.max = "10000";
    radiusInput.step = "1";
    radiusInput.setAttribute("value", "10000");
    radiusInput.value = "10000";
    const radiusHint = document.createElement("small");
    radiusHint.className = "distance-radius-hint";
    radiusHint.textContent = localized("من متر واحد إلى 10 كم. حدّد موقعك عبر GPS للبحث بالمسافة؛ من دونه نطابق المحافظة والمنطقة.");
    const updateRadiusValue = () => {
      const meters = Number(radiusInput.value);
      const english = document.documentElement.lang === "en";
      radiusValue.textContent = meters >= 1000
        ? `${Number((meters / 1000).toFixed(2))} ${english ? "km" : "كم"}`
        : `${meters} ${english ? "m" : "متر"}`;
    };
    radiusLabel.append(radiusTitle, radiusValue, radiusInput, radiusHint);
    locationButton.closest(".request-location-tools").after(radiusLabel);
    radiusInput.addEventListener("input", updateRadiusValue);
    updateRadiusValue();
    locationButton.textContent = localized("استخدم موقعي الحالي");
    const resetLocationStatus = () => {
      locationStatus.textContent = localized("أدخل العنوان يدويًا أو حدّد موقعك عبر GPS.");
    };
    locationButton.addEventListener("click", () => {
      if (!navigator.geolocation) {
        locationStatus.textContent = localized("تعذر الوصول للموقع. اكتب العنوان يدويًا أو حاول مرة أخرى.");
        showToast(localized("تعذر الوصول للموقع. اكتب العنوان يدويًا أو حاول مرة أخرى."));
        return;
      }
      locationButton.disabled = true;
      latitudeInput.value = "";
      longitudeInput.value = "";
      locationStatus.textContent = localized("جارٍ تحديد موقعك...");
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        latitudeInput.value = String(coords.latitude);
        longitudeInput.value = String(coords.longitude);
        locationStatus.textContent = localized("تم تحديد موقعك وإرفاقه بالطلب.");
        locationButton.disabled = false;
      }, (error) => {
        console.error("Could not get the customer's location.", error);
        locationStatus.textContent = localized("تعذر الوصول للموقع. اكتب العنوان يدويًا أو حاول مرة أخرى.");
        showToast(localized("تعذر الوصول للموقع. اكتب العنوان يدويًا أو حاول مرة أخرى."));
        locationButton.disabled = false;
      }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
    });
    form.addEventListener("reset", () => {
      resetLocationStatus();
      setTimeout(updateRadiusValue, 0);
    });
    byId("payment-method").closest(".form-label").remove();
    byId("payment-instructions").remove();

    const section = document.createElement("section");
    section.className = "request-payment-section";
    const heading = document.createElement("h3");
    heading.textContent = "طريقة الدفع";
    const intro = document.createElement("p");
    intro.className = "payment-intro";
    intro.textContent = "اختار وسيلة الدفع المناسبة. التحويل يتم يدويًا بعد تأكيد السعر.";
    section.append(heading, intro);
    const guarantee = document.createElement("aside");
    guarantee.className = "salla7ly-guarantee";
    guarantee.append(
      textElement("strong", "", "🛡️ ضمان صلحلي"),
      textElement("p", "", "تدفع 50% عربون إلكترونيًا بعد اعتماد السعر، والباقي بعد تنفيذ الخدمة. لا تُصرف مستحقات الحرفي من المنصة قبل تأكيدك رضاك واستلام الخدمة."),
      textElement("small", "", localized("تنبيه: التحويل إلى InstaPay أو Vodafone Cash يتم مباشرةً إلى حساب الحرفي أو رقم الاستقبال البديل بعد تأكيد الحجز. لا تحتجز المنصة الأموال فعليًا."))
    );
    section.append(guarantee);
    const methodLabel = document.createElement("label");
    methodLabel.className = "form-label";
    methodLabel.append(document.createTextNode("طريقة الدفع المفضلة"));
    const method = document.createElement("select");
    method.id = "payment-method";
    method.name = "payment_method";
    method.required = true;
    [
      ["اختار طريقة الدفع", ""],
      ["InstaPay", "instapay"],
      ["Vodafone Cash", "vodafone_cash"],
      ["كاش عند تقديم الخدمة", "cash"]
    ].forEach(([label, value]) => method.add(new Option(label, value)));
    methodLabel.append(method);
    section.append(methodLabel);

    const recipient = document.createElement("p");
    recipient.id = "payment-recipient";
    recipient.className = "payment-recipient";
    section.append(recipient);
    const depositNote = textElement("p", "deposit-note", "يظهر مبلغ العربون 50% بعد اعتماد السعر، ويمكنك دفعه من نافذة متابعة الطلب.");
    depositNote.id = "deposit-note";
    section.append(depositNote);

    const cashFields = document.createElement("div");
    cashFields.id = "cash-payment-fields";
    cashFields.className = "payment-conditional-fields";
    cashFields.hidden = true;
    const cashLocation = createFormField("تفاصيل مكان الدفع النقدي", "cash_location_details", "textarea", {
      rows: 3,
      placeholder: "اكتب العنوان بالتفصيل وأقرب علامة مميزة لاستلام الخدمة نقدًا"
    });
    cashLocation.input.id = "cash-location-details";
    cashFields.append(cashLocation.label);
    section.append(cashFields);
    form.querySelector(".form-submit").before(section);

    const sqm = createFormField("المساحة بالمتر المربع", "area_size_sqm", "number", {
      min: "0.1",
      step: "0.1",
      inputmode: "decimal",
      placeholder: "مثال: 45"
    });
    sqm.input.id = "area-size-sqm";
    sqm.label.hidden = true;
    byId("request-service-options").closest(".form-label").after(sqm.label);

    byId("payment-method").addEventListener("change", updatePaymentInstructions);
    byId("request-trade").addEventListener("change", (event) => {
      const needsArea = ["سيراميك وبلاط", "دهانات ونقاشة"].includes(event.target.value);
      sqm.label.hidden = !needsArea;
      sqm.input.required = needsArea;
      if (!needsArea) sqm.input.value = "";
    });

    const liveStatus = document.createElement("p");
    liveStatus.id = "request-live-status";
    liveStatus.className = "request-live-status";
    liveStatus.setAttribute("aria-live", "polite");
    byId("availability-description").after(liveStatus);

    const tracking = document.createElement("section");
    tracking.id = "customer-order-tracking";
    tracking.className = "customer-order-tracking";
    const trackingHeading = document.createElement("h3");
    trackingHeading.textContent = "متابعة الطلب والدفع";
    const trackingStatus = textElement("p", "tracking-status", "سيظهر تحديث الطلب هنا.");
    trackingStatus.id = "customer-tracking-status";
    const amounts = textElement("p", "tracking-amounts", "");
    amounts.id = "customer-tracking-amounts";
    const inquiry = document.createElement("section");
    inquiry.id = "customer-inquiry";
    inquiry.className = "customer-inquiry";
    inquiry.hidden = true;
    const professionalContact = textElement("p", "professional-contact", "");
    professionalContact.id = "customer-professional-contact";
    professionalContact.hidden = true;
    const depositForm = document.createElement("form");
    depositForm.id = "deposit-payment-form";
    depositForm.className = "final-payment-form";
    depositForm.hidden = true;
    depositForm.append(textElement("p", "payment-recipient", ""));
    const depositReceipt = createFormField("إيصال تحويل العربون 50% (اختياري عند إدخال رقم المعاملة)", "deposit_receipt", "file", {
      accept: "image/jpeg,image/png,image/webp,application/pdf"
    });
    depositReceipt.input.id = "deposit-payment-receipt";
    const depositTransaction = createFormField("رقم معاملة العربون (أو ارفع الإيصال)", "deposit_transaction_id", "text", {
      autocomplete: "off",
      placeholder: "اكتب رقم المعاملة"
    });
    depositTransaction.input.id = "deposit-transaction-id";
    depositForm.append(depositReceipt.label, depositTransaction.label);
    const depositButton = document.createElement("button");
    depositButton.type = "submit";
    depositButton.className = "button button-primary";
    depositButton.textContent = "إرسال إثبات العربون";
    depositForm.append(depositButton);
    depositForm.addEventListener("submit", submitOrderDeposit);
    const finalPayment = document.createElement("form");
    finalPayment.id = "final-payment-form";
    finalPayment.className = "final-payment-form";
    finalPayment.hidden = true;
    finalPayment.append(textElement("p", "payment-recipient", ""));
    const finalReceipt = createFormField("إيصال الدفعة المتبقية (اختياري عند إدخال رقم المعاملة)", "final_payment_receipt", "file", {
      accept: "image/jpeg,image/png,image/webp,application/pdf"
    });
    finalReceipt.input.id = "final-payment-receipt";
    const finalTransaction = createFormField("رقم معاملة الدفعة المتبقية", "final_transaction_id", "text", {
      autocomplete: "off",
      placeholder: "اكتب رقم المعاملة"
    });
    finalTransaction.input.id = "final-transaction-id";
    finalPayment.append(finalReceipt.label, finalTransaction.label);
    const confirmButton = document.createElement("button");
    confirmButton.type = "submit";
    confirmButton.className = "button button-primary";
    confirmButton.textContent = "تأكيد واستلام الخدمة";
    finalPayment.append(confirmButton);
    tracking.append(trackingHeading, trackingStatus, professionalContact, amounts, inquiry, depositForm, finalPayment);
    byId("availability-workers").before(tracking);
    const trackButton = document.createElement("button");
    trackButton.type = "button";
    trackButton.id = "track-order-button";
    trackButton.className = "text-link";
    trackButton.textContent = "متابعة آخر طلب";
    trackButton.hidden = !readStore(storageKeys.trackingToken, "");
    trackButton.addEventListener("click", () => {
      const trackingToken = readStore(storageKeys.trackingToken, "");
      if (!trackingToken) return;
      showAvailabilityResult([], { trackingToken });
    });
    document.querySelector(".footer-links").append(trackButton);
    finalTransaction.input.addEventListener("input", updateFinalPaymentRequirement);
    finalReceipt.input.addEventListener("change", updateFinalPaymentRequirement);
    finalPayment.addEventListener("submit", confirmFinalPayment);
  }

  function updateFinalPaymentRequirement() {
    const proofProvided = Boolean(
      byId("final-transaction-id").value.trim()
      || byId("final-payment-receipt").files.length
    );
    const digital = !["cash", ""].includes(currentTrackingOrder?.payment_method);
    byId("final-payment-receipt").required = digital && !proofProvided;
  }

  function setupJoinEnhancements() {
    const idLabel = byId("id-upload").closest(".form-label");
    const joinForm = byId("join-form");
    joinForm.elements.phone.removeAttribute("pattern");
    joinForm.elements.phone.addEventListener("input", (event) => {
      event.currentTarget.setCustomValidity("");
    });
    const joinPassword = addPasswordField(
      joinForm.elements.phone.closest(".form-label"),
      "account_password",
      "كلمة مرور لحساب الحرفي *"
    );
    joinPassword.required = supabaseConfigured;
    joinPassword.closest("label").hidden = !supabaseConfigured;
    const portfolio = createFormField("صور معرض الأعمال (اختياري)", "portfolio_images", "file", {
      accept: "image/jpeg,image/png,image/webp",
      multiple: true
    });
    portfolio.input.id = "portfolio-upload";
    portfolio.label.append(textElement("small", "upload-help", "يمكنك اختيار حتى 5 صور، بحد أقصى 5 ميجابايت للصورة."));
    idLabel.after(portfolio.label);

    const payoutLabel = document.createElement("label");
    payoutLabel.className = "form-label";
    payoutLabel.append(document.createTextNode("طريقة استلام الأرباح"));
    const payout = document.createElement("select");
    payout.name = "payout_method";
    payout.required = true;
    [
      ["اختار طريقة استلام الأرباح", ""],
      ["Vodafone Cash", "vodafone_cash"],
      ["InstaPay", "instapay"],
      ["كاش", "cash"]
    ].forEach(([label, value]) => payout.add(new Option(label, value)));
    payoutLabel.append(payout);
    joinForm.querySelector(".checkbox-label").before(payoutLabel);
    const payoutAccount = createFormField("بيانات حساب استلام الأرباح", "payout_account", "text", {
      autocomplete: "off",
      placeholder: "أدخل رقم المحفظة أو حساب InstaPay"
    });
    payoutAccount.input.id = "payout-account";
    payoutAccount.label.hidden = true;
    payoutAccount.input.required = false;
    payoutLabel.after(payoutAccount.label);
    payout.addEventListener("change", () => {
      const needsAccount = ["instapay", "vodafone_cash"].includes(payout.value);
      payoutAccount.label.hidden = !needsAccount;
      payoutAccount.input.required = needsAccount;
      if (payout.value === "vodafone_cash") {
        payoutAccount.input.type = "tel";
        payoutAccount.input.inputMode = "tel";
        payoutAccount.input.pattern = "01[0125][0-9]{8}";
        payoutAccount.input.maxLength = 11;
      } else {
        payoutAccount.input.type = "text";
        payoutAccount.input.inputMode = "text";
        payoutAccount.input.removeAttribute("pattern");
        payoutAccount.input.removeAttribute("maxlength");
      }
      payoutAccount.label.firstChild.textContent = localized(payout.value === "vodafone_cash"
        ? "رقم محفظة Vodafone Cash"
        : "رقم الهاتف أو الحساب المرتبط بـ InstaPay");
      if (!needsAccount) payoutAccount.input.value = "";
    });
  }

  function setupCustomerAuth() {
    const dialog = byId("auth-dialog");
    const form = byId("auth-form");
    const nameInput = form.elements.name;
    const phoneInput = form.elements.phone;
    const nationalIdInput = form.elements.national_id;
    const passwordInput = form.elements.password;
    const authError = byId("auth-error");
    const submit = form.querySelector(".form-submit");
    const resetForm = byId("password-reset-form");
    const resetToggle = createSupportLink(byId("auth-reset-toggle"));
    const resetError = byId("reset-error");
    const resetSubmit = resetForm.querySelector(".form-submit");
    const modeButton = document.createElement("button");
    modeButton.type = "button";
    modeButton.className = "text-link auth-mode-toggle";
    modeButton.id = "auth-mode-toggle";
    form.after(modeButton);
    let mode = "signup";
    let resetStep = "request";
    resetToggle.textContent = localized("تواصل مع الدعم لحذف الحساب وإعادة التسجيل");

    function showAuthError(message) {
      if (authError) {
        authError.hidden = !message;
        authError.textContent = message || "";
      }
      if (message) showToast(message);
    }

    function showResetError(message) {
      resetError.hidden = !message;
      resetError.textContent = message || "";
      if (message) showToast(message);
    }

    function setMode(nextMode) {
      mode = nextMode;
      nameInput.required = mode === "signup";
      nationalIdInput.required = mode === "signup";
      nameInput.closest("label").hidden = mode !== "signup";
      nationalIdInput.closest("label").hidden = mode !== "signup";
      phoneInput.readOnly = false;
      passwordInput.autocomplete = mode === "signup" ? "new-password" : "current-password";
      passwordInput.minLength = mode === "signup" ? 8 : 1;
      submit.textContent = localized(mode === "signup" ? "إنشاء حساب" : "دخول");
      byId("auth-title").textContent = localized(mode === "signup" ? "إنشاء حساب عميل" : "تسجيل دخول العميل");
      dialog.querySelector(".auth-description").textContent = localized(
        mode === "signup"
          ? "سيُنشأ الحساب ببريد داخلي مرتبط برقم الهاتف دون إرسال SMS."
          : "استخدم رقم الموبايل وكلمة المرور فقط. لا يلزم رمز تحقق عند تسجيل الدخول."
      );
      modeButton.textContent = localized(mode === "signup" ? "لديك حساب؟ تسجيل الدخول" : "حساب جديد؟ سجّل الآن");
      modeButton.hidden = false;
      resetToggle.hidden = mode !== "login";
      form.hidden = false;
      resetForm.hidden = true;
      showAuthError("");
    }

    nationalIdInput.addEventListener("input", () => {
      nationalIdInput.value = nationalIdInput.value
        .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
        .replace(/\D/g, "")
        .slice(0, 14);
    });
    phoneInput.addEventListener("input", () => phoneInput.setCustomValidity(""));

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      showAuthError("");
      if (!form.reportValidity()) {
        showAuthError("أكمل الحقول المطلوبة بشكل صحيح قبل المتابعة.");
        return;
      }
      if (!supabaseConfigured || !supabaseClient) {
        showAuthError("تعذر الاتصال بقاعدة البيانات. راجع إعدادات Supabase ثم أعد المحاولة.");
        return;
      }
      const phone = normalizeEgyptianMobile(phoneInput.value);
      if (!phone) {
        phoneInput.setCustomValidity("اكتب رقم موبايل مصري صحيحًا مثل 01012345678 أو +201012345678.");
        phoneInput.reportValidity();
        showAuthError("اكتب رقم موبايل مصري صحيحًا مثل 01012345678.");
        return;
      }
      phoneInput.setCustomValidity("");
      phoneInput.value = phone;
      const fullName = nameInput.value.trim();
      const nationalId = nationalIdInput.value.trim();
      const password = passwordInput.value;
      submit.disabled = true;
      try {
        const action = mode;
        const result = action === "signup"
          ? await signUpCustomerAccount({ phone, password, fullName, nationalId })
          : await signInWithPhone({ phone, password });
        if (result.error) {
          console.error(`Could not ${action === "signup" ? "register" : "sign in"} the customer.`, result.error);
          showAuthError(action === "signup"
            ? describeAuthError(result.error, "تعذر إنشاء الحساب.")
            : describePhoneLoginError(result.error, "تعذر تسجيل الدخول."));
          return;
        }
        if (!result.data?.session) {
          showAuthError("تم إنشاء المستخدم لكن لم يتم فتح الجلسة. عطّل Confirm email في إعدادات Supabase Authentication.");
          return;
        }
        if (action === "signup") await persistCustomerProfile({
          userId: result.data.user?.id,
          email: result.email,
          phone,
          fullName,
          nationalId
        });
        form.reset();
        showAuthError("");
        const shouldOpenOrders = pendingOrdersOpen;
        pendingOrdersOpen = false;
        dialog.close();
        showToast(action === "signup" ? "تم إنشاء حساب العميل بنجاح." : "تم تسجيل الدخول بنجاح.");
        if (shouldOpenOrders) {
          navigate("orders");
          await loadCustomerOrders();
        }
      } catch (error) {
        console.error("Customer auth submit failed.", error);
        showAuthError(describeAuthError(error, "حدث خطأ أثناء الاتصال بقاعدة البيانات. حاول مرة أخرى."));
      } finally {
        submit.disabled = false;
      }
    });
    modeButton.addEventListener("click", () => setMode(mode === "signup" ? "login" : "signup"));
    byId("auth-reset-back").addEventListener("click", () => setMode("login"));
    resetForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      showResetError("");
      if (!supabaseConfigured || !supabaseClient) {
        showResetError("إعادة التعيين تحتاج إعداد Supabase ومزود رسائل SMS.");
        return;
      }
      if (!resetForm.reportValidity()) return;
      const resetPhone = normalizeEgyptianMobile(resetForm.elements.phone.value);
      if (!resetPhone) {
        showResetError("اكتب رقم موبايل مصري صحيحًا.");
        return;
      }
      resetForm.elements.phone.value = resetPhone;
      resetSubmit.disabled = true;
      try {
        if (resetStep === "request") {
          const { error } = await supabaseClient.auth.signInWithOtp({
            phone: resetPhone,
            options: { shouldCreateUser: false }
          });
          if (error) {
            console.error("Could not send the password reset SMS.", error);
            showResetError("تعذر إرسال رمز التحقق. تأكد من تسجيل الهاتف وتفعيل مزود SMS.");
            return;
          }
          resetStep = "verify";
          resetForm.querySelector('[data-reset-field="otp"]').hidden = false;
          resetForm.querySelector('[data-reset-field="password"]').hidden = false;
          resetForm.elements.otp.required = true;
          resetForm.elements.password.required = true;
          resetSubmit.textContent = "تأكيد الرمز وتغيير كلمة المرور";
          showToast("أرسلنا رمز التحقق إلى رقم الموبايل.");
          return;
        }
        if (resetStep === "verify") {
          const { error: verificationError } = await supabaseClient.auth.verifyOtp({
            phone: resetPhone,
            token: resetForm.elements.otp.value.trim(),
            type: "sms"
          });
          if (verificationError) {
            console.error("Could not verify the password reset code.", verificationError);
            showResetError("رمز التحقق غير صحيح أو منتهي الصلاحية.");
            return;
          }
          resetStep = "update";
        }
        const { error: passwordError } = await supabaseClient.auth.updateUser({
          password: resetForm.elements.password.value
        });
        if (passwordError) {
          console.error("Could not update the password after phone verification.", passwordError);
          showResetError(describeAuthError(passwordError, "تعذر تحديث كلمة المرور."));
          return;
        }
        resetForm.reset();
        resetStep = "request";
        setMode("login");
        dialog.close();
        showToast("تم تغيير كلمة المرور وتسجيل الدخول.");
      } catch (error) {
        console.error("Phone password recovery failed.", error);
        showResetError(describeAuthError(error, "حدث خطأ أثناء إعادة تعيين كلمة المرور."));
      } finally {
        resetSubmit.disabled = false;
      }
    });
    document.querySelectorAll("[data-auth]").forEach((button) => {
      button.addEventListener("click", () => {
        resetForm.hidden = true;
        setMode(button.dataset.auth === "login" ? "login" : "signup");
        dialog.showModal();
      });
    });
    dialog.addEventListener("close", () => {
      pendingOrdersOpen = false;
      form.reset();
      setMode("login");
    });

    setMode("signup");
    byId("auth-privacy-copy").textContent = localized("التسجيل والدخول برقم الهاتف وكلمة المرور دون SMS؛ استعادة SMS تتطلب مزودًا ورقم هاتف موثقًا في Supabase، والحسابات المنشأة ببريد داخلي محلي لا تستقبل SMS.");
  }

  function setupArtisanDashboard() {
    const section = document.createElement("section");
    section.className = "page-section inner-page";
    section.id = "page-artisan";
    section.dataset.page = "artisan";
    section.hidden = true;
    section.innerHTML = '<div class="section-wrap artisan-dashboard"><div class="page-heading"><div><div class="eyebrow">بوابة الحرفي</div><h1>الطلبات <span>المطابقة لك.</span></h1><p>سجّل الدخول برقم الموبايل وكلمة المرور المسجلين بطلب انضمامك والمعتمد من الإدارة.</p></div></div><div class="artisan-auth-panel"><label class="form-label">رقم الموبايل<input id="artisan-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="01xxxxxxxxx أو +201xxxxxxxxx" required></label><label class="form-label">كلمة المرور<input id="artisan-password" type="password" autocomplete="current-password" minlength="8" placeholder="8 أحرف أو أرقام على الأقل" required></label><button class="button button-primary" id="artisan-login" type="button">دخول</button><button class="text-link artisan-forgot-password" id="artisan-forgot-password" type="button">نسيت كلمة المرور؟</button><button class="button button-light" id="artisan-signout" type="button" hidden>تسجيل الخروج</button></div><div id="artisan-orders" class="artisan-orders" hidden></div></div>';
    createSupportLink(section.querySelector("#artisan-forgot-password"));
    document.querySelector("main").append(section);
    const link = document.createElement("a");
    link.className = "nav-link";
    link.href = "#artisan";
    link.dataset.pageLink = "artisan";
    link.textContent = "حساب الحرفي";
    nav.append(link);

    let matchesChannel = null;
    let presenceChannel = null;
    const inquiryChannels = new Map();

    async function loadMatches() {
      const host = byId("artisan-orders");
      const { data, error } = await supabaseClient.from("service_order_matches")
        .select("id, status, service_orders(id, trade, services, governorate, area, address, location_latitude, location_longitude, proposed_price, details, cash_location_details, area_size_sqm, payment_method, created_at, status, estimated_arrival_minutes)")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Could not load matching service orders.", error);
        showToast("تعذر تحميل الطلبات المطابقة.");
        return;
      }
      host.replaceChildren();
      if (!data.length) host.append(textElement("p", "empty-state", "لا توجد طلبات مطابقة لمنطقتك وتخصصك حاليًا."));
      for (const match of data) {
        const order = match.service_orders;
        if (!order) continue;
        const card = document.createElement("article");
        card.className = "artisan-order-card";
        const services = Array.isArray(order.services) ? order.services.join("، ") : "";
        card.append(
          textElement("strong", "", `${order.trade} — ${services}`),
          textElement("span", "", `${order.governorate}، ${order.area} · ${order.address}`),
          textElement("span", "", [order.details, order.cash_location_details, order.area_size_sqm ? `المساحة ${order.area_size_sqm} م²` : ""].filter(Boolean).join(" · "))
        );
        if (order.proposed_price !== null && order.proposed_price !== undefined) {
          card.append(textElement(
            "strong",
            "proposed-price",
            `${localized("السعر المقترح من العميل")}: ${currencyFormatter.format(Number(order.proposed_price))} ج.م`
          ));
        }
        const latitude = order.location_latitude === null || order.location_latitude === undefined
          ? Number.NaN
          : Number(order.location_latitude);
        const longitude = order.location_longitude === null || order.location_longitude === undefined
          ? Number.NaN
          : Number(order.location_longitude);
        if (Number.isFinite(latitude) && Math.abs(latitude) <= 90
          && Number.isFinite(longitude) && Math.abs(longitude) <= 180) {
          const mapLink = document.createElement("a");
          mapLink.className = "artisan-order-location";
          mapLink.href = `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}`;
          mapLink.target = "_blank";
          mapLink.rel = "noopener noreferrer";
          mapLink.textContent = localized("عرض الموقع على الخريطة");
          card.append(mapLink);
        }
        if (match.status === "accepted") {
          const { data: contact, error: contactError } = await supabaseClient.rpc("get_accepted_order_contact", {
            p_match_id: match.id
          });
          if (contactError) {
            console.error("Could not load the confirmed customer's contact number.", contactError);
            showToast("تعذر تحميل رقم العميل بعد تأكيد الحجز.");
          } else if (contact?.customer_phone) {
            const phone = String(contact.customer_phone).replace(/[^\d+]/g, "");
            const call = document.createElement("a");
            call.className = "confirmed-customer-contact";
            call.href = `tel:${phone}`;
            call.textContent = `${localized("رقم العميل بعد تأكيد الحجز")}: ${contact.customer_phone}`;
            card.append(call);
          }
        }
        await appendProfessionalInquiry(match, order, card);
        if (match.status === "accepted" && order.status === "تم دفع العربون - قيد التنفيذ") {
          const travel = document.createElement("button");
          travel.type = "button";
          travel.className = "button button-primary";
          travel.textContent = localized("بدء التحرك للعميل");
          travel.addEventListener("click", async () => {
            const { error: travelError } = await supabaseClient.rpc("start_service_order_travel", {
              p_match_id: match.id
            });
            if (travelError) {
              console.error("Could not notify the customer that the professional is en route.", travelError);
              showToast(travelError.message || "تعذر تحديث حالة التحرك.");
              return;
            }
            showToast(localized("تم إشعار العميل بأنك في الطريق. رسوم المنصة 10% محسوبة ضمن إجمالي الطلب."));
            await loadMatches();
          });
          card.append(travel);
        }
        if (match.status === "accepted" && ["تم دفع العربون - قيد التنفيذ", "الحرفي في الطريق"].includes(order.status)) {
          const complete = document.createElement("button");
          complete.type = "button";
          complete.className = "button button-primary";
          complete.textContent = localized("تم تنفيذ الخدمة");
          complete.addEventListener("click", async () => {
            const { error: completionError } = await supabaseClient.rpc("complete_service_order", {
              match_id: match.id
            });
            if (completionError) {
              console.error("Could not mark the service order complete.", completionError);
              showToast(completionError.message || "تعذر تحديث حالة الخدمة.");
              return;
            }
            showToast("تم إشعار العميل بانتهاء الخدمة ليدفع المتبقي ويؤكد الاستلام.");
            await loadMatches();
          });
          card.append(complete);
        } else if (match.status === "accepted" && order.status === "بانتظار تأكيد العميل") {
          card.append(textElement("span", "record-status", "بانتظار تأكيد العميل واستلام الدفعة المتبقية."));
        } else if (match.status === "accepted") {
          card.append(textElement(
            "span",
            "record-status",
            `${localized(order.status)} · الوصول خلال ${order.estimated_arrival_minutes || "—"} دقيقة`
          ));
        } else {
          card.append(textElement("span", "record-status", "تم إسناد الطلب إلى حرفي آخر."));
        }
        host.append(card);
      }
      host.hidden = false;
    }

    async function appendProfessionalInquiry(match, order, card) {
      if (!inquiryChannels.has(order.id)) {
        const channel = supabaseClient.channel(`service-inquiry:${order.id}`, {
          config: { private: false }
        }).on("broadcast", { event: "inquiry_updated" }, ({ payload }) => {
          if (payload?.order_id === order.id) void loadMatches();
        }).subscribe((status) => {
          if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            console.error("Could not subscribe to the matched service inquiry.", status);
            showToast("تعذر تفعيل تحديث المحادثة الفوري.");
          }
        });
        inquiryChannels.set(order.id, channel);
      }
      const { data: inquiry, error } = await supabaseClient.rpc("get_professional_inquiry", {
        p_match_id: match.id
      });
      if (error) {
        console.error("Could not load professional inquiry details.", error);
        card.append(textElement("span", "record-status", "تعذر تحميل المحادثة والعرض."));
        return;
      }
      if (!inquiry) return;
      const conversation = document.createElement("section");
      conversation.className = "artisan-conversation";
      conversation.append(textElement("strong", "", "محادثة الطلب وعرض السعر"));
      if (inquiry.offer) {
        const offer = inquiry.offer;
        const base = Number(offer.service_base_amount);
        conversation.append(textElement(
          "p",
          "offer-breakdown",
          `السعر الأساسي: ${currencyFormatter.format(base)} ج.م - رسوم المنصة 10% (${currencyFormatter.format(base * 0.10)} ج.م) = صافي مستحقك: ${currencyFormatter.format(base * 0.90)} ج.م · إجمالي العميل: ${currencyFormatter.format(offer.total_amount)} ج.م · الوصول خلال ${offer.arrival_minutes} دقيقة`
        ));
        if (offer.note) conversation.append(textElement("p", "offer-note", offer.note));
        if (offer.status === "accepted") conversation.append(textElement("span", "record-status", "وافق العميل على هذا العرض."));
      }
      const messages = document.createElement("div");
      messages.className = "inquiry-messages";
      (inquiry.messages || []).forEach((message) => {
        messages.append(textElement(
          "p",
          message.sender_role === "professional" ? "inquiry-message is-customer" : "inquiry-message",
          `${message.sender_role === "professional" ? "أنت" : "العميل"}: ${message.message}`
        ));
      });
      conversation.append(messages);

      if (match.status === "matched" || match.status === "accepted") {
        const messageForm = document.createElement("form");
        messageForm.className = "inquiry-message-form";
        const messageInput = document.createElement("input");
        messageInput.name = "message";
        messageInput.required = true;
        messageInput.maxLength = 1500;
        messageInput.placeholder = "اكتب ردك بدون أرقام هاتف أو روابط";
        const sendButton = document.createElement("button");
        sendButton.type = "submit";
        sendButton.className = "button button-light button-small";
        sendButton.textContent = "إرسال";
        messageForm.append(messageInput, sendButton);
        messageForm.addEventListener("submit", async (event) => {
          event.preventDefault();
          const { error: sendError } = await supabaseClient.rpc("send_professional_inquiry_message", {
            p_match_id: match.id,
            p_message: messageInput.value.trim()
          });
          if (sendError) {
            console.error("Could not send professional inquiry message.", sendError);
            showToast(sendError.message || "أزل أرقام الهاتف والروابط من الرسالة ثم حاول مرة أخرى.");
            return;
          }
          await loadMatches();
        });
        conversation.append(messageForm);
      }

      if (match.status === "matched" && inquiry.status === "قيد المراجعة") {
        const offerForm = document.createElement("form");
        offerForm.className = "professional-offer-form";
        const priceInput = document.createElement("input");
        priceInput.type = "number";
        priceInput.name = "service_base_amount";
        priceInput.min = "0.01";
        priceInput.step = "0.01";
        priceInput.required = true;
        priceInput.placeholder = "السعر الأساسي بالجنيه";
        const etaInput = document.createElement("input");
        etaInput.type = "number";
        etaInput.name = "arrival_minutes";
        etaInput.min = "1";
        etaInput.max = "1440";
        etaInput.required = true;
        etaInput.placeholder = "وقت الوصول بالدقائق";
        const noteInput = document.createElement("input");
        noteInput.name = "note";
        noteInput.maxLength = 1500;
        noteInput.placeholder = "تفاصيل العرض (اختياري، بدون روابط أو أرقام)";
        if (inquiry.offer?.status === "pending") {
          priceInput.value = String(inquiry.offer.service_base_amount);
          etaInput.value = String(inquiry.offer.arrival_minutes);
          noteInput.value = inquiry.offer.note || "";
        }
        const offerButton = document.createElement("button");
        offerButton.type = "submit";
        offerButton.className = "button button-primary button-small";
        offerButton.textContent = inquiry.offer?.status === "pending" ? "تحديث عرض السعر" : "إرسال عرض السعر";
        offerForm.append(priceInput, etaInput, noteInput, offerButton);
        offerForm.addEventListener("submit", async (event) => {
          event.preventDefault();
          const values = new FormData(offerForm);
          const { error: offerError } = await supabaseClient.rpc("submit_service_price_offer", {
            p_match_id: match.id,
            p_service_base_amount: Number(values.get("service_base_amount")),
            p_arrival_minutes: Number(values.get("arrival_minutes")),
            p_note: String(values.get("note") || "")
          });
          if (offerError) {
            console.error("Could not submit the professional price offer.", offerError);
            showToast(offerError.message || "تعذر إرسال عرض السعر.");
            return;
          }
          showToast("تم إرسال عرض السعر ووقت الوصول للعميل.");
          await loadMatches();
        });
        conversation.append(offerForm);
      }
      card.append(conversation);
    }

    function subscribeToMatches() {
      if (matchesChannel) return;
      matchesChannel = supabaseClient.channel("artisan-service-order-matches")
        .on("postgres_changes", {
          event: "*",
          schema: "public",
          table: "service_order_matches"
        }, (payload) => {
          if (payload.eventType === "INSERT") showToast("وصلك طلب خدمة جديد مطابق لمنطقتك وتخصصك.");
          void loadMatches();
        })
        .on("postgres_changes", {
          event: "UPDATE",
          schema: "public",
          table: "service_orders"
        }, () => {
          void loadMatches();
        })
        .subscribe((status) => {
          if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            console.error("Real-time artisan order matching failed.", status);
            showToast("تعذر تفعيل التنبيهات الفورية للطلبات المطابقة.");
          }
        });
    }

    byId("artisan-login").addEventListener("click", async () => {
      if (!supabaseConfigured) {
        showToast("فعّل إعدادات Supabase لتسجيل الدخول.");
        return;
      }
      const phoneInput = byId("artisan-phone");
      const passwordInput = byId("artisan-password");
      phoneInput.setCustomValidity("");
      if (!phoneInput.reportValidity() || !passwordInput.reportValidity()) return;
      const phone = normalizeEgyptianMobile(phoneInput.value);
      if (!phone) {
        phoneInput.setCustomValidity("اكتب رقم موبايل مصري صحيحًا مثل 01012345678 أو +201012345678.");
        phoneInput.reportValidity();
        return;
      }
      phoneInput.setCustomValidity("");
      phoneInput.value = phone;
      let result;
      try {
        result = await signInWithPhone({
          phone,
          password: passwordInput.value
        });
      } catch (signInError) {
        result = { error: signInError };
      }
      if (result.error) {
        console.error("Could not sign in the artisan.", result.error);
        showToast(describePhoneLoginError(result.error, "تعذر تسجيل الدخول. تأكد من رقم الموبايل وكلمة المرور."));
        return;
      }
      const { data: claimed, error: claimError } = await supabaseClient.rpc("claim_professional_account");
      if (claimError) {
        console.error("Could not link the verified artisan account.", claimError);
        showToast("تعذر ربط الحساب الحرفي.");
        return;
      }
      if (!claimed) {
        const { error: signOutError } = await supabaseClient.auth.signOut();
        if (signOutError) console.error("Could not clear the unclaimed artisan session.", signOutError);
        showToast("لم نعثر على طلب حرفي معتمد بهذا الرقم.");
        return;
      }
      byId("artisan-login").hidden = true;
      byId("artisan-phone").closest("label").hidden = true;
      byId("artisan-password").closest("label").hidden = true;
      byId("artisan-forgot-password").hidden = true;
      byId("artisan-signout").hidden = false;
      const { data: presenceUpdated, error: presenceError } = await supabaseClient.rpc("set_professional_presence", { p_online: true });
      if (presenceError || !presenceUpdated) {
        console.error("Could not publish professional online status.", presenceError);
        showToast("تعذر تفعيل حالة التوفر. تحقق من تحديث قاعدة البيانات.");
      } else if (!presenceChannel) {
        presenceChannel = window.setInterval(() => {
          void supabaseClient.rpc("set_professional_presence", { p_online: true }).then(({ error }) => {
            if (error) console.error("Could not refresh professional online status.", error);
          });
        }, 30000);
      }
      subscribeToMatches();
      await loadMatches();
    });
    byId("artisan-phone").addEventListener("input", (event) => {
      event.currentTarget.setCustomValidity("");
    });
    byId("artisan-signout").addEventListener("click", async () => {
      if (presenceChannel) {
        window.clearInterval(presenceChannel);
        presenceChannel = null;
      }
      const { data: presenceCleared, error: presenceError } = await supabaseClient.rpc("set_professional_presence", { p_online: false });
      if (presenceError || !presenceCleared) console.error("Could not clear professional online status.", presenceError);
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        console.error("Could not sign out the artisan.", error);
        if (!presenceError) {
          const { error: restorePresenceError } = await supabaseClient.rpc("set_professional_presence", { p_online: true });
          if (restorePresenceError) console.error("Could not restore professional online status.", restorePresenceError);
          else {
            presenceChannel = window.setInterval(() => {
              void supabaseClient.rpc("set_professional_presence", { p_online: true }).then(({ error: refreshError }) => {
                if (refreshError) console.error("Could not refresh professional online status.", refreshError);
              });
            }, 30000);
          }
        }
        showToast("تعذر تسجيل الخروج.");
        return;
      }
      if (matchesChannel) {
        const status = await supabaseClient.removeChannel(matchesChannel);
        if (status === "error") console.error("Could not stop artisan order notifications.");
        matchesChannel = null;
      }
      const inquiryChannelStatuses = await Promise.all(
        [...inquiryChannels.values()].map((channel) => supabaseClient.removeChannel(channel))
      );
      if (inquiryChannelStatuses.some((status) => status === "error")) {
        console.error("Could not stop all artisan inquiry notifications.");
      }
      inquiryChannels.clear();
      byId("artisan-orders").hidden = true;
      byId("artisan-login").hidden = false;
      byId("artisan-phone").closest("label").hidden = false;
      byId("artisan-password").closest("label").hidden = false;
      byId("artisan-forgot-password").hidden = false;
      byId("artisan-signout").hidden = true;
      byId("artisan-login").textContent = "دخول";
      byId("artisan-phone").readOnly = false;
    });
  }

  function iconMark(icon, color) {
    const mark = document.createElement("span");
    mark.className = `trade-icon trade-${color}`;
    mark.textContent = icon;
    mark.setAttribute("aria-hidden", "true");
    return mark;
  }

  function renderTradeCards(list, container) {
    container.replaceChildren();
    list.forEach((trade) => {
      const card = document.createElement("article");
      card.className = "trade-card";
      card.dataset.tradeName = trade.name;
      const imageFrame = document.createElement("div");
      imageFrame.className = "trade-card-image";
      const image = document.createElement("img");
      image.src = `https://images.unsplash.com/${tradeImages[trade.name]}?auto=format&fit=crop&w=720&q=80`;
      image.alt = `${localized(trade.name)} — ${localized("صورة حرفي يعمل في هذه الخدمة")}`;
      image.loading = "lazy";
      image.addEventListener("error", () => { image.hidden = true; });
      imageFrame.append(image, iconMark(trade.icon, trade.color));
      const title = document.createElement("h3");
      title.textContent = localized(trade.name);
      const description = document.createElement("p");
      description.textContent = localized(trade.description);
      const count = document.createElement("span");
      count.className = "trade-count";
      count.textContent = `${trade.services.length} ${localized("خدمات")}`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "trade-open";
      button.dataset.openTrade = trade.name;
      button.setAttribute("aria-label", `${localized("عرض خدمات")} ${localized(trade.name)}`);
      button.textContent = "↗";
      const footer = document.createElement("div");
      footer.className = "trade-card-footer";
      footer.append(count, button);
      const body = document.createElement("div");
      body.className = "trade-card-body";
      body.append(title, description, footer);
      card.append(imageFrame, body);
      container.append(card);
    });
  }

  function showTradeDetails(name, serviceToRequest = "") {
    const trade = trades.find((item) => item.name === name);
    if (!trade) return;
    selectedTrade = trade.name;
    byId("details-title").textContent = localized(trade.name);
    byId("details-description").textContent = localized(trade.description);
    const list = byId("detail-task-list");
    list.replaceChildren();
    trade.services.forEach((service) => {
      const label = document.createElement("label");
      label.className = "detail-task";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = service;
      checkbox.checked = selectedServices.has(service) || service === serviceToRequest;
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) selectedServices.add(service);
        else selectedServices.delete(service);
      });
      const text = document.createElement("span");
      text.textContent = localized(service);
      label.append(checkbox, text);
      list.append(label);
    });
    byId("detail-request").textContent = localized("اطلب الخدمات المحددة ←");
    byId("details-dialog").showModal();
  }

  function renderRequestServices(tradeName, selected = []) {
    const trade = trades.find((item) => item.name === tradeName);
    const host = byId("request-service-options");
    host.replaceChildren();
    if (!trade) {
      host.textContent = localized("اختار الحرفة الأول");
      return;
    }
    trade.services.forEach((service) => {
      const label = document.createElement("label");
      label.className = "service-check";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "services";
      checkbox.value = service;
      checkbox.checked = selected.includes(service);
      const text = document.createElement("span");
      text.textContent = localized(service);
      label.append(checkbox, text);
      host.append(label);
    });
  }

  function filterTrades() {
    const term = byId("directory-search").value.trim().toLocaleLowerCase("ar");
    const selected = byId("trade-filter").value;
    const filtered = trades.filter((trade) => {
      const matchesCategory = !selected || trade.name === selected;
      const searchable = `${localized(trade.name)} ${localized(trade.description)} ${trade.services.map(localized).join(" ")} ${trade.name} ${trade.description} ${trade.services.join(" ")}`.toLocaleLowerCase();
      return matchesCategory && (!term || searchable.includes(term));
    });
    renderTradeCards(filtered, byId("directory-grid"));
    byId("empty-state").hidden = filtered.length > 0;
  }

  function renderRequests() {
    const orders = readStore(storageKeys.orders);
    const workers = readStore(storageKeys.workers);
    const messages = readStore(storageKeys.messages);
    const reviews = readStore(storageKeys.reviews);
    byId("order-count").textContent = String(orders.length);
    byId("worker-count").textContent = String(workers.filter((worker) => worker.status === "قيد المراجعة").length);
    byId("message-count").textContent = String(messages.length + reviews.length);
    renderRecordList("orders-list", orders, "order", "العميل");
    renderRecordList("workers-list", workers, "worker", "الحرفي");
    renderRecordList("messages-list", [...reviews.map((item) => ({ ...item, recordType: "review" })), ...messages.map((item) => ({ ...item, recordType: "message" }))], "message", "الرسالة");
    byId("account-orders").querySelector(".account-empty").hidden = orders.length > 0;
    byId("account-workers").querySelector(".account-empty").hidden = workers.length > 0;
    byId("account-messages").querySelector(".account-empty").hidden = messages.length + reviews.length > 0;
    updatePublicReviews();
  }

  function textElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text || "";
    return element;
  }

  function prepareIdImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("error", () => reject(new Error("Could not read the selected ID image.")));
      reader.addEventListener("load", () => {
        const image = new Image();
        image.addEventListener("error", () => reject(new Error("Could not decode the selected ID image.")));
        image.addEventListener("load", () => {
          const scale = Math.min(1, 1200 / Math.max(image.naturalWidth, image.naturalHeight));
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(image.naturalWidth * scale);
          canvas.height = Math.round(image.naturalHeight * scale);
          const context = canvas.getContext("2d");
          if (!context) {
            reject(new Error("Could not create an image preview canvas."));
            return;
          }
          try {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/jpeg", 0.75));
          } catch (error) {
            reject(error);
          }
        });
        image.src = String(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

  function renderRecordList(containerId, records, kind) {
    const container = byId(containerId);
    container.replaceChildren();
    records.forEach((record, index) => {
      const card = document.createElement("article");
      card.className = "admin-record";
      const info = document.createElement("div");
      info.className = "admin-record-info";
      const serviceLabel = Array.isArray(record.service) ? record.service.join("، ") : record.service;
      const heading = textElement("strong", "", `${record.name || "بدون اسم"} — ${record.trade || serviceLabel || record.type || "رسالة"}`);
      const detail = kind === "order"
        ? `${record.governorate}، ${record.area} — ${record.address} | ${record.phone}${record.proposedPrice != null ? ` | السعر المقترح: ${currencyFormatter.format(Number(record.proposedPrice))} ج.م` : ""}${record.details ? ` | ${record.details}` : ""}${record.matchedWorkers?.length ? ` | حرفي متاح: ${record.matchedWorkers.map((worker) => worker.name).join("، ")}` : ""}`
        : kind === "worker"
          ? `${record.governorate}، ${record.area} | ${record.phone} | الخبرة: ${record.experience}`
          : `${record.comment || record.message || ""}${record.rating ? ` | التقييم: ${"★".repeat(Number(record.rating))}` : ""}`;
      info.append(heading, textElement("span", "", detail));
      const status = textElement("span", "record-status", record.status || "بانتظار المراجعة");
      card.append(info, status);
      if (kind === "worker") {
        const recordId = record.id || String(index);
        card.append(actionButton("مراجعة البيانات", "review-worker", recordId, "button button-light button-small"));
      }
      if (kind === "message" && record.recordType === "review" && record.status !== "منشور") {
        card.append(actionButton("نشر التقييم", "publish-review", record.id, "button button-primary button-small"));
        card.append(actionButton("رفض", "reject-review", record.id, "button button-light button-small"));
      }
      container.append(card);
    });
  }

  function normalizeLocation(value) {
    return String(value || "")
      .trim()
      .toLocaleLowerCase("ar")
      .replace(/[أإآ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/\s+/g, " ");
  }

  function calculateDistanceMeters(latitudeOne, longitudeOne, latitudeTwo, longitudeTwo) {
    const radians = (degrees) => degrees * Math.PI / 180;
    const latitudeDelta = radians(latitudeTwo - latitudeOne);
    const longitudeDelta = radians(longitudeTwo - longitudeOne);
    const haversine = Math.sin(latitudeDelta / 2) ** 2
      + Math.cos(radians(latitudeOne)) * Math.cos(radians(latitudeTwo))
      * Math.sin(longitudeDelta / 2) ** 2;
    return 2 * 6371000 * Math.asin(Math.sqrt(Math.min(1, haversine)));
  }

  function findAvailableWorkers(trade, governorate, area, latitude, longitude, radiusMeters) {
    const targetGovernorate = normalizeLocation(governorate);
    const targetArea = normalizeLocation(area);
    return readStore(storageKeys.workers)
      .filter((worker) =>
        worker.status === "مقبول"
        && worker.trade === trade
        && (
          latitude !== null && longitude !== null
          && worker.locationLatitude != null && worker.locationLongitude != null
            ? calculateDistanceMeters(
              latitude,
              longitude,
              Number(worker.locationLatitude),
              Number(worker.locationLongitude)
            ) <= radiusMeters
            : normalizeLocation(worker.governorate) === targetGovernorate
              && normalizeLocation(worker.area) === targetArea
        )
      )
      .map(({ id, name, trade: workerTrade }) => ({ id, name, trade: workerTrade }));
  }

  async function findRemoteAvailableWorkers(trackingToken) {
    const { data, error } = await supabaseClient.rpc("get_available_professionals_for_order", {
      p_tracking_token: trackingToken
    });
    if (error) {
      console.error("Could not find approved professionals in Supabase.", error);
      return null;
    }
    return (data || []).map(({ id, name, trade }) => ({ id, name, trade }));
  }

  function showAvailabilityResult(workers, order) {
    const dialog = byId("availability-dialog");
    const heading = byId("availability-title");
    const description = byId("availability-description");
    const list = byId("availability-workers");
    list.replaceChildren();

    heading.textContent = localized(order.existingOrder
      ? "تفاصيل الطلب والمحادثة"
      : workers.length
        ? "في حرفي متصل قريب منك"
        : "تم إرسال طلبك للحرفيين المطابقين");
    description.textContent = localized(order.existingOrder
      ? "تابع حالة طلبك وتحدث مباشرةً مع الحرفيين المهتمين."
      : workers.length
      ? "لقينا حرفيين معتمدين ومتصلين في منطقتك. ستظهر عروض الأسعار ووقت الوصول هنا، وتظهر بيانات التواصل بعد تأكيد الحجز."
      : "تم تسجيل طلبك وسيظهر للحرفيين المعتمدين في منطقتك عند اتصالهم.");
    byId("request-live-status").textContent = "سيتم تحديث عروض الأسعار والمحادثة ووقت الوصول تلقائيًا.";
    if (order.trackingToken) void subscribeToOrderTracking(order.trackingToken);
    if (order.trackingToken) {
      writeStore(storageKeys.trackingToken, order.trackingToken);
      byId("track-order-button").hidden = false;
      void refreshCustomerOrderTracking(order.trackingToken, order);
    }

    workers.forEach((worker) => {
      const card = document.createElement("article");
      card.className = "availability-worker";
      const info = document.createElement("div");
      info.append(
        textElement("strong", "", worker.name),
        textElement("span", "", localized(worker.trade))
      );
      card.append(info, textElement("span", "record-status", localized("بيانات التواصل تظهر بعد تأكيد الحجز.")));
      list.append(card);
    });

    dialog.showModal();
  }

  function showWorkerReview(worker) {
    const dialog = byId("worker-review-dialog");
    byId("worker-review-title").textContent = localized("مراجعة بيانات الحرفي");
    const fields = byId("worker-review-fields");
    fields.replaceChildren();
    [
      ["الاسم", worker.name],
      ["رقم الموبايل", worker.phone],
      ["الحرفة / التخصص", localized(worker.trade)],
      ["سنين الخبرة", worker.experience],
      ["المحافظة", localized(worker.governorate)],
      ["المنطقة", localized(worker.area)],
      ["العنوان بالتفصيل", worker.address],
      ["صور معرض الأعمال", (worker.portfolioFiles || []).join("، ")],
      ["طريقة استلام الأرباح", worker.payoutMethod || ""],
      ["تاريخ التقديم", worker.createdAt ? new Date(worker.createdAt).toLocaleString(document.documentElement.lang === "en" ? "en" : "ar-EG") : ""]
    ].forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "worker-review-field";
      row.append(textElement("dt", "", localized(label)), textElement("dd", "", value || "—"));
      fields.append(row);
    });

    const image = byId("worker-review-image");
    const imageNote = byId("worker-review-image-note");
    const validImage = typeof worker.idImage === "string" && /^data:image\/(?:jpeg|png|webp);base64,/.test(worker.idImage);
    image.hidden = !validImage;
    imageNote.hidden = validImage;
    imageNote.textContent = validImage
      ? ""
      : `${localized("صورة البطاقة غير متاحة في هذا الطلب القديم.")}${worker.idFile ? ` ${localized("الملف المرفق")}: ${worker.idFile}` : ""}`;
    if (validImage) image.src = worker.idImage;
    else image.removeAttribute("src");

    const approveButton = byId("worker-review-approve");
    approveButton.dataset.recordId = worker.id || String(readStore(storageKeys.workers).indexOf(worker));
    approveButton.hidden = worker.status === "مقبول";
    approveButton.textContent = localized("اقبل الحرفي بعد المراجعة");
    dialog.showModal();
  }

  function actionButton(label, action, id, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.dataset.action = action;
    button.dataset.recordId = id;
    button.textContent = label;
    return button;
  }

  function updatePublicReviews() {
    const published = readStore(storageKeys.reviews).filter((review) => review.status === "منشور");
    byId("review-count").textContent = String(published.length);
    const container = byId("published-reviews");
    container.replaceChildren();
    published.slice(-3).reverse().forEach((review) => {
      const card = document.createElement("article");
      card.className = "public-review";
      card.append(textElement("strong", "", review.name));
      card.append(textElement("span", "summary-stars", `${"★".repeat(Number(review.rating))}${"☆".repeat(5 - Number(review.rating))}`));
      card.append(textElement("p", "", review.comment));
      container.append(card);
    });
  }

  function renderDashboard() {
    renderRequests();
    const support = supportPhone;
    byId("support-number-label").textContent = support;
    byId("footer-support-number").textContent = support;
    byId("support-call").href = `https://wa.me/${support.replace(/\D/g, "").replace(/^0/, "20")}`;
    byId("support-call").target = "_blank";
    byId("support-call").rel = "noopener noreferrer";
    byId("support-settings").elements.phone.value = support;
  }

  function saveMessage(form, typeOverride) {
    const data = new FormData(form);
    const messages = readStore(storageKeys.messages);
    messages.unshift({
      id: crypto.randomUUID(),
      type: typeOverride || data.get("type"),
      name: data.get("name") || "بدون اسم",
      message: data.get("message"),
      createdAt: new Date().toISOString(),
      status: "وصلت لصاحب الموقع"
    });
    if (!writeStore(storageKeys.messages, messages)) return false;
    form.reset();
    renderDashboard();
    showToast(typeOverride === "rating" ? "تقييمك وصل لصاحب الموقع للمراجعة قبل النشر." : "رسالتك وصلت لصاحب الموقع.");
    return true;
  }

  function updatePaymentInstructions() {
    const method = byId("payment-method").value;
    byId("cash-payment-fields").hidden = method !== "cash";
    byId("cash-location-details").required = method === "cash";
    if (method === "instapay" || method === "vodafone_cash") {
      byId("payment-recipient").textContent = localized("سيظهر رقم التحويل بعد تأكيد الحجز.");
      byId("deposit-note").textContent = "يظهر مبلغ العربون 50% بعد اعتماد السعر، ويمكنك دفعه من نافذة متابعة الطلب.";
    } else if (method === "cash") {
      byId("payment-recipient").textContent = "الدفع النقدي يحتاج مراجعة استلام العربون من الإدارة.";
      byId("deposit-note").textContent = "سيظل الطلب بانتظار تأكيد استلام العربون النقدي قبل بدء التنفيذ.";
    } else {
      byId("payment-recipient").textContent = "";
      byId("deposit-note").textContent = "يظهر مبلغ العربون 50% بعد اعتماد السعر، ويمكنك دفعه من نافذة متابعة الطلب.";
    }
  }

  function paymentRecipient(method, order) {
    if (order?.payout_method === method && order.payout_account) return order.payout_account;
    return paymentAccounts[method] || paymentPhone;
  }

  let refreshOnlineProfessionalsView = () => {};

  function setupOnlineProfessionals() {
    const section = document.createElement("section");
    section.className = "section-wrap online-professionals";
    section.innerHTML = '<div class="section-heading"><div><div class="eyebrow">الحرفيون المتاحون</div><h2>حرفيون جاهزون <span>في منطقتك.</span></h2></div><label class="online-professional-filter">المحافظة / المنطقة<select id="online-professional-area"><option value="">كل المناطق</option></select></label></div><div class="online-professional-list" id="online-professional-list"></div><p class="online-professional-empty" id="online-professional-empty">لا يوجد حرفيون متصلون حاليًا.</p>';
    const home = byId("page-home");
    home.querySelector(".review-section").before(section);
    const areaFilter = byId("online-professional-area");
    const emptyMessage = byId("online-professional-empty");
    let availableProfessionals = [];

    const renderAvailableProfessionals = () => {
      const selectedArea = areaFilter.value;
      const areaOptions = [...new Map(availableProfessionals.map((professional) => {
        const key = JSON.stringify([professional.governorate || "", professional.area || ""]);
        const label = [professional.governorate, professional.area].filter(Boolean).map(localized).join("، ");
        return [key, { key, label }];
      })).values()].sort((first, second) => first.label.localeCompare(second.label, "ar"));
      areaFilter.replaceChildren(new Option(localized("كل المناطق"), ""));
      areaOptions.forEach(({ key, label }) => areaFilter.add(new Option(label, key)));
      if (areaOptions.some(({ key }) => key === selectedArea)) areaFilter.value = selectedArea;

      const filtered = areaFilter.value
        ? availableProfessionals.filter((professional) =>
          JSON.stringify([professional.governorate || "", professional.area || ""]) === areaFilter.value
        )
        : availableProfessionals;
      const host = byId("online-professional-list");
      host.replaceChildren();
      emptyMessage.hidden = filtered.length > 0;
      emptyMessage.textContent = availableProfessionals.length && areaFilter.value
        ? localized("لا يوجد حرفيون متاحون في المنطقة المختارة.")
        : localized("لا يوجد حرفيون متصلون حاليًا.");
      filtered.forEach((professional) => {
        const card = document.createElement("article");
        card.className = "online-professional-card";
        const title = document.createElement("strong");
        title.textContent = professional.name;
        const status = document.createElement("span");
        status.className = "online-status";
        status.textContent = localized("متصل ومتاح");
        const details = document.createElement("small");
        details.textContent = `${localized(professional.trade)} · ${[professional.governorate, professional.area].filter(Boolean).map(localized).join("، ")}`;
        card.append(title, status, details);
        host.append(card);
      });
    };
    areaFilter.addEventListener("change", renderAvailableProfessionals);
    refreshOnlineProfessionalsView = renderAvailableProfessionals;

    if (!supabaseConfigured) {
      renderAvailableProfessionals();
      return;
    }

    const renderOnlineProfessionals = async () => {
      const { data, error } = await supabaseClient.from("available_professionals")
        .select("id, name, trade, governorate, area")
        .order("name");
      if (error) {
        console.error("Could not load online professionals.", error);
        emptyMessage.textContent = "تعذر تحميل الحرفيين المتصلين.";
        emptyMessage.hidden = false;
        return;
      }
      availableProfessionals = data || [];
      renderAvailableProfessionals();
    };
    const onlineChannel = supabaseClient.channel("approved-professionals-online")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "professionals"
      }, () => void renderOnlineProfessionals())
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error("Online professional status updates could not be subscribed to.", status);
          showToast("تعذر تفعيل تحديث حالة الحرفيين المتصلين.");
        }
      });
    window.setInterval(() => void renderOnlineProfessionals(), 30000);
    document.addEventListener("pagehide", () => {
      if (onlineChannel) void supabaseClient.removeChannel(onlineChannel);
    }, { once: true });
    void renderOnlineProfessionals();
  }

  let paymentAccounts = { instapay: paymentPhone, vodafone_cash: paymentPhone };
  let activeTrackingChannel = null;
  let activeInquiryChannel = null;
  let activeInquiryOrderId = "";
  let currentTrackingToken = "";
  let currentTrackingOrder = null;

  async function loadPaymentAccounts() {
    if (!supabaseConfigured) return;
    const { data, error } = await supabaseClient.from("site_settings")
      .select("value")
      .eq("key", "payment_accounts")
      .maybeSingle();
    if (error) {
      console.error("Could not load payment recipient numbers.", error);
      showToast("تعذر تحميل بيانات الدفع؛ سيتم عرض الرقم الافتراضي.");
      return;
    }
    paymentAccounts = {
      instapay: data?.value?.instapay || paymentPhone,
      vodafone_cash: data?.value?.vodafone_cash || paymentPhone
    };
    updatePaymentInstructions();
  }

  async function subscribeToOrderTracking(trackingToken) {
    if (!supabaseConfigured || !trackingToken) return;
    if (activeTrackingChannel) {
      const status = await supabaseClient.removeChannel(activeTrackingChannel);
      if (status === "error") console.error("Could not close the previous order tracking channel.");
    }
    let isSubscribed = false;
    activeTrackingChannel = supabaseClient.channel(`order-tracking:${trackingToken}`, {
      config: { private: false }
    }).on("broadcast", { event: "order_updated" }, ({ payload }) => {
      if (payload?.status) renderTrackingUpdate(payload);
      if (payload?.status === "الحرفي في الطريق") {
        showToast(localized("الحرفي بدأ التحرك إليك. رسوم المنصة 10% محسوبة ضمن إجمالي الطلب بالفعل؛ لا تدفع رسومًا إضافية."));
      }
      if (payload?.payment_status === "deposit_confirmed") {
        showToast(localized("تم تأكيد عربونك بنجاح"));
      }
      void refreshCustomerOrderTracking(trackingToken);
    }).subscribe((status) => {
      if (status === "SUBSCRIBED" && !isSubscribed) {
        isSubscribed = true;
        supabaseClient.rpc("get_order_tracking", { p_tracking_token: trackingToken }).then(({ data, error }) => {
          if (error) {
            console.error("Could not load the current order tracking status.", error);
            return;
          }
          if (data) renderTrackingUpdate(data);
        });
      }
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error("The real-time order tracking channel failed.", status);
        showToast("تعذر تفعيل التحديث الفوري للطلب.");
      }
    });
  }

  async function subscribeToServiceInquiry(orderId, trackingToken) {
    if (!orderId || !trackingToken || activeInquiryOrderId === orderId) return;
    if (activeInquiryChannel) {
      const status = await supabaseClient.removeChannel(activeInquiryChannel);
      if (status === "error") console.error("Could not close the previous inquiry channel.");
    }
    activeInquiryOrderId = orderId;
    activeInquiryChannel = supabaseClient.channel(`service-inquiry:${orderId}`, {
      config: { private: false }
    }).on("broadcast", { event: "inquiry_updated" }, ({ payload }) => {
      if (payload?.order_id === orderId) void refreshCustomerInquiry(trackingToken);
    }).subscribe((status) => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error("The real-time inquiry channel failed.", status);
        showToast("تعذر تفعيل تحديث المحادثة الفوري.");
      }
    });
  }

  async function refreshCustomerInquiry(trackingToken) {
    if (!supabaseConfigured || !trackingToken) return;
    const { data, error } = await supabaseClient.rpc("get_service_inquiry", {
      p_tracking_token: trackingToken
    });
    if (error) {
      console.error("Could not load service inquiry messages and offers.", error);
      byId("customer-inquiry").hidden = false;
      byId("customer-inquiry").textContent = "تعذر تحميل المحادثة والعروض. حاول تحديث متابعة الطلب.";
      return;
    }
    if (!data) return;
    await subscribeToServiceInquiry(data.order_id, trackingToken);
    renderCustomerInquiry(data, trackingToken);
  }

  async function loadCustomerOrders() {
    const host = byId("customer-orders-list");
    host.replaceChildren();
    if (!supabaseConfigured || !supabaseClient) {
      host.append(textElement("p", "customer-orders-empty", localized("تحتاج قائمة طلباتك إلى تسجيل الدخول وإعداد Supabase.")));
      return;
    }
    const { data: result, error } = await supabaseClient.rpc("get_customer_orders");
    if (error) {
      console.error("Could not load the signed-in customer's service orders.", error);
      host.append(textElement("p", "customer-orders-empty", error.message || localized("تعذر تحميل طلباتك. تأكد من تحديث قاعدة البيانات.")));
      return;
    }
    const orders = Array.isArray(result) ? result : [];
    if (!orders.length) {
      const empty = document.createElement("div");
      empty.className = "customer-orders-empty";
      const requestButton = document.createElement("button");
      requestButton.type = "button";
      requestButton.className = "button button-primary";
      requestButton.textContent = localized("اطلب خدمة");
      requestButton.addEventListener("click", () => navigate("request"));
      empty.append(      textElement("p", "", localized("لا توجد طلبات مرتبطة بهذا الحساب حتى الآن.")), requestButton);
      host.append(empty);
      return;
    }
    orders.forEach((order) => {
      const card = document.createElement("article");
      card.className = "customer-order-card";
      const services = Array.isArray(order.services) ? order.services.join("، ") : "";
      const details = [order.governorate, order.area].filter(Boolean).join("، ");
      const title = textElement("strong", "", `${order.trade || "طلب خدمة"}${services ? ` — ${services}` : ""}`);
      const description = textElement("p", "", `${details}${order.address ? ` · ${order.address}` : ""}${order.created_at ? ` · ${new Date(order.created_at).toLocaleDateString("ar-EG")}` : ""}`);
      card.append(title, description, textElement("span", "record-status", localized(order.status || "قيد المراجعة")));
      if (order.total_amount != null) {
        card.append(textElement(
          "p",
          "customer-order-total",
          `${localized("إجمالي العميل:")} ${currencyFormatter.format(Number(order.total_amount))} ج.م`
        ));
      }
      const openChat = document.createElement("button");
      openChat.type = "button";
      openChat.className = "button button-primary button-small";
      openChat.textContent = localized("افتح المحادثة المباشرة");
      openChat.disabled = !order.tracking_token;
      openChat.addEventListener("click", () => {
        showAvailabilityResult([], {
          trackingToken: order.tracking_token,
          existingOrder: true
        });
      });
      card.append(openChat);
      host.append(card);
    });
  }

  async function openCustomerOrders() {
    if (!supabaseConfigured || !supabaseClient) {
      showToast(localized("قائمة طلبات الحساب تحتاج إعداد Supabase."));
      return;
    }
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) {
      console.error("Could not check the customer session before opening orders.", error);
      showToast(localized("تعذر التحقق من الحساب. حاول تسجيل الدخول مرة أخرى."));
      return;
    }
    if (!data.session) {
      pendingOrdersOpen = true;
      document.querySelector('[data-auth="login"]').click();
      return;
    }
    navigate("orders");
    await loadCustomerOrders();
  }

  function renderCustomerInquiry(inquiry, trackingToken) {
    const host = byId("customer-inquiry");
    host.replaceChildren();
    host.hidden = false;
    host.append(textElement("h4", "", "استفسار الطلب والعروض"));
    if (!inquiry.matches?.length) {
      host.append(textElement("p", "inquiry-empty", "سيظهر الحرفيون المطابقون لمنطقتك هنا."));
      return;
    }
    inquiry.matches.forEach((match) => {
      const card = document.createElement("article");
      card.className = "inquiry-card";
      card.append(textElement("strong", "", match.professional_name));
      const offer = match.offer;
      if (offer) {
        const total = Number(offer.total_amount);
        const base = Number(offer.service_base_amount);
        const fee = Number(offer.customer_service_fee);
        card.append(
          textElement("p", "offer-breakdown", `سعر الخدمة: ${currencyFormatter.format(base)} ج.م + رسوم المنصة 10% (${currencyFormatter.format(fee)} ج.م) = الإجمالي: ${currencyFormatter.format(total)} ج.م`),
          textElement("p", "offer-eta", `الوصول المتوقع خلال ${offer.arrival_minutes} دقيقة`)
        );
        if (offer.note) card.append(textElement("p", "offer-note", offer.note));
        if (offer.status === "pending" && match.match_status === "matched" && inquiry.status === "قيد المراجعة") {
          const accept = document.createElement("button");
          accept.type = "button";
          accept.className = "button button-primary";
          accept.textContent = "موافقة على العرض وتأكيد الحجز";
          accept.addEventListener("click", async () => {
            const { error } = await supabaseClient.rpc("accept_service_price_offer", {
              p_tracking_token: trackingToken,
              p_offer_id: offer.id
            });
            if (error) {
              console.error("Could not accept the service price offer.", error);
              showToast(error.message || "تعذر تأكيد العرض.");
              return;
            }
            showToast("تم قبول العرض وتأكيد الحجز.");
            await refreshCustomerOrderTracking(trackingToken);
          });
          card.append(accept);
        } else if (offer.status === "accepted") {
          card.append(textElement("span", "record-status", "تم قبول العرض وتأكيد الحجز."));
        }
      } else {
        card.append(textElement("p", "inquiry-empty", "لم يصل عرض سعر بعد."));
      }

      const messages = document.createElement("div");
      messages.className = "inquiry-messages";
      (match.messages || []).forEach((message) => {
        messages.append(textElement(
          "p",
          message.sender_role === "customer" ? "inquiry-message is-customer" : "inquiry-message",
          `${message.sender_role === "customer" ? "أنت" : match.professional_name}: ${message.message}`
        ));
      });
      card.append(messages);
      if (match.match_status === "matched" || match.match_status === "accepted") {
        const form = document.createElement("form");
        form.className = "inquiry-message-form";
        const input = document.createElement("input");
        input.name = "message";
        input.required = true;
        input.maxLength = 1500;
        input.placeholder = "اكتب استفسارك بدون أرقام هاتف أو روابط";
        const button = document.createElement("button");
        button.type = "submit";
        button.className = "button button-light button-small";
        button.textContent = "إرسال";
        form.append(input, button);
        form.addEventListener("submit", async (event) => {
          event.preventDefault();
          const { error } = await supabaseClient.rpc("send_customer_inquiry_message", {
            p_tracking_token: trackingToken,
            p_match_id: match.match_id,
            p_message: input.value.trim()
          });
          if (error) {
            console.error("Could not send customer inquiry message.", error);
            showToast(error.message || "أزل أرقام الهاتف والروابط من الرسالة ثم حاول مرة أخرى.");
            return;
          }
          await refreshCustomerInquiry(trackingToken);
        });
        card.append(form);
      }
      host.append(card);
    });
  }

  function renderTrackingUpdate(payload) {
    const eta = payload?.estimated_arrival_minutes;
    const status = payload?.status || "قيد المراجعة";
    if (status === "الحرفي في الطريق") {
      byId("request-live-status").textContent = localized("الحرفي بدأ التحرك إليك. رسوم المنصة 10% محسوبة ضمن إجمالي الطلب بالفعل؛ لا تدفع رسومًا إضافية.");
      return;
    }
    byId("request-live-status").textContent = payload?.payment_status === "deposit_confirmed"
      ? localized("تم تأكيد عربونك بنجاح")
      : document.documentElement.lang === "en"
      ? eta
        ? `Order accepted — estimated arrival in ${eta} minutes.`
        : `Order status: ${localized(status)}`
      : eta
        ? `تم قبول طلبك — وقت الوصول المتوقع خلال ${eta} دقيقة.`
        : `حالة الطلب: ${status}`;
  }

  async function refreshCustomerOrderTracking(trackingToken, fallbackOrder = null) {
    currentTrackingToken = trackingToken;
    if (!supabaseConfigured) {
      currentTrackingOrder = fallbackOrder;
      byId("customer-tracking-status").textContent = fallbackOrder?.status || "تم حفظ الطلب محليًا؛ التحديثات الفورية تحتاج إعداد Supabase.";
      byId("customer-tracking-amounts").textContent = "يتم تحديد السعر ونصفه كعربون ونصفه المتبقي بعد مراجعة الطلب.";
      byId("customer-inquiry").hidden = true;
      byId("final-payment-form").hidden = true;
      return;
    }

    const { data, error } = await supabaseClient.rpc("get_order_tracking", {
      p_tracking_token: trackingToken
    });
    if (error) {
      console.error("Could not load customer order tracking.", error);
      byId("customer-tracking-status").textContent = "تعذر تحميل حالة الطلب حاليًا.";
      return;
    }
    if (!data) {
      byId("customer-tracking-status").textContent = "لم يتم العثور على الطلب.";
      return;
    }
    currentTrackingOrder = data;
    renderTrackingUpdate(data);
    byId("customer-tracking-status").textContent = data.status === "الحرفي في الطريق"
      ? localized("الحرفي بدأ التحرك إليك. رسوم المنصة 10% محسوبة ضمن إجمالي الطلب بالفعل؛ لا تدفع رسومًا إضافية.")
      : data.payment_status === "deposit_confirmed"
      ? localized("تم تأكيد عربونك بنجاح")
      : data.status;
    void refreshCustomerInquiry(trackingToken);
    const professionalContact = byId("customer-professional-contact");
    professionalContact.replaceChildren();
    if (data.professional_phone && data.status !== "قيد المراجعة") {
      const phone = String(data.professional_phone).replace(/[^\d+]/g, "");
      const call = document.createElement("a");
      call.href = `tel:${phone}`;
      call.textContent = `${localized("رقم الحرفي بعد تأكيد الحجز")}: ${data.professional_phone}`;
      professionalContact.append(call);
      professionalContact.hidden = !phone;
    } else {
      professionalContact.hidden = true;
    }
    byId("customer-tracking-amounts").textContent = data.total_amount == null
      ? "بانتظار عروض الأسعار. سيظهر السعر الأساسي ورسوم المنصة 10% والإجمالي قبل تأكيد الحجز."
      : `سعر الخدمة: ${currencyFormatter.format(data.service_base_amount)} ج.م + رسوم المنصة 10% (${currencyFormatter.format(data.customer_service_fee)} ج.م) = الإجمالي: ${currencyFormatter.format(data.total_amount)} ج.م · العربون 50%: ${currencyFormatter.format(data.deposit_amount)} ج.م · المتبقي: ${currencyFormatter.format(data.remaining_amount)} ج.م`;
    const depositForm = byId("deposit-payment-form");
    const canSubmitDeposit = Boolean(data.professional_phone)
      && data.total_amount != null
      && data.deposit_status === "غير مدفوع"
      && ["instapay", "vodafone_cash"].includes(data.payment_method);
    depositForm.hidden = !canSubmitDeposit;
    if (canSubmitDeposit) {
      const methodName = data.payment_method === "instapay" ? "InstaPay" : "Vodafone Cash";
      depositForm.querySelector(".payment-recipient").textContent =
        `حوّل العربون (${currencyFormatter.format(data.deposit_amount)} ج.م) عبر ${methodName}: ${paymentRecipient(data.payment_method, data)}`;
    } else if (data.deposit_status === "بانتظار المراجعة") {
      byId("customer-tracking-status").textContent = "تم استلام بيانات العربون، وهو بانتظار مراجعة الإدارة.";
    }
    const canConfirm = data.status === "بانتظار تأكيد العميل"
      && data.deposit_status === "تم الدفع"
      && data.total_amount != null;
    byId("final-payment-form").hidden = !canConfirm;
    if (canConfirm) {
      const method = data.payment_method;
      const recipient = byId("final-payment-form").querySelector(".payment-recipient");
      recipient.textContent = method === "cash"
        ? "سجّل دفع المبلغ المتبقي نقدًا، ثم أكّد الاستلام."
        : `المتبقي عبر ${method === "instapay" ? "InstaPay" : "Vodafone Cash"}: ${paymentRecipient(method, data)}`;
      updateFinalPaymentRequirement();
    } else {
      byId("final-payment-form").reset();
      byId("final-payment-receipt").required = false;
    }
  }

  async function submitOrderDeposit(event) {
    event.preventDefault();
    if (!currentTrackingToken || !currentTrackingOrder?.total_amount) return;
    const receiptFile = byId("deposit-payment-receipt").files[0];
    const transactionId = byId("deposit-transaction-id").value.trim();
    if (!receiptFile && !transactionId) {
      showToast("ارفع إيصال العربون أو أدخل رقم المعاملة.");
      return;
    }
    const receiptPath = await uploadOrderReceipt(receiptFile || null, currentTrackingToken, "deposit");
    if (receiptPath === null) return;
    const { error } = await supabaseClient.rpc("submit_order_deposit", {
      p_tracking_token: currentTrackingToken,
      p_receipt_path: receiptPath || null,
      p_transaction_id: transactionId || null
    });
    if (error) {
      console.error("Could not submit the order deposit proof.", error);
      showToast(error.message || "تعذر إرسال إثبات العربون.");
      return;
    }
    showToast("تم استلام إثبات العربون، وهو بانتظار مراجعة الإدارة.");
    await refreshCustomerOrderTracking(currentTrackingToken);
  }

  async function confirmFinalPayment(event) {
    event.preventDefault();
    if (!currentTrackingToken || !currentTrackingOrder) return;
    const receiptFile = byId("final-payment-receipt").files[0];
    const transactionId = byId("final-transaction-id").value.trim();
    const digital = currentTrackingOrder.payment_method !== "cash";
    if (digital && !receiptFile && !transactionId) {
      showToast("ارفع إيصال الدفعة المتبقية أو أدخل رقم المعاملة.");
      return;
    }
    const receiptPath = await uploadOrderReceipt(
      receiptFile || null,
      currentTrackingToken,
      "final"
    );
    if (receiptPath === null) return;
    if (!supabaseConfigured) {
      showToast("يحتاج تأكيد الدفعة النهائية إلى اتصال Supabase.");
      return;
    }
    const { error } = await supabaseClient.rpc("confirm_order_delivery", {
      p_tracking_token: currentTrackingToken,
      p_final_receipt_path: receiptPath || null,
      p_final_transaction_id: transactionId || null
    });
    if (error) {
      console.error("Could not confirm final payment and service delivery.", error);
      showToast(error.message || "تعذر تأكيد استلام الخدمة.");
      return;
    }
    showToast("تم تأكيد استلام الخدمة وتسجيل الدفعة النهائية.");
    await refreshCustomerOrderTracking(currentTrackingToken);
  }

  function fileExtension(file) {
    if (file.type === "image/png") return "png";
    if (file.type === "image/webp") return "webp";
    if (file.type === "application/pdf") return "pdf";
    return "jpg";
  }

  async function uploadOrderReceipt(file, trackingToken, stage = "deposit") {
    if (!file) return "";
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      showToast("الإيصال يجب أن يكون صورة أو PDF بحجم لا يتجاوز 5 ميجابايت.");
      return null;
    }
    if (!supabaseConfigured) return file.name;
    const path = `${trackingToken}/${stage}/${crypto.randomUUID()}.${fileExtension(file)}`;
    const { error } = await supabaseClient.storage.from("payment-receipts")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      console.error("Could not upload the payment receipt.", error);
      showToast("تعذر رفع إيصال الدفع. حاول مرة أخرى.");
      return null;
    }
    return path;
  }

  async function uploadPortfolioFiles(files, professionalId) {
    if (!files.length) return [];
    if (files.length > 5 || files.some((file) =>
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
      || file.size > 5 * 1024 * 1024
    )) {
      showToast("معرض الأعمال يقبل حتى 5 صور JPG أو PNG أو WebP، بحد أقصى 5 ميجابايت للصورة.");
      return null;
    }
    if (!supabaseConfigured) return [];
    const paths = [];
    for (const file of files) {
      const path = `${professionalId}/${crypto.randomUUID()}.${fileExtension(file)}`;
      const { error } = await supabaseClient.storage.from("professional-portfolio")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) {
        console.error("Could not upload a professional portfolio image.", error);
        showToast("تعذر رفع صور معرض الأعمال. حاول مرة أخرى.");
        return null;
      }
      paths.push(path);
    }
    return paths;
  }

  document.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const closeDialog = target.closest("[data-dialog-close]");
    if (closeDialog) {
      closeDialog.closest("dialog").close();
      return;
    }
    const pageLink = target.closest("[data-page-link]");
    if (pageLink) {
      event.preventDefault();
      if (pageLink.dataset.pageLink === "orders") {
        await openCustomerOrders();
        return;
      }
      if (pageLink.dataset.pageLink === "account") {
        navigate("home");
        window.setTimeout(() => document.querySelector(".suggestion-section").scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        return;
      }
      navigate(pageLink.dataset.pageLink);
      return;
    }
    const openTrade = target.closest("[data-open-trade]");
    if (openTrade) {
      selectedServices = new Set();
      showTradeDetails(openTrade.dataset.openTrade);
      return;
    }
    const tab = target.closest("[data-account-tab]");
    if (tab) {
      document.querySelectorAll(".account-tab").forEach((button) => button.classList.toggle("is-selected", button === tab));
      document.querySelectorAll(".account-panel").forEach((panel) => { panel.hidden = panel.id !== `account-${tab.dataset.accountTab}`; });
      return;
    }
    const rating = target.closest("[data-rating]");
    if (rating) {
      selectedRating = Number(rating.dataset.rating);
      byId("rating-value").value = String(selectedRating);
      document.querySelectorAll("[data-rating]").forEach((button) => button.classList.toggle("is-selected", Number(button.dataset.rating) <= selectedRating));
      return;
    }
    const action = target.closest("[data-action]");
    if (action) handleAdminAction(action);
  });

  function handleAdminAction(button) {
    if (button.dataset.action === "review-worker") {
      const workers = readStore(storageKeys.workers);
      const worker = workers.find((item) => item.id === button.dataset.recordId)
        || workers[Number(button.dataset.recordId)];
      if (worker) showWorkerReview(worker);
      return;
    }
    if (button.dataset.action === "approve-worker") {
      const workers = readStore(storageKeys.workers);
      const worker = workers.find((item) => item.id === button.dataset.recordId)
        || workers[Number(button.dataset.recordId)];
      if (!worker) return;
      worker.status = "مقبول";
      if (!writeStore(storageKeys.workers, workers)) return;
      byId("worker-review-dialog").close();
      renderDashboard();
      showToast("تم اعتماد الحرفي. تقدر تعرضه للزوار بعد ربط النظام بخادم.");
    }
    if (button.dataset.action === "publish-review" || button.dataset.action === "reject-review") {
      const reviews = readStore(storageKeys.reviews);
      const review = reviews.find((item) => item.id === button.dataset.recordId);
      if (!review) return;
      if (button.dataset.action === "publish-review") review.status = "منشور";
      else review.status = "مرفوض";
      writeStore(storageKeys.reviews, reviews);
      renderDashboard();
      showToast(review.status === "منشور" ? "التقييم اتنشر على الصفحة الرئيسية." : "تم رفض التقييم.");
    }
  }

  document.querySelector(".hero-search").addEventListener("submit", (event) => {
    event.preventDefault();
    byId("directory-search").value = byId("search-service").value.trim();
    requestedGovernorate = byId("search-governorate").value;
    byId("trade-filter").value = "";
    filterTrades();
    navigate("services");
  });
  byId("directory-search").addEventListener("input", filterTrades);
  byId("trade-filter").addEventListener("change", filterTrades);
  setupServicePicker();
  byId("request-trade").addEventListener("change", (event) => {
    renderRequestServices(event.target.value);
  });
  byId("detail-request").addEventListener("click", () => {
    const services = [...selectedServices];
    if (!services.length) {
      showToast(localized("اختار خدمة واحدة على الأقل."));
      return;
    }
    byId("details-dialog").close();
    byId("request-trade").value = selectedTrade;
    renderRequestServices(selectedTrade, services);
    if (requestedGovernorate) {
      byId("request-governorate").value = requestedGovernorate;
      byId("request-governorate").dispatchEvent(new Event("change"));
    }
    navigate("request");
  });
  document.querySelectorAll(".dialog-close").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));
  document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  }));

  byId("request-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let submitError = byId("request-submit-error");
    if (!submitError) {
      submitError = document.createElement("p");
      submitError.id = "request-submit-error";
      submitError.className = "error-message";
      submitError.setAttribute("role", "alert");
      form.querySelector(".form-submit").before(submitError);
    }
    submitError.hidden = true;
    submitError.textContent = "";
    if (!form.querySelector('input[name="services"]:checked')) {
      showToast(localized("اختار خدمة واحدة على الأقل."));
      byId("request-service-options").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const area = data.get("area") === "__other__" ? data.get("area_other") : data.get("area");
    const trackingToken = crypto.randomUUID();
    const order = {
      id: crypto.randomUUID(),
      trackingToken,
      trade: data.get("trade"),
      service: data.getAll("services"),
      governorate: data.get("governorate"),
      area,
      address: data.get("address"),
      locationLatitude: data.get("location_latitude") ? Number(data.get("location_latitude")) : null,
      locationLongitude: data.get("location_longitude") ? Number(data.get("location_longitude")) : null,
      matchingRadiusMeters: Number(data.get("matching_radius_meters")),
      proposedPrice: data.get("proposed_price") ? Number(data.get("proposed_price")) : null,
      details: data.get("details"),
      name: data.get("name"),
      phone: data.get("phone"),
      paymentMethod: data.get("payment_method"),
      cashLocationDetails: data.get("cash_location_details"),
      areaSizeSqm: data.get("area_size_sqm") || null,
      matchedWorkers: findAvailableWorkers(
        data.get("trade"),
        data.get("governorate"),
        area,
        data.get("location_latitude") ? Number(data.get("location_latitude")) : null,
        data.get("location_longitude") ? Number(data.get("location_longitude")) : null,
        Number(data.get("matching_radius_meters"))
      ),
      status: "قيد المراجعة",
      createdAt: new Date().toISOString()
    };
    if (supabaseConfigured) {
      const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
      if (sessionError) console.error("Could not check the session while submitting a customer order.", sessionError);
      const orderPayload = {
        customer_user_id: sessionData?.session?.user?.id || null,
        customer_name: order.name,
        phone: order.phone,
        trade: order.trade,
        services: order.service,
        governorate: order.governorate,
        area: order.area,
        address: order.address,
        location_latitude: order.locationLatitude,
        location_longitude: order.locationLongitude,
        matching_radius_meters: order.matchingRadiusMeters,
        proposed_price: order.proposedPrice,
        details: order.details || "",
        payment_method: order.paymentMethod,
        cash_location_details: order.cashLocationDetails || null,
        area_size_sqm: order.areaSizeSqm,
        tracking_token: order.trackingToken
      };
      const { error } = await supabaseClient.from("service_orders").insert(orderPayload);
      if (error) {
        console.log("Supabase service_orders insert error:", error);
        const errorMessage = [error.code, error.message, error.details, error.hint].filter(Boolean).join(" — ");
        const schemaMismatch = error.code === "PGRST204"
          || error.code === "42703"
          || /column .* does not exist|could not find the .* column/i.test(error.message || "");
        const schemaHelp = schemaMismatch
          ? `${localized("تأكد من تشغيل supabase-setup.sql لتحديث أعمدة الطلب ثم أعد المحاولة.")} `
          : "";
        submitError.textContent = `${schemaHelp}${errorMessage || "تعذر إرسال الطلب إلى قاعدة البيانات."}`;
        submitError.hidden = false;
        showToast("تعذر إرسال الطلب. راجع تفاصيل الخطأ الظاهرة أسفل النموذج.");
        return;
      }
      order.matchedWorkers = await findRemoteAvailableWorkers(order.trackingToken);
    } else {
      const orders = readStore(storageKeys.orders);
      orders.unshift(order);
      if (!writeStore(storageKeys.orders, orders)) return;
    }
    submitError.hidden = true;
    submitError.textContent = "";
    form.reset();
    renderRequestServices("");
    byId("area-size-sqm").value = "";
    byId("area-size-sqm").closest(".form-label").hidden = true;
    updatePaymentInstructions();
    resetDistrictSelect("request-form", "request-area");
    renderDashboard();
    navigate("home");
    showToast(supabaseConfigured
      ? order.matchedWorkers === null
        ? "تم إرسال طلبك، لكن تعذر تحميل الحرفيين المتاحين."
        : "تم إرسال طلبك بنجاح."
      : "تم حفظ الطلب على هذا المتصفح للتجربة.");
    if (order.matchedWorkers === null) order.matchedWorkers = [];
    showAvailabilityResult(order.matchedWorkers, order);
  });

  const artisanForm = byId("join-form");
  const artisanAddressLabel = artisanForm.elements.address.closest(".form-label");
  const artisanLocationTools = document.createElement("div");
  artisanLocationTools.className = "request-location-tools artisan-location-tools";
  const artisanLocationButton = document.createElement("button");
  artisanLocationButton.type = "button";
  artisanLocationButton.className = "text-link request-location-button";
  artisanLocationButton.textContent = localized("حدّد موقع العمل عبر GPS (اختياري)");
  const artisanLocationStatus = document.createElement("span");
  artisanLocationStatus.setAttribute("aria-live", "polite");
  artisanLocationStatus.textContent = localized("موقع العمل غير محدد؛ ستعتمد المطابقة على المنطقة.");
  const artisanLatitudeInput = document.createElement("input");
  artisanLatitudeInput.type = "hidden";
  artisanLatitudeInput.name = "professional_location_latitude";
  const artisanLongitudeInput = document.createElement("input");
  artisanLongitudeInput.type = "hidden";
  artisanLongitudeInput.name = "professional_location_longitude";
  artisanLocationTools.append(artisanLocationButton, artisanLocationStatus, artisanLatitudeInput, artisanLongitudeInput);
  artisanAddressLabel.after(artisanLocationTools);
  artisanLocationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      artisanLocationStatus.textContent = localized("تعذر الوصول للموقع. اكتب العنوان يدويًا أو حاول مرة أخرى.");
      return;
    }
    artisanLocationButton.disabled = true;
    artisanLocationStatus.textContent = localized("جارٍ تحديد موقعك...");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      artisanLatitudeInput.value = String(coords.latitude);
      artisanLongitudeInput.value = String(coords.longitude);
      artisanLocationStatus.textContent = localized("موقع العمل محفوظ وسيُستخدم لمطابقة الطلبات القريبة.");
      artisanLocationButton.disabled = false;
    }, (error) => {
      console.error("Could not get the professional's work location.", error);
      artisanLocationStatus.textContent = localized("تعذر الوصول للموقع. اكتب العنوان يدويًا أو حاول مرة أخرى.");
      artisanLocationButton.disabled = false;
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  });
  artisanForm.addEventListener("reset", () => {
    artisanLocationStatus.textContent = localized("موقع العمل غير محدد؛ ستعتمد المطابقة على المنطقة.");
  });

  let artisanUserId = null;

  artisanForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const phoneInput = form.elements.phone;
    phoneInput.setCustomValidity("");
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const authPhone = normalizeEgyptianMobile(data.get("phone"));
    if (!authPhone) {
      phoneInput.setCustomValidity("اكتب رقم موبايل مصري صحيحًا مثل 01012345678 أو +201012345678.");
      phoneInput.reportValidity();
      return;
    }
    const localPhone = `0${authPhone.slice(3)}`;
    phoneInput.value = localPhone;
    data.set("phone", localPhone);
    if (supabaseConfigured) {
      try {
        if (!artisanUserId) {
          const registration = await signUpCustomerAccount({
            phone: authPhone,
            password: String(data.get("account_password") || ""),
            fullName: String(data.get("name")).trim()
          });
          if (registration.error) {
            console.error("Could not create the artisan login.", registration.error);
            showToast(describeAuthError(registration.error, "تعذر إنشاء حساب الحرفي."));
            return;
          }
          artisanUserId = registration.data?.user?.id || null;
          if (!registration.data?.session) {
            showToast("تعذر تفعيل الحساب. عطّل Confirm email في إعدادات Supabase Authentication ثم أعد المحاولة.");
            return;
          }
        }
      } catch (registrationError) {
        console.error("Could not create the artisan login.", registrationError);
        showToast(describeAuthError(registrationError, "تعذر إنشاء حساب الحرفي."));
        return;
      }
    }
    let idImage;
    try {
      idImage = await idImagePromise;
    } catch (error) {
      console.error("Could not prepare the professional ID image.", error);
      showToast("تعذر تجهيز صورة البطاقة. اختار صورة أخرى.");
      return;
    }
    if (!idImage) {
      showToast("تعذر تجهيز صورة البطاقة. اختار صورة أخرى.");
      return;
    }
    const workerId = crypto.randomUUID();
    const worker = {
      id: workerId,
      name: data.get("name"),
      phone: data.get("phone"),
      trade: data.get("trade"),
      experience: data.get("experience"),
      governorate: data.get("governorate"),
      area: data.get("area") === "__other__" ? data.get("area_other") : data.get("area"),
      address: data.get("address"),
      locationLatitude: data.get("professional_location_latitude")
        ? Number(data.get("professional_location_latitude"))
        : null,
      locationLongitude: data.get("professional_location_longitude")
        ? Number(data.get("professional_location_longitude"))
        : null,
      idFile: data.get("id-image").name,
      payoutMethod: data.get("payout_method"),
      payoutAccount: data.get("payout_account"),
      portfolioFiles: [...data.getAll("portfolio_images")].filter((file) => file.size > 0).map((file) => file.name),
      idImage,
      status: "قيد المراجعة",
      createdAt: new Date().toISOString()
    };
    if (supabaseConfigured) {
      const portfolioFiles = [...data.getAll("portfolio_images")].filter((file) => file.size > 0);
      const portfolioPaths = await uploadPortfolioFiles(portfolioFiles, workerId);
      if (portfolioPaths === null) return;
      const file = data.get("id-image");
      const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const imagePath = `${workerId}.${extension}`;
      const { error: uploadError } = await supabaseClient.storage
        .from("professional-ids")
        .upload(imagePath, file, { contentType: file.type, upsert: false });
      if (uploadError) {
        console.error("Could not upload the professional ID image.", uploadError);
        showToast("تعذر رفع صورة الهوية. حاول مرة أخرى.");
        return;
      }
      const { error } = await supabaseClient.from("professionals").insert({
        id: workerId,
        name: worker.name,
        phone: worker.phone,
        trade: worker.trade,
        experience: worker.experience,
        governorate: worker.governorate,
        area: worker.area,
        address: worker.address,
        location_latitude: worker.locationLatitude,
        location_longitude: worker.locationLongitude,
        id_image_path: imagePath,
        portfolio_paths: portfolioPaths,
        payout_method: worker.payoutMethod,
        payout_account: worker.payoutAccount || null,
        user_id: artisanUserId
      });
      if (error) {
        console.error("Could not submit the professional application to Supabase.", error);
        showToast("تم رفع الصورة لكن تعذر إرسال الطلب. تواصل مع الدعم لإزالة الملف غير المرتبط.");
        return;
      }
    } else {
      const workers = readStore(storageKeys.workers);
      workers.unshift(worker);
      if (!writeStore(storageKeys.workers, workers)) return;
    }
    form.reset();
    artisanUserId = null;
    form.querySelector(".form-submit").textContent = "إرسال طلب التسجيل ←";
    byId("payout-account").closest(".form-label").hidden = true;
    byId("payout-account").required = false;
    idImagePromise = Promise.resolve("");
    resetDistrictSelect("join-form", "join-area");
    byId("id-preview").hidden = true;
    byId("id-preview").removeAttribute("src");
    document.querySelector(".upload-content").hidden = false;
    renderDashboard();
    showToast(supabaseConfigured
      ? "طلب التسجيل وصل لصاحب الموقع للمراجعة والقبول."
      : "تم حفظ الطلب على هذا المتصفح للتجربة.");
    navigate("home");
  });

  byId("id-upload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
      idImagePromise = Promise.resolve("");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      idImagePromise = Promise.resolve("");
      showToast("اختار صورة JPG أو PNG أو WebP بحجم أقل من 5 ميجابايت.");
      return;
    }
    const processing = prepareIdImage(file);
    idImagePromise = processing;
    processing.then((imageData) => {
      if (idImagePromise !== processing) return;
      byId("id-preview").src = imageData;
      byId("id-preview").hidden = false;
      document.querySelector(".upload-content").hidden = true;
    }).catch((error) => {
      if (idImagePromise !== processing) return;
      console.error("Could not prepare the professional ID image.", error);
      idImagePromise = Promise.resolve("");
      event.target.value = "";
      byId("id-preview").hidden = true;
      document.querySelector(".upload-content").hidden = false;
      showToast("تعذر تجهيز صورة البطاقة. اختار صورة أخرى.");
    });
  });

  byId("review-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (!selectedRating) {
      showToast("اختار عدد النجوم الأول.");
      return;
    }
    const reviews = readStore(storageKeys.reviews);
    reviews.unshift({ id: crypto.randomUUID(), name: data.get("name"), service: data.get("service"), rating: selectedRating, comment: data.get("comment"), status: "بانتظار المراجعة", createdAt: new Date().toISOString() });
    if (!writeStore(storageKeys.reviews, reviews)) return;
    form.reset();
    selectedRating = 0;
    document.querySelectorAll("[data-rating]").forEach((button) => button.classList.remove("is-selected"));
    renderDashboard();
    showToast("رأيك وصل لصاحب الموقع للمراجعة قبل النشر.");
  });
  byId("suggestion-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) saveMessage(event.currentTarget);
  });
  byId("support-settings").addEventListener("submit", (event) => {
    event.preventDefault();
    showToast(`رقم الدعم الفني: ${supportPhone}`);
  });
  byId("language-toggle").addEventListener("click", () => {
    document.documentElement.lang = document.documentElement.lang === "ar" ? "en" : "ar";
    localizePage();
    refreshOnlineProfessionalsView();
  });
  byId("theme-toggle").addEventListener("click", () => {
    document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    const english = document.documentElement.lang === "en";
    byId("theme-toggle").setAttribute("aria-label", english
      ? (document.documentElement.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode")
      : (document.documentElement.dataset.theme === "dark" ? "تشغيل الوضع الفاتح" : "تشغيل الوضع الليلي"));
    byId("theme-toggle").title = byId("theme-toggle").getAttribute("aria-label");
    byId("theme-toggle").innerHTML = document.documentElement.dataset.theme === "dark" ? '<span aria-hidden="true">☀</span>' : '<span aria-hidden="true">☾</span>';
    localStorage.setItem("salla7ly-v2-theme", document.documentElement.dataset.theme);
  });
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  window.addEventListener("popstate", () => {
    const page = pageNames.has(location.hash.slice(1)) ? location.hash.slice(1) : "home";
    if (page === "orders") void openCustomerOrders();
    else navigate(page, false);
  });

  document.querySelector("#page-request .form-note p").textContent = supabaseConfigured
    ? "بيانات الطلب تُرسل إلى قاعدة بيانات Supabase."
    : "وضع تجريبي: أضف إعدادات Supabase لإرسال الطلبات إلى قاعدة البيانات.";
  document.querySelector(".join-quote").textContent = supabaseConfigured
    ? "تُحفظ بيانات الحرفي وصورة الهوية ومعرض الأعمال في مساحة خاصة لا يراها إلا المدير المخول."
    : "وضع تجريبي محلي: لا ترفع بيانات أو صور هوية حقيقية قبل إعداد Supabase.";
  document.querySelector("#join-form .privacy-copy").textContent = supabaseConfigured
    ? "يُنشأ حساب الحرفي ببريد داخلي مرتبط برقم الهاتف دون SMS. بيانات الهوية ومعرض الأعمال مخزنة في مساحة خاصة ومقيدة بصلاحيات المدير."
    : "وضع تجريبي محلي: بيانات وصور الهوية لا تُرفع إلى خادم.";

  function setupSnowfall() {
    const canvas = byId("snowfall-canvas");
    const context = canvas?.getContext("2d");
    if (!canvas || !context || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let width = 0;
    let height = 0;
    let flakes = [];
    let frame = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      flakes = Array.from({ length: Math.min(90, Math.ceil(width / 14)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        speed: Math.random() * 0.8 + 0.35,
        drift: Math.random() * 0.7 + 0.15,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.45 + 0.25
      }));
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      flakes.forEach((flake) => {
        flake.y += flake.speed;
        flake.x += Math.sin(flake.phase += 0.012) * flake.drift;
        if (flake.y > height + flake.radius) {
          flake.y = -flake.radius;
          flake.x = Math.random() * width;
        }
        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        context.fill();
      });
      frame = window.requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
      } else {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(draw);
      }
    });
  }

  setupSnowfall();
  populateSelects();
  setupDistrictSelects();
  setupRequestExperience();
  setupJoinEnhancements();
  setupCustomerAuth();
  setupArtisanDashboard();
  byId("support-settings").elements.phone.readOnly = true;
  void loadPaymentAccounts();
  updatePaymentInstructions();
  renderTradeCards(trades, byId("home-trade-grid"));
  renderTradeCards(trades, byId("directory-grid"));
  setupOnlineProfessionals();
  renderDashboard();
  const savedTheme = localStorage.getItem("salla7ly-v2-theme");
  if (savedTheme === "dark") {
    document.documentElement.dataset.theme = "dark";
    byId("theme-toggle").innerHTML = '<span aria-hidden="true">☀</span>';
  }
  if (localStorage.getItem("salla7ly-v2-language") === "en") {
    document.documentElement.lang = "en";
    localizePage();
  }
  const initialPage = location.hash.slice(1);
  if (initialPage === "orders") void openCustomerOrders();
  else if (pageNames.has(initialPage)) navigate(initialPage, false);
})();
