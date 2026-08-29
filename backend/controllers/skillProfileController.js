const SkillProfile = require("../models/SkillProfile");

const MAX_SKILLS = 20;
const MAX_SNAPSHOTS = 12;

async function getOrCreateProfile(userId) {
  let profile = await SkillProfile.findOne({ user: userId });
  if (!profile) {
    profile = await SkillProfile.create({ user: userId, skills: [], snapshots: [] });
  }
  return profile;
}

exports.getProfile = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);
    res.json({ success: true, profile });
  } catch (error) {
    console.error("Get skill profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);
    if (profile.skills.length >= MAX_SKILLS) {
      return res.status(400).json({ success: false, message: `Maximum ${MAX_SKILLS} skills allowed` });
    }
    const dup = profile.skills.find((s) => s.name.toLowerCase() === req.validatedBody.name.toLowerCase());
    if (dup) {
      return res.status(400).json({ success: false, message: "Skill already exists" });
    }
    profile.skills.push(req.validatedBody);
    await profile.save();
    res.status(201).json({ success: true, profile });
  } catch (error) {
    console.error("Add skill error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);
    const skill = profile.skills.id(req.params.skillId);
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found" });
    Object.assign(skill, req.validatedBody);
    await profile.save();
    res.json({ success: true, profile });
  } catch (error) {
    console.error("Update skill error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);
    profile.skills = profile.skills.filter((s) => s._id.toString() !== req.params.skillId);
    await profile.save();
    res.json({ success: true, profile });
  } catch (error) {
    console.error("Delete skill error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.setAllSkills = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);
    profile.skills = req.validatedBody.skills;
    await profile.save();
    res.json({ success: true, profile });
  } catch (error) {
    console.error("Set all skills error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.takeSnapshot = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);
    if (profile.skills.length === 0) {
      return res.status(400).json({ success: false, message: "Add skills before taking a snapshot" });
    }
    profile.snapshots.push({
      skills: profile.skills.map((s) => ({
        name: s.name,
        proficiency: s.proficiency,
        category: s.category,
        targetProficiency: s.targetProficiency,
        notes: s.notes,
      })),
    });
    if (profile.snapshots.length > MAX_SNAPSHOTS) {
      profile.snapshots = profile.snapshots.slice(-MAX_SNAPSHOTS);
    }
    await profile.save();
    res.json({ success: true, message: "Snapshot saved", profile });
  } catch (error) {
    console.error("Take snapshot error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);
    res.json({ success: true, snapshots: profile.snapshots });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getGapAnalysis = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);
    const gaps = profile.skills
      .filter((s) => s.targetProficiency > 0 && s.proficiency < s.targetProficiency)
      .map((s) => ({
        name: s.name,
        category: s.category,
        current: s.proficiency,
        target: s.targetProficiency,
        gap: s.targetProficiency - s.proficiency,
      }))
      .sort((a, b) => b.gap - a.gap);

    const avgProficiency =
      profile.skills.length > 0
        ? Math.round((profile.skills.reduce((sum, s) => sum + s.proficiency, 0) / profile.skills.length) * 10) / 10
        : 0;

    const byCategory = {};
    for (const s of profile.skills) {
      if (!byCategory[s.category]) byCategory[s.category] = { total: 0, count: 0, avg: 0 };
      byCategory[s.category].total += s.proficiency;
      byCategory[s.category].count++;
    }
    for (const cat of Object.keys(byCategory)) {
      byCategory[cat].avg = Math.round((byCategory[cat].total / byCategory[cat].count) * 10) / 10;
    }

    res.json({
      success: true,
      analysis: { gaps, avgProficiency, byCategory, totalSkills: profile.skills.length },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
