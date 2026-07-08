import ProfileInfoCard from "./components/Cards/ProfileinfoCard";
import React, { useContext, useState, useEffect } from "react";
import { APP_FEATURES, STATS, HOW_IT_WORKS_STEPS } from "./utils/data";
import { useNavigate, Link } from "react-router-dom";
import {
  LuSparkles,
  LuChevronRight,
  LuArrowRight,
  LuArrowUp,
  LuUsers,
} from "react-icons/lu";
import { VscGitMerge } from "react-icons/vsc";
import Modal from "./components/Loader/Modal";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPAssword";
import { UserContext } from "./context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import ServicesMarquee from "./components/ServicesMarquee";
import { Star, ChevronLeft, ChevronRight } from "lucide-react"; // Import icons for testimonials
import TermsandConditions from "./pages/Terms/TermsandConditions";   // ← Add this


/* ─────────────────────────────────────────────
   Reusable animated section wrapper
───────────────────────────────────────────── */
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────
   How It Works – enhanced accordion step card
───────────────────────────────── */
const HowStep = ({ step, active, onClick, index }) => (
  <motion.button
    onClick={onClick}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.08 }}
    whileHover={{ x: 4 }}
    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
      active
        ? "border-violet-500/70 bg-gradient-to-br from-violet-500/15 to-violet-900/20 shadow-lg shadow-violet-500/20"
        : "border-white/10 bg-white/5 hover:border-violet-400/40 hover:bg-white/10"
    }`}
  >
    {/* Animated background gradient on hover */}
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
        !active ? "bg-gradient-to-r from-violet-500/10 to-transparent" : ""
      }`}
    />

    <div className="flex items-center gap-4 relative z-10">
      <motion.span
        animate={{
          scale: active ? 1.15 : 1,
          boxShadow: active
            ? "0 0 20px rgba(139,92,246,0.6)"
            : "0 0 0px rgba(139,92,246,0.0)",
        }}
        transition={{ duration: 0.3 }}
        className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
          active
            ? "bg-gradient-to-br from-violet-500 to-violet-700 text-white"
            : "bg-white/10 text-gray-400 group-hover:bg-violet-500/20 group-hover:text-violet-300"
        }`}
      >
        {step.id}
      </motion.span>
      <div className="flex-1">
        <span
          className={`font-bold text-sm sm:text-base transition-colors block ${
            active ? "text-white" : "text-gray-300 group-hover:text-white"
          }`}
        >
          {step.title}
        </span>
      </div>
      <motion.div
        animate={{
          rotate: active ? 90 : 0,
          scale: active ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`ml-auto flex-shrink-0 ${
          active
            ? "text-violet-400"
            : "text-gray-500 group-hover:text-violet-300"
        }`}
      >
        <LuChevronRight />
      </motion.div>
    </div>

    <AnimatePresence>
      {active && (
        <motion.div
          key="content"
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="overflow-hidden relative z-10"
        >
          <p className="text-sm text-gray-300 pl-6 leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

/* ─────────────────────────────────────────────
   Testimonial Data
───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer, Google",
    rating: 5,
    review: "PrepPilot AI was a game-changer for my Google interviews. The AI-generated questions were spot on, and the detailed explanations helped me understand complex topics deeply. Highly recommend!",
    tags: ["DSA", "System Design", "Google"],
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "David Lee",
    role: "Frontend Developer, Meta",
    rating: 5,
    review: "The UI design questions and React deep-dives were incredibly helpful for my Meta interview. The platform's ability to simulate real interview scenarios is unmatched.",
    tags: ["Frontend", "React", "Meta"],
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "SDE-2, Amazon",
    rating: 4,
    review: "Amazon's LP questions are tricky, but PrepPilot's behavioral prep helped me structure my STAR stories perfectly. Landed the offer!",
    tags: ["Behavioral", "Leadership Principles", "Amazon"],
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Backend Engineer, Microsoft",
    rating: 5,
    review: "The OOP design questions and system design challenges were excellent. PrepPilot helped me refine my approach and articulate my solutions clearly.",
    tags: ["OOP Design", "System Design", "Microsoft"],
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Jessica Wong",
    role: "Junior Developer",
    rating: 4,
    review: "As a fresher, I found the 'Easy' and 'Medium' DSA sheets invaluable. PrepPilot made learning fun and boosted my confidence for my first job.",
    tags: ["DSA", "Entry Level", "Fresher"],
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    name: "Omar Khan",
    role: "DevOps Engineer",
    rating: 5,
    review: "The project ideas section gave me inspiration for my portfolio, and the compiler helped me practice coding challenges efficiently. Great tool!",
    tags: ["DevOps", "Projects", "Coding"],
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 7,
    name: "Emily White",
    role: "Data Scientist",
    rating: 4,
    review: "Even for data science roles, the system design and problem-solving sections were beneficial. The AI explanations are a lifesaver!",
    tags: ["Problem Solving", "AI", "Data Science"],
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
  },
];

/* ─────────────────────────────────────────────
   Star Rating Component
───────────────────────────────────────────── */
const StarRating = ({ count }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={14}
        className={n <= count ? "text-amber-400 fill-amber-400" : "text-gray-600"}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Testimonial Card Component
───────────────────────────────────────────── */
const TestimonialCard = ({ testimonial }) => (
  <div className="w-full h-full p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <StarRating count={testimonial.rating} />
      <div className="flex flex-wrap gap-1">
        {testimonial.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400">
            {tag}
          </span>
        ))}
      </div>
    </div>
    <p className="text-sm text-gray-300 leading-relaxed flex-1">"{testimonial.review}"</p>
    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
      <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover border-2 border-violet-500/50" />
      <div>
        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
        <p className="text-xs text-gray-400">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [pendingRoute, setPendingRoute] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [visibleCards, setVisibleCards] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCards);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, currentIndex]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        const maxIndex = TESTIMONIALS.length - visibleCards;
        return nextIndex > maxIndex ? 0 : nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [visibleCards, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      const maxIndex = TESTIMONIALS.length - visibleCards;
      return nextIndex < 0 ? maxIndex : nextIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      const maxIndex = TESTIMONIALS.length - visibleCards;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  };

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const navRoutes = [
    { label: "AI-Assistance", route: "/ai-helper" },
    { label: "Cognitive Skills", route: "/practice" },
    { label: "Role Prep", route: "/role-prep" },
    { label: "DSA Sheets", route: "/coding-sheets" },
    { label: "Assessment", route: "/assessment" },
  ];

  const handleNav = (route) => {
    if (!user) {
      setOpenAuthModal(true);
      setPendingRoute(route);
    } else {
      navigate(route);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ══════════════════════════════════════
          PAGE WRAPPER – dark bg + dot grid
      ══════════════════════════════════════ */}
      <div className="w-full min-h-screen bg-gray-950 dark:bg-gray-950 text-white relative overflow-hidden selection:bg-violet-700/40">
        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="pointer-events-none absolute top-[40%] right-[-150px] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />

        {/* ─────────────────────────────────
            NAVBAR – floating pill glassmorphism (opensox.ai style)
        ───────────────────────────────── */}
        <header
          className="fixed top-0 z-50 w-full pt-6 px-4 sm:px-8 lg:px-12"
          style={{ background: "transparent" }}
        >
          {/* Floating pill – true glassmorphism: ~40% opacity + strong blur */}
          <div
            className="max-w-[1200px] mx-auto flex items-center justify-between gap-6 px-5 sm:px-7 rounded-full"
            style={{
              height: "64px",
              background: "rgba(0,0,0,0.40)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 2px 24px 0 rgba(0,0,0,0.30)",
            }}
          >
            {/* Logo – with PrepPilot-Logo.png */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <img
                src="/PrepPilot-Logo.png"
                alt="PrepPilot Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold text-[15px] text-white tracking-tight whitespace-nowrap">
                PrepPilot <span className="text-violet-400">AI</span>
              </span>
            </div>

            {/* Center nav links – plain text, no bg pill */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navRoutes.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className="px-3.5 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              
              {user ? (
                <ProfileInfoCard />
              ) : (
                <>
                  {/* Login – outlined dark button (like opensox "Contribute") */}
                  <button
                    onClick={() => setOpenAuthModal(true)}
                    className="hidden sm:flex items-center gap-1.5 text-sm text-gray-200 hover:text-white font-medium px-4 py-2 rounded-xl transition-all duration-150"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <VscGitMerge className="text-base" />
                    Login
                  </button>
                  {/* Get Started – solid violet pill */}
                  <button
                    onClick={handleCTA}
                    className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-150"
                    style={{
                      background:
                        "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                      boxShadow: "0 0 16px 2px rgba(124,58,237,0.45)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 24px 4px rgba(124,58,237,0.65)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 16px 2px rgba(124,58,237,0.45)")
                    }
                  >
                    <span className="font-mono text-violet-200 text-xs">
                      &gt;_
                    </span>
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ─────────────────────────────────
            HERO – centered, full width
        ───────────────────────────────── */}
        <section className="dot-grid-bg relative pt-24 pb-20 px-4 text-center">
          <FadeIn>
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 mb-6 text-xs font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/25 px-4 py-1.5 rounded-full">
              <LuSparkles className="text-violet-400" />
              AI Powered Interview Mastery
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl mx-auto mb-6">
              Crack Every Interview with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
                AI‑Powered
              </span>{" "}
              Learning
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Get role-specific questions, expand answers when you need them,
              dive deeper into concepts, and organize everything your way. From
              preparation to mastery—your ultimate interview toolkit is here.
            </p>
          </FadeIn>

          <FadeIn delay={0.22}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCTA}
                className="cta-glow flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200"
              >
                <span className="font-mono text-xs text-violet-200">&gt;_</span>
                Get Started — It's Free
              </button>
              <button
                onClick={() => navigate("/ai-helper")}
                className="flex items-center gap-2 text-violet-300 border border-violet-500/40 hover:border-violet-400 hover:bg-violet-500/10 font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200"
              >
                <LuSparkles className="text-sm" />
                Try AI Assistance
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              No signup required for AI Assistance ✦ Free to explore
            </p>
          </FadeIn>
        </section>

        {/* ─────────────────────────────────
            STATS STRIP
        ───────────────────────────────── */}
        <section className="relative border-y border-white/6 py-14 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <FadeIn key={stat.id} delay={i * 0.07} className="text-center">
                <div className="stat-number text-4xl sm:text-5xl font-extrabold mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────
            MARQUEE / SERVICES STRIP
        ───────────────────────────────── */}
        <div className="border-b border-white/6 py-4">
          <ServicesMarquee />
        </div>

        {/* ─────────────────────────────────
            FEATURES – 3-col grid (opensox Supercharge style)
        ───────────────────────────────── */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 mb-8">
            <FadeIn className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Supercharge Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Interview Journey
                </span>
              </h2>
            </FadeIn>
          </div>

          {/* 3 equal columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 items-stretch">

            {/* ── CARD 1: Personalized Recommendations ── */}
            <FadeIn delay={0.05} className="flex h-full">
              <div className="flex flex-col w-full rounded-2xl overflow-hidden border border-white/8 bg-[#0f0f14] min-h-[520px]">
                <div className="flex-1 p-8 flex flex-col gap-3.5 border-b border-white/6">
                  {[
                    { label: "Frontend Engineer Track",  sub: "React · TypeScript · Performance" },
                    { label: "System Design Deep Dive",  sub: "HLD · LLD · Scalability"          },
                    { label: "DSA Mastery Sprint",       sub: "Arrays · Graphs · DP"              },
                    { label: "Behavioral Interview Prep", sub: "STAR · Leadership · Culture"      },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] border border-white/6">
                      <div className="w-1.5 h-10 rounded-full bg-violet-500/60 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm font-medium leading-tight">{item.label}</p>
                        <p className="text-gray-500 text-xs mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-8 py-6">
                  <h3 className="text-white font-semibold text-lg mb-1.5">Personalized Recommendations</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Curated prep tracks tailored to your target role and experience level.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ── CARD 2: AI Assistance ── */}
            <FadeIn delay={0.12} className="flex h-full">
              <div className="flex flex-col w-full rounded-2xl overflow-hidden border border-white/8 bg-[#0f0f14] min-h-[520px]">
                <div className="flex-1 p-8 border-b border-white/6 flex flex-col gap-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-gray-400" />
                    </div>
                    <div className="bg-white/[0.05] border border-white/8 rounded-xl rounded-tl-none px-4 py-3 text-sm text-gray-300 max-w-[85%]">
                      Explain time complexity of quicksort in the worst case.
                    </div>
                  </div>
                  <div className="flex gap-3 items-start flex-row-reverse">
                    <div className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-500/30 flex-shrink-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-violet-400" />
                    </div>
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl rounded-tr-none px-4 py-3 text-sm text-gray-200 max-w-[85%]">
                      In the worst case — a sorted array with the last element as pivot — quicksort degrades to <span className="text-violet-300 font-mono">O(n²)</span>. Using randomized pivots avoids this.
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-gray-400" />
                    </div>
                    <div className="bg-white/[0.05] border border-white/8 rounded-xl rounded-tl-none px-4 py-3 text-sm text-gray-300 max-w-[85%]">
                      Can you give me a follow-up question on this?
                    </div>
                  </div>
                  <div className="h-8 flex items-center gap-2 px-1">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
                <div className="px-8 py-6">
                  <h3 className="text-white font-semibold text-lg mb-1.5">Seamless AI Assistance</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Ask anything and get instant explanations, hints, and concept breakdowns.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ── CARD 3: Precision Filters ── */}
            <FadeIn delay={0.2} className="flex h-full">
              <div className="flex flex-col w-full rounded-2xl overflow-hidden border border-white/8 bg-[#0f0f14] min-h-[520px]">
                <div className="flex-1 p-8 flex flex-col gap-4 border-b border-white/6">
                  {[
                    { label: "Difficulty", tags: ["Easy", "Medium", "Hard", "Expert"] },
                    { label: "Role Type",  tags: ["Frontend", "Backend", "Full Stack", "DevOps"] },
                    { label: "Tech Stack", tags: ["React", "Node.js", "Python", "TypeScript"] },
                  ].map((group) => (
                    <div key={group.label} className="rounded-xl p-4 bg-white/[0.03] border border-white/6">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.tags.map((tag) => (
                          <span key={tag} className="text-sm px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 bg-white/[0.04]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-8 py-6">
                  <h3 className="text-white font-semibold text-lg mb-1.5">Precision Filters</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Zero in on questions by difficulty, role type, and your tech stack.
                  </p>
                </div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* ─────────────────────────────────
            HOW IT WORKS – enhanced split screen with animations
        ───────────────────────────────── */}
        <section className="py-24 px-4 border-t border-white/6 relative overflow-hidden">
          {/* Ambient background elements */}
          <div className="pointer-events-none absolute top-10 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-[100px]" />

          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3 block">
                How it Works
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Simple Steps to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Interview Ready
                </span>
              </h2>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: enhanced accordion */}
              <div className="flex flex-col gap-4">
                {HOW_IT_WORKS_STEPS.map((step, index) => (
                  <HowStep
                    key={step.id}
                    step={step}
                    active={activeStep === step.id}
                    onClick={() => setActiveStep(step.id)}
                    index={index}
                  />
                ))}
              </div>

              {/* Right: enhanced visual card */}
              <div className="sticky top-24">
                <AnimatePresence mode="wait">
                  {HOW_IT_WORKS_STEPS.filter((s) => s.id === activeStep).map(
                    (step) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="relative group"
                      >
                        {/* Glow background */}
                        <motion.div
                          animate={{
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/15 to-blue-600/8 blur-2xl"
                        />

                        {/* Main card */}
                        <div
                          className="relative rounded-3xl border overflow-hidden backdrop-blur-sm"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(20,15,40,0.95) 0%, rgba(30,20,60,0.85) 100%)",
                            border: "1px solid rgba(139,92,246,0.3)",
                            boxShadow:
                              "0 20px 60px -20px rgba(139,92,246,0.18)",
                          }}
                        >
                          {/* Content */}
                          <div className="p-10 flex flex-col items-center text-center gap-8 min-h-[420px] justify-center">
                            {/* Animated step number with glowing ring */}
                            <div className="relative">
                              <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black relative z-10"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0.1) 100%)",
                                  border: "2px solid rgba(139,92,246,0.5)",
                                  boxShadow:
                                    "0 0 30px rgba(139,92,246,0.4), inset 0 0 30px rgba(139,92,246,0.1)",
                                }}
                              >
                                <span className="text-violet-400">
                                  {step.id}
                                </span>
                              </div>
                            </div>

                            {/* Step content */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                              className="space-y-4"
                            >
                              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                                {step.title}
                              </h3>
                              <p className="text-gray-300 text-base leading-relaxed max-w-sm mx-auto">
                                {step.description}
                              </p>
                            </motion.div>

                            {/* Progress bar */}
                            <motion.div className="w-full mt-4">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs text-gray-400 font-semibold">
                                  PROGRESS
                                </span>
                                <span className="text-xs text-violet-400 font-bold">
                                  {activeStep} of {HOW_IT_WORKS_STEPS.length}
                                </span>
                              </div>
                              <div
                                className="relative h-1.5 rounded-full overflow-hidden"
                                style={{
                                  background: "rgba(255,255,255,0.1)",
                                }}
                              >
                                <motion.div
                                  initial={{ width: "0%" }}
                                  animate={{
                                    width: `${
                                      (activeStep / HOW_IT_WORKS_STEPS.length) *
                                      100
                                    }%`,
                                  }}
                                  transition={{
                                    duration: 0.4,
                                    ease: "easeOut",
                                  }}
                                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full shadow-lg shadow-violet-500/50"
                                />
                              </div>
                            </motion.div>

                            {/* Animated button */}
                            <motion.button
                              onClick={handleCTA}
                              whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 30px rgba(139,92,246,0.6)",
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all mt-2"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(79,70,229,0.6) 100%)",
                                border: "1px solid rgba(139,92,246,0.5)",
                              }}
                            >
                              <span className="font-mono text-xs text-violet-200">
                                &gt;_
                              </span>
                              Start Learning
                              <LuArrowRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ),
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────
            TESTIMONIALS – auto-scrolling carousel
        ───────────────────────────────── */}
        <section className="py-24 px-4 border-t border-white/6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3 block">
                What Our Users Say
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Trusted by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Thousands of Developers
                </span>
              </h2>
            </FadeIn>

            {/* Testimonials Scroller */}
            <div 
              className="relative overflow-hidden py-8"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Fading overlays */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

              {/* Slider Track Wrapper */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
                  }}
                >
                  {TESTIMONIALS.map((testimonial) => (
                    <div 
                      key={testimonial.id}
                      className="flex-none p-3"
                      style={{ width: `${100 / visibleCards}%` }}
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows and Dot Indicators */}
              <div className="flex justify-between items-center mt-8 px-4">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Dots indicators */}
                <div className="flex space-x-2">
                  {Array.from({ length: TESTIMONIALS.length - visibleCards + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx ? "w-6 bg-violet-500 shadow-lg shadow-violet-500/50" : "w-2.5 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────
            CTA FOOTER BANNER
        ───────────────────────────────── */}
        <section className="py-28 px-4 relative overflow-hidden border-t border-white/6">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[300px] bg-violet-600/15 rounded-full blur-[100px]" />
          </div>
          <FadeIn className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Ready to Ace Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                Next Interview?
              </span>
            </h2>
            <p className="text-gray-400 mb-10 text-base sm:text-lg">
              Join thousands of learners who have transformed their interview
              preparation with PrepPilot AI.
            </p>
            <button
              onClick={handleCTA}
              className="cta-glow inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold px-10 py-4 rounded-full text-base transition-all duration-200"
            >
              <span className="font-mono text-xs text-violet-200">&gt;_</span>
              Start Preparing for Free
              <LuArrowRight />
            </button>
          </FadeIn>
        </section>

        {/* ─────────────────────────────────
            FOOTER
        ───────────────────────────────── */}
        <footer className="w-full border-t border-white/5 bg-[#0B0F19] text-gray-400 font-sans mt-20">
  <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 sm:px-8 lg:px-12">
    
    {/* Main Multi-Column Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
      
      {/* Brand Info Column */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center gap-2">
          <img
            src="/PrepPilot-Logo.png"
            alt="PrepPilot Logo"
            className="w-6 h-6 object-contain"
          />
          <span className="font-bold text-xl tracking-tight text-white">
            PrepPilot AI
          </span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
          Your ultimate companion for crushing technical interviews with AI-powered questions, real-time feedback, and comprehensive preparation tools.
        </p>
      </div>

      {/* Column 2: Platform Features */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Features</h3>
        <ul className="space-y-2.5 text-sm">
          <li><a href="/ai-helper" className="hover:text-white transition-colors duration-200">AI Question Gen</a></li>
          <li><a href="/coding-sheets" className="hover:text-white transition-colors duration-200">DSA Sheets</a></li>
          <li><a href="/compiler" className="hover:text-white transition-colors duration-200">Code Compiler</a></li>
          <li><a href="/assessment" className="hover:text-white transition-colors duration-200">Skill Tests</a></li>
        </ul>
      </div>

      {/* Column 3: Resources */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
        <ul className="space-y-2.5 text-sm">
          <li><Link to="/resume-builder" className="hover:text-white transition-colors duration-200">Resume Builder</Link></li>
          <li><a href="/notes-books" className="hover:text-white transition-colors duration-200">Books Library</a></li>
          <li><Link to="/project-ideas" className="hover:text-white transition-colors duration-200">Project Ideas</Link></li>
          <li><a href="/interview-experiences" className="hover:text-white transition-colors duration-200">Experiences</a></li>
        </ul>
      </div>

      {/* Column 4: Community */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Community</h3>
        <ul className="space-y-2.5 text-sm">
          <li><a href="https://github.com/Canopus-Labs/PrepPilot.git" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">GitHub</a></li>
          <li><a href="/repository-hive" className="hover:text-white transition-colors duration-200">Repository Hive</a></li>
          <li><a href="/oss-blog" className="hover:text-white transition-colors duration-200">OSS Blog</a></li>
          <li><a href="/oss-events" className="hover:text-white transition-colors duration-200">Events</a></li>
        </ul>
      </div>

    </div>

    {/* Bottom Bar Container */}
    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
      <p>© {new Date().getFullYear()} PrepPilot AI. All rights reserved.</p>
      <div className="flex space-x-6">
        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
        <a href="/terms-and-conditions" className="hover:text-gray-300 transition-colors">Terms of Service</a>
      </div>
    </div>

  </div>
</footer>
      </div>
      {/* Premium Back To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              y: 40,
            }}
            whileHover={{
              scale: 1.08,
              y: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed bottom-6 right-6 z-[9999]"
            aria-label="Back To Top"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-violet-600 rounded-full blur-xl opacity-40" />

            {/* Button */}
            <div
              className="
          relative
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
          text-white
          border
          border-white/10
          backdrop-blur-xl
        "
              style={{
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                boxShadow:
                  "0 15px 35px rgba(124,58,237,0.45), 0 0 20px rgba(124,58,237,0.35)",
              }}
            >
              <LuArrowUp className="text-xl" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
      {/* ─────────────────────────────────
          AUTH MODAL
      ───────────────────────────────── */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setPendingRoute(null);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          <div className={currentPage === "login" ? "block" : "hidden"}>
            <Login
              setCurrentPage={setCurrentPage}
              onLoginSuccess={() => {
                setOpenAuthModal(false);
                setCurrentPage("login");
                if (pendingRoute) {
                  navigate(pendingRoute);
                  setPendingRoute(null);
                } else {
                  navigate("/dashboard");
                }
              }}
            />
          </div>

          <div className={currentPage === "signup" ? "block" : "hidden"}>
            <SignUp setCurrentPage={setCurrentPage} />
          </div>

          <div className={currentPage === "forgot-password" ? "block" : "hidden"}>
            <ForgotPassword setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
