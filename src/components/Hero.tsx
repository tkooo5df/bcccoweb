import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import heroImage from '@/assets/hero-training-room.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Salle de formation BCOS"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero"></div>
        
        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-bcos-lime/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-bcos-indigo/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 lg:px-8 xl:px-12 2xl:px-16 py-20 pt-32">
        <div className="w-full mx-auto text-center animate-fade-in">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-light text-white mb-6 leading-tight w-full animate-fade-in">
            BCOS… 18 ans d'expérience dans la formation<br />
            et l'accompagnement des entreprises algériennes.
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Optimisation des performances, renforcement des compétences, solutions adaptées au marché algérien.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              <Input
                type="search"
                placeholder="Rechercher des formations, services..."
                className="w-full h-14 pl-6 pr-14 text-base rounded-2xl bg-white/95 backdrop-blur-md border-0 shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
