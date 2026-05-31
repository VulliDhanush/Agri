// 1. Import the Link component from React Router to handle page navigation without refreshing
import { Link } from 'react-router-dom';

// 2. Import some vector icons (like SVG images) to make the page look nice
import { ShoppingBasket, Tractor, Users } from 'lucide-react';

/**
 * Home Component
 * This is a standard "Presentational Component". It doesn't have any complex State or Logic.
 * It simply returns the JSX (HTML) that makes up the landing page of the website.
 */
export default function Home({ userRole }) {
  return (
    // 'className' is the React version of the HTML 'class' attribute.
    <div className="page-wrapper">
      <div className="container">
        
        {/* HERO SECTION: The big banner at the top of the page */}
        <section className="hero">
          <h1>Empowering Farmers, Connecting Communities</h1>
          <p>Your one-stop platform to sell organic produce, hire skilled agricultural workers, and rent farming machinery.</p>
          
          <div className="hero-buttons">
            {/* 
              Using <Link to="/..."> is like using <a href="/...">, 
              but it tells React Router to instantly swap out the page without a slow reload!
            */}
            <Link to="/marketplace" className="btn btn-primary">
              <ShoppingBasket size={20} />
              Shop Organic
            </Link>
            {userRole === 'Farmer' && (
              <Link to="/services" className="btn btn-accent">
                <Tractor size={20} />
                Explore Services
              </Link>
            )}
          </div>
        </section>

        {/* FEATURES SECTION: The three cards explaining how the site works */}
        <section className="mt-4 mb-2">
          <h2 className="text-center">How It Works</h2>
          
          {/* We use a CSS grid (defined in index.css) to put these three cards side-by-side */}
          <div className="grid-3">
            
            {/* Card 1 - Visible to everyone */}
            <div className="card glass text-center">
              <ShoppingBasket size={48} color="var(--primary-color)" style={{ margin: '0 auto' }} />
              <h3>Direct Marketplace</h3>
              <p>Farmers sell directly to consumers. Fresh, organic, and affordable.</p>
            </div>
            
            {/* Card 2 - Only visible to Farmers */}
            {userRole === 'Farmer' && (
              <div className="card glass text-center">
                <Users size={48} color="var(--primary-color)" style={{ margin: '0 auto' }} />
                <h3>Hire Workers</h3>
                <p>Post jobs and find skilled agricultural workers in your area.</p>
              </div>
            )}
            
            {/* Card 3 - Only visible to Farmers */}
            {userRole === 'Farmer' && (
              <div className="card glass text-center">
                <Tractor size={48} color="var(--primary-color)" style={{ margin: '0 auto' }} />
                <h3>Machine Rentals</h3>
                <p>Rent tractors and equipment from other farmers or local agencies.</p>
              </div>
            )}

          </div>
        </section>
        
      </div>
    </div>
  );
}
