// 1. Import useState to give our component memory (specifically, to remember which "Tab" is active)
import { useState } from 'react';

/**
 * Services Component (Job Board and Machine Rentals)
 * This page shows how to build a "Tabbed" interface where clicking a button 
 * swaps out the content below it!
 */
export default function Services() {
  // --- STATE ---
  // 'activeTab' remembers which button the user clicked. 
  // It starts with the value 'jobs' by default.
  const [activeTab, setActiveTab] = useState('jobs');

  // --- MOCK DATA ---
  // Temporary fake data for the job listings
  const mockJobs = [
    { _id: '1', title: 'Harvest Worker', wage: 15, location: 'Springfield Farm', description: 'Need help harvesting apples.' },
    { _id: '2', title: 'Tractor Driver', wage: 20, location: 'Green Acres', description: 'Experienced tractor driver needed for plowing.' }
  ];

  // Temporary fake data for the machine rentals
  const mockMachines = [
    { _id: '1', name: 'John Deere Tractor', type: 'Tractor', rentalPricePerDay: 150, imageUrl: 'https://placehold.co/600x400/2e7d32/FFF?text=Tractor' },
    { _id: '2', name: 'Combine Harvester', type: 'Harvester', rentalPricePerDay: 300, imageUrl: 'https://placehold.co/600x400/2e7d32/FFF?text=Harvester' },
    { _id: '3', name: 'Heavy Duty Plow', type: 'Attachment', rentalPricePerDay: 50, imageUrl: 'https://placehold.co/600x400/2e7d32/FFF?text=Plow' },
    { _id: '4', name: 'Irrigation System Pump', type: 'Pump', rentalPricePerDay: 75, imageUrl: 'https://placehold.co/600x400/2e7d32/FFF?text=Pump' }
  ];

  // --- RENDER ---
  return (
    <div className="page-wrapper">
      <div className="container">
        <h2>Services & Rentals</h2>
        
        {/* THE TAB BUTTONS */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {/* 
            DYNAMIC CSS CLASSES:
            We use a template literal (the backticks ``) to say: 
            "If activeTab is 'jobs', give this button the 'btn-primary' color. 
            Otherwise, give it the transparent 'glass' style."
          */}
          <button 
            className={`btn ${activeTab === 'jobs' ? 'btn-primary' : 'glass'}`} 
            onClick={() => setActiveTab('jobs')}
          >
            Job Board
          </button>
          
          <button 
            className={`btn ${activeTab === 'machines' ? 'btn-primary' : 'glass'}`} 
            onClick={() => setActiveTab('machines')}
          >
            Machine Rentals
          </button>
        </div>

        {/* --- CONDITIONAL RENDERING (THE TABS) --- */}
        
        {/* TAB 1: Show this section ONLY if activeTab is 'jobs' */}
        {activeTab === 'jobs' && (
          <div className="grid-3">
            {mockJobs.map(job => (
              <div key={job._id} className="card glass">
                <div className="card-title">{job.title}</div>
                <p><strong>Location:</strong> {job.location}</p>
                <p>{job.description}</p>
                
                <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="card-price">₹{job.wage}/hr</span>
                  <button className="btn btn-accent" style={{ padding: '0.5rem 1rem' }} onClick={() => alert('Application submitted!')}>Apply</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Show this section ONLY if activeTab is 'machines' */}
        {activeTab === 'machines' && (
          <div className="grid-3">
            {mockMachines.map(machine => (
              <div key={machine._id} className="card glass">
                <img src={machine.imageUrl} alt={machine.name} className="card-image" />
                <div className="card-title">{machine.name}</div>
                <p><strong>Type:</strong> {machine.type}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem' }}>
                  <span className="card-price">₹{machine.rentalPricePerDay}/day</span>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => alert(`Requested rental for ${machine.name}`)}>Rent</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}
