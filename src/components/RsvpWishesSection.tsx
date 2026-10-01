'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Wish {
  id: number;
  name: string;
  message: string;
  date: string;
  likes: number;
  avatar: string;
}

const DEFAULT_WISHES: Wish[] = [
  {
    id: 1,
    name: 'លោក គីម ប៉េងឃៀង និង ភរិយា',
    message: "សូមជូនពរដល់ក្មួយទាំងពីរ គល់ ហាង & ស៊ាប សៀកលាង ទទួលបានសុភមង្គល ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង!",
    date: "២ ម៉ោងមុន",
    likes: 18,
    avatar: "👑"
  },
  {
    id: 2,
    name: 'កញ្ញា លីនដា & សង្សា',
    message: "រីករាយថ្ងៃមង្គលការ គល់ ហាង & ស៊ាប សៀកលាង! ជូនពរអ្នកទាំងពីរស្រឡាញ់គ្នាផ្អែមល្ហែមដូចស្ករជានិច្ច 💕",
    date: "៤ ម៉ោងមុន",
    likes: 29,
    avatar: "💐"
  },
  {
    id: 3,
    name: 'កញ្ញា ពេជ្យ មួយគីម និងស្វាមី',
    message: "សូមឱ្យចំណងអាពាហ៍ពិពាហ៍នេះពោរពេញដោយសេចក្តីសុខ វិបុលសុខ និងសម្បូរសប្បាយ!",
    date: "១ ថ្ងៃមុន",
    likes: 12,
    avatar: "🕊️"
  }
];

export default function RsvpWishesSection() {
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '២ នាក់',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_wishes_next_data');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        setWishes(DEFAULT_WISHES);
      }
    } else {
      setWishes(DEFAULT_WISHES);
      localStorage.setItem('wedding_wishes_next_data', JSON.stringify(DEFAULT_WISHES));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (formData.message.trim()) {
      const avatars = ['🌹', '💖', '💍', '🕊️', '✨', '💐', '🥂'];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

      const newWish: Wish = {
        id: Date.now(),
        name: formData.name.trim(),
        message: formData.message.trim(),
        date: 'ទើបតែបញ្ចូល',
        likes: 1,
        avatar: randomAvatar
      };

      const updated = [newWish, ...wishes];
      setWishes(updated);
      localStorage.setItem('wedding_wishes_next_data', JSON.stringify(updated));
    }

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 }
      });
    } catch (err) { }

    setSubmitted(true);
  };

  const handleLike = (id: number) => {
    const updated = wishes.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w));
    setWishes(updated);
    localStorage.setItem('wedding_wishes_next_data', JSON.stringify(updated));
  };

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-card">
        {/* Corner Ornaments ជ្រុងក្បាច់មាសទាំង ៤ */}
        <div className="rsvp-corner-ornament rsvp-corner-tl" />
        <div className="rsvp-corner-ornament rsvp-corner-tr" />
        <div className="rsvp-corner-ornament rsvp-corner-bl" />
        <div className="rsvp-corner-ornament rsvp-corner-br" />

        {/* ១. ក្បាលចំណងជើង (Header) */}
        <div className="rsvp-header-block">
          <p className="rsvp-sub-title">
            ការឆ្លើយតបវត្តមាន
          </p>
          <h2 className="rsvp-main-title font-moul royal-arch-main-title">
            ឆ្លើយតបការចូលរួម
          </h2>

          {/* Decorative Divider */}
          <div className="rsvp-divider-gold">
            <span className="rsvp-divider-line left" />
            <span className="rsvp-divider-symbol">❖</span>
            <span className="rsvp-divider-line right" />
          </div>
        </div>

        {/* ២. ប្រអប់បញ្ចូលទិន្នន័យ (RSVP Form) */}
        {submitted ? (
          <div className="rsvp-success-state">
            <div className="text-4xl" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
            <h3 className="font-moul" style={{ fontSize: '1.25rem', color: '#8d6219', marginBottom: '6px' }}>
              សូមអរគុណ!
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#57534e', lineHeight: '1.6', marginBottom: '16px' }}>
              ការឆ្លើយតបរបស់លោកអ្នកត្រូវបានកត់ត្រារួចរាល់ដោយជោគជ័យ។
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="btn-luxury-outline"
              style={{ fontSize: '0.82rem', padding: '8px 18px' }}
            >
              ឆ្លើយតបម្តងទៀត ឬកែប្រែ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rsvp-form-container">
            {/* ឈ្មោះភ្ញៀវកិត្តិយស */}
            <div className="form-field-item">
              <label className="rsvp-field-label">
                ឈ្មោះភ្ញៀវកិត្តិយស <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ឧ. លោក សុខ ចាន់ថា"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rsvp-input-box"
              />
            </div>

            {/* លេខទូរស័ព្ទ ឬ Telegram */}
            <div className="form-field-item">
              <label className="rsvp-field-label">
                លេខទូរស័ព្ទ ឬ តេឡេក្រាម
              </label>
              <input
                type="text"
                placeholder="ឧ. ០១២ ៣៤៥ ៦៧៨"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rsvp-input-box"
              />
            </div>

            {/* ការបញ្ជាក់វត្តមាន (Attendance Status Toggle Buttons) */}
            <div className="form-field-item">
              <label className="rsvp-field-label">
                ការបញ្ជាក់វត្តមាន <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div className="attendance-toggle-grid">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`attendance-toggle-btn ${attending === 'yes' ? 'active-yes' : ''}`}
                >
                  <span style={{ fontSize: '0.95rem' }}>✔</span>
                  <span>ចូលរួម</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`attendance-toggle-btn ${attending === 'no' ? 'active-no' : ''}`}
                >
                  <span style={{ fontSize: '0.95rem' }}>✖</span>
                  <span>អធ្យាស្រ័យ (មិនបានចូលរួម)</span>
                </button>
              </div>
            </div>

            {/* ចំនួនភ្ញៀវចូលរួម */}
            {attending === 'yes' && (
              <div className="form-field-item">
                <label className="rsvp-field-label">
                  ចំនួនភ្ញៀវចូលរួម
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="rsvp-select-box"
                >
                  <option value="១ នាក់">១ នាក់</option>
                  <option value="២ នាក់">២ នាក់</option>
                  <option value="៣ នាក់">៣ នាក់</option>
                  <option value="៤ នាក់ ឬច្រើនជាងនេះ">៤ នាក់ ឬច្រើនជាងនេះ</option>
                </select>
              </div>
            )}

            {/* សារជូនពរដល់គូស្វាមីភរិយា */}
            <div className="form-field-item">
              <label className="rsvp-field-label">
                សារជូនពរដល់គូស្វាមីភរិយា
              </label>
              <textarea
                rows={3}
                placeholder="សូមសរសេរសារជូនពរនៅទីនេះ..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rsvp-textarea-box"
              />
            </div>

            {/* Submit Action Button */}
            <div className="rsvp-submit-wrap">
              <button
                type="submit"
                className="rsvp-submit-btn font-moul"
              >
                {/* Paper plane send icon */}
                <svg
                  style={{ width: '1rem', height: '1rem' }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3 21l18-9L3 3l3 9zm0 0h6" />
                </svg>
                <span>ផ្ញើការឆ្លើយតប</span>
              </button>
            </div>
          </form>
        )}

        {/* ក្តារសារជូនពរមង្គល (Wishes Board Wall) */}
        <div className="wishes-board-section">
          <div className="wishes-header-row">
            <h4 className="wishes-title font-moul text-gold">ក្តារសារជូនពរមង្គល</h4>
            <span className="wishes-count-pill">
              {wishes.length} សារ
            </span>
          </div>

          <div className="wishes-list">
            {wishes.map((w) => (
              <div key={w.id} className="wish-item-card">
                <div className="wish-header">
                  <div className="wish-avatar">{w.avatar}</div>
                  <div className="wish-author-info">
                    <h5 className="wish-author">{w.name}</h5>
                    <span className="wish-time">{w.date}</span>
                  </div>
                </div>
                <p className="wish-body">{w.message}</p>
                <div className="wish-footer">
                  <button
                    type="button"
                    className="wish-like-btn"
                    onClick={() => handleLike(w.id)}
                  >
                    <Heart className="w-3.5 h-3.5 text-[#C59A27] fill-current" />
                    <span>{w.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
