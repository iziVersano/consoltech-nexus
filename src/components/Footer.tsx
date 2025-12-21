import { Link } from 'react-router-dom';
import { Accessibility } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 bg-card border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center" aria-hidden="true">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-2xl font-bold gradient-text">CONSOLTECH</span>
            </div>
            <p className="text-muted-foreground">
              Global leader in electronics and gaming distribution, 
              connecting innovation with markets worldwide.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <a 
                href="mailto:sales@consoltech.shop" 
                className="block hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card rounded"
              >
                <span className="text-accent font-semibold">Email:</span> sales@consoltech.shop
              </a>
              <a 
                href="tel:+972522768607" 
                className="block hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card rounded"
              >
                <span className="text-accent font-semibold">Phone:</span> +972-52-2768607
              </a>
              <a 
                href="https://maps.google.com/?q=47+Moshe+Sneh+St.+Tel+Aviv" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card rounded"
              >
                <span className="text-accent font-semibold">Address:</span> 47 Moshe Sneh St., Tel Aviv 6930243, Israel
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-center sm:text-left">
              &copy; {new Date().getFullYear()} CONSOLTECH. All rights reserved. | Global Import & Distribution Excellence
            </p>
            <nav aria-label="Footer navigation" className="flex items-center gap-4">
              <Link 
                to="/accessibility" 
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card rounded px-1"
              >
                <Accessibility className="h-4 w-4" aria-hidden="true" />
                <span>Accessibility</span>
              </Link>
              <Link 
                to="/admin/login" 
                className="text-xs text-muted-foreground/50 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card rounded px-1"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

