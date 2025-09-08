import React from 'react'
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

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

      <div className='flex items-center justify-evenly'>
        <div className='flex flex-col gap-4 w-full'>
          <h1 className='text-2xl font-bold'>Amount</h1>
          <input type="number" className='bg-gray-700 rounded-md p-2' />
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Date</h1>
          <input type="date" className='bg-gray-700 rounded-md p-2' />
        </div>
        <div className='bg-gray-700 rounded-md p-2 h-full w-full flex flex-col gap-5 items-center justify-center'>
          </>
        </div>
      </div>
    </div>

  )
}