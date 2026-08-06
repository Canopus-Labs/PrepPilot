import { describe, it, expect } from "vitest";
import {
  buildGitHubSearchUrl,
  buildIssueSearchQuery,
  groupIssuesByRepository,
  normalizeSearchResponse,
  usesIssueLabelSearch,
} from "./repositoryHiveSearch";

describe("repositoryHiveSearch", () => {
  it("routes Good First Issue through the issues search API", () => {
    expect(usesIssueLabelSearch(["good-first-issue"])).toBe(true);

    const url = buildGitHubSearchUrl({
      selectedFilters: ["good-first-issue"],
      sortBy: "recent",
    });

    expect(url).toContain("https://api.github.com/search/issues?");
    expect(decodeURIComponent(url)).toContain('label:"good first issue"');
    expect(decodeURIComponent(url)).toContain("is:open");
    expect(decodeURIComponent(url)).toContain("is:issue");
  });

  it("keeps non-label filters on the repositories search API", () => {
    const url = buildGitHubSearchUrl({
      selectedFilters: ["python"],
      searchQuery: "django",
      sortBy: "stars",
    });

    expect(url).toContain("https://api.github.com/search/repositories?");
    expect(decodeURIComponent(url)).toContain("language:python");
    expect(decodeURIComponent(url)).toContain("django");
  });

  it("ignores metadata-only repository matches by requiring open labelled issues", () => {
    const issues = [
      {
        id: 1,
        number: 10,
        title: "Add docs for beginners",
        html_url: "https://github.com/acme/alpha/issues/10",
        state: "open",
        labels: [{ name: "good first issue" }],
        reactions: { total_count: 3 },
      },
      {
        id: 2,
        number: 11,
        title: "Closed starter task",
        html_url: "https://github.com/acme/beta/issues/11",
        state: "closed",
        labels: [{ name: "good first issue" }],
      },
      {
        id: 3,
        number: 12,
        title: "Another starter in alpha",
        html_url: "https://github.com/acme/alpha/issues/12",
        state: "open",
        labels: [{ name: "good first issue" }],
      },
    ];

    const grouped = groupIssuesByRepository(issues);

    expect(grouped).toHaveLength(1);
    expect(grouped[0].full_name).toBe("acme/alpha");
    expect(grouped[0].matchingIssue).toEqual(
      expect.objectContaining({
        number: 10,
        title: "Add docs for beginners",
        html_url: "https://github.com/acme/alpha/issues/10",
      }),
    );
  });

  it("skips pull requests and supports multiple label variants", () => {
    const query = buildIssueSearchQuery(["good-first-issue", "python"], "help");
    expect(query).toContain("language:python");
    expect(query).toContain("help");
    expect(query).toContain('label:"good first issue"');
    expect(query).toContain("label:good-first-issue");

    const grouped = groupIssuesByRepository([
      {
        id: 9,
        number: 9,
        title: "PR disguised as issue",
        html_url: "https://github.com/acme/gamma/pull/9",
        state: "open",
        pull_request: { url: "https://api.github.com/repos/acme/gamma/pulls/9" },
        labels: [{ name: "good first issue" }],
      },
    ]);

    expect(grouped).toHaveLength(0);
  });

  it("returns an empty list for a clear no-results state", () => {
    expect(normalizeSearchResponse(["good-first-issue"], { items: [] })).toEqual(
      [],
    );
  });
});
