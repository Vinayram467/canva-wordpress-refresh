import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const serviceData = [
  {
    id: "1",
    title: "ICU",
    description: "Intensive Care Unit with advanced life support systems and 24/7 monitoring.",
    features: ["24/7 Monitoring", "Advanced Life Support", "Specialized Equipment"],
    color: "from-red-500 to-red-600",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Emergency",
    description: "24/7 emergency medical services with rapid response capabilities.",
    features: ["24/7 Availability", "Rapid Response", "Trauma Care"],
    color: "from-orange-500 to-orange-600",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Laboratory",
    description: "State-of-the-art diagnostic laboratory with comprehensive testing facilities.",
    features: ["Blood Tests", "Pathology", "Microbiology"],
    color: "from-blue-500 to-blue-600",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Digital X-Ray",
    description: "Advanced digital radiography for precise and quick diagnostic imaging.",
    features: ["Digital Imaging", "Quick Results", "High Resolution"],
    color: "from-purple-500 to-purple-600",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    title: "Modular OT",
    description: "Modern modular operation theaters with advanced surgical equipment.",
    features: ["Sterile Environment", "Advanced Equipment", "Multiple Specialties"],
    color: "from-green-500 to-green-600",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Gynaec OT",
    description: "Specialized operation theater for gynecological and obstetric procedures.",
    features: ["Specialized Equipment", "Expert Staff", "Safe Procedures"],
    color: "from-pink-500 to-pink-600",
    image: "/placeholder.svg"
  },
  {
    id: "7",
    title: "Ambulance",
    description: "Emergency ambulance services with paramedic support and life support systems.",
    features: ["24/7 Service", "Paramedic Support", "Life Support Equipment"],
    color: "from-red-500 to-orange-500",
    image: "/placeholder.svg"
  },
  {
    id: "8",
    title: "Ultrasound",
    description: "Advanced ultrasound imaging for diagnostic and therapeutic purposes.",
    features: ["High Resolution", "Color Doppler", "3D/4D Imaging"],
    color: "from-teal-500 to-teal-600",
    image: "/placeholder.svg"
  },
  {
    id: "9",
    title: "Labour Room",
    description: "Comfortable and well-equipped labor rooms for safe deliveries.",
    features: ["Comfortable Environment", "Expert Care", "Emergency Ready"],
    color: "from-rose-500 to-rose-600",
    image: "/placeholder.svg"
  },
  {
    id: "10",
    title: "Wards",
    description: "Well-maintained patient wards with modern amenities and nursing care.",
    features: ["Comfortable Beds", "24/7 Nursing", "Modern Amenities"],
    color: "from-indigo-500 to-indigo-600",
    image: "/placeholder.svg"
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const service = serviceData.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
        <h2 className="text-3xl font-bold text-foreground mb-4">Service Not Found</h2>
        <Link to="/services">
          <Button>Back to Services</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="glass border border-white/80 shadow-2xl max-w-3xl mx-auto">
            <CardHeader className="text-center pb-0">
              <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${service.color} rounded-3xl flex items-center justify-center shadow-2xl`}>
                <img src={service.image} alt={service.title} className="w-16 h-16 object-contain" />
              </div>
              <CardTitle className="text-4xl font-bold text-foreground mb-2">{service.title}</CardTitle>
              <p className="text-muted-foreground text-lg mb-4">{service.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Key Features</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 text-center">
                <Link to="/services">
                  <Button className="rounded-full bg-gradient-to-r from-green-700 to-blue-400 text-white px-8 py-4">Back to All Services</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServiceDetail; 