import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import { ArrowLeft, Download, Play, RefreshCw, FileText, Save } from "lucide-react";
import toast from "react-hot-toast";
import ThemeToggle from "../../components/ThemeToggle";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

// Default LaTeX code blocks for our samples
const TEMPLATE_CODE = {
  "jakes-resume": `\\documentclass[letterpaper,11pt]{article}
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
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape Jake Gutierrez} \\\\ \\vspace{1pt}
    \\small 123-456-7890 $|$ \\href{mailto:x@x.com}{\\underline{jake@jake.com}} $|$ 
    \\href{https://linkedin.com/in/...}{\\underline{linkedin.com/in/jake}} $|$
    \\href{https://github.com/...}{\\underline{github.com/jake}}
\\end{center}

\\section{Education}
    \\begin{tabularx}{\\textwidth}{X r}
      \\textbf{Southwestern University} & Georgetown, TX \\\\
      Bachelor of Arts in Computer Science, Minor in Business & Aug. 2018 -- May 2021 \\\\
    \\end{tabularx}

\\section{Experience}
    \\begin{tabularx}{\\textwidth}{X r}
      \\textbf{Undergraduate Research Assistant} $|$ \\emph{Texas A\\&M University} & June 2020 -- Present \\\\
    \\end{tabularx}
    \\vspace{-1.5em}
    \\begin{itemize}[leftmargin=0.15in, label={--}]
        \\small
        \\item Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems
        \\item Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data
    \\end{itemize}

\\end{document}`,
  "deedy-cv": `\\documentclass[a4paper]{article}
\\begin{document}
\\Huge\\textbf{Deedy CV placeholder}
\\end{document}`,
  "harvard-pro": `\\documentclass[a4paper]{article}
\\begin{document}
\\Huge\\textbf{Harvard Pro placeholder}
\\end{document}`,
  "blank": `\\documentclass[a4paper]{article}
\\begin{document}

Hello World!

\\end{document}`
};

const ResumeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(TEMPLATE_CODE[id] || TEMPLATE_CODE["blank"]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Initial Compile
  useEffect(() => {
    compileLatex();
    // eslint-disable-next-line
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const compileLatex = async () => {
    if (!code.trim()) return;
    
    setIsCompiling(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        API_PATHS.RESUME.COMPILE,
        { code },
        { responseType: 'blob' }
      );

      const blob = response.data;
      
      // Fallback check
      if (blob.type.includes('text') || blob.type.includes('html')) {
         throw new Error("LaTeX syntax error. Please check your code.");
      }
      
      const newPdfUrl = URL.createObjectURL(blob);
      setPdfUrl(newPdfUrl);

    } catch (err) {
      console.error(err);
      
      let errorMessage = "Failed to compile LaTeX. Please check your syntax.";
      if (err.response?.data && err.response.data.type !== 'application/pdf') {
         try {
             // Because responseType is 'blob', we must read the error blob as text
             const text = await err.response.data.text();
             const json = JSON.parse(text);
             if (json.message) {
                 errorMessage = json.message + (json.log ? "\n\nLog Details:\n" + json.log : "");
             }
         } catch(e) {}
      }
      
      setError(errorMessage);
    } finally {
      setIsCompiling(false);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `resume_${id || 'draft'}.pdf`;
    a.click();
  };

  const saveToDashboard = async () => {
    setIsSaving(true);
    try {
      await axiosInstance.post(API_PATHS.RESUME.SAVE, {
        title: id === "jakes-resume" ? "Jake's Resume" : id === "deedy-cv" ? "Deedy CV" : "Document",
        latexCode: code
      });
      toast.success("Resume saved to Dashboard!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume to Dashboard");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* Editor Top Navbar (Overleaf style) */}
      <div className="h-14 flex items-center justify-between px-4 bg-gray-50 dark:bg-[#151c2f] border-b border-gray-200 dark:border-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/resume-builder')}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 rounded-md transition"
            title="Back to Templates"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex items-center gap-2 border-l border-gray-300 dark:border-white/10 pl-4">
            <FileText size={18} className="text-violet-500" />
            <span className="font-semibold text-sm">main.tex</span>
            <span className="text-xs text-gray-400 ml-2 font-medium bg-gray-200 dark:bg-white/5 px-2 py-0.5 rounded-sm">
              {id === "jakes-resume" ? "Jake's Resume" : id === "deedy-cv" ? "Deedy CV" : "Document"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={compileLatex}
            disabled={isCompiling}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-bold text-white shadow-sm transition-all ${
              isCompiling 
                ? "bg-emerald-500/50 cursor-wait shadow-none" 
                : "bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-emerald-500/20"
            }`}
          >
            {isCompiling ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Play size={14} className="fill-current" />
            )}
            Recompile
          </button>
          
          <button
            onClick={downloadPdf}
            disabled={!pdfUrl || isCompiling}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-semibold bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
            title="Download PDF"
          >
            <Download size={14} />
          </button>

          <button
            onClick={saveToDashboard}
            disabled={!code || isCompiling || isSaving}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-bold shadow-sm transition-all ${
              isSaving
                ? "bg-violet-500/50 cursor-wait shadow-none text-white"
                : "bg-violet-600 hover:bg-violet-700 active:scale-95 shadow-violet-500/20 text-white leading-tight"
            }`}
          >
            {isSaving ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Save size={14} className="fill-current" />
            )}
            Save to Dashboard
          </button>

          <div className="h-6 w-px bg-gray-300 dark:bg-white/10 mx-1"></div>
          <ThemeToggle />
        </div>
      </div>

      {/* Split Pane Area */}
      <div className="flex-1 overflow-hidden relative">
        <Split 
          sizes={[50, 50]} 
          minSize={300} 
          expandToMin={false} 
          gutterSize={8} 
          gutterAlign="center" 
          snapOffset={30} 
          dragInterval={1} 
          direction="horizontal" 
          className="flex flex-row h-full w-full split-editor-container"
        >
          {/* Code Editor Pane (Left) */}
          <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] relative">
             <div className="h-8 bg-gray-100 dark:bg-[#252526] border-b border-gray-200 dark:border-black/50 flex items-center px-3 text-[11px] font-medium text-gray-500 uppercase tracking-wide shrink-0">
               Source Code
             </div>
             <div className="flex-1 relative">
                <Editor
                  height="100%"
                  defaultLanguage="latex"
                  theme={document.documentElement.classList.contains('dark') ? 'vs-dark' : 'light'}
                  value={code}
                  onChange={handleEditorChange}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                  }}
                />
             </div>
          </div>

          {/* PDF Preview Pane (Right) */}
          <div className="h-full flex flex-col bg-gray-100 dark:bg-[#2d2d2d] relative">
             <div className="h-8 bg-gray-200 dark:bg-[#252526] border-b border-gray-300 dark:border-black/50 flex items-center px-3 text-[11px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide shrink-0">
               Preview
             </div>
             <div className="flex-1 relative overflow-auto p-4 md:p-8 flex justify-center bg-[#525659] dark:bg-[#1a1a1a]">
               {error ? (
                 <div className="w-full max-w-lg m-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl text-red-600 dark:text-red-400 flex flex-col gap-2">
                   <h4 className="font-bold flex items-center gap-2">⚠️ Compilation Error</h4>
                   <p className="text-sm font-medium whitespace-pre-wrap">{error}</p>
                 </div>
               ) : pdfUrl ? (
                 <iframe 
                   src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                   className="w-full h-full max-w-[850px] shadow-2xl rounded bg-white"
                   title="PDF Preview"
                 />
               ) : (
                 <div className="m-auto text-gray-400 dark:text-gray-500 flex flex-col items-center gap-3">
                   {isCompiling ? (
                      <>
                        <RefreshCw size={32} className="animate-spin text-gray-300 dark:text-gray-600" />
                        <span className="font-medium tracking-wide">Compiling LaTeX document...</span>
                      </>
                   ) : (
                      <>
                        <FileText size={32} className="text-gray-300 dark:text-gray-600" />
                        <span className="font-medium tracking-wide">No PDF generated yet</span>
                      </>
                   )}
                 </div>
               )}
             </div>
          </div>
        </Split>
      </div>

      {/* Internal styling for react-split gutters to override default empty divs */}
      <style dangerouslySetInnerHTML={{__html: `
        .split-editor-container > .gutter {
          background-color: #e5e7eb;
          cursor: col-resize;
          transition: background-color 0.2s;
        }
        .split-editor-container > .gutter:hover {
          background-color: #c084fc;
        }
        .dark .split-editor-container > .gutter {
          background-color: #3f3f46;
        }
        .dark .split-editor-container > .gutter:hover {
          background-color: #9333ea;
        }
      `}} />
    </div>
  );
};

export default ResumeEditor;
