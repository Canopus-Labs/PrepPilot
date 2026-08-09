const mongoose = require("mongoose");

const ResumeAnalysisHistorySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        targetRole: { type: String, default: "General" },
        resumeScore: { type: Number, required: true },
        roleMatch: { type: Number, required: true },
        missingSkills: { type: [String], default: [] },
        missingKeywords: { type: [String], default: [] },
        actionVerbs: { type: [String], default: [] },
        formattingIssues: { type: [String], default: [] },
        missingProjects: { type: [String], default: [] },
        atsCompatibility: {
            status: { type: String },
            remarks: { type: String }
        },
        suggestions: { type: [String], default: [] },
        sections: { type: mongoose.Schema.Types.Mixed }
    },
    { timestamps: true }
);

module.exports = mongoose.model("ResumeAnalysisHistory", ResumeAnalysisHistorySchema);
