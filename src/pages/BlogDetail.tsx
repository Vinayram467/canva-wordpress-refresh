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
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await blogApi.getById(id);
          setBlog(data);
          setError(null);
          return;
        }
        if (slug) {
          const list = await blogApi.getAll();
          const match = Array.isArray(list) ? list.find((b: any) => toSlug(b.title) === slug) : null;
          if (match) {
            // Fetch full blog by id to include sections
            try {
              const full = await blogApi.getById((match as any)._id || (match as any).id);
              setBlog(full || match);
            } catch {
              setBlog(match);
            }
            setError(null);
            return;
          }
        }
        throw new Error('Blog not found');
      } catch (err) {
        console.error('Error fetching blog:', err);
        // Fallback 1: try sampleBlogs
        const local = slug ? sampleBlogs.find(b => b && b.title && toSlug(b.title) === slug) : sampleBlogs.find(b => b.id === id);
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

    if (id || slug) {
      fetchBlog();
    }
  }, [id, slug]);
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
    if (blog) {
      const preferred = toSlug(blog.title);
      if (!id && slug !== preferred) {
        navigate(`/blogs/${preferred}`, { replace: true });
      } else if (id && slug !== preferred) {
        navigate(`/blogs/${preferred}`, { replace: true });
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

  // Load recent posts for Most Popular/Related sections
  useEffect(() => {
    const loadRecent = async () => {
      try {
        const all = await blogApi.getAll();
        const normalized = (Array.isArray(all) ? all : [])
          .map((p: any) => ({
            id: p._id || p.id,
            title: p.title,
            image: p.image || p.imageUrl || '/placeholder.svg',
            category: p.category || 'General',
            createdAt: p.createdAt || p.publishedAt || new Date().toISOString()
          }))
          .filter((p: any) => p.id !== (blog as any)?._id && p.title);
        normalized.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setRecentPosts(normalized.slice(0, 8));
      } catch {
        // fallback to sampleBlogs
        const fallback = sampleBlogs.map(p => ({ id: p.id, title: p.title, image: p.image, category: p.category, createdAt: new Date().toISOString() }))
          .filter(p => p.id !== (blog as any)?._id);
        setRecentPosts(fallback.slice(0, 8));
      }
    };
    loadRecent();
  }, [blog]);

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
  const prettySlug = toSlug(blog.title);
  const canonicalUrl = `https://maiyahospital.in/blogs/${prettySlug}`;
  const seoData = {
    title: `${blog.title} | Maiya Hospital Health Blog, Jayanagar`,
    description: blog.excerpt || blog.content.substring(0, 160) + '...',
    keywords: `health blog bangalore, medical news, healthcare tips, ${blog.title.toLowerCase()}, maiya hospital blog, health information jayanagar`,
    canonical: canonicalUrl,
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
      url: canonicalUrl
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

  const bestPosts = recentPosts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-10 text-[18px] md:text-[19px] leading-8 tracking-[0.005em]">
      <SEOHead
        {...seoData}
        structuredData={[
          getWebsiteSchema({ name: 'Maiya Hospital', url: 'https://maiyahospital.in', searchUrl: 'https://maiyahospital.in/search?q=' }),
          getWebPageSchema({ name: blog.title, url: canonicalUrl, description: blog.excerpt || blog.content.substring(0, 160) }),
          getPersonSchema(blog.author || 'Maiya Hospital'),
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://maiyahospital.in/' },
            { name: 'Blogs', url: 'https://maiyahospital.in/blogs' },
            { name: blog.title, url: canonicalUrl }
          ]),
          ...(seoData.structuredData as any),
          getBlogPostingSchema({
            title: blog.title,
            description: blog.excerpt || blog.content.substring(0, 160),
            image: (blog as any).image || (blog as any).imageUrl,
            url: canonicalUrl,
            publishedDate: (blog as any).createdAt || (blog as any).publishedAt,
            modifiedDate: (blog as any).updatedAt || (blog as any).createdAt,
            author: blog.author || 'Maiya Hospital'
          }),
          getBestPostsSidebarSchema(bestPosts.map(p => ({
            title: p.title,
            url: `https://maiyahospital.in/blogs/${toSlug(p.title)}`,
            image: p.image
          }))),
          getShareAction(canonicalUrl)
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

            {/* Alternating sections if provided; else fallback to plain content */}
            {Array.isArray((blog as any).sections) && (blog as any).sections.length > 0 ? (
              <section className="space-y-10">
                {(blog as any).sections.map((sec: any, idx: number) => (
                  <div key={idx} className="space-y-4">
                    {sec.heading && (
                      <div className="flex items-center gap-4">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground whitespace-nowrap">{sec.heading}</h2>
                        <div className="h-[3px] bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 flex-1 rounded-full" />
                      </div>
                    )}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center`}>
                      {sec.alignment === 'imageRight' ? (
                        <>
                          <div className="order-2 md:order-1">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{sec.text}</p>
                          </div>
                          <div className="order-1 md:order-2">
                            {sec.image && (
                              <img
                                src={sec.image}
                                alt="Section"
                                className="w-full h-[360px] object-cover rounded-2xl shadow-2xl"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                              />
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="order-2 md:order-2">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{sec.text}</p>
                          </div>
                          <div className="order-1 md:order-1">
                            {sec.image && (
                              <img
                                src={sec.image}
                                alt="Section"
                                className="w-full h-[360px] object-cover rounded-2xl shadow-2xl"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                              />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            ) : (
              <div className="max-w-[85ch] md:max-w-none">
                <div className="text-muted-foreground whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>
            )}

            {/* Inline horizontal promo after article */}
            {(() => {
              const inlinePromo = (promos || []).find(p => p.placement === 'inlineAfterArticle') || (promos || [])[0];
              if (!inlinePromo || !inlinePromo.image) return null;
              const content = (
                <div className="mt-8 rounded-2xl overflow-hidden border border-emerald-200 shadow hover:shadow-emerald-300 transition-all duration-300">
                  <img
                    src={inlinePromo.image || '/placeholder.svg'}
                    alt={inlinePromo.title}
                    className="w-full h-48 md:h-56 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                  />
                </div>
              );
              return inlinePromo.url ? (
                <a href={inlinePromo.url} target={inlinePromo.openInNewTab ? '_blank' : undefined} rel={inlinePromo.nofollow ? 'nofollow noopener' : 'noopener'} className="block">
                  {content}
                </a>
              ) : content;
            })()}

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

            <div className="mt-10 rounded-2xl border border-emerald-200 p-4">
              <Comments threadId={id!} />
            </div>

            {/* Related Posts */}
            <section className="mt-12">
              <h2 className="text-2xl font-extrabold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {(bestPosts || []).slice(0, 4).map((p: any) => (
                  <Link to={`/blog/${p.id}`} key={`related-${p.id}`} className="block group">
                    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 shadow-lg hover:shadow-emerald-200 transition-all duration-300 overflow-hidden flex flex-col h-full">
                      <img src={p.image} alt={p.title} className="w-full h-56 object-cover" />
                      <div className="p-6 flex flex-col flex-1">
                        <div className="text-xs text-emerald-700 font-semibold mb-1">{p.category}</div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-700 line-clamp-2 flex-1">{p.title}</h3>
                        <span className="mt-4 inline-flex items-center text-emerald-700 font-semibold">Read More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span></span>
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
            {(() => {
              const items = (promos || []).filter(p => !!p.image);
              if (items.length === 0) return null;
              return (
                <div className="space-y-4">
                  {items.map((p) => {
                    const content = (
                      <div className="rounded-2xl overflow-hidden border border-emerald-200 shadow transition-all duration-300 hover:shadow-emerald-300">
                        <img src={p.image || '/placeholder.svg'} alt={p.title} className="w-full h-[420px] object-cover rounded-2xl" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                        <div className="px-3 py-2">
                          <div className="text-sm font-semibold text-emerald-800">{p.title}</div>
                          {p.ctaLabel && <div className="text-xs text-emerald-700 font-semibold mt-0.5">{p.ctaLabel} →</div>}
                        </div>
                      </div>
                    );
                    return p.url ? (
                      <a key={p._id} href={p.url} target={p.openInNewTab ? '_blank' : undefined} rel={p.nofollow ? 'nofollow noopener' : 'noopener'} className="block group">{content}</a>
                    ) : (
                      <div key={p._id} className="block group">{content}</div>
                    );
                  })}
                </div>
              );
            })()}

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

            {/* Most Popular (recent posts) */}
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-6 shadow">
              <h3 className="text-sm font-semibold mb-4">Most Popular</h3>
              <div className="space-y-4">
                {(bestPosts || []).slice(0,4).map((p: any) => (
                  <Link to={`/blog/${p.id}`} key={`popular-${p.id}`} className="flex gap-3 group">
                    <img src={p.image} alt={p.title} className="w-20 h-20 object-cover rounded-xl" />
                    <div>
                      <div className="text-xs text-emerald-700 font-semibold">{p.category}</div>
                      <div className="text-sm font-bold text-foreground group-hover:text-emerald-700 line-clamp-2">{p.title}</div>
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