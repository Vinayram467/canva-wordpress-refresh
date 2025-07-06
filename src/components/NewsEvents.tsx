
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";

const NewsEvents = () => {
  const events = [
    {
      title: "Free Health Screening Camp",
      date: "January 15, 2025",
      time: "9:00 AM - 4:00 PM",
      description: "Join us for a comprehensive health screening including blood pressure, diabetes, and cholesterol checks.",
      type: "Health Camp",
      location: "Main Hospital Lobby",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Pediatric Vaccination Drive",
      date: "January 20, 2025", 
      time: "10:00 AM - 3:00 PM",
      description: "Vaccination drive for children aged 6 months to 15 years. All routine vaccines available.",
      type: "Vaccination",
      location: "Pediatric Wing",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Heart Health Awareness Seminar",
      date: "January 25, 2025",
      time: "2:00 PM - 4:00 PM", 
      description: "Learn about heart disease prevention, healthy lifestyle choices, and warning signs to watch for.",
      type: "Seminar",
      location: "Conference Hall",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-32 right-32 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm mb-6 transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Upcoming Events</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">News &</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
              Events
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Stay updated with our latest announcements, health camps, and community events
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card 
              key={index} 
              className="group bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 animate-fade-in relative overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Gradient top accent */}
              <div className={`h-2 bg-gradient-to-r ${event.color} relative`}>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className={`bg-gradient-to-r ${event.color} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                    {event.type}
                  </span>
                  <Calendar className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                  {event.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 relative">
                <div className="space-y-3">
                  <div className="flex items-center text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-3 text-emerald-400" />
                    <span className="font-semibold mr-2">Date:</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    <Clock className="w-4 h-4 mr-3 text-blue-400" />
                    <span className="font-semibold mr-2">Time:</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    <MapPin className="w-4 h-4 mr-3 text-purple-400" />
                    <span className="font-semibold mr-2">Location:</span>
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed pt-4">
                  {event.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-6 bg-white/10 border-emerald-400/50 text-emerald-400 hover:bg-emerald-400 hover:text-white backdrop-blur-sm transition-all duration-300 transform hover:scale-105 group/btn"
                >
                  <span className="mr-2">Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-200 transition-opacity duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in delay-700">
          <Button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-6 text-lg font-bold shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <span className="relative z-10 flex items-center">
              View All Events
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
