import React, { useState } from "react";
import { Bot, ArrowLeft, ArrowRight, Sparkles, SkipForward } from "lucide-react";
import { QUESTIONS } from "../utils/roadmapAi";

// step 0 = idea entry, steps 1..N = QUESTIONS[step-1]
const RoadmapQuestionnaire = ({
  idea,
  setIdea,
  answers,
  setAnswers,
  step,
  setStep,
  onComplete,
  loading,
}) => {
  const totalSteps = QUESTIONS.length + 1; // + idea step
  const progress = Math.round((step / totalSteps) * 100);
  const isIdeaStep = step === 0;
  const question = isIdeaStep ? null : QUESTIONS[step - 1];

  const [draft, setDraft] = useState(question ? answers[question.key] || "" : "");

  const goToStep = (nextStep, currentDraft) => {
    if (isIdeaStep) {
      setIdea(currentDraft);
    } else {
      setAnswers((prev) => ({ ...prev, [question.key]: currentDraft }));
    }
    setStep(nextStep);
  };

  const handleNext = () => {
    if (isIdeaStep) {
      if (!draft.trim()) return;
      goToStep(1, draft);
      setDraft(answers[QUESTIONS[0].key] || "");
      return;
    }

    const nextStep = step + 1;
    if (nextStep > QUESTIONS.length) {
      // last question — finalize
      const finalAnswers = { ...answers, [question.key]: draft };
      setAnswers(finalAnswers);
      onComplete(idea, finalAnswers);
    } else {
      goToStep(nextStep, draft);
      setDraft(answers[QUESTIONS[nextStep - 1].key] || "");
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    const prevStep = step - 1;
    if (isIdeaStep) return;
    setAnswers((prev) => ({ ...prev, [question.key]: draft }));
    setStep(prevStep);
    setDraft(prevStep === 0 ? idea : answers[QUESTIONS[prevStep - 1]?.key] || "");
  };

  const canProceed = isIdeaStep ? draft.trim().length > 0 : question.optional || draft.trim().length > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
          <span>
            {isIdeaStep ? "Your idea" : `Question ${step} of ${QUESTIONS.length}`}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Conversational bubble */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center shrink-0">
          <Bot size={18} strokeWidth={1.5} />
        </div>
        <div className="flex-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl rounded-tl-sm p-5 space-y-4">
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            {isIdeaStep
              ? "What's the project idea you'd like to plan?"
              : question.prompt}
          </p>
          {!isIdeaStep && question.optional && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Optional — skip if it doesn't apply
            </span>
          )}

          {/* Input types */}
          {isIdeaStep || question.type === "textarea" ? (
            <textarea
              autoFocus
              rows={isIdeaStep ? 3 : 3}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={isIdeaStep ? "e.g. An AI-powered study planner for exam prep" : question.placeholder}
              className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-[#0f172a] px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            />
          ) : question.type === "choice" ? (
            <div className="flex flex-wrap gap-2">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDraft(opt)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${
                    draft === opt
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "bg-gray-50 dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-violet-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <input
              autoFocus
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={question.placeholder}
              className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-[#0f172a] px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          )}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0 || loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft size={16} strokeWidth={1.5} /> Back
        </button>

        <div className="flex items-center gap-2">
          {!isIdeaStep && question.optional && !draft.trim() && (
            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
            >
              <SkipForward size={16} strokeWidth={1.5} /> Skip
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed || loading}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              canProceed && !loading
                ? "bg-violet-600 hover:bg-violet-700 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600 cursor-not-allowed"
            }`}
          >
            {step === QUESTIONS.length ? (
              <>
                <Sparkles size={16} strokeWidth={1.5} />
                {loading ? "Generating Roadmap…" : "Generate Roadmap"}
              </>
            ) : (
              <>
                Next <ArrowRight size={16} strokeWidth={1.5} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapQuestionnaire;