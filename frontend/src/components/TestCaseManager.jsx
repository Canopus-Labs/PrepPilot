import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TestCaseManager = ({ questionId, sessionId, onTestCasesChange }) => {
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTestCase, setNewTestCase] = useState({ input: '', expectedOutput: '' });

  useEffect(() => {
    fetchTestCases();
  }, [questionId, sessionId]);

  const fetchTestCases = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (questionId) params.append('questionId', questionId);
      if (sessionId) params.append('sessionId', sessionId);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/test-cases?${params.toString()}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setTestCases(response.data.data);
        if (onTestCasesChange) onTestCasesChange(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch test cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestCase = async (e) => {
    e.preventDefault();
    if (!newTestCase.input.trim() || !newTestCase.expectedOutput.trim()) {
      toast.error('Both input and expected output are required');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/test-cases`,
        {
          questionId,
          sessionId,
          input: newTestCase.input,
          expectedOutput: newTestCase.expectedOutput
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Test case added successfully');
        setNewTestCase({ input: '', expectedOutput: '' });
        setShowAddForm(false);
        fetchTestCases();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add test case');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this test case?')) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/test-cases/${id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Test case deleted');
        fetchTestCases();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete test case');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Custom Test Cases</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Test Case
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTestCase} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Input</label>
            <textarea
              value={newTestCase.input}
              onChange={(e) => setNewTestCase({ ...newTestCase, input: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              placeholder='e.g., [1, 2, 3]'
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Expected Output</label>
            <textarea
              value={newTestCase.expectedOutput}
              onChange={(e) => setNewTestCase({ ...newTestCase, expectedOutput: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              placeholder='e.g., 6'
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        ) : testCases.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No custom test cases yet.</p>
        ) : (
          testCases.map((tc, index) => (
            <div key={tc._id} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  {tc.isDefault ? 'Default' : `Custom #${index + 1}`}
                </span>
                {!tc.isDefault && (
                  <button
                    onClick={() => handleDelete(tc._id)}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Input:</p>
                  <p className="text-gray-900 dark:text-gray-200 break-all whitespace-pre-wrap">{tc.input}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Expected:</p>
                  <p className="text-gray-900 dark:text-gray-200 break-all whitespace-pre-wrap">{tc.expectedOutput}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestCaseManager;
