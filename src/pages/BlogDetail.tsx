import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogApi, Blog } from '@/services/api';
import { sampleBlogs } from '@/lib/utils';
import { SEOHead } from '@/components/seo/SEOHead';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Comments from "@/components/Comments";
import { getMedicalOrganizationSchema, getArticleSchema, getBlogPostingSchema, getBestPostsSidebarSchema, getWebsiteSchema, getWebPageSchema, getPersonSchema, getShareAction, getBreadcrumbSchema } from '@/utils/schema';
import { useState, useEffect } from 'react';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getById(id!);
        setBlog(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        // Fallback 1: try sampleBlogs from homepage by numeric/string id
        const local = sampleBlogs.find(b => b.id === id);
        if (local) {
          const mapped: Blog = {
            _id: local.id,
            title: local.title,
            content: local.content,
            summary: local.summary,
            excerpt: local.summary,
            author: local.author,
            category: local.category,
            image: local.image,
            readTime: local.readTime,
            date: new Date().toISOString(),
            tags: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as unknown as Blog;
          setBlog(mapped);
          setError(null);
        } else {
          // Fallback 2: load bundled sample JSON if available
          try {
            const sample = await import('@/content/blogs/sample-blog.json');
            const mapped: Blog = {
              _id: sample.default.id || 'sample-blog',
              title: sample.default.title,
              content: sample.default.content,
              summary: sample.default.excerpt || sample.default.content?.slice(0, 140) || '',
              excerpt: sample.default.excerpt,
              author: sample.default.author || 'Maiya Hospital',
              category: sample.default.category || 'General',
              image: sample.default.featuredImage || '/placeholder.svg',
              readTime: '5 min read',
              date: sample.default.publishedAt || new Date().toISOString(),
              tags: [],
              createdAt: sample.default.publishedAt || new Date().toISOString(),
              updatedAt: sample.default.publishedAt || new Date().toISOString(),
            } as unknown as Blog;
            setBlog(mapped);
            setError(null);
          } catch (fallbackErr) {
            console.error('Fallback blog load failed:', fallbackErr);
            setError('Failed to load blog. Please try again later.');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Blog Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
            <button 
              onClick={() => window.history.back()} 
              className="bg-green-700 hover:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Generate SEO data for the blog detail page
  const seoData = {
    title: `${blog.title} | Maiya Hospital Health Blog, Jayanagar`,
    description: blog.excerpt || blog.content.substring(0, 160) + '...',
    keywords: `health blog bangalore, medical news, healthcare tips, ${blog.title.toLowerCase()}, maiya hospital blog, health information jayanagar`,
    canonical: `https://maiyahospital.in/blog/${id}`,
    ogTitle: `${blog.title} | Maiya Hospital Health Blog, Jayanagar`,
    ogDescription: blog.excerpt || blog.content.substring(0, 160) + '...',
    ogImage: blog.image || 'https://maiyahospital.in/blog-default-og.jpg',
    twitterTitle: `${blog.title} | Maiya Hospital Health Blog, Jayanagar`,
    twitterDescription: blog.excerpt || blog.content.substring(0, 160) + '...',
    twitterImage: blog.image || 'https://maiyahospital.in/blog-default-twitter.jpg',
    structuredData: [getMedicalOrganizationSchema(), getArticleSchema({
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 160),
      image: blog.image || 'https://maiyahospital.in/blog-default-og.jpg',
      publishedDate: blog.createdAt,
      modifiedDate: blog.updatedAt || blog.createdAt,
      url: `https://maiyahospital.in/blog/${id}`
    })],
    articlePublishedTime: blog.createdAt,
    articleModifiedTime: blog.updatedAt || blog.createdAt,
    articleAuthor: "Maiya Hospital",
    articleSection: "Health & Wellness",
    articleTag: ["health", "medical", "wellness", "healthcare"]
  };

  // Generate Article Schema for Rich Results
  const articleSchema = getArticleSchema({
    title: blog.title,
    description: blog.excerpt || blog.content.substring(0, 160),
    image: blog.image || 'https://maiyahospital.in/blog-default-og.jpg',
    publishedDate: blog.createdAt,
    modifiedDate: blog.updatedAt || blog.createdAt,
    url: `https://maiyahospital.in/blog/${id}`
  });

  const bestPosts = sampleBlogs.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-10">
      <SEOHead
        {...seoData}
        structuredData={[
          getWebsiteSchema({ name: 'Maiya Hospital', url: 'https://maiyahospital.in', searchUrl: 'https://maiyahospital.in/search?q=' }),
          getWebPageSchema({ name: blog.title, url: `https://maiyahospital.in/blog/${id}`, description: blog.excerpt || blog.content.substring(0, 160) }),
          getPersonSchema(blog.author || 'Maiya Hospital'),
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://maiyahospital.in/' },
            { name: 'Blogs', url: 'https://maiyahospital.in/blogs' },
            { name: blog.title, url: `https://maiyahospital.in/blog/${id}` }
          ]),
          ...(seoData.structuredData as any),
          getBlogPostingSchema({
            title: blog.title,
            description: blog.excerpt || blog.content.substring(0, 160),
            image: (blog as any).image || (blog as any).imageUrl,
            url: `https://maiyahospital.in/blog/${id}`,
            publishedDate: (blog as any).createdAt || (blog as any).publishedAt,
            modifiedDate: (blog as any).updatedAt || (blog as any).createdAt,
            author: blog.author || 'Maiya Hospital'
          }),
          getBestPostsSidebarSchema(bestPosts.map(p => ({
            title: p.title,
            url: `https://maiyahospital.in/blog/${p.id}`,
            image: p.image
          }))),
          getShareAction(`https://maiyahospital.in/blog/${id}`)
        ]}
      />
      <Header />
      <div className="container mx-auto px-4">
        {/* Breadcrumbs and Top Back Nav */}
        <nav className="py-4 text-sm text-muted-foreground flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-foreground">Blogs</Link>
            <span>/</span>
            <span className="text-foreground font-medium line-clamp-1 max-w-[60vw]">{blog.title}</span>
          </div>
          <Link to="/blogs" className="text-green-700 hover:text-green-800 font-semibold">← Back</Link>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-12">
            <header className="mb-6">
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <span>{new Date((blog as any).createdAt || Date.now()).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>5 min read</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                {blog.title}
              </h1>
              {blog.excerpt && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {blog.excerpt}
                </p>
              )}
            </header>

            { (blog as any).image || (blog as any).imageUrl ? (
              <div className="mb-6">
                <img 
                  src={(blog as any).image || (blog as any).imageUrl} 
                  alt={blog.title}
                  className="w-full h-[420px] object-cover rounded-2xl shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
            ) : null }

            <div className="prose prose-lg max-w-none">
              <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            {/* Share bar */}
            <div className="mt-10 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`https://maiyahospital.in/blog/${id}`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-green-600 text-white text-sm hover:opacity-90"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://maiyahospital.in/blog/${id}`)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-blue-400 text-white text-sm hover:opacity-90"
              >
                X/Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://maiyahospital.in/blog/${id}`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm hover:opacity-90"
              >
                Facebook
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(`https://maiyahospital.in/blog/${id}`)}
                className="px-3 py-1 rounded-full bg-gray-800 text-white text-sm hover:opacity-90"
              >
                Copy link
              </button>
            </div>

            <Comments threadId={id!} />

            {/* Compact Recent Posts list (image left, text right) */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
              <div className="space-y-4">
                {bestPosts.slice(0, 5).map((p) => (
                  <Link to={`/blog/${p.id}`} key={`recent-inline-${p.id}`} className="flex items-center gap-4 group">
                    <img src={p.image} alt={p.title} className="h-20 w-28 object-cover rounded" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground mb-1">{p.date}</div>
                      <div className="text-base font-semibold line-clamp-2 group-hover:text-green-700">{p.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Category: Health Tips
                </div>
                <Link to="/blogs" className="text-green-600 hover:text-green-700 font-semibold">
                  ← Back to Blogs
                </Link>
              </div>
            </footer>
          </article>
          {/* Sidebar removed as per request */}
        </div>
      </div>

      <Footer />
    </div>
  );
} 