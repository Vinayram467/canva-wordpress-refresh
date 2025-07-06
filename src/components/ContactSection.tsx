
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Clock, Home, Mail, Send, Sparkles } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-32 left-32 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-40 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm mb-6 transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Contact Us</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">Get In</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
              Touch
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Have questions or need assistance? We're here to help you with all your healthcare needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced contact information */}
          <div className="space-y-8 animate-fade-in delay-300">
            {[
              {
                title: "Contact Information",
                icon: Phone,
                color: "from-red-500 to-red-600",
                content: [
                  { label: "Emergency Hotline", value: "+1 (555) 123-4567", highlight: true },
                  { label: "General Inquiries", value: "+1 (555) 123-4568", highlight: false },
                  { label: "Email", value: "info@maiyahospital.com", highlight: false }
                ]
              },
              {
                title: "Operating Hours",
                icon: Clock,
                color: "from-blue-500 to-blue-600",
                content: [
                  { label: "Monday - Friday:", value: "8:00 AM - 8:00 PM", highlight: false },
                  { label: "Saturday - Sunday:", value: "9:00 AM - 6:00 PM", highlight: false },
                  { label: "Emergency Services:", value: "24/7 Available", highlight: true }
                ]
              },
              {
                title: "Our Location",
                icon: Home,
                color: "from-emerald-500 to-emerald-600",
                content: [
                  { label: "", value: "123 Medical Center Drive\nHealthcare District\nNew York, NY 10001\nUnited States", highlight: false }
                ]
              }
            ].map((section, index) => (
              <Card key={index} className="group bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <CardHeader className="relative z-10">
                  <CardTitle className="text-white flex items-center text-xl group-hover:text-emerald-400 transition-colors duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center mr-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 relative z-10">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className={item.highlight ? "p-3 bg-red-500/20 rounded-lg border border-red-500/30" : ""}>
                      <div className="flex justify-between items-start">
                        {item.label && <span className="font-semibold text-white/90 group-hover:text-white transition-colors duration-300">{item.label}</span>}
                        <span className={`${item.highlight ? 'text-red-400 font-bold text-lg' : 'text-white/80 group-hover:text-white/90'} transition-colors duration-300 whitespace-pre-line text-right flex-1 ${item.label ? 'ml-4' : ''}`}>
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced contact form */}
          <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fade-in delay-500 relative overflow-hidden">
            {/* Gradient header */}
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-t-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <CardTitle className="text-3xl font-bold relative z-10 flex items-center">
                <Mail className="w-8 h-8 mr-3" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 p-8 relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-b-2xl"></div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="group">
                  <Label htmlFor="contactFirstName" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">First Name</Label>
                  <Input 
                    id="contactFirstName" 
                    placeholder="John" 
                    className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>
                <div className="group">
                  <Label htmlFor="contactLastName" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Last Name</Label>
                  <Input 
                    id="contactLastName" 
                    placeholder="Doe" 
                    className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="contactEmail" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Email</Label>
                <Input 
                  id="contactEmail" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="contactPhone" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Phone Number</Label>
                <Input 
                  id="contactPhone" 
                  placeholder="+1 (555) 123-4567" 
                  className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="subject" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="How can we help you?" 
                  className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="message" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Message</Label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300 resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/30 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
