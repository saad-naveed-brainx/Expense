
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import DashboardPage from './features/expenses/pages/DashboardPage'
import ExpenseListPage from './features/expenses/pages/ExpenseListPage'
import ExpenseFormPage from './features/expenses/pages/ExpenseFormPage'
import NotUsed from './components/NotUsed'
import ThemeEffect from './components/ThemeEffect'
import SignUpPage from './features/Auth/pages/SignUpPage'
import SettingsPage from './features/settings/Page'
import { signInAction, signUpAction } from './features/Auth/components/ActionMethods'
import SignInPage from './features/Auth/pages/SignInPage'
import { loadData, loadExpenseById, loadDashboardData } from './features/expenses/LoadData'
import { isLoggedInLoader } from './features/Auth/components/LoaderMethods'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<DashboardPage />} loader={loadDashboardData} />
        <Route path='signup' element={<SignUpPage />} action={signUpAction} loader={isLoggedInLoader} />
        <Route path='signin' element={<SignInPage />} action={signInAction} loader={isLoggedInLoader} />
        <Route path='expenses' element={<ExpenseListPage />} loader={loadData} />
        <Route path='expenses/new' element={<ExpenseFormPage />} />
        <Route path='expenses/new/:id' element={<ExpenseFormPage />} loader={loadExpenseById} />
        <Route path='sign-out' element={<NotUsed pageName="Sign Out" />} />
        <Route path='*' element={<NotUsed />} />
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