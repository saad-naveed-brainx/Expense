import React from 'react'
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form"

export default function Expenses() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  
  return (
    <div className='bg-black rounded-xl p-4 h-full flex flex-col py-8 px-12 text-white gap-15'>
      <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-white text-4xl font-bold'>New Expense</h1>
        <button className='text-white'>
          <IoMdClose className='text-4xl' />
        </button>
      </div>
      {/* horizontal line */}
      <div className='w-full h-1 bg-gray-700'></div>
      </div>

      <div className='flex items-center justify-evenly h-full gap-10'>
        <div className='w-full'>
          form will go here
        </div>
        <div className='bg-gray-700 rounded-md p-2 h-full w-full flex flex-col gap-5 items-center justify-center cursor-pointer'>
          <FaPlus className='text-4xl' />
          <h1>Upload an Invoice</h1>
        </div>
      </div>

      <div className='flex items-center justify-end p-4'>
          <button className='bg-green-300 rounded-md p-2 text-black px-8 py-2
          '>Save</button>
      </div>
    </div>

  )
}