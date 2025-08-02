
import { Button } from "@/components/ui/button";
import { Shield, Award, Star, Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-green-700/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <div className="inline-block px-4 py-2 glass rounded-full text-green-700 font-semibold text-sm mb-4 border border-green-700/30">
                About Us
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                About <span className="bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent">Maiya Hospital</span>
              </h2>
            </div>
            
            <div className="space-y-6 animate-fade-in delay-300">
              <p className="text-lg text-foreground leading-relaxed">
                Maiya Hospital, established in 1979, was founded with the mission and vision of providing
                affordable and accessible patient care to the people of South Bangalore.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Today, it stands as a trusted 100-bed facility offering comprehensive healthcare services.
                The hospital also provides cashless insurance treatment, ensuring quality care is within reach for every patient.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8 animate-fade-in delay-500">
              <div className="text-center glass p-6 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-green-700 to-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-700 mb-2">ISO 9001</div>
                <div className="text-sm text-muted-foreground">Certified Quality</div>
              </div>
              <div className="text-center glass p-6 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-red-500 mb-2">NABH</div>
                <div className="text-sm text-muted-foreground">Accredited Hospital</div>
              </div>
            </div>
            
            <div className="animate-fade-in delay-700">
              <Button className="bg-gradient-to-r from-green-700 to-blue-400 hover:from-green-800 hover:to-blue-500 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More About Us
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-in delay-300">
            <div className="relative glass rounded-3xl p-8 shadow-2xl">
              <img 
                src="/WhatsApp Image 2025-08-02 at 13.56.25_72778400.jpg" 
                alt="Maiya Multi Speciality Hospital Building"
                className="w-full h-auto max-h-[600px] object-contain rounded-2xl"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-700 to-blue-400 rounded-2xl p-4 shadow-xl">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-red-500 to-blue-400 rounded-2xl p-4 shadow-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Background blur effects */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-green-700/10 to-blue-400/10 rounded-3xl blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
