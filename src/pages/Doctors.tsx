import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin, Phone, Mail, Calendar, Clock, Award, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { getMedicalOrganizationSchema } from "@/utils/schema";

// Import the doctors data
const doctorsData = [
  // Radiology
  { id: "1", name: "Dr. B G Mahesh", specialty: "Radiology", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/DR-B.G-MAHESH.png", slug: "dr-b-g-mahesh" },
  
  // Orthopedics
  { id: "2", name: "Dr. Chandrashekar HS", specialty: "Orthopedics", degrees: "MBBS, MS", experience: "20 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹600", image: "/doctor-profiles/DR- CHANDRASHEKAR -H S.jpg", slug: "dr-chandrashekar-h-s" },
  
  // Orthopedics
  { id: "3", name: "Dr. Akshay Dhanda", specialty: "Orthopedics", degrees: "MBBS, MD", experience: "12 Years", visitingDays: "Mon–Fri", timings: "8AM – 4PM", consultationFee: "₹650", image: "/doctor-profiles/dr-Askahy-dhanda.jpg", slug: "dr-akshay-dhanda" },
  
  // Surgical Oncology
  { id: "4", name: "Dr. Krishnappa R", specialty: "Surgical Oncology", degrees: "MBBS, MD", experience: "25 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/DR-KRISHNAPPA- R.jpg", slug: "dr-krishnappa-r" },
  
  // General Surgery
  { id: "5", name: "Dr. G L Maiya", specialty: "General Surgery", degrees: "MBBS, MS", experience: "35 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹1000", image: "/doctor-profiles/DR-G L-MAIYA.png", slug: "dr-g-l-maiya" },
  
  // Cardiology
  { id: "6", name: "Dr. Hrishikesh Vemula", specialty: "Cardiology", degrees: "MBBS, MD, DM", experience: "20 Years", visitingDays: "Mon–Sat", timings: "5PM – 7PM", consultationFee: "₹800", image: "/doctor-profiles/DR-HRISHIKESH- VEMULA.jpg", slug: "dr-hrishikesh-vemula" },
  
  // Orthopedics
  { id: "7", name: "Dr. Abhey Vasudev", specialty: "Orthopedics", degrees: "MBBS, MD", experience: "15 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/dr-abhey-vasudev.jpg", slug: "dr-abhey-vasudev" },
  
  // Neurology
  { id: "8", name: "Dr. Sujay Rao", specialty: "Neurology", degrees: "MBBS, MS, MCH", experience: "35 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹1200", image: "/doctor-profiles/DR-SUJAY- RAO.png", slug: "dr-sujay-rao" },
  
  // Obstetrics & Gynaecology
  { id: "9", name: "Dr. Ishwarya Bhandari", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "10 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹500", image: "/doctor-profiles/DR-ISHWARYA- BHANDARI.jpg", slug: "dr-ishwarya-bhandari" },
  
  // Ophthalmology
  { id: "10", name: "Dr. N T Babu", specialty: "Ophthalmology", degrees: "MBBS, DOMS", experience: "15 Years", visitingDays: "Mon–Sat", timings: "10AM – 12PM", consultationFee: "₹600", image: "/doctor-profiles/DR-N T-BABU.jpg", slug: "dr-n-t-babu" },
  
  // Vascular Surgery
  { id: "11", name: "Dr. Chinmay Nagesh", specialty: "Vascular Surgery", degrees: "MBBS, MS", experience: "15 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹600", image: "/doctor-profiles/DR-CHINMAY- NAGESH.jpeg", slug: "dr-chinmay-nagesh" },
  
  // Medical Oncology
  { id: "12", name: "Dr. Murali P", specialty: "Medical Oncology", degrees: "MBBS, MD", experience: "15 Years", visitingDays: "Mon–Sat", timings: "2PM – 8PM", consultationFee: "₹600", image: "/doctor-profiles/DR-MURALI-P.jpeg", slug: "dr-murali-p" },
  
  // Psychiatry
  { id: "13", name: "Dr. Lakshmi V Pandit", specialty: "Psychiatry", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹700", image: "/doctor-profiles/DR-LAKSHMI-V-PANDIT.jpg", slug: "dr-lakshmi-v-pandit" },
  
  // Surgical Gastroenterology
  { id: "14", name: "Dr. Ananth Krishna", specialty: "Surgical Gastroenterology", degrees: "MBBS, MD, DM", experience: "30 Years", visitingDays: "Mon–Sat", timings: "2PM – 4PM", consultationFee: "₹800", image: "/doctor-profiles/DR-ANANTH-KRISHNA.jpeg", slug: "dr-ananth-krishna" },
  
  // General Medicine
  { id: "15", name: "Dr. Geetha B V", specialty: "General Medicine", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹600", image: "/doctor-profiles/DR-GEETHA-B V.png", slug: "dr-geetha-b-v" }
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  // Generate SEO data for the doctors listing page
  const seoData = {
    title: "Expert Doctors at Maiya Hospital Bangalore | Experienced Medical Team",
    description: "Meet our expert medical team at Maiya Hospital Bangalore. Experienced doctors including Dr. B G Mahesh, Dr. Chandrashekar H S & specialist consultants in Jayanagar.",
    keywords: "best doctors bangalore, expert physicians jayanagar, specialist doctors bangalore, medical consultants bangalore, top surgeons bangalore, maiya hospital doctors",
    canonical: "https://maiyahospital.in/doctors",
    ogTitle: "Expert Doctors at Maiya Hospital Bangalore | Experienced Medical Team",
    ogDescription: "Meet our expert medical team at Maiya Hospital Bangalore. Experienced doctors including Dr. B G Mahesh, Dr. Chandrashekar H S & specialist consultants.",
    ogImage: "https://maiyahospital.in/doctors-og.jpg",
    twitterTitle: "Expert Doctors at Maiya Hospital Bangalore | Experienced Medical Team",
    twitterDescription: "Meet our expert medical team at Maiya Hospital Bangalore. Experienced doctors including Dr. B G Mahesh, Dr. Chandrashekar H S & specialist consultants.",
    twitterImage: "https://maiyahospital.in/doctors-twitter.jpg",
    structuredData: getMedicalOrganizationSchema()
  };

  // Get unique specialties
  const specialties = [...new Set(doctorsData.map(doctor => doctor.specialty))];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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
              Meet Our Expert Medical Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experienced doctors and specialists providing comprehensive healthcare at Maiya Hospital, Jayanagar, Bangalore
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="glass shadow-2xl border border-white/80">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search doctors by name or specialty..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="glass shadow-2xl border border-white/80 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="relative inline-block mb-4">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{doctor.name}</h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mb-3">
                      {doctor.specialty}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      <span>{doctor.degrees}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span>{doctor.experience} Experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-green-400" />
                      <span>{doctor.visitingDays}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span>{doctor.timings}</span>
                    </div>
                                         <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                       <span className="text-green-700 font-semibold">{doctor.consultationFee}</span>
                       <div className="flex gap-2">
                         <Button 
                           size="sm" 
                           className="bg-green-600 hover:bg-green-700 text-white"
                           onClick={() => window.location.href = `/doctor/${doctor.id}`}
                         >
                           View Profile
                         </Button>
                         <Button 
                           size="sm" 
                           variant="outline"
                           className="border-green-600 text-green-600 hover:bg-green-50"
                           onClick={() => window.location.href = '/appointment'}
                         >
                           Book Appointment
                         </Button>
                       </div>
                     </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results Message */}
          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">No Doctors Found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or specialty filter.</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center">Book Your Appointment</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Ready to meet our expert doctors? Book your appointment today for quality healthcare.
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
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                  onClick={() => window.location.href = '/appointment'}
                >
                  Book Appointment Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Doctors;