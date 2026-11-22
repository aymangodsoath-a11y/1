import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpLeft,
  BarChart3,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Database,
  Headset,
  Layers3,
  Menu,
  MessageCircle,
  MessageSquareText,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Webhook,
  X,
  Zap,
} from 'lucide-react'

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const processSteps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'عميلك يرسل رسالة',
    body: 'العميل يكتب لرقم واتساب شركتك المعتاد، بدون ما يحمّل تطبيق أو يسجل حساب.',
    detail: 'واتساب العميل ← رقم شركتك',
    tone: 'blue',
  },
  {
    number: '02',
    icon: Webhook,
    title: 'Meta توصل الرسالة',
    body: 'WhatsApp Business Cloud API يرسل الرسالة بأمان إلى الـ Webhook الخاص بمنصتنا.',
    detail: 'Webhook + Phone Number ID',
    tone: 'violet',
  },
  {
    number: '03',
    icon: BrainCircuit,
    title: 'نظامنا يفهم ويرد',
    body: 'نحدد شركتك من Phone Number ID، نسترجع سياق المحادثة ونوجّه الطلب لمزوّد الذكاء الاصطناعي.',
    detail: 'Supabase → AI Router',
    tone: 'cyan',
  },
  {
    number: '04',
    icon: MessageSquareText,
    title: 'الرد يرجع لعميلك',
    body: 'الإجابة توصل مباشرة من رقم واتساب شركتك نفسه — كأن موظفك كتبها.',
    detail: 'رد فوري من رقم شركتك',
    tone: 'green',
  },
]

const faqs = [
  {
    question: 'هل العميل يحتاج ينزّل تطبيق أو يسوي حساب؟',
    answer: 'لا. عميلك يرسل رسالة واتساب عادية لرقم شركتك، ويبدأ المحادثة فوراً.',
  },
  {
    question: 'هل SmartAgent SD يستبدل موظفي الشركة؟',
    answer: 'لا، هو مساعد لفريقك. يتولى الأسئلة المتكررة والردود الأولية، ويتيح تحويل المحادثة لموظف عند الحاجة.',
  },
  {
    question: 'هل المحادثات وبيانات العملاء آمنة؟',
    answer: 'تتكامل الرسائل عبر WhatsApp Business Cloud API الرسمي من Meta، وتُعزل بيانات كل شركة حسب رقمها. لا نعرض مفاتيح الاتصال السرية في واجهة الموقع.',
  },
  {
    question: 'ماذا يحدث إذا توقف مزوّد الذكاء الاصطناعي؟',
    answer: 'يوجّه AI Router الطلب إلى Gemini أولاً، وإذا لم يكن متاحاً أو استنفد الحد المجاني يحوّل تلقائياً إلى Groq.',
  },
]

function Logo({ light = false }) {
  return (
    <a className={`logo ${light ? 'logo-light' : ''}`} href="#main" aria-label="SmartAgent SD، الرئيسية">
      <span className="logo-mark" aria-hidden="true">
        <Bot size={21} strokeWidth={2.2} />
      </span>
      <span className="logo-word">SmartAgent <b>SD</b></span>
    </a>
  )
}

function SectionHeading({ eyebrow, title, description, centered = true }) {
  return (
    <motion.div
      className={`section-heading ${centered ? 'text-center' : ''}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  )
}

function Splash({ onEnter }) {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="splash-orb splash-orb-one" />
      <div className="splash-orb splash-orb-two" />
      <motion.div
        className="splash-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Logo />
        <div className="splash-rule" />
        <p>موظفك الذكي.. أعمالك لا تتوقف <span aria-label="علم السودان">🇸🇩</span></p>
        <motion.button
          className="enter-button"
          onClick={onEnter}
          whileHover={{ scale: 1.045 }}
          whileTap={{ scale: 0.98 }}
          aria-label="ادخل إلى الموقع الرسمي"
        >
          <span className="enter-icon">ب</span>
          <span>ادخل إلى الموقع الرسمي</span>
          <ArrowLeft size={18} />
        </motion.button>
        <div className="splash-caption"><ShieldCheck size={14} /> حلول ذكية لأعمال سودانية طموحة</div>
      </motion.div>
      <span className="splash-bottom">SMART AUTOMATION · BUILT FOR YOUR BUSINESS</span>
    </motion.div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    ['كيف يعمل', '#how-it-works'],
    ['المميزات', '#features'],
    ['الأسئلة الشائعة', '#faq'],
  ]

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="التنقل الرئيسي">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="button button-primary nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            ابدأ مجاناً <ArrowLeft size={16} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

function HeroVisual() {
  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      aria-label="معاينة لوحة SmartAgent ومحادثة واتساب"
    >
      <div className="visual-glow" />
      <div className="dashboard-window">
        <div className="window-top">
          <div className="window-dots"><i /><i /><i /></div>
          <span>لوحة المحادثات</span>
          <span className="online-chip"><span /> متصل</span>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-sidebar">
            <span className="sidebar-logo"><Bot size={19} /></span>
            <span className="sidebar-icon active"><BarChart3 size={17} /></span>
            <span className="sidebar-icon"><MessageCircle size={17} /></span>
            <span className="sidebar-icon"><Users size={17} /></span>
            <span className="sidebar-icon"><Database size={17} /></span>
          </div>
          <div className="dashboard-main">
            <div className="dashboard-title">
              <div><small>الأحد، ٢٢ نوفمبر</small><h3>مرحباً بك 👋</h3></div>
              <span className="avatar">م</span>
            </div>
            <div className="stats-row">
              <div className="stat-card"><span>محادثات اليوم</span><strong>١٢٨</strong><small>↑ ١٨٪ من أمس</small></div>
              <div className="stat-card"><span>تم الرد تلقائياً</span><strong>٩٤٪</strong><small>ممتاز جداً ✨</small></div>
            </div>
            <div className="conversation-card">
              <div className="conversation-head"><div className="conversation-avatar"><Store size={16} /></div><div><strong>مطعم النيل</strong><small>نشط الآن · واتساب</small></div><span className="live-dot" /></div>
              <div className="bubble customer-bubble">عندكم وجبة دجاج وكم سعرها؟</div>
              <div className="bubble bot-bubble">نعم متوفرة 🍗 وجبة الدجاج بـ 10,000 جنيه. تحب نجهز طلبك؟<small>✓✓ <span>الآن</span></small></div>
              <div className="input-preview">اكتب ردّك هنا... <Send size={14} /></div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="floating-note note-top"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="note-icon"><Zap size={17} /></span><span><b>رد فوري</b><small>متاح على مدار الساعة</small></span><span className="note-check"><Check size={13} /></span>
      </motion.div>
      <motion.div
        className="floating-note note-bottom"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="stack-avatars"><i>أ</i><i>م</i><i>س</i></span><span><b>50+ شركة</b><small>من منصة واحدة</small></span>
      </motion.div>
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-pill"><span /> موظفك الذكي على واتساب <ArrowUpLeft size={14} /></span>
          <h1>موظفك الذكي عبر واتساب <span>يرد بدلاً عنك 24/7</span></h1>
          <p>خلّ كل رسالة من عملائك فرصة جديدة. منصتنا تربط رقم واتساب شركتك الرسمي من Meta بالذكاء الاصطناعي، لترد بسرعة واحتراف — حتى وأنت مشغول.</p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href="#contact">ابدأ مجاناً <ArrowLeft size={18} /></a>
            <a className="button button-secondary button-large" href="#how-it-works"><span className="play-icon">▶</span> كيف يعمل</a>
          </div>
          <div className="hero-proof">
            <span><Check size={14} /> WhatsApp API رسمي من Meta</span>
            <span><Check size={14} /> مصمم لأعمال السودان</span>
          </div>
        </motion.div>
        <HeroVisual />
      </div>
      <a className="scroll-cue" href="#how-it-works"><ArrowDown size={16} /> اكتشف كيف يعمل</a>
    </section>
  )
}

function Process() {
  return (
    <section className="section process-section" id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow="ببساطة، أربع خطوات"
          title={<>من أول رسالة إلى <span>رد ذكي</span></>}
          description="رحلة واضحة وآمنة — عميلك يتحدث على واتساب، وSmartAgent يتولى الباقي."
        />
        <div className="steps-grid">
          {processSteps.map(({ number, icon: Icon, title, body, detail, tone }, index) => (
            <motion.article
              className="step-card"
              key={number}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className={`step-icon icon-${tone}`}><Icon size={22} strokeWidth={1.8} /></div>
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="step-detail"><span />{detail}</div>
            </motion.article>
          ))}
        </div>
        <div className="secure-note"><ShieldCheck size={17} /><span>الاتصال يتم عبر واجهات Meta الرسمية مع عزل بيانات كل شركة.</span></div>
      </div>
    </section>
  )
}

function MemorySection() {
  return (
    <section className="section memory-section" id="features">
      <div className="container memory-grid">
        <motion.div
          className="memory-copy"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="eyebrow"><span className="eyebrow-dot" /> ذاكرة مستمرة، ذكاء مرن</span>
          <h2>المحادثة تتذكر. <span>والذكاء ما يوقف.</span></h2>
          <p>ذاكرة المحادثات محفوظة في قاعدة بياناتك — مش داخل نموذج الذكاء الاصطناعي. كل رسالة مرتبطة بمحادثتها في Supabase، لذلك يقدر أي مزوّد يواصل من حيث انتهى المزوّد السابق.</p>
          <ul className="check-list">
            <li><span><Check size={14} /></span>سياق المحادثة محفوظ في جدول Messages المرتبط بـ Conversations</li>
            <li><span><Check size={14} /></span>سجل العميل ومحادثاته يبقوا معك، حتى عند تبديل النموذج</li>
            <li><span><Check size={14} /></span>AI Router يجرّب Gemini أولاً ثم Groq تلقائياً عند الحاجة</li>
          </ul>
        </motion.div>
        <motion.div
          className="router-card"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="router-top"><span className="router-spark"><Sparkles size={17} /></span><span><b>AI Router</b><small>توجيه ذكي تلقائي</small></span><span className="router-status"><i /> نشط</span></div>
          <div className="router-flow">
            <div className="router-node router-input"><MessageSquareText size={17} /><span>رسالة العميل</span></div>
            <div className="flow-line"><i /></div>
            <div className="router-node active-model"><span className="model-symbol gemini">✳</span><span><b>Gemini</b><small>المزوّد الأساسي · 1,500 طلب مجاني</small></span><span className="model-badge">أساسي</span></div>
            <div className="router-switch"><span>عند استنفاد الحد أو عدم التوفر</span><ArrowDown size={15} /></div>
            <div className="router-node fallback-model"><span className="model-symbol groq">G</span><span><b>Groq · Llama</b><small>المزوّد الاحتياطي</small></span><span className="model-badge muted-badge">احتياطي</span></div>
            <div className="flow-line"><i /></div>
            <div className="router-node router-output"><MessageCircle size={17} /><span>رد من رقم شركتك</span><Check size={15} /></div>
          </div>
          <div className="memory-caption"><Database size={14} /> سياق المحادثة محفوظ في Supabase — مستقل عن النموذج</div>
        </motion.div>
      </div>
    </section>
  )
}

function MultiTenant() {
  const tenants = [
    { icon: Store, name: 'مطعم النيل', id: '••• 4821', color: 'tenant-blue' },
    { icon: ShoppingBag, name: 'متجر سُكّر', id: '••• 1093', color: 'tenant-violet' },
    { icon: Headset, name: 'عيادة النور', id: '••• 7650', color: 'tenant-green' },
  ]

  return (
    <section className="section tenants-section">
      <div className="container">
        <SectionHeading
          eyebrow="منصة واحدة، أعمال متعددة"
          title={<>كل شركة في <span>مساحتها الخاصة</span></>}
          description="50 مطعماً و100 متجر — كلهم على منصة واحدة، وكل شركة تشوف بياناتها وحدها."
        />
        <div className="tenant-showcase">
          <motion.div
            className="tenant-visual"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="tenant-visual-head"><Layers3 size={17} /><span>منصة SmartAgent SD</span><span className="tenant-count">١٠٠+ شركة</span></div>
            <div className="tenant-list">
              {tenants.map(({ icon: Icon, name, id, color }, index) => (
                <div className="tenant-row" key={name}>
                  <span className={`tenant-icon ${color}`}><Icon size={18} /></span>
                  <span className="tenant-name"><b>{name}</b><small>WhatsApp Business</small></span>
                  <span className="tenant-id">Phone Number ID <b>{id}</b></span>
                  <span className="tenant-lock"><ShieldCheck size={15} /> معزول</span>
                  {index === 0 && <span className="tenant-row-dot" />}
                </div>
              ))}
            </div>
            <div className="tenant-footer"><span><span />كل شركة لها سياق محادثات مستقل</span><span>عزل حسب Phone Number ID</span></div>
          </motion.div>
          <motion.div
            className="tenant-copy"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="big-stat">١<span>٠٠</span><small>+</small></div>
            <h3>أعمال مختلفة، منصة واحدة.</h3>
            <p>نستخدم Phone Number ID لنعرف الشركة المقصودة بكل رسالة. محادثات مطعمك ما تختلط ببيانات متجر غيرك — لكل مؤسسة بياناتها وسياقها المستقل.</p>
            <div className="isolation-proof"><ShieldCheck size={18} /><span><b>عزل بيانات على مستوى الشركة</b><small>توجيه دقيق لكل رسالة واردة</small></span></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DashboardSection() {
  const metrics = [
    { icon: MessageCircle, label: 'المحادثات', value: '١٢٨', color: 'blue' },
    { icon: Users, label: 'العملاء', value: '٩٤', color: 'violet' },
    { icon: Clock3, label: 'متوسط الرد', value: '٣ ث', color: 'green' },
  ]

  return (
    <section className="section dashboard-section">
      <div className="container">
        <SectionHeading
          eyebrow="كل شيء تحت نظرك"
          title={<>إدارة محادثاتك <span>بكل سهولة</span></>}
          description="لوحة تحكم واضحة تمنحك صورة كاملة عن عملائك وأداء موظفك الذكي."
        />
        <div className="dashboard-showcase">
          <motion.div
            className="admin-window"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="admin-topbar"><div className="window-dots"><i /><i /><i /></div><span className="admin-brand"><span className="admin-brand-icon"><Bot size={15} /></span> SmartAgent <b>لوحة التحكم</b></span><span className="admin-user"><span>م</span> مطعم النيل <ChevronDown size={13} /></span></div>
            <div className="admin-content">
              <div className="admin-greeting"><div><small>الأحد، ٢٢ نوفمبر ٢٠٢٦</small><h3>نظرة عامة</h3></div><button><span /> آخر ٧ أيام <ChevronDown size={13} /></button></div>
              <div className="metric-grid">
                {metrics.map(({ icon: Icon, label, value, color }) => (
                  <div className="metric-card" key={label}><span className={`metric-icon metric-${color}`}><Icon size={17} /></span><small>{label}</small><strong>{value}</strong><span className="metric-trend"><ArrowUpLeft size={12} /> نشط</span></div>
                ))}
              </div>
              <div className="admin-lower">
                <div className="recent-card">
                  <div className="recent-head"><b>أحدث المحادثات</b><a href="#demo">عرض الكل <ArrowLeft size={12} /></a></div>
                  <div className="recent-person"><span className="person-avatar person-one">ع</span><span><b>عمر محمد</b><small>عندكم وجبة دجاج؟</small></span><span className="recent-time">الآن</span></div>
                  <div className="recent-person"><span className="person-avatar person-two">س</span><span><b>سارة أحمد</b><small>ممكن قائمة الأسعار؟</small></span><span className="recent-time">منذ ٤ د</span></div>
                </div>
                <div className="status-card">
                  <b>حالة الخدمات</b>
                  <span><i className="status-good" /> واتساب <small>متصل</small></span>
                  <span><i className="status-good" /> الذكاء الاصطناعي <small>نشط</small></span>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="dashboard-features">
            <div><span className="feature-mini-icon"><BarChart3 size={17} /></span><span><b>أرقام لحظية</b><small>عدد المحادثات وأداء الردود في مكان واحد.</small></span></div>
            <div><span className="feature-mini-icon purple-mini"><Users size={17} /></span><span><b>سجل عملاء مرتب</b><small>اطلع على العملاء ومحادثاتهم السابقة.</small></span></div>
            <div><span className="feature-mini-icon green-mini"><Headset size={17} /></span><span><b>تدخل بشري عند الحاجة</b><small>أوقف الرد الآلي أو حوّل المحادثة لفريقك.</small></span></div>
            <div><span className="feature-mini-icon orange-mini"><ShoppingBag size={17} /></span><span><b>سجّل الطلبات</b><small>تابع طلبات العملاء مباشرة من المحادثة.</small></span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LiveDemo() {
  return (
    <section className="section demo-section" id="demo">
      <div className="container demo-grid">
        <motion.div
          className="demo-copy"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="eyebrow"><span className="eyebrow-dot" /> محادثة في ثوانٍ</span>
          <h2>كأنّ عندك موظف <span>ما يغيب.</span></h2>
          <p>شوف كيف يرد موظفك الذكي على سؤال شائع عند عملاء المطعم — بلهجة واضحة، وبمعلومة شركتك.</p>
          <div className="demo-points"><span><Check size={14} /> يفهم سؤالك بالعربي</span><span><Check size={14} /> يرد من رقم شركتك</span><span><Check size={14} /> جاهز طول اليوم</span></div>
        </motion.div>
        <motion.div
          className="phone-demo"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="phone-notch" />
          <div className="chat-topbar"><span className="chat-back"><ArrowDown size={16} /></span><span className="restaurant-avatar"><Store size={18} /></span><span className="chat-business"><b>مطعم النيل</b><small>متصل الآن</small></span><span className="chat-menu"><i /><i /><i /></span></div>
          <div className="chat-day">اليوم</div>
          <div className="chat-encryption"><ShieldCheck size={12} /> الرسائل والمكالمات مشفّرة من طرف إلى طرف</div>
          <div className="chat-message customer-message">عندكم وجبة دجاج وكم سعرها؟<small>١٢:٤١ م</small></div>
          <motion.div
            className="typing-indicator"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          ><span /><span /><span /></motion.div>
          <motion.div
            className="chat-message business-message"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >نعم متوفرة 🍗<br />وجبة الدجاج بـ <b>10,000 جنيه</b>.<br />تحب نجهز طلبك؟<small>١٢:٤١ م <span>✓✓</span></small></motion.div>
          <div className="chat-input"><span>اكتب رسالة</span><span className="send-button"><Send size={15} /></span></div>
        </motion.div>
      </div>
    </section>
  )
}

function Benefits() {
  const benefits = [
    { icon: Clock3, title: 'متاح على مدار الساعة', body: 'خدمة ترد على استفسارات عملائك حتى خارج ساعات الدوام.' },
    { icon: Zap, title: 'رد أسرع، تجربة أفضل', body: 'عملاؤك يحصلون على إجابة بسرعة، وفريقك يركز على الأهم.' },
    { icon: ShieldCheck, title: 'تكامل رسمي وآمن', body: 'اتصال مع WhatsApp Business Cloud API الرسمي من Meta.' },
  ]
  return (
    <section className="section benefits-section">
      <div className="container">
        <SectionHeading
          eyebrow="أكثر من مجرد رد آلي"
          title={<>وقتك للي <span>يطوّر أعمالك</span></>}
          description="خلّ الأسئلة المتكررة لموظفك الذكي، ووجّه وقتك لخدمة أفضل ونمو أكبر."
        />
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, body }) => (
            <motion.article
              className="benefit-card"
              key={title}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <span className="benefit-icon"><Icon size={21} /></span><h3>{title}</h3><p>{body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <div className="faq-intro">
          <span className="eyebrow"><span className="eyebrow-dot" /> عندك سؤال؟</span>
          <h2>إجابات <span>واضحة.</span></h2>
          <p>أهم الأسئلة عن مساعدك الذكي وكيف يشتغل مع أعمالك.</p>
          <span className="faq-icon"><CircleHelp size={25} /></span>
        </div>
        <div className="faq-list">
          {faqs.map(({ question, answer }, index) => (
            <div className={`faq-item ${openIndex === index ? 'faq-open' : ''}`} key={question}>
              <button
                type="button"
                aria-expanded={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span>{question}</span><ChevronDown size={18} />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  ><p>{answer}</p></motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCTA() {
  return (
    <section className="contact-section" id="contact">
      <div className="container contact-inner">
        <div className="contact-decoration decoration-one" /><div className="contact-decoration decoration-two" />
        <div className="contact-copy">
          <span className="contact-label"><Sparkles size={14} /> خلّنا نبدأ سوا</span>
          <h2>رسالتك الجاية، <span>نرد عليها بذكاء.</span></h2>
          <p>جهّز واتساب شركتك وخلي SmartAgent يساعدك تخدم عملاءك على مدار الساعة.</p>
        </div>
        <a className="button contact-button" href="https://smartagentsd.com" target="_blank" rel="noreferrer">ابدأ رحلتك الآن <ArrowLeft size={17} /></a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Logo />
        <span className="footer-copy">SmartAgent SD © 2026 — جميع الحقوق محفوظة</span>
        <div className="footer-links">
          <a href="https://smartagentsd.com" target="_blank" rel="noreferrer">smartagentsd.com <ArrowUpLeft size={13} /></a>
          <a href="https://x.com/SmartAgentSD" target="_blank" rel="noreferrer">@SmartAgentSD <ArrowUpLeft size={13} /></a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)

  function enterSite() {
    setEntered(true)
    window.history.replaceState(null, '', '#main')
    window.requestAnimationFrame(() => {
      document.getElementById('main')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <>
      <AnimatePresence>{!entered && <Splash key="splash" onEnter={enterSite} />}</AnimatePresence>
      <div id="main">
        <Header />
        <main>
          <Hero />
          <Process />
          <MemorySection />
          <MultiTenant />
          <DashboardSection />
          <LiveDemo />
          <Benefits />
          <FAQ />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
