'use client';

import React, { useEffect, useState } from 'react';

export default function AmbientPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; char: string; left: string; dur: string; delay: string; size: string; opacity: number }>>([]);

  useEffect(() => {
    const chars = ['🌸', '✨', '🍂', '💖', '⭐'];
    const items = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      left: `${Math.random() * 100}%`,
      dur: `${6 + Math.random() * 8}s`,
      delay: `${Math.random() * 5}s`,
      size: `${12 + Math.random() * 14}px`,
      opacity: 0.3 + Math.random() * 0.5
    }));
    setPetals(items);
  }, []);

  return (
    <div id="ambient-petals-layer" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="floating-petal"
          style={{
            left: p.left,
            animationDuration: p.dur,
            animationDelay: p.delay,
            fontSize: p.size,
            opacity: p.opacity
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
}
