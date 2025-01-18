import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId"); // Get the paste ID from query params
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.pastes.pastes); // Access pastes from Redux store

  // Preload data when editing an existing paste
  useEffect(() => {
    if (pasteId) {
      const pasteToEdit = pastes.find((paste) => paste._id === pasteId);
      if (pasteToEdit) {
        setTitle(pasteToEdit.title);
        setValue(pasteToEdit.content);
      }
    }
  }, [pasteId, pastes]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Update existing paste
      dispatch(updateToPastes(paste));
      toast.success("Paste updated successfully!");
    } else {
      // Create new paste
      dispatch(addToPastes(paste));
      toast.success("New paste created successfully!");
    }

    // Reset the form and URL params
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl px-8 py-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          {pasteId ? "Edit Your Note" : "Create a New Note"}
        </h1>
        <div className="mb-6">
          {/* <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Title
          </label> */}
          <input
            id="title"
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          {/* <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Content
          </label> */}
          <textarea
            id="content"
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter your content here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={10}
          />
        </div>
        <button
          className="w-full py-4 text-lg bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-600 transition duration-200"
          onClick={createPaste}
        >
          {pasteId ? "Update Note" : "Create Note"}
        </button>
      </div>
    </div>
  );
};

export default Home;
