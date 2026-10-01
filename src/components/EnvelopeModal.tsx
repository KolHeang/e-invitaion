'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { weddingAudio } from './AudioEngine';
import { Sparkles, Calendar } from 'lucide-react';
import { KhmerCornerSVG } from './KhmerOrnament';

interface EnvelopeModalProps {
  guestName: string;
  onOpen: () => void;
}

export default function EnvelopeModal({ guestName, onOpen }: EnvelopeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Play wedding melody
    weddingAudio.play();

    // Burst golden celebratory confetti
    try {
      confetti({
        particleCount: 160,
        spread: 120,
        origin: { y: 0.55 },
        colors: ['#FFE082', '#FFD54F', '#FFC107', '#FFFFFF', '#8B152B', '#E5A93C']
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#FFD54F', '#FFE082', '#FFF']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#FFD54F', '#FFE082', '#FFF']
        });
      }, 350);
    } catch (e) {
      console.log(e);
    }

    // Dismiss cover with golden dissolve
    setTimeout(() => {
      setIsRemoved(true);
      onOpen();
    }, 1100);
  };

  if (isRemoved) return null;

  return (
    <div className={`royal-arch-backdrop ${isOpen ? 'royal-arch-fadeout' : ''}`}>
      {/* Ambient Lighting & Bokeh for Desktop */}
      <div className="royal-arch-ambient-bg" aria-hidden="true"></div>

      {/* Floating Gentle Petals */}
      <div className="royal-floating-petals" aria-hidden="true">
        <div className="r-petal rp-1"></div>
        <div className="r-petal rp-2"></div>
        <div className="r-petal rp-3"></div>
        <div className="r-petal rp-4"></div>
      </div>

      {/* Main Royal Card Stage */}
      <div className="royal-arch-card-wrapper">
        <div
          className="royal-arch-card"
          onClick={handleOpenInvitation}
        >
          {/* Authentic Gold Kbach Corner Ornaments */}
          <KhmerCornerSVG position="top-left" />
          <KhmerCornerSVG position="top-right" />
          <KhmerCornerSVG position="bottom-left" />
          <KhmerCornerSVG position="bottom-right" />

          {/* 1. Header Section: Monogram & Title */}
          <div className="royal-arch-header">
            <div className="royal-arch-crest-monogram">
              <div className="monogram-latin-wrap">
                <span className="crest-script font-script">H</span>
                <span className="crest-amp font-script">&</span>
                <span className="crest-script font-script">S</span>
              </div>
              <div className="crest-khmer-sub font-moul">« ក & ស »</div>
            </div>

            <h1 className="royal-arch-main-title font-moul">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </h1>
          </div>

          {/* 2. Centerpiece: Royal Arch Frame with Couple Photo */}
          <div className="royal-arch-photo-container">
            <div className="royal-arch-gold-frame">
              {/* Gold Khmer Lotus Apex Accent */}
              <div className="arch-apex-lotus">
                <svg width="28" height="18" viewBox="0 0 50 32" fill="none">
                  <path d="M25 2 C23 9 17 16 11 19 C18 19 22 23 25 30 C28 23 32 19 39 19 C33 16 27 9 25 2 Z" fill="#DFB750" />
                  <circle cx="25" cy="19" r="2.5" fill="#FFE082" />
                </svg>
              </div>

              {/* Couple Pre-Wedding Portrait */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/couple-hero.jpg"
                alt="គល់ ហាង & ស៊ាប សៀកលាង"
                className="royal-arch-couple-img"
              />
              <div className="royal-arch-photo-sheen"></div>
            </div>

            {/* 3. Couple Names & Wedding Date */}
            <div className="royal-arch-couple-names font-moul">
              គល់ ហាង & ស៊ាប សៀកលាង
            </div>

            {/* Wedding Date Badge */}
            <div className="royal-arch-date-badge">
              <Calendar className="w-3.5 h-3.5 text-[#C59A27] inline-block mr-1.5" />
              <span>ថ្ងៃសៅរ៍ ទី២៨ ខែវិច្ឆិកា ឆ្នាំ២០២៧</span>
            </div>
          </div>

          {/* 3. Guest Invitation Section */}
          <div className="royal-arch-guest-section">
            <p className="royal-arch-invite-label font-moul">
              សូមគោរពអញ្ជើញ
            </p>

            <div className="royal-arch-guest-box">
              <h2 className="royal-arch-guest-name font-moul">
                {guestName || 'ឯកឧត្តម លោកជំទាវ លោក លោកស្រី'}
              </h2>
            </div>

            {/* Gold Filigree Divider */}
            <div className="royal-arch-divider">
              <span className="rad-line"></span>
              <span className="rad-gem">❖</span>
              <span className="rad-line"></span>
            </div>
          </div>

          {/* 4. Bottom Call-To-Action Button */}
          <div className="royal-arch-btn-wrapper">
            <button
              type="button"
              className="royal-arch-open-btn font-moul"
              onClick={handleOpenInvitation}
            >
              <Sparkles className="w-4 h-4 text-[#FFF2B2] animate-pulse mr-1" />
              <span>សូមចុចដើម្បីបើកសំបុត្រ</span>
              <Sparkles className="w-4 h-4 text-[#FFF2B2] animate-pulse ml-1" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
