// SEO Management Utility
// This file provides a centralized way to manage all SEO-related data

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
}

export interface PageSEOConfig {
  [key: string]: SEOData;
}

// Centralized SEO Configuration - Optimized for Maiya Hospital Jayanagar, Bangalore
export const SEO_CONFIG: PageSEOConfig = {
  // Homepage
  home: {
    title: "Maiya Hospital: Best Multi Speciality Hospital in Jayanagar, Bangalore",
    description: "Experience comprehensive healthcare at Maiya Hospital, Jayanagar's leading multi-specialty facility. Offering 24/7 emergency care, expert doctors & advanced technology. Book your appointment today.",
    keywords: "multi speciality hospital jayanagar, best hospital jayanagar, emergency hospital bangalore, maiya hospital jayanagar, hospital near me, medical center jayanagar",
    canonical: "https://maiyahospital.in/",
    ogTitle: "Maiya Hospital: Best Multi Speciality Hospital in Jayanagar, Bangalore",
    ogDescription: "Experience comprehensive healthcare at Maiya Hospital, Jayanagar's leading multi-specialty facility. Offering 24/7 emergency care, expert doctors & advanced technology.",
    ogImage: "https://maiyahospital.in/og-image.jpg",
    twitterTitle: "Maiya Hospital: Best Multi Speciality Hospital in Jayanagar, Bangalore",
    twitterDescription: "Experience comprehensive healthcare at Maiya Hospital, Jayanagar's leading multi-specialty facility. Offering 24/7 emergency care, expert doctors & advanced technology.",
    twitterImage: "https://maiyahospital.in/twitter-image.jpg"
  },

  // Services Page
  services: {
    title: "Comprehensive Medical Services in Bangalore | Maiya Hospital",
    description: "Maiya Hospital offers comprehensive medical services in Jayanagar, Bangalore including emergency care, advanced diagnostics, and specialized treatments. State-of-the-art facilities with expert doctors.",
    keywords: "hospital services bangalore, medical services jayanagar, emergency care bangalore, diagnostic services jayanagar, medical facilities bangalore",
    canonical: "https://maiyahospital.in/services",
    ogTitle: "Comprehensive Medical Services in Bangalore | Maiya Hospital",
    ogDescription: "Maiya Hospital offers comprehensive medical services in Jayanagar, Bangalore including emergency care, advanced diagnostics, and specialized treatments.",
    ogImage: "https://maiyahospital.in/services-og.jpg"
  },

  // Specialties Page
  specialties: {
    title: "Expert Medical Specialities in Jayanagar | Maiya Hospital",
    description: "Discover expert medical specialities at Maiya Hospital in Jayanagar. From cardiology to orthopaedics, our specialists provide comprehensive care with advanced technology and compassionate service.",
    keywords: "medical specialities jayanagar, specialist doctors bangalore, cardiology jayanagar, orthopaedics bangalore, gynaecology jayanagar, urology bangalore",
    canonical: "https://maiyahospital.in/specialties",
    ogTitle: "Expert Medical Specialities in Jayanagar | Maiya Hospital",
    ogDescription: "Discover expert medical specialities at Maiya Hospital in Jayanagar. From cardiology to orthopaedics, our specialists provide comprehensive care.",
    ogImage: "https://maiyahospital.in/specialties-og.jpg"
  },

  // Deluxe Surgeries
  deluxeSurgeries: {
    title: "Advanced & Deluxe Surgeries in Bangalore | Maiya Hospital",
    description: "Experience advanced and deluxe surgical procedures at Maiya Hospital in Jayanagar. Our expert surgeons use state-of-the-art technology for minimally invasive surgeries with faster recovery.",
    keywords: "advanced laparoscopic surgery bangalore, deluxe surgeries jayanagar, keyhole surgery bangalore, minimally invasive surgery jayanagar, surgical procedures bangalore",
    canonical: "https://maiyahospital.in/deluxe-surgeries",
    ogTitle: "Advanced & Deluxe Surgeries in Bangalore | Maiya Hospital",
    ogDescription: "Experience advanced and deluxe surgical procedures at Maiya Hospital in Jayanagar. Our expert surgeons use state-of-the-art technology.",
    ogImage: "https://maiyahospital.in/deluxe-surgeries-og.jpg"
  },

  // Doctors Page
  doctors: {
    title: "Find Expert Doctors & Specialists in Jayanagar | Maiya Hospital",
    description: "Find the best doctors and medical specialists in Jayanagar at Maiya Hospital. Expert cardiologists, surgeons, gynecologists, pediatricians, and more. Book consultation online.",
    keywords: "best doctors in jayanagar bangalore, expert doctors jayanagar, specialist doctors bangalore, cardiologist jayanagar, surgeon bangalore, gynaecologist jayanagar",
    canonical: "https://maiyahospital.in/doctors",
    ogTitle: "Find Expert Doctors & Specialists in Jayanagar | Maiya Hospital",
    ogDescription: "Find the best doctors and medical specialists in Jayanagar at Maiya Hospital. Expert cardiologists, surgeons, gynecologists, pediatricians, and more.",
    ogImage: "https://maiyahospital.in/doctors-og.jpg"
  },

  // Contact Page
  contact: {
    title: "Contact Maiya Multi Speciality Hospital, Jayanagar, Bangalore",
    description: "Need to reach us? Find the address, phone number, and map for Maiya Hospital in Jayanagar. Contact us for appointments, emergencies, or inquiries. We are here to help.",
    keywords: "maiya hospital contact, hospital contact jayanagar, emergency contact bangalore, hospital address jayanagar, phone number maiya hospital",
    canonical: "https://maiyahospital.in/contact",
    ogTitle: "Contact Maiya Multi Speciality Hospital, Jayanagar, Bangalore",
    ogDescription: "Need to reach us? Find the address, phone number, and map for Maiya Hospital in Jayanagar. Contact us for appointments, emergencies, or inquiries.",
    ogImage: "https://maiyahospital.in/contact-og.jpg"
  },

  // Appointment Page
  appointment: {
    title: "Book an Appointment | Maiya Hospital, Jayanagar",
    description: "Book your medical appointment online with Maiya Hospital in Jayanagar. Easy scheduling, expert doctors, and comprehensive healthcare services. Get appointment confirmation instantly.",
    keywords: "book doctor appointment jayanagar, online appointment bangalore, hospital appointment jayanagar, doctor consultation bangalore, medical appointment jayanagar",
    canonical: "https://maiyahospital.in/appointment",
    ogTitle: "Book an Appointment | Maiya Hospital, Jayanagar",
    ogDescription: "Book your medical appointment online with Maiya Hospital in Jayanagar. Easy scheduling, expert doctors, and comprehensive healthcare services.",
    ogImage: "https://maiyahospital.in/appointment-og.jpg"
  },

  // Virtual Consultation
  virtualConsultation: {
    title: "Online Doctor Consultation in Jayanagar | Maiya Hospital Bangalore",
    description: "Get online doctor consultation in Jayanagar from expert doctors at Maiya Hospital. Virtual medical consultation, telemedicine services, and remote healthcare. Book online consultation.",
    keywords: "online doctor consultation jayanagar, virtual consultation bangalore, telemedicine jayanagar, remote consultation bangalore, online medical consultation jayanagar, video consultation bangalore",
    canonical: "https://maiyahospital.in/virtual-consultation",
    ogTitle: "Online Doctor Consultation in Jayanagar | Maiya Hospital Bangalore",
    ogDescription: "Get online doctor consultation in Jayanagar from expert doctors at Maiya Hospital. Virtual medical consultation, telemedicine services, and remote healthcare.",
    ogImage: "https://maiyahospital.in/virtual-consultation-og.jpg",
    twitterTitle: "Online Doctor Consultation in Jayanagar | Maiya Hospital Bangalore",
    twitterDescription: "Get online doctor consultation in Jayanagar from expert doctors at Maiya Hospital. Virtual medical consultation, telemedicine services, and remote healthcare.",
    twitterImage: "https://maiyahospital.in/virtual-consultation-twitter.jpg"
  },

  // Blogs Page
  blogs: {
    title: "Health Blog | Medical News & Tips - Maiya Hospital Bangalore",
    description: "Stay informed with Maiya Hospital's health blog. Latest medical news, health tips, wellness advice from expert doctors in Bangalore. Read health articles now.",
    keywords: "health blog bangalore, medical news updates, healthcare tips, health information bangalore, medical articles, maiya hospital blog, health tips jayanagar",
    canonical: "https://maiyahospital.in/blogs",
    ogTitle: "Health Blog | Medical News & Tips - Maiya Hospital Bangalore",
    ogDescription: "Stay informed with Maiya Hospital's health blog. Latest medical news, health tips, wellness advice from expert doctors in Bangalore.",
    ogImage: "https://maiyahospital.in/blogs-og.jpg",
    twitterTitle: "Health Blog | Medical News & Tips - Maiya Hospital Bangalore",
    twitterDescription: "Stay informed with Maiya Hospital's health blog. Latest medical news, health tips, wellness advice from expert doctors in Bangalore.",
    twitterImage: "https://maiyahospital.in/blogs-twitter.jpg"
  },

  // Events Page
  events: {
    title: "Medical Events & Health Camps in Jayanagar | Maiya Hospital Bangalore",
    description: "Attend medical events, health camps, and wellness programs at Maiya Hospital in Jayanagar. Free health screenings, medical awareness programs, and community health initiatives.",
    keywords: "medical events jayanagar, health camps bangalore, wellness programs jayanagar, health screenings bangalore, medical awareness jayanagar, community health bangalore, maiya hospital events",
    canonical: "https://maiyahospital.in/events",
    ogTitle: "Medical Events & Health Camps in Jayanagar | Maiya Hospital Bangalore",
    ogDescription: "Attend medical events, health camps, and wellness programs at Maiya Hospital in Jayanagar. Free health screenings and medical awareness programs.",
    ogImage: "https://maiyahospital.in/events-og.jpg",
    twitterTitle: "Medical Events & Health Camps in Jayanagar | Maiya Hospital Bangalore",
    twitterDescription: "Attend medical events, health camps, and wellness programs at Maiya Hospital in Jayanagar. Free health screenings and medical awareness programs.",
    twitterImage: "https://maiyahospital.in/events-twitter.jpg"
  },

  // 404 Page
  notFound: {
    title: "Page Not Found | Maiya Hospital Bangalore",
    description: "The page you are looking for could not be found. Please check the URL or return to the homepage of Maiya Hospital Bangalore.",
    keywords: "page not found, 404 error, maiya hospital bangalore, hospital website",
    canonical: "https://maiyahospital.in/404",
    ogTitle: "Page Not Found | Maiya Hospital Bangalore",
    ogDescription: "The page you are looking for could not be found. Please check the URL or return to the homepage.",
    ogImage: "https://maiyahospital.in/404-og.jpg",
    twitterTitle: "Page Not Found | Maiya Hospital Bangalore",
    twitterDescription: "The page you are looking for could not be found. Please check the URL or return to the homepage.",
    twitterImage: "https://maiyahospital.in/404-twitter.jpg"
  },

  // Core Service Pages
  icu: {
    title: "Advanced ICU & Critical Care Unit in Jayanagar | Maiya Hospital",
    description: "Maiya Hospital's advanced ICU provides critical care with state-of-the-art monitoring equipment and expert intensivists. 24/7 care for critically ill patients in Jayanagar, Bangalore.",
    keywords: "icu facility in jayanagar, critical care unit bangalore, intensive care jayanagar, emergency icu bangalore, critical care hospital jayanagar",
    canonical: "https://maiyahospital.in/icu",
    ogTitle: "Advanced ICU & Critical Care Unit in Jayanagar | Maiya Hospital",
    ogDescription: "Maiya Hospital's advanced ICU provides critical care with state-of-the-art monitoring equipment and expert intensivists. 24/7 care for critically ill patients.",
    ogImage: "https://maiyahospital.in/icu-og.jpg"
  },

  emergency: {
    title: "24/7 Emergency & Trauma Care in Jayanagar, Bangalore | Maiya Hospital",
    description: "Maiya Hospital provides 24/7 emergency and trauma care in Jayanagar. Expert emergency team, advanced equipment, and rapid response for all medical emergencies.",
    keywords: "24/7 emergency hospital bangalore, emergency care jayanagar, trauma center bangalore, emergency room jayanagar, urgent care bangalore",
    canonical: "https://maiyahospital.in/emergency",
    ogTitle: "24/7 Emergency & Trauma Care in Jayanagar, Bangalore | Maiya Hospital",
    ogDescription: "Maiya Hospital provides 24/7 emergency and trauma care in Jayanagar. Expert emergency team, advanced equipment, and rapid response for all medical emergencies.",
    ogImage: "https://maiyahospital.in/emergency-og.jpg"
  },

  laboratory: {
    title: "Advanced Diagnostic Laboratory Services in Jayanagar | Maiya Hospital",
    description: "Maiya Hospital's advanced laboratory offers comprehensive diagnostic services with cutting-edge technology and quick turnaround times. Accurate results for better healthcare decisions.",
    keywords: "advanced laboratory services bangalore, diagnostic lab jayanagar, medical tests bangalore, blood tests jayanagar, pathology lab bangalore",
    canonical: "https://maiyahospital.in/laboratory",
    ogTitle: "Advanced Diagnostic Laboratory Services in Jayanagar | Maiya Hospital",
    ogDescription: "Maiya Hospital's advanced laboratory offers comprehensive diagnostic services with cutting-edge technology and quick turnaround times.",
    ogImage: "https://maiyahospital.in/laboratory-og.jpg"
  },

  digitalXray: {
    title: "High-Resolution Digital X-Ray Services in Jayanagar, Bangalore | Maiya Hospital",
    description: "Get clear, precise diagnostic imaging with our advanced digital X-ray services at Maiya Hospital. Low radiation, instant results, and expert radiologist analysis.",
    keywords: "digital x-ray centre jayanagar, x-ray services bangalore, diagnostic imaging jayanagar, radiology services bangalore, medical imaging jayanagar",
    canonical: "https://maiyahospital.in/digital-xray",
    ogTitle: "High-Resolution Digital X-Ray Services in Jayanagar, Bangalore | Maiya Hospital",
    ogDescription: "Get clear, precise diagnostic imaging with our advanced digital X-ray services at Maiya Hospital. Low radiation, instant results, and expert radiologist analysis.",
    ogImage: "https://maiyahospital.in/digital-xray-og.jpg"
  },

  modularOT: {
    title: "State-of-the-Art Modular Operation Theatre in Jayanagar | Maiya Hospital",
    description: "Our advanced modular operation theatres ensure the highest standards of safety and sterility for all surgical procedures, minimizing infection risk and improving outcomes.",
    keywords: "modular operation theatre bangalore, surgical theatre jayanagar, operation room bangalore, sterile surgery jayanagar, advanced ot bangalore",
    canonical: "https://maiyahospital.in/modular-ot",
    ogTitle: "State-of-the-Art Modular Operation Theatre in Jayanagar | Maiya Hospital",
    ogDescription: "Our advanced modular operation theatres ensure the highest standards of safety and sterility for all surgical procedures, minimizing infection risk and improving outcomes.",
    ogImage: "https://maiyahospital.in/modular-ot-og.jpg"
  },

  gynaecOT: {
    title: "Dedicated Gynaecology & Obstetrics OT in Jayanagar | Maiya Hospital",
    description: "Maiya Hospital features a dedicated Gynaecology Operation Theatre for safe and specialized surgical care for women, including C-sections and laparoscopic procedures.",
    keywords: "dedicated gynaecology ot bangalore, women surgery jayanagar, c-section theatre bangalore, gynaecology surgery jayanagar, obstetrics ot bangalore",
    canonical: "https://maiyahospital.in/gynaec-ot",
    ogTitle: "Dedicated Gynaecology & Obstetrics OT in Jayanagar | Maiya Hospital",
    ogDescription: "Maiya Hospital features a dedicated Gynaecology Operation Theatre for safe and specialized surgical care for women, including C-sections and laparoscopic procedures.",
    ogImage: "https://maiyahospital.in/gynaec-ot-og.jpg"
  },

  ambulance: {
    title: "24/7 Ambulance Service in Jayanagar & South Bangalore | Maiya Hospital",
    description: "Need an ambulance in Bangalore? Maiya Hospital provides a 24/7 fully-equipped ambulance service with trained paramedics for fast and safe patient transport.",
    keywords: "24/7 ambulance service jayanagar, emergency ambulance bangalore, patient transport jayanagar, medical ambulance bangalore, emergency transport jayanagar",
    canonical: "https://maiyahospital.in/ambulance",
    ogTitle: "24/7 Ambulance Service in Jayanagar & South Bangalore | Maiya Hospital",
    ogDescription: "Need an ambulance in Bangalore? Maiya Hospital provides a 24/7 fully-equipped ambulance service with trained paramedics for fast and safe patient transport.",
    ogImage: "https://maiyahospital.in/ambulance-og.jpg"
  },

  ultrasound: {
    title: "Advanced Ultrasound & Sonography Centre in Jayanagar, Bangalore | Maiya Hospital",
    description: "Maiya Hospital offers comprehensive ultrasound scanning services, including pregnancy scans, abdominal scans, and doppler studies, with detailed and timely reports.",
    keywords: "ultrasound scan centre jayanagar, sonography services bangalore, pregnancy scan jayanagar, abdominal scan bangalore, doppler study jayanagar",
    canonical: "https://maiyahospital.in/ultrasound",
    ogTitle: "Advanced Ultrasound & Sonography Centre in Jayanagar, Bangalore | Maiya Hospital",
    ogDescription: "Maiya Hospital offers comprehensive ultrasound scanning services, including pregnancy scans, abdominal scans, and doppler studies, with detailed and timely reports.",
    ogImage: "https://maiyahospital.in/ultrasound-og.jpg"
  },

  labourRoom: {
    title: "Private & Comfortable Labour Delivery Rooms in Jayanagar | Maiya Hospital",
    description: "Experience a safe and supportive birthing environment in our modern labour, delivery, and recovery (LDR) rooms. Our expert team is here for you and your baby.",
    keywords: "best labour room facilities bangalore, delivery room jayanagar, birthing centre bangalore, ldr rooms jayanagar, maternity care bangalore",
    canonical: "https://maiyahospital.in/labour-room",
    ogTitle: "Private & Comfortable Labour Delivery Rooms in Jayanagar | Maiya Hospital",
    ogDescription: "Experience a safe and supportive birthing environment in our modern labour, delivery, and recovery (LDR) rooms. Our expert team is here for you and your baby.",
    ogImage: "https://maiyahospital.in/labour-room-og.jpg"
  },

  wards: {
    title: "Comfortable Inpatient Wards & Rooms in Jayanagar | Maiya Hospital",
    description: "Maiya Hospital offers a range of clean, comfortable, and well-equipped inpatient wards (Private, Semi-Private) to ensure a restful recovery environment for patients.",
    keywords: "hospital wards jayanagar, inpatient rooms bangalore, private ward jayanagar, semi-private room bangalore, patient accommodation jayanagar",
    canonical: "https://maiyahospital.in/wards",
    ogTitle: "Comfortable Inpatient Wards & Rooms in Jayanagar | Maiya Hospital",
    ogDescription: "Maiya Hospital offers a range of clean, comfortable, and well-equipped inpatient wards (Private, Semi-Private) to ensure a restful recovery environment for patients.",
    ogImage: "https://maiyahospital.in/wards-og.jpg"
  }
};

// Function to get SEO data for a specific page
export const getSEOData = (pageKey: string): SEOData => {
  return SEO_CONFIG[pageKey] || SEO_CONFIG.home;
};

// Function to update SEO data for a specific page
export const updateSEOData = (pageKey: string, newData: Partial<SEOData>): void => {
  if (SEO_CONFIG[pageKey]) {
    SEO_CONFIG[pageKey] = { ...SEO_CONFIG[pageKey], ...newData };
  }
};

// Function to add a new page SEO configuration
export const addPageSEO = (pageKey: string, seoData: SEOData): void => {
  SEO_CONFIG[pageKey] = seoData;
};

// Function to remove a page SEO configuration
export const removePageSEO = (pageKey: string): void => {
  delete SEO_CONFIG[pageKey];
};

// Function to get all page keys
export const getAllPageKeys = (): string[] => {
  return Object.keys(SEO_CONFIG);
};

// Function to export SEO configuration
export const exportSEOConfig = (): PageSEOConfig => {
  return { ...SEO_CONFIG };
};

// Function to import SEO configuration
export const importSEOConfig = (config: PageSEOConfig): void => {
  Object.assign(SEO_CONFIG, config);
};

// Validation function for SEO data
export const validateSEOData = (data: SEOData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title || data.title.length < 10) {
    errors.push("Title should be at least 10 characters long");
  }

  if (!data.description || data.description.length < 50) {
    errors.push("Description should be at least 50 characters long");
  }

  if (data.title && data.title.length > 60) {
    errors.push("Title should not exceed 60 characters");
  }

  if (data.description && data.description.length > 160) {
    errors.push("Description should not exceed 160 characters");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// SEO Analytics Helper
export const trackSEOEvent = (event: string, data?: any): void => {
  // This can be integrated with Google Analytics or other tracking tools
  console.log(`SEO Event: ${event}`, data);
};

// Dynamic SEO Generator for Dynamic Pages
export const generateDynamicSEO = (
  pageType: 'doctor' | 'service' | 'blog' | 'event',
  data: any
): SEOData => {
  const baseConfig = SEO_CONFIG[pageType] || SEO_CONFIG.home;
  
  switch (pageType) {
    case 'doctor':
      return {
        ...baseConfig,
        title: `Dr. ${data.name} - Best ${data.specialty} in Jayanagar | Maiya Hospital`,
        description: `Dr. ${data.name} is a leading ${data.specialty} at Maiya Hospital, Jayanagar, with ${data.experience} years of experience in ${data.keyAreas}. Book a consultation today.`,
        canonical: `https://maiyahospital.in/doctor/${data.slug}`,
        ogTitle: `Dr. ${data.name} - Best ${data.specialty} in Jayanagar | Maiya Hospital`,
        ogDescription: `Dr. ${data.name} is a leading ${data.specialty} at Maiya Hospital, Jayanagar, with ${data.experience} years of experience in ${data.keyAreas}.`,
        ogImage: data.image || baseConfig.ogImage
      };
    
    case 'service':
      return {
        ...baseConfig,
        title: `${data.name} in Jayanagar | Expert ${data.name} Treatment | Maiya Hospital`,
        description: `Expert ${data.name} treatment in Jayanagar at Maiya Hospital. Advanced facilities, experienced specialists, comprehensive care. Book consultation today.`,
        canonical: `https://maiyahospital.in/service/${data.slug}`,
        ogTitle: `${data.name} in Jayanagar | Expert Treatment | Maiya Hospital`,
        ogDescription: `Expert ${data.name} treatment in Jayanagar at Maiya Hospital. Advanced facilities, experienced specialists, comprehensive care.`,
        ogImage: data.image || baseConfig.ogImage
      };
    
    case 'blog':
      return {
        ...baseConfig,
        title: `${data.title} | Maiya Hospital Health Blog, Jayanagar`,
        description: data.summary || data.description,
        canonical: `https://maiyahospital.in/blog/${data.slug}`,
        ogTitle: `${data.title} | Maiya Hospital Health Blog, Jayanagar`,
        ogDescription: data.summary || data.description,
        ogImage: data.image || baseConfig.ogImage
      };
    
    case 'event':
      return {
        ...baseConfig,
        title: `${data.title} | Medical Event in Jayanagar | Maiya Hospital`,
        description: data.description,
        canonical: `https://maiyahospital.in/event/${data.slug}`,
        ogTitle: `${data.title} | Medical Event in Jayanagar | Maiya Hospital`,
        ogDescription: data.description,
        ogImage: data.image || baseConfig.ogImage
      };
    
    default:
      return baseConfig;
  }
}; 
