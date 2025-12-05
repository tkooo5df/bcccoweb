# AI Content Generation - دليل توليد المحتوى بالذكاء الاصطناعي

## نظرة عامة / Vue d'ensemble

تم إضافة وظيفة لتوليد محتوى الدورات التدريبية تلقائياً باستخدام Google Gemini.

A feature has been added to automatically generate course content using Google Gemini.

## الإعداد / Configuration

### 1. API Key

تم تضمين API key افتراضياً في الكود. إذا كنت تريد استخدام API key خاص بك، قم بإنشاء ملف `.env` في المجلد الرئيسي للمشروع وأضف:

An API key is included by default in the code. If you want to use your own API key, create a `.env` file in the project root and add:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**⚠️ تحذير أمني / Security Warning:**
- لا تشارك ملف `.env` أو تضعه في Git
- Do not share the `.env` file or commit it to Git
- الملف `.env` موجود في `.gitignore`

### 2. الحصول على API Key

1. انتقل إلى [Google AI Studio](https://makersuite.google.com/app/apikey)
2. سجل دخول بحساب Google
3. أنشئ API key جديد
4. انسخه وأضفه في ملف `.env`

## الاستخدام / Usage

### في نموذج إنشاء/تعديل الدورة

1. افتح صفحة "Nouvelle Formation" أو عدّل دورة موجودة
2. املأ المعلومات الأساسية:
   - العنوان (Titre)
   - الوصف (Description) - اختياري
   - الفئة (Catégorie)
   - السعر (Prix)
   - المدة (Durée)
   - المستوى (Niveau)

3. انقر على زر **"Générer avec AI"** في التبويب الفرنسي
   أو زر **"توليد بالذكاء الاصطناعي"** في التبويب العربي

4. سيتم توليد محتوى HTML كامل يحتوي على:
   - الأهداف التعليمية (Objectifs pédagogiques)
   - البرنامج المفصل (Programme détaillé)
   - المتطلبات (Prérequis)
   - الفئة المستهدفة (Public concerné)
   - المعلومات العملية (Informations pratiques)

5. يمكنك مراجعة وتعديل المحتوى المولّد قبل الحفظ

## الملفات المضافة / Files Added

- `src/lib/aiService.ts` - خدمة توليد المحتوى بالذكاء الاصطناعي (محدثة لاستخدام Google Gemini)
- تم تحديث `src/components/admin/BilingualCourseForm.tsx` - إضافة أزرار التوليد

## ملاحظات / Notes

- يتم استخدام Google Gemini (gemini-3-pro-preview مع fallback إلى gemini-pro)
- المحتوى المولّد يتبع قالب HTML محدد مسبقاً (راجع `COURSE_TEMPLATE.md`)
- المحتوى المولّد هو HTML كامل جاهز للاستخدام
- يمكنك تعديل المحتوى المولّد حسب الحاجة
- في بيئة الإنتاج، يُنصح بتحريك API calls إلى backend للسلامة

## استكشاف الأخطاء / Troubleshooting

### خطأ: "Gemini API error"
- تأكد من أن API key صحيح
- تحقق من اتصال الإنترنت
- تحقق من أن لديك رصيد كافٍ في حساب Google AI

### خطأ 429 (Quota exceeded)
- تم تجاوز الحد المسموح به
- انتظر قليلاً وحاول مرة أخرى
- تحقق من حدود الاستخدام في Google AI Studio

### خطأ 401 (Unauthorized) أو API_KEY_INVALID
- مفتاح API غير صحيح
- تأكد من صحة المفتاح في ملف `.env` أو الكود
- تأكد من تفعيل Gemini API في Google Cloud Console

## API Key المحدد مسبقاً

تم تضمين API key افتراضياً في الكود. يمكنك تغييره من خلال متغير البيئة `VITE_GEMINI_API_KEY`.

A default API key is included in the code. You can change it through the `VITE_GEMINI_API_KEY` environment variable.

