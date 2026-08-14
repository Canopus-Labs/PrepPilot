import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";
import DashboardLayout from "./Layouts/DashboardLayout";
import ComplexityProfiler from "./ComplexityProfiler";
import { analyzeJavaScriptComplexity } from "../utils/complexityAnalyzer";

const RAPIDAPI_KEY = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY;

const LANGUAGE_MAP = {
  "54": "cpp",
  "62": "java",
  "71": "python",
  "63": "javascript",
  "74": "typescript",
};

const Compiler = () => {
  const [language, setLanguage] = useState("62"); // Default Java
  const codeTemplates = {
    "54": `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}`,
    "62": `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}`,
    "71": `print("Hello World")`,
    "63": `console.log("Hello World");`,
    "74": `const message: string = "Hello World";\nconsole.log(message);`,
  };
  const [code, setCode] = useState(codeTemplates[language]);
  const [output, setOutput] = useState("No output");
  const [complexity, setComplexity] = useState(() =>
    analyzeJavaScriptComplexity(codeTemplates["63"])
  );

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(codeTemplates[lang] || "// Select a supported language");
  };

  useEffect(() => {
    if (language !== "63" && language !== "74") return;

    const timer = setTimeout(() => {
      setComplexity(analyzeJavaScriptComplexity(code));
    }, 300);

    return () => clearTimeout(timer);
  }, [code, language]);

  const handleRun = async () => {
    setOutput("Running...");

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            language_id: parseInt(language, 10),
            source_code: code,
            stdin: "",
          }),
        }
      );

      if (!response.ok) throw new Error("Request failed");
      const result = await response.json();
      const finalOutput =
        result.stdout ||
        result.stderr ||
        result.compile_output ||
        "No output returned.";

      setOutput(finalOutput);
    } catch (error) {
      setOutput("Error running code: " + error.message);
    }
  };

  return (
    <>
      <DashboardLayout />
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#0b1120] px-6 py-10 font-poppins text-gray-100">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h1 className="mb-2 text-3xl font-bold text-violet-400 md:text-4xl">Instant Code Compiler</h1>
          <p className="mb-2 text-base text-gray-200 md:text-lg">
            Instantly write, run, and test your code in multiple languages. No setup required—just code and see results!
          </p>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row">
          <div className="flex min-h-[360px] flex-1 flex-col overflow-hidden rounded border border-white/10 bg-white/10 shadow-xl backdrop-blur-lg">
            <div className="flex items-center justify-between bg-gradient-to-r from-gray-600 to-gray-600 px-4 py-3">
              <div className="flex items-center gap-3 text-sm text-white">
                <label htmlFor="language" className="text-lg">
                  Language:
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={handleLanguageChange}
                  className="rounded-lg border border-gray-500 bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white focus:outline-none"
                >
                  <option value="54">C++</option>
                  <option value="62">Java</option>
                  <option value="71">Python</option>
                  <option value="63">JavaScript</option>
                  <option value="74">TypeScript</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleRun}
                aria-label="Run code"
                className="flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-2 font-semibold text-white shadow-md transition hover:bg-violet-700"
              >
                <Play className="h-4 w-4" />
                Run
              </button>
            </div>

            <div className="min-h-[300px] flex-1" aria-label="Code editor">
              <Editor
                height="400px"
                language={LANGUAGE_MAP[language] || "javascript"}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value ?? "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                  tabSize: 2,
                  ariaLabel: "Code editor",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col rounded border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-lg md:w-2/5">
            <h3 className="mb-3 text-lg font-semibold text-violet-300" id="compiler-output-label">
              Output
            </h3>
            <pre
              role="status"
              aria-live="polite"
              aria-labelledby="compiler-output-label"
              className="h-[300px] overflow-y-auto whitespace-pre-wrap rounded-xl bg-black/60 p-4 font-mono text-sm text-white md:h-[400px]"
            >
              {output}
            </pre>
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          <ComplexityProfiler
            analysis={complexity}
            supported={language === "63" || language === "74"}
          />
        </div>
      </div>
    </>
  );
};

export default Compiler;
