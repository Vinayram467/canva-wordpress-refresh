
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

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
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
}
