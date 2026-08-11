const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

const createGoogleCalendarEventSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(2000).optional().default(""),
  startTime: z.string().datetime({ offset: true }),
  endTime: z.string().datetime({ offset: true }),
  reminderMinutes: z.number().int().min(0).max(60).optional().default(15),
});

const validateCreateGoogleCalendarEvent = (req, res, next) => {
  try {
    req.body = createGoogleCalendarEventSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = { validateCreateGoogleCalendarEvent };
