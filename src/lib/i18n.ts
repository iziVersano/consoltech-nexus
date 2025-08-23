// CONSOLTECH Advanced i18n System
export type Locale = 'en' | 'he';
export type Namespace = 'common' | 'nav' | 'footer' | 'home' | 'about' | 'products' | 'product' | 'contact' | 'forms' | 'seo';

interface TranslationCache {
  [namespace: string]: {
    [locale: string]: Record<string, string>;
  };
}

class I18nManager {
  private cache: TranslationCache = {};
  private currentLocale: Locale = 'en';
  private fallbackLocale: Locale = 'en';
  private missingKeys: Set<string> = new Set();

  constructor() {
    this.initFromStorage();
  }

  private initFromStorage() {
    const stored = localStorage.getItem('consoltech-locale');
    if (stored && (stored === 'en' || stored === 'he')) {
      this.currentLocale = stored;
    }
    this.applyLocale();
  }

  getCurrentLocale(): Locale {
    return this.currentLocale;
  }

  async setLocale(locale: Locale, updateURL = true) {
    this.currentLocale = locale;
    localStorage.setItem('consoltech-locale', locale);
    
    this.applyLocale();
    await this.updateAllTranslations();
    
    if (updateURL) {
      this.updateURL();
    }
  }

  private applyLocale() {
    const html = document.documentElement;
    const body = document.body;
    
    html.setAttribute('lang', this.currentLocale);
    html.setAttribute('dir', this.currentLocale === 'he' ? 'rtl' : 'ltr');
    
    if (this.currentLocale === 'he') {
      body.classList.add('rtl');
    } else {
      body.classList.remove('rtl');
    }
  }

  private updateURL() {
    const currentPath = window.location.pathname;
    const isHebrewPath = currentPath.startsWith('/he');
    
    if (this.currentLocale === 'he' && !isHebrewPath) {
      const newPath = '/he' + currentPath;
      window.history.pushState({}, '', newPath);
    } else if (this.currentLocale === 'en' && isHebrewPath) {
      const newPath = currentPath.replace('/he', '') || '/';
      window.history.pushState({}, '', newPath);
    }
  }

  async loadNamespace(namespace: Namespace): Promise<Record<string, string>> {
    if (this.cache[namespace]?.[this.currentLocale]) {
      return this.cache[namespace][this.currentLocale];
    }

    try {
      const module = await import(`../locales/${this.currentLocale}/${namespace}.json`);
      const translations = module.default;
      
      if (!this.cache[namespace]) {
        this.cache[namespace] = {};
      }
      this.cache[namespace][this.currentLocale] = translations;
      
      return translations;
    } catch (error) {
      console.warn(`Failed to load ${namespace} for ${this.currentLocale}:`, error);
      
      // Try fallback locale
      if (this.currentLocale !== this.fallbackLocale) {
        try {
          const fallbackModule = await import(`../locales/${this.fallbackLocale}/${namespace}.json`);
          return fallbackModule.default;
        } catch (fallbackError) {
          console.error(`Failed to load fallback ${namespace}:`, fallbackError);
        }
      }
      
      return {};
    }
  }

  async translate(key: string, namespace: Namespace = 'common'): Promise<string> {
    const translations = await this.loadNamespace(namespace);
    const translation = translations[key];
    
    if (!translation) {
      const fullKey = `${namespace}.${key}`;
      this.missingKeys.add(fullKey);
      
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation: ${fullKey} for locale: ${this.currentLocale}`);
      }
      
      return key; // Return key as fallback
    }
    
    return translation;
  }

  async updateTranslations(namespace: Namespace) {
    const translations = await this.loadNamespace(namespace);
    
    document.querySelectorAll(`[data-i18n-ns="${namespace}"]`).forEach(async (element) => {
      const key = element.getAttribute('data-i18n');
      if (key && translations[key]) {
        element.textContent = translations[key];
      }
    });
  }

  async updateAllTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    for (const element of Array.from(elements)) {
      const key = element.getAttribute('data-i18n');
      const namespace = (element.getAttribute('data-i18n-ns') as Namespace) || 'common';
      
      if (key) {
        const translation = await this.translate(key, namespace);
        element.textContent = translation;
      }
    }
  }

  getMissingKeys(): string[] {
    return Array.from(this.missingKeys);
  }

  // Utility for product translations
  getProductField(product: any, field: string): string {
    const localeField = `${field}_${this.currentLocale}`;
    return product[localeField] || product[`${field}_en`] || product[field] || '';
  }

  // Utility for URL generation
  getLocalizedPath(path: string): string {
    if (this.currentLocale === 'he') {
      return `/he${path === '/' ? '' : path}`;
    }
    return path;
  }

  // SEO utilities
  getLocalizedSEO(seoData: any) {
    return {
      title: this.getProductField(seoData, 'title'),
      description: this.getProductField(seoData, 'description'),
      keywords: this.getProductField(seoData, 'keywords'),
    };
  }
}

// Global instance
export const i18n = new I18nManager();

// React hook for components
export function useTranslation(namespace: Namespace = 'common') {
  return {
    t: (key: string) => i18n.translate(key, namespace),
    locale: i18n.getCurrentLocale(),
    setLocale: i18n.setLocale.bind(i18n),
  };
}

// Utility components
export const T = ({ k, ns = 'common' }: { k: string; ns?: Namespace }) => {
  const element = document.createElement('span');
  element.setAttribute('data-i18n', k);
  element.setAttribute('data-i18n-ns', ns);
  element.textContent = k;
  return element;
};

// Initialize on load
export function initI18n() {
  // Parse URL for locale
  const path = window.location.pathname;
  const isHebrewPath = path.startsWith('/he');
  
  if (isHebrewPath) {
    i18n.setLocale('he', false);
  }
  
  // Update all translations after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      i18n.updateAllTranslations();
    });
  } else {
    i18n.updateAllTranslations();
  }
}