/**
 * Pattern Matrix Memory Audio Synthesizer
 * Synthesizes sound effects natively using the Web Audio API.
 * Features: Countdown ticks, position-based grid tile tones, success arpeggios, and error buzzes.
 */

let audioCtx = null;
let isMuted = false;

/**
 * Lazily initializes and returns the AudioContext.
 * Browsers require a user interaction to activate the audio context.
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
export const setMatrixAudioMuted = (muted) => {
  isMuted = muted;
  if (!muted) {
    initAudioContext();
  }
};

/**
 * Returns the current mute status.
 * @returns {boolean} True if muted, false otherwise.
 */
export const getMatrixAudioMuted = () => {
  return isMuted;
};

/**
 * Core synthesis helper. Plays a wave tone.
 * @param {number} frequency - Tone pitch in Hz.
 * @param {number} durationSec - Tone length in seconds.
 * @param {string} waveType - Wave shape ('sine' | 'triangle' | 'square' | 'sawtooth').
 * @param {number} volume - Volume gain (0.0 to 1.0).
 */
const playTone = (frequency, durationSec = 0.3, waveType = "sine", volume = 0.1) => {
  if (isMuted) return;

  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = waveType;
    oscillator.frequency.value = frequency;

    const now = ctx.currentTime;
    
    // Smooth volume envelope to prevent pops
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + durationSec);
  } catch (error) {
    console.warn("Audio synthesis failed:", error);
  }
};

/**
 * Plays a short, high-pitched tick sound during the countdown phase.
 */
export const playCountdownTick = () => {
  playTone(950, 0.07, "sine", 0.08);
};

/**
 * Plays a click sound for a correct grid tile selection.
 * Pitch changes based on tile index to create melodic feedback.
 * 
 * @param {number} tileIndex - Index of the tile clicked.
 * @param {number} totalTiles - Total tiles in the grid.
 */
export const playCorrectTileSound = (tileIndex, totalTiles = 9) => {
  // Map index to a clean harmonic frequency range between 260Hz (C4) and 600Hz
  const factor = tileIndex / Math.max(1, totalTiles - 1);
  const frequency = 261.63 + factor * 300; // Interpolate between C4 and ~560Hz
  playTone(frequency, 0.18, "sine", 0.12);
};

/**
 * Plays a low, buzzy warning sound when an incorrect tile is clicked.
 */
export const playWrongTileSound = () => {
  playTone(135, 0.35, "triangle", 0.18);
};

/**
 * Plays an arpeggiated major chord melody when the player successfully completes the pattern.
 */
export const playLevelWinSound = () => {
  if (isMuted) return;

  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.value = freq;
      
      const noteStart = now + i * 0.08;
      
      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.08, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(noteStart);
      osc.stop(noteStart + 0.25);
    });
  } catch (error) {
    console.warn("Level win sound failed:", error);
  }
};

/**
 * Plays a downward sliding minor melody when the game ends.
 */
export const playGameOverSound = () => {
  if (isMuted) return;

  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [392.00, 311.13, 261.63]; // G4, Eb4, C4 minor descent
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.value = freq;
      
      const noteStart = now + i * 0.15;
      
      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.1, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(noteStart);
      osc.stop(noteStart + 0.4);
    });
  } catch (error) {
    console.warn("Game over sound failed:", error);
  }
};
