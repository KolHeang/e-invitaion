'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AmbientPetals from '@/components/AmbientPetals';
import EnvelopeModal from '@/components/EnvelopeModal';
import FloatingMusicDisc from '@/components/FloatingMusicDisc';
import HeroSection from '@/components/HeroSection';
import CountdownSection from '@/components/CountdownSection';
import ParentsSection from '@/components/ParentsSection';
import ScheduleSection from '@/components/ScheduleSection';
import LocationSection from '@/components/LocationSection';
import GallerySection from '@/components/GallerySection';
import RsvpSection from '@/components/RsvpSection';
import WishesBoard from '@/components/WishesBoard';
import GiftSection from '@/components/GiftSection';
import ShareFooter from '@/components/ShareFooter';
import BottomNavBar from '@/components/BottomNavBar';

function WeddingContent() {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState('ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា');

  useEffect(() => {
    const rawTo = searchParams.get('to') || searchParams.get('name') || searchParams.get('guest');
    if (rawTo) {
      setGuestName(decodeURIComponent(rawTo.replace(/\+/g, ' ')));
    }
  }, [searchParams]);

  return (
    <>
      {/* Ambient Falling Particles */}
      <AmbientPetals />

      {/* Traditional Khmer Photo Cover Intro Modal */}
      <EnvelopeModal guestName={guestName} onOpen={() => document.body.classList.remove('modal-open')} />

      {/* Main Container */}
      <main id="main-invitation-content" className="app-container">
        {/* Floating Background Music Controller */}
        <FloatingMusicDisc />

        {/* Hero Section */}
        <HeroSection />

        {/* Countdown */}
        <CountdownSection />

        {/* Parents & Couple Story */}
        <ParentsSection />

        {/* Schedule */}
        <ScheduleSection />

        {/* Location & Map */}
        <LocationSection />

        {/* Photo Gallery Lightbox */}
        <GallerySection />

        {/* RSVP Attendance Form */}
        <RsvpSection />

        {/* Wedding Wishes Board / Guestbook */}
        <WishesBoard />

        {/* Gift / ABA QR */}
        <GiftSection />

        {/* Share & Footer — ចែករំលែក & ជើងទំព័រ */}
        <ShareFooter />

        {/* Bottom Navigation Dock */}
        <BottomNavBar />
      </main>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-[#fce38a]">កំពុងផ្ទុក...</div>}>
      <WeddingContent />
    </Suspense>
  );
}
