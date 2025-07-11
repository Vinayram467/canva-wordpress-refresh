
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { sampleEvents } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function NewsEvents() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-gradient-text">News & Events</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Stay updated with our latest announcements, health camps, and community events</p>
        </div>
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
        <div className="text-center mt-16 animate-fade-in delay-700">
          <Link to="/events">
            <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-6 text-lg font-bold shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden rounded-2xl">
            <span className="relative z-10 flex items-center">
              View All Events
                <span className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
