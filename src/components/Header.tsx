
import { Button } from "@/components/ui/button";
import { Phone, Clock, Menu, Shield, Award, Home, Stethoscope, HeartPulse, Users, MessageSquare, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Stethoscope },
    { name: 'Specialties', path: '/specialties', icon: HeartPulse },
    { name: 'Doctors', path: '/doctors', icon: Users },
    { name: 'Blogs', path: '/blogs', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: MessageSquare }
  ];

  return (
    <header className="relative z-50">
      {/* Modern top bar with enhanced gradient */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-emerald-950 text-white py-4 relative overflow-hidden">
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
      <div className="relative py-10 md:py-16 flex items-center justify-center overflow-visible">
        {/* Enhanced background animations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-900 via-blue-950 to-emerald-950 opacity-80"></div>
          {/* Floating orbs with new animations, using theme colors */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-float-delay"></div>
          {/* Decorative blurred orb behind logo/text, using theme color */}
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in-up relative z-10">
          {/* Animated logo container */}
          <div className="relative group shadow-2xl">
            {/* Rotating border effect with theme colors */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-300 animate-rotate-gradient"></div>
            <div className="w-36 h-36 bg-white backdrop-blur-md border border-blue-100/30 rounded-3xl flex items-center justify-center overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-400/20 animate-float-subtle">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none"></div>
              <img 
                src="/lovable-uploads/Maiya_-_LOGOS_page-0004-removebg-preview.png" 
                alt="Maiya Hospital Logo" 
                className="w-full h-full object-cover scale-110 transition-all duration-500 animate-pulse-subtle"
              />
            </div>
          </div>
          {/* Animated text content */}
          <div className="flex flex-col items-start md:items-start gap-2">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight relative">
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-text relative inline-block drop-shadow-[0_2px_16px_rgba(80,200,255,0.18)]">
                Maiya Multi Speciality Hospital
                {/* Floating dots decoration */}
                <span className="absolute -top-2 -right-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping-slow"></span>
                <span className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping-slow delay-300"></span>
              </span>
              {/* Decorative accent underline */}
              <span className="block mt-2 h-1 w-24 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-full opacity-60 animate-fade-in-up"></span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mt-1 animate-fade-in-up font-medium drop-shadow-[0_1px_8px_rgba(80,200,255,0.10)]" style={{ animationDelay: '400ms' }}>
              Excellence in Healthcare
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced main navigation */}
      <nav className="relative z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-950 to-emerald-950/80 backdrop-blur-xl border-b border-white/20 shadow-2xl rounded-b-3xl" />
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex flex-1 justify-center items-center gap-8">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ${
                      isActive ? 'bg-gradient-to-r from-emerald-400/20 to-blue-400/20 text-white shadow-lg' : 'text-white/90 hover:text-white'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-white/70 group-hover:text-emerald-400'} transition-colors duration-300`} />
                    <span className="relative z-10 font-medium">{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-full blur-sm animate-gradient-text"></span>
                    )}
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
