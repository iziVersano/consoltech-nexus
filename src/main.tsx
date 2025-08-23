import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initI18n } from './lib/i18n'

// Initialize i18n system before rendering
initI18n();

// Mobile drawer functionality
const initMobileDrawer = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const drawer = document.querySelector('.drawer');
    
    burger?.addEventListener('click', () => {
      drawer?.classList.toggle('open');
      document.body.classList.toggle('no-scroll', drawer?.classList.contains('open'));
    });

    // Close drawer when clicking overlay or links
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('.drawer ~ div') || target.closest('.nav-link')) {
        drawer?.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
    });
  });
};

initMobileDrawer();

createRoot(document.getElementById("root")!).render(<App />);
