
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import the doctors data
const doctorsData = [
  // Cardiology
  { id: "3", name: "Dr. Hrishikesh Vemula", specialty: "Cardiology", degrees: "MBBS, MD, DM", experience: "20 Years", visitingDays: "Mon–Sat", timings: "5PM – 7PM", consultationFee: "₹800", image: "/doctor-profiles/DR-HRISHIKESH- VEMULA.jpg" },
  // Neurosurgery
  { id: "5", name: "Dr. Sujay Rao", specialty: "Neurosurgery", degrees: "MBBS, MS, MCH", experience: "35 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹1200", image: "/doctor-profiles/DR-SUJAY- RAO.png" },
  // General Medicine
  { id: "7", name: "Dr. B G Mahesh", specialty: "General Medicine", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/DR-B.G-MAHESH.png" },
  // Administration
  { id: "11", name: "Dr. G L Maiya", specialty: "Administration", degrees: "MBBS, MS", experience: "35 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹1000", image: "/doctor-profiles/DR-G L-MAIYA.png" }
];

const DoctorProfiles = () => {
  return (
    <section id="doctors" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Animated particles */}
        <div className="absolute top-40 right-40 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-60 left-60 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm mb-6 transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Medical Experts</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">Meet Our</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
              Expert Doctors
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Our team of highly qualified medical professionals is dedicated to providing you with the best possible care
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorsData.map((doctor, index) => (
            <Card 
              key={doctor.id} 
              className="group bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-3 animate-fade-in cursor-pointer relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Experience badge */}
              <div className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 transform group-hover:scale-110 transition-all duration-300">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-white text-xs font-bold">{doctor.experience}</span>
                </div>

              {/* Doctor image container */}
              <div className="aspect-square w-full relative overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-[1]"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-[2]"></div>
                
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
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-blue-500 flex flex-col items-center justify-center text-white" style={{ display: 'none' }}>
                  <div className="text-2xl font-bold mb-1">
                    {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="text-xs opacity-75">Photo</div>
                </div>
              </div>
              
              <CardContent className="text-center pt-6 pb-4">
                <h3 className="text-xl font-bold text-white mb-2">{doctor.name}</h3>
                <p className="text-emerald-400 font-medium mb-4">{doctor.specialty}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-white/70">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{doctor.degrees}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-white/70">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{doctor.timings}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Link to={`/doctor/${doctor.id}`}>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl">
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
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl">
              View All Doctors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfiles;
