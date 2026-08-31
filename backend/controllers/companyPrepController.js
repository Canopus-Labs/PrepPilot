const CompanyPrep = require("../models/CompanyPrep");

exports.createCompanyPrep = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await CompanyPrep.countDocuments({ user: userId });
    if (count >= 30) {
      return res.status(400).json({ success: false, message: "Maximum 30 company profiles reached." });
    }
    const doc = await CompanyPrep.create({ user: userId, ...req.validatedBody });
    res.status(201).json({ success: true, companyPrep: doc });
  } catch (error) {
    console.error("Create company prep error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getCompanyPreps = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }
    const docs = await CompanyPrep.find(filter).sort({ priority: -1, createdAt: -1 });
    res.json({ success: true, count: docs.length, companyPreps: docs });
  } catch (error) {
    console.error("Get company preps error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getCompanyPrepById = async (req, res) => {
  try {
    const doc = await CompanyPrep.findOne({ _id: req.params.id, user: req.user._id });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, companyPrep: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateCompanyPrep = async (req, res) => {
  try {
    const doc = await CompanyPrep.findOne({ _id: req.params.id, user: req.user._id });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    Object.assign(doc, req.validatedBody);
    await doc.save();
    res.json({ success: true, companyPrep: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteCompanyPrep = async (req, res) => {
  try {
    const doc = await CompanyPrep.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── Question sub-resource ───────────────────────────────────────────────────

exports.addQuestion = async (req, res) => {
  try {
    const doc = await CompanyPrep.findOne({ _id: req.params.id, user: req.user._id });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    doc.encounteredQuestions.push(req.validatedBody);
    await doc.save();
    res.status(201).json({ success: true, companyPrep: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.toggleQuestionSolved = async (req, res) => {
  try {
    const doc = await CompanyPrep.findOne({ _id: req.params.id, user: req.user._id });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    const q = doc.encounteredQuestions.id(req.params.questionId);
    if (!q) return res.status(404).json({ success: false, message: "Question not found" });
    q.solved = !q.solved;
    await doc.save();
    res.json({ success: true, companyPrep: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.removeQuestion = async (req, res) => {
  try {
    const doc = await CompanyPrep.findOne({ _id: req.params.id, user: req.user._id });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    doc.encounteredQuestions = doc.encounteredQuestions.filter(
      (q) => q._id.toString() !== req.params.questionId
    );
    await doc.save();
    res.json({ success: true, companyPrep: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── Round sub-resource ──────────────────────────────────────────────────────

exports.addRound = async (req, res) => {
  try {
    const doc = await CompanyPrep.findOne({ _id: req.params.id, user: req.user._id });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    doc.rounds.push(req.validatedBody);
    await doc.save();
    res.status(201).json({ success: true, companyPrep: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.toggleRoundComplete = async (req, res) => {
  try {
    const doc = await CompanyPrep.findOne({ _id: req.params.id, user: req.user._id });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    const r = doc.rounds.id(req.params.roundId);
    if (!r) return res.status(404).json({ success: false, message: "Round not found" });
    r.completed = !r.completed;
    await doc.save();
    res.json({ success: true, companyPrep: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── Stats ───────────────────────────────────────────────────────────────────

exports.getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const [total, byStatus, allPreps] = await Promise.all([
      CompanyPrep.countDocuments({ user: userId }),
      CompanyPrep.aggregate([
        { $match: { user: userId } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      CompanyPrep.find({ user: userId }).select("readinessScore encounteredQuestions rounds"),
    ]);

    const statusBreakdown = {};
    for (const s of byStatus) statusBreakdown[s._id] = s.count;

    let totalQuestions = 0;
    let solvedQuestions = 0;
    let avgReadiness = 0;
    let totalRounds = 0;
    let completedRounds = 0;

    for (const p of allPreps) {
      totalQuestions += p.encounteredQuestions.length;
      solvedQuestions += p.encounteredQuestions.filter((q) => q.solved).length;
      avgReadiness += p.readinessScore;
      totalRounds += p.rounds.length;
      completedRounds += p.rounds.filter((r) => r.completed).length;
    }

    res.json({
      success: true,
      stats: {
        total,
        statusBreakdown,
        avgReadiness: total > 0 ? Math.round(avgReadiness / total) : 0,
        totalQuestions,
        solvedQuestions,
        totalRounds,
        completedRounds,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
