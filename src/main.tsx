import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initI18n } from './lib/i18n'
import { domReady, safeQuerySelector } from './utils/domReady'

// Initialize i18n system before rendering
initI18n();

// Mobile drawer functionality
const initMobileDrawer = () => {
  domReady(() => {
    const burger = safeQuerySelector('.burger');
    const drawer = safeQuerySelector('.drawer');
    
    if (burger && drawer) {
      burger.addEventListener('click', () => {
        drawer.classList.toggle('open');
        document.body.classList.toggle('no-scroll', drawer.classList.contains('open'));
      });

      // Close drawer when clicking overlay or links
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.matches('.drawer ~ div') || target.closest('.nav-link')) {
          drawer.classList.remove('open');
          document.body.classList.remove('no-scroll');
        }
      });
    }
  });
};

// Initialize mobile drawer
initMobileDrawer();

// Initialize React app
domReady(() => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
});
