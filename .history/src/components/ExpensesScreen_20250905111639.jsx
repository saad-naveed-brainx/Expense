import React from 'react'
import { useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";


export default function ExpensesScreen(){
    const expenses = useSelector((state) => state.expense.expenses)

    return (
        <div className='h-full w-full bg-black rounded-xl px-12 pt-16 pb-8'>
            <div className='h-full w-full'>
                <div className='text-white'>
                    <div className='w-full rounded-2xl border border-gray-800'>
                        <div className='px-6 py-4 border-b border-gray-800'>
                            <h2 className='text-2xl font-semibold'>Expenses</h2>
                        </div>
                        <div className="w-full">
                            <div className="relative">
                                <table className="w-full table-fixed">
                                    <colgroup>
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                    </colgroup>
                                    <thead className="text-gray-400 text-sm bg-black sticky top-0 z-10">
                                        <tr>
                                            <th className='py-3 px-6 text-left font-medium'>Title</th>
                                            <th className='py-3 px-6 text-left font-medium'>Category</th>
                                            <th className='py-3 px-6 text-left font-medium'>Date</th>
                                            <th className='py-3 px-6 text-right font-medium'>Amount</th>
                                            <th className='py-3 px-6 text-right font-medium'>Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto">
                                    <table className="w-full table-fixed">
                                        <colgroup>
                                            <col style={{ width: "25%" }} />
                                            <col style={{ width: "25%" }} />
                                            <col style={{ width: "25%" }} />
                                            <col style={{ width: "25%" }} />
                                            <col style={{ width: "25%" }} />
                                        </colgroup>
                                        <tbody className='divide-y divide-gray-800 text-gray-200'>
                                            {expenses && expenses.length > 0 ? (
                                                expenses.map((expense) => (
                                                    <tr key={expense.id}>
                                                        <td className='py-4 px-6'>{expense.title || '—'}</td>
                                                        <td className='py-4 px-6'>
                                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${categoryBadgeClasses(expense.category)}`}>
                                                                {expense.category || 'Uncategorized'}
                                                            </span>
                                                        </td>
                                                        <td className='py-4 px-6'>{expense.date ? new Date(expense.date).toLocaleDateString() : '—'}</td>
                                                        <td className='py-4 px-6 text-right font-semibold'>{formatAmount(expense.amount)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className='py-8 px-6 text-center text-gray-400' colSpan={4}>No expenses yet</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
    
}