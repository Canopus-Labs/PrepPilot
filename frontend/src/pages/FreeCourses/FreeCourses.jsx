import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ExternalLink,
  GraduationCap,
  Search,
  Tag,
} from "lucide-react";
import rawCourses from "../../data/allcourses.json";

// ── Colour helpers ────────────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  "ai tools":                "violet",
  "artificial intelligence": "violet",
  "machine learning":        "purple",
  "data science":            "blue",
  "data visualization":      "sky",
  "big data":                "cyan",
  "data programming":        "cyan",
  "cloud computing":         "sky",
  aws:                       "orange",
  "cyber security":          "red",
  "ethical hacking":         "red",
  blockchain:                "yellow",
  android:                   "green",
  angular:                   "rose",
  react:                     "sky",
  nextjs:                    "slate",
  nodejs:                    "green",
  javascript:                "yellow",
  typescript:                "blue",
  java:                      "orange",
  python:                    "blue",
  "c++":                     "indigo",
  "c#":                      "purple",
  c:                         "indigo",
  go:                        "teal",
  kotlin:                    "violet",
  docker:                    "blue",
  git:                       "orange",
  gitops:                    "orange",
  linux:                     "yellow",
  graphql:                   "pink",
  mongodb:                   "green",
  mysql:                     "orange",
  database:                  "indigo",
  sql:                       "indigo",
  "digital marketing":       "pink",
  "back-end":                "slate",
  "internet of things":      "teal",
  "augmented reality":       "fuchsia",
  programming:               "violet",
};

function getColor(title) {
  const lower = title.toLowerCase();
  for (const [key, color] of Object.entries(CATEGORY_COLORS)) {
    if (lower.includes(key)) return color;
  }
  return "violet";
}

// Tailwind needs complete class strings — map colour token to full classes
const COLOR_CLASSES = {
  violet:  { bg: "bg-violet-500/10",  text: "text-violet-500 dark:text-violet-300" },
  purple:  { bg: "bg-purple-500/10",  text: "text-purple-500 dark:text-purple-300" },
  blue:    { bg: "bg-blue-500/10",    text: "text-blue-500 dark:text-blue-300" },
  sky:     { bg: "bg-sky-500/10",     text: "text-sky-500 dark:text-sky-300" },
  cyan:    { bg: "bg-cyan-500/10",    text: "text-cyan-500 dark:text-cyan-300" },
  orange:  { bg: "bg-orange-500/10",  text: "text-orange-500 dark:text-orange-300" },
  red:     { bg: "bg-red-500/10",     text: "text-red-500 dark:text-red-300" },
  yellow:  { bg: "bg-yellow-500/10",  text: "text-yellow-500 dark:text-yellow-300" },
  green:   { bg: "bg-green-500/10",   text: "text-green-500 dark:text-green-300" },
  rose:    { bg: "bg-rose-500/10",    text: "text-rose-500 dark:text-rose-300" },
  slate:   { bg: "bg-slate-500/10",   text: "text-slate-500 dark:text-slate-300" },
  indigo:  { bg: "bg-indigo-500/10",  text: "text-indigo-500 dark:text-indigo-300" },
  teal:    { bg: "bg-teal-500/10",    text: "text-teal-500 dark:text-teal-300" },
  pink:    { bg: "bg-pink-500/10",    text: "text-pink-500 dark:text-pink-300" },
  fuchsia: { bg: "bg-fuchsia-500/10", text: "text-fuchsia-500 dark:text-fuchsia-300" },
};

// ── Source badge colours ──────────────────────────────────────────────────────

const SOURCE_BADGE = {
  geeksforgeeks:    "bg-green-500/10 text-green-400",
  coursera:         "bg-blue-500/10 text-blue-400",
  udemy:            "bg-orange-500/10 text-orange-400",
  freecodecamp:     "bg-yellow-500/10 text-yellow-400",
  simplilearn:      "bg-indigo-500/10 text-indigo-400",
  kaggle:           "bg-cyan-500/10 text-cyan-400",
  microsoft:        "bg-sky-500/10 text-sky-400",
  google:           "bg-red-500/10 text-red-400",
  "great learning": "bg-purple-500/10 text-purple-400",
  default:          "bg-white/5 text-gray-400",
};

function sourceBadgeClass(source = "") {
  const lower = source.toLowerCase();
  for (const [key, cls] of Object.entries(SOURCE_BADGE)) {
    if (lower.includes(key)) return cls;
  }
  return SOURCE_BADGE.default;
}

// ── Data helpers ──────────────────────────────────────────────────────────────

function dedupeCards(cards = []) {
  const seen = new Set();
  return cards.filter((c) => {
    const key = `${c.name}||${c.link}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeCategories(raw = []) {
  const map = new Map();
  for (const cat of raw) {
    const key = cat.title.trim();
    if (map.has(key)) {
      map.get(key).cards.push(...(cat.cards || []));
    } else {
      map.set(key, { title: key, cards: [...(cat.cards || [])] });
    }
  }
  return Array.from(map.values()).map((cat) => ({
    ...cat,
    cards: dedupeCards(cat.cards),
  }));
}

// ── Source normaliser — maps raw source strings → canonical display name ──────

// Groups many source variants into one clean label for the filter pill
const SOURCE_CANONICAL = [
  { label: "GeeksforGeeks",   match: (s) => s.toLowerCase().includes("geeksforgeeks") },
  { label: "Udemy",           match: (s) => s.toLowerCase().includes("udemy") },
  { label: "Coursera",        match: (s) => s.toLowerCase().includes("coursera") },
  { label: "FreeCodeCamp",    match: (s) => s.toLowerCase().includes("freecodecamp") || s.toLowerCase().includes("free code camp") },
  { label: "Simplilearn",     match: (s) => s.toLowerCase().includes("simplilearn") },
  { label: "Kaggle",          match: (s) => s.toLowerCase().includes("kaggle") },
  { label: "Microsoft",       match: (s) => s.toLowerCase().includes("microsoft") },
  { label: "Google",          match: (s) => s.toLowerCase().includes("google") },
  { label: "Great Learning",  match: (s) => s.toLowerCase().includes("great learning") },
  { label: "Infosys",         match: (s) => s.toLowerCase().includes("infosys") },
  { label: "IBM",             match: (s) => s.toLowerCase().includes("ibm") },
  { label: "Udacity",         match: (s) => s.toLowerCase().includes("udacity") },

  { label: "Linux Foundation",match: (s) => s.toLowerCase().includes("linux foundation") },
  { label: "Cognitive Class", match: (s) => s.toLowerCase().includes("cognitive") },
  { label: "Scaler",          match: (s) => s.toLowerCase().includes("scaler") },
  { label: "AWS",             match: (s) => s.toLowerCase().includes("aws") },
];

function canonicalSource(raw = "") {
  for (const { label, match } of SOURCE_CANONICAL) {
    if (match(raw)) return label;
  }
  return null; // unknown / minor source — won't appear as a filter pill
}

// Pre-process once at module level — no fetch needed
const ALL_CATEGORIES = mergeCategories(rawCourses);

const ITEMS_PER_PAGE = 3;

// ── Component ─────────────────────────────────────────────────────────────────

const FreeCourses = () => {
  const [query, setQuery]                   = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeSource, setActiveSource]     = useState("All");
  const [expanded, setExpanded]             = useState({});

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Build source filter pills from actual data (only sources that exist)
  const sourceTags = useMemo(() => {
    const present = new Set();
    ALL_CATEGORIES.forEach((cat) =>
      cat.cards.forEach((card) => {
        const label = canonicalSource(card.source);
        if (label) present.add(label);
      }),
    );
    // Keep them in the order defined in SOURCE_CANONICAL for consistency
    const ordered = SOURCE_CANONICAL
      .map((s) => s.label)
      .filter((l) => present.has(l));
    return ["All", ...ordered];
  }, []);

  const totalCourses = useMemo(
    () => ALL_CATEGORIES.reduce((acc, c) => acc + c.cards.length, 0),
    [],
  );

  const filteredCategories = useMemo(() => {
    const normalize = (v) => (v || "").toLowerCase().replace(/[^a-z0-9\s]/g, "");
    const term = normalize(debouncedQuery.trim());

    return ALL_CATEGORIES
      .map((cat) => {
        // When a source filter is active, keep only matching cards
        const cards =
          activeSource === "All"
            ? cat.cards
            : cat.cards.filter(
                (c) => canonicalSource(c.source) === activeSource,
              );

        if (cards.length === 0) return null;

        // Apply text search on top
        if (!term) return { ...cat, cards };

        const inTitle = normalize(cat.title).includes(term);
        const matchingCards = cards.filter(
          (c) =>
            normalize(c.name).includes(term) ||
            normalize(c.source).includes(term),
        );

        if (!inTitle && matchingCards.length === 0) return null;
        return { ...cat, cards: inTitle ? cards : matchingCards };
      })
      .filter(Boolean);
  }, [debouncedQuery, activeSource]);

  const toggleExpand = (title) =>
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <div className="min-h-full bg-[var(--color-background)] text-[var(--color-text-dark)]">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col gap-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center shrink-0">
                <GraduationCap size={22} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Free Courses</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Curated free courses from top platforms — no paywall, no signup required.
                </p>
              </div>
            </div>

            <div className="relative w-full md:w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses or topics…"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <BookOpen size={15} />
              <span>{ALL_CATEGORIES.length} categories</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <GraduationCap size={15} />
              <span>{totalCourses} courses</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <ExternalLink size={15} />
              <span>All links open externally</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Tag size={15} />
              <span>Multiple platforms</span>
            </div>
          </div>
        </div>

        {/* ── Source / Platform Filter ── */}
        <div className="flex flex-wrap gap-2">
          {sourceTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveSource(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeSource === tag
                  ? "bg-violet-600 text-white border-violet-600"
                  : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-violet-300 dark:hover:border-violet-400/50 hover:text-violet-500 dark:hover:text-violet-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Empty State ── */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
            <GraduationCap size={40} className="mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-semibold">No courses found</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Try a different search term or select a different platform filter.
            </p>
          </div>
        )}

        {/* ── Course Grid ── */}
        {filteredCategories.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCategories.map((category) => {
              const colorKey = getColor(category.title);
              const colors   = COLOR_CLASSES[colorKey] || COLOR_CLASSES.violet;
              const isOpen   = expanded[category.title];
              const visible  = isOpen
                ? category.cards
                : category.cards.slice(0, ITEMS_PER_PAGE);
              const hasMore  = category.cards.length > ITEMS_PER_PAGE;

              return (
                <div
                  key={category.title}
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center shrink-0`}>
                      <BookOpen size={18} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base font-bold truncate">{category.title}</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {category.cards.length} course{category.cards.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Course cards */}
                  <div className="flex flex-col gap-2 flex-1">
                    {visible.map((card, idx) => (
                      <a
                        key={`${card.name}-${idx}`}
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-3 rounded-xl border border-gray-100 dark:border-white/8 hover:border-violet-300 dark:hover:border-violet-400/40 hover:bg-violet-50/30 dark:hover:bg-violet-500/5 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug line-clamp-2">
                            {card.name}
                          </p>
                          <span className={`mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${sourceBadgeClass(card.source)}`}>
                            {card.source}
                          </span>
                        </div>
                        <ExternalLink
                          size={14}
                          className="shrink-0 mt-1 text-gray-400 group-hover:text-violet-400 transition-colors"
                        />
                      </a>
                    ))}
                  </div>

                  {/* Show more / less */}
                  {hasMore && (
                    <button
                      onClick={() => toggleExpand(category.title)}
                      className="text-xs font-semibold text-violet-500 hover:text-violet-400 transition-colors self-start"
                    >
                      {isOpen
                        ? "Show less ↑"
                        : `+${category.cards.length - ITEMS_PER_PAGE} more courses ↓`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default FreeCourses;
