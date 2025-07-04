
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-emerald-50 to-blue-50 py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 mb-6 leading-tight animate-slide-up">
              Modern Healthcare for a 
              <span className="text-red-600 relative">
                Better Tomorrow
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-emerald-600 transform scale-x-0 animate-scale-x origin-left delay-1000"></div>
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in delay-500">
              Providing comprehensive medical care with cutting-edge technology and compassionate service. 
              Your health is our priority, and your recovery is our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-700">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Book Appointment
              </Button>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg border-2">
                Emergency Care
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in delay-300">
            <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" 
                alt="Modern Hospital"
                className="w-full h-80 object-cover rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500 rounded-full opacity-80 animate-bounce delay-500"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-500 rounded-full opacity-80 animate-bounce delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
