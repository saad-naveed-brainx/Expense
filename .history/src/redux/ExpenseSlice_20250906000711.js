import {createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'


const initialState = {
    expenses: localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [],
}

const expenseSlice = createSlice({
    name: 'expenseSlice',
    initialState,
    reducers:{
        addExpense: (state, action) =>{
            const newExpense = {
                id: uuidv4(),
                amount: action.payload.amount,
                date: action.payload.date,
                category: action.payload.category,
                description: action.payload.description,
                title: action.payload.title,
                reimbersable: action.payload.reimbersable,
                type:action.payload.type,
                createdAt: new Date().toISOString()
            }
            state.expenses.push(newExpense)
            state.expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            localStorage.setItem('expenses', JSON.stringify(state.expenses))    
        },
        deleteExpense: (state, action) =>{
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload)
            state.expenses.reverse()
            localStorage.setItem('expenses', JSON.stringify(state.expenses))
            },
        editExpense: (state, action) =>{
            const index = state.expenses.findIndex(expense => expense.id === action.payload.id)
            if(index !== -1){
                state.expenses[index] = action.payload
            }
            state.expenses.reverse()
            localStorage.setItem('expenses', JSON.stringify(state.expenses))
        },
        updateExpenseById: (state,action)=>{
            console.log(action.payload + "is the payload in updateExpenseById")
            const index = state.expenses.findIndex(expense => expense.id === action.payload.id)
            if(index !== -1){
                //update the expense with the new data at the same index 
                
            }
            localStorage.setItem('expenses', JSON.stringify(state.expenses))
        }
    }
})

export const { addExpense, deleteExpense, editExpense, updateExpenseById } = expenseSlice.actions
export default expenseSlice.reducer