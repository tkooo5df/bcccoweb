import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import ScrollFloat from './ScrollFloat';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: '5 erreurs à éviter avant d\'acheter des machines & solutions industrielles',
      excerpt: 'Découvrez les pièges les plus courants et comment les éviter pour faire les meilleurs choix d\'investissement.',
      category: 'Gestion',
      date: '15 Jan 2025',
      readTime: '5 min',
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      id: 2,
      title: 'Votre entreprise attire-t-elle les talents ou les fait-elle fuir ?',
      excerpt: 'Les clés pour construire une marque employeur attractive et fidéliser vos meilleurs collaborateurs.',
      category: 'RH',
      date: '12 Jan 2025',
      readTime: '7 min',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 3,
      title: 'Entre la planification et l\'exécution : pourquoi tant de stratégies restent lettre morte ?',
      excerpt: 'Analyse des facteurs qui empêchent la mise en œuvre efficace des stratégies d\'entreprise.',
      category: 'Stratégie',
      date: '10 Jan 2025',
      readTime: '6 min',
      gradient: 'from-emerald-500/20 to-teal-500/20',
    },
  ];

  return (
    <section id="blog" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-bcos-lime/20 text-bcos-dark-indigo text-sm font-medium mb-4">
            Blog & Actualités
          </div>
          <ScrollFloat
            containerClassName="text-3xl lg:text-4xl xl:text-5xl font-heading text-foreground mb-6"
          >
            Derniers Articles
          </ScrollFloat>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conseils, analyses et insights pour développer votre entreprise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {articles.map((article, index) => (
            <article
              key={article.id}
              className="glass-card rounded-3xl overflow-hidden hover:shadow-glass transition-smooth hover:scale-105 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center p-8`}>
                <h3 className="text-xl font-heading font-bold text-foreground text-center line-clamp-3">
                  {article.title}
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <Button
                  variant="ghost"
                  className="w-full rounded-xl group-hover:bg-primary/10 transition-smooth"
                >
                  Lire l\'article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="rounded-2xl">
            Voir tous les articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
