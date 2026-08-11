const mongoose = require("mongoose");

const googleCalendarTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // Google refresh token encrypted with AES-256-GCM
    // (see backend/utils/encryption.js). Never store it in plain text.
    refreshTokenEnc: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "GoogleCalendarToken",
  googleCalendarTokenSchema,
);
