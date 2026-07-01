import React, { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Briefcase,
  Target,
  BookOpen,
  MessageSquare,
  Sparkles,
  Clock,
  Layers,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  IndianRupee,
  ExternalLink,
  Star,
} from "lucide-react";
import { companies } from "./companiesData";

const difficultyStyles = {
  Hard: "bg-red-50 text-red-500 border-red-100",
  "Medium-Hard": "bg-orange-50 text-orange-500 border-orange-100",
  Medium: "bg-yellow-50 text-yellow-600 border-yellow-100",
  "Easy-Medium": "bg-emerald-50 text-emerald-500 border-emerald-100",
};

const CompanyPrep = () => {
  const [companyFilter, setCompanyFilter] = useState("");
  const [role, setRole] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("companyPrepBookmarks")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("companyPrepBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const roles = useMemo(() => {
    const allRoles = companies.flatMap((company) => company.roles);
    return ["All", ...new Set(allRoles)];
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const matchesCompany = !companyFilter || company.name === companyFilter;
    const matchesRole = role === "All" || company.roles.includes(role);
    const matchesBookmark = !favoritesOnly || bookmarks.includes(company.name);
    return matchesCompany && matchesRole && matchesBookmark;
  });

  const aiRecommendations = useMemo(() => {
    const topics = selectedCompany.topics.slice(0, 4).join(", ");
    const roleText = role === "All" ? selectedCompany.roles[0] : role;

    return [
      `Start with ${topics} because these topics commonly appear in ${selectedCompany.name} preparation.`,
      `Prepare a role-focused checklist for ${roleText} and revise matching projects before interviews.`,
      `Practice one timed OA mock test based on this pattern: ${selectedCompany.oaPattern}`,
      `Revise company-specific behavioral answers and keep one strong project explanation ready.`,
    ];
  }, [selectedCompany, role]);

  const toggleBookmark = (companyName) => {
    setBookmarks((prev) =>
      prev.includes(companyName)
        ? prev.filter((item) => item !== companyName)
        : [...prev, companyName]
    );
  };

  const handleCompanyChange = (value) => {
    setCompanyFilter(value);
    setOpenDropdown(null);

    if (!value) {
      setSelectedCompany(companies[0]);
      return;
    }

    const company = companies.find((item) => item.name === value);
    if (company) setSelectedCompany(company);
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setOpenDropdown(null);

    const firstMatch = companies.find((company) => {
      const matchesCompany = !companyFilter || company.name === companyFilter;
      const matchesRole = value === "All" || company.roles.includes(value);
      const matchesBookmark = !favoritesOnly || bookmarks.includes(company.name);
      return matchesCompany && matchesRole && matchesBookmark;
    });

    if (firstMatch) setSelectedCompany(firstMatch);
  };

  return (
    <div
      className="min-h-screen bg-white px-6 py-10 text-slate-900"
      onClick={() => setOpenDropdown(null)}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 shadow-sm">
              <Building2 size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">
                Company-wise Preparation
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-500 md:text-base">
                Explore company-specific preparation guides, OA patterns, DSA
                topics, salary insights, bookmarks, and AI-style preparation
                recommendations.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <Stat icon={<Building2 size={22} />} value="15+" label="Companies" />
            <Stat icon={<Briefcase size={22} />} value="40+" label="Roles" />
            <Stat icon={<Target size={22} />} value="100+" label="DSA Topics" />
            <Stat icon={<Layers size={22} />} value="JSON" label="Dataset" />
          </div>
        </motion.div>

        <div className="relative z-50 mb-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <CustomDropdown
            label={companyFilter || "Select Company"}
            isOpen={openDropdown === "company"}
            onToggle={(e) => {
              e.stopPropagation();
              setOpenDropdown(openDropdown === "company" ? null : "company");
            }}
            options={[
              { label: "Select Company", value: "" },
              ...companies.map((company) => ({
                label: company.name,
                value: company.name,
              })),
            ]}
            selectedValue={companyFilter}
            onSelect={handleCompanyChange}
          />

          <CustomDropdown
            label={role === "All" ? "Select Role" : role}
            isOpen={openDropdown === "role"}
            onToggle={(e) => {
              e.stopPropagation();
              setOpenDropdown(openDropdown === "role" ? null : "role");
            }}
            options={roles.map((item) => ({
              label: item === "All" ? "Select Role" : item,
              value: item,
            }))}
            selectedValue={role}
            onSelect={handleRoleChange}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFavoritesOnly((prev) => !prev);
            }}
            className={`h-12 rounded-2xl border px-4 text-sm font-semibold shadow-sm transition ${
              favoritesOnly
                ? "border-purple-300 bg-purple-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-purple-300"
            }`}
          >
            {favoritesOnly ? (
  <>
    <Star size={16} className="mr-2 inline fill-white" />
    Showing Favorites
  </>
) : (
  <>
    <Star size={16} className="mr-2 inline" />
    View Favorites
  </>
)}
          </button>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="flex max-h-[680px] flex-col gap-4 overflow-y-auto pr-2">
            {filteredCompanies.map((company, index) => {
              const isBookmarked = bookmarks.includes(company.name);

              return (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`rounded-3xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                    selectedCompany.name === company.name
                      ? "border-purple-300 bg-purple-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCompany(company);
                        setCompanyFilter(company.name);
                      }}
                      className="flex flex-1 items-center gap-3 text-left"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-lg font-bold text-purple-600">
                        {company.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-950">
                          {company.name}
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                          <Clock size={13} className="mr-1 inline" />
                          {company.timeline}
                        </p>
                      </div>
                    </button>

                    <div className="flex items-center gap-2">
                      <Badge difficulty={company.difficulty} />
                      <button
                        type="button"
                        onClick={() => toggleBookmark(company.name)}
                        className="rounded-full border border-purple-100 bg-white p-2 text-purple-600 transition hover:bg-purple-100"
                        aria-label="Bookmark company"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck size={17} />
                        ) : (
                          <Bookmark size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {company.overview}
                  </p>
                </motion.div>
              );
            })}

            {filteredCompanies.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="font-semibold text-slate-800">
                  No matching companies found.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try another company, role, or turn off favorites.
                </p>
              </div>
            )}
          </div>

          <motion.div
            key={selectedCompany.name}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-purple-100 text-2xl font-bold text-purple-600">
                  {selectedCompany.name.charAt(0)}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-500">
                    Company Guide
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950">
                    {selectedCompany.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    {selectedCompany.overview}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge difficulty={selectedCompany.difficulty} />
                <button
                  type="button"
                  onClick={() => toggleBookmark(selectedCompany.name)}
                  className="rounded-full border border-purple-100 bg-purple-50 p-2 text-purple-600 transition hover:bg-purple-100"
                >
                  {bookmarks.includes(selectedCompany.name) ? (
                    <BookmarkCheck size={18} />
                  ) : (
                    <Bookmark size={18} />
                  )}
                </button>
              </div>
            </div>

            <Section
              icon={<Briefcase size={20} />}
              title="Available Roles"
              items={selectedCompany.roles}
            />

            <Info
              icon={<Target size={20} />}
              title="Online Assessment Pattern"
              text={selectedCompany.oaPattern}
            />

            <Section
              icon={<Target size={20} />}
              title="Frequently Asked DSA Topics"
              items={selectedCompany.topics}
            />

            <Section
              icon={<BookOpen size={20} />}
              title="Recommended Learning Resources"
              items={selectedCompany.resources}
            />

            <Section
              icon={<Sparkles size={20} />}
              title="Preparation Tips"
              items={selectedCompany.tips}
            />

            <SalaryCard salaryRange={selectedCompany.salaryRange} />

            <Section
              icon={<MessageSquare size={20} />}
              title="Interview Experiences"
              items={selectedCompany.experiences}
            />

            <div className="mb-6 rounded-3xl border border-purple-100 bg-purple-50 p-5">
              <h3 className="flex items-center gap-2 font-semibold text-purple-700">
                <Sparkles size={18} />
                AI-powered Preparation Recommendations
              </h3>
              <div className="mt-3 space-y-2">
                {aiRecommendations.map((item) => (
                  <p key={item} className="text-sm leading-6 text-slate-600">
                    • {item}
                  </p>
                ))}
              </div>
            </div>

            {selectedCompany.careersUrl && (
              <a
                href={selectedCompany.careersUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
              >
                Visit Careers Page
                <ExternalLink size={16} />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CustomDropdown = ({
  label,
  options,
  selectedValue,
  isOpen,
  onToggle,
  onSelect,
}) => (
  <div className="relative" onClick={(e) => e.stopPropagation()}>
    <button
      type="button"
      onClick={onToggle}
      className="flex h-12 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-left text-slate-700 shadow-sm outline-none transition hover:border-purple-300 focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
    >
      <span>{label}</span>
      <ChevronDown
        size={18}
        className={`text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
      />
    </button>

    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-0 top-[56px] z-[9999] max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm transition hover:bg-purple-50 hover:text-purple-600 ${
              selectedValue === option.value
                ? "bg-purple-100 text-purple-700"
                : "text-slate-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </motion.div>
    )}
  </div>
);

const Stat = ({ icon, value, label }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
      {icon}
    </div>
    <p className="text-2xl font-bold text-slate-950">{value}</p>
    <p className="text-xs uppercase tracking-widest text-slate-500">{label}</p>
  </div>
);

const Badge = ({ difficulty }) => (
  <span
    className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
      difficultyStyles[difficulty] ||
      "border-purple-100 bg-purple-50 text-purple-600"
    }`}
  >
    {difficulty}
  </span>
);

const Section = ({ icon, title, items }) => (
  <div className="mb-6">
    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-950">
      <span className="text-purple-600">{icon}</span>
      {title}
    </h3>

    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-purple-100 bg-purple-50 px-3 py-2 text-sm font-medium text-purple-600"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Info = ({ icon, title, text }) => (
  <div className="mb-6">
    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-950">
      <span className="text-purple-600">{icon}</span>
      {title}
    </h3>

    <p className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
      {text}
    </p>
  </div>
);

const SalaryCard = ({ salaryRange }) => (
  <div className="mb-6">
    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-950">
      <span className="text-purple-600">
        <IndianRupee size={20} />
      </span>
      Salary Range
      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
        Community Submitted
      </span>
    </h3>

    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Intern
        </p>
        <p className="mt-1 text-lg font-bold text-slate-950">
          {salaryRange?.intern || "Not available"}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Fresher
        </p>
        <p className="mt-1 text-lg font-bold text-slate-950">
          {salaryRange?.fresher || "Not available"}
        </p>
      </div>
    </div>
  </div>
);

export default CompanyPrep;