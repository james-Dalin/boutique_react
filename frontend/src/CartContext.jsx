import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // ← NOUVEAU

  // ========== CHARGER AU DÉMARRAGE ==========
  useEffect(() => {
    // Panier
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erreur lecture panier:', error);
        setCart([]);
      }
    }

    // User
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erreur lecture user:', error);
        setUser(null);
      }
    }

    setIsLoaded(true); // ← Marque que le chargement est fait
  }, []); // ← DÉPENDANCE VIDE = une seule fois au démarrage


  // ========== SAUVEGARDER LE PANIER ==========
  useEffect(() => {
    if (!isLoaded) return; // ← N'AGIS QUE SI CHARGÉ

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('📦 Panier sauvegardé:', cart);
  }, [cart, isLoaded]); // ← DÉPENDANCE CORRECTE


  // ========== SAUVEGARDER L'USER ==========
  useEffect(() => {
    if (!isLoaded) return; // ← N'AGIS QUE SI CHARGÉ

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      console.log('👤 User sauvegardé:', user);
    } else {
      localStorage.removeItem('user');
      console.log('👤 User supprimé');
    }
  }, [user, isLoaded]); // ← DÉPENDANCE CORRECTE


  // ========== FONCTIONS PANIER ==========
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

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

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  ).toFixed(2);

  // ========== EXPORT ==========
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    user,
    setUser,
    logout: () => setUser(null)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
