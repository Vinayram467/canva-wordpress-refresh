
import { Card, CardContent } from "@/components/ui/card";

const PatientTestimonials = () => {
  const testimonials = [
    {
      name: "Robert Thompson",
      rating: 5,
      comment: "Exceptional care and professional staff. The doctors took time to explain everything and made me feel comfortable throughout my treatment.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&face=center"
    },
    {
      name: "Maria Garcia", 
      rating: 5,
      comment: "Outstanding medical facility with state-of-the-art equipment. The entire team showed genuine care and compassion during my stay.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&face=center"
    },
    {
      name: "David Kim",
      rating: 5,
      comment: "Highly recommend Maiya Hospital. From emergency care to follow-up, every step was handled with utmost professionalism and care.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&face=center"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">What Our Patients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from real patients who have received care at Maiya Hospital
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-emerald-800">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientTestimonials;
