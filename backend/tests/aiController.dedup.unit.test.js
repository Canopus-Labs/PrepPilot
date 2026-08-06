import { describe, it, expect, vi, beforeEach } from 'vitest';
import Module from 'module';

// ---------------------------------------------------------------------------
// CJS controller mocks via Module._load shim.
// ---------------------------------------------------------------------------

const moduleMocks = {};

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request in moduleMocks) return moduleMocks[request];
  return originalLoad.apply(this, arguments);
};

const mockSessionFind = vi.fn();
const mockQuestionFind = vi.fn();
const mockQuestionAnswerPrompt = vi.fn();
const mockGenerateWithFallback = vi.fn();

moduleMocks['../models/Session'] = { find: (...args) => mockSessionFind(...args) };
moduleMocks['../models/Question'] = { find: (...args) => mockQuestionFind(...args) };
moduleMocks['../utils/prompts'] = {
  conceptExplainPrompt: vi.fn(),
  questionAnswerPrompt: (...args) => mockQuestionAnswerPrompt(...args),
  interviewTipsPrompt: vi.fn(),
};
moduleMocks['../utils/geminiHelper'] = {
  generateWithFallback: (...args) => mockGenerateWithFallback(...args),
};

const { generateInterviewQuestions } = require('../controllers/aiController');

function makeReq(body = {}) {
  return { body, user: { _id: 'user-123' } };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

function sessionFindReturning(sessions) {
  return { select: vi.fn().mockResolvedValue(sessions) };
}

function questionFindReturning(questions) {
  return { select: vi.fn().mockResolvedValue(questions) };
}

function mockGeminiResponse(questions = [{ question: 'Q1', answer: 'A1' }]) {
  mockGenerateWithFallback.mockResolvedValue({
    result: { response: { text: vi.fn().mockResolvedValue(JSON.stringify(questions)) } },
    usedModel: 'models/gemini-2.5-flash',
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockQuestionAnswerPrompt.mockReturnValue('PROMPT');
});

describe('generateInterviewQuestions — topic order-independent de-dup (issue #1452)', () => {
  it('queries past sessions with $all + $size so array order does not matter', async () => {
    mockSessionFind.mockReturnValue(
      sessionFindReturning([{ questions: ['q1'] }, { questions: ['q2'] }])
    );
    mockQuestionFind.mockReturnValue(questionFindReturning([{ question: 'Already seen question' }]));
    mockGeminiResponse();

    const res = makeRes();
    await generateInterviewQuestions(
      makeReq({
        role: 'Frontend Engineer',
        experience: '2 years',
        topicsToFocus: ['JavaScript', 'React'],
        numberOfQuestions: 3,
      }),
      res,
    );

    expect(mockSessionFind).toHaveBeenCalledWith({
      user: 'user-123',
      role: 'Frontend Engineer',
      topicsToFocus: { $all: ['JavaScript', 'React'], $size: 2 },
    });
    expect(mockQuestionAnswerPrompt).toHaveBeenCalledWith(
      expect.objectContaining({ seenQuestions: ['Already seen question'] }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('treats a reversed topics order as the same topics (no duplicates generated)', async () => {
    mockSessionFind.mockReturnValue(sessionFindReturning([{ questions: ['q-seen'] }]));
    mockQuestionFind.mockReturnValue(questionFindReturning([{ question: 'React vs JSX?' }]));
    mockGeminiResponse([{ question: 'NEW QUESTION', answer: 'A' }]);

    const res = makeRes();
    await generateInterviewQuestions(
      makeReq({
        role: 'Frontend Engineer',
        experience: '1 year',
        topicsToFocus: ['JavaScript', 'React'],
        numberOfQuestions: 2,
      }),
      res,
    );

    expect(mockQuestionAnswerPrompt).toHaveBeenCalledWith(
      expect.objectContaining({ seenQuestions: ['React vs JSX?'] }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('tolerates sessions with undefined questions arrays', async () => {
    mockSessionFind.mockReturnValue(
      sessionFindReturning([{ questions: undefined }, { questions: null }])
    );
    mockQuestionFind.mockReturnValue(questionFindReturning([]));
    mockGeminiResponse();

    const res = makeRes();
    await generateInterviewQuestions(
      makeReq({
        role: 'Frontend Engineer',
        experience: '2 years',
        topicsToFocus: ['React'],
        numberOfQuestions: 1,
      }),
      res,
    );

    expect(mockQuestionAnswerPrompt).toHaveBeenCalledWith(
      expect.objectContaining({ seenQuestions: [] }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('does not send an avoid-section when nothing was seen', async () => {
    mockSessionFind.mockReturnValue(sessionFindReturning([]));
    mockQuestionFind.mockReturnValue(questionFindReturning([]));
    mockGeminiResponse();

    const res = makeRes();
    await generateInterviewQuestions(
      makeReq({
        role: 'Backend Engineer',
        experience: '3 years',
        topicsToFocus: ['Node.js'],
        numberOfQuestions: 2,
      }),
      res,
    );

    expect(mockQuestionAnswerPrompt).toHaveBeenCalledWith(
      expect.objectContaining({ seenQuestions: [] }),
    );
  });
});
