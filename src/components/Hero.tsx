import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-tech.jpg';

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
          {/* CONSOLTECH Promotional Image */}
          <div className="mb-8 md:mb-12">
            <img 
              src="/lovable-uploads/e09ae21f-bcb5-4d0c-9e29-2a47e83ba2ef.png" 
              alt="Gaming consoles, electronics, drones, smart TV and tech products showcase" 
              className="w-full max-w-4xl mx-auto h-auto rounded-lg shadow-2xl shadow-primary/20"
            />
          </div>
          
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
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your premier partner for cutting-edge technology distribution worldwide. 
              From gaming consoles to smart devices, we bring innovation to your doorstep.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center items-center pt-8">
            <Link to="/products">
              <Button className="btn-hero group">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button className="btn-neon group">
                <Play className="mr-2 h-5 w-5" />
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