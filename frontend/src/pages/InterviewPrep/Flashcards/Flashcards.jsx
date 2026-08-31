import React, { useState, useEffect } from 'react';

const Flashcards = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch from /api/flashcards
        setLoading(false);
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Spaced Repetition Flashcards</h1>
            {loading ? (
                <p className="text-gray-400">Loading flashcards...</p>
            ) : (
                <div className="bg-gray-800 p-6 rounded-lg">
                    <p className="text-white">Your review queue is currently empty. Add some flashcards!</p>
                </div>
            )}
        </div>
    );
};

export default Flashcards;
