import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, Phone, Mail, MapPin, Users, Heart, Award, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { appointmentApi } from "@/services/api";

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
  const [successDetails, setSuccessDetails] = useState<null | typeof formData>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appointmentApi.create({
        patientName: formData.patientName,
        patientEmail: formData.email,
        patientPhone: formData.phone,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        reason: formData.reason,
      });
      setSuccessDetails(formData); // Show success card
      toast({
        title: "Appointment Booked!",
        description: "We have received your appointment request.",
      });
      setFormData({ patientName: '', phone: '', email: '', date: '', time: '', reason: '' });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-700/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="block mb-4">Book Your</span>
              <span className="bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent animate-text-glow">
                Appointment
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Schedule your consultation with our expert doctors at Maiya Hospital
            </p>
          </div>

          {/* Appointment Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader className="bg-gradient-to-r from-green-700/10 via-blue-400/10 to-red-500/10 rounded-t-2xl">
                <CardTitle className="text-3xl text-foreground text-center font-extrabold tracking-tight">
                  Appointment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {successDetails ? (
                  <div className="flex flex-col items-center justify-center min-h-[350px]">
                    <CheckCircle className="w-16 h-16 text-green-700 mb-4 animate-bounce" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Your Appointment is Scheduled!</h3>
                    <p className="text-foreground/80 mb-6 text-center max-w-xs">Thank you, <span className="font-semibold text-green-700">{successDetails.patientName}</span>!<br/>Your appointment has been booked. Our team will contact you soon.</p>
                    <div className="w-full max-w-xs glass p-4 border border-white/80 shadow-lg mb-4">
                      <div className="text-foreground/90 mb-1"><b>Name:</b> {successDetails.patientName}</div>
                      <div className="text-foreground/90 mb-1"><b>Email:</b> {successDetails.email}</div>
                      <div className="text-foreground/90 mb-1"><b>Phone:</b> {successDetails.phone}</div>
                      <div className="text-foreground/90 mb-1"><b>Date:</b> {successDetails.date}</div>
                      <div className="text-foreground/90 mb-1"><b>Time:</b> {successDetails.time}</div>
                      {successDetails.reason && <div className="text-foreground/90"><b>Reason:</b> {successDetails.reason}</div>}
                    </div>
                    <div className="text-foreground/60 text-xs">A confirmation will be sent to your email/phone.</div>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-8 p-2">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Patient Information */}
                    <div className="space-y-6 bg-white/60 rounded-2xl p-6 shadow-md border border-white/80">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Patient Information</h3>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-700 w-5 h-5" />
                        <Input
                          name="patientName"
                          placeholder="Full Name"
                          value={formData.patientName}
                          onChange={handleInputChange}
                          className="pl-12 bg-white/80 border border-white/80 text-foreground placeholder:text-muted-foreground h-12 rounded-2xl shadow-sm"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                        <Input
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-12 bg-white/80 border border-white/80 text-foreground placeholder:text-muted-foreground h-12 rounded-2xl shadow-sm"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-12 bg-white/80 border border-white/80 text-foreground placeholder:text-muted-foreground h-12 rounded-2xl shadow-sm"
                          required
                        />
                      </div>
                    </div>
                    {/* Appointment Details */}
                    <div className="space-y-6 bg-white/60 rounded-2xl p-6 shadow-md border border-white/80">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Appointment Details</h3>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-700 w-5 h-5" />
                        <Input
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="pl-12 bg-white/80 border border-white/80 text-foreground h-12 rounded-2xl shadow-sm"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/80 border border-white/80 rounded-2xl text-foreground h-12 shadow-sm"
                          required
                        >
                          <option className="text-foreground bg-white" value="">Select Time</option>
                          <option className="text-foreground bg-white" value="9:00 AM">9:00 AM</option>
                          <option className="text-foreground bg-white" value="10:00 AM">10:00 AM</option>
                          <option className="text-foreground bg-white" value="11:00 AM">11:00 AM</option>
                          <option className="text-foreground bg-white" value="12:00 PM">12:00 PM</option>
                          <option className="text-foreground bg-white" value="1:00 PM">1:00 PM</option>
                          <option className="text-foreground bg-white" value="2:00 PM">2:00 PM</option>
                          <option className="text-foreground bg-white" value="3:00 PM">3:00 PM</option>
                          <option className="text-foreground bg-white" value="4:00 PM">4:00 PM</option>
                          <option className="text-foreground bg-white" value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>
                      <div className="relative">
                        <textarea
                          name="reason"
                          placeholder="Reason for visit (optional)"
                          value={formData.reason}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/80 border border-white/80 rounded-2xl text-foreground placeholder:text-muted-foreground h-24 resize-none shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-green-700 to-blue-400 hover:from-blue-400 hover:to-red-500 text-white px-12 py-4 rounded-2xl text-lg font-semibold transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <Card className="glass shadow-2xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Need Help?</h3>
                <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-700" />
                    <span>070223 16149</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>info@maiyahospital.in</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center space-x-3 text-muted-foreground">
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
            <div className="absolute top-20 left-20 w-32 h-32 bg-green-700 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-400 rounded-full blur-xl animate-pulse delay-500"></div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-100/30 to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="bg-gradient-to-r from-green-700 to-blue-400 bg-clip-text text-transparent">Maiya Hospital</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Excellence in healthcare, backed by numbers
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const { count, ref } = useCountAnimation(stat.number);
              const displayNumber = stat.number === 15000 ? `${Math.floor(count / 1000)}k` : count;
              return (
                <div 
                  key={index}
                  ref={ref}
                  className="group relative glass p-8 text-center hover:bg-white/80 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in shadow-lg border border-white/80"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-md`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent">
                      {displayNumber}{stat.suffix}
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2 group-hover:text-green-700 transition-colors duration-300">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-blue-400 transition-colors duration-300">
                      {stat.description}
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-blue-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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