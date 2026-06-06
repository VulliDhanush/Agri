// 1. Import Link, useNavigate, and useLocation from React Router. 
// We use <Link> instead of standard HTML <a> tags so the page doesn't refresh when we click a link!
import { Link, useNavigate, useLocation } from 'react-router-dom';

// 2. Import a few pre-made icons from the lucide-react library
import { Sprout, ShoppingCart, UserCircle } from 'lucide-react';

/**
 * Navbar Component
 * It receives props (properties/data passed down from App.jsx):
 * 1. cartCount: The number of items currently in the cart
 * 2. onCartClick: The function to run when the user clicks the shopping cart icon
 */
export default function Navbar({ cartCount, onCartClick, userRole, setUserRole, currentUser, onLogout }) {
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
          AgriLink
        </Link>
        
        {/* The Navigation Links */}
        <div className="nav-links">
          
          {/* ROLE SELECTOR: Segmented Toggle Control */}
          <div style={{ 
            marginRight: '1rem', 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.06)',
            borderRadius: '30px',
            padding: '4px',
          }}>
            <button 
              onClick={() => handleRoleChange('Customer')}
              style={{
                background: userRole === 'Customer' ? '#fff' : 'transparent',
                color: userRole === 'Customer' ? 'var(--text-main)' : '#666',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: userRole === 'Customer' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <UserCircle size={16} />
              Customer
            </button>

            <button 
              onClick={() => handleRoleChange('Farmer')}
              style={{
                background: userRole === 'Farmer' ? 'var(--primary-color)' : 'transparent',
                color: userRole === 'Farmer' ? '#fff' : '#666',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: userRole === 'Farmer' ? '0 2px 8px rgba(46, 125, 50, 0.4)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sprout size={16} />
              Farmer
            </button>
          </div>

          <Link to="/marketplace">Marketplace</Link>
          
          {/* SHOW SERVICES & RENTALS ONLY IF ROLE IS FARMER */}
          {userRole === 'Farmer' && (
            <Link to="/services">Services & Rentals</Link>
          )}

          <Link to="/orders">My Orders</Link>

          {/* SHOW FARMER DASHBOARD ONLY IF ROLE IS FARMER */}
          {userRole === 'Farmer' && (
            <Link to="/farmer" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Dashboard</Link>
          )}
          
          {/* 
            The Shopping Cart Icon Wrapper.
            Notice the onClick={onCartClick}. When clicked, it tells App.jsx to open the modal!
          */}
          <div 
            style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={onCartClick}
          >
            <ShoppingCart size={24} />
            
            {/* 
              This is called "Conditional Rendering".
              It means: "ONLY show this little red badge IF the cartCount is greater than zero."
            */}
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-12px', background: 'var(--accent-color)', 
                color: '#000', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </div>
          
          {/* The Login Button or Logged-in User Profile */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)', fontWeight: 'bold' }}>
                <UserCircle size={20} color="var(--primary-color)" />
                <span>Hello Welcome, {currentUser.name || 'User'}</span>
              </div>
              <button 
                onClick={onLogout} 
                className="btn" 
                style={{ 
                  padding: '0.5rem 1.5rem', 
                  backgroundColor: 'rgba(229, 57, 53, 0.1)', 
                  color: '#d32f2f', 
                  border: '1px solid rgba(229, 57, 53, 0.3)'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
