import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
    useMemoryMatch,
    DIFFICULTY_CONFIGS,
} from "./useMemoryMatch";
import { act, renderHook } from "@testing-library/react";

vi.mock("../utils/matchAudio", () => ({
    playCardFlipSound: vi.fn(),
    playMatchSuccessSound: vi.fn(),
    playMatchWrongSound: vi.fn(),
    playVictorySound: vi.fn(),
    initAudioContext: vi.fn(),
}));

vi.mock("../utils/dailySeed", () => ({
    getDailySeed: vi.fn(() => 12345),
}));


describe("useMemoryMatch", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("initializes with the expected default state", () => {
        const { result, unmount } = renderHook(() => useMemoryMatch());

        expect(result.current.phase).toBe("instructions");
        expect(result.current.difficulty).toBe("medium");
        expect(result.current.paused).toBe(false);
        expect(result.current.dailyChallenge).toBe(false);
        expect(result.current.cards).toEqual([]);
        expect(result.current.flippedIndices).toEqual([]);
        expect(result.current.moves).toBe(0);
        expect(result.current.score).toBe(0);
        expect(result.current.combo).toBe(1);
        expect(result.current.maxCombo).toBe(1);
        expect(result.current.stars).toBe(3);
        expect(result.current.wrongMoves).toBe(0);
        expect(result.current.timeElapsed).toBe(0);
        expect(result.current.highScore).toBe(0);
        expect(result.current.achievements).toEqual([]);
        expect(result.current.perfectGame).toBe(false);

        unmount();
    });

    it("loads the persisted high score from localStorage", () => {
        localStorage.setItem("memory_match_high_score", "2500");

        const { result, unmount } = renderHook(() => useMemoryMatch());

        expect(result.current.highScore).toBe(2500);

        unmount();
    });

    it("exposes the expected difficulty configurations", () => {
        expect(DIFFICULTY_CONFIGS.easy).toMatchObject({
            rows: 4,
            cols: 4,
            pairs: 8,
            multiplier: 1,
        });

        expect(DIFFICULTY_CONFIGS.medium).toMatchObject({
            rows: 5,
            cols: 4,
            pairs: 10,
            multiplier: 1.8,
        });

        expect(DIFFICULTY_CONFIGS.hard).toMatchObject({
            rows: 6,
            cols: 6,
            pairs: 18,
            multiplier: 3.5,
        });

        expect(DIFFICULTY_CONFIGS.extreme).toMatchObject({
            rows: 6,
            cols: 6,
            pairs: 18,
            multiplier: 5.5,
        });
    });

    it("starts a game with the selected difficulty", () => {
        const { result, unmount } = renderHook(() => useMemoryMatch());

        act(() => {
            result.current.startGame("easy", false);
        });

        expect(result.current.phase).toBe("playing");
        expect(result.current.difficulty).toBe("easy");
        expect(result.current.dailyChallenge).toBe(false);
        expect(result.current.paused).toBe(false);
        expect(result.current.moves).toBe(0);
        expect(result.current.score).toBe(0);
        expect(result.current.wrongMoves).toBe(0);
        expect(result.current.timeElapsed).toBe(0);
        expect(result.current.cards).toHaveLength(16);
        expect(result.current.rowsCount).toBe(4);
        expect(result.current.colsCount).toBe(4);

        unmount();
    });

    it("creates matching pairs when starting a game", () => {
        const { result, unmount } = renderHook(() => useMemoryMatch());

        act(() => {
            result.current.startGame("easy", false);
        });

        const counts = result.current.cards.reduce((map, card) => {
            map[card.iconIndex] = (map[card.iconIndex] || 0) + 1;
            return map;
        }, {});

        expect(Object.values(counts)).toEqual(
            expect.arrayContaining(Array(8).fill(2))
        );
        expect(Object.keys(counts)).toHaveLength(8);

        expect(
            result.current.cards.every(
                (card) =>
                    typeof card.id === "number" &&
                    typeof card.iconIndex === "number" &&
                    card.isFlipped === false &&
                    card.isMatched === false
            )
        ).toBe(true);

        unmount();
    });

    it("updates elapsed time while the game is active", () => {
        vi.useFakeTimers();

        const { result, unmount } = renderHook(() => useMemoryMatch());

        act(() => {
            result.current.startGame("easy", false);
        });

        expect(result.current.timeElapsed).toBe(0);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.timeElapsed).toBe(3);

        unmount();
    });

    it("pauses and resumes the game timer", () => {
        vi.useFakeTimers();

        const { result, unmount } = renderHook(() => useMemoryMatch());

        act(() => {
            result.current.startGame("easy", false);
        });

        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(result.current.timeElapsed).toBe(2);

        act(() => {
            result.current.pauseGame();
        });

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.timeElapsed).toBe(2);
        expect(result.current.paused).toBe(true);

        act(() => {
            result.current.resumeGame();
        });

        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(result.current.timeElapsed).toBe(4);
        expect(result.current.paused).toBe(false);

        unmount();
    });

    it("quits the game and returns to the instructions phase", () => {
        const { result, unmount } = renderHook(() => useMemoryMatch());

        act(() => {
            result.current.startGame("easy", false);
        });

        expect(result.current.phase).toBe("playing");
        expect(result.current.cards).not.toEqual([]);

        act(() => {
            result.current.quitGame();
        });

        expect(result.current.phase).toBe("instructions");
        expect(result.current.paused).toBe(false);
        expect(result.current.cards).toEqual([]);
        expect(result.current.flippedIndices).toEqual([]);

        unmount();
    });

    it("calculates 100 percent accuracy when no moves have been made", () => {
        const { result, unmount } = renderHook(() => useMemoryMatch());

        expect(result.current.accuracy).toBe(100);

        unmount();
    });

    it("allows the difficulty to be changed before starting", () => {
        const { result, unmount } = renderHook(() => useMemoryMatch());

        act(() => {
            result.current.setDifficulty("hard");
        });

        expect(result.current.difficulty).toBe("hard");
        expect(result.current.config).toEqual(DIFFICULTY_CONFIGS.hard);

        unmount();
    });
});