import { useState, useEffect, useRef } from 'react';

export const useAudioPipeline = (wsUrl) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection to the backend
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log('Connected to Audio Pipeline WebSockets');
    };

    wsRef.current.onmessage = async (event) => {
      // Differentiate between JSON (transcript text) and Blob (audio bytes)
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'transcript') {
            setTranscript(data.text);
          }
        } catch (e) {
          console.error("Failed to parse JSON transcript", e);
        }
      } else if (event.data instanceof Blob) {
        // We received binary audio bytes from the TTS API via backend
        console.log('Received TTS audio chunk');
        await playAudioChunk(event.data);
      }
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [wsUrl]);

  const playAudioChunk = async (blob) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const arrayBuffer = await blob.arrayBuffer();
    // In a full implementation, you decode AudioData.
    // For now, this is a stub.
    console.log(`Stub: Playing audio chunk of size ${arrayBuffer.byteLength} bytes`);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
          // Stream raw audio chunks to backend
          wsRef.current.send(event.data);
        }
      };

      // Request chunks every 250ms for low latency
      mediaRecorderRef.current.start(250);
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone permission denied', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  return { isRecording, startRecording, stopRecording, transcript };
};
