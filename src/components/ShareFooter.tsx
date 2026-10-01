'use client';

import React, { useState } from 'react';

export default function ShareFooter() {
  const [copied, setCopied] = useState(false);

  // អនុគមន៍ Share
  const handleShare = async () => {
    const shareData = {
      title: 'ពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍ គល់ ហាង & ស៊ាប សៀកលាង',
      text: 'សូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled or error:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  // អនុគមន៍ Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="share-footer-container">
      {/* 1. Share & Copy Link Buttons Row */}
      <div className="share-buttons-flex-row">
        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="share-action-btn"
        >
          {/* Share Icon */}
          <svg className="share-icon-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>ចែករំលែកសំបុត្រអញ្ជើញ</span>
        </button>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className={`share-action-btn ${copied ? 'copied-active' : ''}`}
        >
          {/* Copy Icon */}
          <svg className="share-icon-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{copied ? '✓ បានចម្លង Link រួចរាល់' : 'ចម្លងតំណភ្ជាប់ (Link)'}</span>
        </button>
      </div>

      {/* 2. Footer Names & Details */}
      <div className="footer-credits-wrap">
        <h3 className="footer-couple-name font-moul royal-arch-main-title">
          គល់ ហាង &amp; ស៊ាប សៀកលាង
        </h3>
        <p className="footer-event-details">
          ពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍ • គល់ ហាង &amp; ស៊ាប សៀកលាង • ថ្ងៃទី២៨ ខែវិច្ឆិកា ឆ្នាំ២០២៧
        </p>
      </div>
    </footer>
  );
}
