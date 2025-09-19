import React, { useState, useEffect } from 'react'
import { FaPlus, FaFilter, FaEdit, FaTrash, FaTimes, FaCheck, FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate, useLoaderData } from 'react-router-dom'
import { CSVLink } from 'react-csv';
import { CSV_HEADERS, EXPENSE_CATEGORIES, TRANSACTION_TYPES } from '../../../utils/constants';
import { formatAmount, getCategoryBadgeClasses, prepareCsvData } from '../../../utils/helpers';
import { api } from '../../../api/client.js';

export default function ExpenseList() {
    const loaderData = useLoaderData()

    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [paginatedExpenses, setPaginatedExpenses] = useState([]);

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (loaderData) {
            if (Array.isArray(loaderData.expenses)) {
                console.log('loaderData if running', loaderData.expenses);
                setExpenses(loaderData.expenses);
                setHasMore(loaderData.hasMore)
            } else if (Array.isArray(loaderData.data.expenses)) {
                console.log('loaderData else if running', loaderData.data.expenses);
                setExpenses(loaderData.data.expenses);
                setHasMore(loaderData.data.hasMore)
            } else if (loaderData.success === false) {
                console.log('loaderData else if running', loaderData.data.expenses);
                setExpenses([]);
                setHasMore(false)
            }
        }
    }, [loaderData]);

    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [id, setId] = useState(null)
    const [filters, setFilters] = useState({
        categories: [],
        types: []
    })
    const [makeCall, setMakeCall] = useState(false)
    const [showSearchField, setShowSearchField] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)

    const fetchExpenses = async (isLoadMore = false) => {
        try {
            setIsLoading(true)

            const currentPage = isLoadMore ? page : 1;
            const params = {
                page: currentPage,
                limit: limit
            };

            if (searchText && searchText.trim() !== '') {
                params.title = searchText.trim();
            }

            if (filters.categories.length > 0) {
                params.category = filters.categories.join(',');
            }

            if (filters.types.length > 0) {
                params.type = filters.types.join(',');
            }

            console.log('Params object:', params);
            const data = await api.get('/expense/all', params);
            console.log('data', data);

            const hasActiveFilters = (searchText && searchText.trim() !== '') ||
                filters.categories.length > 0 ||
                filters.types.length > 0;

            if (hasActiveFilters) {
                if (isLoadMore) {
                    setFilteredExpenses(prev => [...prev, ...data.expenses]);
                } else {
                    setFilteredExpenses(data.expenses);
                }
                setExpenses([]);
            } else {
                if (isLoadMore) {
                    setExpenses(prev => [...prev, ...data.expenses]);
                } else {
                    setExpenses(data.expenses);
                }
                setFilteredExpenses([]);
            }

            setHasMore(data.hasMore);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching expenses:', error);
            setExpenses([]);
            setFilteredExpenses([]);
            setHasMore(false)
            setIsLoading(false)
        }
    };

    useEffect(() => {
        const hasActiveFilters = searchText.trim() !== '' ||
            filters.categories.length > 0 ||
            filters.types.length > 0;

        if (!hasActiveFilters && page === 1) {
            if (loaderData) {
                if (Array.isArray(loaderData.expenses)) {
                    console.log('Using loaderData.expenses:', loaderData.expenses);
                    setExpenses(loaderData.expenses);
                    setFilteredExpenses([]);
                    setHasMore(loaderData.hasMore);
                } else if (Array.isArray(loaderData.data?.expenses)) {
                    console.log('Using loaderData.data.expenses:', loaderData.data.expenses);
                    setExpenses(loaderData.data.expenses);
                    setFilteredExpenses([]);
                    setHasMore(loaderData.data.hasMore);
                } else {
                    console.log('No valid expenses found in loaderData');
                    setExpenses([]);
                    setFilteredExpenses([]);
                    setHasMore(false);
                }
            }
            return;
        }

        const timeout = setTimeout(() => {
            setPage(1);
            fetchExpenses(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchText, filters.categories, filters.types, loaderData, makeCall]);

    useEffect(() => {
        if (page > 1) {
            fetchExpenses(true);
        }
    }, [page]);

    const csvData = prepareCsvData(expenses)

    const handleDeleteExpense = async () => {
        try {
            await api.delete(`/expense/delete/${id}`);
            navigate('/expenses', { replace: true })
        } catch (error) {
            console.error('Error deleting expense:', error)
        }
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
        });
        setSearchText('');
        setPage(1);
        setShowSearchField(false);
    }


    const loadMore = () => {
        if (hasMore) {
            setPage(prev => prev + 1)
        }
    }



    const hasActiveFilters = filters.categories.length > 0 || filters.types.length > 0 || searchText.trim() !== ''

    return (
        <div className='h-full w-full bg-white dark:bg-black rounded-xl px-12 pt-16 pb-8 overflow-y-auto'>
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center z-50 rounded-xl">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 dark:border-gray-400"></div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
                    </div>
                </div>
            )}

            <div className='h-full w-full'>
                <div className='dark:text-white text-black'>
                    <div className='w-full rounded-2xl border border-gray-800'>
                        <div className='px-6 py-4 border-b border-gray-800 flex items-center justify-between'>
                            <h2 className='text-2xl font-semibold'>Your Transactions</h2>
                            <div className='flex items-center gap-2'>
                                <button className='flex items-center gap-2 bg-green-300 rounded-md px-2 py-1 text-black' onClick={() => navigate('/expenses/new')}>
                                    <FaPlus className='text-sm' />
                                    <p className='text-sm'>New Entry</p>
                                </button>
                                <CSVLink
                                    data={csvData || []}
                                    headers={CSV_HEADERS}
                                    filename="expenses.csv"
                                    className='bg-green-300 rounded-md px-2 py-1 text-black'
                                >
                                    <p className='text-sm'>Export</p>
                                </CSVLink>
                                <button
                                    className={`relative rounded-md px-2 py-1 transition-colors ${hasActiveFilters
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
                                {
                                    !showSearchField && (
                                        <button className='bg-green-300 rounded-md px-2 py-1 text-black' onClick={() => setShowSearchField(!showSearchField)}>
                                            <FaSearch className='text-lg' />
                                        </button>
                                    )
                                }
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showSearchField
                                    ? 'max-w-xs opacity-100 transform translate-x-0'
                                    : 'max-w-0 opacity-0 transform -translate-x-4'
                                    }`}>
                                    <div className='flex items-center gap-2 bg-gray-200 rounded-md px-2 py-1 text-black whitespace-nowrap'>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            className='bg-gray-200 rounded-md px-2 py-1 text-black outline-none w-60 transition-all duration-300'
                                            autoFocus={showSearchField}
                                        />
                                        <button onClick={() => {
                                            setSearchText('');
                                            setShowSearchField(false);
                                            setPage(1);
                                        }} className='hover:bg-gray-300 bg-white rounded-md p-1 transition-colors duration-200'>
                                            <MdOutlineClose className='text-lg' />
                                        </button>
                                    </div>
                                </div>
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
                                            onClick={() => { setShowFilterModal(false); setMakeCall(!makeCall) }}
                                            className='text-gray-400 hover:text-white transition-colors'
                                        >
                                            <FaCheck className='text-xl' />
                                        </button>
                                    </div>

                                    <div className='p-6 space-y-6'>
                                        <div>
                                            <h3 className='text-lg font-semibold text-white mb-3'>Categories</h3>
                                            <div className='grid grid-cols-2 gap-3'>
                                                {Object.values(EXPENSE_CATEGORIES).map(category => (
                                                    <button
                                                        key={category}
                                                        onClick={() => handleFilterChange('categories', category)}
                                                        className={`p-3 rounded-lg text-left transition-all duration-200 ${filters.categories.includes(category)
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
                                                {Object.values(TRANSACTION_TYPES).map(type => (
                                                    <button
                                                        key={type}
                                                        onClick={() => handleFilterChange('types', type)}
                                                        className={`p-3 rounded-lg text-left transition-all duration-200 ${filters.types.includes(type)
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
                                                            className={`inline-flex items-center gap-1 px-2 py-1 text-white text-xs rounded-full ${type === 'expense' ? 'bg-red-600' : 'bg-green-600'
                                                                }`}
                                                        >
                                                            {type}
                                                            <button
                                                                onClick={() => handleFilterChange('types', type)}
                                                                className={`rounded-full p-0.5 ${type === 'expense' ? 'hover:bg-red-700' : 'hover:bg-green-700'
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
                                <div className="overflow-y-auto h-full rounded-b-2xl">
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
                                                    <tr key={expense._id} className={`${expense.type === 'expense' ? 'bg-red-600' : 'bg-green-600'}`}>
                                                        <td className='py-4 px-6 overflow-hidden text-ellipsis whitespace-nowrap'>{expense.title || '—'}</td>
                                                        <td className='py-4 px-6'>
                                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getCategoryBadgeClasses(expense.category)}`}>
                                                                {expense.category || 'Uncategorized'}
                                                            </span>
                                                        </td>
                                                        <td className='py-4 px-6'>{expense.date ? new Date(expense.date).toLocaleDateString() : '—'}</td>
                                                        <td className='py-4 px-6 text-left font-semibold'>{formatAmount(expense.amount)}</td>
                                                        <td className='py-4 px-6 font-semibold flex items-center gap-8'>
                                                            <button className='text-green-300 cursor-pointer' onClick={() => { handleEditExpense(expense._id); }}>
                                                                <FaEdit className='text-2xl' />
                                                            </button>
                                                            <button className='text-red-300 cursor-pointer' onClick={() => { setShowDeleteModal(true); setId(expense._id) }}>
                                                                <FaTrash className='text-2xl' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : expenses && expenses.length > 0 ? (
                                                expenses.map((expense) => (
                                                    <tr key={expense._id} className={`${expense.type === 'expense' ? 'bg-red-600' : 'bg-green-600'}`}>
                                                        <td className='py-4 px-6 overflow-hidden text-ellipsis whitespace-nowrap'>{expense.title || '—'}</td>
                                                        <td className='py-4 px-6'>
                                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getCategoryBadgeClasses(expense.category)}`}>
                                                                {expense.category || 'Uncategorized'}
                                                            </span>
                                                        </td>
                                                        <td className='py-4 px-6'>{expense.date ? new Date(expense.date).toLocaleDateString() : '—'}</td>
                                                        <td className='py-4 px-6 text-left font-semibold'>{formatAmount(expense.amount)}</td>
                                                        <td className='py-4 px-6 font-semibold flex items-center gap-8'>
                                                            <button className='text-green-300 cursor-pointer' onClick={() => { handleEditExpense(expense._id); }}>
                                                                <FaEdit className='text-2xl' />
                                                            </button>
                                                            <button className='text-red-300 cursor-pointer' onClick={() => { setShowDeleteModal(true); setId(expense._id) }}>
                                                                <FaTrash className='text-2xl' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className='py-8 px-6 text-center text-gray-400' colSpan={5}>
                                                        {loaderData?.success === false && loaderData?.message ?
                                                            `${loaderData.message}. Please sign in to view your expenses.` :
                                                            'No expenses yet'
                                                        }
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {hasMore && (
                        <button onClick={loadMore} className='bg-amber-200 px-4 py-2 mt-10 text-black rounded-md self-center w-full'>
                            See More
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
