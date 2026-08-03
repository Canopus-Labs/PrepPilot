const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    const prompt = conceptExplainPrompt(question);

    const { result, usedModel } = await generateWithFallback(
      process.env.GEMINI_API_KEY,
      [prompt]
    );

    const rawText = await result.response.text();
    // Clean: repeatedly remove all leading/trailing code block markers across all endpoints uniformly
    let cleanedText = rawText
      .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
      .replace(/(\s*```\s*)+$/i, "")
      .trim();

    try {
      const data = JSON.parse(cleanedText);

      // Validate Gemini response structure
      const explanationSchema = z.object({
        title: z.string(),
        explanation: z.string(),
      });
      const parsed = explanationSchema.safeParse(data);
      if (!parsed.success) {
        return res.status(500).json({ message: "Invalid AI response format", details: parsed.error.issues[0]?.message });
      }

      res.status(200).json({ model: usedModel, ...data });
    } catch (err) {
      res.status(500).json({
        message: "Gemini returned invalid JSON",
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      message: "Failed to generate explanation",
    });
  }
};