import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const { score, date } = payload[0].payload;
  const formatted = date
    ? new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : `Session ${label}`;
  return (
    <div className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="font-bold text-gray-900 dark:text-white mb-1">{formatted}</p>
      <p className="text-gray-500">
        Score: <span className="font-semibold text-violet-600">{score}/100</span>
      </p>
    </div>
  );
};

/**
 * TrendLineChart
 *
 * Props:
 *   trendData — array of { sessionIndex, score, date } from analysis API
 */
const TrendLineChart = ({ trendData = [] }) => {
  if (trendData.length < 2) {
    return (
      <div className="flex items-center justify-center h-[220px] text-gray-400 text-sm text-center px-6">
        Complete at least 2 adaptive sessions to see your readiness score trend.
      </div>
    );
  }

  return (
    <div role="img" aria-label="Readiness score trend over sessions">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={trendData} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.2)" />
          <XAxis
            dataKey="sessionIndex"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickFormatter={(v) => `S${v}`}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={70}
            stroke="#f59e0b"
            strokeDasharray="4 4"
            label={{ value: "Target 70", position: "insideTopRight", fill: "#f59e0b", fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#7c3aed"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#7c3aed", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLineChart;
