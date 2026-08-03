const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    // Build topic query: use $in if topics array is non-empty to check set containment,
    // otherwise fallback to matching topicsToFocus if provided
    const topicQuery =
      Array.isArray(topicsToFocus) && topicsToFocus.length > 0
        ? { topicsToFocus: { $in: topicsToFocus } }
        : {};

    // Fetch questions the user has already seen for this role + any matching topics
    const pastSessions = await Session.find({
      user: req.user._id,
      role,
      ...topicQuery,
    }).select("questions");

    const pastQuestionIds = pastSessions.flatMap((s) => s.questions);

    const pastQuestions = await Question.find({
      _id: { $in: pastQuestionIds },
    }).select("question");

    const seenQuestions = pastQuestions.map((q) => q.question);

    // Build prompt with seen questions so Gemini avoids repeating them
    let prompt;
    try {
      prompt = questionAnswerPrompt({
        role,
        experience,
        topicsToFocus,
        numberOfQuestions,
        seenQuestions,
      });
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message,
      });
    }

    const { result, usedModel } = await generateWithFallback(
      process.env.GEMINI_API_KEY,
      [prompt]
    );

    const rawText = await result.response.text();
    let cleanedText = rawText
      .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
      .replace(/(\s*```\s*)+$/i, "")
      .trim();

    try {
      const data = JSON.parse(cleanedText);

      // Validate Gemini response structure
      const questionsSchema = z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      );
      const parsed = questionsSchema.safeParse(Array.isArray(data) ? data : data.questions);
      if (!parsed.success) {
        return res.status(500).json({ message: "Invalid AI response format", details: parsed.error.issues[0]?.message });
      }

      if (Array.isArray(data)) {
        res.status(200).json({ model: usedModel, question: data });
      } else {
        res.status(200).json({ model: usedModel, ...data });
      }
    } catch (err) {
      console.error("Gemini returned invalid JSON:", cleanedText);
      res.status(500).json({
        message: "Gemini returned invalid JSON",
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      message: "Failed to generate questions",
    });
  }
};