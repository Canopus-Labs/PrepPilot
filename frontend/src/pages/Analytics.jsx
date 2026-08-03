import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#8B5CF6",
  "#06B6D4",
  "#F59E0B",
  "#10B981",
  "#EF4444",
];

const Analytics = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const totalSessions = sessions.length;

  const totalQuestions = sessions.reduce(
    (sum, s) => sum + (s.questions?.length || 0),
    0
  );

  const averageQuestions =
    totalSessions > 0
      ? (totalQuestions / totalSessions).toFixed(1)
      : 0;

  // Role Distribution
  const roleCount = {};
  sessions.forEach((session) => {
    const role = session.role || "Unknown";
    roleCount[role] = (roleCount[role] || 0) + 1;
  });

  const roleData = Object.keys(roleCount).map((role) => ({
    name: role,
    value: roleCount[role],
  }));

  // Questions Chart
  const questionData = sessions.map((session, index) => ({
    name: `S${index + 1}`,
    questions: session.questions?.length || 0,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 dark:text-white">
          Interview Analytics
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <h2 className="text-gray-500">Total Sessions</h2>
            <p className="text-4xl font-bold mt-2">
              {totalSessions}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <h2 className="text-gray-500">Total Questions</h2>
            <p className="text-4xl font-bold mt-2">
              {totalQuestions}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <h2 className="text-gray-500">Average Questions</h2>
            <p className="text-4xl font-bold mt-2">
              {averageQuestions}
            </p>
          </div>

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Pie Chart */}

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              Role Distribution
            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <PieChart>

                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {roleData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Bar Chart */}

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              Questions Per Session
            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <BarChart data={questionData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="questions"
                  fill="#8B5CF6"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Coming Soon */}

        <div className="mt-10 bg-white dark:bg-slate-800 rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Upcoming AI Analytics
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">
                AI Interview Score
              </h3>
              <p className="text-gray-500">
                Coming Soon
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">
                Strengths & Weaknesses
              </h3>
              <p className="text-gray-500">
                Coming Soon
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">
                AI Recommendations
              </h3>
              <p className="text-gray-500">
                Coming Soon
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">
                Performance Trend
              </h3>
              <p className="text-gray-500">
                Coming Soon
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Analytics;