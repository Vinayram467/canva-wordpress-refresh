export const getMedicalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Maiya Multi Speciality Hospital",
  "url": "https://maiyahospital.in",
  "logo": "https://maiyahospital.in/lovable-uploads/Maiya_-_LOGOS_page-0004-removebg-preview.png",
  "description": "Leading multi-speciality hospital in Jayanagar, Bangalore offering expert doctors, advanced treatments, emergency care, and comprehensive healthcare services.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Hospital Address",
    "addressLocality": "Jayanagar",
    "addressRegion": "Karnataka",
    "postalCode": "Your Postal Code",
    "addressCountry": "IN"
  },
  "telephone": "+91 98450 12345",
  "email": "info@maiyahospital.in",
  "sameAs": [
    "https://facebook.com/maiyahospital",
    "https://twitter.com/maiyahospital",
    "https://instagram.com/maiyahospital"
  ],
  "openingHours": [
    "Mo-Su 00:00-23:59"
  ],
  "priceRange": "₹₹",
  "medicalSpecialty": [
    "Cardiology",
    "Orthopedics",
    "Neurology",
    "Oncology",
    "Gynecology",
    "Pediatrics",
    "General Surgery",
    "Emergency Medicine",
    "Urology",
    "ENT",
    "Plastic Surgery",
    "Radiology",
    "Pulmonology",
    "Ophthalmology",
    "Dermatology",
    "Dentistry",
    "Physiotherapy",
    "Psychiatry",
    "Anaesthesia",
    "Surgical Gastroenterology",
    "Medical Oncology",
    "Vascular Surgery",
    "Surgical Oncology"
  ],
  "availableService": [
    {
      "@type": "MedicalService",
      "name": "24/7 Emergency Care",
      "description": "Round-the-clock emergency and trauma care with expert emergency team and advanced equipment"
    },
    {
      "@type": "MedicalService", 
      "name": "Advanced ICU",
      "description": "Critical care unit with state-of-the-art monitoring equipment and expert intensivists"
    },
    {
      "@type": "MedicalService",
      "name": "Modular Operation Theatre",
      "description": "State-of-the-art modular operation theatres ensuring highest standards of safety and sterility"
    },
    {
      "@type": "MedicalService",
      "name": "Digital X-Ray Services",
      "description": "High-resolution digital X-ray services with low radiation and instant results"
    },
    {
      "@type": "MedicalService",
      "name": "Advanced Laboratory",
      "description": "Comprehensive diagnostic services with cutting-edge technology and quick turnaround times"
    },
    {
      "@type": "MedicalService",
      "name": "Ultrasound & Sonography",
      "description": "Comprehensive ultrasound scanning services including pregnancy scans and doppler studies"
    },
    {
      "@type": "MedicalService",
      "name": "Ambulance Service",
      "description": "24/7 fully-equipped ambulance service with trained paramedics for patient transport"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Medical Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalService",
          "name": "Cardiology Consultation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalService",
          "name": "Orthopedic Surgery"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalService",
          "name": "Laparoscopic Surgery"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalService",
          "name": "Emergency Care"
        }
      }
    ]
  },
  "areaServed": {
    "@type": "City",
    "name": "Jayanagar, Bangalore"
  },
  "serviceArea": {
    "@type": "City",
    "name": "South Bangalore"
  }
});

export const getPhysicianSchema = (doctor: any) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": doctor.name,
  "description": doctor.specialization,
  "medicalSpecialty": doctor.specialization,
  "image": doctor.image,
  "url": `https://maiyahospital.in/doctor/${doctor.slug}`,
  "worksFor": {
    "@type": "MedicalOrganization",
    "name": "Maiya Multi Speciality Hospital"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jayanagar",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "areaServed": {
    "@type": "City",
    "name": "Jayanagar, Bangalore"
  }
});

export const getMedicalProcedureSchema = (procedure: any) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": procedure.name,
  "description": procedure.description,
  "bodyLocation": procedure.bodyLocation,
  "preparation": procedure.preparation,
  "followup": procedure.followup,
  "howPerformed": procedure.howPerformed,
  "procedureType": procedure.procedureType,
  "performedAt": {
    "@type": "MedicalOrganization",
    "name": "Maiya Multi Speciality Hospital"
  }
});

export const getHospitalSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Hospital",
  "name": "Maiya Multi Speciality Hospital",
  "url": "https://maiyahospital.in",
  "description": "Leading multi-speciality hospital in Jayanagar, Bangalore providing comprehensive healthcare services",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Hospital Address",
    "addressLocality": "Jayanagar",
    "addressRegion": "Karnataka",
    "postalCode": "Your Postal Code",
    "addressCountry": "IN"
  },
  "telephone": "+91 98450 12345",
  "openingHours": "Mo-Su 00:00-23:59",
  "medicalSpecialty": [
    "Cardiology",
    "Orthopedics", 
    "Neurology",
    "Oncology",
    "Gynecology",
    "Pediatrics",
    "General Surgery",
    "Emergency Medicine",
    "Urology",
    "ENT",
    "Plastic Surgery",
    "Radiology",
    "Pulmonology",
    "Ophthalmology",
    "Dermatology",
    "Dentistry",
    "Physiotherapy",
    "Psychiatry",
    "Anaesthesia",
    "Surgical Gastroenterology",
    "Medical Oncology",
    "Vascular Surgery",
    "Surgical Oncology"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Jayanagar, Bangalore"
  },
  "serviceArea": {
    "@type": "City",
    "name": "South Bangalore"
  }
});

export const getEmergencyServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EmergencyService",
  "name": "Maiya Hospital Emergency Department",
  "url": "https://maiyahospital.in/emergency",
  "description": "24/7 Emergency & Trauma Care in Jayanagar, Bangalore",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jayanagar",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "telephone": "+91 98450 12345",
  "openingHours": "Mo-Su 00:00-23:59",
  "areaServed": {
    "@type": "City",
    "name": "Jayanagar, Bangalore"
  }
});

export const getMedicalClinicSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Maiya Multi Speciality Hospital",
  "url": "https://maiyahospital.in",
  "description": "Comprehensive medical clinic in Jayanagar offering expert consultations and treatments",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jayanagar",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "telephone": "+91 98450 12345",
  "openingHours": "Mo-Su 00:00-23:59",
  "areaServed": {
    "@type": "City",
    "name": "Jayanagar, Bangalore"
  }
});

// Enhanced Schema Types for Rich Results
export const getFAQPageSchema = (faqs: any[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const getMedicalWebPageSchema = (pageData: any) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": pageData.title,
  "description": pageData.description,
  "url": pageData.url,
  "about": {
    "@type": "MedicalOrganization",
    "name": "Maiya Multi Speciality Hospital"
  },
  "medicalAudience": {
    "@type": "Audience",
    "audienceType": "Patients and their families"
  }
});

// New Rich Results Schemas
export const getBreadcrumbSchema = (breadcrumbs: any[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const getReviewSchema = (reviews: any[]) => ({
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "MedicalOrganization",
    "name": "Maiya Multi Speciality Hospital"
  },
  "ratingValue": "4.8",
  "reviewCount": reviews.length,
  "bestRating": "5",
  "worstRating": "1"
});

export const getEventSchema = (event: any) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.title,
  "description": event.description,
  "startDate": event.date,
  "endDate": event.date,
  "location": {
    "@type": "Place",
    "name": "Maiya Hospital",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jayanagar",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    }
  },
  "organizer": {
    "@type": "MedicalOrganization",
    "name": "Maiya Multi Speciality Hospital"
  },
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
});

export const getArticleSchema = (article: any) => ({
  "@context": "https://schema.org",
  "@type": "MedicalArticle",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "author": {
    "@type": "Organization",
    "name": "Maiya Hospital"
  },
  "publisher": {
    "@type": "MedicalOrganization",
    "name": "Maiya Multi Speciality Hospital"
  },
  "datePublished": article.publishedDate,
  "dateModified": article.modifiedDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  },
  "about": {
    "@type": "MedicalOrganization",
    "name": "Maiya Multi Speciality Hospital"
  }
});

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Maiya Multi Speciality Hospital",
  "image": "https://maiyahospital.in/lovable-uploads/Maiya_-_LOGOS_page-0004-removebg-preview.png",
  "description": "Leading multi-speciality hospital in Jayanagar, Bangalore",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Hospital Address",
    "addressLocality": "Jayanagar",
    "addressRegion": "Karnataka",
    "postalCode": "Your Postal Code",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9716,
    "longitude": 77.5946
  },
  "url": "https://maiyahospital.in",
  "telephone": "+91 98450 12345",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday", 
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "₹₹",
  "areaServed": {
    "@type": "City",
    "name": "Jayanagar, Bangalore"
  }
});

export const getHowToSchema = (howTo: any) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howTo.title,
  "description": howTo.description,
  "image": howTo.image,
  "totalTime": howTo.totalTime,
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "INR",
    "value": howTo.cost
  },
  "supply": howTo.supplies.map((supply: string) => ({
    "@type": "HowToSupply",
    "name": supply
  })),
  "tool": howTo.tools.map((tool: string) => ({
    "@type": "HowToTool", 
    "name": tool
  })),
  "step": howTo.steps.map((step: any, index: number) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "image": step.image
  }))
});

export const getVideoSchema = (video: any) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.title,
  "description": video.description,
  "thumbnailUrl": video.thumbnail,
  "uploadDate": video.uploadDate,
  "duration": video.duration,
  "contentUrl": video.url,
  "embedUrl": video.embedUrl,
  "publisher": {
    "@type": "MedicalOrganization",
    "name": "Maiya Multi Speciality Hospital"
  }
}); 