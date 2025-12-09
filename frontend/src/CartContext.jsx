import { createContext, useState, useEffect } from 'react';

// Crée le Context
export const CartContext = createContext();

// Provider = composant qui partage le contexte
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Charge le panier depuis LocalStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erreur lecture panier:', error);
      }
    }
  }, []);

  // Sauvegarde le panier dans LocalStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    // Vérifie si le produit existe déjà
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // Si oui, augmente la quantité
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Sinon, ajoute le produit
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Modifier la quantité
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Prix total
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  ).toFixed(2);

  // Export les données et fonctions
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
