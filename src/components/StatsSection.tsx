
import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, Heart, Clock } from "lucide-react";

// Custom hook for counting animation
const useCountAnimation = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = countRef.current;
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      if (progress < 1) {
        const nextCount = Math.floor(startValue + (end - startValue) * progress);
        setCount(nextCount);
        countRef.current = nextCount;
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
        countRef.current = end;
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, isInView]);

  return { count, ref: elementRef };
};

const StatsSection = () => {
  const stats = [
    { 
      number: 25, 
      suffix: "+",
      label: "Years Experience", 
      icon: TrendingUp,
      description: "Trusted healthcare since 1999",
      color: "from-emerald-500 to-emerald-600"
    },
    { 
      number: 50, 
      suffix: "+",
      label: "Specialist Doctors", 
      icon: Users,
      description: "Highly qualified medical experts",
      color: "from-blue-500 to-blue-600"
    },
    { 
      number: 10000, 
      suffix: "+",
      label: "Happy Patients", 
      icon: Heart,
      description: "Lives touched and healed",
      color: "from-red-500 to-red-600"
    },
    { 
      number: 24, 
      suffix: "/7",
      label: "Emergency Care", 
      icon: Clock,
      description: "Round-the-clock medical support",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-red-400 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our commitment to excellence reflects in every number
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const { count, ref } = useCountAnimation(stat.number);
            const displayNumber = stat.number === 10000 ? `${Math.floor(count / 1000)}k` : count;

            return (
              <div 
                key={index}
                ref={ref}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    {displayNumber}{stat.suffix}
                  </div>
                  
                  <div className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.description}
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
