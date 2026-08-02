import React, { useState } from "react";
import { Search, CalendarDays, Building2 } from "lucide-react";

const SearchBar = () => {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Search Interview Sessions
      </h2>

      <div className="grid md:grid-cols-3 gap-5">

        {/* Role */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by role..."
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

        </div>

        {/* Company */}

        <div className="relative">

          <Building2
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search company..."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

        </div>

        {/* Date */}

        <div className="relative">

          <CalendarDays
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

        </div>

      </div>

      <button
        className="mt-6 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-all"
      >
        Search Sessions
      </button>

    </div>
  );
};

export default SearchBar;