
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-emerald-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 mb-6 leading-tight">
              Modern Healthcare for a 
              <span className="text-red-600"> Better Tomorrow</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Providing comprehensive medical care with cutting-edge technology and compassionate service. 
              Your health is our priority, and your recovery is our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 text-lg">
                Book Appointment
              </Button>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 text-lg">
                Emergency Care
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl p-8 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" 
                alt="Modern Hospital"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
