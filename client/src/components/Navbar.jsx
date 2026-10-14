import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, ShoppingCart, UserCircle, Sun, Moon } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
  const {
    cartCount,
    setIsCartOpen,
    userRole,
    currentUser,
    handleLogout,
    theme,
    toggleTheme,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle switching roles
  const handleRoleChange = (role) => {
    if (role === userRole) return;

    const confirmChange = window.confirm(
      "Warning: Switching roles will reload the page and reset all active session data (cart items, orders, and products). Proceed?"
    );

    if (confirmChange) {
      // Clear current user/token and set the new role
      localStorage.setItem('userRole', role);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');

      // Force a full reload to clear all React states
      if (role === 'Farmer') {
        window.location.href = '/farmer';
      } else {
        window.location.href = '/';
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        
        {/* The Logo Link - Clicking this goes to the home page ("/") */}
        <Link to="/" className="nav-logo">
          <Sprout size={32} />
          Agri Link
        </Link>
        
        {/* The Navigation Links */}
        <div className="nav-links">
          
          {/* ROLE SELECTOR */}
          <div className="role-selector">
            <button 
              onClick={() => handleRoleChange('Customer')}
              className={`role-btn ${userRole === 'Customer' ? 'active' : ''}`}
            >
              <UserCircle size={16} />
              Customer
            </button>

            <button 
              onClick={() => handleRoleChange('Farmer')}
              className={`role-btn farmer ${userRole === 'Farmer' ? 'active' : ''}`}
            >
              <Sprout size={16} />
              Farmer
            </button>
          </div>

          <Link to="/marketplace">Marketplace</Link>
          
          {userRole === 'Farmer' && (
            <Link to="/services">Services & Rentals</Link>
          )}

          <Link to="/orders">My Orders</Link>

          {userRole === 'Farmer' && (
            <Link to="/farmer" className="nav-dashboard-link">Dashboard</Link>
          )}
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Shopping Cart Icon */}
          <div className="nav-cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </div>
          
          {/* User Profile / Login */}
          {currentUser ? (
            <div className="user-profile-bar">
              <div className="user-profile-name">
                <UserCircle size={20} color="var(--primary-color)" />
                <span>Hello Welcome, {currentUser.name || 'User'}</span>
              </div>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
