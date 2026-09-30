import React, { useState } from 'react';
import { X, Send, Heart, CheckCircle2, MessageCircle, Music2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RsvpModal({ isOpen, onClose, defaultPasses = 2, defaultName = '' }) {
  const [name, setName] = useState(defaultName);
  const [attending, setAttending] = useState('yes');
  const [passesCount, setPassesCount] = useState(defaultPasses);
  const [eventChoice, setEventChoice] = useState('both');
  const [diet, setDiet] = useState('buffet');
  const [song, setSong] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (defaultName && !name) setName(defaultName);
    if (defaultPasses) setPassesCount(defaultPasses);
  }, [defaultName, defaultPasses, isOpen]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#cba135', '#7e1227', '#e5be58', '#1c4528', '#ffffff']
    });
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const answer = attending === 'yes' ? '✨ Joyfully Accepting with Love!' : 'Regretfully Declining with warm wishes.';
    const eventsText = attending === 'yes' ? `\n- Events: ${eventChoice === 'both' ? 'Poruwa Ceremony & Evening Reception' : eventChoice === 'poruwa' ? 'Poruwa Ceremony Only' : 'Reception Only'}` : '';
    const dietText = attending === 'yes' ? `\n- Dietary Preference: ${diet}` : '';
    const songText = song ? `\n- Baila / Dance Song Request: "${song}"` : '';
    const msgText = message ? `\n- Personal Note: "${message}"` : '';

    const text = `Ayubowan Kavindu & Tharushi! 🪷💍\n\nGuest Name: *${name.trim()}*\nRSVP Status: *${answer}*\n- Reserved Seats: ${attending === 'yes' ? passesCount : 0}${eventsText}${dietText}${songText}${msgText}\n\nSubha Mangalam! Looking forward to celebrating with you!`;

    triggerConfetti();
    setSubmitted(true);

    const waPhone = "94771234567"; // Sri Lankan demo mobile
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  const handleDirectSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    triggerConfetti();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card rsvp-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <div className="modal-badge">RSVP • පැමිණීම තහවුරු කිරීම</div>
              <h3 className="modal-title">Confirm Attendance</h3>
              <p className="modal-subtitle">
                Kindly respond by <strong>November 01, 2026</strong> to help us arrange your hospitality.
              </p>
            </div>

            <form onSubmit={handleWhatsAppSend} className="rsvp-form">
              <div className="form-group">
                <label htmlFor="rsvp-name">Full Name(s) *</label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  placeholder="e.g. Mr. & Mrs. Ranil Perera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Will you grace us with your presence? *</label>
                <div className="radio-pill-group">
                  <button
                    type="button"
                    className={`radio-pill ${attending === 'yes' ? 'selected' : ''}`}
                    onClick={() => setAttending('yes')}
                  >
                    🪷 Joyfully Accept
                  </button>
                  <button
                    type="button"
                    className={`radio-pill ${attending === 'no' ? 'selected' : ''}`}
                    onClick={() => setAttending('no')}
                  >
                    🕊️ Regretfully Decline
                  </button>
                </div>
              </div>

              {attending === 'yes' && (
                <>
                  <div className="form-group">
                    <label htmlFor="rsvp-passes">Number of Guests Attending:</label>
                    <select
                      id="rsvp-passes"
                      className="form-select"
                      value={passesCount}
                      onChange={(e) => setPassesCount(Number(e.target.value))}
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="rsvp-event-choice">Attending Ceremonies:</label>
                    <select
                      id="rsvp-event-choice"
                      className="form-select"
                      value={eventChoice}
                      onChange={(e) => setEventChoice(e.target.value)}
                    >
                      <option value="both">Both Poruwa (Morning) &amp; Reception (Evening)</option>
                      <option value="poruwa">Poruwa Ceremony Only (09:30 AM)</option>
                      <option value="reception">Evening Reception &amp; Baila Only (07:00 PM)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="rsvp-diet">Dietary Preference:</label>
                    <select
                      id="rsvp-diet"
                      className="form-select"
                      value={diet}
                      onChange={(e) => setDiet(e.target.value)}
                    >
                      <option value="Sri Lankan Banquet & Curries">Sri Lankan Traditional Wedding Buffet</option>
                      <option value="Halal Certified">Halal Certified Menu</option>
                      <option value="Vegetarian">Pure Vegetarian</option>
                      <option value="Jain Vegetarian">Jain Vegetarian</option>
                      <option value="Western Gourmet">Western Gourmet Selection</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="rsvp-song">
                      <Music2 size={14} style={{ display: 'inline', marginRight: 4, color: '#cba135' }} />
                      Favorite Baila / Dance Track for the Band:
                    </label>
                    <input
                      id="rsvp-song"
                      type="text"
                      placeholder="e.g. Kandy Lamissi, Yamu Yamu, Surangani..."
                      value={song}
                      onChange={(e) => setSong(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="rsvp-msg">Wishes for the Newlyweds (Optional):</label>
                <textarea
                  id="rsvp-msg"
                  rows={2}
                  placeholder="Subha Mangalam! Wishing you joy..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="rsvp-submit-btn primary">
                  <MessageCircle size={18} />
                  <span>Send via WhatsApp (+94)</span>
                </button>
                <button type="button" onClick={handleDirectSubmit} className="rsvp-submit-btn secondary">
                  <span>Save RSVP Confirmation</span>
                </button>
              </div>

              <div className="rsvp-adult-notice">
                🪷 We look forward to celebrating this auspicious union with you and your family.
              </div>
            </form>
          </>
        ) : (
          <div className="rsvp-success-state">
            <CheckCircle2 size={54} color="#7e1227" />
            <h3 className="success-title">
              {attending === 'yes' ? 'Subha Mangalam! 🪷' : 'Thank You for Letting Us Know'}
            </h3>
            <p className="success-desc">
              {attending === 'yes' 
                ? `Thank you, ${name}! We are overjoyed that you will be joining us to celebrate the beginning of our new life together in Colombo.`
                : `Thank you for informing us, ${name}. Your blessings are warmly cherished!`}
            </p>
            <button className="rsvp-submit-btn primary" onClick={handleReset}>
              Return to Invitation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
