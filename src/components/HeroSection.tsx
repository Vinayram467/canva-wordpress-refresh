
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Award, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/30 overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-blue-100/20 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-red-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Trust badges */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-red-600" />
                <span>NABH Accredited</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>24/7 Emergency</span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-slide-up">
                <span className="text-slate-800">Your Health,</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-blue-600 bg-clip-text text-transparent">
                  Our Priority
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in delay-300">
                Experience world-class healthcare with cutting-edge technology, 
                compassionate care, and a team of renowned medical professionals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-500">
              <Button className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button variant="outline" className="group border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <Play className="mr-2 w-5 h-5" />
                Virtual Tour
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in delay-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">25+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">50+</div>
                <div className="text-sm text-gray-600">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10k+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
            </div>
          </div>

          {/* Right Content - Modern Image Layout */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=700&fit=crop" 
                  alt="Modern Healthcare"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating cards */}
              <div className="absolute -left-8 top-20 bg-white rounded-2xl p-6 shadow-xl animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Safe & Secure</div>
                    <div className="text-sm text-gray-600">Advanced Safety Protocols</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-20 bg-white rounded-2xl p-6 shadow-xl animate-float delay-500">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">24/7 Available</div>
                    <div className="text-sm text-gray-600">Emergency Services</div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
