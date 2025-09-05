import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogApi, Blog } from '@/services/api';
import { SEOHead } from '@/components/seo/SEOHead';
import { getMedicalOrganizationSchema } from '@/utils/schema';

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate SEO data for the blogs listing page
  const seoData = {
    title: "Health Blog | Medical News & Tips - Maiya Hospital Bangalore",
    description: "Stay informed with Maiya Hospital's health blog. Latest medical news, health tips, wellness advice from expert doctors in Bangalore. Read health articles now.",
    keywords: "health blog bangalore, medical news updates, healthcare tips, health information bangalore, medical articles, maiya hospital blog, health tips jayanagar",
    canonical: "https://maiyahospital.in/blogs",
    ogTitle: "Health Blog | Medical News & Tips - Maiya Hospital Bangalore",
    ogDescription: "Stay informed with Maiya Hospital's health blog. Latest medical news, health tips, wellness advice from expert doctors in Bangalore.",
    ogImage: "https://maiyahospital.in/blogs-og.jpg",
    twitterTitle: "Health Blog | Medical News & Tips - Maiya Hospital Bangalore",
    twitterDescription: "Stay informed with Maiya Hospital's health blog. Latest medical news, health tips, wellness advice from expert doctors in Bangalore.",
    twitterImage: "https://maiyahospital.in/blogs-twitter.jpg",
    structuredData: getMedicalOrganizationSchema()
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getAll();
        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
        <SEOHead {...seoData} />
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent">
            Maiya Blogs
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden glass animate-pulse">
                <div className="h-48 bg-blue-100/20"></div>
                <div className="p-6">
                  <div className="h-4 bg-blue-100/20 rounded mb-2"></div>
                  <div className="h-6 bg-blue-100/20 rounded mb-4"></div>
                  <div className="h-4 bg-blue-100/20 rounded mb-2"></div>
                  <div className="h-4 bg-blue-100/20 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
        <SEOHead {...seoData} />
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent">
            Maiya Blogs
          </h1>
          <div className="text-center text-muted-foreground">
            <p className="text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-green-700 hover:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
      <SEOHead {...seoData} />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent">
          Maiya Blogs
        </h1>
        {blogs.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p className="text-lg">No blogs available at the moment.</p>
            <p className="text-sm mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link to={`/blog/${blog._id}`} key={blog._id} className="block group">
                <div className="rounded-2xl overflow-hidden glass hover:shadow-green-700/20 transition-all duration-300 flex flex-col h-full">
                  <div className="relative">
                    <img 
                      src={(blog as any).image || (blog as any).imageUrl || '/placeholder.svg'} 
                      alt={blog.title} 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <span className="absolute top-4 left-4 bg-green-700 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      Health Tips
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <span>{new Date((blog as any).createdAt || (blog as any).publishedAt || Date.now()).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>5 min read</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 150) + '...'}
                    </p>
                    <span className="text-green-600 font-semibold hover:underline group-hover:text-green-700 transition-colors duration-300">
                      Read More &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 