const mongoose = require("mongoose");

// Tracks in-flight OAuth2 connections so the /callback redirect (which cannot
// carry an Authorization header) can resolve the connecting user securely.
// State values are unguessable, single-use, and expire after 10 minutes.
const googleCalendarAuthStateSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // TTL: 10 minutes
  },
});

module.exports = mongoose.model(
  "GoogleCalendarAuthState",
  googleCalendarAuthStateSchema,
);
