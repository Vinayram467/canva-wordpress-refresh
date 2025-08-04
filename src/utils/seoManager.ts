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

// Centralized SEO Configuration - Optimized for Maiya Hospital Bangalore
export const SEO_CONFIG: PageSEOConfig = {
  // Homepage
  home: {
    title: "Maiya Multi Speciality Hospital Bangalore | Best Hospital in Bangalore | 24/7 Emergency Care",
    description: "Maiya Multi Speciality Hospital Bangalore - Leading hospital in Bangalore offering expert doctors, advanced treatments, emergency care, and comprehensive healthcare services. Book appointment online.",
    keywords: "Maiya Hospital Bangalore, best hospital Bangalore, multi speciality hospital Bangalore, emergency hospital Bangalore, medical center Bangalore, healthcare Bangalore, doctors Bangalore, hospital near me",
    canonical: "https://maiyahospital.in/",
    ogTitle: "Maiya Multi Speciality Hospital Bangalore | Best Hospital in Bangalore",
    ogDescription: "Leading hospital in Bangalore offering expert doctors, advanced treatments, emergency care, and comprehensive healthcare services. Book appointment online.",
    ogImage: "https://maiyahospital.in/og-image.jpg",
    twitterTitle: "Maiya Multi Speciality Hospital Bangalore | Best Hospital in Bangalore",
    twitterDescription: "Leading hospital in Bangalore offering expert doctors, advanced treatments, emergency care, and comprehensive healthcare services.",
    twitterImage: "https://maiyahospital.in/twitter-image.jpg"
  },

  // Doctors Page
  doctors: {
    title: "Best Doctors in Bangalore | Expert Medical Specialists | Maiya Hospital Bangalore",
    description: "Find the best doctors and medical specialists in Bangalore at Maiya Hospital. Expert cardiologists, surgeons, gynecologists, pediatricians, and more. Book consultation online.",
    keywords: "best doctors Bangalore, medical specialists Bangalore, cardiologist Bangalore, surgeon Bangalore, gynecologist Bangalore, pediatrician Bangalore, expert doctors Bangalore, medical consultation Bangalore",
    canonical: "https://maiyahospital.in/doctors",
    ogTitle: "Best Doctors in Bangalore | Expert Medical Specialists | Maiya Hospital",
    ogDescription: "Find the best doctors and medical specialists in Bangalore at Maiya Hospital. Expert cardiologists, surgeons, gynecologists, pediatricians, and more.",
    ogImage: "https://maiyahospital.in/doctors-og.jpg"
  },

  // Services Page
  services: {
    title: "Medical Services in Bangalore | Healthcare Services | Maiya Hospital Bangalore",
    description: "Comprehensive medical services in Bangalore including surgery, consultation, diagnostics, emergency care, and specialized treatments. Advanced medical facilities at Maiya Hospital.",
    keywords: "medical services Bangalore, healthcare services Bangalore, surgery Bangalore, medical consultation Bangalore, diagnostics Bangalore, emergency care Bangalore, specialized treatments Bangalore",
    canonical: "https://maiyahospital.in/services",
    ogTitle: "Medical Services in Bangalore | Healthcare Services | Maiya Hospital",
    ogDescription: "Comprehensive medical services in Bangalore including surgery, consultation, diagnostics, emergency care, and specialized treatments.",
    ogImage: "https://maiyahospital.in/services-og.jpg"
  },

  // Contact Page
  contact: {
    title: "Contact Maiya Hospital Bangalore | Hospital Contact Number | Get in Touch",
    description: "Contact Maiya Hospital Bangalore for appointments, consultations, or emergency care. Call our 24/7 helpline or visit our hospital in Bangalore. We're here to help.",
    keywords: "contact Maiya Hospital Bangalore, hospital contact number Bangalore, medical appointment Bangalore, emergency contact Bangalore, hospital address Bangalore",
    canonical: "https://maiyahospital.in/contact",
    ogTitle: "Contact Maiya Hospital Bangalore | Hospital Contact Number",
    ogDescription: "Contact Maiya Hospital Bangalore for appointments, consultations, or emergency care. Call our 24/7 helpline or visit our hospital in Bangalore.",
    ogImage: "https://maiyahospital.in/contact-og.jpg"
  },

  // Appointment Page
  appointment: {
    title: "Book Medical Appointment Online Bangalore | Maiya Hospital Appointment",
    description: "Book your medical appointment online with Maiya Hospital Bangalore. Easy scheduling, expert doctors, and comprehensive healthcare services. Get appointment confirmation instantly.",
    keywords: "book appointment Bangalore, medical appointment Bangalore, online appointment Bangalore, doctor appointment Bangalore, hospital appointment Bangalore, healthcare appointment Bangalore",
    canonical: "https://maiyahospital.in/appointment",
    ogTitle: "Book Medical Appointment Online Bangalore | Maiya Hospital",
    ogDescription: "Book your medical appointment online with Maiya Hospital Bangalore. Easy scheduling, expert doctors, and comprehensive healthcare services.",
    ogImage: "https://maiyahospital.in/appointment-og.jpg"
  },

  // Virtual Consultation
  virtualConsultation: {
    title: "Online Doctor Consultation Bangalore | Virtual Medical Consultation | Maiya Hospital",
    description: "Get online doctor consultation in Bangalore from expert doctors at Maiya Hospital. Virtual medical consultation, telemedicine services, and remote healthcare. Book online consultation.",
    keywords: "online doctor consultation Bangalore, virtual consultation Bangalore, telemedicine Bangalore, remote consultation Bangalore, online medical consultation Bangalore, video consultation Bangalore",
    canonical: "https://maiyahospital.in/virtual-consultation",
    ogTitle: "Online Doctor Consultation Bangalore | Virtual Medical Consultation",
    ogDescription: "Get online doctor consultation in Bangalore from expert doctors at Maiya Hospital. Virtual medical consultation, telemedicine services, and remote healthcare.",
    ogImage: "https://maiyahospital.in/virtual-consultation-og.jpg"
  },

  // Blogs Page
  blogs: {
    title: "Health Blog Bangalore | Medical Articles | Healthcare Tips | Maiya Hospital",
    description: "Read expert health articles, medical insights, and healthcare tips from our medical professionals in Bangalore. Stay informed about health and wellness with Maiya Hospital blog.",
    keywords: "health blog Bangalore, medical articles Bangalore, healthcare tips Bangalore, health insights Bangalore, medical blog Bangalore, health information Bangalore",
    canonical: "https://maiyahospital.in/blogs",
    ogTitle: "Health Blog Bangalore | Medical Articles | Healthcare Tips",
    ogDescription: "Read expert health articles, medical insights, and healthcare tips from our medical professionals in Bangalore. Stay informed about health and wellness.",
    ogImage: "https://maiyahospital.in/blogs-og.jpg"
  },

  // Events Page
  events: {
    title: "Medical Events Bangalore | Health Camps | Wellness Programs | Maiya Hospital",
    description: "Attend medical events, health camps, and wellness programs at Maiya Hospital Bangalore. Free health screenings, medical awareness programs, and community health initiatives.",
    keywords: "medical events Bangalore, health camps Bangalore, wellness programs Bangalore, health screenings Bangalore, medical awareness Bangalore, community health Bangalore",
    canonical: "https://maiyahospital.in/events",
    ogTitle: "Medical Events Bangalore | Health Camps | Wellness Programs",
    ogDescription: "Attend medical events, health camps, and wellness programs at Maiya Hospital Bangalore. Free health screenings and medical awareness programs.",
    ogImage: "https://maiyahospital.in/events-og.jpg"
  },

  // Deluxe Surgeries
  deluxeSurgeries: {
    title: "Advanced Surgery Bangalore | Deluxe Surgical Procedures | Maiya Hospital",
    description: "Advanced surgical procedures with premium care at Maiya Hospital Bangalore. Expert surgeons, state-of-the-art facilities, and personalized treatment for complex surgeries.",
    keywords: "advanced surgery Bangalore, deluxe surgery Bangalore, surgical procedures Bangalore, expert surgeons Bangalore, premium healthcare Bangalore, complex surgery Bangalore",
    canonical: "https://maiyahospital.in/deluxe-surgeries",
    ogTitle: "Advanced Surgery Bangalore | Deluxe Surgical Procedures",
    ogDescription: "Advanced surgical procedures with premium care at Maiya Hospital Bangalore. Expert surgeons, state-of-the-art facilities, and personalized treatment.",
    ogImage: "https://maiyahospital.in/deluxe-surgeries-og.jpg"
  },

  // Specialties Page
  specialties: {
    title: "Medical Specialties Bangalore | Specialized Treatments | Maiya Hospital",
    description: "Expert medical specialties and specialized treatments in Bangalore at Maiya Hospital. Cardiology, orthopedics, neurology, oncology, and more specialized medical care.",
    keywords: "medical specialties Bangalore, specialized treatments Bangalore, cardiology Bangalore, orthopedics Bangalore, neurology Bangalore, oncology Bangalore, specialized care Bangalore",
    canonical: "https://maiyahospital.in/specialties",
    ogTitle: "Medical Specialties Bangalore | Specialized Treatments",
    ogDescription: "Expert medical specialties and specialized treatments in Bangalore at Maiya Hospital. Cardiology, orthopedics, neurology, oncology, and more.",
    ogImage: "https://maiyahospital.in/specialties-og.jpg"
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
        title: `Dr. ${data.name} - ${data.specialty} in Bangalore | Best ${data.specialty} | Maiya Hospital`,
        description: `Meet Dr. ${data.name}, expert ${data.specialty} in Bangalore. ${data.experience} years of experience, advanced treatments. Book consultation today at Maiya Hospital.`,
        canonical: `https://maiyahospital.in/doctor/${data.slug}`,
        ogTitle: `Dr. ${data.name} - ${data.specialty} in Bangalore | Maiya Hospital`,
        ogDescription: `Meet Dr. ${data.name}, expert ${data.specialty} in Bangalore. ${data.experience} years of experience, advanced treatments.`,
        ogImage: data.image || baseConfig.ogImage
      };
    
    case 'service':
      return {
        ...baseConfig,
        title: `${data.name} in Bangalore | Expert ${data.name} Treatment | Maiya Hospital`,
        description: `Expert ${data.name} treatment in Bangalore at Maiya Hospital. Advanced facilities, experienced specialists, comprehensive care. Book consultation today.`,
        canonical: `https://maiyahospital.in/service/${data.slug}`,
        ogTitle: `${data.name} in Bangalore | Expert Treatment | Maiya Hospital`,
        ogDescription: `Expert ${data.name} treatment in Bangalore at Maiya Hospital. Advanced facilities, experienced specialists, comprehensive care.`,
        ogImage: data.image || baseConfig.ogImage
      };
    
    case 'blog':
      return {
        ...baseConfig,
        title: `${data.title} | Health Blog Bangalore | Maiya Hospital`,
        description: data.summary || data.description,
        canonical: `https://maiyahospital.in/blog/${data.slug}`,
        ogTitle: `${data.title} | Health Blog Bangalore | Maiya Hospital`,
        ogDescription: data.summary || data.description,
        ogImage: data.image || baseConfig.ogImage
      };
    
    case 'event':
      return {
        ...baseConfig,
        title: `${data.title} | Medical Event Bangalore | Maiya Hospital`,
        description: data.description,
        canonical: `https://maiyahospital.in/event/${data.slug}`,
        ogTitle: `${data.title} | Medical Event Bangalore | Maiya Hospital`,
        ogDescription: data.description,
        ogImage: data.image || baseConfig.ogImage
      };
    
    default:
      return baseConfig;
  }
}; 