import { useContext } from "react"
import { CartContext } from "../CartContext"
import './Cart.css'

export default function Cart({ setPage }) {
    const  { cart, removeFromCart, updateQuantity, clearCart,totalPrice } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <h2>🛒 Panier Vide</h2>
                <p>Vous n'avez rien dans votre panier.</p>
                <button onClick={() => setPage('home')} className="back-btn">← Retour à la boutique</button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>🛒 Mon Panier</h2>

            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />

                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p className="price">${item.price.toFixed(2)}</p>
                        </div>

                        <div className="item-controls">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <input 
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                mint="1" />
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>

                        <div className="item-total">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button 
                            className="delete-btn"
                            onClick={() => removeFromCart(item.id)}>
                                🗑️
                            </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Sous-total:</span>
                    <span>${totalPrice}</span>
                </div>
                <div className="summary-row">
                    <span>Livraison:</span>
                    <span>Gratuite</span>
                </div>
                <div className="summary-row total">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                </div>
            </div>

            <div className="cart-actions">
                <button onClick={() => setPage('home')} className="continue-btn">
                    ← Continuer les achats
                </button>
                <button onClick={() => {
                    if (window.confirm('Confirmer la commande ?')) {
                        clearCart();
                        alert('✅ Commande validée !');
                        setPage('home');
                    }
                }} className="checkout-btn">
                    ✓ Valider la commande
                </button>
                <button onClick={clearCart} className="clear-btn">
                    🗑️ Vider le panier
                </button>
            </div>
        </div>
    )
}