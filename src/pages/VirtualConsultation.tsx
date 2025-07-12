import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Video, Phone, MessageSquare, Shield, Star, Users, Heart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { consultationApi } from "@/services/api";

const VirtualConsultation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', description: '' });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await consultationApi.create(formData);
      toast({
        title: "Consultation Booked!",
        description: "Your virtual consultation request has been received.",
      });
      setFormData({ name: '', email: '', phone: '', description: '' });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to book consultation. Please try again.",
      });
    }
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: Clock,
      title: "Quick Access",
      description: "Get medical consultation within minutes",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "End-to-end encrypted video consultations",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Star,
      title: "Expert Doctors",
      description: "Consult with our experienced specialists",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Heart,
      title: "Quality Care",
      description: "Same quality as in-person visits",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950">
      <Header />
      
      <main className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm">
                  <Video className="w-4 h-4 animate-pulse" />
                  <span>Virtual Care</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
                    Virtual Consultation
                  </span>
                  <br />
                  <span className="text-white">From the Comfort of Your Home</span>
                </h1>

                <p className="text-xl text-white/80 leading-relaxed">
                  Connect with our expert doctors through secure video consultations. 
                  Get medical advice, prescriptions, and follow-ups without leaving your home.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button className="group bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl">
                    <Video className="w-5 h-5 mr-2" />
                    Start Consultation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us
                  </Button>
                </div>
              </div>

              {/* Right Content - Consultation Form */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl blur-xl animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 animate-fade-in-up">
                  <h3 className="text-2xl font-bold text-white mb-6">Book Your Virtual Consultation</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <Input 
                        type="text" 
                        placeholder="Your Name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                      <Input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                      <Input 
                        type="tel" 
                        placeholder="Phone Number" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                      <Textarea 
                        placeholder="Brief Description of Your Concern" 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Video className="w-5 h-5 mr-2" />
                          Schedule Consultation
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`w-14 h-14 mb-6 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-white/70">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              How It <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Works</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Book Appointment",
                  description: "Choose your preferred time slot and fill in your details"
                },
                {
                  step: "02",
                  title: "Receive Confirmation",
                  description: "Get instant confirmation with video consultation link"
                },
                {
                  step: "03",
                  title: "Start Consultation",
                  description: "Connect with doctor through our secure platform"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="relative group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-6xl font-bold text-white/10 absolute top-4 right-4 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VirtualConsultation; 