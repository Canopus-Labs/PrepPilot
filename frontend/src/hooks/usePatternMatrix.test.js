import { act, renderHook } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import {
    usePatternMatrix,
    DIFFICULTY_CONFIGS,
} from "./usePatternMatrix";

vi.mock("../utils/matrixAudio", () => ({
    playCountdownTick: vi.fn(),
    playCorrectTileSound: vi.fn(),
    playWrongTileSound: vi.fn(),
    playLevelWinSound: vi.fn(),
    playGameOverSound: vi.fn(),
    initAudioContext: vi.fn(),
}));

describe("usePatternMatrix", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("initializes with the expected default state", () => {
        const { result, unmount } = renderHook(() => usePatternMatrix());

        expect(result.current.phase).toBe("instructions");
        expect(result.current.difficulty).toBe("medium");
        expect(result.current.paused).toBe(false);

        expect(result.current.gridSize).toBe(4);
        expect(result.current.targetCount).toBe(5);
        expect(result.current.targets).toEqual(new Set());
        expect(result.current.selected).toEqual(new Set());
        expect(result.current.wrongClicks).toEqual(new Set());
        expect(result.current.lives).toBe(3);

        expect(result.current.countdownVal).toBe(3);
        expect(result.current.previewProgress).toBe(100);

        expect(result.current.score).toBe(0);
        expect(result.current.level).toBe(1);
        expect(result.current.streak).toBe(0);
        expect(result.current.maxStreak).toBe(0);
        expect(result.current.highScore).toBe(0);
        expect(result.current.accuracy).toBe(100);
        expect(result.current.timeElapsed).toBe(0);

        unmount();
    });

    it("loads the persisted high score from localStorage", () => {
        localStorage.setItem("matrix_high_score", "1500");

        const { result, unmount } = renderHook(() => usePatternMatrix());

        expect(result.current.highScore).toBe(1500);

        unmount();
    });

    it("exposes the expected difficulty configurations", () => {
        expect(DIFFICULTY_CONFIGS.easy).toMatchObject({
            gridSize: 3,
            targetCount: 3,
            displayDuration: 2500,
            multiplier: 1,
        });

        expect(DIFFICULTY_CONFIGS.medium).toMatchObject({
            gridSize: 4,
            targetCount: 5,
            displayDuration: 1800,
            multiplier: 1.8,
        });

        expect(DIFFICULTY_CONFIGS.hard).toMatchObject({
            gridSize: 5,
            targetCount: 8,
            displayDuration: 1200,
            multiplier: 3.2,
        });

        expect(DIFFICULTY_CONFIGS.extreme).toMatchObject({
            gridSize: 3,
            targetCount: 3,
            displayDuration: 850,
            multiplier: 5,
        });
    });

    it("changes difficulty before starting the game", () => {
        const { result, unmount } = renderHook(() => usePatternMatrix());

        act(() => {
            result.current.setDifficulty("hard");
        });

        expect(result.current.difficulty).toBe("hard");
        expect(result.current.config).toEqual(DIFFICULTY_CONFIGS.hard);

        unmount();
    });

    it("starts the game with the selected difficulty and enters countdown", () => {
        vi.useFakeTimers();

        const { result, unmount } = renderHook(() => usePatternMatrix());

        act(() => {
            result.current.startGame("easy");
        });

        expect(result.current.phase).toBe("countdown");
        expect(result.current.difficulty).toBe("easy");
        expect(result.current.paused).toBe(false);
        expect(result.current.level).toBe(1);
        expect(result.current.score).toBe(0);
        expect(result.current.lives).toBe(3);
        expect(result.current.countdownVal).toBe(3);
        expect(result.current.targets).toEqual(new Set());

        unmount();
    });

    it("progresses through the countdown and generates the preview pattern", () => {
        vi.useFakeTimers();

        const { result, unmount } = renderHook(() => usePatternMatrix());

        act(() => {
            result.current.startGame("easy");
        });

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(result.current.phase).toBe("countdown");
        expect(result.current.countdownVal).toBe(2);

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(result.current.countdownVal).toBe(1);

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(result.current.phase).toBe("preview");
        expect(result.current.targets.size).toBe(4);
        expect(result.current.gridSize).toBe(3);
        expect(result.current.targetCount).toBe(4);
        expect(result.current.selected).toEqual(new Set());
        expect(result.current.wrongClicks).toEqual(new Set());

        unmount();
    });

    it("transitions from preview to playing after the configured display duration", () => {
        vi.useFakeTimers();

        const { result, unmount } = renderHook(() => usePatternMatrix());

        act(() => {
            result.current.startGame("easy");
        });

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.phase).toBe("preview");
        expect(result.current.targets.size).toBe(4);

        act(() => {
            vi.advanceTimersByTime(2500);
        });

        expect(result.current.phase).toBe("playing");
        expect(result.current.targets.size).toBe(4);
        expect(result.current.previewProgress).toBe(0);

        unmount();
    });

    it("selects a correct target tile and updates accuracy", () => {
        vi.useFakeTimers();

        const { result, unmount } = renderHook(() => usePatternMatrix());

        act(() => {
            result.current.startGame("easy");
        });

        act(() => {
            vi.advanceTimersByTime(5500);
        });

        expect(result.current.phase).toBe("playing");

        const targetIndex = [...result.current.targets][0];

        act(() => {
            result.current.handleTileClick(targetIndex);
        });

        expect(result.current.selected).toContain(targetIndex);
        expect(result.current.wrongClicks).toEqual(new Set());
        expect(result.current.lives).toBe(3);
        expect(result.current.accuracy).toBe(100);

        unmount();
    });

    it("handles an incorrect tile click by consuming a life", () => {
        vi.useFakeTimers();

        const { result, unmount } = renderHook(() => usePatternMatrix());

        act(() => {
            result.current.startGame("easy");
        });

        act(() => {
            vi.advanceTimersByTime(5500);
        });

        expect(result.current.phase).toBe("playing");

        const targetSet = result.current.targets;
        let wrongIndex = 0;

        while (targetSet.has(wrongIndex)) {
            wrongIndex += 1;
        }

        act(() => {
            result.current.handleTileClick(wrongIndex);
        });

        expect(result.current.phase).toBe("reveal");
        expect(result.current.wrongClicks).toContain(wrongIndex);
        expect(result.current.lives).toBe(2);
        expect(result.current.streak).toBe(0);
        expect(result.current.accuracy).toBe(0);

        unmount();
    });

    it("pauses and resumes the game", () => {
        vi.useFakeTimers();

        const { result, unmount } = renderHook(() => usePatternMatrix());

        act(() => {
            result.current.startGame("easy");
        });

        act(() => {
            vi.advanceTimersByTime(5500);
        });

        expect(result.current.phase).toBe("playing");

        act(() => {
            result.current.pauseGame();
        });

        expect(result.current.paused).toBe(true);

        const timeBeforePause = result.current.timeElapsed;

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.timeElapsed).toBe(timeBeforePause);

        act(() => {
            result.current.resumeGame();
        });

        expect(result.current.paused).toBe(false);
        expect(result.current.phase).toBe("playing");

        unmount();
    });

    it("quits the game and resets the board state", () => {
        vi.useFakeTimers();

        const { result, unmount } = renderHook(() => usePatternMatrix());

        act(() => {
            result.current.startGame("easy");
        });

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.phase).toBe("preview");
        expect(result.current.targets.size).toBeGreaterThan(0);

        act(() => {
            result.current.quitGame();
        });

        expect(result.current.phase).toBe("instructions");
        expect(result.current.paused).toBe(false);
        expect(result.current.targets).toEqual(new Set());
        expect(result.current.selected).toEqual(new Set());
        expect(result.current.wrongClicks).toEqual(new Set());

        unmount();
    });

    it("calculates accuracy as 100 percent when there are no clicks", () => {
        const { result, unmount } = renderHook(() => usePatternMatrix());

        expect(result.current.accuracy).toBe(100);

        unmount();
    });
});