import ProfileInfoCard from "./components/Cards/ProfileinfoCard";
import React, { useContext, useState } from "react";
import { APP_FEATURES, STATS, HOW_IT_WORKS_STEPS } from "./utils/data";
import { useNavigate } from "react-router-dom";
import {
  LuSparkles,
  LuChevronRight,
  LuArrowRight,
  LuUsers,
} from "react-icons/lu";
import { VscGitMerge } from "react-icons/vsc";
import Modal from "./components/Loader/Modal";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import { UserContext } from "./context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import ServicesMarquee from "./components/ServicesMarquee";
import ThemeToggle from "./components/ThemeToggle";

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
   Main Component
───────────────────────────────────────────── */
const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [pendingRoute, setPendingRoute] = useState(null);
  const [activeStep, setActiveStep] = useState(1);

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
            {/* Logo – purple circle ring + text (opensox style) */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  boxShadow:
                    "0 0 0 2px rgba(139,92,246,0.35), inset 0 0 0 2px rgba(255,255,255,0.15)",
                }}
              >
                <span className="text-white font-black text-sm tracking-tighter">
                  P
                </span>
              </div>
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
              <ThemeToggle />
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

          {/* 3 equal columns - Full Width */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {/* ── CARD 1: Personalized Recommendations ── */}
            <FadeIn delay={0.05}>
              <div
                className="bento-card flex flex-col rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(15,15,20,0.90)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minHeight: "600px",
                }}
              >
                {/* Card interior – stacked list items */}
                <div className="flex-1 p-10 flex flex-col gap-4">
                  {[
                    {
                      icon: "🎯",
                      label: "Frontend Engineer Track",
                      sub: "React · TypeScript · Performance",
                    },
                    {
                      icon: "🧠",
                      label: "System Design Deep Dive",
                      sub: "HLD · LLD · Scalability",
                    },
                    {
                      icon: "⚡",
                      label: "DSA Mastery Sprint",
                      sub: "Arrays · Graphs · DP",
                    },
                    {
                      icon: "📊",
                      label: "Behavioral Interview Prep",
                      sub: "STAR · Leadership · Culture",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: "rgba(139,92,246,0.15)" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-white text-base font-semibold leading-tight">
                          {item.label}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Card footer – title + subtitle */}
                <div className="px-10 pb-10 pt-4">
                  <h3 className="text-white font-bold text-2xl mb-2">
                    Personalized Recommendations
                  </h3>
                  <p className="text-gray-400 text-base">
                    Get curated prep tracks tailored to your target role and
                    experience level.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ── CARD 2: AI-Powered Search (orbit hub) ── */}
            <FadeIn delay={0.12}>
              <div
                className="bento-card flex flex-col rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(15,15,20,0.90)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minHeight: "600px",
                }}
              >
                {/* Orbit visual */}
                <div className="flex-1 flex items-center justify-center relative p-8">
                  {/* Orbit rings */}
                  <div
                    className="absolute w-56 h-56 rounded-full"
                    style={{ border: "1px solid rgba(139,92,246,0.15)" }}
                  />
                  <div
                    className="absolute w-80 h-80 rounded-full"
                    style={{ border: "1px solid rgba(139,92,246,0.10)" }}
                  />
                  <div
                    className="absolute w-96 h-96 rounded-full"
                    style={{ border: "1px solid rgba(139,92,246,0.06)" }}
                  />

                  {/* Orbiting tool icons */}
                  {[
                    {
                      emoji: "💬",
                      top: "8%",
                      left: "50%",
                      transform: "translateX(-50%)",
                    },
                    {
                      emoji: "📝",
                      top: "50%",
                      right: "6%",
                      transform: "translateY(-50%)",
                    },
                    { emoji: "🔍", bottom: "10%", left: "20%", transform: "" },
                    { emoji: "📊", top: "20%", left: "8%", transform: "" },
                  ].map((orb, i) => (
                    <div
                      key={i}
                      className="absolute w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        top: orb.top,
                        left: orb.left,
                        right: orb.right,
                        bottom: orb.bottom,
                        transform: orb.transform,
                        background: "rgba(30,30,40,0.95)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 0 12px rgba(139,92,246,0.2)",
                      }}
                    >
                      {orb.emoji}
                    </div>
                  ))}

                  {/* Center hub */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div
                      className="px-6 py-4 rounded-2xl text-white font-bold text-lg"
                      style={{
                        background: "rgba(20,20,28,0.98)",
                        border: "1px solid rgba(139,92,246,0.4)",
                        boxShadow: "0 0 32px rgba(139,92,246,0.25)",
                      }}
                    >
                      PrepPilot AI
                    </div>
                  </div>
                </div>
                {/* Card footer */}
                <div className="px-10 pb-10 pt-4">
                  <h3 className="text-white font-bold text-2xl mb-2">
                    Seamless AI Assistance
                  </h3>
                  <p className="text-gray-400 text-base">
                    Ask anything — get instant explanations, hints, and
                    deep-dive concept breakdowns.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ── CARD 3: Precision Filters (tag chips) ── */}
            <FadeIn delay={0.2}>
              <div
                className="bento-card flex flex-col rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(15,15,20,0.90)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minHeight: "600px",
                }}
              >
                {/* Filter chips interior */}
                <div className="flex-1 p-8 flex flex-col gap-4">
                  {/* Difficulty group */}
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                      🎚 Difficulty
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Easy", "Medium", "Hard", "Expert"].map((tag, i) => {
                        const colors = [
                          "text-green-400 border-green-500/30 bg-green-500/10",
                          "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
                          "text-orange-400 border-orange-500/30 bg-orange-500/10",
                          "text-red-400 border-red-500/30 bg-red-500/10",
                        ];
                        return (
                          <span
                            key={tag}
                            className={`text-sm font-semibold px-4 py-2 rounded-full border ${colors[i]}`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Role type group */}
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                      💼 Role Type
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Frontend", "Backend", "Full Stack", "DevOps"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="text-sm font-semibold px-4 py-2 rounded-full border text-violet-300 border-violet-500/30 bg-violet-500/10"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Tech stack group */}
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                      🔧 Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Node.js", "Python", "TypeScript"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="text-sm font-semibold px-4 py-2 rounded-full border text-blue-300 border-blue-500/30 bg-blue-500/10"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                {/* Card footer */}
                <div className="px-10 pb-10 pt-4">
                  <h3 className="text-white font-bold text-2xl mb-2">
                    Precision Filters
                  </h3>
                  <p className="text-gray-400 text-base">
                    Zero in on questions by difficulty, role type, and your tech
                    stack.
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
        <footer className="border-t border-white/6 py-8 px-4 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <LuSparkles className="text-white text-[10px]" />
            </div>
            <span className="font-semibold text-gray-400">PrepPilot AI</span>
          </div>
          <p>© {new Date().getFullYear()} PrepPilot AI. All rights reserved.</p>
        </footer>
      </div>

      {/* ─────────────────────────────────
          AUTH MODAL
      ───────────────────────────────── */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
          setPendingRoute(null);
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login
              setCurrentPage={setCurrentPage}
              onLoginSuccess={() => {
                setOpenAuthModal(false);
                if (pendingRoute) {
                  navigate(pendingRoute);
                  setPendingRoute(null);
                } else {
                  navigate("/role-prep");
                }
              }}
            />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
