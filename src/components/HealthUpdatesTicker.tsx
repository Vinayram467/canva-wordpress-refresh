import { useState, useEffect } from "react";

const HealthUpdatesTicker = () => {
  const [updates, setUpdates] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetch("/api/health-news")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched headlines:", data.headlines);
        setUpdates(data.headlines || []);
      })
      .catch(() => setUpdates([
        "Free cervical cancer vaccine drive for girls (9–14) begins",
        "24/7 ambulance support launched in metro cities",
        "AI tool detects cancer 90% faster, says WHO",
        "Free skin checkups every Saturday at NewLook Clinic",
        "New telemedicine platform connects rural patients to specialists"
      ]));
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-blue-950 to-emerald-950 border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 py-4">
        {/* Stack vertically and center */}
        <div className="flex flex-col space-y-2 items-center">
          {/* Centered Button/Label */}
          <div className="flex items-center justify-center space-x-3 flex-shrink-0 z-10 w-full">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full relative z-10 mx-auto">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white font-medium whitespace-nowrap">Live Health Updates</span>
            </div>
          </div>
          {/* Ticker below the button */}
          <div className="relative w-full h-8 overflow-hidden">
            <div
              className="absolute left-0 top-0 flex space-x-12 animate-marquee"
              style={{
                animation: 'marquee 30s linear infinite',
                whiteSpace: 'nowrap',
                willChange: 'transform'
              }}
            >
              {updates.map((update, index) => (
                <div
                  key={`first-${index}`}
                  className="text-white/90 text-sm whitespace-nowrap bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-medium"
                >
                  {update}
                </div>
              ))}
              {updates.map((update, index) => (
                <div
                  key={`second-${index}`}
                  className="text-white/90 text-sm whitespace-nowrap bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-medium"
                >
                  {update}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthUpdatesTicker;