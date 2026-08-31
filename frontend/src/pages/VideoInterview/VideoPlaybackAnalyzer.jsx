import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, Mic, Clock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const VideoPlaybackAnalyzer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/video-analysis/${id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setAnalysis(response.data.data);
        if (response.data.data.status === 'processing') {
          setPolling(true);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch analysis results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (polling && analysis?.status === 'processing') {
      interval = setInterval(() => {
        fetchAnalysis();
      }, 3000); // Poll every 3 seconds
    }
    return () => clearInterval(interval);
  }, [polling, analysis?.status]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analysis not found</h2>
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">Go Back</button>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Player */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recording</h2>
          <div className="bg-black rounded-xl overflow-hidden aspect-video border border-gray-700">
            {analysis.status === 'processing' ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-lg font-medium">AI is analyzing your video...</p>
                <p className="text-sm text-gray-400 mt-2">This usually takes a few seconds.</p>
              </div>
            ) : (
              <video 
                src={`${import.meta.env.VITE_BACKEND_URL}${analysis.videoUrl}`} 
                controls 
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} />
            <span>Recorded on {new Date(analysis.createdAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Feedback</h2>
          
          {analysis.status === 'processing' ? (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">Waiting for analysis results...</p>
            </div>
          ) : analysis.status === 'failed' ? (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center border border-red-200 dark:border-red-800">
              <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
              <p className="text-red-600 dark:text-red-400 font-medium">Analysis failed. Please try recording again.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Score Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                  <Eye size={24} className="mx-auto text-blue-500 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Eye Contact</p>
                  <p className={`text-2xl font-bold ${getScoreColor(analysis.eyeContactScore)}`}>
                    {analysis.eyeContactScore}%
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                  <Mic size={24} className="mx-auto text-purple-500 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Filler Words</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analysis.fillerWordCount}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                  <Clock size={24} className="mx-auto text-green-500 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pace</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analysis.speakingPace}
                  </p>
                </div>
              </div>

              {/* Transcript */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  Transcript
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{analysis.transcript}"
                </p>
              </div>

              {/* Overall Feedback */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Overall Feedback</h3>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  {analysis.overallFeedback}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlaybackAnalyzer;
