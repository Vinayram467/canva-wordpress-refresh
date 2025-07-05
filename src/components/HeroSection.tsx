
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Award, Clock, Sparkles, Heart, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-blue-900/30 overflow-hidden">
      {/* Ultra-modern animated background */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-emerald-400 rotate-45 animate-bounce delay-100"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-red-400 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-40 left-20 w-2 h-8 bg-blue-400 animate-pulse delay-500"></div>
        <div className="absolute top-60 right-40 w-6 h-6 border-2 border-emerald-300 rounded-full animate-spin delay-700"></div>
        
        {/* Dynamic gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-red-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500 opacity-50"></div>
        
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-200/10 to-transparent animate-gradient transform rotate-12"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent via-blue-200/10 to-transparent animate-gradient delay-1000 transform -rotate-12"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Content - Enhanced animations */}
          <div className="space-y-8">
            {/* Animated trust badges */}
            <div className="flex items-center space-x-6 text-sm text-white/80 animate-fade-in">
              <div className="flex items-center space-x-2 glass px-3 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Shield className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2 glass px-3 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Award className="w-4 h-4 text-yellow-400 animate-bounce" />
                <span>NABH Accredited</span>
              </div>
              <div className="flex items-center space-x-2 glass px-3 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Clock className="w-4 h-4 text-red-400 animate-spin" />
                <span>24/7 Emergency</span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight animate-slide-up">
                <span className="text-white drop-shadow-2xl">Your Health,</span>
                <br />
                <span className="gradient-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  Our Priority
                </span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg animate-fade-in delay-300 backdrop-blur-sm">
                Experience world-class healthcare with cutting-edge technology, 
                compassionate care, and a team of renowned medical professionals.
              </p>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-500">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-2 hover:scale-110 transition-all duration-500 btn-modern">
                <Sparkles className="mr-2 w-5 h-5 animate-spin" />
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              
              <Button className="group relative overflow-hidden glass border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 hover:scale-110 transition-all duration-500 btn-modern">
                <Play className="mr-2 w-5 h-5 animate-pulse" />
                Virtual Tour
                <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </div>

            {/* Animated stats with enhanced effects */}
            <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in delay-700">
              <div className="text-center glass p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <div className="text-4xl font-bold text-emerald-400 animate-bounce group-hover:scale-125 transition-transform duration-300">25+</div>
                <div className="text-sm text-white/80">Years Experience</div>
                <Heart className="w-4 h-4 mx-auto mt-2 text-emerald-400 animate-pulse" />
              </div>
              <div className="text-center glass p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <div className="text-4xl font-bold text-red-400 animate-bounce delay-200 group-hover:scale-125 transition-transform duration-300">50+</div>
                <div className="text-sm text-white/80">Expert Doctors</div>
                <Shield className="w-4 h-4 mx-auto mt-2 text-red-400 animate-pulse delay-200" />
              </div>
              <div className="text-center glass p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <div className="text-4xl font-bold text-blue-400 animate-bounce delay-400 group-hover:scale-125 transition-transform duration-300">10k+</div>
                <div className="text-sm text-white/80">Happy Patients</div>
                <Sparkles className="w-4 h-4 mx-auto mt-2 text-blue-400 animate-spin" />
              </div>
            </div>
          </div>

          {/* Right Content - Ultra-modern 3D effect */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative perspective-1000">
              {/* Main image with 3D transform */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:rotateY-5 hover:rotateX-5 hover:scale-105 transition-all duration-700 preserve-3d">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=700&fit=crop" 
                  alt="Modern Healthcare"
                  className="w-full h-[600px] object-cover hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-400/20"></div>
                
                {/* Animated overlay elements */}
                <div className="absolute top-4 right-4 glass p-3 rounded-full animate-bounce">
                  <Heart className="w-6 h-6 text-red-400 animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-4 glass p-3 rounded-full animate-bounce delay-500">
                  <Shield className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Enhanced floating cards with 3D effects */}
              <div className="absolute -left-12 top-16 glass p-6 rounded-3xl shadow-2xl animate-float hover:rotate-3 hover:scale-110 transition-all duration-500 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center animate-spin">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Safe & Secure</div>
                    <div className="text-sm text-white/80">Advanced Safety</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-12 bottom-16 glass p-6 rounded-3xl shadow-2xl animate-float delay-500 hover:-rotate-3 hover:scale-110 transition-all duration-500 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">24/7 Available</div>
                    <div className="text-sm text-white/80">Emergency Care</div>
                  </div>
                </div>
              </div>

              {/* Multiple background layers for depth */}
              <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-3xl blur-sm"></div>
              <div className="absolute -z-20 top-8 left-8 w-full h-full bg-gradient-to-br from-red-400/10 to-purple-400/10 rounded-3xl blur-md"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
        <div className="w-8 h-12 glass rounded-full flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300">
          <div className="w-1 h-3 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full animate-pulse"></div>
          <ArrowRight className="w-4 h-4 text-white/80 rotate-90 mt-1 animate-bounce delay-200" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
