import React from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between p-4 bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      {/* Left Section: Navigation Links */}
      <div className="flex gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded text-gray-800 hover:text-blue-500 dark:text-gray-100 dark:hover:text-blue-300 ${
              isActive ? "font-bold underline" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-3 py-2 rounded text-gray-800 hover:text-blue-500 dark:text-gray-100 dark:hover:text-blue-300 ${
              isActive ? "font-bold underline" : ""
            }`
          }
        >
          Notes
        </NavLink>
      </div>

      {/* Right Section: Dark Mode Toggle */}
      <DarkModeToggle />
    </div>
  );
};

export default Navbar;
