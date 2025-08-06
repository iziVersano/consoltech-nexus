import { Button } from '@/components/ui/button';
import { ShoppingBag, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-tech.jpg';
import ps5Image from '@/assets/products/ps5.png';
import xboxControllerImage from '@/assets/products/xbox-controller.png';
import shipGlobeImage from '@/assets/products/ship-globe.png';
import phoneHandImage from '@/assets/products/phone-hand.png';
import droneImage from '@/assets/products/drone.png';
import monitorImage from '@/assets/products/monitor.png';
import ebikeImage from '@/assets/products/ebike.png';

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

      {/* Floating Product Overlays */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {/* PS5 - Top Left */}
        <div className="absolute top-1/4 left-1/6 w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 animate-float">
          <img 
            src={ps5Image} 
            alt="PlayStation 5" 
            className="w-full h-full object-contain opacity-80 product-glow"
            style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))' }}
          />
        </div>
        
        {/* Xbox Controller - Top Right */}
        <div className="absolute top-1/3 right-1/6 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src={xboxControllerImage} 
            alt="Xbox Controller" 
            className="w-full h-full object-contain opacity-80 product-glow"
            style={{ filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.6))' }}
          />
        </div>
        
        {/* Ship Globe - Left Side */}
        <div className="absolute top-1/2 left-1/12 w-18 h-18 md:w-28 md:h-28 lg:w-36 lg:h-36 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src={shipGlobeImage} 
            alt="Global Shipping" 
            className="w-full h-full object-contain opacity-80 product-glow"
            style={{ filter: 'drop-shadow(0 0 18px rgba(168, 85, 247, 0.6))' }}
          />
        </div>
        
        {/* Phone in Hand - Center Right */}
        <div className="absolute top-2/3 right-1/4 w-14 h-14 md:w-20 md:h-20 lg:w-28 lg:h-28 animate-float" style={{ animationDelay: '0.5s' }}>
          <img 
            src={phoneHandImage} 
            alt="Mobile Phone" 
            className="w-full h-full object-contain opacity-80 product-glow"
            style={{ filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.6))' }}
          />
        </div>
        
        {/* Drone - Bottom Left */}
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 animate-float" style={{ animationDelay: '1.5s' }}>
          <img 
            src={droneImage} 
            alt="Drone" 
            className="w-full h-full object-contain opacity-80 product-glow"
            style={{ filter: 'drop-shadow(0 0 16px rgba(239, 68, 68, 0.6))' }}
          />
        </div>
        
        {/* Monitor - Bottom Right */}
        <div className="absolute bottom-1/3 right-1/8 w-18 h-18 md:w-26 md:h-26 lg:w-34 lg:h-34 animate-float" style={{ animationDelay: '2.5s' }}>
          <img 
            src={monitorImage} 
            alt="Gaming Monitor" 
            className="w-full h-full object-contain opacity-80 product-glow"
            style={{ filter: 'drop-shadow(0 0 14px rgba(6, 182, 212, 0.6))' }}
          />
        </div>
        
        {/* E-bike - Center Bottom */}
        <div className="absolute bottom-1/5 left-1/2 transform -translate-x-1/2 w-20 h-20 md:w-30 md:h-30 lg:w-38 lg:h-38 animate-float" style={{ animationDelay: '3s' }}>
          <img 
            src={ebikeImage} 
            alt="Electric Bike" 
            className="w-full h-full object-contain opacity-80 product-glow"
            style={{ filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.6))' }}
          />
        </div>
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
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 justify-center items-center pt-12">
            <Link to="/products">
              <Button className="btn-hero group font-orbitron tracking-wide text-lg px-8 py-4">
                <ShoppingBag className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                Explore Products
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button className="btn-neon group font-orbitron tracking-wide text-lg px-8 py-4">
                <Headphones className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
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