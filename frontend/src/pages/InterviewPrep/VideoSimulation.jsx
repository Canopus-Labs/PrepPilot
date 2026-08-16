import React, { useRef, useState } from 'react';

const VideoSimulation = () => {
    const videoRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-white mb-6">AI Video Interview Simulation</h1>
            <div className="bg-gray-800 p-6 rounded-lg">
                <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-400">Camera placeholder</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    {isRecording ? "Stop Simulation" : "Start Simulation"}
                </button>
            </div>
        </div>
    );
};

export default VideoSimulation;
