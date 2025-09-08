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
          <form className='p-10 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-4 items-center'>
              <h1 className='text-2xl w-32 shrink-0'>Title*</h1>
              <input type="text" className='bg-gray-700 rounded-md p-2 flex-1 min-w-0' {...register("title", {required:true})} />
            </div>
            <div className='flex gap-4 items-center'>
              <h1 className='text-2xl w-32 shrink-0'>Description</h1>
              <input type="text" className='bg-gray-700 rounded-md p-2 flex-1 min-w-0' {...register("description")} />
            </div>
            <div className='flex gap-4 items-center'>
              <h1 className='text-2xl w-32 shrink-0'>Amount*</h1>
              <input type="number" className='bg-gray-700 rounded-md p-2 flex-1 min-w-0' {...register("amount", {required:true, valueAsNumber:true})} />
              <input type="date" className='bg-gray-700 rounded-md p-2 flex-1 min-w-0' {...register("date", {required:true})} />
            </div>
          </form>
        </div>
        <div className='bg-gray-700 rounded-md p-2 h-full w-full flex flex-col gap-5 items-center justify-center cursor-pointer'>
          <FaPlus className='text-4xl' />
          <h1>Upload an Invoice</h1>
        </div>
      </div>

      <div className='flex items-center justify-end p-4'>
          <button type='submit' className='bg-green-300 rounded-md p-2 text-black px-8 py-2
          '>Save</button>
      </div>
    </div>

  )
}