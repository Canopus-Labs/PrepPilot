import React, { useEffect, useState, useContext } from "react";
import { Briefcase, MapPin, DollarSign, ExternalLink, RefreshCw } from "lucide-react";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const COUNTRY_OPTIONS = [
  { code: "in", label: "India" },
  { code: "us", label: "United States" },
  { code: "gb", label: "United Kingdom" },
  { code: "au", label: "Australia" },
  { code: "ca", label: "Canada" },
];

const JobCard = ({ job }) => (
  <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-violet-300 dark:hover:border-violet-500/50 transition-all shadow-sm">
    <div>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2">{job.title}</h3>
          <p className="text-sm text-violet-600 dark:text-violet-400 font-semibold mt-1">{job.company}</p>
        </div>
        <span className="shrink-0 text-xs bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 px-2 py-1 rounded-lg font-medium">
          New
        </span>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {job.location}
        </span>
        {(job.salary_min || job.salary_max) && (
          <span className="flex items-center gap-1">
            <DollarSign size={12} />
            {job.salary_min && job.salary_max
              ? `${Math.round(job.salary_min / 1000)}k – ${Math.round(job.salary_max / 1000)}k`
              : job.salary_min
              ? `From ${Math.round(job.salary_min / 1000)}k`
              : `Up to ${Math.round(job.salary_max / 1000)}k`}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
        {job.description}
      </p>
    </div>

    <a
      href={job.redirect_url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white transition-colors shadow-sm shadow-violet-500/30"
    >
      Apply Now <ExternalLink size={14} />
    </a>
  </div>
);

const JobsForYou = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs]       = useState([]);
  const [role, setRole]       = useState("");
  const [country, setCountry] = useState("in");
  const [loading, setLoading] = useState(true);
  const [customRole, setCustomRole] = useState("");

  const fetchJobs = async (selectedCountry, overrideRole = "") => {
    setLoading(true);
    try {
      const params = { country: selectedCountry };
      if (overrideRole) params.role = overrideRole;
      const res = await axiosInstance.get(API_PATHS.JOBS.GET, { params });
      setJobs(res.data.jobs || []);
      setRole(res.data.role || "");
    } catch (err) {
      toast.error("Failed to load job listings. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(country);
  }, []);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    fetchJobs(e.target.value, customRole);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(country, customRole);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-white pb-20 transition-colors duration-300">
      <div className="bg-white dark:bg-white/5 border-b border-gray-200 dark:border-white/10 pt-8 pb-10 px-6 md:px-12 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2 flex items-center gap-3">
              <Briefcase className="text-violet-500" size={36} />
              Jobs for You
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Real job listings matched to{" "}
              {role ? (
                <span className="font-semibold text-violet-600 dark:text-violet-400">
                  {role}
                </span>
              ) : (
                "your target role"
              )}{" "}
              — sourced from Adzuna and refreshed daily.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="Override role…"
                className="px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 w-40"
              />
              <select
                value={country}
                onChange={handleCountryChange}
                className="px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <button
                type="submit"
                className="p-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 transition-all"
                title="Refresh"
              >
                <RefreshCw size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
          </div>
        ) : jobs.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{jobs.length}</span> listings for{" "}
              <span className="font-semibold text-violet-600 dark:text-violet-400">{role}</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={28} />
            </div>
            <h3 className="font-bold text-lg mb-2">No listings found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
              No jobs matched your current role. Try a different role or country, or start a new interview session to set your target role.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsForYou;
