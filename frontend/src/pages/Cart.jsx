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
                    </div>
                ))}
            </div>
        </div>
    )
}