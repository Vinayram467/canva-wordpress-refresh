import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsApi, type NewsItem } from '@/services/api';
import { fetchLatestNewsCards } from '@/services/contentful';

export default function NewsEvents() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // Try backend first
        let items: any[] = [];
        let backendFailed = false;
        try {
          items = await newsApi.getAll();
        } catch (e) {
          backendFailed = true;
          items = [];
        }
        // Fallback to Contentful directly if backend empty/unavailable
        if (!Array.isArray(items) || items.length === 0) {
          try {
            const cf = await fetchLatestNewsCards(3);
            items = cf.map(c => ({ _id: c._id, title: c.title, image: c.image, excerpt: c.excerpt, publishedAt: c.publishedAt }));
          } catch (e) {
            if (backendFailed) {
              // Both sources failed → show explicit error
              throw e;
            }
            items = [];
          }
        }
        setNews(items.slice(0, 3));
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
    <section className="py-16 bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent mb-4 animate-gradient-text">News & Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Stay updated with our latest announcements, awards and media coverage</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (<div key={i} className="rounded-2xl overflow-hidden glass animate-pulse h-64" />))}
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground">{error}</div>
        ) : news.length === 0 ? (
          <div className="text-center text-muted-foreground">No news available yet.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map(item => (
              <Link key={item._id} to={`/news/${item._id}`} className="block group">
                <div className="relative rounded-2xl overflow-hidden bg-white/90 border border-white/50 shadow-lg transition-all duration-300 group-hover:shadow-emerald-500/30 group-hover:shadow-2xl group-hover:-translate-y-1">
                  <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute -inset-1 rounded-3xl blur-2xl bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30"></div>
                  </div>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-56 flex-shrink-0 relative">
                      <img src={(item as any).image || '/placeholder.svg'} alt={item.title} className="w-full h-32 md:h-32 object-cover transition-transform duration-300 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                      <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">News</span>
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="text-2xl font-extrabold text-foreground mb-2 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{(item as any).excerpt || (item as any).content?.slice(0,200)}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>{new Date((item as any).publishedAt || Date.now()).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span>Read</span>
                        </div>
                        <span className="inline-flex items-center text-emerald-700 font-semibold group-hover:text-emerald-800 transition-colors duration-300">
                          Read More
                          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-16 animate-fade-in delay-700">
          <Link to="/events">
            <button className="group bg-gradient-to-r from-red-500 to-blue-400 hover:from-red-600 hover:to-blue-500 text-white px-12 py-6 text-lg font-bold shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden rounded-2xl">
              <span className="relative z-10 flex items-center">View All Events<span className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300">→</span></span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
