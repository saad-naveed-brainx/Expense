import React from 'react'
import LeftSection from './LeftSection'
import { Outlet, useNavigation } from 'react-router-dom'

export default function RootLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
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
  );
}
