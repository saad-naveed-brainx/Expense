import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router';

export default function SettingsPage() {
    const navigate = useNavigate();
    const loaderData = useLoaderData();
    console.log('loaderData', loaderData)
    const { profile } = loaderData || {};
    const [isSignedOut, setIsSignedOut] = useState(false);

    useEffect(() => {
        if (!isSignedOut) return;

        const signOut = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/sign-out', {
                    method: 'POST',
                    credentials: 'include'
                })
                if (!response.ok) {
                    throw new Error('Failed to sign out')
                }
                navigate('/settings')
            } catch (error) {
                console.error('Sign out error:', error)
                setIsSignedOut(false)
            }
        }

        signOut()
    }, [isSignedOut, navigate])


    return (
        <div className="h-full w-full bg-white dark:bg-black rounded-xl px-12 pt-16 pb-8 overflow-y-auto">
            {profile ? (
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Profile Settings</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage your account information</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-600 mb-8">
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                                    {profile.name || 'Unknown User'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {profile.email}
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => { setIsSignedOut(true) }} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            Sign Out
                        </button>
                    </div>
                </div>
            ) :
                <div className="h-full w-full flex flex-col items-center justify-center gap-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Settings</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            Manage your account and preferences
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 w-full max-w-md">
                        <button
                            onClick={() => navigate('signup')}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-lg"
                        >
                            Sign Up
                        </button>

                        <button
                            onClick={() => navigate('signin')}
                            className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-white font-semibold py-4 px-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-lg"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Choose an option to continue
                        </p>
                    </div>
                </div>

            }
        </div>
    )
}