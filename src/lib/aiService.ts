// AI Service for generating course content using Google Gemini API
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface CourseGenerationInput {
  title: string;
  description?: string;
  category?: string;
  price?: number;
  duration?: string;
  level?: string;
  language: 'fr' | 'ar';
  reference?: string;
}

// Google Gemini API configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDCB1naUpdBX6P44jDZVwwIjLt2sw-bjYw';

// Initialize Gemini client
const getGeminiClient = () => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY environment variable.');
  }

  return new GoogleGenerativeAI(GEMINI_API_KEY);
};

export class AIService {
  /**
   * Generate complete HTML content for a course using Google Gemini
   */
  static async generateCourseContent(input: CourseGenerationInput): Promise<string> {
    try {
      const genAI = getGeminiClient();
      const prompt = this.buildPrompt(input);

      // Try gemini-3-pro-preview first, fallback to gemini-pro
      let model;
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-3-pro-preview' });
      } catch {
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedContent = response.text();

      return generatedContent;
    } catch (error: any) {
      console.error('Error generating course content:', error);
      
      // Handle specific error types with user-friendly messages
      const errorMessage = error.message || '';
      const errorStatus = error.status || error.statusCode;
      
      if (errorStatus === 429 || errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('exceeded') || errorMessage.includes('rate limit')) {
        throw new Error('تم تجاوز الحد المسموح به من API. يرجى المحاولة مرة أخرى لاحقاً. / Quota exceeded. Please try again later.');
      } else if (errorStatus === 401 || errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('Invalid API key') || errorMessage.includes('API_KEY_INVALID')) {
        throw new Error('مفتاح API غير صحيح أو غير صالح. يرجى التحقق من الإعدادات. / Invalid API key. Please check your settings.');
      }
      
      throw new Error(`Erreur lors de la génération du contenu: ${errorMessage || 'Erreur inconnue'}`);
    }
  }

  /**
   * Build prompt for AI generation based on input
   */
  private static buildPrompt(input: CourseGenerationInput): string {
    const { title, description, category, price, duration, level, language, reference } = input;

    // Generate reference if not provided
    const courseReference = reference || `FORM-${title.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}`;
    const priceHT = price || 0;
    const priceTTC = Math.round(priceHT * 1.19 * 100) / 100; // 19% VAT

    if (language === 'fr') {
      return `Tu es un expert en création de contenu pour formations professionnelles. Génère une page HTML complète pour une formation professionnelle en suivant EXACTEMENT ce template et cette structure:

<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Formation : ${title}</title>
  <style>
    @import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);
    @import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap');
    @import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200);
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Open Sans', 'Cairo', sans-serif;
      background-color: #f8fafc;
    }
    .program-sublist { list-style-type: disc; margin-left: 1.5rem; }
    .program-sublist-nested { list-style-type: circle; margin-left: 1.5rem; }
  </style>
</head>
<body data-rsssl=1 data-rsssl="1">
  <div id="webcrumbs">
    <div class="w-full max-w-5xl bg-white font-sans mx-auto shadow-sm">
      <!-- HEADER -->
      <header class="py-10 sm:py-12 px-6 sm:px-12 text-center border-b border-gray-100">
        <div class="text-2xl font-bold text-gray-500 mb-2">Formation</div>
        <h1 class="text-4xl md:text-5xl font-bold text-green-600 mb-2 transition-all duration-300 hover:text-green-700">
          ${title}
        </h1>
      </header>

      <!-- OBJECTIFS -->
      <section class="px-6 sm:px-12 py-12 sm:py-16">
        <h2 class="text-3xl font-semibold text-gray-800 mb-10 flex items-center gap-3 justify-start">
          <span class="material-symbols-outlined text-blue-600">task_alt</span>
          <span>Objectifs</span>
        </h2>
        <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div class="w-full md:w-2/5 md:order-1">
            <img src="https://bcos-dz.com/wp-content/uploads/2025/10/laptop-blank-screen-hopping-cart-full-gifts-with-copyspace-online-shopping-concept.jpg" alt="Formation ${title}" class="w-full h-auto rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" />
          </div>
          <div class="w-full md:w-3/5 md:order-2">
            <ul class="space-y-4">
              <!-- Génère 4-6 objectifs pédagogiques clairs et détaillés avec des icônes check_circle -->
            </ul>
          </div>
        </div>
      </section>

      <!-- PROGRAMME -->
      <section class="px-6 sm:px-12 py-12 sm:py-16 bg-blue-50">
        <h2 class="text-3xl font-semibold text-gray-800 mb-10 flex items-center gap-3 justify-start">
          <span class="material-symbols-outlined text-blue-600">list_alt</span>
          <span>Programme de la Formation</span>
        </h2>
        <div class="flex flex-col md:flex-row gap-12">
          <div class="w-full md:w-1/3 order-2 md:order-1 mb-6 md:mb-0">
            <div class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <h3 class="text-xl font-semibold text-gray-800 mb-5">Détails de la Formation</h3>
              <ul class="space-y-5">
                <li class="flex items-center"><span class="material-symbols-outlined text-blue-600 mr-4">tag</span><div><span class="text-gray-500 block text-sm">Référence:</span><span class="font-medium text-gray-800">${courseReference}</span></div></li>
                <li class="flex items-center"><span class="material-symbols-outlined text-blue-600 mr-4">schedule</span><div><span class="text-gray-500 block text-sm">Durée:</span><span class="font-medium text-gray-800">${duration || 'À définir'}</span></div></li>
                <li class="flex items-center"><span class="material-symbols-outlined text-blue-600 mr-4">calendar_month</span><div><span class="text-gray-500 block text-sm">Horaires:</span><span class="font-medium text-gray-800">08:30h - 16:00h</span></div></li>
                <li class="flex items-center"><span class="material-symbols-outlined text-blue-600 mr-4">payments</span><div><span class="text-gray-500 block text-sm">Tarif:</span><span class="font-medium text-gray-800 block" dir="ltr">${priceHT.toLocaleString('fr-FR')} DA / HT</span><span class="font-medium text-gray-800 block mt-1" dir="ltr">${priceTTC.toLocaleString('fr-FR')} DA / TTC</span></div></li>
              </ul>
              <a href="#" class="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center active:scale-[0.98] font-semibold">
                <span class="material-symbols-outlined mr-3">how_to_reg</span>
                <span>S'inscrire maintenant</span>
              </a>
            </div>
          </div>
          <div class="w-full md:w-2/3 order-1 md:order-2">
            <div class="space-y-10">
              <!-- Génère le programme détaillé avec des sections numérotées (I., II., III., etc.) -->
              <!-- Utilise border-l-4 border-blue-500 pl-6 pour chaque section -->
              <!-- Utilise program-sublist pour les listes -->
            </div>
          </div>
        </div>
      </section>

      <!-- PUBLIC CONCERNÉ -->
      <section class="px-6 sm:px-12 py-12 sm:py-16 bg-green-50">
        <h2 class="text-3xl font-semibold text-gray-800 mb-10 flex items-center gap-3 justify-start">
          <span class="material-symbols-outlined text-blue-600">groups</span>
          <span>Public Concerné</span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Génère 4-6 cartes pour le public concerné avec des icônes arrow_forward -->
        </div>
      </section>
    </div>
  </div>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { content: ["./*.php", "./**/*.php", "./*.html"], theme: { extend: { fontFamily: {} } }, plugins: [], important: "#webcrumbs" };
  </script>
</body>
</html>

INSTRUCTIONS IMPORTANTES:
1. Génère un document HTML COMPLET (DOCTYPE, html, head, body) avec tout le contenu rempli
2. Utilise EXACTEMENT les classes Tailwind CSS et la structure du template ci-dessus
3. Génère 4-6 objectifs pédagogiques professionnels et détaillés pour "${title}" avec des <li> contenant <span class="material-symbols-outlined text-green-500 mr-3 mt-1">check_circle</span> et le texte de l'objectif
4. Génère un programme détaillé avec 4-6 sections principales (I., II., III., etc.) utilisant la structure avec border-l-4 border-blue-500 pl-6
5. Chaque section du programme doit avoir un <h4 class="text-2xl font-bold text-green-700 mb-4">Titre Section</h4> et une <ul class="space-y-1 text-gray-700 leading-relaxed program-sublist"> avec les éléments du programme
6. Génère 4-6 profils pour le public concerné avec des cartes utilisant la structure: <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-start cursor-pointer active:scale-[0.98]"><span class="material-symbols-outlined text-blue-500 mr-3 text-2xl pt-1">arrow_forward</span><div><h3 class="font-semibold text-lg text-gray-800 mb-1">Profil</h3></div></div>
7. Utilise les Material Symbols icons comme dans le template
8. Le contenu doit être professionnel et adapté au sujet: "${title}"
${description ? `9. Description fournie: ${description}` : ''}
${category ? `10. Catégorie: ${category}` : ''}
${level ? `11. Niveau: ${level}` : ''}

Génère TOUT le HTML complet, prêt à être utilisé directement. Réponds UNIQUEMENT avec le code HTML, sans explications ni commentaires supplémentaires.`;

    } else {
      return `أنت خبير في إنشاء المحتوى للتدريب المهني. قم بإنشاء صفحة HTML كاملة لدورة تدريبية مهنية باتباع نفس القالب والهيكل من النسخة الفرنسية، ولكن:

- استخدم lang="ar" dir="rtl" في html tag
- استخدم النصوص العربية (Objectifs = الأهداف، Programme = البرنامج، Public Concerné = الفئة المستهدفة)
- احتفظ بنفس البنية والألوان والتصميم والفئات CSS
- العنوان: ${title}
${description ? `- الوصف: ${description}` : ''}
${category ? `- الفئة: ${category}` : ''}
${price ? `- السعر: ${price} DA` : ''}
${duration ? `- المدة: ${duration}` : ''}
${level ? `- المستوى: ${level}` : ''}

يجب أن يتضمن HTML كامل مع:
1. DOCTYPE و head و body
2. جميع الأقسام: Header, Objectifs, Programme, Public Concerné
3. استخدام Tailwind CSS و Material Symbols
4. 4-6 أهداف تعليمية مع check_circle icons
5. برنامج مفصل مع 4-6 أقسام رئيسية (I., II., III., إلخ)
6. 4-6 فئات للجمهور المستهدف مع arrow_forward icons

أنشئ HTML كامل وجاهز للاستخدام مباشرة. أجب فقط بـ HTML بدون شرح أو تعليقات.`;
    }
  }

  /**
   * Generate course title and description (quick generation)
   */
  static async generateTitleAndDescription(
    topic: string,
    language: 'fr' | 'ar'
  ): Promise<{ title: string; description: string }> {
    try {
      const genAI = getGeminiClient();
      
      let model;
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-3-pro-preview' });
      } catch {
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      }

      const prompt = language === 'fr'
        ? `Génère un titre et une description courte pour une formation professionnelle sur le thème: "${topic}". Format de réponse (JSON uniquement, sans markdown):\n{\n  "title": "Titre de la formation",\n  "description": "Description courte en 2-3 phrases"\n}`
        : `قم بإنشاء عنوان ووصف قصير لدورة تدريبية مهنية حول الموضوع: "${topic}". تنسيق الاستجابة (JSON فقط، بدون markdown):\n{\n  "title": "عنوان الدورة",\n  "description": "وصف قصير في 2-3 جمل"\n}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      
      try {
        // Try to extract JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            title: parsed.title || '',
            description: parsed.description || ''
          };
        }
      } catch {
        // Fallback if JSON parsing fails
      }
      
      // Fallback parsing
      const lines = content.split('\n').filter(Boolean);
      return {
        title: lines[0]?.replace(/^.*title.*:/i, '').replace(/["']/g, '').trim() || topic,
        description: lines.slice(1).join(' ').replace(/^.*description.*:/i, '').replace(/["']/g, '').trim() || ''
      };
    } catch (error: any) {
      console.error('Error generating title/description:', error);
      throw new Error(`Erreur: ${error.message || 'Erreur inconnue'}`);
    }
  }
}
