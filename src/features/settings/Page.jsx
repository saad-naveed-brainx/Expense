import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client.js';
import { useDispatch } from 'react-redux';
import { logout } from '../Auth/AuthSlice';

export default function SettingsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignedOut, setIsSignedOut] = useState(false);

    useEffect(() => {
        if (!isSignedOut) return;

        const signOut = async () => {
            try {
                await api.post('/auth/sign-out');
                dispatch(logout());
                navigate('/settings')
            } catch (error) {
                console.error('Sign out error:', error)
                setIsSignedOut(false)
            }
        }
        signOut()
    }, [isSignedOut, navigate])


    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center h-full">
            <button onClick={() => { setIsSignedOut(true) }} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                Sign Out
            </button>
        </div>

    )
}