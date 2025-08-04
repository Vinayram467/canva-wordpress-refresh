# Strapi CMS Setup Guide for Medical Website

## Manual Installation Steps

### 1. Create Strapi Project
```bash
# Create a new directory for CMS
mkdir medical-cms
cd medical-cms

# Initialize a new Node.js project
npm init -y

# Install Strapi
npm install @strapi/strapi @strapi/plugin-users-permissions @strapi/plugin-i18n
```

### 2. Initialize Strapi
```bash
# Create Strapi app
npx @strapi/strapi@latest init --quickstart
```

### 3. Content Types Setup

#### Blog Content Type
```javascript
// medical-cms/src/api/blog/content-types/blog/schema.json
{
  "kind": "collectionType",
  "collectionName": "blogs",
  "info": {
    "singularName": "blog",
    "pluralName": "blogs",
    "displayName": "Blog"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "seo": {
      "enabled": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 60
    },
    "slug": {
      "type": "uid",
      "targetField": "title"
    },
    "content": {
      "type": "richtext",
      "required": true
    },
    "excerpt": {
      "type": "text",
      "maxLength": 200
    },
    "featuredImage": {
      "type": "media",
      "multiple": false
    },
    "category": {
      "type": "enumeration",
      "enum": ["General Health", "Surgery", "Cardiology", "Orthopedics"]
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

#### Doctor Content Type
```javascript
// medical-cms/src/api/doctor/content-types/doctor/schema.json
{
  "kind": "collectionType",
  "collectionName": "doctors",
  "info": {
    "singularName": "doctor",
    "pluralName": "doctors",
    "displayName": "Doctor"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "specialization": {
      "type": "string",
      "required": true
    },
    "qualifications": {
      "type": "text"
    },
    "experience": {
      "type": "integer"
    },
    "image": {
      "type": "media",
      "multiple": false
    },
    "bio": {
      "type": "richtext"
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

#### Service Content Type
```javascript
// medical-cms/src/api/service/content-types/service/schema.json
{
  "kind": "collectionType",
  "collectionName": "services",
  "info": {
    "singularName": "service",
    "pluralName": "services",
    "displayName": "Service"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "description": {
      "type": "richtext",
      "required": true
    },
    "image": {
      "type": "media",
      "multiple": false
    },
    "category": {
      "type": "enumeration",
      "enum": ["Surgery", "Consultation", "Diagnostic", "Treatment"]
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

### 4. SEO Component
```javascript
// medical-cms/src/components/shared/seo.json
{
  "collectionName": "components_shared_seos",
  "info": {
    "displayName": "SEO",
    "description": "SEO metadata"
  },
  "options": {},
  "attributes": {
    "metaTitle": {
      "type": "string",
      "maxLength": 60
    },
    "metaDescription": {
      "type": "text",
      "maxLength": 160
    },
    "keywords": {
      "type": "text"
    },
    "canonicalUrl": {
      "type": "string"
    },
    "ogTitle": {
      "type": "string",
      "maxLength": 60
    },
    "ogDescription": {
      "type": "text",
      "maxLength": 160
    },
    "ogImage": {
      "type": "media",
      "multiple": false
    }
  }
}
```

### 5. API Integration

#### Update React App API Configuration
```typescript
// src/config/api.ts
export const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
export const STRAPI_API_TOKEN = process.env.REACT_APP_STRAPI_API_TOKEN;

export const fetchFromStrapi = async (endpoint: string) => {
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
```

#### Blog Service
```typescript
// src/services/blogService.ts
import { fetchFromStrapi } from '@/config/api';

export const getBlogs = async () => {
  const response = await fetchFromStrapi('blogs?populate=*');
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await fetchFromStrapi(`blogs?filters[slug][$eq]=${slug}&populate=*`);
  return response.data[0];
};
```

### 6. Environment Variables
```bash
# .env
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_STRAPI_API_TOKEN=your_api_token_here
```

### 7. Start Strapi
```bash
cd medical-cms
npm run develop
```

### 8. Access Strapi Admin
- Open: http://localhost:1337/admin
- Create admin account
- Configure content types
- Add content

## Quick Setup Commands

```bash
# 1. Create CMS directory
mkdir medical-cms && cd medical-cms

# 2. Initialize Strapi (when prompted, choose SQLite for simplicity)
npx @strapi/strapi@latest init --quickstart

# 3. Start Strapi
npm run develop

# 4. Access admin panel
# Open http://localhost:1337/admin
# Create admin account
# Add content types manually through admin interface
```

## Content Management Workflow

1. **Create Content Types** in Strapi Admin
2. **Add Content** through the admin interface
3. **Generate API Token** in Settings > API Tokens
4. **Update Environment Variables** in React app
5. **Fetch Content** using the API

## SEO Integration

- Each content type has SEO component
- Meta tags are managed through Strapi
- Structured data can be generated from content
- Dynamic meta tags based on CMS content 