/**
 * Memory Match Audio Synthesizer
 * Uses native Web Audio API to create clean, responsive audio feedback for gameplay.
 * Tones: Card flip swoosh, correct match chimes, mismatch buzz, and victory fanfare.
 */

let audioCtx = null;
let isMuted = false;

/**
 * Lazily initializes and returns the AudioContext.
 * Requires user gesture to activate in modern browsers.
 */
export const initAudioContext = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

/**
 * Sets the mute status of the audio synthesizer.
 * @param {boolean} muted - True to mute audio, false to unmute.
 */
export const setMatchAudioMuted = (muted) => {
  isMuted = muted;
  if (!muted) {
    initAudioContext();
  }
};

/**
 * Returns the current mute status.
 * @returns {boolean} True if muted, false otherwise.
 */
export const getMatchAudioMuted = () => {
  return isMuted;
};

/**
 * Plays a frequency sliding sound for card flips.
 * Creates an organic "whoosh" slide.
 */
export const playCardFlipSound = () => {
  if (isMuted) return;

  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;

    // Pitch sweep: 300Hz to 650Hz
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(650, now + 0.12);

    // Volume envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch (error) {
    console.warn("Flip sound failed:", error);
  }
};

/**
 * Plays a bright rising major chime on matching cards.
 */
export const playMatchSuccessSound = () => {
  if (isMuted) return;

  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Notes: E5 (659.25 Hz) then G5 (783.99 Hz)
    const notes = [659.25, 783.99];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      const noteStart = now + idx * 0.07;

      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.08, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + 0.22);
    });
  } catch (error) {
    console.warn("Success sound failed:", error);
  }
};

/**
 * Plays a short low hum when cards do not match.
 */
export const playMatchWrongSound = () => {
  if (isMuted) return;

  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = 145; // Low pitch hum

    const now = ctx.currentTime;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  } catch (error) {
    console.warn("Wrong sound failed:", error);
  }
};

/**
 * Plays a major scale victory arpeggio sweep upon completing the board.
 */
export const playVictorySound = () => {
  if (isMuted) return;

  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Notes: C5, E5, G5, C6, E6, G6
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      const noteStart = now + idx * 0.09;

      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.08, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + 0.4);
    });
  } catch (error) {
    console.warn("Victory sound failed:", error);
  }
};
