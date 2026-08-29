const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  validateAddSkill,
  validateUpdateSkill,
  validateSetAllSkills,
} = require("../Input_validators/ValidateSkillProfile");
const ctrl = require("../controllers/skillProfileController");

router.use(protect);

router.get("/", ctrl.getProfile);
router.post("/", validateAddSkill, ctrl.addSkill);
router.put("/", validateSetAllSkills, ctrl.setAllSkills);
router.put("/:skillId", validateUpdateSkill, ctrl.updateSkill);
router.delete("/:skillId", ctrl.deleteSkill);

router.post("/snapshot", ctrl.takeSnapshot);
router.get("/history", ctrl.getHistory);
router.get("/analysis", ctrl.getGapAnalysis);

module.exports = router;
