export default function Orders({ orders }) {
  return (
    <div className="page-wrapper">
      <div className="container">
        <h2 style={{ marginBottom: '2rem' }}>My Orders</h2>
        {orders.length === 0 ? (
          <div className="card glass">
            <p>You have no past orders yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div key={order.id} className="card glass" style={{ padding: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  borderBottom: '1px solid rgba(0,0,0,0.1)', 
                  paddingBottom: '1rem', 
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <strong style={{ color: 'var(--primary-color)' }}>Order ID:</strong> {order.id}
                  </div>
                  <div>
                    <strong>Date:</strong> {new Date(order.time).toLocaleString()}
                  </div>
                </div>

                {/* NEW: Payment and Status Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0.75rem', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '8px' }}>
                  <div>
                    <strong>Payment:</strong> {order.paymentMethod || 'Online'}
                  </div>
                  <div>
                    <strong>Status:</strong> <span style={{ color: order.status?.includes('Pending') ? '#d97706' : 'var(--primary-color)', fontWeight: 'bold' }}>{order.status || 'Pending'}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                  {order.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {item.imageUrl && (
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                          />
                        )}
                        <span>{item.name}</span>
                      </div>
                      <span style={{ fontWeight: '500' }}>₹{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div style={{ 
                  textAlign: 'right', 
                  paddingTop: '1rem', 
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                  fontWeight: 'bold', 
                  fontSize: '1.2rem',
                  color: 'var(--primary-color)'
                }}>
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
