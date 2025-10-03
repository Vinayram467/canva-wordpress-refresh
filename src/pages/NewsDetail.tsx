import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEOHead } from '@/components/seo/SEOHead';
import { newsApi, type NewsItem } from '@/services/api';

export default function NewsDetail() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        if (!id) return;
        const data = await newsApi.getById(id);
        setItem(data);
        setError(null);
      } catch (e: any) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };
    load();
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
    if (item && id) {
      const preferred = toSlug(item.metaTitle || item.title);
      if (preferred && slug !== preferred) {
        navigate(`/news/${id}/${preferred}`, { replace: true });
      }
    }
  }, [item, id, slug, navigate]);

  const seoData = item ? {
    title: item.metaTitle || `${item.title} | Maiya Hospital News`,
    description: item.metaDescription || item.excerpt || item.content?.slice(0,160),
    canonical: `https://maiyahospital.in/news/${id}/${toSlug(item.metaTitle || item.title)}`,
    ogTitle: item.metaTitle || item.title,
    ogDescription: item.metaDescription || item.excerpt || item.content?.slice(0,160),
    ogImage: item.image,
    twitterTitle: item.metaTitle || item.title,
    twitterDescription: item.metaDescription || item.excerpt || item.content?.slice(0,160),
    twitterImage: item.image,
  } : undefined as any;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      {seoData && <SEOHead {...seoData} />}    
      <Header />
      <div className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-64 bg-gray-200 rounded mt-6" />
          </div>
        ) : error || !item ? (
          <div className="text-center text-muted-foreground">{error || 'Article not found'}</div>
        ) : (
          <article className="max-w-4xl mx-auto">
            <nav className="py-4 text-sm text-muted-foreground flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <span>/</span>
                <Link to="/events" className="hover:text-foreground">News & Events</Link>
                <span>/</span>
                <span className="text-foreground font-medium line-clamp-1 max-w-[60vw]">{item.title}</span>
              </div>
              <Link to="/events" className="text-emerald-700 hover:text-emerald-800 font-semibold">← Back to News & Events</Link>
            </nav>

            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">{item.title}</h1>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <span>{new Date(item.publishedAt || Date.now()).toLocaleDateString()}</span>
              </div>
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-[420px] object-cover rounded-2xl shadow-2xl" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
              )}
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {item.content}
              </div>
            </div>

            {(item.attachments && item.attachments.length > 0) && (
              <section className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Gallery & Attachments</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {item.attachments!.map((url, idx) => (
                    <a key={idx} href={url} target="_blank" rel="noreferrer">
                      <img src={url} alt={`Attachment ${idx+1}`} className="w-full h-48 object-cover rounded-xl" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                    </a>
                  ))}
                </div>
              </section>
            )}

            {((item.externalLinks && item.externalLinks.length > 0) || item.sourceUrl) && (
              <section className="mt-10">
                <h2 className="text-xl font-semibold mb-3">Coverage links</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {item.sourceUrl && (
                    <li>
                      <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-green-700 hover:text-green-800 font-semibold">
                        {item.sourceName || 'Primary article'} →
                      </a>
                    </li>
                  )}
                  {(item.externalLinks || []).map((l, idx) => (
                    <li key={idx}>
                      <a href={l.url} target="_blank" rel="noreferrer" className="text-green-700 hover:text-green-800 font-semibold">
                        {l.label || l.url} →
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="mt-10 flex justify-between">
              <Link to="/events" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-semibold">← Back to News & Events</Link>
              <Link to="/" className="inline-flex items-center text-blue-700 hover:text-blue-800 font-semibold">← Back to Home</Link>
            </div>
          </article>
        )}
      </div>
      <Footer />
    </div>
  );
}



