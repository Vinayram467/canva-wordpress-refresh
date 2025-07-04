
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesGrid = () => {
  const services = [
    {
      title: "Cardiology",
      description: "Advanced heart care and cardiovascular treatments",
      icon: "❤️",
      color: "bg-red-50 border-red-200"
    },
    {
      title: "Neurology",
      description: "Comprehensive brain and nervous system care",
      icon: "🧠",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Pediatrics",
      description: "Specialized healthcare for children and infants",
      icon: "👶",
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      title: "Orthopedics",
      description: "Bone, joint and muscle treatments",
      icon: "🦴",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency medical services",
      icon: "🚑",
      color: "bg-red-50 border-red-200"
    },
    {
      title: "Surgery",
      description: "Advanced surgical procedures and care",
      icon: "🏥",
      color: "bg-blue-50 border-blue-200"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">Our Medical Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare services delivered by expert medical professionals using state-of-the-art technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`${service.color} hover:shadow-lg transition-shadow duration-300`}>
              <CardHeader className="text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <CardTitle className="text-emerald-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
