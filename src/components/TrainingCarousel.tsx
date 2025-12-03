import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, UserPlus, Clock, Calendar, ArrowRight } from 'lucide-react';
import ScrollFloat from './ScrollFloat';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Training {
  id: number;
  title: string;
  benefit: string;
  duration: string;
  level: string;
  color: string;
  image?: string;
}

const TrainingCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  const trainings: Training[] = [
    {
      id: 1,
      title: 'La vente par téléphone',
      benefit: 'Maîtrisez les techniques de closing à distance',
      duration: '3 jours',
      level: 'Intermédiaire',
      color: 'from-blue-500/20 to-indigo-500/20',
      image: 'https://i.postimg.cc/x84HsR5Q/Asset-8.webp',
    },
    {
      id: 2,
      title: 'Techniques d\'inventaires physiques de fin d\'année',
      benefit: 'Optimisez vos processus de contrôle et valorisation',
      duration: '2 jours',
      level: 'Avancé',
      color: 'from-purple-500/20 to-pink-500/20',
      image: 'https://i.postimg.cc/x84HsR5Q/Asset-8.webp',
    },
    {
      id: 3,
      title: 'Gestion des achats & approvisionnements',
      benefit: 'Réduisez vos coûts et sécurisez votre supply chain',
      duration: '4 jours',
      level: 'Tous niveaux',
      color: 'from-emerald-500/20 to-teal-500/20',
      image: 'https://i.postimg.cc/x84HsR5Q/Asset-8.webp',
    },
    {
      id: 4,
      title: 'Techniques de prospection et closing',
      benefit: 'Développez votre portefeuille clients efficacement',
      duration: '3 jours',
      level: 'Débutant',
      color: 'from-orange-500/20 to-red-500/20',
      image: 'https://i.postimg.cc/x84HsR5Q/Asset-8.webp',
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="formations" className="py-20 lg:py-32 pb-4 lg:pb-8 relative overflow-hidden">
      {/* Decorative Circle - Right Side */}
      <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-12 xl:right-20 w-20 h-20 lg:w-32 lg:h-32 xl:w-40 xl:h-40 opacity-40 pointer-events-none z-0">
        <img 
          src="https://i.postimg.cc/50p2pdfH/Asset-3.webp"
          alt="Decorative circle"
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Decorative Circle - Left Side */}
      <div className="absolute top-1/3 left-2 lg:left-6 xl:left-12 w-16 h-16 lg:w-28 lg:h-28 xl:w-36 xl:h-36 opacity-40 pointer-events-none z-0">
        <img 
          src="https://i.postimg.cc/50p2pdfH/Asset-3.webp"
          alt="Decorative circle"
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-bcos-lime/20 text-bcos-dark-indigo text-sm font-medium mb-4">
            Agenda
          </div>
          <ScrollFloat
            containerClassName="text-3xl lg:text-4xl xl:text-5xl font-heading text-foreground mb-6"
          >
            Nos Prochaines Formations
          </ScrollFloat>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre sélection de formations à venir
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {trainings.map((training) => (
                <CarouselItem key={training.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="glass-card rounded-2xl overflow-hidden hover:shadow-glass transition-smooth hover:scale-105 group cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-bcos-indigo/10">
                      <img
                        src={training.image || 'https://i.postimg.cc/x84HsR5Q/Asset-8.webp'}
                        alt={training.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${training.color} opacity-50`} />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <span className="px-2 py-1 rounded-full bg-primary/90 text-white text-xs font-medium backdrop-blur-sm">
                          {training.duration}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-bcos-lime/90 text-bcos-dark-indigo text-xs font-medium backdrop-blur-sm">
                          {training.level}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                        {training.title}
                      </h3>
                      
                      {/* Horaires & Durée - Below Title with Colored Icons */}
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/50">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Horaires</span>
                            <span className="text-sm font-medium text-foreground">09:00 - 17:00</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-bcos-lime/20 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-bcos-dark-indigo" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Durée</span>
                            <span className="text-sm font-medium text-foreground">{training.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Benefit */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {training.benefit}
                      </p>
                      
                      {/* Call to Action Button */}
                      <Button className="rounded-xl gradient-primary w-full mt-auto" size="sm">
                        Voir la formation
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 hidden md:flex" />
            <CarouselNext className="-right-12 hidden md:flex" />
          </Carousel>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {trainings.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-smooth ${
                  current === index ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingCarousel;
