import { useParams, useNavigate } from 'react-router-dom';
import { sampleEvents } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = sampleEvents.find(e => e.id === id);

  if (!event) return <div className="text-center text-white py-20">Event not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 pb-16">
      <div className="container mx-auto px-4 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-400 hover:text-blue-400 font-semibold mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="p-8">
            <span className="inline-block bg-gradient-to-r from-emerald-400 to-blue-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow mb-4">
              {event.type}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-gradient-text">
              {event.title}
            </h1>
            <div className="flex flex-col gap-2 text-white/90 text-base mb-6">
              <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-emerald-400" /> <span>{event.date}</span></div>
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /> <span>{event.time}</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-purple-400" /> <span>{event.location}</span></div>
            </div>
            <div className="text-lg text-white/90 leading-relaxed">
              {event.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail; 