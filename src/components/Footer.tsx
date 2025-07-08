
import { Phone, Home, Clock, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Hospital Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Maiya Hospital
                </h3>
                <p className="text-white/70 text-sm">Excellence in Healthcare</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              Providing world-class healthcare services with compassion and excellence for over 25 years.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-white/80 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Phone className="w-4 h-4 mr-3 text-emerald-400" />
                <span>Landline: 080-41000980</span>
              </div>
              <div className="flex items-center text-white/80 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Phone className="w-4 h-4 mr-3 text-emerald-400" />
                <span>Reception: 70223 16149 / 74060 07777</span>
              </div>
              <div className="flex items-center text-white/80 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Home className="w-4 h-4 mr-3 text-blue-400" />
                <span>34, 10th Main Rd, Jayanagar 1st Block, Bengaluru, Karnataka 560011</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                Home
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="#about" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                About Us
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="#services" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                Our Services
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="#doctors" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                Our Doctors
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="#contact" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                Contact Us
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
            </ul>
          </div>

          {/* Medical Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Medical Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                Cardiology
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="#" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                Neurology
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="#" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                Pediatrics
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="#" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                Orthopedics
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="#" className="text-white/70 hover:text-emerald-400 transition-colors duration-300 relative group">
                Emergency Care
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center text-white">
              <Clock className="w-5 h-5 mr-2 text-emerald-400" />
              Operating Hours
            </h4>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-semibold text-white">Monday - Friday</div>
                <div className="text-white/70">8:00 AM - 8:00 PM</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-semibold text-white">Saturday - Sunday</div>
                <div className="text-white/70">9:00 AM - 6:00 PM</div>
              </div>
              <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-lg p-4 border border-red-500/30">
                <div className="font-semibold text-red-300 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Emergency Services
                </div>
                <div className="text-red-200">24/7 Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70 mb-4 md:mb-0">
              © 2024 Maiya Hospital. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/70 hover:text-emerald-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-emerald-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-emerald-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
