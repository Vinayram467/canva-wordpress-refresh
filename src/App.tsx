import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import MedicalSpecialties from "./pages/MedicalSpecialties";
import AppointmentBooking from "./pages/AppointmentBooking";
import DoctorDetail from "./pages/DoctorDetail";
import VirtualConsultation from "./pages/VirtualConsultation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
