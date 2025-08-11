import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, MapPin, Phone, Mail, Award, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { getPhysicianSchema } from "@/utils/schema";
import NotFound from "./NotFound";

// Import the doctors data - Updated to match current structure
const doctorsData = [
  // Radiology
  { id: "1", name: "Dr. B G Mahesh", specialty: "Radiology", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/DR-B.G-MAHESH.png", slug: "dr-b-g-mahesh" },
  
  // Orthopedics
  { id: "2", name: "Dr. Chandrashekar HS", specialty: "Orthopedics", degrees: "MBBS, MS", experience: "20 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹600", image: "/doctor-profiles/DR- CHANDRASHEKAR -H S.jpg", slug: "dr-chandrashekar-h-s" },
  
  // Anaesthesia
  { id: "3", name: "Dr. Akshay Dhanda", specialty: "Anaesthesia", degrees: "MBBS, MD", experience: "12 Years", visitingDays: "Mon–Fri", timings: "8AM – 4PM", consultationFee: "₹650", image: "/doctor-profiles/dr-Askahy-dhanda.jpg", slug: "dr-akshay-dhanda" },
  
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

const DoctorDetail = () => {
  const { id } = useParams();

  // Find the doctor based on the ID
  const doctor = doctorsData.find(doc => doc.id === id);

  if (!doctor) {
    return <NotFound />;
  }

  // Generate SEO data for the doctor
  const seoData = {
    title: `${doctor.name} - Best ${doctor.specialty} in Jayanagar | Maiya Hospital`,
    description: `${doctor.name} is a leading ${doctor.specialty} specialist at Maiya Hospital, Jayanagar, with ${doctor.experience} of experience. Book consultation for ${doctor.specialty.toLowerCase()} treatment in Jayanagar, Bangalore.`,
    keywords: `${doctor.name}, ${doctor.specialty} jayanagar, ${doctor.specialty.toLowerCase()} doctor bangalore, best ${doctor.specialty.toLowerCase()} jayanagar, ${doctor.specialty.toLowerCase()} specialist bangalore`,
    canonical: `https://maiyahospital.in/doctor/${id}`,
    ogTitle: `${doctor.name} - Best ${doctor.specialty} in Jayanagar | Maiya Hospital`,
    ogDescription: `${doctor.name} is a leading ${doctor.specialty} specialist at Maiya Hospital, Jayanagar, with ${doctor.experience} of experience.`,
    ogImage: `https://maiyahospital.in${doctor.image}`,
    twitterTitle: `${doctor.name} - Best ${doctor.specialty} in Jayanagar | Maiya Hospital`,
    twitterDescription: `${doctor.name} is a leading ${doctor.specialty} specialist at Maiya Hospital, Jayanagar, with ${doctor.experience} of experience.`,
    twitterImage: `https://maiyahospital.in${doctor.image}`,
    structuredData: getPhysicianSchema(doctor)
  };

  // Additional doctor details
  const doctorDetails = {
    about: `${doctor.name} is a highly experienced ${doctor.specialty.toLowerCase()} specialist with ${doctor.experience} of expertise in treating patients. ${doctor.name.split(' ')[1]} has completed specialization from renowned institutions and has been serving patients with dedication and care.`,
    education: [
      `${doctor.degrees} from Leading Medical Institution`,
      "Additional Specialization Courses",
      "Advanced Training Programs"
    ],
    specializations: [
      `Advanced ${doctor.specialty} Care`,
      "Patient-Centered Treatment",
      "Modern Medical Techniques",
      "Preventive Care"
    ],
    achievements: [
      `Best ${doctor.specialty} Specialist Award`,
      "Excellence in Patient Care",
      "Research Publications"
    ]
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
          {/* Doctor Profile Header */}
          <div className="max-w-6xl mx-auto mb-12">
            <Card className="glass shadow-2xl border border-white/80">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Doctor Image - Updated to display full image */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-64 h-80 rounded-lg object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Doctor Info */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{doctor.name}</h1>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 text-sm">
                        {doctor.specialty}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 text-muted-foreground">
                        <GraduationCap className="w-5 h-5 text-blue-400" />
                        <span>{doctor.degrees}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-muted-foreground">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span>{doctor.experience} Experience</span>
                      </div>
                      <div className="flex items-center space-x-3 text-muted-foreground">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <span>{doctor.visitingDays}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-muted-foreground">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <span>{doctor.timings}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-green-700">Consultation Fee:</span>
                      <span className="text-lg text-foreground">{doctor.consultationFee}</span>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                        onClick={() => window.location.href = '/appointment'}
                      >
                        Book Appointment
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-2"
                        onClick={() => window.location.href = '/doctors'}
                      >
                        View All Doctors
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Doctor Details */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {/* About */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">About Dr. {doctor.name.split(' ')[1]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{doctorDetails.about}</p>
                </CardContent>
              </Card>
              {/* Education */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2 text-blue-400" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {doctorDetails.education.map((edu, index) => (
                      <li key={index} className="text-muted-foreground flex items-start">
                        <div className="w-2 h-2 bg-green-700 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            {/* Specializations & Achievements */}
            <div className="space-y-8">
              {/* Specializations */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <Star className="w-6 h-6 mr-2 text-yellow-400" />
                    Specializations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {doctorDetails.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-white/60 text-green-700 border-green-700/30 px-3 py-1">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Achievements */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <Award className="w-6 h-6 mr-2 text-purple-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {doctorDetails.achievements.map((achievement, index) => (
                      <li key={index} className="text-muted-foreground flex items-start">
                        <Award className="w-4 h-4 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              {/* Contact Info */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-green-700" />
                    <span>070223 16149 / 74060 07777</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>info@maiyahospital.in</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>Maiya Hospital, Jayanagar, Bengaluru</span>
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

export default DoctorDetail;