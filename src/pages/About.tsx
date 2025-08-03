import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Users, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const milestones = [
    { year: '2008', title: 'Founded', description: 'Started as a small electronics importer' },
    { year: '2012', title: 'Global Expansion', description: 'Expanded to 20+ countries worldwide' },
    { year: '2016', title: 'Gaming Focus', description: 'Specialized in gaming console distribution' },
    { year: '2020', title: 'Innovation Hub', description: 'Launched smart tech and e-mobility division' },
    { year: '2024', title: 'Market Leader', description: 'Serving 50+ countries with 1000+ products' }
  ];

  const values = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting markets across continents with seamless distribution networks'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Building lasting relationships through exceptional service and support'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Rigorous standards ensuring only premium products reach our clients'
    },
    {
      icon: Target,
      title: 'Innovation Drive',
      description: 'Constantly evolving to bring the latest technology trends to market'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">CONSOLTECH</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              15+ years of connecting the world with cutting-edge technology
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Our <span className="text-accent">Global Journey</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  Founded in 2008, CONSOLTECH began as a vision to bridge the gap between 
                  innovative technology and global markets. What started as a small electronics 
                  import business has evolved into a worldwide distribution powerhouse.
                </p>
                <p className="text-lg">
                  Today, we serve over 50 countries, managing a portfolio of 1000+ premium 
                  products from the world's leading brands. Our expertise spans gaming consoles, 
                  smart electronics, drones, e-mobility solutions, and cutting-edge consumer tech.
                </p>
                <p className="text-lg">
                  With headquarters strategically located across multiple continents, we ensure 
                  rapid delivery and localized support for our partners and customers worldwide.
                </p>
              </div>
              <Link to="/contact">
                <Button className="btn-hero">
                  Partner With Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="product-card p-6 text-center">
                    <div className="text-3xl font-bold text-accent">50+</div>
                    <div className="text-muted-foreground">Countries</div>
                  </div>
                  <div className="product-card p-6 text-center">
                    <div className="text-3xl font-bold text-primary">24/7</div>
                    <div className="text-muted-foreground">Support</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="product-card p-6 text-center">
                    <div className="text-3xl font-bold text-accent">1000+</div>
                    <div className="text-muted-foreground">Products</div>
                  </div>
                  <div className="product-card p-6 text-center">
                    <div className="text-3xl font-bold text-primary">15+</div>
                    <div className="text-muted-foreground">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Milestones</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Key moments that shaped our journey to global leadership
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="product-card">
                      <h3 className="text-2xl font-bold text-accent mb-2">{milestone.year}</h3>
                      <h4 className="text-xl font-semibold mb-2">{milestone.title}</h4>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-2/12 flex justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background"></div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that drive everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="product-card text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Partner</span> with Us?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the global network of successful businesses that trust CONSOLTECH 
            for their technology distribution needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-hero">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/products">
              <Button className="btn-neon">
                View Our Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;