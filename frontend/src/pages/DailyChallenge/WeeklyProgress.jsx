
const WeeklyProgress = ({ week }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700 p-6">

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Weekly Progress
      </h2>

      <div className="space-y-4">

        {week.map((day) => (
          <div
            key={day.day}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-800"
          >

            <span className="font-medium text-gray-800 dark:text-white">
              {day.day}
            </span>

            {day.done ? (
              <CheckCircle2
                className="text-green-500"
                size={22}
              />
            ) : (
              <Circle
                className="text-gray-400"
                size={22}
              />
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default WeeklyProgress;