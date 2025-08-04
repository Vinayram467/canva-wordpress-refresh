import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import MedicalSpecialties from "./pages/MedicalSpecialties";
import AppointmentBooking from "./pages/AppointmentBooking";
import DoctorDetail from "./pages/DoctorDetail";
import VirtualConsultation from "./pages/VirtualConsultation";
import NotFound from "./pages/NotFound";
import BlogDetail from "./pages/BlogDetail";
import EventDetail from "./pages/EventDetail";
import Blogs from "./pages/Blogs";
import Events from "./pages/Events";
import ServiceDetail from "./pages/ServiceDetail";
import DeluxeSurgeries from "./pages/DeluxeSurgeries";
import SurgeryDetail from "./pages/SurgeryDetail";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/specialties" element={<MedicalSpecialties />} />
              <Route path="/appointment" element={<AppointmentBooking />} />
              <Route path="/doctor/:id" element={<DoctorDetail />} />
              <Route path="/virtual-consultation" element={<VirtualConsultation />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/service/:id" element={<ServiceDetail />} />
              <Route path="/deluxe-surgeries" element={<DeluxeSurgeries />} />
              <Route path="/deluxe-surgeries/:slug" element={<SurgeryDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
