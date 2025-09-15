import { api } from '../../api/client.js';

export const settingsLoaderMethod = async () => {
    try {
        const data = await api.get('/auth/get-profile');
        console.log('profile data', data)
        return { profile: data }
    }
    catch (err) {
        console.log('error', err)
        return { profile: null }
    }
}