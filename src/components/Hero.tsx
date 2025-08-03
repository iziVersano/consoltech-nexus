import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-tech.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="High-tech electronics and gaming devices" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-r from-primary to-cyber-purple rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 md:space-y-8">
          {/* Main Headline */}
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-center text-3xl md:text-4xl lg:text-6xl leading-snug lg:leading-tight font-bold break-normal whitespace-normal">
              <span className="block text-3xl md:text-4xl lg:text-7xl font-black mb-2 md:mb-1 lg:mb-2 leading-tight">
                Global Import & <span className="gradient-text">Distribution</span>
              </span>
              <span className="block text-foreground text-3xl md:text-4xl lg:text-6xl font-bold leading-snug">
                of Electronics, Gaming & <span className="text-accent text-glow">Innovation</span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your premier partner for cutting-edge technology distribution worldwide. 
              From gaming consoles to smart devices, we bring innovation to your doorstep.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
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