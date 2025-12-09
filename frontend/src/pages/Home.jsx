import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../CartContext'
import './Home.css'

export default function Home({ goToProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  // Récupère les produits au démarrage
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Empêche d'ouvrir la page détail
    addToCart(product);
    alert(`✅ ${product.name} ajouté au panier!`);
  };

  const handleProductClick = (productId) => {
    goToProduct(productId);
  };

  if (loading) return <div className="loading">⏳ Chargement...</div>;
  if (error) return <div className="error">❌ Erreur: {error}</div>;

  return (
    <div>
      <h2>Nos Produits</h2>
      <div className="products">
        {products.map(product => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <div className="product-actions">
              <button 
                className="add-btn"
                onClick={(e) => handleAddToCart(product, e)}
              >
                ➕ Ajouter
              </button>
              <button className="detail-btn">
                Détails →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
