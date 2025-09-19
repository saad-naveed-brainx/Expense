import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";
import NavCard from "./NavCard";
import { FaHome, FaDollarSign } from "react-icons/fa";
import ThemeToggleButton from "./ThemeToggleButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../features/Auth/AuthSlice";
import { api } from "../api/client";
import { useNavigate } from 'react-router-dom';


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
];

export default function LeftSection() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    if (!isSignedOut) return;

    const signOut = async () => {
      try {
        await api.post('/auth/sign-out');
        dispatch(logout());
        navigate('/')
      } catch (error) {
        console.error('Sign out error:', error)
        setIsSignedOut(false)
      }
    }
    signOut()
  }, [isSignedOut, navigate])

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex-col items-center justify-between p-4 pt-10 gap-20 h-full hidden sm:flex">
        <div className="flex flex-col items-center justify-center gap-24 w-full pt-10">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative">
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 flex items-center justify-center shadow-lg">
                <FiUser className="text-white text-3xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div className="text-center">
              <div className="text-gray-900 dark:text-white text-lg font-semibold">{user.name || 'User'}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Welcome back!</div>
            </div>
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
            <button
              onClick={() => { setIsSignedOut(true) }}
              className="flex items-center justify-start cursor-pointer gap-3 p-2 rounded-md w-full "
              disabled={isSignedOut}
            >
              <FiLogOut className="text-black text-xl dark:text-white" />
              <h1 className="text-black text-xl dark:text-white">
                {isSignedOut ? 'Signing Out...' : 'Sign Out'}
              </h1>
            </button>
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
              <div className="relative">
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 flex items-center justify-center shadow-lg">
                  <FiUser className="text-white text-2xl" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 dark:text-white text-lg font-semibold">{user.name || 'User'}</div>
              </div>
            </div>
            <div>
              <FaBars onClick={handleToggle} className="text-black dark:text-white text-4xl sm:hidden" />
            </div>
          </div>
          <div className={`w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-4 sm:w-full grid transition-grid-rows duration-300 ease-in px-2 ${isOpen ? 'grid-rows-[1fr] py-4' : 'grid-rows-[0fr] py-0'} transition-all duration-300`}>
            <div className="overflow-hidden w-full space-y-2">
              {navJson.map((item) => (
                <NavCard
                  key={item.title}
                  title={item.title}
                  path={item.path}
                  icon={item.icon}
                />
              ))}
              <button
                onClick={() => { setIsSignedOut(true) }}
                className="flex items-center justify-start cursor-pointer gap-3 p-2 rounded-md w-full"
                disabled={isSignedOut}
              >
                <FiLogOut className="text-black text-xl dark:text-white" />
                <h1 className="text-black text-xl dark:text-white">
                  {isSignedOut ? 'Signing Out...' : 'Sign Out'}
                </h1>
              </button>
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
