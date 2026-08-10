import React, { useState } from 'react';
import * as babel from '@babel/standalone';

const CodeComplexityProfiler = ({ code }) => {
  const [complexity, setComplexity] = useState(null);
  const [error, setError] = useState(null);

  const analyzeCode = () => {
    try {
      setError(null);
      
      // Parse code to AST
      const ast = babel.parse(code, {
        presets: ['env'],
      });
      
      let loopCount = 0;
      let maxDepth = 0;
      
      // Simple custom traversal to detect loops
      babel.traverse(ast, {
        ForStatement(path) {
          loopCount++;
          const depth = path.getAncestry().filter(p => p.isLoop()).length;
          maxDepth = Math.max(maxDepth, depth);
        },
        WhileStatement(path) {
          loopCount++;
          const depth = path.getAncestry().filter(p => p.isLoop()).length;
          maxDepth = Math.max(maxDepth, depth);
        }
      });
      
      let bigO = 'O(1)';
      if (maxDepth === 1) bigO = 'O(n)';
      if (maxDepth === 2) bigO = 'O(n^2)';
      if (maxDepth >= 3) bigO = 'O(n^3) or worse';
      
      setComplexity({
        totalLoops: loopCount,
        maxNesting: maxDepth,
        estimatedTimeComplexity: bigO
      });
      
    } catch (err) {
      setError("Failed to parse code. Please ensure valid JavaScript.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg border border-gray-700 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">AST Code Complexity Profiler</h2>
        <button 
          onClick={analyzeCode}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
        >
          Analyze Complexity
        </button>
      </div>

      {error && (
        <div className="text-red-400 mb-2">{error}</div>
      )}

      {complexity && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 border border-gray-600 rounded">
              <div className="text-gray-400 text-sm">Total Loops</div>
              <div className="text-2xl font-bold text-white">{complexity.totalLoops}</div>
            </div>
            <div className="p-2 border border-gray-600 rounded">
              <div className="text-gray-400 text-sm">Max Nesting Depth</div>
              <div className="text-2xl font-bold text-white">{complexity.maxNesting}</div>
            </div>
            <div className="p-2 border border-purple-500 rounded bg-purple-900 bg-opacity-20">
              <div className="text-purple-300 text-sm">Estimated Big-O</div>
              <div className="text-2xl font-bold text-purple-400">{complexity.estimatedTimeComplexity}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeComplexityProfiler;
