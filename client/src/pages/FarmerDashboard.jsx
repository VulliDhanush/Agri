import { useState } from 'react';
import { Upload, Edit2, Check, X as CloseIcon, Trash2 } from 'lucide-react';

export default function FarmerDashboard({ products, onAddProduct, onUpdatePrice, onRemoveProduct }) {
  // State for the "Add Product" form
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // State to track which product we are actively editing the price for
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  // Handle file uploads by converting the image to a Base64 string so it can be previewed immediately
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the Base64 string as our image URL!
      };
      reader.readAsDataURL(file);
    }
  };

  // When the farmer submits the "Add Product" form
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from refreshing
    
    // Create the product object
    const newProduct = {
      name: name,
      price: parseFloat(price),
      description: description,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1595856467205-19e078044738?auto=format&fit=crop&w=300&q=80'
    };

    // Send it to App.jsx to be added to the master list
    onAddProduct(newProduct);

    // Clear the form fields
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    
    alert('Product added successfully to the Marketplace!');
  };

  // When the farmer clicks "Save" on a price update
  const handleSavePrice = (id) => {
    if (!newPrice) return;
    onUpdatePrice(id, newPrice);
    setEditingId(null);
    setNewPrice('');
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h2 style={{ marginBottom: '1rem' }}>Farmer Dashboard</h2>
        <p className="mb-2">Manage your inventory: Add new products or update your prices here.</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          
          {/* SECTION 1: ADD NEW PRODUCT FORM */}
          <div className="card glass" style={{ flex: '1 1 300px', alignSelf: 'flex-start' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Add a New Product</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Product Name</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                  placeholder="e.g. Fresh Spinach"
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Price (₹ per kg)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  required 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                  placeholder="e.g. 2.50"
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Description (Optional)</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
                  placeholder="Briefly describe the product..."
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Product Image</label>
                
                {/* Image Preview Area */}
                <div style={{ 
                  width: '100%', 
                  height: '150px', 
                  backgroundColor: 'rgba(0,0,0,0.02)', 
                  border: '2px dashed #ccc', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ color: '#888', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Upload size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                      <span style={{ fontSize: '0.9rem' }}>No image selected</span>
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Beautiful Upload Button (Hides the ugly native input) */}
                  <label style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem',
                    backgroundColor: 'var(--primary-color)',
                    color: '#fff',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <Upload size={18} />
                    Upload from Computer
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }} // Hide the native input
                    />
                  </label>

                  <div style={{ textAlign: 'center', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>— OR —</div>
                  
                  <input 
                    type="url" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                    placeholder="Paste an Image URL here..."
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Add to Marketplace
              </button>
            </form>
          </div>

          {/* SECTION 2: UPDATE PRICES OF EXISTING PRODUCTS */}
          <div style={{ flex: '2 1 400px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--primary-color)', margin: 0 }}>Current Inventory</h3>
              <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.05)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                {products.length} Items
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {products.map(product => (
                <div key={product._id} className="card glass" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '1rem 1.5rem',
                  borderLeft: '4px solid var(--primary-color)',
                  transition: 'transform 0.2s',
                }}>
                  
                  {/* Left Side: Image and Details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, overflow: 'hidden' }}>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} 
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', overflow: 'hidden' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                      <div style={{ color: '#666', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {product.description}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Pricing and Controls */}
                  {editingId === product._id ? (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', backgroundColor: 'rgba(46, 125, 50, 0.05)', padding: '0.5rem', borderRadius: '8px', marginLeft: '1rem' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>₹</span>
                      <input 
                        type="number" 
                        step="0.01" 
                        value={newPrice} 
                        onChange={(e) => setNewPrice(e.target.value)}
                        style={{ width: '70px', padding: '0.4rem', border: '1px solid var(--primary-color)', borderRadius: '4px', outline: 'none' }}
                        autoFocus
                      />
                      <button 
                        style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                        onClick={() => handleSavePrice(product._id)}
                        title="Save Price"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        style={{ background: '#e0e0e0', color: '#333', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                        onClick={() => setEditingId(null)}
                        title="Cancel"
                      >
                        <CloseIcon size={16} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginLeft: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                          ₹{product.price.toFixed(2)} <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 'normal' }}>/ kg</span>
                        </span>
                      </div>
                      
                      <button 
                        style={{ 
                          background: 'rgba(0,0,0,0.04)', 
                          border: 'none', 
                          padding: '0.6rem', 
                          borderRadius: '50%', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#555',
                          transition: 'background 0.2s, color 0.2s'
                        }}
                        onClick={() => {
                          setEditingId(product._id);
                          setNewPrice(product.price);
                        }}
                        title="Edit Price"
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-color)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.color = '#555'; }}
                      >
                        <Edit2 size={18} />
                      </button>

                      <button 
                        style={{ 
                          background: 'rgba(255,0,0,0.05)', 
                          border: 'none', 
                          padding: '0.6rem', 
                          borderRadius: '50%', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ff4444',
                          transition: 'background 0.2s, color 0.2s'
                        }}
                        onClick={() => {
                          // Simple confirmation before deleting
                          if(window.confirm(`Are you sure you want to remove ${product.name} from the marketplace?`)) {
                            onRemoveProduct(product._id);
                          }
                        }}
                        title="Remove Product"
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#ff4444'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,0,0,0.05)'; e.currentTarget.style.color = '#ff4444'; }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
