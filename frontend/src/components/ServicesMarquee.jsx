import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function ServicesMarquee() {
  const SERVICES = [
    { id: 1, title: "Role-Based Preparation", description: "Curated questions tailored to your job role." },
    { id: 2, title: "Aptitude Practice", description: "Sharpen logic, quants, and verbal skills." },
    { id: 3, title: "Coding Sheets", description: "Master DSA with structured problem sets." },
    { id: 4, title: "Assessment Modules", description: "Test ready with mock exams and quizzes." },
    { id: 5, title: "AI Assistance", description: "Instant explanations, hints, and insights." },
  ];

  // Slower marquee speed (mobile slower than before, desktop smoother)
  const getDuration = () => (window.innerWidth < 640 ? 15 : 40);
  const [duration, setDuration] = useState(
    typeof window !== "undefined" ? getDuration() : 40
  );

  useEffect(() => {
    const handleResize = () => setDuration(getDuration());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full overflow-hidden pb-6 sm:pb-10 relative">
      <motion.div
        className="flex gap-3 sm:gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration,
          ease: "linear",
        }}
      >
        {/* Duplicate services 3 times for seamless scroll on mobile */}
        {[...SERVICES, ...SERVICES, ...SERVICES].map((service, idx) => (
          <div
            key={idx}
            className="min-w-[150px] sm:min-w-[220px] md:min-w-[250px] 
                       p-3 sm:p-6 rounded-xl border border-white/20 shadow-lg
                       bg-white/10 backdrop-blur-md hover:bg-white/20 
                       transition-all duration-300 flex-shrink-0"
            style={{ maxWidth: "100%" }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-white drop-shadow mb-1 sm:mb-2">
              {service.title}
            </h3>
            <p className="text-gray-100 text-xs sm:text-[12px]">
              {service.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
