import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Clock, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Mail,
  Building,
  User
} from 'lucide-react';

const Consultation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    company: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const benefits = [
    {
      icon: Clock,
      title: 'Gain de temps',
      description: 'Économisez vos efforts et votre temps grâce à nos experts'
    },
    {
      icon: Users,
      title: 'Expertise professionnelle',
      description: 'Bénéficiez de l\'expertise de nos consultants expérimentés'
    },
    {
      icon: Target,
      title: 'Solutions sur mesure',
      description: 'Des conseils adaptés à vos besoins spécifiques'
    },
    {
      icon: CheckCircle,
      title: 'Accompagnement complet',
      description: 'Programme intégré après diagnostic complet'
    }
  ];

  const services = [
    'Diagnostic organisationnel complet',
    'Optimisation des processus de gestion',
    'Accompagnement dans la transformation digitale',
    'Amélioration de la performance opérationnelle',
    'Conseil en stratégie d\'entreprise',
    'Formation et développement des équipes'
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
              backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80')`
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(37, 59, 116, 0.7)' }} />
          
          {/* Content */}
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6">
                Consultation et accompagnement sur le terrain
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Économisez désormais vos efforts et votre temps grâce à des séances de conseil avec nos experts
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-4 shadow-lg">
                Découvrir nos services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
                  Notre expertise à votre service
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nous permettons à nos clients de gagner du temps en leur apportant l'expertise et les conseils de nos experts dans divers domaines de gestion.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nous proposons également un programme intégré pour accompagner les institutions et les entreprises après un diagnostic complet.
                </p>
                
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form Section */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                  Intéressé par nos services de conseil et l'accompagnement ?
                </h2>
                <p className="text-xl text-muted-foreground">
                  S'inscrire maintenant pour bénéficier de notre expertise
                </p>
              </div>

              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Demande de consultation</CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire et nos experts vous recontacteront dans les plus brefs délais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nom et Prénom *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Votre nom complet"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Numéro de téléphone *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+213 XXX XXX XXX"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Entreprise *</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Nom de votre entreprise"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="votre.email@exemple.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Décrivez brièvement vos besoins en consultation..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>

                    <div className="text-center">
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-3 text-lg"
                      >
                        S'inscrire maintenant
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground text-center">
                      En soumettant ce formulaire, vous acceptez d'être contacté par nos équipes concernant votre demande de consultation.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Notre processus d'accompagnement
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Un accompagnement structuré pour garantir le succès de votre projet
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Diagnostic initial</h3>
                  <p className="text-muted-foreground">
                    Analyse complète de votre organisation et identification des axes d'amélioration
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Plan d'action</h3>
                  <p className="text-muted-foreground">
                    Élaboration d'un programme personnalisé adapté à vos besoins spécifiques
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Accompagnement</h3>
                  <p className="text-muted-foreground">
                    Mise en œuvre et suivi continu pour assurer l'atteinte de vos objectifs
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

export default Consultation;
