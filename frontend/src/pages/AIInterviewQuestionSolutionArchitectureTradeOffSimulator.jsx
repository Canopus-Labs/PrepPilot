import React, { useState } from "react";
import {
  Brain,
  Server,
  Zap,
  ShieldCheck,
  DollarSign,
  Layers,
  Settings,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const architectureOptions = {
  database: [
    {
      name: "SQL Database",
      performance: 78,
      scalability: 72,
      reliability: 88,
      complexity: 64,
      cost: 70,
      maintainability: 86,
    },
    {
      name: "NoSQL Database",
      performance: 88,
      scalability: 92,
      reliability: 80,
      complexity: 72,
      cost: 78,
      maintainability: 74,
    },
  ],
  caching: [
    {
      name: "No Cache",
      performance: 60,
      scalability: 64,
      reliability: 88,
      complexity: 92,
      cost: 92,
      maintainability: 90,
    },
    {
      name: "Redis Cache",
      performance: 94,
      scalability: 88,
      reliability: 82,
      complexity: 70,
      cost: 68,
      maintainability: 76,
    },
  ],
};

const dimensions = [
  {
    key: "performance",
    label: "Performance",
    icon: Zap,
  },
  {
    key: "scalability",
    label: "Scalability",
    icon: Layers,
  },
  {
    key: "reliability",
    label: "Reliability",
    icon: ShieldCheck,
  },
  {
    key: "complexity",
    label: "Simplicity",
    icon: Settings,
  },
  {
    key: "cost",
    label: "Cost Efficiency",
    icon: DollarSign,
  },
  {
    key: "maintainability",
    label: "Maintainability",
    icon: Server,
  },
];

const workflow = [
  "Choose Architecture",
  "Modify Component",
  "Simulate Impact",
  "Compare Trade-Offs",
  "Review Decision",
];

export default function AIInterviewQuestionSolutionArchitectureTradeOffSimulator() {
  const [database, setDatabase] = useState(0);
  const [caching, setCaching] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [simulated, setSimulated] = useState(false);

  const db = architectureOptions.database[database];
  const cache = architectureOptions.caching[caching];

  const combined = dimensions.map((dimension) => ({
    ...dimension,
    score: Math.round(
      (db[dimension.key] + cache[dimension.key]) / 2
    ),
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Architecture Trade-Off Simulator
          </h1>

          <p className="text-gray-500">
            Change architectural decisions and observe their potential impact
            across key system-design dimensions.
          </p>
        </div>

      </div>

      {/* Main Result */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Server className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              CURRENT ARCHITECTURE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {db.name} + {cache.name}
            </h2>

            <p className="text-gray-600 mt-2">
              Modify a component below to simulate how the architecture's
              trade-offs change.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-6 gap-4">

          {combined.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.key}
                className="bg-gray-50 rounded-xl p-4"
              >

                <Icon
                  className="text-indigo-600"
                  size={21}
                />

                <p className="text-xs text-gray-500 mt-3">
                  {item.label}
                </p>

                <p className="text-2xl font-black text-indigo-600">
                  {item.score}
                </p>

              </div>
            );
          })}

        </div>

      </div>

      {/* Architecture Controls */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Settings className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Modify Architecture
            </h2>

            <p className="text-sm text-gray-500">
              Change architectural choices and simulate their consequences.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">

          {/* Database */}
          <div className="border rounded-2xl p-5">

            <p className="text-xs font-bold text-gray-500">
              DATABASE
            </p>

            <h3 className="font-bold text-lg mt-1">
              Choose Database Strategy
            </h3>

            <div className="space-y-3 mt-4">

              {architectureOptions.database.map((option, index) => (

                <button
                  type="button"
                  key={option.name}
                  onClick={() => {
                    setDatabase(index);
                    setSimulated(true);
                  }}
                  className={`w-full text-left p-4 rounded-xl border ${
                    database === index
                      ? "border-indigo-500 bg-indigo-50"
                      : ""
                  }`}
                >

                  <div className="flex justify-between">

                    <span className="font-bold">
                      {option.name}
                    </span>

                    {database === index && (
                      <CheckCircle2
                        className="text-indigo-600"
                        size={20}
                      />
                    )}

                  </div>

                </button>

              ))}

            </div>

          </div>

          {/* Cache */}
          <div className="border rounded-2xl p-5">

            <p className="text-xs font-bold text-gray-500">
              CACHING
            </p>

            <h3 className="font-bold text-lg mt-1">
              Choose Caching Strategy
            </h3>

            <div className="space-y-3 mt-4">

              {architectureOptions.caching.map((option, index) => (

                <button
                  type="button"
                  key={option.name}
                  onClick={() => {
                    setCaching(index);
                    setSimulated(true);
                  }}
                  className={`w-full text-left p-4 rounded-xl border ${
                    caching === index
                      ? "border-indigo-500 bg-indigo-50"
                      : ""
                  }`}
                >

                  <div className="flex justify-between">

                    <span className="font-bold">
                      {option.name}
                    </span>

                    {caching === index && (
                      <CheckCircle2
                        className="text-indigo-600"
                        size={20}
                      />
                    )}

                  </div>

                </button>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Simulation Result */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Zap className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Simulation Result
              </h2>

              <p className="text-sm text-gray-500">
                Estimated impact of the current architectural choices.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showComparison ? "Hide Details" : "Show Details"}
          </button>

        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 mt-5">

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-white rounded-xl p-5">

              <p className="text-xs text-gray-500">
                PERFORMANCE
              </p>

              <p className="text-3xl font-black text-indigo-600 mt-1">
                {combined[0].score}/100
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Strong throughput potential.
              </p>

            </div>

            <div className="bg-white rounded-xl p-5">

              <p className="text-xs text-gray-500">
                SCALABILITY
              </p>

              <p className="text-3xl font-black text-indigo-600 mt-1">
                {combined[1].score}/100
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Suitable for increasing traffic.
              </p>

            </div>

            <div className="bg-white rounded-xl p-5">

              <p className="text-xs text-gray-500">
                COMPLEXITY
              </p>

              <p className="text-3xl font-black text-indigo-600 mt-1">
                {combined[3].score}/100
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Additional components increase operational complexity.
              </p>

            </div>

          </div>

        </div>

        {showComparison && (
          <div className="space-y-4 mt-6">

            {combined.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.key}
                  className="border rounded-xl p-5"
                >

                  <div className="flex items-center gap-3">

                    <Icon
                      className="text-indigo-600"
                      size={22}
                    />

                    <div className="flex-1">

                      <div className="flex justify-between">

                        <span className="font-bold">
                          {item.label}
                        </span>

                        <span className="font-black text-indigo-600">
                          {item.score}/100
                        </span>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full mt-3">

                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* Trade-Off Analysis */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI TRADE-OFF ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Higher performance can introduce additional complexity.
            </h2>

            <p className="text-gray-600 mt-2">
              Adding Redis improves response speed and reduces database load,
              but introduces another infrastructure component that must be
              monitored, maintained, and kept consistent with the database.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  BENEFIT
                </p>

                <p className="font-bold text-green-700 mt-1">
                  Faster Reads
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  TRADE-OFF
                </p>

                <p className="font-bold text-orange-700 mt-1">
                  More Complexity
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  NEW CONCERN
                </p>

                <p className="font-bold text-red-700 mt-1">
                  Cache Consistency
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Decision Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitCompare className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Architecture Decision Comparison
            </h2>

            <p className="text-sm text-gray-500">
              Compare the current configuration with simpler alternatives.
            </p>
          </div>

        </div>

        <div className="overflow-x-auto mt-6">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b">

                <th className="p-3">
                  Dimension
                </th>

                <th className="p-3">
                  Current
                </th>

                <th className="p-3">
                  Alternative
                </th>

              </tr>

            </thead>

            <tbody>

              {[
                ["Performance", "High", "Medium"],
                ["Scalability", "High", "Medium"],
                ["Reliability", "Medium-High", "High"],
                ["Complexity", "Medium", "Low"],
                ["Cost", "Medium", "Low"],
                ["Maintainability", "Medium", "High"],
              ].map(([dimension, current, alternative]) => (

                <tr
                  key={dimension}
                  className="border-b"
                >

                  <td className="p-3 font-semibold">
                    {dimension}
                  </td>

                  <td className="p-3 text-indigo-600 font-bold">
                    {current}
                  </td>

                  <td className="p-3 text-gray-600">
                    {alternative}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Simulation Action */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Run Architecture Simulation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate all trade-offs after changing architectural choices.
            </p>

            <button
              type="button"
              onClick={() => setSimulated(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Simulate Changes
              <ArrowRight size={18} />
            </button>

            {simulated && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Architecture trade-off simulation completed.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Simulation Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates architectural changes.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow ? "Hide Workflow" : "Show Workflow"}
          </button>

        </div>

        {showWorkflow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {workflow.map((item, index) => (

              <React.Fragment key={item}>

                <div className="border rounded-xl p-4 min-w-[150px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <p className="font-bold mt-1">
                    {item}
                  </p>

                </div>

                {index < workflow.length - 1 && (
                  <ArrowRight
                    className="text-gray-400"
                    size={18}
                  />
                )}

              </React.Fragment>
            ))}

          </div>
        )}

      </div>

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI SYSTEM DESIGN PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Every architectural improvement introduces a trade-off.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong system-design reasoning is not about selecting the
              "perfect" component. It is about understanding what you gain,
              what you sacrifice, and why the decision fits the requirements.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}