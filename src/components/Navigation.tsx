import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Gamepad2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { i18n, useTranslation } from '@/lib/i18n';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useTranslation('nav');
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: i18n.getLocalizedPath('/'), key: 'home' },
    { name: 'About', href: i18n.getLocalizedPath('/about'), key: 'about' },
    { name: 'Products', href: i18n.getLocalizedPath('/products'), key: 'products' },
    { name: 'Contact', href: i18n.getLocalizedPath('/contact'), key: 'contact' },
  ];

  const handleLanguageToggle = async () => {
    const newLocale = locale === 'en' ? 'he' : 'en';
    await i18n.setLocale(newLocale);
  };

  const isActive = (path: string) => {
    const currentPath = location.pathname;
    // Handle both localized and non-localized paths
    const basePath = currentPath.replace(/^\/he/, '') || '/';
    const targetPath = path.replace(/^\/he/, '') || '/';
    return basePath === targetPath;
  };

  return (
    <nav className="header fixed top-0 w-full z-50 nav-glass">
      <div className="max-w-7xl mx-auto">
        <div className="navbar flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Gamepad2 className="h-8 w-8 md:h-10 md:w-10 text-white group-hover:text-accent transition-colors duration-300" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <span className="logo-text text-2xl md:text-3xl lg:text-4xl">
              <span className="logo-consol">CONSOL</span><span className="logo-tech">TECH</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-actions hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link transition-all duration-300 hover:text-accent ${
                  isActive(item.href) 
                    ? 'text-accent border-b-2 border-accent' 
                    : 'text-foreground hover:text-accent'
                }`}
                data-i18n={item.key}
                data-i18n-ns="nav"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className="lang-toggle btn-lang-toggle"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span data-i18n="language" data-i18n-ns="nav">EN | עִבְרִית</span>
            </button>

            <Button className="btn-nav">
              <MessageSquare className="h-4 w-4" />
              <span data-i18n="quote" data-i18n-ns="nav">Get Quote</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="burger"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`drawer md:hidden ${isOpen ? 'open' : ''}`}>
          <div className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link block px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-accent bg-accent/10'
                    : 'text-foreground hover:text-accent hover:bg-accent/5'
                }`}
                onClick={() => setIsOpen(false)}
                data-i18n={item.key}
                data-i18n-ns="nav"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-border">
              {/* Mobile Language Toggle */}
              <button
                onClick={() => {
                  handleLanguageToggle();
                  setIsOpen(false);
                }}
                className="lang-toggle btn-lang-toggle w-full justify-center"
              >
                <Globe className="h-4 w-4" />
                <span data-i18n="language" data-i18n-ns="nav">EN | עִבְרִית</span>
              </button>
              
              <Button className="btn-nav w-full" onClick={() => setIsOpen(false)}>
                <MessageSquare className="h-4 w-4" />
                <span data-i18n="quote" data-i18n-ns="nav">Get Quote</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navigation;