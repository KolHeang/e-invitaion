'use client';

import React, { useState, useEffect } from 'react';

export interface WishItem {
  id: number;
  avatar: string;
  name: string;
  timeAgo: string;
  message: string;
  likes: number;
  isLiked?: boolean;
}

export const DEFAULT_WISHES: WishItem[] = [
  {
    id: 1,
    avatar: '👑',
    name: 'លោក គីម ប៉េងឃៀង និង ភរិយា',
    timeAgo: '២ ម៉ោងមុន',
    message: 'សូមជូនពរដល់ក្មួយទាំងពីរ គល់ ហាង & ស៊ាប សៀកលាង ទទួលបានសុភមង្គល ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង! ⭐',
    likes: 18,
    isLiked: false,
  },
  {
    id: 2,
    avatar: '💐',
    name: 'កញ្ញា លីនដា & សង្សា',
    timeAgo: '៤ ម៉ោងមុន',
    message: 'រីករាយថ្ងៃមង្គលការ គល់ ហាង & ស៊ាប សៀកលាង! ជូនពរអ្នកទាំងពីរស្រឡាញ់គ្នាផ្អែមល្ហែមដូចស្ករជានិច្ច 💕',
    likes: 29,
    isLiked: false,
  },
  {
    id: 3,
    avatar: '🕊️',
    name: 'កញ្ញា ពេជ្យ មួយគីម និងស្វាមី',
    timeAgo: '១ ថ្ងៃមុន',
    message: 'សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ កើតមានដល់គ្រួសារថ្មីនៃក្មួយទាំងពីរជារៀងរហូត។',
    likes: 12,
    isLiked: false,
  },
];

export default function WishesBoard() {
  const [wishes, setWishes] = useState<WishItem[]>(DEFAULT_WISHES);

  const loadWishes = () => {
    try {
      const saved = localStorage.getItem('wedding_wishes_board_data');
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(DEFAULT_WISHES);
        localStorage.setItem('wedding_wishes_board_data', JSON.stringify(DEFAULT_WISHES));
      }
    } catch (e) {
      setWishes(DEFAULT_WISHES);
    }
  };

  useEffect(() => {
    loadWishes();

    const handleWishAdded = () => {
      loadWishes();
    };

    window.addEventListener('wedding_wish_added', handleWishAdded);
    window.addEventListener('storage', handleWishAdded);

    return () => {
      window.removeEventListener('wedding_wish_added', handleWishAdded);
      window.removeEventListener('storage', handleWishAdded);
    };
  }, []);

  const toggleLike = (id: number) => {
    setWishes((prev) => {
      const updated = prev.map((wish) => {
        if (wish.id === id) {
          const isLiked = !wish.isLiked;
          return {
            ...wish,
            isLiked,
            likes: isLiked ? wish.likes + 1 : wish.likes - 1,
          };
        }
        return wish;
      });

      try {
        localStorage.setItem('wedding_wishes_board_data', JSON.stringify(updated));
      } catch (e) { }

      return updated;
    });
  };

  return (
    <section id="wishes-board" className="wishes-board-section">
      {/* Outer Card with Gold Border & Corner Ornaments */}
      <div className="wishes-board-card">
        {/* Corner Ornaments ជ្រុងក្បាច់មាសទាំង ៤ */}
        <div className="wishes-corner-ornament wishes-corner-tl" />
        <div className="wishes-corner-ornament wishes-corner-tr" />
        <div className="wishes-corner-ornament wishes-corner-bl" />
        <div className="wishes-corner-ornament wishes-corner-br" />

        {/* 1. Header with Title & Message Count */}
        <div className="wishes-header-flex">
          <h2 className="wishes-board-title font-moul royal-arch-main-title">
            ក្តារសារជូនពរមង្គល
          </h2>
          <span className="wishes-count-badge">
            {wishes.length} សារ
          </span>
        </div>

        {/* 2. Scrollable Wishes List */}
        <div className="wishes-scroll-box">
          {wishes.map((item) => (
            <div key={item.id} className="wish-card-box">
              {/* Sender Info */}
              <div className="wish-sender-row">
                <span className="wish-avatar-badge">
                  {item.avatar}
                </span>
                <div className="wish-sender-details">
                  <h3 className="wish-sender-name">
                    {item.name}
                  </h3>
                  <span className="wish-time-text">
                    {item.timeAgo}
                  </span>
                </div>
              </div>

              {/* Message Content */}
              <p className="wish-message-text">
                {item.message}
              </p>

              {/* Like Button */}
              <div className="wish-like-action">
                <button
                  type="button"
                  onClick={() => toggleLike(item.id)}
                  className={`wish-interactive-like-btn ${item.isLiked ? 'liked' : 'unliked'}`}
                  aria-label={`Like wish from ${item.name}`}
                >
                  {/* Heart Icon */}
                  <svg
                    className="wish-heart-icon"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    />
                  </svg>
                  <span>{item.likes}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
