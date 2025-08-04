# SEO Implementation Guide for Medical Website

## 1. Immediate SEO Implementation

### 1.1 Install Required Dependencies
```bash
# Install SEO-related packages
npm install react-helmet-async
npm install @types/react-helmet-async
npm install sitemap
npm install robots.txt
```

### 1.2 Create SEO Component
```typescript
// src/components/SEOHead.tsx
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
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

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData
}) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://yourdomain.com';
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical || window.location.href} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta name="twitter:description" content={twitterDescription || description} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
```

### 1.3 Create Medical Organization Schema
```typescript
// src/utils/schema.ts
export const getMedicalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Your Medical Center",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/logo.png",
  "description": "Leading medical center providing comprehensive healthcare services",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Address",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "ZIP",
    "addressCountry": "Country"
  },
  "telephone": "+1-XXX-XXX-XXXX",
  "sameAs": [
    "https://facebook.com/yourmedicalcenter",
    "https://twitter.com/yourmedicalcenter"
  ],
  "medicalSpecialty": [
    "Cardiology",
    "Orthopedics",
    "Neurology",
    "Oncology",
    "General Surgery"
  ]
});

export const getDoctorSchema = (doctor: any) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": doctor.name,
  "medicalSpecialty": doctor.specialty,
  "image": doctor.profileImage,
  "description": doctor.description,
  "url": `https://yourdomain.com/doctor/${doctor.slug}`,
  "worksFor": {
    "@type": "MedicalOrganization",
    "name": "Your Medical Center"
  }
});

export const getServiceSchema = (service: any) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": service.name,
  "description": service.description,
  "url": `https://yourdomain.com/service/${service.slug}`,
  "provider": {
    "@type": "MedicalOrganization",
    "name": "Your Medical Center"
  }
});
```

### 1.4 Update App.tsx with SEO Provider
```typescript
// src/App.tsx
import { HelmetProvider } from 'react-helmet-async';

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Your existing routes */}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);
```

## 2. Page-Specific SEO Implementation

### 2.1 Homepage SEO
```typescript
// src/pages/Index.tsx
import { SEOHead } from '@/components/SEOHead';
import { getMedicalOrganizationSchema } from '@/utils/schema';

export default function Index() {
  return (
    <>
      <SEOHead
        title="Leading Medical Center in [City] | Comprehensive Healthcare Services"
        description="Trusted medical center in [City] offering expert doctors, advanced treatments, and comprehensive healthcare services. Book your appointment today."
        keywords="medical center, healthcare, doctors, specialists, hospital, treatment, consultation"
        canonical="https://yourdomain.com"
        ogTitle="Leading Medical Center in [City] | Expert Healthcare Services"
        ogDescription="Trusted medical center in [City] offering expert doctors, advanced treatments, and comprehensive healthcare services."
        ogImage="https://yourdomain.com/og-image.jpg"
        structuredData={getMedicalOrganizationSchema()}
      />
      {/* Your existing homepage content */}
    </>
  );
}
```

### 2.2 Service Page SEO
```typescript
// src/pages/ServiceDetail.tsx
import { SEOHead } from '@/components/SEOHead';
import { getServiceSchema } from '@/utils/schema';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Fetch service data
    const fetchService = async () => {
      const data = await getServiceBySlug(id);
      setService(data);
    };
    fetchService();
  }, [id]);

  if (!service) return <div>Loading...</div>;

  return (
    <>
      <SEOHead
        title={`${service.name} in [City] | Expert Treatment | Medical Center`}
        description={`Expert ${service.name} treatment in [city]. Experienced specialists, advanced facilities. Book consultation today.`}
        keywords={`${service.name}, treatment, specialist, ${service.name} in [city]`}
        canonical={`https://yourdomain.com/service/${service.slug}`}
        ogTitle={`${service.name} Treatment in [City]`}
        ogDescription={`Expert ${service.name} treatment in [city]. Experienced specialists, advanced facilities.`}
        ogImage={service.featuredImage}
        structuredData={getServiceSchema(service)}
      />
      {/* Your service page content */}
    </>
  );
}
```

### 2.3 Doctor Profile SEO
```typescript
// src/pages/DoctorDetail.tsx
import { SEOHead } from '@/components/SEOHead';
import { getDoctorSchema } from '@/utils/schema';

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Fetch doctor data
    const fetchDoctor = async () => {
      const data = await getDoctorBySlug(id);
      setDoctor(data);
    };
    fetchDoctor();
  }, [id]);

  if (!doctor) return <div>Loading...</div>;

  return (
    <>
      <SEOHead
        title={`Dr. ${doctor.name} - ${doctor.specialty} Specialist in [City] | Medical Center`}
        description={`Meet Dr. ${doctor.name}, experienced ${doctor.specialty} specialist in [city]. Book consultation for expert care.`}
        keywords={`Dr. ${doctor.name}, ${doctor.specialty}, specialist, doctor in [city]`}
        canonical={`https://yourdomain.com/doctor/${doctor.slug}`}
        ogTitle={`Dr. ${doctor.name} - ${doctor.specialty} Specialist`}
        ogDescription={`Meet Dr. ${doctor.name}, experienced ${doctor.specialty} specialist in [city].`}
        ogImage={doctor.profileImage}
        structuredData={getDoctorSchema(doctor)}
      />
      {/* Your doctor profile content */}
    </>
  );
}
```

### 2.4 Blog Post SEO
```typescript
// src/pages/BlogDetail.tsx
import { SEOHead } from '@/components/SEOHead';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blog data
    const fetchBlog = async () => {
      const data = await getBlogBySlug(id);
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <>
      <SEOHead
        title={`${blog.title} | Medical Center Blog`}
        description={blog.metaDescription || blog.excerpt}
        keywords={blog.seoKeywords}
        canonical={`https://yourdomain.com/blog/${blog.slug}`}
        ogTitle={blog.ogTitle || blog.title}
        ogDescription={blog.ogDescription || blog.excerpt}
        ogImage={blog.featuredImage}
        twitterTitle={blog.twitterTitle || blog.title}
        twitterDescription={blog.twitterDescription || blog.excerpt}
        twitterImage={blog.twitterImage || blog.featuredImage}
      />
      {/* Your blog content */}
    </>
  );
}
```

## 3. Technical SEO Implementation

### 3.1 Create robots.txt
```txt
// public/robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://yourdomain.com/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
```

### 3.2 Create sitemap.xml
```typescript
// src/utils/sitemap.ts
import { writeFileSync } from 'fs';

export const generateSitemap = async () => {
  const baseUrl = 'https://yourdomain.com';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/doctors</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blogs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

  writeFileSync('public/sitemap.xml', sitemap);
};
```

### 3.3 Add meta tags to index.html
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Leading medical center providing comprehensive healthcare services" />
    <meta name="keywords" content="medical center, healthcare, doctors, specialists, hospital" />
    <meta name="author" content="Your Medical Center" />
    
    <!-- Open Graph -->
    <meta property="og:title" content="Your Medical Center" />
    <meta property="og:description" content="Leading medical center providing comprehensive healthcare services" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yourdomain.com" />
    <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Your Medical Center" />
    <meta name="twitter:description" content="Leading medical center providing comprehensive healthcare services" />
    <meta name="twitter:image" content="https://yourdomain.com/twitter-image.jpg" />
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
    <title>Your Medical Center</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 4. Performance Optimization

### 4.1 Image Optimization Component
```typescript
// src/components/OptimizedImage.tsx
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  lazy = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        ...(error && { display: 'none' })
      }}
    />
  );
};
```

### 4.2 Lazy Loading Implementation
```typescript
// src/hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};
```

## 5. Analytics Integration

### 5.1 Google Analytics Setup
```typescript
// src/utils/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

### 5.2 Add Analytics to App
```typescript
// src/App.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '@/utils/analytics';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    // Your existing app structure
  );
};
```

## 6. SEO Monitoring Setup

### 6.1 Create SEO Dashboard Component
```typescript
// src/components/SEODashboard.tsx
import { useState, useEffect } from 'react';

interface SEOData {
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

export const SEODashboard: React.FC = () => {
  const [seoData, setSeoData] = useState<SEOData | null>(null);

  const analyzeSEO = () => {
    const title = document.title;
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    
    setSeoData({
      pageTitle: title,
      metaDescription,
      keywords,
      canonicalUrl: canonical,
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
      twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '',
      twitterDescription: document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || ''
    });
  };

  useEffect(() => {
    analyzeSEO();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">SEO Analysis</h2>
      {seoData && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Page Title</h3>
            <p className="text-sm text-gray-600">{seoData.pageTitle}</p>
            <p className="text-xs text-gray-500">
              Length: {seoData.pageTitle.length}/60 characters
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Meta Description</h3>
            <p className="text-sm text-gray-600">{seoData.metaDescription}</p>
            <p className="text-xs text-gray-500">
              Length: {seoData.metaDescription.length}/160 characters
            </p>
          </div>
          {/* Add more SEO analysis fields */}
        </div>
      )}
    </div>
  );
};
```

This implementation guide provides all the necessary code to implement comprehensive SEO for your medical website, including technical SEO, content optimization, and monitoring tools. 