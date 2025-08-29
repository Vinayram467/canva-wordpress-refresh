import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Eye, Baby, Bone, Stethoscope, Microscope, Shield, Users, Award, Clock, MapPin, Phone, Mail, Star, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { getMedicalOrganizationSchema, getFAQPageSchema } from "@/utils/schema";

// Mock data for specialties - in real app this would come from API
const specialtiesData = [
  {
    id: "1",
    name: "Cardiology",
    description: "Expert heart care with advanced cardiac treatments and procedures",
    longDescription: "Our cardiology department provides comprehensive heart care services including diagnostic procedures, interventional cardiology, and cardiac surgery. Our team of experienced cardiologists uses state-of-the-art technology to diagnose and treat various heart conditions.",
    icon: Heart,
    doctors: ["Dr. Hrishikesh Vemula", "Dr. Ananth Krishna"],
    services: ["ECG", "Echo", "Stress Test", "Cardiac Surgery", "Angioplasty", "Heart Failure Treatment"],
    color: "from-red-500 to-red-600",
    image: "/cardiology-banner.jpg",
    faqs: [
      {
        question: "What heart conditions do you treat?",
        answer: "We treat all types of heart conditions including coronary artery disease, heart failure, arrhythmias, and congenital heart defects."
      },
      {
        question: "Do you perform emergency cardiac procedures?",
        answer: "Yes, we have 24/7 emergency cardiac care with immediate response for heart attacks and other cardiac emergencies."
      },
      {
        question: "What diagnostic tests are available?",
        answer: "We offer ECG, echocardiogram, stress tests, cardiac CT, and cardiac MRI for comprehensive heart evaluation."
      }
    ]
  },
  {
    id: "2",
    name: "Orthopedics",
    description: "Comprehensive bone and joint care with advanced surgical techniques",
    longDescription: "Our orthopedics department specializes in the diagnosis, treatment, and prevention of disorders of the bones, joints, ligaments, tendons, muscles, and nerves. We offer both surgical and non-surgical treatments.",
    icon: Bone,
    doctors: ["Dr. Chandrashekar HS", "Dr. Abhey Vasudev", "Dr. Akshay Dhanda"],
    services: ["Joint Replacement", "Fracture Treatment", "Sports Injury", "Arthroscopy", "Spine Surgery", "Hand Surgery"],
    color: "from-blue-500 to-blue-600",
    image: "/orthopedics-banner.jpg",
    faqs: [
      {
        question: "What types of joint replacement do you perform?",
        answer: "We perform hip, knee, shoulder, and elbow replacements using the latest techniques and implants."
      },
      {
        question: "Do you treat sports injuries?",
        answer: "Yes, we have specialized sports medicine services for athletes and active individuals."
      },
      {
        question: "What is the recovery time for orthopedic surgery?",
        answer: "Recovery time varies by procedure, typically 6-12 weeks for most surgeries with proper rehabilitation."
      }
    ]
  },
  {
    id: "3",
    name: "Neurology",
    description: "Specialized care for neurological disorders and brain conditions",
    longDescription: "Our neurology department provides expert care for disorders of the nervous system including the brain, spinal cord, and nerves. We use advanced diagnostic tools and treatment methods.",
    icon: Brain,
    doctors: ["Dr. Sujay Rao"],
    services: ["Brain Surgery", "Stroke Treatment", "Neurological Tests", "Rehabilitation", "Epilepsy Treatment", "Movement Disorders"],
    color: "from-purple-500 to-purple-600",
    image: "/neurology-banner.jpg",
    faqs: [
      {
        question: "What neurological conditions do you treat?",
        answer: "We treat stroke, epilepsy, Parkinson's disease, multiple sclerosis, brain tumors, and other neurological disorders."
      },
      {
        question: "Do you have emergency neurology services?",
        answer: "Yes, we provide 24/7 emergency neurology care for stroke and other acute neurological conditions."
      },
      {
        question: "What diagnostic tests are available?",
        answer: "We offer EEG, EMG, nerve conduction studies, and advanced imaging like MRI and CT scans."
      }
    ]
  },
  {
    id: "4",
    name: "Gynecology",
    description: "Comprehensive women's health care and obstetric services",
    longDescription: "Our gynecology department provides comprehensive women's healthcare including pregnancy care, delivery services, gynecological surgeries, and preventive care. We focus on women's health at every stage of life.",
    icon: Baby,
    doctors: ["Dr. Ishwarya Bhandari", "Dr. Varsha Manohar"],
    services: ["Pregnancy Care", "Delivery", "Gynecological Surgery", "Women's Health", "Fertility Treatment", "Menopause Care"],
    color: "from-pink-500 to-pink-600",
    image: "/gynecology-banner.jpg",
    faqs: [
      {
        question: "Do you provide pregnancy care?",
        answer: "Yes, we provide comprehensive prenatal care, delivery services, and postpartum care."
      },
      {
        question: "What gynecological surgeries do you perform?",
        answer: "We perform hysterectomy, myomectomy, laparoscopy, and other gynecological procedures."
      },
      {
        question: "Do you offer fertility treatments?",
        answer: "Yes, we provide fertility evaluation and treatment options for couples trying to conceive."
      }
    ]
  },
  {
    id: "5",
    name: "General Medicine",
    description: "Primary healthcare services for adults and comprehensive medical care",
    longDescription: "Our general medicine department provides primary healthcare services for adults, focusing on prevention, diagnosis, and treatment of various medical conditions. We serve as the first point of contact for most health concerns.",
    icon: Stethoscope,
    doctors: ["Dr. B G Mahesh", "Dr. Murali P"],
    services: ["General Consultation", "Health Checkup", "Disease Management", "Preventive Care", "Chronic Disease Management", "Geriatric Care"],
    color: "from-green-500 to-green-600",
    image: "/general-medicine-banner.jpg",
    faqs: [
      {
        question: "What conditions do general physicians treat?",
        answer: "We treat common illnesses, chronic diseases, preventive care, and coordinate care with specialists."
      },
      {
        question: "Do you provide health checkups?",
        answer: "Yes, we offer comprehensive health checkups for adults including blood tests and preventive screenings."
      },
      {
        question: "Can I get a second opinion?",
        answer: "Yes, we provide second opinion consultations for patients seeking additional medical advice."
      }
    ]
  },
  {
    id: "6",
    name: "Ophthalmology",
    description: "Expert eye care with advanced diagnostic and surgical procedures",
    longDescription: "Our ophthalmology department provides comprehensive eye care including diagnosis, treatment, and surgery for all types of eye conditions. We use the latest technology for precise diagnosis and treatment.",
    icon: Eye,
    doctors: ["Dr. N T Babu"],
    services: ["Eye Surgery", "Vision Correction", "Retina Treatment", "Glaucoma Care", "Cataract Surgery", "Pediatric Ophthalmology"],
    color: "from-yellow-500 to-yellow-600",
    image: "/ophthalmology-banner.jpg",
    faqs: [
      {
        question: "What eye surgeries do you perform?",
        answer: "We perform cataract surgery, glaucoma surgery, retinal surgery, and corneal transplants."
      },
      {
        question: "Do you treat children's eye problems?",
        answer: "Yes, we have pediatric ophthalmology services for children's eye care and vision problems."
      },
      {
        question: "What is the recovery time for eye surgery?",
        answer: "Most eye surgeries have quick recovery times, typically 1-4 weeks depending on the procedure."
      }
    ]
  },
  {
    id: "7",
    name: "Dermatology",
    description: "Comprehensive skin care and treatment for various skin conditions",
    longDescription: "Our dermatology department provides expert care for skin, hair, and nail conditions. We offer both medical and cosmetic dermatology services using advanced treatments and procedures.",
    icon: Shield,
    doctors: ["Dr. Gopal M G"],
    services: ["Skin Treatment", "Cosmetic Procedures", "Hair Care", "Allergy Treatment", "Skin Cancer Screening", "Acne Treatment"],
    color: "from-orange-500 to-orange-600",
    image: "/dermatology-banner.jpg",
    faqs: [
      {
        question: "What skin conditions do you treat?",
        answer: "We treat acne, eczema, psoriasis, skin cancer, fungal infections, and other skin disorders."
      },
      {
        question: "Do you offer cosmetic procedures?",
        answer: "Yes, we provide cosmetic procedures like chemical peels, laser treatments, and anti-aging treatments."
      },
      {
        question: "Do you perform skin cancer screening?",
        answer: "Yes, we offer comprehensive skin cancer screening and early detection services."
      }
    ]
  },
  {
    id: "8",
    name: "ENT",
    description: "Specialized care for ear, nose, and throat conditions",
    longDescription: "Our ENT department provides comprehensive care for disorders of the ear, nose, throat, head, and neck. We offer both medical and surgical treatments for various ENT conditions.",
    icon: Users,
    doctors: ["Dr. Chandrashekar H S"],
    services: ["Ear Surgery", "Sinus Treatment", "Voice Disorders", "Hearing Tests", "Sleep Apnea", "Head & Neck Surgery"],
    color: "from-teal-500 to-teal-600",
    image: "/ent-banner.jpg",
    faqs: [
      {
        question: "What ENT conditions do you treat?",
        answer: "We treat hearing loss, sinus problems, voice disorders, sleep apnea, and head/neck conditions."
      },
      {
        question: "Do you perform hearing tests?",
        answer: "Yes, we offer comprehensive hearing evaluation and treatment for hearing loss."
      },
      {
        question: "Do you treat sleep apnea?",
        answer: "Yes, we diagnose and treat sleep apnea and other sleep-related breathing disorders."
      }
    ]
  },
  {
    id: "9",
    name: "Pediatrics",
    description: "Comprehensive healthcare for children from birth to adolescence",
    longDescription: "Our pediatrics department provides comprehensive healthcare for children from birth through adolescence. We focus on growth, development, and the unique health needs of children.",
    icon: Baby,
    doctors: ["Dr. Geetha B V"],
    services: ["Child Care", "Vaccination", "Growth Monitoring", "Pediatric Surgery", "Adolescent Care", "Child Development"],
    color: "from-indigo-500 to-indigo-600",
    image: "/pediatrics-banner.jpg",
    faqs: [
      {
        question: "What age groups do you treat?",
        answer: "We provide care for children from birth to 18 years of age."
      },
      {
        question: "Do you provide vaccinations?",
        answer: "Yes, we provide all recommended childhood vaccinations and immunization schedules."
      },
      {
        question: "Do you treat developmental disorders?",
        answer: "Yes, we evaluate and treat developmental delays and behavioral disorders in children."
      }
    ]
  },
  {
    id: "10",
    name: "Psychiatry",
    description: "Mental health care and psychological treatment services",
    longDescription: "Our psychiatry department provides comprehensive mental health care including diagnosis, treatment, and therapy for various psychiatric conditions. We offer both medication management and psychotherapy.",
    icon: Brain,
    doctors: ["Dr. Lakshmi V Pandit"],
    services: ["Mental Health", "Counseling", "Therapy", "Psychiatric Care", "Depression Treatment", "Anxiety Treatment"],
    color: "from-gray-500 to-gray-600",
    image: "/psychiatry-banner.jpg",
    faqs: [
      {
        question: "What mental health conditions do you treat?",
        answer: "We treat depression, anxiety, bipolar disorder, schizophrenia, and other mental health conditions."
      },
      {
        question: "Do you provide therapy sessions?",
        answer: "Yes, we offer individual therapy, family therapy, and group therapy sessions."
      },
      {
        question: "Is psychiatric care confidential?",
        answer: "Yes, all psychiatric consultations and treatments are completely confidential."
      }
    ]
  }
];

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const slugAliasMap: Record<string, string> = {
  'orthopaedics': 'orthopedics',
  'obstetrics-and-gynaecology': 'gynecology',
  'paediatrics': 'pediatrics'
};

const fallbackSpecialtyNames: string[] = [
  'General Surgery',
  'Urology',
  'Plastic Surgery',
  'Radiology',
  'Pulmonology',
  'Dentistry',
  'Physiotherapy',
  'Anaesthesia',
  'Surgical Gastroenterology',
  'Medical Oncology',
  'Vascular Surgery',
  'Surgical Oncology'
];

const SpecialtyDetail = () => {
  const { slug } = useParams();
  const effectiveSlug = slug ? (slugAliasMap[slug] || slug) : undefined;
  let specialty = specialtiesData.find(s => toSlug(s.name) === effectiveSlug) || specialtiesData.find(s => s.id === effectiveSlug);

  if (!specialty && effectiveSlug) {
    const matchedFallbackName = fallbackSpecialtyNames.find(name => toSlug(name) === effectiveSlug);
    if (matchedFallbackName) {
      specialty = {
        id: effectiveSlug,
        name: matchedFallbackName,
        description: `Specialized ${matchedFallbackName.toLowerCase()} care and treatments at Maiya Hospital.`,
        longDescription: `Our ${matchedFallbackName.toLowerCase()} department provides comprehensive evaluation and treatment with experienced specialists and modern facilities at Maiya Hospital, Jayanagar, Bangalore.`,
        icon: Shield,
        doctors: [],
        services: [],
        color: "from-blue-500 to-blue-600",
        image: "",
        faqs: []
      } as any;
    }
  }

  if (!specialty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Specialty Not Found</h1>
          <p className="text-muted-foreground mb-6">The medical specialty you are looking for does not exist.</p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Generate SEO data for the specialty detail page
  const seoData = {
    title: `${specialty.name} Services | Expert Specialists - Maiya Hospital Bangalore`,
    description: `Expert ${specialty.name.toLowerCase()} services at Maiya Hospital Bangalore. Experienced specialists, advanced treatments, comprehensive care in Jayanagar. Book consultation today.`,
    keywords: `${specialty.name.toLowerCase()} bangalore, ${specialty.name.toLowerCase()} specialist jayanagar, best ${specialty.name.toLowerCase()} doctor, ${specialty.name.toLowerCase()} treatment bangalore, ${specialty.name.toLowerCase()} hospital`,
    canonical: `https://maiyahospital.in/specialty/${toSlug(specialty.name)}`,
    ogTitle: `${specialty.name} Services | Expert Specialists - Maiya Hospital Bangalore`,
    ogDescription: `Expert ${specialty.name.toLowerCase()} services at Maiya Hospital Bangalore. Experienced specialists, advanced treatments, comprehensive care.`,
    ogImage: `https://maiyahospital.in/specialty-${toSlug(specialty.name)}-og.jpg`,
    twitterTitle: `${specialty.name} Services | Expert Specialists - Maiya Hospital Bangalore`,
    twitterDescription: `Expert ${specialty.name.toLowerCase()} services at Maiya Hospital Bangalore. Experienced specialists, advanced treatments, comprehensive care.`,
    twitterImage: `https://maiyahospital.in/specialty-${toSlug(specialty.name)}-twitter.jpg`,
    structuredData: [
      getMedicalOrganizationSchema(),
      getFAQPageSchema(specialty.faqs)
    ]
  };

  const IconComponent = specialty.icon;

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
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm mb-6">
              <IconComponent className="w-4 h-4" />
              <span>{specialty.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {specialty.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {specialty.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Specialty Image */}
            <div className="relative">
              <div className={`w-full h-96 bg-gradient-to-r ${specialty.color} rounded-2xl shadow-2xl flex items-center justify-center`}>
                <IconComponent className="w-24 h-24 text-white" />
              </div>
            </div>

            {/* Specialty Details */}
            <div className="space-y-8">
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">About {specialty.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {specialty.longDescription}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Expert Doctors</h4>
                    <div className="flex flex-wrap gap-2">
                      {specialty.doctors.map((doctor, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {doctor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Services Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {specialty.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="glass shadow-2xl border border-white/80 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Ready to Get Started?</h3>
                  <p className="text-white/90 mb-4">
                    Contact us today to learn more about our {specialty.name} services and schedule your consultation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-white text-green-600 hover:bg-gray-100">
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                      Contact Us
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="glass shadow-2xl border border-white/80">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground text-center">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {specialty.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        {faq.question}
                      </h4>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
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

export default SpecialtyDetail; 