import React from 'react'
import LeftSection from './LeftSection'

import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="sm:flex sm:flex-row flex-col w-full h-screen p-8 dark:bg-gray-900 bg-gray-100">
      <div className="sm:w-1/6">
        <LeftSection />
      </div>
      <div className="sm:w-5/6"> <Outlet /></div>
    </div>
  );
}
