'use client';

import React, { useState, useEffect } from 'react';
import { CalendarPlus } from 'lucide-react';
import { KhmerLotusDivider, KhmerCornerSVG } from './KhmerOrnament';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });
  const targetDate = new Date('2026-11-28T07:30:00+07:00');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', mins: '00', secs: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(minutes).padStart(2, '0'),
        secs: String(seconds).padStart(2, '0')
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const startTime = targetDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(targetDate.getTime() + 14 * 60 * 60 * 1000);
    const endTime = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const title = encodeURIComponent('ពិធីអាពាហ៍ពិពាហ៍៖ គល់ ហាង & ស៊ាប សៀកលាង');
    const details = encodeURIComponent('សូមគោរពអញ្ជើញចូលរួមពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ នៅ មជ្ឈមណ្ឌល ឌឹ ព្រេមៀ សេនធ័រ សែនសុខ');
    const location = encodeURIComponent('មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សេនធ័រ សែនសុខ');

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <section id="countdown" className="countdown-section">
      <div className="countdown-card glass-panel">
        {/* ក្បាច់ត្រីកោណពណ៌ទឹកមាសនៅគ្រប់ជ្រុងទាំង ៤ */}
        <KhmerCornerSVG position="top-left" />
        <KhmerCornerSVG position="top-right" />
        <KhmerCornerSVG position="bottom-left" />
        <KhmerCornerSVG position="bottom-right" />

        {/* ចំណងជើងផ្នែកលើ (Header) */}
        <p className="countdown-sub-title font-moul">ពេលវេលារាប់ថយក្រោយ</p>
        <h2 className="countdown-main-title font-moul royal-arch-main-title">
          ឆ្ពោះទៅថ្ងៃមង្គលការ
        </h2>

        {/* បន្ទាត់ខណ្ឌលម្អពណ៌មាស */}
        <KhmerLotusDivider className="my-2" />

        {/* ប្រអប់រាប់ថយក្រោយទាំង ៤ (Countdown Boxes) */}
        <div className="countdown-grid">
          <div className="countdown-box">
            <span className="countdown-num font-moul">{timeLeft.days}</span>
            <span className="countdown-label">ថ្ងៃ</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-num font-moul">{timeLeft.hours}</span>
            <span className="countdown-label">ម៉ោង</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-num font-moul">{timeLeft.mins}</span>
            <span className="countdown-label">នាទី</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-num font-moul">{timeLeft.secs}</span>
            <span className="countdown-label">វិនាទី</span>
          </div>
        </div>

        {/* ប៊ូតុងកត់ត្រាប្រតិទិន (Add to Google Calendar Button) */}
        <div className="countdown-btn-wrap">
          <button 
            type="button" 
            onClick={handleAddToCalendar} 
            className="countdown-calendar-btn"
          >
            <CalendarPlus className="w-4 h-4 text-[#A07422] mr-2" />
            <span>កត់ត្រាក្នុងប្រតិទិន Google</span>
          </button>
        </div>
      </div>
    </section>
  );
}
