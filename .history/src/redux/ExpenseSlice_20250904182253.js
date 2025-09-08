import {createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'


const initialState = {
    expenses: [],
}

const expenseSlice = createSlice({
    name: 'expenseSlice',
    initialState,
    reducers:{
        addExpense: (state, action) =>{
            const newExpense = {
                id: uuidv4(),
                amount: action.payload.amount,
                date: new Date().toISOString(),
                category: action.payload.category,
                description: action.payload.description,
                title: action.payload.title,
            }
            state.expenses.push(newExpense)
        },
        deleteExpense: (state, action) =>{
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload.id)
            },
        editExpense: (state, action) =>{
            const index = state.expenses.findIndex(expense => expense.id === action.payload.id)
            if(index !== -1){
                state.expenses[index] = action.payload
            }
        },
    }
})

export const { addExpense, deleteExpense, editExpense } = expenseSlice.actions
export default expenseSlice.reducer