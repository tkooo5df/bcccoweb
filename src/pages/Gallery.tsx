import ImageCarousel from '@/components/ImageCarousel';

const Gallery = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      <main className="pt-20" style={{ backgroundColor: 'transparent' }}>
        <ImageCarousel />
      </main>
    </div>
  );
};

export default Gallery;
