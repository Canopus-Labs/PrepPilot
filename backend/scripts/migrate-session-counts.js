/**
 * One-time migration: populate sessionCount on User documents
 * from the real Session collection count so that the atomic counter
 * starts from a correct baseline for existing users.
 *
 * Usage:
 *   node backend/scripts/migrate-session-counts.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Session = require("../models/Session");

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected. Starting migration...");

  const users = await User.find({}, "_id").lean();
  let updated = 0;

  for (const user of users) {
    const count = await Session.countDocuments({ user: user._id });
    await User.updateOne({ _id: user._id }, { $set: { sessionCount: count } });
    updated++;
  }

  console.log(`Migration complete. Updated ${updated} users.`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});