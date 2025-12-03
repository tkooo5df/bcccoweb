import React from 'react';

const ImageCarousel: React.FC = () => {
  return (
    <section className="py-12 lg:py-20 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Nos Formateurs
        </h3>

        {/* Simple Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            'https://i.postimg.cc/SR3S4FSG/Artboard-1-copy-5.webp',
            'https://i.postimg.cc/fypzsnz2/Artboard-1-copy.webp',
            'https://i.postimg.cc/MGQqBJzf/Artboard-1-copy-2.webp',
            'https://i.postimg.cc/QxQqvzYL/Artboard-1-copy-3.webp',
            'https://i.postimg.cc/L8Lx9Zyb/Artboard-1-copy-4.webp',
            'https://i.postimg.cc/SR3S4FSG/Artboard-1-copy-5.webp'
          ].map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Formateur ${index + 1}`}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;