import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Clock, Shield, Award, Heart, Users, Activity } from "lucide-react";

// Surgery data - this would normally come from an API
const surgeryData = {
  "laparoscopic-hernia-repair": {
    name: "Laparoscopic Herina Repair",
    description: "We make life pain-free with Laparoscopic Hernia Repair that ensures better recovery and no discomfort.",
    about: "Laparoscopic hernia repair is a **minimally invasive surgical** procedure done to repair the protrusion.",
    indications: [
      "Inguinal - Protrusion happens in the inner groin",
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
    ]
  },
  "laparoscopic-gall-bladder-removal": {
    name: "Laparoscopic GallBlaadder Removal",
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
    ]
  },
  "laparoscopic-hysterectomy": {
    name: "Laparascopic Hysterectomy",
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
    ]
  },
  "arthroscopy": {
    name: "Arthroscopy Surgery",
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
    ]
  },
  "total-knee-replacement": {
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
    ]
  },
  "total-hip-replacement": {
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
    ]
  },
  "kidney-stone-removal": {
    name: "Kidney stone removal",
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
    ]
  },
  "dj-stenting": {
    name: "Dj Stenting",
    description: "Double J stenting procedure for urinary tract obstruction relief.",
    about: "DJ stenting is a procedure to place a stent in the ureter to maintain urine flow from the kidney to the bladder.",
    indications: [
      "Ureteral obstruction",
      "Kidney stones",
      "Ureteral strictures",
      "Post-surgical support",
      "Cancer-related obstruction"
    ],
    procedure: "A flexible tube (stent) is placed in the ureter using endoscopic techniques.",
    benefits: [
      "Relieves obstruction",
      "Maintains kidney function",
      "Reduces pain",
      "Prevents complications",
      "Temporary solution"
    ],
    faqs: [
      {
        question: "How long does the stent stay in place?",
        answer: "Stents are typically left in place for 2-6 weeks depending on the condition."
      },
      {
        question: "Will I feel the stent?",
        answer: "Some patients may experience mild discomfort or urinary symptoms."
      }
    ]
  },
  "turp": {
    name: "Transurethral Prostate Resection",
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
    ]
  },
  "modified-radical-mastectomy": {
    name: "Modified Radical Mastectomy",
    description: "Comprehensive breast cancer treatment with advanced surgical techniques.",
    about: "Modified radical mastectomy is a surgical procedure to remove the breast and lymph nodes for breast cancer treatment.",
    indications: [
      "Breast cancer",
      "Large tumors",
      "Multiple tumors",
      "Inflammatory breast cancer",
      "Prevention in high-risk patients"
    ],
    procedure: "The entire breast and some lymph nodes are removed while preserving the chest muscles.",
    benefits: [
      "Effective cancer treatment",
      "Reduced risk of recurrence",
      "Comprehensive lymph node evaluation",
      "Preserves chest muscles",
      "Better cosmetic outcomes"
    ],
    faqs: [
      {
        question: "Will I need chemotherapy after surgery?",
        answer: "The need for chemotherapy depends on the stage and type of cancer."
      },
      {
        question: "Can I have breast reconstruction?",
        answer: "Yes, breast reconstruction can be performed immediately or later."
      }
    ]
  }
};

const SurgeryDetail = () => {
  const { slug } = useParams();
  const surgery = surgeryData[slug];

  // Dynamically generate the banner path based on the surgery name
  const bannerPath = surgery ? `/${surgery.name} banner.png` : '';

  if (!surgery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Surgery Not Found</h2>
          <Link to="/deluxe-surgeries">
            <Button>Back to Deluxe Surgeries</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <Header />
      
      {/* Banner */}
      <div 
        className="w-full h-screen relative"
        style={{
          backgroundImage: `url('${bannerPath}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      </div>

      {/* About Surgery */}
      <section className="container mx-auto px-4 py-16">
        <Card className="glass shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground">About {surgery.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">{surgery.about}</p>
            
            <h3 className="text-2xl font-semibold text-foreground mb-4">What are the indications of {surgery.name.toLowerCase()}?</h3>
            <p className="text-muted-foreground mb-4">
              A hernia is a protrusion of internal organs or other parts of the body through the muscle wall or tissue that usually contains it. Abdomen is the most common site for hernia development is the abdomen due to the weakening of the abdominal walls, which results in a bulge or tear. The most common types of hernia are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {surgery.indications.map((indication, index) => (
                <li key={index} className="text-lg">{indication}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Procedure */}
      <section className="container mx-auto px-4 py-16">
        <Card className="glass shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground">How is the procedure done?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">{surgery.procedure}</p>
          </CardContent>
        </Card>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <Card className="glass shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground">What are the benefits of {surgery.name.toLowerCase()}?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Below-mentioned is some of the benefits:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {surgery.benefits.map((benefit, index) => (
                <li key={index} className="text-lg">{benefit}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Why Choose Maiya Hospital */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Maiya Hospital?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="glass shadow-xl text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Efficient and Empathetic Staff</h3>
              <p className="text-muted-foreground">Our health care professionals are dedicated to providing the best healthcare services, prioritizing the needs of the patient.</p>
            </CardContent>
          </Card>
          
          <Card className="glass shadow-xl text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Latest and Advanced Technology</h3>
              <p className="text-muted-foreground">We aim at providing the latest diagnostics, high-tech treatment facilities and constructive medical procedures at affordable prices.</p>
            </CardContent>
          </Card>
          
          <Card className="glass shadow-xl text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Transparent Pricing</h3>
              <p className="text-muted-foreground">We have a transparent pricing system with detailed information of tests, consultations and medical procedures.</p>
            </CardContent>
          </Card>
          
          <Card className="glass shadow-xl text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Patient-Centric Approach</h3>
              <p className="text-muted-foreground">We believe in adopting a patient centric approach to cater the individual needs of the patient.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions (FAQ's)</h2>
        </div>
        
        <Card className="glass shadow-xl">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {surgery.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Book Appointment Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="glass shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground">Book an Appointment</CardTitle>
            <p className="text-muted-foreground">Please fill out the form & our representative will contact you within 24hrs.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Patient Full Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Your Query</label>
                <textarea rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
              </div>
              <div className="md:col-span-2 text-center">
                <Button className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold">
                  Submit Request
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default SurgeryDetail; 