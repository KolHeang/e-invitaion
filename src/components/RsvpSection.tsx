'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function RsvpSection() {
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '២ នាក់',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // 1. Save RSVP to Dashboard Records
    const khmerNumbers: { [key: string]: string } = {
      '១': '1', '២': '2', '៣': '3', '៤': '4', '៥': '5',
      '៦': '6', '៧': '7', '៨': '8', '៩': '9', '០': '0'
    };
    const extractedGuestCount = attending === 'yes'
      ? formData.guests.split('').map(c => khmerNumbers[c] || c).join('').replace(/[^0-9]/g, '') || '1'
      : '0';

    const newRsvp = {
      id: Date.now(),
      name: formData.name.trim(),
      phone: formData.phone.trim() || '—',
      attendance: attending === 'yes' ? 'attending' : 'regret',
      guestCount: extractedGuestCount,
      message: formData.message.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      const savedRsvps = localStorage.getItem('wedding_rsvp_records');
      const rsvpList = savedRsvps ? JSON.parse(savedRsvps) : [];
      const updatedRsvps = [newRsvp, ...rsvpList];
      localStorage.setItem('wedding_rsvp_records', JSON.stringify(updatedRsvps));
      window.dispatchEvent(new Event('wedding_rsvp_added'));
    } catch (err) {}

    // 2. Save wish to Wishes Board if message is provided
    if (formData.message.trim()) {
      const avatars = ['🌹', '💖', '💍', '🕊️', '✨', '💐', '🥂', '👑'];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

      const newWish = {
        id: Date.now(),
        avatar: randomAvatar,
        name: formData.name.trim(),
        timeAgo: 'ទើបតែបញ្ចូល',
        message: formData.message.trim(),
        likes: 1,
        isLiked: false,
      };

      try {
        const saved = localStorage.getItem('wedding_wishes_board_data');
        const list = saved ? JSON.parse(saved) : [];
        const updated = [newWish, ...list];
        localStorage.setItem('wedding_wishes_board_data', JSON.stringify(updated));
        window.dispatchEvent(new Event('wedding_wish_added'));
      } catch (err) {}
    }

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
      });
    } catch (err) {}

    setSubmitted(true);
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
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
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
            {/* ឈ្មោះភ្ញៀវ */}
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

            {/* ការបញ្ជាក់វត្តមាន (Toggle Buttons) */}
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

            {/* សារជូនពរ */}
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

            {/* Submit Button */}
            <div className="rsvp-submit-wrap">
              <button
                type="submit"
                className="rsvp-submit-btn font-moul"
              >
                {/* Paper plane icon */}
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
      </div>
    </section>
  );
}
