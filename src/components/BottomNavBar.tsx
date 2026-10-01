'use client';

import React, { useEffect, useState } from 'react';
import { Home, CalendarDays, MapPin, Images, Mail } from 'lucide-react';

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'schedule', 'location', 'gallery', 'rsvp'];
      const scrollPos = window.scrollY + 250;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="bottom-bar-nav" aria-label="ការរុករកទំព័រ">
      <a href="#home" className={activeTab === 'home' ? 'active' : ''}>
        <Home className="w-5 h-5" />
        <span>ទំព័រដើម</span>
      </a>
      <a href="#schedule" className={activeTab === 'schedule' ? 'active' : ''}>
        <CalendarDays className="w-5 h-5" />
        <span>កម្មវិធី</span>
      </a>
      <a href="#location" className={activeTab === 'location' ? 'active' : ''}>
        <MapPin className="w-5 h-5" />
        <span>ទីតាំង</span>
      </a>
      <a href="#gallery" className={activeTab === 'gallery' ? 'active' : ''}>
        <Images className="w-5 h-5" />
        <span>រូបថត</span>
      </a>
      <a href="#rsvp" className={activeTab === 'rsvp' ? 'active' : ''}>
        <Mail className="w-5 h-5" />
        <span>ឆ្លើយតប</span>
      </a>
    </nav>
  );
}
