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
      <div className='w-full h-1 bg-gray-700'></div>
      </div>
      <div className='flex items-center justify-evenly h-full gap-10'>
        <div className='w-full'>
          <form className='p-10 flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-4 items-center'>
              <h1 className='text-2xl w-32 shrink-0'>Title*</h1>
              <input type="text" placeholder='Enter Title' className='bg-gray-700 rounded-md p-2 flex-1 min-w-0' {...register("title", {required:true})} />
            </div>
            <div className='flex gap-4 items-center'>
              <div className='w-32 shrink-0'></div>
              <div className='flex items-center gap-2 flex-1'>
                <input type="checkbox" name="reimbersable" id="reimbersable" className='w-5 h-5 rounded-xl ' {...register("reimbersable")} />
                <label htmlFor="reimbersable">Reimbersable</label>
              </div>
            </div>
            <div className='flex gap-4 items-center'>
              <h1 className='text-2xl w-32 shrink-0'>Amount*</h1>
              <input
                type="number"
                min={0}
                placeholder='Enter Amount'
                className='bg-gray-700 rounded-md p-2 flex-1 min-w-0 '
                {...register("amount", { required: true, min: 0, valueAsNumber: true })}
              />
              <input type="date"  placeholder='Select Date' className='bg-gray-700 rounded-md p-2 flex-1 min-w-0' {...register("date", {required:true})} />
            </div>
            <div className='flex gap-4 items-center'>
              <h1 className='text-2xl w-32 shrink-0'>Category*</h1>
              <select placeholder='Select Category' className='bg-gray-700 rounded-md p-3 flex-1 min-w-0' {...register("category", {required:true})}>
                <option className='text-gray-400' value="select">Select Category</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="housing">Housing</option>
                <option value="utilities">Utilities</option>
              </select>
            </div>
            <div className='flex gap-4 items-start'>
              <h1 className='text-2xl w-32 shrink-0'>Description</h1>
              <textarea rows="8" type="text" placeholder='Enter Description' className='bg-gray-700 rounded-md p-2 flex-1 min-w-0' {...register("description")} />
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