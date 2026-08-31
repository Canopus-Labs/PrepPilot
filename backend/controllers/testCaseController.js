const TestCase = require('../models/TestCase');
const ExecutionHistory = require('../models/ExecutionHistory');
const Question = require('../models/Question');
const Session = require('../models/Session');

/**
 * @desc    Create a new custom test case
 * @route   POST /api/test-cases
 * @access  Private
 */
const createTestCase = async (req, res) => {
  try {
    const { questionId, sessionId, input, expectedOutput, isDefault } = req.body;
    const userId = req.user.id;

    if (questionId) {
      const question = await Question.findById(questionId);
      if (!question) return res.status(404).json({ success: false, message: 'Question not found' });
    }

    if (sessionId) {
      const session = await Session.findOne({ _id: sessionId, userId });
      if (!session) return res.status(404).json({ success: false, message: 'Session not found or access denied' });
    }

    const newTestCase = new TestCase({
      userId,
      questionId: questionId || null,
      sessionId: sessionId || null,
      input,
      expectedOutput,
      isDefault: isDefault || false
    });

    const savedTestCase = await newTestCase.save();
    res.status(201).json({ success: true, data: savedTestCase });
  } catch (error) {
    console.error('Error creating test case:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get test cases for a question or session
 * @route   GET /api/test-cases
 * @access  Private
 */
const getTestCases = async (req, res) => {
  try {
    const userId = req.user.id;
    const { questionId, sessionId } = req.query;

    const query = { userId, isActive: true };
    if (questionId) query.questionId = questionId;
    if (sessionId) query.sessionId = sessionId;

    const testCases = await TestCase.find(query).sort({ isDefault: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: testCases.length, data: testCases });
  } catch (error) {
    console.error('Error fetching test cases:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Save code execution history
 * @route   POST /api/execution-history
 * @access  Private
 */
const saveExecutionHistory = async (req, res) => {
  try {
    const { questionId, language, code, status, runtime, memory, testCasesPassed, totalTestCases } = req.body;
    const userId = req.user.id;

    const newHistory = new ExecutionHistory({
      userId,
      questionId: questionId || null,
      language,
      code,
      status,
      runtime: runtime || 0,
      memory: memory || 0,
      testCasesPassed: testCasesPassed || 0,
      totalTestCases: totalTestCases || 0
    });

    const savedHistory = await newHistory.save();
    res.status(201).json({ success: true, data: savedHistory });
  } catch (error) {
    console.error('Error saving execution history:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get execution history with pagination
 * @route   GET /api/execution-history
 * @access  Private
 */
const getExecutionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, questionId } = req.query;

    const query = { userId };
    if (questionId) query.questionId = questionId;

    const skip = (page - 1) * limit;

    const [history, total] = await Promise.all([
      ExecutionHistory.find(query)
        .populate('questionId', 'title')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      ExecutionHistory.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      data: history,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching execution history:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Delete a custom test case
 * @route   DELETE /api/test-cases/:id
 * @access  Private
 */
const deleteTestCase = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const testCase = await TestCase.findOne({ _id: id, userId });
    if (!testCase) {
      return res.status(404).json({ success: false, message: 'Test case not found or access denied' });
    }

    if (testCase.isDefault) {
      return res.status(400).json({ success: false, message: 'Cannot delete default test cases' });
    }

    testCase.isActive = false;
    await testCase.save();

    res.status(200).json({ success: true, message: 'Test case deleted successfully' });
  } catch (error) {
    console.error('Error deleting test case:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  createTestCase,
  getTestCases,
  saveExecutionHistory,
  getExecutionHistory,
  deleteTestCase
};
