/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { cn } from './lib/utils';
import { 
  Scale, 
  ShieldCheck, 
  Globe, 
  Award, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ChevronDown,
  Menu,
  X,
  Languages,
  ArrowUpRight,
  Plus,
  Minus,
  Quote,
  Shield,
  BookOpen,
  Calendar,
  Lock,
  ChevronRight
} from 'lucide-react';
import { LAWYERS, CASES, PRACTICES, TESTIMONIALS, FAQS, WHY_US, BRIEFINGS } from './constants';

// --- Types & Context ---
type Language = 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (obj: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('ar');

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (obj: any) => {
    if (!obj) return "";
    return obj[lang] || obj['ar'] || "";
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <div className={cn(lang === 'ar' ? 'font-serif' : 'font-sans')}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
};

// --- Components ---

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative transition-transform duration-200 ease-out", className)}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <button 
        onClick={onClick}
        className="w-full h-full"
      >
        {children}
      </button>
    </div>
  );
};

const Navbar = () => {
  const { lang, toggleLang, t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: { ar: 'الخدمات', en: 'Practice' }, href: '#practice' },
    { name: { ar: 'عن المكتب', en: 'Legacy' }, href: '#about' },
    { name: { ar: 'المحاميين', en: 'Team' }, href: '#lawyers' },
    { name: { ar: 'الأسئلة', en: 'FAQ' }, href: '#faq' },
    { name: { ar: 'تواصل', en: 'Contact' }, href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-12",
      isScrolled ? "h-20 bg-brand-navy/90 backdrop-blur-2xl border-b border-white/5" : "h-24 bg-transparent pt-4"
    )}>
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <a href="#hero" className="flex flex-col group">
          <span className="font-serif text-2xl tracking-[0.2em] uppercase text-brand-gold">البراء</span>
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-50 text-brand-white">INTERNATIONAL LEGAL COUNSEL</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-10">
            {menuItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-white/70 hover:text-brand-gold transition-colors"
              >
                {t(item.name)}
              </a>
            ))}
          </div>
          <div className="h-4 w-px bg-white/10" />
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-white/40 hover:text-brand-gold transition-colors cursor-pointer font-bold"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
          <a href="#contact" className="px-6 py-2 border border-brand-gold text-brand-gold text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 font-bold">
            {t({ ar: 'استشارة خاصة', en: 'Consultation' })}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-brand-gold cursor-pointer"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-brand-navy z-[100] flex flex-col p-8 md:p-12"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.2em] uppercase text-brand-gold">البراء</span>
                <span className="text-[9px] tracking-[0.4em] uppercase opacity-40 text-brand-white">International Legal Counsel</span>
              </div>
              <button className="text-brand-gold bg-white/5 p-3 rounded-full cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-10">
              {menuItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-serif italic text-brand-white hover:text-brand-gold transition-colors"
                >
                  {t(item.name)}
                </a>
              ))}
              <hr className="border-white/10" />
              <button 
                onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
                className="text-xl uppercase tracking-widest text-brand-gold/60 flex items-center gap-3 cursor-pointer font-bold"
              >
                <Languages />
                {lang === 'ar' ? 'Switch to English' : 'تحويل للعربية'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useLang();
  return (
    <section className="relative min-h-screen flex flex-col pt-32 overflow-hidden bg-[#020d1a]">
      {/* Cinematic Abstract Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/80 to-brand-navy" />
        
        {/* Animated Light Beams */}
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], x: [-100, 100, -100] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12"
        />
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-6 grid grid-cols-12 w-full gap-0 relative z-10">
        {/* Side Rail */}
        <div className="hidden lg:flex col-span-1 flex-col justify-center items-center relative border-x border-white/5">
           <div className="vertical-text text-[8px] tracking-[0.6em] uppercase text-brand-gold opacity-40 font-accents">
             Sovereign Excellence
           </div>
           <div className="absolute bottom-10 h-32 w-px bg-gradient-to-b from-brand-gold/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="col-span-12 lg:col-span-11 flex flex-col justify-center lg:pl-28 py-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-gold" />
              <span className="text-luxury text-brand-gold font-black font-accents">
                {t({ ar: 'استشارات سيادية للنخبة العالمية', en: 'Sovereign Counsel for the Global Elite' })}
              </span>
            </div>
            
            <h1 className="text-7xl sm:text-9xl lg:text-[150px] font-serif leading-[0.75] mb-14 text-brand-white">
              <span className="italic block mb-4 opacity-40 font-light">{t({ ar: 'هندسة', en: 'Architecting' })}</span>
              <span className="font-bold tracking-tighter gold-gradient-text block relative">
                {t({ ar: 'السيادة القانونية.', en: 'Legal Supremacy.' })}
              </span>
            </h1>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-start gap-20">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="max-w-md text-2xl leading-relaxed opacity-60 font-light italic text-brand-white"
            >
              {t({ 
                ar: 'نصمم أطراً قانونية تتجاوز الحدود، لحماية مصالح الأسر الحاكمة والكيانات السيادية بأعلى درجات السرية والنفوذ.',
                en: 'Crafting legal frameworks that transcend borders, protecting the interests of ruling dynasties and sovereign entities with total discretion.'
              })}
            </motion.p>

            <div className="flex flex-wrap gap-16 border-l border-white/10 pl-16">
              {[
                { val: { ar: '$20B+', en: '$20B+' }, lbl: { ar: 'أصول مُدارة بقيمة', en: 'Capital Managed' } },
                { val: { ar: 'الأمم المتحدة', en: 'UN Accredited' }, lbl: { ar: 'اعتماد دولي', en: 'International Accreditation' } },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (i * 0.2) }}
                >
                  <span className="block text-4xl font-serif text-brand-gold mb-2 italic">{t(stat.val)}</span>
                  <span className="text-luxury opacity-40 text-brand-white">{t(stat.lbl)}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20 flex gap-8">
             <MagneticButton>
               <div className="bg-brand-gold text-brand-navy px-12 py-5 text-luxury hover:bg-brand-white transition-colors flex items-center gap-4">
                  {t({ ar: 'طلب إحاطة خاصة', en: 'Request a Private Briefing' })}
                  <ArrowUpRight size={14} />
               </div>
             </MagneticButton>
             
             <MagneticButton>
               <div className="border border-white/20 text-brand-white px-12 py-5 text-luxury hover:bg-white/10 transition-colors">
                  {t({ ar: 'إرثنا الاستراتيجي', en: 'Our Strategic Legacy' })}
               </div>
             </MagneticButton>
          </div>
        </div>
      </div>
      
      {/* Animated Light Flare */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none z-0"
      />
    </section>
  );
};

const SectionHeading = ({ label, title, subtitle, centered, dark }: { label: string, title?: string, subtitle?: string, centered?: boolean, dark?: boolean }) => {
  return (
    <div className={cn("mb-28", centered && "text-center")}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn("inline-flex items-center gap-4 mb-8", centered && "justify-center")}
      >
        <span className="text-luxury text-brand-gold font-accents">{label}</span>
      </motion.div>
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
            "text-5xl md:text-7xl font-serif mb-10 leading-[1.1] font-light italic",
            dark ? "text-brand-white" : "text-brand-navy"
          )}
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={cn(
            "max-w-2xl mx-auto font-light italic leading-relaxed text-lg",
            dark ? "text-brand-white/50" : "text-brand-navy/50"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

const About = () => {
  const { t } = useLang();
  return (
    <section id="about" className="py-48 bg-brand-gray relative overflow-hidden">
      {/* Background Architectural Detail */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] text-[30vw] font-serif text-brand-navy/[0.02] select-none italic rotate-[-10deg]">
          Jurisprudence
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center relative z-10">
        <div className="lg:col-span-6">
          <SectionHeading 
            label={t({ ar: 'العقيدة القانونية', en: 'Legal Doctrine' })}
            title={t({ ar: 'هندسة السيادة: ثلاثون عاماً من الدفاع الاستراتيجي', en: 'Architecting Sovereignty: 30 Years of Strategic Defense' })}
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-12 text-brand-navy/70 font-light leading-relaxed text-xl italic"
          >
            <p className="border-l-2 border-brand-gold pl-8 py-2">
              {t({ 
                ar: 'منذ عام ١٩٩٥، يمثل مكتب البراء للمحاماة قمة الحصافة القانونية. نحن لا ندير النزاعات، بل نصمم الأطر التي تضمن الهيمنة القانونية والسيادية للموكلين الأكثر نفوذاً في العالم.', 
                en: 'Since 1995, Al-Baraa has represented the zenith of legal jurisprudence. We do not merely manage disputes; we design the frameworks that ensure legal and sovereign dominance for the world\'s most influential clients.' 
              })}
            </p>
            <p className="text-lg opacity-80 leading-loose">
              {t({ 
                ar: 'رؤيتنا استثنائية؛ نحن نبني حصوناً قانونية تحمي الثروات العائلية والمصالح القومية. بجمعنا بين الدقة المنهجية والذكاء الجيوسياسي، نُعيد صياغة مفهوم التمثيل القانوني النخبوي.', 
                en: 'Our vision is exceptional; we construct legal fortresses that protect family wealth and national interests. By merging methodical precision with geopolitical intelligence, we redefine the concept of elite legal representation.' 
              })}
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-12 mt-20 border-t border-brand-navy/5 pt-12">
            {[
              { val: '30+', lbl: { ar: 'عاماً من الريادة', en: 'Years of Mastery' } },
              { val: '500+', lbl: { ar: 'قضية كبرى', en: 'Grand Cases' } },
              { val: '$15B', lbl: { ar: 'قيمة النزاعات', en: 'Conflict Value' } },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="text-left"
              >
                <div className="text-3xl font-serif text-brand-gold italic mb-2">{stat.val}</div>
                <div className="text-luxury text-brand-navy/40">{t(stat.lbl)}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="aspect-[3/4] overflow-hidden grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 shadow-2xl relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop" 
              alt="Elite Legal Library" 
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
            />
            {/* Elegant Floating Overlay */}
            <div className="absolute inset-0 bg-brand-navy/20 mix-blend-overlay" />
            <div className="absolute inset-0 border-[20px] border-brand-gray/10 m-8 transition-all duration-700 group-hover:border-brand-gold/20" />
            
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-navy p-12 hidden lg:flex flex-col justify-end shadow-2xl">
               <span className="text-luxury text-brand-gold mb-4">Values</span>
               <h3 className="text-2xl font-serif text-brand-white italic mb-4 leading-snug">
                 {t({ ar: 'العدالة هي فن الدقة', en: 'Justice is the Art of Precision' })}
               </h3>
               <div className="w-12 h-[1px] bg-brand-gold" />
            </div>
          </motion.div>

          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -left-12 w-32 h-32 border border-brand-gold/20 rounded-full flex items-center justify-center p-4"
          >
             <div className="w-full h-full border border-brand-gold/10 rounded-full flex items-center justify-center">
                <span className="text-[6px] tracking-[0.4em] uppercase text-brand-gold text-center">Elite Counsel <br /> Since 1995</span>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SovereignBriefings = () => {
  const { t } = useLang();
  return (
    <section id="briefings" className="py-48 bg-brand-gray relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <SectionHeading 
            label={t({ ar: 'العقل الاستراتيجي', en: 'Legal Intelligence' })}
            title={t({ ar: 'إحاطات سيادية: تحليل النفوذ العالمي', en: 'Sovereign Briefings: Global Influence Analysis' })}
            subtitle={t({ ar: 'رؤى قانونية عميقة في تحولات القانون الدولي وحماية المصالح العابرة للقارات.', en: 'Deep legal insights into the transformations of international law and transcontinental protection.' })}
          />
          <MagneticButton>
            <div className="text-luxury text-brand-navy border-b border-brand-navy/20 pb-2 hover:border-brand-navy transition-all flex items-center gap-3">
              {t({ ar: 'عرض جميع التقارير', en: 'View All Intelligence' })}
              <Plus size={12} />
            </div>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BRIEFINGS.map((entry, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-12 border border-brand-navy/5 relative cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              <div className="flex items-center gap-4 text-luxury text-brand-gold opacity-60 mb-6">
                <Calendar size={12} />
                <span>{entry.date}</span>
                <span className="mx-2">•</span>
                <span>{t(entry.category)}</span>
              </div>
              <h3 className="text-3xl font-serif mb-8 text-brand-navy leading-tight group-hover:text-brand-gold transition-colors duration-500">
                {t(entry.title)}
              </h3>
              <div className="flex items-center gap-4 text-brand-navy group-hover:translate-x-2 transition-transform duration-500">
                <div className="w-10 h-[1px] bg-brand-navy" />
                <span className="text-luxury">{t({ ar: 'قراءة التحليل', en: 'Read Analysis' })}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Lawyers = () => {
  const { t } = useLang();
  return (
    <section id="lawyers" className="py-48 bg-brand-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0a1a2f 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading 
          centered
          label={t({ ar: 'المحاميين', en: 'Master Practitioners' })}
          title={t({ ar: 'نخبة العقول القانونية', en: 'Architects of Sovereign Law' })}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 lg:gap-32">
          {LAWYERS.map((lawyer, i) => (
            <motion.div 
              key={lawyer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="group cursor-pointer relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-12 bg-brand-navy shadow-2xl">
                 {/* Cinematic Image Placeholder / Icon Reveal */}
                 <div className="absolute inset-0 flex items-center justify-center text-[280px] font-serif text-white/5 select-none transition-all duration-1000 group-hover:scale-110 group-hover:text-brand-gold/10">
                   {lawyer.badge}
                 </div>
                 
                 {/* Top Overlay Gradients */}
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-60" />
                 
                 {/* Elegant Border Frame */}
                 <div className="absolute inset-0 border border-white/5 m-6 transition-all duration-700 group-hover:border-brand-gold/30" />

                 {/* Corner Branding */}
                 <div className="absolute top-10 left-10 text-[8px] tracking-[0.4em] uppercase text-brand-gold/30 group-hover:text-brand-gold transition-colors">
                   Master Counsel
                 </div>
                 
                 <div className="absolute bottom-10 left-10 text-white flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-700">
                    <div className="w-1 h-8 bg-brand-gold" />
                    <div>
                       <div className="text-luxury text-brand-gold mb-1 opacity-60">{t(lawyer.role)}</div>
                       <div className="text-[10px] uppercase tracking-widest font-bold">{t(lawyer.spec)}</div>
                    </div>
                 </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-4xl font-serif mb-4 text-brand-navy group-hover:text-brand-gold transition-colors duration-700 tracking-tighter uppercase italic">{t(lawyer.name)}</h3>
                <div className="flex items-center justify-center gap-4 opacity-20 group-hover:opacity-100 transition-all duration-700">
                  <div className="h-px w-10 bg-brand-navy" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-navy">{t(lawyer.years)}</span>
                  <div className="h-px w-10 bg-brand-navy" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Practices = () => {
  const { t } = useLang();
  return (
    <section id="practice" className="py-48 bg-brand-navy relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
         <div className="absolute top-[20%] left-[10%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-brand-gold to-transparent" />
         <div className="absolute top-[20%] right-[10%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-brand-gold to-transparent" />
      </div>
      
      <div className="absolute bottom-0 right-10 text-[25vw] font-serif text-white/[0.01] pointer-events-none select-none italic leading-none translate-y-1/2">
         Practice
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading 
          dark
          label={t({ ar: 'مجالات الممارسة', en: 'Core Jurisdictions' })}
          title={t({ ar: 'هندسة قانونية للأزمات والحلول', en: 'Mastering Complexity with Absolute Precision' })}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
          {PRACTICES.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
              className="p-20 lg:p-24 transition-all duration-700 group cursor-pointer relative"
            >
              {/* Ghost Index Number */}
              <div className="absolute top-12 right-12 text-7xl font-serif text-white/5 italic select-none transition-all duration-700 group-hover:text-brand-gold/10 group-hover:-translate-y-4">
                {p.num}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-px bg-brand-gold/30 group-hover:w-12 group-hover:bg-brand-gold transition-all duration-700" />
                  <span className="text-luxury text-brand-gold/50 block group-hover:text-brand-gold transition-colors">{t(p.tag)}</span>
                </div>
                
                <h3 className="text-4xl lg:text-5xl font-serif italic text-brand-white mb-10 group-hover:translate-x-3 transition-transform duration-700">{t(p.title)}</h3>
                <p className="text-brand-white/40 font-light leading-relaxed text-lg italic mb-14 max-w-sm group-hover:text-brand-white/60 transition-colors">{t(p.desc)}</p>
                
                <div className="grid grid-cols-1 gap-y-4 pt-10 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
                   {p.capabilities.map((cap, j) => (
                     <div key={j} className="flex items-center gap-4">
                        <Plus size={10} className="text-brand-gold" />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-brand-white/60 font-medium hover:text-brand-gold transition-colors">{t(cap)}</span>
                     </div>
                   ))}
                </div>
              </div>
              
              {/* Interactive Corner Accent */}
              <div className="absolute bottom-12 right-12 w-14 h-14 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 hover:bg-brand-gold hover:text-brand-navy hover:scale-110">
                 <ArrowUpRight size={20} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const { t } = useLang();
  return (
    <section id="why-us" className="py-48 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed opacity-[0.03] grayscale" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-4">
            <SectionHeading 
              dark
              label={t({ ar: 'الفلسفة الاستراتيجية', en: 'Strategic Philosophy' })}
              title={t({ ar: 'لماذا يختارنا ملوك السوق وصناع القرار؟', en: 'The Preference of Sovereigns' })}
            />
          </div>
          
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {WHY_US.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-12 glass-card hover:border-brand-gold/40 transition-all duration-700"
                >
                  <div className="w-10 h-10 border border-brand-gold/20 flex items-center justify-center mb-10 group-hover:border-brand-gold transition-colors">
                     <span className="text-brand-gold font-serif text-xl italic">{i + 1}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-brand-white mb-6 italic">{t(item.title)}</h3>
                  <p className="text-brand-white/40 font-light leading-relaxed italic">{t(item.desc)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { t } = useLang();
  return (
    <section id="testimonials" className="py-40 bg-brand-white overflow-hidden relative">
      {/* Ghost Quote Icon */}
      <div className="absolute top-20 left-20 text-[20vw] text-brand-navy/[0.02] font-serif select-none pointer-events-none italic">
         Voices
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading 
          centered
          label={t({ ar: 'قالوا عنا', en: 'Client Voices' })}
          title={t({ ar: 'شهادات نعتز بها من النخبة', en: 'Vetted by Global Market Leaders' })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {TESTIMONIALS.map((test, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="relative p-16 lg:p-20 bg-brand-gray border border-brand-navy/[0.03] group hover:border-brand-gold/20 transition-all duration-700 cursor-default"
            >
              <Quote className="absolute top-10 left-10 text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors" size={60} strokeWidth={1} />
              <p className="text-2xl lg:text-3xl font-serif text-brand-navy italic leading-relaxed mb-12 relative z-10">
                "{t(test.text)}"
              </p>
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 bg-brand-navy flex items-center justify-center text-brand-gold font-serif italic text-2xl border border-brand-gold/20 group-hover:scale-110 transition-transform duration-700">
                  {t(test.initials)}
                </div>
                <div>
                  <h4 className="text-luxury text-brand-navy mb-2">{t(test.name)}</h4>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(s => <div key={s} className="w-1.5 h-1.5 bg-brand-gold rounded-full opacity-40" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-48 bg-brand-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeading 
          centered
          label={t({ ar: 'الإحاطة المعرفية', en: 'Strategic FAQ' })}
          title={t({ ar: 'أسئلة شائعة حول التمثيل السيادي', en: 'Inquiries of Intent' })}
        />
        
        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <div 
              key={i}
              className="border-b border-brand-navy/5 overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-10 flex items-center justify-between text-left group"
              >
                <span className={cn(
                  "text-2xl md:text-3xl font-serif italic transition-colors duration-500",
                  openIndex === i ? "text-brand-gold" : "text-brand-navy group-hover:text-brand-gold"
                )}>
                  {t(faq.q)}
                </span>
                <div className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500",
                  openIndex === i ? "border-brand-gold bg-brand-gold text-brand-navy rotate-45" : "border-brand-navy/10 text-brand-navy"
                )}>
                  <Plus size={18} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                  >
                    <div className="pb-12 text-xl font-light leading-relaxed text-brand-navy/60 italic max-w-3xl">
                      {t(faq.a)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useLang();
  return (
    <section id="contact" className="py-48 bg-brand-gray relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-navy/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div>
          <SectionHeading 
            label={t({ ar: 'كونسيرج قانوني', en: 'Elite Concierge' })}
            title={t({ ar: 'تواصل مباشر مع الدائرة المقربة', en: 'Direct Access to the Inner Circle' })}
          />
          <p className="text-2xl text-brand-navy/60 font-light italic leading-loose mb-16">
            {t({ 
              ar: 'نحن نقبل فقط القضايا التي تليق بمقام ممارستنا العالمية. طلب الإحاطة الخاص بك سيُعامل ببروتوكولات دفاعية مشفرة.',
              en: "We accept limited engagements that require strategic mastery. Your inquiry will be handled with sovereign-grade encryption and total discretion."
            })}
          </p>
          
          <div className="space-y-12 group">
             {[
               { icon: <Lock size={20} />, label: { ar: 'قنوات مشفرة', en: 'Secure Line' }, value: { ar: 'الرد خلال ساعات من الإحاطة', en: 'Handled by Senior Partners Only' } },
               { icon: <Mail size={20} />, label: { ar: 'البريد السيادي', en: 'Sovereign Mail' }, value: { ar: 'counsel@al-baraa.law', en: 'counsel@al-baraa.law' } },
               { icon: <Globe size={20} />, label: { ar: 'المقر العالمي', en: 'Global HQ' }, value: { ar: 'مركز دبي المالي العالمي، دبي', en: 'DIFC, Dubai, UAE' } },
             ].map((item, i) => (
               <div key={i} className="flex items-start gap-8 group/item">
                  <div className="w-14 h-14 flex items-center justify-center border border-brand-navy/5 bg-brand-white text-brand-gold group-hover/item:border-brand-gold transition-all duration-500 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-luxury text-brand-navy/40 mb-2">{t(item.label)}</div>
                    <div className="text-2xl font-serif text-brand-navy italic">{t(item.value)}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="p-16 lg:p-20 bg-brand-navy border border-white/10 relative shadow-2xl overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-1 bg-brand-gold" />
           <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-luxury text-brand-gold">{t({ ar: 'الاسم الملقب', en: 'Formal Title & Name' })}</label>
                  <input type="text" className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors font-serif italic text-xl" />
                </div>
                <div className="space-y-4">
                  <label className="text-luxury text-brand-gold">{t({ ar: 'رقم الاتصال الآمن', en: 'Secure Contact' })}</label>
                  <input type="text" className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors font-serif italic text-xl" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-luxury text-brand-gold">{t({ ar: 'البريد الإلكتروني', en: 'Confidential Email' })}</label>
                <input type="email" className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors font-serif italic text-xl" />
              </div>
              <div className="space-y-4">
                <label className="text-luxury text-brand-gold">{t({ ar: 'ملخص الإحاطة', en: 'Case Briefing' })}</label>
                <textarea rows={4} className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none font-serif italic text-xl" />
              </div>
              <MagneticButton className="w-full mt-12">
                <div className="w-full py-6 bg-brand-gold text-brand-navy text-luxury hover:bg-brand-white transition-all duration-700">
                  {t({ ar: 'إرسال الإحاطة الاستراتيجية', en: 'Send Strategic Briefing' })}
                </div>
              </MagneticButton>
           </form>
           <p className="mt-10 text-[9px] uppercase tracking-[0.3em] text-brand-white/20 text-center flex items-center justify-center gap-4">
             <Lock size={12} className="text-brand-gold/40" />
             {t({ ar: 'بروتوكول تشفير سيادي مفعل', en: 'Sovereign SSL Activation Active' })}
           </p>
        </div>
      </div>
    </section>
  );
};

 const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
    >
      <motion.div 
        animate={{ 
          scale: isPointer ? 2.5 : 1,
          borderColor: isPointer ? 'rgba(201, 162, 74, 1)' : 'rgba(201, 162, 74, 0.4)',
          backgroundColor: isPointer ? 'rgba(201, 162, 74, 0.1)' : 'transparent'
        }}
        className="w-8 h-8 rounded-full border border-brand-gold -ml-4 -mt-4 transition-all duration-300"
      >
        {isPointer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <div className="w-1 h-1 bg-brand-navy rounded-full" />
          </motion.div>
        )}
      </motion.div>
      <div className="absolute w-[2px] h-[2px] bg-brand-gold rounded-full -ml-[1px] -mt-[1px]" />
    </motion.div>
  );
};

const Preloader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5, ease: "easeInOut" }}
      onAnimationComplete={() => document.body.style.overflow = 'auto'}
      className="fixed inset-0 z-[10000] bg-brand-navy flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ duration: 1.5, ease: "circIn" }}
          className="h-px bg-brand-gold mb-8 mx-auto"
        />
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <div className="text-luxury text-brand-gold mb-2">Since 1995</div>
          <h2 className="text-4xl font-serif text-brand-white italic tracking-tighter">AL-BARAA</h2>
        </motion.div>
      </div>
      
      {/* Decorative Circles */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] border border-brand-gold/10 rounded-full"
      />
    </motion.div>
  );
};

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="bg-brand-navy pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 text-[15vw] font-serif text-white/[0.01] pointer-events-none select-none italic translate-y-[-20%]">
         Sovereign
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-24">
          <div className="md:col-span-5">
            <div className="text-3xl font-serif text-brand-white italic mb-10">AL-BARAA</div>
            <p className="text-brand-white/40 text-lg font-light leading-relaxed mb-12 max-w-sm italic">
              {t({ 
                ar: 'نحن لا نقدم الدفاع فحسب، بل نصمم الهياكل القانونية التي تضمن السيادة والخلود لإرث عملائنا عبر القارات.',
                en: 'Providing architectural legal defense that ensures sovereignty and immortality for our clients legacies across continents.'
              })}
            </p>
            <div className="flex gap-8">
               {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                 <a key={social} href="#" className="text-[10px] uppercase tracking-[0.3em] text-brand-gold hover:text-brand-white transition-colors">{social}</a>
               ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-luxury text-brand-white mb-10">{t({ ar: 'المؤسسة', en: 'Institution' })}</h4>
            <ul className="space-y-6 text-sm text-brand-white/40 font-light italic">
              <li><a href="#about" className="hover:text-brand-gold transition-colors">{t({ ar: 'إرثنا', en: 'Our Legacy' })}</a></li>
              <li><a href="#practice" className="hover:text-brand-gold transition-colors">{t({ ar: 'الممارسة', en: 'Jurisdictions' })}</a></li>
              <li><a href="#lawyers" className="hover:text-brand-gold transition-colors">{t({ ar: 'المحاميين', en: 'Practitioners' })}</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-luxury text-brand-white mb-10">{t({ ar: 'الخصوصية', en: 'Privacy' })}</h4>
            <ul className="space-y-6 text-sm text-brand-white/40 font-light italic">
               <li><a href="#" className="hover:text-brand-gold transition-colors">{t({ ar: 'اتفاقية السرية', en: 'Discretion Policy' })}</a></li>
               <li><a href="#" className="hover:text-brand-gold transition-colors">{t({ ar: 'الشروط', en: 'Terms of Counsel' })}</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
             <h4 className="text-luxury text-brand-white mb-10">{t({ ar: 'التواصل المباشر', en: 'Elite Concierge' })}</h4>
             <div className="space-y-8">
                <div>
                   <span className="block text-[10px] uppercase tracking-widest text-brand-gold mb-2">Primary Chamber</span>
                   <p className="text-brand-white/60 font-medium tracking-tight">Dubai International Financial Centre</p>
                </div>
                <div>
                   <span className="block text-[10px] uppercase tracking-widest text-brand-gold mb-2">Secure Line</span>
                   <p className="text-brand-white/60 font-medium tracking-tight">+971 4 555 0000</p>
                </div>
             </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] uppercase tracking-[0.2em] text-brand-white/20 font-bold">
             © {new Date().getFullYear()} AL-BARAA LEGAL CHAMBERS. ALL RIGHTS RESERVED.
           </p>
           <div className="flex items-center gap-4 text-brand-gold/40">
              <Shield size={12} />
              <span className="text-[9px] uppercase tracking-[0.3em] font-black">Certifiably Sovereign</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <LanguageProvider>
      <div className="relative selection:bg-brand-gold selection:text-brand-navy">
        <div className="noise-overlay" />
        <Preloader />
        <CustomCursor />
        <Navbar />
        <motion.main
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 3, ease: "easeOut" }}
        >
          <Hero />
          <About />
          <Lawyers />
          <Practices />
          <SovereignBriefings />
          <WhyChooseUs />
          <Testimonials />
          <FAQSection />
          <Contact />
          <Footer />
        </motion.main>
      </div>
    </LanguageProvider>
  );
}
