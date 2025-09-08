import React from 'react'
import { useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";


export default function ExpensesScreen(){
    const expenses = useSelector((state) => state.expense.expenses)

    return (
        <div className='bg-black rounded-xl p-4 h-full flex flex-col py-8 px-12 text-white gap-15'>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
              <h1 className='text-white text-4xl font-bold'>Expenses</h1>
              <div>
              <button className='text-green-300'>
                <FaPlus className='text-4xl' />
                <p className='text-xl text-black'>
                    New Expense
                </p>
              </button>
              </div>
            </div>
            <div className='w-full h-1 bg-gray-700'></div>
          </div>
          <div className='flex items-center justify-evenly h-full gap-10'>
            <div className='w-full'>
              
        </div>
      )
    
}