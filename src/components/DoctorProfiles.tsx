
import { Card, CardContent } from "@/components/ui/card";

const DoctorProfiles = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15+ Years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&face=center",
      color: "bg-purple-500"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurologist", 
      experience: "12+ Years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&face=center",
      color: "bg-pink-500"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      experience: "10+ Years", 
      image: "https://images.unsplash.com/photo-1594824804732-ca8db4448119?w=300&h=300&fit=crop&face=center",
      color: "bg-teal-500"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "18+ Years",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&face=center",
      color: "bg-blue-500"
    }
  ];

  return (
    <section id="doctors" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">Meet Our Expert Doctors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of highly qualified medical professionals is dedicated to providing you with the best possible care
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <Card key={index} className="bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className={`${doctor.color} h-32 relative`}>
                <img 
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
                />
              </div>
              <CardContent className="pt-16 text-center">
                <h3 className="text-xl font-bold text-emerald-800 mb-2">{doctor.name}</h3>
                <p className="text-red-600 font-semibold mb-1">{doctor.specialty}</p>
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
