import { sampleEvents } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Events() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">News & Events</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {sampleEvents.map(event => (
            <Link to={`/event/${event.id}`} key={event.id} className="block group">
              <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-blue-400/20 transition-all duration-300 flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1">
                  <span className={`inline-block mb-3 px-4 py-1 rounded-full text-xs font-bold shadow ${event.type === 'Health Camp' ? 'bg-emerald-500 text-white' : event.type === 'Vaccination' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'}`}>{event.type}</span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{event.title}</h3>
                  <div className="flex flex-col gap-1 text-white/80 text-sm mb-4">
                    <span><b>Date:</b> {event.date}</span>
                    <span><b>Time:</b> {event.time}</span>
                    <span><b>Location:</b> {event.location}</span>
                  </div>
                  <p className="text-white/80 mb-4 flex-1">{event.description}</p>
                  <span className="mt-auto inline-block text-blue-400 font-semibold hover:underline">Read More &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 