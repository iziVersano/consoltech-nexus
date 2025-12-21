import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 nav-glass" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg"
            aria-label="Consoltech - Home"
          >
            <div className="relative">
              <Gamepad2 className="h-8 w-8 md:h-10 md:w-10 text-white group-hover:text-accent transition-colors duration-300" aria-hidden="true" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <span className="logo-text text-2xl md:text-3xl lg:text-4xl">
              <span className="logo-consol">CONSOL</span><span className="logo-tech">TECH</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                role="menuitem"
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`transition-all duration-300 hover:text-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-1 ${
                  isActive(item.href)
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-foreground hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="btn-nav">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>Get Quote</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="mobile-menu"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-border animate-fade-in" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  role="menuitem"
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    isActive(item.href)
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 pt-2">
                <Button className="btn-nav w-full">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>Get Quote</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;