import { useState, useContext } from 'react'
import { CartContext } from './CartContext'
import './App.css'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'product' | 'cart'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { cart, user, logout } = useContext(CartContext);

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

          <div className="nav-right">
            {user ? (
              <div className="user-info">
                <span>👤 {user.username}</span>
                <button onClick={logout} className="logout-btn">Déconnexion</button>
              </div>
            ) : (
              <button onClick={() =>setPage('login')} className="login-link">
                Connexion
              </button>
            )}
          </div>

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
        {page === 'login' && <Login setPage={setPage}/>}
      </main>

      <footer className="footer">
        <p>© 2025 Boutique. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
