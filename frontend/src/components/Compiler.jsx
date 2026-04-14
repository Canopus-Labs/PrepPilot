import React, { useState } from "react";
import { Play } from "lucide-react"; // icon for Run button
import DashboardLayout from "./Layouts/DashboardLayout";

const RAPIDAPI_KEY = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY;

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
    const [code, setCode] = useState(codeTemplates[language]); // Keep only one instance

  // Update code template when language changes
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(codeTemplates[lang]);
  };
  const [output, setOutput] = useState("No output");

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
            language_id: parseInt(language),
            source_code: code,
            stdin: "",
          }),
        }
      );

      const result = await response.json();
      const finalOutput =
        result.stdout ||
        result.stderr ||
        result.compile_output ||
        "No output returned.";

      setOutput(finalOutput);
    } catch (error) {
      setOutput("❌ Error running code: " + error.message);
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
          {/* Code Editor */}
          <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-lg border border-white/10 rounded shadow-xl overflow-hidden">
            {/* Top Bar */}
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
                onClick={handleRun}
                className="flex items-center gap-2 px-5 py-2 bg-violet-500 text-white font-semibold rounded-xl 
                           hover:bg-violet-700 transition shadow-md"
              >
                <Play className="w-4 h-4" />
                Run
              </button>
            </div>

            {/* Editor */}
            <textarea
              className="flex-1 w-full p-4 bg-black/30 text-white font-mono text-sm outline-none resize-none min-h-[300px]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>

          {/* Output Panel */}
          <div className="md:w-2/5 bg-white/10 backdrop-blur-lg border border-white/10 rounded shadow-xl p-5 flex flex-col">
            <h3 className="text-lg font-semibold text-violet-300 mb-3">Output</h3>
            <pre className="bg-black/60 text-white rounded-xl p-4 h-[300px] md:h-[400px] overflow-y-auto text-sm font-mono whitespace-pre-wrap">
              {output}
            </pre>
            {/* <div className="mt-4 text-xs text-gray-400">
              Powered by Judge0 API. <br />
              <span className="text-red-400">Note: Replace <b>YOUR_RAPID_API_KEY</b> with your actual API key in the code.</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Compiler;
