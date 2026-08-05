import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";

// ─── Real model pre('save') hook test (no mocks, no DB) ──────────────────────
// Runs the exact kareem middleware call mongoose itself makes when a document
// is saved (mongoose/lib/model.js buildPreSavePromise:
//   document.schema.s.hooks.execPre('save', document, [options], cb)
// ) against a real User document with the real pre('save') hook that hashes
// passwords.
//
// The unit tests mock User.create / User.save, so they could never catch the
// double-hashing bug from #1263 where the controller pre-hashed the password
// and the schema hook hashed the already-hashed value a second time.

const runPreSave = (doc) =>
  new Promise((resolve, reject) => {
    doc.schema.s.hooks.execPre("save", doc, [{}], (err) =>
      err ? reject(err) : resolve()
    );
  });

describe("User pre('save') password hashing (real model, no mocks)", () => {
  it("hashes the plaintext password exactly once so bcrypt.compare succeeds", async () => {
    const { default: User } = await import("../models/User.js");
    const plaintext = "Str0ng!Passw0rd";

    const user = new User({
      name: "Hook Test",
      email: "hook-test@example.com",
      password: plaintext,
    });

    await runPreSave(user);

    // The stored value must be a bcrypt hash (not the plaintext) and must
    // verify against the plaintext. If the value were hashed twice, this
    // comparison would fail — exactly the #1263 login bug.
    expect(user.password).not.toBe(plaintext);
    expect(user.password).toMatch(/^\$2[aby]\$/);
    expect(await bcrypt.compare(plaintext, user.password)).toBe(true);
  });

  it("hashes a changed password exactly once via the save middleware", async () => {
    const { default: User } = await import("../models/User.js");
    const user = new User({
      name: "Hook Test 2",
      email: "hook-test-2@example.com",
      password: "OldPass123!",
    });
    await runPreSave(user);

    const newPassword = "N3w!Passw0rd";
    user.password = newPassword;
    await runPreSave(user);

    expect(user.password).not.toBe(newPassword);
    expect(user.password).toMatch(/^\$2[aby]\$/);
    expect(await bcrypt.compare(newPassword, user.password)).toBe(true);
    expect(await bcrypt.compare("OldPass123!", user.password)).toBe(false);
  });
});
