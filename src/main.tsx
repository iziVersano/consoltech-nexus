import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initI18n } from './lib/i18n'

// Initialize i18n system before rendering
initI18n();

createRoot(document.getElementById("root")!).render(<App />);
