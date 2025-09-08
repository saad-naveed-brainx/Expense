import React from 'react'
import { IoMdClose } from "react-icons/io";

export default function Expenses() {
  return (
    <div className='bg-black rounded-xl p-4 h-full flex flex-col p-6'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-white text-4xl font-bold'>New Expense</h1>
        <button className='text-white'>
          <IoMdClose />
        </button>
      </div>
    </div>

  )
}