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
    "الرئيسية": "Home", "الحرف والخدمات": "Trades & Services", "اطلب خدمة": "Request a Service",
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
    "طلبك يوصل لصاحب الموقع": "Your request goes to the site owner", "قولنا محتاج": "Tell us what you need",
    "إيه وفين.": "and where.", "حدد الحرفة والمحافظة والمنطقة والعنوان. صاحب الموقع يراجع الطلب ويتابع معاك.": "Choose a trade, governorate, district and address. The site owner will review and follow up.",
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
    "كاش": "Cash",
    "الرقم القومي": "National ID",
    "14 رقمًا": "14 digits",
    "كود التحقق المرسل برسالة SMS": "SMS verification code",
    "إرسال كود التحقق": "Send verification code",
    "تأكيد الكود": "Verify code",
    "تسجيل دخول العميل": "Customer login",
    "إنشاء حساب عميل": "Create customer account",
    "سنرسل كود تحقق إلى رقم موبايلك.": "We will send a verification code to your phone.",
    "لديك حساب؟ تسجيل الدخول": "Already have an account? Log in",
    "حساب جديد؟ سجّل الآن": "New here? Sign up",
    "حساب الحرفي": "Professional account"
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

  const pageNames = new Set(["home", "services", "request", "join", "artisan"]);
  const supportPhone = "01068076603";
  const paymentPhone = "01063459472";
  const storageKeys = {
    orders: "salla7ly-v2-orders",
    workers: "salla7ly-v2-worker-applications",
    messages: "salla7ly-v2-messages",
    reviews: "salla7ly-v2-reviews"
  };
  const nav = document.querySelector(".main-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const toast = document.getElementById("toast");
  let toastTimer;
  let selectedRating = 0;
  let selectedTrade = "";
  let requestedGovernorate = "";
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
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
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

  function setupRequestExperience() {
    const form = byId("request-form");
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

    const digitalFields = document.createElement("div");
    digitalFields.id = "digital-payment-fields";
    digitalFields.className = "payment-conditional-fields";
    digitalFields.hidden = true;
    const recipient = document.createElement("p");
    recipient.id = "payment-recipient";
    recipient.className = "payment-recipient";
    digitalFields.append(recipient);
    const receipt = createFormField("رفع صورة الإيصال (اختياري إذا كتبت رقم المعاملة)", "payment_receipt", "file", {
      accept: "image/jpeg,image/png,image/webp,application/pdf"
    });
    receipt.input.id = "payment-receipt";
    const transaction = createFormField("أو رقم Transaction ID", "transaction_id", "text", {
      autocomplete: "off",
      placeholder: "اكتب رقم المعاملة"
    });
    transaction.input.id = "transaction-id";
    digitalFields.append(receipt.label, transaction.label);

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
    section.append(digitalFields, cashFields);
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

    method.addEventListener("change", updatePaymentInstructions);
    transaction.input.addEventListener("input", updatePaymentInstructions);
    receipt.input.addEventListener("change", updatePaymentInstructions);
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
  }

  function setupJoinEnhancements() {
    const idLabel = byId("id-upload").closest(".form-label");
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
    byId("join-form").querySelector(".checkbox-label").before(payoutLabel);
  }

  function setupCustomerAuth() {
    const dialog = byId("auth-dialog");
    const form = byId("auth-form");
    const nameInput = form.elements.name;
    const phoneInput = form.elements.phone;
    const nationalId = createFormField("الرقم القومي", "national_id", "text", {
      inputmode: "numeric",
      pattern: "[0-9]{14}",
      maxlength: "14",
      placeholder: "14 رقمًا"
    });
    nationalId.input.required = true;
    phoneInput.closest("label").after(nationalId.label);

    const code = createFormField("كود التحقق المرسل برسالة SMS", "otp", "text", {
      inputmode: "numeric",
      autocomplete: "one-time-code",
      pattern: "[0-9]{6}",
      maxlength: "6",
      placeholder: "000000"
    });
    code.input.hidden = true;
    code.label.hidden = true;
    code.input.required = false;
    form.querySelector(".form-submit").before(code.label);
    const modeButton = document.createElement("button");
    modeButton.type = "button";
    modeButton.className = "text-link auth-mode-toggle";
    modeButton.id = "auth-mode-toggle";
    form.after(modeButton);
    const submit = form.querySelector(".form-submit");
    let mode = "signup";
    let otpSent = false;

    function setMode(nextMode) {
      mode = nextMode;
      otpSent = false;
      nameInput.required = mode === "signup";
      nationalId.input.required = mode === "signup";
      nameInput.closest("label").hidden = mode !== "signup";
      nationalId.label.hidden = mode !== "signup";
      code.label.hidden = true;
      code.input.hidden = true;
      code.input.required = false;
      submit.textContent = localized("إرسال كود التحقق");
      byId("auth-title").textContent = localized(mode === "signup" ? "إنشاء حساب عميل" : "تسجيل دخول العميل");
      dialog.querySelector(".auth-description").textContent = localized("سنرسل كود تحقق إلى رقم موبايلك.");
      modeButton.textContent = localized(mode === "signup" ? "لديك حساب؟ تسجيل الدخول" : "حساب جديد؟ سجّل الآن");
    }

    function authPhone() {
      const value = phoneInput.value.trim();
      return value.startsWith("+") ? value : value.startsWith("0") ? `+20${value.slice(1)}` : `+20${value}`;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (!supabaseConfigured) {
        showToast("فعّل إعدادات Supabase ومزوّد SMS لتسجيل الدخول برقم الموبايل.");
        return;
      }
      if (!otpSent) {
        const options = { shouldCreateUser: mode === "signup" };
        if (mode === "signup") {
          options.data = {
            full_name: nameInput.value.trim(),
            national_id: nationalId.input.value.trim()
          };
        }
        const { error } = await supabaseClient.auth.signInWithOtp({ phone: authPhone(), options });
        if (error) {
          console.error("Could not send the customer verification code.", error);
          showToast(error.message || "تعذر إرسال كود التحقق.");
          return;
        }
        otpSent = true;
        code.label.hidden = false;
        code.input.hidden = false;
        code.input.required = true;
        submit.textContent = "تأكيد الكود";
        code.input.focus();
        showToast("تم إرسال كود التحقق إلى موبايلك.");
        return;
      }
      const { error } = await supabaseClient.auth.verifyOtp({
        phone: authPhone(),
        token: code.input.value.trim(),
        type: "sms"
      });
      if (error) {
        console.error("Could not verify the customer code.", error);
        showToast(error.message || "كود التحقق غير صحيح.");
        return;
      }
      form.reset();
      dialog.close();
      showToast(mode === "signup" ? "تم إنشاء حساب العميل وتأكيد رقم الموبايل." : "تم تسجيل الدخول بنجاح.");
    });
    modeButton.addEventListener("click", () => setMode(mode === "signup" ? "login" : "signup"));
    document.querySelectorAll("[data-auth]").forEach((button) => {
      button.addEventListener("click", () => {
        setMode(button.dataset.auth === "login" ? "login" : "signup");
        dialog.showModal();
      });
    });

    setMode("signup");
    dialog.querySelector(".privacy-copy").textContent = "تسجيل الدخول متاح عبر كود SMS. يلزم تفعيل Phone Auth في إعدادات Supabase.";
  }

  function setupArtisanDashboard() {
    const section = document.createElement("section");
    section.className = "page-section inner-page";
    section.id = "page-artisan";
    section.dataset.page = "artisan";
    section.hidden = true;
    section.innerHTML = '<div class="section-wrap artisan-dashboard"><div class="page-heading"><div><div class="eyebrow">بوابة الحرفي</div><h1>الطلبات <span>المطابقة لك.</span></h1><p>سجّل الدخول برقم الموبايل المسجل بطلب انضمامك والمعتمد من الإدارة.</p></div></div><div class="artisan-auth-panel"><label class="form-label">رقم الموبايل<input id="artisan-phone" type="tel" inputmode="tel" pattern="01[0-2,5]{1}[0-9]{8}" placeholder="01xxxxxxxxx" required></label><button class="button button-primary" id="artisan-send-code" type="button">إرسال كود SMS</button><label class="form-label" id="artisan-code-label" hidden>كود التحقق<input id="artisan-code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6"></label><button class="button button-primary" id="artisan-verify-code" type="button" hidden>تأكيد الدخول</button><button class="button button-light" id="artisan-signout" type="button" hidden>تسجيل الخروج</button></div><div id="artisan-orders" class="artisan-orders" hidden></div></div>';
    document.querySelector("main").append(section);
    const link = document.createElement("a");
    link.className = "nav-link";
    link.href = "#artisan";
    link.dataset.pageLink = "artisan";
    link.textContent = "حساب الحرفي";
    nav.append(link);

    const dialog = document.createElement("dialog");
    dialog.className = "auth-dialog";
    dialog.id = "artisan-accept-dialog";
    dialog.innerHTML = '<button type="button" class="dialog-close" data-dialog-close aria-label="إغلاق">×</button><div class="eyebrow">تأكيد استلام الطلب</div><h2>وقت الوصول المتوقع</h2><form id="artisan-accept-form"><label class="form-label">الوقت بالدقائق<input name="arrival_minutes" type="number" min="1" max="1440" step="1" required placeholder="مثال: 30"></label><button class="button button-primary form-submit" type="submit">قبول الطلب</button></form>';
    document.body.append(dialog);
    let acceptedMatchId = "";

    async function loadMatches() {
      const host = byId("artisan-orders");
      const { data, error } = await supabaseClient.from("service_order_matches")
        .select("id, status, service_orders(id, trade, services, governorate, area, address, details, cash_location_details, area_size_sqm, payment_method, created_at, status, estimated_arrival_minutes)")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Could not load matching service orders.", error);
        showToast("تعذر تحميل الطلبات المطابقة.");
        return;
      }
      host.replaceChildren();
      if (!data.length) host.append(textElement("p", "empty-state", "لا توجد طلبات مطابقة لمنطقتك وتخصصك حاليًا."));
      data.forEach((match) => {
        const order = match.service_orders;
        if (!order) return;
        const card = document.createElement("article");
        card.className = "artisan-order-card";
        const services = Array.isArray(order.services) ? order.services.join("، ") : "";
        card.append(
          textElement("strong", "", `${order.trade} — ${services}`),
          textElement("span", "", `${order.governorate}، ${order.area} · ${order.address}`),
          textElement("span", "", [order.details, order.cash_location_details, order.area_size_sqm ? `المساحة ${order.area_size_sqm} م²` : ""].filter(Boolean).join(" · "))
        );
        if (match.status === "matched") {
          const accept = document.createElement("button");
          accept.type = "button";
          accept.className = "button button-primary";
          accept.textContent = "قبول الطلب";
          accept.addEventListener("click", () => {
            acceptedMatchId = match.id;
            dialog.showModal();
          });
          card.append(accept);
        } else if (match.status === "accepted") {
          card.append(textElement("span", "record-status", `تم قبول الطلب · الوصول خلال ${order.estimated_arrival_minutes || "—"} دقيقة`));
        } else {
          card.append(textElement("span", "record-status", "تم إسناد الطلب إلى حرفي آخر."));
        }
        host.append(card);
      });
      host.hidden = false;
    }

    byId("artisan-send-code").addEventListener("click", async () => {
      if (!supabaseConfigured) {
        showToast("فعّل إعدادات Supabase ومزوّد SMS أولًا.");
        return;
      }
      const phone = byId("artisan-phone").value.trim();
      if (!byId("artisan-phone").reportValidity()) return;
      const formattedPhone = phone.startsWith("+") ? phone : `+20${phone.slice(1)}`;
      const { error } = await supabaseClient.auth.signInWithOtp({ phone: formattedPhone, options: { shouldCreateUser: true } });
      if (error) {
        console.error("Could not send the artisan verification code.", error);
        showToast(error.message || "تعذر إرسال كود الدخول.");
        return;
      }
      byId("artisan-code-label").hidden = false;
      byId("artisan-verify-code").hidden = false;
      showToast("تم إرسال كود الدخول.");
    });
    byId("artisan-verify-code").addEventListener("click", async () => {
      const phone = byId("artisan-phone").value.trim();
      const formattedPhone = phone.startsWith("+") ? phone : `+20${phone.slice(1)}`;
      const { error } = await supabaseClient.auth.verifyOtp({
        phone: formattedPhone,
        token: byId("artisan-code").value.trim(),
        type: "sms"
      });
      if (error) {
        console.error("Could not verify the artisan code.", error);
        showToast(error.message || "كود الدخول غير صحيح.");
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
      byId("artisan-send-code").hidden = true;
      byId("artisan-code-label").hidden = true;
      byId("artisan-verify-code").hidden = true;
      byId("artisan-signout").hidden = false;
      await loadMatches();
    });
    byId("artisan-signout").addEventListener("click", async () => {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        console.error("Could not sign out the artisan.", error);
        showToast("تعذر تسجيل الخروج.");
        return;
      }
      byId("artisan-orders").hidden = true;
      byId("artisan-send-code").hidden = false;
      byId("artisan-signout").hidden = true;
    });
    byId("artisan-accept-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!event.currentTarget.reportValidity()) return;
      const arrivalMinutes = Number(new FormData(event.currentTarget).get("arrival_minutes"));
      const { error } = await supabaseClient.rpc("accept_service_order", {
        match_id: acceptedMatchId,
        arrival_minutes: arrivalMinutes
      });
      if (error) {
        console.error("Could not accept the matching service order.", error);
        showToast(error.message || "تعذر قبول الطلب.");
        return;
      }
      dialog.close();
      event.currentTarget.reset();
      showToast("تم قبول الطلب وإرسال وقت الوصول للعميل.");
      await loadMatches();
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
        ? `${record.governorate}، ${record.area} — ${record.address} | ${record.phone} | ${record.details || "بدون وصف إضافي"}${record.matchedWorkers?.length ? ` | حرفي متاح: ${record.matchedWorkers.map((worker) => worker.name).join("، ")}` : ""}`
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

  function findAvailableWorkers(trade, governorate, area) {
    const targetGovernorate = normalizeLocation(governorate);
    const targetArea = normalizeLocation(area);
    return readStore(storageKeys.workers)
      .filter((worker) =>
        worker.status === "مقبول"
        && worker.trade === trade
        && normalizeLocation(worker.governorate) === targetGovernorate
        && normalizeLocation(worker.area) === targetArea
      )
      .map(({ id, name, phone, trade: workerTrade }) => ({ id, name, phone, trade: workerTrade }));
  }

  async function findRemoteAvailableWorkers(trade, governorate, area) {
    const { data, error } = await supabaseClient.from("available_professionals")
      .select("id, name, phone, trade, governorate, area")
      .eq("trade", trade)
      .eq("governorate", governorate)
      .eq("area", area);
    if (error) {
      console.error("Could not find approved professionals in Supabase.", error);
      return null;
    }
    return (data || []).map(({ id, name, phone, trade: workerTrade }) => ({ id, name, phone, trade: workerTrade }));
  }

  function showAvailabilityResult(workers, order) {
    const dialog = byId("availability-dialog");
    const heading = byId("availability-title");
    const description = byId("availability-description");
    const list = byId("availability-workers");
    list.replaceChildren();

    heading.textContent = localized(workers.length ? "في حرفي متاح قريب منك" : "تم إرسال طلبك لصاحب الموقع");
    description.textContent = localized(workers.length
      ? "لقينا حرفي معتمد في نفس منطقتك، تقدر تتواصل معاه مباشرة."
      : "لسه مفيش حرفي معتمد قريب منك. طلبك وصل لصاحب الموقع وهيتابع معاك.");
    byId("request-live-status").textContent = order.id
      ? `رقم الطلب: ${order.id} — سيتم تحديث الحالة ووقت الوصول هنا تلقائيًا.`
      : "سيتم تحديث حالة الطلب عند توفر فني مناسب.";
    if (order.trackingToken) void subscribeToOrderTracking(order.trackingToken);

    workers.forEach((worker) => {
      const card = document.createElement("article");
      card.className = "availability-worker";
      const info = document.createElement("div");
      info.append(
        textElement("strong", "", worker.name),
        textElement("span", "", `${localized(worker.trade)} — ${worker.phone}`)
      );
      const actions = document.createElement("div");
      actions.className = "availability-actions";
      const phone = String(worker.phone || "").replace(/[^\d+]/g, "");
      if (phone) {
        const call = document.createElement("a");
        call.className = "button button-light button-small";
        call.href = `tel:${phone}`;
        call.textContent = localized("اتصال");
        actions.append(call);
        const digits = phone.replace(/\D/g, "");
        const whatsappNumber = digits.startsWith("0") ? `20${digits.slice(1)}` : digits;
        const message = `مرحبا ${worker.name}، أحتاج ${Array.isArray(order.service) ? order.service.join("، ") : order.service} في ${order.area}، ${order.governorate}.`;
        const whatsapp = document.createElement("a");
        whatsapp.className = "button button-primary button-small";
        whatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        whatsapp.target = "_blank";
        whatsapp.rel = "noopener noreferrer";
        whatsapp.textContent = localized("واتساب");
        actions.append(whatsapp);
      }
      card.append(info, actions);
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
    byId("support-call").href = `tel:${support.replace(/[^\d+]/g, "")}`;
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
    const digital = method === "instapay" || method === "vodafone_cash";
    byId("digital-payment-fields").hidden = !digital;
    byId("cash-payment-fields").hidden = method !== "cash";
    byId("cash-location-details").required = method === "cash";
    const hasTransactionId = Boolean(byId("transaction-id").value.trim());
    const hasReceipt = Boolean(byId("payment-receipt").files.length);
    byId("payment-receipt").required = digital && !hasTransactionId && !hasReceipt;
    byId("transaction-id").required = false;
    if (digital) {
      const methodName = method === "instapay" ? "InstaPay" : "Vodafone Cash";
      const account = paymentAccounts[method] || paymentPhone;
      byId("payment-recipient").textContent = `${methodName}: ${account}`;
    }
  }

  let paymentAccounts = { instapay: paymentPhone, vodafone_cash: paymentPhone };
  let activeTrackingChannel = null;

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
      renderTrackingUpdate(payload);
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

  function renderTrackingUpdate(payload) {
    const eta = payload?.estimated_arrival_minutes;
    const status = payload?.status || "قيد المراجعة";
    byId("request-live-status").textContent = document.documentElement.lang === "en"
      ? eta
        ? `Order accepted — estimated arrival in ${eta} minutes.`
        : `Order status: ${localized(status)}`
      : eta
        ? `تم قبول طلبك — وقت الوصول المتوقع خلال ${eta} دقيقة.`
        : `حالة الطلب: ${status}`;
  }

  function fileExtension(file) {
    if (file.type === "image/png") return "png";
    if (file.type === "image/webp") return "webp";
    if (file.type === "application/pdf") return "pdf";
    return "jpg";
  }

  async function uploadOrderReceipt(file, trackingToken) {
    if (!file) return "";
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      showToast("الإيصال يجب أن يكون صورة أو PDF بحجم لا يتجاوز 5 ميجابايت.");
      return null;
    }
    if (!supabaseConfigured) return file.name;
    const path = `${trackingToken}/${crypto.randomUUID()}.${fileExtension(file)}`;
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

  document.addEventListener("click", (event) => {
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
    if (!form.querySelector('input[name="services"]:checked')) {
      showToast(localized("اختار خدمة واحدة على الأقل."));
      byId("request-service-options").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const area = data.get("area") === "__other__" ? data.get("area_other") : data.get("area");
    const trackingToken = crypto.randomUUID();
    const receiptFile = data.get("payment_receipt");
    const receiptPath = await uploadOrderReceipt(receiptFile?.size ? receiptFile : null, trackingToken);
    if (receiptPath === null) return;
    const order = {
      id: crypto.randomUUID(),
      trackingToken,
      trade: data.get("trade"),
      service: data.getAll("services"),
      governorate: data.get("governorate"),
      area,
      address: data.get("address"),
      details: data.get("details"),
      name: data.get("name"),
      phone: data.get("phone"),
      paymentMethod: data.get("payment_method"),
      paymentReceipt: receiptPath,
      transactionId: data.get("transaction_id"),
      cashLocationDetails: data.get("cash_location_details"),
      areaSizeSqm: data.get("area_size_sqm") || null,
      matchedWorkers: findAvailableWorkers(data.get("trade"), data.get("governorate"), area),
      status: "قيد المراجعة",
      createdAt: new Date().toISOString()
    };
    if (supabaseConfigured) {
      const { error } = await supabaseClient.from("service_orders").insert({
        customer_name: order.name,
        phone: order.phone,
        trade: order.trade,
        services: order.service,
        governorate: order.governorate,
        area: order.area,
        address: order.address,
        details: order.details || "",
        payment_method: order.paymentMethod,
        payment_receipt_path: supabaseConfigured ? receiptPath || null : null,
        transaction_id: order.transactionId || null,
        cash_location_details: order.cashLocationDetails || null,
        area_size_sqm: order.areaSizeSqm,
        tracking_token: order.trackingToken
      });
      if (error) {
        console.error("Could not submit the service order to Supabase.", error);
        showToast("تعذر إرسال الطلب. حاول مرة أخرى أو تواصل مع الدعم.");
        return;
      }
      order.matchedWorkers = await findRemoteAvailableWorkers(order.trade, order.governorate, order.area);
    } else {
      const orders = readStore(storageKeys.orders);
      orders.unshift(order);
      if (!writeStore(storageKeys.orders, orders)) return;
    }
    form.reset();
    renderRequestServices("");
    byId("area-size-sqm").value = "";
    byId("area-size-sqm").closest(".form-label").hidden = true;
    byId("payment-receipt").required = false;
    byId("transaction-id").required = false;
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

  byId("join-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
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
      idFile: data.get("id-image").name,
      payoutMethod: data.get("payout_method"),
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
        id_image_path: imagePath,
        portfolio_paths: portfolioPaths,
        payout_method: worker.payoutMethod
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
  window.addEventListener("popstate", () => navigate(pageNames.has(location.hash.slice(1)) ? location.hash.slice(1) : "home", false));

  document.querySelector("#page-request .form-note p").textContent = supabaseConfigured
    ? "بيانات الطلب تُرسل إلى قاعدة بيانات Supabase."
    : "وضع تجريبي: أضف إعدادات Supabase لإرسال الطلبات إلى قاعدة البيانات.";
  document.querySelector(".join-quote").textContent = supabaseConfigured
    ? "تُحفظ بيانات الحرفي وصورة الهوية ومعرض الأعمال في مساحة خاصة لا يراها إلا المدير المخول."
    : "وضع تجريبي محلي: لا ترفع بيانات أو صور هوية حقيقية قبل إعداد Supabase.";
  document.querySelector("#join-form .privacy-copy").textContent = supabaseConfigured
    ? "بيانات الهوية ومعرض الأعمال مخزنة في مساحة خاصة ومقيدة بصلاحيات المدير."
    : "وضع تجريبي محلي: بيانات وصور الهوية لا تُرفع إلى خادم.";
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
  if (pageNames.has(initialPage)) navigate(initialPage, false);
})();
