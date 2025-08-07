const PartnerBrands = () => {
  const brands = [
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Xbox', logo: 'https://logo.clearbit.com/xbox.com' },
    { name: 'PlayStation', logo: 'https://logo.clearbit.com/playstation.com' },
    { name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com' },
    { name: 'LG', logo: 'https://logo.clearbit.com/lg.com' },
    { name: 'TCL', logo: 'https://logo.clearbit.com/tcl.com' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Sony', logo: 'https://logo.clearbit.com/sony.com' }
  ];

  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by <span className="gradient-text">Global Brands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We partner with the world's leading technology companies to bring you 
            the latest and greatest products
          </p>
        </div>

        {/* Brand logos grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 bg-card/20 rounded-2xl border border-border/20">
          {brands.map((brand, index) => (
            <div 
              key={brand.name} 
              className="flex items-center justify-center p-10 bg-card/40 rounded-xl hover:bg-card/60 transition-all duration-300 group relative overflow-hidden border border-border/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-electric/10 via-neon/10 to-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="h-16 w-auto transition-all duration-300 group-hover:scale-110 relative z-10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.textContent = brand.name;
                }}
              />
              <span className="text-muted-foreground font-medium hidden group-hover:block transition-all duration-300 absolute bottom-2 text-xs relative z-10">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full border-2 border-background"></div>
              ))}
            </div>
            <span className="text-sm">+200 more trusted partners worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;