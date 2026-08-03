
const StatusBadge = ({ status }) => {
  const map = {
    planning: "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300",
    "in-progress": "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400",
    completed: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  };
  const label = {
    planning: "Planning",
    "in-progress": "In Progress",
    completed: "Completed",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${map[status] || map.planning}`}>
      {label[status] || "Planning"}
    </span>
  );
};

const RoadmapCard = ({ roadmap, onOpen, onDelete }) => (
  <div
    onClick={() => onOpen(roadmap._id)}
    className="group flex flex-col bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 space-y-4 cursor-pointer hover:border-violet-400 dark:hover:border-violet-500/50 transition-all"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
          <Map size={18} strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
            {roadmap.projectIdea}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
            {roadmap.overview || "No overview yet"}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(roadmap._id);
        }}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all shrink-0"
        aria-label="Delete roadmap"
      >
        <Trash2 size={16} strokeWidth={1.5} />
      </button>
    </div>

    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
        <span>Progress</span>
        <span>{roadmap.progressPercent || 0}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          style={{ width: `${roadmap.progressPercent || 0}%` }}
        />
      </div>
    </div>

    <div className="flex items-center justify-between pt-1">
      <StatusBadge status={roadmap.status} />
      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        {roadmap.completedMilestoneCount || 0}/{roadmap.milestoneCount || 0} milestones
      </span>
    </div>

    <div className="flex items-center justify-end text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:gap-1.5 gap-1 transition-all">
      Open roadmap <ChevronRight size={14} strokeWidth={1.5} />
    </div>
  </div>
);

const RoadmapDashboard = ({ roadmaps, loading, onOpen, onDelete, onCreateNew }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Your Saved Roadmaps
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Resume planning, track progress, or start a new project.
          </p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-all shrink-0"
        >
          <Plus size={16} strokeWidth={1.5} /> New Roadmap
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : roadmaps.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center mb-4">
            <Map size={26} strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            No roadmaps yet
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-sm">
            Describe a project idea and let the AI assistant build you a full development roadmap.
          </p>
          <button
            onClick={onCreateNew}
            className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-all"
          >
            <Plus size={16} strokeWidth={1.5} /> Plan Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roadmaps.map((r) => (
            <RoadmapCard key={r._id} roadmap={r} onOpen={onOpen} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapDashboard;