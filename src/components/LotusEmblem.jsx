import React, { useEffect, useState } from 'react';

export default function LotusEmblem({ className = '', alt = 'Sri Lankan Lotus Motif' }) {
  const [processedSrc, setProcessedSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/lotus_motif.jpg';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.naturalWidth, img.naturalHeight);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Draw image centered
        ctx.drawImage(img, 0, 0, size, size);
        const imgData = ctx.getImageData(0, 0, size, size);
        const d = imgData.data;

        const centerX = size / 2;
        const centerY = size / 2;
        const maxRadius = size * 0.485; // circular boundary

        for (let i = 0; i < d.length; i += 4) {
          const pixelIndex = i / 4;
          const x = pixelIndex % size;
          const y = Math.floor(pixelIndex / size);
          
          // Distance from center
          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

          // If outside circular emblem boundary, make 100% transparent
          if (dist > maxRadius) {
            d[i + 3] = 0;
            continue;
          }

          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          // Threshold for paper white background
          // In the gold drawing: gold has lower blue channel than red/green
          // White paper has r > 235, g > 235, b > 235
          const minChannel = Math.min(r, g, b);
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

          if (minChannel > 230) {
            // Pure white background -> fully transparent
            d[i + 3] = 0;
          } else if (brightness > 200) {
            // Feathered anti-aliased edge for ultra smooth gold contours
            const alpha = Math.max(0, Math.min(255, (235 - brightness) * 7.5));
            d[i + 3] = alpha;
          }
          // Inside gold lines, preserve original rich gold color
        }

        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL('image/png'));
      } catch (err) {
        // Fallback to original if canvas processing fails
        setProcessedSrc('/assets/lotus_motif.jpg');
      }
    };

    img.onerror = () => {
      setProcessedSrc('/assets/lotus_motif.jpg');
    };
  }, []);

  return (
    <div className={`lotus-emblem-container ${className}`}>
      {processedSrc ? (
        <img 
          src={processedSrc} 
          alt={alt} 
          className="lotus-transparent-img"
        />
      ) : (
        /* Instant SVG fallback while image processes */
        <svg viewBox="0 0 100 100" className="lotus-svg-fallback" fill="none">
          <circle cx="50" cy="50" r="46" stroke="#cba135" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M50 20 C42 35 38 48 38 60 C38 72 50 80 50 80 C50 80 62 72 62 60 C62 48 58 35 50 20 Z" fill="#cba135" opacity="0.9" />
          <path d="M50 40 C35 48 24 55 26 68 C28 78 42 78 50 80 C58 78 72 78 74 68 C76 55 65 48 50 40 Z" fill="#e5be58" opacity="0.75" />
        </svg>
      )}
    </div>
  );
}
