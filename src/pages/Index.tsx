import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import PartnerBrands from '@/components/PartnerBrands';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Shield, Zap, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Globe,
      title: 'Global Distribution',
      description: 'Worldwide shipping to 50+ countries with local support and fast delivery'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'All products authenticated and tested before distribution'
    },
    {
      icon: Zap,
      title: 'Latest Technology',
      description: 'First access to cutting-edge products from leading brands'
    },
    {
      icon: HeartHandshake,
      title: 'Trusted Partnerships',
      description: 'Long-term relationships with manufacturers and distributors'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <PartnerBrands />
      
      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">CONSOLTECH</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're more than just a distributor – we're your technology partner, 
              committed to your success in the global marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="product-card text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of successful businesses worldwide who trust CONSOLTECH 
            for their technology distribution needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-hero">
                Start Partnership
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/products">
              <Button className="btn-neon">
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-2xl font-bold gradient-text">CONSOLTECH</span>
              </div>
              <p className="text-muted-foreground">
                Global leader in electronics and gaming distribution, 
                connecting innovation with markets worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/about" className="block text-muted-foreground hover:text-accent transition-colors">About Us</Link>
                <Link to="/products" className="block text-muted-foreground hover:text-accent transition-colors">Products</Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-accent transition-colors">Contact</Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                <span className="block text-muted-foreground">Gaming Consoles</span>
                <span className="block text-muted-foreground">Smart Electronics</span>
                <span className="block text-muted-foreground">Drones & Tech</span>
                <span className="block text-muted-foreground">E-Mobility</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>info@consoltech.com</p>
                <p>+1 (555) 123-4567</p>
                <p>Global offices in NY, London, Singapore</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 CONSOLTECH. All rights reserved. | Global Import & Distribution Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
