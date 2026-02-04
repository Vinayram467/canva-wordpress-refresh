import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/Black and Green Bold Gym Landscape Banner (20).png",
  "/Black and Green Bold Gym Landscape Banner (19).png",
  "/Banner2.png",
  "/Banner1.png",
  "/Banner4.png",
  "/Banenr5.png",
];

const AutoScrollBanner = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [current]);

  // Manual navigation
  const goTo = (dir: "left" | "right") => {
    setCurrent((prev) => {
      if (dir === "left") {
        return prev === 0 ? images.length - 1 : prev - 1;
      } else {
        return (prev + 1) % images.length;
      }
    });
  };

  return (
    <div className="relative w-full flex items-center justify-center py-4 bg-transparent overflow-hidden">
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
        onClick={() => goTo("left")}
        aria-label="Previous Banner"
      >
        <ChevronLeft className="w-7 h-7 text-green-600" />
      </button>
      <div className="w-full flex items-center justify-center px-4">
        <div className="w-full max-w-none h-auto min-h-[300px] md:min-h-[500px] rounded-3xl overflow-hidden shadow-lg flex items-center justify-center">
          <img
            src={images[current]}
            alt={`Banner ${current + 1}`}
            className="w-full h-full object-cover transition-all duration-700"
            draggable={false}
          />
        </div>
      </div>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
        onClick={() => goTo("right")}
        aria-label="Next Banner"
      >
        <ChevronRight className="w-7 h-7 text-green-600" />
      </button>
    </div>
  );
};

export default AutoScrollBanner; 
