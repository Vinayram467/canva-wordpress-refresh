import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, Eye, Clock, MapPin, Phone, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degrees: string;
  experience: string;
  visitingDays: string;
  timings: string;
  consultationFee: string;
  image: string;
}

const doctorsData: Doctor[] = [
  { id: "7", name: "Dr. B G Mahesh", specialty: "Radiology", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/doctor-profiles/DR-B.G-MAHESH.png" },
  { id: "13", name: "Dr. Chandrashekar H S", specialty: "Orthopaedics", degrees: "MBBS, MS", experience: "20 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹600", image: "/doctor-profiles/DR- CHANDRASHEKAR -H S.jpg" },
  { id: "2", name: "Dr. Akshay Dhanda", specialty: "Orthopaedics", degrees: "MBBS, MD", experience: "12 Years", visitingDays: "Mon–Fri", timings: "8AM – 4PM", consultationFee: "₹650", image: "/doctor-profiles/dr-Askahy-dhanda.jpg" },
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

const specialties = [
  "All Specialties",
  "Orthopaedics",
  "Cardiology",
  "Surgical Gastroenterology",
  "Neurology",
  "Ophthalmology",
  "Radiology",
  "Medical Oncology",
  "Obstetrics & Gynaecology",
  "General Surgery",
  "General Medicine",
  "Vascular Surgery",
  "Surgical Oncology",
  "Psychiatry"
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterDoctors(term, selectedSpecialty);
  };

  const handleSpecialtyFilter = (specialty: string) => {
    setSelectedSpecialty(specialty);
    filterDoctors(searchTerm, specialty);
  };

  const filterDoctors = (search: string, specialty: string) => {
    let filtered = doctorsData;
    
    if (search) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (specialty !== "All Specialties") {
      filtered = filtered.filter(doctor => doctor.specialty === specialty);
    }
    
    setFilteredDoctors(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg animate-float opacity-80"></div>
          <div className="absolute top-60 right-20 w-4 h-12 bg-gradient-to-b from-red-500 to-pink-500 rounded-full animate-float delay-300 opacity-70"></div>
          <div className="absolute bottom-40 left-32 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-float delay-700 opacity-60"></div>
          
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="block mb-4">Our Expert</span>
              <span className="bg-gradient-to-r from-green-700 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
                Doctors
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Maiya Multi Speciality Hospital has some of the best doctors from around the world. 
              They have years of experience, studies done from international institutions & several unique achievements.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/80 glass border border-white/80 rounded-3xl p-8 shadow-2xl">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Search Bar */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search by doctor name or specialty..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-12 bg-white/80 border border-white/80 text-foreground placeholder:text-muted-foreground h-12 rounded-2xl focus:ring-2 focus:ring-green-700/50"
                    />
                  </div>
                </div>
                {/* Specialty Filter */}
                <div className="relative">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => handleSpecialtyFilter(e.target.value)}
                    className="w-full h-12 bg-white/80 border border-white/80 rounded-2xl text-foreground px-4 appearance-none focus:ring-2 focus:ring-blue-400/50"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty} className="bg-white text-foreground">
                        {specialty}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-lg">
              Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
              {selectedSpecialty !== "All Specialties" && ` in ${selectedSpecialty}`}
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="glass border border-white/80 shadow-2xl hover:bg-white/90 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  {/* Doctor Image */}
                  <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-gradient-to-r from-green-700/10 to-blue-400/10">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-green-700 via-blue-400 to-purple-400 flex flex-col items-center justify-center text-white" style={{ display: 'none' }}>
                      <div className="text-2xl font-bold mb-1">
                        {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="text-xs opacity-75">Photo</div>
                    </div>
                  </div>
                  <CardTitle className="text-foreground text-xl mb-2 font-bold">{doctor.name}</CardTitle>
                  <Badge className="bg-gradient-to-r from-green-700/10 to-blue-400/10 text-green-700 border-green-700/30 hover:bg-green-700/20">
                    {doctor.specialty}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Qualifications */}
                  <div className="flex items-center justify-center">
                    <Badge variant="outline" className="bg-white/80 text-green-700 border-green-700/30 font-medium">
                      {doctor.degrees}
                    </Badge>
                  </div>
                  {/* Experience */}
                  <div className="flex items-center justify-center space-x-2 text-foreground font-medium">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{doctor.experience} Experience</span>
                  </div>
                  {/* Timing Info */}
                  <div className="space-y-2 text-center">
                    <div className="flex items-center justify-center space-x-2 text-foreground font-medium">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{doctor.timings}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-foreground font-medium">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{doctor.visitingDays}</span>
                    </div>
                  </div>
                  {/* Consultation Fee */}
                  <div className="text-center">
                    <span className="text-green-700 font-bold text-lg">
                      {doctor.consultationFee}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">consultation</span>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => window.location.href = `/appointment?doctor=${doctor.id}`}
                      className="flex-1 bg-gradient-to-r from-green-700 to-blue-400 hover:from-blue-400 hover:to-purple-400 text-white rounded-2xl shadow-lg hover:shadow-green-700/30 transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button 
                      onClick={() => window.location.href = `/doctor/${doctor.id}`}
                      variant="outline" 
                      className="bg-white/80 border-green-700/30 text-green-700 hover:bg-green-700/10 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredDoctors.length === 0 && (
            <div className="text-center py-16">
              <div className="glass border border-white/80 rounded-3xl p-12 max-w-md mx-auto">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">No doctors found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse all doctors.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("All Specialties");
                    setFilteredDoctors(doctorsData);
                  }}
                  className="mt-4 bg-gradient-to-r from-green-700 to-blue-400 hover:from-blue-400 hover:to-purple-400 text-white rounded-2xl"
                >
                  Show All Doctors
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white/80 glass border-t border-white/80">
        <div className="container mx-auto px-4 text-center">
          <div className="glass border border-white/80 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Need Help Finding the Right Doctor?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you choose the best specialist for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-green-700 to-blue-400 hover:from-blue-400 hover:to-purple-400 text-white rounded-2xl px-8 py-6">
                <Phone className="w-4 h-4 mr-2" />
                Call Us: +91-80-2659-8600
              </Button>
              <Button variant="outline" className="bg-white/80 border-green-700/30 text-green-700 hover:bg-green-700/10 rounded-2xl px-8 py-6">
                Visit Maiya Hospital
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Doctors;