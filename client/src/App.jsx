// 1. Import Hooks from React.
import { useState, useEffect, useRef } from 'react';

// 2. Import tools from React Router.
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// 3. Import axios for API integration
import axios from 'axios';

// 4. Import all our custom Components and Pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Services from './pages/Services';
import Login from './pages/Login';
import Orders from './pages/Orders';
import CartModal from './components/CartModal';
import FarmerDashboard from './pages/FarmerDashboard';
import Footer from './components/Footer';

// A wrapper component that intercepts the form submission of the unmodified Login component.
function LoginWrapper({ onLogin }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleNativeSubmit = (e) => {
      e.preventDefault(); // Prevent standard page refresh
      
      const emailInput = e.target.querySelector('input[type="email"]');
      const passwordInput = e.target.querySelector('input[type="password"]');
      if (emailInput && passwordInput) {
        onLogin(emailInput.value, passwordInput.value);
      }
    };

    const element = wrapperRef.current;
    if (element) {
      element.addEventListener('submit', handleNativeSubmit);
    }
    return () => {
      if (element) {
        element.removeEventListener('submit', handleNativeSubmit);
      }
    };
  }, [onLogin]);

  return (
    <div ref={wrapperRef}>
      <Login />
    </div>
  );
}

// This is the main application content component.
// It is wrapped by <Router> in the App component, allowing it to use useNavigate().
function AppContent() {
  const navigate = useNavigate();

  // --- STATE (Memory of the App) ---

  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Apply the theme to the root <html> element and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  
  // Who is currently using the app? Default is 'Customer' or whatever was saved
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'Customer';
  });

  // Keep track of the currently logged-in user profile
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // The master list of all products in the store
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

  // --- ACTIONS (Functions that do things) ---
  
  // Handle Login submission
  const handleLogin = async (email, password) => {
    try {
      // 1. Try backend authentication
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      if (response.data && response.data.token) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Map backend user role to frontend role representation
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
      // 2. If it's a network error (server offline), fall back to mock authentication
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
        // If it's a real response error from server (e.g. 400 bad request, wrong password)
        alert(error.response.data.msg || 'Invalid Credentials');
      }
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    
    setCurrentUser(null);
    setUserRole('Customer');
    
    alert('Logged out successfully.');
    navigate('/');
  };

  // Add a new product to the marketplace
  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, _id: Math.random().toString(36).substr(2, 9) };
    setProducts(prev => [productWithId, ...prev]);
  };

  // Update an existing product's price
  const handleUpdatePrice = (productId, newPrice) => {
    setProducts(prev => prev.map(p => 
      p._id === productId ? { ...p, price: parseFloat(newPrice) } : p
    ));
  };

  // Remove a product entirely from the marketplace
  const handleRemoveProduct = (productId) => {
    setProducts(prev => prev.filter(p => p._id !== productId));
  };
  
  // Add a product to the cart
  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  // Remove a product from the cart (decrease count by one)
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

  // Checkout cart items
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

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)} 
        userRole={userRole}
        setUserRole={setUserRole}
        currentUser={currentUser}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onCheckout={handleCheckout} 
      />
      
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home userRole={userRole} />} />
          <Route path="/marketplace" element={<Marketplace products={products} cartItems={cartItems} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />} />
          <Route path="/farmer" element={<FarmerDashboard products={products} onAddProduct={handleAddProduct} onUpdatePrice={handleUpdatePrice} onRemoveProduct={handleRemoveProduct} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route path="/login" element={<LoginWrapper onLogin={handleLogin} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// This is the root component rendering the router.
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
