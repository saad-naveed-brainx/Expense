import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import expenseReducer from '../features/expenses/expensesSlice'
import themeReducer from './ThemeSlics'
import authReducer from '../features/Auth/AuthSlice.js'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  expense: expenseReducer,
  theme: themeReducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)
export default store