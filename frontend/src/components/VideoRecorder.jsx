import React, { useState, useRef, useEffect } from 'react';
import { Video, StopCircle, RefreshCw, AlertCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const VideoRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  const startRecording = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        await uploadVideo(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError('Unable to access camera/microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  const uploadVideo = async (blob) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('video', blob, 'recording.webm');

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/video-analysis/upload`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            // Could add a progress bar here
          }
        }
      );

      if (response.data.success) {
        toast.success('Video uploaded! Analyzing...');
        if (onRecordingComplete) {
          onRecordingComplete(response.data.data);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload video');
    } finally {
      setUploading(false);
      chunksRef.current = [];
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative bg-black rounded-xl overflow-hidden aspect-video mb-4 border border-gray-700">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <p>{error}</p>
            <button 
              onClick={startRecording}
              className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline
            className={`w-full h-full object-cover ${isRecording ? '' : 'hidden'}`}
          />
        )}
        
        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            REC {formatTime(recordingTime)}
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
            <RefreshCw size={48} className="animate-spin mb-4" />
            <p>Uploading and analyzing video...</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        {!isRecording && !uploading ? (
          <button
            onClick={startRecording}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium shadow-lg"
          >
            <Video size={20} />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            disabled={uploading}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors font-medium shadow-lg disabled:opacity-50"
          >
            <StopCircle size={20} />
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
