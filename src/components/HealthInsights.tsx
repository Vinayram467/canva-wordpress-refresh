
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HealthInsights = () => {
  const insights = [
    {
      title: "10 Tips for Heart Health",
      excerpt: "Learn essential habits to maintain a healthy heart and prevent cardiovascular diseases.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      date: "Dec 15, 2024",
      category: "Cardiology"
    },
    {
      title: "Understanding Mental Wellness",
      excerpt: "Explore the importance of mental health and strategies for maintaining emotional well-being.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop",
      date: "Dec 12, 2024", 
      category: "Mental Health"
    },
    {
      title: "Nutrition for Better Health",
      excerpt: "Discover how proper nutrition can boost your immune system and overall health.",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop",
      date: "Dec 10, 2024",
      category: "Nutrition"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">Latest Health Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest health tips, medical advances, and wellness advice from our experts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {insight.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <div className="text-sm text-gray-500 mb-2">{insight.date}</div>
                <CardTitle className="text-emerald-800 hover:text-red-600 transition-colors cursor-pointer">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{insight.excerpt}</p>
                <Button variant="outline" className="border-emerald-700 text-emerald-700 hover:bg-emerald-50">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HealthInsights;
