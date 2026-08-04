import React, { useMemo, useState } from "react";
import {
  Gauge,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Search,
  Layers,
  ArrowDownWideNarrow,
  Network,
  BrainCircuit,
  ChevronRight,
} from "lucide-react";
import {
  TIERS,
  DATA_STRUCTURES,
  SORTING_ALGORITHMS,
  GRAPH_ALGORITHMS,
  SEARCH_PATTERNS,
} from "../../data/complexityCheats";

const TABS = [
  { id: "structures", label: "Data Structures", icon: Layers },
  { id: "sorting", label: "Sorting", icon: ArrowDownWideNarrow },
  { id: "graph", label: "Graph & Patterns", icon: Network },
  { id: "classes", label: "Complexity Classes", icon: Gauge },
];

const colorForComplexity = (symbol) => {
  const s = symbol || "";
  if (s.startsWith("O(1)") || s.startsWith("O(log")) return "green";
  if (s.startsWith("O(n log")) return "lime";
  if (s.startsWith("O(n)") || s.startsWith("O(nk)") || s.startsWith("O(n+k)") || s.startsWith("O(nk")) return "emerald";
  if (s.includes("²") || s.startsWith("O(n²")) return "amber";
  if (s.includes("2ⁿ") || s.startsWith("O(2ⁿ")) return "rose";
  if (s.startsWith("O(n!")) return "red";
  if (s.startsWith("O(α")) return "emerald";
  if (s.startsWith("O(E")) return "amber";
  if (s.startsWith("O(V")) return "emerald";
  if (s.includes("³")) return "amber";
  return "gray";
};

const BADGE_STYLES = {
  green: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30",
  lime: "bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/30",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
  red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
  gray: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30",
};

const ComplexityBadge = ({ symbol, size = "sm" }) => (
  <span
    className={`inline-flex items-center rounded-md border font-mono font-semibold ${
      size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-xs"
    } ${BADGE_STYLES[colorForComplexity(symbol)]}`}
  >
    {symbol}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 ${className}`}
  >
    {children}
  </div>
);

const Note = ({ note }) => (
  <div className="mt-2 pt-2 border-t border-dashed border-gray-200 dark:border-white/10">
    <p className="text-xs text-gray-500 dark:text-gray-400">{note}</p>
  </div>
);

const StructureTable = () => {
  const [mode, setMode] = useState("average");
  const [openNote, setOpenNote] = useState(null);

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-gray-500 dark:text-gray-400">Show:</span>
        {[
          { id: "average", label: "Average case" },
          { id: "worst", label: "Worst case" },
        ].map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setMode(option.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
              mode === option.id
                ? "bg-violet-500 text-white border-violet-500"
                : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/10">
            <th className="py-2.5 pr-3 font-semibold">Data structure</th>
            <th className="py-2.5 px-3 font-semibold">Access</th>
            <th className="py-2.5 px-3 font-semibold">Search</th>
            <th className="py-2.5 px-3 font-semibold">Insert</th>
            <th className="py-2.5 px-3 font-semibold">Delete</th>
          </tr>
        </thead>
        <tbody>
          {DATA_STRUCTURES.map((ds) => (
            <React.Fragment key={ds.name}>
              <tr
                className="border-b border-gray-100 dark:border-white/5 cursor-pointer"
                onClick={() => setOpenNote((prev) => (prev === ds.name ? null : ds.name))}
              >
                <td className="py-2.5 pr-3 font-medium text-gray-900 dark:text-white">
                  {ds.name}
                </td>
                {["access", "search", "insert", "delete"].map((op) => (
                  <td key={op} className="py-2.5 px-3">
                    <ComplexityBadge symbol={ds[mode][op]} />
                  </td>
                ))}
              </tr>
              {openNote === ds.name && (
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td colSpan={5} className="py-2 px-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {ds.note}
                    </p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SortingTable = () => {
  const [sortKey, setSortKey] = useState("average");
  const [sortDir, setSortDir] = useState("asc");
  const [openNote, setOpenNote] = useState(null);

  const sorted = useMemo(() => {
    const rank = {
      "O(1)": 0,
      "O(log n)": 1,
      "O(n)": 2,
      "O(n log n)": 3,
      "O(n²)": 4,
      "O(n+k)": 5,
      "O(nk)": 6,
      "O(n!)": 9,
    };
    const direction = sortDir === "asc" ? 1 : -1;
    return [...SORTING_ALGORITHMS].sort((a, b) => {
      const aVal = rank[a[sortKey]] ?? 9;
      const bVal = rank[b[sortKey]] ?? 9;
      return (aVal - bVal) * direction;
    });
  }, [sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const headers = [
    { key: "best", label: "Best" },
    { key: "average", label: "Average" },
    { key: "worst", label: "Worst" },
    { key: "space", label: "Space" },
  ];

  return (
    <div className="overflow-x-auto">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Click a column header to sort the table by that column.
      </p>
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/10">
            <th className="py-2.5 pr-3 font-semibold">Algorithm</th>
            {headers.map(({ key, label }) => (
              <th key={key} className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => toggleSort(key)}
                  className="inline-flex items-center gap-1 font-semibold hover:text-violet-500 transition-colors"
                >
                  {label}
                  {sortKey === key ? (
                    sortDir === "asc" ? (
                      <ChevronUp size={13} />
                    ) : (
                      <ChevronDown size={13} />
                    )
                  ) : (
                    <ArrowUpDown size={12} className="opacity-50" />
                  )}
                </button>
              </th>
            ))}
            <th className="py-2.5 pl-3 font-semibold">Stable</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((algo) => (
            <React.Fragment key={algo.name}>
              <tr
                className="border-b border-gray-100 dark:border-white/5 cursor-pointer"
                onClick={() => setOpenNote((prev) => (prev === algo.name ? null : algo.name))}
              >
                <td className="py-2.5 pr-3 font-medium text-gray-900 dark:text-white">
                  {algo.name}
                </td>
                {["best", "average", "worst", "space"].map((key) => (
                  <td key={key} className="py-2.5 px-3">
                    <ComplexityBadge symbol={algo[key]} />
                  </td>
                ))}
                <td className="py-2.5 pl-3">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold ${
                      algo.stable
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-gray-500/10 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {algo.stable ? "Y" : "N"}
                  </span>
                </td>
              </tr>
              {openNote === algo.name && (
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td colSpan={6} className="py-2 px-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {algo.note}
                    </p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GraphSection = ({ items }) => (
  <div className="grid sm:grid-cols-2 gap-4">
    {items.map((algo) => (
      <Card key={algo.name}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {algo.name}
          </h3>
          <ComplexityBadge symbol={algo.complexity} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {algo.note}
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
          Space: {algo.space}
        </p>
      </Card>
    ))}
  </div>
);

const PatternsSection = ({ items }) => (
  <div className="grid sm:grid-cols-2 gap-4">
    {items.map((pattern) => (
      <Card key={pattern.name}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {pattern.name}
          </h3>
          <ComplexityBadge symbol={pattern.complexity} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {pattern.note}
        </p>
      </Card>
    ))}
  </div>
);

const ClassesSection = ({ query }) => {
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return TIERS;
    return TIERS.filter((tier) =>
      `${tier.symbol} ${tier.name} ${tier.description} ${tier.examples}`
        .toLowerCase()
        .includes(term)
    );
  }, [query]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {TIERS.map((tier) => (
          <ComplexityBadge key={tier.symbol} symbol={tier.symbol} size="md" />
        ))}
      </div>
      {filtered.map((tier) => (
        <Card key={tier.symbol}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {tier.symbol}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {tier.name}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1.5">
                {tier.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <ChevronRight size={13} className="text-violet-500 shrink-0" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {tier.examples}
            </p>
          </div>
        </Card>
      ))}
      {filtered.length === 0 && (
        <div className="text-center py-10">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No complexity class matches &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
};

const ComplexityCheats = () => {
  const [activeTab, setActiveTab] = useState("structures");
  const [query, setQuery] = useState("");

  const filterByQuery = (items, fields) => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) =>
      fields(item).toLowerCase().includes(term)
    );
  };

  const structures = filterByQuery(DATA_STRUCTURES, (d) =>
    `${d.name} ${d.note}`.replace(/O\([^)]*\)/g, "")
  );
  const sorting = filterByQuery(SORTING_ALGORITHMS, (s) =>
    `${s.name} ${s.note}`.replace(/O\([^)]*\)/g, "")
  );
  const graph = filterByQuery(GRAPH_ALGORITHMS, (g) => `${g.name} ${g.note}`);
  const patterns = filterByQuery(SEARCH_PATTERNS, (p) => `${p.name} ${p.note}`);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-dark)]">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-6">
        {/* Header */}
        <Card>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center">
                <Gauge size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Complexity Cheat Sheet
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Time &amp; space complexity for data structures, sorting and
                  graph algorithms. Revise in 2 minutes before your interview.
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
                placeholder="Filter: hash, merge, dijkstra..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    active
                      ? "bg-violet-500 text-white border-violet-500"
                      : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Card>

        {activeTab === "structures" && (
          <>
            {query.trim() && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {structures.length} of {DATA_STRUCTURES.length} structures match
              </p>
            )}
            {structures.length > 0 ? (
              <Card>
                <StructureTable />
              </Card>
            ) : (
              <EmptyState text="No data structure matches your filter" />
            )}
          </>
        )}

        {activeTab === "sorting" && (
          <>
            {query.trim() && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {sorting.length} of {SORTING_ALGORITHMS.length} algorithms match
              </p>
            )}
            {sorting.length > 0 ? (
              <Card>
                <SortingTable />
              </Card>
            ) : (
              <EmptyState text="No sorting algorithm matches your filter" />
            )}
          </>
        )}

        {activeTab === "graph" && (
          <>
            {query.trim() && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {graph.length + patterns.length} results
              </p>
            )}
            <div className="space-y-6">
              <div>
                <SectionTitle icon={Network} text="Graph algorithms" />
                {graph.length > 0 ? (
                  <GraphSection items={graph} />
                ) : (
                  <EmptyState text="No graph algorithm matches your filter" />
                )}
              </div>
              <div>
                <SectionTitle icon={BrainCircuit} text="Common patterns" />
                {patterns.length > 0 ? (
                  <PatternsSection items={patterns} />
                ) : (
                  <EmptyState text="No pattern matches your filter" />
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "classes" && <ClassesSection query={query} />}
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, text }) => {
  const SectionTitleIcon = icon;
  return (
    <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-3">
      <SectionTitleIcon size={16} className="text-violet-500" />
      {text}
    </h2>
  );
};

const EmptyState = ({ text }) => (
  <div className="text-center py-12 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
    <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
  </div>
);

export default ComplexityCheats;
