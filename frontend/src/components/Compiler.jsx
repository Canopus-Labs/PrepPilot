import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";
import DashboardLayout from "./Layouts/DashboardLayout";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosinstance";

const LANGUAGE_MAP = {
  "54": "cpp",
  "62": "java",
  "71": "python",
  "63": "javascript",
};

const Compiler = () => {
  const [language, setLanguage] = useState("62"); // Default Java
  const codeTemplates = {
    "54": `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
    "62": `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,
    "71": `print("Hello World")`,
    "63": `console.log("Hello World");`
  };
  const [code, setCode] = useState(codeTemplates[language]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(codeTemplates[lang] || "// Select a supported language");
  };
  const [output, setOutput] = useState("No output");

  const handleRun = async () => {
    setOutput("Running...");

    try {
      const { data: result } = await axiosInstance.post(API_PATHS.COMPILER.RUN, {
        language_id: parseInt(language, 10),
        source_code: code,
        stdin: "",
      });

      const finalOutput =
        result.stdout ||
        result.stderr ||
        result.compile_output ||
        "No output returned.";

      setOutput(finalOutput);
    } catch (error) {
      setOutput("Error running code: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <DashboardLayout />
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#0b1120] text-gray-100 px-6 py-10 font-poppins">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-violet-400 mb-2">Instant Code Compiler</h1>
          <p className="text-base md:text-lg text-gray-200 mb-2">
            Instantly write, run, and test your code in multiple languages. No setup required—just code and see results!
          </p>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-lg border border-white/10 rounded shadow-xl overflow-hidden min-h-[360px]">
            <div className="flex justify-between items-center bg-gradient-to-r from-gray-600 to-gray-600 px-4 py-3">
              <div className="flex items-center gap-3 text-sm text-white">
                <label htmlFor="language" className="text-lg">
                  Language:
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={handleLanguageChange}
                  className="px-3 py-1.5 rounded-lg bg-gray-700 text-white text-sm font-semibold focus:outline-none border border-gray-500"
                >
                  <option value="54">C++</option>
                  <option value="62">Java</option>
                  <option value="71">Python</option>
                  <option value="63">JavaScript</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleRun}
                aria-label="Run code"
                className="flex items-center gap-2 px-5 py-2 bg-violet-500 text-white font-semibold rounded-xl 
                           hover:bg-violet-700 transition shadow-md"
              >
                <Play className="w-4 h-4" />
                Run
              </button>
            </div>

            <div className="flex-1 min-h-[300px]" aria-label="Code editor">
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

          <div className="md:w-2/5 bg-white/10 backdrop-blur-lg border border-white/10 rounded shadow-xl p-5 flex flex-col">
            <h3 className="text-lg font-semibold text-violet-300 mb-3" id="compiler-output-label">
              Output
            </h3>
            <pre
              role="status"
              aria-live="polite"
              aria-labelledby="compiler-output-label"
              className="bg-black/60 text-white rounded-xl p-4 h-[300px] md:h-[400px] overflow-y-auto text-sm font-mono whitespace-pre-wrap"
            >
              {output}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compiler;
