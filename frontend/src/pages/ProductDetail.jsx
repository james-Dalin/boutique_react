import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../CartContext'
import './ProductDetail.css'

export default function ProductDetail({ productId, setPage }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    // Récupère le produit au démarrage
    useEffect(() => {
        fetch('http://localhost:3001/products')
        .then(res => res.json())
        .then(data => {
            const found = data.find(p => p.id === parseInt(productId));
            if (found) {
                setProduct(found);
            } else {
                setError('Produit non trouvé');
            }
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, [productId]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        alert(`✅ ${quantity} x ${product.name} ajouté au panier!`);
        setPage('home');
    };

    if (loading) return <div className="loading">⏳ Chargement...</div>;
    if (error) return <div className="error">❌ {error}</div>;
    if (!product) return <div className="error">❌ Produit non trouvé</div>;

    return (
        <div className="product-detail">
            <button className="back-link" onClick={() => setPage('home')}>
                ← Retour
            </button>

            <div className="detail-container">
                <div className="detail-image">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="detail-info">
                    <h1>{product.name}</h1>

                    <div className="detail-price">
                        <span className="price">${product.price.toFixed(2)}</span>
                        <span className="badge">En stock</span>

                        <p className="detail-description">{product.description}</p>

                        <div className="detail-actions">
                            <div className="quantity-selector">
                                <label>Quantité:</label>
                                <div className="qty-control">
                                    <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                                        -
                                    </button>
                                    <input 
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        min="1" />
                                        <button onClick={() => setQuantity(quantity + 1)}>
                                            +
                                        </button>
                                </div>
                            </div>

                            <button className="add-to-cart-btn"
                            onClick={handleAddToCart}>
                                🛒 Ajouter au panier
                            </button>
                        </div>

                        <div className="detail-specs">
                            <h3>Détails supplémentaires</h3>
                            <ul>
                                <li>✓ Livraison gratuite</li>
                                <li>✓ Retour 30 jours</li>
                                <li>✓ Garantie 1 an</li>
                                <li>✓ Service client 24/7</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}