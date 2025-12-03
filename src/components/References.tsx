import { useEffect, useState } from 'react';
import ScrollFloat from './ScrollFloat';

const References = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock company logos - in production, replace with real client logos
  const companies = [
    { name: 'Sonatrach', logo: 'S' },
    { name: 'Sonelgaz', logo: 'SZ' },
    { name: 'Air Algérie', logo: 'AA' },
    { name: 'Mobilis', logo: 'M' },
    { name: 'Djezzy', logo: 'D' },
    { name: 'Condor', logo: 'C' },
    { name: 'CEVITAL', logo: 'CV' },
    { name: 'NAFTAL', logo: 'N' },
    { name: 'BNA', logo: 'B' },
    { name: 'CPA', logo: 'CP' },
    { name: 'BDL', logo: 'BL' },
    { name: 'BADR', logo: 'BR' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % companies.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [companies.length]);

  return (
    <section id="references" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Ils nous font confiance
          </div>
          <ScrollFloat
            containerClassName="text-3xl lg:text-4xl xl:text-5xl font-heading text-foreground mb-6"
          >
            Nos Références
          </ScrollFloat>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Plus de 700 entreprises algériennes nous font confiance
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-glass">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className={`flex items-center justify-center transition-smooth hover:scale-110 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-primary">
                    {company.logo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          Des PME aux grandes entreprises publiques et privées
        </div>
      </div>
    </section>
  );
};

export default References;
