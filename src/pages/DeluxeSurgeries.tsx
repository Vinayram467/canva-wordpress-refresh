import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Activity, 
  Microscope, 
  Zap, 
  Shield, 
  Baby, 
  Truck, 
  Stethoscope,
  Bed,
  Brain,
  Phone,
  Clock,
  Scissors,
  Bone,
  Eye,
  BrainCircuit,
  Pill,
  Syringe,
  Users,
  Award
} from "lucide-react";

const surgeries = [
  {
    name: "Laparoscopic Hernia Repair",
    image: "/Laparoscopic Herina Repair.jpeg",
    slug: "laparoscopic-hernia-repair",
    icon: Scissors,
    description: "Minimally invasive hernia repair using advanced laparoscopic techniques for faster recovery and minimal scarring."
  },
  {
    name: "Laparoscopic Gall Bladder Removal",
    image: "/Laparoscopic GallBlaadder Removal.jpeg",
    slug: "laparoscopic-gall-bladder-removal",
    icon: Activity,
    description: "Advanced laparoscopic cholecystectomy procedure for safe and effective gall bladder removal."
  },
  {
    name: "Laparoscopic Hysterectomy",
    image: "/Laparascopic Hysterectomy.jpeg",
    slug: "laparoscopic-hysterectomy",
    icon: Heart,
    description: "Minimally invasive hysterectomy procedure with reduced recovery time and improved outcomes."
  },
  {
    name: "Arthroscopy",
    image: "/Arthroscopy Surgery .jpeg",
    slug: "arthroscopy",
    icon: Bone,
    description: "Advanced joint examination and treatment using arthroscopic techniques for precise diagnosis and treatment."
  },
  {
    name: "Total Knee Replacement",
    image: "/Total Knee Replacement.jpeg",
    slug: "total-knee-replacement",
    icon: Activity,
    description: "Complete knee joint replacement using state-of-the-art prosthetics and surgical techniques."
  },
  {
    name: "Total Hip Replacement",
    image: "/Total Hip Replacement.jpeg",
    slug: "total-hip-replacement",
    icon: Activity,
    description: "Advanced hip joint replacement procedure for improved mobility and pain relief."
  },
  {
    name: "Kidney Stone Removal",
    image: "/Kidney stone removal.jpeg",
    slug: "kidney-stone-removal",
    icon: Microscope,
    description: "Effective kidney stone removal using modern techniques and equipment."
  },
  {
    name: "DJ Stenting",
    image: "/Dj Stenting.jpeg",
    slug: "dj-stenting",
    icon: Syringe,
    description: "Double J stenting procedure for urinary tract obstruction relief."
  },
  {
    name: "TURP",
    image: "/Transurethral Prostate Resection.jpeg",
    slug: "turp",
    icon: BrainCircuit,
    description: "Transurethral resection of the prostate for benign prostatic hyperplasia treatment."
  },
  {
    name: "Modified Radical Mastectomy",
    image: "/Modified Radical Mastectomy .jpeg",
    slug: "modified-radical-mastectomy",
    icon: Shield,
    description: "Comprehensive breast cancer treatment with advanced surgical techniques."
  },
];

const DeluxeSurgeries = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] bg-[length:400%_400%] animate-gradient flex flex-col">
      <Header />
      
      {/* Banner */}
      <div 
        className="w-full h-screen"
        style={{
          backgroundImage: `url('/deluxe-surgeries-banner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      </div>

      {/* Surgeries Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Deluxe Surgeries
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Using advanced techniques, we offer quick recovery with minimal blood loss, minimal tissue damage, 
            reduced risk of infection, and hence, minimal pain and discomfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {surgeries.map((surgery) => {
            const Icon = surgery.icon;
            return (
              <div key={surgery.slug} className="glass rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={surgery.image} 
                    alt={surgery.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{surgery.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{surgery.description}</p>
                  <Link to={`/deluxe-surgeries/${surgery.slug}`}>
                    <Button className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white rounded-full py-3 transition-all duration-300">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Maiya Hospital Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="glass rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Maiya Hospital for Deluxe Surgeries?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We combine advanced medical technology with compassionate care to provide the best surgical outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Advanced Technology</h3>
              <p className="text-muted-foreground">State-of-the-art operation theaters and cutting-edge surgical equipment</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Expert Surgeons</h3>
              <p className="text-muted-foreground">Highly experienced and specialized surgical team with years of expertise</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Patient Care</h3>
              <p className="text-muted-foreground">Personalized care and comprehensive pre- and post-surgery support</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Quick Recovery</h3>
              <p className="text-muted-foreground">Minimally invasive techniques for faster recovery and reduced hospital stay</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Quality Assurance</h3>
              <p className="text-muted-foreground">Highest standards of medical care and safety protocols</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bed className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Modern Facilities</h3>
              <p className="text-muted-foreground">Comfortable, modern facilities for your complete recovery</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeluxeSurgeries; 