
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Brain, Baby, Bone, Ambulance, Stethoscope, ArrowRight } from "lucide-react";

const ServicesGrid = () => {
  const services = [
    {
      title: "Cardiology",
      description: "Advanced heart care with state-of-the-art cardiac treatments and diagnostics",
      icon: Heart,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 hover:bg-red-100",
      borderColor: "border-red-200 hover:border-red-300"
    },
    {
      title: "Neurology",
      description: "Comprehensive brain and nervous system care by expert neurologists",
      icon: Brain,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      borderColor: "border-blue-200 hover:border-blue-300"
    },
    {
      title: "Pediatrics",
      description: "Specialized healthcare for children with compassionate pediatric experts",
      icon: Baby,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 hover:bg-emerald-100",
      borderColor: "border-emerald-200 hover:border-emerald-300"
    },
    {
      title: "Orthopedics",
      description: "Advanced bone, joint and muscle treatments with modern surgical techniques",
      icon: Bone,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      borderColor: "border-purple-200 hover:border-purple-300"
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency medical services with rapid response capabilities",
      icon: Ambulance,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 hover:bg-orange-100",
      borderColor: "border-orange-200 hover:border-orange-300"
    },
    {
      title: "General Medicine",
      description: "Comprehensive primary healthcare and preventive medical services",
      icon: Stethoscope,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50 hover:bg-teal-100",
      borderColor: "border-teal-200 hover:border-teal-300"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 font-semibold text-sm mb-4">
            Our Specialties
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            World-Class <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Medical Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                className={`group ${service.bgColor} ${service.borderColor} border-2 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 animate-fade-in cursor-pointer relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <CardHeader className="text-center relative z-10 pb-6">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center relative z-10">
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  
                  {/* Progress bar effect */}
                  <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in delay-700">
          <button className="group bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            View All Services
            <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
