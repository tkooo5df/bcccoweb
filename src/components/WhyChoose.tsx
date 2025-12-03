import {
  TrendingUp,
  Target,
  Rocket,
} from 'lucide-react';

const WhyChoose = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Optimisation des performances',
    },
    {
      icon: Target,
      title: 'Renforcement de votre position sur le marché',
    },
    {
      icon: Rocket,
      title: 'Solutions adaptées pour une croissance durable',
    },
  ];

  return (
    <section id="why-choose" className="py-12 sm:py-16 lg:py-20 xl:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.postimg.cc/MK7WGMx5/Asset-18.webp')`,
        }}
      />
      <div className="absolute inset-0 bg-background/30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top section with text and image */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left: Content */}
          <div className="space-y-6 sm:space-y-8 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-foreground leading-tight">
              Qui est BCOS !?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Depuis 2006, BCOS propulse les entreprises vers le succès. Notre expertise en conseil et formation en gestion d'entreprise vous assure :
            </p>
            
            {/* Benefits list */}
            <div className="space-y-3 sm:space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-3 sm:gap-4 animate-slide-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground pt-1 sm:pt-2">
                    {benefit.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Closing statement */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-2 sm:pt-4">
              Avec BCOS, transformez les défis en opportunités et assurez la pérennité de votre entreprise.
            </p>
          </div>

          {/* Right: Video */}
          <div className="animate-fade-in mt-8 lg:mt-0">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/Ns_sBz-DfOc"
                title="Qui est BCOS"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

