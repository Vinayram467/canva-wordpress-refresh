
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Sparkles } from "lucide-react";

const PatientTestimonials = () => {
  const testimonials = [
    {
      name: "Robert Thompson",
      rating: 5,
      comment: "Exceptional care and professional staff. The doctors took time to explain everything and made me feel comfortable throughout my treatment.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&face=center",
      location: "New York"
    },
    {
      name: "Maria Garcia", 
      rating: 5,
      comment: "Outstanding medical facility with state-of-the-art equipment. The entire team showed genuine care and compassion during my stay.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&face=center",
      location: "California"
    },
    {
      name: "David Kim",
      rating: 5,
      comment: "Highly recommend Maiya Hospital. From emergency care to follow-up, every step was handled with utmost professionalism and care.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&face=center",
      location: "Texas"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-700/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating elements */}
        <div className="absolute top-32 right-32 w-2 h-2 bg-green-700 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 glass text-green-700 font-semibold text-sm mb-6 transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Patient Reviews</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground drop-shadow-2xl">What Our</span>
            <br />
            <span className="bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent animate-text-glow">
              Patients Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real experiences from real patients who have received care at Maiya Hospital
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group glass hover:bg-white/80 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 animate-fade-in relative overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-700/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-8 relative z-10">
                {/* Quote icon */}
                <div className="mb-6 relative">
                  <Quote className="w-12 h-12 text-green-700/30 absolute -top-2 -left-2" />
                  <Quote className="w-8 h-8 text-green-700 relative z-10" />
                </div>
                
                {/* Rating stars */}
                <div className="flex mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <p className="text-foreground italic mb-8 leading-relaxed group-hover:text-green-700 transition-colors duration-300 text-lg">
                  "{testimonial.comment}"
                </p>
                
                {/* Patient info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-700/30 group-hover:border-green-700/60 transition-all duration-300 shadow-lg"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg group-hover:text-green-700 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-green-700 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300 transition-opacity duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientTestimonials;
