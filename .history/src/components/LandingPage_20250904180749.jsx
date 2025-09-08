import React from 'react'
import { useSelector } from 'react-redux'

export default function LandingPage() {
 const expenses = useSelector((state)=> state.expense.expenses)
 console.log(expenses)
  return (
        <div className='h-full w-full bg-black rounded-xl px-12 pt-16 pb-8'>
            <div className='h-full w-full gap-y-10'>
                <div className='flex flex-col items-start justify-start gap-y-10 text-white'>
                    <div className='flex flex-col items-center justify-center gap-y-10 text-white bg-red-500 w-full'>
                        <table>
                            <thead>
                                <tr >
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                { expenses.length > 0 && expenses.map((expense)=>(
                                    <tr key={expense.id}>
                                        <td>{expense.amount}</td>
                                        <td>{expense.date}</td>
                                        <td>{expense.category}</td>
                                        <td>{expense.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  )
}