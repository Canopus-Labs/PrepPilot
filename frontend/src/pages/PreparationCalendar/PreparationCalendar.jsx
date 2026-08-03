import { useMemo, useState } from "react";



const PreparationCalendar = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);

  const [studyTasks, setStudyTasks] = useState([
    {
      id: 1,
      title: "React Revision",
      completed: true,
    },
    {
      id: 2,
      title: "DSA Practice",
      completed: false,
    },
    {
      id: 3,
      title: "Behavioral Interview",
      completed: false,
    },
    {
      id: 4,
      title: "Resume Improvement",
      completed: true,
    },
    {
      id: 5,
      title: "Mock Interview",
      completed: false,
    },
  ]);

  const upcomingInterviews = [
    {
      company: "Google",
      role: "Frontend Developer",
      date: "15 Aug",
      time: "09:00 AM",
    },
    {
      company: "Microsoft",
      role: "SDE Intern",
      date: "21 Aug",
      time: "11:30 AM",
    },
    {
      company: "Amazon",
      role: "Software Engineer",
      date: "28 Aug",
      time: "04:00 PM",
    },
  ];

  const revisionTopics = [
    {
      topic: "Arrays",
      completed: true,
    },
    {
      topic: "React Hooks",
      completed: true,
    },
    {
      topic: "JavaScript",
      completed: true,
    },
    {
      topic: "Dynamic Programming",
      completed: false,
    },
    {
      topic: "System Design",
      completed: false,
    },
  ];

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const year = currentDate.getFullYear();

  const daysInMonth = useMemo(() => {
    return new Date(year, currentDate.getMonth() + 1, 0).getDate();
  }, [currentDate]);

  const firstDay = useMemo(() => {
    return new Date(year, currentDate.getMonth(), 1).getDay();
  }, [currentDate]);

  const toggleTask = (id) => {
    setStudyTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const completedTasks = studyTasks.filter(
    (task) => task.completed
  ).length;

  const progress = Math.round(
    (completedTasks / studyTasks.length) * 100
  );

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
              <CalendarDays
                size={32}
                className="text-violet-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Personalized Interview Preparation Calendar
              </h1>

              <p className="text-gray-500 mt-1">
                Plan interview preparation, revision sessions,
                and study goals in one place.
              </p>
            </div>

          </div>

          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl font-semibold transition">
            <Download size={18} />
            Export Calendar
          </button>

        </div>
                {/* Calendar + Study Goals */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Calendar */}

          <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <div className="flex justify-between items-center mb-8">

              <button
                onClick={previousMonth}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-violet-900/20 transition"
              >
                ←
              </button>

              <h2 className="text-2xl font-bold">
                {monthName} {year}
              </h2>

              <button
                onClick={nextMonth}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-violet-900/20 transition"
              >
                →
              </button>

            </div>

            {/* Week Names */}

            <div className="grid grid-cols-7 gap-3 mb-4">

              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (

                <div
                  key={day}
                  className="text-center font-bold text-violet-600"
                >
                  {day}
                </div>

              ))}

            </div>

            {/* Calendar Grid */}

            <div className="grid grid-cols-7 gap-3">

              {/* Empty Cells */}

              {Array.from({ length: firstDay }).map((_, index) => (

                <div
                  key={index}
                  className="h-14"
                />

              ))}

              {/* Days */}

              {Array.from({ length: daysInMonth }).map((_, index) => {

                const day = index + 1;

                const isToday =
                  day === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  year === today.getFullYear();

                return (

                  <div
                    key={day}
                    className={`h-14 rounded-xl flex items-center justify-center font-semibold cursor-pointer transition
                    ${
                      isToday
                        ? "bg-violet-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-violet-900/20"
                    }`}
                  >
                    {day}
                  </div>

                );

              })}

            </div>

          </div>

          {/* Daily Study Goals */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <div className="flex items-center gap-3 mb-6">

              <Target
                size={22}
                className="text-violet-600"
              />

              <h2 className="text-xl font-bold">
                Daily Study Goals
              </h2>

            </div>

            <div className="space-y-4">

              {studyTasks.map((task) => (

                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 cursor-pointer"
                >

                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="w-5 h-5"
                  />

                  <span
                    className={
                      task.completed
                        ? "line-through text-gray-400"
                        : ""
                    }
                  >
                    {task.title}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>
                {/* Upcoming Interviews + Revision */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Upcoming Interviews */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <div className="flex items-center gap-3 mb-6">

              <Briefcase
                className="text-blue-600"
                size={22}
              />

              <h2 className="text-2xl font-bold">
                Upcoming Interviews
              </h2>

            </div>

            <div className="space-y-5">

              {upcomingInterviews.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 hover:shadow-lg transition"
                >

                  <h3 className="font-bold text-lg">
                    {item.company}
                  </h3>

                  <p className="text-gray-500">
                    {item.role}
                  </p>

                  <div className="flex justify-between mt-4 text-sm">

                    <span>
                      📅 {item.date}
                    </span>

                    <span>
                      🕒 {item.time}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Revision Schedule */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <div className="flex items-center gap-3 mb-6">

              <BookOpen
                className="text-orange-500"
                size={22}
              />

              <h2 className="text-2xl font-bold">
                Revision Schedule
              </h2>

            </div>

            <div className="space-y-4">

              {revisionTopics.map((topic, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between"
                >

                  <span>
                    {topic.topic}
                  </span>

                  {topic.completed ? (

                    <CheckCircle2
                      className="text-green-500"
                      size={22}
                    />

                  ) : (

                    <Clock
                      className="text-yellow-500"
                      size={22}
                    />

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mt-10">

          <div className="flex items-center gap-3 mb-6">

            <TrendingUp
              className="text-green-600"
              size={22}
            />

            <h2 className="text-2xl font-bold">
              Overall Preparation Progress
            </h2>

          </div>

          <div className="w-full h-6 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="bg-green-500 h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="mt-4 flex justify-between">

            <span>
              Completed Tasks
            </span>

            <span className="font-bold">
              {progress}%
            </span>

          </div>

        </div>
                {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow border border-gray-200 dark:border-white/10">
            <h3 className="text-gray-500 text-sm">Completed Tasks</h3>
            <p className="text-3xl font-bold mt-2">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow border border-gray-200 dark:border-white/10">
            <h3 className="text-gray-500 text-sm">
              Upcoming Interviews
            </h3>
            <p className="text-3xl font-bold mt-2">
              {upcomingInterviews.length}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow border border-gray-200 dark:border-white/10">
            <h3 className="text-gray-500 text-sm">
              Revision Topics
            </h3>
            <p className="text-3xl font-bold mt-2">
              {revisionTopics.length}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow border border-gray-200 dark:border-white/10">
            <h3 className="text-gray-500 text-sm">
              Study Progress
            </h3>
            <p className="text-3xl font-bold mt-2">
              {progress}%
            </p>
          </div>

        </div>

        {/* Export Section */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Export & Sync
          </h2>

          <div className="flex flex-wrap gap-4">

            <button className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition">
              Export PDF
            </button>

            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Export CSV
            </button>

            <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Sync Google Calendar
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PreparationCalendar;