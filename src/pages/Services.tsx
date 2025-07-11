import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Activity, 
  Microscope, 
  Zap, 
  Shield, 
  Baby, 
  Truck, 
  Stethoscope,
  Bed,
  Brain,
  Phone,
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "ICU",
      description: "Intensive Care Unit with advanced life support systems and 24/7 monitoring",
      icon: Heart,
      color: "from-red-500 to-red-600",
      features: ["24/7 Monitoring", "Advanced Life Support", "Specialized Equipment"]
    },
    {
      id: 2,
      title: "Emergency",
      description: "24/7 emergency medical services with rapid response capabilities",
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      features: ["24/7 Availability", "Rapid Response", "Trauma Care"]
    },
    {
      id: 3,
      title: "Laboratory",
      description: "State-of-the-art diagnostic laboratory with comprehensive testing facilities",
      icon: Microscope,
      color: "from-blue-500 to-blue-600",
      features: ["Blood Tests", "Pathology", "Microbiology"]
    },
    {
      id: 4,
      title: "Digital X-Ray",
      description: "Advanced digital radiography for precise and quick diagnostic imaging",
      icon: Zap,
      color: "from-purple-500 to-purple-600",
      features: ["Digital Imaging", "Quick Results", "High Resolution"]
    },
    {
      id: 5,
      title: "Modular OT",
      description: "Modern modular operation theaters with advanced surgical equipment",
      icon: Activity,
      color: "from-green-500 to-green-600",
      features: ["Sterile Environment", "Advanced Equipment", "Multiple Specialties"]
    },
    {
      id: 6,
      title: "Gynaec OT",
      description: "Specialized operation theater for gynecological and obstetric procedures",
      icon: Baby,
      color: "from-pink-500 to-pink-600",
      features: ["Specialized Equipment", "Expert Staff", "Safe Procedures"]
    },
    {
      id: 7,
      title: "Ambulance",
      description: "Emergency ambulance services with paramedic support and life support systems",
      icon: Truck,
      color: "from-red-500 to-orange-500",
      features: ["24/7 Service", "Paramedic Support", "Life Support Equipment"]
    },
    {
      id: 8,
      title: "Ultrasound",
      description: "Advanced ultrasound imaging for diagnostic and therapeutic purposes",
      icon: Stethoscope,
      color: "from-teal-500 to-teal-600",
      features: ["High Resolution", "Color Doppler", "3D/4D Imaging"]
    },
    {
      id: 9,
      title: "Labour Room",
      description: "Comfortable and well-equipped labor rooms for safe deliveries",
      icon: Baby,
      color: "from-rose-500 to-rose-600",
      features: ["Comfortable Environment", "Expert Care", "Emergency Ready"]
    },
    {
      id: 10,
      title: "Wards",
      description: "Well-maintained patient wards with modern amenities and nursing care",
      icon: Bed,
      color: "from-indigo-500 to-indigo-600",
      features: ["Comfortable Beds", "24/7 Nursing", "Modern Amenities"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg animate-float opacity-80"></div>
          <div className="absolute top-60 right-20 w-4 h-12 bg-gradient-to-b from-red-500 to-pink-500 rounded-full animate-float delay-300 opacity-70"></div>
          <div className="absolute bottom-40 left-32 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-float delay-700 opacity-60"></div>
          
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block mb-4">Our Medical</span>
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
                Services
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Comprehensive healthcare services with state-of-the-art facilities and expert medical care
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    {/* Service Icon */}
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <CardTitle className="text-white text-xl mb-2">{service.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-white/80 text-center text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center space-x-2 text-emerald-400 text-sm">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-1 transition-all duration-300">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Need More Information?</h3>
            <p className="text-white/80 mb-6">
              Contact us to learn more about our services and how we can help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-2xl px-8 py-6">
                <Phone className="w-4 h-4 mr-2" />
                Call Us: +91-80-2659-8600
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl px-8 py-6">
                <Clock className="w-4 h-4 mr-2" />
                24/7 Emergency
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;