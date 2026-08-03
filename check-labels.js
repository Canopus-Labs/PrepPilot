const https = require("https");
const TOKEN = "REDACTED";
const OWNER = "Canopus-Labs", REPO = "PrepPilot";

function request(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "api.github.com", path, method: "GET",
      headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json", "User-Agent": "label-check" }
    }, (res) => {
      let raw = "";
      res.on("data", c => raw += c);
      res.on("end", () => resolve(JSON.parse(raw)));
    });
    req.on("error", reject);
    req.end();
  });
}

async function main() {
  const prs = await request(`/repos/${OWNER}/${REPO}/pulls?state=open&per_page=100&page=1`);
  // Count label frequency
  const freq = {};
  prs.forEach(pr => pr.labels.forEach(l => { freq[l.name] = (freq[l.name] || 0) + 1; }));
  const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]);
  console.log(`\nLabel frequency across ${prs.length} open PRs:`);
  sorted.forEach(([name, count]) => console.log(`  ${count.toString().padStart(3)}  ${name}`));

  // Show first 5 PRs with their labels
  console.log("\nSample PR labels:");
  prs.slice(0, 5).forEach(pr => {
    console.log(`  #${pr.number} ${pr.title.slice(0,50)}`);
    console.log(`    Labels: ${pr.labels.map(l=>l.name).join(", ") || "(none)"}`);
  });
}
main().catch(console.error);
