'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  Heart,
  Copy,
  Check,
  Search,
  Download,
  Trash2,
  ExternalLink,
  Sparkles,
  UserPlus,
  ArrowLeft,
  Crown
} from 'lucide-react';
import { KhmerLotusDivider } from '@/components/KhmerOrnament';

interface RsvpRecord {
  id: number;
  name: string;
  phone: string;
  attendance: 'attending' | 'regret';
  guestCount: string;
  message: string;
  timestamp: string;
}

interface WishRecord {
  id: number;
  name: string;
  message: string;
  date: string;
  likes: number;
  avatar: string;
}

const INITIAL_RSVPS: RsvpRecord[] = [
  {
    id: 1,
    name: 'ឯកឧត្តម ជា ចាន់ដារ៉ា',
    phone: '០១២ ៨៨៨ ៧៧៧',
    attendance: 'attending',
    guestCount: '2',
    message: 'សូមជូនពរដល់ក្មួយទាំងពីរ គល់ ហាង & ស៊ាប សៀកលាង ទទួលបានសុភមង្គល ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង!',
    timestamp: '2026-09-30T10:15:00.000Z'
  },
  {
    id: 2,
    name: 'កញ្ញា លីនដា និងស្វាមី',
    phone: '០៩៨ ៥៥៥ ៤៤៤',
    attendance: 'attending',
    guestCount: '2',
    message: 'រីករាយថ្ងៃមង្គលការ គល់ ហាង & ស៊ាប សៀកលាង! ជូនពរអ្នកទាំងពីរស្រឡាញ់គ្នាផ្អែមល្ហែមដូចស្ករជានិច្ច 💕',
    timestamp: '2026-09-30T11:30:00.000Z'
  },
  {
    id: 3,
    name: 'លោកពូ វណ្ណារ៉ា និងភរិយា',
    phone: '០៧៧ ១២៣ ៤៥៦',
    attendance: 'attending',
    guestCount: '3',
    message: 'សូមឱ្យចំណងអាពាហ៍ពិពាហ៍នេះពោរពេញដោយសេចក្តីសុខ វិបុលសុខ និងសម្បូរសប្បាយ!',
    timestamp: '2026-09-30T12:00:00.000Z'
  },
  {
    id: 4,
    name: 'លោក សុខ ផល្លា',
    phone: '០១៥ ៩៩៩ ១១១',
    attendance: 'regret',
    guestCount: '0',
    message: 'អធ្យាស្រ័យជាប់បេសកកម្មក្រៅប្រទេស ជូនពរគូស្វាមីថ្មីមានសុភមង្គល!',
    timestamp: '2026-09-30T13:20:00.000Z'
  }
];

export default function DashboardPage() {
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'attending' | 'regret'>('all');

  // Generator State
  const [newGuestName, setNewGuestName] = useState('');
  const [guestTitle, setGuestTitle] = useState('ឯកឧត្តម');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const loadData = () => {
    // Load RSVPs from localStorage
    const savedRsvps = localStorage.getItem('wedding_rsvp_records');
    if (savedRsvps) {
      try {
        setRsvps(JSON.parse(savedRsvps));
      } catch (e) {
        setRsvps(INITIAL_RSVPS);
      }
    } else {
      setRsvps(INITIAL_RSVPS);
      localStorage.setItem('wedding_rsvp_records', JSON.stringify(INITIAL_RSVPS));
    }

    // Load Wishes
    const savedWishes = localStorage.getItem('wedding_wishes_board_data') || localStorage.getItem('wedding_wishes_next_data');
    if (savedWishes) {
      try {
        setWishes(JSON.parse(savedWishes));
      } catch (e) { }
    }
  };

  useEffect(() => {
    loadData();

    window.addEventListener('wedding_rsvp_added', loadData);
    window.addEventListener('wedding_wish_added', loadData);
    window.addEventListener('storage', loadData);

    return () => {
      window.removeEventListener('wedding_rsvp_added', loadData);
      window.removeEventListener('wedding_wish_added', loadData);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  // Stats Calculations
  const totalResponses = rsvps.length;
  const attendingList = rsvps.filter((r) => r.attendance === 'attending');
  const attendingCount = attendingList.length;
  const totalGuestHeads = attendingList.reduce((acc, curr) => {
    const num = parseInt(curr.guestCount) || 1;
    return acc + num;
  }, 0);
  const regretCount = rsvps.filter((r) => r.attendance === 'regret').length;

  // Generate Personalized Guest Link
  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    const fullName = `${guestTitle ? guestTitle + ' ' : ''}${newGuestName.trim()}`;
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const link = `${baseUrl}/?to=${encodeURIComponent(fullName)}`;
    setGeneratedLink(link);
    setCopiedLink(false);
  };

  const handleCopyGenerated = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleDeleteRsvp = (id: number) => {
    if (confirm('តើលោកអ្នកចង់លុបទិន្នន័យនេះមែនទេ?')) {
      const updated = rsvps.filter((r) => r.id !== id);
      setRsvps(updated);
      localStorage.setItem('wedding_rsvp_records', JSON.stringify(updated));
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = ['លេខរៀង,ឈ្មោះភ្ញៀវ,លេខទូរស័ព្ទ,ការចូលរួម,ចំនួនមនុស្ស,សារជូនពរ,កាលបរិច្ឆេទ'];
    const rows = rsvps.map((r) =>
      [
        r.id,
        `"${r.name.replace(/"/g, '""')}"`,
        `"${r.phone}"`,
        r.attendance === 'attending' ? 'ចូលរួម' : 'អធ្យាស្រ័យ',
        r.guestCount,
        `"${(r.message || '').replace(/"/g, '""')}"`,
        r.timestamp
      ].join(',')
    );

    const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `បញ្ជីភ្ញៀវឆ្លើយតប_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      (r.message && r.message.toLowerCase().includes(searchQuery.toLowerCase()));

    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && r.attendance === statusFilter;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 10%, #FFFDF9 0%, #FAF7F2 40%, #F2ECE3 100%)', color: '#381910', padding: '32px 20px 80px', fontFamily: 'var(--font-khmer-body)' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

        {/* Top Header Bar */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px',
            padding: '24px 28px',
            background: '#FFFDF9',
            border: '1.5px solid rgba(197, 154, 39, 0.35)',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(90, 60, 20, 0.06)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg, #E2BC65 0%, #C49830 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(197, 154, 39, 0.3)' }}>
                <Crown className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-moul text-gold" style={{ fontSize: '1.4rem', margin: 0 }}>
                ផ្ទាំងគ្រប់គ្រងលិខិតអញ្ជើញមង្គលការ
              </h1>
            </div>
            <p style={{ color: '#6D5545', fontSize: '0.92rem', margin: 0, paddingLeft: '48px' }}>
              អាពាហ៍ពិពាហ៍៖ <strong style={{ color: '#381910' }}>គល់ ហាង & ស៊ាប សៀកលាង</strong> &bull; ថ្ងៃទី២៨ ខែវិច្ឆិកា ឆ្នាំ២០២៧
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 20px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #E2BC65 0%, #C49830 50%, #A2761B 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(160, 116, 34, 0.25)',
                transition: 'all 0.3s ease'
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              <span>មើលលិខិតអញ្ជើញផ្ទាល់</span>
            </a>
          </div>
        </header>

        {/* 4 Stat Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px',
            marginBottom: '32px'
          }}
        >
          {/* Card 1: Total Responses */}
          <div
            style={{
              background: '#FFFDF9',
              border: '1.5px solid rgba(197, 154, 39, 0.35)',
              borderRadius: '22px',
              padding: '22px 24px',
              boxShadow: '0 8px 24px rgba(90, 60, 20, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#6D5545', fontSize: '0.9rem', fontWeight: 600 }}>ការឆ្លើយតបសរុប</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(197, 154, 39, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users className="w-5 h-5 text-[#C59A27]" />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#381910', lineHeight: 1.1 }}>{totalResponses}</div>
            <span style={{ fontSize: '0.82rem', color: '#8A6820', marginTop: '6px', display: 'block' }}>ភ្ញៀវបានឆ្លើយតបតាមកម្មវិធី</span>
          </div>

          {/* Card 2: Confirmed Attending */}
          <div
            style={{
              background: '#FFFDF9',
              border: '1.5px solid rgba(46, 125, 50, 0.3)',
              borderRadius: '22px',
              padding: '22px 24px',
              boxShadow: '0 8px 24px rgba(46, 125, 50, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#2E7D32', fontSize: '0.9rem', fontWeight: 600 }}>បញ្ជាក់ចូលរួម</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(46, 125, 50, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#2E7D32', lineHeight: 1.1 }}>
              {attendingCount}{' '}
              <span style={{ fontSize: '1rem', color: '#66BB6A', fontWeight: 600 }}>({totalGuestHeads} នាក់)</span>
            </div>
            <span style={{ fontSize: '0.82rem', color: '#388E3C', marginTop: '6px', display: 'block' }}>ចំនួនកៅអី / ចានអាហារប៉ាន់ស្មាន</span>
          </div>

          {/* Card 3: Regrets */}
          <div
            style={{
              background: '#FFFDF9',
              border: '1.5px solid rgba(198, 40, 40, 0.3)',
              borderRadius: '22px',
              padding: '22px 24px',
              boxShadow: '0 8px 24px rgba(198, 40, 40, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#C62828', fontSize: '0.9rem', fontWeight: 600 }}>អធ្យាស្រ័យ</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(198, 40, 40, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <XCircle className="w-5 h-5 text-[#C62828]" />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#C62828', lineHeight: 1.1 }}>{regretCount}</div>
            <span style={{ fontSize: '0.82rem', color: '#D32F2F', marginTop: '6px', display: 'block' }}>មិនបានចូលរួម</span>
          </div>

          {/* Card 4: Total Wishes */}
          <div
            style={{
              background: '#FFFDF9',
              border: '1.5px solid rgba(197, 154, 39, 0.35)',
              borderRadius: '22px',
              padding: '22px 24px',
              boxShadow: '0 8px 24px rgba(90, 60, 20, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#AD1457', fontSize: '0.9rem', fontWeight: 600 }}>សារជូនពរ</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(173, 20, 87, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart className="w-5 h-5 text-[#AD1457]" />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#AD1457', lineHeight: 1.1 }}>{wishes.length}</div>
            <span style={{ fontSize: '0.82rem', color: '#C2185B', marginTop: '6px', display: 'block' }}>សារលើក្តារជូនពរ</span>
          </div>
        </div>

        {/* Generator Section: Personalized Guest Link */}
        <div
          style={{
            background: '#FFFDF9',
            border: '1.5px solid rgba(197, 154, 39, 0.35)',
            borderRadius: '24px',
            padding: '28px',
            marginBottom: '32px',
            boxShadow: '0 10px 30px rgba(90, 60, 20, 0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(197, 154, 39, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles className="w-4 h-4 text-[#C59A27]" />
            </div>
            <h2 className="font-moul" style={{ fontSize: '1.15rem', color: '#381910', margin: 0 }}>
              បង្កើតតំណភ្ជាប់ផ្ទាល់ខ្លួនសម្រាប់ភ្ញៀវម្នាក់ៗ
            </h2>
          </div>

          <form
            onSubmit={handleGenerateLink}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(140px, 180px) 1fr auto',
              gap: '14px',
              alignItems: 'end',
              marginBottom: generatedLink ? '20px' : 0
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#6D5545', fontWeight: 600, marginBottom: '6px' }}>
                ងារ / ឋានន្តរស័ក្តិ
              </label>
              <select
                value={guestTitle}
                onChange={(e) => setGuestTitle(e.target.value)}
                style={{
                  width: '100%',
                  height: '46px',
                  padding: '0 14px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(197, 154, 39, 0.4)',
                  background: '#FAF7F2',
                  color: '#381910',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  outline: 'none'
                }}
              >
                <option value="ឯកឧត្តម">ឯកឧត្តម</option>
                <option value="លោកជំទាវ">លោកជំទាវ</option>
                <option value="លោក">លោក</option>
                <option value="លោកស្រី">លោកស្រី</option>
                <option value="អ្នកនាង">អ្នកនាង</option>
                <option value="កញ្ញា">កញ្ញា</option>
                <option value="លោកពូ">លោកពូ</option>
                <option value="អ្នកមីង">អ្នកមីង</option>
                <option value="">គ្មាន</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#6D5545', fontWeight: 600, marginBottom: '6px' }}>
                ឈ្មោះភ្ញៀវកិត្តិយស *
              </label>
              <input
                type="text"
                placeholder="ឧ. សុខ ចាន់ថា និងភរិយា"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: '46px',
                  padding: '0 16px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(197, 154, 39, 0.4)',
                  background: '#FAF7F2',
                  color: '#381910',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <button
                type="submit"
                style={{
                  height: '46px',
                  padding: '0 24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #E2BC65 0%, #C49830 50%, #A2761B 100%)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(160, 116, 34, 0.25)',
                  whiteSpace: 'nowrap'
                }}
              >
                <UserPlus className="w-4 h-4" />
                <span>បង្កើតតំណភ្ជាប់</span>
              </button>
            </div>
          </form>

          {/* Generated Result Box */}
          {generatedLink && (
            <div
              style={{
                background: '#FAF7F2',
                border: '1.5px solid rgba(197, 154, 39, 0.45)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div style={{ flex: 1, minWidth: '260px', wordBreak: 'break-all' }}>
                <span style={{ fontSize: '0.82rem', color: '#8A6820', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  តំណភ្ជាប់ផ្ទាល់ខ្លួន (រួចរាល់សម្រាប់ផ្ញើជូនភ្ញៀវ)៖
                </span>
                <code style={{ color: '#381910', fontSize: '0.92rem', background: '#FFFDF9', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(197, 154, 39, 0.25)', display: 'inline-block' }}>
                  {generatedLink}
                </code>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleCopyGenerated}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: copiedLink ? '1.5px solid #2E7D32' : '1.5px solid #C59A27',
                    background: copiedLink ? '#2E7D32' : '#FFFDF9',
                    color: copiedLink ? '#FFFFFF' : '#381910',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {copiedLink ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5 text-[#C59A27]" />}
                  <span>{copiedLink ? 'បានចម្លង!' : 'ចម្លង Link'}</span>
                </button>

                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: '1.5px solid #C59A27',
                    background: '#FFFDF9',
                    color: '#381910',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-1.5 text-[#C59A27]" />
                  <span>បើកមើលសាកល្បង</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* RSVP Table Section */}
        <div
          style={{
            background: '#FFFDF9',
            border: '1.5px solid rgba(197, 154, 39, 0.35)',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(90, 60, 20, 0.06)'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '22px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(197, 154, 39, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users className="w-4 h-4 text-[#C59A27]" />
              </div>
              <h2 className="font-moul" style={{ fontSize: '1.15rem', color: '#381910', margin: 0 }}>
                បញ្ជីភ្ញៀវឆ្លើយតបការចូលរួម ({filteredRsvps.length})
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Search Box */}
              <div style={{ position: 'relative', minWidth: '220px' }}>
                <Search
                  className="w-4 h-4 text-[#A07422]"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="text"
                  placeholder="ស្វែងរកតាមឈ្មោះ / លេខ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    paddingLeft: '36px',
                    paddingRight: '12px',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(197, 154, 39, 0.35)',
                    background: '#FAF7F2',
                    color: '#381910',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                style={{
                  height: '40px',
                  padding: '0 12px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(197, 154, 39, 0.35)',
                  background: '#FAF7F2',
                  color: '#381910',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  outline: 'none'
                }}
              >
                <option value="all">ទាំងអស់</option>
                <option value="attending">ចូលរួម</option>
                <option value="regret">អធ្យាស្រ័យ</option>
              </select>

              {/* Export Button */}
              <button
                onClick={handleExportCsv}
                style={{
                  height: '40px',
                  padding: '0 18px',
                  borderRadius: '10px',
                  border: '1.5px solid #C59A27',
                  background: '#FFFDF9',
                  color: '#381910',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(100, 70, 20, 0.06)'
                }}
              >
                <Download className="w-4 h-4 text-[#C59A27]" />
                <span>ទាញយក Excel (CSV)</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid rgba(197, 154, 39, 0.25)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#FAF7F2', borderBottom: '1.5px solid rgba(197, 154, 39, 0.3)', color: '#6D4C3D' }}>
                  <th style={{ padding: '14px 12px', fontWeight: 700 }}>#</th>
                  <th style={{ padding: '14px 12px', fontWeight: 700 }}>ឈ្មោះភ្ញៀវ</th>
                  <th style={{ padding: '14px 12px', fontWeight: 700 }}>លេខទូរស័ព្ទ</th>
                  <th style={{ padding: '14px 12px', fontWeight: 700 }}>ស្ថានភាព</th>
                  <th style={{ padding: '14px 12px', fontWeight: 700 }}>ចំនួនភ្ញៀវ</th>
                  <th style={{ padding: '14px 12px', fontWeight: 700 }}>សារជូនពរ</th>
                  <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: 700 }}>សកម្មភាព</th>
                </tr>
              </thead>
              <tbody>
                {filteredRsvps.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#8C7364' }}>
                      ពុំមានទិន្នន័យឆ្លើយតបឡើយ។
                    </td>
                  </tr>
                ) : (
                  filteredRsvps.map((record, index) => (
                    <tr
                      key={record.id}
                      style={{
                        borderBottom: '1px solid rgba(197, 154, 39, 0.12)',
                        background: index % 2 === 0 ? '#FFFDF9' : '#FAF8F5'
                      }}
                    >
                      <td style={{ padding: '14px 12px', color: '#8C7364' }}>{index + 1}</td>
                      <td style={{ padding: '14px 12px', fontWeight: 700, color: '#381910' }}>{record.name}</td>
                      <td style={{ padding: '14px 12px', color: '#6D5545' }}>{record.phone || '—'}</td>
                      <td style={{ padding: '14px 12px' }}>
                        {record.attendance === 'attending' ? (
                          <span
                            style={{
                              background: 'rgba(46, 125, 50, 0.12)',
                              color: '#2E7D32',
                              border: '1px solid rgba(46, 125, 50, 0.35)',
                              padding: '4px 12px',
                              borderRadius: '999px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              display: 'inline-block'
                            }}
                          >
                            ចូលរួម
                          </span>
                        ) : (
                          <span
                            style={{
                              background: 'rgba(198, 40, 40, 0.1)',
                              color: '#C62828',
                              border: '1px solid rgba(198, 40, 40, 0.3)',
                              padding: '4px 12px',
                              borderRadius: '999px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              display: 'inline-block'
                            }}
                          >
                            អធ្យាស្រ័យ
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '14px 12px', fontWeight: 700, color: '#381910' }}>
                        {record.attendance === 'attending' ? `${record.guestCount} នាក់` : '—'}
                      </td>
                      <td style={{ padding: '14px 12px', maxWidth: '320px', fontSize: '0.84rem', color: '#5C4A3E', lineHeight: 1.5 }}>
                        {record.message || '—'}
                      </td>
                      <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleDeleteRsvp(record.id)}
                          style={{
                            background: 'rgba(198, 40, 40, 0.08)',
                            border: '1px solid rgba(198, 40, 40, 0.2)',
                            borderRadius: '8px',
                            color: '#C62828',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            transition: 'all 0.2s'
                          }}
                          title="លុប"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
