import sampleBlog from '../content/blogs/sample-blog.json';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  featuredImage?: string;
  author: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage?: string;
  };
}

export const getBlogs = async (): Promise<BlogPost[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return [sampleBlog as BlogPost];
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (slug === 'understanding-heart-health') {
    return sampleBlog as BlogPost;
  }
  return null;
};

export const getBlogsByCategory = async (category: string): Promise<BlogPost[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const blogs = [sampleBlog as BlogPost];
  return blogs.filter(blog => blog.category === category);
};

// Mock data for other content types
export const getDoctors = async () => {
  return [
    {
      id: 'dr-johnson',
      name: 'Dr. Sarah Johnson',
      slug: 'dr-sarah-johnson',
      specialization: 'Cardiologist',
      qualifications: 'MD, FACC',
      experience: 15,
      bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience...',
      image: '/doctor-profiles/dr-sarah-johnson.jpg',
      seo: {
        metaTitle: 'Dr. Sarah Johnson - Cardiologist | Medical Center',
        metaDescription: 'Meet Dr. Sarah Johnson, a board-certified cardiologist with over 15 years of experience in cardiovascular health.',
        keywords: 'cardiologist, heart specialist, Dr. Sarah Johnson',
        canonicalUrl: 'https://yourdomain.com/doctors/dr-sarah-johnson'
      }
    }
  ];
};

export const getServices = async () => {
  return [
    {
      id: 'cardiology-consultation',
      name: 'Cardiology Consultation',
      slug: 'cardiology-consultation',
      description: 'Comprehensive cardiac evaluation and consultation services...',
      category: 'Consultation',
      image: '/services/cardiology-consultation.jpg',
      seo: {
        metaTitle: 'Cardiology Consultation | Medical Center',
        metaDescription: 'Comprehensive cardiac evaluation and consultation services for heart health.',
        keywords: 'cardiology consultation, heart evaluation, cardiac services',
        canonicalUrl: 'https://yourdomain.com/services/cardiology-consultation'
      }
    }
  ];
}; 