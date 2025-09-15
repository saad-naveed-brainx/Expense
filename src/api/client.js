import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});


export const api = {
    get: async (route) => {
        try {
            const response = await apiClient.get(route);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Request failed');
        }
    },

    post: async (route, data = {}) => {
        try {
            const response = await apiClient.post(route, data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Request failed');
        }
    },

    put: async (route, data = {}) => {
        try {
            const response = await apiClient.put(route, data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Request failed');
        }
    },

    delete: async (route) => {
        try {
            const response = await apiClient.delete(route);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Request failed');
        }
    }
};

export default api;
