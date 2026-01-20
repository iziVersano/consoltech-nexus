import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getImageUrl, Product } from '@/lib/api';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/I18nContext';

const NewArrivalsSpotlight = () => {
  const { lang, t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Refetch products when language changes - queryKey includes lang for cache invalidation
  const { data: products = [] } = useQuery({
    queryKey: ['products', lang],
    queryFn: () => getProducts(lang),
  });

  // Filter only New Arrivals - category name is now localized from API
  const newArrivals = products.filter((p: Product) =>
    // Match against localized category name from translations
    p.category === t('products.category.newArrivals')
  );

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || newArrivals.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newArrivals.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, newArrivals.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + newArrivals.length) % newArrivals.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % newArrivals.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (newArrivals.length === 0) return null;

  const currentProduct = newArrivals[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
        <span className="text-lg font-semibold text-primary uppercase tracking-wider">
          {t('products.newArrivalsHeader')}
        </span>
        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
      </div>

      {/* Main Spotlight Container - Clickable */}
      <Link
        to="/products?category=New+Arrivals"
        className="block relative bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 shadow-2xl shadow-primary/20 cursor-pointer"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Product Display */}
        <div className="flex flex-col md:flex-row">
          {/* Product Image - Large */}
          <div className="relative flex-1 h-64 md:h-96 overflow-hidden bg-gradient-to-br from-card to-background">
            <img
              src={getImageUrl(currentProduct.imageUrl)}
              alt={currentProduct.title}
              className="w-full h-full object-contain p-8 transition-transform duration-700 hover:scale-105"
            />

            {/* Navigation Arrows */}
            {newArrivals.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Product Info - Side Panel */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-background/50 to-card/50">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {currentProduct.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3">
              {currentProduct.description}
            </p>

            {/* Dots Indicator */}
            {newArrivals.length > 1 && (
              <div className="flex justify-center gap-3 mt-6">
                {newArrivals.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      goToSlide(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary w-8'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Auto-play progress bar */}
        {isAutoPlaying && newArrivals.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20">
            <div
              key={currentIndex}
              className="h-full bg-primary animate-progress"
              style={{ animationDuration: '5s' }}
            />
          </div>
        )}
      </Link>

      {/* Product Thumbnails */}
      {newArrivals.length > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          {newArrivals.map((product, index) => (
            <button
              key={product.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-primary shadow-lg shadow-primary/30 scale-110'
                  : 'border-border/50 hover:border-primary/50 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={getImageUrl(product.imageUrl)}
                alt={product.title}
                className="w-full h-full object-contain bg-card p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivalsSpotlight;
