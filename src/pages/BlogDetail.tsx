import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogApi, Blog, promosApi, type PromoWidget } from '@/services/api';
import { sampleBlogs } from '@/lib/utils';
import { SEOHead } from '@/components/seo/SEOHead';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Comments from "@/components/Comments";
import { getMedicalOrganizationSchema, getArticleSchema, getBlogPostingSchema, getBestPostsSidebarSchema, getWebsiteSchema, getWebPageSchema, getPersonSchema, getShareAction, getBreadcrumbSchema } from '@/utils/schema';
import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function BlogDetail() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promos, setPromos] = useState<PromoWidget[]>([]);

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
  // slugify helper
  const toSlug = (text: string) =>
    (text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  // Redirect to pretty URL if slug missing or mismatched
  useEffect(() => {
    if (blog && id) {
      const preferred = toSlug(blog.title);
      if (preferred && slug !== preferred) {
        navigate(`/blog/${id}/${preferred}`, { replace: true });
      }
    }
  }, [blog, id, slug, navigate]);

  // Load promo widgets for sidebar
  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await promosApi.getAll();
        if (Array.isArray(data)) setPromos(data);
      } catch (_) {
        setPromos([]);
      }
    };
    loadPromos();
  }, []);

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
    canonical: `https://maiyahospital.in/blog/${id}/${toSlug(blog.title)}`,
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
          {/* Main Article */}
          <article className="lg:col-span-9">
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
                <div className="w-full h-[420px] rounded-2xl border border-gray-200 bg-white shadow-2xl flex items-center justify-center p-3">
                  <img 
                    src={(blog as any).image || (blog as any).imageUrl} 
                    alt={blog.title}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
              </div>
            ) : null }

            {/* Alternating sections if provided; else fallback to plain content */}
            {Array.isArray((blog as any).sections) && (blog as any).sections.length > 0 ? (
              <section className="space-y-8">
                {(blog as any).sections.map((sec: any, idx: number) => (
                  <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center`}>
                    {sec.alignment === 'imageRight' ? (
                      <>
                        <div className="order-2 md:order-1">
                          <div className="rounded-2xl border border-gray-200 bg-transparent p-0">
                            {sec.heading && <h2 className="text-2xl font-semibold text-foreground mb-3">{sec.heading}</h2>}
                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow">
                              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{sec.text}</p>
                            </div>
                          </div>
                        </div>
                        <div className="order-1 md:order-2">
                          {sec.image && (
                            <div className="h-[360px] rounded-2xl border border-gray-200 bg-white shadow flex items-center justify-center p-3 hover:border-emerald-300 transition-colors overflow-hidden">
                              <img
                                src={sec.image}
                                alt="Section"
                                className="w-full h-full object-contain rounded-2xl"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="order-2 md:order-2">
                          <div className="rounded-2xl border border-gray-200 bg-transparent p-0">
                            {sec.heading && <h2 className="text-2xl font-semibold text-foreground mb-3">{sec.heading}</h2>}
                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow">
                              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{sec.text}</p>
                            </div>
                          </div>
                        </div>
                        <div className="order-1 md:order-1">
                          {sec.image && (
                            <div className="h-[360px] rounded-2xl border border-gray-200 bg-white shadow flex items-center justify-center p-3 hover:border-emerald-300 transition-colors overflow-hidden">
                              <img
                                src={sec.image}
                                alt="Section"
                                className="w-full h-full object-contain rounded-2xl"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </section>
            ) : (
              <div className="prose prose-lg max-w-none">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>
            )}

            {/* Author box */}
            <section className="mt-10 border border-gray-200 rounded-2xl bg-white p-6 shadow">
              <div className="flex items-center gap-4">
                <img src="/placeholder.svg" alt="Author" className="w-12 h-12 rounded-full" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                <div>
                  <div className="text-foreground font-semibold">{blog.author || 'Maiya Hospital'}</div>
                  <div className="text-sm text-muted-foreground">Sharing evidence‑based health insights</div>
                </div>
              </div>
            </section>

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

            {/* Related Posts */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestPosts.slice(0, 4).map((p) => (
                  <Link to={`/blog/${p.id}`} key={`related-${p.id}`} className="block group">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">{p.category}</div>
                        <h3 className="text-base font-semibold text-foreground group-hover:text-green-700 line-clamp-2">{p.title}</h3>
                      </div>
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
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Promo/Ad widgets from Contentful */}
            {['sidebarTop','sidebarMiddle','sidebarBottom'].map((place) => {
              const items = promos.filter(p => (p.placement || 'sidebarTop') === place);
              return (
                <div key={place} className="space-y-4">
                  {items.length > 0 ? items.map((p) => (
                    <a key={p._id} href={p.url} target={p.openInNewTab ? '_blank' : undefined} rel={p.nofollow ? 'nofollow noopener' : 'noopener'} className="block group">
                      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow transition-all duration-300 group-hover:shadow-emerald-200 group-hover:border-emerald-300">
                        <div className="w-full h-40 flex items-center justify-center bg-white p-3">
                          <img src={p.image || '/placeholder.svg'} alt={p.title} className="max-w-full max-h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                        </div>
                        <div className="px-4 pb-4">
                          <div className="text-sm font-semibold text-foreground group-hover:text-emerald-700">{p.title}</div>
                          {p.ctaLabel && <div className="text-xs text-emerald-700 font-semibold mt-1">{p.ctaLabel} →</div>}
                        </div>
                      </div>
                    </a>
                  )) : (
                    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow">
                      <div className="h-40 bg-gray-50 flex items-center justify-center text-muted-foreground">Ad / Promotion</div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Social Media */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
              <h3 className="text-sm font-semibold mb-4">Social Media</h3>
              <div className="flex gap-3 text-white">
                <a href="#" className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center hover:opacity-90" aria-label="Facebook"><Facebook size={16} /></a>
                <a href="#" className="w-9 h-9 rounded-lg bg-[#1DA1F2] flex items-center justify-center hover:opacity-90" aria-label="Twitter"><Twitter size={16} /></a>
                <a href="#" className="w-9 h-9 rounded-lg bg-[#E1306C] flex items-center justify-center hover:opacity-90" aria-label="Instagram"><Instagram size={16} /></a>
                <a href="#" className="w-9 h-9 rounded-lg bg-[#FF0000] flex items-center justify-center hover:opacity-90" aria-label="YouTube"><Youtube size={16} /></a>
              </div>
            </div>

            {/* Most Popular */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
              <h3 className="text-sm font-semibold mb-4">Most Popular</h3>
              <div className="space-y-4">
                {bestPosts.slice(0,4).map((p) => (
                  <Link to={`/blog/${p.id}`} key={`popular-${p.id}`} className="flex gap-3 group">
                    <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <div className="text-xs text-muted-foreground">{p.category}</div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-green-700 line-clamp-2">{p.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
              <h3 className="text-sm font-semibold mb-3">Subscribe To Our Weekly Newsletter</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input type="email" placeholder="Your email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600" />
                <button className="w-full bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2 rounded-lg">Subscribe</button>
              </form>
            </div>

            {/* Categories */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
              <h3 className="text-sm font-semibold mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{blog.category || 'General'}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
} 