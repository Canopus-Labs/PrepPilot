import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import GridMemoryGame from "../../components/GridMemoryGame";
import { Grid3x3 } from "lucide-react";

// ─── Games data ────────────────────────────────────────────────────────────────
// Add more brain-training games here in the future — each just needs a
// name/icon/desc and a matching component rendered below.
const gamesData = [
  {
    name: "Grid Memory",
    icon: Grid3x3,
    desc: "Train spatial recall by memorising and clicking coloured cell patterns.",
    component: GridMemoryGame,
  },
];

// ─── CognitiveGamesPage ────────────────────────────────────────────────────────
const CognitiveGamesPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGameClick = (game) => {
    if (!user) { navigate("/login"); return; }
    setSelectedGame(game);
  };

  const handleBack = () => setSelectedGame(null);

  const ActiveGame = selectedGame?.component;

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <main className="flex-1 container mx-auto px-4 py-10 md:py-16">

        {/* Hero — hidden when a game is selected */}
        <div className={`text-center mb-12 transition-colors duration-300 ${selectedGame ? "hidden" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cognitive Games
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto md:text-lg">
            Sharpen your memory, focus, and spatial recall with quick, playful brain-training games.
          </p>
        </div>

        {/* Games grid */}
        {!selectedGame && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 max-w-[1400px] mx-auto">
            {gamesData.map((game) => {
              const Icon = game.icon;
              return (
                <button
                  key={game.name}
                  onClick={() => handleGameClick(game)}
                  className="group flex flex-col items-start sm:flex-row sm:items-center gap-4 md:gap-5 p-5 md:p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-500/40 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-all duration-300 text-left w-full shadow-sm hover:shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-300 group-hover:bg-violet-100 group-hover:text-violet-600 dark:group-hover:bg-violet-600/30 dark:group-hover:text-violet-400 transition-colors duration-300">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex flex-col mt-2 sm:mt-0 flex-1">
                    <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                      {game.name}
                    </h3>
                    <p className="text-[13px] md:text-sm text-gray-500 dark:text-gray-400 leading-snug line-clamp-2">
                      {game.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Active game header */}
        {selectedGame && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
              Playing: <span className="text-violet-600 dark:text-violet-400">{selectedGame.name}</span>
            </h2>
            <button
              className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-300 flex items-center gap-2"
              onClick={handleBack}
            >
              ← Choose Another Game
            </button>
          </div>
        )}

        {/* Active game — inline, no modal */}
        {selectedGame && ActiveGame && <ActiveGame />}
      </main>
    </div>
  );
};

export default CognitiveGamesPage;
