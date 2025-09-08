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
                date: new Date().toISOString(),
                category: action.payload.category,
                description: action.payload.description,
                title: action.payload.title,
                reimbersable: action.payload.reimbersable,
                type:'expense'
            }
            state.expenses.push(newExpense)
            state.expenses.map((expense)=>{
                //add the type of expense to the expense to all the existing expenses
                return{
                    ...expense,
                    type:'expense'
                }
            })
            state.expenses.reverse()
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
    }
})

export const { addExpense, deleteExpense, editExpense } = expenseSlice.actions
export default expenseSlice.reducer