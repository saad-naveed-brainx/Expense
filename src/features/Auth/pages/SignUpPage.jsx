import React, { useEffect } from 'react';
import { Form, useActionData, useNavigation, useNavigate } from 'react-router';
import { IoMdArrowBack, IoMdCheckmarkCircle } from 'react-icons/io';

export default function SignUpPage() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const navigate = useNavigate();

    const { nameError, emailError, passwordError, responseError, success, formData } = actionData || {};
    const isSubmitting = navigation.state === 'submitting';

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/settings/signup');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    return (
        <div className="relative h-full w-full flex items-center justify-center bg-white dark:bg-black rounded-xl px-12 pt-16 pb-8">
            <div className="absolute top-6 left-6">
                <button
                    type="button"
                    onClick={() => navigate('/settings/signin')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow border border-gray-300 dark:border-gray-700 font-medium"
                >
                    <IoMdArrowBack className="text-2xl" />
                    Back
                </button>
            </div>

            {success && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
                    <div className='bg-white dark:bg-gray-800 rounded-xl p-8 mx-4 max-w-md w-full shadow-2xl'>
                        <div className='text-center'>
                            <IoMdCheckmarkCircle className='text-6xl text-green-500 mx-auto mb-4' />
                            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                                Account Created Successfully!
                            </h3>
                            <p className='text-gray-600 dark:text-gray-300 mb-6'>
                                Redirecting you to sign in page...
                            </p>
                            <div className='flex items-center justify-center gap-4'>
                                <button
                                    type="button"
                                    onClick={() => navigate('/settings/signin')}
                                    className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200'
                                >
                                    Sign In Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex flex-col bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl w-full max-w-md px-8 py-12 gap-6 shadow-lg'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <h1 className='text-3xl font-bold text-black dark:text-white'>Sign Up</h1>
                    <p className='text-gray-500 dark:text-gray-400 text-center'>
                        Create your account to get started
                    </p>
                </div>
                <Form action="/settings/signup" method="post" className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-sm font-medium text-black dark:text-white'>
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Enter your full name'
                            defaultValue={formData?.name || ''}
                            required
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
                        />
                        {nameError && (
                            <p className='text-red-700 dark:text-red-300 text-sm'>{nameError}</p>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='text-sm font-medium text-black dark:text-white'>
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Enter your email address'
                            defaultValue={formData?.email || ''}
                            required
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
                        />
                        {emailError && (
                            <p className='text-red-700 dark:text-red-300 text-sm'>{emailError}</p>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password" className='text-sm font-medium text-black dark:text-white'>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Create a strong password'
                            required
                            minLength={8}
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
                        />
                        {passwordError && (
                            <p className='text-red-700 dark:text-red-300 text-sm'>{passwordError}</p>
                        )}
                    </div>

                    {responseError && (
                        <div className='p-3 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'>
                            <p className='text-red-700 dark:text-red-300 text-sm'>{responseError}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 mt-4 ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Account...
                            </div>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </Form>

                <div className='text-center'>
                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                        Already have an account?{' '}
                        <a href="/settings/signin" className='text-green-500 hover:text-green-600 font-medium transition-colors duration-200'>
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}