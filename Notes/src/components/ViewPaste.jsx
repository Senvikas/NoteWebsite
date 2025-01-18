import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams(); // Get the paste ID from the route
  const navigate = useNavigate();
  const paste = useSelector((state) =>
    state.pastes.pastes.find((paste) => paste._id === id)
  );

  if (!paste) {
    return (
      <div className="p-4 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-4">Paste Not Found</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-600"
          onClick={() => navigate("/pastes")}
        >
          Back to Notes
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">{paste.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        {paste.content}
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-600"
        onClick={() => navigate("/pastes")}
      >
        Back to Notes
      </button>
    </div>
  );
};

export default ViewPaste;
