
import { Button } from "@/components/ui/button";
import { Phone, Clock, Menu, Shield, Award } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative z-50">
      {/* Modern top bar with enhanced gradient */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-900 to-blue-900 text-white py-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-0 right-40 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 flex justify-between items-center text-sm relative z-10">
          <div className="flex items-center space-x-6">
            <div className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <Phone className="w-4 h-4 text-emerald-400 group-hover:animate-pulse" />
              <span className="font-medium">Emergency: +1 (555) 123-4567</span>
            </div>
            <div className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <Clock className="w-4 h-4 text-blue-400 group-hover:animate-pulse" />
              <span className="font-medium">Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-6PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-lg flex items-center justify-center animate-pulse">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-bold animate-text-glow">
              Quality Healthcare for Everyone
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced main navigation */}
      <nav className="bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-emerald-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl sticky top-0 z-40 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute -top-10 left-40 w-20 h-20 bg-emerald-400/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute -bottom-10 right-60 w-16 h-16 bg-blue-400/10 rounded-full blur-lg animate-float delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 group">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 p-2">
                <img 
                  src="/lovable-uploads/7554cf5d-a7c8-4cc7-b0e0-ce8ad3e060e3.png" 
                  alt="Maiya Hospital Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="transform group-hover:translate-x-2 transition-all duration-300">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent animate-text-glow">
                  Maiya Hospital
                </h1>
                <p className="text-sm text-white/70 font-medium">Excellence in Healthcare</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Specialties', path: '/specialties' },
                { name: 'Doctors', path: '/doctors' },
                { name: 'Contact', path: '/contact' }
              ].map((item, index) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className="group relative text-white/90 hover:text-white font-medium transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-500/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                <span className="relative z-10 font-semibold">Book Appointment</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              <Button variant="ghost" className="md:hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                <Menu className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
