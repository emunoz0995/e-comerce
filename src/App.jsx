
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoadingScreen from './companents/LoadingScreen'
import NavBar from './companents/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetail from './pages/ProductsDetail'
import Purchases from './pages/Purchases'

function App() {

  const isLoading = useSelector(state => state.loading)

  return (
    <div className="App">
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductsDetail />} />
        <Route path='/purchases' element={<Purchases />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </HashRouter>
    </div>
  )
}

export default App
