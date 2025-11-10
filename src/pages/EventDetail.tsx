import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sampleEvents } from '@/lib/utils';
import { SEOHead } from '@/components/seo/SEOHead';
import { getMedicalOrganizationSchema } from '@/utils/schema';
import { promosApi, type PromoWidget } from '@/services/api';

export default function EventDetail() {
  const { id } = useParams();
  const event = sampleEvents.find(e => e.id === id);
  const [promos, setPromos] = useState<PromoWidget[]>([]);

  useEffect(() => {
    promosApi.getAll().then((p) => setPromos(Array.isArray(p) ? p : [])).catch(() => setPromos([]));
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">The event you are looking for does not exist.</p>
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

  // Generate SEO data for the event detail page
  const seoData = {
    title: `${event.title} | Medical Event in Jayanagar | Maiya Hospital`,
    description: event.description,
    keywords: `medical events jayanagar, health camps bangalore, ${event.title.toLowerCase()}, maiya hospital events, community health bangalore, medical awareness jayanagar`,
    canonical: `https://maiyahospital.in/event/${id}`,
    ogTitle: `${event.title} | Medical Event in Jayanagar | Maiya Hospital`,
    ogDescription: event.description,
    ogImage: 'https://maiyahospital.in/event-default-og.jpg',
    twitterTitle: `${event.title} | Medical Event in Jayanagar | Maiya Hospital`,
    twitterDescription: event.description,
    twitterImage: 'https://maiyahospital.in/event-default-twitter.jpg',
    structuredData: getMedicalOrganizationSchema()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
      <SEOHead {...seoData} />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        <article className="lg:col-span-9">
          {/* Event Header */}
          <header className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold shadow ${
                event.type === 'Health Camp' ? 'bg-emerald-500 text-white' : 
                event.type === 'Vaccination' ? 'bg-blue-500 text-white' : 
                'bg-purple-500 text-white'
              }`}>
                {event.type}
              </span>
              <span className="mx-2">•</span>
              <span>{event.date}</span>
              <span className="mx-2">•</span>
              <span>{event.time}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{event.location}</span>
              </div>
            </div>
          </header>

          {/* Event Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-muted-foreground leading-relaxed">
              {event.description}
            </div>
          </div>

          {/* Event Details */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted-foreground">Date: {event.date}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted-foreground">Time: {event.time}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted-foreground">Location: {event.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Registration</h3>
              <p className="text-muted-foreground mb-4">
                Join us for this important health event. Registration is free and open to all.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Register Now
              </button>
            </div>
          </div>

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

          {/* Event Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Share this event:</span>
                <button className="text-blue-600 hover:text-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 3a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zM4 5a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V5z"/>
                  </svg>
                </button>
              </div>
              <button 
                onClick={() => window.history.back()} 
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                ← Back to Events
              </button>
            </div>
          </footer>
        </article>
        {/* Sidebar promos */}
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
        </aside>
        </div>
      </div>
    </div>
  );
} 