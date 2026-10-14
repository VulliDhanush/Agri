import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Orders() {
  const { orders } = useContext(AppContext);

  return (
    <div className="page-wrapper">
      <div className="container">
        <h2 style={{ marginBottom: '2rem' }}>My Orders</h2>
        {orders.length === 0 ? (
          <div className="card glass">
            <p>You have no past orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="card glass order-card">
                <div className="order-card-header">
                  <div>
                    <strong style={{ color: 'var(--primary-color)' }}>Order ID:</strong> {order.id}
                  </div>
                  <div>
                    <strong>Date:</strong> {new Date(order.time).toLocaleString()}
                  </div>
                </div>

                <div className="order-status-banner">
                  <div>
                    <strong>Payment:</strong> {order.paymentMethod || 'Online'}
                  </div>
                  <div>
                    <strong>Status:</strong>{' '}
                    <span style={{ color: order.status?.includes('Pending') ? '#d97706' : 'var(--primary-color)', fontWeight: 'bold' }}>
                      {order.status || 'Pending'}
                    </span>
                  </div>
                </div>
                
                <div className="order-items-column">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item-line">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {item.imageUrl && (
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="order-item-thumb"
                          />
                        )}
                        <span>{item.name}</span>
                      </div>
                      <span style={{ fontWeight: '500' }}>₹{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="order-total-bar" style={{ justifyContent: 'flex-end', gap: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  Total: ₹{order.total.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
