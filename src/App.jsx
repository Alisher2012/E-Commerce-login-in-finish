import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import ProductDetails from './pages/ProductDetails';
import Shop from './pages/Shop';
import './index.css';
import { getCategory } from './services';
import { useEffect, useState } from 'react';
import { DataContext } from './context/DataContext';
// import { DataContext } from './context/DataContext';
import { CartProvider } from './context/CartContext';
function App() {

  const [categoryData, setCategoryData] = useState([]);


  const [token, setToken] = useState(localStorage.getItem('token'));


  useEffect(() => {
    getCategory().then((item) => {
      setCategoryData(item);
    });
  }, []);

  return (
    <Router>
      <DataContext.Provider value={{ categoryData, token , setToken}}> 
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="account" element={<Account />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="shop" element={<Shop />} />
              <Route path="*" element={
                <div className="container section-padding">
                  <h2>404 Not Found</h2>
                </div>
              } />
            </Route>
          </Routes>
        </CartProvider>
      </DataContext.Provider>
    </Router>
  );
}

export default App;