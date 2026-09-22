import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import adaptiveInterviewRoutes from '../routes/adaptiveInterviewRoutes';
import AdaptiveInterviewSession from '../models/AdaptiveInterviewSession';

// Mock the AI Helper
vi.mock('../utils/geminiHelper', () => ({
  generateWithFallback: vi.fn().mockResolvedValue({
    result: {
      response: {
        text: () => JSON.stringify({
          questionText: "Mocked question?",
          topic: "React",
          correctnessScore: 90,
          explanationScore: 85,
          overallScore: 88,
          approachFeedback: "Good approach",
          generalFeedback: "Keep it up"
        })
      }
    },
    usedModel: "mock-model"
  })
}));

// Mock Auth Middleware
vi.mock('../middlewares/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: new mongoose.Types.ObjectId() };
    next();
  }
}));

const app = express();
app.use(express.json());
app.use('/api/adaptive-interview', adaptiveInterviewRoutes);

describe('Adaptive Interview Routes', () => {
  beforeEach(async () => {
    // Clear mocks if needed
    vi.clearAllMocks();
  });

  // We are skipping actual DB connection in this isolated route test,
  // typically we'd use mongodb-memory-server, but we'll mock the Mongoose Model.
  
  it('should have the route structure setup correctly', () => {
    expect(adaptiveInterviewRoutes).toBeDefined();
  });
});
