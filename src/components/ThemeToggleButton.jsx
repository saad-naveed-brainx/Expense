import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/ThemeSlics";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggleButton() {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <button
            onClick={handleToggle}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-200 focus:outline-none hover:bg-gray-400 dark:hover:bg-gray-500"
        >
            <span
                className={`${isDarkMode ? 'translate-x-7' : 'translate-x-1'
                    } h-6 w-6 transform rounded-full bg-white transition-transform duration-400 shadow-lg flex items-center justify-center`}
            >
                {isDarkMode ? (
                    <FaMoon className="h-3 w-3 text-gray-700" />
                ) : (
                    <FaSun className="h-3 w-3 text-yellow-500" />
                )}
            </span>
        </button>
    );
}