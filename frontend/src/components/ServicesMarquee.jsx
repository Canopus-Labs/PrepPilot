import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const SERVICES = [
  { title: "Role-Based Preparation", description: "Curated questions tailored to your job role" },
  { title: "Aptitude Practice",      description: "Sharpen logic, quants, and verbal skills" },
  { title: "Coding Sheets",          description: "Master DSA with structured problem sets" },
  { title: "Assessment Modules",     description: "Test ready with mock exams and quizzes" },
  { title: "AI Assistance",          description: "Instant explanations, hints, and insights" },
  { title: "Resume Builder",         description: "ATS-optimised resumes in minutes" },
  { title: "Mock Interviews",        description: "Simulate real interview pressure with AI" },
];

export default function ServicesMarquee() {
  const getDuration = () => (typeof window !== "undefined" && window.innerWidth < 640 ? 18 : 45);
  const [duration, setDuration] = useState(getDuration);

  useEffect(() => {
    const handleResize = () => setDuration(getDuration());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [...SERVICES, ...SERVICES, ...SERVICES];

  return (
    <div className="w-full overflow-hidden py-6 relative">
      {/* Left fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-950 to-transparent z-10" />
      {/* Right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-950 to-transparent z-10" />

      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration, ease: "linear" }}
      >
        {items.map((service, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[220px] sm:w-[240px] px-5 py-4 rounded-xl border border-white/8 bg-white/[0.03]"
          >
            <p className="text-sm font-semibold text-white mb-1 truncate">
              {service.title}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
