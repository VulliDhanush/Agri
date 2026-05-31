// 1. Import React Hooks:
// - We removed useState and useEffect because App.jsx is now handling the data!

// 2. Import axios, a popular library used to make HTTP requests to a backend server.
import axios from 'axios';

/**
 * Marketplace Page Component
 * It receives two props from App.jsx:
 * 1. products: The master list of all products in the store.
 * 2. onAddToCart: The function to run when the user clicks "Add to Cart".
 */
export default function Marketplace({ products, onAddToCart }) {
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
                <span className="card-price">₹{product.price.toFixed(2)} <span style={{ fontSize: '1rem', color: '#666', fontWeight: 'normal' }}>/ kg</span></span>
                
                {/* 
                  When the button is clicked, we call 'onAddToCart' (which came from App.jsx) 
                  and we pass it the specific 'product' object from this iteration of the loop!
                */}
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '0.5rem 1rem' }}
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
