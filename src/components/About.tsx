import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollFloat from './ScrollFloat';

const About = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://i.postimg.cc/j5LccKrM/Asset-1.webp"
          alt="Background"
          className="w-full h-full object-contain opacity-30"
        />
      </div>
      <div className="absolute inset-0 bg-background/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left: Image */}
          <div className="animate-fade-in order-2 lg:order-1 mt-8 lg:mt-0">
            <a href='https://postimages.org/' target='_blank' rel='noopener noreferrer' className="block">
              <img 
                src='https://i.postimg.cc/x84HsR5Q/Asset-8.webp' 
                alt='BCOS Asset' 
                className="w-full h-auto rounded-2xl"
              />
            </a>
          </div>

          {/* Right: Content */}
          <div className="space-y-6 sm:space-y-8 animate-slide-up order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-5">
              <div style={{ color: '#253b74' }} className="text-left">
                <ScrollFloat
                  containerClassName="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading leading-tight font-bold text-left"
                  textClassName="!text-left"
                >
                  Depuis 2006, BCOS propulse les talents vers le succès
                </ScrollFloat>
              </div>
              <p className="text-base sm:text-lg text-black leading-relaxed">
                BCOS est un acteur majeur de la formation et du conseil en Algérie. 
                Nous accompagnons les entreprises dans leur développement à travers 
                des formations professionnelles, du e-learning innovant et du conseil stratégique.
              </p>
              <p className="text-base sm:text-lg text-black leading-relaxed">
                Notre approche unique combine l'expertise internationale avec une 
                connaissance approfondie du marché algérien, garantissant des solutions 
                pratiques et adaptées à votre réalité.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button size="lg" className="rounded-2xl gradient-primary">
                Découvrir BCOS
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl">
                Notre histoire
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
