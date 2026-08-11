const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

const compileCodeSchema = z.object({
  language_id: z.number().int().positive("Language id is required"),
  source_code: z
    .string()
    .min(1, "Source code is required")
    .max(50000, "Source code must be at most 50000 characters"),
  stdin: z.string().max(10000, "Input must be at most 10000 characters").optional(),
});

const validateCompileCode = (req, res, next) => {
  try {
    req.body = compileCodeSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = { validateCompileCode };
