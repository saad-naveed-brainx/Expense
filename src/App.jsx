
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import LandingPage from './components/LandingPage'
import ExpensesScreen from './components/ExpensesScreen'
import NotUsed from './components/NotUsed'
import AddNewExpenses from './components/AddNewExpenses'
import ThemeEffect from './components/ThemeEffect'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='/expenses' element={<ExpensesScreen />} />
        <Route path='/expenses/new' element={<AddNewExpenses />} />
        <Route path='/expenses/new/:id' element={<AddNewExpenses />} />
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