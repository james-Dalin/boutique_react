import { useState, useEffect, useContext } from 'react'
import { CartContext } from './CartContext'
import './App.css'
import Home from './pages/Home'
import Cart from './pages/Cart'

export default function App() {
  const [page, setPage] = useState('home'); // 'home' ou 'cart'
  const { cart } = useContext(CartContext);

  return (
    <div className="app">
      <header className="header">
        <div className="nav">
          <h1 onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
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
        {page === 'home' && <Home />}
        {page === 'cart' && <Cart setPage={setPage} />}
      </main>
    </div>
  );
}
