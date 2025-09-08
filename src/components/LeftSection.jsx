import React, { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import NavCard from "./NavCard";
import { FaHome, FaDollarSign, FaPlus, FaList, FaCog } from "react-icons/fa";
import ThemeToggleButton from "./ThemeToggleButton";

const navJson = [
  {
    path: "/",
    title: "Home",
    icon: FaHome,
  },
  {
    path: "/expenses",
    title: "Expenses",
    icon: FaDollarSign,
  },
  {
    path: "/categories",
    title: "Categories",
    icon: FaList,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: FaCog,
  },
];

export default function LeftSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <>

      <div className="flex-col items-center justify-between p-4 pt-10 gap-20 h-full hidden sm:flex">
        <div className="flex flex-col items-center justify-center gap-24 w-full pt-10">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-gray-400 dark:bg-white w-20 h-20 flex items-center justify-center">
              <FaUserCircle className="text-black dark:text-black text-6xl" />
            </div>
            <div className="text-black dark:text-gray-200 text-xl font-bold">Saad</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            {navJson.map((item) => (
              <NavCard
                key={item.title}
                title={item.title}
                path={item.path}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
        <div className="self-end w-full">
          <ThemeToggleButton />
        </div>
      </div>
      <div className=" flex flex-col sm:items-center sm:justify-between p-4 pt-10 gap-20 h-full sm:hidden">
        <div className="flex flex-col sm:items-center sm:justify-center sm:gap-24 sm:w-full sm:pt-10 items-center justify-between">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-gray-400 dark:bg-white w-20 h-20 flex items-center justify-center">
                <FaUserCircle className="text-black dark:text-black text-6xl" />
              </div>
              <div className="text-black dark:text-gray-200 text-xl font-bold">Saad</div>
            </div>
            <div>
              <FaBars onClick={handleToggle} className="text-black dark:text-white text-4xl sm:hidden" />
            </div>
          </div>
          <div className={`w-full bg-white dark:bg-gray-600 sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-4 sm:w-full grid transition-grid-rows duration-300 ease-in px-2 ${isOpen ? 'grid-rows-[1fr] py-2' : 'grid-rows-[0fr] py-0'} transition-all duration-300`}>
            <div className="overflow-hidden w-full">
              {navJson.map((item) => (
                <NavCard
                  key={item.title}
                  title={item.title}
                  path={item.path}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="sm:self-end sm:w-full hidden">
          <ThemeToggleButton />
        </div>
      </div>
    </>
  );
}
