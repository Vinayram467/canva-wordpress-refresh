export const getMedicalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Your Medical Center",
  "url": "https://yourdomain.com",
  "description": "Leading medical center providing comprehensive healthcare services",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Address",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "ZIP"
  },
  "telephone": "+1-XXX-XXX-XXXX"
});

export const getPhysicianSchema = (doctor: any) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": doctor.name,
  "description": doctor.specialization,
  "medicalSpecialty": doctor.specialization,
  "image": doctor.image,
  "url": `https://yourdomain.com/doctors/${doctor.slug}`
});

export const getMedicalProcedureSchema = (procedure: any) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": procedure.name,
  "description": procedure.description,
  "bodyLocation": procedure.bodyLocation,
  "preparation": procedure.preparation,
  "followup": procedure.followup
}); 