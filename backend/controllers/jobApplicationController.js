const JobApplication = require('../models/JobApplication');
const Resume = require('../models/Resume');

/**
 * @desc    Create a new job application
 * @route   POST /api/job-applications
 * @access  Private
 */
const createJobApplication = async (req, res) => {
  try {
    const { company, role, stage, resumeId, notes, jobUrl } = req.body;
    const userId = req.user.id;

    if (resumeId) {
      const resume = await Resume.findOne({ _id: resumeId, userId });
      if (!resume) {
        return res.status(404).json({ success: false, message: 'Resume not found or access denied' });
      }
    }

    const newApplication = new JobApplication({
      userId,
      company,
      role,
      stage: stage || 'Wishlist',
      resumeId: resumeId || null,
      notes,
      jobUrl
    });

    const savedApplication = await newApplication.save();
    res.status(201).json({ success: true, data: savedApplication });
  } catch (error) {
    console.error('Error creating job application:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get all job applications for the authenticated user
 * @route   GET /api/job-applications
 * @access  Private
 */
const getJobApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { stage } = req.query;

    const query = { userId };
    if (stage) {
      query.stage = stage;
    }

    const applications = await JobApplication.find(query)
      .populate('resumeId', 'title')
      .sort({ appliedDate: -1 });

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Update a job application stage or details
 * @route   PUT /api/job-applications/:id
 * @access  Private
 */
const updateJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, stage, resumeId, notes, jobUrl } = req.body;
    const userId = req.user.id;

    const application = await JobApplication.findById(id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    if (application.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this application' });
    }

    if (resumeId) {
      const resume = await Resume.findOne({ _id: resumeId, userId });
      if (!resume) {
        return res.status(404).json({ success: false, message: 'Resume not found or access denied' });
      }
    }

    application.company = company !== undefined ? company : application.company;
    application.role = role !== undefined ? role : application.role;
    application.stage = stage !== undefined ? stage : application.stage;
    application.resumeId = resumeId !== undefined ? resumeId : application.resumeId;
    application.notes = notes !== undefined ? notes : application.notes;
    application.jobUrl = jobUrl !== undefined ? jobUrl : application.jobUrl;

    const updatedApplication = await application.save();
    res.status(200).json({ success: true, data: updatedApplication });
  } catch (error) {
    console.error('Error updating job application:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Delete a job application
 * @route   DELETE /api/job-applications/:id
 * @access  Private
 */
const deleteJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const application = await JobApplication.findById(id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    if (application.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this application' });
    }

    await application.deleteOne();
    res.status(200).json({ success: true, message: 'Job application removed successfully' });
  } catch (error) {
    console.error('Error deleting job application:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  createJobApplication,
  getJobApplications,
  updateJobApplication,
  deleteJobApplication
};
