
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Brain, Baby, Bone, Ambulance, Stethoscope, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesGrid = () => {
  const services = [
    {
      title: "Cardiology",
      description: "Advanced heart care with state-of-the-art cardiac treatments and diagnostics",
      icon: Heart,
      color: "from-red-500 to-red-600",
      glowColor: "red-500/30"
    },
    {
      title: "Neurology", 
      description: "Comprehensive brain and nervous system care by expert neurologists",
      icon: Brain,
      color: "from-blue-500 to-blue-600",
      glowColor: "blue-500/30"
    },
    {
      title: "Pediatrics",
      description: "Specialized healthcare for children with compassionate pediatric experts",
      icon: Baby,
      color: "from-emerald-500 to-emerald-600",
      glowColor: "emerald-500/30"
    },
    {
      title: "Orthopedics",
      description: "Advanced bone, joint and muscle treatments with modern surgical techniques",
      icon: Bone,
      color: "from-purple-500 to-purple-600",
      glowColor: "purple-500/30"
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency medical services with rapid response capabilities",
      icon: Ambulance,
      color: "from-orange-500 to-orange-600",
      glowColor: "orange-500/30"
    },
    {
      title: "General Medicine",
      description: "Comprehensive primary healthcare and preventive medical services",
      icon: Stethoscope,
      color: "from-teal-500 to-teal-600",
      glowColor: "teal-500/30"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-40 left-40 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-60 right-32 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-700"></div>
        <div className="absolute top-80 right-80 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-300"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm mb-6 transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Our Specialties</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">World-Class</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
              Medical Services
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Experience excellence in healthcare with our comprehensive range of medical specialties, 
            backed by cutting-edge technology and compassionate care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 animate-fade-in cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl shadow-${service.glowColor}`}></div>
                
                <CardHeader className="text-center relative z-10 pb-6">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-2xl relative overflow-hidden`}>
                    <IconComponent className="w-10 h-10 text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center relative z-10">
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-emerald-400 font-semibold group-hover:text-white transition-colors duration-300">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  
                  {/* Enhanced progress bar */}
                  <div className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-lg`}></div>
                  </div>
                </CardContent>

                {/* Floating decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-transparent to-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-200"></div>
              </Card>
            );
          })}
        </div>

        {/* Enhanced call to action */}
        <div className="text-center mt-20 animate-fade-in delay-700">
          <Link to="/services">
            <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-6 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center">
                View All Services
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
