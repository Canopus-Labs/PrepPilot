import React from "react";
import PlannerCard from "../../components/RevisionPlanner/PlannerCard";
import TaskCard from "../../components/RevisionPlanner/TaskCard";
import WeakTopics from "../../components/RevisionPlanner/WeakTopics";
import RevisionCalendar from "../../components/RevisionPlanner/RevisionCalendar";
import ProgressCard from "../../components/RevisionPlanner/ProgressCard";

const planner = {
  totalTasks: 8,
  completed: 5,
  streak: 12,
};

const tasks = [
  {
    title: "React Flashcards",
    completed: true,
  },
  {
    title: "DSA Revision",
    completed: true,
  },
  {
    title: "Operating Systems",
    completed: false,
  },
  {
    title: "Resume Review",
    completed: false,
  },
];

const weakTopics = [
  "Operating Systems",
  "DBMS",
  "Graphs",
  "Dynamic Programming",
];

const week = [
  { day: "Mon", done: true },
  { day: "Tue", done: true },
  { day: "Wed", done: true },
  { day: "Thu", done: false },
  { day: "Fri", done: false },
  { day: "Sat", done: false },
  { day: "Sun", done: false },
];

const RevisionPlanner = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          📅 Smart Revision Planner
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Organize your daily revision schedule and improve consistency.
        </p>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          <div className="lg:col-span-2">

            <PlannerCard planner={planner} />

          </div>

          <ProgressCard planner={planner} />

        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <TaskCard tasks={tasks} />

          <WeakTopics topics={weakTopics} />

        </div>

        <div className="mt-8">

          <RevisionCalendar week={week} />

        </div>

      </div>

    </div>
  );
};

export default RevisionPlanner;