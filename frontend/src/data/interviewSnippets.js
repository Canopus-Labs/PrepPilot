const interviewSnippets = [
  {
    id: "js-debounce",
    category: "javascript",
    language: "javascript",
    title: "Debounce (leading + trailing)",
    description:
      "Delays a function call until the user stops triggering it. Uses a wrapper that stores the latest arguments and clears the timeout on every new invocation.",
    tags: ["events", "performance", "search"],
    complexity: "medium",
    code: `function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const onInput = debounce((e) => {
  console.log("Search query:", e.target.value);
}, 250);
`,
  },
  {
    id: "js-throttle",
    category: "javascript",
    language: "javascript",
    title: "Throttle (at most one call per interval)",
    description:
      "Guarantees a function runs at most once per interval even if events fire continuously. Ideal for scroll/resize handlers.",
    tags: ["events", "performance", "scroll"],
    complexity: "medium",
    code: `function throttle(fn, limit = 200) {
  let inCooldown = false;
  return function (...args) {
    if (inCooldown) return;
    fn.apply(this, args);
    inCooldown = true;
    setTimeout(() => { inCooldown = false; }, limit);
  };
}

window.addEventListener("resize", throttle(() => {
  console.log("Viewport:", window.innerWidth);
}, 300));
`,
  },
  {
    id: "js-flatten",
    category: "javascript",
    language: "javascript",
    title: "Flatten a nested array (any depth)",
    description:
      "Recursive flatten that handles mixed-depth nesting. Also shows the one-line flat(Infinity) alternative for shallow work.",
    tags: ["array", "recursion"],
    complexity: "easy",
    code: `function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

flatten([1, [2, [3, [4]], 5]]); // [1, 2, 3, 4, 5]

// Shallow one-liner:
const flatOne = (arr) => arr.flat(Infinity);
`,
  },
  {
    id: "js-memoize",
    category: "javascript",
    language: "javascript",
    title: "Memoize a pure function",
    description:
      "Caches results by JSON-serialized arguments. Great for expensive computations that repeat with identical inputs.",
    tags: ["cache", "performance"],
    complexity: "medium",
    code: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const fib = memoize((n) => n <= 1 ? n : fib(n - 1) + fib(n - 2));
console.log(fib(40)); // computed once, then cached
`,
  },
  {
    id: "js-group-by",
    category: "javascript",
    language: "javascript",
    title: "Group an array by key",
    description:
      "Buckets objects into a map keyed by a chosen property. Useful for dashboard charts and analytics grouping.",
    tags: ["array", "data"],
    complexity: "easy",
    code: `function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {});
}

const people = [
  { name: "Ada", dept: "AI" },
  { name: "Grace", dept: "Compilers" },
  { name: "Alan", dept: "AI" },
];

groupBy(people, (p) => p.dept);
// { "AI": [Ada, Alan], "Compilers": [Grace] }
`,
  },
  {
    id: "js-array-chunk",
    category: "javascript",
    language: "javascript",
    title: "Chunk an array into groups",
    description:
      "Splits an array into fixed-size chunks — handy for pagination and carousel rows.",
    tags: ["array", "pagination"],
    complexity: "easy",
    code: `function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

chunk([1, 2, 3, 4, 5, 6, 7], 3);
// [[1,2,3], [4,5,6], [7]]
`,
  },
  {
    id: "js-deep-clone",
    category: "javascript",
    language: "javascript",
    title: "Deep clone with Date and RegExp support",
    description:
      "structuredClone is the modern answer; the fallback shows how to copy Dates and RegExps manually.",
    tags: ["objects", "utility"],
    complexity: "medium",
    code: `const deepClone = (value) =>
  value === null || typeof value !== "object"
    ? value
    : structuredClone(value);

// Manual fallback for environments without structuredClone:
function manualClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  const copy = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = manualClone(obj[key]);
    }
  }
  return copy;
}
`,
  },
  {
    id: "js-two-pointer",
    category: "javascript",
    language: "javascript",
    title: "Two-pointer: find pair summing to target",
    description:
      "Classic sorted-array O(n) technique. Works when the input is sorted ascending; add a sort if needed.",
    tags: ["algorithm", "two-pointer", "array"],
    complexity: "medium",
    code: `function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left += 1;
    else right -= 1;
  }
  return [-1, -1]; // no pair found
}

twoSumSorted([2, 7, 11, 15], 9); // [0, 1]
`,
  },
  {
    id: "react-custom-hook",
    category: "react",
    language: "javascript",
    title: "useFetch custom hook with abort",
    description:
      "A reusable data-fetching hook with loading/error states and AbortController cancellation to avoid setting state on unmounted components.",
    tags: ["hooks", "data-fetching", "abort"],
    complexity: "advanced",
    code: `import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
`,
  },
  {
    id: "react-use-debounced-value",
    category: "react",
    language: "javascript",
    title: "useDebouncedValue hook",
    description:
      "Returns a value that only updates after the given delay, perfect for search-as-you-type without hammering an API on every keystroke.",
    tags: ["hooks", "search", "debounce"],
    complexity: "easy",
    code: `import { useEffect, useState } from "react";

function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// usage
const query = useDebouncedValue(rawQuery, 300);
`,
  },
  {
    id: "react-context-provider",
    category: "react",
    language: "javascript",
    title: "Theme context with persistence",
    description:
      "Small context pattern that mirrors PrepPilot's own themeContext: state + localStorage sync + fast-refresh-safe export.",
    tags: ["context", "state", "theme"],
    complexity: "easy",
    code: `import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
`,
  },
  {
    id: "react-render-props",
    category: "react",
    language: "javascript",
    title: "Infinite scroll hook (IntersectionObserver)",
    description:
      "Reusable hook that calls onLoadMore when a sentinel element scrolls into view. Includes a loading guard to prevent duplicate calls.",
    tags: ["hooks", "pagination", "intersection"],
    complexity: "advanced",
    code: `import { useEffect, useRef } from "react";

function useInfiniteScroll(onLoadMore, hasMore, loading) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onLoadMore();
    }, { rootMargin: "200px" });

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return sentinelRef;
}
`,
  },
  {
    id: "css-glass-card",
    category: "css",
    language: "css",
    title: "Glassmorphism card",
    description:
      "Frosted-glass panel using backdrop blur, translucent fill and a subtle border highlight.",
    tags: ["ui", "glass", "design"],
    complexity: "easy",
    code: `.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
`,
  },
  {
    id: "css-center-truly",
    category: "css",
    language: "css",
    title: "Truly center any element",
    description:
      "Grid and flexbox one-liners that center both axes, plus the absolute-positioning fallback.",
    tags: ["layout", "centering"],
    complexity: "easy",
    code: `.center-grid {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.center-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`,
  },
  {
    id: "css-text-clamp",
    category: "css",
    language: "css",
    title: "Line clamp + fluid type",
    description:
      "Clamp text to N lines with an ellipsis, and scale type smoothly with clamp().",
    tags: ["typography", "clamp", "text"],
    complexity: "easy",
    code: `.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fluid-heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.1;
  text-wrap: balance;
}
`,
  },
  {
    id: "node-express-route",
    category: "node",
    language: "javascript",
    title: "Express async route wrapper",
    description:
      "Wraps async handlers so rejected promises flow to a centralized error middleware instead of crashing the server.",
    tags: ["express", "async", "error-handling"],
    complexity: "medium",
    code: `const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  })
);

// Centralized handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: "Server error" });
});
`,
  },
  {
    id: "node-rate-limit",
    category: "node",
    language: "javascript",
    title: "Per-route rate limiter",
    description:
      "Sensible express-rate-limit setup for auth endpoints with a standard limit and keyed on the client IP.",
    tags: ["express", "security", "rate-limit"],
    complexity: "medium",
    code: `const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts, try again later." },
});

router.post("/login", authLimiter, loginHandler);
router.post("/register", authLimiter, registerHandler);
`,
  },
  {
    id: "sql-join-aggregate",
    category: "sql",
    language: "sql",
    title: "Join + GROUP BY aggregate",
    description:
      "Counts orders per customer with a LEFT JOIN so customers without orders still appear.",
    tags: ["join", "group-by", "aggregation"],
    complexity: "medium",
    code: `SELECT
  c.name,
  COUNT(o.id) AS order_count,
  COALESCE(SUM(o.total), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY total_spent DESC;
`,
  },
  {
    id: "sql-window-rank",
    category: "sql",
    language: "sql",
    title: "ROW_NUMBER to dedupe rows",
    description:
      "Keeps the latest row per user using a window function and a qualifying subquery.",
    tags: ["window", "dedupe", "rank"],
    complexity: "advanced",
    code: `WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY created_at DESC
    ) AS rn
  FROM sessions
)
SELECT id, user_id, created_at
FROM ranked
WHERE rn = 1;
`,
  },
  {
    id: "sql-index-tip",
    category: "sql",
    language: "sql",
    title: "Index for slow WHERE clauses",
    description:
      "Composite index that matches the WHERE + ORDER BY to avoid filesorts on large tables.",
    tags: ["index", "performance"],
    complexity: "medium",
    code: `-- Slow query
SELECT * FROM questions
WHERE session_id = 42
ORDER BY created_at DESC;

-- Matching composite index
CREATE INDEX idx_questions_session_created
ON questions (session_id, created_at DESC);
`,
  },
  {
    id: "git-interactive-rebase",
    category: "git",
    language: "bash",
    title: "Squash commits in an interactive rebase",
    description:
      "Squashes the last N commits into one with a clean message, then force-pushes to the feature branch.",
    tags: ["rebase", "squash", "history"],
    complexity: "easy",
    code: `# Squash the last 3 commits into one
git rebase -i HEAD~3

# In the editor: change "pick" to "squash" for all but the first line
# Save & close. Rewrite the combined message.

# Update your remote feature branch
git push --force-with-lease origin feature-branch
`,
  },
  {
    id: "git-undo-commit",
    category: "git",
    language: "bash",
    title: "Undo the last commit (keep changes)",
    description:
      "Moves the last commit back to the staging area so you can re-commit with a corrected message.",
    tags: ["undo", "reset"],
    complexity: "easy",
    code: `# Keep the changes, remove the commit
git reset --soft HEAD~1

# Unstage entirely but keep files
git reset HEAD~1

# Nuke both commit and changes (dangerous)
git reset --hard HEAD~1
`,
  },
  {
    id: "git-worktree",
    category: "git",
    language: "bash",
    title: "Work on two branches at once",
    description:
      "Adds a parallel working tree so you can switch contexts without stashing or re-cloning.",
    tags: ["worktree", "productivity"],
    complexity: "advanced",
    code: `# Add a worktree for a feature branch
git worktree add ../preppilot-feature feature/x

# Change dir and work there without touching main
cd ../preppilot-feature
git status

# List and clean up later
git worktree list
git worktree remove ../preppilot-feature
`,
  },
];

export default interviewSnippets;
