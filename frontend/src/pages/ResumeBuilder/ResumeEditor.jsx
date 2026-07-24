import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import { ArrowLeft, Download, Play, RefreshCw, FileText, Save, Pencil, Check, X } from "lucide-react";
import toast from "react-hot-toast";

import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

// ── Template definitions ───────────────────────────────────────────────────
const TEMPLATES = {
  "jakes-resume": {
    name: "Jake's Resume",
    code: `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape Jake Gutierrez} \\\\ \\vspace{1pt}
    \\small 123-456-7890 $|$ \\href{mailto:jake@jake.com}{\\underline{jake@jake.com}} $|$ 
    \\href{https://linkedin.com/in/jake}{\\underline{linkedin.com/in/jake}} $|$
    \\href{https://github.com/jake}{\\underline{github.com/jake}}
\\end{center}

\\section{Education}
    \\begin{tabularx}{\\textwidth}{X r}
      \\textbf{Southwestern University} & Georgetown, TX \\\\
      Bachelor of Arts in Computer Science, Minor in Business & Aug. 2018 -- May 2021 \\\\
    \\end{tabularx}

\\section{Experience}
    \\begin{tabularx}{\\textwidth}{X r}
      \\textbf{Research Assistant} $|$ \\emph{Texas A\\&M University} & June 2020 -- Present \\\\
    \\end{tabularx}
    \\vspace{-1.5em}
    \\begin{itemize}[leftmargin=0.15in, label={--}]
        \\small
        \\item Developed a REST API using FastAPI and PostgreSQL
        \\item Built a full-stack app using Flask, React, PostgreSQL and Docker
    \\end{itemize}

\\end{document}`,
  },
  "deedy-cv": {
    name: "Deedy CV",
    code: `\\documentclass[a4paper]{article}
\\begin{document}
\\Huge\\textbf{Deedy CV}
\\end{document}`,
  },
  "harvard-pro": {
    name: "Harvard Pro",
    code: `\\documentclass[a4paper]{article}
\\begin{document}
\\Huge\\textbf{Harvard Pro}
\\end{document}`,
  },
  blank: {
    name: "Blank Document",
    code: `\\documentclass[a4paper]{article}
\\begin{document}

Hello World!

\\end{document}`,
  },
};

const isTemplateKey = (id) => Object.keys(TEMPLATES).includes(id);

const ResumeEditor = () => {
  const { id } = useParams();   // either a template key OR a MongoDB _id
  const navigate = useNavigate();

  const [code, setCode]             = useState("");
  const [title, setTitle]           = useState("My Resume");
  const [resumeId, setResumeId]     = useState(null);   // MongoDB _id for updates
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [pdfUrl, setPdfUrl]         = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isSaving, setIsSaving]     = useState(false);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState(null);
  const [completion, setCompletion] = useState(0);

  // ── Load: template key → use hardcoded code; MongoDB id → fetch from backend
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      if (isTemplateKey(id)) {
        // Fresh template — no existing resume ID
        const tpl = TEMPLATES[id];
        setCode(tpl.code);
        setTitle(tpl.name);
        setResumeId(null);
        setIsLoading(false);
      } else {
        // Treat as a saved resume MongoDB _id
        try {
          const res = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
          const all = res.data?.resumes || [];
          const found = all.find(r => r._id === id);
          if (found) {
            setCode(found.latexCode);
            setTitle(found.title);
            setResumeId(found._id);
          } else {
            toast.error("Resume not found, loading blank template.");
            setCode(TEMPLATES.blank.code);
            setTitle("My Resume");
            setResumeId(null);
          }
        } catch {
          toast.error("Failed to load resume.");
          setCode(TEMPLATES.blank.code);
          setTitle("My Resume");
        } finally {
          setIsLoading(false);
        }
      }
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Auto-compile once code is loaded
  const didInitialCompile = useRef(false);
  useEffect(() => {
    if (!isLoading && code && !didInitialCompile.current) {
      didInitialCompile.current = true;
      compileLatex();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, code]);

  // Completion meter
  useEffect(() => {
    const sections = [
      "\\section{Education}",
      "\\section{Experience}",
      "\\section{Projects}",
      "\\section{Skills}",
      "\\section{Achievements}",
    ];
    const done = sections.filter(s => code.includes(s)).length;
    setCompletion(Math.round((done / sections.length) * 100));
  }, [code]);

  const compileLatex = async () => {
    if (!code.trim()) return;
    setIsCompiling(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        API_PATHS.RESUME.COMPILE,
        { code },
        { responseType: "blob" }
      );
      const blob = response.data;
      if (blob.type.includes("text") || blob.type.includes("html")) {
        throw new Error("LaTeX syntax error. Please check your code.");
      }
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      let msg = "Failed to compile LaTeX. Please check your syntax.";
      if (err.response?.data && err.response.data.type !== "application/pdf") {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          if (json.message) msg = json.message + (json.log ? "\n\nLog:\n" + json.log : "");
        } catch {}
      }
      setError(msg);
    } finally {
      setIsCompiling(false);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${title.replace(/\s+/g, "_") || "resume"}.pdf`;
    a.click();
  };

  const saveToDashboard = async () => {
    setIsSaving(true);
    try {
      const payload = { title, latexCode: code };
      // If we already have a MongoDB ID, send it so the backend updates instead of creating new
      if (resumeId) payload.resumeId = resumeId;

      const res = await axiosInstance.post(API_PATHS.RESUME.SAVE, payload);
      // Store the returned ID so subsequent saves update the same document
      if (res.data?.resume?._id) setResumeId(res.data.resume._id);
      toast.success("Resume saved!");
    } catch {
      toast.error("Failed to save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmTitleEdit = () => {
    if (titleDraft.trim()) setTitle(titleDraft.trim());
    setEditingTitle(false);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-[#0b1120] text-gray-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Loading resume…
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">

      {/* Top Navbar */}
      <div className="h-14 flex items-center justify-between px-4 bg-gray-50 dark:bg-[#151c2f] border-b border-gray-200 dark:border-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/resume-builder")}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 rounded-md transition"
            title="Back to Templates">
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2 border-l border-gray-300 dark:border-white/10 pl-4">
            <FileText size={18} className="text-violet-500 shrink-0" />
            {/* Editable title */}
            {editingTitle ? (
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  value={titleDraft}
                  onChange={e => setTitleDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") confirmTitleEdit(); if (e.key === "Escape") setEditingTitle(false); }}
                  className="text-sm font-semibold bg-white dark:bg-white/10 border border-violet-400 rounded px-2 py-0.5 outline-none w-44"
                />
                <button onClick={confirmTitleEdit} className="text-green-500 hover:text-green-400"><Check size={14} /></button>
                <button onClick={() => setEditingTitle(false)} className="text-red-400 hover:text-red-300"><X size={14} /></button>
              </div>
            ) : (
              <button
                onClick={() => { setTitleDraft(title); setEditingTitle(true); }}
                className="flex items-center gap-1.5 group"
                title="Click to rename">
                <span className="text-sm font-semibold">{title}</span>
                <Pencil size={11} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}
          </div>
        </div>

        {/* Completion bar */}
        <div className="ml-4 flex flex-col">
          <span className="text-xs text-gray-500">Resume Completion: {completion}%</span>
          <div className="w-40 h-2 bg-gray-200 dark:bg-white/10 rounded-full mt-1">
            <div className="h-2 bg-violet-600 rounded-full transition-all" style={{ width: `${completion}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={compileLatex} disabled={isCompiling}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-bold text-white shadow-sm transition-all ${
              isCompiling ? "bg-emerald-500/50 cursor-wait" : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"
            }`}>
            {isCompiling ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} className="fill-current" />}
            Recompile
          </button>

          <button onClick={downloadPdf} disabled={!pdfUrl || isCompiling}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-semibold bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
            title="Download PDF">
            <Download size={14} />
          </button>

          <button onClick={saveToDashboard} disabled={!code || isCompiling || isSaving}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-bold shadow-sm transition-all text-white ${
              isSaving ? "bg-violet-500/50 cursor-wait" : "bg-violet-600 hover:bg-violet-700 active:scale-95"
            }`}>
            {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            Save
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex-1 overflow-hidden relative">
        <Split sizes={[50, 50]} minSize={300} gutterSize={8} direction="horizontal"
          className="flex flex-row h-full w-full split-editor-container">

          {/* Left: code editor */}
          <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e]">
            <div className="h-8 bg-gray-100 dark:bg-[#252526] border-b border-gray-200 dark:border-black/50 flex items-center px-3 text-[11px] font-medium text-gray-500 uppercase tracking-wide shrink-0">
              Source Code
            </div>
            <div className="flex-1 relative">
              <Editor height="100%" defaultLanguage="latex"
                theme={document.documentElement.classList.contains("dark") ? "vs-dark" : "light"}
                value={code} onChange={v => setCode(v)}
                options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: "on", scrollBeyondLastLine: false, smoothScrolling: true }} />
            </div>
          </div>

          {/* Right: PDF preview */}
          <div className="h-full flex flex-col bg-gray-100 dark:bg-[#2d2d2d]">
            <div className="h-8 bg-gray-200 dark:bg-[#252526] border-b border-gray-300 dark:border-black/50 flex items-center px-3 text-[11px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide shrink-0">
              Preview
            </div>
            <div className="flex-1 relative overflow-auto p-4 md:p-8 flex justify-center bg-[#525659] dark:bg-[#1a1a1a]">
              {error ? (
                <div className="w-full max-w-lg m-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl text-red-600 dark:text-red-400 flex flex-col gap-2">
                  <h4 className="font-bold">⚠️ Compilation Error</h4>
                  <p className="text-sm whitespace-pre-wrap">{error}</p>
                </div>
              ) : pdfUrl ? (
                <iframe src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full max-w-[850px] shadow-2xl rounded bg-white" title="PDF Preview" />
              ) : (
                <div className="m-auto text-gray-400 dark:text-gray-500 flex flex-col items-center gap-3">
                  {isCompiling ? (
                    <><RefreshCw size={32} className="animate-spin" /><span>Compiling…</span></>
                  ) : (
                    <><FileText size={32} /><span>No PDF yet</span></>
                  )}
                </div>
              )}
            </div>
          </div>
        </Split>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .split-editor-container > .gutter { background-color:#e5e7eb; cursor:col-resize; transition:background-color .2s; }
        .split-editor-container > .gutter:hover { background-color:#c084fc; }
        .dark .split-editor-container > .gutter { background-color:#3f3f46; }
        .dark .split-editor-container > .gutter:hover { background-color:#9333ea; }
      `}} />
    </div>
  );
};

export default ResumeEditor;
