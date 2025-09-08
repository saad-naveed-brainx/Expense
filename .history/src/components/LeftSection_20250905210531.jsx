import React from "react";
import { FaUserCircle } from "react-icons/fa";
import NavCard from "./NavCard";
import { FaHome, FaDollarSign, FaPlus, FaList, FaCog } from "react-icons/fa";

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
  return (
    <div className="flex flex-col items-center justify-center p-4 pt-10 gap-20">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="rounded-full bg-white w-20 h-20 flex items-center justify-center">
          <FaUserCircle className="text-black text-6xl" />
        </div>
        <div className="text-gray-400 text-xl font-bold">Saad</div>
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
  );
}
