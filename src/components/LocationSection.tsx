'use client';

import React from 'react';
import { Home, MapPin, Navigation } from 'lucide-react';
import { KhmerLotusDivider, KhmerCornerSVG } from './KhmerOrnament';

export default function LocationSection() {
  const addressQuery = encodeURIComponent('Svay Rolum, Ta Khmau, Kandal');
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

  return (
    <section id="location" className="location-section">
      <div className="location-card glass-panel">
        {/* ក្បាច់ត្រីកោណពណ៌ទឹកមាសនៅគ្រប់ជ្រុងទាំង ៤ */}
        <KhmerCornerSVG position="top-left" />
        <KhmerCornerSVG position="top-right" />
        <KhmerCornerSVG position="bottom-left" />
        <KhmerCornerSVG position="bottom-right" />

        {/* ១. ក្បាលចំណងជើង (Header) */}
        <div className="location-header-block">
          <p className="location-sub-title font-moul">ទីតាំងកម្មវិធី</p>
          <h2 className="location-main-title font-moul royal-arch-main-title">
            ទីតាំងប្រារព្ធពិធី
          </h2>
          <KhmerLotusDivider className="my-2" />
        </div>

        {/* ២. ព័ត៌មានលម្អិតអំពីទីតាំង (Venue Address Details) */}
        <div className="venue-info-box">
          <h3 className="venue-title font-moul">
            គេហដ្ឋានខាងស្រី
          </h3>
          <div className="venue-hall-badge">
            <Home className="w-3.5 h-3.5 inline-block mr-1 text-[#A07422]" />
            <span>ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍</span>
          </div>
          <p className="venue-address-text">
            <MapPin className="w-4 h-4 text-[#C59A27] inline-block shrink-0 mr-1" />
            <span>ផ្លូវ ២១A ភូមិលេខ២ សង្កាត់ស្វាយរលំ ក្រុងតាខ្មៅ ខេត្តកណ្ដាល</span>
          </p>
        </div>

        {/* ៣. ផ្ទាំងផែនទីផ្ទាល់ (Interactive Google Maps Embed) */}
        <div className="map-embed-wrapper">
          <iframe
            src="https://maps.google.com/maps?q=Svay+Rolum,+Ta+Khmau&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="ផែនទីទីតាំង ស្វាយរលំ ក្រុងតាខ្មៅ"
            loading="lazy"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0 }}
          />
        </div>

        {/* ៤. ប៊ូតុងចុចបើក Google Maps នាំផ្លូវ */}
        <div className="location-nav-buttons">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-map-primary font-moul"
          >
            <Navigation className="w-4 h-4 mr-2 inline-block" />
            <span>មើលទីតាំងលើ Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
}
