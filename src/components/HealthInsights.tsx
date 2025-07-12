
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import { sampleBlogs } from '@/lib/utils';
import { Link } from 'react-router-dom';

const HealthInsights = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {sampleBlogs.map(blog => (
            <Link to={`/blog/${blog.id}`} key={blog.id} className="block group">
              <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-emerald-400/20 transition-all duration-300 flex flex-col h-full">
                <div className="relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                  <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    {blog.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {blog.readTime}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-white/80 text-xs mb-2">
                    <span>{blog.date}</span>
                    <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                    <span>{blog.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-white/80 mb-4 flex-1">{blog.summary}</p>
                  <span className="mt-auto inline-block text-emerald-400 font-semibold hover:underline">Read More &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16 animate-fade-in delay-700">
          <Link to="/blogs">
            <button className="group bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-6 text-lg font-bold shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden rounded-2xl">
            <span className="relative z-10 flex items-center">
              View All Articles
                <span className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HealthInsights;
