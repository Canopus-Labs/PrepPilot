import React, { useState, useEffect } from 'react';
import { generateNextTopic } from '../utils/adaptiveStudyEngine';

const AdaptiveStudyPath = ({ userPerformanceMap }) => {
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    // Generate recommendation based on current user performance data
    if (userPerformanceMap) {
      const nextTopic = generateNextTopic(userPerformanceMap);
      setRecommendation(nextTopic);
    }
  }, [userPerformanceMap]);

  if (!recommendation) {
    return (
      <div className="p-4 bg-gray-900 rounded-xl shadow-lg border border-gray-700 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-gray-900 to-indigo-950 rounded-xl shadow-lg border border-indigo-900 mt-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Adaptive Study Engine</h2>
      <p className="text-indigo-200 mb-6 text-sm">Based on your recent performance, our Knowledge Graph has tailored your next focus area.</p>
      
      <div className="bg-gray-800 bg-opacity-60 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center gap-3 mb-2">
            <span className="text-xl font-bold text-indigo-400">Next Topic:</span>
            <span className="text-2xl font-black text-white">{recommendation.name}</span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">
          <span className="font-semibold text-gray-400">Why? </span> 
          {recommendation.reason}
        </p>
        
        {recommendation.prerequisites && recommendation.prerequisites.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Prerequisites Conquered:</span>
            <div className="flex flex-wrap gap-2">
              {recommendation.prerequisites.map(prereq => (
                <span key={prereq} className="px-2 py-1 bg-green-900 bg-opacity-40 text-green-400 text-xs rounded-md border border-green-800">
                  {prereq} ✓
                </span>
              ))}
            </div>
          </div>
        )}

        <button className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-indigo-900/20">
          Start {recommendation.name} Practice
        </button>
      </div>
    </div>
  );
};

export default AdaptiveStudyPath;
