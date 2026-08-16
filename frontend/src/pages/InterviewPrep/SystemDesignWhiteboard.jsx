import React from 'react';

const SystemDesignWhiteboard = () => {
    return (
        <div className="container mx-auto p-8 h-screen flex flex-col">
            <h1 className="text-3xl font-bold text-white mb-6">Interactive System Design Whiteboard</h1>
            <div className="bg-white flex-1 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Excalidraw/tldraw canvas will be mounted here.</p>
            </div>
        </div>
    );
};

export default SystemDesignWhiteboard;
