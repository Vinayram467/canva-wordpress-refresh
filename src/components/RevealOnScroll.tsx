import React, { useEffect, useRef, useState } from "react";

type RevealDirection = "up" | "down" | "left" | "right";

interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delayMs?: number;
  threshold?: number;
  className?: string;
}

/**
 * RevealOnScroll animates its children into view the first time they appear within the viewport.
 * It supports simple slide-in directions with opacity fade, using IntersectionObserver.
 */
const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  direction = "up",
  delayMs = 0,
  threshold = 0.15,
  className
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger once
            setTimeout(() => setIsVisible(true), delayMs);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delayMs, threshold]);

  const initialTransformByDirection: Record<RevealDirection, string> = {
    up: "translateY(28px)",
    down: "translateY(-28px)",
    left: "translateX(32px)",
    right: "translateX(-32px)"
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : initialTransformByDirection[direction],
    transition:
      "opacity 700ms ease-out, transform 700ms ease-out, box-shadow 300ms ease",
    willChange: "opacity, transform"
  };

  return (
    <div ref={containerRef} style={style} className={className}>
      {children}
    </div>
  );
};

export default RevealOnScroll;




