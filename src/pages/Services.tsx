import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, Mail, Star, Award, Shield, Heart, Brain, Eye, Baby, Bone, Stethoscope, Microscope, Ambulance, Bed } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { getMedicalOrganizationSchema } from "@/utils/schema";

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const servicesData = [
  {
    id: "1",
    name: "ICU (Intensive Care Unit)",
    description: "State-of-the-art intensive care unit with 24/7 monitoring and expert critical care team.",
    icon: Heart,
    features: ["24/7 Monitoring", "Expert Intensivists", "Advanced Life Support", "Critical Care"],
    image: "/icu-banner.jpg"
  },
  {
    id: "2",
    name: "Emergency Services",
    description: "24/7 emergency care with immediate response team and trauma management facilities.",
    icon: Ambulance,
    features: ["24/7 Availability", "Trauma Care", "Quick Response", "Emergency Team"],
    image: "/emergency-banner.jpg"
  },
  {
    id: "3",
    name: "Laboratory Services",
    description: "Comprehensive diagnostic laboratory with advanced testing equipment and quick results.",
    icon: Microscope,
    features: ["Blood Tests", "Pathology", "Quick Results", "Advanced Equipment"],
    image: "/lab-banner.jpg"
  },
  {
    id: "4",
    name: "Digital X-Ray",
    description: "High-resolution digital X-ray services with low radiation and instant results.",
    icon: Eye,
    features: ["High Resolution", "Low Radiation", "Instant Results", "Digital Imaging"],
    image: "/xray-banner.jpg"
  },
  {
    id: "5",
    name: "Modular OT",
    description: "State-of-the-art modular operation theaters ensuring highest standards of safety and sterility.",
    icon: Shield,
    features: ["Sterile Environment", "Advanced Equipment", "Expert Surgeons", "Safety Standards"],
    image: "/ot-banner.jpg"
  },
  {
    id: "6",
    name: "Gynecology OT",
    description: "Specialized operation theater for gynecological procedures with women's health focus.",
    icon: Baby,
    features: ["Women's Health", "Specialized Care", "Expert Gynecologists", "Comfortable Environment"],
    image: "/gyn-ot-banner.jpg"
  },
  {
    id: "7",
    name: "Ambulance Services",
    description: "24/7 fully-equipped ambulance service with trained paramedics for patient transport.",
    icon: Ambulance,
    features: ["24/7 Service", "Trained Paramedics", "Fully Equipped", "Quick Response"],
    image: "/ambulance-banner.jpg"
  },
  {
    id: "8",
    name: "Ultrasound Services",
    description: "Comprehensive ultrasound scanning services including pregnancy scans and doppler studies.",
    icon: Eye,
    features: ["Pregnancy Scans", "Doppler Studies", "Expert Radiologists", "Accurate Imaging"],
    image: "/ultrasound-banner.jpg"
  },
  {
    id: "9",
    name: "Labour Room",
    description: "Modern labour room facilities with comfortable delivery rooms for expectant mothers.",
    icon: Baby,
    features: ["Comfortable Rooms", "Expert Care", "Safe Delivery", "Modern Facilities"],
    image: "/labour-room-banner.jpg"
  },
  {
    id: "10",
    name: "Wards",
    description: "Comfortable hospital wards with well-equipped patient rooms and nursing care.",
    icon: Bed,
    features: ["Comfortable Rooms", "Nursing Care", "Clean Environment", "Patient Care"],
    image: "/wards-banner.jpg"
  }
];

const Services = () => {
  // Generate SEO data for the services listing page
  const seoData = {
    title: "Medical Services at Maiya Hospital Bangalore | Comprehensive Healthcare",
    description: "Comprehensive medical services at Maiya Hospital Bangalore - ICU, Emergency, Laboratory, Digital X-Ray, Modular OT, Ambulance & more. Quality healthcare 24/7.",
    keywords: "medical services bangalore, hospital services jayanagar, healthcare facilities bangalore, emergency medical services, diagnostic services bangalore, maiya hospital services",
    canonical: "https://maiyahospital.in/services",
    ogTitle: "Medical Services at Maiya Hospital Bangalore | Comprehensive Healthcare",
    ogDescription: "Comprehensive medical services at Maiya Hospital Bangalore - ICU, Emergency, Laboratory, Digital X-Ray, Modular OT, Ambulance & more. Quality healthcare 24/7.",
    ogImage: "https://maiyahospital.in/services-og.jpg",
    twitterTitle: "Medical Services at Maiya Hospital Bangalore | Comprehensive Healthcare",
    twitterDescription: "Comprehensive medical services at Maiya Hospital Bangalore - ICU, Emergency, Laboratory, Digital X-Ray, Modular OT, Ambulance & more. Quality healthcare 24/7.",
    twitterImage: "https://maiyahospital.in/services-twitter.jpg",
    structuredData: getMedicalOrganizationSchema()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <SEOHead {...seoData} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Comprehensive Medical Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              State-of-the-art medical facilities and services at Maiya Hospital, Jayanagar, Bangalore. 
              Quality healthcare with advanced technology and expert medical professionals.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="glass shadow-2xl border border-white/80 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground mb-2">
                      {service.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-white/60 text-green-700 border-green-700/30 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.location.href = `/service/${toSlug(service.name)}`}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Emergency Services Highlight */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80 bg-gradient-to-r from-red-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center flex items-center justify-center">
                  <Ambulance className="w-6 h-6 mr-2 text-red-600" />
                  24/7 Emergency Services
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Round-the-clock emergency care with immediate response team and advanced trauma management facilities.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="font-semibold">Emergency: +91 7406007777</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Ambulance className="w-5 h-5 text-orange-600" />
                    <span>Ambulance: 74060 07777</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span>24/7 Available</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Emergency
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quality Assurance Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center">Why Choose Maiya Hospital Services?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Expert Medical Team</h3>
                    <p className="text-muted-foreground text-sm">
                      Experienced doctors and specialists with years of expertise in their respective fields.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Advanced Technology</h3>
                    <p className="text-muted-foreground text-sm">
                      State-of-the-art medical equipment and facilities for accurate diagnosis and treatment.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Patient-Centered Care</h3>
                    <p className="text-muted-foreground text-sm">
                      Compassionate care with focus on patient comfort and recovery.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center">Book Your Service</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Ready to experience quality healthcare? Book your appointment or contact us for more information.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="w-5 h-5 text-green-700" />
                    <span>070223 16149 / 74060 07777</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>info@maiyahospital.in</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>Jayanagar, Bangalore</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                    onClick={() => window.location.href = '/appointment'}
                  >
                    Book Appointment
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 px-8"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;