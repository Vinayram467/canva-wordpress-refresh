import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, MapPin, Phone, Mail, Award, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import the doctors data
const doctorsData = [
  // Anaesthesia
  { id: "1", name: "Dr. Abhey Vasudev", specialty: "Anaesthesia", degrees: "MBBS, MD", experience: "15 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/dr-abhey-vasudev.jpg" },
  { id: "2", name: "Dr. Akshay Dhanda", specialty: "Anaesthesia", degrees: "MBBS, MD", experience: "12 Years", visitingDays: "Mon–Fri", timings: "8AM – 4PM", consultationFee: "₹650", image: "/doctor-profiles/dr-Askahy-dhanda.jpg" },
  
  // Cardiology
  { id: "3", name: "Dr. Hrishikesh Vemula", specialty: "Cardiology", degrees: "MBBS, MD, DM", experience: "20 Years", visitingDays: "Mon–Sat", timings: "5PM – 7PM", consultationFee: "₹800", image: "/doctor-profiles/DR-HRISHIKESH- VEMULA.jpg" },
  { id: "4", name: "Dr. Ananth Krishna", specialty: "Cardiology", degrees: "MBBS, MD, DM", experience: "30 Years", visitingDays: "Mon–Sat", timings: "2PM – 4PM", consultationFee: "₹800", image: "/doctor-profiles/DR-ANANTH-KRISHNA.jpeg" },
  
  // Neurosurgery
  { id: "5", name: "Dr. Sujay Rao", specialty: "Neurosurgery", degrees: "MBBS, MS, MCH", experience: "35 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹1200", image: "/doctor-profiles/DR-SUJAY- RAO.png" },
  
  // Ophthalmology
  { id: "6", name: "Dr. N T Babu", specialty: "Ophthalmology", degrees: "MBBS, DOMS", experience: "15 Years", visitingDays: "Mon–Sat", timings: "10AM – 12PM", consultationFee: "₹600", image: "/doctor-profiles/DR-N T-BABU.jpg" },
  
  // General Medicine
  { id: "7", name: "Dr. B G Mahesh", specialty: "General Medicine", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/DR-B.G-MAHESH.png" },
  { id: "8", name: "Dr. Murali P", specialty: "General Medicine", degrees: "MBBS, MD", experience: "15 Years", visitingDays: "Mon–Sat", timings: "2PM – 8PM", consultationFee: "₹600", image: "/doctor-profiles/DR-MURALI-P.jpeg" },
  
  // Obstetrics & Gynaecology
  { id: "9", name: "Dr. Ishwarya Bhandari", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "10 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹500", image: "/doctor-profiles/DR-ISHWARYA- BHANDARI.jpg" },
  { id: "10", name: "Dr. Varsha Manohar", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "12 Years", visitingDays: "Mon–Sat", timings: "10AM – 2PM", consultationFee: "₹550", image: "/doctor-profiles/DR-VARSHA- MANOHAR.jpg" },
  
  // Administration
  { id: "11", name: "Dr. G L Maiya", specialty: "Administration", degrees: "MBBS, MS", experience: "35 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹1000", image: "/doctor-profiles/DR-G L-MAIYA.png" },
  
  // Other Specialists
  { id: "12", name: "Dr. Geetha B V", specialty: "Paediatrics", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹600", image: "/doctor-profiles/DR-GEETHA-B V.png" },
  { id: "13", name: "Dr. Gopal M G", specialty: "Dermatology", degrees: "MBBS, MD", experience: "25 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹700", image: "/doctor-profiles/DR-GOPAL-M G.jpeg" },
  { id: "14", name: "Dr. Chinmay Nagesh", specialty: "Orthopaedics", degrees: "MBBS, MS", experience: "15 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹600", image: "/doctor-profiles/DR-CHINMAY- NAGESH.jpeg" },
  { id: "15", name: "Dr. Chandrashekar H S", specialty: "ENT", degrees: "MBBS, MS", experience: "20 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹600", image: "/doctor-profiles/DR- CHANDRASHEKAR -H S.jpg" },
  { id: "16", name: "Dr. Krishnappa R", specialty: "Pulmonology", degrees: "MBBS, MD", experience: "25 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/DR-KRISHNAPPA- R.jpg" },
  { id: "17", name: "Dr. Lakshmi V Pandit", specialty: "Psychiatry", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹700", image: "/doctor-profiles/DR-LAKSHMI-V-PANDIT.jpg" }
];

const DoctorDetail = () => {
  const { id } = useParams();

  // Find the doctor based on the ID
  const doctor = doctorsData.find(doc => doc.id === id) || {
    id: "not-found",
    name: "Doctor Not Found",
    specialty: "N/A",
    degrees: "N/A",
    experience: "N/A",
    visitingDays: "N/A",
    timings: "N/A",
    consultationFee: "N/A",
    image: "/placeholder.svg",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950">
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
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Doctor Image */}
                  <div className="text-center">
                    <div className="w-64 h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-gradient-to-br from-slate-600 to-slate-700">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          (target.nextElementSibling as HTMLElement).style.display = 'flex';
                        }}
                      />
                      {/* Enhanced fallback placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 flex flex-col items-center justify-center text-white relative" style={{ display: 'none' }}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-6xl font-bold mb-4">
                            {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="text-sm opacity-90 bg-white/20 px-4 py-2 rounded-full">
                            Doctor Photo
                          </div>
                          <div className="text-xs opacity-75 mt-2">
                            Placeholder Image
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">{doctor.name}</h1>
                      <Badge className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border-emerald-500/30 text-lg px-4 py-2">
                        {doctor.specialty}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-white/80">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-5 h-5 text-blue-400" />
                        <span>{doctor.degrees}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span>{doctor.experience} Experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-emerald-400" />
                        <span>{doctor.timings}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        <span>{doctor.visitingDays}</span>
                      </div>
                    </div>

                    <div className="text-center md:text-left pt-4">
                      <span className="text-emerald-400 font-bold text-2xl">
                        {doctor.consultationFee}
                      </span>
                      <span className="text-white/60 text-lg ml-2">consultation</span>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        onClick={() => window.location.href = `/appointment?doctor=${doctor.id}`}
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 rounded-2xl"
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-3 rounded-2xl">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* About & Education */}
            <div className="space-y-8">
              {/* About */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">About Dr. {doctor.name.split(' ')[1]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 leading-relaxed">{doctorDetails.about}</p>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2 text-blue-400" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {doctorDetails.education.map((edu, index) => (
                      <li key={index} className="text-white/80 flex items-start">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Star className="w-6 h-6 mr-2 text-yellow-400" />
                    Specializations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {doctorDetails.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-white/5 text-white/80 border-white/20 px-3 py-1">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Award className="w-6 h-6 mr-2 text-purple-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {doctorDetails.achievements.map((achievement, index) => (
                      <li key={index} className="text-white/80 flex items-start">
                        <Award className="w-4 h-4 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 text-white/80">
                    <Phone className="w-5 h-5 text-emerald-400" />
                    <span>070223 16149 / 74060 07777</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>info@maiyahospital.in</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
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