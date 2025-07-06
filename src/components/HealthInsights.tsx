
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";

const HealthInsights = () => {
  const insights = [
    {
      title: "10 Tips for Heart Health",
      excerpt: "Learn essential habits to maintain a healthy heart and prevent cardiovascular diseases.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      date: "Dec 15, 2024",
      category: "Cardiology",
      author: "Dr. Sarah Johnson",
      readTime: "5 min read"
    },
    {
      title: "Understanding Mental Wellness",
      excerpt: "Explore the importance of mental health and strategies for maintaining emotional well-being.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop",
      date: "Dec 12, 2024", 
      category: "Mental Health",
      author: "Dr. Michael Chen",
      readTime: "7 min read"
    },
    {
      title: "Nutrition for Better Health",
      excerpt: "Discover how proper nutrition can boost your immune system and overall health.",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop",
      date: "Dec 10, 2024",
      category: "Nutrition",
      author: "Dr. Emily Rodriguez",
      readTime: "4 min read"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-40 left-40 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-400 font-semibold text-sm mb-6 transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Health Articles</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">Latest Health</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
              Insights
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest health tips, medical advances, and wellness advice from our experts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <Card 
              key={index} 
              className="group bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-3 animate-fade-in cursor-pointer relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden">
                <img 
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white/20 transform group-hover:scale-110 transition-all duration-300">
                    {insight.category}
                  </span>
                </div>
                
                {/* Read time */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                    {insight.readTime}
                  </span>
                </div>
              </div>
              
              <CardHeader className="relative">
                <div className="flex items-center space-x-4 text-sm text-white/70 mb-3 group-hover:text-white/90 transition-colors duration-300">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{insight.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{insight.author}</span>
                  </div>
                </div>
                <CardTitle className="text-xl text-white hover:text-emerald-400 transition-colors cursor-pointer group-hover:text-emerald-400 duration-300 leading-tight">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative">
                <p className="text-white/80 mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {insight.excerpt}
                </p>
                <Button 
                  variant="outline" 
                  className="group/btn bg-white/10 border-emerald-400/50 text-emerald-400 hover:bg-emerald-400 hover:text-white backdrop-blur-sm transition-all duration-300 transform hover:scale-105 w-full"
                >
                  <span className="mr-2">Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>

                {/* Decorative elements */}
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in delay-700">
          <Button className="group bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-6 text-lg font-bold shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <span className="relative z-10 flex items-center">
              View All Articles
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HealthInsights;
