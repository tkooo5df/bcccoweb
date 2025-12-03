import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import WhyChoose from '@/components/WhyChoose';
import Services from '@/components/Services';
import References from '@/components/References';
import TrainingCarousel from '@/components/TrainingCarousel';
import ElearningCTA from '@/components/ElearningCTA';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import CircularGallerySection from '@/components/CircularGallerySection';
import ImageCarousel from '@/components/ImageCarousel';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Stats />
        <WhyChoose />
        <About />
        <Services />
        <TrainingCarousel />
        <ImageCarousel />
        <References />
        <ElearningCTA />
        <Testimonials />
        <Blog />
        <CircularGallerySection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
