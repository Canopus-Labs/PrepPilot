import express from "express";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import booksRoutes from "../routes/booksRoutes.js";

function buildApp() {
  const app = express();
  app.use("/api/books", booksRoutes);
  return app;
}

function buildPath(rawUrl) {
  return `/api/books/download?${new URLSearchParams({ url: rawUrl }).toString()}`;
}

let server;
let baseUrl;

beforeAll(async () => {
  const app = buildApp();
  server = app.listen(0);

  await new Promise((resolve) => {
    server.once("listening", resolve);
  });

  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

afterAll(async () => {
  if (!server) {
    return;
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
});

describe("books download redirect validation", () => {
  it("redirects allowed raw GitHub download URLs", async () => {
    const allowedUrl = "https://raw.githubusercontent.com/owner/repo/main/file.pdf";

    const response = await fetch(`${baseUrl}${buildPath(allowedUrl)}`, {
      redirect: "manual",
    });

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(allowedUrl);
  });

  it("blocks non-allowlisted hosts", async () => {
    const response = await fetch(`${baseUrl}${buildPath("https://evil.com/file.pdf")}`, {
      redirect: "manual",
    });

    expect(response.status).toBe(403);
  });

  it("blocks non-https raw GitHub URLs", async () => {
    const response = await fetch(
      `${baseUrl}${buildPath("http://raw.githubusercontent.com/file.pdf")}`,
      {
        redirect: "manual",
      }
    );

    expect(response.status).toBe(403);
  });

  it("rejects malformed URLs", async () => {
    const response = await fetch(`${baseUrl}${buildPath("not-a-url")}`, {
      redirect: "manual",
    });

    expect(response.status).toBe(400);
  });

  it("rejects javascript URLs", async () => {
    const response = await fetch(`${baseUrl}${buildPath("javascript:alert(1)")}`, {
      redirect: "manual",
    });

    expect([400, 403]).toContain(response.status);
  });
});
