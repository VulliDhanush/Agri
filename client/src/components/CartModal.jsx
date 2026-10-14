import { useState, useContext } from 'react';
import { X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function CartModal() {
  const { isCartOpen, setIsCartOpen, cartItems, handleCheckout } = useContext(AppContext);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');

  if (!isCartOpen) {
    return null;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="modal-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="icon-close-btn">
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items-container">
            {cartItems.map((item, index) => (
              <div key={index} className="card glass cart-item-row">
                <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ color: 'var(--primary-color)' }}>₹{item.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="cart-payment-section">
            <label className="cart-payment-label">Payment Method:</label>
            <select 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="cart-payment-select"
            >
              <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
              <option value="Online Payment">Online Payment</option>
            </select>

            <div className="cart-total-row">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }} 
              onClick={() => handleCheckout(paymentMethod)}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
