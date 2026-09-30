import React from 'react';
import { X, MapPin, ExternalLink, Navigation } from 'lucide-react';

export default function MapModal({ isOpen, onClose, initialLocation = 'poruwa' }) {
  const [activeTab, setActiveTab] = React.useState(initialLocation);

  React.useEffect(() => {
    if (initialLocation) {
      setActiveTab(initialLocation);
    }
  }, [initialLocation]);

  if (!isOpen) return null;

  const locations = {
    poruwa: {
      title: "Cinnamon Grand Colombo",
      time: "09:30 AM (09:48 AM Auspicious Poruwa)",
      type: "Poruwa Ceremony & Magul Bera",
      address: "The Grand Ballroom, 77 Galle Road, Colombo 03, Sri Lanka",
      note: "Valet parking available at the main hotel porch. Please be seated before 09:30 AM for the Magul Bera welcome.",
      mapQuery: "Cinnamon Grand Colombo, Galle Road, Colombo",
      gmapsUrl: "https://maps.google.com/?q=Cinnamon+Grand+Colombo",
      wazeUrl: "https://waze.com/ul?q=Cinnamon+Grand+Colombo",
    },
    reception: {
      title: "The Kingsbury Colombo",
      time: "07:00 PM onwards",
      type: "Evening Reception & Baila Celebration",
      address: "The Balmoral Hall, 48 Janadhipathi Mawatha, Colombo 01, Sri Lanka",
      note: "Join us for champagne, dinner buffet, live music and dancing under the stars.",
      mapQuery: "The Kingsbury Hotel, Colombo",
      gmapsUrl: "https://maps.google.com/?q=The+Kingsbury+Hotel+Colombo",
      wazeUrl: "https://waze.com/ul?q=The+Kingsbury+Hotel+Colombo",
    }
  };

  const current = locations[activeTab] || locations.poruwa;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-badge">WEDDING VENUES • ස්ථානයන්</div>
          <h3 className="modal-title">Venue & Directions</h3>
        </div>

        <div className="tab-pill-group">
          <button 
            className={`tab-pill ${activeTab === 'poruwa' ? 'active' : ''}`}
            onClick={() => setActiveTab('poruwa')}
          >
            Poruwa (09:30 AM)
          </button>
          <button 
            className={`tab-pill ${activeTab === 'reception' ? 'active' : ''}`}
            onClick={() => setActiveTab('reception')}
          >
            Reception (07:00 PM)
          </button>
        </div>

        <div className="location-detail-card">
          <div className="location-icon-circle">
            <MapPin size={24} color="#7e1227" />
          </div>
          <h4>{current.title}</h4>
          <span className="location-subtitle">{current.type} — {current.time}</span>
          <p className="location-address">{current.address}</p>
          <p className="location-note">{current.note}</p>

          <div className="map-embed-wrapper">
            <iframe
              title={`Map for ${current.title}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(current.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
            />
          </div>

          <div className="location-actions">
            <a 
              href={current.gmapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="loc-action-btn primary"
            >
              <Navigation size={16} />
              <span>Open in Google Maps</span>
            </a>
            <a 
              href={current.wazeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="loc-action-btn secondary"
            >
              <ExternalLink size={16} />
              <span>Open in Waze</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
