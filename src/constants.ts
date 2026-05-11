import { Lawyer, LandmarkCase, PracticeArea, Testimonial, FAQ, Briefing } from "./types";

export const LAWYERS: Lawyer[] = [
  {
    id: 0,
    badge: "م",
    name: { ar: "الأستاذ محمد البراء", en: "Mohammed Al-Baraa, KC" },
    role: { ar: "المستشار العام والعضو المنتدب", en: "Senior Principal & Managing Director" },
    spec: { ar: "التحكيم الدولي والنزاعات السيادية", en: "International Arbitration & Sovereign Disputes" },
    years: { ar: "٣٥ عاماً من الحصافة القانونية", en: "35 Years of Legal Mastery" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    bio: {
      ar: "فقيه قانوني دولي مرموق، يُعد من القلائل الذين صاغوا ملامح التحكيم التجاري والسيادي في المنطقة العربية. تولى تمثيل حكومات ودول عظمى أمام محكمة العدل الدولية، مشيداً إرثاً من الانتصارات التي لا تقبل الجدل.",
      en: "A preeminent legal scholar whose influence has shaped the landscape of international and sovereign arbitration. Representing world governments before the ICJ, he has architected a legacy of indisputable legal triumphs."
    },
    edu: ["Harvard Law School — LLM", "Paris I Panthéon-Sorbonne — PhD in International Jurisprudence", "University of Jordan — LLB with High Honors"],
    certs: { ar: "عضو المجلس الأعلى للمحكمين الدوليين، مستشار معتمد لدى الهيئات الأممية", en: "Fellow of the Chartered Institute of Arbitrators, UN Senior Legal Consultant" },
    expertise: { ar: "المنازعات الحدودية، الحصانات السيادية، التحكيم الاستراتيجي", en: "Border Disputes, Sovereign Immunities, Strategic Arbitration" },
    cases: { ar: "حسم نزاع سيادي حدودي — ٢.٨ مليار دولار", en: "Settlement of Sovereign Border Dispute — $2.8B" },
    contact: "m.albaraa@al-baraa.law"
  },
  {
    id: 1,
    badge: "س",
    name: { ar: "الأستاذة سارة العلي", en: "Sara Al-Ali" },
    role: { ar: "رئيسة قطاع الثروات الخاصة والأسر الحاكمة", en: "Head of Private Wealth & Dynastic Affairs" },
    spec: { ar: "تنظيم الأصول وحماية الثروات العائلية", en: "Private Asset Architecture & Dynastic Guardianship" },
    years: { ar: "٢٨ عاماً من الدقة الاستشارية", en: "28 Years of Consultative Precision" },
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    bio: {
      ar: "خبيرة استراتيجية في حماية الأصول السيادية والعائلية، تختص في صياغة أطر قانونية معقدة بخصوصية مطلقة لضمان استدامة الثروات عبر الأجيال في بيئة دولية متغيرة.",
      en: "A strategic architect in the preservation of sovereign and dynastic assets, specializing in crafting complex legal frameworks with absolute discretion to ensure generational wealth sustainability."
    },
    edu: ["Oxford University — BCL", "London School of Economics — LLM in Global Finance", "University of Jordan — LLB"],
    certs: { ar: "عضو مجلس المرأة القانونيات الدولي، خبيرة تخطيط الثروات المعتمدة عالمياً", en: "Member of International Women Lawyers Council, Global Certified Wealth Architect" },
    expertise: { ar: "أطر الإرث العابرة للحدود، صناديق الثروة، وصاية الأصول", en: "Cross-Border Inheritance, Wealth Funds, Asset Stewardship" },
    cases: { ar: "إعادة تنظيم أصول أسرة حاكمة — نصف مليار دولار", en: "Sovereign Family Asset Restructuring — $500M+" },
    contact: "s.alali@al-baraa.law"
  },
  {
    id: 2,
    badge: "ع",
    name: { ar: "الأستاذ عمر القاسم", en: "Omar Al-Qasem" },
    role: { ar: "شريك أول — الاندماج والاستحواذ الضخم", en: "Senior Partner — Monumental M&A" },
    spec: { ar: "حوكمة الشركات الكبرى والصفقات العابرة للقارات", en: "Global Corporate Governance & Continental Transactions" },
    years: { ar: "٢٢ عاماً من الريادة المؤسسية", en: "22 Years of Institutional Leadership" },
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    bio: {
      ar: "قائد عمليات الاندماج والاستحواذ الأكثر تعقيداً على مستوى المنطقة، أشرف على صفقات تتجاوز قيمتها الإجمالية ١٥ مليار دولار، محولاً المفاوضات الشاقة إلى نجاحات تجارية باهرة.",
      en: "Orchestrator of the region's most intricate M&A operations, overseeing transactions exceeding $15 billion, transforming high-stakes negotiations into remarkable commercial successes."
    },
    edu: ["Yale Law School — JD", "INSEAD — Global Executive MBA", "KAUST — Bachelor of Laws"],
    certs: { ar: "عضو جمعية مستشاري الشركات العالمية، مستشار اقتصادي سابق", en: "Member of Global Corporate Counsel Assoc., Former Sovereign Economic Advisor" },
    expertise: { ar: "تمويل الشركات، الحوكمة المؤسسية، الاستحواذ السيادي", en: "Corporate Finance, Institutional Governance, Sovereign Acquisition" },
    cases: { ar: "استحواذ سيادي عابر للقارات — ٢.١ مليار دولار", en: "Transcontinental Sovereign Acquisition — $2.1B" },
    contact: "o.alqasem@al-baraa.law"
  }
];

export const CASES: LandmarkCase[] = [
  {
    id: 1,
    tag: { ar: "السيادة الدولية", en: "INTERNATIONAL SOVEREIGNTY" },
    title: { ar: "نزاع الحدود البحرية — محكمة لاهاي الدولية", en: "Maritime Boundary Dispute — The Hague ICJ" },
    desc: { ar: "حسم قانوني تاريخي لصالح إمارة خليجية، ثبّت الأحقية السيادية الكاملة على موارد طبيعية استراتيجية.", en: "A landmark legal settlement for a Gulf Emirate, securing absolute sovereign rights over strategic natural resources." },
    value: "$2.8B",
    jurisdiction: "International Court of Justice",
    year: "2022"
  },
  {
    id: 2,
    tag: { ar: "الاستثمار السيادي", en: "SOVEREIGN INVESTMENT" },
    title: { ar: "دفاع استراتيجي أمام مركز ICSID بواشنطن", en: "Sovereign Defense — ICSID Washington" },
    desc: { ar: "تحقيق انتصار قانوني ساحق لدولة عربية ضد مطالبات جائرة بمليارات الدولارات من قبل كونسورتيوم دولي.", en: "Achieving a crushing legal victory for an Arab state against multibillion-dollar claims from an international consortium." },
    value: "$1.6B",
    jurisdiction: "ICSID — Washington",
    year: "2021"
  }
];

export const PRACTICES: PracticeArea[] = [
  {
    id: "arb",
    num: "01",
    icon: "⚖",
    tag: { ar: "النخبة القانونية", en: "LEGAL ELITE" },
    title: { ar: "التحكيم الدولي والنزاعات السيادية", en: "International Arbitration & Sovereign Disputes" },
    desc: { ar: "صياغة استراتيجيات الدفاع والتمثيل أمام المحاكم الدولية وهيئات التحكيم المرموقة لضمان التفوق المطلق.", en: "Architecting high-stakes defense and offensive strategies before international courts and elite arbitration tribunals." },
    capabilities: [
      { ar: "التحكيم التجاري والاستثماري", en: "Commercial & Investment Arbitration" },
      { ar: "نزاعات المعاهدات الدولية", en: "International Treaty Disputes" },
      { ar: "تنفيذ أحكام المحاكم الأجنبية", en: "Enforcement of Foreign Awards" }
    ]
  },
  {
    id: "wealth",
    num: "02",
    icon: "🏰",
    tag: { ar: "الحكاية والإرث", en: "DYNASTY & LEGACY" },
    title: { ar: "قانون الأسر الحاكمة والثروات الخاصة", en: "Dynastic Law & Private Wealth Architecture" },
    desc: { ar: "حماية الخصوصية المطلقة وتنظيم الأصول العالمية لضمان استمرارية النفوذ والثروة عبر الأجيال.", en: "Protecting absolute privacy and structuring global assets to ensure the continuity of influence and wealth across generations." },
    capabilities: [
      { ar: "تنظيم الأوقاف والصناديق العائلية", en: "Family Trusts & Endowment Structuring" },
      { ar: "إدارة الحصانات والكيانات السيادية", en: "Sovereign Entities & Immunities" },
      { ar: "تخطيط الثروات العابرة للحدود", en: "Transcontinental Wealth Planning" }
    ]
  },
  {
    id: "corp",
    num: "03",
    icon: "⬡",
    tag: { ar: "الريادة المؤسسية", en: "INSTITUTIONAL LEADERSHIP" },
    title: { ar: "حوكمة الشركات والاندماج الكلي", en: "Corporate Governance & Macro M&A" },
    desc: { ar: "توجيه التحالفات الاستراتيجية والصفقات الكبرى التي تعيد صياغة الأسواق العالمية.", en: "Guiding strategic alliances and monumental transactions that reshape global markets." },
    capabilities: [
      { ar: "حوكمة الشركات المسجلة دولياً", en: "Governance of Multi-Jurisdictional Entities" },
      { ar: "عمليات الاستحواذ العابر للقارات", en: "Transcontinental Acquisitions" },
      { ar: "تمويل المشاريع الاستراتيجية", en: "Strategic Project Finance" }
    ]
  },
  {
    id: "labour",
    num: "04",
    icon: "🤝",
    tag: { ar: "علاقات العمل", en: "LABOUR RELATIONS" },
    title: { ar: "قانون العمل والنزاعات العمالية", en: "Labour Law & Employment Disputes" },
    desc: { ar: "تقديم استشارات شاملة في صياغة عقود العمل وإدارة النزاعات العمالية لضمان الامتثال للتشريعات المحلية والدولية.", en: "Providing comprehensive counsel in employment contracts and dispute management to ensure compliance." },
    capabilities: [
      { ar: "صياغة عقود العمل التخصصية", en: "Drafting Specialized Employment Contracts" },
      { ar: "التمثيل في النزاعات العمالية", en: "Representation in Labour Disputes" },
      { ar: "سياسات الامتثال والموارد البشرية", en: "Compliance & HR Policies" }
    ]
  },
  {
    id: "criminal",
    num: "05",
    icon: "🛡",
    tag: { ar: "الدفاع الجنائي", en: "CRIMINAL DEFENCE" },
    title: { ar: "القانون الجنائي والجرائم الاقتصادية", en: "Criminal Law & Financial Crimes" },
    desc: { ar: "دفاع استراتيجي في القضايا الجنائية المعقدة وجرائم الأموال، مع التركيز على حماية السمعة والكيان القانوني.", en: "Strategic defense in complex criminal cases and financial crimes, focusing on reputation protection." },
    capabilities: [
      { ar: "التمثيل في الجرائم الاقتصادية", en: "White-Collar Crime Representation" },
      { ar: "التحقيقات الجنائية الدولية", en: "International Criminal Investigations" },
      { ar: "دفاع النخبة في القضايا الحرجة", en: "High-Profile Criminal Defense" }
    ]
  },
  {
    id: "sharia",
    num: "06",
    icon: "📜",
    tag: { ar: "الأحوال الشخصية", en: "PERSONAL STATUS" },
    title: { ar: "القانون الشرعي وقضايا الأسرة", en: "Sharia Law & Family Matters" },
    desc: { ar: "حلول قانونية تراعي الضوابط الشرعية في قضايا الميراث، الأوقاف، والأحوال الشخصية للنخبة.", en: "Legal solutions adhering to Sharia in inheritance, endowments, and personal status cases for the elite." },
    capabilities: [
      { ar: "تنظيم التركات والمواريث معقدة", en: "Complex Estate & Inheritance Structuring" },
      { ar: "قضايا الأوقاف والوصايا", en: "Endowment & Will Management" },
      { ar: "التحكيم في منازعات الأسرة", en: "Family Dispute Arbitration" }
    ]
  },
  {
    id: "insurance",
    num: "07",
    icon: "☂",
    tag: { ar: "إدارة المخاطر", en: "RISK MANAGEMENT" },
    title: { ar: "قانون التأمين والدعاوى التعويضية", en: "Insurance Law & Claims" },
    desc: { ar: "تمثيل كبار الموكلين في مطالبات التأمين الضخمة وإدارة النزاعات المتعلقة بإعادة التأمين.", en: "Representing major clients in substantial insurance claims and reinsurance disputes." },
    capabilities: [
      { ar: "نزاعات إعادة التأمين الدولية", en: "International Reinsurance Disputes" },
      { ar: "مطالبات الأضرار الجسيمة", en: "Substantial Liability Claims" },
      { ar: "استشارات سياسات التغطية", en: "Coverage Policy Consultation" }
    ]
  },
  {
    id: "realestate",
    num: "08",
    icon: "🏙",
    tag: { ar: "الأصول العقارية", en: "REAL ESTATE ASSETS" },
    title: { ar: "قانون العقارات والاستثمارات الإنشائية", en: "Real Estate Law & Development" },
    desc: { ar: "تأمين المعاملات العقارية الكبرى وتطوير المشاريع الضخمة بضمانات قانونية متكاملة.", en: "Securing major real estate transactions and large-scale developments." },
    capabilities: [
      { ar: "عقود الفيديك والمقاولات الدولية", en: "FIDIC & International Construction Contracts" },
      { ar: "تمويل الاستثمارات العقارية", en: "Real Estate Investment Finance" },
      { ar: "نزاعات الملكية والحقوق العينية", en: "Property Rights & Disputes" }
    ]
  },
  {
    id: "consult",
    num: "09",
    icon: "🏛",
    tag: { ar: "الفكر القانوني", en: "LEGAL INTELLIGENCE" },
    title: { ar: "الاستشارات القانونية والدراسات", en: "Legal Consultation & Advisory" },
    desc: { ar: "تقديم إحاطات قانونية استباقية ودراسات استشرافية للتشريعات وتأثيرها على الأعمال.", en: "Providing proactive legal briefings and forward-looking legislative studies." },
    capabilities: [
      { ar: "صياغة التشريعات واللوائح", en: "Drafting Legislation & Regulations" },
      { ar: "دراسات الجدوى القانونية", en: "Legal Feasibility Studies" },
      { ar: "إدارة الامتثال السيادي", en: "Sovereign Compliance Management" }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: { ar: "مستوى من الحصافة القانونية لا مثيل له. 'البراء' ليس مجرد مكتب محاماة، بل هو شريك استراتيجي في حماية سيادتنا.", en: "A level of legal jurisprudence beyond compare. Al-Baraa is not merely a law firm, but a strategic partner in protecting our sovereignty." },
    name: { ar: "سمو الأمير (...)، رئيس صندوق سيادي", en: "H.H. Prince (...), Sovereign Wealth Fund Chair" },
    initials: { ar: "س", en: "SW" }
  },
  {
    text: { ar: "الدقة والتكتم هما ما يميزان هذا الصرح. لقد عهدنا إليهم بأكثر ملفاتنا حساسية وكانوا نعم الحماة.", en: "Precision and discretion are the hallmarks of this institution. We entrusted them with our most sensitive matters, and they were the ultimate guardians." },
    name: { ar: "الرئيس التنفيذي لشركة تقنية عالمية", en: "CEO, Global Technology Enterprise" },
    initials: { ar: "ص", en: "GT" }
  }
];

export const FAQS: FAQ[] = [
  {
    q: { ar: "كيف يتم ترتيب جلسة إحاطة استراتيجية خاصة؟", en: "How can a private strategic briefing be arranged?" },
    a: { ar: "نستقبل طلبات الإحاطة الخاصة بسرية تامة عبر قنواتنا المشفرة. يتم تخصيص فريق من كبار الشركاء لدراسة الحالة قبل الجلسة الأولى لضمان تقديم رؤية سيادية متكاملة.", en: "Private briefing requests are handled with absolute confidentiality through our encrypted channels. A team of senior partners is assigned to analyze the case prior to the initial session to ensure a comprehensive sovereign perspective." }
  },
  {
    q: { ar: "هل تمتد ممارستكم القانونية لتشمل النزاعات العابرة للحدود؟", en: "Does your practice extend to transcontinental disputes?" },
    a: { ar: "بالتأكيد. نمثل حكومات وكيانات كبرى في مراكز القرار الدولية بما في ذلك لندن، واشنطن، جنيف، ودبي، مع التركيز على حماية المصالح العليا للموكلين.", en: "Certainly. We represent governments and major entities in global decision-making hubs, including London, Washington, Geneva, and Dubai, with a focus on protecting clients' supreme interests." }
  },
  {
    q: { ar: "ما هي معايير قبول القضايا والنزاعات الجديدة؟", en: "What are the criteria for accepting new cases?" },
    a: { ar: "نلتزم بمعايير اختيار صارمة تركز على القضايا ذات التعقيد القانوني العالي والأهمية الاستراتيجية، لضمان تخصيص مواردنا الكاملة لتحقيق التفوق لموكلينا.", en: "We adhere to strict selection criteria, prioritizing cases of high legal complexity and strategic significance to ensure our full resources are dedicated to achieving excellence for our clients." }
  }
];

export const WHY_US = [
  {
    title: { ar: "إرث من الحصافة القانونية", en: "Legacy of Jurisprudence" },
    desc: { ar: "أكثر من ثلاثة عقود من حماية المصالح العليا للدول والأسر الحاكمة بذكاء قانوني فذ.", en: "Over three decades of protecting the supreme interests of states and ruling dynasties with exceptional legal intelligence." }
  },
  {
    title: { ar: "نفوذ عالمي عابر للقارات", en: "Transcontinental Influence" },
    desc: { ar: "شبكة نفوذ قانونية تمتد عبر أعرق المحاكم وهيئات التحكيم الدولية لضمان التفوق المطلق.", en: "A legal influence network spanning the world's most prestigious courts and international arbitration tribunals." }
  },
  {
    title: { ar: "السرية المطلقة والبروتوكولات السيادية", en: "Absolute Discretion & Sovereign Protocols" },
    desc: { ar: "نطبق معايير أمنية سيادية لحماية كافة البيانات والاتصالات القانونية الحساسة.", en: "Applying sovereign-grade security standards to protect all sensitive legal data and communications." }
  },
  {
    title: { ar: "صياغة الحلول القانونية النوعية", en: "Specialized Legal Architecture" },
    desc: { ar: "نصمم بنية قانونية فريدة لكل نزاع تضمن الريادة والسيادة للموكلين.", en: "We architect unique legal structures for every dispute to ensure dominance and sovereignty for our clients." }
  }
];

export const BRIEFINGS: Briefing[] = [
  {
    date: "May 2024",
    title: { ar: "مستقبل الحصانات السيادية في النزاعات العابرة للحدود", en: "The Future of Sovereign Immunities in Transcontinental Disputes" },
    category: { ar: "تحليل سيادي", en: "Sovereign Briefing" }
  },
  {
    date: "March 2024",
    title: { ar: "تحولات التحكيم الدولي في ظل الذكاء الاصطناعي والقوانين الرقمية", en: "Shifts in International Arbitration Amidst AI and Digital Jurisprudence" },
    category: { ar: "ذكاء قانوني", en: "Legal Intelligence" }
  },
  {
    date: "Jan 2024",
    title: { ar: "إعادة تعريف حماية الأصول العائلية في الأنظمة الضريبية الجديدة", en: "Redefining Dynastic Asset Protection in Emerging Tax Regimes" },
    category: { ar: "إدارة الثروات", en: "Wealth Architecture" }
  }
];
