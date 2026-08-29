const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  validateCreateCompanyPrep,
  validateUpdateCompanyPrep,
  validateAddQuestion,
  validateAddRound,
} = require("../Input_validators/ValidateCompanyPrep");
const ctrl = require("../controllers/companyPrepController");

router.use(protect);

router.post("/", validateCreateCompanyPrep, ctrl.createCompanyPrep);
router.get("/", ctrl.getCompanyPreps);
router.get("/stats", ctrl.getStats);
router.get("/:id", ctrl.getCompanyPrepById);
router.put("/:id", validateUpdateCompanyPrep, ctrl.updateCompanyPrep);
router.delete("/:id", ctrl.deleteCompanyPrep);

// Question sub-resource
router.post("/:id/questions", validateAddQuestion, ctrl.addQuestion);
router.patch("/:id/questions/:questionId/toggle-solved", ctrl.toggleQuestionSolved);
router.delete("/:id/questions/:questionId", ctrl.removeQuestion);

// Round sub-resource
router.post("/:id/rounds", validateAddRound, ctrl.addRound);
router.patch("/:id/rounds/:roundId/toggle-complete", ctrl.toggleRoundComplete);

module.exports = router;
