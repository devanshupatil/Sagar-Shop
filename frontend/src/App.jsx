import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from "./components/common/Header"
import Navbar from "./components/common/Navbar"
// import Product from "./components/products/Product"
import HomePage from "./pages/HomePage"
import Cart from './components/cart/Cart'
import Footer from './components/common/Footer'


function App() {
 

  return (
    
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full h-full flex flex-col">
                <Header />
                <Navbar />
                <HomePage />
                <Cart/>
                <Footer/>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
