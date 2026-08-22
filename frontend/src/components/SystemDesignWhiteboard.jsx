import React, { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

const SystemDesignWhiteboard = ({ roomId = 'prepilot-design-room' }) => {
  const canvasRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [peers, setPeers] = useState(0);

  useEffect(() => {
    // Initialize Yjs document
    const ydoc = new Y.Doc();
    
    // Connect to WebRTC provider for peer-to-peer syncing
    const provider = new WebrtcProvider(roomId, ydoc, {
        signaling: ['wss://signaling.yjs.dev'] // Public signaling server for demo
    });

    provider.on('synced', synced => {
      setIsConnected(synced);
    });

    provider.on('peers', peerStatus => {
      setPeers(peerStatus.webrtcPeers.length);
    });

    // Create a shared array to hold drawing strokes
    const yStrokes = ydoc.getArray('strokes');
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let isDrawing = false;
    let currentStroke = [];

    const drawLine = (x0, y0, x1, y1, color) => {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    };

    // Redraw canvas when strokes array changes from remote peers
    yStrokes.observe(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const strokes = yStrokes.toArray();
      strokes.forEach(stroke => {
        for (let i = 1; i < stroke.length; i++) {
          drawLine(stroke[i-1].x, stroke[i-1].y, stroke[i].x, stroke[i].y, '#00ff00');
        }
      });
    });

    const startDrawing = (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      currentStroke = [point];
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      
      const lastPoint = currentStroke[currentStroke.length - 1];
      drawLine(lastPoint.x, lastPoint.y, point.x, point.y, '#ffffff');
      currentStroke.push(point);
    };

    const stopDrawing = () => {
      if (!isDrawing) return;
      isDrawing = false;
      // Push the completed stroke to the shared CRDT array
      yStrokes.push([currentStroke]);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      provider.destroy();
      ydoc.destroy();
    };
  }, [roomId]);

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg border border-gray-700 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Collaborative System Design</h2>
        <div className="flex gap-4">
            <span className={`px-3 py-1 rounded-full text-sm ${isConnected ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                {isConnected ? 'Connected' : 'Connecting...'}
            </span>
            <span className="px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm">
                Peers Online: {peers}
            </span>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
        <canvas 
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full bg-gray-800 cursor-crosshair"
          style={{ touchAction: 'none' }}
        />
      </div>
      <p className="text-gray-400 text-sm mt-2">Draw on the canvas. Changes sync in real-time across peers using Yjs CRDTs.</p>
    </div>
  );
};

export default SystemDesignWhiteboard;
