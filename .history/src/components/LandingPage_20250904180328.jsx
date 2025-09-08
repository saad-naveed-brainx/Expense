import React from 'react'
import { useSelector } from 'react-redux'

export default function LandingPage() {
 const expenses = useSelector((state)=> state.expense.expenses)
 console.log(expenses)
  return (
        <div className=' h-full w-full bg-black rounded-xl px-12 pt-16 pb-8'>
            <div className=' flex items-center justify-center h-full w-full gap-y-10'>
                <div className='flex flex-col items-start justify-center gap-y-10 text-white'>
                    <div className='flex flex-col items-center justify-center gap-y-10 text-white bg-red-500 w-full'>
                    { expenses.length > 0 && expenses.map((expense)=>(
                        <div className='flex flex-col items-center justify-center gap-y-10 text-white' key={expense.id}>
                            <h1>{expense.amount}</h1>
                            <h1>{expense.date}</h1>
                            <h1>{expense.category}</h1>
                            <h1>{expense.description}</h1>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
  )
}