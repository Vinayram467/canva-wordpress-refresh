import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Phone, Mail, MapPin, User, CalendarDays, MessageSquare, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { getMedicalOrganizationSchema } from "@/utils/schema";
import { appointmentApi } from "@/services/api";
import SuccessCard from "@/components/SuccessCard";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    department: "",
    doctor: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successDetails, setSuccessDetails] = useState<null | {
    patientName: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    message?: string;
  }>(null);

  // Generate SEO data for the appointment booking page
  const seoData = {
    title: "Book Appointment Online | Maiya Hospital Bangalore | Easy Booking",
    description: "Book doctor appointment online at Maiya Hospital Bangalore. Easy online booking system for consultations, check-ups. Schedule your visit today - Quick & convenient.",
    keywords: "book appointment online, doctor appointment bangalore, online booking hospital, schedule consultation, appointment booking system, maiya hospital appointment",
    canonical: "https://maiyahospital.in/appointment",
    ogTitle: "Book Appointment Online | Maiya Hospital Bangalore | Easy Booking",
    ogDescription: "Book doctor appointment online at Maiya Hospital Bangalore. Easy online booking system for consultations, check-ups. Schedule your visit today - Quick & convenient.",
    ogImage: "https://maiyahospital.in/appointment-og.jpg",
    twitterTitle: "Book Appointment Online | Maiya Hospital Bangalore | Easy Booking",
    twitterDescription: "Book doctor appointment online at Maiya Hospital Bangalore. Easy online booking system for consultations, check-ups. Schedule your visit today - Quick & convenient.",
    twitterImage: "https://maiyahospital.in/appointment-twitter.jpg",
    structuredData: getMedicalOrganizationSchema()
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      patientName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      reason: formData.message,
      doctorId: undefined,
      notes: `${formData.department}${formData.doctor ? ` | Preferred: ${formData.doctor}` : ""}`,
    };

    try {
      await appointmentApi.create(payload);
      setSuccessDetails({
        patientName: payload.patientName,
        email: payload.email,
        phone: payload.phone,
        date: payload.date,
        time: payload.time,
        message: payload.reason,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        department: "",
        doctor: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    "General Medicine",
    "Cardiology",
    "Orthopedics",
    "Gynecology",
    "Pediatrics",
    "Dermatology",
    "ENT",
    "Ophthalmology",
    "Neurology",
    "Urology",
    "Psychiatry",
    "Emergency"
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <SEOHead {...seoData} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Book Your Appointment
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Schedule your visit with our expert doctors at Maiya Hospital, Jayanagar, Bangalore. 
              Quick and easy online booking for consultations and check-ups.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Appointment Form */}
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-green-600" />
                  Schedule Your Visit
                </CardTitle>
              </CardHeader>
              <CardContent>
                {successDetails ? (
                  <SuccessCard 
                    title="Appointment Requested!"
                    message={`Thank you, ${successDetails.patientName}. We have received your request for ${successDetails.date} at ${successDetails.time}. A confirmation email has been sent to ${successDetails.email}.`}
                    details={[
                      { label: "Name", value: successDetails.patientName },
                      { label: "Email", value: successDetails.email },
                      { label: "Phone", value: successDetails.phone },
                      { label: "Date", value: successDetails.date },
                      { label: "Time", value: successDetails.time },
                    ]}
                  />
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input 
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time *</Label>
                      <Select name="time" value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select name="department" value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Preferred Doctor (Optional)</Label>
                      <Input 
                        id="doctor"
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleInputChange}
                        placeholder="Enter doctor's name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Notes</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any specific concerns or notes for the doctor..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Processing...' : 'Book Appointment'}
                  </Button>
                </form>
                )}
              </CardContent>
            </Card>

            {/* Information Section */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <Phone className="w-6 h-6 mr-2 text-blue-600" />
                    Quick Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-foreground">Phone Booking</h4>
                      <p className="text-muted-foreground">070223 16149</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-foreground">Email Booking</h4>
                      <p className="text-muted-foreground">appointments@maiyahospital.in</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <h4 className="font-semibold text-foreground">Booking Hours</h4>
                      <p className="text-muted-foreground">9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What to Bring */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                    What to Bring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p className="text-muted-foreground text-sm">Valid ID proof (Aadhar, PAN, Driving License)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p className="text-muted-foreground text-sm">Previous medical records (if any)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p className="text-muted-foreground text-sm">List of current medications</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p className="text-muted-foreground text-sm">Insurance card (if applicable)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p className="text-muted-foreground text-sm">Payment method (cash/card)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Hospital Location */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-purple-600" />
                    Hospital Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Maiya Multi Speciality Hospital<br />
                    Jayanagar, Bangalore<br />
                    Karnataka, India
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => window.open('https://maps.google.com/?q=Maiya+Hospital+Jayanagar+Bangalore', '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="glass shadow-2xl border border-white/80 bg-gradient-to-r from-red-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <Phone className="w-6 h-6 mr-2 text-red-600" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    For medical emergencies, please call our emergency hotline immediately.
                  </p>
                  <div className="bg-white/80 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">070223 16149</div>
                    <div className="text-sm text-muted-foreground">24/7 Emergency Hotline</div>
                  </div>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => window.location.href = 'tel:07022316149'}
                  >
                    Call Emergency Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center">Why Book Online?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Quick & Convenient</h3>
                    <p className="text-muted-foreground text-sm">
                      Book your appointment in minutes from anywhere, anytime.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                      <CalendarDays className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Flexible Scheduling</h3>
                    <p className="text-muted-foreground text-sm">
                      Choose from multiple time slots and dates that suit your schedule.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Instant Confirmation</h3>
                    <p className="text-muted-foreground text-sm">
                      Receive immediate confirmation and reminders for your appointment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AppointmentBooking;