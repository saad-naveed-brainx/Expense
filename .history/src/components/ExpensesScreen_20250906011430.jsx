import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus, FaFilter, FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { deleteExpense } from '../redux/ExpenseSlice'
import { CSVLink } from 'react-csv';


export default function ExpensesScreen() {
    const expenses = useSelector((state) => state.expense.expenses)
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [id, setId] = useState(null)
    const [filters, setFilters] = useState({
        categories: [],
        types: []
    })

    const filteredExpenses = expenses.filter(exp => {
        const categoryMatch = filters.categories.length === 0 || filters.categories.includes(exp.category)
        const typeMatch = filters.types.length === 0 || filters.types.includes(exp.type)
        return categoryMatch && typeMatch
    })

    const dispatch = useDispatch()
    const formatAmount = (value) => {
        return `$ ${Number(value || 0).toFixed(2)}`
    }

    const headers = [
        {label: "Title", key: "title"},
        {label: "Category", key: "category"},
        {label: "Date", key: "date"},
        {label: "Amount", key: "amount"},
        {label: "Type", key: "type"},
        {label: "Description", key: "description"},
        {label: "Reimbersable", key: "reimbersable"},
        {label: "CreatedAt", key: "createdAt"},
    ]

    const csvData = filteredExpenses.map(exp => ({
        title: exp.title,
        category: exp.category,
        date: exp.date,
        amount: exp.amount,
        type: exp.type,
        description: exp.description,
        reimbersable: exp.reimbersable,
        createdAt: exp.createdAt,
    }))

    const handleDeleteExpense = () => {
        dispatch(deleteExpense(id))
        setShowDeleteModal(false)
    }

    const handleEditExpense = (id) => {
        navigate(`/expenses/new/${id}`)
    }

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => {
            const currentFilters = prev[filterType]
            const isSelected = currentFilters.includes(value)
            
            if (isSelected) {
                return {
                    ...prev,
                    [filterType]: currentFilters.filter(item => item !== value)
                }
            } else {
                return {
                    ...prev,
                    [filterType]: [...currentFilters, value]
                }
            }
        })
    }

    const clearAllFilters = () => {
        setFilters({
            categories: [],
            types: []
        })
    }

    const hasActiveFilters = filters.categories.length > 0 || filters.types.length > 0

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
                                <CSVLink data={csvData} headers={headers} filename="expenses.csv" className='bg-green-300 rounded-md px-2 py-1 text-black'>
                                <p className='text-sm'>Export </p>
                                </CSVLink>
                                <button 
                                    className={`relative rounded-md px-2 py-1 transition-colors ${
                                        hasActiveFilters 
                                            ? 'text-white bg-blue-600 hover:bg-blue-700' 
                                            : 'text-black bg-green-300 hover:bg-green-400'
                                    }`} 
                                    onClick={() => setShowFilterModal(true)}
                                >
                                    <FaFilter className='text-lg' />
                                    {hasActiveFilters && (
                                        <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                                            {filters.categories.length + filters.types.length}
                                        </span>
                                    )}
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
                        
                        {showFilterModal && (
                            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
                                <div className='bg-gray-900 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto'>

                                    <div className='flex items-center justify-between p-6 border-b border-gray-700'>
                                        <h2 className='text-2xl font-bold text-white'>Filters</h2>
                                        <button 
                                            onClick={() => setShowFilterModal(false)}
                                            className='text-gray-400 hover:text-white transition-colors'
                                        >
                                            <FaCheck className='text-xl' />
                                        </button>
                                    </div>

                                    <div className='p-6 space-y-6'>
                                        <div>
                                            <h3 className='text-lg font-semibold text-white mb-3'>Categories</h3>
                                            <div className='grid grid-cols-2 gap-3'>
                                                {['food', 'transport', 'housing', 'utilities'].map(category => (
                                                    <button
                                                        key={category}
                                                        onClick={() => handleFilterChange('categories', category)}
                                                        className={`p-3 rounded-lg text-left transition-all duration-200 ${
                                                            filters.categories.includes(category)
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                        }`}
                                                    >
                                                        <div className='flex items-center justify-between'>
                                                            <span className='capitalize font-medium'>{category}</span>
                                                            {filters.categories.includes(category) && (
                                                                <FaCheck className='text-sm' />
                                                            )}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-semibold text-white mb-3'>Transaction Type</h3>
                                            <div className='grid grid-cols-2 gap-3'>
                                                {['expense', 'income'].map(type => (
                                                    <button
                                                        key={type}
                                                        onClick={() => handleFilterChange('types', type)}
                                                        className={`p-3 rounded-lg text-left transition-all duration-200 ${
                                                            filters.types.includes(type)
                                                                ? type === 'expense' 
                                                                    ? 'bg-red-600 text-white'
                                                                    : 'bg-green-600 text-white'
                                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                        }`}
                                                    >
                                                        <div className='flex items-center justify-between'>
                                                            <span className='capitalize font-medium'>{type}</span>
                                                            {filters.types.includes(type) && (
                                                                <FaCheck className='text-sm' />
                                                            )}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        {hasActiveFilters && (
                                            <div className='bg-gray-800 rounded-lg p-4'>
                                                <h4 className='text-sm font-medium text-gray-300 mb-2'>Active Filters:</h4>
                                                <div className='flex flex-wrap gap-2'>
                                                    {filters.categories.map(category => (
                                                        <span
                                                            key={`cat-${category}`}
                                                            className='inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs rounded-full'
                                                        >
                                                            {category}
                                                            <button
                                                                onClick={() => handleFilterChange('categories', category)}
                                                                className='hover:bg-green-700 rounded-full p-0.5'
                                                            >
                                                                <FaTimes className='text-xs' />
                                                            </button>
                                                        </span>
                                                    ))}
                                                    {filters.types.map(type => (
                                                        <span
                                                            key={`type-${type}`}
                                                            className={`inline-flex items-center gap-1 px-2 py-1 text-white text-xs rounded-full ${
                                                                type === 'expense' ? 'bg-red-600' : 'bg-green-600'
                                                            }`}
                                                        >
                                                            {type}
                                                            <button
                                                                onClick={() => handleFilterChange('types', type)}
                                                                className={`rounded-full p-0.5 ${
                                                                    type === 'expense' ? 'hover:bg-red-700' : 'hover:bg-green-700'
                                                                }`}
                                                            >
                                                                <FaTimes className='text-xs' />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800 rounded-b-xl'>
                                        <button
                                            onClick={clearAllFilters}
                                            className='px-4 py-2 text-gray-300 hover:text-white transition-colors'
                                            disabled={!hasActiveFilters}
                                        >
                                            Clear All
                                        </button>
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
                                            {filteredExpenses && filteredExpenses.length > 0 ? (
                                                filteredExpenses.map((expense) => (
                                                    <tr key={expense.id} className={`${expense.type === 'expense' ? 'bg-red-600' : 'bg-green-600'}`}>
                                                        <td className='py-4 px-6 overflow-hidden text-ellipsis whitespace-nowrap'>{expense.title || '—'}</td>
                                                        <td className='py-4 px-6'>
                                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${categoryBadgeClasses(expense.category)}`}>
                                                                {expense.category || 'Uncategorized'}
                                                            </span>
                                                        </td>
                                                        <td className='py-4 px-6'>{expense.date ? new Date(expense.date).toLocaleDateString() : '—'}</td>
                                                        <td className='py-4 px-6 text-left font-semibold'>{formatAmount(expense.amount)}</td>
                                                        <td className='py-4 px-6 font-semibold flex items-center gap-8'>
                                                            <button className='text-green-300 cursor-pointer' onClick={() => {handleEditExpense(expense.id);}}>
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