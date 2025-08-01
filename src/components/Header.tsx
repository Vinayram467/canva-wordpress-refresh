
import { Button } from "@/components/ui/button";
import { Phone, Clock, Menu, Shield, Award, Home, Stethoscope, HeartPulse, Users, MessageSquare, BookOpen, Activity, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Stethoscope },
    { name: 'Deluxe Surgeries', path: '/deluxe-surgeries', icon: Activity },
    { name: 'Specialties', path: '/specialties', icon: HeartPulse },
    { name: 'Doctors', path: '/doctors', icon: Users },
    { name: 'Blogs', path: '/blogs', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: MessageSquare }
  ];

  return (
    <header className="relative z-50">
      {/* Modern top bar with enhanced gradient */}
      <div className="glass text-foreground py-4 relative overflow-hidden">
        {/* Animated background elements */}
                  <div className="absolute inset-0">
            <div className="absolute top-0 left-20 w-32 h-32 bg-green-600/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-0 right-40 w-24 h-24 bg-pink-400/10 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-6">
            <div className="group flex items-center space-x-2 glass rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
              <Phone className="w-4 h-4 text-green-600 group-hover:animate-pulse" />
              <span className="font-medium">Emergency: +1 (555) 123-4567</span>
            </div>
            <div className="group flex items-center space-x-2 glass rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
              <Clock className="w-4 h-4 text-red-500 group-hover:animate-pulse" />
              <span className="font-medium">Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-6PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-green-600 to-red-500 rounded-lg flex items-center justify-center animate-pulse">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm bg-gradient-to-r from-green-600 to-red-500 bg-clip-text text-transparent font-bold animate-text-glow">
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
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-100 via-red-100 to-green-100 opacity-80"></div>
          {/* Floating orbs with new animations, using theme colors */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-green-200/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-red-200/20 rounded-full blur-3xl animate-float-delay"></div>
          {/* Decorative blurred orb behind logo/text, using theme color */}
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in-up relative z-10">
          {/* Animated logo container */}
          <div className="relative group shadow-2xl">
            {/* Rotating border effect with theme colors */}
            <div className="absolute -inset-2 bg-gradient-to-r from-green-600 via-red-500 to-green-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-300 animate-rotate-gradient"></div>
            <div className="w-48 h-48 bg-white/80 backdrop-blur-md border border-blue-100/30 rounded-3xl flex items-center justify-center overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-400/20 animate-float-subtle">
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
              <span className="bg-gradient-to-r from-green-600 via-red-500 to-green-600 bg-clip-text text-transparent animate-gradient-text relative inline-block drop-shadow-[0_2px_16px_rgba(80,200,255,0.18)]">
                Maiya Multi Speciality Hospital
                {/* Floating dots decoration */}
                <span className="absolute -top-2 -right-2 w-2 h-2 bg-green-600 rounded-full animate-ping-slow"></span>
                <span className="absolute -bottom-2 -left-2 w-2 h-2 bg-red-500 rounded-full animate-ping-slow delay-300"></span>
              </span>
              {/* Decorative accent underline */}
              <span className="block mt-2 h-1 w-24 bg-gradient-to-r from-green-600 via-red-500 to-green-600 rounded-full opacity-60 animate-fade-in-up"></span>
            </h1>
            <p className="text-foreground text-lg md:text-xl mt-1 animate-fade-in-up font-medium drop-shadow-[0_1px_8px_rgba(80,200,255,0.10)]" style={{ animationDelay: '400ms' }}>
              Excellence in Healthcare
            </p>
          </div>
        </div>
      </div>

      {/* CloudNine Style Navigation */}
      <nav className="relative z-20 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-32">
            {/* Logo Section - Left - 90px logo size */}
            <div className="flex items-center mr-8">
              <Link to="/" className="flex items-center group">
                <img 
                  src="/lovable-uploads/Maiya_-_LOGOS_page-0004-removebg-preview.png" 
                  alt="Maiya Hospital Logo" 
                  className="h-full w-auto py-1 object-contain transition-all duration-300 group-hover:scale-110"
                />
              </Link>
            </div>

            {/* Navigation Items - Center */}
            <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-green-600/20 to-red-500/20 text-green-600 shadow-md' 
                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${
                      isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'
                    }`} />
                    <span className="relative z-10">{item.name}</span>
                    {item.name === 'Deluxe Surgeries' && (
                      <span className="ml-1 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">New</span>
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-green-600 to-red-500 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side - Search and Buttons */}
            <div className="flex items-center space-x-4 ml-8">
              {/* Search Icon */}
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-lg hover:bg-gray-100/80">
                <Search className="w-5 h-5" />
              </button>

              {/* Appointment Button */}
              <Link to="/appointment">
                <Button className="bg-gradient-to-r from-green-600 to-red-500 hover:from-green-700 hover:to-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Book Appointment
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button variant="ghost" className="lg:hidden p-2 hover:bg-gray-100/80 rounded-lg">
                <Menu className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-gray-200/50">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-600/20 to-red-500/20 text-green-600' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50/80'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-green-600' : 'text-gray-500'
                  }`} />
                  <span>{item.name}</span>
                  {item.name === 'Deluxe Surgeries' && (
                    <span className="ml-auto px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">New</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <style>{`
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
