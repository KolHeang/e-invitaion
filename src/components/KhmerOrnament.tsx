'use client';

import React from 'react';

/**
 * High-End Vector Khmer Lotus Floral Kbach Divider
 * 100% Transparent SVG with rich metallic gold gradient
 */
export function KhmerLotusDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`khmer-vector-divider-wrapper ${className}`}>
      <svg
        viewBox="0 0 400 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="khmer-vector-divider-svg"
      >
        <defs>
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="35%" stopColor="#E6CA65" />
            <stop offset="70%" stopColor="#C49326" />
            <stop offset="100%" stopColor="#FEF0B8" />
          </linearGradient>
          <linearGradient id="goldGradGlow" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#C49326" stopOpacity="0" />
            <stop offset="25%" stopColor="#E6CA65" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFF3B0" stopOpacity="1" />
            <stop offset="75%" stopColor="#E6CA65" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C49326" stopOpacity="0" />
          </linearGradient>
          <filter id="goldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central Lotus Bud Motif */}
        <g filter="url(#goldGlowFilter)">
          {/* Center Lotus Core */}
          <path
            d="M 200 8 C 196 16 193 25 200 38 C 207 25 204 16 200 8 Z"
            fill="url(#goldGrad1)"
          />
          {/* Left Petal */}
          <path
            d="M 197 18 C 188 20 182 28 186 36 C 192 37 197 32 198 25 Z"
            fill="url(#goldGrad1)"
          />
          {/* Right Petal */}
          <path
            d="M 203 18 C 212 20 218 28 214 36 C 208 37 203 32 202 25 Z"
            fill="url(#goldGrad1)"
          />
          {/* Outer Left Leaf Wave */}
          <path
            d="M 183 28 C 172 28 165 34 168 40 C 176 41 182 36 185 32 Z"
            fill="url(#goldGrad1)"
          />
          {/* Outer Right Leaf Wave */}
          <path
            d="M 217 28 C 228 28 235 34 232 40 C 224 41 218 36 215 32 Z"
            fill="url(#goldGrad1)"
          />

          {/* Central Gem Diamond */}
          <polygon
            points="200,22 203,26 200,30 197,26"
            fill="#FFFFFF"
          />
        </g>

        {/* Left Filigree Scroll Line */}
        <path
          d="M 160 30 C 145 28 135 34 120 30 C 105 26 95 31 75 30 C 50 30 20 30 10 30"
          stroke="url(#goldGradGlow)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Left End Scroll Curl */}
        <circle cx="20" cy="30" r="3.5" fill="url(#goldGrad1)" />
        <circle cx="50" cy="30" r="2" fill="url(#goldGrad1)" />
        <circle cx="95" cy="30" r="2.5" fill="url(#goldGrad1)" />

        {/* Right Filigree Scroll Line */}
        <path
          d="M 240 30 C 255 28 265 34 280 30 C 295 26 305 31 325 30 C 350 30 380 30 390 30"
          stroke="url(#goldGradGlow)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Right End Scroll Curl */}
        <circle cx="380" cy="30" r="3.5" fill="url(#goldGrad1)" />
        <circle cx="350" cy="30" r="2" fill="url(#goldGrad1)" />
        <circle cx="305" cy="30" r="2.5" fill="url(#goldGrad1)" />
      </svg>
    </div>
  );
}

/**
 * Traditional Khmer Kbach Corner Filigree
 */
export function KhmerCornerSVG({ position = 'top-left' }: { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const transformMap = {
    'top-left': 'rotate(0)',
    'top-right': 'rotate(90deg)',
    'bottom-right': 'rotate(180deg)',
    'bottom-left': 'rotate(270deg)',
  };

  return (
    <div
      className={`khmer-corner-svg-wrap ${position}`}
      style={{ transform: transformMap[position] }}
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="cornerGold" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="50%" stopColor="#E6CA65" />
            <stop offset="100%" stopColor="#C49326" />
          </linearGradient>
        </defs>
        <path
          d="M 6 54 L 6 12 C 6 8.7 8.7 6 12 6 L 54 6"
          stroke="url(#cornerGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 14 46 L 14 18 C 14 15.8 15.8 14 18 14 L 46 14"
          stroke="url(#cornerGold)"
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />
        {/* Traditional Khmer Leaf Curve */}
        <path
          d="M 12 12 C 22 14 26 24 24 34 C 20 28 16 26 12 24 Z"
          fill="url(#cornerGold)"
        />
        <path
          d="M 12 12 C 14 22 24 26 34 24 C 28 20 26 16 24 12 Z"
          fill="url(#cornerGold)"
        />
        <circle cx="10" cy="10" r="3" fill="#FFF3B0" />
      </svg>
    </div>
  );
}

/**
 * Royal Gold Wedding Heart Emblem with Monogram « គ & ស »
 * 100% Vector Transparent SVG
 */
export function KhmerRoyalEmblem({ className = '' }: { className?: string }) {
  return (
    <div className={`khmer-royal-emblem-container ${className}`}>
      <div className="emblem-heart-outer-glow">
        <svg
          viewBox="0 0 260 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="emblem-svg"
        >
          <defs>
            <linearGradient id="emblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF5C2" />
              <stop offset="30%" stopColor="#F5D77F" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>
            <radialGradient id="emblemInnerGlow" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#F5D77F" stopOpacity="0.25" />
              <stop offset="80%" stopColor="#24050D" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#140207" stopOpacity="0.95" />
            </radialGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Heart Inner Background Glass */}
          <path
            d="M 130 195 C 65 145 25 105 25 62 C 25 28 52 10 88 10 C 110 10 124 22 130 32 C 136 22 150 10 172 10 C 208 10 235 28 235 62 C 235 105 195 145 130 195 Z"
            fill="url(#emblemInnerGlow)"
            stroke="url(#emblemGold)"
            strokeWidth="3.5"
            filter="url(#glowEffect)"
          />

          {/* Inner Decorative Heart Line */}
          <path
            d="M 130 180 C 75 136 40 100 40 64 C 40 38 60 24 88 24 C 107 24 120 34 130 46 C 140 34 153 24 172 24 C 200 24 220 38 220 64 C 220 100 185 136 130 180 Z"
            stroke="url(#emblemGold)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.85"
          />

          {/* Traditional Kbach Leaf Crown on Top */}
          <path
            d="M 130 4 C 127 12 124 18 130 25 C 136 18 133 12 130 4 Z"
            fill="url(#emblemGold)"
          />
          <circle cx="130" cy="4" r="2.5" fill="#FFFFFF" />

          {/* Bottom Lotus Teardrop */}
          <circle cx="130" cy="205" r="4" fill="url(#emblemGold)" />
          <circle cx="130" cy="214" r="2.5" fill="url(#emblemGold)" />
        </svg>

        {/* Khmer Typography Overlay inside Heart */}
        <div className="emblem-text-content">
          <div className="emblem-ceremony-title font-moul">សិរីសួស្តី</div>
          <div className="emblem-ceremony-subtitle font-moul">អាពាហ៍ពិពាហ៍</div>
          <div className="emblem-monogram font-moul">« គ & ស »</div>
        </div>
      </div>
    </div>
  );
}
