import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Filter, Search, Phone, RotateCcw } from 'lucide-react';
const playstationImg = '/lovable-uploads/bd80e124-a5e2-4d34-9c82-ebc0dbd6a697.png';
const xboxImg = '/lovable-uploads/78a95f48-606e-44b6-950e-af0555a3f04f.png';
const droneImg = '/lovable-uploads/07ba8bc0-8d14-4d62-a534-659913ac5f99.png';

const smartTvImg = '/lovable-uploads/6df37998-af04-426e-b749-365ffeb66787.png';
import { cn } from '@/lib/utils';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();

  // Prefill search from ?q= query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    if (q) {
      setSearchTerm(q);
    }
  }, [location.search]);

  const categories = ['All', 'Gaming', 'Electronics', 'Drones', 'E-Bikes', 'TVs'];

  const products = [
    {
      id: 1,
      name: 'PlayStation 5',
      category: 'Gaming',
      description: 'Next-generation gaming console with ultra-fast SSD and ray tracing technology. Experience lightning-fast loading and stunning graphics.',
      image: playstationImg,
      features: ['4K Gaming', 'Ray Tracing', 'Ultra-fast SSD', '3D Audio'],
      price: 'Contact for pricing'
    },
    {
      id: 2,
      name: 'Xbox Series X',
      category: 'Gaming',
      description: 'The most powerful Xbox ever with 12 teraflops of GPU performance and Smart Delivery technology.',
      image: xboxImg,
      features: ['120fps Gaming', 'Quick Resume', 'Smart Delivery', 'Game Pass'],
      price: 'Contact for pricing'
    },
    {
      id: 3,
      name: 'Professional Drones',
      category: 'Drones',
      description: 'High-performance drones for commercial photography, surveying, and recreational flying with advanced stabilization.',
      image: droneImg,
      features: ['4K Camera', 'GPS Tracking', '40min Flight Time', 'Obstacle Avoidance'],
      price: 'Contact for pricing'
    },
    {
      id: 4,
      name: 'Smart E-Bikes',
      category: 'E-Bikes',
      description: 'Electric bikes with smart connectivity, long-range batteries, and advanced motor systems for urban mobility.',
      image: '/lovable-uploads/a0bd3ab6-05d5-4312-b6ec-f0e256d7a63a.png',
      features: ['80km Range', 'Smart App', 'Fast Charging', 'GPS Tracking'],
      price: 'Contact for pricing'
    },
    {
      id: 5,
      name: '4K Smart TVs',
      category: 'TVs',
      description: 'Ultra-high definition smart TVs with AI upscaling, HDR support, and built-in streaming platforms.',
      image: smartTvImg,
      features: ['4K HDR', 'AI Upscaling', 'Smart OS', 'Voice Control'],
      price: 'Contact for pricing'
    },
    {
      id: 6,
      name: 'Gaming Accessories',
      category: 'Gaming',
      description: 'Premium gaming peripherals including controllers, headsets, and racing wheels from top brands.',
      image: playstationImg,
      features: ['Wireless', 'Low Latency', 'Ergonomic', 'RGB Lighting'],
      price: 'Contact for pricing'
    },
    {
      id: 7,
      name: 'Smart Home Electronics',
      category: 'Electronics',
      description: 'Connected home devices including smart speakers, security cameras, and automation systems.',
      image: smartTvImg,
      features: ['Voice Control', 'App Integration', 'Security', 'Energy Efficient'],
      price: 'Contact for pricing'
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  // Deduplicate by product name to avoid duplicates when filtering
  const uniqueProducts = Array.from(new Map(filteredProducts.map(p => [p.name, p])).values());

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive catalog of cutting-edge technology products 
              from the world's leading brands
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "btn-primary-small" : "btn-accent-small"}
                  >
                    <Filter className="h-3 w-3" />
                    <span>{category}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {uniqueProducts.map((product) => (
              <div key={product.id} className="product-card group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={cn(
                      "w-full h-48 transition-transform duration-500 object-cover group-hover:scale-110"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {product.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, index) => (
                        <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-primary font-semibold">
                      {product.price}
                    </span>
                    <Button className="btn-accent-small">
                      <Phone className="h-4 w-4" />
                      <span>Inquire Now</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {uniqueProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or category filter
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="btn-neon">
                <RotateCcw className="h-5 w-5" />
                <span>Clear Filters</span>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a <span className="gradient-text">Custom Solution</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Can't find what you're looking for? Our team can source custom products 
            and create tailored distribution solutions for your business.
          </p>
          <Button className="btn-hero">
            <Phone className="h-5 w-5" />
            <span>Contact Our Specialists</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Products;