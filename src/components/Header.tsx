
import { Button } from "@/components/ui/button";
import { Phone, Clock, Menu, Shield, Award, Home, Stethoscope, HeartPulse, Users, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Stethoscope },
    { name: 'Specialties', path: '/specialties', icon: HeartPulse },
    { name: 'Doctors', path: '/doctors', icon: Users },
    { name: 'Contact', path: '/contact', icon: MessageSquare }
  ];

  return (
    <header className="relative z-50">
      {/* Modern top bar with enhanced gradient */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-900 to-blue-900 text-white py-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-0 right-40 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
      </div>

      {/* Logo Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-4 relative overflow-hidden">
        {/* Enhanced background animations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          {/* Floating orbs with new animations */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl animate-float-delay"></div>
          {/* Additional decorative elements */}
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/2 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-700"></div>
          <div className="absolute top-1/3 right-1/2 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-1000"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up">
            {/* Animated logo container */}
            <div className="relative group">
              {/* Rotating border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-300 animate-rotate-gradient"></div>
              
              <div className="w-32 h-32 bg-gradient-to-br from-slate-50 to-white backdrop-blur-xl border border-white/20 rounded-2xl p-2 relative transform hover:scale-105 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-400/20 flex items-center justify-center overflow-hidden animate-float-subtle">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                
                <img 
                  src="/lovable-uploads/Maiya_-_LOGOS_page-0004-removebg-preview.png" 
                  alt="Maiya Hospital Logo" 
                  className="w-full h-full object-fill scale-110 group-hover:scale-115 transition-all duration-500 animate-pulse-subtle"
                />
              </div>
            </div>

            {/* Animated text content */}
            <div className="text-center md:text-left space-y-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h1 className="text-2xl md:text-3xl font-bold relative">
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-text relative inline-block">
                  Maiya Multi Speciality Hospital
                  {/* Floating dots decoration */}
                  <span className="absolute -top-1 -right-1 w-1 h-1 bg-emerald-400 rounded-full animate-ping-slow"></span>
                  <span className="absolute -bottom-1 -left-1 w-1 h-1 bg-blue-400 rounded-full animate-ping-slow delay-300"></span>
                </span>
              </h1>
              <p className="text-white/70 text-sm md:text-base mt-1 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                Excellence in Healthcare
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced main navigation */}
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute -top-10 left-40 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute -bottom-10 right-60 w-16 h-16 bg-purple-400/10 rounded-full blur-lg animate-float delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex flex-1 justify-center items-center gap-8">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ${
                      isActive ? 'bg-white/10 text-white' : 'text-white/90 hover:text-white'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-white/70 group-hover:text-emerald-400'} transition-colors duration-300`} />
                    <span className="relative z-10 font-medium">{item.name}</span>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-300"></div>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <Link to="/appointment">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-500/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <span className="relative z-10 font-semibold">Book Appointment</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Button>
              </Link>
              <Button variant="ghost" className="md:hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                <Menu className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes rotate-gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(10px) translateX(-5px); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-rotate-gradient {
          animation: rotate-gradient 8s linear infinite;
        }
        .animate-float-subtle {
          animation: float-subtle 3s ease-in-out infinite;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        .animate-gradient-text {
          animation: gradient-text 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
