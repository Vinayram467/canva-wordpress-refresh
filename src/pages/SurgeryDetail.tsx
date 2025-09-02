import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Phone, Clock, Shield, Award, Heart, Users, Activity, Scissors, Brain, Eye, Baby, Bone, MapPin, Mail, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { getMedicalOrganizationSchema, getFAQPageSchema } from "@/utils/schema";

// Surgery data - this would normally come from an API
const surgeryData = {
  "1": {
    name: "Laparoscopic Hernia Repair",
    description: "We make life pain-free with Laparoscopic Hernia Repair that ensures better recovery and no discomfort.",
    about: "Laparoscopic hernia repair is a **minimally invasive surgical** procedure done to repair the protrusion.",
    indications: [
      "Inguinal - Protrusion happens in theinner groin",
      "Femoral - Protrusion happens in the outer groin/upper thigh", 
      "Incisional - Protrusion happens through a scar or incision in the abdomen",
      "Ventral - Protrusion happens in the general abdominal/ventral wall",
      "Umbilical - Protrusion happens at the belly button",
      "Hiatal - Protrusion happens inside the abdomen, along the diaphragm/upper stomach"
    ],
    procedure: "During laparoscopic hernia repair, various small incisions are made where there is a protrusion. Through these incisions, surgical tools are inserted into the openings to repair the hernia. This kind of **laparoscopic surgery** can be performed with or without surgical mesh (a medical device that supports the damaged tissue around the hernia during its healing phase).",
    benefits: [
      "Less tissue dissection and disruption of tissue plane",
      "Small scars",
      "Short hospital stay", 
      "Less tissue cutting",
      "Less pain post-operation",
      "Quick healing as the scar is small",
      "Quick return to work",
      "Reduced risk of infection"
    ],
    faqs: [
      {
        question: "How do I know if I might have a hernia?",
        answer: "If you notice a swelling or bulge in your abdomen, groin, or near your stomach, you might have a hernia. When in a lying position, you must be able to push the bulge gently back into place. If you think you have a similar symptom, please contact your doctor."
      },
      {
        question: "What are the chances of the hernia relapse?",
        answer: "As per the numerous studies done abroad, the chances of the hernia coming back are nil, if the surgery has been done properly."
      },
      {
        question: "Is hernia repair surgery riskier for patients with other medical problems?",
        answer: "The general anesthesia and the pneumoperitoneum needed as part of the laparoscopic surgery do increase the risk in certain groups of patients. Many surgeons do not suggest laparoscopic hernia repair in patients with pre-existing disease conditions."
      },
      {
        question: "Is it safe to leave a mesh inside the body?",
        answer: "The mesh used is the same as the one used in open operations over the last many decades. The safety and efficacy of the mesh are beyond any doubt, as it has been proved by numerous trials done across the world."
      }
    ],
    image: "/Laparoscopic Herina Repair.jpeg",
    banner: "/Laparoscopic Herina Repair banner.png",
    duration: "1-2 hours",
    recovery: "2-4 weeks"
  },
  "2": {
    name: "Laparoscopic Gall Bladder Removal",
    description: "Advanced laparoscopic cholecystectomy procedure for safe and effective gall bladder removal.",
    about: "Laparoscopic gallbladder removal (cholecystectomy) is a minimally invasive surgical procedure to remove the gallbladder.",
    indications: [
      "Gallstones causing pain or complications",
      "Inflammation of the gallbladder (cholecystitis)",
      "Gallbladder polyps",
      "Biliary dyskinesia"
    ],
    procedure: "The procedure involves making small incisions in the abdomen and inserting a laparoscope and surgical instruments to remove the gallbladder.",
    benefits: [
      "Minimal scarring",
      "Faster recovery time",
      "Reduced post-operative pain",
      "Shorter hospital stay",
      "Lower risk of complications",
      "Quick return to normal activities"
    ],
    faqs: [
      {
        question: "How long does the surgery take?",
        answer: "The procedure typically takes 1-2 hours to complete."
      },
      {
        question: "What is the recovery time?",
        answer: "Most patients can return to normal activities within 1-2 weeks."
      }
    ],
    image: "/Laparoscopic GallBlaadder Removal.jpeg",
    banner: "/Laparoscopic GallBlaadder Removal banner.png",
    duration: "1-1.5 hours",
    recovery: "1-2 weeks"
  },
  "3": {
    name: "Laparoscopic Hysterectomy",
    description: "Minimally invasive hysterectomy procedure with reduced recovery time and improved outcomes.",
    about: "Laparoscopic hysterectomy is a surgical procedure to remove the uterus using minimally invasive techniques.",
    indications: [
      "Uterine fibroids",
      "Endometriosis",
      "Uterine prolapse",
      "Abnormal uterine bleeding",
      "Gynecologic cancer"
    ],
    procedure: "The procedure involves making small incisions and using a laparoscope to remove the uterus through the vagina.",
    benefits: [
      "Smaller incisions",
      "Less blood loss",
      "Faster recovery",
      "Reduced pain",
      "Lower risk of infection",
      "Better cosmetic results"
    ],
    faqs: [
      {
        question: "Will I still have periods after hysterectomy?",
        answer: "No, you will not have periods after a complete hysterectomy."
      },
      {
        question: "How long is the recovery period?",
        answer: "Recovery typically takes 4-6 weeks."
      }
    ],
    image: "/Laparascopic Hysterectomy.jpeg",
    banner: "/Laparascopic Hysterectomy banner.png",
    duration: "2-3 hours",
    recovery: "2-4 weeks"
  },
  "4": {
    name: "Arthroscopy",
    description: "Advanced joint examination and treatment using arthroscopic techniques for precise diagnosis and treatment.",
    about: "Arthroscopy is a minimally invasive surgical procedure used to diagnose and treat joint problems.",
    indications: [
      "Joint pain and stiffness",
      "Torn cartilage or ligaments",
      "Joint inflammation",
      "Loose bone fragments",
      "Joint infections"
    ],
    procedure: "A small camera (arthroscope) is inserted through a small incision to view the joint and perform surgical procedures.",
    benefits: [
      "Minimal tissue damage",
      "Faster recovery",
      "Reduced pain and swelling",
      "Lower risk of complications",
      "Better visualization of joint structures"
    ],
    faqs: [
      {
        question: "Which joints can be treated with arthroscopy?",
        answer: "Arthroscopy can be used on knees, shoulders, hips, ankles, wrists, and elbows."
      },
      {
        question: "How long does recovery take?",
        answer: "Recovery time varies but typically ranges from a few days to several weeks."
      }
    ],
    image: "/Arthroscopy Surgery .jpeg",
    banner: "/Arthroscopy Surgery banner.png",
    duration: "30-60 minutes",
    recovery: "1-2 weeks"
  },
  "5": {
    name: "Total Knee Replacement",
    description: "Complete knee joint replacement using state-of-the-art prosthetics and surgical techniques.",
    about: "Total knee replacement is a surgical procedure to replace a damaged knee joint with an artificial implant.",
    indications: [
      "Severe osteoarthritis",
      "Rheumatoid arthritis",
      "Post-traumatic arthritis",
      "Knee deformities",
      "Chronic knee pain"
    ],
    procedure: "The damaged cartilage and bone are removed and replaced with metal and plastic components.",
    benefits: [
      "Relief from chronic pain",
      "Improved mobility",
      "Better quality of life",
      "Long-lasting results",
      "Restored function"
    ],
    faqs: [
      {
        question: "How long do knee replacements last?",
        answer: "Modern knee replacements typically last 15-20 years or more."
      },
      {
        question: "When can I return to normal activities?",
        answer: "Most patients can return to normal activities within 3-6 months."
      }
    ],
    image: "/Total Knee Replacement.jpeg",
    banner: "/Total Knee Replacement banner.png",
    duration: "2-3 hours",
    recovery: "6-8 weeks"
  },
  "6": {
    name: "Total Hip Replacement",
    description: "Advanced hip joint replacement procedure for improved mobility and pain relief.",
    about: "Total hip replacement is a surgical procedure to replace a damaged hip joint with an artificial implant.",
    indications: [
      "Severe hip arthritis",
      "Hip fractures",
      "Avascular necrosis",
      "Hip deformities",
      "Chronic hip pain"
    ],
    procedure: "The damaged hip joint is replaced with a prosthetic implant made of metal, ceramic, or plastic.",
    benefits: [
      "Pain relief",
      "Improved mobility",
      "Better quality of life",
      "Long-lasting results",
      "Restored function"
    ],
    faqs: [
      {
        question: "How long do hip replacements last?",
        answer: "Modern hip replacements typically last 20-25 years or more."
      },
      {
        question: "What activities can I do after hip replacement?",
        answer: "Most patients can return to normal activities including walking, swimming, and golf."
      }
    ],
    image: "/Total Hip Replacement.jpeg",
    banner: "/Total Hip Replacement banner.jpg",
    duration: "2-3 hours",
    recovery: "6-8 weeks"
  },
  "7": {
    name: "Kidney Stone Removal",
    description: "Effective kidney stone removal using modern techniques and equipment.",
    about: "Kidney stone removal involves various procedures to break down or remove stones from the urinary tract.",
    indications: [
      "Large kidney stones",
      "Stones causing severe pain",
      "Stones blocking urine flow",
      "Recurrent kidney stones",
      "Infection due to stones"
    ],
    procedure: "Various techniques including lithotripsy, ureteroscopy, and percutaneous nephrolithotomy may be used.",
    benefits: [
      "Relief from pain",
      "Prevention of complications",
      "Improved kidney function",
      "Reduced risk of recurrence",
      "Minimal invasiveness"
    ],
    faqs: [
      {
        question: "What causes kidney stones?",
        answer: "Kidney stones can be caused by dehydration, diet, genetics, and certain medical conditions."
      },
      {
        question: "How can I prevent kidney stones?",
        answer: "Drinking plenty of water and following a balanced diet can help prevent kidney stones."
      }
    ],
    image: "/Kidney stone removal.jpeg",
    banner: "/Kidney stone removal banner.png",
    duration: "1-2 hours",
    recovery: "1-2 weeks"
  },
  "8": {
    name: "DJ Stenting",
    description: "Advanced DJ stenting procedure for urinary tract treatment and management.",
    about: "DJ stenting is a minimally invasive procedure to place a stent in the ureter to maintain urine flow.",
    indications: [
      "Ureteral obstruction",
      "Kidney stones",
      "Ureteral strictures",
      "Post-operative drainage",
      "Urinary tract infections"
    ],
    procedure: "A flexible stent is placed in the ureter using endoscopic techniques to maintain urine flow and prevent obstruction.",
    benefits: [
      "Relieves urinary obstruction",
      "Maintains urine flow",
      "Minimal invasiveness",
      "Quick recovery",
      "Reduces complications"
    ],
    faqs: [
      {
        question: "How long does the procedure take?",
        answer: "DJ stenting typically takes 30-60 minutes to complete."
      },
      {
        question: "What is the recovery time?",
        answer: "Most patients can return to normal activities within 1-2 weeks."
      }
    ],
    image: "/Dj Stenting.jpeg",
    banner: "/Dj Stenting banner.png",
    duration: "30-60 minutes",
    recovery: "1-2 weeks"
  },
  "9": {
    name: "TURP (Prostate Surgery)",
    description: "Transurethral resection of the prostate for benign prostatic hyperplasia treatment.",
    about: "TURP is a surgical procedure to remove part of the prostate gland to relieve urinary symptoms.",
    indications: [
      "Benign prostatic hyperplasia (BPH)",
      "Urinary retention",
      "Frequent urination",
      "Weak urine stream",
      "Incomplete bladder emptying"
    ],
    procedure: "A resectoscope is inserted through the urethra to remove excess prostate tissue.",
    benefits: [
      "Relieves urinary symptoms",
      "Improves urine flow",
      "Reduces frequency of urination",
      "Better quality of life",
      "Minimal invasiveness"
    ],
    faqs: [
      {
        question: "How long does the procedure take?",
        answer: "TURP typically takes 1-2 hours to complete."
      },
      {
        question: "What is the recovery time?",
        answer: "Most patients can return to normal activities within 1-2 weeks."
      }
    ],
    image: "/Transurethral Prostate Resection.jpeg",
    banner: "/Transurethral Prostate Resection banner.png",
    duration: "1-1.5 hours",
    recovery: "2-4 weeks"
  },
  "10": {
    name: "Modified Radical Mastectomy",
    description: "Advanced breast cancer surgery with comprehensive treatment approach and improved outcomes.",
    about: "Modified radical mastectomy is a surgical procedure to remove the breast and some lymph nodes while preserving chest muscles.",
    indications: [
      "Breast cancer",
      "Large tumors",
      "Multiple tumors",
      "Lymph node involvement",
      "High-risk cases"
    ],
    procedure: "The procedure involves removing the breast tissue, nipple, areola, and some lymph nodes while preserving the chest muscles for better reconstruction options.",
    benefits: [
      "Comprehensive cancer treatment",
      "Preserves chest muscles",
      "Better reconstruction options",
      "Reduced risk of recurrence",
      "Improved survival rates"
    ],
    faqs: [
      {
        question: "What is the recovery time after mastectomy?",
        answer: "Recovery typically takes 4-6 weeks, with gradual return to normal activities."
      },
      {
        question: "Can I have breast reconstruction after mastectomy?",
        answer: "Yes, breast reconstruction can be performed immediately or delayed after mastectomy."
      }
    ],
    image: "/Modified Radical Mastectomy .jpeg",
    banner: "/Modified Radical Mastectomy banner.png",
    duration: "2-4 hours",
    recovery: "4-6 weeks"
  }
};

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\./g, '')
    .replace(/\s+/g, '-');

const SurgeryDetail = () => {
  const { slug } = useParams();
  const surgeries = Object.values(surgeryData);
  let surgery = surgeries.find((s) => toSlug(s.name) === slug);
  if (!surgery && slug && surgeryData[slug as keyof typeof surgeryData]) {
    surgery = surgeryData[slug as keyof typeof surgeryData];
  }

  if (!surgery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Surgery Not Found</h1>
          <p className="text-muted-foreground mb-6">The surgery you are looking for does not exist.</p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Generate SEO data for the surgery detail page
  const structuredData = [
    getMedicalOrganizationSchema(),
    ...(surgery.faqs && surgery.faqs.length > 0 ? [getFAQPageSchema(surgery.faqs)] : [])
  ];

  const seoData = {
    title: `${surgery.name} | Minimally Invasive Surgery - Maiya Hospital`,
    description: `Advanced ${surgery.name.toLowerCase()} at Maiya Hospital Bangalore. Minimally invasive surgery, faster recovery, expert surgeons. Best ${surgery.name.toLowerCase()} treatment available.`,
    keywords: `${surgery.name.toLowerCase()} bangalore, minimally invasive surgery, ${surgery.name.toLowerCase()} jayanagar, best ${surgery.name.toLowerCase()} surgeon, ${surgery.name.toLowerCase()} treatment bangalore`,
    canonical: `https://maiyahospital.in/deluxe-surgeries/${toSlug(surgery.name)}`,
    ogTitle: `${surgery.name} | Minimally Invasive Surgery - Maiya Hospital`,
    ogDescription: `Advanced ${surgery.name.toLowerCase()} at Maiya Hospital Bangalore. Minimally invasive surgery, faster recovery, expert surgeons.`,
    ogImage: `https://maiyahospital.in/surgery-${toSlug(surgery.name)}-og.jpg`,
    twitterTitle: `${surgery.name} | Minimally Invasive Surgery - Maiya Hospital`,
    twitterDescription: `Advanced ${surgery.name.toLowerCase()} at Maiya Hospital Bangalore. Minimally invasive surgery, faster recovery, expert surgeons.`,
    twitterImage: `https://maiyahospital.in/surgery-${toSlug(surgery.name)}-twitter.jpg`,
    structuredData
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm mb-6">
              <Scissors className="w-4 h-4" />
              <span>Advanced Surgery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {surgery.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {surgery.description}
            </p>
          </div>

                     {/* Surgery Banner Image */}
           <div className="relative mb-12">
             <div className="w-full h-auto rounded-2xl shadow-2xl overflow-hidden">
               <img 
                 src={surgery.banner} 
                 alt={`${surgery.name} - Maiya Hospital`}
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

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Surgery Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">About {surgery.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {surgery.about}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Indications</h4>
                    <div className="flex flex-wrap gap-2">
                      {surgery.indications.map((indication, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {indication}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {surgery.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Procedure */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Surgical Procedure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {surgery.procedure}
                  </p>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground text-center">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {surgery.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Surgery Image */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardContent className="p-6">
                                     <div className="w-full h-64 rounded-xl overflow-hidden mb-4">
                     <img 
                       src={surgery.image} 
                       alt={`${surgery.name} - Maiya Hospital`}
                       className="w-full h-full object-contain"
                       onError={(e) => {
                         // Fallback to a gradient if image fails to load
                         e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #1d4ed8)';
                         e.currentTarget.style.display = 'flex';
                         e.currentTarget.style.alignItems = 'center';
                         e.currentTarget.style.justifyContent = 'center';
                         e.currentTarget.innerHTML = '<svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
                       }}
                     />
                   </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{surgery.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{surgery.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold">{surgery.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recovery:</span>
                      <span className="font-semibold">{surgery.recovery}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="glass shadow-2xl border border-white/80 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Ready for Your Surgery?</h3>
                  <p className="text-white/90 mb-4">
                    Contact our expert surgeons to discuss your {surgery.name} procedure and schedule your consultation.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button 
                      className="bg-white text-green-600 hover:bg-gray-100"
                      onClick={() => window.location.href = '/appointment'}
                    >
                      Book Consultation
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-green-600"
                      onClick={() => window.location.href = '/doctors'}
                    >
                      Meet Our Surgeons
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="glass shadow-2xl border border-white/80">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-muted-foreground">070223 16149</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-muted-foreground">info@maiyahospital.in</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-muted-foreground">Jayanagar, Bangalore</span>
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

export default SurgeryDetail; 