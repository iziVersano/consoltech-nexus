import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Health from "./pages/Health";
import Warranty from "./pages/Warranty";
import NintendoSwitch2Manual from "./pages/NintendoSwitch2Manual";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminProducts from "./pages/admin/Products";
import AdminProductForm from "./pages/admin/ProductForm";
import WarrantyRecords from "./pages/admin/WarrantyRecords";
import SkipLink from "./components/SkipLink";
import AccessibilityMenu from "./components/AccessibilityMenu";
import { useI18n } from './hooks/I18nContext';
import { I18nProvider } from './hooks/I18nContext';

import { useEffect } from "react";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

// Component to set HTML dir and lang attributes for RTL support
const HtmlDirectionSetter = () => {
  const { lang } = useI18n();

  useEffect(() => {
    const htmlElement = document.documentElement;
    // Set language attribute
    htmlElement.setAttribute('lang', lang);
    // Set direction: RTL for Hebrew, LTR for English
    htmlElement.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
  }, [lang]);

  return null;
};

function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <button
      aria-label={lang === 'en' ? 'Switch to Hebrew' : 'החלף לאנגלית'}
      className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-900 border rounded px-3 py-1 shadow"
      onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
    >
      {lang === 'en' ? t('toggle.he') : t('toggle.en')}
    </button>
  );
}

function TrustedBrandsBanner() {
  const { t } = useI18n();
  return (
    <section
      aria-labelledby="trusted-brands-title"
      data-testid="trusted-brands"
      className="bg-accent/10 py-6 px-4 text-center mb-6 rounded-lg border border-accent/30"
    >
      <h2 id="trusted-brands-title" className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
fffffffff      </h2>
      <p className="text-lg md:text-xl mb-2 text-gray-700 dark:text-gray-300">{t('products.trustedDescription')}</p>
      <div className="flex justify-center gap-6 mt-4">
        <span className="text-xl font-semibold text-gray-800 dark:text-white">{t('products.microsoft')}</span>
        <span className="text-xl font-semibold text-gray-800 dark:text-white">{t('products.xbox')}</span>
      </div>
    </section>
  );
}

const App = () => (
  <I18nProvider>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SkipLink />
            <AccessibilityMenu />
            <ScrollToTop />
            <HtmlDirectionSetter />
            <LanguageToggle />
            <TrustedBrandsBanner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/health" element={<Health />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/nintendo-switch-2" element={<NintendoSwitch2Manual />} />
              <Route path="/accessibility" element={<Accessibility />} />
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/products/new" element={<AdminProductForm />} />
              <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
              <Route path="/admin/warranty-records" element={<WarrantyRecords />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </I18nProvider>
);

export default App;
