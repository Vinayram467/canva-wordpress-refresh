
import { Button } from "@/components/ui/button";
import { Phone, Clock } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-emerald-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Emergency: +1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-6PM</span>
            </div>
          </div>
          <div className="text-sm">
            Quality Healthcare for Everyone
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-emerald-800">Maiya Hospital</h1>
              <p className="text-sm text-gray-600">Excellence in Healthcare</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-emerald-700 font-medium">Home</a>
            <a href="#about" className="text-gray-700 hover:text-emerald-700 font-medium">About</a>
            <a href="#services" className="text-gray-700 hover:text-emerald-700 font-medium">Services</a>
            <a href="#doctors" className="text-gray-700 hover:text-emerald-700 font-medium">Doctors</a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-700 font-medium">Contact</a>
          </div>

          <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2">
            Book Appointment
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
