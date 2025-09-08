
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import DashboardPage from './features/expenses/pages/DashboardPage'
import ExpenseListPage from './features/expenses/pages/ExpenseListPage'
import ExpenseFormPage from './features/expenses/pages/ExpenseFormPage'
import NotUsed from './components/NotUsed'
import ThemeEffect from './components/ThemeEffect'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path='/expenses' element={<ExpenseListPage />} />
        <Route path='/expenses/new' element={<ExpenseFormPage />} />
        <Route path='/expenses/new/:id' element={<ExpenseFormPage />} />
        <Route path='/categories' element={<NotUsed pageName="Categories" />} />
        <Route path='/settings' element={<NotUsed pageName="Settings" />} />
      </Route>
    )
  )

  return (
    <>
      <ThemeEffect />
      <RouterProvider router={router} />
    </>
  )
}

export default App