
import { Card, CardContent } from "@/components/ui/card";

const DoctorProfiles = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15+ Years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&face=center",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurologist", 
      experience: "12+ Years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&face=center",
      color: "bg-gradient-to-br from-pink-500 to-pink-600"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      experience: "10+ Years", 
      image: "https://images.unsplash.com/photo-1594824804732-ca8db4448119?w=300&h=300&fit=crop&face=center",
      color: "bg-gradient-to-br from-teal-500 to-teal-600"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "18+ Years",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&face=center",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    }
  ];

  return (
    <section id="doctors" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-red-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4 animate-slide-up">
            Meet Our Expert Doctors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-300">
            Our team of highly qualified medical professionals is dedicated to providing you with the best possible care
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <Card 
              key={index} 
              className="bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-3 animate-fade-in group cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`${doctor.color} h-32 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover group-hover:scale-110 transition-all duration-500 shadow-lg"
                />
              </div>
              <CardContent className="pt-16 text-center group-hover:bg-gray-50 transition-colors duration-300">
                <h3 className="text-xl font-bold text-emerald-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {doctor.name}
                </h3>
                <p className="text-red-600 font-semibold mb-1 relative">
                  {doctor.specialty}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-500"></div>
                </p>
                <p className="text-gray-600 text-sm">{doctor.experience}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorProfiles;
