
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const playstationImg = '/lovable-uploads/bd80e124-a5e2-4d34-9c82-ebc0dbd6a697.png';
const xboxImg = '/lovable-uploads/78a95f48-606e-44b6-950e-af0555a3f04f.png';
const droneImg = '/lovable-uploads/07ba8bc0-8d14-4d62-a534-659913ac5f99.png';

const smartTvImg = '/lovable-uploads/6df37998-af04-426e-b749-365ffeb66787.png';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductSlider = () => {
  // Animation variants for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      x: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const, // Premium easing curve
      },
    },
  };

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
      image: '/lovable-uploads/a0bd3ab6-05d5-4312-b6ec-f0e256d7a63a.png',
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

        {/* Product Slider */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={24}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
              stopOnLastSlide: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet product-slider-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active product-slider-bullet-active',
            }}
            navigation={{
              nextEl: '.product-slider-next',
              prevEl: '.product-slider-prev',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            speed={600}
            grabCursor={true}
            loop={false}
            className="product-swiper"
            onAutoplayStop={() => {
              // Optional: Can add any logic when autoplay stops
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id} className="h-auto">
                <motion.div 
                  className="product-card group h-full flex flex-col"
                  variants={cardVariants}
                  custom={index}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={cn(
                        "w-full h-48 sm:h-56 md:h-64 transition-transform duration-500",
                        "object-cover group-hover:scale-110"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-grow space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-grow">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-primary font-semibold">
                        {product.price}
                      </span>
                      <Button className="btn-accent-small">
                        <ArrowRight className="h-4 w-4" />
                        <span>Learn More</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation arrows - Desktop only */}
          <div className="hidden lg:block">
            <button className="product-slider-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="product-slider-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button className="btn-hero">
              <ArrowRight className="h-5 w-5" />
              <span>Explore All Products</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
