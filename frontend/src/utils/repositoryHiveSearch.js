const ISSUE_LABEL_FILTERS = {
  "good-first-issue": ['"good first issue"', "good-first-issue"],
  "beginner-friendly": ['"beginner friendly"', "beginner-friendly", "beginner"],
  "bug-fix": ["bug"],
  documentation: ["documentation"],
  feature: ["enhancement", "feature"],
};

const TOPIC_OR_LANGUAGE_FILTERS = {
  "open-source": "topic:open-source",
  hacktoberfest: "topic:hacktoberfest",
  python: "language:python",
  javascript: "language:javascript",
  java: "language:java",
};

export const FILTER_OPTIONS = [
  {
    id: "good-first-issue",
    label: "Good First Issue",
    topic: "good-first-issue",
  },
  {
    id: "beginner-friendly",
    label: "Beginner Friendly",
    topic: "beginner-friendly",
  },
  { id: "documentation", label: "Documentation", topic: "documentation" },
  { id: "bug-fix", label: "Bug Fix", topic: "bug-fix" },
  { id: "feature", label: "Feature Request", topic: "feature" },
  { id: "open-source", label: "Open Source", topic: "open-source" },
  { id: "hacktoberfest", label: "Hacktoberfest", topic: "hacktoberfest" },
  { id: "python", label: "Python", topic: "language:python" },
  { id: "javascript", label: "JavaScript", topic: "language:javascript" },
  { id: "java", label: "Java", topic: "language:java" },
];

const SORT_MAP = {
  stars: "sort=stars&order=desc",
  recent: "sort=updated&order=desc",
  forks: "sort=forks&order=desc",
};

const ISSUE_SORT_MAP = {
  stars: "sort=reactions&order=desc",
  recent: "sort=updated&order=desc",
  forks: "sort=comments&order=desc",
};

export const usesIssueLabelSearch = (selectedFilters = []) =>
  selectedFilters.some((id) => Boolean(ISSUE_LABEL_FILTERS[id]));

export const buildRepositorySearchQuery = (selectedFilters = [], searchQuery = "") => {
  const parts = [];

  selectedFilters.forEach((filterId) => {
    if (ISSUE_LABEL_FILTERS[filterId]) return;
    if (TOPIC_OR_LANGUAGE_FILTERS[filterId]) {
      parts.push(TOPIC_OR_LANGUAGE_FILTERS[filterId]);
      return;
    }
    const option = FILTER_OPTIONS.find((f) => f.id === filterId);
    if (option?.topic) parts.push(option.topic);
  });

  if (searchQuery.trim()) parts.push(searchQuery.trim());
  return parts.join(" ").trim();
};

export const buildIssueSearchQuery = (selectedFilters = [], searchQuery = "") => {
  const parts = ["is:issue", "is:open"];

  selectedFilters.forEach((filterId) => {
    const labels = ISSUE_LABEL_FILTERS[filterId];
    if (labels) {
      if (labels.length === 1) {
        parts.push(`label:${labels[0]}`);
      } else {
        parts.push(`(${labels.map((label) => `label:${label}`).join(" OR ")})`);
      }
      return;
    }
    if (TOPIC_OR_LANGUAGE_FILTERS[filterId]) {
      parts.push(TOPIC_OR_LANGUAGE_FILTERS[filterId]);
    }
  });

  if (searchQuery.trim()) parts.push(searchQuery.trim());
  return parts.join(" ").trim();
};

export const parseRepoFromIssue = (issue) => {
  const htmlUrl = issue.html_url || "";
  const match = htmlUrl.match(/github\.com\/([^/]+)\/([^/]+)\//);
  if (match) {
    return { owner: match[1], name: match[2], fullName: `${match[1]}/${match[2]}` };
  }

  const repoUrl = issue.repository_url || "";
  const apiMatch = repoUrl.match(/repos\/([^/]+)\/([^/]+)$/);
  if (apiMatch) {
    return {
      owner: apiMatch[1],
      name: apiMatch[2],
      fullName: `${apiMatch[1]}/${apiMatch[2]}`,
    };
  }

  return null;
};

/**
 * Group open labelled issues by repository and keep the first match per repo.
 * Metadata-only repo hits are excluded because every card comes from a real open issue.
 */
export const groupIssuesByRepository = (issues = []) => {
  const repos = new Map();

  for (const issue of issues) {
    if (issue.pull_request) continue;
    if (issue.state && issue.state !== "open") continue;

    const parsed = parseRepoFromIssue(issue);
    if (!parsed) continue;

    if (repos.has(parsed.fullName)) continue;

    const labels = (issue.labels || [])
      .map((label) => (typeof label === "string" ? label : label?.name))
      .filter(Boolean);

    repos.set(parsed.fullName, {
      id: `${parsed.fullName}-${issue.id}`,
      name: parsed.name,
      full_name: parsed.fullName,
      html_url: `https://github.com/${parsed.fullName}`,
      description: issue.body
        ? String(issue.body).replace(/\s+/g, " ").slice(0, 160)
        : null,
      owner: { login: parsed.owner },
      language: null,
      topics: labels.slice(0, 5),
      stargazers_count: issue.reactions?.total_count ?? 0,
      forks_count: 0,
      watchers_count: 0,
      open_issues_count: 1,
      matchingIssue: {
        id: issue.id,
        number: issue.number,
        title: issue.title,
        html_url: issue.html_url,
        labels,
      },
      updated_at: issue.updated_at,
    });
  }

  return Array.from(repos.values());
};

export const buildGitHubSearchUrl = ({
  selectedFilters = [],
  searchQuery = "",
  sortBy = "stars",
  perPage = 30,
} = {}) => {
  if (usesIssueLabelSearch(selectedFilters)) {
    const query = buildIssueSearchQuery(selectedFilters, searchQuery);
    if (!query) return null;
    const sort = ISSUE_SORT_MAP[sortBy] || ISSUE_SORT_MAP.recent;
    return `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&${sort}&per_page=${perPage}`;
  }

  const query = buildRepositorySearchQuery(selectedFilters, searchQuery);
  if (!query) return null;
  const sort = SORT_MAP[sortBy] || SORT_MAP.stars;
  return `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&${sort}&per_page=${perPage}`;
};

export const normalizeSearchResponse = (selectedFilters, data) => {
  if (usesIssueLabelSearch(selectedFilters)) {
    return groupIssuesByRepository(data?.items || []);
  }
  return data?.items || [];
};
