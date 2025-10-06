
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import { sampleBlogs } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { blogApi, type Blog } from '@/services/api';

const HealthInsights = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getAll();
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(sampleBlogs as unknown as Blog[]);
        }
        setError(null);
      } catch (e) {
        setBlogs(sampleBlogs as unknown as Blog[]);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {(loading ? sampleBlogs : blogs).slice(0,3).map((blog: any) => (
            <Link to={`/blog/${blog.id || blog._id}/${(blog.title || '').toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-')}`} key={blog.id || blog._id} className="block group">
              <div className="relative rounded-2xl overflow-hidden bg-white/90 border border-white/50 shadow-lg transition-all duration-300 group-hover:shadow-emerald-500/30 group-hover:shadow-2xl group-hover:-translate-y-1">
                <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -inset-1 rounded-3xl blur-2xl bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30"></div>
                </div>
                <div className="relative">
                  <img loading="lazy" src={blog.image || blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                  <span className="absolute top-4 left-4 bg-green-700 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    {blog.category || 'Health Tips'}
                  </span>
                  <span className="absolute top-4 right-4 bg-blue-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {blog.readTime || '5 min read'}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mb-2">
                    <span>{new Date(blog.date || blog.publishedAt || Date.now()).toLocaleDateString()}</span>
                    <span className="w-1 h-1 bg-green-700 rounded-full"></span>
                    <span>{blog.author || 'Maiya Hospital'}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-1">{blog.summary || blog.excerpt || (blog.content || '').slice(0, 120)}</p>
                  <span className="mt-auto inline-flex items-center text-emerald-700 font-semibold group-hover:text-emerald-800">Read More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16 animate-fade-in delay-700">
          <Link to="/blogs">
            <button className="group bg-gradient-to-r from-green-700 to-blue-400 hover:from-blue-400 hover:to-red-500 text-white px-12 py-6 text-lg font-bold shadow-2xl hover:shadow-green-700/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden rounded-2xl">
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
