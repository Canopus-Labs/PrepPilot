import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AdaptiveInterview from "../feat-pages/AdaptiveInterview";
import { UserContext } from "../context/userContext";

vi.mock("../utils/axiosinstance", () => ({
  default: {
    post: vi.fn(),
  },
}));

const renderAdaptiveInterview = () =>
  render(
    <UserContext.Provider
      value={{
        user: { _id: "123", name: "Test User" },
        loading: false,
      }}
    >
      <BrowserRouter>
        <AdaptiveInterview />
      </BrowserRouter>
    </UserContext.Provider>
  );

describe("AdaptiveInterview Component", () => {
  it("renders the initial setup form", () => {
    renderAdaptiveInterview();

    expect(screen.getByText("Adaptive AI Interview")).toBeDefined();
    expect(screen.getByLabelText("Target Role")).toBeDefined();
    expect(screen.getByLabelText("Experience Level")).toBeDefined();
    expect(
      screen.getByLabelText("Topics (comma separated)")
    ).toBeDefined();
    expect(screen.getByText("Start Interview")).toBeDefined();
  });
});