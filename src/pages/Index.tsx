import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HistorySection from '@/components/HistorySection';
import SightsSection from '@/components/SightsSection';
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
      <HistorySection />
      <SightsSection />
      <ToursSection />
      <HotelsSection />
      <WeatherSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
