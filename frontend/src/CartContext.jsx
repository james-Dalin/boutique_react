import { createContext, useState, useEffect } from 'react';

// Crée le Context
export const CartContext = createContext();

// Provider = composant qui partage le contexte
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Charge le panier depuis LocalStorage au démarrage
  useEffect(() => {
    // Panier
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    // User
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser)); 
  }, []);

  // Sauvegarde le panier dans LocalStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Sauvegarder User
  useEddect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    // Optinonel : vider le panier au logout
    // setCart([]);
  };

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
    <CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice,user, login, logout}}>
      {children}
    </CartContext.Provider>
  );
}
