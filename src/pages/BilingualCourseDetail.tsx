import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { SupabaseService } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Formation } from '../../supabase-config';

const BilingualCourseDetail = () => {
  const { slug, lang } = useParams<{ slug: string; lang?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get language from URL parameter or query string
  const urlLang = lang || searchParams.get('lang');
  const [language, setLanguage] = useState<'fr' | 'ar'>(
    urlLang === 'ar' ? 'ar' : 'fr'
  );
  
  const [course, setCourse] = useState<Formation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update language when URL changes
  useEffect(() => {
    if (lang === 'ar') {
      setLanguage('ar');
    } else if (lang === 'fr') {
      setLanguage('fr');
    }
  }, [lang]);

  useEffect(() => {
    const loadCourse = async () => {
      if (!slug) {
        setError('Slug du cours manquant');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
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

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
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
      {/* Simple Header */}
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
                onClick={() => {
                  setLanguage('fr');
                  navigate(`/fr/formation/${slug}`, { replace: true });
                }}
              >
                FR
              </Button>
              <Button
                variant={language === 'ar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setLanguage('ar');
                  navigate(`/ar/formation/${slug}`, { replace: true });
                }}
              >
                عربي
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Only */}
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {language === 'ar' ? 'الفئة' : 'Catégorie'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {course.category && (
              <div className="flex justify-center">
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  {language === 'ar' ? course.category.name_ar || course.category.name : course.category.name_fr || course.category.name}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BilingualCourseDetail;


