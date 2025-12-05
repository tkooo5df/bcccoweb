import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Euro,
  BookOpen,
  Target,
  CheckCircle,
  Globe,
  Loader2
} from 'lucide-react';
import { SupabaseService } from '@/lib/supabase';
import DirectEnrollmentForm from '@/components/DirectEnrollmentForm';
import { toast } from 'sonner';
import type { Formation } from '../../supabase-config';

const BilingualCourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');
  const [course, setCourse] = useState<Formation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourse = async () => {
      if (!slug) {
        setError('Slug du cours manquant');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await SupabaseService.getFormationBySlug(slug);
        
        if (!data) {
          setError('Cours non trouvé');
          return;
        }
        
        setCourse(data);
      } catch (err: any) {
        console.error('Error loading course:', err);
        setError('Erreur lors du chargement du cours');
        toast.error('Erreur lors du chargement du cours');
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [slug]);

  const getDisplayContent = () => {
    if (!course) return null;

    if (language === 'ar') {
      return {
        title: course.title_ar || course.title_fr || course.title,
        description: course.description_ar || course.description_fr || course.description,
        content: course.content_ar || course.content_fr || course.content,
        objectives: course.objectives_ar || course.objectives_fr || course.objectives || [],
        prerequisites: course.prerequisites_ar || course.prerequisites_fr || course.prerequisites,
        program: course.program_ar || course.program_fr,
        target_audience: course.target_audience_ar || course.target_audience_fr,
      };
    }

    return {
      title: course.title_fr || course.title,
      description: course.description_fr || course.description,
      content: course.content_fr || course.content,
      objectives: course.objectives_fr || course.objectives || [],
      prerequisites: course.prerequisites_fr || course.prerequisites,
      program: course.program_fr,
      target_audience: course.target_audience_fr,
    };
  };

  const formatPrice = (price: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const displayContent = getDisplayContent();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <span className="text-lg text-muted-foreground">Chargement du cours...</span>
        </div>
      </div>
    );
  }

  if (error || !course || !displayContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cours non trouvé</h1>
          <p className="text-gray-600 mb-6">{error || 'Ce cours n\'existe pas ou n\'est plus disponible.'}</p>
          <Button onClick={() => navigate('/formations')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux formations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header with Language Switcher */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              onClick={() => navigate('/formations')} 
              variant="ghost"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'العودة' : 'Retour aux formations'}
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant={language === 'fr' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('fr')}
              >
                FR
              </Button>
              <Button
                variant={language === 'ar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('ar')}
              >
                عربي
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {course.category && (
                  <Badge variant="secondary">
                    {course.category.name}
                  </Badge>
                )}
                {course.is_popular && (
                  <Badge className="bg-red-100 text-red-800" variant="secondary">
                    Populaire
                  </Badge>
                )}
                <Badge variant="secondary">
                  {course.level}
                </Badge>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {displayContent.title}
              </h1>
              
              {displayContent.description && (
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {displayContent.description}
                </p>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'المدة' : 'Durée'}
                    </p>
                    <p className="font-semibold">{course.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'المشاركون' : 'Participants'}
                    </p>
                    <p className="font-semibold">
                      {course.current_participants || 0}/{course.max_participants}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'السعر' : 'Prix'}
                    </p>
                    <p className="font-semibold">
                      {formatPrice(course.price_ht || course.price, course.currency)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {course.is_online ? (
                    <Globe className="w-5 h-5 text-accent" />
                  ) : (
                    <MapPin className="w-5 h-5 text-accent" />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'التنسيق' : 'Format'}
                    </p>
                    <p className="font-semibold">
                      {course.is_online 
                        ? (language === 'ar' ? 'عبر الإنترنت' : 'En ligne')
                        : (language === 'ar' ? 'حضوري' : 'Présentiel')
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {(course.cover_image_url || course.image_url) && (
              <div className="lg:w-96">
                <img 
                  src={course.cover_image_url || course.image_url} 
                  alt={displayContent.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Content */}
            {displayContent.content && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {language === 'ar' ? 'محتوى الدورة' : 'Contenu de la formation'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-lg max-w-none
                      prose-headings:text-foreground
                      prose-p:text-muted-foreground
                      prose-strong:text-foreground
                      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                      prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground
                      prose-code:bg-muted prose-code:text-foreground prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-muted prose-pre:border
                      prose-img:rounded-lg prose-img:shadow-md
                      prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                      prose-li:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: displayContent.content }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Objectives */}
            {displayContent.objectives && displayContent.objectives.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {language === 'ar' ? 'الأهداف التعليمية' : 'Objectifs pédagogiques'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {displayContent.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Program */}
            {displayContent.program && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'ar' ? 'البرنامج' : 'Programme'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: displayContent.program }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Prerequisites */}
            {displayContent.prerequisites && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'ar' ? 'المتطلبات' : 'Prérequis'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {displayContent.prerequisites}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Target Audience */}
            {displayContent.target_audience && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'ar' ? 'الفئة المستهدفة' : 'Public concerné'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {displayContent.target_audience}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {course.tags && course.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'ar' ? 'العلامات' : 'Tags'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="lg:sticky lg:top-6 lg:self-start">
              <CardHeader>
                <CardTitle className="text-center">
                  {language === 'ar' ? 'التسجيل' : 'Inscription'}
                </CardTitle>
                <CardDescription className="text-center">
                  {language === 'ar' 
                    ? 'انضم إلى هذه الدورة الآن'
                    : 'Rejoignez cette formation dès maintenant'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {formatPrice(course.price_ht || course.price, course.currency)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'السعر لكل مشارك' : 'Prix par participant'}
                  </p>
                </div>
                
                <Separator />
                
                {course.start_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {language === 'ar' ? 'تاريخ البدء' : 'Date de début'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(course.start_date).toLocaleDateString(
                          language === 'ar' ? 'ar-DZ' : 'fr-FR'
                        )}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {language === 'ar' ? 'الأماكن المتاحة' : 'Places disponibles'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(course.max_participants || 0) - (course.current_participants || 0)} {
                        language === 'ar' ? 'أماكن متبقية' : 'places restantes'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enrollment Form */}
        <div className="max-w-4xl mx-auto mt-12">
          <DirectEnrollmentForm
            courseId={course.id}
            courseTitle={displayContent.title}
            coursePrice={course.price_ht || course.price}
            courseCurrency={course.currency}
            languagePreference={language}
          />
        </div>
      </div>
    </div>
  );
};

export default BilingualCourseDetail;


