import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation,
  Send,
  MessageCircle,
  Heart
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { messageApi } from "@/services/api";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await messageApi.create(formData);
      toast({
        title: "Message Sent!",
        description: "Your message has been sent. A confirmation email has been sent to your email address.",
      });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg animate-float opacity-80"></div>
          <div className="absolute top-60 right-20 w-4 h-12 bg-gradient-to-b from-red-500 to-pink-500 rounded-full animate-float delay-300 opacity-70"></div>
          <div className="absolute bottom-40 left-32 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-float delay-700 opacity-60"></div>
          
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="block mb-4">Contact</span>
              <span className="bg-gradient-to-r from-green-600 via-blue-400 to-red-500 bg-clip-text text-transparent animate-text-glow">
                Maiya Hospital
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Get in touch with us for appointments, inquiries, or emergency medical care
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="glass border border-white/80 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-foreground text-2xl flex items-center">
                    <MapPin className="mr-3 text-green-600" />
                    Hospital Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Maiya Multi Speciality Hospital<br />
                    34, 10th Main Rd, Jayanagar 1st Block<br />
                    Bengaluru, Karnataka 560011<br />
                    India
                  </p>
                  <Button className="bg-gradient-to-r from-green-600 to-red-500 hover:from-green-700 hover:to-red-600 text-white rounded-2xl">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass border border-white/80 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-foreground text-2xl flex items-center">
                    <Phone className="mr-3 text-green-600" />
                    Phone Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Emergency:</span>
                      <span className="text-green-600 font-semibold">+91 98450 12345</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Reception:</span>
                      <span className="text-red-500 font-semibold">70223 16149 / 74060 07777</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Landline:</span>
                      <span className="text-blue-600 font-semibold">080-41000980</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border border-white/80 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-foreground text-2xl flex items-center">
                    <Clock className="mr-3 text-green-600" />
                    Hospital Timings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">24/7, 365 Days:</span>
                      <span className="text-green-600 font-semibold">Always Open</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Emergency:</span>
                      <span className="text-red-500 font-semibold">24/7 Available</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Services:</span>
                      <span className="text-blue-600 font-semibold">Round the Clock</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="glass border border-white/80 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-foreground text-2xl flex items-center">
                  <MessageCircle className="mr-3 text-green-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        placeholder="Your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-white/80 border-gray-300 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        placeholder="Your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-white/80 border-gray-300 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email Address</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/80 border-gray-300 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white/80 border-gray-300 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground">Subject</Label>
                    <Input 
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-white/80 border-gray-300 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-white/80 border-gray-300 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-red-500 hover:from-green-700 hover:to-red-600 text-white rounded-2xl py-6 text-lg font-semibold shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1 transition-all duration-300">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 max-w-2xl mx-auto">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Medical Emergency?</h3>
            <p className="text-muted-foreground mb-6">
              For immediate medical attention, call our emergency number or visit our emergency department.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-red-500/30">
              <Phone className="w-5 h-5 mr-2" />
              Emergency: +91 98450 12345
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;