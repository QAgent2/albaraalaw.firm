import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (obj: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    // Try to get language from localStorage or default to 'ar'
    if (typeof window !== 'undefined') {
       return (localStorage.getItem('preferred-lang') as Language) || 'ar';
    }
    return 'ar';
  });

  useEffect(() => {
    // Initial RTL/LTR Setup
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('preferred-lang', lang);

    // Dynamic Meta Tags (SEO)
    const titles: Record<Language, string> = {
      ar: 'البراء للمحاماة | استشارات سيادية للنخبة العالمية',
      en: 'Al-Baraa Legal | Sovereign Counsel for the Global Elite'
    };
    const descs: Record<Language, string> = {
      ar: 'نصمم أطراً قانونية تتجاوز الحدود، لحماية مصالح الأسر الحاكمة والكيانات السيادية بأعلى درجات السرية والنفوذ.',
      en: 'Crafting legal frameworks that transcend borders, protecting the interests of ruling dynasties and sovereign entities with total discretion.'
    };

    document.title = titles[lang];
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descs[lang]);

    // OG Tags (Simple implementation)
    const updateOrCreateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', titles[lang]);
    updateOrCreateMeta('og:description', descs[lang]);
    updateOrCreateMeta('twitter:title', titles[lang]);
    updateOrCreateMeta('twitter:description', descs[lang]);

  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (obj: any) => {
    if (!obj) return "";
    return obj[lang] || obj['ar'] || "";
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
};
