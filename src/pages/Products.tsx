import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Filter, Search, Phone, RotateCcw, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProducts, getImageUrl, type Product as ApiProduct } from '@/lib/api';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  features?: string[];
  price: string;
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  // Load products from API
  useEffect(() => {
    loadProducts();
  }, []);

  // Prefill search from ?q= query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    if (q) {
      setSearchTerm(q);
    }
  }, [location.search]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const apiProducts = await getProducts();
      // Transform API products to match the component's expected format
      const transformedProducts: Product[] = apiProducts.map((p: ApiProduct) => ({
        id: p.id,
        name: p.title,
        category: p.category,
        description: p.description,
        image: p.imageUrl,
        features: extractFeatures(p.description),
        price: p.price > 0 ? `$${p.price.toFixed(2)}` : 'Contact for pricing'
      }));
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products. Using cached data.');
      // Fallback to empty array if API fails
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract features from description (simple implementation)
  const extractFeatures = (description: string): string[] => {
    // This is a simple fallback - in production, features should be stored separately
    const words = description.split(/[,.]/).map(s => s.trim()).filter(s => s.length > 0);
    return words.slice(0, 4);
  };

  const categories = ['All', 'Gaming', 'Electronics', 'Drones', 'E-Bikes', 'TVs'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="h-12 w-12 animate-spin text-primary" aria-label="Loading products" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main id="main-content" className="flex-1">
      
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
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={getImageUrl(product.image)}
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
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
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
                  
                  <div className="flex items-center justify-end pt-2">
                    <button
                      className="btn-inquiry inline-flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      data-product={product.name}
                      data-sku={`${product.category.toUpperCase()}-${product.id}`}
                      aria-label={`Inquiry about ${product.name}`}
                    >
                      <Phone className="h-4 w-4" />
                      <span>Inquire Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
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
          <Button asChild className="btn-hero">
            <Link to="/contact">
              <Phone className="h-5 w-5" />
              <span>Contact Our Specialists</span>
            </Link>
          </Button>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;