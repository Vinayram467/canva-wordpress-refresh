
import { Phone, Home, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Hospital Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Maiya Hospital</h3>
                <p className="text-emerald-200 text-sm">Excellence in Healthcare</p>
              </div>
            </div>
            <p className="text-emerald-200 mb-4">
              Providing world-class healthcare services with compassion and excellence for over 25 years.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-emerald-200">
                <Phone className="w-4 h-4 mr-2" />
                <span>Emergency: +1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-emerald-200">
                <Home className="w-4 h-4 mr-2" />
                <span>123 Medical Center Drive, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-emerald-200">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#doctors" className="hover:text-white transition-colors">Our Doctors</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Medical Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">Medical Services</h4>
            <ul className="space-y-3 text-emerald-200">
              <li><a href="#" className="hover:text-white transition-colors">Cardiology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Neurology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pediatrics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Orthopedics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Emergency Care</a></li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Operating Hours
            </h4>
            <div className="space-y-3 text-emerald-200">
              <div>
                <div className="font-semibold">Monday - Friday</div>
                <div>8:00 AM - 8:00 PM</div>
              </div>
              <div>
                <div className="font-semibold">Saturday - Sunday</div>
                <div>9:00 AM - 6:00 PM</div>
              </div>
              <div className="text-red-300 font-semibold">
                <div>Emergency Services</div>
                <div>24/7 Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-emerald-200 mb-4 md:mb-0">
              © 2024 Maiya Hospital. All rights reserved.
            </div>
            <div className="flex space-x-6 text-emerald-200">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
