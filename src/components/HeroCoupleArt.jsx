import React, { useEffect, useState } from 'react';

export default function HeroCoupleArt({ className = '', alt = 'Kavindu & Tharushi' }) {
  const [cleanSrc, setCleanSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/kandyan_couple_art.png';

    img.onload = () => {
      try {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Flood fill from all 4 borders to remove ONLY external background
        // and preserve the bride's white wedding saree!
        const visited = new Uint8Array(width * height);
        const queue = [];

        // Helper to check if pixel is near-white background
        const isBgPixel = (x, y) => {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          return r > 235 && g > 235 && b > 235;
        };

        // Initialize queue with all 4 outer borders
        for (let x = 0; x < width; x++) {
          if (isBgPixel(x, 0)) {
            visited[x] = 1;
            queue.push(x);
          }
          const btm = (height - 1) * width + x;
          if (isBgPixel(x, height - 1)) {
            visited[btm] = 1;
            queue.push(btm);
          }
        }

        for (let y = 0; y < height; y++) {
          const left = y * width;
          if (!visited[left] && isBgPixel(0, y)) {
            visited[left] = 1;
            queue.push(left);
          }
          const right = y * width + (width - 1);
          if (!visited[right] && isBgPixel(width - 1, y)) {
            visited[right] = 1;
            queue.push(right);
          }
        }

        // BFS flood fill
        let head = 0;
        while (head < queue.length) {
          const pos = queue[head++];
          const x = pos % width;
          const y = Math.floor(pos / width);

          // Make background pixel completely transparent
          const pIdx = pos * 4;
          data[pIdx + 3] = 0;

          // Check 4 adjacent neighbors
          const neighbors = [
            x > 0 ? pos - 1 : -1,
            x < width - 1 ? pos + 1 : -1,
            y > 0 ? pos - width : -1,
            y < height - 1 ? pos + width : -1,
          ];

          for (let n of neighbors) {
            if (n !== -1 && !visited[n]) {
              visited[n] = 1;
              const nx = n % width;
              const ny = Math.floor(n / width);
              const nIdx = n * 4;
              const nr = data[nIdx];
              const ng = data[nIdx + 1];
              const nb = data[nIdx + 2];

              if (nr > 232 && ng > 232 && nb > 232) {
                queue.push(n);
              } else if (nr > 215 && ng > 215 && nb > 215) {
                // Anti-aliased feather on contour edge
                const brightness = (nr + ng + nb) / 3;
                const alpha = Math.max(0, Math.min(255, (235 - brightness) * 12));
                data[nIdx + 3] = alpha;
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setCleanSrc(canvas.toDataURL('image/png'));
      } catch (e) {
        setCleanSrc('/assets/kandyan_couple_art.png');
      }
    };

    img.onerror = () => {
      setCleanSrc('/assets/kandyan_couple_art.png');
    };
  }, []);

  return (
    <img 
      src={cleanSrc || '/assets/kandyan_couple_art.png'} 
      alt={alt} 
      className={`hero-couple-img illustration ${className}`}
      style={{
        background: 'transparent',
        filter: 'drop-shadow(0 14px 28px rgba(50, 30, 10, 0.16))'
      }}
    />
  );
}
