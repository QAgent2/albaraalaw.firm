import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { useLang } from './LanguageContext';
import { MagneticButton } from './MagneticButton';
import { cn } from '../lib/utils';
import { 
  ShieldCheck, 
  Globe, 
  Mail, 
  ArrowUpRight,
  Plus,
  Quote,
  Shield,
  Calendar,
  Lock,
  Menu,
  X,
  Languages,
  Scale,
  Landmark,
  Handshake,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { LAWYERS, PRACTICES, TESTIMONIALS, FAQS, WHY_US, BRIEFINGS } from '../constants';

// --- Shared Components ---

const SectionHeading = ({ label, title, subtitle, centered, dark, number }: { label: string, title?: string, subtitle?: string, centered?: boolean, dark?: boolean, number?: string }) => {
  return (
    <header className={cn("mb-28", centered && "text-center")}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn("inline-flex items-center gap-6 mb-8", centered && "justify-center")}
      >
        {number && <span className="text-[10px] font-serif italic text-brand-gold-light/40 mr-4 tracking-widest">{number}</span>}
        <div className="w-6 h-[1px] bg-brand-gold-light/30" />
        <span className="text-[9px] tracking-[0.6em] uppercase font-bold text-brand-gold-light font-accents" aria-hidden="true">{label}</span>
        <div className="w-6 h-[1px] bg-brand-gold-light/30" />
      </motion.div>
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-serif mb-10 leading-[1.1] font-light italic tracking-tight",
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
          transition={{ delay: 0.3, duration: 1 }}
          className={cn(
            "max-w-2xl mx-auto font-light italic leading-relaxed text-lg mb-10",
            dark ? "text-brand-white/40" : "text-brand-navy/50"
          )}
        >
          {subtitle}
        </motion.p>
      )}
      <div className={cn("w-16 h-px bg-brand-gold-light/20", centered && "mx-auto")} />
    </header>
  );
};

// --- Navbar ---

const Navbar = () => {
  const { lang, toggleLang, t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const menuItems = [
    { name: { ar: 'الخدمات', en: 'Practice' }, href: '#practice' },
    { name: { ar: 'إرثنا', en: 'Legacy' }, href: '#about' },
    { name: { ar: 'المحاميين', en: 'Team' }, href: '#lawyers' },
    { name: { ar: 'البحوث', en: 'Insights' }, href: '#briefings' },
    { name: { ar: 'تواصل', en: 'Contact' }, href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-1000 px-6 lg:px-16",
      isScrolled ? "h-20 bg-brand-navy/10 backdrop-blur-xl border-b border-white/[0.05]" : "h-28 bg-transparent pt-4"
    )} aria-label="Main Navigation">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
        <a href="#hero" className={cn(
          "flex flex-col group transition-all duration-700 hover:scale-105",
          isScrolled ? "opacity-60" : "opacity-100"
        )} aria-label="Al-Baraa Homepage">
          <span className="font-serif text-3xl tracking-[0.25em] uppercase text-brand-gold-light leading-none">البراء</span>
          <span className="text-[8px] tracking-[0.5em] uppercase opacity-40 text-brand-white mt-1">INTERNATIONAL COUNSEL</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex gap-12">
            {menuItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-white/50 hover:text-brand-gold-light transition-all duration-300 relative group/link"
              >
                {t(item.name)}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-gold-light transition-all duration-500 group-hover/link:w-full" />
              </a>
            ))}
          </div>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-brand-gold-light/60 hover:text-brand-white transition-colors cursor-pointer font-bold"
            aria-label="Toggle Language"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
          <a href="#contact" className="px-8 py-3 bg-brand-gold-light/10 border border-brand-gold-light/30 text-brand-gold-light text-[10px] uppercase tracking-[0.3em] hover:bg-brand-gold-light hover:text-brand-navy transition-all duration-500 font-bold glass-card">
            {t({ ar: 'استشارة خاصة', en: 'Consultation' })}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-brand-gold-light p-2 transition-transform hover:scale-110 active:scale-95"
          onClick={() => setMobileMenuOpen(true)}
          aria-expanded={mobileMenuOpen}
          aria-label="Open Menu"
        >
          <Menu strokeWidth={1} />
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
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.2em] uppercase text-brand-gold">البراء</span>
                <span className="text-[9px] tracking-[0.4em] uppercase opacity-40 text-brand-white">International Legal Counsel</span>
              </div>
              <button 
                className="text-brand-gold bg-white/5 p-3 rounded-full cursor-pointer" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8 overflow-y-auto">
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

// --- Sections ---

const Hero = () => {
  const { t } = useLang();
  return (
    <section id="hero" className="relative min-h-[110vh] flex flex-col justify-center overflow-hidden bg-brand-navy">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/60 to-brand-navy" />
        
        {/* Cinematic Atmospheric Light Sweeps */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            x: ['-20%', '20%', '-20%']
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(216,188,114,0.05),transparent_60%)] blur-[80px]"
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-6 mb-12">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-px bg-brand-gold-light" 
                />
                <span className="text-[11px] tracking-[0.5em] uppercase font-bold text-brand-gold-light/80 font-accents">
                  {t({ ar: 'مستشارون قانونيون دوليون', en: 'International Senior Counsel' })}
                </span>
              </div>
              
              <h1 className="text-6xl sm:text-8xl lg:text-[110px] font-serif leading-[0.85] mb-12 text-brand-white relative">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="italic block mb-6 opacity-30 font-light tracking-tight"
                >
                  {t({ ar: 'صياغة', en: 'Architecting' })}
                </motion.span>
                <div className="relative inline-block">
                  <span className="font-bold tracking-tighter block gold-gradient-text drop-shadow-[0_10px_30px_rgba(201,162,74,0.15)] pb-4">
                    {t({ ar: 'السيادة القانونية.', en: 'Legal Supremacy.' })}
                  </span>
                  {/* Subtle Light Reflection under text */}
                  <div className="absolute -bottom-2 left-0 w-full h-8 bg-brand-gold/5 blur-xl -z-10" />
                </div>
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="max-w-xl text-xl lg:text-2xl leading-relaxed text-brand-white/50 font-light italic mb-16 border-s border-white/5 ps-10"
              >
                {t({ 
                  ar: 'نصمم أطراً قانونية تتجاوز الحدود، لحماية مصالح الأسر الحاكمة والكيانات السيادية بأعلى درجات السرية.',
                  en: 'Crafting legal frameworks that transcend borders, protecting the interests of ruling dynasties with absolute discretion.'
                })}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-wrap gap-8"
              >
                <MagneticButton onClick={() => window.location.href = '#contact'}>
                  <div className="group bg-brand-gold-light text-brand-navy px-14 py-6 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-white transition-all duration-500 flex items-center gap-5 shadow-2xl shadow-brand-gold/10">
                    {t({ ar: 'طلب إحاطة خاصة', en: 'Request a Private Briefing' })}
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </MagneticButton>
                
                <MagneticButton onClick={() => window.location.href = '#about'}>
                  <div className="px-14 py-6 border border-white/10 text-brand-white/80 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white/5 transition-all duration-500 backdrop-blur-sm glass-card">
                    {t({ ar: 'إرثنا الاستراتيجي', en: 'Our Strategic Legacy' })}
                  </div>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats / Accents Area */}
          <div className="col-span-12 lg:col-span-4 lg:ps-12 flex flex-col gap-12 border-s border-white/[0.03] py-12">
            {[
              { val: { ar: '$20B+', en: '$20B+' }, lbl: { ar: 'أصول مُدارة بقيمة', en: 'Capital Managed' }, icon: <Shield size={16} className="text-brand-gold-light/40" /> },
              { val: { ar: 'التميز السيادي', en: 'Sovereign Distinction' }, lbl: { ar: 'اعتماد دولي', en: 'International Vetting' }, icon: <Globe size={16} className="text-brand-gold-light/40" /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + (i * 0.2), duration: 0.8 }}
                className="group p-8 bg-white/[0.02] border border-white/[0.05] relative overflow-hidden transition-all duration-500 hover:bg-white/[0.04]"
              >
                 <div className="relative z-10 flex items-start gap-5">
                    <div className="mt-1">{stat.icon}</div>
                    <div>
                      <div className="text-3xl font-serif text-brand-gold-light mb-3 italic tracking-tight">{t(stat.val)}</div>
                      <div className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-white/30 group-hover:text-brand-white/50 transition-colors uppercase">{t(stat.lbl)}</div>
                    </div>
                 </div>
                 {/* Decorative background number/letter */}
                 <div className="absolute -bottom-4 -right-2 text-7xl font-serif text-white/[0.02] italic pointer-events-none group-hover:text-brand-gold/[0.03] transition-colors">{i === 0 ? 'Σ' : 'Ω'}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Hero Footnote / Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] tracking-[0.6em] uppercase text-brand-white font-bold">SCROLL TO DISCOVER</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold-light to-transparent" />
      </motion.div>

    </section>
  );
};

const About = () => {
  const { t } = useLang();
  return (
    <section id="about" className="py-56 bg-brand-white relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gray/50 -skew-x-12 translate-x-1/2" />
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-brand-gold-light/10 rounded-full" />
      
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center relative z-10">
        <div className="lg:col-span-6 relative order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            <figure className="aspect-[4/5] lg:aspect-[3/4] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative group">
              <img 
                loading="lazy"
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Elite Law Firm Headquarters" 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-navy/5 mix-blend-multiply transition-opacity group-hover:opacity-0" />
              
              <div className="absolute -bottom-12 -right-12 w-80 bg-brand-navy p-14 hidden xl:block shadow-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-brand-gold-light mb-6 block font-accents">Our Core Doctrine</span>
                  <h3 className="text-3xl font-serif text-brand-white italic mb-8 leading-tight">
                    {t({ ar: 'العدالة هي فن الدقة المتناهية', en: 'Justice is the Art of Infinite Precision' })}
                  </h3>
                  <div className="w-16 h-[1px] bg-brand-gold-light/40" />
                </motion.div>
              </div>
            </figure>
          </motion.div>
        </div>

        <article className="lg:col-span-6 order-1 lg:order-2 lg:ps-12">
          <SectionHeading 
            number="I"
            label={t({ ar: 'العقيدة الاستراتيجية', en: 'Strategic Doctrine' })}
            title={t({ ar: 'صناعة السيادة: ثلاثة عقود من الدفاع النخبوي', en: 'Architecting Sovereignty: Three Decades of Elite Defense' })}
          />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="space-y-10 text-brand-navy/60 font-light leading-relaxed text-xl"
          >
            <blockquote className="border-s-[3px] border-brand-gold-light ps-10 py-2 italic text-brand-navy/80">
              {t({ 
                ar: 'منذ عام ١٩٩٥، يمثل مكتب البراء قمة الحصافة القانونية الدولية. نحن لا ندير القضايا فحسب، بل نصمم الأطر السيادية التي تضمن الريادة لعملائنا الأكثر نفوذاً في العالم.', 
                en: 'Since 1995, Al-Baraa has stood as the pinnacle of international legal prudence. We do not merely handle cases; we architect the sovereign frameworks that ensure preeminence for the world\'s most influential figures.' 
              })}
            </blockquote>
            <p className="ps-10">
              {t({ 
                ar: 'رؤيتنا تتجاوز المألوف؛ نحن نبني حصوناً قانونية تحمي الثروات العابرة للأجيال والمصالح الاستراتيجية العليا. بجمعنا بين الدقة المنهجية والذكاء القانوني المعاصر، نُعيد صياغة مفهوم التمثيل الفاخر.', 
                en: 'Our vision transcends the ordinary; we build legal fortresses that protect generational wealth and supreme strategic interests. By merging methodical precision with contemporary legal intelligence, we redefine luxury representation.' 
              })}
            </p>
            
            <div className="ps-10 pt-8 flex items-center gap-10">
               <div className="flex flex-col">
                  <span className="text-4xl font-serif text-brand-navy mb-1 italic">30+</span>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-brand-gold-light">Years Experience</span>
               </div>
               <div className="w-px h-12 bg-brand-navy/10" />
               <div className="flex flex-col">
                  <span className="text-4xl font-serif text-brand-navy mb-1 italic">Global</span>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-brand-gold-light">Jurisdiction</span>
               </div>
            </div>
          </motion.div>
        </article>
      </div>
    </section>
  );
};

const Lawyers = () => {
  const { t } = useLang();
  return (
    <section id="lawyers" className="py-56 bg-brand-white relative overflow-hidden">
      {/* Refined Accents for Light Section */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-gray/50 to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        <SectionHeading 
          centered
          number="IV"
          label={t({ ar: 'النخبة القانونية', en: 'The Legal Elite' })}
          title={t({ ar: 'عقول تصوغ السيادة الاستراتيجية', en: 'Architects of Sovereign Intelligence' })}
          subtitle={t({ 
            ar: 'فريق من كبار المفكرين القانونيين، يجمعون بين المعرفة العميقة والرؤية السياسية لضمان التفوق المطلق في أعقد القضايا الدولية.',
            en: 'A vanguard of legal masterminds, merging profound jurisprudential knowledge with geo-strategic insight to ensure absolute preeminence.'
          })}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {LAWYERS.map((lawyer, i) => (
            <motion.article 
              key={lawyer.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative mb-12 bg-brand-navy overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
                 <div className="aspect-[3/4] overflow-hidden">
                    {lawyer.image && (
                      <img 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        src={lawyer.image} 
                        alt={t(lawyer.name)} 
                        className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-[1.5s] group-hover:scale-105"
                      />
                    )}
                 </div>
                 
                 {/* Decorative Overlay */}
                 <div className="absolute inset-0 border-[1px] border-white/10 m-6 pointer-events-none transition-all duration-700 group-hover:m-0 group-hover:border-brand-gold-light/40" />
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />
                 
                 <div className="absolute bottom-0 left-0 right-0 p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="flex flex-col gap-3">
                       <span className="text-[9px] tracking-[0.5em] uppercase font-bold text-brand-gold-light/80 font-accents">{t(lawyer.role)}</span>
                       <h3 className="text-3xl font-serif text-brand-white italic leading-tight mb-2">{t(lawyer.name)}</h3>
                       <div className="w-12 h-[1px] bg-brand-gold-light/40 transition-all duration-700 group-hover:w-full" />
                    </div>
                 </div>
              </div>

              <div className="px-4 space-y-6">
                <p className="text-brand-navy/60 font-light italic text-xl leading-relaxed group-hover:text-brand-navy transition-colors">{t(lawyer.spec)}</p>
                <div className="flex items-center gap-6 pt-4">
                   <div className="h-px w-8 bg-brand-navy/10" />
                   <span className="text-[10px] tracking-[0.3em] font-bold text-brand-navy/30 uppercase">{t(lawyer.years)}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-32 p-14 border border-brand-navy/5 bg-brand-gray/40 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="flex items-center gap-8">
            <div className="w-14 h-14 rounded-full border border-brand-gold-light/30 flex items-center justify-center text-brand-gold-light">
              <Globe size={20} />
            </div>
            <div>
              <h4 className="text-2xl font-serif italic text-brand-navy mb-1">{t({ ar: 'رؤية عالمية، حماية محلية', en: 'Global Vision, Local Protection' })}</h4>
              <p className="text-brand-navy/40 text-sm font-light italic">{t({ ar: 'نحن نجمع بين أذكى العقول القانونية لضمان سيادتكم.', en: 'We unite the sharpest legal minds to ensure your sovereignty.' })}</p>
            </div>
          </div>
          <MagneticButton>
            <a href="#contact" className="px-10 py-5 bg-brand-navy text-brand-white text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-brand-gold-light hover:text-brand-navy transition-all duration-500 shadow-xl shadow-brand-navy/10">
              {t({ ar: 'حجز جلسة إحاطة', en: 'Book Briefing' })}
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

const Practices = () => {
  const { t } = useLang();
  
  const getIcon = (iconStr: string) => {
    switch (iconStr) {
      case "⚖": return <Scale size={40} strokeWidth={1} />;
      case "🏰": return <Landmark size={40} strokeWidth={1} />; 
      case "⬡": return <ShieldCheck size={40} strokeWidth={1} />;
      case "🤝": return <Handshake size={40} strokeWidth={1} />; 
      case "🛡": return <Shield size={40} strokeWidth={1} />;
      case "📜": return <BookOpen size={40} strokeWidth={1} />; 
      case "☂": return <Shield size={40} strokeWidth={1} />; 
      case "🏙": return <Globe size={40} strokeWidth={1} />; 
      case "🏛": return <Landmark size={40} strokeWidth={1} />; 
      default: return <Briefcase size={40} strokeWidth={1} />;
    }
  };

  return (
    <section id="practice" className="py-56 bg-brand-navy relative overflow-hidden">
       {/* Cinematic Accents */}
       <div className="absolute inset-0 opacity-[0.05] grayscale pointer-events-none">
          <img 
            referrerPolicy="no-referrer"
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
       </div>
       <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/80 to-brand-navy" />
       
       <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <SectionHeading 
            dark
            centered
            number="II"
            label={t({ ar: 'مجالات الممارسة', en: 'Core Jurisdictions' })}
            title={t({ ar: 'حلول قانونية للأزمات والنزاعات', en: 'Mastering Complexity with Absolute Precision' })}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-3xl">
             {PRACTICES.map((p, i) => (
                <article key={p.id} className="p-14 lg:p-16 transition-all duration-700 bg-brand-navy hover:bg-white/[0.03] border border-white/5 group">
                   <div className="text-brand-gold-light mb-10 group-hover:scale-110 transition-transform origin-left opacity-60 group-hover:opacity-100">
                      {getIcon(p.icon)}
                   </div>
                   <h3 className="text-3xl font-serif italic text-brand-white mb-8 group-hover:text-brand-gold-light transition-colors">{t(p.title)}</h3>
                   <p className="text-brand-white/40 font-light italic text-lg leading-relaxed mb-12 h-20 overflow-hidden">{t(p.desc)}</p>
                   <div className="space-y-4 pt-8 border-t border-white/5">
                      {p.capabilities.map((cap, j) => (
                         <div key={j} className="flex items-center gap-4 group/item">
                            <Plus size={10} className="text-brand-gold-light opacity-30 group-hover/item:opacity-100 transition-opacity" />
                            <span className="text-[10px] tracking-widest uppercase font-bold text-brand-white/30 group-hover/item:text-brand-white transition-colors">{t(cap)}</span>
                         </div>
                      ))}
                   </div>
                </article>
             ))}
          </div>
       </div>
    </section>
  );
};

const Philosophy = () => {
    const { t } = useLang();
    return (
      <section id="why-us" className="py-56 bg-brand-gray relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-4">
                <SectionHeading 
                  number="III"
                  label={t({ ar: 'الفلسفة الاستراتيجية', en: 'Strategic Philosophy' })}
                  title={t({ ar: 'لماذا يختارنا ملوك السوق؟', en: 'The Preference of Sovereigns' })}
                />
                <p className="text-brand-navy/40 font-light italic leading-loose text-lg">
                  {t({ 
                    ar: 'نحن لا نقدم خدمات قانونية فحسب، بل نقدم شراكة استراتيجية تهدف لحماية الإرث والسيادة في عالم معقد.',
                    en: 'We do not just provide legal services; we offer a strategic partnership aimed at protecting legacy and sovereignty.'
                  })}
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-navy/5 border border-brand-navy/5">
                  {WHY_US.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5 }}
                      className="p-16 bg-brand-white/80 border border-brand-navy/5 transition-all duration-500"
                    >
                      <h3 className="text-2xl font-serif text-brand-navy mb-8 italic">{t(item.title)}</h3>
                      <p className="text-brand-navy/40 font-light leading-relaxed italic text-lg">{t(item.desc)}</p>
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
      <section id="testimonials" className="py-56 bg-brand-navy relative overflow-hidden">
          {/* Subtle Distinction Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-brand-gold-light/30" />
          
          <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
            <SectionHeading 
              dark
              centered 
              number="V" 
              label={t({ ar: 'أصداء التميز', en: 'Echoes of Excellence' })} 
              title={t({ ar: 'نخبة ملوك السوق', en: 'Vetted by Market Leaders' })} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
               {TESTIMONIALS.map((test, i) => (
                  <motion.article 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="p-16 lg:p-20 bg-white/[0.02] border border-white/5 relative group shadow-2xl hover:bg-white/[0.04] transition-all duration-700"
                  >
                     <Quote className="absolute top-10 right-10 text-brand-gold-light/10" size={60} />
                     <blockquote className="text-2xl lg:text-3xl font-serif text-brand-white italic mb-16 leading-relaxed relative z-10">
                        "{t(test.text)}"
                     </blockquote>
                     <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                        <div className="w-12 h-[1px] bg-brand-gold-light" />
                        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-brand-white/40">{t(test.name)}</span>
                     </div>
                  </motion.article>
               ))}
            </div>
          </div>
      </section>
    );
};

const FAQ = () => {
    const { t } = useLang();
    return (
      <section id="faq" className="py-56 bg-brand-gray relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 lg:px-16">
          <SectionHeading centered number="VII" label={t({ ar: 'الإحاطة المعرفية', en: 'Strategic FAQ' })} title={t({ ar: 'تساؤلات النخبة', en: 'Inquiries of Intent' })} />
          <div className="space-y-4">
             {FAQS.map((faq, i) => {
               const [isOpen, setIsOpen] = useState(i === 0);
               return (
                <div key={i} className="group overflow-hidden border border-brand-navy/5 bg-brand-white">
                  <button onClick={() => setIsOpen(!isOpen)} className="w-full p-8 lg:p-10 flex items-center justify-between text-left transition-all duration-500 hover:bg-brand-gray/30">
                    <span className={cn("text-2xl md:text-3xl font-serif italic transition-colors duration-500", isOpen ? "text-brand-gold" : "text-brand-navy")}>{t(faq.q)}</span>
                    <div className={cn("w-10 h-10 rounded-full border border-brand-navy/5 flex items-center justify-center transition-all duration-500", isOpen && "bg-brand-navy text-brand-white rotate-45")}>
                       <Plus size={18} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        className="overflow-hidden"
                      >
                        <div className="px-10 pb-12 pt-4 text-xl text-brand-navy/50 font-light leading-relaxed italic border-t border-brand-navy/5">
                          {t(faq.a)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
               );
             })}
          </div>
        </div>
      </section>
    );
};

const Briefings = () => {
    const { t } = useLang();
    return (
      <section id="briefings" className="py-56 bg-brand-white relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-gray/30 blur-[100px] -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeading 
                number="VI"
                label={t({ ar: 'العقل الاستراتيجي', en: 'Strategic Intelligence' })}
                title={t({ ar: 'إحاطات قانونية استباقية', en: 'Proactive Intelligence & Precedents' })}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {BRIEFINGS.map((entry, i) => (
                    <article key={i} className="group bg-brand-gray/20 p-16 border border-brand-navy/5 relative cursor-pointer hover:bg-brand-white hover:shadow-3xl transition-all duration-700">
                        <div className="flex items-center gap-4 text-[10px] tracking-widest font-bold text-brand-gold-light opacity-60 mb-8 font-accents">
                            <Calendar size={12} strokeWidth={3} />
                            <span className="uppercase">{entry.date}</span>
                        </div>
                        <h3 className="text-3xl font-serif mb-10 text-brand-navy leading-tight group-hover:text-brand-gold-light transition-colors duration-500 italic">
                            {t(entry.title)}
                        </h3>
                        <div className="flex items-center gap-4 text-brand-navy/30 group-hover:text-brand-gold-light group-hover:translate-x-2 transition-all duration-700">
                            <div className="w-12 h-[1px] bg-current" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Read Analysis</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
      </section>
    );
};

const Contact = () => {
  const { t } = useLang();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <section id="contact" className="py-56 bg-[#020811] relative overflow-hidden">
      {/* Decorative Dark Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
      
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 relative z-10">
        <div>
          <SectionHeading 
            dark
            number="VIII"
            label={t({ ar: 'كونسيرج قانوني', en: 'Elite Concierge' })}
            title={t({ ar: 'تواصل مباشر مع الدائرة المقربة', en: 'Direct Access to the Inner Circle' })}
          />
          <p className="text-xl lg:text-2xl text-brand-white/40 font-light italic leading-loose mb-16 border-s border-brand-gold-light/20 ps-10">
            {t({ 
              ar: 'نحن نقبل فقط القضايا التي تليق بمقام ممارستنا العالمية. طلب الإحاطة الخاص بك سيُعامل ببروتوكولات دفاعية مشفرة وسرية مطلقة.',
              en: "We accept limited engagements that require strategic mastery. Your inquiry will be handled with sovereign-grade encryption."
            })}
          </p>
          
          <div className="space-y-10">
             {[
               { icon: <Lock size={18} />, label: { ar: 'بروتوكول آمن', en: 'Secure Line' }, value: { ar: 'الرد خلال ساعات من الإحاطة', en: 'Handled by Senior Partners Only' } },
               { icon: <Mail size={18} />, label: { ar: 'البريد السيادي', en: 'Sovereign Mail' }, value: { ar: 'counsel@al-baraa.law', en: 'counsel@al-baraa.law' } },
               { icon: <Globe size={18} />, label: { ar: 'المقر العالمي', en: 'Global HQ' }, value: { ar: 'مركز دبي المالي العالمي، دبي', en: 'DIFC, Dubai, UAE' } },
             ].map((item, i) => (
               <div key={i} className="flex items-start gap-10 group">
                  <div className="w-16 h-16 flex items-center justify-center border border-white/5 bg-white/[0.02] text-brand-gold-light group-hover:bg-brand-gold-light group-hover:text-brand-navy transition-all duration-500 shadow-sm glass-card">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/20 mb-2">{t(item.label)}</div>
                    <div className="text-2xl font-serif text-brand-white italic group-hover:text-brand-gold-light transition-colors">{t(item.value)}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="p-12 lg:p-20 bg-black border border-white/5 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden min-h-[650px] flex flex-col">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent" />
           
           <AnimatePresence mode="wait">
             {formStatus === 'success' ? (
               <motion.div 
                 key="success"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex-1 flex flex-col items-center justify-center text-center space-y-10"
               >
                 <div className="w-24 h-24 rounded-full border border-brand-gold-light/20 flex items-center justify-center text-brand-gold-light relative">
                   <ShieldCheck size={48} />
                   <div className="absolute inset-0 bg-brand-gold-light/5 rounded-full blur-xl" />
                 </div>
                 <h3 className="text-4xl font-serif italic text-brand-white">{t({ ar: 'تم استلام الإحاطة', en: 'Briefing Received' })}</h3>
                 <p className="text-brand-white/40 italic text-xl px-10">{t({ ar: 'سنتصل بك عبر القنوات الآمنة لمناقشة التفاصيل قريباً.', en: 'We will reach out via secure channels shortly.' })}</p>
                 <button 
                   onClick={() => setFormStatus('idle')}
                   className="text-[10px] tracking-widest uppercase font-bold text-brand-gold-light border-b border-brand-gold-light/20 pb-2 hover:text-brand-white hover:border-brand-white transition-all"
                 >
                   {t({ ar: 'إرسال طلب آخر', en: 'Send another request' })}
                 </button>
               </motion.div>
             ) : (
               <motion.form 
                 key="form"
                 exit={{ opacity: 0, y: -30 }}
                 className="space-y-12" 
                 onSubmit={handleSubmit}
               >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-brand-gold-light/60">{t({ ar: 'الاسم الكامل', en: 'Formal Name' })}</label>
                      <input required type="text" className="w-full bg-white/[0.02] border-b border-white/10 py-5 text-white focus:outline-none focus:border-brand-gold-light transition-all font-serif italic text-2xl placeholder:opacity-20" placeholder="..." />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-brand-gold-light/60">{t({ ar: 'رقم الاتصال', en: 'Secure Contact' })}</label>
                      <input required type="text" className="w-full bg-white/[0.02] border-b border-white/10 py-5 text-white focus:outline-none focus:border-brand-gold-light transition-all font-serif italic text-2xl placeholder:opacity-20" placeholder="+" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-brand-gold-light/60">{t({ ar: 'البريد الإلكتروني', en: 'Confidential Email' })}</label>
                    <input required type="email" className="w-full bg-white/[0.02] border-b border-white/10 py-5 text-white focus:outline-none focus:border-brand-gold-light transition-all font-serif italic text-2xl placeholder:opacity-20" placeholder="@" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-brand-gold-light/60">{t({ ar: 'ملخص الإحاطة الإستراتيجي', en: 'Strategic Brief' })}</label>
                    <textarea required rows={4} className="w-full bg-white/[0.02] border-b border-white/10 py-5 text-white focus:outline-none focus:border-brand-gold-light transition-all resize-none font-serif italic text-2xl" />
                  </div>
                  <MagneticButton className="w-full pt-6">
                    <div className="w-full py-8 bg-brand-gold-light text-brand-navy text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-brand-white transition-all duration-700 shadow-xl">
                      {formStatus === 'sending' ? 'TRANSMITTING...' : t({ ar: 'إرسال الإحاطة الاستراتيجية', en: 'Send Strategic Briefing' })}
                    </div>
                  </MagneticButton>
               </motion.form>
             )}
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
    const { t } = useLang();
    return (
      <footer className="bg-brand-navy pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-24">
            <div className="md:col-span-5">
              <div className="text-3xl font-serif text-brand-white italic mb-10">AL-BARAA</div>
              <p className="text-brand-white/40 text-lg font-light leading-relaxed mb-12 max-w-sm italic">
                {t({ 
                  ar: 'نحن لا نقدم الدفاع فحسب، بل نصمم الأطر القانونية التي تضمن السيادة والخلود لإرث عملائنا.',
                  en: 'Providing architectural legal defense that ensures sovereignty and immortality for our clients legacies.'
                })}
              </p>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-luxury text-brand-white mb-10">{t({ ar: 'المؤسسة', en: 'Institution' })}</h4>
              <ul className="space-y-4 text-sm text-brand-white/40 font-light italic">
                <li><a href="#about" className="hover:text-brand-gold transition-colors">{t({ ar: 'إرثنا', en: 'Our Legacy' })}</a></li>
                <li><a href="#practice" className="hover:text-brand-gold transition-colors">{t({ ar: 'الممارسة', en: 'Jurisdictions' })}</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
               <h4 className="text-luxury text-brand-white mb-10">{t({ ar: 'التواصل المباشر', en: 'Elite Concierge' })}</h4>
               <p className="text-brand-white/60 font-medium tracking-tight">+971 4 555 0000</p>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <p className="text-[10px] uppercase tracking-[0.2em] text-brand-white/20 font-bold">
               © {new Date().getFullYear()} AL-BARAA LEGAL CHAMBERS.
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

// --- Main Components ---

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    return (
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 2.5, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[10000] bg-brand-navy flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative overflow-hidden p-20">
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="absolute left-0 top-0 w-[1px] h-full bg-brand-gold-light/30 origin-top"
          />
          <div className="text-center relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[10px] tracking-[0.8em] uppercase font-bold text-brand-gold-light/60 mb-6 font-accents"
            >
              Excellence Since 1995
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-5xl lg:text-7xl font-serif text-brand-white italic tracking-[0.25em] leading-none"
            >
              AL-BARAA
            </motion.h2>
            <div className="mt-8 flex justify-center gap-2">
               {[1, 2, 3].map(i => (
                 <motion.div 
                    key={i}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="w-1.5 h-1.5 rounded-full bg-brand-gold-light/40"
                 />
               ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

export const LawFirmSite = () => {
    const [loading, setLoading] = useState(true);
    const lenisRef = useRef<Lenis | null>(null);
  
    useEffect(() => {
      // Dynamic Lenis Loading (SSR-safe)
      lenisRef.current = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
  
      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }
      const rafId = requestAnimationFrame(raf);
  
      return () => {
        lenisRef.current?.destroy();
        cancelAnimationFrame(rafId);
      };
    }, []);
  
    return (
      <div className="relative selection:bg-brand-gold selection:text-brand-navy shadow-none">
        <div className="noise-overlay" />
        <Preloader onComplete={() => setLoading(false)} />
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
        >
          <Hero />
          <About />
          <Practices />
          <Philosophy />
          <Lawyers />
          <Testimonials />
          <Briefings />
          <FAQ />
          <Contact />
        </motion.main>
        <Footer />
      </div>
    );
  };
