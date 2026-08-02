import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Map, Sparkles, Save, RefreshCw, X, LogIn } from "lucide-react";
import { BASE_URL, API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { UserContext } from "../../context/userContext";

import RoadmapQuestionnaire from "./components/RoadmapQuestionnaire";
import RoadmapDashboard from "./components/RoadmapDashboard";
import RoadmapDetail from "./components/RoadmapDetail";
import {
  buildRoadmapPrompt,
  buildRegeneratePrompt,
  normalizeGeneratedRoadmap,
  tryParseJSON,
  ROADMAP_SYSTEM_INSTRUCTION,
} from "./utils/roadmapAi";
import { exportRoadmapAsMarkdown, exportRoadmapAsPDF } from "./utils/exportRoadmap";

// Modes: dashboard -> questionnaire -> preview (unsaved AI output) -> detail (saved & persisted)
const ProjectRoadmap = () => {
  const { user } = useContext(UserContext);

  const [mode, setMode] = useState("dashboard");
  const [roadmaps, setRoadmaps] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const [idea, setIdea] = useState("");
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);

  const [activeRoadmap, setActiveRoadmap] = useState(null); // preview (unsaved) or saved detail
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState(null);
  const [savingPdf, setSavingPdf] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // ── Fetch saved roadmaps ──────────────────────────────
  const fetchRoadmaps = async () => {
    if (!user) {
      setRoadmaps([]);
      return;
    }
    setLoadingList(true);
    try {
      const res = await axiosInstance.get(API_PATHS.ROADMAP.GET_ALL);
      setRoadmaps(res.data?.roadmaps || []);
    } catch (err) {
      console.error("Failed to load roadmaps", err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ── Start a new roadmap ────────────────────────────────
  const handleCreateNew = () => {
    setIdea("");
    setAnswers({});
    setStep(0);
    setActiveRoadmap(null);
    setIsSaved(false);
    setMode("questionnaire");
  };

  // ── Generate roadmap via AI ────────────────────────────
  const handleGenerate = async (finalIdea, finalAnswers) => {
    setGenerating(true);
    try {
      const prompt = buildRoadmapPrompt(finalIdea, finalAnswers);
      const res = await fetch(`${BASE_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction: ROADMAP_SYSTEM_INSTRUCTION }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      const parsed = tryParseJSON(data.text || "");
      if (!parsed) throw new Error("The AI returned an unexpected format. Please try again.");

      const normalized = normalizeGeneratedRoadmap(parsed);
      setActiveRoadmap({
        projectIdea: finalIdea,
        answers: finalAnswers,
        progressPercent: 0,
        status: "planning",
        ...normalized,
      });
      setIsSaved(false);
      setMode("preview");
    } catch (err) {
      console.error("Roadmap generation error:", err);
      toast.error(err.message || "Failed to generate roadmap. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  // ── Save the previewed (unsaved) roadmap ───────────────
  const handleSaveRoadmap = async () => {
    if (!user) {
      toast.error("Log in to save your roadmap to your account.");
      return;
    }
    setSaving(true);
    try {
      const res = await axiosInstance.post(API_PATHS.ROADMAP.CREATE, activeRoadmap);
      setActiveRoadmap(res.data.roadmap);
      setIsSaved(true);
      toast.success("Roadmap saved to your account");
      fetchRoadmaps();
      setMode("detail");
    } catch (err) {
      console.error("Save roadmap error:", err);
      toast.error(err.response?.data?.message || "Failed to save roadmap");
    } finally {
      setSaving(false);
    }
  };

  // ── Open a saved roadmap from the dashboard ────────────
  const handleOpenRoadmap = async (id) => {
    try {
      const res = await axiosInstance.get(API_PATHS.ROADMAP.GET_ONE(id));
      setActiveRoadmap(res.data.roadmap);
      setIsSaved(true);
      setMode("detail");
    } catch (err) {
      toast.error("Failed to load roadmap");
    }
  };

  const handleDeleteRoadmap = async (id) => {
    if (!window.confirm("Delete this roadmap? This can't be undone.")) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(API_PATHS.ROADMAP.DELETE(id));
      toast.success("Roadmap deleted");
      if (activeRoadmap?._id === id) {
        setMode("dashboard");
        setActiveRoadmap(null);
      }
      fetchRoadmaps();
    } catch (err) {
      toast.error("Failed to delete roadmap");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Task / progress mutations (saved roadmaps only) ────
  const patchTask = async (payload) => {
    if (!isSaved || !activeRoadmap?._id) {
      toast.error("Save this roadmap first to edit milestones and the testing checklist.");
      return;
    }
    try {
      const res = await axiosInstance.patch(API_PATHS.ROADMAP.TOGGLE_TASK(activeRoadmap._id), payload);
      setActiveRoadmap(res.data.roadmap);
    } catch (err) {
      toast.error("Failed to update progress");
    }
  };

  const handleToggleSubtask = (milestoneId, taskId, completed) =>
    patchTask({ type: "subtask", milestoneId, taskId, completed });

  const handleToggleMilestone = (milestoneId, completed) =>
    patchTask({ type: "milestone", milestoneId, completed });

  const handleSaveSubtaskNotes = (milestoneId, taskId, notes) =>
    patchTask({ type: "subtask", milestoneId, taskId, notes });

  const handleMoveMilestoneStatus = (milestoneId, status) =>
    patchTask({ type: "milestone", milestoneId, status });

  const handleToggleTesting = (taskId, completed) =>
    patchTask({ type: "testing", taskId, completed });

  // ── Edit milestone title/description ───────────────────
  const handleEditMilestone = async (milestoneId, { title, description }) => {
    const updatedMilestones = activeRoadmap.milestones.map((m) =>
      m.id === milestoneId ? { ...m, title, description } : m
    );
    if (!isSaved) {
      setActiveRoadmap((prev) => ({ ...prev, milestones: updatedMilestones }));
      return;
    }
    try {
      const res = await axiosInstance.put(API_PATHS.ROADMAP.UPDATE(activeRoadmap._id), {
        milestones: updatedMilestones,
      });
      setActiveRoadmap(res.data.roadmap);
      toast.success("Milestone updated");
    } catch (err) {
      toast.error("Failed to update milestone");
    }
  };

  // ── Regenerate a single section via AI ─────────────────
  const SECTION_KEY_TO_SCHEMA = {
    techStack: "techStack",
    uiUxRecommendations: "uiUxRecommendations",
    featurePrioritization: "featurePrioritization",
    databaseApiSuggestions: "databaseApiSuggestions",
    deploymentRecommendations: "deploymentRecommendations",
    testingChecklist: "testingChecklist",
  };

  const handleRegenerateSection = async (sectionKey, sectionLabel) => {
    setRegeneratingSection(sectionKey);
    try {
      const currentValue = activeRoadmap[sectionKey];
      const prompt = buildRegeneratePrompt(
        activeRoadmap.projectIdea,
        activeRoadmap.answers || {},
        sectionKey,
        sectionLabel,
        currentValue
      );
      const res = await fetch(`${BASE_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction: ROADMAP_SYSTEM_INSTRUCTION }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      const parsed = tryParseJSON(data.text || "");
      if (!parsed || parsed[sectionKey] === undefined) {
        throw new Error("The AI returned an unexpected format.");
      }

      let newValue = parsed[sectionKey];
      // testingChecklist needs ids added back in
      if (sectionKey === "testingChecklist" && Array.isArray(newValue)) {
        newValue = newValue.map((t) => ({
          id: `test_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          title: typeof t === "string" ? t : t.title || "",
          completed: false,
          notes: "",
        }));
      }

      if (!isSaved) {
        setActiveRoadmap((prev) => ({ ...prev, [sectionKey]: newValue }));
      } else {
        const res2 = await axiosInstance.put(API_PATHS.ROADMAP.UPDATE(activeRoadmap._id), {
          [sectionKey]: newValue,
        });
        setActiveRoadmap(res2.data.roadmap);
      }
      toast.success(`${sectionLabel} regenerated`);
    } catch (err) {
      console.error("Regenerate section error:", err);
      toast.error(err.message || "Failed to regenerate section");
    } finally {
      setRegeneratingSection(null);
    }
  };

  // ── Export ──────────────────────────────────────────────
  const handleExportMarkdown = () => exportRoadmapAsMarkdown(activeRoadmap);

  const handleExportPDF = async () => {
    setSavingPdf(true);
    try {
      await exportRoadmapAsPDF(activeRoadmap);
    } catch (err) {
      console.error("Export PDF error:", err);
      toast.error(err.message || "Failed to export PDF");
    } finally {
      setSavingPdf(false);
    }
  };

  // ── Render ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {mode !== "detail" && (
          <div className="space-y-4 border-b border-gray-200 dark:border-white/10 pb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-violet-500/15 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center shrink-0">
                <Map size={24} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Project Development Roadmap Assistant
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
                  Describe your project idea and answer a few quick questions — the AI will map
                  out your tech stack, milestones, and a full launch-ready roadmap.
                </p>
              </div>
            </div>
            {!user && mode === "dashboard" && (
              <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg px-4 py-2.5">
                <LogIn size={15} strokeWidth={1.5} />
                Log in to save roadmaps, track progress, and resume planning later.
              </div>
            )}
          </div>
        )}

        {mode === "dashboard" && (
          <RoadmapDashboard
            roadmaps={roadmaps}
            loading={loadingList}
            onOpen={handleOpenRoadmap}
            onDelete={handleDeleteRoadmap}
            onCreateNew={handleCreateNew}
            isDeleting={isDeleting}
          />
        )}

        {mode === "questionnaire" && (
          <RoadmapQuestionnaire
            idea={idea}
            setIdea={setIdea}
            answers={answers}
            setAnswers={setAnswers}
            step={step}
            setStep={setStep}
            onComplete={handleGenerate}
            loading={generating}
          />
        )}

        {mode === "preview" && activeRoadmap && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl px-5 py-4">
              <div className="flex items-center gap-2 text-sm font-medium text-violet-700 dark:text-violet-300">
                <Sparkles size={16} strokeWidth={1.5} />
                This roadmap isn't saved yet — save it to track progress and edit later.
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode("questionnaire")}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-violet-300 dark:border-violet-500/30 text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-500/10 transition-all"
                >
                  <RefreshCw size={13} strokeWidth={1.5} /> Regenerate All
                </button>
                <button
                  onClick={() => {
                    setActiveRoadmap(null);
                    setMode("dashboard");
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
                >
                  <X size={13} strokeWidth={1.5} /> Discard
                </button>
                <button
                  onClick={handleSaveRoadmap}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white transition-all disabled:opacity-60"
                >
                  <Save size={13} strokeWidth={1.5} /> {saving ? "Saving…" : "Save Roadmap"}
                </button>
              </div>
            </div>

            <RoadmapDetail
              roadmap={activeRoadmap}
              regeneratingSection={regeneratingSection}
              savingPdf={savingPdf}
              onBack={() => {
                setActiveRoadmap(null);
                setMode("dashboard");
              }}
              onToggleSubtask={handleToggleSubtask}
              onToggleMilestone={handleToggleMilestone}
              onSaveSubtaskNotes={handleSaveSubtaskNotes}
              onEditMilestone={handleEditMilestone}
              onMoveMilestoneStatus={handleMoveMilestoneStatus}
              onToggleTesting={handleToggleTesting}
              onRegenerateSection={handleRegenerateSection}
              onExportMarkdown={handleExportMarkdown}
              onExportPDF={handleExportPDF}
              onDelete={() => {
                setActiveRoadmap(null);
                setMode("dashboard");
              }}
            />
          </div>
        )}

        {mode === "detail" && activeRoadmap && (
          <RoadmapDetail
            roadmap={activeRoadmap}
            regeneratingSection={regeneratingSection}
            savingPdf={savingPdf}
            onBack={() => {
              setActiveRoadmap(null);
              setMode("dashboard");
              fetchRoadmaps();
            }}
            onToggleSubtask={handleToggleSubtask}
            onToggleMilestone={handleToggleMilestone}
            onSaveSubtaskNotes={handleSaveSubtaskNotes}
            onEditMilestone={handleEditMilestone}
            onMoveMilestoneStatus={handleMoveMilestoneStatus}
            onToggleTesting={handleToggleTesting}
            onRegenerateSection={handleRegenerateSection}
            onExportMarkdown={handleExportMarkdown}
            onExportPDF={handleExportPDF}
            onDelete={() => handleDeleteRoadmap(activeRoadmap._id)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectRoadmap;