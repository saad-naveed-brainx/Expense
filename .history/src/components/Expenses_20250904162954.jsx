import React from 'react'
import { IoMdClose } from "react-icons/io";

export default function Expenses() {
  return (
    <div className='bg-black rounded-xl p-4 h-full flex flex-col py-8 px-12 text-white gap-15'>
      <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-white text-4xl font-bold'>New Expense</h1>
        <button className='text-white'>
          <IoMdClose className='text-4xl' />
        </button>
      </div>
      <div className='w-full h-1 bg-gray-700'></div>
      </div>

      <div className='flex items-center justify-'>
        <div>left</div>
        <div>right</div>
      </div>
    </div>

  )
}