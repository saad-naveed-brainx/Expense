import { api } from '../../api/client.js';

export const loadData = async () => {
    try {
        const data = await api.get('/expense/all');
        if (data && data.success === false) {
            return { success: false, data: [], message: data.message || 'No data available' }
        }

        return data
    } catch (error) {
        return { success: false, data: [], message: error.message || 'Network error' }
    }
}


export const loadExpenseById = async ({ params }) => {
    const { id } = params
    try {
        const data = await api.get(`/expense/${id}`);
        return data
    } catch (error) {
        return { success: false, message: error.message || 'Failed to load expense' }
    }
}


export const loadDashboardData = async () => {
    try {
        const data = await api.get('/expense/dashboard');

        if (data && data.success === false) {
            return {
                success: false,
                calculation: { totalBalance: 0, totalExpense: 0, totalIncome: 0 },
                graphData: { expense: 0, income: 0 },
                last3DaysExpenses: []
            }
        }

        return data
    } catch (error) {
        return {
            success: false,
            calculation: { totalBalance: 0, totalExpense: 0, totalIncome: 0 },
            graphData: { expense: 0, income: 0 },
            last3DaysExpenses: []
        }
    }
}