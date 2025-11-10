
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
import { SEOHead } from "@/components/seo/SEOHead";
import { getMedicalOrganizationSchema } from "@/utils/schema";
import { getSEOData } from "@/utils/seoManager";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Index() {
  const seoData = getSEOData('home');
  
  return (
    <>
      <SEOHead
        {...seoData}
        structuredData={getMedicalOrganizationSchema()}
      />
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
        <Header />
        <AutoScrollBanner />
        <div className="container mx-auto px-2">
          <div className="my-8">
            <HeroSection />
          </div>
          <div className="my-8">
            <HealthUpdatesTicker />
          </div>
          <div className="my-8">
            <StatsSection />
          </div>
          <div className="my-8">
            <ServicesGrid />
          </div>
          {/* Scroll reveals from here onward */}
          <RevealOnScroll direction="right" className="my-8">
            <AboutSection />
          </RevealOnScroll>
          <RevealOnScroll direction="left" className="my-8" delayMs={75}>
            <DoctorProfiles />
          </RevealOnScroll>
          <RevealOnScroll direction="up" className="my-8" delayMs={100}>
            <PatientTestimonials />
          </RevealOnScroll>
          <RevealOnScroll direction="right" className="my-8" delayMs={125}>
            <AppointmentBooking />
          </RevealOnScroll>
          <RevealOnScroll direction="left" className="my-8" delayMs={150}>
            <HealthInsights />
          </RevealOnScroll>
          <RevealOnScroll direction="up" className="my-8" delayMs={175}>
            <NewsEvents />
          </RevealOnScroll>
          <RevealOnScroll direction="right" className="my-8" delayMs={200}>
            <ContactSection />
          </RevealOnScroll>
        </div>
        <Footer />
      </div>
    </>
  );
}
