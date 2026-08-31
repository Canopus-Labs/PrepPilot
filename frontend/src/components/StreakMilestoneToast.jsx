import React, { useEffect, useState } from 'react';

const MILESTONE_LABELS = {
  3: '3-Day Streak 🔥',
  7: 'Week Warrior 🏅',
  14: 'Two-Week Titan ⚡',
  30: 'Month Master 🏆',
  60: '60-Day Legend 💎',
  100: 'Century Club 👑'
};

/**
 * Shows a dismissible toast when newlyUnlockedMilestones is passed in
 * from an API response (e.g. after completing a session or flashcard review).
 */
export default function StreakMilestoneToast({ newlyUnlockedMilestones = [] }) {
  const [visibleMilestone, setVisibleMilestone] = useState(null);

  useEffect(() => {
    if (newlyUnlockedMilestones.length > 0) {
      setVisibleMilestone(newlyUnlockedMilestones[0]);
      const timer = setTimeout(() => setVisibleMilestone(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [newlyUnlockedMilestones]);

  if (!visibleMilestone) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-amber-400 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce z-50">
      <p className="font-semibold text-sm">Achievement Unlocked!</p>
      <p className="text-lg">{MILESTONE_LABELS[visibleMilestone] || `${visibleMilestone}-Day Streak`}</p>
    </div>
  );
}