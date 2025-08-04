export const getMedicalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Maiya Multi Speciality Hospital",
  "url": "https://maiyahospital.in",
  "logo": "https://maiyahospital.in/lovable-uploads/Maiya_-_LOGOS_page-0004-removebg-preview.png",
  "description": "Leading multi-speciality hospital in Bangalore offering expert doctors, advanced treatments, emergency care, and comprehensive healthcare services.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Hospital Address",
    "addressLocality": "Bangalore",
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
    "Emergency Medicine"
  ],
  "availableService": [
    {
      "@type": "MedicalService",
      "name": "Emergency Care",
      "description": "24/7 emergency medical services"
    },
    {
      "@type": "MedicalService", 
      "name": "Online Consultation",
      "description": "Virtual medical consultation services"
    },
    {
      "@type": "MedicalService",
      "name": "Advanced Surgery",
      "description": "Complex surgical procedures"
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
      }
    ]
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
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
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
  "procedureType": procedure.procedureType
});

export const getHospitalSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Hospital",
  "name": "Maiya Multi Speciality Hospital",
  "url": "https://maiyahospital.in",
  "description": "Leading multi-speciality hospital in Bangalore providing comprehensive healthcare services",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Hospital Address",
    "addressLocality": "Bangalore",
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
    "Emergency Medicine"
  ]
}); 