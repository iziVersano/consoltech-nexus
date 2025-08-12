
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProductSlider from '@/components/ProductSlider';
import PartnerBrands from '@/components/PartnerBrands';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Shield, Zap, HeartHandshake, UserPlus, Search } from 'lucide-react';
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
      <ProductSlider />
      <PartnerBrands />
      
      {/* Why Choose Us Section */}
      <section className="pt-4 md:pt-6 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
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
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-6 md:mb-8">
            Join thousands of successful businesses worldwide who trust CONSOLTECH 
            for their technology distribution needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-hero">
                <UserPlus className="h-5 w-5" />
                <span>Start Partnership</span>
              </Button>
            </Link>
            <Link to="/products">
              <Button className="btn-neon">
                <Search className="h-5 w-5" />
                <span>Browse Catalog</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="space-y-3 text-muted-foreground">
                  <a href="mailto:sales@gamestation.co.il" className="block hover:underline leading-relaxed break-words">
                    <span className="text-accent font-semibold">Email:</span> sales@gamestation.co.il
                  </a>
                  <a href="tel:+972522768607" className="block hover:underline leading-relaxed break-words">
                    <span className="text-accent font-semibold">Mobile / WhatsApp:</span> +972 52 276 8607
                  </a>
                  <a
                    href="https://www.google.com/maps?q=47%20Moshe%20Sneh%20St.,%20Tel%20Aviv%206930243,%20Israel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:underline leading-relaxed break-words"
                  >
                    <span className="text-accent font-semibold">Address:</span> 47 Moshe Sneh St., Tel Aviv 6930243, Israel
                  </a>
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
