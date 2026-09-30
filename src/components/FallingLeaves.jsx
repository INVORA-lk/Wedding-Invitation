import React, { useEffect, useState } from 'react';

export default function FallingLeaves() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate scattered golden lotus petals & jasmine flowers
    const generated = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95 + '%',
      animationDuration: (13 + Math.random() * 11) + 's',
      animationDelay: (Math.random() * 7) + 's',
      size: (18 + Math.random() * 18) + 'px',
      opacity: 0.4 + Math.random() * 0.45,
      rotation: Math.random() * 360 + 'deg',
      type: i % 2 === 0 ? 'lotus' : 'jasmine',
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="falling-leaves-container" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="falling-leaf"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
            transform: `rotate(${petal.rotation})`,
          }}
        >
          {petal.type === 'lotus' ? (
            /* Lotus Petal Icon */
            <svg viewBox="0 0 24 24" fill="#d4af37" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C9.5 6 7 10 7 14c0 3.3 2.2 6 5 6s5-2.7 5-6c0-4-2.5-8-5-12z" />
            </svg>
          ) : (
            /* Jasmine Blossom Icon */
            <svg viewBox="0 0 24 24" fill="#f8f1dc" stroke="#c59b27" strokeWidth="0.8" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4c.6 2 1.8 3.2 3.8 3.8-2 .6-3.2 1.8-3.8 3.8-.6-2-1.8-3.2-3.8-3.8 2-.6 3.2-1.8 3.8-3.8z" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
