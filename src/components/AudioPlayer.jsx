import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Settings2, Upload, ChevronUp } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('canon');
  const [customTrackName, setCustomTrackName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const touchTimerRef = useRef(null);

  const tracks = {
    canon: {
      name: 'Pachelbel — Canon in D',
      sub: 'Romantic Orchestral Masterpiece',
      src: '/assets/wedding_piano.mp3',
    },
    air: {
      name: 'Bach — Air on the G String',
      sub: 'Warm Royal Strings & Harmony',
      src: '/assets/bach_air.mp3',
    },
    march: {
      name: 'Mendelssohn — Wedding March',
      sub: 'Auspicious Grand Celebration',
      src: '/assets/wedding_march.mp3',
    }
  };

  const getActiveSrc = () => {
    if (currentTrack === 'custom' && customTrackName) {
      return audioRef.current?.src || '';
    }
    return tracks[currentTrack]?.src || tracks.canon.src;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Audio autoplay prevented or error:', err);
      });
    }
  };

  const selectTrack = (trackKey) => {
    setCurrentTrack(trackKey);
    setShowSettings(false);
    if (audioRef.current) {
      audioRef.current.src = tracks[trackKey].src;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomTrackName(file.name.replace(/\.[^/.]+$/, ''));
      setCurrentTrack('custom');
      setShowSettings(false);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    }
  };

  const handleTouchStart = () => {
    touchTimerRef.current = setTimeout(() => {
      setShowSettings(true);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="audio-player-widget">
      <audio 
        ref={audioRef} 
        src={getActiveSrc()} 
        loop 
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Track Selector Popup Menu */}
      {showSettings && (
        <div className="audio-menu-popover">
          <div className="audio-menu-header">
            <span>SELECT WEDDING MUSIC</span>
            <button 
              className="audio-menu-close" 
              onClick={() => setShowSettings(false)}
              aria-label="Close music menu"
            >
              ✕
            </button>
          </div>

          <div className="audio-track-options">
            <button 
              className={`track-option-btn ${currentTrack === 'canon' ? 'active' : ''}`}
              onClick={() => selectTrack('canon')}
            >
              <div className="track-icon">🎻</div>
              <div className="track-info">
                <span className="track-title">{tracks.canon.name}</span>
                <span className="track-sub">{tracks.canon.sub}</span>
              </div>
            </button>

            <button 
              className={`track-option-btn ${currentTrack === 'air' ? 'active' : ''}`}
              onClick={() => selectTrack('air')}
            >
              <div className="track-icon">🎼</div>
              <div className="track-info">
                <span className="track-title">{tracks.air.name}</span>
                <span className="track-sub">{tracks.air.sub}</span>
              </div>
            </button>

            <button 
              className={`track-option-btn ${currentTrack === 'march' ? 'active' : ''}`}
              onClick={() => selectTrack('march')}
            >
              <div className="track-icon">👑</div>
              <div className="track-info">
                <span className="track-title">{tracks.march.name}</span>
                <span className="track-sub">{tracks.march.sub}</span>
              </div>
            </button>

            <button 
              className={`track-option-btn upload ${currentTrack === 'custom' ? 'active' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="track-icon">
                <Upload size={16} />
              </div>
              <div className="track-info">
                <span className="track-title">
                  {customTrackName ? `Custom: ${customTrackName}` : 'Upload Your Favorite Song (MP3)'}
                </span>
                <span className="track-sub">Choose any music file from your device</span>
              </div>
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="audio/*" 
              onChange={handleCustomUpload} 
              style={{ display: 'none' }} 
            />
          </div>

          <div className="audio-volume-slider-wrap">
            <span className="vol-label">Volume:</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={volume} 
              onChange={handleVolumeChange}
              className="vol-slider"
            />
          </div>
        </div>
      )}

      {/* Floating Single Corner Icon Button */}
      <button 
        className={`audio-corner-btn ${isPlaying ? 'playing' : 'paused'}`}
        onClick={togglePlay}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowSettings(!showSettings);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        title={isPlaying ? "Pause Wedding Music (Right-click or press & hold for options)" : "Play Wedding Music (Right-click or press & hold for options)"}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
      >
        {isPlaying && <span className="audio-pulse-ring" aria-hidden="true" />}
        <div className="audio-corner-icon">
          {isPlaying ? (
            <Music size={22} className="music-svg-active" />
          ) : (
            <div className="music-paused-container">
              <Music size={22} className="music-svg-muted" />
              <span className="music-slash-strike" aria-hidden="true" />
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
