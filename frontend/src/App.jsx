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
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import SuccessPage from './pages/SuccessPage';
import FilterPage from './pages/FilterPage';
import ProductNotFound from './components/common/ProductNotFound';
import AdminPage from './pages/AdminPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OrderDetailsPage from '../src/pages/OrderDetailsPage'

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
            path="/forgot-password"
            element={<ForgotPasswordPage />}
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
            path="/orders"
            element={<div className="w-full h-full flex flex-col">
              <Header />
              <Navbar />
              <OrdersPage />
              <Footer />
            </div>}
          />
          <Route
            path="/profile"
            element={<div className="w-full h-full flex flex-col">
              <Header />
              <Navbar />
              <ProfilePage />
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
          <Route
            path="/success/:productId/:orderId"
            element={<div className="w-full h-full flex flex-col">
              <Header />
              {/* <Navbar /> */}
              <SuccessPage/>
              <Footer />
            </div>}
          />
          <Route
            path="/filter/:category/:productType"
            element={<div className="w-full h-full flex flex-col">
              <Header />
              <Navbar />
              <FilterPage />
              <Footer />
            </div>}
          />
          <Route
            path="/product-not-found"
            element={<div className="w-full h-full flex flex-col">
              <ProductNotFound />
            </div>}
          />
          <Route
            path="/admin"
            element={<div className="w-full h-full flex flex-col">
              <AdminPage />
            </div>}
          />
          <Route
            path="/order-details/:productId/:orderId"
            element={<div className="w-full h-full flex flex-col">
              <Header />
              <Navbar />
              <OrderDetailsPage />
              <Footer />
            </div>}
          />


        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;