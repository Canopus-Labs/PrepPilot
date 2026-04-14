import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  MessageSquare,
  Building2,
  Star,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  CheckCircle2,
  Clock,
  Trophy,
  Filter,
  Search,
  Plus,
  Layers,
  Users,
  Code2,
  Briefcase,
  Brain,
  Send,
} from "lucide-react";

// ──────────────────────────────────────────────
// Static Sample Data
// ──────────────────────────────────────────────
const EXPERIENCES = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer (L4)",
    experience: "3 Years",
    difficulty: "Hard",
    offerReceived: true,
    date: "Feb 2026",
    rounds: [
      { name: "Online Assessment", type: "Coding", description: "2 LeetCode medium/hard questions in 90 mins. Focus on DP and Graph traversal." },
      { name: "Technical Round 1", type: "DSA", description: "45-min session on arrays, two-pointers, and sliding window. Asked to optimise a brute-force solution live." },
      { name: "Technical Round 2", type: "System Design", description: "Design a URL shortener. Covered load balancing, caching (Redis), DB choice and rate limiting." },
      { name: "Googliness Round", type: "Behavioral", description: "Situational questions on past conflicts, leadership, failure and how I dealt with ambiguity." },
      { name: "Hiring Committee", type: "Final", description: "Panel review — emphasised cross-team collaboration stories and how I drive impact." },
    ],
    summary: "Received offer after 5 rounds spanning 3 weeks. The process was rigorous with strong emphasis on both DSA and system design.",
    tips: [
      "Practice 150+ LeetCode problems; focus on Trees, Graphs and DP.",
      "For system design, always start with clarifying requirements and estimate scale.",
      "Googliness questions are NOT casual — prepare strong STAR-format stories.",
      "Use 'Think aloud' strategy throughout coding rounds.",
    ],
    tags: ["DSA", "System Design", "Behavioral"],
    color: "#4285F4",
  },
  {
    id: 2,
    company: "Amazon",
    role: "SDE-2",
    experience: "4 Years",
    difficulty: "Hard",
    offerReceived: true,
    date: "Jan 2026",
    rounds: [
      { name: "Phone Screen", type: "Coding", description: "One medium DSA problem + LP questions. Make sure to hit all 16 leadership principles." },
      { name: "Onsite Loop 1", type: "DSA", description: "Two coding problems along with LP. Think aloud and explain your reasoning continuously." },
      { name: "Onsite Loop 2", type: "System Design", description: "Design Amazon's product search. Focused on ElasticSearch integration, scalability and caching." },
      { name: "Onsite Loop 3", type: "Behavioral", description: "Deep dive into past work experiences, ownership and leadership." },
      { name: "Bar Raiser", type: "Final", description: "A senior engineer evaluates fit. LP stories must be crisp and role-level appropriate." },
    ],
    summary: "5-loop onsite process. Amazon's Leadership Principles dominate every round — never ignore behavioral prep.",
    tips: [
      "Memorise and map all 16 Leadership Principles to real work stories.",
      "Every round has LP questions — have 4-5 strong STAR stories prepared.",
      "For system design focus on scalability, availability and cost trade-offs.",
      "Always clarify edge cases before coding.",
    ],
    tags: ["DSA", "Leadership Principles", "System Design"],
    color: "#FF9900",
  },
  {
    id: 3,
    company: "Microsoft",
    role: "SDE-II",
    experience: "3 Years",
    difficulty: "Medium",
    offerReceived: true,
    date: "Mar 2026",
    rounds: [
      { name: "Recruiter Screen", type: "General", description: "Background check, role alignment and timeline discussion." },
      { name: "Technical Round 1", type: "DSA", description: "Linked lists and string manipulation. Friendly interviewer who gave hints." },
      { name: "Technical Round 2", type: "Problem Solving", description: "OOP design question — design a parking lot. Focused on class hierarchy and SOLID principles." },
      { name: "As-Appropriate", type: "Final", description: "A senior principal reviewed the packet and gave approval. Cultural fit discussion." },
    ],
    summary: "4-round process completed in under 2 weeks. Microsoft interviews are structured and relatively approachable.",
    tips: [
      "Microsoft values clean code and good OOP design — always structure your classes.",
      "Practice design patterns: Singleton, Factory, Observer.",
      "Interviewers are collaborative; feel free to ask for clarifications.",
      "Research the team and product line before your interview.",
    ],
    tags: ["DSA", "OOP Design", "Behavioral"],
    color: "#00A4EF",
  },
  {
    id: 4,
    company: "Meta",
    role: "E5 Frontend Engineer",
    experience: "5 Years",
    difficulty: "Hard",
    offerReceived: false,
    date: "Dec 2025",
    rounds: [
      { name: "Initial Screen", type: "Coding", description: "React and JavaScript deep-dive + one algorithmic problem on the phone." },
      { name: "Onsite 1", type: "Coding", description: "Two medium-hard LeetCode problems, focus on recursion and memoisation." },
      { name: "Onsite 2", type: "UI Design", description: "Build a simplified version of Facebook's news feed in React within 45 mins." },
      { name: "Onsite 3", type: "System Design", description: "Design a real-time chat application — WebSockets, message delivery guarantees." },
      { name: "Behavioral", type: "Behavioral", description: "Courage, speed and impact questions heavily aligned to Meta's core values." },
    ],
    summary: "Did not receive an offer this cycle but was encouraged to reapply in 6 months. The UI round was surprisingly difficult.",
    tips: [
      "Brush up on React internals — reconciliation, fiber, hooks in depth.",
      "Practice building mini UI components from scratch under time pressure.",
      "Meta values 'Move fast' — show quick decision-making while coding.",
      "System design: emphasise real-time messaging patterns.",
    ],
    tags: ["React", "System Design", "Frontend"],
    color: "#1877F2",
  },
  {
    id: 5,
    company: "Flipkart",
    role: "SDE-2",
    experience: "2 Years",
    difficulty: "Medium",
    offerReceived: true,
    date: "Feb 2026",
    rounds: [
      { name: "Online Test", type: "Coding", description: "3 problems in 90 mins on HackerEarth. Moderate difficulty focused on greedy and DP." },
      { name: "Technical Round 1", type: "DSA", description: "Sorting, binary search and hashing problems. Asked to dry-run code on whiteboard." },
      { name: "Technical Round 2", type: "System Design", description: "Design Flipkart's Flash Sale system. Load handling, queue-based processing discussed." },
      { name: "HR Round", type: "Behavioral", description: "Compensation negotiation, relocation preferences and career goals." },
    ],
    summary: "Smooth process. Flipkart values practical problem-solving and product thinking alongside DSA.",
    tips: [
      "Practice greedy and DP problems — very common at Flipkart.",
      "Know your resume projects deeply; they often form system design topics.",
      "For HR round negotiate confidently with data points.",
    ],
    tags: ["DSA", "System Design", "Greedy"],
    color: "#F7C600",
  },
  {
    id: 6,
    company: "Atlassian",
    role: "Senior Software Engineer",
    experience: "4 Years",
    difficulty: "Medium",
    offerReceived: true,
    date: "Nov 2025",
    rounds: [
      { name: "Take-Home Assignment", type: "Coding", description: "Build a small REST API in your preferred language within 48 hours. Assessed on code quality and tests." },
      { name: "Technical Review", type: "Code Review", description: "Interviewers walk through your take-home submission with you live — justify design decisions." },
      { name: "System Design", type: "System Design", description: "Design Jira's issue tracking system. Schema design, API contracts and search." },
      { name: "Values Interview", type: "Behavioral", description: "Open, honest and direct — Atlassian tests for teamwork, trust and no-blame culture." },
    ],
    summary: "Process felt respectful and thorough. The take-home combined with live review is a great signal of real-world skills.",
    tips: [
      "Write well-documented, tested code for the take-home — quality matters more than speed.",
      "Practice defending your technical choices calmly under pressure.",
      "Atlassian's values (Open, Honest, Team-first) are central to the culture interview.",
    ],
    tags: ["Code Quality", "System Design", "API Design"],
    color: "#0052CC",
  },
  {
    id: 7,
    company: "Razorpay",
    role: "Backend Engineer",
    experience: "2 Years",
    difficulty: "Medium",
    offerReceived: true,
    date: "Jan 2026",
    rounds: [
      { name: "Coding Round", type: "DSA", description: "2 medium problems, one on graphs and one on dynamic programming. 60 mins on HackerRank." },
      { name: "Tech Interview 1", type: "Backend", description: "Database design and indexing, REST vs GraphQL trade-offs, caching strategies." },
      { name: "Tech Interview 2", type: "System Design", description: "Design a payment gateway — idempotency, retry logic, fraud detection discussed." },
      { name: "Culture Fit", type: "Behavioral", description: "Self-starter mindset, ownership and past startup/product experience." },
    ],
    summary: "Fast-paced process. They care deeply about payment systems and backend fundamentals. Startup energy throughout.",
    tips: [
      "Know idempotency and distributed transaction patterns well.",
      "Understand payment flows end-to-end — PSP, bank APIs, settlements.",
      "Show ownership and startup hustle in behavioral rounds.",
    ],
    tags: ["Backend", "Payments", "System Design"],
    color: "#3395FF",
  },
  {
    id: 8,
    company: "Swiggy",
    role: "Software Engineer",
    experience: "1 Year",
    difficulty: "Easy",
    offerReceived: true,
    date: "Mar 2026",
    rounds: [
      { name: "Online Assessment", type: "Coding", description: "3 easy-medium problems in 90 mins. Standard array and string questions." },
      { name: "Technical Round", type: "DSA", description: "Linked list and tree problems. Explains approach before coding was encouraged." },
      { name: "HR Round", type: "Behavioral", description: "Why Swiggy, relocation, team preference and salary expectations." },
    ],
    summary: "Entry-level friendly process. Swiggy is growing fast and values passionate engineers eager to learn.",
    tips: [
      "Practice core DSA — arrays, strings, linked lists and trees.",
      "Show enthusiasm for food-tech and hyper-local problems.",
      "Know Big-O complexity for every solution you write.",
    ],
    tags: ["DSA", "Entry Level", "Behavioral"],
    color: "#FC8019",
  },
  {
    id: 9,
    company: "PhonePe",
    role: "SDE-1",
    experience: "0 Years",
    difficulty: "Easy",
    offerReceived: true,
    date: "Feb 2026",
    rounds: [
      { name: "Written Test", type: "Coding", description: "Aptitude + 2 coding problems on Arrays and recursion. 2 hours total." },
      { name: "Technical Interview", type: "DSA", description: "Discussed resume projects and solved a medium graph problem live." },
      { name: "HR Interview", type: "Behavioral", description: "Standard freshers HR questions — strengths, internship projects, expectations." },
    ],
    summary: "Fresher-friendly process, great for first placements. PhonePe prioritises problem-solving fundamentals.",
    tips: [
      "Have your internship project explained deeply — interviewers will probe it.",
      "Practice basic graph and tree traversals.",
      "Be clear about your expectations and enthusiasm for fintech.",
    ],
    tags: ["Fresher", "DSA", "Fintech"],
    color: "#5F259F",
  },
  {
    id: 10,
    company: "Zomato",
    role: "Backend Engineer",
    experience: "2 Years",
    difficulty: "Medium",
    offerReceived: false,
    date: "Dec 2025",
    rounds: [
      { name: "Online Test", type: "Coding", description: "3 problems focussed on sorting, greedy and graphs." },
      { name: "Technical Round 1", type: "Backend", description: "REST API design, microservices, and database indexing fundamentals." },
      { name: "Technical Round 2", type: "System Design", description: "Design Zomato's order management system. Real-time location tracking and availability." },
      { name: "Managerial Round", type: "Behavioral", description: "Past conflict story, ownership and career path discussion." },
    ],
    summary: "Did not clear the managerial round. Feedback was that my stories lacked concrete impact metrics. Zomato values data-driven decision making.",
    tips: [
      "Always quantify impact in behavioral stories (e.g., reduced latency by 30%).",
      "Know real-time architecture patterns like WebSockets and event streaming.",
      "Zomato values hustle and agility — show quick execution examples.",
    ],
    tags: ["Backend", "System Design", "Real-time"],
    color: "#E23744",
  },
];

const DIFFICULTY_CONFIG = {
  Easy:   { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  Medium: { color: "text-amber-400",   bg: "bg-amber-500/10  border-amber-500/20"   },
  Hard:   { color: "text-red-400",     bg: "bg-red-500/10    border-red-500/20"      },
};

const ROUND_TYPE_ICON = {
  Coding:      Code2,
  DSA:         Brain,
  "System Design": Layers,
  Behavioral:  Users,
  Backend:     Briefcase,
  General:     MessageSquare,
  Final:       Trophy,
  "UI Design": Code2,
  "Code Review": Code2,
  "API Design": Code2,
  "Problem Solving": Brain,
};

// ──────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────

const CompanyInitial = ({ company, color }) => (
  <div
    className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg text-white shadow-md shrink-0"
    style={{ background: color }}
  >
    {company.charAt(0)}
  </div>
);

const DifficultyBadge = ({ difficulty }) => {
  const cfg = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG["Medium"];
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cfg.color} ${cfg.bg}`}>
      {difficulty}
    </span>
  );
};

const ExperienceCard = ({ exp, onClick }) => (
  <div
    onClick={() => onClick(exp)}
    className="group relative bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-2xl p-5 cursor-pointer hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4"
  >
    {/* Top accent line on hover */}
    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-violet-500/60 to-fuchsia-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Header */}
    <div className="flex items-start gap-3">
      <CompanyInitial company={exp.company} color={exp.color} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{exp.company}</h3>
          <DifficultyBadge difficulty={exp.difficulty} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{exp.role}</p>
      </div>
    </div>

    {/* Stats row */}
    <div className="flex items-center gap-3 flex-wrap text-[11px] font-medium text-gray-400 dark:text-gray-500">
      <span className="flex items-center gap-1">
        <Clock size={11} />
        {exp.date}
      </span>
      <span className="flex items-center gap-1">
        <Layers size={11} />
        {exp.rounds.length} Rounds
      </span>
      <span className={`flex items-center gap-1 ${exp.offerReceived ? "text-emerald-500" : "text-red-400"}`}>
        <Trophy size={11} />
        {exp.offerReceived ? "Offer ✓" : "No Offer"}
      </span>
    </div>

    {/* Summary */}
    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
      {exp.summary}
    </p>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5">
      {exp.tags.slice(0, 3).map((tag) => (
        <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 dark:text-violet-300">
          {tag}
        </span>
      ))}
    </div>

    {/* CTA */}
    <div className="flex items-center justify-end mt-auto pt-2 border-t border-gray-100 dark:border-white/5">
      <span className="text-xs font-semibold text-violet-500 flex items-center gap-1 group-hover:gap-2 transition-all">
        Read full experience <ChevronRight size={13} />
      </span>
    </div>
  </div>
);

// ──────────────────────────────────────────────
// Detail Modal
// ──────────────────────────────────────────────
const DetailModal = ({ exp, onClose }) => {
  if (!exp) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl custom-scrollbar">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-[#111827] border-b border-gray-100 dark:border-white/5 px-6 py-5 flex items-start gap-4">
          <CompanyInitial company={exp.company} color={exp.color} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{exp.company}</h2>
              <DifficultyBadge difficulty={exp.difficulty} />
              <span className={`text-xs font-bold ${exp.offerReceived ? "text-emerald-500" : "text-red-400"}`}>
                {exp.offerReceived ? "✓ Offer Received" : "✗ No Offer"}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{exp.role} · {exp.experience} exp · {exp.date}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-8">
          {/* Summary */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-3">Overview</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{exp.summary}</p>
          </div>

          {/* Rounds */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4">Interview Rounds</h4>
            <div className="space-y-4">
              {exp.rounds.map((round, i) => {
                const Icon = ROUND_TYPE_ICON[round.type] || MessageSquare;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-violet-400" />
                      </div>
                      {i < exp.rounds.length - 1 && (
                        <div className="flex-1 w-px bg-gradient-to-b from-violet-500/20 to-transparent mt-2 min-h-[24px]" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{round.name}</span>
                        <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">{round.type}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{round.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-3">Tips & Advice</h4>
            <div className="space-y-2.5">
              {exp.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={11} className="text-emerald-400" />
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-white/5">
            {exp.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Submit Experience Modal
// ──────────────────────────────────────────────
const SubmitModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    company: "", role: "", experience: "", difficulty: "Medium",
    offerReceived: "Yes", rounds: "", summary: "", tips: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build a minimal experience object from the form
    const newExp = {
      id: Date.now(),
      company: form.company.trim(),
      role: form.role.trim(),
      experience: form.experience || "N/A",
      difficulty: form.difficulty,
      offerReceived: form.offerReceived === "Yes",
      date: new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
      rounds: form.rounds
        ? form.rounds.split("\n").filter(Boolean).map((r, i) => ({
            name: `Round ${i + 1}`,
            type: "Coding",
            description: r,
          }))
        : [],
      summary: form.summary.trim(),
      tips: form.tips
        ? form.tips.split("\n").filter(Boolean)
        : [],
      tags: [form.difficulty, form.role.split(" ")[0]].filter(Boolean),
      color: `hsl(${(form.company.charCodeAt(0) * 37) % 360}, 55%, 50%)`,
    };
    onAdd(newExp);
    setSubmitted(true);
  };

  const inputCls =
    "w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/60 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl custom-scrollbar">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-[#111827] border-b border-gray-100 dark:border-white/5 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Plus size={18} className="text-violet-400" />
            </div>
            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Share Your Experience</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Thank you!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                Your interview experience has been submitted for review. It'll appear on the board once approved.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Company *</label>
                  <input name="company" required value={form.company} onChange={handleChange} placeholder="e.g. Google" className={inputCls} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Role *</label>
                  <input name="role" required value={form.role} onChange={handleChange} placeholder="e.g. SDE-2" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Experience</label>
                  <input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 3 Years" className={inputCls} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Difficulty</label>
                  <select name="difficulty" value={form.difficulty} onChange={handleChange} className={inputCls}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Offer?</label>
                  <select name="offerReceived" value={form.offerReceived} onChange={handleChange} className={inputCls}>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Rounds Summary *</label>
                <textarea
                  name="rounds" required rows={3} value={form.rounds} onChange={handleChange}
                  placeholder="Describe each round briefly (e.g. Round 1: DSA on arrays and trees...)"
                  className={inputCls + " resize-none"}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Overall Summary *</label>
                <textarea
                  name="summary" required rows={2} value={form.summary} onChange={handleChange}
                  placeholder="Brief summary of your overall experience..."
                  className={inputCls + " resize-none"}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Tips for Others</label>
                <textarea
                  name="tips" rows={2} value={form.tips} onChange={handleChange}
                  placeholder="What advice would you give future candidates?"
                  className={inputCls + " resize-none"}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-violet-500/25"
              >
                <Send size={16} />
                Submit Experience
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Custom Company Dropdown
// ──────────────────────────────────────────────
const CompanyDropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Find the dot color for the selected company
  const selectedExp = EXPERIENCES.find((e) => e.company === value);
  const dotColor = selectedExp?.color || null;

  return (
    <div ref={ref} className="relative shrink-0">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
          open
            ? "bg-violet-500/10 border-violet-500/40 text-white"
            : "bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-violet-400/50 hover:text-violet-300"
        }`}
      >
        {/* Colored dot for selected company */}
        {dotColor ? (
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dotColor }} />
        ) : (
          <Building2 size={13} className="text-gray-400" />
        )}
        <span className="max-w-[110px] truncate">{value}</span>
        <ChevronDown
          size={13}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-52 bg-[#1a2236] dark:bg-[#111827] border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header label */}
          <div className="px-3 pt-3 pb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500">
              Filter by Company
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto custom-scrollbar pb-2">
            {options.map((opt) => {
              const expEntry = EXPERIENCES.find((e) => e.company === opt);
              const color = expEntry?.color || null;
              const isSelected = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                    isSelected
                      ? "bg-violet-600/15 text-violet-300"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {/* Color dot / all-companies icon */}
                  {color ? (
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-white text-[11px] font-extrabold"
                      style={{ background: color }}
                    >
                      {opt.charAt(0)}
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Building2 size={12} className="text-gray-400" />
                    </span>
                  )}

                  <span className="flex-1 truncate font-medium">{opt}</span>

                  {isSelected && <Check size={13} className="text-violet-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────
const FILTERS = ["All", "Easy", "Medium", "Hard"];
const COMPANIES = ["All Companies", ...Array.from(new Set(EXPERIENCES.map((e) => e.company))).sort()];

const InterviewExperiences = () => {
  const [selectedExp, setSelectedExp] = useState(null);
  const [showSubmit, setShowSubmit]   = useState(false);
  const [diffFilter, setDiffFilter]   = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All Companies");
  const [search, setSearch]           = useState("");
  const [activeTab, setActiveTab]     = useState("Common"); // "Common" | "User"
  const [userExperiences, setUserExperiences] = useState([]);

  const handleAddExperience = (exp) => {
    setUserExperiences((prev) => [exp, ...prev]);
  };

  // Source array based on active tab
  const sourceData = activeTab === "Common" ? EXPERIENCES : userExperiences;

  const filtered = useMemo(() => {
    return sourceData.filter((e) => {
      const matchDiff    = diffFilter === "All" || e.difficulty === diffFilter;
      const matchCompany = companyFilter === "All Companies" || e.company === companyFilter;
      const q = search.toLowerCase();
      const matchSearch  =
        !q ||
        e.company.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q));
      return matchDiff && matchCompany && matchSearch;
    });
  }, [sourceData, diffFilter, companyFilter, search]);

  const stats = useMemo(() => ({
    total: EXPERIENCES.length,
    withOffer: EXPERIENCES.filter((e) => e.offerReceived).length,
    companies: new Set(EXPERIENCES.map((e) => e.company)).size,
  }), []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] px-5 py-10 md:px-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 shadow-sm flex items-center justify-center shrink-0">
              <MessageSquare size={26} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Interview Experiences
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                Real stories from real candidates — learn what to expect and ace your interviews.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSubmit(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-violet-500/25 shrink-0"
          >
            <Plus size={16} />
            Share Your Experience
          </button>
        </div>

        {/* ── Quick Stats ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Experiences", value: stats.total, icon: MessageSquare, color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
            { label: "Offers Received",   value: stats.withOffer, icon: Trophy, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
            { label: "Companies Covered", value: stats.companies, icon: Building2, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-2xl p-4 md:p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={18} />
              </div>
              <div>
                <div className="text-xl font-extrabold text-gray-900 dark:text-white">{value}</div>
                <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, role, or topic..."
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none"
            />
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter size={14} className="text-gray-400" />
            <div className="flex items-center gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setDiffFilter(f)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                    diffFilter === f
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "bg-transparent border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-violet-400 hover:text-violet-400"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Company filter — custom themed dropdown */}
          <CompanyDropdown
            value={companyFilter}
            onChange={setCompanyFilter}
            options={COMPANIES}
          />
        </div>

        {/* ── Tab Toggle + Count Row ── */}
        <div className="flex items-center justify-between gap-4">
          {/* Tab toggle pill */}
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-xl">
            {["Common", "User"].map((tab) => {
              const count = tab === "Common" ? EXPERIENCES.length : userExperiences.length;
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab === "Common" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  )}
                  {tab}
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result count */}
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            Showing <span className="text-violet-400 font-bold">{filtered.length}</span> experience{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* ── Cards Grid ── */}
        {activeTab === "User" && userExperiences.length === 0 ? (
          // Empty state specifically for User tab with no submissions yet
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-violet-500/20 rounded-2xl bg-violet-500/5 dark:bg-violet-900/5">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
              <Plus size={24} className="text-violet-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">No experiences shared yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-5">
              Be the first to share your interview experience and help others prepare!
            </p>
            <button
              onClick={() => setShowSubmit(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-violet-500/25"
            >
              <Plus size={15} /> Share Your Experience
            </button>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} onClick={setSelectedExp} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-gray-200 dark:border-white/5 rounded-2xl bg-white dark:bg-[#151c2f]">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
              <Star size={24} className="text-violet-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">No experiences found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Try adjusting your filters or search query.
            </p>
            <button
              onClick={() => { setSearch(""); setDiffFilter("All"); setCompanyFilter("All Companies"); }}
              className="mt-5 px-5 py-2 rounded-xl border border-violet-500/30 text-violet-400 text-sm font-semibold hover:bg-violet-500/10 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {selectedExp && <DetailModal exp={selectedExp} onClose={() => setSelectedExp(null)} />}
      {showSubmit  && <SubmitModal onClose={() => setShowSubmit(false)} onAdd={handleAddExperience} />}
    </div>
  );
};

export default InterviewExperiences;
