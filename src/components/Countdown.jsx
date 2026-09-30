import React, { useState, useEffect } from 'react';
import { Calendar, Download } from 'lucide-react';

export default function Countdown({ weddingDate = '2026-11-26T09:48:00' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(weddingDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      let diff = target - now;

      if (diff < 0) {
        diff = Math.abs(diff);
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent("Wedding of Kavindu & Tharushi — Poruwa & Reception");
    const details = encodeURIComponent("Traditional Poruwa Ceremony (09:48 AM Auspicious Time) and Grand Evening Reception at Cinnamon Grand Colombo.");
    const location = encodeURIComponent("The Grand Ballroom, Cinnamon Grand Colombo, Sri Lanka");
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261126T040000Z/20261126T180000Z`;
    window.open(gCalUrl, '_blank');
  };

  const handleDownloadIcs = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kavindu & Tharushi//Sri Lankan Wedding Invitation//EN
BEGIN:VEVENT
UID:wedding-kavindu-tharushi-2026@invitation
DTSTAMP:20261126T040000Z
DTSTART:20261126T040000Z
DTEND:20261126T180000Z
SUMMARY:Wedding of Kavindu & Tharushi
DESCRIPTION:Traditional Sri Lankan Poruwa Ceremony & Grand Evening Reception at Cinnamon Grand Colombo.
LOCATION:Cinnamon Grand Colombo, 77 Galle Rd, Colombo 00300, Sri Lanka
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Wedding_Kavindu_and_Tharushi.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="countdown-section">
      <div className="countdown-header">
        <span className="countdown-title">COUNTDOWN TO AUSPICIOUS MOMENT</span>
        <span className="countdown-sinhala-sub">සුබ නැකතට තව</span>
      </div>

      <div className="countdown-grid">
        <div className="countdown-box">
          <span className="countdown-num">{timeLeft.days}</span>
          <span className="countdown-label">DAYS</span>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-box">
          <span className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">HOURS</span>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-box">
          <span className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">MINS</span>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-box">
          <span className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">SECS</span>
        </div>
      </div>

      <div className="calendar-actions">
        <button className="calendar-btn" onClick={handleGoogleCalendar} title="Add event to Google Calendar">
          <Calendar size={13} />
          <span>Google Calendar</span>
        </button>
        <button className="calendar-btn outline" onClick={handleDownloadIcs} title="Download Apple / Outlook (.ics) event">
          <Download size={13} />
          <span>Apple / Outlook</span>
        </button>
      </div>
    </div>
  );
}
