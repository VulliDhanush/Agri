import { PhoneCall, HelpCircle, Wheat } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--footer-bg)', 
      padding: '3rem 1rem 1.5rem 1rem', 
      marginTop: 'auto', 
      borderTop: '1px solid var(--border-color-light)',
      textAlign: 'center',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        gap: '2rem' 
      }}>
        
        {/* Farmer Support */}
        <div style={{ 
          flex: '1 1 300px', 
          backgroundColor: 'var(--card-bg-solid)', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          boxShadow: 'var(--shadow)',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
            <Wheat size={24} />
            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Farmer Support</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>For agricultural queries and selling assistance.</p>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <PhoneCall size={20} color="var(--primary-color)" />
            +91 ----- -----
          </div>
        </div>

        {/* Customer Support */}
        <div style={{ 
          flex: '1 1 300px', 
          backgroundColor: 'var(--card-bg-solid)', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          boxShadow: 'var(--shadow)',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--accent-orange-light, #f57c00)', marginBottom: '0.5rem' }}>
            <HelpCircle size={24} />
            <h3 style={{ margin: 0, color: 'var(--accent-orange, #e65100)' }}>Customer Support</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>For product inquiries and website help.</p>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
<<<<<<< HEAD
            <PhoneCall size={20} color="#f57c00" />
            +91 ----- -----(Demo)
=======
            <PhoneCall size={20} color="var(--accent-orange-light, #f57c00)" />
            +91 ----- -----
>>>>>>> 71667bd (theme(light0r dark))
          </div>
        </div>

      </div>
      
      <div style={{ 
        marginTop: '3rem', 
        paddingTop: '1.5rem', 
        borderTop: '1px solid var(--border-color)', 
        color: 'var(--text-muted)', 
        fontSize: '0.9rem', 
        fontWeight: '500',
        transition: 'border-color 0.3s ease, color 0.3s ease'
      }}>
        © {new Date().getFullYear()} AgriLink Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
