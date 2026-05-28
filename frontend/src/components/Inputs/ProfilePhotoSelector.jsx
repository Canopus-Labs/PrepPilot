import React, { useState, useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // update state
      const url = URL.createObjectURL(file); // preview url
      if (setPreview) {
        setPreview(url);
      }
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click(); // trigger hidden input
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-white/20 rounded-full relative cursor-pointer hover:border-white/40 transition-all group">
          <LuUser className="text-4xl text-violet-300" />
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-lg transition-all group-hover:scale-110"
            onClick={onChooseFile}
            title="Upload profile photo"
          >
            <LuUpload className="text-xs" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover border-2 border-violet-500/40"
          />
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-lg transition-all hover:scale-110"
            onClick={handleRemoveImage}
            title="Remove photo"
          >
            <LuTrash className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
