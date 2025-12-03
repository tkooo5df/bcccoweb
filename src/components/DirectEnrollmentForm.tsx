import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  UserPlus,
  User,
  Phone,
  Mail,
  Building,
  CheckCircle,
  Loader2,
  Send
} from 'lucide-react';
import { SimpleSupabaseService } from '@/lib/supabaseSimple';
import { toast } from 'sonner';

interface DirectEnrollmentFormProps {
  courseId: string;
  courseTitle: string;
  coursePrice?: number;
  courseCurrency?: string;
}

const DirectEnrollmentForm = ({ 
  courseId, 
  courseTitle, 
  coursePrice = 0, 
  courseCurrency = 'EUR' 
}: DirectEnrollmentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    company: '',
    email: ''
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const required = ['full_name', 'phone', 'email'];
    const missing = required.filter(field => !formData[field as keyof typeof formData].trim());
    
    if (missing.length > 0) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Veuillez saisir une adresse email valide');
      return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Veuillez saisir un numéro de téléphone valide');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Create enrollment data
      const enrollmentData = {
        formation_id: courseId,
        full_name: formData.full_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        company: formData.company.trim() || null,
        position: null,
        experience_level: 'debutant',
        motivation: null,
        preferred_date: null,
        how_did_you_hear: 'website',
        special_requirements: null,
        status: 'pending',
        lead_status: 'nouveau',
        lead_source: 'website',
        enrollment_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await SimpleSupabaseService.createEnrollment(enrollmentData);

      setSubmitted(true);
      toast.success('Inscription envoyée avec succès! Nous vous contacterons bientôt.');
      
      // Reset form after delay
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          full_name: '',
          phone: '',
          company: '',
          email: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Error submitting enrollment:', error);
      toast.error('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  if (submitted) {
    return (
      <Card className="w-full bg-green-50 border-green-200">
        <CardContent className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Inscription envoyée avec succès!
          </h3>
          <p className="text-green-600">
            Merci pour votre inscription à <strong>{courseTitle}</strong>
          </p>
          <p className="text-sm text-green-500 mt-2">
            Nous vous contacterons sous peu pour confirmer votre inscription.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <UserPlus className="w-6 h-6 text-accent" />
          Inscription à la formation
        </CardTitle>
        <div className="space-y-1">
          <p className="font-medium text-foreground">{courseTitle}</p>
          {coursePrice > 0 && (
            <p className="text-sm text-muted-foreground">
              Prix: {formatPrice(coursePrice, courseCurrency)}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom et Prénom */}
          <div className="space-y-2">
            <Label htmlFor="full_name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Nom et Prénom *
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              placeholder="Votre nom complet"
              required
            />
          </div>

          {/* Numéro de téléphone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Numéro de téléphone *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+213 555 123 456"
              required
            />
          </div>

          {/* Nom de l'entreprise */}
          <div className="space-y-2">
            <Label htmlFor="company" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Nom de l'entreprise
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Nom de votre entreprise (optionnel)"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="votre.email@exemple.com"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer la demande d'inscription
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground mt-4">
            <p>* Champs obligatoires</p>
            <p>Nous vous contacterons dans les 24 heures pour confirmer votre inscription</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DirectEnrollmentForm;
