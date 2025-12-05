import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCategories } from '@/hooks/useSupabase';
import { SupabaseService } from '@/lib/supabase';
import { AIService } from '@/lib/aiService';
import type { Formation } from '../../../supabase-config';
import { 
  Save, 
  X, 
  Upload, 
  BookOpen,
  Globe,
  Image as ImageIcon,
  Loader2,
  Code,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import HTMLEditor from './HTMLEditor';

interface BilingualCourseFormProps {
  course?: Formation | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const BilingualCourseForm = ({ course, isOpen, onClose, onSave }: BilingualCourseFormProps) => {
  const { categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [formData, setFormData] = useState({
    // General
    is_published: true,
    category_id: '',
    reference: '',
    slug: '',
    tags: [] as string[],
    
    // French
    title_fr: '',
    description_fr: '',
    content_fr: '',
    objectives_fr: [] as string[],
    prerequisites_fr: '',
    program_fr: '',
    target_audience_fr: '',
    
    // Arabic
    title_ar: '',
    description_ar: '',
    content_ar: '',
    objectives_ar: [] as string[],
    prerequisites_ar: '',
    program_ar: '',
    target_audience_ar: '',
    
    // Pricing
    price_ht: 0,
    price_ttc: 0,
    currency: 'EUR',
    
    // Media
    cover_image_url: '',
    
    // Legacy fields (for backward compatibility)
    title: '',
    description: '',
    content: '',
    duration: '1 jour',
    level: 'Tous niveaux' as const,
    price: 0,
    max_participants: 20,
    is_online: false,
    is_popular: false,
    is_active: true,
  });

  const [objectiveFrInput, setObjectiveFrInput] = useState('');
  const [objectiveArInput, setObjectiveArInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [contentFrMode, setContentFrMode] = useState<'editor' | 'html'>('editor');
  const [contentArMode, setContentArMode] = useState<'editor' | 'html'>('editor');
  const [generatingFr, setGeneratingFr] = useState(false);
  const [generatingAr, setGeneratingAr] = useState(false);

  // Initialize form data when course is provided
  useEffect(() => {
    if (course) {
      setFormData({
        is_published: course.is_published ?? course.is_active ?? true,
        category_id: course.category_id || '',
        reference: course.reference || '',
        slug: course.slug || '',
        tags: course.tags || [],
        title_fr: course.title_fr || course.title || '',
        description_fr: course.description_fr || course.description || '',
        content_fr: course.content_fr || course.content || '',
        objectives_fr: course.objectives_fr || course.objectives || [],
        prerequisites_fr: course.prerequisites_fr || course.prerequisites || '',
        program_fr: course.program_fr || '',
        target_audience_fr: course.target_audience_fr || '',
        title_ar: course.title_ar || '',
        description_ar: course.description_ar || '',
        content_ar: course.content_ar || '',
        objectives_ar: course.objectives_ar || [],
        prerequisites_ar: course.prerequisites_ar || '',
        program_ar: course.program_ar || '',
        target_audience_ar: course.target_audience_ar || '',
        price_ht: course.price_ht || course.price || 0,
        price_ttc: course.price_ttc || (course.price ? course.price * 1.19 : 0),
        currency: course.currency || 'EUR',
        cover_image_url: course.cover_image_url || course.image_url || '',
        title: course.title || '',
        description: course.description || '',
        content: course.content || '',
        duration: course.duration || '1 jour',
        level: course.level || 'Tous niveaux',
        price: course.price || 0,
        max_participants: course.max_participants || 20,
        is_online: course.is_online || false,
        is_popular: course.is_popular || false,
        is_active: course.is_active ?? true,
      });
    } else {
      // Reset form for new course
      setFormData({
        is_published: true,
        category_id: '',
        reference: '',
        slug: '',
        tags: [],
        title_fr: '',
        description_fr: '',
        content_fr: '',
        objectives_fr: [],
        prerequisites_fr: '',
        program_fr: '',
        target_audience_fr: '',
        title_ar: '',
        description_ar: '',
        content_ar: '',
        objectives_ar: [],
        prerequisites_ar: '',
        program_ar: '',
        target_audience_ar: '',
        price_ht: 0,
        price_ttc: 0,
        currency: 'EUR',
        cover_image_url: '',
        title: '',
        description: '',
        content: '',
        duration: '1 jour',
        level: 'Tous niveaux',
        price: 0,
        max_participants: 20,
        is_online: false,
        is_popular: false,
        is_active: true,
      });
    }
  }, [course]);

  // Auto-generate slug from French title
  const generateSlug = (title: string) => {
    if (!title) return '';
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-update slug when title_fr changes
    if (field === 'title_fr' && !course) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
      // Also update legacy title for backward compatibility
      setFormData(prev => ({ ...prev, title: value }));
    }
  };

  const handleAddObjective = (lang: 'fr' | 'ar') => {
    const input = lang === 'fr' ? objectiveFrInput : objectiveArInput;
    if (!input.trim()) return;
    
    const field = `objectives_${lang}` as 'objectives_fr' | 'objectives_ar';
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], input.trim()]
    }));
    
    if (lang === 'fr') setObjectiveFrInput('');
    else setObjectiveArInput('');
  };

  const handleRemoveObjective = (lang: 'fr' | 'ar', index: number) => {
    const field = `objectives_${lang}` as 'objectives_fr' | 'objectives_ar';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = () => {
    if (!tagsInput.trim()) return;
    const newTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, ...newTags]
    }));
    setTagsInput('');
  };

  const handleRemoveTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const path = `course-covers/${fileName}`;

      await SupabaseService.uploadFile('course-covers', path, file);
      const publicUrl = SupabaseService.getPublicUrl('course-covers', path);
      
      setFormData(prev => ({ ...prev, cover_image_url: publicUrl }));
      toast.success('Image téléchargée avec succès');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Erreur lors du téléchargement de l\'image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGenerateContent = async (language: 'fr' | 'ar') => {
    if (!formData.title_fr && language === 'fr') {
      toast.error('Veuillez d\'abord saisir le titre français');
      return;
    }

    if (!formData.title_ar && !formData.title_fr && language === 'ar') {
      toast.error('Veuillez d\'abord saisir le titre');
      return;
    }

    try {
      if (language === 'fr') {
        setGeneratingFr(true);
      } else {
        setGeneratingAr(true);
      }

      const selectedCategory = categories.find(cat => cat.id === formData.category_id);
      
      const generatedContent = await AIService.generateCourseContent({
        title: language === 'fr' ? formData.title_fr : (formData.title_ar || formData.title_fr),
        description: language === 'fr' ? formData.description_fr : formData.description_ar,
        category: selectedCategory?.name,
        price: formData.price_ht || formData.price,
        duration: formData.duration,
        level: formData.level,
        language: language,
        reference: formData.reference,
      });

      if (language === 'fr') {
        handleInputChange('content_fr', generatedContent);
        toast.success('Contenu français généré avec succès!');
      } else {
        handleInputChange('content_ar', generatedContent);
        toast.success('تم توليد المحتوى العربي بنجاح!');
      }
    } catch (error: any) {
      console.error(`Error generating ${language} content:`, error);
      toast.error(`Erreur lors de la génération: ${error.message || 'Erreur inconnue'}`);
    } finally {
      if (language === 'fr') {
        setGeneratingFr(false);
      } else {
        setGeneratingAr(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Validation
      if (!formData.title_fr.trim()) {
        toast.error('Le titre français est requis');
        return;
      }

      if (!formData.slug.trim()) {
        toast.error('Le slug est requis');
        return;
      }

      // Prepare data for save
      const courseData: any = {
        ...formData,
        // Legacy fields for backward compatibility
        title: formData.title_fr || formData.title,
        description: formData.description_fr || formData.description,
        content: formData.content_fr || formData.content,
        objectives: formData.objectives_fr,
        price: formData.price_ht || formData.price,
        image_url: formData.cover_image_url,
        is_active: formData.is_published,
      };

      if (course) {
        // Update existing course
        await SupabaseService.updateFormation(course.id, courseData);
        toast.success('Formation mise à jour avec succès');
      } else {
        // Create new course
        await SupabaseService.createFormation(courseData);
        toast.success('Formation créée avec succès');
      }

      onSave();
      onClose();
    } catch (error: any) {
      console.error('Error saving course:', error);
      toast.error(error.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {course ? 'Modifier la Formation' : 'Nouvelle Formation'}
          </DialogTitle>
          <DialogDescription>
            Créez ou modifiez une formation avec support bilingue (Français/Arabe)
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="french">Français</TabsTrigger>
            <TabsTrigger value="arabic">عربي</TabsTrigger>
            <TabsTrigger value="media">Média</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations Générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_published">Publié</Label>
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => handleInputChange('is_published', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category_id">Catégorie</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => handleInputChange('category_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reference">Référence</Label>
                    <Input
                      id="reference"
                      value={formData.reference}
                      onChange={(e) => handleInputChange('reference', e.target.value)}
                      placeholder="REF-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="formation-slug"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price_ht">Prix HT (€)</Label>
                    <Input
                      id="price_ht"
                      type="number"
                      value={formData.price_ht}
                      onChange={(e) => {
                        const ht = parseFloat(e.target.value) || 0;
                        handleInputChange('price_ht', ht);
                        handleInputChange('price_ttc', ht * 1.19);
                        handleInputChange('price', ht);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_ttc">Prix TTC (€)</Label>
                    <Input
                      id="price_ttc"
                      type="number"
                      value={formData.price_ttc}
                      onChange={(e) => {
                        const ttc = parseFloat(e.target.value) || 0;
                        handleInputChange('price_ttc', ttc);
                        handleInputChange('price_ht', ttc / 1.19);
                        handleInputChange('price', ttc / 1.19);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="tag1, tag2, tag3"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <Button type="button" onClick={handleAddTag}>Ajouter</Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded text-sm flex items-center gap-1"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* French Tab */}
          <TabsContent value="french" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Contenu Français (Généré par AI)</CardTitle>
                <CardDescription>
                  Collez ici le HTML complet généré par l'IA contenant tous les détails (objectifs, prix, programme, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title_fr">Titre *</Label>
                  <Input
                    id="title_fr"
                    value={formData.title_fr}
                    onChange={(e) => handleInputChange('title_fr', e.target.value)}
                    placeholder="Titre de la formation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_fr">Description courte</Label>
                  <Textarea
                    id="description_fr"
                    value={formData.description_fr}
                    onChange={(e) => handleInputChange('description_fr', e.target.value)}
                    placeholder="Description courte (optionnel)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="content_fr" className="text-lg font-semibold">
                      Contenu HTML Complet (Généré par AI) *
                    </Label>
                    <Button
                      type="button"
                      onClick={() => handleGenerateContent('fr')}
                      disabled={generatingFr || !formData.title_fr.trim()}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {generatingFr ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Génération...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Générer avec AI
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
                    <div className="text-sm text-blue-800">
                      <p className="mb-2">
                        <strong>💡 Conseil:</strong> Cliquez sur "Générer avec AI" pour créer automatiquement le contenu, ou collez ici le HTML complet généré par l'IA qui contient:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Les objectifs pédagogiques</li>
                        <li>Le prix et informations de tarification</li>
                        <li>Le programme détaillé</li>
                        <li>Les prérequis</li>
                        <li>Le public concerné</li>
                        <li>Toutes les autres informations</li>
                      </ul>
                    </div>
                  </div>
                  <Textarea
                    id="content_fr"
                    value={formData.content_fr}
                    onChange={(e) => handleInputChange('content_fr', e.target.value)}
                    placeholder="Collez le HTML complet généré par l'IA ici... (peut contenir tout le contenu: objectifs, prix, programme, etc.)"
                    rows={30}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ce contenu HTML complet sera affiché directement sur la page publique de la formation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Arabic Tab */}
          <TabsContent value="arabic" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>المحتوى العربي (مولّد بالذكاء الاصطناعي)</CardTitle>
                <CardDescription dir="rtl">
                  الصق هنا HTML الكامل المولّد بالذكاء الاصطناعي الذي يحتوي على جميع التفاصيل (الأهداف، السعر، البرنامج، إلخ)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" dir="rtl">
                <div className="space-y-2">
                  <Label htmlFor="title_ar">العنوان</Label>
                  <Input
                    id="title_ar"
                    value={formData.title_ar}
                    onChange={(e) => handleInputChange('title_ar', e.target.value)}
                    placeholder="عنوان الدورة"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_ar">الوصف القصير</Label>
                  <Textarea
                    id="description_ar"
                    value={formData.description_ar}
                    onChange={(e) => handleInputChange('description_ar', e.target.value)}
                    placeholder="وصف قصير (اختياري)"
                    rows={3}
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="content_ar" className="text-lg font-semibold">
                      المحتوى HTML الكامل (مولّد بالذكاء الاصطناعي) *
                    </Label>
                    <Button
                      type="button"
                      onClick={() => handleGenerateContent('ar')}
                      disabled={generatingAr || (!formData.title_ar.trim() && !formData.title_fr.trim())}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {generatingAr ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          جاري التوليد...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          توليد بالذكاء الاصطناعي
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2" dir="rtl">
                    <div className="text-sm text-blue-800">
                      <p className="mb-2">
                        <strong>💡 نصيحة:</strong> انقر على "توليد بالذكاء الاصطناعي" لإنشاء المحتوى تلقائياً، أو الصق هنا HTML الكامل المولّد بالذكاء الاصطناعي الذي يحتوي على:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>الأهداف التعليمية</li>
                        <li>السعر ومعلومات التسعير</li>
                        <li>البرنامج المفصل</li>
                        <li>المتطلبات</li>
                        <li>الفئة المستهدفة</li>
                        <li>جميع المعلومات الأخرى</li>
                      </ul>
                    </div>
                  </div>
                  <Textarea
                    id="content_ar"
                    value={formData.content_ar}
                    onChange={(e) => handleInputChange('content_ar', e.target.value)}
                    placeholder="الصق HTML الكامل المولّد بالذكاء الاصطناعي هنا... (يمكن أن يحتوي على كل المحتوى: الأهداف، السعر، البرنامج، إلخ)"
                    rows={30}
                    className="font-mono text-sm"
                    dir="ltr"
                  />
                  <p className="text-xs text-gray-500 mt-1" dir="rtl">
                    سيتم عرض محتوى HTML الكامل هذا مباشرة على الصفحة العامة للدورة.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Image de Couverture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.cover_image_url && (
                  <div className="relative">
                    <img
                      src={formData.cover_image_url}
                      alt="Cover"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <Label htmlFor="cover-upload" className="cursor-pointer">
                    <span className="text-accent hover:underline">
                      Cliquez pour télécharger une image
                    </span>
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </Label>
                  {uploadingImage && (
                    <div className="flex items-center justify-center mt-4">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="ml-2">Téléchargement...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            <X className="w-4 h-4 mr-2" />
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={loading || !formData.title_fr.trim()}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BilingualCourseForm;

