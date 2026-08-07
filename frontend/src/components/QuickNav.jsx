import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command, CornerDownLeft, Search, CornerUpLeft, Clock } from "lucide-react";
import NAV_ITEMS from "../data/navItems";

const RECENTS_KEY = "quickNav:recents";

const readRecents = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENTS_KEY) || "[]").slice(0, 5);
  } catch {
    return [];
  }
};

const buildFlatIndex = () => {
  const items = [];
  NAV_ITEMS.forEach((section) => {
    if (section.items && section.items.length) {
      section.items.forEach((item) => {
        items.push({ ...item, section: section.title });
      });
    } else if (section.path) {
      items.push({ ...section, section: "Main" });
    }
  });
  return items;
};

const FLAT_INDEX = buildFlatIndex();

const highlightMatch = (text, query) => {
  if (!query) return text;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-violet-500/20 text-violet-500 rounded-sm px-0.5">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  );
};

const QuickNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recents, setRecents] = useState(readRecents);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const tokens = trimmed.split(/\s+/).filter(Boolean);
    const base = FLAT_INDEX.filter((item) => {
      if (tokens.length === 0) return true;
      const haystack = `${item.title} ${item.path} ${item.section}`.toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    });
    return base;
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map();
    results.forEach((item) => {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section).push(item);
    });
    return Array.from(map.entries());
  }, [results]);

  const recordVisit = useCallback((path, title) => {
    setRecents((prev) => {
      const next = [{ path, title }, ...prev.filter((r) => r.path !== path)].slice(0, 5);
      try {
        localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setIsOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const goTo = useCallback(
    (item) => {
      recordVisit(item.path, item.title);
      navigate(item.path);
      closePalette();
    },
    [navigate, recordVisit, closePalette]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? event.metaKey : event.ctrlKey;

      if (mod && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => (prev ? closePalette() : openPalette()));
      } else if (event.key === "Escape" && isOpen) {
        closePalette();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, openPalette, closePalette]);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(results.length - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (results[activeIndex]) goTo(results[activeIndex]);
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-active="true"]`);
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quicknav-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closePalette}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1120] shadow-2xl shadow-black/40 overflow-hidden">
        <h2 id="quicknav-title" className="sr-only">
          Quick navigation
        </h2>

        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-700">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages... (e.g. resume, roadmap)"
            className="w-full py-3.5 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
            aria-label="Search pages"
          />
          <kbd className="shrink-0 hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-[11px] text-gray-500 dark:text-gray-400">
            <CornerUpLeft size={11} /> Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[45vh] overflow-y-auto py-2" ref={listRef}>
          {results.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                No pages match &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Try a different keyword like &ldquo;notes&rdquo; or &ldquo;courses&rdquo;.
              </p>
            </div>
          ) : (
            grouped.map(([section, items]) => (
              <div key={section} className="mb-1">
                <p className="px-4 pt-1.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  {section}
                </p>
                {items.map((item) => {
                  const flatIndex = results.indexOf(item);
                  const isActive = flatIndex === activeIndex;
                  return (
                    <button
                      key={item.path}
                      type="button"
                      data-active={isActive}
                      onClick={() => goTo(item)}
                      onMouseMove={() => setActiveIndex(flatIndex)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-violet-500/10 text-violet-600 dark:text-violet-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        {item.icon ? (
                          <item.icon size={15} className={isActive ? "text-violet-500" : "text-gray-400"} />
                        ) : (
                          <Command size={15} className="text-gray-400" />
                        )}
                      </span>
                      <span className="flex-1 truncate">
                        {highlightMatch(item.title, query)}
                      </span>
                      {flatIndex === activeIndex && (
                        <span className="shrink-0 text-violet-500">
                          <CornerDownLeft size={13} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Recents */}
        {recents.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-2 py-2">
            <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <Clock size={11} /> Recently visited
            </p>
            <div className="flex flex-wrap gap-1.5 px-2 pb-1">
              {recents.map((recent) => (
                <button
                  key={recent.path}
                  type="button"
                  onClick={() => {
                    recordVisit(recent.path, recent.title);
                    navigate(recent.path);
                    closePalette();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 hover:bg-violet-500/10 hover:text-violet-500 transition-colors"
                >
                  {recent.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer hint */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-200 dark:border-gray-700 text-[11px] text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-semibold">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-semibold">Enter</kbd>
            open
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-semibold">
              <Command size={10} />K
            </kbd>
            toggle
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickNav;
