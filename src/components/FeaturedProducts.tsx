import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import playstationImg from '@/assets/playstation.jpg';
import xboxImg from '@/assets/xbox.jpg';
import droneImg from '@/assets/drone.jpg';
import ebikeImg from '@/assets/ebike.jpg';
import smartTvImg from '@/assets/smart-tv.jpg';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'PlayStation 5',
      category: 'Gaming',
      description: 'Next-gen gaming console with 4K graphics and ultra-fast SSD',
      image: playstationImg,
      price: 'Contact for pricing'
    },
    {
      id: 2,
      name: 'Xbox Series X',
      category: 'Gaming',
      description: 'Powerful gaming console with 120fps gaming capabilities',
      image: xboxImg,
      price: 'Contact for pricing'
    },
    {
      id: 3,
      name: 'Professional Drones',
      category: 'Drones',
      description: 'High-performance drones for commercial and recreational use',
      image: droneImg,
      price: 'Contact for pricing'
    },
    {
      id: 4,
      name: 'Smart E-Bikes',
      category: 'E-Bikes',
      description: 'Electric bikes with smart connectivity and long-range batteries',
      image: ebikeImg,
      price: 'Contact for pricing'
    },
    {
      id: 5,
      name: 'Smart TVs',
      category: 'Electronics',
      description: '4K and 8K smart TVs with AI-powered features',
      image: smartTvImg,
      price: 'Contact for pricing'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our latest collection of cutting-edge technology products 
            from the world's leading brands
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div key={product.id} className="product-card group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">
                    {product.price}
                  </span>
                  <Button variant="ghost" size="sm" className="text-accent hover:text-accent-foreground hover:bg-accent/20">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* View All Card */}
          <Link to="/products" className="product-card group cursor-pointer flex items-center justify-center min-h-[400px] bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-dashed border-primary/30 hover:border-primary/60">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">View All Products</h3>
                <p className="text-muted-foreground">Explore our complete catalog</p>
              </div>
            </div>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link to="/products">
            <Button className="btn-hero">
              Explore All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;