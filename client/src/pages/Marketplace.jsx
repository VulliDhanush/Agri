import { useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

export default function Marketplace(props) {
  const context = useContext(AppContext) || {};
  const products = props.products ?? context.products ?? [];
  const cartItems = props.cartItems ?? context.cartItems ?? [];
  const onAddToCart = props.onAddToCart ?? context.handleAddToCart;
  const onRemoveFromCart = props.onRemoveFromCart ?? context.handleRemoveFromCart;
  // Helper to count how many copies of this product are in the cart
  const getProductCount = (productId) => {
    return cartItems.filter(item => item._id === productId).length;
  };

  // --- RENDER ---
  return (
    <div className="page-wrapper">
      <div className="container">
        <h2>Farmer's Marketplace</h2>
        <p className="mb-2">Buy fresh organic produce directly from local farmers.</p>
        
        <div className="grid-3">
          {/* 
            We use .map() to loop through the 'products' array.
            For EVERY product in the array, it creates a visual "card" on the screen.
          */}
          {products.map(product => (
            // Every item created by a loop needs a unique 'key' so React can keep track of it
            <div key={product._id} className="card glass">
              
              {/* We inject the data dynamically using curly braces { } */}
              <img src={product.imageUrl} alt={product.name} className="card-image" />
              <div className="card-title">{product.name}</div>
              <p>{product.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem' }}>
                <span className="card-price">₹{product.price.toFixed(2)} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ kg</span></span>
                
                {/* 
                  If the product is already in the cart, show the - | count | + controls.
                  Otherwise, show the "Add to Cart" button.
                */}
                {getProductCount(product._id) > 0 ? (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    border: '2px solid var(--primary-color)', 
                    borderRadius: '50px', 
                    padding: '3px',
                    backgroundColor: 'var(--card-bg-solid)',
                    boxShadow: 'var(--shadow)',
                    transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                  }}>
                    <button 
                      onClick={() => onRemoveFromCart(product)}
                      style={{ 
                        backgroundColor: 'var(--primary-color)', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '32px', 
                        height: '32px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontWeight: 'bold', 
                        fontSize: '1.4rem', 
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-light)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
                    >
                      -
                    </button>
                    <span style={{ 
                      fontWeight: '800', 
                      fontSize: '1.15rem', 
                      minWidth: '24px', 
                      textAlign: 'center',
                      color: 'var(--text-main)' 
                    }}>
                      {getProductCount(product._id)}
                    </span>
                    <button 
                      onClick={() => onAddToCart(product)}
                      style={{ 
                        backgroundColor: 'var(--primary-color)', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '32px', 
                        height: '32px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontWeight: 'bold', 
                        fontSize: '1.2rem', 
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-light)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '0.5rem 1rem' }}
                    onClick={() => onAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
