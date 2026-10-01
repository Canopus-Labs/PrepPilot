import { describe, it, expect, vi, beforeEach } from 'vitest';
import { _parseGeminiJson, _getNextDifficulty, _buildFinalReport } from '../controllers/adaptiveInterviewController';

describe('Adaptive Interview Controller Helpers', () => {
  describe('parseGeminiJson', () => {
    it('parses valid JSON without markdown', () => {
      const input = '{"test": "value"}';
      expect(_parseGeminiJson(input)).toEqual({ test: 'value' });
    });

    it('parses JSON with markdown fences', () => {
      const input = '```json\n{"test": "value"}\n```';
      expect(_parseGeminiJson(input)).toEqual({ test: 'value' });
    });

    it('parses JSON with generic markdown fences', () => {
      const input = '```\n{"test": "value"}\n```';
      expect(_parseGeminiJson(input)).toEqual({ test: 'value' });
    });
  });

  describe('getNextDifficulty', () => {
    it('increases difficulty on score >= 80', () => {
      expect(_getNextDifficulty('Easy', 80)).toBe('Medium');
      expect(_getNextDifficulty('Medium', 85)).toBe('Hard');
      expect(_getNextDifficulty('Hard', 90)).toBe('Hard');
    });

    it('decreases difficulty on score <= 40', () => {
      expect(_getNextDifficulty('Hard', 40)).toBe('Medium');
      expect(_getNextDifficulty('Medium', 35)).toBe('Easy');
      expect(_getNextDifficulty('Easy', 20)).toBe('Easy');
    });

    it('keeps difficulty on 41 <= score <= 79', () => {
      expect(_getNextDifficulty('Medium', 60)).toBe('Medium');
      expect(_getNextDifficulty('Easy', 79)).toBe('Easy');
      expect(_getNextDifficulty('Hard', 41)).toBe('Hard');
    });
  });

  describe('buildFinalReport', () => {
    it('calculates averages and improvement areas correctly', () => {
      const questions = [
        { topic: 'React', overallScore: 90 },
        { topic: 'Node.js', overallScore: 40 },
        { topic: 'Node.js', overallScore: 60 },
      ];
      const report = _buildFinalReport(questions);
      
      expect(report.totalScore).toBe(63); // (90 + 40 + 60) / 3
      expect(report.topicPerformance).toEqual({
        'React': 90,
        'Node.js': 50 // (40 + 60) / 2
      });
      expect(report.improvementAreas).toContain('Focus on improving your understanding of Node.js.');
    });
    
    it('handles empty questions gracefully', () => {
      const report = _buildFinalReport([]);
      expect(report.totalScore).toBe(0);
      expect(report.topicPerformance).toEqual({});
    });
  });
});
