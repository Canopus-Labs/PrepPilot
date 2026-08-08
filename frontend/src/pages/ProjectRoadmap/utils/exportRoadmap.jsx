// Builds a Markdown document from a saved roadmap and triggers a download.
export function exportRoadmapAsMarkdown(roadmap) {
  const lines = [];
  lines.push(`# ${roadmap.projectIdea}`);
  lines.push("");
  lines.push(`_Progress: ${roadmap.progressPercent || 0}% • Status: ${roadmap.status || "planning"}_`);
  lines.push("");

  if (roadmap.overview) {
    lines.push("## Overview");
    lines.push(roadmap.overview);
    lines.push("");
  }

  const ts = roadmap.techStack || {};
  if (ts.frontend?.length || ts.backend?.length || ts.database?.length || ts.other?.length) {
    lines.push("## Tech Stack");
    if (ts.frontend?.length) lines.push(`- **Frontend:** ${ts.frontend.join(", ")}`);
    if (ts.backend?.length) lines.push(`- **Backend:** ${ts.backend.join(", ")}`);
    if (ts.database?.length) lines.push(`- **Database:** ${ts.database.join(", ")}`);
    if (ts.other?.length) lines.push(`- **Other:** ${ts.other.join(", ")}`);
    lines.push("");
  }

  if (roadmap.uiUxRecommendations?.length) {
    lines.push("## UI/UX Recommendations");
    roadmap.uiUxRecommendations.forEach((r) => lines.push(`- ${r}`));
    lines.push("");
  }

  if (roadmap.milestones?.length) {
    lines.push("## Development Roadmap");
    roadmap.milestones.forEach((m, i) => {
      lines.push(`### ${i + 1}. ${m.title} ${m.completed ? "✅" : ""}`);
      if (m.description) lines.push(m.description);
      (m.subtasks || []).forEach((s) => {
        lines.push(`- [${s.completed ? "x" : " "}] ${s.title}`);
        if (s.notes) lines.push(`  - Note: ${s.notes}`);
      });
      if (m.notes) lines.push(`> Note: ${m.notes}`);
      lines.push("");
    });
  }

  const fp = roadmap.featurePrioritization || {};
  if (fp.mvp?.length || fp.future?.length) {
    lines.push("## Feature Prioritization");
    if (fp.mvp?.length) {
      lines.push("**MVP:**");
      fp.mvp.forEach((f) => lines.push(`- ${f}`));
    }
    if (fp.future?.length) {
      lines.push("**Future Enhancements:**");
      fp.future.forEach((f) => lines.push(`- ${f}`));
    }
    lines.push("");
  }

  if (roadmap.databaseApiSuggestions?.length) {
    lines.push("## Database / API Suggestions");
    roadmap.databaseApiSuggestions.forEach((s) => lines.push(`- ${s}`));
    lines.push("");
  }

  if (roadmap.deploymentRecommendations?.length) {
    lines.push("## Deployment Recommendations");
    roadmap.deploymentRecommendations.forEach((s) => lines.push(`- ${s}`));
    lines.push("");
  }

  if (roadmap.testingChecklist?.length) {
    lines.push("## Testing Checklist");
    roadmap.testingChecklist.forEach((t) => {
      lines.push(`- [${t.completed ? "x" : " "}] ${t.title}`);
    });
    lines.push("");
  }

  const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(roadmap.projectIdea || "roadmap").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-roadmap.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────
// PDF export
// ─────────────────────────────────────────────────────────
// This used to rasterize the live DOM with html2pdf.js (html2canvas under the
// hood). That approach is fragile in two ways: (1) it depends on an external
// package that may not be installed/bundled, and (2) html2canvas cannot parse
// modern CSS color functions like oklch()/color-mix() that Tailwind emits,
// which throws and aborts the export with no useful message — exactly the
// silent "Failed to export PDF" toast this was producing.
//
// Instead, build a clean, self-contained HTML document straight from the
// roadmap data (no DOM cloning, no canvas, no extra dependency) and hand it
// to the browser's own print pipeline, where the user picks "Save as PDF".
// This can't fail on unsupported CSS, works in every modern browser, and
// produces crisp, selectable text instead of a rasterized image.
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildRoadmapPrintHtml(roadmap) {
  const ts = roadmap.techStack || {};
  const fp = roadmap.featurePrioritization || {};
  const esc = escapeHtml;

  const techStackBlock =
    ts.frontend?.length || ts.backend?.length || ts.database?.length || ts.other?.length
      ? `<h2>Tech Stack</h2><ul>
          ${ts.frontend?.length ? `<li><strong>Frontend:</strong> ${esc(ts.frontend.join(", "))}</li>` : ""}
          ${ts.backend?.length ? `<li><strong>Backend:</strong> ${esc(ts.backend.join(", "))}</li>` : ""}
          ${ts.database?.length ? `<li><strong>Database:</strong> ${esc(ts.database.join(", "))}</li>` : ""}
          ${ts.other?.length ? `<li><strong>Other:</strong> ${esc(ts.other.join(", "))}</li>` : ""}
        </ul>`
      : "";

  const uiUxBlock = roadmap.uiUxRecommendations?.length
    ? `<h2>UI/UX Recommendations</h2><ul>${roadmap.uiUxRecommendations
        .map((r) => `<li>${esc(r)}</li>`)
        .join("")}</ul>`
    : "";

  const milestonesBlock = roadmap.milestones?.length
    ? `<h2>Development Roadmap</h2>${roadmap.milestones
        .map(
          (m, i) => `
          <div class="milestone">
            <h3>${i + 1}. ${esc(m.title)} ${m.completed ? "✓" : ""}</h3>
            ${m.description ? `<p class="muted">${esc(m.description)}</p>` : ""}
            ${
              m.subtasks?.length
                ? `<ul class="checklist">${m.subtasks
                    .map(
                      (s) =>
                        `<li>${s.completed ? "☑" : "☐"} ${esc(s.title)}${
                          s.notes ? ` <span class="muted">— ${esc(s.notes)}</span>` : ""
                        }</li>`
                    )
                    .join("")}</ul>`
                : ""
            }
            ${m.notes ? `<p class="note">Note: ${esc(m.notes)}</p>` : ""}
          </div>`
        )
        .join("")}`
    : "";

  const featurePrioritizationBlock =
    fp.mvp?.length || fp.future?.length
      ? `<h2>Feature Prioritization</h2>
        <div class="two-col">
          <div>
            <h4>MVP</h4>
            <ul>${(fp.mvp || []).map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
          </div>
          <div>
            <h4>Future Enhancements</h4>
            <ul>${(fp.future || []).map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
          </div>
        </div>`
      : "";

  const dbApiBlock = roadmap.databaseApiSuggestions?.length
    ? `<h2>Database / API Suggestions</h2><ul>${roadmap.databaseApiSuggestions
        .map((s) => `<li>${esc(s)}</li>`)
        .join("")}</ul>`
    : "";

  const deploymentBlock = roadmap.deploymentRecommendations?.length
    ? `<h2>Deployment Recommendations</h2><ul>${roadmap.deploymentRecommendations
        .map((s) => `<li>${esc(s)}</li>`)
        .join("")}</ul>`
    : "";

  const testingBlock = roadmap.testingChecklist?.length
    ? `<h2>Testing Checklist</h2><ul class="checklist">${roadmap.testingChecklist
        .map((t) => `<li>${t.completed ? "☑" : "☐"} ${esc(t.title)}</li>`)
        .join("")}</ul>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${esc(roadmap.projectIdea || "Roadmap")}</title>
<style>
  @page { margin: 0.6in; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    color: #1f2937;
    line-height: 1.5;
    padding: 0 4px;
  }
  h1 { font-size: 22px; margin: 0 0 4px; }
  h2 { font-size: 15px; margin: 22px 0 8px; padding-bottom: 4px; border-bottom: 1px solid #e5e7eb; page-break-after: avoid; }
  h3 { font-size: 13px; margin: 14px 0 2px; page-break-after: avoid; }
  h4 { font-size: 12px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.03em; color: #6b7280; }
  p { margin: 4px 0; font-size: 12.5px; }
  ul { margin: 4px 0; padding-left: 20px; }
  li { font-size: 12.5px; margin: 2px 0; }
  ul.checklist { list-style: none; padding-left: 4px; }
  .meta { color: #6b7280; font-size: 12px; margin-bottom: 4px; }
  .muted { color: #6b7280; }
  .note { font-size: 11.5px; font-style: italic; color: #6b7280; }
  .milestone { margin-bottom: 10px; page-break-inside: avoid; }
  .two-col { display: flex; gap: 24px; }
  .two-col > div { flex: 1; }
</style>
</head>
<body>
  <h1>${esc(roadmap.projectIdea || "Project Roadmap")}</h1>
  <p class="meta">Progress: ${roadmap.progressPercent || 0}% &bull; Status: ${esc(roadmap.status || "planning")}</p>
  ${roadmap.overview ? `<p>${esc(roadmap.overview)}</p>` : ""}
  ${techStackBlock}
  ${uiUxBlock}
  ${milestonesBlock}
  ${featurePrioritizationBlock}
  ${dbApiBlock}
  ${deploymentBlock}
  ${testingBlock}
</body>
</html>`;
}

export async function exportRoadmapAsPDF(roadmap) {
  if (!roadmap) throw new Error("No roadmap to export.");

  const html = buildRoadmapPrintHtml(roadmap);

  // Print from a hidden iframe rather than a new tab/window: it can't be
  // blocked by popup blockers and it's cleaned up automatically afterwards.
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const cleanup = () => {
    if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
  };

  return new Promise((resolve, reject) => {
    try {
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();

      iframe.onload = () => {
        try {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          // Give the browser's print dialog a moment to open before we tear
          // down the iframe (some browsers render it lazily).
          setTimeout(() => {
            cleanup();
            resolve();
          }, 500);
        } catch (err) {
          cleanup();
          reject(err);
        }
      };
    } catch (err) {
      cleanup();
      reject(err);
    }
  });
}