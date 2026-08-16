const Question = require("../models/Question");
const Session = require("../models/Session");

class QuestionService {
  async addQuestionsToSession(sessionId, userId, questions) {
    if (!sessionId || !questions || !Array.isArray(questions)) {
      throw new Error("Invalid or missing input data provided");
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      throw new Error("Requested session could not be found");
    }

    if (session.user.toString() !== userId.toString()) {
      throw new Error("Unauthorized access");
    }

    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    return createdQuestions;
  }

  async togglePin(questionId, userId) {
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }

    const session = await Session.findById(question.session);
    if (!session) {
      throw new Error("Session not found");
    }

    if (session.user.toString() !== userId.toString()) {
      throw new Error("Unauthorized access");
    }

    question.isPinned = !question.isPinned;
    await question.save();
    return question;
  }

  async updateNote(questionId, userId, note) {
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }

    const session = await Session.findById(question.session);
    if (!session) {
      throw new Error("Session not found");
    }

    if (session.user.toString() !== userId.toString()) {
      throw new Error("Unauthorized access");
    }

    question.note = note || "";
    await question.save();
    return question;
  }
}

module.exports = new QuestionService();
