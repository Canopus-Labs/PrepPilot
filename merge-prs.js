// merge-prs.js — Add labels to all open PRs, then merge them into the temp branch.

const https = require("https");

const TOKEN       = "REDACTED";
const OWNER       = "Canopus-Labs";
const REPO        = "PrepPilot";
const TEMP_BRANCH = "temp";
const BASE_BRANCH = "main";
const LABELS_TO_ADD = [
  "gssoc:approved",
  "level:advanced",
  "quality:exceptional",
  "type:refactor",
  "type:security",
];
const MERGE_METHOD = "squash";

// ── HTTP helper ──────────────────────────────────────────────────────────────
function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: "api.github.com",
      path,
      method,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "PrepPilot-MergePRs/1.0",
        ...(data ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } : {}),
      },
    }, (res) => {
      let raw = "";
      res.on("data", c => raw += c);
      res.on("end", () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, body: raw }); }
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

// ── Fetch all open PRs (paginated) ───────────────────────────────────────────
async function getAllOpenPRs() {
  const all = [];
  let page = 1;
  while (true) {
    const { status, body } = await request("GET", `/repos/${OWNER}/${REPO}/pulls?state=open&per_page=100&page=${page}`);
    if (status !== 200 || !Array.isArray(body) || body.length === 0) break;
    all.push(...body);
    if (body.length < 100) break;
    page++;
  }
  return all;
}

// ── Ensure labels exist on the repo ─────────────────────────────────────────
async function ensureLabelsExist() {
  const colors = {
    "gssoc:approved":     "0075ca",
    "level:advanced":     "e4e669",
    "quality:exceptional":"00b300",
    "type:refactor":      "d93f0b",
    "type:security":      "b60205",
  };
  for (const name of LABELS_TO_ADD) {
    const check = await request("GET", `/repos/${OWNER}/${REPO}/labels/${encodeURIComponent(name)}`);
    if (check.status === 200) continue; // already exists
    const create = await request("POST", `/repos/${OWNER}/${REPO}/labels`, { name, color: colors[name] || "ededed" });
    if (create.status === 201) console.log(`  Created label: ${name}`);
  }
}

// ── Ensure temp branch exists ────────────────────────────────────────────────
async function ensureBranch() {
  const check = await request("GET", `/repos/${OWNER}/${REPO}/git/refs/heads/${TEMP_BRANCH}`);
  if (check.status === 200) { console.log(`✔ Branch '${TEMP_BRANCH}' already exists.`); return; }
  const base = await request("GET", `/repos/${OWNER}/${REPO}/git/refs/heads/${BASE_BRANCH}`);
  if (base.status !== 200) throw new Error(`Cannot get SHA of '${BASE_BRANCH}'`);
  const sha = base.body.object.sha;
  const create = await request("POST", `/repos/${OWNER}/${REPO}/git/refs`, {
    ref: `refs/heads/${TEMP_BRANCH}`, sha,
  });
  if (create.status === 201) console.log(`✔ Created branch '${TEMP_BRANCH}' from '${BASE_BRANCH}' @ ${sha.slice(0,7)}`);
  else throw new Error(`Failed to create branch: ${JSON.stringify(create.body)}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("Ensuring repo labels exist...");
  await ensureLabelsExist();

  console.log("\nFetching all open PRs...");
  const prs = await getAllOpenPRs();
  console.log(`Total open PRs: ${prs.length}`);

  console.log("\nEnsuring temp branch exists...");
  await ensureBranch();

  let success = 0, failed = 0, labeled = 0;

  for (const pr of prs) {
    console.log(`\n─── PR #${pr.number}: ${pr.title.slice(0, 60)}`);

    // 1. Add the 5 labels to the PR
    const addLabels = await request("POST", `/repos/${OWNER}/${REPO}/issues/${pr.number}/labels`, {
      labels: LABELS_TO_ADD,
    });
    if (addLabels.status === 200) {
      console.log(`  ✔ Labels added`);
      labeled++;
    } else {
      console.log(`  ⚠ Labels failed (${addLabels.status}): ${JSON.stringify(addLabels.body)}`);
    }

    // 2. Merge the PR into temp branch
    const merge = await request("PUT", `/repos/${OWNER}/${REPO}/pulls/${pr.number}/merge`, {
      merge_method: MERGE_METHOD,
      commit_title: `[squash] PR #${pr.number}: ${pr.title}`,
    });

    if (merge.status === 200) {
      console.log(`  ✔ Merged`);
      success++;
    } else if (merge.status === 405) {
      console.log(`  ✗ Not mergeable: ${merge.body.message}`);
      failed++;
    } else if (merge.status === 422) {
      console.log(`  ✗ Unprocessable: ${merge.body.message}`);
      failed++;
    } else {
      console.log(`  ✗ Failed (${merge.status}): ${merge.body.message || JSON.stringify(merge.body)}`);
      failed++;
    }
  }

  console.log(`\n${"═".repeat(40)}`);
  console.log(`Total PRs   : ${prs.length}`);
  console.log(`Labels added: ${labeled}`);
  console.log(`✔ Merged    : ${success}`);
  console.log(`✗ Failed    : ${failed}`);
}

main().catch(err => { console.error("Fatal:", err.message); process.exit(1); });
