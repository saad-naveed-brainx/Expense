import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpenseById } from "../expensesSlice";
import { useNavigate, useParams, useActionData, useLoaderData } from "react-router";
import {
    CATEGORY_OPTIONS,
    TYPE_OPTIONS,
    VALIDATION_REGEX,
    VALIDATION_MESSAGES
} from "../../../utils/constants";
import { api } from '../../../api/client.js';

export default function ExpenseForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const loaderData = useLoaderData();

    const expense = id ? loaderData : null;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        if (id && expense) {
            setValue("title", expense.title);
            setValue("reimbursable", expense.reimbursable);
            setValue("amount", expense.amount);
            setValue("date", expense.date ? expense.date.split('T')[0] : '');
            setValue("category", expense.category);
            setValue("type", expense.type);
            setValue("description", expense.description);
        }
    }, [id, expense, setValue]);

    const onSubmit = async (data) => {
        if (id) {
            try {
                const responseData = await api.put(`/expense/update/${id}`, data);
                if (responseData.success) {
                    reset();
                    navigate('/expenses', { replace: true });
                } else {
                    setErrorMessage('Failed to update expense');
                }
            } catch (error) {
                console.error('Error updating expense:', error);
                setErrorMessage('Failed to update expense');
            }
        } else {
            try {
                const responseData = await api.post('/expense/create', data);
                if (responseData.success) {
                    reset();
                    navigate('/expenses', { replace: true });
                } else {
                    setErrorMessage('Please login first to start adding expenses')
                }
            } catch (error) {
                console.error('Error creating expense:', error);
                setErrorMessage('Failed to create expense');
            }
        }
    };


    return (
        <div className="dark:bg-black bg-white rounded-xl h-full flex flex-col py-8 px-12 dark:text-white text-black gap-5 overflow-y-auto relative">
            {errorMessage && (
                <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
                    <div className="dark:bg-gray-800 bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="dark:text-white text-black text-2xl font-bold">Error</h1>
                            <button onClick={() => setErrorMessage('')} className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-black transition-colors">
                                <IoMdClose className="text-2xl" />
                            </button>
                        </div>
                        <div className="mb-6">
                            <p className="text-red-500 text-center">{errorMessage}</p>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => navigate("/settings/signin")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Go to Sign In
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <h1 className="dark:text-white text-black text-4xl font-bold">New Expense</h1>
                    <button onClick={() => navigate('/expenses', { replace: true })} className="dark:text-white text-black">
                        <IoMdClose className="text-4xl" />
                    </button>
                </div>
                <div className="w-full h-1 dark:bg-gray-700 bg-gray-300"></div>
            </div>
            <div className="flex items-center justify-evenly h-full gap-10">
                <div className="w-full">
                    <form
                        id="expenseForm"
                        className="p-10 flex flex-col gap-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex gap-4 items-start">
                            <h1 className="dark:text-white text-black text-2xl w-32 shrink-0">Title*</h1>
                            <div className="w-full flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter Title"
                                    className="dark:bg-gray-700 bg-gray-200 rounded-md p-2 flex-1 min-w-0 dark:placeholder:text-gray-300 placeholder:text-gray-600 dark:text-white text-black"
                                    {...register("title", {
                                        required: VALIDATION_MESSAGES.TITLE_REQUIRED,
                                        minLength: {
                                            value: 3,
                                            message: VALIDATION_MESSAGES.TITLE_MIN_LENGTH,
                                        },
                                        pattern: {
                                            value: VALIDATION_REGEX.TITLE,
                                            message: VALIDATION_MESSAGES.TITLE_PATTERN,
                                        },
                                    })}
                                />
                                {errors.title && (
                                    <p className="text-red-500">{errors.title.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="w-32 shrink-0"></div>
                            <div className="flex items-center gap-2 flex-1">
                                <input
                                    type="checkbox"
                                    name="reimbursable"
                                    id="reimbursable"
                                    className="w-5 h-5 rounded-xl "
                                    {...register("reimbursable")}
                                />
                                <label htmlFor="reimbursable">Reimbursable</label>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <h1 className="text-2xl w-32 shrink-0">Amount*</h1>
                            <div className="w-full flex flex-col gap-2">
                                <input
                                    type="number"
                                    placeholder="Enter Amount"
                                    className="dark:bg-gray-700 bg-gray-200 rounded-md p-2 flex-1 min-w-0 dark:placeholder:text-gray-300 placeholder:text-gray-600 dark:text-white text-black"
                                    {...register("amount", {
                                        required: VALIDATION_MESSAGES.AMOUNT_REQUIRED,
                                        min: { value: 0, message: VALIDATION_MESSAGES.AMOUNT_MIN },
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.amount && (
                                    <p className="text-red-500">{errors.amount.message}</p>
                                )}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <input
                                    type="date"
                                    placeholder="Select Date"
                                    className="dark:bg-gray-700 bg-gray-200 rounded-md p-2 flex-1 min-w-0 dark:placeholder:text-gray-300 placeholder:text-gray-600 dark:text-white text-black"
                                    {...register("date", {
                                        required: VALIDATION_MESSAGES.DATE_REQUIRED,
                                        max: {
                                            value: new Date().toISOString(),
                                            message: VALIDATION_MESSAGES.DATE_FUTURE,
                                        },
                                    })}
                                />
                                {errors.date && (
                                    <p className="text-red-500">{errors.date.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <h1 className="text-2xl w-32 shrink-0">Category*</h1>
                            <div className="flex-1 flex flex-col gap-1">
                                <select
                                    className="dark:bg-gray-700 bg-gray-200 rounded-md p-3 w-full dark:text-white text-black"
                                    {...register("category", {
                                        required: VALIDATION_MESSAGES.CATEGORY_REQUIRED,
                                    })}
                                >
                                    <option value="" className="dark:text-gray-300 text-gray-600">
                                        Select Category
                                    </option>
                                    {CATEGORY_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm">
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <h1 className="text-2xl w-32 shrink-0">Type*</h1>
                            <div className="w-full flex flex-col gap-2">
                                <select
                                    className="dark:bg-gray-700 bg-gray-200 rounded-md p-2 flex-1 min-w-0 dark:text-white text-black"
                                    {...register("type", { required: VALIDATION_MESSAGES.TYPE_REQUIRED })}
                                >
                                    <option value="" className="dark:text-gray-300 text-gray-600">
                                        Select Type
                                    </option>
                                    {TYPE_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {errors.type && (
                                    <p className="text-red-500 text-sm">{errors.type.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <h1 className="text-2xl w-32 shrink-0">Description</h1>
                            <textarea
                                rows="8"
                                type="text"
                                placeholder="Enter Description"
                                className="dark:bg-gray-700 bg-gray-200 rounded-md p-2 flex-1 min-w-0 dark:placeholder:text-gray-300 placeholder:text-gray-600 dark:text-white text-black"
                                {...register("description")}
                            />
                        </div>
                    </form>
                </div>
                <div className="dark:bg-gray-700 bg-gray-200 rounded-md p-2 h-full w-full flex flex-col gap-5 items-center justify-center cursor-pointer">
                    <FaPlus className="text-4xl" />
                    <h1>Upload an Invoice</h1>
                </div>
            </div>
            <div className="flex items-center justify-end p-4">
                <button
                    form="expenseForm"
                    type="submit"
                    className="bg-green-300 rounded-md p-2 text-black px-8 py-2"
                >
                    {id ? "Update" : "Save"}
                </button>
            </div>
        </div>
    );
}
