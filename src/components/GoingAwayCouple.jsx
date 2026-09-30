import React, { useEffect, useState } from 'react';

export default function GoingAwayCouple({ className = '', alt = 'Kavindu & Tharushi - Walking Together' }) {
  const [cleanSrc, setCleanSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/going_away_couple.png';

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

        // BFS flood-fill from all 4 borders to remove only outer white canvas
        const visited = new Uint8Array(width * height);
        const queue = [];

        const isBg = (x, y) => {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          return r > 240 && g > 240 && b > 240;
        };

        // Top and bottom borders
        for (let x = 0; x < width; x++) {
          if (isBg(x, 0)) {
            visited[x] = 1;
            queue.push(x);
          }
          const btm = (height - 1) * width + x;
          if (isBg(x, height - 1)) {
            visited[btm] = 1;
            queue.push(btm);
          }
        }

        // Left and right borders
        for (let y = 0; y < height; y++) {
          const left = y * width;
          if (!visited[left] && isBg(0, y)) {
            visited[left] = 1;
            queue.push(left);
          }
          const right = y * width + (width - 1);
          if (!visited[right] && isBg(width - 1, y)) {
            visited[right] = 1;
            queue.push(right);
          }
        }

        let head = 0;
        while (head < queue.length) {
          const pos = queue[head++];
          const x = pos % width;
          const y = Math.floor(pos / width);

          const pIdx = pos * 4;
          data[pIdx + 3] = 0; // Transparent

          const neighbors = [
            x > 0 ? pos - 1 : -1,
            x < width - 1 ? pos + 1 : -1,
            y > 0 ? pos - width : -1,
            y < height - 1 ? pos + width : -1,
          ];

          for (let n of neighbors) {
            if (n !== -1 && !visited[n]) {
              visited[n] = 1;
              const nIdx = n * 4;
              const nr = data[nIdx];
              const ng = data[nIdx + 1];
              const nb = data[nIdx + 2];

              if (nr > 238 && ng > 238 && nb > 238) {
                queue.push(n);
              } else if (nr > 220 && ng > 220 && nb > 220) {
                const brightness = (nr + ng + nb) / 3;
                const alpha = Math.max(0, Math.min(255, (238 - brightness) * 14));
                data[nIdx + 3] = alpha;
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setCleanSrc(canvas.toDataURL('image/png'));
      } catch (err) {
        setCleanSrc('/assets/going_away_couple.png');
      }
    };

    img.onerror = () => {
      setCleanSrc('/assets/going_away_couple.png');
    };
  }, []);

  return (
    <img 
      src={cleanSrc || '/assets/going_away_couple.png'} 
      alt={alt} 
      className={`going-away-couple-img ${className}`}
    />
  );
}
