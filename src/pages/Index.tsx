
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HealthUpdatesTicker from "@/components/HealthUpdatesTicker";
import StatsSection from "@/components/StatsSection";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import DoctorProfiles from "@/components/DoctorProfiles";
import PatientTestimonials from "@/components/PatientTestimonials";
import AppointmentBooking from "@/components/AppointmentBooking";
import HealthInsights from "@/components/HealthInsights";
import NewsEvents from "@/components/NewsEvents";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <HealthUpdatesTicker />
      <StatsSection />
      <ServicesGrid />
      <AboutSection />
      <DoctorProfiles />
      <PatientTestimonials />
      <AppointmentBooking />
      <HealthInsights />
      <NewsEvents />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
