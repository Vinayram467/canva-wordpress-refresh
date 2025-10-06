import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogApi, Blog } from '@/services/api';
import { SEOHead } from '@/components/seo/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getMedicalOrganizationSchema, getBreadcrumbSchema } from '@/utils/schema';
import { sampleBlogs } from '@/lib/utils';

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
        // Fallback: use homepage sampleBlogs so all homepage blogs are visible
        const mappedBlogs: Blog[] = sampleBlogs.map(blog => ({
          _id: blog.id,
          title: blog.title,
          content: blog.content,
          summary: blog.summary,
          excerpt: blog.summary,
          author: blog.author,
          category: blog.category,
          image: blog.image,
          readTime: blog.readTime,
          date: new Date().toISOString(),
          tags: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as unknown as Blog));
        setBlogs(mappedBlogs);
        setError(null);
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
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <Header />
      <SEOHead
        {...seoData}
        structuredData={[
          getMedicalOrganizationSchema(),
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://maiyahospital.in/' },
            { name: 'Blogs', url: 'https://maiyahospital.in/blogs' }
          ])
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="py-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Blogs</span>
          </div>
        </nav>

        <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent">
          Maiya Blogs
        </h1>

        {blogs.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            <p className="text-lg">No blogs available at the moment.</p>
            <p className="text-sm mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map(blog => (
              <Link to={`/blog/${blog._id}/${(blog.title || '').toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-')}`} key={blog._id} className="block group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-56 flex-shrink-0">
                    <img 
                        src={(blog as any).image || (blog as any).imageUrl || '/placeholder.svg'} 
                      alt={blog.title} 
                        className="w-full h-32 md:h-32 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                          {(blog as any).category || 'Health Tips'}
                    </span>
                  </div>
                      <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {blog.excerpt || blog.content.substring(0, 200) + '...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>{new Date((blog as any).createdAt || (blog as any).publishedAt || Date.now()).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>5 min read</span>
                    </div>
                        <span className="text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-300">
                          Read More →
                    </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 