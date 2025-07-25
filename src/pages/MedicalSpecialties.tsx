import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Brain, 
  Eye, 
  Baby, 
  Bone, 
  Stethoscope,
  Scissors,
  Syringe,
  Shield,
  Activity,
  User,
  Zap,
  Smile,
  Search,
  Filter,
  Calendar,
  Eye as EyeIcon,
  ArrowLeft
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

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

const MedicalSpecialties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [showDoctors, setShowDoctors] = useState(false);

  const specialties = [
    {
      id: 7,
      name: "General Surgery",
      description: "Comprehensive surgical care for various medical conditions and procedures",
      icon: Scissors,
      color: "from-indigo-500 to-indigo-600",
      services: ["Laparoscopic Surgery", "Emergency Surgery", "Trauma Surgery", "Minimally Invasive"],
      doctorsCount: 4
    },
    {
      id: 6,
      name: "General Medicine",
      description: "Primary healthcare and treatment for a wide range of medical conditions",
      icon: User,
      color: "from-teal-500 to-teal-600",
      services: ["Health Checkups", "Chronic Disease Management", "Preventive Care", "Diagnosis"],
      doctorsCount: 5
    },
    {
      id: 11,
      name: "Obstetrics & Gynaecology",
      description: "Complete women's healthcare including pregnancy, childbirth, and reproductive health",
      icon: Baby,
      color: "from-rose-500 to-rose-600",
      services: ["Pregnancy Care", "Delivery", "Gynecological Surgery", "Family Planning"],
      doctorsCount: 4
    },
    {
      id: 13,
      name: "Orthopaedics",
      description: "Specialized care for bones, joints, muscles, and musculoskeletal system",
      icon: Bone,
      color: "from-slate-500 to-slate-600",
      services: ["Joint Replacement", "Fracture Treatment", "Sports Medicine", "Arthroscopy"],
      doctorsCount: 3
    },
    {
      id: 8,
      name: "Urology",
      description: "Specialized care for urinary tract and male reproductive system disorders",
      icon: Activity,
      color: "from-cyan-500 to-cyan-600",
      services: ["Dialysis", "Kidney Transplant", "Chronic Kidney Disease", "Hypertension"],
      doctorsCount: 2
    },
    {
      id: 2,
      name: "Cardiology",
      description: "Comprehensive heart care including diagnosis and treatment of cardiovascular diseases",
      icon: Heart,
      color: "from-red-500 to-red-600",
      services: ["ECG", "Echocardiography", "Cardiac Catheterization", "Heart Surgery"],
      doctorsCount: 4
    },
    {
      id: 5,
      name: "E.N.T",
      description: "Ear, Nose, and Throat specialist care for related disorders and treatments",
      icon: Stethoscope,
      color: "from-orange-500 to-orange-600",
      services: ["Hearing Tests", "Sinus Treatment", "Throat Surgery", "Voice Disorders"],
      doctorsCount: 3
    },
    {
      id: 16,
      name: "Plastic Surgery",
      description: "Reconstructive and cosmetic surgery for aesthetic and functional improvements",
      icon: Scissors,
      color: "from-fuchsia-500 to-fuchsia-600",
      services: ["Cosmetic Surgery", "Reconstructive Surgery", "Burn Treatment", "Hand Surgery"],
      doctorsCount: 2
    },
    {
      id: 19,
      name: "Radiology",
      description: "Advanced medical imaging and diagnostic services for accurate diagnosis",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      services: ["X-Ray", "CT Scan", "MRI", "Ultrasound"],
      doctorsCount: 3
    },
    {
      id: 18,
      name: "Pulmonology",
      description: "Specialized care for lung and respiratory system diseases and conditions",
      icon: Stethoscope,
      color: "from-teal-500 to-blue-500",
      services: ["Lung Function Tests", "Asthma Care", "COPD Treatment", "Sleep Studies"],
      doctorsCount: 2
    },
    {
      id: 12,
      name: "Ophthalmology",
      description: "Comprehensive eye care including vision correction and eye disease treatment",
      icon: Eye,
      color: "from-amber-500 to-amber-600",
      services: ["Eye Exams", "Cataract Surgery", "Laser Surgery", "Retinal Care"],
      doctorsCount: 3
    },
    {
      id: 10,
      name: "Neurology",
      description: "Advanced surgical treatment for brain, spine, and nervous system conditions",
      icon: Brain,
      color: "from-violet-500 to-violet-600",
      services: ["Brain Surgery", "Spine Surgery", "Tumor Removal", "Trauma Surgery"],
      doctorsCount: 2
    },
    {
      id: 2,
      name: "Cardiology",
      description: "Comprehensive heart care including diagnosis and treatment of cardiovascular diseases",
      icon: Heart,
      color: "from-red-500 to-red-600",
      services: ["ECG", "Echocardiography", "Cardiac Catheterization", "Heart Surgery"],
      doctorsCount: 4
    },
    {
      id: 4,
      name: "Dermatology",
      description: "Specialized care for skin, hair, and nail conditions and treatments",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
      services: ["Skin Treatments", "Hair Care", "Cosmetic Procedures", "Dermatosurgery"],
      doctorsCount: 2
    },
    {
      id: 3,
      name: "Dentistry",
      description: "Complete dental care for oral health, teeth, and gum-related treatments",
      icon: Smile,
      color: "from-green-500 to-green-600",
      services: ["Dental Checkups", "Root Canal", "Teeth Whitening", "Oral Surgery"],
      doctorsCount: 2
    },
    {
      id: 14,
      name: "Paediatrics",
      description: "Specialized medical care for infants, children, and adolescents",
      icon: Baby,
      color: "from-emerald-500 to-emerald-600",
      services: ["Child Health", "Vaccinations", "Growth Monitoring", "Pediatric Surgery"],
      doctorsCount: 3
    },
    {
      id: 15,
      name: "Physiotherapy",
      description: "Rehabilitation and physical therapy for mobility and pain management",
      icon: Activity,
      color: "from-lime-500 to-lime-600",
      services: ["Physical Therapy", "Rehabilitation", "Sports Injury", "Pain Management"],
      doctorsCount: 2
    },
    {
      id: 17,
      name: "Psychiatry",
      description: "Mental health care and treatment for psychological and emotional disorders",
      icon: Brain,
      color: "from-sky-500 to-sky-600",
      services: ["Mental Health", "Counseling", "Therapy", "Psychiatric Care"],
      doctorsCount: 2
    },
    {
      id: 1,
      name: "Anaesthesia",
      description: "Specialized medical care for patients undergoing surgery, ensuring comfort and pain management",
      icon: Syringe,
      color: "from-blue-500 to-blue-600",
      services: ["General Anaesthesia", "Regional Anaesthesia", "Pain Management", "Critical Care"],
      doctorsCount: 3
    },
    {
      id: 20,
      name: "Surgical Gastroenterology",
      description: "Specialized surgical care for gastrointestinal tract and digestive system disorders",
      icon: Scissors,
      color: "from-orange-500 to-pink-500",
      services: ["GI Surgery", "Liver Surgery", "Pancreatic Surgery", "Minimally Invasive GI Procedures"],
      doctorsCount: 1
    },
    {
      id: 21,
      name: "Medical Oncology",
      description: "Comprehensive cancer care and chemotherapy for various malignancies",
      icon: Activity,
      color: "from-pink-500 to-red-500",
      services: ["Chemotherapy", "Cancer Diagnosis", "Targeted Therapy", "Supportive Care"],
      doctorsCount: 1
    },
    {
      id: 22,
      name: "Vascular Surgery",
      description: "Surgical care for blood vessel disorders including arteries and veins",
      icon: Scissors,
      color: "from-blue-500 to-green-500",
      services: ["Bypass Surgery", "Aneurysm Repair", "Varicose Vein Treatment", "Endovascular Procedures"],
      doctorsCount: 1
    },
    {
      id: 23,
      name: "Surgical Oncology",
      description: "Surgical treatment for cancer and tumor removal across specialties",
      icon: Scissors,
      color: "from-red-700 to-pink-700",
      services: ["Tumor Resection", "Cancer Surgery", "Biopsy", "Reconstructive Oncology"],
      doctorsCount: 1
    }
  ];

  // Doctors data
  const doctorsData: Doctor[] = [
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      const filtered = specialties.filter(specialty => 
        specialty.name.toLowerCase().includes(term.toLowerCase()) ||
        specialty.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSpecialties(filtered);
    } else {
      setFilteredSpecialties([]);
    }
  };

  const displaySpecialties = searchTerm ? filteredSpecialties : specialties;

  const handleViewDoctors = (specialtyName: string) => {
    setSelectedSpecialty(specialtyName);
    setShowDoctors(true);
  };

  const handleBackToSpecialties = () => {
    setShowDoctors(false);
    setSelectedSpecialty(null);
  };

  const getDoctorsForSpecialty = (specialtyName: string) => {
    return doctorsData.filter(doctor => doctor.specialty === specialtyName);
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
          {showDoctors && selectedSpecialty && (
            <div className="mb-8">
              <Button 
                onClick={handleBackToSpecialties}
                variant="outline" 
                className="bg-white/60 border border-border text-foreground hover:bg-white/80 rounded-2xl mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Specialties
              </Button>
              <div className="text-center space-y-6 mb-12">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span className="block mb-4">{selectedSpecialty}</span>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-text-glow">
                    Doctors
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Meet our expert doctors specializing in {selectedSpecialty}
                </p>
              </div>
            </div>
          )}

          {!showDoctors && (
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="block mb-4">World-Class Medical</span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-text-glow">
                  Specialties
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Comprehensive healthcare across 19+ medical specialties with expert doctors and advanced facilities
              </p>
            </div>
          )}

          {/* Search Section */}
          {!showDoctors && (
            <>
              <div className="max-w-2xl mx-auto mb-12">
                <div className="glass rounded-3xl p-6 shadow-2xl">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search medical specialties..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-transparent border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-center mb-8">
                <p className="text-muted-foreground text-lg">
                  Showing {displaySpecialties.length} medical specialt{displaySpecialties.length !== 1 ? 'ies' : 'y'}
                </p>
              </div>
            </>
          )}

          {/* Specialties Grid */}
          {!showDoctors && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displaySpecialties.map((specialty) => {
                const IconComponent = specialty.icon;
                return (
                  <Card key={specialty.id} className="glass hover:bg-white/80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                    <CardHeader className="text-center pb-4">
                      {/* Specialty Icon */}
                      <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${specialty.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <CardTitle className="text-foreground text-xl mb-2">{specialty.name}</CardTitle>
                      
                      <Badge className="bg-gradient-to-r from-blue-200/40 to-pink-200/40 text-blue-700 border-blue-200/60 hover:bg-blue-200/60">
                        {specialty.doctorsCount} Doctors Available
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Description */}
                      <p className="text-muted-foreground text-center text-sm leading-relaxed">
                        {specialty.description}
                      </p>

                      {/* Services */}
                      <div className="space-y-2">
                        <h4 className="text-blue-700 font-semibold text-sm text-center">Key Services:</h4>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {specialty.services.slice(0, 3).map((service, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button - Centered */}
                      <div className="pt-4">
                        <Button 
                          onClick={() => handleViewDoctors(specialty.name)}
                          className="w-full bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-blue-200/30 transform hover:-translate-y-1 transition-all duration-300"
                        >
                          View Doctors
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Doctors Grid */}
          {showDoctors && selectedSpecialty && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getDoctorsForSpecialty(selectedSpecialty).map((doctor) => (
                <Card key={doctor.id} className="glass hover:bg-white/80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    {/* Doctor Image */}
                    <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-100 bg-gradient-to-r from-blue-100 to-pink-100">
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
                      <div className="w-full h-full bg-gradient-to-br from-blue-200 to-pink-200 flex flex-col items-center justify-center text-blue-700" style={{ display: 'none' }}>
                        <div className="text-2xl font-bold mb-1">
                          {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="text-xs opacity-75">Photo</div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-foreground text-xl mb-2">{doctor.name}</CardTitle>
                    
                    <Badge className="bg-gradient-to-r from-blue-200/40 to-pink-200/40 text-blue-700 border-blue-200/60 hover:bg-blue-200/60">
                      {doctor.specialty}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Qualifications */}
                    <div className="flex items-center justify-center">
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        {doctor.degrees}
                      </Badge>
                    </div>

                    {/* Experience and Timings */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-blue-700">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">{doctor.experience} Experience</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-blue-700">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">{doctor.visitingDays}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-blue-700">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">{doctor.timings}</span>
                      </div>
                    </div>

                    {/* Consultation Fee */}
                    <div className="text-center">
                      <span className="text-blue-700 font-bold text-lg">
                        {doctor.consultationFee}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1">consultation</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button 
                        onClick={() => window.location.href = `/appointment?doctor=${doctor.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-blue-200/30 transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                      <Button 
                        onClick={() => window.location.href = `/doctor/${doctor.id}`}
                        variant="outline" 
                        className="bg-white/60 border border-border text-foreground hover:bg-white/80 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MedicalSpecialties;