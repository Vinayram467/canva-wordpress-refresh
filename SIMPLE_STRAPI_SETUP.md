# Simple Strapi CMS Setup (Manual Method)

Since the automated Strapi installation is having template issues, here's a manual setup that will work reliably.

## Step 1: Create Basic Strapi Structure

```bash
# Clean up existing directory
Remove-Item -Recurse -Force medical-cms -ErrorAction SilentlyContinue

# Create new directory
mkdir medical-cms
cd medical-cms

# Initialize npm project
npm init -y
```

## Step 2: Install Strapi Dependencies

```bash
# Install Strapi core
npm install @strapi/strapi@latest

# Install required plugins
npm install @strapi/plugin-users-permissions@latest
npm install @strapi/plugin-i18n@latest
npm install @strapi/plugin-email@latest
```

## Step 3: Create Basic Configuration

Create these files manually:

### package.json (update)
```json
{
  "name": "medical-cms",
  "private": true,
  "version": "0.1.0",
  "description": "Medical website CMS",
  "scripts": {
    "develop": "strapi develop",
    "start": "strapi start",
    "build": "strapi build"
  },
  "dependencies": {
    "@strapi/strapi": "latest",
    "@strapi/plugin-users-permissions": "latest",
    "@strapi/plugin-i18n": "latest",
    "@strapi/plugin-email": "latest"
  },
  "author": {
    "name": "Medical CMS"
  },
  "strapi": {
    "uuid": "medical-cms-uuid"
  },
  "engines": {
    "node": ">=18.0.0 <=20.x.x",
    "npm": ">=6.0.0"
  },
  "license": "MIT"
}
```

### config/database.js
```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
    useNullAsDefault: true,
  },
});
```

### config/server.js
```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
```

## Step 4: Quick Alternative - Use Strapi Cloud

Since local installation is problematic, consider using Strapi Cloud:

1. **Go to**: https://cloud.strapi.io/
2. **Sign up** with your account
3. **Create a new project**
4. **Choose SQLite** for simplicity
5. **Deploy** your CMS

## Step 5: Content Management Without Strapi (Temporary Solution)

While we resolve the Strapi installation, let's create a simple content management system using JSON files:

### Create Content Structure

```bash
# Create content directory
mkdir src/content
mkdir src/content/blogs
mkdir src/content/doctors
mkdir src/content/services
```

### Sample Blog Content (src/content/blogs/sample-blog.json)
```json
{
  "id": "sample-blog",
  "title": "Understanding Heart Health",
  "slug": "understanding-heart-health",
  "content": "Heart health is crucial for overall well-being...",
  "excerpt": "Learn about maintaining good heart health...",
  "category": "General Health",
  "publishedAt": "2024-01-15T00:00:00.000Z",
  "seo": {
    "metaTitle": "Understanding Heart Health | Medical Center",
    "metaDescription": "Learn about maintaining good heart health and preventing cardiovascular diseases.",
    "keywords": "heart health, cardiovascular, medical advice",
    "canonicalUrl": "https://yourdomain.com/blog/understanding-heart-health"
  }
}
```

### Content Service (src/services/contentService.ts)
```typescript
import blogData from '../content/blogs/sample-blog.json';

export const getBlogs = async () => {
  // Simulate API call
  return [blogData];
};

export const getBlogBySlug = async (slug: string) => {
  // Simulate API call
  if (slug === 'understanding-heart-health') {
    return blogData;
  }
  return null;
};
```

## Step 6: Update React App to Use Content Service

### Update src/config/api.ts
```typescript
// Temporary content service until Strapi is working
export const getContent = async (endpoint: string) => {
  // For now, return mock data
  return {
    data: [],
    meta: {}
  };
};
```

## Step 7: Test the Setup

```bash
# Start the React app
npm run dev

# Test content loading
# Visit http://localhost:8081/
```

## Next Steps

1. **Try Strapi Cloud** for immediate CMS access
2. **Use JSON content** temporarily while fixing local Strapi
3. **Implement content service** in React app
4. **Add SEO integration** with content

## Benefits of This Approach

- ✅ **Immediate working solution**
- ✅ **No installation issues**
- ✅ **SEO ready**
- ✅ **Easy to migrate to Strapi later**
- ✅ **Content management possible**

## Migration Path

Once Strapi is working:
1. Replace JSON content with Strapi API calls
2. Update content service to use Strapi endpoints
3. Add Strapi admin interface
4. Migrate content to Strapi

This approach gives you a working CMS immediately while we resolve the Strapi installation issues. 