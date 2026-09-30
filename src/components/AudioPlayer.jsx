import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Settings2, Upload, ChevronUp } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('piano');
  const [customTrackName, setCustomTrackName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const tracks = {
    piano: {
      name: 'Classical Wedding Piano (Canon in D)',
      sub: 'Romantic Grand Piano',
      src: '/assets/wedding_piano.wav',
    },
    flute: {
      name: 'Traditional Flute (Mangala Geetha)',
      sub: 'Auspicious Sri Lankan Raga',
      src: '/assets/sri_lankan_flute.wav',
    }
  };

  const getActiveSrc = () => {
    if (currentTrack === 'custom' && customTrackName) {
      return audioRef.current?.src || '';
    }
    return tracks[currentTrack]?.src || tracks.piano.src;
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
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
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

  const activeTitle = currentTrack === 'custom' 
    ? (customTrackName || 'Custom Upload') 
    : (tracks[currentTrack]?.name || 'Wedding Music');

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
              className={`track-option-btn ${currentTrack === 'piano' ? 'active' : ''}`}
              onClick={() => selectTrack('piano')}
            >
              <div className="track-icon">🎹</div>
              <div className="track-info">
                <span className="track-title">{tracks.piano.name}</span>
                <span className="track-sub">{tracks.piano.sub}</span>
              </div>
            </button>

            <button 
              className={`track-option-btn ${currentTrack === 'flute' ? 'active' : ''}`}
              onClick={() => selectTrack('flute')}
            >
              <div className="track-icon">🪈</div>
              <div className="track-info">
                <span className="track-title">{tracks.flute.name}</span>
                <span className="track-sub">{tracks.flute.sub}</span>
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
                <span className="track-sub">Choose any music from your device</span>
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

      {/* Main Floating Pill Button */}
      <div className="audio-pill-cluster">
        <button 
          className={`audio-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
          title={isPlaying ? "Pause wedding music" : "Play romantic wedding music"}
          aria-label="Wedding Music"
        >
          <div className="audio-icon-wrap">
            {isPlaying ? <Volume2 size={18} /> : <Music size={18} />}
          </div>
          
          <div className="audio-bars" aria-hidden="true">
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
          </div>

          <span className="audio-label">
            {isPlaying ? 'Wedding Music' : 'Play Music'}
          </span>
        </button>

        <button 
          className="audio-settings-trigger"
          onClick={() => setShowSettings(!showSettings)}
          title="Change wedding track or upload MP3"
          aria-label="Audio settings"
        >
          <Settings2 size={16} />
        </button>
      </div>
    </div>
  );
}
