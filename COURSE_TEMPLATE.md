# Course HTML Template

This is the template structure that should be used when generating course content with AI.

## Template Structure

```html
<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Formation : [COURSE_TITLE]</title>
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
          [COURSE_TITLE]
        </h1>
      </header>

      <!-- OBJECTIFS -->
      <section class="px-6 sm:px-12 py-12 sm:py-16">
        <h2 class="text-3xl font-semibold text-gray-800 mb-10 flex items-center gap-3 justify-start">
          <span class="material-symbols-outlined text-blue-600">task_alt</span>
          <span>Objectifs</span>
        </h2>
        <!-- Objectives content with image -->
      </section>

      <!-- PROGRAMME -->
      <section class="px-6 sm:px-12 py-12 sm:py-16 bg-blue-50">
        <h2 class="text-3xl font-semibold text-gray-800 mb-10 flex items-center gap-3 justify-start">
          <span class="material-symbols-outlined text-blue-600">list_alt</span>
          <span>Programme de la Formation</span>
        </h2>
        <!-- Program content with details sidebar -->
      </section>

      <!-- PUBLIC CONCERNÉ -->
      <section class="px-6 sm:px-12 py-12 sm:py-16 bg-green-50">
        <h2 class="text-3xl font-semibold text-gray-800 mb-10 flex items-center gap-3 justify-start">
          <span class="material-symbols-outlined text-blue-600">groups</span>
          <span>Public Concerné</span>
        </h2>
        <!-- Target audience cards -->
      </section>
    </div>
  </div>

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { content: ["./*.php", "./**/*.php", "./*.html"], theme: { extend: { fontFamily: {} } }, plugins: [], important: "#webcrumbs" };
  </script>
</body>
</html>
```

## Key Elements

1. **Header Section**: Course title with "Formation" label
2. **Objectifs Section**: Learning objectives with Material Symbols icons
3. **Programme Section**: Detailed program with:
   - Sidebar with course details (Reference, Duration, Schedule, Price)
   - Main content with program structure
4. **Public Concerné Section**: Target audience cards

## Styling

- Uses Tailwind CSS via CDN
- Material Symbols for icons
- Responsive design (sm:, md:, lg: breakpoints)
- Color scheme: green-600, blue-600, gray tones

