import { useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

export default function Marketplace() {
  const { products, cartItems, handleAddToCart, handleRemoveFromCart } = useContext(AppContext);
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
                  <div className="qty-control-pill">
                    <button 
                      onClick={() => handleRemoveFromCart(product)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty-count">
                      {getProductCount(product._id)}
                    </span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '0.5rem 1rem' }}
                    onClick={() => handleAddToCart(product)}
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
