import { Button } from '@/components/ui/button';
import { ShoppingBag, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-tech.jpg';
import floatingController from '@/assets/floating-controller.png';
import floatingPS5 from '@/assets/floating-ps5.png';
import floatingSmartphone from '@/assets/floating-smartphone.png';
import floatingShipping from '@/assets/floating-shipping.png';
import floatingDrone from '@/assets/floating-drone.png';
import floatingMonitor from '@/assets/floating-monitor.png';
import floatingEbike from '@/assets/floating-ebike.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-8 md:pt-24 md:pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="High-tech electronics and gaming devices" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>

      {/* Futuristic Tech Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="tech-grid"></div>
        
        {/* Holographic Rings */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48">
          <div className="holographic-ring ring-1"></div>
          <div className="holographic-ring ring-2"></div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 md:w-36 md:h-36">
          <div className="holographic-ring ring-3"></div>
          <div className="holographic-ring ring-4"></div>
        </div>
        
        <div className="absolute top-1/2 left-3/4 w-20 h-20 md:w-28 md:h-28">
          <div className="holographic-ring ring-5"></div>
        </div>
        
        {/* Animated Tech Lines */}
        <div className="tech-lines">
          <div className="tech-line line-1"></div>
          <div className="tech-line line-2"></div>
          <div className="tech-line line-3"></div>
        </div>
        
        {/* Floating Tech Particles */}
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-accent rounded-full opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary rounded-full opacity-40 animate-pulse-slower"></div>
        <div className="absolute top-3/4 right-1/6 w-1.5 h-1.5 bg-accent-glow rounded-full opacity-50 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 md:space-y-8">
          {/* Main Headline */}
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-center text-3xl md:text-4xl lg:text-6xl leading-snug lg:leading-tight font-bold break-normal whitespace-normal">
              <span className="block text-3xl md:text-4xl lg:text-7xl font-black mb-2 md:mb-1 lg:mb-2 leading-tight">
                Your Gateway to Gaming, Gadgets & <span className="gradient-text">Innovation</span>
              </span>
              <span className="block text-foreground text-2xl md:text-4xl lg:text-6xl font-bold leading-snug">
                Delivering Smart Tech & <span className="text-accent text-glow">Toys</span> to the World
              </span>
            </h1>
            
            {/* Floating Product Showcase */}
            <div className="floating-products-container">
              {/* Controller - Front Left */}
              <div className="floating-product product-controller">
                <img src={floatingController} alt="Gaming Controller" className="product-image" />
              </div>
              
              {/* PS5 - Back Left */}
              <div className="floating-product product-ps5">
                <img src={floatingPS5} alt="PlayStation 5" className="product-image" />
              </div>
              
              {/* Smartphone - Center */}
              <div className="floating-product product-smartphone">
                <img src={floatingSmartphone} alt="Smartphone" className="product-image" />
              </div>
              
              {/* Shipping Globe - Center Back */}
              <div className="floating-product product-shipping">
                <img src={floatingShipping} alt="Global Shipping" className="product-image" />
              </div>
              
              {/* Drone - Top Right */}
              <div className="floating-product product-drone">
                <img src={floatingDrone} alt="Drone" className="product-image" />
              </div>
              
              {/* Monitor - Right */}
              <div className="floating-product product-monitor">
                <img src={floatingMonitor} alt="Smart Monitor" className="product-image" />
              </div>
              
              {/* E-bike - Bottom Right */}
              <div className="floating-product product-ebike">
                <img src={floatingEbike} alt="Electric Bike" className="product-image" />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 justify-center items-center pt-8">
            <Link to="/products">
              <Button className="btn-hero group font-orbitron tracking-wide">
                <ShoppingBag className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                Explore Products
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button className="btn-neon group font-orbitron tracking-wide">
                <Headphones className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-transparent via-accent to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;