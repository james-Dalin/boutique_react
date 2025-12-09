import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../CartContext'
import './Home.css'

export default function Home() {
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

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} ajouté au panier!`);
  };

  if (loading) return <div className="loading">⏳ Chargement...</div>;
  if (error) return <div className="error">❌ Erreur: {error}</div>;

  return (
    <div>
      <h2>Nos Produits</h2>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button 
              className="add-btn"
              onClick={() => handleAddToCart(product)}
            >
              ➕ Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
