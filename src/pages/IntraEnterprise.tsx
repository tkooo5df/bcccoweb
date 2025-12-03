import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  FileText,
  MapPin,
  DollarSign,
  Wrench,
  Users,
  Calendar,
  Factory,
  Heart,
  ShoppingCart,
  Truck,
  HardHat,
  Monitor,
  Radio,
  Plane
} from 'lucide-react';

const IntraEnterprise = () => {
  const advantages = [
    {
      icon: FileText,
      title: 'Contenu personnalisé',
      description: 'Programmes adaptés aux besoins spécifiques de votre entreprise.'
    },
    {
      icon: MapPin,
      title: 'Formation sur site',
      description: 'Nos formateurs se déplacent dans vos locaux.'
    },
    {
      icon: DollarSign,
      title: 'Optimisation des coûts',
      description: 'Solution économique pour former plusieurs collaborateurs.'
    },
    {
      icon: Wrench,
      title: 'Outils pratiques',
      description: 'Méthodes concrètes directement applicables en entreprise.'
    },
    {
      icon: Users,
      title: 'Cohésion d\'équipe',
      description: 'Renforce la collaboration interne et l\'esprit d\'équipe.'
    },
    {
      icon: Calendar,
      title: 'Flexibilité maximale',
      description: 'Sessions planifiées selon votre disponibilité.'
    }
  ];

  const expertiseDomains = [
    'Digital & Intelligence Artificielle',
    'Commercial & Marketing',
    'Management & Leadership',
    'Finance & Comptabilité',
    'Logistique & Supply Chain',
    'Ressources Humaines'
  ];

  const sectors = [
    { icon: Factory, title: 'Industrie & Production' },
    { icon: Heart, title: 'Santé & Pharmaceutique' },
    { icon: ShoppingCart, title: 'Grande distribution & Commerce' },
    { icon: Truck, title: 'Transport & Logistique' },
    { icon: HardHat, title: 'BTP & Construction' },
    { icon: Monitor, title: 'Informatique & Digital' },
    { icon: Radio, title: 'Télécommunications' },
    { icon: Plane, title: 'Aéronautique & Automobile' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden min-h-[70vh] flex items-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(37, 59, 116, 0.7)' }} />
          
          {/* Content */}
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6">
                Formations Intra-entreprises BCOS
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Faites évoluer vos équipes vers l'excellence
              </p>
              <Button size="lg" className="text-lg px-8 py-4 shadow-lg text-white" style={{ backgroundColor: '#253b74' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e2f5a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#253b74'}>
                Demander un devis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose BCOS Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Pourquoi choisir BCOS ?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Découvrez les avantages de nos formations intra-entreprises
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                      <advantage.icon className="h-8 w-8" style={{ color: '#253b74' }} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">{advantage.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Domains Section */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Nos domaines d'expertise
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Des formations spécialisées dans tous les secteurs clés de votre entreprise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {expertiseDomains.map((domain, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#253b74' }}></div>
                      <h3 className="font-semibold text-foreground">{domain}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Nos formations par secteur d'activité
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Une expertise adaptée à votre secteur d'activité
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sectors.map((sector, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 59, 116, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 59, 116, 0.1)'}>
                      <sector.icon className="h-6 w-6" style={{ color: '#253b74' }} />
                    </div>
                    <h3 className="font-medium text-foreground text-sm">{sector.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32" style={{ background: 'linear-gradient(135deg, rgba(37, 59, 116, 0.1) 0%, rgba(37, 59, 116, 0.05) 100%)' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
                Prêt à transformer vos équipes ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Contactez-nous pour discuter de vos besoins en formation et obtenir un devis personnalisé
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-white" style={{ backgroundColor: '#253b74' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e2f5a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#253b74'}>
                  Demander un devis gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4">
                  Télécharger notre catalogue
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Notre processus de formation
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Un accompagnement structuré pour garantir le succès de vos formations
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                    <span className="text-2xl font-bold" style={{ color: '#253b74' }}>1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Analyse des besoins</h3>
                  <p className="text-muted-foreground text-sm">
                    Évaluation complète de vos objectifs et contraintes
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                    <span className="text-2xl font-bold" style={{ color: '#253b74' }}>2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Conception sur mesure</h3>
                  <p className="text-muted-foreground text-sm">
                    Création d'un programme adapté à votre contexte
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                    <span className="text-2xl font-bold" style={{ color: '#253b74' }}>3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Déploiement</h3>
                  <p className="text-muted-foreground text-sm">
                    Formation dans vos locaux par nos experts
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                    <span className="text-2xl font-bold" style={{ color: '#253b74' }}>4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Suivi & évaluation</h3>
                  <p className="text-muted-foreground text-sm">
                    Mesure des résultats et accompagnement post-formation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IntraEnterprise;
