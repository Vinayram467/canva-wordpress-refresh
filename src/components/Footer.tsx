
import { Phone, Home, Clock, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden rounded-t-3xl border-t-2 border-emerald-400/30 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 text-emerald-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-80 h-80 bg-lime-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Hospital Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-300 to-lime-200 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-300/40 ring-1 ring-emerald-300/40">
                <span className="text-emerald-800 font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                  Maiya Hospital
                </h3>
                <p className="text-emerald-800/80 text-sm">Excellence in Healthcare</p>
              </div>
            </div>
            <p className="text-emerald-900/80 leading-relaxed">
              Providing world-class healthcare services with compassion and excellence for over 46 years.
            </p>
            <div className="space-y-3">
              <div className="flex items-center rounded-lg p-3 bg-white/60 backdrop-blur-md border border-emerald-200/60 hover:bg-white/70 hover:border-emerald-300 transition">
                <Phone className="w-4 h-4 mr-3 text-emerald-600" />
                <span>Emergency: +91 7406007777</span>
              </div>
              <div className="flex items-center rounded-lg p-3 bg-white/60 backdrop-blur-md border border-emerald-200/60 hover:bg-white/70 hover:border-emerald-300 transition">
                <Phone className="w-4 h-4 mr-3 text-emerald-600" />
                <span>Reception: 70223 16149 / 74060 07777</span>
              </div>
              <div className="flex items-center rounded-lg p-3 bg-white/60 backdrop-blur-md border border-emerald-200/60 hover:bg-white/70 hover:border-emerald-300 transition">
                <Home className="w-4 h-4 mr-3 text-emerald-600" />
                <span>34, 10th Main Rd, Jayanagar 1st Block, Bengaluru, Karnataka 560011</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-emerald-900">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                Home
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="/#about" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                About Us
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="/services" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                Our Services
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="/doctors" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                Our Doctors
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="/contact" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                Contact Us
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
            </ul>
          </div>

          {/* Medical Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-emerald-900">Medical Services</h4>
            <ul className="space-y-3">
              <li><a href="/specialty/cardiology" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                Cardiology
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="/specialty/neurology" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                Neurology
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="/specialty/pediatrics" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                Pediatrics
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="/specialty/orthopedics" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                Orthopedics
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
              <li><a href="/service/emergency-services" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300 relative group">
                Emergency Care
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300"></div>
              </a></li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center text-emerald-900">
              <Clock className="w-5 h-5 mr-2 text-emerald-600" />
              Operating Hours
            </h4>
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-white/60 backdrop-blur-md border border-emerald-200/60 hover:bg-white/70 hover:border-emerald-300 transition">
                <div className="font-semibold text-emerald-900">24/7, 365 Days</div>
                <div className="text-emerald-800/80">Always Open</div>
              </div>
              <div className="rounded-lg p-4 bg-white/60 backdrop-blur-md border border-emerald-200/60 hover:bg-white/70 hover:border-emerald-300 transition">
                <div className="font-semibold text-emerald-900">Emergency Services</div>
                <div className="text-emerald-800/80">Available Round the Clock</div>
              </div>
              <div className="bg-gradient-to-r from-rose-400/30 to-amber-300/20 rounded-lg p-4 border border-rose-300/40 backdrop-blur-md">
                <div className="font-semibold text-rose-700 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Emergency Services
                </div>
                <div className="text-rose-700/90">24/7 Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-300/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-emerald-800 mb-4 md:mb-0">
              © 2024 Maiya Hospital. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-emerald-800 hover:text-emerald-900 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
