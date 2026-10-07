import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

/**
 * Colour-codes a bar based on the avgScore value.
 * red < 50, amber 50–69, green ≥ 70
 */
function barColor(score) {
  if (score === null || score === undefined) return "#9ca3af"; // gray
  if (score < 50) return "#ef4444"; // red-500
  if (score < 70) return "#f59e0b"; // amber-500
  return "#22c55e"; // green-500
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { topic, avgScore, confidenceLevel } = payload[0].payload;
  return (
    <div className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="font-bold text-gray-900 dark:text-white mb-1">{topic}</p>
      <p className="text-gray-500">
        Score: <span className="font-semibold text-gray-800 dark:text-gray-200">{avgScore ?? "N/A"}/100</span>
      </p>
      <p className="text-gray-500">
        Confidence:{" "}
        <span
          className={
            confidenceLevel === "Low"
              ? "text-red-500 font-semibold"
              : confidenceLevel === "Medium"
              ? "text-amber-500 font-semibold"
              : "text-green-500 font-semibold"
          }
        >
          {confidenceLevel}
        </span>
      </p>
    </div>
  );
};

/**
 * TopicBarChart
 *
 * Props:
 *   topics — array of { topic, avgScore, confidenceLevel } from the analysis API
 */
const TopicBarChart = ({ topics = [] }) => {
  const chartData = topics
    .filter((t) => t.avgScore !== null && t.avgScore !== undefined)
    .sort((a, b) => a.avgScore - b.avgScore)
    .map((t) => ({ ...t }));

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[280px] text-gray-400 text-sm">
        No topic performance data yet. Complete an adaptive session to populate this chart.
      </div>
    );
  }

  return (
    <div role="img" aria-label="Topic performance bar chart">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.2)" />
          <XAxis
            dataKey="topic"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            angle={-35}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={70}
            stroke="#f59e0b"
            strokeDasharray="4 4"
            label={{ value: "Target", position: "insideTopRight", fill: "#f59e0b", fontSize: 11 }}
          />
          <Bar dataKey="avgScore" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={barColor(entry.avgScore)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicBarChart;
