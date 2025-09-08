import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus, FaFilter, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { deleteExpense } from '../redux/ExpenseSlice'


export default function ExpensesScreen() {
    const expenses = useSelector((state) => state.expense.expenses)
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [id, setId] = useState(null)
    const dispatch = useDispatch()
    const formatAmount = (value) => {
        return `$ ${Number(value || 0).toFixed(2)}`
    }

    const handleDeleteExpense = () => {
        dispatch(deleteExpense(id))
        setShowDeleteModal(false)
    }

    const handleEditExpense = () => {
        console.log(id + "is the id")
        navigate(`/expenses/new/${id}`)
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
        <div className='h-full w-full bg-black rounded-xl px-12 pt-16 pb-8 overflow-y-auto'>
            <div className='h-full w-full'>
                <div className='text-white'>
                    <div className='w-full rounded-2xl border border-gray-800'>
                        <div className='px-6 py-4 border-b border-gray-800 flex items-center justify-between'>
                            <h2 className='text-2xl font-semibold'>Your Transactions</h2>
                            <div className='flex items-center gap-2'>
                                <button className='flex items-center gap-2 bg-green-300 rounded-md px-2 py-1 text-black' onClick={() => navigate('/expenses/new')}>
                                    <FaPlus className='text-sm' />
                                    <p className='text-sm'>New Entry</p>
                                </button>
                                <button className='text-black bg-green-300 rounded-md px-2 py-1'>
                                    <FaFilter className='text-lg' />
                                </button>
                            </div>
                        </div>
                        {showDeleteModal && (
                            <div className='fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50'>
                                <div className='bg-white rounded-md p-4 flex flex-col gap-4 items-center'>
                                    <p className='text-gray-500'>Are you sure you want to delete this entry?</p>
                                    <div className='flex items-center gap-10'>
                                        <button className='bg-gray-500 text-white rounded-md px-2 py-1 cursor-pointer' onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                        <button className='bg-red-500 text-white rounded-md px-2 py-1 cursor-pointer' onClick={() => handleDeleteExpense()}>Delete</button>
                                    </div>
                                </div>  
                            </div>
                        )}
                        <div className="w-full h-full">
                            <div className="relative">
                                <table className="w-full table-fixed">
                                    <colgroup>
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                    </colgroup>
                                    <thead className="text-gray-400 text-sm bg-black">
                                        <tr>
                                            <th className='py-3 px-6 text-left text-xl font-bold'>Title</th>
                                            <th className='py-3 px-6 text-left text-xl font-bold'>Category</th>
                                            <th className='py-3 px-6 text-left text-xl font-bold'>Date</th>
                                            <th className='py-3 px-6 text-left text-xl font-bold'>Amount</th>
                                            <th className='py-3 px-6 text-left text-xl font-bold'>Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto h-full">
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
                                                    <tr key={expense.id} className={`${expense.type === 'expense' ? 'bg-red-600' : 'bg-green-600'}`}>
                                                        <td className='py-4 px-6'>{expense.title || '—'}</td>
                                                        <td className='py-4 px-6'>
                                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${categoryBadgeClasses(expense.category)}`}>
                                                                {expense.category || 'Uncategorized'}
                                                            </span>
                                                        </td>
                                                        <td className='py-4 px-6'>{expense.date ? new Date(expense.date).toLocaleDateString() : '—'}</td>
                                                        <td className='py-4 px-6 text-left font-semibold'>{formatAmount(expense.amount)}</td>
                                                        <td className='py-4 px-6 font-semibold flex items-center gap-8'>
                                                            <button className='text-green-300 cursor-pointer' onClick={() => {setId(expense.id);handleEditExpense();}}>
                                                                <FaEdit className='text-2xl' />
                                                            </button>
                                                            <button className='text-red-300 cursor-pointer' onClick={() => {setShowDeleteModal(true); setId(expense.id)}}>
                                                                <FaTrash className='text-2xl' />
                                                            </button>
                                                        </td>
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