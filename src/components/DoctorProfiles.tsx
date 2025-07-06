
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Clock, Sparkles } from "lucide-react";

const DoctorProfiles = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15+ Years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&face=center",
      color: "from-purple-500 to-purple-600",
      rating: 4.9
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurologist", 
      experience: "12+ Years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&face=center",
      color: "from-pink-500 to-pink-600",
      rating: 4.8
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      experience: "10+ Years", 
      image: "https://images.unsplash.com/photo-1594824804732-ca8db4448119?w=300&h=300&fit=crop&face=center",
      color: "from-teal-500 to-teal-600",
      rating: 4.9
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "18+ Years",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&face=center",
      color: "from-blue-500 to-blue-600",
      rating: 5.0
    }
  ];

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
          {doctors.map((doctor, index) => (
            <Card 
              key={index} 
              className="group bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-3 animate-fade-in cursor-pointer relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient background */}
              <div className={`${doctor.color} h-40 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                
                {/* Floating rating */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 transform group-hover:scale-110 transition-all duration-300">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs font-bold">{doctor.rating}</span>
                </div>
                
                {/* Doctor image */}
                <img 
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-28 h-28 rounded-full border-4 border-white/30 absolute -bottom-14 left-1/2 transform -translate-x-1/2 object-cover group-hover:scale-110 group-hover:border-white/50 transition-all duration-500 shadow-2xl"
                />
              </div>
              
              <CardContent className="pt-20 text-center relative">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {doctor.name}
                  </h3>
                  <p className="text-emerald-400 font-semibold mb-2 flex items-center justify-center group-hover:text-white transition-colors duration-300">
                    <Award className="w-4 h-4 mr-1" />
                    {doctor.specialty}
                  </p>
                  <p className="text-white/70 text-sm mb-4 flex items-center justify-center group-hover:text-white/90 transition-colors duration-300">
                    <Clock className="w-4 h-4 mr-1" />
                    {doctor.experience}
                  </p>
                  
                  {/* Enhanced interaction button */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-200 transition-opacity duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorProfiles;
