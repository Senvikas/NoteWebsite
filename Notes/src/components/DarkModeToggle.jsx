import React, { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs"; // Import icons

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleDarkMode = () => {
    const html = document.querySelector("html");
    if (isDarkMode) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? (
        <BsSunFill size={18} className="text-yellow-500" />
      ) : (
        <BsMoonFill size={18} className="text-blue-500" />
      )}
      
    </button>
  );

  // use below code to have Text button
  // return (
  //   <button
  //     onClick={toggleDarkMode}
  //     className="px-2 py-0.2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-gray-900"
  //   >
  //     {isDarkMode ? "Light Mode" : "Dark Mode"}
  //   </button>
  // );
};

export default DarkModeToggle;
