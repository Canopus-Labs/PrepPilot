import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  BarChart3,
  Target,
  BookOpen,
  Code2,
  ClipboardCheck,
  Mic2,
  CheckCircle2,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

const activities = [
  {
    name: "Revision Sessions",
    icon: BookOpen,
    sessions: 12,
    improvement: 14,
    correlation: 78,
    impact: "High",
  },
  {
    name: "Practice Questions",
    icon: Code2,
    sessions: 38,
    improvement: 24,
    correlation: 91,
    impact: "Very High",
  },
  {
    name: "Assessments",
    icon: ClipboardCheck,
    sessions: 6,
    improvement: 11,
    correlation: 69,
    impact: "Medium",
  },
  {
    name: "Mock Interviews",
    icon: Mic2,
    sessions: 5,
    improvement: 19,
    correlation: 84,
    impact: "High",
  },
];

const skillData = [
  {
    skill: "DSA",
    before: 61,
    after: 82,
    improvement: 21,
    activity: "Practice Questions",
  },
  {
    skill: "System Design",
    before: 54,
    after: 69,
    improvement: 15,
    activity: "Mock Interviews",
  },
  {
    skill: "Communication",
    before: 66,
    after: 84,
    improvement: 18,
    activity: "Mock Interviews",
  },
  {
    skill: "SQL",
    before: 68,
    after: 78,
    improvement: 10,
    activity: "Revision Sessions",
  },
];

const timeline = [
  {
    date: "Aug 01",
    activity: "Revision",
    result: "+4% DSA",
  },
  {
    date: "Aug 04",
    activity: "Practice",
    result: "+7% DSA",
  },
  {
    date: "Aug 07",
    activity: "Assessment",
    result: "+3% DSA",
  },
  {
    date: "Aug 10",
    activity: "Mock Interview",
    result: "+8% Communication",
  },
  {
    date: "Aug 13",
    activity: "Practice",
    result: "+6% DSA",
  },
];

export default function AIInterviewPreparationPreparationToPerformanceCorrelation() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [period, setPeriod] = useState("30 Days");

  const averageImprovement =
    Math.round(
      activities.reduce(
        (sum, activity) => sum + activity.improvement,
        0
      ) / activities.length
    );

  const strongestActivity = activities.reduce((best, current) =>
    current.correlation > best.correlation ? current : best
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Preparation-to-Performance Correlation
          </h1>

          <p className="text-gray-500">
            Discover which preparation activities are most strongly associated
            with your performance improvement.
          </p>

        </div>

      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-indigo-600" />

            <div>

              <h2 className="font-bold">
                Performance Analysis Period
              </h2>

              <p className="text-sm text-gray-500">
                Compare activities with subsequent performance changes.
              </p>

            </div>

          </div>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded-xl px-4 py-3 font-semibold"
          >
            <option>7 Days</option>
            <option>14 Days</option>
            <option>30 Days</option>
            <option>90 Days</option>
          </select>

        </div>

      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-indigo-50 rounded-2xl p-5">

          <TrendingUp className="text-indigo-600" />

          <p className="text-sm text-gray-500 mt-3">
            Average Skill Improvement
          </p>

          <p className="text-3xl font-black text-indigo-600">
            +{averageImprovement}%
          </p>

        </div>

        <div className="bg-green-50 rounded-2xl p-5">

          <Target className="text-green-600" />

          <p className="text-sm text-gray-500 mt-3">
            Strongest Activity
          </p>

          <p className="text-xl font-black text-green-600 mt-1">
            Practice
          </p>

        </div>

        <div className="bg-purple-50 rounded-2xl p-5">

          <BarChart3 className="text-purple-600" />

          <p className="text-sm text-gray-500 mt-3">
            Strongest Correlation
          </p>

          <p className="text-3xl font-black text-purple-600">
            {strongestActivity.correlation}%
          </p>

        </div>

        <div className="bg-orange-50 rounded-2xl p-5">

          <ClipboardCheck className="text-orange-600" />

          <p className="text-sm text-gray-500 mt-3">
            Activities Analyzed
          </p>

          <p className="text-3xl font-black text-orange-600">
            61
          </p>

        </div>

      </div>

      {/* Main Correlation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Activity → Performance Correlation
            </h2>

            <p className="text-sm text-gray-500">
              Higher correlation means stronger association with subsequent
              performance improvement.
            </p>

          </div>

        </div>

        <div className="space-y-6 mt-6">

          {activities.map((activity) => {

            const Icon = activity.icon;
            const selected = selectedActivity === activity.name;

            return (
              <button
                type="button"
                key={activity.name}
                onClick={() =>
                  setSelectedActivity(
                    selected ? null : activity.name
                  )
                }
                className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="p-3 bg-indigo-50 rounded-xl">

                    <Icon
                      className="text-indigo-600"
                      size={23}
                    />

                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap justify-between gap-3">

                      <h3 className="font-bold">
                        {activity.name}
                      </h3>

                      <div className="flex gap-3">

                        <span className="text-green-600 font-bold">
                          +{activity.improvement}%
                        </span>

                        <span className="text-indigo-600 font-bold">
                          {activity.correlation}% correlation
                        </span>

                      </div>

                    </div>

                    <div className="h-4 bg-gray-200 rounded-full mt-4">

                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{
                          width: `${activity.correlation}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

                {selected && (
                  <div className="grid md:grid-cols-3 gap-4 mt-5">

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        Sessions
                      </p>

                      <p className="text-2xl font-black mt-1">
                        {activity.sessions}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        Skill Improvement
                      </p>

                      <p className="text-2xl font-black text-green-600 mt-1">
                        +{activity.improvement}%
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        Impact
                      </p>

                      <p className="text-2xl font-black text-indigo-600 mt-1">
                        {activity.impact}
                      </p>

                    </div>

                  </div>
                )}

              </button>
            );
          })}

        </div>

      </div>

      {/* Skill Improvement */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Skill Improvement Analysis
            </h2>

            <p className="text-sm text-gray-500">
              See which activities are associated with improvement in specific
              skills.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-6">

          {skillData.map((item) => (

            <div
              key={item.skill}
              className="border rounded-xl p-5"
            >

              <div className="flex flex-wrap justify-between gap-3">

                <div>

                  <h3 className="font-bold">
                    {item.skill}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Strongest associated activity:{" "}
                    <strong>{item.activity}</strong>
                  </p>

                </div>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  +{item.improvement}%
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">

                <div>

                  <div className="flex justify-between text-xs">

                    <span className="text-gray-500">
                      Before
                    </span>

                    <strong>
                      {item.before}%
                    </strong>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-2">

                    <div
                      className="h-full bg-gray-400 rounded-full"
                      style={{
                        width: `${item.before}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between text-xs">

                    <span className="text-gray-500">
                      After
                    </span>

                    <strong className="text-green-600">
                      {item.after}%
                    </strong>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-2">

                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${item.after}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CalendarDaysIcon />

          <div>

            <h2 className="font-bold text-lg">
              Preparation-to-Performance Timeline
            </h2>

            <p className="text-sm text-gray-500">
              Recent activities and the performance changes observed afterward.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {timeline.map((item, index) => (

            <div
              key={`${item.date}-${item.activity}`}
              className="flex gap-4"
            >

              <div className="flex flex-col items-center">

                <div className="w-3 h-3 rounded-full bg-indigo-600" />

                {index !== timeline.length - 1 && (
                  <div className="w-px flex-1 bg-gray-200 mt-2" />
                )}

              </div>

              <div className="border rounded-xl p-4 flex-1">

                <div className="flex justify-between gap-3">

                  <div>

                    <p className="text-xs text-gray-500">
                      {item.date}
                    </p>

                    <p className="font-bold mt-1">
                      {item.activity}
                    </p>

                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold h-fit">
                    {item.result}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* AI Insights */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              AI-Generated Insights
            </h2>

            <div className="space-y-3 mt-4">

              <p className="text-gray-600">
                <strong>1.</strong> Practice questions show the strongest
                relationship with DSA improvement.
              </p>

              <p className="text-gray-600">
                <strong>2.</strong> Mock interviews are strongly associated
                with communication and system-design improvements.
              </p>

              <p className="text-gray-600">
                <strong>3.</strong> Revision produces smaller but consistent
                improvements, making it useful for maintenance.
              </p>

              <p className="text-gray-600">
                <strong>4.</strong> Assessments are most useful for identifying
                weaknesses rather than directly producing large improvements.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Important Note */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target
            className="text-orange-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-orange-700">
              Correlation vs Causation
            </h2>

            <p className="text-gray-600 mt-2">
              These insights represent associations between activities and
              later performance changes. A strong correlation does not
              automatically prove that an activity alone caused the
              improvement. AI should consider timing, frequency, previous
              performance, and other preparation activities.
            </p>

          </div>

        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Lightbulb
            className="text-green-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-green-700">
              Recommended Preparation Strategy
            </h2>

            <p className="text-gray-600 mt-2">
              Increase practice-question frequency for DSA, continue mock
              interviews for communication, and use revision sessions as
              maintenance between intensive practice blocks.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
            >
              Apply AI Recommendations
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

function CalendarDaysIcon() {
  return (
    <div className="p-2 bg-indigo-50 rounded-xl">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-indigo-600"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </div>
  );
}