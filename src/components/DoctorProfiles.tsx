
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import the doctors data
const doctorsData = [
  { id: "7", name: "Dr. B G Mahesh", specialty: "Radiology", degrees: "MBBS, MD", experience: "4 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/DR-B.G-MAHESH.png" },
  { id: "13", name: "Dr. Chandrashekar H S", specialty: "Orthopaedics", degrees: "MBBS, MS", experience: "20 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹600", image: "/doctor-profiles/DR- CHANDRASHEKAR -H S.jpg" },
  { id: "2", name: "Dr. Akshay Dhanda", specialty: "Orthopedics", degrees: "MBBS, MD", experience: "12 Years", visitingDays: "Mon–Fri", timings: "8AM – 4PM", consultationFee: "₹650", image: "/doctor-profiles/dr-Askahy-dhanda.jpg" },
  { id: "14", name: "Dr. Krishnappa R", specialty: "Surgical Oncology", degrees: "MBBS, MD", experience: "25 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/DR-KRISHNAPPA- R.jpg" },
  { id: "10", name: "Dr. G L Maiya", specialty: "General Surgery", degrees: "MBBS, MS", experience: "35 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹1000", image: "/doctor-profiles/DR-G L-MAIYA.png" },
  { id: "3", name: "Dr. Hrishikesh Vemula", specialty: "Cardiology", degrees: "MBBS, MD, DM", experience: "20 Years", visitingDays: "Mon–Sat", timings: "5PM – 7PM", consultationFee: "₹800", image: "/doctor-profiles/DR-HRISHIKESH- VEMULA.jpg" },
  { id: "1", name: "Dr. Abhey Vasudev", specialty: "Orthopaedics", degrees: "MBBS, MD", experience: "15 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/dr-abhey-vasudev.jpg" },
  { id: "5", name: "Dr. Sujay Rao", specialty: "Neurology", degrees: "MBBS, MS, MCH", experience: "35 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹1200", image: "/doctor-profiles/DR-SUJAY- RAO.png" },
  { id: "9", name: "Dr. Ishwarya Bhandari", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "10 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹500", image: "/doctor-profiles/DR-ISHWARYA- BHANDARI.jpg" },
  { id: "6", name: "Dr. N T Babu", specialty: "Ophthalmology", degrees: "MBBS, DOMS", experience: "15 Years", visitingDays: "Mon–Sat", timings: "10AM – 12PM", consultationFee: "₹600", image: "/doctor-profiles/DR-N T-BABU.jpg" },
  { id: "12", name: "Dr. Chinmay Nagesh", specialty: "Vascular Surgery", degrees: "MBBS, MS", experience: "15 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹600", image: "/doctor-profiles/DR-CHINMAY- NAGESH.jpeg" },
  { id: "8", name: "Dr. Murali P", specialty: "Medical Oncology", degrees: "MBBS, MD", experience: "15 Years", visitingDays: "Mon–Sat", timings: "2PM – 8PM", consultationFee: "₹600", image: "/doctor-profiles/DR-MURALI-P.jpeg" },
  { id: "15", name: "Dr. Lakshmi V Pandit", specialty: "Psychiatry", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹700", image: "/doctor-profiles/DR-LAKSHMI-V-PANDIT.jpg" },
  { id: "4", name: "Dr. Ananth Krishna", specialty: "Surgical Gastroenterology", degrees: "MBBS, MD, DM", experience: "30 Years", visitingDays: "Mon–Sat", timings: "2PM – 4PM", consultationFee: "₹800", image: "/doctor-profiles/DR-ANANTH-KRISHNA.jpeg" },
  { id: "11", name: "Dr. Geetha B V", specialty: "General Medicine", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹600", image: "/doctor-profiles/DR-GEETHA-B V.png" }
];

const DoctorProfiles = () => {
  return (
    <section id="doctors" className="py-24 bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-green-700/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        {/* Animated particles */}
        <div className="absolute top-40 right-40 w-2 h-2 bg-green-700 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-60 left-60 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 glass text-green-700 font-semibold text-sm mb-6 transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Medical Experts</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground drop-shadow-2xl">Meet Our</span>
            <br />
            <span className="bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent animate-text-glow">
              Expert Doctors
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our team of highly qualified medical professionals is dedicated to providing you with the best possible care
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorsData.slice(0, 4).map((doctor, index) => (
            <Card 
              key={doctor.id} 
              className="group glass hover:bg-white/80 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-3 animate-fade-in cursor-pointer relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Experience badge */}
              <div className="absolute top-4 right-4 z-10 glass rounded-full px-3 py-1 flex items-center space-x-1 transform group-hover:scale-110 transition-all duration-300">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-green-700 text-xs font-bold">{doctor.experience}</span>
                </div>
              {/* Doctor image container */}
              <div className="aspect-square w-full relative overflow-hidden bg-gradient-to-br from-blue-100 to-green-100">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-100/40 to-transparent z-[1]"></div>
                <div className="absolute inset-0 bg-blue-100/0 group-hover:bg-blue-100/20 transition-all duration-300 z-[2]"></div>
                {/* Doctor image */}
                <img 
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    (target.nextElementSibling as HTMLElement).style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-green-700 to-blue-400 flex flex-col items-center justify-center text-white" style={{ display: 'none' }}>
                  <div className="text-2xl font-bold mb-1">
                    {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="text-xs opacity-75">Photo</div>
                </div>
              </div>
              <CardContent className="text-center pt-6 pb-4">
                <h3 className="text-xl font-bold text-foreground mb-2">{doctor.name}</h3>
                <p className="text-green-700 font-medium mb-4">{doctor.specialty}</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-foreground font-medium">
                    <Award className="w-4 h-4" />
                    <span className="text-sm text-foreground font-medium">{doctor.degrees}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-foreground font-medium">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-foreground font-medium">{doctor.experience} Experience</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-foreground font-medium">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-foreground font-medium">{doctor.timings}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-foreground font-medium">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-foreground font-medium">{doctor.visitingDays}</span>
                  </div>
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <span className="text-green-700 font-bold text-lg">{doctor.consultationFee}</span>
                  <span className="text-foreground text-sm">consultation</span>
                </div>
                <div className="mt-6 flex justify-center">
                  <Link to={`/doctor/${doctor.id}`}>
                    <Button variant="outline" className="glass text-green-700 hover:bg-white/80 rounded-xl">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/doctors">
            <Button className="bg-gradient-to-r from-green-700 to-blue-400 hover:from-green-800 hover:to-blue-500 text-white px-8 py-3 rounded-xl">
              View All Doctors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfiles;
