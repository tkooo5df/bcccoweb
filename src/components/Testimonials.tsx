import { Star, Quote } from 'lucide-react';
import ScrollFloat from './ScrollFloat';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Karim Benali',
      role: 'Directeur Commercial',
      company: 'Entreprise leader du secteur',
      rating: 5,
      text: 'Les formations BCOS ont transformé notre équipe commerciale. Des résultats concrets et mesurables dès les premières semaines.',
      avatar: 'KB',
    },
    {
      id: 2,
      name: 'Sarah Meziani',
      role: 'DRH',
      company: 'Groupe industriel',
      rating: 5,
      text: 'Un accompagnement de qualité avec des formateurs expérimentés. Nos collaborateurs sont ravis et plus performants.',
      avatar: 'SM',
    },
    {
      id: 3,
      name: 'Ahmed Brahim',
      role: 'Responsable Achats',
      company: 'Multinationale',
      rating: 5,
      text: 'Formation pratique et adaptée à nos besoins. Les consultants BCOS comprennent vraiment les enjeux du marché algérien.',
      avatar: 'AB',
    },
    {
      id: 4,
      name: 'Fatima Amrani',
      role: 'Chef de Projet',
      company: 'PME innovante',
      rating: 5,
      text: 'L\'e-learning BCOS nous a permis de former toute l\'équipe à distance. Plateforme intuitive et contenu de qualité.',
      avatar: 'FA',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Témoignages
          </div>
          <ScrollFloat
            containerClassName="text-3xl lg:text-4xl xl:text-5xl font-heading text-foreground mb-6"
          >
            Ils ont parlé du BCOS
          </ScrollFloat>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">4.9/5</span>
            <span className="text-muted-foreground">(250+ avis Google)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-card rounded-2xl p-6 hover:shadow-glass transition-smooth hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {testimonial.text}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {testimonial.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
