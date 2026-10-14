import { PhoneCall, HelpCircle, Wheat } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container footer-cards-container">
        
        {/* Farmer Support */}
        <div className="footer-card">
          <div className="footer-card-header farmer">
            <Wheat size={24} />
            <h3>Farmer Support</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            For agricultural queries and selling assistance.
          </p>
          <div className="footer-card-phone">
            <PhoneCall size={20} color="var(--primary-color)" />
            +91 ----- -----
          </div>
        </div>

        {/* Customer Support */}
        <div className="footer-card">
          <div className="footer-card-header customer">
            <HelpCircle size={24} />
            <h3>Customer Support</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            For product inquiries and website help.
          </p>
          <div className="footer-card-phone">
            <PhoneCall size={20} color="var(--accent-orange-light, #f57c00)" />
            +91 ----- -----
          </div>
        </div>

      </div>

      <div className="footer-copyright">
        © {new Date().getFullYear()} AgriLink Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
