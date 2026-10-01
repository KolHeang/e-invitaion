'use client';

import React from 'react';
import { KhmerLotusDivider, KhmerCornerSVG } from './KhmerOrnament';

export default function ParentsSection() {
  return (
    <section id="couple" className="parents-section">
      <div className="parents-card">
        {/* ក្បាច់ត្រីកោណពណ៌ទឹកមាសនៅគ្រប់ជ្រុងទាំង ៤ */}
        <KhmerCornerSVG position="top-left" />
        <KhmerCornerSVG position="top-right" />
        <KhmerCornerSVG position="bottom-left" />
        <KhmerCornerSVG position="bottom-right" />

        {/* ១. ក្បាលចំណងជើង (Header) */}
        <div className="parents-header-block">
          <p className="parents-sub-title font-moul">
            ពរជ័យមាតាបិតា
          </p>
          <h2 className="parents-main-title font-moul royal-arch-main-title">
            មាតាបិតាទាំងសងខាង
          </h2>
          <KhmerLotusDivider className="my-2" />
        </div>

        {/* ២. ការបែងចែកសងខាង (2-Column Grid Layout) */}
        <div className="parents-grid">
          {/* ខាងឆ្វេង (ខាងកូនប្រុស) */}
          <div className="parents-col">
            <div className="parents-arch-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/couple-casual-1.jpg"
                alt="កូនកំលោះ គល់ ហាង"
                className="parents-arch-img"
              />
            </div>
            <div className="parents-side-title">
              ខាងកូនប្រុស
            </div>
            <p className="parent-role-text">លោកមាតាបិតា</p>
            <p className="couple-name-tag">
              កូនប្រុសនាម៖{' '}
              <strong className="text-[#ab802c] font-moul font-normal">គល់ ហាង</strong>
            </p>
          </div>

          {/* ខាងស្តាំ (ខាងកូនស្រី) */}
          <div className="parents-col">
            <div className="parents-arch-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/couple-casual-2.jpg"
                alt="កូនក្រមុំ ស៊ាប សៀកលាង"
                className="parents-arch-img"
              />
            </div>
            <div className="parents-side-title">
              ខាងកូនស្រី
            </div>
            <p className="parent-role-text">លោកមាតាបិតា</p>
            <p className="couple-name-tag">
              កូនស្រីនាម៖{' '}
              <strong className="text-[#ab802c] font-moul font-normal">ស៊ាប សៀកលាង</strong>
            </p>
          </div>
        </div>

        {/* ៣. ប្រអប់ពាក្យស្លោក/សម្រង់សម្ដី (Quote Box) */}
        <div className="khmer-blessing-quote-box">
          <span className="quote-icon-gold">❝</span>
          <p className="khmer-blessing-text">
            ក្ដីស្រឡាញ់ដែលកើតចេញពីចិត្តបរិសុទ្ធ គឺជាចំណងមេត្រីភាពដ៏រឹងមាំរហូតដល់ចាស់កោងខ្នង
          </p>
          <span className="quote-icon-gold">❞</span>
        </div>
      </div>
    </section>
  );
}