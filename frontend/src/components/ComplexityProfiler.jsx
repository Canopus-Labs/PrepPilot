import React from "react";

const ComplexityProfiler = ({ analysis, supported = true }) => {
  if (!supported) {
    return (
      <section className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4" aria-label="Complexity analysis">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-violet-300">Complexity Analysis</h3>
          <span className="rounded-full bg-gray-700 px-3 py-1 text-xs text-gray-300">JavaScript / TypeScript only</span>
        </div>
        <p className="mt-2 text-sm text-gray-300">
          AST analysis is currently available for JavaScript and TypeScript. Run or edit Java, Python, or C++ code normally.
        </p>
      </section>
    );
  }

  const isError = analysis?.status === "error";
  const isEmpty = analysis?.status === "empty";

  return (
    <section className="mt-4 rounded-xl border border-violet-400/20 bg-violet-500/5 p-4" aria-label="Complexity analysis">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-violet-300">Complexity Analysis</h3>
        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
          AST heuristic
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-black/20 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-400">Time Complexity</p>
          <p className="mt-1 text-2xl font-bold text-white">{analysis?.timeComplexity || "—"}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-400">Space Complexity</p>
          <p className="mt-1 text-2xl font-bold text-white">{analysis?.spaceComplexity || "—"}</p>
        </div>
      </div>

      {analysis?.metrics && !isError && !isEmpty && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-300">
          <span className="rounded-full bg-white/10 px-3 py-1">Loops: {analysis.metrics.loopCount}</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Max nesting: {analysis.metrics.maxLoopDepth}</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Recursive calls: {analysis.metrics.recursiveCalls}</span>
        </div>
      )}

      <p className="mt-3 text-sm text-gray-300">{analysis?.explanation}</p>

      {analysis?.warnings?.length > 0 && (
        <ul className="mt-3 space-y-2" aria-label="Complexity warnings">
          {analysis.warnings.map((warning, index) => (
            <li key={`${warning}-${index}`} className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
              {warning}
            </li>
          ))}
        </ul>
      )}

      {isError && (
        <p className="mt-3 text-xs text-gray-400">Fix the syntax error above and the profiler will analyze the code automatically.</p>
      )}
    </section>
  );
};

export default ComplexityProfiler;
