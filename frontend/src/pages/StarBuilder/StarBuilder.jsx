import React, { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Save,
  Copy,
  Check,
  Trash2,
  Pencil,
  Plus,
  Users,
  Scale,
  RotateCcw,
  Award,
  Timer,
  RefreshCw,
  Rocket,
  FileText,
  X,
  ArrowLeft,
} from "lucide-react";
import behavioralQuestions from "../../data/behavioralQuestions";
import {
  countWords,
  getFieldTotals,
  buildStarMarkdown,
  makeAnswer,
  sortAnswersByUpdated,
  estimateReadTimeMinutes,
  starCompleteness,
} from "../../utils/starBuilder";

const STORAGE_KEY = "starBuilder:answers";

const CATEGORY_ICONS = {
  teamwork: Users,
  conflict: Scale,
  failure: RotateCcw,
  leadership: Award,
  deadlines: Timer,
  adaptability: RefreshCw,
  initiative: Rocket,
};

const EMPTY_FIELDS = {
  situation: "",
  task: "",
  action: "",
  result: "",
};

const FIELD_META = [
  { key: "situation", label: "Situation", hint: "Context, where and when. One or two sentences." },
  { key: "task", label: "Task", hint: "What you were responsible for and why." },
  { key: "action", label: "Action", hint: "Specific steps YOU took. Use 'I', not 'we'." },
  { key: "result", label: "Result", hint: "Outcome, metrics, and what you learned." },
];

const loadAnswers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const persistAnswers = (answers) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    /* storage unavailable - keep in-memory */
  }
};

const StarBuilder = () => {
  const [answers, setAnswers] = useState(loadAnswers);
  const [activeCategory, setActiveCategory] = useState(behavioralQuestions[0].id);
  const [question, setQuestion] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [editingId, setEditingId] = useState(null);
  const [viewingId, setViewingId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  };

  useEffect(() => {
    persistAnswers(answers);
  }, [answers]);

  const category = useMemo(
    () => behavioralQuestions.find((c) => c.id === activeCategory),
    [activeCategory]
  );

  const totals = useMemo(() => getFieldTotals(fields), [fields]);

  const completeness = useMemo(() => starCompleteness(fields), [fields]);

  const viewingAnswer = useMemo(
    () => answers.find((a) => a.id === viewingId),
    [answers, viewingId]
  );

  const selectQuestion = (q) => {
    setQuestion(q);
    setCustomQuestion("");
  };

  const handleFieldChange = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setFields(EMPTY_FIELDS);
    setQuestion("");
    setCustomQuestion("");
    setEditingId(null);
    setViewingId(null);
  };

  const saveAnswer = () => {
    const finalQuestion = question.trim() || customQuestion.trim();
    if (!finalQuestion) {
      showToast("Pick or write a question first");
      return;
    }
    const totalWords = totals.words;
    if (totalWords < 20) {
      showToast("Add more detail - aim for at least 20 words");
      return;
    }

    const now = new Date().toISOString();
    if (editingId) {
      setAnswers((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, question: finalQuestion, fields, wordCount: totalWords, updatedAt: now }
            : a
        )
      );
      showToast("Answer updated");
    } else {
      const answer = makeAnswer({
        question: finalQuestion,
        fields,
        createdAt: now,
        updatedAt: now,
      });
      setAnswers((prev) => [answer, ...prev]);
      showToast("Answer saved");
    }
    resetForm();
  };

  const editAnswer = (answer) => {
    setEditingId(answer.id);
    setViewingId(null);
    setQuestion(answer.question);
    setCustomQuestion("");
    setFields({
      situation: answer.fields.situation || "",
      task: answer.fields.task || "",
      action: answer.fields.action || "",
      result: answer.fields.result || "",
    });
    const cat = behavioralQuestions.find((c) =>
      c.questions.includes(answer.question)
    );
    if (cat) setActiveCategory(cat.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteAnswer = (id) => {
    setAnswers((prev) => prev.filter((a) => a.id !== id));
    if (viewingId === id) setViewingId(null);
    if (editingId === id) resetForm();
    showToast("Answer deleted");
  };

  const clearAll = () => {
    setAnswers([]);
    resetForm();
    showToast("All answers cleared");
  };

  const copyAnswer = async (answer) => {
    const markdown = buildStarMarkdown({
      question: answer.question,
      situation: answer.fields.situation,
      task: answer.fields.task,
      action: answer.fields.action,
      result: answer.fields.result,
    });
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(answer.id);
      setTimeout(() => setCopied((c) => (c === answer.id ? null : c)), 1500);
    } catch {
      showToast("Copy failed - select and copy manually");
    }
  };

  const sortedAnswers = useMemo(
    () => sortAnswersByUpdated(answers),
    [answers]
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
            <ClipboardList size={24} className="text-violet-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              STAR Answer Builder
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Draft structured behavioral answers: Situation, Task, Action, Result
            </p>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm shadow-lg shadow-violet-600/30">
            {toast}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Question picker */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Choose a question
              </h2>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {behavioralQuestions.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id] || FileText;
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        active
                          ? "bg-violet-500 text-white border-violet-500"
                          : "bg-gray-100 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      <Icon size={12} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-2 max-h-72 overflow-y-auto">
              {category.questions.map((q) => {
                const selected = question === q;
                return (
                  <button
                    key={q}
                    type="button"
                    onClick={() => selectQuestion(q)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      selected
                        ? "bg-violet-500/10 text-violet-600 dark:text-violet-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {q}
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
                Or write your own question
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  onFocus={() => setQuestion("")}
                  placeholder="e.g. Tell me about a time you were wrong"
                  className="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
                <button
                  type="button"
                  onClick={() => customQuestion.trim() && selectQuestion(customQuestion)}
                  className="shrink-0 px-3 py-2 rounded-xl bg-violet-500/10 text-violet-500 hover:bg-violet-500/20 transition-colors"
                  aria-label="Use custom question"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Answer editor */}
          <div className="lg:col-span-3 space-y-4">
            {viewingAnswer ? (
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-5">
                <button
                  type="button"
                  onClick={() => setViewingId(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-500 hover:text-violet-400 mb-4"
                >
                  <ArrowLeft size={14} /> Back to editor
                </button>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  {viewingAnswer.question}
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  {viewingAnswer.wordCount} words · updated{" "}
                  {new Date(viewingAnswer.updatedAt).toLocaleDateString()}
                </p>
                {FIELD_META.map((meta) => (
                  <div key={meta.key} className="mb-4">
                    <p className="text-xs font-semibold text-violet-500 uppercase tracking-wide mb-1">
                      {meta.label}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {viewingAnswer.fields[meta.key] || "—"}
                    </p>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => copyAnswer(viewingAnswer)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium transition-colors"
                  >
                    {copied === viewingAnswer.id ? <Check size={14} /> : <Copy size={14} />}
                    {copied === viewingAnswer.id ? "Copied" : "Copy as Markdown"}
                  </button>
                  <button
                    type="button"
                    onClick={() => editAnswer(viewingAnswer)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-5">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {question || customQuestion || "No question selected yet"}
                    </h2>
                    {question || customQuestion ? (
                      <button
                        type="button"
                        onClick={() => {
                          setQuestion("");
                          setCustomQuestion("");
                        }}
                        className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        aria-label="Clear question"
                      >
                        <X size={14} />
                      </button>
                    ) : null}
                  </div>

                  {FIELD_META.map((meta) => {
                    const words = countWords(fields[meta.key]);
                    return (
                      <div key={meta.key} className="mb-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-violet-500 uppercase tracking-wide">
                            {meta.label}
                          </label>
                          <span className="text-[11px] text-gray-400">
                            {words} words
                          </span>
                        </div>
                        <textarea
                          value={fields[meta.key]}
                          onChange={(e) => handleFieldChange(meta.key, e.target.value)}
                          rows={3}
                          placeholder={meta.hint}
                          className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-y"
                        />
                      </div>
                    );
                  })}

                  {/* Live stats */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex-1 min-w-[140px]">
                      <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div
                          className="h-full bg-violet-500 transition-all duration-300"
                          style={{ width: `${completeness.percent}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1.5">
                        {completeness.filled}/{completeness.total} sections filled ·{" "}
                        {totals.words} words · ~{estimateReadTimeMinutes(totals.words)} min read
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={saveAnswer}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors"
                    >
                      <Save size={15} />
                      {editingId ? "Update answer" : "Save answer"}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Saved answers */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Saved answers ({sortedAnswers.length})
                </h2>
                {sortedAnswers.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs font-medium text-rose-500 hover:text-rose-400 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {sortedAnswers.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No saved answers yet. Build your first STAR answer above.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedAnswers.map((answer) => (
                    <li
                      key={answer.id}
                      className="flex items-center gap-3 px-5 py-3.5"
                    >
                      <div className="flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => setViewingId(answer.id)}
                          className="text-sm font-medium text-gray-900 dark:text-white hover:text-violet-500 transition-colors text-left truncate"
                        >
                          {answer.question}
                        </button>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {answer.wordCount} words · updated{" "}
                          {new Date(answer.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyAnswer(answer)}
                        aria-label="Copy answer"
                        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-violet-500 transition-colors"
                      >
                        {copied === answer.id ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => editAnswer(answer)}
                        aria-label="Edit answer"
                        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-violet-500 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteAnswer(answer.id)}
                        aria-label="Delete answer"
                        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarBuilder;
