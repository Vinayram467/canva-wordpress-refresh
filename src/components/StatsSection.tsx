
const StatsSection = () => {
  const stats = [
    { number: "25+", label: "Years Experience", icon: "🏥" },
    { number: "50+", label: "Specialist Doctors", icon: "👨‍⚕️" },
    { number: "10k+", label: "Happy Patients", icon: "😊" },
    { number: "24/7", label: "Emergency Care", icon: "🚑" }
  ];

  return (
    <section className="bg-emerald-800 py-16 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-1 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center text-white transform hover:scale-110 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-2 animate-bounce group-hover:animate-pulse">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-emerald-100 font-medium relative">
                {stat.label}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
