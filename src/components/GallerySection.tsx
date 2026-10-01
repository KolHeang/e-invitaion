'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { KhmerLotusDivider, KhmerCornerSVG } from './KhmerOrnament';

interface PhotoItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 1,
    src: '/assets/images/couple-hero.jpg',
    alt: 'រូបថតគូស្វាមីភរិយាធំ',
    caption: 'ពិធីសំពះផ្ទឹម និងចងដៃប្រពៃណីខ្មែរ',
  },
  {
    id: 2,
    src: '/assets/images/couple-ceremony.jpg',
    alt: 'ពិធីមង្គលការ',
    caption: 'ពិធីសិរីសួស្តីមង្គលការ',
  },
  {
    id: 3,
    src: '/assets/images/couple-outdoor.jpg',
    alt: 'អនុស្សាវរីយ៍ស្នេហា',
    caption: 'រូបថតអនុស្សាវរីយ៍ក្រៅឆាក',
  },
  {
    id: 4,
    src: '/assets/images/couple-casual-1.jpg',
    alt: 'ដំណើរកម្សាន្តជាមួយគ្នា',
    caption: 'ដំណើរកម្សាន្ត និងអនុស្សាវរីយ៍ផ្អែមល្ហែម',
  },
  {
    id: 5,
    src: '/assets/images/couple-casual-2.jpg',
    alt: 'ស្នាមញញឹមនៃក្តីស្រឡាញ់',
    caption: 'ស្នាមញញឹមនៃក្តីស្រឡាញ់ និងសុភមង្គល',
  },
];

export default function GallerySection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setActiveIdx(idx);
  const closeLightbox = () => setActiveIdx(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + PHOTOS.length) % PHOTOS.length);
    }
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % PHOTOS.length);
    }
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-card glass-panel">
        {/* ក្បាច់ត្រីកោណពណ៌ទឹកមាសនៅគ្រប់ជ្រុងទាំង ៤ */}
        <KhmerCornerSVG position="top-left" />
        <KhmerCornerSVG position="top-right" />
        <KhmerCornerSVG position="bottom-left" />
        <KhmerCornerSVG position="bottom-right" />

        {/* ១. ក្បាលចំណងជើង (Header) */}
        <div className="gallery-header-block">
          <p className="gallery-sub-title font-moul">រូបថតអនុស្សាវរីយ៍</p>
          <h2 className="gallery-main-title font-moul royal-arch-main-title">
            កម្រងរូបភាពអនុស្សាវរីយ៍
          </h2>
          <KhmerLotusDivider className="my-2" />
        </div>

        {/* ២. ប្លង់តម្រៀបរូបភាព (Gallery Grid Layout) */}
        <div className="gallery-layout-container">
          {/* Main Top Feature Photo (រូបភាពធំខាងលើ) */}
          {PHOTOS[0] && (
            <div
              onClick={() => openLightbox(0)}
              className="gallery-feature-item"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS[0].src}
                alt={PHOTOS[0].alt}
                className="gallery-img"
              />
            </div>
          )}

          {/* 2-Column Grid for remaining photos (រូបភាពតូចៗខាងក្រោម) */}
          <div className="gallery-sub-grid">
            {PHOTOS.slice(1).map((photo, index) => {
              const actualIdx = index + 1;
              return (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(actualIdx)}
                  className="gallery-sub-item"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="gallery-img"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ៣. ផ្ទាំង Lightbox Modal Fullscreen */}
      {activeIdx !== null && (
        <div className="gallery-lightbox-modal" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="បិទ"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[activeIdx].src}
              alt={PHOTOS[activeIdx].alt}
              className="lightbox-active-img"
            />

            <p className="lightbox-caption-text">{PHOTOS[activeIdx].caption}</p>

            <button
              type="button"
              className="lightbox-nav-btn prev"
              onClick={showPrev}
              aria-label="ថយក្រោយ"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="lightbox-nav-btn next"
              onClick={showNext}
              aria-label="បន្ទាប់"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
