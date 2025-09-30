# CMS Implementation Plan for Medical Website

## Overview
This plan outlines the implementation of a Content Management System (CMS) to manage SEO-optimized content for your medical website, including blogs, service pages, doctor profiles, and meta information.

## Recommended CMS: Contentful (hosted) with optional Strapi notes

We will integrate Contentful without changing your existing React UI by swapping the data source in the backend routes.

### Backend (Render) environment variables
- CONTENTFUL_USE=true
- CONTENTFUL_SPACE_ID=xxxx
- CONTENTFUL_ENVIRONMENT=master
- CONTENTFUL_CDA_TOKEN=xxxx
- (optional) CONTENTFUL_CPA_TOKEN=xxxx

### Frontend (Netlify) environment variables
- VITE_CONTENTFUL_SPACE_ID=xxxx
- VITE_CONTENTFUL_ENVIRONMENT=master
- VITE_CONTENTFUL_CDA_TOKEN=xxxx
- (optional) VITE_CONTENTFUL_PREVIEW_TOKEN=xxxx

### Data sourcing strategy
- Backend routes `/api/blogs` and `/api/events` will fetch from MongoDB by default.
- When `CONTENTFUL_USE=true`, they fetch from Contentful GraphQL and map to the same response shape your UI already uses (no UI changes).

### Webhooks
- Contentful → Netlify build hook on publish/unpublish/archive.
- Contentful → Render webhook (optional) for cache purge/search indexing.

### Preview
- Set Contentful entry Preview URL to Netlify preview domain with `?preview=1`.
- Frontend uses preview token when `preview=1`.

### Content model (high level)
- BlogPost, Event, Author, Topic, Seo as outlined in earlier plan docs.

### Testing checklist
- Toggle `CONTENTFUL_USE` and verify `/api/blogs` and `/api/events` response parity.
- Publish an entry in Contentful and verify Netlify build hook updates the site.
- Validate SEO metadata and sitemaps reflect new content.

## Phase 1: CMS Setup & Configuration (Strapi alternative - optional)

### 1.1 Installation & Basic Setup
```bash
# Install Strapi
npx create-strapi-app@latest medical-cms --quickstart

# Install SEO plugin
npm install @strapi/plugin-seo

# Install additional plugins
npm install @strapi/plugin-upload
npm install @strapi/plugin-users-permissions
```

### 1.2 Content Type Structure

#### Blog Content Type
```javascript
// Blog Schema
{
  title: {
    type: 'string',
    required: true,
    maxLength: 60
  },
  slug: {
    type: 'uid',
    targetField: 'title'
  },
  metaTitle: {
    type: 'string',
    maxLength: 60
  },
  metaDescription: {
    type: 'text',
    maxLength: 160
  },
  content: {
    type: 'richtext',
    required: true
  },
  excerpt: {
    type: 'text',
    maxLength: 200
  },
  featuredImage: {
    type: 'media',
    multiple: false
  },
  author: {
    type: 'relation',
    relation: 'oneToOne',
    target: 'api::doctor.doctor'
  },
  category: {
    type: 'enumeration',
    enum: ['General Health', 'Surgery', 'Cardiology', 'Orthopedics', 'Neurology', 'Oncology']
  },
  tags: {
    type: 'json'
  },
  seoKeywords: {
    type: 'text'
  },
  readTime: {
    type: 'string',
    default: '5 min read'
  },
  publishedAt: {
    type: 'datetime'
  }
}
```

#### Doctor Profile Content Type
```javascript
// Doctor Schema
{
  name: {
    type: 'string',
    required: true
  },
  slug: {
    type: 'uid',
    targetField: 'name'
  },
  metaTitle: {
    type: 'string',
    maxLength: 60
  },
  metaDescription: {
    type: 'text',
    maxLength: 160
  },
  specialty: {
    type: 'string',
    required: true
  },
  qualifications: {
    type: 'richtext'
  },
  experience: {
    type: 'text'
  },
  education: {
    type: 'richtext'
  },
  achievements: {
    type: 'richtext'
  },
  profileImage: {
    type: 'media',
    multiple: false
  },
  services: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::service.service'
  },
  seoKeywords: {
    type: 'text'
  },
  consultationFee: {
    type: 'decimal'
  },
  availableDays: {
    type: 'json'
  }
}
```

#### Service Content Type
```javascript
// Service Schema
{
  name: {
    type: 'string',
    required: true
  },
  slug: {
    type: 'uid',
    targetField: 'name'
  },
  metaTitle: {
    type: 'string',
    maxLength: 60
  },
  metaDescription: {
    type: 'text',
    maxLength: 160
  },
  description: {
    type: 'richtext',
    required: true
  },
  shortDescription: {
    type: 'text',
    maxLength: 200
  },
  category: {
    type: 'enumeration',
    enum: ['Surgery', 'Consultation', 'Diagnostic', 'Treatment', 'Preventive']
  },
  featuredImage: {
    type: 'media',
    multiple: false
  },
  gallery: {
    type: 'media',
    multiple: true
  },
  doctors: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::doctor.doctor'
  },
  faqs: {
    type: 'component',
    component: 'default.faq-item',
    repeatable: true
  },
  seoKeywords: {
    type: 'text'
  },
  price: {
    type: 'decimal'
  },
  duration: {
    type: 'string'
  }
}
```

#### Page Content Type
```javascript
// Page Schema
{
  title: {
    type: 'string',
    required: true
  },
  slug: {
    type: 'uid',
    targetField: 'title'
  },
  metaTitle: {
    type: 'string',
    maxLength: 60
  },
  metaDescription: {
    type: 'text',
    maxLength: 160
  },
  content: {
    type: 'richtext'
  },
  seoKeywords: {
    type: 'text'
  },
  pageType: {
    type: 'enumeration',
    enum: ['Home', 'About', 'Contact', 'Services', 'Doctors', 'Blog']
  }
}
```

### 1.3 SEO Component Structure
```javascript
// SEO Component
{
  metaTitle: {
    type: 'string',
    maxLength: 60
  },
  metaDescription: {
    type: 'text',
    maxLength: 160
  },
  keywords: {
    type: 'text'
  },
  canonicalUrl: {
    type: 'string'
  },
  ogTitle: {
    type: 'string',
    maxLength: 60
  },
  ogDescription: {
    type: 'text',
    maxLength: 160
  },
  ogImage: {
    type: 'media',
    multiple: false
  },
  twitterTitle: {
    type: 'string',
    maxLength: 60
  },
  twitterDescription: {
    type: 'text',
    maxLength: 160
  },
  twitterImage: {
    type: 'media',
    multiple: false
  }
}
```

## Phase 2: SEO Tools Integration

### 2.1 SEO Plugin Configuration
```javascript
// config/plugins.js
module.exports = {
  seo: {
    enabled: true,
    config: {
      contentTypes: {
        'api::blog.blog': {
          field: 'seo',
          references: {
            title: 'metaTitle',
            description: 'metaDescription',
            keywords: 'seoKeywords',
            canonical: 'canonicalUrl',
            ogTitle: 'ogTitle',
            ogDescription: 'ogDescription',
            ogImage: 'ogImage',
            twitterTitle: 'twitterTitle',
            twitterDescription: 'twitterDescription',
            twitterImage: 'twitterImage'
          }
        }
      }
    }
  }
};
```

### 2.2 SEO Validation Rules
```javascript
// SEO Validation Schema
const seoValidation = {
  metaTitle: {
    minLength: 30,
    maxLength: 60,
    required: true
  },
  metaDescription: {
    minLength: 120,
    maxLength: 160,
    required: true
  },
  keywords: {
    maxKeywords: 10,
    required: true
  }
};
```

## Phase 3: Content Management Workflow

### 3.1 Blog Content Workflow
1. **Content Creation**
   - Write blog post in rich text editor
   - Add SEO meta information
   - Select category and tags
   - Upload featured image
   - Set author (doctor)

2. **SEO Optimization**
   - Generate SEO title (50-60 characters)
   - Write meta description (150-160 characters)
   - Add target keywords
   - Optimize featured image
   - Set canonical URL

3. **Publishing Process**
   - Preview content
   - SEO score check
   - Schedule publication
   - Social media preview

### 3.2 Service Page Workflow
1. **Service Information**
   - Service name and description
   - Treatment details
   - Doctor assignments
   - Pricing information

2. **SEO Optimization**
   - Location-based keywords
   - Service-specific meta tags
   - FAQ section
   - Related services linking

3. **Content Enhancement**
   - Before/after images
   - Patient testimonials
   - Doctor profiles
   - Appointment booking integration

### 3.3 Doctor Profile Workflow
1. **Profile Creation**
   - Personal information
   - Qualifications and experience
   - Specializations
   - Profile image

2. **SEO Enhancement**
   - Location-based keywords
   - Specialty-specific content
   - Patient reviews integration
   - Appointment booking

## Phase 4: API Integration with React App

### 4.1 API Configuration
```javascript
// src/services/cms-api.ts
import axios from 'axios';

const CMS_API_URL = process.env.REACT_APP_CMS_API_URL || 'http://localhost:1337';

export const cmsApi = axios.create({
  baseURL: CMS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Blog API
export const getBlogs = async (params = {}) => {
  const response = await cmsApi.get('/api/blogs', { params });
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await cmsApi.get(`/api/blogs?filters[slug][$eq]=${slug}&populate=*`);
  return response.data;
};

// Doctor API
export const getDoctors = async (params = {}) => {
  const response = await cmsApi.get('/api/doctors', { params });
  return response.data;
};

export const getDoctorBySlug = async (slug: string) => {
  const response = await cmsApi.get(`/api/doctors?filters[slug][$eq]=${slug}&populate=*`);
  return response.data;
};

// Service API
export const getServices = async (params = {}) => {
  const response = await cmsApi.get('/api/services', { params });
  return response.data;
};

export const getServiceBySlug = async (slug: string) => {
  const response = await cmsApi.get(`/api/services?filters[slug][$eq]=${slug}&populate=*`);
  return response.data;
};
```

### 4.2 SEO Component Integration
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
  twitterImage
}) => {
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
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta name="twitter:description" content={twitterDescription || description} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
    </Helmet>
  );
};
```

## Phase 5: Content Templates & Guidelines

### 5.1 Blog Post Template
```markdown
# Blog Post Template

## SEO Information
- **Target Keyword:** [Primary keyword]
- **Title:** [SEO-optimized title, 50-60 characters]
- **Meta Description:** [Compelling description, 150-160 characters]
- **Keywords:** [Comma-separated keywords]

## Content Structure
1. **Introduction** (100-150 words)
   - Hook the reader
   - Introduce the topic
   - Mention the benefit

2. **Main Content** (800-1200 words)
   - Use H2 and H3 headings
   - Include relevant keywords naturally
   - Add expert insights
   - Include statistics when possible

3. **Conclusion** (100-150 words)
   - Summarize key points
   - Include call-to-action
   - Link to related services/doctors

## SEO Checklist
- [ ] Title contains primary keyword
- [ ] Meta description is compelling
- [ ] Content is 1000+ words
- [ ] Uses proper heading structure
- [ ] Includes internal links
- [ ] Optimized images with alt text
- [ ] Mobile-friendly formatting
```

### 5.2 Service Page Template
```markdown
# Service Page Template

## SEO Information
- **Target Keyword:** [Service name] in [City]
- **Title:** [Service Name] in [City] | Expert Treatment | Medical Center
- **Meta Description:** Expert [service name] treatment in [city]. Experienced specialists, advanced facilities.

## Content Structure
1. **Hero Section**
   - Service name and location
   - Brief benefit statement
   - Call-to-action

2. **Service Overview**
   - What the service involves
   - Who it's for
   - Benefits

3. **Treatment Details**
   - Procedure information
   - Recovery time
   - Success rates

4. **Doctor Profiles**
   - Experienced specialists
   - Credentials
   - Patient testimonials

5. **FAQ Section**
   - Common questions
   - Detailed answers
   - Keywords naturally included

6. **Call-to-Action**
   - Appointment booking
   - Contact information
   - Location details
```

## Phase 6: Analytics & Performance Monitoring

### 6.1 SEO Analytics Integration
```javascript
// SEO Analytics Dashboard
const seoAnalytics = {
  // Content Performance
  contentViews: [],
  timeOnPage: [],
  bounceRate: [],
  
  // SEO Metrics
  keywordRankings: [],
  organicTraffic: [],
  clickThroughRate: [],
  
  // Technical SEO
  pageSpeed: [],
  mobileUsability: [],
  coreWebVitals: []
};
```

### 6.2 Content Performance Tracking
- **Blog Performance:**
  - Page views
  - Time on page
  - Social shares
  - Lead generation

- **Service Page Performance:**
  - Organic traffic
  - Conversion rates
  - Appointment bookings
  - Phone calls

- **Doctor Profile Performance:**
  - Profile views
  - Consultation requests
  - Patient reviews
  - Search rankings

## Phase 7: Implementation Timeline

### Week 1-2: CMS Setup
- Install and configure Strapi
- Set up content types
- Configure SEO plugin
- Basic API testing

### Week 3-4: Content Migration
- Migrate existing content
- Set up SEO meta information
- Configure image optimization
- Test API integration

### Week 5-6: Frontend Integration
- Integrate CMS API with React app
- Implement SEO components
- Set up content fetching
- Test all functionality

### Week 7-8: Content Creation
- Create content templates
- Write initial blog posts
- Optimize service pages
- Set up content calendar

### Week 9-10: Testing & Optimization
- Performance testing
- SEO audit
- Content optimization
- Analytics setup

## Phase 8: Maintenance & Updates

### 8.1 Regular Tasks
- **Daily:** Content publishing, SEO monitoring
- **Weekly:** Performance analysis, content updates
- **Monthly:** SEO audit, content strategy review
- **Quarterly:** Complete system audit, strategy updates

### 8.2 Content Calendar
- **Monday:** Blog post publishing
- **Wednesday:** Service page updates
- **Friday:** Doctor profile updates
- **Weekend:** Content planning and creation

This CMS implementation plan provides a comprehensive solution for managing SEO-optimized content for your medical website. 