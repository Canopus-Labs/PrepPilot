export const calculateWpm = (correctChars, seconds) => {
  if (!seconds || seconds <= 0 || correctChars <= 0) return 0;
  return Math.round((correctChars / 5) * 60 / seconds);
};

export const calculateAccuracy = (correctChars, totalTyped) => {
  if (totalTyped <= 0) return 100;
  return Math.round((correctChars / totalTyped) * 100);
};

export const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};
