'use client';

import React, { useEffect, useState } from 'react';
import { Smartphone, X, Download } from 'lucide-react';

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);

  useEffect(() => {
    // Service worker registration
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('[PWA] SW registered in Next.js:', reg.scope))
        .catch((err) => console.warn('[PWA] SW registration failed:', err));
    }

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // iOS Detection
    const isIos = () => {
      const ua = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(ua);
    };
    const isStandalone = () => (window.navigator as any).standalone;

    if (isIos() && !isStandalone()) {
      setShowBanner(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA] Outcome: ${outcome}`);
      setDeferredPrompt(null);
      setShowBanner(false);
    } else {
      setShowIosModal(true);
    }
  };

  return (
    <>
      {showBanner && (
        <div id="pwa-install-banner" className="pwa-banner">
          <div className="pwa-banner-text flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#fce38a]" />
            <span>ដំឡើងសំបុត្រអញ្ជើញលើទូរស័ព្ទ</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="pwa-install-small-btn flex items-center gap-1" onClick={handleInstallClick}>
              <Download className="w-3.5 h-3.5 inline-block" />
              <span>ដំឡើង</span>
            </button>
            <button className="pwa-close-btn" onClick={() => setShowBanner(false)} aria-label="បិទ">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Modal */}
      {showIosModal && (
        <div className="ios-guide-modal active" onClick={() => setShowIosModal(false)}>
          <div className="ios-guide-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '2rem', color: 'var(--gold-primary)', marginBottom: '8px' }}>
              <Smartphone className="w-10 h-10 mx-auto text-[#e6ca65]" />
            </div>
            <h3>របៀបដំឡើងលើ iPhone / iPad</h3>
            <div className="ios-step">
              ១. ចុចលើប៊ូតុង <strong>ចែករំលែក (Share)</strong> នៅផ្នែកខាងក្រោមនៃកម្មវិធី Safari។
            </div>
            <div className="ios-step">
              ២. អូសចុះក្រោម រួចជ្រើសរើសយក <strong>«បន្ថែមទៅអេក្រង់ដើម (Add to Home Screen)»</strong>។
            </div>
            <div className="ios-step">
              ៣. ចុច <strong>«បន្ថែម (Add)»</strong> ដើម្បីដំឡើងជាកម្មវិធីពេញអេក្រង់!
            </div>
            <button className="btn-gold-submit" onClick={() => setShowIosModal(false)}>
              យល់ព្រម
            </button>
          </div>
        </div>
      )}
    </>
  );
}
