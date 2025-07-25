import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogApi, Blog } from '@/services/api';

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getAll();
        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent">
            Maiya Blogs
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden glass animate-pulse">
                <div className="h-48 bg-blue-100/20"></div>
                <div className="p-6">
                  <div className="h-4 bg-blue-100/20 rounded mb-2"></div>
                  <div className="h-6 bg-blue-100/20 rounded mb-4"></div>
                  <div className="h-4 bg-blue-100/20 rounded mb-2"></div>
                  <div className="h-4 bg-blue-100/20 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent">
            Maiya Blogs
          </h1>
          <div className="text-center text-muted-foreground">
            <p className="text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-green-700 hover:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-700 via-blue-400 to-red-500 bg-clip-text text-transparent">
          Maiya Blogs
        </h1>
        {blogs.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p className="text-lg">No blogs available at the moment.</p>
            <p className="text-sm mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link to={`/blog/${blog._id}`} key={blog._id} className="block group">
                <div className="rounded-2xl overflow-hidden glass hover:shadow-green-700/20 transition-all duration-300 flex flex-col h-full">
                  <div className="relative">
                    <img 
                      src={blog.image || '/placeholder.svg'} 
                      alt={blog.title} 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <span className="absolute top-4 left-4 bg-green-700 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      {blog.category}
                    </span>
                    <span className="absolute top-4 right-4 bg-blue-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.readTime}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-muted-foreground text-xs mb-2">
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                      <span className="w-1 h-1 bg-green-700 rounded-full"></span>
                      <span>{blog.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-green-700 transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1">{blog.summary}</p>
                    <span className="mt-auto inline-block text-green-700 font-semibold hover:underline">
                      Read More &rarr;
                    </span>
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