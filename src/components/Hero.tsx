import { Button } from '@/components/ui/button';
import { ShoppingBag, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-tech.jpg';
import droneImage from '@/assets/drone.jpg';
import ebikeImage from '@/assets/ebike.jpg';
import playstationImage from '@/assets/playstation.jpg';
import smartTvImage from '@/assets/smart-tv.jpg';
import xboxImage from '@/assets/xbox.jpg';

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Floating Product Composition */}
          <div className="absolute inset-0 pointer-events-none">
            {/* PlayStation Controller - Top Left */}
            <div className="absolute top-8 left-8 md:top-12 md:left-16 lg:top-16 lg:left-24 z-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl rounded-full scale-150 group-hover:scale-[1.8] transition-transform duration-500"></div>
                <img 
                  src={playstationImage} 
                  alt="PlayStation Controller" 
                  className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain animate-float opacity-100 transition-transform duration-300 group-hover:scale-110 filter drop-shadow-[0_0_30px_rgba(79,172,254,0.3)]"
                />
              </div>
            </div>

            {/* Smart TV - Top Right */}
            <div className="absolute top-4 right-4 md:top-8 md:right-12 lg:top-12 lg:right-20 z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/15 to-electric/15 blur-2xl rounded-full scale-150 group-hover:scale-[1.8] transition-transform duration-500"></div>
                <img 
                  src={smartTvImage} 
                  alt="Smart TV" 
                  className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain opacity-100 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                />
              </div>
            </div>

            {/* Drone - Left Side */}
            <div className="absolute top-1/2 left-0 md:left-4 lg:left-8 transform -translate-y-1/2 z-15">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-electric/20 to-neon/20 blur-xl rounded-full scale-150 group-hover:scale-[1.8] transition-transform duration-500"></div>
                <img 
                  src={droneImage} 
                  alt="Drone" 
                  className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain opacity-100 transition-transform duration-300 group-hover:scale-110 filter drop-shadow-[0_0_35px_rgba(34,197,94,0.3)]"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                />
              </div>
            </div>

            {/* Xbox Controller - Right Side */}
            <div className="absolute top-2/3 right-0 md:right-4 lg:right-8 transform -translate-y-1/2 z-15">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-tech-blue/20 to-primary/20 blur-xl rounded-full scale-150 group-hover:scale-[1.8] transition-transform duration-500"></div>
                <img 
                  src={xboxImage} 
                  alt="Xbox Controller" 
                  className="relative w-30 h-30 md:w-38 md:h-38 lg:w-46 lg:h-46 object-contain opacity-100 transition-transform duration-300 group-hover:scale-110 filter drop-shadow-[0_0_30px_rgba(79,172,254,0.3)]"
                />
              </div>
            </div>

            {/* E-bike - Bottom Left */}
            <div className="absolute bottom-20 left-8 md:bottom-24 md:left-16 lg:bottom-32 lg:left-24 z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/15 to-accent-glow/15 blur-2xl rounded-full scale-150 group-hover:scale-[1.8] transition-transform duration-500"></div>
                <img 
                  src={ebikeImage} 
                  alt="E-bike" 
                  className="relative w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain opacity-100 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                />
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="relative z-30 text-center pt-16 md:pt-20 lg:pt-24">
            {/* Main Headline */}
            <div className="space-y-3 md:space-y-4 mb-8">
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
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 justify-center items-center pt-8 mb-16">
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