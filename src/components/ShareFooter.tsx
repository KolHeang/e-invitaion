'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Copy, Check, Download, Smartphone, X, Sparkles } from 'lucide-react';

export default function ShareFooter() {
  const [copied, setCopied] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running as installed standalone PWA
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone);
    }

    // Capture PWA install prompt on Chromium browsers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Share Function
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

  // Copy Link Function
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Install PWA Function
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA] Outcome: ${outcome}`);
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstalled(true);
      }
    } else {
      // Check if iOS or other browser without native prompt
      setShowIosModal(true);
    }
  };

  return (
    <>
      <footer className="share-footer-container">
        {/* Share, Copy Link & Install App Buttons */}
        <div className="share-buttons-flex-row">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="share-action-btn"
          >
            <Share2 className="w-4 h-4 text-[#A07422]" />
            <span>ចែករំលែកសំបុត្រ</span>
          </button>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className={`share-action-btn ${copied ? 'copied-active' : ''}`}
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-[#A07422]" />}
            <span>{copied ? 'បានចម្លង Link' : 'ចម្លងតំណភ្ជាប់'}</span>
          </button>

          {/* Install PWA Button (Hidden if already in standalone mode) */}
          {!isInstalled && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="share-action-btn"
            >
              <Download className="w-4 h-4 text-[#A07422]" />
              <span>ដំឡើង App (PWA)</span>
            </button>
          )}
        </div>

        {/* Footer Names & Details */}
        <div className="footer-credits-wrap">
          <h3 className="footer-couple-name font-moul royal-arch-main-title">
            គល់ ហាង &amp; ស៊ាប សៀកលាង
          </h3>
          <p className="footer-event-details">
            ពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍ • គល់ ហាង &amp; ស៊ាប សៀកលាង • ថ្ងៃទី២៨ ខែវិច្ឆិកា ឆ្នាំ២០២៦
          </p>
        </div>
      </footer>

      {/* iOS & Browser PWA Installation Guide Modal */}
      {showIosModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20, 12, 5, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowIosModal(false)}
        >
          <div
            style={{
              background: '#FFFDF9',
              border: '1.5px solid rgba(197, 154, 39, 0.45)',
              borderRadius: '24px',
              padding: '28px 24px 24px',
              maxWidth: '420px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
              textAlign: 'center',
              position: 'relative',
              animation: 'modalSlideUp 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowIosModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(197, 154, 39, 0.12)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#6D4C3D'
              }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #E2BC65 0%, #C49830 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 6px 18px rgba(197, 154, 39, 0.3)' }}>
              <Smartphone className="w-7 h-7 text-white" />
            </div>

            <h3 className="font-moul text-gold" style={{ fontSize: '1.2rem', marginBottom: '14px' }}>
              របៀបដំឡើងលើទូរស័ព្ទ (PWA)
            </h3>

            <div style={{ textAlign: 'left', background: '#FAF7F2', borderRadius: '14px', padding: '16px', border: '1px solid rgba(197, 154, 39, 0.25)', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.88rem', color: '#381910', marginBottom: '10px', lineHeight: 1.5 }}>
                <strong>១.</strong> ចុចលើប៊ូតុង <strong>ចែករំលែក (Share)</strong> ឬសញ្ញាចុចបី <strong>(Menu)</strong> នៃកម្មវិធីរុករក (Browser)។
              </div>
              <div style={{ fontSize: '0.88rem', color: '#381910', marginBottom: '10px', lineHeight: 1.5 }}>
                <strong>២.</strong> អូសចុះក្រោម រួចជ្រើសយក <strong>«បន្ថែមទៅអេក្រង់ដើម (Add to Home Screen)»</strong> ឬ <strong>«Install App»</strong>។
              </div>
              <div style={{ fontSize: '0.88rem', color: '#381910', lineHeight: 1.5 }}>
                <strong>៣.</strong> ចុច <strong>«បន្ថែម (Add)»</strong> ដើម្បីដំឡើងជាកម្មវិធីពេញអេក្រង់ និងប្រើប្រាស់បានគ្រប់ពេល!
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIosModal(false)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #E2BC65 0%, #C49830 50%, #A2761B 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(160, 116, 34, 0.25)'
              }}
            >
              យល់ព្រម
            </button>
          </div>
        </div>
      )}
    </>
  );
}
