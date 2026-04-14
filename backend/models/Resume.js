const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        latexCode: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
