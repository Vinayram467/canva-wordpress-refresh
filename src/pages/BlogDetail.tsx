import { useParams, useNavigate } from 'react-router-dom';
import { sampleBlogs } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = sampleBlogs.find(b => b.id === id);

  if (!blog) return <div className="text-center text-white py-20">Blog not found.</div>;

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
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="relative">
            <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
            <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
              {blog.category}
            </span>
            <span className="absolute top-4 right-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {blog.readTime}
            </span>
          </div>
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-4">
              <span>{blog.date}</span>
              <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
              <span>{blog.author}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-gradient-text">
              {blog.title}
            </h1>
            <p className="text-lg text-white/90 mb-6">{blog.summary}</p>
            <div className="prose prose-invert max-w-none text-white/90 text-base leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 