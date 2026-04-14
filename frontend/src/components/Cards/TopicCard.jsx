import React from "react";

const TopicCard = ({ topic, onClick }) => (
  <button
    className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-900 transition"
    onClick={() => onClick(topic)}
  >
    {topic}
  </button>
);

export default TopicCard;
