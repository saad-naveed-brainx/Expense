
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import LandingPage from './components/LandingPage'
import ExpensesScreen from './components/ExpensesScreen'
import NotUsed from './components/NotUsed'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='/expenses' element={<ExpensesScreen />}>
        <Route path='/incomes' element={<NotUsed pageName="Incomes" />} />
        <Route path='/categories' element={<NotUsed pageName="Categories" />} />
        <Route path='/settings' element={<NotUsed pageName="Settings" />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App