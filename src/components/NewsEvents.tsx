
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const NewsEvents = () => {
  const events = [
    {
      title: "Free Health Screening Camp",
      date: "January 15, 2025",
      time: "9:00 AM - 4:00 PM",
      description: "Join us for a comprehensive health screening including blood pressure, diabetes, and cholesterol checks.",
      type: "Health Camp",
      location: "Main Hospital Lobby"
    },
    {
      title: "Pediatric Vaccination Drive",
      date: "January 20, 2025", 
      time: "10:00 AM - 3:00 PM",
      description: "Vaccination drive for children aged 6 months to 15 years. All routine vaccines available.",
      type: "Vaccination",
      location: "Pediatric Wing"
    },
    {
      title: "Heart Health Awareness Seminar",
      date: "January 25, 2025",
      time: "2:00 PM - 4:00 PM", 
      description: "Learn about heart disease prevention, healthy lifestyle choices, and warning signs to watch for.",
      type: "Seminar",
      location: "Conference Hall"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">News & Events</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest announcements, health camps, and community events
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="bg-gray-50 hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-emerald-700">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {event.type}
                  </span>
                  <Calendar className="w-5 h-5 text-emerald-700" />
                </div>
                <CardTitle className="text-emerald-800">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <span className="font-semibold mr-2">Date:</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-semibold mr-2">Time:</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-semibold mr-2">Location:</span>
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 mt-4">{event.description}</p>
                  <Button variant="outline" className="w-full mt-4 border-emerald-700 text-emerald-700 hover:bg-emerald-50">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
