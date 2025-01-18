import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromPastes } from "../redux/pasteSlice";
import { toast } from "react-hot-toast";
import { FaCopy, FaShareAlt, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const Pastes = () => {
  const pastes = useSelector((state) => state.pastes.pastes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expandedPastes, setExpandedPastes] = useState({});
  const [expandedTitles, setExpandedTitles] = useState({});

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard!");
  };

  const handleShare = (paste) => {
    const pasteLink = `${window.location.origin}/pastes/${paste._id}`; // Generate the sharable link
  
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: `${paste.content}\n\nView the paste here: ${pasteLink}`,
          url: pasteLink, // Shareable link
        })
        // .then(() => toast.success("Paste shared successfully!"))
        .catch(() => toast.error("Failed to share the paste."));
    } else {
      // If native sharing is not supported, show the link to copy
      navigator.clipboard.writeText(pasteLink); // Copy the link to the clipboard
      toast.success("Link copied to clipboard! Share it with others.");
    }
  };
  

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    toast.success("Paste deleted successfully!");
  };

  const toggleExpand = (id) => {
    setExpandedPastes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-4 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">All Notes</h1>
      <div className="grid grid-cols-1 gap-6">
        {pastes.length > 0 ? (
          pastes.map((paste) => (
            <div
              key={paste._id}
              className="p-4 border rounded-lg shadow-md bg-gray-50 dark:bg-gray-800 hover:shadow-lg dark:shadow-lg dark:border-gray-700 flex flex-col gap-4 transition-shadow duration-300"
            >
              {/* Title and Icons */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {expandedTitles[paste._id]
                    ? paste.title
                    : `${paste.title.substring(0, 50)}...`}
                  {paste.title.length > 50 && (
                    <button
                      className="text-blue-500 ml-2 py-1 text-sm hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400"
                      onClick={() =>
                        setExpandedTitles((prev) => ({
                          ...prev,
                          [paste._id]: !prev[paste._id],
                        }))
                      }
                    >
                      {expandedTitles[paste._id] ? "Show Less" : "Read More"}
                    </button>
                  )}
                </h2>

                <div className="flex gap-3 items-center">
                  <button
                    className="p-2 text-blue-500 hover:text-blue-700 hover:scale-110 transition-transform dark:text-blue-300 dark:hover:text-blue-400"
                    onClick={() => navigate(`/pastes/${paste._id}`)}
                    title="View"
                  >
                    <FaEye size={15} />
                  </button>
                  <button
                    className="p-2 text-green-500 hover:text-green-700 hover:scale-110 transition-transform dark:text-green-300 dark:hover:text-green-400"
                    onClick={() => navigate(`/?pasteId=${paste._id}`)}
                    title="Update"
                  >
                    <FaEdit size={15} />
                  </button>
                  <button
                    className="p-2 text-yellow-500 hover:text-yellow-700 hover:scale-110 transition-transform dark:text-yellow-300 dark:hover:text-yellow-400"
                    onClick={() => handleCopy(paste.content)}
                    title="Copy"
                  >
                    <FaCopy size={15} />
                  </button>
                  <button
                    className="p-2 text-purple-500 hover:text-purple-700 hover:scale-110 transition-transform dark:text-purple-300 dark:hover:text-purple-400"
                    onClick={() => handleShare(paste)}
                    title="Share"
                  >
                    <FaShareAlt size={15} />
                  </button>
                  <button
                    className="p-2 text-red-500 hover:text-red-700 hover:scale-110 transition-transform dark:text-red-300 dark:hover:text-red-400"
                    onClick={() => handleDelete(paste._id)}
                    title="Delete"
                  >
                    <FaTrashAlt size={15} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div>
                <hr className="border-gray-200 dark:border-gray-600 my-2" />
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {expandedPastes[paste._id]
                    ? paste.content
                    : `${paste.content.substring(0, 100)}...`}
                  {paste.content.length > 100 && (
                    <button
                      className="text-blue-500 ml-2 dark:text-blue-300 dark:hover:text-blue-400"
                      onClick={() => toggleExpand(paste._id)}
                    >
                      {expandedPastes[paste._id] ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800 dark:text-gray-300">
            No pastes available. Create one to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default Pastes;
