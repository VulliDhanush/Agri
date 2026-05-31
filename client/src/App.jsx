// 1. Import 'useState' from React. This is a Hook that lets us add "memory" to our component.
import { useState } from 'react';

// 2. Import tools from React Router. These let us navigate between pages without refreshing the browser.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 3. Import all our custom Components and Pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Services from './pages/Services';
import Login from './pages/Login';
import Orders from './pages/Orders';
import CartModal from './components/CartModal';
import FarmerDashboard from './pages/FarmerDashboard';
import Footer from './components/Footer';

// This is the main Application component. Everything inside here gets rendered to the screen.
function App() {
  // --- STATE (Memory of the App) ---
  
  // Who is currently using the app? Default is 'Customer'
  const [userRole, setUserRole] = useState('Customer');

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
  // useState gives us a variable (cartItems) and a function to update it (setCartItems).
  // We start with an empty array [] because the cart is empty at first.
  const [cartItems, setCartItems] = useState([]);
  
  // This state remembers whether the shopping cart popup is open (true) or closed (false).
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // This state remembers the list of completed orders.
  const [orders, setOrders] = useState([]);

  // --- ACTIONS (Functions that do things) ---
  
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
  
  // This function is called when a user clicks "Add to Cart" on a product.
  const handleAddToCart = (product) => {
    // We take the previous items in the cart (...prev) and add the new product to the end of the list.
    setCartItems(prev => [...prev, product]);
  };

  // This function is called when the user clicks "Proceed to Checkout" in the cart.
  const handleCheckout = (paymentMethod) => {
    // If the cart is empty, do nothing.
    if (cartItems.length === 0) return;
    
    // 1. Calculate the total price of everything in the cart.
    const calculatedTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    // 2. Create a new "Order" object.
    const newOrder = {
      // Generate a random ID like 'ORD-A1B2C3D4'
      id: 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      // Record the exact date and time right now
      time: new Date().toISOString(),
      // Copy all items from the cart into this order
      items: [...cartItems],
      total: calculatedTotal,
      // Record the chosen payment method
      paymentMethod: paymentMethod,
      // Initial status of the order
      status: 'Pending (Not Accepted)'
    };
    
    // 3. Save this new order into our 'orders' state memory.
    // We put 'newOrder' at the beginning so the newest order shows up first.
    setOrders(prev => [newOrder, ...prev]);
    
    // 4. Empty the shopping cart because they just bought everything!
    setCartItems([]);
    
    // 5. Close the cart popup.
    setIsCartOpen(false);
    
    // 6. Tell the user it worked!
    alert('Order has been placed successfully!');
  };

  // --- WHAT TO RENDER (The HTML/JSX) ---
  return (
    // The <Router> wraps our whole app so navigation links work.
    <Router>
      <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* 
          The Navbar is outside the <Routes> so it appears on EVERY page. 
          We pass down the number of items in the cart as a "prop" (property).
        */}
        <Navbar 
          cartCount={cartItems.length} 
          onCartClick={() => setIsCartOpen(true)} 
          userRole={userRole}
          setUserRole={setUserRole}
        />
        
        {/* 
          The CartModal is our popup. It is hidden unless isCartOpen is true.
          We pass it the items and the checkout function.
        */}
        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cartItems={cartItems} 
          onCheckout={handleCheckout} 
        />
        
        {/* The <Routes> area decides which Page to show based on the URL. */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home userRole={userRole} />} />
            {/* We pass the products list and the handleAddToCart function down to Marketplace */}
            <Route path="/marketplace" element={<Marketplace products={products} onAddToCart={handleAddToCart} />} />
            {/* The new Farmer Dashboard gets the products and the functions to add/update/remove them */}
            <Route path="/farmer" element={<FarmerDashboard products={products} onAddProduct={handleAddProduct} onUpdatePrice={handleUpdatePrice} onRemoveProduct={handleRemoveProduct} />} />
            <Route path="/services" element={<Services />} />
            {/* We pass the completed orders down to the Orders page so it can display them */}
            <Route path="/orders" element={<Orders orders={orders} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

// Export the App so main.jsx can use it.
export default App;
