import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from '../../components/KanbanBoard';
import toast from 'react-hot-toast';

/**
 * JobApplicationTracker Page
 * Main container for the job application kanban board.
 */
const JobApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job-applications`, {
        withCredentials: true
      });
      if (response.data.success) {
        setApplications(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch job applications. Please try again.');
      console.error('Fetch applications error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <KanbanBoard 
        applications={applications} 
        onApplicationsChange={setApplications} 
      />
    </div>
  );
};

export default JobApplicationTracker;
