import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { Theme, Box } from '@radix-ui/themes';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import "@radix-ui/themes/styles.css";
import './App.css';

const App: React.FC = () => {
  return (
    <Theme>
      <CartProvider>
        <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Router>
            <Header />
            <Box style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Box>
            <Footer />
          </Router>
        </Box>
      </CartProvider>
    </Theme>
  );
};

export default App;
