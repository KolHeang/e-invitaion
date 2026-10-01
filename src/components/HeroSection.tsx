'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { KhmerLotusDivider } from './KhmerOrnament';

export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-ornament-top"></div>
      
      {/* 1. ផ្នែកក្បាលទំព័រ និងចំណងជើង (Header & Invitation Title) */}
      <div className="hero-header-block">
        {/* ពាក្យស្លោកខាងលើបង្អស់ */}
        <p className="hero-top-slogan font-moul">សិរីសួស្តី អាពាហ៍ពិពាហ៍</p>
        
        {/* ចំណងជើងលិខិតចម្បង (Main Title) */}
        <h1 className="hero-heading-khmer font-moul royal-arch-main-title">
          លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍
        </h1>
        
        {/* បន្ទាត់ក្បាច់លម្អ (Gold Divider) */}
        <KhmerLotusDivider className="my-2" />

        {/* ឃ្លាគួរសម */}
        <p className="hero-sub-khmer">យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ</p>
      </div>

      {/* 2. ស៊ុមរូបថតគូស្វាមីភរិយា (Arch-Shaped Couple Portrait) */}
      <div className="hero-image-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/couple-hero.jpg"
          alt="កូនកំលោះ គល់ ហាង និង កូនក្រមុំ ស៊ាប សៀកលាង"
        />
      </div>

      {/* 3. ឈ្មោះគូស្វាមីភរិយា (Couple Typography: ៣ ជួរកណ្តាល) */}
      <div className="couple-names-block">
        <div className="couple-name-line groom-name font-moul">
          គល់ ហាង
        </div>
        <div className="couple-amp-line">
          <span className="couple-calligraphy-amp font-script">&</span>
        </div>
        <div className="couple-name-line bride-name font-moul">
          ស៊ាប សៀកលាង
        </div>
        
        {/* កាលបរិច្ឆេទនៃថ្ងៃមង្គលការ */}
        <div className="wedding-date-highlight flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4 inline-block text-[#C59A27]" />
          <span>ថ្ងៃសៅរ៍ ទី២៨ ខែវិច្ឆិកា ឆ្នាំ២០២៦</span>
        </div>
      </div>
    </section>
  );
}
