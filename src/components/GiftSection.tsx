'use client';

import React, { useState } from 'react';
import { Copy, Check, QrCode } from 'lucide-react';
import { KhmerLotusDivider, KhmerCornerSVG } from './KhmerOrnament';

export default function GiftSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAba = () => {
    navigator.clipboard.writeText('001888999').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="gift" className="gift-section">
      <div className="gift-box glass-panel">
        <KhmerCornerSVG position="top-left" />
        <KhmerCornerSVG position="top-right" />
        <KhmerCornerSVG position="bottom-left" />
        <KhmerCornerSVG position="bottom-right" />

        <p className="section-subtitle">អំណោយមង្គលការ</p>
        <h3 className="section-title font-moul text-gold">ចងដៃអាពាហ៍ពិពាហ៍</h3>

        <KhmerLotusDivider className="my-2" />
        
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នកគឺជាកិត្តិយសដ៏ធំធេងសម្រាប់យើងខ្ញុំ។ ប្រសិនបើលោកអ្នកមានបំណងចងដៃតាមប្រព័ន្ធឌីជីថល (ABA Bank)៖
        </p>

        {/* Realistic High-End ABA KHQR Card */}
        <div className="aba-khqr-luxury-card">
          {/* Header with ABA branding */}
          <div className="aba-card-top-bar">
            <div className="aba-logo-badge">
              <span className="aba-brand-text">ABA</span>
              <span className="aba-pay-text">'PAY</span>
            </div>
            <div className="khqr-badge">KHQR</div>
          </div>

          <div className="aba-card-body">
            <div className="aba-receiver-name font-moul">
              គល់ ហាង & ស៊ាប សៀកលាង
            </div>
            <div className="aba-receiver-en">
              KOL HANG & SEAB SIEKLEANG
            </div>

            {/* Clean Vector QR Code representation */}
            <div className="aba-qr-code-box">
              <svg
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Background */}
                <rect width="160" height="160" fill="white" />
                
                {/* 3 Corner Detection Patterns */}
                {/* Top-Left */}
                <rect x="12" y="12" width="40" height="40" rx="6" fill="#004F71" />
                <rect x="18" y="18" width="28" height="28" rx="3" fill="white" />
                <rect x="24" y="24" width="16" height="16" rx="2" fill="#004F71" />

                {/* Top-Right */}
                <rect x="108" y="12" width="40" height="40" rx="6" fill="#004F71" />
                <rect x="114" y="18" width="28" height="28" rx="3" fill="white" />
                <rect x="120" y="24" width="16" height="16" rx="2" fill="#004F71" />

                {/* Bottom-Left */}
                <rect x="12" y="108" width="40" height="40" rx="6" fill="#004F71" />
                <rect x="18" y="114" width="28" height="28" rx="3" fill="white" />
                <rect x="24" y="120" width="16" height="16" rx="2" fill="#004F71" />

                {/* Decorative QR Data Grid Blocks */}
                <rect x="60" y="14" width="8" height="8" fill="#1A202C" />
                <rect x="74" y="14" width="8" height="8" fill="#1A202C" />
                <rect x="88" y="14" width="8" height="8" fill="#1A202C" />
                <rect x="60" y="28" width="8" height="8" fill="#1A202C" />
                <rect x="74" y="36" width="14" height="8" fill="#1A202C" />
                <rect x="18" y="60" width="8" height="8" fill="#1A202C" />
                <rect x="32" y="68" width="14" height="8" fill="#1A202C" />
                <rect x="18" y="82" width="8" height="14" fill="#1A202C" />
                <rect x="60" y="60" width="10" height="10" fill="#004F71" />
                <rect x="90" y="60" width="8" height="14" fill="#1A202C" />
                <rect x="108" y="60" width="14" height="8" fill="#1A202C" />
                <rect x="130" y="68" width="14" height="8" fill="#1A202C" />
                <rect x="108" y="82" width="8" height="14" fill="#1A202C" />
                <rect x="130" y="82" width="14" height="8" fill="#1A202C" />
                <rect x="60" y="90" width="14" height="8" fill="#1A202C" />
                <rect x="80" y="88" width="8" height="14" fill="#1A202C" />
                <rect x="60" y="108" width="8" height="14" fill="#1A202C" />
                <rect x="74" y="114" width="14" height="8" fill="#1A202C" />
                <rect x="60" y="130" width="14" height="8" fill="#1A202C" />
                <rect x="80" y="126" width="8" height="14" fill="#1A202C" />
                <rect x="96" y="108" width="14" height="8" fill="#1A202C" />
                <rect x="116" y="108" width="8" height="14" fill="#1A202C" />
                <rect x="130" y="120" width="14" height="8" fill="#1A202C" />
                <rect x="108" y="130" width="8" height="14" fill="#1A202C" />
                <rect x="124" y="136" width="14" height="8" fill="#1A202C" />

                {/* Center ABA Logo Heart */}
                <circle cx="80" cy="80" r="16" fill="#004F71" />
                <circle cx="80" cy="80" r="14" fill="#00BAC6" />
                <path
                  d="M80 87 C74 81 70 77 70 73 C70 69 73 67 76 67 C78 67 80 69 80 70 C80 69 82 67 84 67 C87 67 90 69 90 73 C90 77 86 81 80 87 Z"
                  fill="white"
                />
              </svg>
            </div>

            <p className="aba-scan-hint font-moul">
              ស្កេនដើម្បីចងដៃតាម QR Code
            </p>
          </div>
        </div>

        {/* Account Info Pill */}
        <div className="aba-info-pill">
          <div className="aba-name">គល់ ហាង & ស៊ាប សៀកលាង</div>
          <div className="aba-number">០០១ ៨៨៨ ៩៩៩ (ដុល្លារ / រៀល)</div>
        </div>

        <button onClick={handleCopyAba} className="btn-luxury-outline">
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500 mr-2" />
              <span>បានចម្លងលេខកុងជោគជ័យ!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              <span>ចម្លងលេខកុងធនាគារ (001 888 999)</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
