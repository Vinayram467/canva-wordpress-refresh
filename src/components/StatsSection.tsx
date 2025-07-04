
const StatsSection = () => {
  const stats = [
    { number: "25+", label: "Years Experience", icon: "🏥" },
    { number: "50+", label: "Specialist Doctors", icon: "👨‍⚕️" },
    { number: "10k+", label: "Happy Patients", icon: "😊" },
    { number: "24/7", label: "Emergency Care", icon: "🚑" }
  ];

  return (
    <section className="bg-emerald-800 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-emerald-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
