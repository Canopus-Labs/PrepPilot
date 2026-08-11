const crypto = require("crypto");

// Google refresh tokens are long-lived credentials, so they are encrypted at
// rest with AES-256-GCM before being persisted. The key is derived from the
// GOOGLE_CALENDAR_ENCRYPTION_KEY secret so any strong random string works.
const getEncryptionKey = () => {
  const secret =
    process.env.GOOGLE_CALENDAR_ENCRYPTION_KEY || "preppilot-google-calendar";
  return crypto.createHash("sha256").update(secret).digest();
};

const encrypt = (plaintext) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(String(plaintext), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}:${tag.toString("base64")}:${ciphertext.toString("base64")}`;
};

const decrypt = (token) => {
  const [iv, tag, data] = String(token).split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(data, "base64")),
    decipher.final(),
  ]);
  return plaintext.toString("utf8");
};

module.exports = { encrypt, decrypt };
