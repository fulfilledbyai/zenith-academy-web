
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'am' | 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  translations: Record<string, Record<Language, string>>;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  translations 
}) => {
  const [language, setLanguage] = useState<Language>('am');

  // Get translations for the current language
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language] || key;
  };

  // Store language preference in localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['am', 'fr', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    // Set HTML lang attribute
    document.documentElement.lang = language === 'am' ? 'hy' : language;
    
    // Apply appropriate font-family based on language
    if (language === 'am') {
      document.body.classList.add('font-armenian');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.remove('font-armenian');
      document.body.classList.add('font-sans');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
