import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { getMedicalOrganizationSchema } from '@/utils/schema';
import { newsApi, type NewsItem } from '@/services/api';

export default function Events() {
  // Generate SEO data for the events page
  const seoData = {
    title: "Medical Events & Health Camps | Maiya Hospital Bangalore",
    description: "Stay updated with medical events, health camps, and wellness programs at Maiya Hospital Bangalore. Join our community health initiatives in Jayanagar.",
    keywords: "medical events bangalore, health camps jayanagar, wellness programs, medical workshops, health awareness, maiya hospital events",
    canonical: "https://maiyahospital.in/events",
    ogTitle: "Medical Events & Health Camps | Maiya Hospital Bangalore",
    ogDescription: "Stay updated with medical events, health camps, and wellness programs at Maiya Hospital Bangalore. Join our community health initiatives.",
    ogImage: "https://maiyahospital.in/events-og.jpg",
    twitterTitle: "Medical Events & Health Camps | Maiya Hospital Bangalore",
    twitterDescription: "Stay updated with medical events, health camps, and wellness programs at Maiya Hospital Bangalore. Join our community health initiatives.",
    twitterImage: "https://maiyahospital.in/events-twitter.jpg",
    structuredData: [getMedicalOrganizationSchema()]
  };

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [backendRes, contentfulRes] = await Promise.allSettled([
          newsApi.getAll(),
          (async () => {
            try {
              const mod = await import('@/services/contentful');
              const cf = await mod.fetchLatestNewsCards(9);
              return cf.map(c => ({ _id: c._id, title: c.title, image: c.image, excerpt: c.excerpt, publishedAt: c.publishedAt }));
            } catch {
              return [] as any[];
            }
          })()
        ]);
        let items: any[] = [];
        if (backendRes.status === 'fulfilled' && Array.isArray(backendRes.value) && backendRes.value.length > 0) {
          items = backendRes.value;
        } else if (contentfulRes.status === 'fulfilled' && Array.isArray(contentfulRes.value) && contentfulRes.value.length > 0) {
          items = contentfulRes.value;
        }
        setNews(items);
        setError(items.length === 0 ? 'No news available yet.' : null);
      } catch (e: any) {
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <SEOHead {...seoData} />
      <Header />
      <div className="container mx-auto px-4 py-10">
        <nav className="py-3 text-sm text-muted-foreground flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">News & Events</span>
          </div>
          <Link to="/" className="text-emerald-700 hover:text-emerald-800 font-semibold">← Back to Home</Link>
        </nav>

        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-emerald-700 via-blue-500 to-purple-500 bg-clip-text text-transparent">News & Events</h1>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (<div key={i} className="rounded-2xl overflow-hidden bg-white h-64 shadow animate-pulse" />))}
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground">{error}</div>
        ) : news.length === 0 ? (
          <div className="text-center text-muted-foreground">No news available yet.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map(item => (
              <Link to={`/news/${item._id}/${(item as any).metaTitle ? (item as any).metaTitle.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-') : (item.title || '').toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-')}`} key={item._id} className="block group">
                <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col h-full">
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-bold shadow bg-blue-600 text-white">News</span>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-emerald-600 transition-colors duration-300">{item.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-1">{(item as any).excerpt || (item as any).content?.slice(0,160)}</p>
                    <span className="mt-auto inline-flex items-center text-emerald-700 font-semibold group-hover:text-emerald-800">Read More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span></span>
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