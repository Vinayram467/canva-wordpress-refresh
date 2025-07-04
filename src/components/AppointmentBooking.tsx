
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AppointmentBooking = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-200 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4 animate-slide-up">
            Schedule Your Visit Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-300">
            Book your appointment in three simple steps and get the care you deserve
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Process Steps */}
          <div className="space-y-8 animate-fade-in delay-300">
            <div className="flex items-start space-x-4 group">
              <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg transform group-hover:scale-110 transition-all duration-300">
                1
              </div>
              <div className="transform group-hover:translate-x-2 transition-all duration-300">
                <h3 className="text-xl font-bold text-emerald-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  Choose Your Service
                </h3>
                <p className="text-gray-600">Select from our wide range of medical services and specialties</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg transform group-hover:scale-110 transition-all duration-300">
                2
              </div>
              <div className="transform group-hover:translate-x-2 transition-all duration-300">
                <h3 className="text-xl font-bold text-emerald-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  Flexible Scheduling
                </h3>
                <p className="text-gray-600">Pick a convenient date and time that works with your schedule</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg transform group-hover:scale-110 transition-all duration-300">
                3
              </div>
              <div className="transform group-hover:translate-x-2 transition-all duration-300">
                <h3 className="text-xl font-bold text-emerald-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  Quick Confirmation
                </h3>
                <p className="text-gray-600">Receive instant confirmation and reminders for your appointment</p>
              </div>
            </div>
          </div>

          {/* Appointment Form */}
          <Card className="bg-white shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fade-in delay-500">
            <CardHeader className="bg-gradient-to-r from-emerald-700 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Book Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <Label htmlFor="firstName" className="group-focus-within:text-emerald-600 transition-colors duration-300">First Name</Label>
                  <Input id="firstName" placeholder="John" className="group-focus-within:border-emerald-500 transition-colors duration-300" />
                </div>
                <div className="group">
                  <Label htmlFor="lastName" className="group-focus-within:text-emerald-600 transition-colors duration-300">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="group-focus-within:border-emerald-500 transition-colors duration-300" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="email" className="group-focus-within:text-emerald-600 transition-colors duration-300">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="group-focus-within:border-emerald-500 transition-colors duration-300" />
              </div>
              
              <div className="group">
                <Label htmlFor="phone" className="group-focus-within:text-emerald-600 transition-colors duration-300">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" className="group-focus-within:border-emerald-500 transition-colors duration-300" />
              </div>
              
              <div className="group">
                <Label htmlFor="service" className="group-focus-within:text-emerald-600 transition-colors duration-300">Select Service</Label>
                <select id="service" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300">
                  <option>General Consultation</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                  <option>Orthopedics</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <Label htmlFor="date" className="group-focus-within:text-emerald-600 transition-colors duration-300">Preferred Date</Label>
                  <Input id="date" type="date" className="group-focus-within:border-emerald-500 transition-colors duration-300" />
                </div>
                <div className="group">
                  <Label htmlFor="time" className="group-focus-within:text-emerald-600 transition-colors duration-300">Preferred Time</Label>
                  <Input id="time" type="time" className="group-focus-within:border-emerald-500 transition-colors duration-300" />
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBooking;
