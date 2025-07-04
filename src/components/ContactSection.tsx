
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Clock, Home } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help you with all your healthcare needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-red-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-emerald-800">Emergency Hotline</h4>
                  <p className="text-red-600 font-bold text-lg">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800">General Inquiries</h4>
                  <p className="text-gray-600">+1 (555) 123-4568</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800">Email</h4>
                  <p className="text-gray-600">info@maiyahospital.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-red-600" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Monday - Friday:</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Saturday - Sunday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-red-600 font-semibold">
                  <span>Emergency Services:</span>
                  <span>24/7 Available</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center">
                  <Home className="w-6 h-6 mr-3 text-red-600" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  123 Medical Center Drive<br />
                  Healthcare District<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-800">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactFirstName">First Name</Label>
                  <Input id="contactFirstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="contactLastName">Last Name</Label>
                  <Input id="contactLastName" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input id="contactEmail" type="email" placeholder="john@example.com" />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input id="contactPhone" placeholder="+1 (555) 123-4567" />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
