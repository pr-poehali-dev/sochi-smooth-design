import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FactsSection from '@/components/FactsSection';
import HistorySection from '@/components/HistorySection';
import SightsSection from '@/components/SightsSection';
import GallerySection from '@/components/GallerySection';
import ToursSection from '@/components/ToursSection';
import HotelsSection from '@/components/HotelsSection';
import WeatherSection from '@/components/WeatherSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FactsSection />
      <HistorySection />
      <SightsSection />
      <GallerySection />
      <ToursSection />
      <HotelsSection />
      <WeatherSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
