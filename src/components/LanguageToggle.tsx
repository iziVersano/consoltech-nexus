import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { toggleLanguage } from '@/lib/translations';

const LanguageToggle = () => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const lang = document.documentElement.getAttribute('lang') || 'en';
    setCurrentLang(lang);
    
    // Listen for language changes
    const observer = new MutationObserver(() => {
      const newLang = document.documentElement.getAttribute('lang') || 'en';
      if (newLang !== currentLang) {
        setCurrentLang(newLang);
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
    
    return () => observer.disconnect();
  }, [currentLang]);

  const handleToggle = () => {
    toggleLanguage();
  };

  return (
    <button
      onClick={handleToggle}
      className="btn-lang-toggle"
      aria-label={`Switch to ${currentLang === 'en' ? 'Hebrew' : 'English'}`}
      title={`Current: ${currentLang === 'en' ? 'English' : 'עברית'}`}
    >
      <Globe className="h-4 w-4" />
      <span data-i18n="nav.language">
        {currentLang === 'en' ? 'EN | עִבְרִית' : 'עִבְרִית | EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;