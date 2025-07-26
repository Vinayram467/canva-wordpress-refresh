
import Header from "@/components/Header";
import AutoScrollBanner from "@/components/AutoScrollBanner";
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
      <AutoScrollBanner />
      <div className="container mx-auto px-2">
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <HeroSection />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <HealthUpdatesTicker />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <StatsSection />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <ServicesGrid />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <AboutSection />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <DoctorProfiles />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <PatientTestimonials />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <AppointmentBooking />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <HealthInsights />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <NewsEvents />
        </div>
        <div className="border border-gray-200 rounded-3xl shadow-lg my-8 bg-white/70">
          <ContactSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
