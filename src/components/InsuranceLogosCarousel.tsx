import React, { useEffect, useRef } from "react";

const insuranceLogos = [
  {
    src: "/insurance-logos/good-health-tpa.png",
    alt: "Good Health TPA"
  },
  {
    src: "/insurance-logos/oriental-insurance.png",
    alt: "Oriental Insurance"
  },
  {
    src: "/insurance-logos/health-india.png",
    alt: "Health India Insurance TPA Services"
  },
  {
    src: "/insurance-logos/ericson-insurance.png",
    alt: "Ericson Insurance TPA"
  },
  {
    src: "/insurance-logos/medsave-india.png",
    alt: "Medsave India"
  },
  {
    src: "/insurance-logos/safeway-insurance.png",
    alt: "Safeway Insurance TPA"
  },
  {
    src: "/insurance-logos/united-india.png",
    alt: "United India"
  },
  {
    src: "/insurance-logos/national-insurance.png",
    alt: "National Insurance"
  },
  {
    src: "/insurance-logos/vidal-health.png",
    alt: "Vidal Health Insurance TPA"
  },
  {
    src: "/insurance-logos/new-india-assurance.png",
    alt: "The New India Assurance"
  },
  {
    src: "/insurance-logos/bajaj-allianz.png",
    alt: "Bajaj Allianz"
  },
  {
    src: "/insurance-logos/go-digit.png",
    alt: "Go Digit"
  }
];

const InsuranceLogosCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          // Reset to start when reaching the end
          scrollRef.current.scrollLeft = 0;
        } else {
          // Smooth scroll to next position
          scrollRef.current.scrollLeft += 1;
        }
      }
    };

    // Create an interval for continuous scrolling
    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-white py-8 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
        Cashless anywhere Insurers & TPAs:
      </h2>
      
      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-hidden whitespace-nowrap py-4 px-4"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        >
          {/* Double the items to create seamless loop */}
          {[...insuranceLogos, ...insuranceLogos].map((logo, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center min-w-[200px] h-20"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceLogosCarousel;