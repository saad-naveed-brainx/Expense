import { api } from '../../../api/client'
import { redirect } from 'react-router'


export const isLoggedInLoader = async () => {
    try {
        const response = await api.get('/auth/me')
        if (response.isLoggedIn) {
            return redirect('/')
        } else {
            return {};
        }
    } catch (error) {
        return {};
    }
}