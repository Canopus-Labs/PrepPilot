import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Clock, Plus, MessageSquare } from 'lucide-react';
import PeerReviewForm from '../../components/PeerReviewForm';
import toast from 'react-hot-toast';

const PeerMatchingLobby = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reviewSessionId, setReviewSessionId] = useState(null);
  const [formData, setFormData] = useState({ topic: '', scheduledTime: '' });

  useEffect(() => {
    fetchOpenSessions();
  }, []);

  const fetchOpenSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/peer-sessions/open`, {
        withCredentials: true
      });
      if (response.data.success) {
        setSessions(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/peer-sessions`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success('Session created successfully');
        setShowCreateModal(false);
        setFormData({ topic: '', scheduledTime: '' });
        fetchOpenSessions();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create session');
    }
  };

  const handleJoinSession = async (id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/peer-sessions/${id}/join`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success('Successfully joined session!');
        setReviewSessionId(id); // Prompt for review after joining/completing
        fetchOpenSessions();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join session');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Peer Mock Interview Lobby</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Find a partner to practice with or host your own session.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Host a Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No open sessions</h3>
            <p className="text-gray-500 dark:text-gray-400">Be the first to host a mock interview session!</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session._id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{session.topic}</h3>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                  Open
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users size={16} />
                  <span>Host: {session.hostId?.name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock size={16} />
                  <span>{new Date(session.scheduledTime).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => handleJoinSession(session._id)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                Join Session
              </button>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Host a Mock Interview</h3>
            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic *</label>
                <input
                  type="text"
                  required
                  value={formData.topic}
                  onChange={e => setFormData({...formData, topic: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., System Design, Behavioral, React"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scheduled Time *</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.scheduledTime}
                  onChange={e => setFormData({...formData, scheduledTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {reviewSessionId && (
        <PeerReviewForm 
          sessionId={reviewSessionId} 
          onSuccess={fetchOpenSessions} 
          onClose={() => setReviewSessionId(null)} 
        />
      )}
    </div>
  );
};

export default PeerMatchingLobby;
