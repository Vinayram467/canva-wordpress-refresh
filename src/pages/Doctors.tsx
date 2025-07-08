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
  // Anaesthesia
  { id: "1", name: "Dr. Rajesh Kumar", specialty: "Anaesthesia", degrees: "MBBS, MD", experience: "15 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/placeholder-doctor-1.jpg" },
  { id: "2", name: "Dr. Priya Sharma", specialty: "Anaesthesia", degrees: "MBBS, DA", experience: "12 Years", visitingDays: "Mon–Fri", timings: "8AM – 4PM", consultationFee: "₹650", image: "/placeholder-doctor-2.jpg" },
  
  // Cardiology
  { id: "3", name: "Dr. Hrishikesh Vemula", specialty: "Cardiology", degrees: "MBBS, MD, DM", experience: "20 Years", visitingDays: "Mon–Sat", timings: "5PM – 7PM", consultationFee: "₹800", image: "/placeholder-doctor-3.jpg" },
  { id: "4", name: "Dr. Lakshmikanth P", specialty: "Cardiology", degrees: "MBBS, MD, DM", experience: "30 Years", visitingDays: "Mon–Sat", timings: "2PM – 4PM", consultationFee: "₹800", image: "/placeholder-doctor-4.jpg" },
  { id: "5", name: "Dr. Arun Nair", specialty: "Cardiology", degrees: "MBBS, MD", experience: "18 Years", visitingDays: "Tue–Sun", timings: "10AM – 2PM", consultationFee: "₹750", image: "/placeholder-doctor-5.jpg" },
  
  // Dentistry
  { id: "6", name: "Dr. Meera Patel", specialty: "Dentistry", degrees: "BDS, MDS", experience: "14 Years", visitingDays: "Mon–Sat", timings: "9AM – 6PM", consultationFee: "₹500", image: "/placeholder-doctor-6.jpg" },
  { id: "7", name: "Dr. Suresh Reddy", specialty: "Dentistry", degrees: "BDS", experience: "10 Years", visitingDays: "Mon–Fri", timings: "2PM – 8PM", consultationFee: "₹450", image: "/placeholder-doctor-7.jpg" },
  
  // Dermatology
  { id: "8", name: "Dr. Kavitha Rao", specialty: "Dermatology", degrees: "MBBS, MD", experience: "16 Years", visitingDays: "Mon–Sat", timings: "11AM – 7PM", consultationFee: "₹600", image: "/placeholder-doctor-8.jpg" },
  { id: "9", name: "Dr. Amit Singh", specialty: "Dermatology", degrees: "MBBS, DVD", experience: "13 Years", visitingDays: "Tue–Sun", timings: "3PM – 9PM", consultationFee: "₹550", image: "/placeholder-doctor-9.jpg" },
  
  // E.N.T
  { id: "10", name: "Dr. Sanjay Gupta", specialty: "E.N.T", degrees: "MBBS, MS", experience: "19 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹650", image: "/placeholder-doctor-10.jpg" },
  { id: "11", name: "Dr. Lakshmi Devi", specialty: "E.N.T", degrees: "MBBS, DLO", experience: "22 Years", visitingDays: "Mon–Fri", timings: "4PM – 8PM", consultationFee: "₹700", image: "/placeholder-doctor-11.jpg" },
  
  // General Medicine
  { id: "12", name: "Dr. Raghuveer Karanth", specialty: "General Medicine", degrees: "MBBS, DNB", experience: "20 Years", visitingDays: "Mon–Sat", timings: "12PM – 2PM & 8PM – 10PM", consultationFee: "₹600", image: "/placeholder-doctor-12.jpg" },
  { id: "13", name: "Dr. Deepak Joshi", specialty: "General Medicine", degrees: "MBBS, MD", experience: "17 Years", visitingDays: "Daily", timings: "9AM – 1PM", consultationFee: "₹500", image: "/placeholder-doctor-13.jpg" },
  { id: "14", name: "Dr. Sunita Varma", specialty: "General Medicine", degrees: "MBBS", experience: "14 Years", visitingDays: "Mon–Sat", timings: "6PM – 10PM", consultationFee: "₹450", image: "/placeholder-doctor-14.jpg" },
  
  // General Surgery
  { id: "15", name: "Dr. Vikram Mehta", specialty: "General Surgery", degrees: "MBBS, MS", experience: "25 Years", visitingDays: "Mon–Fri", timings: "7AM – 2PM", consultationFee: "₹800", image: "/placeholder-doctor-15.jpg" },
  { id: "16", name: "Dr. Ravi Kumar", specialty: "General Surgery", degrees: "MBBS, MS", experience: "21 Years", visitingDays: "Tue–Sat", timings: "3PM – 7PM", consultationFee: "₹750", image: "/placeholder-doctor-16.jpg" },
  
  // Nephrology
  { id: "17", name: "Dr. Ananya Das", specialty: "Nephrology", degrees: "MBBS, MD, DM", experience: "18 Years", visitingDays: "Mon–Fri", timings: "11AM – 5PM", consultationFee: "₹900", image: "/placeholder-doctor-17.jpg" },
  { id: "18", name: "Dr. Kiran Bhat", specialty: "Nephrology", degrees: "MBBS, MD", experience: "16 Years", visitingDays: "Wed–Sun", timings: "2PM – 6PM", consultationFee: "₹850", image: "/placeholder-doctor-18.jpg" },
  
  // Neurology
  { id: "19", name: "Dr. Ramesh Patel", specialty: "Neurology", degrees: "MBBS, MD, DM", experience: "25 Years", visitingDays: "Mon–Sat", timings: "7PM – 9PM", consultationFee: "₹850", image: "/placeholder-doctor-19.jpg" },
  { id: "20", name: "Dr. Manish Agarwal", specialty: "Neurology", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Tue–Fri", timings: "4PM – 8PM", consultationFee: "₹800", image: "/placeholder-doctor-20.jpg" },
  
  // Neurosurgery
  { id: "21", name: "Dr. Sujay Rao", specialty: "Neurosurgery", degrees: "MBBS, MS, MCH", experience: "35 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹1200", image: "/placeholder-doctor-21.jpg" },
  { id: "22", name: "Dr. Ashwin Kulkarni", specialty: "Neurosurgery", degrees: "MBBS, MS", experience: "28 Years", visitingDays: "Mon–Thu", timings: "8AM – 12PM", consultationFee: "₹1100", image: "/placeholder-doctor-22.jpg" },
  
  // Obstetrics & Gynaecology
  { id: "23", name: "Dr. Sharmila Chennappa", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "20 Years", visitingDays: "Appointment Only", timings: "Appointment Only", consultationFee: "₹600", image: "/placeholder-doctor-23.jpg" },
  { id: "24", name: "Dr. Ishwarya B", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "10 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹500", image: "/placeholder-doctor-24.jpg" },
  { id: "25", name: "Dr. Sushma B N", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS, DGO", experience: "10 Years", visitingDays: "Mon–Sat", timings: "5PM – 7PM", consultationFee: "₹500", image: "/placeholder-doctor-25.jpg" },
  { id: "26", name: "Dr. Nandini Rao", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "15 Years", visitingDays: "Tue–Sat", timings: "10AM – 2PM", consultationFee: "₹550", image: "/placeholder-doctor-26.jpg" },
  
  // Ophthalmology
  { id: "27", name: "Dr. N T Babu", specialty: "Ophthalmology", degrees: "MBBS, DOMS", experience: "15 Years", visitingDays: "Mon–Sat", timings: "10AM – 12PM", consultationFee: "₹600", image: "/placeholder-doctor-27.jpg" },
  { id: "28", name: "Dr. Pooja Hegde", specialty: "Ophthalmology", degrees: "MBBS, MS", experience: "12 Years", visitingDays: "Mon–Fri", timings: "3PM – 7PM", consultationFee: "₹550", image: "/placeholder-doctor-28.jpg" },
  
  // Orthopaedics
  { id: "29", name: "Dr. Sunil Gowda", specialty: "Orthopaedics", degrees: "MBBS, MS", experience: "23 Years", visitingDays: "Mon–Sat", timings: "9AM – 1PM", consultationFee: "₹700", image: "/placeholder-doctor-29.jpg" },
  { id: "30", name: "Dr. Mahesh Iyer", specialty: "Orthopaedics", degrees: "MBBS, MS", experience: "19 Years", visitingDays: "Tue–Sun", timings: "5PM – 9PM", consultationFee: "₹650", image: "/placeholder-doctor-30.jpg" },
  
  // Paediatrics
  { id: "31", name: "Dr. Rekha Menon", specialty: "Paediatrics", degrees: "MBBS, MD", experience: "18 Years", visitingDays: "Mon–Sat", timings: "11AM – 6PM", consultationFee: "₹500", image: "/placeholder-doctor-31.jpg" },
  { id: "32", name: "Dr. Sudhir Rao", specialty: "Paediatrics", degrees: "MBBS, DCH", experience: "16 Years", visitingDays: "Daily", timings: "7PM – 10PM", consultationFee: "₹450", image: "/placeholder-doctor-32.jpg" },
  
  // Physiotherapy
  { id: "33", name: "Dr. Arjun Pillai", specialty: "Physiotherapy", degrees: "BPT, MPT", experience: "11 Years", visitingDays: "Mon–Sat", timings: "8AM – 6PM", consultationFee: "₹350", image: "/placeholder-doctor-33.jpg" },
  { id: "34", name: "Dr. Sneha Jain", specialty: "Physiotherapy", degrees: "BPT", experience: "8 Years", visitingDays: "Mon–Fri", timings: "2PM – 8PM", consultationFee: "₹300", image: "/placeholder-doctor-34.jpg" },
  
  // Plastic Surgery
  { id: "35", name: "Dr. Ramesh Kumar", specialty: "Plastic Surgery", degrees: "MBBS, MS, MCH", experience: "22 Years", visitingDays: "Thu–Sun", timings: "10AM – 4PM", consultationFee: "₹1000", image: "/placeholder-doctor-35.jpg" },
  { id: "36", name: "Dr. Divya Shetty", specialty: "Plastic Surgery", degrees: "MBBS, MS", experience: "14 Years", visitingDays: "Tue–Fri", timings: "3PM – 7PM", consultationFee: "₹900", image: "/placeholder-doctor-36.jpg" },
  
  // Psychiatry
  { id: "37", name: "Dr. Rohit Malhotra", specialty: "Psychiatry", degrees: "MBBS, MD", experience: "17 Years", visitingDays: "Mon–Fri", timings: "6PM – 9PM", consultationFee: "₹700", image: "/placeholder-doctor-37.jpg" },
  { id: "38", name: "Dr. Madhuri Devi", specialty: "Psychiatry", degrees: "MBBS, DPM", experience: "13 Years", visitingDays: "Sat–Wed", timings: "11AM – 5PM", consultationFee: "₹650", image: "/placeholder-doctor-38.jpg" },
  
  // Pulmonology
  { id: "39", name: "Dr. Naveen Bhatt", specialty: "Pulmonology", degrees: "MBBS, MD", experience: "21 Years", visitingDays: "Mon–Sat", timings: "9AM – 1PM", consultationFee: "₹750", image: "/placeholder-doctor-39.jpg" },
  
  // Radiology
  { id: "40", name: "Dr. Santosh Reddy", specialty: "Radiology", degrees: "MBBS, MD", experience: "19 Years", visitingDays: "Mon–Fri", timings: "8AM – 5PM", consultationFee: "₹600", image: "/placeholder-doctor-40.jpg" }
];

const specialties = [
  "All Specialties",
  "Anaesthesia",
  "Cardiology", 
  "Dentistry",
  "Dermatology",
  "E.N.T",
  "General Medicine",
  "General Surgery",
  "Nephrology",
  "Neurology",
  "Neurosurgery",
  "Obstetrics & Gynaecology",
  "Ophthalmology",
  "Orthopaedics",
  "Paediatrics",
  "Physiotherapy",
  "Plastic Surgery",
  "Psychiatry",
  "Pulmonology",
  "Radiology"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950">
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
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block mb-4">Our Expert</span>
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
                Doctors
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Maiya Multi Speciality Hospital has some of the best doctors from around the world. 
              They have years of experience, studies done from international institutions & several unique achievements.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Search Bar */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <Input
                      placeholder="Search by doctor name or specialty..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-2xl focus:ring-2 focus:ring-emerald-400/50"
                    />
                  </div>
                </div>

                {/* Specialty Filter */}
                <div className="relative">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => handleSpecialtyFilter(e.target.value)}
                    className="w-full h-12 bg-white/10 border border-white/20 rounded-2xl text-white px-4 appearance-none focus:ring-2 focus:ring-emerald-400/50"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty} className="bg-slate-800 text-white">
                        {specialty}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-white/80 text-lg">
              Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
              {selectedSpecialty !== "All Specialties" && ` in ${selectedSpecialty}`}
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  {/* Doctor Image */}
                  <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-gradient-to-r from-slate-600 to-slate-700">
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
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-blue-500 flex flex-col items-center justify-center text-white" style={{ display: 'none' }}>
                      <div className="text-2xl font-bold mb-1">
                        {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="text-xs opacity-75">Photo</div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-white text-xl mb-2">{doctor.name}</CardTitle>
                  
                  <Badge className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30">
                    {doctor.specialty}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Qualifications */}
                  <div className="flex items-center justify-center">
                    <Badge variant="outline" className="bg-white/5 text-white/80 border-white/20">
                      {doctor.degrees}
                    </Badge>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center justify-center space-x-2 text-white/80">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{doctor.experience} Experience</span>
                  </div>

                  {/* Timing Info */}
                  <div className="space-y-2 text-center">
                    <div className="flex items-center justify-center space-x-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{doctor.timings}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-white/70">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{doctor.visitingDays}</span>
                    </div>
                  </div>

                  {/* Consultation Fee */}
                  <div className="text-center">
                    <span className="text-emerald-400 font-bold text-lg">
                      {doctor.consultationFee}
                    </span>
                    <span className="text-white/60 text-sm ml-1">consultation</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => window.location.href = `/appointment?doctor=${doctor.id}`}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                    
                    <Button 
                      onClick={() => window.location.href = `/doctor/${doctor.id}`}
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300"
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
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-md mx-auto">
                <Search className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No doctors found</h3>
                <p className="text-white/70">
                  Try adjusting your search criteria or browse all doctors.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("All Specialties");
                    setFilteredDoctors(doctorsData);
                  }}
                  className="mt-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-2xl"
                >
                  Show All Doctors
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Need Help Finding the Right Doctor?</h3>
            <p className="text-white/80 mb-6">
              Our team is here to help you choose the best specialist for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-2xl px-8 py-6">
                <Phone className="w-4 h-4 mr-2" />
                Call Us: +91-80-2659-8600
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl px-8 py-6">
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