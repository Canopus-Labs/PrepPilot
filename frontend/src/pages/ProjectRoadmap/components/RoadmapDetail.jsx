import { useState } from "react";
import {
  Layers,
  Palette,
  ListChecks,
  Database,
  Rocket,
  ClipboardCheck,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// Shared section wrapper w/ regenerate button
// ─────────────────────────────────────────────────────────
const Section = ({ icon: Icon, title, sectionKey, onRegenerate, regenerating, children }) => (
  <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
          <Icon size={16} strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {onRegenerate && (
        <button
          type="button"
          onClick={() => onRegenerate(sectionKey, title)}
          disabled={regenerating === sectionKey}
          className="flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 disabled:opacity-50 transition-all"
        >
          {regenerating === sectionKey ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <RefreshCw size={13} strokeWidth={1.5} />
          )}
          Regenerate
        </button>
      )}
    </div>
    {children}
  </div>
);

const Pill = ({ children }) => (
  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20">
    {children}
  </span>
);

const BulletList = ({ items }) => (
  <ul className="space-y-1.5">
    {(items || []).map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
        <ChevronRight size={14} className="text-gray-400 dark:text-gray-600 shrink-0 mt-0.5" strokeWidth={1.5} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

// ─────────────────────────────────────────────────────────
// Subtask row (checklist view)
// ─────────────────────────────────────────────────────────
const SubtaskRow = ({ subtask, onToggle, onSaveNotes }) => {
  const [showNotes, setShowNotes] = useState(!!subtask.notes);
  const [noteDraft, setNoteDraft] = useState(subtask.notes || "");

  return (
    <div className="pl-2 border-l-2 border-gray-100 dark:border-white/10">
      <div className="flex items-start gap-2.5 py-1.5">
        <button
          type="button"
          onClick={() => onToggle(subtask.id, !subtask.completed)}
          className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${
            subtask.completed
              ? "bg-violet-600 border-violet-600"
              : "border-gray-300 dark:border-white/30 hover:border-violet-400"
          }`}
          aria-label="Toggle subtask"
        >
          {subtask.completed && <Check size={11} className="text-white" strokeWidth={3} />}
        </button>
        <span
          className={`flex-1 text-sm ${
            subtask.completed
              ? "text-gray-400 dark:text-gray-500 line-through"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {subtask.title}
        </span>
        <button
          type="button"
          onClick={() => setShowNotes((s) => !s)}
          className="text-gray-400 hover:text-violet-500 shrink-0"
          aria-label="Toggle notes"
        >
          <StickyNote size={13} strokeWidth={1.5} />
        </button>
      </div>
      {showNotes && (
        <div className="pl-6 pb-2">
          <textarea
            rows={2}
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            onBlur={() => onSaveNotes(subtask.id, noteDraft)}
            placeholder="Personal note…"
            className="w-full text-xs rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0f172a] px-2.5 py-2 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
          />
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Milestone card (checklist view)
// ─────────────────────────────────────────────────────────
const MilestoneCard = ({ milestone, index, onToggleSubtask, onToggleMilestone, onSaveSubtaskNotes, onEditMilestone }) => {
  const [expanded, setExpanded] = useState(index === 0);
  const [editing, setEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(milestone.title);
  const [descDraft, setDescDraft] = useState(milestone.description);

  const total = milestone.subtasks?.length || 0;
  const done = milestone.subtasks?.filter((s) => s.completed).length || 0;

  const saveEdit = () => {
    onEditMilestone(milestone.id, { title: titleDraft.trim() || milestone.title, description: descDraft });
    setEditing(false);
  };

  return (
    <div className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-white/[0.02]">
        <button
          type="button"
          onClick={() =>
            total > 0
              ? setExpanded((e) => !e)
              : onToggleMilestone(milestone.id, !milestone.completed)
          }
          className="mt-0.5 shrink-0"
          aria-label="Expand milestone"
        >
          {total > 0 ? (
            expanded ? (
              <ChevronDown size={16} className="text-gray-500" />
            ) : (
              <ChevronRight size={16} className="text-gray-500" />
            )
          ) : (
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center ${
                milestone.completed
                  ? "bg-violet-600 border-violet-600"
                  : "border-gray-300 dark:border-white/30"
              }`}
            >
              {milestone.completed && <Check size={11} className="text-white" strokeWidth={3} />}
            </div>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="space-y-2">
              <input
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                className="w-full text-sm font-bold rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0f172a] px-2.5 py-1.5 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <textarea
                rows={2}
                value={descDraft}
                onChange={(e) => setDescDraft(e.target.value)}
                className="w-full text-xs rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0f172a] px-2.5 py-1.5 text-gray-700 dark:text-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-1 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 px-3 py-1.5 rounded-md"
                >
                  <Check size={12} /> Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setTitleDraft(milestone.title);
                    setDescDraft(milestone.description);
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-md border border-gray-300 dark:border-white/10"
                >
                  <X size={12} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <h4
                  className={`text-sm font-bold ${
                    milestone.completed
                      ? "text-gray-400 dark:text-gray-500 line-through"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {index + 1}. {milestone.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="text-gray-400 hover:text-violet-500"
                  aria-label="Edit milestone"
                >
                  <Pencil size={12} strokeWidth={1.5} />
                </button>
              </div>
              {milestone.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{milestone.description}</p>
              )}
            </>
          )}
        </div>

        {total > 0 && (
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">
            {done}/{total}
          </span>
        )}
      </div>

      {expanded && total > 0 && (
        <div className="p-4 pt-2 space-y-0.5">
          {milestone.subtasks.map((s) => (
            <SubtaskRow
              key={s.id}
              subtask={s}
              onToggle={(taskId, completed) => onToggleSubtask(milestone.id, taskId, completed)}
              onSaveNotes={(taskId, notes) => onSaveSubtaskNotes(milestone.id, taskId, notes)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Kanban board view
// ─────────────────────────────────────────────────────────
const KANBAN_COLUMNS = [
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

const KanbanBoard = ({ milestones, onMoveStatus }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {KANBAN_COLUMNS.map((col) => {
      const items = milestones.filter((m) => (m.status || "todo") === col.id);
      return (
        <div key={col.id} className="bg-gray-50 dark:bg-white/[0.02] rounded-xl p-3 space-y-3 min-h-[120px]">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {col.label}
            </span>
            <span className="text-xs text-gray-400">{items.length}</span>
          </div>
          {items.map((m) => (
            <div
              key={m.id}
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 space-y-2"
            >
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{m.title}</p>
              {m.subtasks?.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {m.subtasks.filter((s) => s.completed).length}/{m.subtasks.length} subtasks
                </p>
              )}
              <div className="flex gap-1.5 pt-1">
                {KANBAN_COLUMNS.filter((c) => c.id !== col.id).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onMoveStatus(m.id, c.id)}
                    className="text-[11px] font-medium px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-violet-400 hover:text-violet-600 transition-all"
                  >
                    → {c.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-600 text-center py-4">Nothing here</p>
          )}
        </div>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────────────────
// Main detail view
// ─────────────────────────────────────────────────────────
const RoadmapDetail = ({
  roadmap,
  regeneratingSection,
  savingPdf,
  onBack,
  onToggleSubtask,
  onToggleMilestone,
  onSaveSubtaskNotes,
  onEditMilestone,
  onMoveMilestoneStatus,
  onToggleTesting,
  onRegenerateSection,
  onExportMarkdown,
  onExportPDF,
  onDelete,
  isDeleting,
}) => {
  const [view, setView] = useState("checklist");

  return (
    <div className="space-y-6" id="roadmap-detail-printable">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-gray-200 dark:border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft size={15} strokeWidth={1.5} /> All Roadmaps
        </button>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {roadmap.projectIdea}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
              {roadmap.overview}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onExportMarkdown}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:border-violet-400 transition-all"
            >
              <Download size={14} strokeWidth={1.5} /> Markdown
            </button>
            <button
              onClick={onExportPDF}
              disabled={savingPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:border-violet-400 transition-all disabled:opacity-50"
            >
              {savingPdf ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} strokeWidth={1.5} />} PDF
            </button>
            <button
              onClick={onDelete}
              disabled={isDeleting}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${isDeleting ? "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed" : "border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"}`}
            >
              {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} strokeWidth={1.5} />} 
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 max-w-md">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-400">
            <span>Overall Progress</span>
            <span>{roadmap.progressPercent || 0}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${roadmap.progressPercent || 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tech stack + UI/UX */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Section
          icon={Layers}
          title="Suggested Tech Stack"
          sectionKey="techStack"
          onRegenerate={onRegenerateSection}
          regenerating={regeneratingSection}
        >
          <div className="space-y-3">
            {["frontend", "backend", "database", "other"].map((k) =>
              roadmap.techStack?.[k]?.length ? (
                <div key={k} className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {k}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {roadmap.techStack[k].map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </Section>

        <Section
          icon={Palette}
          title="UI/UX Recommendations"
          sectionKey="uiUxRecommendations"
          onRegenerate={onRegenerateSection}
          regenerating={regeneratingSection}
        >
          <BulletList items={roadmap.uiUxRecommendations} />
        </Section>
      </div>

      {/* Milestones */}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <ListChecks size={16} strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Development Roadmap</h3>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setView("checklist")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                view === "checklist"
                  ? "bg-white dark:bg-white/10 text-violet-600 dark:text-violet-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Rows3 size={13} strokeWidth={1.5} /> Checklist
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                view === "kanban"
                  ? "bg-white dark:bg-white/10 text-violet-600 dark:text-violet-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Kanban size={13} strokeWidth={1.5} /> Kanban
            </button>
          </div>
        </div>

        {view === "checklist" ? (
          <div className="space-y-3">
            {roadmap.milestones?.map((m, i) => (
              <MilestoneCard
                key={m.id}
                milestone={m}
                index={i}
                onToggleSubtask={onToggleSubtask}
                onToggleMilestone={onToggleMilestone}
                onSaveSubtaskNotes={onSaveSubtaskNotes}
                onEditMilestone={onEditMilestone}
              />
            ))}
          </div>
        ) : (
          <KanbanBoard milestones={roadmap.milestones || []} onMoveStatus={onMoveMilestoneStatus} />
        )}
      </div>

      {/* Feature prioritization */}
      <Section
        icon={ListChecks}
        title="Feature Prioritization"
        sectionKey="featurePrioritization"
        onRegenerate={onRegenerateSection}
        regenerating={regeneratingSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              MVP
            </span>
            <BulletList items={roadmap.featurePrioritization?.mvp} />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Future Enhancements
            </span>
            <BulletList items={roadmap.featurePrioritization?.future} />
          </div>
        </div>
      </Section>

      {/* DB/API + Deployment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Section
          icon={Database}
          title="Database / API Suggestions"
          sectionKey="databaseApiSuggestions"
          onRegenerate={onRegenerateSection}
          regenerating={regeneratingSection}
        >
          <BulletList items={roadmap.databaseApiSuggestions} />
        </Section>

        <Section
          icon={Rocket}
          title="Deployment Recommendations"
          sectionKey="deploymentRecommendations"
          onRegenerate={onRegenerateSection}
          regenerating={regeneratingSection}
        >
          <BulletList items={roadmap.deploymentRecommendations} />
        </Section>
      </div>

      {/* Testing checklist */}
      <Section
        icon={ClipboardCheck}
        title="Testing Checklist"
        sectionKey="testingChecklist"
        onRegenerate={onRegenerateSection}
        regenerating={regeneratingSection}
      >
        <div className="space-y-1">
          {roadmap.testingChecklist?.map((t) => (
            <div key={t.id} className="flex items-center gap-2.5 py-1">
              <button
                type="button"
                onClick={() => onToggleTesting(t.id, !t.completed)}
                className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${
                  t.completed
                    ? "bg-violet-600 border-violet-600"
                    : "border-gray-300 dark:border-white/30 hover:border-violet-400"
                }`}
              >
                {t.completed && <Check size={11} className="text-white" strokeWidth={3} />}
              </button>
              <span
                className={`text-sm ${
                  t.completed
                    ? "text-gray-400 dark:text-gray-500 line-through"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {t.title}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default RoadmapDetail;