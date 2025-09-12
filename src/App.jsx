
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
import { settingsLoaderMethod } from './features/settings/SettingsLoaderMethod'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path='expenses' element={<ExpenseListPage />} />
        <Route path='expenses/new' element={<ExpenseFormPage />} />
        <Route path='expenses/new/:id' element={<ExpenseFormPage />} />
        <Route path='settings' element={<SettingsPage />} loader={settingsLoaderMethod} />
        <Route path='settings/signup' element={<SignUpPage />} action={signUpAction} />
        <Route path='settings/signin' element={<SignInPage />} action={signInAction} />
        <Route path='sign-out' element={<NotUsed pageName="Sign Out" />} />
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