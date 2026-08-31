import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ExternalLink, FileText } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const STAGES = [
  { id: 'Wishlist', title: 'Wishlist', color: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'Applied', title: 'Applied', color: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'Screening', title: 'Screening', color: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { id: 'Interview', title: 'Interview', color: 'bg-purple-50 dark:bg-purple-900/20' },
  { id: 'Offer', title: 'Offer', color: 'bg-green-50 dark:bg-green-900/20' },
  { id: 'Rejected', title: 'Rejected', color: 'bg-red-50 dark:bg-red-900/20' }
];

const KanbanBoard = ({ applications, onApplicationsChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    stage: 'Wishlist',
    notes: '',
    jobUrl: ''
  });
  const [draggedAppId, setDraggedAppId] = useState(null);

  const handleDragStart = (e, appId) => {
    setDraggedAppId(appId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStage) => {
    e.preventDefault();
    if (!draggedAppId) return;

    const app = applications.find(a => a._id === draggedAppId);
    if (app && app.stage !== newStage) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/job-applications/${draggedAppId}`,
          { stage: newStage },
          { withCredentials: true }
        );
        
        if (response.data.success) {
          onApplicationsChange(prev => 
            prev.map(a => a._id === draggedAppId ? { ...a, stage: newStage } : a)
          );
          toast.success(`Moved to ${newStage}`);
        }
      } catch (error) {
        toast.error('Failed to update application stage');
        console.error(error);
      }
    }
    setDraggedAppId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingApp 
        ? `${import.meta.env.VITE_BACKEND_URL}/job-applications/${editingApp._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/job-applications`;
      
      const method = editingApp ? 'put' : 'post';
      
      const response = await axios[method](url, formData, { withCredentials: true });
      
      if (response.data.success) {
        toast.success(editingApp ? 'Application updated successfully' : 'Application added successfully');
        setIsModalOpen(false);
        setEditingApp(null);
        setFormData({ company: '', role: '', stage: 'Wishlist', notes: '', jobUrl: '' });
        onApplicationsChange(prev => 
          editingApp 
            ? prev.map(app => app._id === editingApp._id ? response.data.data : app)
            : [...prev, response.data.data]
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save application');
    }
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setFormData({
      company: app.company,
      role: app.role,
      stage: app.stage,
      notes: app.notes || '',
      jobUrl: app.jobUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/job-applications/${id}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        toast.success('Application deleted successfully');
        onApplicationsChange(prev => prev.filter(app => app._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete application');
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job Application Tracker</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Drag and drop cards to update stages</p>
        </div>
        <button
          onClick={() => {
            setEditingApp(null);
            setFormData({ company: '', role: '', stage: 'Wishlist', notes: '', jobUrl: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Add Application
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => (
          <div
            key={stage.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
            className={`rounded-xl p-3 min-h-[500px] ${stage.color} border border-gray-200 dark:border-gray-700 transition-colors flex flex-col`}
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center sticky top-0 bg-inherit py-2 z-10">
              {stage.title} 
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({applications.filter(a => a.stage === stage.id).length})
              </span>
            </h3>
            
            <div className="space-y-3 flex-1 overflow-y-auto">
              {applications
                .filter(app => app.stage === stage.id)
                .map((app) => (
                  <div
                    key={app._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, app._id)}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate pr-2">{app.company}</h4>
                      <div className="flex gap-1 flex-shrink-0">
                        <button 
                          onClick={() => handleEdit(app)}
                          className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          aria-label="Edit application"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(app._id)}
                          className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          aria-label="Delete application"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">{app.role}</p>
                    {app.notes && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 italic">"{app.notes}"</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
                      <span>{new Date(app.appliedDate).toLocaleDateString()}</span>
                      {app.jobUrl && (
                        <a href={app.jobUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    {app.resumeId && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
                        <FileText size={12} />
                        <span>Resume attached</span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingApp ? 'Edit Application' : 'Add New Application'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Google"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stage</label>
                <select
                  value={formData.stage}
                  onChange={e => setFormData({...formData, stage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  {STAGES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job URL</label>
                <input
                  type="url"
                  value={formData.jobUrl}
                  onChange={e => setFormData({...formData, jobUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Interview date, contact person, etc."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  {editingApp ? 'Update' : 'Add Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
