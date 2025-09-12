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
        const response = await fetch('http://localhost:3000/auth/create-user', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                responseError: errorData.message || 'Failed to create user',
                formData: { name, email }
            };
        }
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

    // Validation
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

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
        return { ...errors, formData: { email } };
    }

    try {
        const response = await fetch('http://localhost:3000/auth/sign-in', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        console.log('response', response);

        if (!response.ok) {
            const errorData = await response.json();

            if (response.status === 404) {
                return {
                    responseError: 'Account not found. Please check your email or sign up.',
                    formData: { email }
                };
            } else if (response.status === 429) {
                return {
                    responseError: 'Too many login attempts. Please try again later.',
                    formData: { email }
                };
            } else {
                return {
                    responseError: errorData.message || 'Failed to sign in. Please try again.',
                    formData: { email }
                };
            }
        }

        const userData = await response.json();
        console.log('userData', userData);

        // Redirect to dashboard on success
        return { success: true, user: userData.user };

    } catch (error) {
        console.error('Network error:', error);

        // Handle different types of network errors
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return {
                responseError: 'Unable to connect to server. Please check your internet connection.',
                formData: { email }
            };
        }

        return {
            responseError: 'Network error occurred. Please try again.',
            formData: { email }
        };
    }
}