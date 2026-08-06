const mongoose = require("mongoose");

// Per-user counter backing the MAX_SESSIONS cap. The _id is the owning
// user's _id, so the limit check in createSession can run as a single atomic
// conditional increment (findOneAndUpdate) instead of a racy count-then-insert.
const sessionCountSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    count: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SessionCount", sessionCountSchema);
