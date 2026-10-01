'use client';

import React, { useEffect, useState } from 'react';
import { Smartphone, Download, X, Share, PlusSquare, Sparkles } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already in standalone / installed PWA mode
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(standalone);

    if (standalone) {
      return; // Do not show if already running inside installed app
    }

    // Check if dismissed in this session
    const hasDismissed = sessionStorage.getItem('pwa_prompt_dismissed');
    if (hasDismissed === 'true') {
      return;
    }

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIos(iosDevice);

    // Listen for beforeinstallprompt (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Auto-show prompt 1.5 seconds after page loads
      setTimeout(() => {
        setShowPrompt(true);
      }, 1500);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // On iOS Safari (not standalone), auto-show prompt after 2 seconds
    if (iosDevice && !standalone) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA] Install outcome: ${outcome}`);
      setDeferredPrompt(null);
      setShowPrompt(false);
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      // Fallback
      alert('សូមចុចសញ្ញាម៉ឺនុយ (...) ឬ (Share) លើ Browser របស់អ្នក រួចជ្រើសយក "Install App" ឬ "Add to Home Screen"');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (isStandalone || (!showPrompt && !showIosGuide)) {
    return null;
  }

  return (
    <>
      {/* Auto Floating Bottom Sheet / Banner */}
      {showPrompt && !showIosGuide && (
        <aside
          aria-label="ដំឡើងកម្មវិធីសំបុត្រអាពាហ៍ពិពាហ៍"
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '460px',
            zIndex: 9999,
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 12px 36px rgba(184, 134, 11, 0.22), 0 4px 16px rgba(0, 0, 0, 0.08)',
            border: '1.5px solid rgba(212, 175, 55, 0.45)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'pwaSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* App Icon */}
          <div
            style={{
              position: 'relative',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 3px 8px rgba(197, 154, 39, 0.25)',
              border: '1.5px solid #C59A27',
              backgroundColor: '#FAF7F2',
            }}
          >
            <img
              src="/assets/images/icon-512.jpg"
              alt="App Icon"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                backgroundColor: '#C59A27',
                borderRadius: '50%',
                padding: '2px',
                display: 'flex',
              }}
            >
              <Sparkles style={{ width: '10px', height: '10px', color: '#FFFFFF' }} />
            </div>
          </div>

          {/* Text Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '13.5px',
                fontWeight: 700,
                color: '#2D2926',
                fontFamily: 'var(--font-khmer-title, "Kantumruy Pro", sans-serif)',
                lineHeight: 1.3,
                marginBottom: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              ដំឡើងសំបុត្រអញ្ជើញជា App
            </div>
            <div
              style={{
                fontSize: '11px',
                color: '#7D7565',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {isIos ? 'បន្ថែមទៅអេក្រង់ដើមលើ iPhone' : 'ដំឡើងលើទូរស័ព្ទដើម្បីងាយស្រួលបើក'}
            </div>
          </div>

          {/* Install Button */}
          <button
            onClick={handleInstallClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#C59A27',
              backgroundImage: 'linear-gradient(135deg, #DFB743 0%, #B3861B 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 3px 10px rgba(184, 134, 11, 0.35)',
            }}
          >
            <Download style={{ width: '13px', height: '13px' }} />
            <span>ដំឡើង</span>
          </button>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            aria-label="បិទ"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#9CA3AF',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              flexShrink: 0,
            }}
          >
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </aside>
      )}

      {/* iOS Step-by-Step Installation Modal */}
      {showIosGuide && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowIosGuide(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.25s ease-out forwards',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FAF7F2',
              borderRadius: '24px',
              maxWidth: '380px',
              width: '100%',
              padding: '24px 20px',
              textAlign: 'center',
              border: '1.5px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
              position: 'relative',
            }}
          >
            {/* Close Cross */}
            <button
              onClick={() => setShowIosGuide(false)}
              aria-label="បិទ"
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                backgroundColor: '#EDE8DF',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#6B7280',
              }}
            >
              <X style={{ width: '16px', height: '16px' }} />
            </button>

            {/* Icon */}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(197, 154, 39, 0.12)',
                border: '1.5px solid #C59A27',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <Smartphone style={{ width: '28px', height: '28px', color: '#B3861B' }} />
            </div>

            <h3
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#2D2926',
                fontFamily: 'var(--font-khmer-title, "Kantumruy Pro", sans-serif)',
                marginBottom: '6px',
              }}
            >
              ដំឡើងលើ iPhone / iPad
            </h3>

            <p style={{ fontSize: '12px', color: '#7D7565', marginBottom: '16px' }}>
              សូមអនុវត្តតាម ៣ ជំហានងាយៗខាងក្រោមដើម្បីដាក់លើអេក្រង់ដើម៖
            </p>

            {/* Step list */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                textAlign: 'left',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#FFFFFF',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(197, 154, 39, 0.15)',
                    padding: '6px',
                    borderRadius: '8px',
                    color: '#B3861B',
                  }}
                >
                  <Share style={{ width: '16px', height: '16px' }} />
                </div>
                <div style={{ fontSize: '12px', color: '#2D2926', lineHeight: 1.4 }}>
                  <strong>ជំហាន ១:</strong> ចុចប៊ូតុង <strong>Share</strong> (សញ្ញាព្រួញឡើងលើ) នៅ Safari
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#FFFFFF',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(197, 154, 39, 0.15)',
                    padding: '6px',
                    borderRadius: '8px',
                    color: '#B3861B',
                  }}
                >
                  <PlusSquare style={{ width: '16px', height: '16px' }} />
                </div>
                <div style={{ fontSize: '12px', color: '#2D2926', lineHeight: 1.4 }}>
                  <strong>ជំហាន ២:</strong> អូសចុះក្រោម រួចជ្រើសរើស <strong>«Add to Home Screen»</strong>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#FFFFFF',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(197, 154, 39, 0.15)',
                    padding: '6px',
                    borderRadius: '8px',
                    color: '#B3861B',
                  }}
                >
                  <Download style={{ width: '16px', height: '16px' }} />
                </div>
                <div style={{ fontSize: '12px', color: '#2D2926', lineHeight: 1.4 }}>
                  <strong>ជំហាន ៣:</strong> ចុច <strong>«Add»</strong> នៅជ្រុងខាងលើស្តាំជាការស្រេច!
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '9999px',
                backgroundColor: '#C59A27',
                backgroundImage: 'linear-gradient(135deg, #DFB743 0%, #B3861B 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(184, 134, 11, 0.3)',
              }}
            >
              យល់ព្រម
            </button>
          </div>
        </div>
      )}

      {/* Slide Up Keyframe Styles */}
      <style jsx global>{`
        @keyframes pwaSlideUp {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
