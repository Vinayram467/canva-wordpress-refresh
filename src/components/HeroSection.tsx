import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Award, Clock, Sparkles, Heart, Zap, Star, Users, Video } from "lucide-react";
import { Link } from "react-router-dom";
import HealthAssessment from "./HealthAssessment";

const HeroSection = () => {
  // Scroll to next section function
  const scrollToNextSection = () => {
    const heroSection = document.getElementById('home');
    const nextSection = heroSection?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 overflow-hidden">
      {/* Modern animated background */}
      <div className="absolute inset-0">
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg animate-float opacity-80"></div>
        <div className="absolute top-60 right-20 w-4 h-12 bg-gradient-to-b from-red-500 to-pink-500 rounded-full animate-float delay-300 opacity-70"></div>
        <div className="absolute bottom-40 left-32 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-float delay-700 opacity-60"></div>
        <div className="absolute top-80 right-40 w-3 h-16 bg-gradient-to-t from-yellow-500 to-orange-500 rounded-full animate-float delay-1000 opacity-75"></div>
        
        {/* Large gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-10rem)]">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust badges with new design */}
            <div className="flex flex-wrap gap-3 animate-fade-in">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white font-medium">ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white font-medium">NABH Accredited</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-400"></div>
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-sm text-white font-medium">24/7 Emergency</span>
              </div>
            </div>

            {/* Main heading with fixed text overlap */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight animate-slide-up">
                <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow leading-none mb-4">
                  Maiya Multi Speciality Hospital
                </span>
              </h1>
              
              <div className="space-y-4 text-lg text-white/90 leading-relaxed max-w-2xl animate-fade-in delay-300">
                <p>
                  Maiya Hospital, established in 1979, was founded with the mission and vision of providing
                  affordable and accessible patient care to the people of South Bangalore.
                </p>
                <p>
                  Today, it stands as a trusted 100-bed facility offering comprehensive healthcare services.
                  The hospital also provides cashless insurance treatment, ensuring quality care is within reach for every patient.
                </p>
              </div>
            </div>

            {/* Enhanced button design */}
            <div className="flex flex-wrap gap-4 animate-fade-in delay-500">
              <Link to="/virtual-consultation">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                    <Video className="mr-3 w-5 h-5" />
                    <span>Virtual Consultation</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              </Link>
            </div>

            {/* Enhanced stats design */}
            <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in delay-700">
              <div className="group text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-110">
                <div className="relative mb-4">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text">
                    25+
                  </div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <div className="text-sm text-white/80 font-medium">Years Experience</div>
                <Star className="w-4 h-4 mx-auto mt-2 text-emerald-400 animate-pulse" />
              </div>
              
              <div className="group text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-110">
                <div className="relative mb-4">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text">
                    50+
                  </div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-200"></div>
                </div>
                <div className="text-sm text-white/80 font-medium">Expert Doctors</div>
                <Users className="w-4 h-4 mx-auto mt-2 text-blue-400 animate-pulse delay-200" />
              </div>
              
              <div className="group text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-110">
                <div className="relative mb-4">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text">
                    10k+
                  </div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-400"></div>
                </div>
                <div className="text-sm text-white/80 font-medium">Happy Patients</div>
                <Heart className="w-4 h-4 mx-auto mt-2 text-purple-400 animate-pulse delay-400" />
              </div>
            </div>
          </div>

          {/* Right Content - Health Assessment Tool */}
          <div className="relative animate-fade-in delay-300">
            <HealthAssessment />

            {/* Enhanced floating mini cards */}
            <div className="absolute -top-6 -left-6 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Security</div>
                  <div className="text-white/70 text-xs">100% Safe</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-16 -right-6 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl animate-float delay-500">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Available</div>
                  <div className="text-white/70 text-xs">24/7 Support</div>
                </div>
              </div>
            </div>

            {/* Enhanced background decorative elements */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl blur-sm"></div>
            <div className="absolute -z-20 top-12 left-12 w-full h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-md"></div>
          </div>
        </div>
      </div>

      {/* Functional scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="flex flex-col items-center space-y-2 cursor-pointer group"
          onClick={scrollToNextSection}
        >
          <div className="text-white/60 text-xs font-medium group-hover:text-white/80 transition-colors">Scroll</div>
          <div className="w-6 h-10 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full flex justify-center p-1 group-hover:bg-white/20 transition-all duration-300">
            <div className="w-1 h-3 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
