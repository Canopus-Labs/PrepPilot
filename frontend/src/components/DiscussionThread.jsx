import React, { useState } from 'react';
import { MessageSquare, ArrowUp, Reply } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DiscussionThread = ({ thread, groupId, depth = 0, onReplyAdded }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/study-groups/${groupId}/threads`,
        { content: replyContent, parentId: thread._id },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Reply posted');
        setReplyContent('');
        setShowReplyForm(false);
        if (onReplyAdded) onReplyAdded(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to post reply');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 mt-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : 'mb-6'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
              {thread.authorId?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{thread.authorId?.name || 'Unknown User'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(thread.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap">{thread.content}</p>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowUp size={16} />
            <span>{thread.upvotes?.length || 0}</span>
          </button>
          <button 
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Reply size={16} />
            <span>Reply</span>
          </button>
       8</div>

        {showReplyForm && (
          <form onSubmit={handleReply} className="mt-4">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Write a reply..."
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Reply'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DiscussionThread;
