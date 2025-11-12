import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Gamepad2, ShieldCheck } from 'lucide-react';
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
    <nav className="fixed top-0 w-full z-50 nav-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-all duration-300 hover:text-accent ${
                  isActive(item.href) 
                    ? 'text-accent border-b-2 border-accent' 
                    : 'text-foreground hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className={`transition-all duration-300 hover:text-accent flex items-center gap-1 ${
                location.pathname.startsWith('/admin') 
                  ? 'text-accent border-b-2 border-accent' 
                  : 'text-foreground hover:text-accent'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </Link>
            <Button className="btn-nav">
              <MessageSquare className="h-4 w-4" />
              <span>Get Quote</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="mobile-menu"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin/login"
                className={`block px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  location.pathname.startsWith('/admin')
                    ? 'text-accent bg-accent/10'
                    : 'text-foreground hover:text-accent hover:bg-accent/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Admin</span>
              </Link>
              <div className="px-3 pt-2">
                <Button className="btn-nav w-full">
                  <MessageSquare className="h-4 w-4" />
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