import React, { useState } from 'react';
import './App.css';
import FallingLeaves from './components/FallingLeaves';
import AudioPlayer from './components/AudioPlayer';
import Countdown from './components/Countdown';
import MapModal from './components/MapModal';
import GiftModal from './components/GiftModal';
import RsvpModal from './components/RsvpModal';
import LotusEmblem from './components/LotusEmblem';
import HeroCoupleArt from './components/HeroCoupleArt';
import GoingAwayCouple from './components/GoingAwayCouple';
import { 
  Sparkles, 
  Flame, 
  UtensilsCrossed, 
  PartyPopper, 
  Clock, 
  Ticket, 
  Gift, 
  Mail, 
  PhoneCall, 
  MousePointerClick,
  Pencil,
  Check,
  UserCheck
} from 'lucide-react';

function App() {
  const [guestName, setGuestName] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('name') || params.get('to') || params.get('guest');
      if (nameParam) return decodeURIComponent(nameParam);
    }
    return 'Mr. & Mrs. Ranil Perera & Family';
  });

  const [guestCount, setGuestCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const seatsParam = params.get('seats') || params.get('passes');
      if (seatsParam && !isNaN(parseInt(seatsParam))) {
        return Math.max(1, Math.min(8, parseInt(seatsParam)));
      }
    }
    return 2;
  });

  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapLocation, setMapLocation] = useState('poruwa');
  const [giftOpen, setGiftOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  const openMap = (loc) => {
    setMapLocation(loc);
    setMapOpen(true);
  };

  return (
    <div className="app-root">
      {/* Background Floating Jasmine & Lotus Petals */}
      <FallingLeaves />

      {/* Floating Audio Controller for Sri Lankan Traditional Flute Melodies */}
      <AudioPlayer />

      {/* Main Wedding Invitation Card */}
      <div className="invitation-outer-wrap">
        <main className="invitation-card royal-sri-lankan">
          
          {/* SECTION 1: HEADER WITH TRANSPARENT GOLD LOTUS ICON & BLESSING */}
          <section className="inv-section header-section">
            <div className="lotus-emblem-top">
              <LotusEmblem className="emblem-header" alt="Sri Lankan Sacred Lotus Motif" />
            </div>

            <div className="scripture-box">
              <span className="sinhala-welcome">ආයුබෝවන් • AYUBOWAN</span>
              <p className="scripture-text">
                WITH THE BLESSINGS OF THE NOBLE TRIPLE GEM,
                <br />
                DIVINE PROVIDENCE, AND OUR BELOVED PARENTS
              </p>
              <span className="scripture-ref">දෙගුරුන්ගේ ආශිර්වාදය පෙරදැරිව</span>
            </div>

            <div className="monogram-wrapper">
              <div className="monogram-initials">
                <span className="mono-letter">K</span>
                <span className="mono-divider">🪷</span>
                <span className="mono-letter">T</span>
              </div>
              <span className="monogram-sub">MANGALA MAHOTSAVAYA • මංගල උත්සවය</span>
            </div>
          </section>

          {/* SECTION 2: HERO COUPLE IN TRADITIONAL KANDYAN ATTIRE */}
          <section className="inv-section photo-section hero-illustration-section">
            <div className="hero-photo-wrap">
              <HeroCoupleArt alt="Kavindu & Tharushi - Traditional Kandyan Wedding Illustration" />
            </div>
          </section>

          {/* SECTION 3: LINEAGE, COUPLE NAMES & AUSPICIOUS NEKATHA */}
          <section className="inv-section blessing-section">
            <p className="blessing-intro">
              MR. SUNIL WICKRAMASINGHE &amp; MRS. ANOMA WICKRAMASINGHE
              <br />
              <span className="family-together">&amp;</span>
              <br />
              MR. BANDULA JAYASURIYA &amp; MRS. ROHINI JAYASURIYA
            </p>

            <p className="cordial-invite">
              Request the honour of your valued presence to grace the auspicious
              <br />
              marriage ceremony and celebration of their children
            </p>

            <div className="couple-names-wrap">
              <h1 className="couple-names">
                Kavindu
                <span className="names-amp">&amp;</span>
                Tharushi
              </h1>
              <div className="names-botanical-accent">
                <LotusEmblem className="emblem-mini" alt="Lotus accent" />
              </div>
            </div>

            <p className="invite-statement">
              AS THEY STEP INTO A LIFETIME OF LOVE, HARMONY &amp; HAPPINESS
            </p>

            {/* AUSPICIOUS DATE RIBBON */}
            <div className="date-badge-ribbon">
              <div className="ribbon-col day-col">THURSDAY</div>
              <div className="ribbon-col month-day-col">
                <span className="month-text">NOVEMBER</span>
                <span className="day-number">26</span>
              </div>
              <div className="ribbon-col year-col">2026</div>
            </div>

            <div className="auspicious-time-pill">
              <Flame size={14} className="flame-icon" />
              <span>Auspicious Poruwa Ascent (නැකත): <strong>09:48 AM</strong></span>
            </div>

            {/* COUNTDOWN TO NEKATHA & CALENDAR */}
            <Countdown weddingDate="2026-11-26T09:48:00" />
          </section>

          {/* SECTION 4: PORUWA CEREMONY & RECEPTION VENUES */}
          <section className="inv-section events-section">
            {/* Poruwa Ceremony */}
            <div className="event-item">
              <span className="event-time">09:30 AM — MORNING</span>
              <h3 className="event-heading">TRADITIONAL PORUWA CEREMONY</h3>
              <p className="event-sinhala-heading">පෝරුව චාරිත්‍ර &amp; මඟුල් බෙර</p>
              <p className="event-venue">CINNAMON GRAND COLOMBO</p>
              <p className="event-address">The Grand Ballroom • 77 Galle Road</p>
              <p className="event-city">Colombo 03, Sri Lanka</p>
              
              <button 
                className="action-btn-olive"
                onClick={() => openMap('poruwa')}
              >
                <span>VIEW LOCATION &amp; MAP</span>
                <MousePointerClick size={16} className="btn-click-icon" />
              </button>
            </div>

            {/* Evening Reception */}
            <div className="event-item">
              <span className="event-time">07:00 PM — EVENING</span>
              <h3 className="event-heading">GRAND RECEPTION &amp; BAILA CELEBRATION</h3>
              <p className="event-sinhala-heading">මංගල සාදය &amp; නර්තන සැඳෑව</p>
              <p className="event-venue">THE KINGSBURY COLOMBO</p>
              <p className="event-address">The Balmoral Hall • 48 Janadhipathi Mawatha</p>
              <p className="event-city">Colombo 01, Sri Lanka</p>
              
              <button 
                className="action-btn-olive"
                onClick={() => openMap('reception')}
              >
                <span>VIEW LOCATION &amp; MAP</span>
                <MousePointerClick size={16} className="btn-click-icon" />
              </button>
            </div>
          </section>

          {/* SECTION 5: TRADITIONAL ITINERARY (චාරිත්‍ර පෙළගැස්ම) */}
          <section className="inv-section itinerary-section">
            <h3 className="itinerary-main-title">ITINERARY OF CEREMONIES</h3>
            <p className="itinerary-sinhala-title">චාරිත්‍ර පෙළගැස්ම</p>
            
            <div className="itinerary-card-torn royal-gold-card">
              <div className="itinerary-water-bg"></div>
              
              <div className="timeline-container">
                <div className="timeline-spine"></div>

                {/* Event 1 */}
                <div className="timeline-row">
                  <div className="timeline-icon-col">
                    <div className="timeline-icon-circle">
                      <Sparkles size={18} strokeWidth={1.7} />
                    </div>
                  </div>
                  <div className="timeline-info-col">
                    <span className="timeline-time">09:30 AM</span>
                    <span className="timeline-name">Magul Bera &amp; Welcome</span>
                    <span className="timeline-sinhala">මඟුල් බෙර වාදනය</span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="timeline-row">
                  <div className="timeline-icon-col">
                    <div className="timeline-icon-circle highlight">
                      <Flame size={18} strokeWidth={1.7} />
                    </div>
                  </div>
                  <div className="timeline-info-col">
                    <span className="timeline-time">09:48 AM (Auspicious)</span>
                    <span className="timeline-name">Poruwa Ascent Ceremony</span>
                    <span className="timeline-sinhala">සුබ නැකතින් පෝරුවට ගොඩවීම</span>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="timeline-row">
                  <div className="timeline-icon-col">
                    <div className="timeline-icon-circle">
                      <Flame size={18} strokeWidth={1.7} />
                    </div>
                  </div>
                  <div className="timeline-info-col">
                    <span className="timeline-time">10:15 AM</span>
                    <span className="timeline-name">Lighting of the Oil Lamp</span>
                    <span className="timeline-sinhala">සාම්ප්‍රදායික පහන දැල්වීම</span>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="timeline-row">
                  <div className="timeline-icon-col">
                    <div className="timeline-icon-circle">
                      <UtensilsCrossed size={18} strokeWidth={1.7} />
                    </div>
                  </div>
                  <div className="timeline-info-col">
                    <span className="timeline-time">11:30 AM</span>
                    <span className="timeline-name">Kiribath &amp; Traditional Feast</span>
                    <span className="timeline-sinhala">කිරිබත් සහ කැවුම් සංග්‍රහය</span>
                  </div>
                </div>

                {/* Event 5 */}
                <div className="timeline-row">
                  <div className="timeline-icon-col">
                    <div className="timeline-icon-circle">
                      <PartyPopper size={18} strokeWidth={1.7} />
                    </div>
                  </div>
                  <div className="timeline-info-col">
                    <span className="timeline-time">07:30 PM</span>
                    <span className="timeline-name">Evening Reception &amp; Baila</span>
                    <span className="timeline-sinhala">සංගීතය සහ බයිලා නර්තනය</span>
                  </div>
                </div>

                {/* Event 6 */}
                <div className="timeline-row">
                  <div className="timeline-icon-col">
                    <div className="timeline-icon-circle">
                      <Clock size={18} strokeWidth={1.7} />
                    </div>
                  </div>
                  <div className="timeline-info-col">
                    <span className="timeline-time">12:00 AM</span>
                    <span className="timeline-name">Going Away / Farewell</span>
                    <span className="timeline-sinhala">යුවල නික්මයාම</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 6: RESERVED SEATS & TABLE */}
          <section className="inv-section passes-section">
            <div className="passes-icon-wrap">
              <Ticket size={28} strokeWidth={1.6} />
            </div>
            <h4 className="passes-title">SEATS RESERVED</h4>
            <p className="passes-subtitle">WE HAVE RESERVED WITH PLEASURE</p>

            {/* Personalized Royal Guest Card */}
            <div className="guest-personalized-card">
              <div className="guest-honored-tag">
                <span className="guest-tag-sinhala">ගෞරවනීය ආරාධනය</span>
                <span className="guest-tag-divider">•</span>
                <span className="guest-tag-en">SPECIALLY RESERVED FOR</span>
              </div>

              {isEditingGuest ? (
                <div className="guest-name-edit-form">
                  <input
                    type="text"
                    className="guest-name-input"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter guest or family name"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setIsEditingGuest(false);
                    }}
                  />
                  <button 
                    className="guest-name-save-btn" 
                    onClick={() => setIsEditingGuest(false)}
                    title="Save Name"
                  >
                    <Check size={16} />
                    <span>Done</span>
                  </button>
                </div>
              ) : (
                <div className="guest-name-display-wrap">
                  <h3 className="invited-guest-name">
                    {guestName || 'Honored Guest & Family'}
                  </h3>
                  <button 
                    className="guest-name-edit-btn"
                    onClick={() => setIsEditingGuest(true)}
                    title="Tap to personalize guest name"
                    aria-label="Edit guest name"
                  >
                    <Pencil size={12} />
                    <span>Personalize</span>
                  </button>
                </div>
              )}

              <div className="guest-card-divider">
                <span className="divider-line"></span>
                <span className="divider-diamond">✦</span>
                <span className="divider-line"></span>
              </div>

              <div className="passes-badge-row">
                <span className="para-ti">FOR YOU</span>
                <div 
                  className="passes-number-box" 
                  onClick={() => setGuestCount((g) => (g >= 6 ? 1 : g + 1))} 
                  title="Click to toggle guest count"
                >
                  {guestCount}
                </div>
                <span className="lugares-label">{guestCount === 1 ? 'SEAT' : 'SEATS'}</span>
              </div>
            </div>

            <div className="passes-botanical-right">
              <LotusEmblem className="emblem-mini" alt="Lotus motif" />
            </div>
          </section>

          {/* SECTION 7: BLESSINGS & GIFTS */}
          <section className="inv-section gift-section">
            <div className="gift-icon-wrap">
              <Gift size={28} strokeWidth={1.6} />
            </div>
            <h4 className="gift-heading">BLESSINGS &amp; GIFTS</h4>
            <p className="gift-sinhala-heading">සුබ පැතුම් සහ තිළිණ</p>
            <p className="gift-quote">
              YOUR WARMEST SMILES, BLESSINGS, AND PRESENCE
              <br />
              ARE THE GREATEST TREASURES WE COULD ASK FOR.
              <br />
              CONTRIBUTIONS TOWARD OUR NEW HOME ARE CHERISHED.
            </p>
            <p className="gift-bold-label">WISH BOX &amp; DIGITAL BLESSING</p>
            
            <button 
              className="gift-envelope-btn"
              onClick={() => setGiftOpen(true)}
              title="View bank details and gift info"
            >
              <div className="envelope-icon-ring">
                <Mail size={22} />
              </div>
              <span className="envelope-btn-hint">Tap to view Bank Account &amp; Blessing details</span>
            </button>
          </section>

          {/* SECTION 8: RSVP CONFIRMATION */}
          <section className="inv-section rsvp-section">
            <div className="rsvp-phone-icon-wrap">
              <div className="phone-circle">
                <PhoneCall size={22} />
              </div>
            </div>
            <h4 className="rsvp-heading">RSVP • CONFIRMATION</h4>
            <p className="rsvp-sinhala-heading">පැමිණීම තහවුරු කිරීම</p>
            <p className="rsvp-sub">
              WE KINDLY REQUEST YOUR CONFIRMATION
              <br />
              ON OR BEFORE NOVEMBER 01, 2026
            </p>

            <button 
              className="action-btn-olive rsvp-large-btn"
              onClick={() => setRsvpOpen(true)}
            >
              <span>CONFIRM VIA WHATSAPP</span>
              <MousePointerClick size={18} className="btn-click-icon" />
            </button>

            <div className="adults-only-box">
              <p>
                DRESS CODE: TRADITIONAL NATIONAL / ELEGANT FORMAL
              </p>
              <p className="adults-bold">SUBHA MANGALAM • සුබ මංගලම්</p>
            </div>

            <div className="rsvp-botanical-bottom">
              <LotusEmblem className="emblem-bottom" alt="Lotus emblem" />
            </div>

            <p className="final-gratitude">
              WE AWAIT TO WELCOME YOU WITH WARMTH.
              <br />
              ආයුබෝවන් • THANK YOU
            </p>
          </section>

          {/* SECTION 9: FOOTER GOING AWAY COUPLE */}
          <section className="inv-section footer-photo-section">
            <div className="footer-going-away-wrap">
              <div className="footer-love-heading">
                <span className="footer-tagline">AS WE BEGIN OUR FOREVER TOGETHER</span>
                <h3 className="footer-couple-names">Kavindu &amp; Tharushi</h3>
                <span className="footer-blessing">සුබ මංගලම් • SUBHA MANGALAM</span>
              </div>

              <div className="going-away-art-container">
                <GoingAwayCouple alt="Kavindu & Tharushi Walking Together Hand in Hand" />
              </div>

              <div className="footer-farewell-text">
                <p className="farewell-quote">
                  "Two souls with but a single thought, two hearts that beat as one."
                </p>
                <span className="farewell-gratitude">ආයුබෝවන් • WITH LOVE &amp; GRATITUDE</span>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Interactive Modals */}
      <MapModal 
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        initialLocation={mapLocation}
      />

      <GiftModal 
        isOpen={giftOpen}
        onClose={() => setGiftOpen(false)}
      />

      <RsvpModal 
        isOpen={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        defaultPasses={guestCount}
        defaultName={guestName}
      />
    </div>
  );
}

export default App;
