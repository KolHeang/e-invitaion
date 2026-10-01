'use client';

import React, { useEffect, useState } from 'react';
import { Disc3, VolumeX } from 'lucide-react';
import { weddingAudio } from './AudioEngine';

export default function FloatingMusicDisc() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleAudioState = (e: any) => {
      setIsPlaying(e.detail.isPlaying);
    };

    document.addEventListener('wedding-audio-state', handleAudioState);
    return () => {
      document.removeEventListener('wedding-audio-state', handleAudioState);
    };
  }, []);

  const handleToggle = () => {
    const playing = weddingAudio.toggle();
    setIsPlaying(playing);
  };

  return (
    <button
      id="floating-music-disc"
      className={`floating-music-btn ${isPlaying ? 'spinning' : ''}`}
      onClick={handleToggle}
      title="ចាក់ / បិទ តន្ត្រីកំដរ"
      aria-label="Toggle background music"
    >
      {isPlaying ? (
        <Disc3 className="w-6 h-6 text-[#fce38a]" />
      ) : (
        <VolumeX className="w-5 h-5 text-[#d6c5bb]" />
      )}
    </button>
  );
}
