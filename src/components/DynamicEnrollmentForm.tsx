import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import { SupabaseService } from '@/lib/supabase';
import type { Formation } from '../../supabase-config';
import type { FormField } from './admin/EnhancedCourseForm';

interface DynamicEnrollmentFormProps {
  course: Formation;
  language: 'fr' | 'ar';
  onSuccess?: () => void;
}

interface FormData {
  [key: string]: string | boolean;
}

interface FormErrors {
  [key: string]: string;
}

const DynamicEnrollmentForm = ({ course, language, onSuccess }: DynamicEnrollmentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  // Get form fields from course config
  const formFields: FormField[] = (course as any).inscription_form_fields || [];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Algerian phone format: +213 XXX XX XX XX or 0XXX XX XX XX
    const phoneRegex = /^(?:\+213|0)[567]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateField = (field: FormField, value: any): string | null => {
    // Check if required field is empty
    if (field.required && (!value || value === '')) {
      return language === 'fr' 
        ? 'Ce champ est requis' 
        : 'هذا الحقل مطلوب';
    }

    // Email validation
    if (field.type === 'email' && value && !validateEmail(value)) {
      return language === 'fr' 
        ? 'Email invalide' 
        : 'بريد إلكتروني غير صالح';
    }

    // Phone validation
    if (field.type === 'phone' && value && !validatePhone(value)) {
      return language === 'fr' 
        ? 'Numéro de téléphone invalide' 
        : 'رقم هاتف غير صالح';
    }

    return null;
  };

  const handleChange = (fieldName: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error for this field
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    formFields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(
        language === 'fr' 
          ? 'Veuillez corriger les erreurs dans le formulaire' 
          : 'يرجى تصحيح الأخطاء في النموذج'
      );
      return;
    }

    try {
      setLoading(true);

      // Prepare enrollment data
      const enrollmentData = {
        formation_id: course.id,
        course_id: course.id, // Backward compatibility
        full_name: formData.full_name as string || '',
        email: formData.email as string || '',
        phone: formData.phone as string || '',
        company: formData.company as string || '',
        position: formData.position as string || '',
        motivation: formData.motivation as string || '',
        how_did_you_hear: formData.how_did_you_hear as string || '',
        special_requirements: formData.special_requirements as string || '',
        experience_level: formData.experience_level as string || '',
        preferred_date: formData.preferred_date as string || '',
        status: 'new' as const,
        source: 'website_form',
        language_preference: language,
        enrollment_date: new Date().toISOString(),
      };

      // Save to Supabase
      await SupabaseService.createEnrollment(enrollmentData);

      // Success
      setSubmitted(true);
      toast.success(
        language === 'fr' 
          ? 'Inscription envoyée avec succès!' 
          : 'تم إرسال التسجيل بنجاح!'
      );

      if (onSuccess) {
        onSuccess();
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({});
        setSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting enrollment:', error);
      toast.error(
        language === 'fr' 
          ? 'Erreur lors de l\'envoi. Veuillez réessayer.' 
          : 'خطأ في الإرسال. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: FormField) => {
    const label = language === 'fr' ? field.label_fr : field.label_ar;
    const placeholder = language === 'fr' ? field.placeholder_fr : field.placeholder_ar;
    const hasError = !!errors[field.name];
    const errorMessage = errors[field.name];

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.name} className={hasError ? 'text-red-600' : ''}>
          {label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        {/* TEXT INPUT */}
        {field.type === 'text' && (
          <Input
            id={field.name}
            name={field.name}
            type="text"
            placeholder={placeholder}
            value={formData[field.name] as string || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={hasError ? 'border-red-500' : ''}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        )}

        {/* EMAIL INPUT */}
        {field.type === 'email' && (
          <Input
            id={field.name}
            name={field.name}
            type="email"
            placeholder={placeholder}
            value={formData[field.name] as string || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={hasError ? 'border-red-500' : ''}
            dir="ltr"
          />
        )}

        {/* PHONE INPUT */}
        {field.type === 'phone' && (
          <Input
            id={field.name}
            name={field.name}
            type="tel"
            placeholder={placeholder}
            value={formData[field.name] as string || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={hasError ? 'border-red-500' : ''}
            dir="ltr"
          />
        )}

        {/* TEXTAREA */}
        {field.type === 'textarea' && (
          <Textarea
            id={field.name}
            name={field.name}
            placeholder={placeholder}
            rows={4}
            value={formData[field.name] as string || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={hasError ? 'border-red-500' : ''}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        )}

        {/* SELECT DROPDOWN */}
        {field.type === 'select' && (
          <Select
            value={formData[field.name] as string || ''}
            onValueChange={(value) => handleChange(field.name, value)}
          >
            <SelectTrigger className={hasError ? 'border-red-500' : ''}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {language === 'fr' ? option.label_fr : option.label_ar}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* CHECKBOX */}
        {field.type === 'checkbox' && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={formData[field.name] as boolean || false}
              onCheckedChange={(checked) => handleChange(field.name, checked as boolean)}
            />
            <label
              htmlFor={field.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {placeholder || label}
            </label>
          </div>
        )}

        {/* DATE INPUT */}
        {field.type === 'date' && (
          <Input
            id={field.name}
            name={field.name}
            type="date"
            value={formData[field.name] as string || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={hasError ? 'border-red-500' : ''}
          />
        )}

        {/* ERROR MESSAGE */}
        {hasError && (
          <p className="text-sm text-red-600" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  };

  // If no custom fields, show message
  if (formFields.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-gray-500" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'fr' 
              ? 'Formulaire d\'inscription non configuré pour cette formation.' 
              : 'نموذج التسجيل غير مُكوَّن لهذه الدورة.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Success state
  if (submitted) {
    return (
      <Card className="border-green-500">
        <CardContent className="py-12">
          <div className="text-center space-y-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-600">
              {language === 'fr' ? 'Inscription réussie!' : 'نجح التسجيل!'}
            </h3>
            <p className="text-gray-600">
              {language === 'fr' 
                ? 'Nous avons bien reçu votre demande d\'inscription. Notre équipe vous contactera très prochainement.' 
                : 'لقد تلقينا طلب التسجيل الخاص بك. سيتصل بك فريقنا قريبًا جدًا.'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Form
  return (
    <Card>
      <CardHeader>
        <CardTitle dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {language === 'fr' 
            ? 'Formulaire d\'inscription' 
            : 'نموذج التسجيل'}
        </CardTitle>
        <CardDescription dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {language === 'fr' 
            ? 'Remplissez le formulaire ci-dessous pour vous inscrire à cette formation' 
            : 'املأ النموذج أدناه للتسجيل في هذه الدورة'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields
              .sort((a, b) => a.order - b.order)
              .map(field => renderField(field))}
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === 'fr' ? 'Envoi en cours...' : 'جاري الإرسال...'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Envoyer l\'inscription' : 'إرسال التسجيل'}
                </>
              )}
            </Button>
          </div>

          {/* Privacy notice */}
          <p className="text-xs text-gray-500 text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'fr' 
              ? 'Vos données personnelles sont protégées et utilisées uniquement pour le traitement de votre inscription.' 
              : 'بياناتك الشخصية محمية وتُستخدم فقط لمعالجة تسجيلك.'}
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicEnrollmentForm;

