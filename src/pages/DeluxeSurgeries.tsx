import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Heart, Brain, Eye, Baby, Bone, Shield, Award, Clock, MapPin, Phone, Mail, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { getMedicalOrganizationSchema } from "@/utils/schema";

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\./g, '')
    .replace(/\s+/g, '-');

const surgeriesData = [
  {
    id: "1",
    name: "Laparoscopic Hernia Repair",
    description: "Minimally invasive hernia repair surgery with faster recovery and less pain",
    icon: Scissors,
    duration: "1-2 hours",
    recovery: "2-4 weeks",
    benefits: ["Minimal scarring", "Faster recovery", "Less pain", "Reduced complications"],
    color: "from-blue-500 to-blue-600",
    image: "/Laparoscopic Herina Repair.jpeg",
    banner: "/Laparoscopic Herina Repair banner.png"
  },
  {
    id: "2",
    name: "Laparoscopic Gall Bladder Removal",
    description: "Advanced keyhole surgery for gall bladder removal with minimal invasion",
    icon: Scissors,
    duration: "1-1.5 hours",
    recovery: "1-2 weeks",
    benefits: ["Minimal scarring", "Quick recovery", "Less pain", "Same day discharge"],
    color: "from-green-500 to-green-600",
    image: "/Laparoscopic GallBlaadder Removal.jpeg",
    banner: "/Laparoscopic GallBlaadder Removal banner.png"
  },
  {
    id: "3",
    name: "Laparoscopic Hysterectomy",
    description: "Minimally invasive removal of uterus with faster recovery",
    icon: Baby,
    duration: "2-3 hours",
    recovery: "2-4 weeks",
    benefits: ["Minimal scarring", "Faster recovery", "Less pain", "Reduced complications"],
    color: "from-pink-500 to-pink-600",
    image: "/Laparascopic Hysterectomy.jpeg",
    banner: "/Laparascopic Hysterectomy banner.png"
  },
  {
    id: "4",
    name: "Arthroscopy",
    description: "Minimally invasive joint surgery for diagnosis and treatment",
    icon: Bone,
    duration: "30-60 minutes",
    recovery: "1-2 weeks",
    benefits: ["Minimal invasion", "Quick recovery", "Diagnostic and therapeutic", "Less pain"],
    color: "from-indigo-500 to-indigo-600",
    image: "/Arthroscopy Surgery .jpeg",
    banner: "/Arthroscopy Surgery banner.png"
  },
  {
    id: "5",
    name: "Total Knee Replacement",
    description: "Advanced joint replacement surgery for severe knee arthritis and pain",
    icon: Bone,
    duration: "2-3 hours",
    recovery: "6-8 weeks",
    benefits: ["Pain relief", "Improved mobility", "Long-lasting results", "Advanced technology"],
    color: "from-purple-500 to-purple-600",
    image: "/Total Knee Replacement.jpeg",
    banner: "/Total Knee Replacement banner.png"
  },
  {
    id: "6",
    name: "Total Hip Replacement",
    description: "Comprehensive hip joint replacement for severe hip conditions",
    icon: Bone,
    duration: "2-3 hours",
    recovery: "6-8 weeks",
    benefits: ["Pain relief", "Improved mobility", "Long-lasting results", "Advanced technology"],
    color: "from-red-500 to-red-600",
    image: "/Total Hip Replacement.jpeg",
    banner: "/Total Hip Replacement banner.jpg"
  },
  {
    id: "7",
    name: "Kidney Stone Removal",
    description: "Advanced techniques for kidney stone removal and treatment",
    icon: Shield,
    duration: "1-2 hours",
    recovery: "1-2 weeks",
    benefits: ["Minimal invasion", "Quick recovery", "Effective treatment", "Advanced technology"],
    color: "from-yellow-500 to-yellow-600",
    image: "/Kidney stone removal.jpeg",
    banner: "/Kidney stone removal banner.png"
  },
  {
    id: "8",
    name: "DJ Stenting",
    description: "Advanced DJ stenting procedure for urinary tract treatment",
    icon: Shield,
    duration: "30-60 minutes",
    recovery: "1-2 weeks",
    benefits: ["Minimal invasion", "Quick recovery", "Effective treatment", "Advanced technology"],
    color: "from-teal-500 to-teal-600",
    image: "/Dj Stenting.jpeg",
    banner: "/Dj Stenting banner.png"
  },
  {
    id: "9",
    name: "TURP (Prostate Surgery)",
    description: "Transurethral resection of prostate for benign prostatic hyperplasia",
    icon: Shield,
    duration: "1-1.5 hours",
    recovery: "2-4 weeks",
    benefits: ["Minimal invasion", "Quick recovery", "Effective treatment", "Advanced technology"],
    color: "from-orange-500 to-orange-600",
    image: "/Transurethral Prostate Resection.jpeg",
    banner: "/Transurethral Prostate Resection banner.png"
  },
  {
    id: "10",
    name: "Modified Radical Mastectomy",
    description: "Advanced breast cancer surgery with comprehensive treatment approach",
    icon: Shield,
    duration: "2-4 hours",
    recovery: "4-6 weeks",
    benefits: ["Comprehensive treatment", "Advanced technology", "Expert care", "Better outcomes"],
    color: "from-rose-500 to-rose-600",
    image: "/Modified Radical Mastectomy .jpeg",
    banner: "/Modified Radical Mastectomy banner.png"
  }
];

const DeluxeSurgeries = () => {
  // Generate SEO data for the deluxe surgeries page
  const seoData = {
    title: "Advanced Laparoscopic & Deluxe Surgeries | Maiya Hospital Bangalore",
    description: "Advanced surgical procedures at Maiya Hospital - Laparoscopic surgery, joint replacement, kidney stone removal, TURP. Expert surgeons in Bangalore.",
    keywords: "laparoscopic surgery bangalore, minimally invasive surgery, advanced surgical procedures, best surgeons bangalore, knee replacement surgery bangalore, hernia repair jayanagar",
    canonical: "https://maiyahospital.in/deluxe-surgeries",
    ogTitle: "Advanced Laparoscopic & Deluxe Surgeries | Maiya Hospital Bangalore",
    ogDescription: "Advanced surgical procedures at Maiya Hospital - Laparoscopic surgery, joint replacement, kidney stone removal, TURP. Expert surgeons in Bangalore.",
    ogImage: "https://maiyahospital.in/deluxe-surgeries-og.jpg",
    twitterTitle: "Advanced Laparoscopic & Deluxe Surgeries | Maiya Hospital Bangalore",
    twitterDescription: "Advanced surgical procedures at Maiya Hospital - Laparoscopic surgery, joint replacement, kidney stone removal, TURP. Expert surgeons in Bangalore.",
    twitterImage: "https://maiyahospital.in/deluxe-surgeries-twitter.jpg",
    structuredData: getMedicalOrganizationSchema()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <SEOHead {...seoData} />
      <Header />
      
             {/* Hero Section with Banner */}
       <section className="relative py-20 overflow-hidden">
         <div className="absolute inset-0">
           <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
         </div>

         <div className="container mx-auto px-4 relative z-10">
                       {/* Main Banner */}
            <div className="relative mb-12">
              <div className="w-full h-auto rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src="/deluxe-surgeries-banner.jpg"
                  alt="Deluxe Surgeries - Maiya Hospital"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Fallback to a gradient if image fails to load
                    e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #1d4ed8)';
                    e.currentTarget.style.display = 'flex';
                    e.currentTarget.style.alignItems = 'center';
                    e.currentTarget.style.justifyContent = 'center';
                    e.currentTarget.innerHTML = '<svg class="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
                  }}
                />
              </div>
            </div>

           <div className="text-center mb-12">
             <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
               Advanced Surgical Procedures
             </h1>
             <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
               State-of-the-art surgical procedures at Maiya Hospital, Jayanagar, Bangalore. 
               Expert surgeons using advanced laparoscopic and minimally invasive techniques.
             </p>
           </div>

          {/* Surgeries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {surgeriesData.map((surgery) => {
              const IconComponent = surgery.icon;
              return (
                <Card key={surgery.id} className="glass shadow-2xl border border-white/80 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="text-center pb-4">
                                         <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                       <img 
                         src={surgery.image}
                         alt={`${surgery.name} - Maiya Hospital`}
                         className="w-full h-full object-contain"
                         onError={(e) => {
                           // Fallback to gradient with icon if image fails to load
                           e.currentTarget.style.background = `linear-gradient(to right, ${surgery.color})`;
                           e.currentTarget.style.display = 'flex';
                           e.currentTarget.style.alignItems = 'center';
                           e.currentTarget.style.justifyContent = 'center';
                           e.currentTarget.innerHTML = `<svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
                         }}
                       />
                     </div>
                    <CardTitle className="text-xl font-semibold text-foreground mb-2">
                      {surgery.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {surgery.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-foreground">Duration</h4>
                        <p className="text-muted-foreground">{surgery.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Recovery</h4>
                        <p className="text-muted-foreground">{surgery.recovery}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {surgery.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.location.href = `/deluxe-surgeries/${toSlug(surgery.name)}`}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Why Choose Our Surgical Services */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center">Why Choose Our Surgical Services?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Expert Surgeons</h3>
                    <p className="text-muted-foreground text-sm">
                      Highly experienced surgeons with specialized training in advanced procedures.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Advanced Technology</h3>
                    <p className="text-muted-foreground text-sm">
                      State-of-the-art surgical equipment and minimally invasive techniques.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Quality Care</h3>
                    <p className="text-muted-foreground text-sm">
                      Comprehensive pre and post-operative care with excellent outcomes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Surgical Facilities */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center">Advanced Surgical Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Operating Theaters</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>Modular operation theaters</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>Advanced surgical equipment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>Sterile environment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>24/7 emergency surgery</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Recovery & Care</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>ICU facilities</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Expert nursing care</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Pain management</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Post-operative monitoring</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center">Book Your Surgical Consultation</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Ready to discuss your surgical options? Book a consultation with our expert surgeons today.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="w-5 h-5 text-green-700" />
                    <span>070223 16149 / 74060 07777</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>info@maiyahospital.in</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>Jayanagar, Bangalore</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                    onClick={() => window.location.href = '/appointment'}
                  >
                    Book Consultation
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 px-8"
                    onClick={() => window.location.href = '/doctors'}
                  >
                    Meet Our Surgeons
                  </Button>
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

export default DeluxeSurgeries; 