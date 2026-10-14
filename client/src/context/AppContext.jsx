import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || 'Customer');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [products, setProducts] = useState([
    { _id: '1', name: 'Organic Tomatoes', price: 40, description: 'Freshly picked organic tomatoes.', imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80' },
    { _id: '2', name: 'Lady Fingers (Okra)', price: 60, description: 'Fresh and tender lady fingers.', imageUrl: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=300&q=80' },
    { _id: '3', name: 'Organic Potatoes', price: 30, description: 'Locally grown russet potatoes.', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80' },
    { _id: '4', name: 'Crisp Carrots', price: 50, description: 'Crunchy, sweet organic carrots.', imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80' },
    { _id: '5', name: 'Brinjal (Eggplant)', price: 45, description: 'Glossy purple eggplants.', imageUrl: 'https://images.unsplash.com/photo-1628773822503-ae3981255e2e?auto=format&fit=crop&w=300&q=80' },
    { _id: '6', name: 'Red Onions', price: 35, description: 'Spicy and sweet locally grown red onions.', imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=300&q=80' },
    { _id: '7', name: 'Fresh Cauliflower', price: 80, description: 'Large, farm-fresh white cauliflower heads.', imageUrl: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=300&q=80' }
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = async (email, password) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      
      if (response.data && response.data.token) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        const role = user.role === 'farmer' ? 'Farmer' : 'Customer';
        localStorage.setItem('userRole', role);
        
        setUserRole(role);
        setCurrentUser(user);
        
        alert(`Welcome back, ${user.name}! (Authenticated via Server)`);
        
        if (role === 'Farmer') {
          navigate('/farmer');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      if (!error.response) {
        console.warn('Backend server offline. Falling back to Demo Mode.');
        
        const userName = email.split('@')[0] || 'Demo User';
        const role = email.toLowerCase().includes('farmer') ? 'Farmer' : 'Customer';
        
        const mockUser = {
          id: 'mock-' + Math.random().toString(36).substr(2, 9),
          name: userName.charAt(0).toUpperCase() + userName.slice(1),
          email: email,
          role: role === 'Farmer' ? 'farmer' : 'consumer'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        localStorage.setItem('userRole', role);
        
        setUserRole(role);
        setCurrentUser(mockUser);
        
        alert(`Offline/Demo Mode: Logged in as ${mockUser.name} (${role})`);
        
        if (role === 'Farmer') {
          navigate('/farmer');
        } else {
          navigate('/');
        }
      } else {
        alert(error.response.data?.msg || 'Invalid Credentials');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    
    setCurrentUser(null);
    setUserRole('Customer');
    
    alert('Logged out successfully.');
    navigate('/');
  };

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, _id: Math.random().toString(36).substr(2, 9) };
    setProducts(prev => [productWithId, ...prev]);
  };

  const handleUpdatePrice = (productId, newPrice) => {
    setProducts(prev => prev.map(p => 
      p._id === productId ? { ...p, price: parseFloat(newPrice) } : p
    ));
  };

  const handleRemoveProduct = (productId) => {
    setProducts(prev => prev.filter(p => p._id !== productId));
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (product) => {
    setCartItems(prev => {
      const idx = prev.map(item => item._id).lastIndexOf(product._id);
      if (idx !== -1) {
        const newCart = [...prev];
        newCart.splice(idx, 1);
        return newCart;
      }
      return prev;
    });
  };

  const handleCheckout = (paymentMethod) => {
    if (cartItems.length === 0) return;
    
    const calculatedTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    const newOrder = {
      id: 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      time: new Date().toISOString(),
      items: [...cartItems],
      total: calculatedTotal,
      paymentMethod: paymentMethod,
      status: 'Pending (Not Accepted)'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    
    alert('Order has been placed successfully!');
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    userRole,
    setUserRole,
    currentUser,
    setCurrentUser,
    handleLogin,
    handleLogout,
    products,
    setProducts,
    handleAddProduct,
    handleUpdatePrice,
    handleRemoveProduct,
    cartItems,
    setCartItems,
    cartCount: cartItems.length,
    handleAddToCart,
    handleRemoveFromCart,
    isCartOpen,
    setIsCartOpen,
    orders,
    setOrders,
    handleCheckout,
    navigate
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
