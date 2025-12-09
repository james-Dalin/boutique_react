import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>⏳ Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;

  return (
    <div className="app">
      <h1>🛒 Boutique</h1>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
}
