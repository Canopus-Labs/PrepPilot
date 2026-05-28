import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  ExternalLink,
  Globe2,
  Loader,
  MapPin,
  Radio,
  Search,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

const MONTH_ORDER = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SOURCE_URL =
  "https://raw.githubusercontent.com/EverythingOpenSource/open-source-events/main/README.md";

const CustomSelect = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = options.find((opt) => opt.value === value);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 min-w-[10rem]"
      >
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {label}
        </span>
        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
          <span>{current?.label || "Select"}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <div
        className={`absolute left-0 mt-2 w-full min-w-[10rem] bg-white dark:bg-[#0f1729] border border-gray-200 dark:border-white/10 rounded-lg shadow-lg z-40 overflow-hidden ${open ? "block" : "hidden"}`}
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                active
                  ? "bg-violet-600 text-white"
                  : "text-gray-800 dark:text-gray-100 hover:bg-violet-50 dark:hover:bg-white/10"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const parseEventsFromMarkdown = (markdown) => {
  const lines = markdown.split(/\r?\n/);
  const events = [];
  let currentMonth = "";

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    const monthMatch = line.match(/^##\s+([A-Za-z]+)/);
    const monthCandidate = monthMatch ? monthMatch[1] : "";
    if (MONTH_ORDER.includes(monthCandidate)) {
      currentMonth = monthCandidate;
      continue;
    }

    const eventMatch = line.match(/^[-*]\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (!eventMatch) continue;

    let dateLine = "";
    for (let j = i + 1; j < Math.min(i + 6, lines.length); j += 1) {
      const peek = lines[j].trim();
      if (/^[-*]\s+\[/.test(peek) || /^##\s+/.test(peek)) break;
      const cleaned = peek.replace(/^>\s*/, "");
      if (/^Date:/i.test(cleaned)) {
        dateLine = cleaned;
        break;
      }
    }

    let date = "";
    let mode = "";
    let location = "";
    if (dateLine) {
      const parts = dateLine
        .replace(/^Date:\s*/i, "")
        .split("||")
        .map((part) => part.trim())
        .filter(Boolean);

      if (parts[0]) date = parts[0];
      if (parts[1]) mode = parts[1].replace(/^Mode:\s*/i, "").trim();
      if (parts[2]) location = parts[2].replace(/^Location:\s*/i, "").trim();
    }

    events.push({
      id: `${eventMatch[1]}-${events.length}`,
      name: eventMatch[1],
      url: eventMatch[2],
      month: currentMonth || "TBA",
      date,
      mode,
      location,
    });
  }

  return events;
};

const OpenSourceEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(SOURCE_URL);
        if (!response.ok) {
          throw new Error("Unable to load events right now.");
        }

        const markdown = await response.text();
        const parsed = parseEventsFromMarkdown(markdown);
        setEvents(parsed);
      } catch (err) {
        setError(
          err.message || "Failed to fetch events. Please try again later.",
        );
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const monthOptions = useMemo(() => {
    const uniqueMonths = new Set();
    events.forEach((event) => {
      if (event.month) uniqueMonths.add(event.month);
    });

    // If parsing yielded nothing, fall back to all months plus TBA so the dropdown is never empty.
    if (uniqueMonths.size === 0) {
      return ["TBA", ...MONTH_ORDER];
    }

    const ordered = MONTH_ORDER.filter((m) => uniqueMonths.has(m));
    const extras = [...uniqueMonths].filter((m) => !MONTH_ORDER.includes(m));
    return [...ordered, ...extras];
  }, [events]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      const matchesMonth = monthFilter === "all" || event.month === monthFilter;
      const matchesMode =
        modeFilter === "all" ||
        (event.mode && event.mode.toLowerCase().includes(modeFilter));
      const matchesSearch =
        !query ||
        event.name.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.month.toLowerCase().includes(query) ||
        event.date.toLowerCase().includes(query);

      return matchesMonth && matchesMode && matchesSearch;
    });
  }, [events, monthFilter, modeFilter, searchQuery]);

  const sortedEvents = useMemo(() => {
    const byMonthRank = (month) => {
      const idx = MONTH_ORDER.indexOf(month);
      return idx === -1 ? MONTH_ORDER.length + 1 : idx;
    };

    return [...filteredEvents].sort((a, b) => {
      const monthDiff = byMonthRank(a.month) - byMonthRank(b.month);
      if (monthDiff !== 0) return monthDiff;
      return a.name.localeCompare(b.name);
    });
  }, [filteredEvents]);

  const groupedEvents = useMemo(() => {
    const grouped = new Map();
    sortedEvents.forEach((event) => {
      const key = event.month || "TBA";
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(event);
    });
    return grouped;
  }, [sortedEvents]);

  const monthSelectOptions = useMemo(
    () => [
      { value: "all", label: "All" },
      ...monthOptions.map((month) => ({ value: month, label: month })),
    ],
    [monthOptions],
  );

  const modeSelectOptions = [
    { value: "all", label: "All" },
    { value: "in-person", label: "In-person" },
    { value: "virtual", label: "Virtual" },
    { value: "hybrid", label: "Hybrid" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <CalendarDays
              size={32}
              className="text-violet-600 dark:text-violet-400"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Conferences & Events
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Upcoming open-source conferences pulled directly from the
                community-maintained EverythingOpenSource list.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-violet-500" />
              <span>Live from GitHub: open-source-events</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 size={16} className="text-violet-500" />
              <a
                href="https://github.com/EverythingOpenSource/open-source-events"
                target="_blank"
                rel="noreferrer"
                className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
              >
                View source
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-[#0f1729] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm p-4 sm:p-5 overflow-visible"
            >
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, city, month, or date"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="flex flex-wrap gap-3 overflow-visible">
                  <CustomSelect
                    label="Month"
                    value={monthFilter}
                    options={monthSelectOptions}
                    onChange={setMonthFilter}
                  />
                  <CustomSelect
                    label="Mode"
                    value={modeFilter}
                    options={modeSelectOptions}
                    onChange={setModeFilter}
                  />
                </div>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl flex items-start gap-3"
              >
                <AlertCircle
                  size={20}
                  className="text-red-600 dark:text-red-400 flex-shrink-0"
                />
                <p className="text-red-700 dark:text-red-300 text-sm">
                  {error}
                </p>
              </motion.div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader
                  size={40}
                  className="text-violet-600 dark:text-violet-400 animate-spin mb-3"
                />
                <p className="text-gray-600 dark:text-gray-400">
                  Fetching the latest events...
                </p>
              </div>
            )}

            {!loading && groupedEvents.size === 0 && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 bg-white dark:bg-[#0f1729] border border-dashed border-gray-200 dark:border-white/10 rounded-xl"
              >
                <CalendarDays
                  size={42}
                  className="mx-auto text-gray-400 dark:text-gray-600 mb-3"
                />
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  No events match your filters.
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Try clearing the search or changing the filters.
                </p>
              </motion.div>
            )}

            {!loading && groupedEvents.size > 0 && (
              <div className="space-y-6">
                {Array.from(groupedEvents.entries()).map(
                  ([month, monthEvents]) => (
                    <motion.div
                      key={month}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={18}
                          className="text-violet-600 dark:text-violet-400"
                        />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                          {month}
                        </h2>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {monthEvents.length} event
                          {monthEvents.length === 1 ? "" : "s"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {monthEvents.map((event) => (
                          <a
                            key={event.id}
                            href={event.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group bg-white dark:bg-[#0f1729] border border-gray-200 dark:border-white/10 rounded-xl p-4 hover:border-violet-400 dark:hover:border-violet-400 transition-all duration-200 hover:-translate-y-1"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400">
                                  {event.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {event.date || "Date TBA"}
                                </p>
                              </div>
                              <ExternalLink
                                size={16}
                                className="text-gray-400 group-hover:text-violet-500"
                              />
                            </div>

                            <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                              {event.location && (
                                <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-lg">
                                  <MapPin size={14} />
                                  {event.location}
                                </span>
                              )}
                              {event.mode && (
                                <span className="inline-flex items-center gap-1 bg-violet-500/10 text-violet-700 dark:text-violet-300 px-2.5 py-1 rounded-lg">
                                  <Radio size={14} />
                                  {event.mode}
                                </span>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#0f1729] border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Quick Links
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <a
                  href="https://jonamarkin.github.io/ose-calendar/events.ics"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-violet-50 dark:hover:bg-white/5 transition-colors"
                >
                  <CalendarDays size={16} className="text-violet-500" />
                  Subscribe to calendar
                </a>
                <a
                  href="https://github.com/EverythingOpenSource/open-source-events"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-violet-50 dark:hover:bg-white/5 transition-colors"
                >
                  <Globe2 size={16} className="text-violet-500" />
                  Contribute events
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-white dark:bg-[#0f1729] border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Filters recap
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {sortedEvents.length} of {events.length} events
                {monthFilter !== "all" ? ` in ${monthFilter}` : ""}
                {modeFilter !== "all" ? ` | Mode: ${modeFilter}` : ""}
                {searchQuery ? ` | Search: ${searchQuery}` : ""}.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenSourceEvents;
