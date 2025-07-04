
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesGrid = () => {
  const services = [
    {
      title: "Cardiology",
      description: "Advanced heart care and cardiovascular treatments",
      icon: "❤️",
      color: "bg-red-50 border-red-200 hover:bg-red-100"
    },
    {
      title: "Neurology",
      description: "Comprehensive brain and nervous system care",
      icon: "🧠",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Pediatrics",
      description: "Specialized healthcare for children and infants",
      icon: "👶",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
    },
    {
      title: "Orthopedics",
      description: "Bone, joint and muscle treatments",
      icon: "🦴",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency medical services",
      icon: "🚑",
      color: "bg-red-50 border-red-200 hover:bg-red-100"
    },
    {
      title: "Surgery",
      description: "Advanced surgical procedures and care",
      icon: "🏥",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4 animate-slide-up">
            Our Medical Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-300">
            Comprehensive healthcare services delivered by expert medical professionals using state-of-the-art technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`${service.color} hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in group cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center">
                <div className="text-5xl mb-4 group-hover:animate-bounce transition-all duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-emerald-800 group-hover:text-red-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="w-0 h-1 bg-gradient-to-r from-emerald-600 to-red-600 group-hover:w-full transition-all duration-500 mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
