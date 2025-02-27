import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import ProductCard from "./components/products/ProductCard";
import Footer from './components/common/Footer';
import LoginPage from './pages/LoginPage';
import Signup from './pages/SignupPage';
import { AuthProvider } from './components/contexts/AuthContext';
import Product from './pages/ProductPage';
import Cart from './pages/CartPage';
import Favourites from './pages/FavouritesPage';
import Checkout from './pages/CheckOut';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full h-full flex flex-col">
                <Header />
                <Navbar />
                <HomePage />
                <ProductCard />
                <Footer />
              </div>
            }
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/product/:id"
            element={<div className="w-full h-full flex flex-col">
              <Header />
              <Navbar />
              <Product />
              <Footer />
            </div>}
          />

          <Route
            path="/cart"
            element={<div className="w-full h-full flex flex-col">
              <Header />
              <Navbar />
              <Cart />
              <Footer />
            </div>}
          />
          <Route
            path="/favourites"
            element={<div className="w-full h-full flex flex-col">
              <Header />
              <Navbar />
              <Favourites />
              <Footer />
            </div>}
          />
          <Route
            path="/checkout/:id"
            element={<div className="w-full h-full flex flex-col">
              <Header />
              {/* <Navbar /> */}
              <Checkout />
              <Footer />
            </div>}
          />


        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;