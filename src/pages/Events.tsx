import { useEffect, useState } from 'react';
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
        const items = await newsApi.getAll();
        setNews(items);
        setError(null);
      } catch (e: any) {
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 py-16">
      <SEOHead {...seoData} />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">News & Events</h1>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (<div key={i} className="rounded-2xl overflow-hidden bg-white/10 h-64 animate-pulse" />))}
          </div>
        ) : error ? (
          <div className="text-center text-white/70">{error}</div>
        ) : news.length === 0 ? (
          <div className="text-center text-white/70">No news available yet.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map(item => (
              <Link to={`/news/${item._id}`} key={item._id} className="block group">
                <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-blue-400/20 transition-all duration-300 flex flex-col h-full">
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-bold shadow bg-blue-500 text-white">News</span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{item.title}</h3>
                    <p className="text-white/80 mb-4 flex-1">{(item as any).excerpt || (item as any).content?.slice(0,160)}</p>
                    <span className="mt-auto inline-block text-blue-400 font-semibold hover:underline">Read More &rarr;</span>
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