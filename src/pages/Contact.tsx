import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Building, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { getMedicalOrganizationSchema, getLocalBusinessSchema } from "@/utils/schema";
import { useState } from "react";
import { messageApi } from "@/services/api";
import SuccessCard from "@/components/SuccessCard";

const Contact = () => {
  // Generate SEO data for the contact page
  const seoData = {
    title: "Contact Maiya Hospital Bangalore | Location, Phone & Directions",
    description: "Contact Maiya Hospital Bangalore - Address: Jayanagar, Phone: +91 7406007777, Email: info@maiyahospital.in. Get directions, emergency contact, and hospital visiting hours.",
    keywords: "contact maiya hospital, hospital address bangalore, maiya hospital phone number, hospital location jayanagar, get directions hospital, emergency contact hospital",
    canonical: "https://maiyahospital.in/contact",
    ogTitle: "Contact Maiya Hospital Bangalore | Location, Phone & Directions",
    ogDescription: "Contact Maiya Hospital Bangalore - Address: Jayanagar, Phone: +91 7406007777, Email: info@maiyahospital.in. Get directions and emergency contact.",
    ogImage: "https://maiyahospital.in/contact-og.jpg",
    twitterTitle: "Contact Maiya Hospital Bangalore | Location, Phone & Directions",
    twitterDescription: "Contact Maiya Hospital Bangalore - Address: Jayanagar, Phone: +91 7406007777, Email: info@maiyahospital.in. Get directions and emergency contact.",
    twitterImage: "https://maiyahospital.in/contact-twitter.jpg",
    structuredData: [
      getMedicalOrganizationSchema(),
      getLocalBusinessSchema()
    ]
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | { name: string; email: string }>(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };
    try {
      await messageApi.create(payload);
      setSuccess({ name: payload.name, email: payload.email });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're here to help you with any questions about our services, appointments, or general inquiries. 
              Contact us today for quality healthcare at Maiya Hospital, Jayanagar, Bangalore.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-green-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {success ? (
                  <SuccessCard 
                    title="Message Sent!"
                    message={`Thanks ${success.name}. We'll get back to you at ${success.email}.`}
                    details={[
                      { label: "Name", value: success.name },
                      { label: "Email", value: success.email },
                    ]}
                  />
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="What is this regarding?" value={formData.subject} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe your inquiry or concern..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Hospital Information */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <Building className="w-6 h-6 mr-2 text-blue-600" />
                    Hospital Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Address</h4>
                      <p className="text-muted-foreground">
                        Maiya Hospital<br />
                        Jayanagar, Bangalore<br />
                        Karnataka, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Phone Numbers</h4>
                      <p className="text-muted-foreground">
                        Emergency: +91 7406007777<br />
                        Ambulance: 74060 07777<br />
                        General: +91 98450 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground">
                        info@maiyahospital.in<br />
                        emergency@maiyahospital.in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Visiting Hours</h4>
                      <p className="text-muted-foreground">
                        Emergency: 24/7<br />
                        OPD: 9:00 AM - 8:00 PM<br />
                        Visiting Hours: 10:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="glass shadow-2xl border border-white/80 bg-gradient-to-r from-red-600 to-red-700 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Emergency Contact</h3>
                  <p className="text-white/90 mb-4">
                    For medical emergencies, call our emergency number immediately. Our emergency team is available 24/7.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-semibold">Emergency: +91 7406007777</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Ambulance: 74060 07777</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;