
import { Button } from "@/components/ui/button";
import { Shield, Award, Star, Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <div className="inline-block px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full text-emerald-400 font-semibold text-sm mb-4 border border-emerald-500/30">
                About Us
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                About <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Maiya Hospital</span>
              </h2>
            </div>
            
            <div className="space-y-6 animate-fade-in delay-300">
              <p className="text-lg text-white/80 leading-relaxed">
                For over 25 years, Maiya Hospital has been at the forefront of medical excellence, 
                providing compassionate care and innovative treatments to our community.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Our mission is to deliver world-class healthcare services with a patient-centered approach, 
                combining advanced medical technology with the warmth of human care.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8 animate-fade-in delay-500">
              <div className="text-center p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-emerald-400 mb-2">ISO 9001</div>
                <div className="text-sm text-white/70">Certified Quality</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-red-400 mb-2">NABH</div>
                <div className="text-sm text-white/70">Accredited Hospital</div>
              </div>
            </div>
            
            <div className="animate-fade-in delay-700">
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More About Us
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-in delay-300">
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop" 
                alt="Hospital Interior"
                className="w-full h-80 object-cover rounded-2xl"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-4 shadow-xl">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-4 shadow-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Background blur effects */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
