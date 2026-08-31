const VideoAnalysis = require('../models/VideoAnalysis');
const path = require('path');
const fs = require('fs');

/**
 * @desc    Upload video and initiate AI analysis
 * @route   POST /api/video-analysis/upload
 * @access  Private
 */
const uploadAndAnalyzeVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file provided' });
    }

    const userId = req.user.id;
    const videoUrl = `/uploads/videos/${req.file.filename}`;

    const newAnalysis = new VideoAnalysis({
      userId,
      videoUrl,
      status: 'processing'
    });

    const savedAnalysis = await newAnalysis.save();

    // Simulate AI analysis pipeline (In production, this would trigger a background job/queue)
    // For this implementation, we simulate a delayed response or immediate mock analysis
    setTimeout(async () => {
      try {
        // Mock AI analysis results
        savedAnalysis.transcript = "Hello, I am a software engineer with three years of experience in React and Node.js.";
        savedAnalysis.eyeContactScore = Math.floor(Math.random() * (95 - 70) + 70);
        savedAnalysis.fillerWordCount = Math.floor(Math.random() * 5);
        savedAnalysis.speakingPace = 'Optimal';
        savedAnalysis.overallFeedback = "Great job maintaining a steady pace. Try to reduce filler words like 'um' and 'uh'. Your eye contact was excellent.";
        savedAnalysis.status = 'completed';
        await savedAnalysis.save();
      } catch (error) {
        savedAnalysis.status = 'failed';
        await savedAnalysis.save();
      }
    }, 3000); // Simulate 3 seconds of processing

    res.status(201).json({ 
      success: true, 
      message: 'Video uploaded successfully. Analysis in progress.',
      data: savedAnalysis 
    });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get analysis results for a specific recording
 * @route   GET /api/video-analysis/:id
 * @access  Private
 */
const getAnalysisResults = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await VideoAnalysis.findOne({ _id: id, userId });

    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis not found or access denied' });
    }

    res.status(200).json({ success: true, data: analysis });
  } catch (error) {
    console.error('Error fetching analysis:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get all video analyses for a user
 * @route   GET /api/video-analysis
 * @access  Private
 */
const getUserAnalyses = async (req, res) => {
  try {
    const userId = req.user.id;
    const analyses = await VideoAnalysis.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: analyses.length, data: analyses });
  } catch (error) {
    console.error('Error fetching user analyses:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  uploadAndAnalyzeVideo,
  getAnalysisResults,
  getUserAnalyses
};
