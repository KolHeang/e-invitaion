'use client';

import React from 'react';
import { Gift, Scissors, Heart, Wine } from 'lucide-react';
import { KhmerLotusDivider, KhmerCornerSVG } from './KhmerOrnament';

interface ScheduleEvent {
  time: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const SCHEDULE_EVENTS: ScheduleEvent[] = [
  {
    time: '០៧:៣០ ព្រឹក',
    title: 'ពិធីហែជំនូន និងសែនព្រេន',
    desc: 'ពិធីហែជំនូនផ្លែឈើ នំចំណីតាមប្រពៃណីខ្មែរ និងសែនព្រេនដូនតា',
    icon: <Gift className="w-5 h-5 text-[#A07422]" />,
  },
  {
    time: '០៩:០០ ព្រឹក',
    title: 'ពិធីកាត់សក់បង្កក់សិរី',
    desc: 'ពិធីកាត់សក់កំប្លែងដោយតន្ត្រីប្រពៃណី និងប្រសិទ្ធពរជ័យ',
    icon: <Scissors className="w-5 h-5 text-[#A07422]" />,
  },
  {
    time: '១០:៣០ ព្រឹក',
    title: 'ពិធីសំពះផ្ទឹម និងចងដៃ',
    desc: 'ពិធីសំពះផ្ទឹម បង្វិលពពិល និងចងដៃសិរីសួស្តី',
    icon: <Heart className="w-5 h-5 text-[#A07422] fill-[#A07422]/20" />,
  },
  {
    time: '០៥:០០ ល្ងាច',
    title: 'ពិធីពិសាភោជនាហារ និងរាំកម្សាន្ត',
    desc: 'សូមអញ្ជើញចូលរួមពិសារភោជនាហារ និងរាំកម្សាន្តនៅសាលមហោស្រព',
    icon: <Wine className="w-5 h-5 text-[#A07422]" />,
  },
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="schedule-section">
      <div className="schedule-card glass-panel">
        {/* ក្បាច់ត្រីកោណពណ៌ទឹកមាសនៅគ្រប់ជ្រុងទាំង ៤ */}
        <KhmerCornerSVG position="top-left" />
        <KhmerCornerSVG position="top-right" />
        <KhmerCornerSVG position="bottom-left" />
        <KhmerCornerSVG position="bottom-right" />

        {/* ១. ក្បាលចំណងជើង (Header) */}
        <div className="schedule-header-block">
          <p className="schedule-sub-title font-moul">របៀបវារៈកម្មវិធី</p>
          <h2 className="schedule-main-title font-moul royal-arch-main-title">
            កម្មវិធីមង្គលការ
          </h2>
          <KhmerLotusDivider className="my-2" />
        </div>

        {/* ២. ខ្សែបន្ទាត់ពេលវេលា (Vertical Timeline List) */}
        <div className="vertical-timeline-wrap">
          {SCHEDULE_EVENTS.map((event, index) => (
            <div key={index} className="timeline-item">
              {/* Icon Circle Node */}
              <div className="timeline-node">
                <div className="timeline-circle-badge">
                  {event.icon}
                </div>
              </div>

              {/* Content */}
              <div className="timeline-body">
                <span className="timeline-time-badge">{event.time}</span>
                <h3 className="timeline-event-title font-moul">{event.title}</h3>
                <p className="timeline-event-desc">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
