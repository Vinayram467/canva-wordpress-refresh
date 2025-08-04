# SEO Management Guide - Maiya Hospital Website

## 🎯 **Quick Start: How to Update Meta Tags**

### **Method 1: Using SEO Manager (Easiest)**

1. **Open the SEO Manager file**: `src/utils/seoManager.ts`
2. **Find the page you want to update** (e.g., `home`, `doctors`, `services`)
3. **Update the SEO data**:

```typescript
// Example: Update homepage SEO
home: {
  title: "Maiya Multi Speciality Hospital - Leading Healthcare in Bangalore",
  description: "Trusted medical center in Bangalore offering expert doctors...",
  keywords: "Maiya Hospital, medical center Bangalore, healthcare services",
  canonical: "https://maiyahospital.in/",
  ogTitle: "Maiya Multi Speciality Hospital - Leading Healthcare in Bangalore",
  ogDescription: "Trusted medical center in Bangalore offering expert doctors...",
  ogImage: "https://maiyahospital.in/og-image.jpg"
}
```

### **Method 2: Using SEO Editor Component**

1. **Import the SEO Editor** in your admin panel:
```typescript
import { SEOEditor } from '@/components/SEOEditor';

// Use it in your component
<SEOEditor pageKey="home" onSave={(data) => console.log('Updated:', data)} />
```

### **Method 3: Direct Component Update**

1. **Find the page component** (e.g., `src/pages/Index.tsx`)
2. **Update the SEOHead component**:

```typescript
<SEOHead
  title="Your New Title"
  description="Your new description"
  keywords="your, keywords, here"
  canonical="https://yourdomain.com/page"
  ogTitle="Open Graph Title"
  ogDescription="Open Graph Description"
  ogImage="https://yourdomain.com/og-image.jpg"
/>
```

## 📋 **Available Pages for SEO Management**

### **Static Pages**
- `home` - Homepage
- `doctors` - Doctors listing page
- `services` - Services listing page
- `contact` - Contact page
- `appointment` - Appointment booking page
- `virtualConsultation` - Virtual consultation page
- `blogs` - Blog listing page
- `events` - Events listing page
- `deluxeSurgeries` - Deluxe surgeries page

### **Dynamic Pages**
- `doctor` - Individual doctor pages
- `service` - Individual service pages
- `blog` - Individual blog posts
- `event` - Individual event pages

## 🔧 **SEO Data Structure**

Each page can have the following SEO properties:

```typescript
interface SEOData {
  title: string;              // Page title (50-60 characters)
  description: string;        // Meta description (150-160 characters)
  keywords?: string;          // Keywords separated by commas
  canonical?: string;         // Canonical URL
  ogTitle?: string;          // Open Graph title
  ogDescription?: string;     // Open Graph description
  ogImage?: string;          // Open Graph image URL
  twitterTitle?: string;     // Twitter title
  twitterDescription?: string; // Twitter description
  twitterImage?: string;     // Twitter image URL
  structuredData?: object;   // JSON-LD schema markup
}
```

## 📊 **SEO Best Practices**

### **Title Tags**
- ✅ **Optimal length**: 50-60 characters
- ✅ **Include primary keyword**
- ✅ **Include brand name**
- ✅ **Make it compelling**

**Example**: `"Expert Cardiologists in Bangalore | Maiya Hospital"`

### **Meta Descriptions**
- ✅ **Optimal length**: 150-160 characters
- ✅ **Include primary and secondary keywords**
- ✅ **Include call-to-action**
- ✅ **Make it compelling and descriptive**

**Example**: `"Meet expert cardiologists in Bangalore at Maiya Hospital. Advanced heart care, experienced specialists. Book consultation today."`

### **Keywords**
- ✅ **Primary keyword first**
- ✅ **Include location (Bangalore)**
- ✅ **Include related terms**
- ✅ **Separate with commas**

**Example**: `"cardiologist Bangalore, heart specialist, cardiology hospital, heart doctor"`

## 🎨 **SEO Editor Features**

The SEO Editor component provides:

### **Basic SEO Tab**
- Title tag editor with character counter
- Meta description editor with character counter
- Keywords input
- Canonical URL input

### **Social Media Tab**
- Open Graph title and description
- Open Graph image URL
- Twitter title and description
- Twitter image URL

### **Preview Tab**
- Google search result preview
- Social media preview
- Copy buttons for easy sharing

## 📈 **SEO Validation**

The system automatically validates:

- ✅ Title length (10-60 characters)
- ✅ Description length (50-160 characters)
- ✅ Required fields presence
- ✅ Character count warnings

## 🔄 **Updating Multiple Pages**

### **Batch Update Example**
```typescript
import { updateSEOData } from '@/utils/seoManager';

// Update multiple pages at once
const pages = ['home', 'doctors', 'services'];

pages.forEach(page => {
  updateSEOData(page, {
    ogImage: 'https://maiyahospital.in/new-og-image.jpg',
    twitterImage: 'https://maiyahospital.in/new-twitter-image.jpg'
  });
});
```

### **Add New Page SEO**
```typescript
import { addPageSEO } from '@/utils/seoManager';

addPageSEO('newPage', {
  title: "New Page Title",
  description: "New page description",
  keywords: "new, page, keywords",
  canonical: "https://maiyahospital.in/new-page"
});
```

## 🚀 **Performance Tips**

### **Image Optimization**
1. Use WebP format for images
2. Optimize image sizes
3. Use descriptive alt text
4. Implement lazy loading

### **Page Speed**
1. Minimize CSS and JavaScript
2. Use CDN for assets
3. Enable Gzip compression
4. Optimize images

## 📱 **Mobile SEO**

### **Mobile-First Optimization**
1. Ensure responsive design
2. Test mobile page speed
3. Optimize for mobile keywords
4. Use mobile-friendly URLs

## 🔍 **Local SEO**

### **Location-Based Keywords**
- Include "Bangalore" in titles and descriptions
- Use location-specific keywords
- Optimize for local search terms
- Include address in schema markup

## 📊 **SEO Monitoring**

### **Key Metrics to Track**
- Page load speed
- Mobile responsiveness
- Keyword rankings
- Organic traffic
- Click-through rates
- Bounce rates

### **Tools to Use**
- Google Search Console
- Google Analytics
- PageSpeed Insights
- Mobile-Friendly Test

## 🆘 **Troubleshooting**

### **Common Issues**

**Issue**: Meta tags not updating
**Solution**: Clear browser cache and check if changes are saved

**Issue**: SEO preview not showing correctly
**Solution**: Check if all required fields are filled

**Issue**: Character count warnings
**Solution**: Adjust title/description length to recommended limits

### **Validation Tools**
- Google Rich Results Test
- Facebook Sharing Debugger
- Twitter Card Validator
- Schema.org Validator

## 📞 **Support**

For SEO-related questions:
1. Check the SEO Manager file first
2. Use the SEO Editor component
3. Refer to this guide
4. Test changes in preview mode

---

**Last Updated**: January 2025
**Version**: 1.0
**Next Update**: Performance optimization features 