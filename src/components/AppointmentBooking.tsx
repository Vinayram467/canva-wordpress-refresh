
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Sparkles } from "lucide-react";

const AppointmentBooking = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Animated particles */}
        <div className="absolute top-32 right-40 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm mb-6 transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Book Appointment</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">Schedule Your</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
              Visit Today
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Book your appointment in three simple steps and get the care you deserve
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced process steps */}
          <div className="space-y-8 animate-fade-in delay-300">
            {[
              {
                step: "1",
                title: "Choose Your Service",
                description: "Select from our wide range of medical services and specialties",
                icon: User,
                color: "from-emerald-500 to-emerald-600"
              },
              {
                step: "2", 
                title: "Flexible Scheduling",
                description: "Pick a convenient date and time that works with your schedule",
                icon: Calendar,
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "3",
                title: "Quick Confirmation", 
                description: "Receive instant confirmation and reminders for your appointment",
                icon: Clock,
                color: "from-purple-500 to-purple-600"
              }
            ].map((item, index) => (
              <div key={index} className="group flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className={`bg-gradient-to-r ${item.color} text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative overflow-hidden`}>
                  <span className="relative z-10">{item.step}</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1 transform group-hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <item.icon className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors duration-300" />
                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced appointment form */}
          <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fade-in delay-500 relative overflow-hidden">
            {/* Gradient header */}
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-t-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <CardTitle className="text-3xl font-bold relative z-10 flex items-center">
                <Calendar className="w-8 h-8 mr-3" />
                Book Appointment
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 p-8 relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-b-2xl"></div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="group">
                  <Label htmlFor="firstName" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>
                <div className="group">
                  <Label htmlFor="lastName" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="email" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="phone" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 (555) 123-4567" 
                  className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="service" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Select Service</Label>
                <select 
                  id="service" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                >
                  <option className="bg-slate-800">General Consultation</option>
                  <option className="bg-slate-800">Cardiology</option>
                  <option className="bg-slate-800">Neurology</option>
                  <option className="bg-slate-800">Pediatrics</option>
                  <option className="bg-slate-800">Orthopedics</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="group">
                  <Label htmlFor="date" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Preferred Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    className="bg-white/10 border-white/30 text-white focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>
                <div className="group">
                  <Label htmlFor="time" className="text-white/90 group-focus-within:text-emerald-400 transition-colors duration-300 font-semibold">Preferred Time</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    className="bg-white/10 border-white/30 text-white focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                  />
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/30 relative overflow-hidden group">
                <span className="relative z-10">Book Appointment</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBooking;
