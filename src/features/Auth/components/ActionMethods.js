import { api } from '../../../api/client.js';

export const signUpAction = async ({ request }) => {
    const formData = await request.formData();
    const name = (formData.get('name') || '').trim();
    const email = (formData.get('email') || '').trim();
    const password = (formData.get('password') || '').trim();

    const errors = {};

    if (!name) {
        errors.nameError = 'Name is required';
    } else if (name.length < 2) {
        errors.nameError = 'Name must be at least 2 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.emailError = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.emailError = 'Please enter a valid email address';
    }

    if (!password) {
        errors.passwordError = 'Password is required';
    } else if (password.length < 8) {
        errors.passwordError = 'Password must be at least 8 characters long';
    }

    if (Object.keys(errors).length > 0) {
        return { ...errors, formData: { name, email } };
    }

    try {
        await api.post('/auth/create-user', { name, email, password });
        return { success: true };

    } catch (error) {
        console.error('Network error:', error);
        return {
            responseError: error.message,
            formData: { name, email }
        };
    }
}


export const signInAction = async ({ request }) => {
    const formData = await request.formData();
    const email = (formData.get('email') || '').trim();
    const password = (formData.get('password') || '').trim();

    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.emailError = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.emailError = 'Please enter a valid email address';
    }

    if (!password) {
        errors.passwordError = 'Password is required';
    } else if (password.length < 6) {
        errors.passwordError = 'Password must be at least 6 characters long';
    }
    if (Object.keys(errors).length > 0) {
        return { ...errors, formData: { email } };
    }

    try {
        const userData = await api.post('/auth/sign-in', { email, password });
        console.log('userData', userData);

        return { success: true, user: userData.user };

    } catch (error) {
        console.error('Sign in error:', error);

        const errorMessage = error.message;

        if (errorMessage.includes('not found')) {
            return {
                responseError: 'Account not found. Please check your email or sign up.',
                formData: { email }
            };
        } else if (errorMessage.includes('many requests')) {
            return {
                responseError: 'Too many login attempts. Please try again later.',
                formData: { email }
            };
        } else if (errorMessage.includes('connect')) {
            return {
                responseError: 'Unable to connect to server. Please check your internet connection.',
                formData: { email }
            };
        }

        return {
            responseError: errorMessage || 'Failed to sign in. Please try again.',
            formData: { email }
        };
    }
}