import React from 'react'
import { useSelector } from 'react-redux'


export default function ExpensesScreen(){
    const expenses = useSelector((state) => state.expense.expenses)

    
}