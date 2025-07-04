
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-emerald-800 mb-6">
              About Maiya Hospital
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              For over 25 years, Maiya Hospital has been at the forefront of medical excellence, 
              providing compassionate care and innovative treatments to our community.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our mission is to deliver world-class healthcare services with a patient-centered approach, 
              combining advanced medical technology with the warmth of human care.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-800">ISO 9001</div>
                <div className="text-sm text-gray-600">Certified Quality</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">NABH</div>
                <div className="text-sm text-gray-600">Accredited Hospital</div>
              </div>
            </div>
            
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3">
              Learn More About Us
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop" 
              alt="Hospital Interior"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
