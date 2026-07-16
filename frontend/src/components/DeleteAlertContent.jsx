import React from "react";
import { AlertTriangle } from "lucide-react";

const DeleteAlertContent = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-2">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertTriangle className="text-red-600" size={28} />
        </div>

        <p className="text-base font-medium text-gray-800 dark:text-white">
          {content}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          This action cannot be undone. The interview session and all associated
          data will be permanently removed.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlertContent;