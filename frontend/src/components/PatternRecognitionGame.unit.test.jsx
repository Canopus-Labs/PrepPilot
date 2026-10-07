import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import PatternRecognitionGame from "./PatternRecognitionGame";

describe("PatternRecognitionGame component", () => {
  it("renders the start screen with title and start button", () => {
    render(<PatternRecognitionGame />);
    expect(screen.getByText("Number Sequence & Pattern Recognition")).toBeTruthy();
    expect(screen.getByText("Start Challenge")).toBeTruthy();
  });

  it("starts the game and displays Question 1 when Start Challenge is clicked", () => {
    render(<PatternRecognitionGame />);
    const startButton = screen.getByText("Start Challenge");
    fireEvent.click(startButton);

    expect(screen.getByText("Question 1 of 10")).toBeTruthy();
    expect(screen.getByText("Identify the missing element in the sequence")).toBeTruthy();
  });
});
