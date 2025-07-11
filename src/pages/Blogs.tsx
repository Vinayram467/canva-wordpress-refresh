import { sampleBlogs } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Blogs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Maiya Blogs</h1>
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
      </div>
    </div>
  );
} 