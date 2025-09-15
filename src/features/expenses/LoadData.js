export const loadData = async () => {
    try {
        console.log("going to make an api call")
        const response = await fetch('http://localhost:3000/expense/all', {
            credentials: 'include'
        })
        console.log("api call made")

        if (!response.ok) {
            return { success: false, data: [], message: 'Authentication required' }
        }

        const data = await response.json()

        if (data && data.success === false) {
            return { success: false, data: [], message: data.message || 'No data available' }
        }

        return data
    } catch (error) {
        console.log('error', error)
        return { success: false, data: [], message: 'Network error' }
    }
}


export const loadExpenseById = async ({ params }) => {
    const { id } = params
    console.log('id', id)
    const response = await fetch(`http://localhost:3000/expense/${id}`, {
        credentials: 'include'
    })
    const data = await response.json()
    console.log('data', data)
    return data
}


export const loadDashboardData = async () => {
    try {
        const response = await fetch('http://localhost:3000/expense/dashboard', {
            credentials: 'include'
        })

        if (!response.ok) {
            return {
                success: false,
                calculation: { totalBalance: 0, totalExpense: 0, totalIncome: 0 },
                graphData: { expense: 0, income: 0 },
                last3DaysExpenses: []
            }
        }

        const data = await response.json()
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