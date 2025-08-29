import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Eye, Baby, Bone, Stethoscope, Microscope, Shield, Users, Award, Clock, MapPin, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { getMedicalOrganizationSchema } from "@/utils/schema";

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\./g, '')
    .replace(/\s+/g, '-');

const specialtiesData = [
  {
    id: "1",
    name: "General Surgery",
    description: "Comprehensive surgical procedures and treatments",
    icon: Shield,
    doctors: ["Dr. G L Maiya"],
    services: ["General Surgery", "Emergency Surgery", "Surgical Procedures", "Post-operative Care"],
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "2",
    name: "General Medicine",
    description: "Primary healthcare services for adults and comprehensive medical care",
    icon: Stethoscope,
    doctors: ["Dr. Geetha B V"],
    services: ["General Consultation", "Health Checkup", "Disease Management", "Preventive Care"],
    color: "from-green-500 to-green-600"
  },
  {
    id: "3",
    name: "Obstetrics & Gynaecology",
    description: "Comprehensive women's health care and obstetric services",
    icon: Baby,
    doctors: ["Dr. Ishwarya Bhandari"],
    services: ["Pregnancy Care", "Delivery", "Gynecological Surgery", "Women's Health"],
    color: "from-pink-500 to-pink-600"
  },
  {
    id: "4",
    name: "Orthopaedics",
    description: "Comprehensive bone and joint care with advanced surgical techniques",
    icon: Bone,
    doctors: ["Dr. Chandrashekar HS", "Dr. Abhey Vasudev", "Dr. Akshay Dhanda"],
    services: ["Joint Replacement", "Fracture Treatment", "Sports Injury", "Arthroscopy"],
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "5",
    name: "Urology",
    description: "Specialized care for urinary system and male reproductive health",
    icon: Shield,
    doctors: [],
    services: ["Kidney Treatment", "Prostate Care", "Urological Surgery", "Stone Treatment"],
    color: "from-indigo-500 to-indigo-600"
  },
  {
    id: "6",
    name: "Cardiology",
    description: "Expert heart care with advanced cardiac treatments and procedures",
    icon: Heart,
    doctors: ["Dr. Hrishikesh Vemula"],
    services: ["ECG", "Echo", "Stress Test", "Cardiac Surgery"],
    color: "from-red-500 to-red-600"
  },
  {
    id: "7",
    name: "E.N.T",
    description: "Specialized care for ear, nose, and throat conditions",
    icon: Users,
    doctors: [],
    services: ["Ear Surgery", "Sinus Treatment", "Voice Disorders", "Hearing Tests"],
    color: "from-teal-500 to-teal-600"
  },
  {
    id: "8",
    name: "Plastic Surgery",
    description: "Advanced cosmetic and reconstructive surgical procedures",
    icon: Shield,
    doctors: [],
    services: ["Cosmetic Surgery", "Reconstructive Surgery", "Burns Treatment", "Aesthetic Procedures"],
    color: "from-rose-500 to-rose-600"
  },
  {
    id: "9",
    name: "Radiology",
    description: "Advanced diagnostic imaging and radiological services",
    icon: Shield,
    doctors: ["Dr. B G Mahesh"],
    services: ["X-Ray", "CT Scan", "MRI", "Ultrasound"],
    color: "from-cyan-500 to-cyan-600"
  },
  {
    id: "10",
    name: "Pulmonology",
    description: "Specialized care for respiratory and lung conditions",
    icon: Shield,
    doctors: [],
    services: ["Lung Function Tests", "Bronchoscopy", "Sleep Studies", "Respiratory Care"],
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: "11",
    name: "Ophthalmology",
    description: "Expert eye care with advanced diagnostic and surgical procedures",
    icon: Eye,
    doctors: ["Dr. N T Babu"],
    services: ["Eye Surgery", "Vision Correction", "Retina Treatment", "Glaucoma Care"],
    color: "from-yellow-500 to-yellow-600"
  },
  {
    id: "12",
    name: "Neurology",
    description: "Specialized care for neurological disorders and brain conditions",
    icon: Brain,
    doctors: ["Dr. Sujay Rao"],
    services: ["Brain Surgery", "Stroke Treatment", "Neurological Tests", "Rehabilitation"],
    color: "from-violet-500 to-violet-600"
  },
  {
    id: "13",
    name: "Cardiology",
    description: "Expert heart care with advanced cardiac treatments and procedures",
    icon: Heart,
    doctors: [],
    services: ["ECG", "Echo", "Stress Test", "Cardiac Surgery"],
    color: "from-red-600 to-red-700"
  },
  {
    id: "14",
    name: "Dermatology",
    description: "Comprehensive skin care and treatment for various skin conditions",
    icon: Shield,
    doctors: [],
    services: ["Skin Treatment", "Cosmetic Procedures", "Hair Care", "Allergy Treatment"],
    color: "from-orange-500 to-orange-600"
  },
  {
    id: "15",
    name: "Dentistry",
    description: "Comprehensive dental care and oral health services",
    icon: Shield,
    doctors: [],
    services: ["Dental Surgery", "Root Canal", "Dental Implants", "Oral Hygiene"],
    color: "from-slate-500 to-slate-600"
  },
  {
    id: "16",
    name: "Paediatrics",
    description: "Comprehensive healthcare for children from birth to adolescence",
    icon: Baby,
    doctors: [],
    services: ["Child Care", "Vaccination", "Growth Monitoring", "Pediatric Surgery"],
    color: "from-indigo-500 to-indigo-600"
  },
  {
    id: "17",
    name: "Physiotherapy",
    description: "Physical therapy and rehabilitation services",
    icon: Shield,
    doctors: [],
    services: ["Physical Therapy", "Rehabilitation", "Sports Injury", "Pain Management"],
    color: "from-lime-500 to-lime-600"
  },
  {
    id: "18",
    name: "Psychiatry",
    description: "Mental health care and psychological treatment services",
    icon: Brain,
    doctors: ["Dr. Lakshmi V Pandit"],
    services: ["Mental Health", "Counseling", "Therapy", "Psychiatric Care"],
    color: "from-gray-500 to-gray-600"
  },
  {
    id: "19",
    name: "Anaesthesia",
    description: "Expert anaesthesia services for surgical procedures",
    icon: Shield,
    doctors: [],
    services: ["General Anaesthesia", "Regional Anaesthesia", "Pain Management", "Critical Care"],
    color: "from-slate-600 to-slate-700"
  },
  {
    id: "20",
    name: "Surgical Gastroenterology",
    description: "Advanced surgical treatment for digestive system disorders",
    icon: Shield,
    doctors: ["Dr. Ananth Krishna"],
    services: ["Gastrointestinal Surgery", "Laparoscopic Surgery", "Digestive Disorders", "Surgical Treatment"],
    color: "from-amber-500 to-amber-600"
  },
  {
    id: "21",
    name: "Medical Oncology",
    description: "Comprehensive cancer treatment and medical oncology services",
    icon: Shield,
    doctors: ["Dr. Murali P"],
    services: ["Cancer Treatment", "Chemotherapy", "Medical Oncology", "Cancer Care"],
    color: "from-red-700 to-red-800"
  },
  {
    id: "22",
    name: "Vascular Surgery",
    description: "Specialized surgical treatment for blood vessel disorders",
    icon: Shield,
    doctors: ["Dr. Chinmay Nagesh"],
    services: ["Vascular Surgery", "Blood Vessel Treatment", "Circulatory Disorders", "Surgical Procedures"],
    color: "from-blue-600 to-blue-700"
  },
  {
    id: "23",
    name: "Surgical Oncology",
    description: "Advanced surgical treatment for cancer and tumor removal",
    icon: Shield,
    doctors: ["Dr. Krishnappa R"],
    services: ["Cancer Surgery", "Tumor Removal", "Oncological Surgery", "Surgical Treatment"],
    color: "from-purple-600 to-purple-700"
  }
];

const MedicalSpecialties = () => {
  // Generate SEO data for the medical specialties page
  const seoData = {
    title: "Medical Specialties at Maiya Hospital | Expert Doctors in Bangalore",
    description: "Expert medical specialties at Maiya Hospital - Cardiology, Orthopedics, Gynecology, General Surgery, Neurology & 18+ specialties. Experienced doctors in Bangalore.",
    keywords: "medical specialties bangalore, best doctors jayanagar, specialist doctors bangalore, multi-specialty hospital services, expert medical care bangalore, cardiology bangalore, orthopedics jayanagar",
    canonical: "https://maiyahospital.in/specialties",
    ogTitle: "Medical Specialties at Maiya Hospital | Expert Doctors in Bangalore",
    ogDescription: "Expert medical specialties at Maiya Hospital - Cardiology, Orthopedics, Gynecology, General Surgery, Neurology & 18+ specialties. Experienced doctors in Bangalore.",
    ogImage: "https://maiyahospital.in/specialties-og.jpg",
    twitterTitle: "Medical Specialties at Maiya Hospital | Expert Doctors in Bangalore",
    twitterDescription: "Expert medical specialties at Maiya Hospital - Cardiology, Orthopedics, Gynecology, General Surgery, Neurology & 18+ specialties. Experienced doctors in Bangalore.",
    twitterImage: "https://maiyahospital.in/specialties-twitter.jpg",
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
              Medical Specialties
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive medical specialties at Maiya Hospital, Jayanagar, Bangalore. 
              Expert doctors providing specialized care across 18+ medical disciplines.
            </p>
          </div>

          {/* Specialties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialtiesData.map((specialty) => {
              const IconComponent = specialty.icon;
              return (
                <Card key={specialty.id} className="glass shadow-2xl border border-white/80 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${specialty.color} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground mb-2">
                      {specialty.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {specialty.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Expert Doctors</h4>
                      <div className="flex flex-wrap gap-2">
                        {specialty.doctors.map((doctor, index) => (
                          <Badge key={index} variant="outline" className="bg-white/60 text-green-700 border-green-700/30 text-xs">
                            {doctor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {specialty.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                                         <div className="flex gap-2">
                       <Button 
                         className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                         onClick={() => window.location.href = `/specialty/${toSlug(specialty.name)}`}
                       >
                         Learn More
                       </Button>
                       <Button 
                         variant="outline"
                         className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                         onClick={() => window.location.href = `/doctors?specialty=${encodeURIComponent(specialty.name)}`}
                       >
                         View Doctors
                       </Button>
                     </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Why Choose Our Specialties */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center">Why Choose Our Medical Specialties?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Expert Specialists</h3>
                    <p className="text-muted-foreground text-sm">
                      Highly qualified and experienced specialists in each medical field.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Advanced Technology</h3>
                    <p className="text-muted-foreground text-sm">
                      State-of-the-art medical equipment and advanced treatment techniques.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Comprehensive Care</h3>
                    <p className="text-muted-foreground text-sm">
                      Complete healthcare solutions from diagnosis to treatment and follow-up.
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
                <CardTitle className="text-2xl text-foreground text-center">Book Your Specialty Consultation</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Ready to consult with our expert specialists? Book your appointment today for specialized medical care.
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
                    onClick={() => window.location.href = '/doctors'}
                  >
                    View Doctors
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

export default MedicalSpecialties;