import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Phone, Mail, Star, Award, Shield, Heart, Brain, Eye, Baby, Bone, Stethoscope, Microscope, Ambulance, Bed } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEOHead } from '@/components/seo/SEOHead';
import { getMedicalOrganizationSchema } from '@/utils/schema';
import NotFound from './NotFound';

const ServiceDetail = () => {
  const { slug } = useParams();

  const servicesBySlug: Record<string, {
    name: string;
    description: string;
    icon: any;
    image: string;
    longDescription: string;
    benefits: string[];
    equipment: string[];
  }> = {
    'icu-intensive-care-unit': {
      name: 'ICU (Intensive Care Unit)',
      description: 'State-of-the-art intensive care unit with 24/7 monitoring and expert critical care team.',
      icon: Heart,
      image: '/icu-banner.jpg',
      longDescription: 'Our Intensive Care Unit (ICU) is equipped with state-of-the-art medical equipment and staffed by experienced intensivists who provide round-the-clock critical care. We offer advanced life support systems, continuous monitoring, and specialized treatment for critically ill patients.',
      benefits: ['24/7 expert medical supervision', 'Advanced monitoring equipment', 'Specialized critical care team', 'Family support and counseling'],
      equipment: ['Ventilators', 'Cardiac monitors', 'Infusion pumps', 'Defibrillators']
    },
    'emergency-services': {
      name: 'Emergency Services',
      description: '24/7 emergency care with immediate response team and trauma management facilities.',
      icon: Ambulance,
      image: '/emergency-banner.jpg',
      longDescription: 'Our Emergency Department operates 24/7 with rapid triage, stabilization, and definitive care for trauma and medical emergencies.',
      benefits: ['Rapid response', 'Trauma management', '24/7 availability', 'Experienced emergency team'],
      equipment: ['Defibrillators', 'Ventilators', 'Trauma kits', 'Monitors']
    },
    'laboratory-services': {
      name: 'Laboratory Services',
      description: 'Comprehensive diagnostic laboratory with advanced testing equipment and quick results.',
      icon: Microscope,
      image: '/lab-banner.jpg',
      longDescription: 'Our diagnostic lab offers comprehensive pathology services with accurate reporting and quick turnaround times.',
      benefits: ['Accurate reports', 'Quick TAT', 'Advanced analyzers', 'Quality control'],
      equipment: ['Hematology analyzers', 'Biochemistry analyzers', 'Immunoassay systems', 'Microscopes']
    },
    'digital-x-ray': {
      name: 'Digital X-Ray',
      description: 'High-resolution digital X-ray services with low radiation and instant results.',
      icon: Eye,
      image: '/xray-banner.jpg',
      longDescription: 'High-resolution digital radiography with minimized radiation exposure and instant image availability.',
      benefits: ['Low radiation', 'Instant images', 'High clarity', 'Expert reporting'],
      equipment: ['Digital radiography systems', 'PACS', 'Lead protection', 'Positioning aids']
    },
    'modular-ot': {
      name: 'Modular OT',
      description: 'State-of-the-art modular operation theaters ensuring highest standards of safety and sterility.',
      icon: Shield,
      image: '/ot-banner.jpg',
      longDescription: 'Modern modular operation theatres with laminar airflow and HEPA filtration ensure surgical safety.',
      benefits: ['Sterile environment', 'Advanced equipment', 'Dedicated OT staff', 'Infection control'],
      equipment: ['Anesthesia workstations', 'Surgical lights', 'HEPA filters', 'Electrosurgical units']
    },
    'gynecology-ot': {
      name: 'Gynecology OT',
      description: "Specialized operation theater for gynecological procedures with women's health focus.",
      icon: Baby,
      image: '/gyn-ot-banner.jpg',
      longDescription: 'Dedicated gynecology OT designed for minimally invasive and obstetric procedures.',
      benefits: ['Specialized setup', 'Privacy and comfort', 'Expert gynecologists', 'Minimally invasive options'],
      equipment: ['Laparoscopic towers', 'Anesthesia workstations', 'Fetal monitors', 'Surgical instruments']
    },
    'ambulance-services': {
      name: 'Ambulance Services',
      description: '24/7 fully-equipped ambulance service with trained paramedics for patient transport.',
      icon: Ambulance,
      image: '/ambulance-banner.jpg',
      longDescription: 'Round-the-clock ambulance support with Basic and Advanced Life Support vehicles and trained paramedics.',
      benefits: ['24/7 availability', 'ALS/BLS units', 'Trained paramedics', 'Rapid transport'],
      equipment: ['Ventilators', 'Monitors', 'Defibrillators', 'Stretchers']
    },
    'ultrasound-services': {
      name: 'Ultrasound Services',
      description: 'Comprehensive ultrasound scanning services including pregnancy scans and doppler studies.',
      icon: Eye,
      image: '/ultrasound-banner.jpg',
      longDescription: 'Advanced sonography services including obstetric, abdominal, and vascular ultrasound studies.',
      benefits: ['Expert radiologists', 'Doppler studies', 'High-resolution imaging', 'Patient comfort'],
      equipment: ['High-end ultrasound machines', 'Transducers', 'Doppler modules', 'Reporting systems']
    },
    'labour-room': {
      name: 'Labour Room',
      description: 'Modern labour room facilities with comfortable delivery rooms for expectant mothers.',
      icon: Baby,
      image: '/labour-room-banner.jpg',
      longDescription: 'Comfortable labour, delivery, and recovery rooms with continuous maternal and fetal monitoring.',
      benefits: ['Comfort and privacy', 'Experienced nursing', 'Fetal monitoring', 'Postpartum care'],
      equipment: ['LDR beds', 'Fetal monitors', 'Infant warmers', 'Emergency kits']
    },
    'wards': {
      name: 'Wards',
      description: 'Comfortable hospital wards with well-equipped patient rooms and nursing care.',
      icon: Bed,
      image: '/wards-banner.jpg',
      longDescription: 'Clean, comfortable wards with attentive nursing care and essential amenities for recovery.',
      benefits: ['Comfortable rooms', 'Nursing care', 'Clean environment', 'Visitor access'],
      equipment: ['Hospital beds', 'Monitoring devices', 'Nursing stations', 'Call systems']
    }
  };

  const serviceData = slug ? servicesBySlug[slug] : undefined;
  if (!serviceData) {
    return <NotFound />;
  }

  // Generate SEO data for the service detail page
  const seoData = {
    title: `${serviceData.name} in Jayanagar | Expert ${serviceData.name} Treatment | Maiya Hospital`,
    description: `Expert ${serviceData.name} treatment in Jayanagar at Maiya Hospital. Advanced facilities, experienced specialists, comprehensive care. Book consultation today.`,
    keywords: `${serviceData.name.toLowerCase()} jayanagar, ${serviceData.name.toLowerCase()} treatment bangalore, ${serviceData.name.toLowerCase()} specialist jayanagar, ${serviceData.name.toLowerCase()} hospital bangalore, maiya hospital ${serviceData.name.toLowerCase()}`,
    canonical: `https://maiyahospital.in/service/${slug}`,
    ogTitle: `${serviceData.name} in Jayanagar | Expert Treatment | Maiya Hospital`,
    ogDescription: `Expert ${serviceData.name} treatment in Jayanagar at Maiya Hospital. Advanced facilities, experienced specialists, comprehensive care.`,
    ogImage: `https://maiyahospital.in${serviceData.image}`,
    twitterTitle: `${serviceData.name} in Jayanagar | Expert Treatment | Maiya Hospital`,
    twitterDescription: `Expert ${serviceData.name} treatment in Jayanagar at Maiya Hospital. Advanced facilities, experienced specialists, comprehensive care.`,
    twitterImage: `https://maiyahospital.in${serviceData.image}`,
    structuredData: getMedicalOrganizationSchema()
  };

  const IconComponent = serviceData.icon;

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
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm mb-6">
              <IconComponent className="w-4 h-4" />
              <span>{serviceData.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {serviceData.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {serviceData.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Service Image */}
            <div className="relative">
              <img 
                src={serviceData.image} 
                alt={serviceData.name}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>

            {/* Service Details */}
            <div className="space-y-8">
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">About {serviceData.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {serviceData.longDescription}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Benefits</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {serviceData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Available Equipment</h4>
                    <div className="flex flex-wrap gap-2">
                      {serviceData.equipment.map((item, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="glass shadow-2xl border border-white/80 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Ready to Get Started?</h3>
                  <p className="text-white/90 mb-4">
                    Contact us today to learn more about our {serviceData.name} services and schedule your consultation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-white text-green-600 hover:bg-gray-100">
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                      Contact Us
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail; 