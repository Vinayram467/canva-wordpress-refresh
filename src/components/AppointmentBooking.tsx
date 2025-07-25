
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Sparkles } from "lucide-react";

const AppointmentBooking = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-700/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Animated particles */}
        <div className="absolute top-32 right-40 w-2 h-2 bg-green-700 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-red-500 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 glass text-green-700 font-semibold text-sm mb-6 transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse text-green-700" />
            <span>Book Appointment</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-foreground">
            <span className="block mb-2">Schedule Your</span>
            <span className="bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent animate-text-glow">
              Visit Today
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                color: "from-green-700 to-blue-400"
              },
              {
                step: "2", 
                title: "Flexible Scheduling",
                description: "Pick a convenient date and time that works with your schedule",
                icon: Calendar,
                color: "from-blue-400 to-red-500"
              },
              {
                step: "3",
                title: "Quick Confirmation", 
                description: "Receive instant confirmation and reminders for your appointment",
                icon: Clock,
                color: "from-red-500 to-green-700"
              }
            ].map((item, index) => (
              <div key={index} className="group flex items-start space-x-6 glass hover:bg-white/80 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className={`bg-gradient-to-r ${item.color} text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative overflow-hidden`}>
                  <span className="relative z-10">{item.step}</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1 transform group-hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <item.icon className="w-6 h-6 text-green-700 group-hover:text-blue-400 transition-colors duration-300" />
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-green-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced appointment form */}
          <Card className="glass shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fade-in delay-500 relative overflow-hidden">
            {/* Gradient header */}
            <CardHeader className="bg-gradient-to-r from-green-700 to-blue-400 text-white rounded-t-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <CardTitle className="text-3xl font-bold relative z-10 flex items-center text-foreground">
                <Calendar className="w-8 h-8 mr-3 text-blue-400" />
                Book Appointment
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 p-8 relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-700/5 to-blue-400/5 rounded-b-2xl"></div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="group">
                  <Label htmlFor="firstName" className="text-foreground group-focus-within:text-green-700 transition-colors duration-300 font-semibold">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    className="bg-white/60 border border-white/80 text-foreground placeholder:text-muted-foreground focus:border-green-700 focus:bg-white/80 transition-all duration-300"
                  />
                </div>
                <div className="group">
                  <Label htmlFor="lastName" className="text-foreground group-focus-within:text-green-700 transition-colors duration-300 font-semibold">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    className="bg-white/60 border border-white/80 text-foreground placeholder:text-muted-foreground focus:border-green-700 focus:bg-white/80 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="email" className="text-foreground group-focus-within:text-green-700 transition-colors duration-300 font-semibold">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="bg-white/60 border border-white/80 text-foreground placeholder:text-muted-foreground focus:border-blue-400 focus:bg-white/80 transition-all duration-300"
                />
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="phone" className="text-foreground group-focus-within:text-green-700 transition-colors duration-300 font-semibold">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 (555) 123-4567" 
                  className="bg-white/60 border border-white/80 text-foreground placeholder:text-muted-foreground focus:border-blue-400 focus:bg-white/80 transition-all duration-300"
                />
              </div>
              
              <div className="group relative z-10">
                <Label htmlFor="service" className="text-foreground group-focus-within:text-green-700 transition-colors duration-300 font-semibold">Select Service</Label>
                <select 
                  id="service" 
                  className="w-full px-4 py-3 bg-white/60 border border-white/80 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/80 transition-all duration-300"
                >
                  <option className="bg-white text-foreground">General Consultation</option>
                  <option className="bg-white text-foreground">Cardiology</option>
                  <option className="bg-white text-foreground">Neurology</option>
                  <option className="bg-white text-foreground">Pediatrics</option>
                  <option className="bg-white text-foreground">Orthopedics</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="group">
                  <Label htmlFor="date" className="text-foreground group-focus-within:text-green-700 transition-colors duration-300 font-semibold">Preferred Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    className="bg-white/60 border border-white/80 text-foreground focus:border-blue-400 focus:bg-white/80 transition-all duration-300"
                  />
                </div>
                <div className="group">
                  <Label htmlFor="time" className="text-foreground group-focus-within:text-green-700 transition-colors duration-300 font-semibold">Preferred Time</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    className="bg-white/60 border border-white/80 text-foreground focus:border-blue-400 focus:bg-white/80 transition-all duration-300"
                  />
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-green-700 to-blue-400 hover:from-blue-400 hover:to-red-500 text-white py-4 text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-400/30 relative overflow-hidden group">
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
