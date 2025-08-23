
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProductSlider from '@/components/ProductSlider';
import PartnerBrands from '@/components/PartnerBrands';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Globe, Shield, Zap, HeartHandshake, UserPlus, Search, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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

  const canonicalUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Consoltech",
            url: canonicalUrl,
            description: "Global import, export, and distribution of consumer electronics and gaming since 2001.",
            email: "sales@gamestation.co.il",
            telephone: "+972-52-2768607",
            address: {
              "@type": "PostalAddress",
              streetAddress: "47 Moshe Sneh St.",
              addressLocality: "Tel Aviv",
              postalCode: "6930243",
              addressCountry: "IL",
            },
            areaServed: ["Europe", "United States", "Middle East", "Asia"],
            sameAs: ["https://www.handelot.com"],
          })}
        </script>
      </Helmet>
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

      {/* About Consoltech Section */}
      <section id="about-home" className="block w-full py-10 px-4 sm:px-6 mt-12 mb-8">
        <div className="max-w-7xl mx-auto">
          {/* About Card */}
          <div className="product-card p-8 mb-8">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-8">
              {/* Left Column */}
              <div className="md:col-span-7 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  About <span className="gradient-text">Consoltech</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 2001 in Tel Aviv, Consoltech is a trusted importer, exporter, and distributor 
                  delivering high-demand consumer electronics and gaming products to retailers, resellers, 
                  and wholesale clients across global markets. As a VIP+ Handelot member, we prioritize 
                  reliability, transparency, and fast, flexible logistics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/about">
                    <Button className="btn-hero">
                      <ArrowRight className="h-5 w-5" />
                      <span>Learn more</span>
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-border hover:bg-accent/10">
                      <span>Contact us</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-5 space-y-6">
                {/* Check-list bullets */}
                <div className="space-y-3">
                  {[
                    'Consumer electronics & IT products',
                    'Gaming consoles & accessories',
                    'E-bikes & branded toys',
                    'Gadgets & tech innovations',
                    'VIP+ member on Handelot'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">20+</div>
                    <div className="text-sm text-muted-foreground">Years of experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">4</div>
                    <div className="text-sm text-muted-foreground">Regions served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">Fast</div>
                    <div className="text-sm text-muted-foreground">Logistics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More about us Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="more-about-us" className="product-card px-6">
              <AccordionTrigger className="text-xl font-semibold py-6">
                More about us
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-8">
                  {/* What we do */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-accent">What we do</h3>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Consumer electronics & IT products</li>
                      <li>Gaming consoles & accessories</li>
                      <li>Electric bikes & branded toys</li>
                      <li>Gadgets & tech innovations</li>
                    </ul>
                  </div>

                  {/* Who we serve */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-accent">Who we serve</h3>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Retailers</li>
                      <li>Resellers</li>
                      <li>Wholesale clients</li>
                    </ul>
                  </div>

                  {/* Where we operate */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-accent">Where we operate</h3>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Europe</li>
                      <li>United States</li>
                      <li>Middle East</li>
                      <li>Asia (Hong Kong, China, Singapore, Korea)</li>
                    </ul>
                  </div>

                  {/* How we work */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-accent">How we work</h3>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>VIP+ member on Handelot for trusted partnerships</li>
                      <li>Strong global partnerships with manufacturers</li>
                      <li>Reliability and transparency in all operations</li>
                      <li>Efficient logistics designed for speed and flexibility</li>
                      <li>Focus on long-term, mutually beneficial cooperation</li>
                    </ul>
                  </div>

                  {/* Contact & HQ */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-accent">Contact & HQ</h3>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li><strong>Address:</strong> 47 Moshe Sneh St., Tel Aviv 6930243, Israel</li>
                      <li><strong>Mobile / WhatsApp:</strong> +972-52-2768607</li>
                      <li><strong>Email:</strong> sales@gamestation.co.il</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
