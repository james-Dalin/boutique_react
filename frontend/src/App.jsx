import { useState, useContext } from 'react'
import { CartContext } from './CartContext'
import './App.css'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'product' | 'cart'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { cart } = useContext(CartContext);

  const goToProduct = (productId) => {
    setSelectedProductId(productId);
    setPage('product');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="nav">
          <h1 
            onClick={() => setPage('home')} 
            style={{ cursor: 'pointer' }}
            className="logo"
          >
            🛒 Boutique
          </h1>
          <button 
            onClick={() => setPage('cart')}
            className="cart-btn"
          >
            Panier ({cart.length})
          </button>
        </div>
      </header>

      <main className="main">
        {page === 'home' && <Home goToProduct={goToProduct} />}
        {page === 'product' && <ProductDetail productId={selectedProductId} setPage={setPage} />}
        {page === 'cart' && <Cart setPage={setPage} />}
      </main>

      <footer className="footer">
        <p>© 2025 Boutique. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
