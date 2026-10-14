import { useState, useContext } from 'react';
import { X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function CartModal() {
  const { isCartOpen, setIsCartOpen, cartItems, handleCheckout } = useContext(AppContext);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');

  if (!isCartOpen) {
    return null;
  }

  // --- DATA CALCULATION ---
  // The .reduce() function loops through all items in the cart and adds up their prices.
  // It starts with a 'sum' of 0.
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  // --- WHAT TO RENDER ---
  return (
    // This outer <div> is the dark, see-through background behind the popup
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, left: 0,
      backgroundColor: 'var(--modal-overlay)', zIndex: 2000,
      display: 'flex', justifyContent: 'flex-end',
      transition: 'background-color 0.3s ease'
    }}>
      
      {/* This inner <div> is the actual white sidebar panel containing the cart */}
      <div style={{
        width: '400px', backgroundColor: 'var(--bg-color)', 
        height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column',
        boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', overflowY: 'auto',
        color: 'var(--text-main)',
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
      }}>
        
        {/* The Header (Title and Close Button) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}>
            <X size={24} />
          </button>
        </div>

        {/* --- CONDITIONAL RENDERING --- */}
        {/* We check if the cart is empty. If it is, show a message. If not, show the items. */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* 
              The .map() function loops over the cartItems array.
              For EVERY item in the array, it creates a new piece of HTML (a card).
            */}
            {cartItems.map((item, index) => (
              <div key={index} className="card glass" style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  {/* .toFixed(2) forces the price to always show two decimal places, like ₹10.00 */}
                  <div style={{ color: 'var(--primary-color)' }}>₹{item.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 
          More Conditional Rendering: 
          ONLY show the "Proceed to Checkout" section if there are actually items in the cart!
        */}
        {cartItems.length > 0 && (
          <div style={{ marginTop: '2rem', borderTop: '2px solid var(--border-color)', paddingTop: '1rem' }}>
            
            {/* PAYMENT METHOD SELECTION */}
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Payment Method:</p>
              <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--input-border)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }}
              >
                <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                <option value="Online Payment">Online Payment</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleCheckout(paymentMethod)}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
