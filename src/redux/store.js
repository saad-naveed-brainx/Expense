import {configureStore} from '@reduxjs/toolkit'
import expenseReducer from './ExpenseSlice'
import themeReducer from './ThemeSlics'

export default configureStore({
    reducer: {
        expense: expenseReducer,
        theme: themeReducer,
    },
})