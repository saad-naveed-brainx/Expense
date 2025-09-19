import React from 'react'
import LeftSection from './LeftSection'
import { Outlet, useNavigation, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiLogIn, FiUserPlus, FiLock } from 'react-icons/fi'

export default function RootLayout() {
  const navigation = useNavigation()
  const navigate = useNavigate()
  const location = useLocation()
  const isLoading = navigation.state === 'loading'
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  const handleSignIn = () => {
    navigate('/signin')
  }

  const handleSignUp = () => {
    navigate('/signup')
  }

  const isOnAuthPage = location.pathname === '/signin' || location.pathname === '/signup'

  return (
    isLoggedIn ? (
      <div className="sm:flex sm:flex-row flex-col w-full h-screen p-8 dark:bg-gray-900 bg-gray-100">
        <div className="sm:w-1/6">
          <LeftSection />
        </div>
        <div className="sm:w-5/6 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center z-50 rounded-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 dark:border-gray-400"></div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
              </div>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    ) : isOnAuthPage ? (
      <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Outlet />
      </div>
    ) : (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4'>
        <div className='max-w-md w-full'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-400 dark:bg-white rounded-full mb-4'>
              <FiLock className='w-8 h-8 text-black' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              Expense Tracker
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              Manage your expenses with ease and precision
            </p>
          </div>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8'>
            <div className='text-center mb-6'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                Welcome Back!
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Please sign in to access your expense dashboard
              </p>
            </div>
            <div className='space-y-4'>
              <button
                onClick={handleSignIn}
                className='w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20'
              >
                <FiLogIn className='w-5 h-5' />
                Sign In
              </button>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300 dark:border-gray-600'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
                    or
                  </span>
                </div>
              </div>
              <button
                onClick={handleSignUp}
                className='w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500/20'
              >
                <FiUserPlus className='w-5 h-5' />
                Create Account
              </button>
            </div>

          </div>
        </div>
      </div>
    )
  );
}
