import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, Phone, Mail, MapPin, Users, Heart, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Custom hook for counting animation
const useCountAnimation = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = countRef.current;
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      if (progress < 1) {
        const nextCount = Math.floor(startValue + (end - startValue) * progress);
        setCount(nextCount);
        countRef.current = nextCount;
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
        countRef.current = end;
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, isInView]);

  return { count, ref: elementRef };
};

const AppointmentBooking = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctor');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    reason: ''
  });

  const stats = [
    { 
      number: 50, 
      suffix: "+",
      label: "Expert Doctors", 
      icon: Users,
      description: "Specialists across departments",
      color: "from-emerald-500 to-emerald-600"
    },
    { 
      number: 15000, 
      suffix: "+",
      label: "Patients Served", 
      icon: Heart,
      description: "Trust and satisfaction",
      color: "from-blue-500 to-blue-600"
    },
    { 
      number: 98, 
      suffix: "%",
      label: "Success Rate", 
      icon: Award,
      description: "Quality healthcare delivery",
      color: "from-purple-500 to-purple-600"
    },
    { 
      number: 24, 
      suffix: "/7",
      label: "Available", 
      icon: Clock,
      description: "Round-the-clock service",
      color: "from-red-500 to-red-600"
    }
  ];

  // This would normally fetch doctor data from the doctors list
  useEffect(() => {
    if (doctorId) {
      // Mock doctor data - in real app, fetch from API
      setSelectedDoctor({
        name: "Dr. Selected Doctor",
        specialty: "Specialty",
        consultationFee: "₹600"
      });
    }
  }, [doctorId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle appointment booking logic here
    alert('Appointment booked successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block mb-4">Book Your</span>
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
                Appointment
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Schedule your consultation with our expert doctors at Maiya Hospital
            </p>
          </div>

          {/* Appointment Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white text-center">
                  Appointment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Patient Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Patient Information</h3>
                      
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                        <Input
                          name="patientName"
                          placeholder="Full Name"
                          value={formData.patientName}
                          onChange={handleInputChange}
                          className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-2xl"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                        <Input
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-2xl"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-2xl"
                          required
                        />
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Appointment Details</h3>
                      
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                        <Input
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="pl-12 bg-white/10 border-white/20 text-white h-12 rounded-2xl"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white h-12"
                          required
                        >
                          <option value="">Select Time</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>

                      <div className="relative">
                        <textarea
                          name="reason"
                          placeholder="Reason for visit (optional)"
                          value={formData.reason}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/50 h-24 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Need Help?</h3>
                <div className="grid md:grid-cols-2 gap-6 text-white/80">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-400" />
                    <span>070223 16149</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>info@maiyahospital.in</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center space-x-3 text-white/80">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="text-center">34, 10th Main Rd, Jayanagar 1st Block, Bengaluru</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-400 rounded-full blur-xl animate-pulse delay-500"></div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Maiya Hospital</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Excellence in healthcare, backed by numbers
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const { count, ref } = useCountAnimation(stat.number);
              const displayNumber = stat.number === 15000 ? `${Math.floor(count / 1000)}k` : count;

              return (
                <div 
                  key={index}
                  ref={ref}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      {displayNumber}{stat.suffix}
                    </div>
                    
                    <div className="text-base font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                    
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.description}
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AppointmentBooking;