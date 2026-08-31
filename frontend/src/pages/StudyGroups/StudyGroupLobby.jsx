import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Plus, MessageSquare } from 'lucide-react';
import DiscussionThread from '../../components/DiscussionThread';
import toast from 'react-hot-toast';

const StudyGroupLobby = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newThreadContent, setNewThreadContent] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '', isPublic: true });

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchThreads(selectedGroup._id);
    }
  }, [selectedGroup]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/study-groups`, {
        withCredentials: true
      });
      if (response.data.success) {
        setGroups(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch study groups');
    } finally {
      setLoading(false);
    }
  };

  const fetchThreads = async (groupId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/study-groups/${groupId}/threads`, {
        withCredentials: true
      });
      if (response.data.success) {
        setThreads(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch threads');
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/study-groups`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success('Group created successfully');
        setShowCreateModal(false);
        setFormData({ name: '', description: '', isPublic: true });
        fetchGroups();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create group');
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/study-groups/${groupId}/join`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success('Joined group successfully');
        fetchGroups();
        setSelectedGroup(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to join group');
    }
  };

  const handleCreateThread = async (e) => {
    e.preventDefault();
    if (!newThreadContent.trim() || !selectedGroup) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/study-groups/${selectedGroup._id}/threads`,
        { content: newThreadContent },
        { withCredentials: true }
      );
      if (response.data.success) {
        setNewThreadContent('');
        setThreads(prev => [response.data.data, ...prev]);
        toast.success('Thread created');
      }
    } catch (error) {
      toast.error('Failed to create thread');
    }
  };

  if (loading && !groups.length) {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Study Groups</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Collaborate and discuss with peers.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Groups List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Groups</h2>
          {groups.map(group => (
            <div 
              key={group._id} 
              onClick={() => setSelectedGroup(group)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedGroup?._id === group._id 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-500' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{group.name}</h3>
                {group.isMember && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">Member</span>}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{group.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1"><Users size={14} /> {group.memberCount} members</span>
                {!group.isMember && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleJoinGroup(group._id); }}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Discussion Area */}
        <div className="lg:col-span-2">
          {selectedGroup ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 min-h-[600px] flex flex-col">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedGroup.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedGroup.description}</p>
              </div>

              {selectedGroup.isMember ? (
                <>
                  <form onSubmit={handleCreateThread} className="mb-6">
                    <textarea
                      value={newThreadContent}
                      onChange={(e) => setNewThreadContent(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      placeholder="Start a new discussion..."
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <MessageSquare size={18} />
                        Post Thread
                      </button>
                    </div>
                  </form>

                  <div className="flex-1 overflow-y-auto space-y-4">
                    {threads.length === 0 ? (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-8">No discussions yet. Be the first to post!</p>
                    ) : (
                      threads.map(thread => (
                        <DiscussionThread 
                          key={thread._id} 
                          thread={thread} 
                          groupId={selectedGroup._id} 
                        />
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <Users size={48} className="text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Join to participate</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">You must be a member of this group to view and post discussions.</p>
                  <button 
                    onClick={() => handleJoinGroup(selectedGroup._id)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Join Group
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center min-h-[600px] flex flex-col items-center justify-center">
              <MessageSquare size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select a group</h3>
              <p className="text-gray-500 dark:text-gray-400">Choose a study group from the list to view discussions.</p>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create Study Group</h3>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Group Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={e => setFormData({...formData, isPublic: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700 dark:text-gray-300">Make group public</label>
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGroupLobby;
