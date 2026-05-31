import { PhoneCall, HelpCircle, Wheat } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#e8ecef', 
      padding: '3rem 1rem 1.5rem 1rem', 
      marginTop: 'auto', 
      borderTop: '1px solid rgba(0,0,0,0.05)',
      textAlign: 'center'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        gap: '2rem' 
      }}>
        
        {/* Farmer Support */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
            <Wheat size={24} />
            <h3 style={{ margin: 0, color: 'var(--primary-dark)' }}>Farmer Support</h3>
          </div>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>For agricultural queries and selling assistance.</p>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <PhoneCall size={20} color="var(--primary-color)" />
            +91 98765 43210
          </div>
        </div>

        {/* Customer Support */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#f57c00', marginBottom: '0.5rem' }}>
            <HelpCircle size={24} />
            <h3 style={{ margin: 0, color: '#e65100' }}>Customer Support</h3>
          </div>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>For product inquiries and website help.</p>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <PhoneCall size={20} color="#f57c00" />
            +91 91234 56789
          </div>
        </div>

      </div>
      
      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.1)', color: '#888', fontSize: '0.9rem', fontWeight: '500' }}>
        © {new Date().getFullYear()} AgriLink Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
