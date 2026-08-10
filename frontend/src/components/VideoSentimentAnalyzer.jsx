import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const VideoSentimentAnalyzer = ({ onAnalysisComplete }) => {
  const videoRef = useRef();
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [expressions, setExpressions] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        setIsModelLoaded(true);
      } catch (err) {
        console.error("Error loading face-api models", err);
      }
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsAnalyzing(true);
      })
      .catch((err) => console.error(err));
  };

  const stopVideo = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsAnalyzing(false);
    if (onAnalysisComplete) {
      onAnalysisComplete(expressions);
    }
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (videoRef.current && isAnalyzing) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceExpressions();

        if (detections.length > 0) {
          setExpressions(detections[0].expressions);
        }
      }
    }, 1000);
  };

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">AI Behavioral Sentiment Analyzer</h2>

      {!isModelLoaded ? (
        <p className="text-gray-400">Loading AI Models...</p>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              onPlay={handleVideoPlay}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-4 mb-4">
            {!isAnalyzing ? (
              <button onClick={startVideo} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                Start Mock Interview
              </button>
            ) : (
              <button onClick={stopVideo} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors">
                End Session
              </button>
            )}
          </div>

          {Object.keys(expressions).length > 0 && (
            <div className="w-full bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Real-time Analysis</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(expressions).map(([exp, val]) => (
                  <div key={exp} className="flex justify-between text-gray-300">
                    <span className="capitalize">{exp}</span>
                    <span>{(val * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoSentimentAnalyzer;
