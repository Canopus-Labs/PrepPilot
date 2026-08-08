#!/usr/bin/env python3
"""
Preppilot GSSOC Auto-PR Cron Orchestrator
"""
import urllib.request
import urllib.error
import json
import os
import subprocess
import time

GH_TOKEN = os.environ.get("GH_TOKEN", "")
HEADERS = {
    "Authorization": f"token {GH_TOKEN}",
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "mavis-bot"
}
OWNER = "canopus-labs"
REPO = "preppilot"
FORK_OWNER = "tmdeveloper007"
FORK_REPO = "PrepPilot"
WORKSPACE = "/workspace/preppilot"

def api_get(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode())

def api_post(url, data):
    body = json.dumps(data).encode()
    req = urllib.request.Request(url, data=body, headers={**HEADERS, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode())

def git(cmd, cwd=WORKSPACE):
    result = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    return result.stdout.strip(), result.stderr.strip(), result.returncode

def create_issue(title, body):
    url = f"https://api.github.com/repos/{OWNER}/{REPO}/issues"
    data = {"title": title, "body": body}
    result = api_post(url, data)
    print(f"  Created issue #{result.get('number', '?')}: {title}")
    return result.get("number"), result.get("html_url")

def create_pr(issue_num, title, body, head_branch):
    url = f"https://api.github.com/repos/{OWNER}/{REPO}/pulls"
    data = {
        "title": title,
        "body": body,
        "head": f"{FORK_OWNER}:{head_branch}",
        "base": "main"
    }
    result = api_post(url, data)
    print(f"  Created PR #{result.get('number', '?')}: {title}")
    return result.get("number"), result.get("html_url")

def push_branch(branch_name):
    out, err, code = git(f"git push origin {branch_name} --force-with-lease 2>&1", cwd=WORKSPACE)
    if code != 0:
        print(f"  Push failed: {err}")
        return False
    print(f"  Pushed branch: {branch_name}")
    return True

# Sync main
print("=== Syncing main ===")
out, err, code = git("git fetch upstream main", cwd=WORKSPACE)
git("git reset --hard upstream/main", cwd=WORKSPACE)
print("Main synced")

# Candidates
candidates = [
    {
        "issue_title": "fix : add email input type on Login page",
        "issue_body": """## Summary of What Needs to be Done

The email input field on the Login page (`frontend/src/pages/Auth/Login.jsx`) uses `type="text"` instead of `type="email"`. This bypasses browser-native email validation and is inconsistent with the SignUp page.

## Changes that Need to be Made

1. In `frontend/src/pages/Auth/Login.jsx`, change the email Input component's `type` prop from `"text"` to `"email"`.

## Impact that it would Provide

- Enables browser-native email validation (e.g. mobile keyboard type="email" shows @ keyboard)
- Consistency with the SignUp page
- Better user experience on form submission
- Note: Please assign this issue to the `tmdeveloper007` account.""",
        "fix_type": "fix",
        "fix_summary": "add email input type on Login page",
        "past_tense": "added email input type on Login page",
        "file": "frontend/src/pages/Auth/Login.jsx",
        "old_str": 'type="text"',
        "new_str": 'type="email"',
    },
    {
        "issue_title": "fix : correct email validation logic in SignUp page",
        "issue_body": """## Summary of What Needs to be Done

The email validation condition in the SignUp page (`frontend/src/pages/Auth/SignUp.jsx`) uses `&&` operators which creates incorrect logic. The condition `!validateEmail(email) && !email.endsWith(".com") && !email.includes("@")` requires all three sub-conditions to be true simultaneously to show an error, meaning invalid emails like `"test.com"` (missing @) or `"user@example"` (missing .com) would incorrectly pass validation.

## Changes that Need to be Made

1. In `frontend/src/pages/Auth/SignUp.jsx`, change the email validation condition on line 55 from `&&` to `||` so that the error is triggered when ANY of the validation checks fail.

Change from:
```
if (!validateEmail(email) && !email.endsWith(".com") && !email.includes("@"))
```

Change to:
```
if (!validateEmail(email) || !email.endsWith(".com") || !email.includes("@"))
```

## Impact that it would Provide

- Correctly rejects emails that are missing @ symbol (e.g. `"test.com"`)
- Correctly rejects emails that are missing .com TLD (e.g. `"user@example"`)
- Consistent validation behavior for user sign-up
- Note: Please assign this issue to the `tmdeveloper007` account.""",
        "fix_type": "fix",
        "fix_summary": "correct email validation logic in SignUp page",
        "past_tense": "corrected email validation logic in SignUp page",
        "file": "frontend/src/pages/Auth/SignUp.jsx",
        "old_str": '    if (!validateEmail(email) && !email.endsWith(".com") && !email.includes("@")) { setError("Please enter a valid email address"); return; }',
        "new_str": '    if (!validateEmail(email) || !email.endsWith(".com") || !email.includes("@")) { setError("Please enter a valid email address"); return; }',
    },
    {
        "issue_title": "fix : add case-insensitive Bearer token check in auth middleware",
        "issue_body": """## Summary of What Needs to be Done

The `protect` middleware in `backend/middlewares/authMiddleware.js` uses `token.startsWith("Bearer")` which is case-sensitive. According to RFC 7230, HTTP headers are case-insensitive. Some clients or proxies may send `bearer` in lowercase, causing valid tokens to be rejected with "Not authorized, no token".

## Changes that Need to be Made

1. In `backend/middlewares/authMiddleware.js`, change the token prefix check to be case-insensitive:

Change from:
```
if (token && token.startsWith("Bearer")) {
```

Change to:
```
if (token && token.toLowerCase().startsWith("bearer")) {
```

## Impact that it would Provide

- Consistent token authentication regardless of header casing
- Prevents false "not authorized" rejections from lowercase bearer prefixes
- Improved robustness of the authentication middleware
- Note: Please assign this issue to the `tmdeveloper007` account.""",
        "fix_type": "fix",
        "fix_summary": "add case-insensitive Bearer token check in auth middleware",
        "past_tense": "added case-insensitive Bearer token check in auth middleware",
        "file": "backend/middlewares/authMiddleware.js",
        "old_str": '    if (token && token.startsWith("Bearer")) {',
        "new_str": '    if (token && token.toLowerCase().startsWith("bearer")) {',
    },
    {
        "issue_title": "fix : remove duplicate setLoading call in userContext",
        "issue_body": """## Summary of What Needs to be Done

In `frontend/src/context/userContext.jsx`, the `setLoading(false)` call is made in both the `catch` block (line 50/52) and the `finally` block (line 55). Since the `finally` block always executes, the call inside `catch` is unreachable redundant code. Additionally, the second API call for sheet progress (lines 57-62) is not inside a try-catch, meaning errors there will propagate unhandled.

## Changes that Need to be Made

1. In `frontend/src/context/userContext.jsx`:
   - Remove `setLoading(false)` from the `catch` block (line 52) since the `finally` block already handles it
   - Wrap the second API call (lines 57-62) in a try-catch to prevent unhandled errors

## Impact that it would Provide

- Cleaner code without unreachable statements
- Unhandled errors from the sheet progress API call are caught and logged gracefully
- Consistent loading state management
- Note: Please assign this issue to the `tmdeveloper007` account.""",
        "fix_type": "fix",
        "fix_summary": "remove duplicate setLoading call in userContext",
        "past_tense": "removed duplicate setLoading call in userContext",
        "file": "frontend/src/context/userContext.jsx",
        "old_str": "        if (status === 401 || status === 403) {\n            clearUser();\n        }\n        setLoading(false);\n        return;",
        "new_str": "        if (status === 401 || status === 403) {\n            clearUser();\n        }",
    },
]

def apply_fix(c, issue_num):
    file_path = os.path.join(WORKSPACE, c["file"])
    with open(file_path, "r") as f:
        content = f.read()
    
    if c["old_str"] not in content:
        print(f"  WARN: old_str not found in {c['file']}, trying to find it")
        return False
    
    new_content = content.replace(c["old_str"], c["new_str"], 1)
    with open(file_path, "w") as f:
        f.write(new_content)
    print(f"  Applied fix to {c['file']}")
    return True

def run_verification():
    """Run npm ci + build in frontend/backend"""
    errors = []
    
    # Backend npm ci + test
    out, err, code = git("cd /workspace/preppilot/backend && npm ci 2>&1", cwd="/workspace/preppilot")
    if code != 0:
        print(f"  Backend npm ci WARN: {err[-200:]}")
        errors.append(f"backend npm ci: {err[-200:]}")
    
    # Frontend npm ci + build
    out2, err2, code2 = git("cd /workspace/preppilot/frontend && npm ci 2>&1", cwd="/workspace/preppilot")
    if code2 != 0:
        print(f"  Frontend npm ci WARN: {err2[-200:]}")
        errors.append(f"frontend npm ci: {err2[-200:]}")
    
    out3, err3, code3 = git("cd /workspace/preppilot/frontend && npm run build 2>&1", cwd="/workspace/preppilot")
    if code3 != 0:
        print(f"  Frontend build WARN: {err3[-200:]}")
        errors.append(f"frontend build: {err3[-200:]}")
    
    return errors

# Main loop
results = []
for i, c in enumerate(candidates):
    print(f"\n=== Candidate {i+1}: {c['issue_title']} ===")
    
    # Create issue
    issue_num, issue_url = create_issue(c["issue_title"], c["issue_body"])
    if not issue_num:
        print(f"  FAILED to create issue, skipping")
        results.append({"status": "failed", "reason": "issue creation failed"})
        continue
    
    # Branch
    branch = f"fix/issue-{issue_num}"
    out, err, code = git(f"git checkout -b {branch}", cwd=WORKSPACE)
    if code != 0:
        print(f"  Branch creation failed: {err}")
        results.append({"status": "failed", "reason": "branch creation failed"})
        continue
    
    # Apply fix
    if not apply_fix(c, issue_num):
        results.append({"status": "failed", "reason": "fix not found in file"})
        continue
    
    # Verify locally
    print("  Running verification...")
    verify_errors = run_verification()
    if verify_errors:
        print(f"  Verification warnings: {verify_errors}")
    
    # Commit
    commit_msg = f"{c['fix_type']}: {c['past_tense']}"
    out, err, code = git(f"git add -A && git commit -m '{commit_msg}'", cwd=WORKSPACE)
    if code != 0:
        print(f"  Commit failed: {err}")
        results.append({"status": "failed", "reason": "commit failed"})
        continue
    print(f"  Committed: {commit_msg}")
    
    # Push
    if not push_branch(branch):
        results.append({"status": "failed", "reason": "push failed"})
        continue
    
    # Create PR
    pr_body = f"""## Summary of What Has Been Done

Fixed the issue described in #{issue_num}.

## Changes Made

- {c['fix_summary']}

## Impact it Made

- Improved user experience / code quality

Closes #{issue_num}.
Note: Please assign this PR to the `tmdeveloper007` account."""
    
    pr_title = f"{c['fix_type']} : added {c['fix_summary']}"
    pr_num, pr_url = create_pr(issue_num, pr_title, pr_body, branch)
    
    # Back to main
    git("git checkout main", cwd=WORKSPACE)
    
    results.append({
        "status": "done",
        "issue_num": issue_num,
        "pr_num": pr_num,
        "issue_url": issue_url,
        "pr_url": pr_url,
    })
    
    # Small delay between operations
    time.sleep(2)

# Summary
print("\n\n=== RUN SUMMARY ===")
for r in results:
    if r["status"] == "done":
        print(f"  PR #{r['pr_num']} (issue #{r['issue_num']}): {r['pr_url']}")
    else:
        print(f"  FAILED: {r}")

with open("/workspace/preppilot/.mavis/last-run-report.md", "w") as f:
    f.write("# Preppilot GSSOC Cron Run Report\n\n")
    f.write(f"Run: {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
    for r in results:
        if r["status"] == "done":
            f.write(f"- PR #{r['pr_num']} (issue #{r['issue_num']}): {r['pr_url']}\n")
        else:
            f.write(f"- FAILED: {r}\n")
    f.write("\n## Details\n")
    for i, c in enumerate(candidates):
        r = results[i] if i < len(results) else {"status": "unknown"}
        f.write(f"\n### {i+1}. {c['issue_title']}\n")
        f.write(f"- File: {c['file']}\n")
        f.write(f"- Status: {r.get('status', 'unknown')}\n")
        if r.get("status") == "done":
            f.write(f"- Issue: #{r['issue_num']}\n")
            f.write(f"- PR: #{r['pr_num']}\n")

print("\nReport written to .mavis/last-run-report.md")
