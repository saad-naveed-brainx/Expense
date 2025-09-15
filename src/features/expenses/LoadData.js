import { api } from '../../api/client.js';

export const loadData = async () => {
    try {
        console.log("going to make an api call")
        const data = await api.get('/expense/all');
        console.log("api call made")

        if (data && data.success === false) {
            return { success: false, data: [], message: data.message || 'No data available' }
        }

        return data
    } catch (error) {
        console.log('error', error)
        return { success: false, data: [], message: error.message || 'Network error' }
    }
}


export const loadExpenseById = async ({ params }) => {
    const { id } = params
    console.log('id', id)
    try {
        const data = await api.get(`/expense/${id}`);
        console.log('data', data)
        return data
    } catch (error) {
        console.log('error', error)
        return { success: false, message: error.message || 'Failed to load expense' }
    }
}


export const loadDashboardData = async () => {
    try {
        const data = await api.get('/expense/dashboard');
        console.log("data", data)

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
        console.log('error', error)
        return {
            success: false,
            calculation: { totalBalance: 0, totalExpense: 0, totalIncome: 0 },
            graphData: { expense: 0, income: 0 },
            last3DaysExpenses: []
        }
    }
}