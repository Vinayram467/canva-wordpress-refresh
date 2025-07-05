
import { Button } from "@/components/ui/button";
import { Phone, Clock, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="relative z-50">
      {/* Top Bar with modern gradient */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-900 to-blue-900 text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Emergency: +1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-6PM</span>
            </div>
          </div>
          <div className="text-sm bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-semibold">
            Quality Healthcare for Everyone
          </div>
        </div>
      </div>

      {/* Main Navigation with glass morphism */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent">
                  Maiya Hospital
                </h1>
                <p className="text-sm text-gray-600">Excellence in Healthcare</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300 relative group">
                Home
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300 relative group">
                About
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#services" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300 relative group">
                Services
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#doctors" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300 relative group">
                Doctors
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300 relative group">
                Contact
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                Book Appointment
              </Button>
              <Button variant="ghost" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
