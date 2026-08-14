import React, { useState } from "react";
import {
  Brain,
  CalendarDays,
  Target,
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BarChart3,
  RotateCw,
} from "lucide-react";

const initialTopics = [
  {
    name: "Data Structures",
    importance: "Critical",
    mastery: 82,
    daysSincePractice: 2,
    recentMistakes: 1,
    sessions: 4,
  },
  {
    name: "Algorithms",
    importance: "Critical",
    mastery: 74,
    daysSincePractice: 4,
    recentMistakes: 3,
    sessions: 5,
  },
  {
    name: "System Design",
    importance: "High",
    mastery: 61,
    daysSincePractice: 7,
    recentMistakes: 4,
    sessions: 2,
  },
  {
    name: "SQL & Databases",
    importance: "High",
    mastery: 78,
    daysSincePractice: 5,
    recentMistakes: 2,
    sessions: 3,
  },
  {
    name: "Behavioral",
    importance: "Medium",
    mastery: 68,
    daysSincePractice: 9,
    recentMistakes: 2,
    sessions: 1,
  },
  {
    name: "Operating Systems",
    importance: "Medium",
    mastery: 86,
    daysSincePractice: 3,
    recentMistakes: 0,
    sessions: 4,
  },
];

const rotation = [
  {
    day: "Today",
    topic: "System Design",
    reason: "Low mastery + long revision gap",
    type: "Priority",
  },
  {
    day: "Tomorrow",
    topic: "Algorithms",
    reason: "Recent mistakes + high role importance",
    type: "Priority",
  },
  {
    day: "Day 3",
    topic: "Behavioral",
    reason: "Longest time since practice",
    type: "Refresh",
  },
  {
    day: "Day 4",
    topic: "SQL & Databases",
    reason: "Moderate revision gap",
    type: "Practice",
  },
  {
    day: "Day 5",
    topic: "Data Structures",
    reason: "Maintain current mastery",
    type: "Maintain",
  },
  {
    day: "Day 6",
    topic: "Operating Systems",
    reason: "High mastery; light maintenance",
    type: "Light",
  },
];

export default function AIInterviewPreparationTopicRotationScheduler() {
  const [topics, setTopics] = useState(initialTopics);
  const [schedule, setSchedule] = useState(rotation);
  const [generated, setGenerated] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const getPriorityScore = (topic) => {
    const importanceScore = {
      Critical: 40,
      High: 30,
      Medium: 20,
    }[topic.importance];

    const masteryScore = 100 - topic.mastery;
    const revisionScore = Math.min(topic.daysSincePractice * 3, 30);
    const mistakeScore = topic.recentMistakes * 5;

    return (
      importanceScore +
      masteryScore +
      revisionScore +
      mistakeScore
    );
  };

  const generateSchedule = () => {
    const sorted = [...topics]
      .sort(
        (a, b) =>
          getPriorityScore(b) - getPriorityScore(a)
      )
      .map((topic, index) => ({
        day:
          index === 0
            ? "Today"
            : index === 1
            ? "Tomorrow"
            : `Day ${index + 1}`,
        topic: topic.name,
        reason:
          topic.mastery < 65
            ? "Low mastery requires focused revision"
            : topic.recentMistakes >= 3
            ? "Recent mistakes require reinforcement"
            : topic.daysSincePractice >= 7
            ? "Long time since last practice"
            : "Maintain current mastery",
        type:
          topic.mastery < 65
            ? "Priority"
            : topic.daysSincePractice >= 7
            ? "Refresh"
            : "Maintain",
      }));

    setSchedule(sorted);
    setGenerated(true);
  };

  const practiceTopic = (name) => {
    setTopics((current) =>
      current.map((topic) =>
        topic.name === name
          ? {
              ...topic,
              daysSincePractice: 0,
              sessions: topic.sessions + 1,
            }
          : topic
      )
    );

    setSchedule((current) =>
      current.filter((item) => item.topic !== name)
    );
  };

  const totalMastery = Math.round(
    topics.reduce((sum, topic) => sum + topic.mastery, 0) /
      topics.length
  );

  const neglectedTopics = topics.filter(
    (topic) =>
      topic.daysSincePractice >= 7 ||
      topic.mastery < 65
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <RotateCw size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Rotation Scheduler
          </h1>

          <p className="text-gray-500">
            Automatically rotate preparation topics according to importance,
            mastery, mistakes, and revision needs.
          </p>
        </div>

      </div>

      {/* Interview Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CalendarDays className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Preparation Timeline
            </h2>

            <p className="text-sm text-gray-500">
              The scheduler uses the interview date to adjust topic rotation
              intensity.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Interview Date
            </p>

            <p className="text-2xl font-black text-indigo-600 mt-1">
              28 Aug
            </p>

            <p className="text-xs text-gray-500 mt-1">
              14 days remaining
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Average Mastery
            </p>

            <p className="text-2xl font-black text-green-600 mt-1">
              {totalMastery}%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Topics Needing Attention
            </p>

            <p className="text-2xl font-black text-orange-600 mt-1">
              {neglectedTopics.length}
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Topics Tracked
            </p>

            <p className="text-2xl font-black text-purple-600 mt-1">
              {topics.length}
            </p>
          </div>

        </div>

      </div>

      {/* AI Explanation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Sparkles
            className="text-indigo-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI ROTATION LOGIC
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Practice what needs attention—not just what you enjoy.
            </h2>

            <p className="text-gray-600 mt-2">
              The scheduler combines topic importance, current mastery,
              revision gaps, recent mistakes, and interview timing to create a
              balanced preparation rotation.
            </p>

          </div>

        </div>

      </div>

      {/* Topic Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Topic Readiness Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Select a topic to inspect why AI gives it a particular priority.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {topics.map((topic) => {

            const priority = getPriorityScore(topic);

            return (
              <button
                type="button"
                key={topic.name}
                onClick={() => setSelectedTopic(topic)}
                className={`text-left border rounded-xl p-5 transition ${
                  selectedTopic?.name === topic.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {topic.name}
                    </h3>

                    <span className="inline-block mt-2 px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                      {topic.importance}
                    </span>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-black">
                      {topic.mastery}%
                    </p>

                    <p className="text-xs text-gray-500">
                      mastery
                    </p>

                  </div>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className={`h-full rounded-full ${
                      topic.mastery < 65
                        ? "bg-red-500"
                        : topic.mastery < 80
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${topic.mastery}%`,
                    }}
                  />

                </div>

                <div className="flex justify-between mt-4 text-xs text-gray-500">

                  <span>
                    Last practice:{" "}
                    {topic.daysSincePractice} days ago
                  </span>

                  <span>
                    Priority: {priority}
                  </span>

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Selected Topic */}
      {selectedTopic && (
        <div className="bg-orange-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <Target
              className="text-orange-600"
              size={28}
            />

            <div>

              <p className="text-xs font-bold text-orange-600">
                TOPIC PRIORITY ANALYSIS
              </p>

              <h2 className="text-2xl font-black text-orange-800 mt-1">
                {selectedTopic.name}
              </h2>

              <div className="grid md:grid-cols-4 gap-3 mt-4">

                <div className="bg-white rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Importance
                  </p>
                  <p className="font-bold mt-1">
                    {selectedTopic.importance}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Mastery
                  </p>
                  <p className="font-bold mt-1">
                    {selectedTopic.mastery}%
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Revision Gap
                  </p>
                  <p className="font-bold mt-1">
                    {selectedTopic.daysSincePractice} days
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Recent Mistakes
                  </p>
                  <p className="font-bold mt-1">
                    {selectedTopic.recentMistakes}
                  </p>
                </div>

              </div>

              <p className="text-gray-600 mt-4">
                AI uses these signals to determine how soon this topic should
                appear again in your preparation rotation.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Generate Schedule */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Balanced Rotation Schedule
              </h2>

              <p className="text-sm text-gray-500">
                Generate a personalized topic sequence for the next preparation
                sessions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={generateSchedule}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Generate Schedule
          </button>

        </div>

        <div className="space-y-4 mt-6">

          {schedule.map((item, index) => (

            <div
              key={`${item.day}-${item.topic}`}
              className="flex items-center gap-4 border rounded-xl p-5"
            >

              <div className="w-20 text-center">

                <p className="text-xs text-gray-500">
                  SESSION
                </p>

                <p className="font-black text-indigo-600 mt-1">
                  {index + 1}
                </p>

              </div>

              <div className="flex-1">

                <div className="flex items-center gap-3">

                  <h3 className="font-bold">
                    {item.topic}
                  </h3>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.type === "Priority"
                        ? "bg-red-100 text-red-700"
                        : item.type === "Refresh"
                        ? "bg-orange-100 text-orange-700"
                        : item.type === "Maintain"
                        ? "bg-green-100 text-green-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {item.type}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {item.reason}
                </p>

              </div>

              <div className="text-right">

                <p className="text-sm font-bold">
                  {item.day}
                </p>

                <button
                  type="button"
                  onClick={() => practiceTopic(item.topic)}
                  className="mt-2 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
                >
                  Practice
                </button>

              </div>

            </div>

          ))}

        </div>

        {generated && (
          <div className="mt-5 bg-green-50 rounded-xl p-4">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={22}
              />

              <p className="text-sm text-green-700">
                Schedule regenerated using your latest mastery, mistakes,
                practice gaps, and topic importance.
              </p>

            </div>

          </div>
        )}

      </div>

      {/* Rotation Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Rotation Factors
            </h2>

            <p className="text-sm text-gray-500">
              AI balances multiple signals instead of using a simple
              alphabetical or random topic order.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-5 gap-4 mt-6">

          <div className="border rounded-xl p-5">
            <Target className="text-indigo-600" />
            <h3 className="font-bold mt-3">
              Importance
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Prioritizes topics relevant to the target role.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <BarChart3 className="text-green-600" />
            <h3 className="font-bold mt-3">
              Mastery
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Gives additional practice to weaker topics.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <Clock className="text-orange-600" />
            <h3 className="font-bold mt-3">
              Revision Gap
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Prevents topics from being forgotten.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <AlertTriangle className="text-red-600" />
            <h3 className="font-bold mt-3">
              Mistakes
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Reintroduces topics with recurring errors.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <CalendarDays className="text-purple-600" />
            <h3 className="font-bold mt-3">
              Interview Date
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Adjusts rotation as the interview approaches.
            </p>
          </div>

        </div>

      </div>

      {/* Neglected Topics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-lg">
              Topic Neglect Detection
            </h2>

            <p className="text-sm text-gray-500">
              Topics with long revision gaps or low mastery receive additional
              attention.
            </p>
          </div>

        </div>

        <div className="space-y-3 mt-6">

          {neglectedTopics.map((topic) => (

            <div
              key={topic.name}
              className="flex items-center gap-4 border rounded-xl p-4"
            >

              <AlertTriangle
                className="text-orange-600"
                size={22}
              />

              <div className="flex-1">

                <p className="font-bold">
                  {topic.name}
                </p>

                <p className="text-sm text-gray-500">
                  {topic.daysSincePractice} days since practice ·{" "}
                  {topic.mastery}% mastery ·{" "}
                  {topic.recentMistakes} recent mistakes
                </p>

              </div>

              <button
                type="button"
                onClick={() => practiceTopic(topic.name)}
                className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold"
              >
                Add Practice
              </button>

            </div>

          ))}

          {neglectedTopics.length === 0 && (
            <div className="bg-green-50 rounded-xl p-5 text-green-700 font-semibold">
              No major topic neglect detected.
            </div>
          )}

        </div>

      </div>

      {/* Adaptive Rotation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Sparkles
            className="text-indigo-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ADAPTIVE ROTATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              The schedule changes as your performance changes.
            </h2>

            <p className="text-gray-600 mt-2">
              A topic that improves quickly can rotate less frequently, while a
              topic with repeated mistakes can return sooner. This prevents
              repetitive practice and keeps the preparation plan responsive.
            </p>

          </div>

        </div>

      </div>

      {/* Interview Countdown Strategy */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CalendarDays className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Interview Countdown Strategy
            </h2>

            <p className="text-sm text-gray-500">
              Rotation intensity can change as the interview date approaches.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <Clock className="text-indigo-600" />

            <h3 className="font-bold mt-3">
              2+ Weeks Away
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Focus on balanced topic coverage and fixing foundational gaps.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Target className="text-orange-600" />

            <h3 className="font-bold mt-3">
              1 Week Away
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Increase practice for high-impact weaknesses and important role
              topics.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <CheckCircle2 className="text-green-600" />

            <h3 className="font-bold mt-3">
              Final Days
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Favor revision, recall, mock interviews, and confidence
              maintenance.
            </p>

          </div>

        </div>

      </div>

      {/* Final Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={28}
          />

          <div>

            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Do not choose every practice topic manually. Let the scheduler
              rotate high-impact weak areas, overdue topics, and maintenance
              topics so your preparation stays balanced and adaptive.
            </p>

          </div>

        </div>

      </div>

      {/* Next Challenge */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={28}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              RECOMMENDED NEXT ACTION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Practice System Design
            </h2>

            <p className="text-gray-600 mt-2">
              It currently has lower mastery, a longer practice gap, and
              multiple recent mistakes, making it the highest-impact topic in
              the current rotation.
            </p>

            <button
              type="button"
              onClick={() => practiceTopic("System Design")}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Start Recommended Practice
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}