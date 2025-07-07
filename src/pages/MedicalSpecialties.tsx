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
  Filter
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const MedicalSpecialties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);

  const specialties = [
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
      id: 2,
      name: "Cardiology",
      description: "Comprehensive heart care including diagnosis and treatment of cardiovascular diseases",
      icon: Heart,
      color: "from-red-500 to-red-600",
      services: ["ECG", "Echocardiography", "Cardiac Catheterization", "Heart Surgery"],
      doctorsCount: 4
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
      id: 4,
      name: "Dermatology",
      description: "Specialized care for skin, hair, and nail conditions and treatments",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
      services: ["Skin Treatments", "Hair Care", "Cosmetic Procedures", "Dermatosurgery"],
      doctorsCount: 2
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
      id: 6,
      name: "General Medicine",
      description: "Primary healthcare and treatment for a wide range of medical conditions",
      icon: User,
      color: "from-teal-500 to-teal-600",
      services: ["Health Checkups", "Chronic Disease Management", "Preventive Care", "Diagnosis"],
      doctorsCount: 5
    },
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
      id: 8,
      name: "Nephrology",
      description: "Specialized care for kidney diseases and related urinary system disorders",
      icon: Activity,
      color: "from-cyan-500 to-cyan-600",
      services: ["Dialysis", "Kidney Transplant", "Chronic Kidney Disease", "Hypertension"],
      doctorsCount: 2
    },
    {
      id: 9,
      name: "Neurology",
      description: "Treatment of nervous system disorders including brain and spinal cord conditions",
      icon: Brain,
      color: "from-pink-500 to-pink-600",
      services: ["Stroke Treatment", "Epilepsy Care", "Parkinson's Disease", "Memory Disorders"],
      doctorsCount: 3
    },
    {
      id: 10,
      name: "Neurosurgery",
      description: "Advanced surgical treatment for brain, spine, and nervous system conditions",
      icon: Brain,
      color: "from-violet-500 to-violet-600",
      services: ["Brain Surgery", "Spine Surgery", "Tumor Removal", "Trauma Surgery"],
      doctorsCount: 2
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
      id: 12,
      name: "Ophthalmology",
      description: "Comprehensive eye care including vision correction and eye disease treatment",
      icon: Eye,
      color: "from-amber-500 to-amber-600",
      services: ["Eye Exams", "Cataract Surgery", "Laser Surgery", "Retinal Care"],
      doctorsCount: 3
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
      id: 16,
      name: "Plastic Surgery",
      description: "Reconstructive and cosmetic surgery for aesthetic and functional improvements",
      icon: Scissors,
      color: "from-fuchsia-500 to-fuchsia-600",
      services: ["Cosmetic Surgery", "Reconstructive Surgery", "Burn Treatment", "Hand Surgery"],
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
      id: 18,
      name: "Pulmonology",
      description: "Specialized care for lung and respiratory system diseases and conditions",
      icon: Stethoscope,
      color: "from-teal-500 to-blue-500",
      services: ["Lung Function Tests", "Asthma Care", "COPD Treatment", "Sleep Studies"],
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
    }
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
              <span className="block mb-4">World-Class Medical</span>
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
                Specialties
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Comprehensive healthcare across 19+ medical specialties with expert doctors and advanced facilities
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search medical specialties..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:ring-2 focus:ring-emerald-400/50 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-white/80 text-lg">
              Showing {displaySpecialties.length} medical specialt{displaySpecialties.length !== 1 ? 'ies' : 'y'}
            </p>
          </div>

          {/* Specialties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displaySpecialties.map((specialty) => {
              const IconComponent = specialty.icon;
              return (
                <Card key={specialty.id} className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    {/* Specialty Icon */}
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${specialty.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <CardTitle className="text-white text-xl mb-2">{specialty.name}</CardTitle>
                    
                    <Badge className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30">
                      {specialty.doctorsCount} Doctors Available
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-white/80 text-center text-sm leading-relaxed">
                      {specialty.description}
                    </p>

                    {/* Services */}
                    <div className="space-y-2">
                      <h4 className="text-white/90 font-semibold text-sm text-center">Key Services:</h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {specialty.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="outline" className="bg-white/5 text-white/70 border-white/20 text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-1 transition-all duration-300">
                        View Doctors
                      </Button>
                      
                      <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* No Results */}
          {searchTerm && displaySpecialties.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-md mx-auto">
                <Search className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No specialties found</h3>
                <p className="text-white/70">
                  Try adjusting your search or browse all specialties.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setFilteredSpecialties([]);
                  }}
                  className="mt-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-2xl"
                >
                  Show All Specialties
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MedicalSpecialties;