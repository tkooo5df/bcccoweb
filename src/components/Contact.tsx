import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ScrollFloat from './ScrollFloat';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message envoyé avec succès! Nous vous répondrons rapidement.');
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+213 (0) 21 XX XX XX',
      subContent: 'Disponible 24/7',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@bcos-dz.com',
      subContent: 'Réponse sous 24h',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Alger, Algérie',
      subContent: 'Zone d\'activité',
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: 'Dim - Jeu: 8h - 17h',
      subContent: 'Samedi: Sur RDV',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contact
          </div>
          <ScrollFloat
            containerClassName="text-3xl lg:text-4xl xl:text-5xl font-heading text-foreground mb-6"
          >
            Contactez-nous
          </ScrollFloat>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Une question ? Un projet ? Notre équipe est à votre écoute
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Form */}
          <div className="glass-card rounded-3xl p-8 lg:p-10 animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-xl h-12"
                  placeholder="Votre nom"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-xl h-12"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="rounded-xl h-12"
                    placeholder="+213..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Société</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="rounded-xl h-12"
                  placeholder="Nom de votre société"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="rounded-xl min-h-32"
                  placeholder="Décrivez votre projet ou votre demande..."
                />
              </div>

              <Button type="submit" size="lg" className="rounded-2xl gradient-primary w-full h-14">
                <Send className="w-5 h-5 mr-2" />
                Envoyer la demande
              </Button>
            </form>
          </div>

          {/* Right: Contact Info + Map */}
          <div className="space-y-8 animate-fade-in">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="glass-card rounded-2xl p-6 hover:shadow-glass transition-smooth hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="text-sm text-foreground mb-1">{info.content}</p>
                  <p className="text-xs text-muted-foreground">{info.subContent}</p>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="glass-card rounded-3xl overflow-hidden h-80">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-bcos-indigo/10 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-primary mx-auto" />
                  <p className="text-muted-foreground">Carte interactive</p>
                  <p className="text-xs text-muted-foreground">
                    Alger, Algérie
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
