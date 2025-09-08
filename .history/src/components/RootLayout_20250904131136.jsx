import React from 'react'
import LeftSection from './LeftSection'

import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="flex w-full h-screen p-8 bg-gray-900">
      <div className="w-1/6">
        <LeftSection />
      </div>
      <div className="w-5/6"> <Outlet /></div>
    </div>
  );
}
