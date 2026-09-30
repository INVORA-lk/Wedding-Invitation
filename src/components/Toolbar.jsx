import React from 'react';
import { Smartphone, Monitor, CheckCircle, Gift, MapPin } from 'lucide-react';

export default function Toolbar({
  viewMode,
  setViewMode,
  onOpenRsvp,
  onOpenGift,
  onOpenMap,
  guestCount,
  setGuestCount
}) {
  return (
    <header className="top-toolbar">
      <div className="toolbar-brand">
        <span className="brand-monogram">K &amp; T</span>
        <span className="brand-text">Sri Lankan Wedding • Demo Preview</span>
      </div>

      <div className="toolbar-center-controls">
        <div className="view-mode-pill">
          <button
            className={`pill-btn ${viewMode === 'mobile' ? 'active' : ''}`}
            onClick={() => setViewMode('mobile')}
            title="Mobile Phone View"
          >
            <Smartphone size={15} />
            <span>Mobile</span>
          </button>
          <button
            className={`pill-btn ${viewMode === 'desktop' ? 'active' : ''}`}
            onClick={() => setViewMode('desktop')}
            title="Full Screen View"
          >
            <Monitor size={15} />
            <span>Full</span>
          </button>
        </div>

        <div className="passes-quick-select" title="Simulate assigned seats">
          <label htmlFor="toolbar-passes">Seats:</label>
          <select
            id="toolbar-passes"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="toolbar-select"
          >
            <option value={1}>1 Seat</option>
            <option value={2}>2 Seats</option>
            <option value={3}>3 Seats</option>
            <option value={4}>4 Seats</option>
          </select>
        </div>
      </div>

      <div className="toolbar-quick-links">
        <button className="quick-btn" onClick={() => onOpenMap('poruwa')}>
          <MapPin size={14} />
          <span>Venues</span>
        </button>
        <button className="quick-btn" onClick={onOpenGift}>
          <Gift size={14} />
          <span>Gifts</span>
        </button>
        <button className="quick-btn highlight" onClick={onOpenRsvp}>
          <CheckCircle size={14} />
          <span>RSVP</span>
        </button>
      </div>
    </header>
  );
}
