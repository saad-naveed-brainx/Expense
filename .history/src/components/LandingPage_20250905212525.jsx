import React from 'react'
import { useSelector } from 'react-redux'

export default function LandingPage() {
    const expenses = useSelector((state) => state.expense.expenses)

    console.log(expenses + "these are expenses")

    const recentExpenses = expenses.filter((expense) => expense.date >= new Date(new Date().setDate(new Date().getDate() - 7)))

    const formatAmount = (value) => {
        return `$ ${Number(value || 0).toFixed(2)}`
    }

    const categoryBadgeClasses = (category) => {
        switch ((category || '').toLowerCase()) {
            case 'food':
                return 'bg-indigo-900/40 text-indigo-300 '
            case 'transport':
                return 'bg-rose-900/40 text-rose-300'
            case 'housing':
                return 'bg-fuchsia-900/40 text-fuchsia-300'
            case 'utilities':
                return 'bg-teal-900/40 text-teal-300'
            default:
                return 'bg-gray-800 text-gray-300'
        }
    }

    return (
        <div className='h-full w-full bg-black rounded-xl px-12 pt-16 pb-8'>
            <div className='h-full w-full'>
                <div className='text-white'>
                    <div className='w-full rounded-2xl border border-gray-800'>
                        <div className='px-6 py-4 border-b border-gray-800'>
                            <h2 className='text-2xl font-semibold'>Recent Expenses</h2>
                        </div>
                        <div className="w-full">
                            <div className="relative">
                                <table className="w-full table-fixed">
                                    <colgroup>
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
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto max-h-[200px]">
                                    <table className="w-full table-fixed">
                                        <colgroup>
                                            <col style={{ width: "25%" }} />
                                            <col style={{ width: "25%" }} />
                                            <col style={{ width: "25%" }} />
                                            <col style={{ width: "25%" }} />
                                        </colgroup>
                                        <tbody className='divide-y divide-gray-800 text-gray-200'>
                                            {expenses && expenses.length > 0 ? (
                                                expenses.map((expense) => (
                                                    <tr key={expense.id} className={`${expense.type === 'expense' ? 'bg-red-600' : 'bg-green-600'}`>
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