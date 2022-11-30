
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoadingScreen from './companents/LoadingScreen'
import NavBar from './companents/NavBar'
import ProtectedRoutes from './companents/ProtectedRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetail from './pages/ProductsDetail'
import Purchases from './pages/Purchases'

function App() {

  const isLoading = useSelector(state => state.loading)

  return (
  
      <HashRouter>
        <NavBar />
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductsDetail />} />
          <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases />} />
            </Route>
        </Routes>
      </HashRouter>
   
  )
}

export default App
