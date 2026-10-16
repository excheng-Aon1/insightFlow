// ==============================================================================
// File: src/components/CuteCatAnnouncementBoard.jsx
// Description: ป้ายประกาศน้องแมวส้มใช้งานได้จริง 100% (Real-World Cute Cat Announcement Board)
//              - จัดการประกาศได้จริง: เพิ่ม, แก้ไข, ลบ, ปักหมุด, ซ่อน/แสดง
//              - บันทึกข้อมูลลง LocalStorage อัตโนมัติ ไม่หายเมื่อรีเฟรชหน้าเว็บ
//              - แอนิเมชันน้องแมวส้ม 3D ดุ๊กดิ๊ก เปลี่ยนท่าทางตามอารมณ์ประกาศ (ถือโทรโข่ง, โบกอุ้งเท้า, ตาหยีเคลิ้ม, ตาโตเตือนภัย)
//              - ระบบเสียงสังเคราะห์ Web Audio API เหมียวกุ๊งกิ๊ง ปิด-เปิดเสียงได้
//              - ปุ่มลิงก์เชื่อมต่อตรงไปยังหน้าจอต่างๆ ของ InsightFlow ได้จริง
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'insightflow_cat_announcements_v2';
const SOUND_KEY = 'insightflow_cat_sound_enabled';

// ==============================================================================
// REALISTIC SWEET FELINE VOCAL SYNTHESIZER (Web Audio API - 100% Zero External Files)
// Simulates feline vocal tract: glottal folds (triangle/sawtooth wave), 
// resonant formant filter (mouth opening 'M-Y-A-O-W'), and purring vibrato/tremolo (22-26Hz LFO).
// ==============================================================================
let sharedCatAudioCtx = null;

const getSharedCatAudioCtx = () => {
  try {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedCatAudioCtx || sharedCatAudioCtx.state === 'closed') {
      sharedCatAudioCtx = new AudioCtx();
    }
    if (sharedCatAudioCtx.state === 'suspended') {
      sharedCatAudioCtx.resume().catch(() => {});
    }
    return sharedCatAudioCtx;
  } catch {
    return null;
  }
};

// Subtle bell chime for announcement slide navigation
const playMeowChime = () => {
  try {
    const ctx = getSharedCatAudioCtx();
    if (!ctx) return;
    const t0 = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(620, t0);
    osc1.frequency.exponentialRampToValueAtTime(780, t0 + 0.12);

    gain1.gain.setValueAtTime(0.08, t0);
    gain1.gain.exponentialRampToValueAtTime(0.001, t0 + 0.32);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(t0);
    osc1.stop(t0 + 0.32);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(980, t0 + 0.09);
    osc2.frequency.exponentialRampToValueAtTime(1180, t0 + 0.22);

    gain2.gain.setValueAtTime(0.06, t0 + 0.09);
    gain2.gain.exponentialRampToValueAtTime(0.001, t0 + 0.35);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t0 + 0.09);
    osc2.stop(t0 + 0.35);
  } catch (err) {
    // Audio fallback
  }
};

// Ultra-cute realistic affectionate feline vocalization ("เสียงแมวร้องอ้อนๆ น้วยๆ")
const playAffectionateMeowSound = (variantIndex) => {
  try {
    const ctx = getSharedCatAudioCtx();
    if (!ctx) return;
    const t0 = ctx.currentTime;

    // 3 distinct affectionate vocal styles
    const variations = [
      {
        // 1. "มยาาา~วว" (Classic sweet affectionate meow with throat purr)
        startF: 440,
        peakF: 840,
        endF: 470,
        duration: 0.68,
        purrRate: 24,
        purrDepth: 18,
        filterStart: 520,
        filterPeak: 1600,
        filterEnd: 620,
        gain: 0.22
      },
      {
        // 2. "มิ้วว~วว ✨" (Playful kitten chirrup-meow with rising inflection)
        startF: 520,
        peakF: 960,
        endF: 540,
        duration: 0.54,
        purrRate: 26,
        purrDepth: 14,
        filterStart: 620,
        filterPeak: 1850,
        filterEnd: 720,
        gain: 0.2
      },
      {
        // 3. "ง่าวว~ น้วยๆ ครืดๆ" (Deep affectionate purr-meow with laryngeal vibration)
        startF: 400,
        peakF: 760,
        endF: 430,
        duration: 0.74,
        purrRate: 22,
        purrDepth: 24,
        filterStart: 460,
        filterPeak: 1420,
        filterEnd: 560,
        gain: 0.24
      }
    ];

    const idx =
      typeof variantIndex === 'number'
        ? variantIndex % variations.length
        : Math.floor(Math.random() * variations.length);
    const p = variations[idx];

    // Master volume envelope for natural feline vocal attack & release
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, t0);
    masterGain.gain.exponentialRampToValueAtTime(p.gain, t0 + 0.05); // soft onset
    masterGain.gain.setValueAtTime(p.gain * 0.95, t0 + p.duration * 0.45);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, t0 + p.duration); // smooth tail fade

    // LFO (Low-Frequency Oscillator): Feline purring flutter / laryngeal vibration
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(p.purrRate, t0);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(p.purrDepth, t0);
    lfoGain.gain.linearRampToValueAtTime(p.purrDepth * 0.5, t0 + p.duration);
    lfo.connect(lfoGain);

    // Primary Voice Carrier: Warm glottal wave
    const voiceOsc = ctx.createOscillator();
    voiceOsc.type = 'triangle';
    const peakTime = t0 + p.duration * 0.36;
    voiceOsc.frequency.setValueAtTime(p.startF, t0);
    voiceOsc.frequency.exponentialRampToValueAtTime(p.peakF, peakTime);
    voiceOsc.frequency.exponentialRampToValueAtTime(p.endF, t0 + p.duration);
    lfoGain.connect(voiceOsc.frequency);

    // Secondary Harmonic: Subtle throat texture
    const harmOsc = ctx.createOscillator();
    harmOsc.type = 'sawtooth';
    const harmGain = ctx.createGain();
    harmGain.gain.setValueAtTime(0.022, t0);
    harmGain.gain.exponentialRampToValueAtTime(0.0001, t0 + p.duration);
    harmOsc.frequency.setValueAtTime(p.startF * 1.5, t0);
    harmOsc.frequency.exponentialRampToValueAtTime(p.peakF * 1.5, peakTime);
    harmOsc.frequency.exponentialRampToValueAtTime(p.endF * 1.5, t0 + p.duration);
    lfoGain.connect(harmOsc.frequency);
    harmOsc.connect(harmGain);

    // Formant Acoustic Filter (Cat vocal tract & mouth shape dynamics)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(3.2, t0);
    filter.frequency.setValueAtTime(p.filterStart, t0);
    filter.frequency.exponentialRampToValueAtTime(p.filterPeak, peakTime);
    filter.frequency.exponentialRampToValueAtTime(p.filterEnd, t0 + p.duration);

    // Sub-purr vibration (Gentle rumbling purr in chest)
    const purrOsc = ctx.createOscillator();
    purrOsc.type = 'triangle';
    purrOsc.frequency.setValueAtTime(88, t0);
    const purrGain = ctx.createGain();
    purrGain.gain.setValueAtTime(0.035, t0);
    purrGain.gain.exponentialRampToValueAtTime(0.0001, t0 + p.duration * 0.85);
    purrOsc.connect(purrGain);

    // Audio Graph Wiring
    voiceOsc.connect(filter);
    harmGain.connect(filter);
    filter.connect(masterGain);
    purrGain.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Trigger synthesis
    lfo.start(t0);
    voiceOsc.start(t0);
    harmOsc.start(t0);
    purrOsc.start(t0);

    const stopTime = t0 + p.duration + 0.05;
    lfo.stop(stopTime);
    voiceOsc.stop(stopTime);
    harmOsc.stop(stopTime);
    purrOsc.stop(stopTime);
  } catch (err) {
    // Audio context error fallback silently
  }
};

// ==============================================================================
// AUTHENTIC REAL RECORDED CAT SOUNDS ("เสียงแมวจริงๆ ร้องอ้อน")
// Recorded from real pleading domestic cats, clean-cut with smooth fade-in/out
// ==============================================================================
const REAL_CAT_SOUND_SOURCES = [
  { wav: '/sounds/cat-real-meow-1.wav', m4a: '/sounds/cat-real-meow-1.m4a' },
  { wav: '/sounds/cat-real-meow-2.wav', m4a: '/sounds/cat-real-meow-2.m4a' },
  { wav: '/sounds/cat-real-meow-3.wav', m4a: '/sounds/cat-real-meow-3.m4a' }
];

// Preloaded Audio Objects cache for instant, zero-latency playback on click
let preloadedCatAudios = null;

const getPreloadedCatAudios = () => {
  if (typeof window === 'undefined') return [];
  if (!preloadedCatAudios) {
    preloadedCatAudios = REAL_CAT_SOUND_SOURCES.map((src) => {
      try {
        const audio = new Audio();
        // Support WAV or M4A based on browser capabilities
        const canPlayM4A = audio.canPlayType('audio/x-m4a') || audio.canPlayType('audio/mp4');
        audio.src = canPlayM4A ? src.m4a : src.wav;
        audio.preload = 'auto';
        audio.volume = 0.95;
        return audio;
      } catch {
        return null;
      }
    });
  }
  return preloadedCatAudios;
};

// Play authentic real cat voice recording with synthesizer fallback
const playRealCatMeow = (variantIndex) => {
  try {
    const audios = getPreloadedCatAudios();
    const idx =
      typeof variantIndex === 'number'
        ? variantIndex % REAL_CAT_SOUND_SOURCES.length
        : Math.floor(Math.random() * REAL_CAT_SOUND_SOURCES.length);

    const audio = audios[idx];
    if (audio) {
      // Clone audio node or reset currentTime to allow rapid consecutive clicks
      try {
        const playInstance = audio.cloneNode();
        playInstance.volume = 0.95;
        const promise = playInstance.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // If cloning blocked, try original instance
            audio.currentTime = 0;
            audio.play().catch(() => {
              playAffectionateMeowSound(idx);
            });
          });
        }
        return;
      } catch {
        audio.currentTime = 0;
        audio.play().catch(() => playAffectionateMeowSound(idx));
        return;
      }
    }
    // Fallback to synthesizer
    playAffectionateMeowSound(variantIndex);
  } catch (err) {
    playAffectionateMeowSound(variantIndex);
  }
};

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    active: true,
    pinned: true,
    tag: '⚡ อัปเดตใหญ่',
    tagColor: 'from-amber-400 to-amber-500 text-slate-950',
    title: 'เปิดตัวท่อส่งข้อมูลอัตโนมัติ (ETL Pipeline) & PostgreSQL Warehouse',
    desc: 'เชื่อมต่อและรวมยอดขายจาก POS หน้าร้าน, Facebook Ads, TikTok Shop และ Google Sheets ได้ในคลิกเดียว พร้อมระบบคัดกรองข้อมูลซ้ำซ้อนอัตโนมัติ เหมียว~',
    actionText: 'เปิดดูท่อข้อมูล ETL',
    targetTab: 'database',
    catMood: 'proud',
    createdAt: '2026-10-16 08:00'
  },
  {
    id: 'ann-2',
    active: true,
    pinned: false,
    tag: '🤖 ปัญญาประดิษฐ์',
    tagColor: 'from-sky-400 to-blue-500 text-slate-950',
    title: 'ผู้ช่วย AI วิเคราะห์ยอดขาย (Text-to-SQL) & What-If Simulation',
    desc: 'พิมพ์ถามคำถามธุรกิจเป็นภาษาคน เช่น "เดือนนี้สินค้าตัวไหนทำกำไรสูงสุด?" ระบบจะตอบพร้อมสร้างตารางและกราฟให้ทันทีค้าบ!',
    actionText: 'ลองคุยกับ AI',
    targetTab: 'insights',
    catMood: 'waving',
    createdAt: '2026-10-16 08:30'
  },
  {
    id: 'ann-3',
    active: true,
    pinned: false,
    tag: '🛡️ มาตรฐานองค์กร',
    tagColor: 'from-emerald-400 to-teal-500 text-slate-950',
    title: 'ระบบควบคุมสิทธิ์ RBAC & ด่านกักกันข้อมูลขยะ (Data Quality Firewall)',
    desc: 'แยกสิทธิ์เจ้าของร้าน vs ผู้จัดการ vs แคชเชียร์ ป้องกันข้อมูลรั่วไหล 100% พร้อมตรวจจับราคายอดขายติดลบก่อนเข้ากราฟ',
    actionText: 'ดูระบบความปลอดภัย',
    targetTab: 'database',
    catMood: 'alert',
    createdAt: '2026-10-16 09:00'
  },
  {
    id: 'ann-4',
    active: true,
    pinned: false,
    tag: '🔔 แจ้งเตือนอัตโนมัติ',
    tagColor: 'from-purple-400 to-pink-500 text-white',
    title: 'ระบบสรุปยอดขายส่งตรงเข้ามือถือ/LINE ทุกคืน 22:00 น.',
    desc: 'ไม่ต้องเปิดหน้าจอทั้งวัน ระบบจะสรุปรายรับ กำไรสุทธิ และสินค้าขายดีส่งเข้าไลน์ให้คุณทันทีทุกคืน ไม่พลาดทุกความเคลื่อนไหว เหมียว~',
    actionText: 'ดูเปรียบเทียบสาขา',
    targetTab: 'multi_channel',
    catMood: 'happy',
    createdAt: '2026-10-16 09:30'
  }
];

export default function CuteCatAnnouncementBoard({
  isEn = false,
  onNavigateTab,
  onOpenPricing,
  className = ''
}) {
  const tx = (th, en) => (isEn ? en : th);

  // ----------------------------------------------------------------------------
  // 1. STATE PERSISTENCE (LocalStorage)
  // ----------------------------------------------------------------------------
  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load announcements from storage', e);
    }
    return DEFAULT_ANNOUNCEMENTS;
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem(SOUND_KEY) !== 'false';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
    } catch (e) {
      console.error('Failed to save announcements', e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(SOUND_KEY, String(soundEnabled));
    } catch (e) {
      // silent
    }
  }, [soundEnabled]);

  // Preload authentic cat audio clips on first render
  useEffect(() => {
    getPreloadedCatAudios();
  }, []);

  // Active items currently published
  const activeAnnouncements = announcements.filter((a) => a.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [petHearts, setPetHearts] = useState([]);
  const [catSpeech, setCatSpeech] = useState(null);
  const [isWiggling, setIsWiggling] = useState(false);
  const [isPetting, setIsPetting] = useState(false);
  const [petCount, setPetCount] = useState(0);

  // ----------------------------------------------------------------------------
  // 2. MANAGEMENT MODAL STATE
  // ----------------------------------------------------------------------------
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('list'); // 'list' | 'form'
  const [editingId, setEditingId] = useState(null);

  // Form Fields for New / Edit Announcement
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formTag, setFormTag] = useState('📢 ข่าวสารร้านค้า');
  const [formTagColor, setFormTagColor] = useState('from-amber-400 to-amber-500 text-slate-950');
  const [formActionText, setFormActionText] = useState('ดูรายละเอียด');
  const [formTargetTab, setFormTargetTab] = useState('overview');
  const [formCatMood, setFormCatMood] = useState('proud');

  const autoPlayRef = useRef(null);
  const safeIndex =
    activeAnnouncements.length > 0
      ? Math.min(currentIndex, activeAnnouncements.length - 1)
      : 0;
  const currentItem = activeAnnouncements[safeIndex] || DEFAULT_ANNOUNCEMENTS[0];

  // Auto-play announcement slide every 7 seconds
  useEffect(() => {
    if (isPaused || isMinimized || activeAnnouncements.length <= 1) return;
    autoPlayRef.current = setInterval(() => {
      handleNextSlide();
    }, 7000);
    return () => clearInterval(autoPlayRef.current);
  }, [currentIndex, isPaused, isMinimized, activeAnnouncements.length]);

  const handleNextSlide = () => {
    if (activeAnnouncements.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
    triggerCatBounce();
    if (soundEnabled) playMeowChime();
  };

  const handlePrevSlide = () => {
    if (activeAnnouncements.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length
    );
    triggerCatBounce();
    if (soundEnabled) playMeowChime();
  };

  const triggerCatBounce = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
  };

  // Pet the cat interaction: authentic real cat meow voice & purr animation
  const handlePetCat = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setIsPetting(true);
    triggerCatBounce();
    setTimeout(() => setIsPetting(false), 700);

    const nextCount = petCount + 1;
    setPetCount(nextCount);

    // Play authentic real recorded cat voice (with synthesized fallback)
    if (soundEnabled) {
      playRealCatMeow(nextCount % 3);
    }

    // Spawn floating cute particles (Hearts, Cat Paws, Sparkles, Flowers)
    const particlePool = ['💖', '🐾', '✨', '🌸', '😻'];
    const chosenParticle = particlePool[Math.floor(Math.random() * particlePool.length)];
    const newHeart = {
      id: Date.now() + Math.random(),
      symbol: chosenParticle,
      x: 25 + Math.random() * 50,
      y: 8 + Math.random() * 22
    };
    setPetHearts((prev) => [...prev.slice(-5), newHeart]);
    setTimeout(() => {
      setPetHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    const meowQuotes = [
      tx('เหมียววว~ นุดลูบหัวเค้าแล้ว! อ้อนๆ น้วยๆ 🐾✨', 'Myaaaooow~ Thanks for petting me, hooman! So cuddly 🐾✨'),
      tx('มยาาา~ว ชื่นใจจังเลยนุด เกาคางเค้าอีกทีน้าา 💖', 'Purrrrr~ That scratches the itch, hooman! More chin scritches please 💖'),
      tx('มิ้วว~ นุดน่ารักที่สุด! ขอให้ร้านค้ายอดขายปังๆ กำไรทะลุเป้านะค้าบ 🐱💵', 'Mewww~ Wishing your store record-breaking sales & explosive revenue! 🐱💵'),
      tx('ง่าววว~ (ทำเสียงเพอร์รี่ครืดๆ อ้อนอยู่ในลำคออย่างมีความสุข) 😻✨', 'Mrrrr-meow~ (Happy deep purring vibration in chest) 😻✨'),
      tx('ป้ายประกาศนี้ใช้งานได้จริง เพิ่ม/แก้ข่าวสารของร้านได้เลยนะนุด! 📢🐾', 'This notice board is 100% real! You can edit any store announcement! 📢🐾'),
      tx('เค้าคอยเฝ้าประกาศและยอดขายให้ตลอด 24 ชม. เลยนะงับ! 🛡️🧡', 'Guarding this announcement board & sales 24/7 for you! 🛡️🧡')
    ];
    const quote = meowQuotes[Math.floor(Math.random() * meowQuotes.length)];
    setCatSpeech(quote);

    setTimeout(() => {
      setCatSpeech(null);
    }, 3600);
  };

  const handleActionClick = () => {
    if (currentItem.targetTab && typeof onNavigateTab === 'function') {
      onNavigateTab(currentItem.targetTab);
    } else if (typeof onOpenPricing === 'function') {
      onOpenPricing();
    }
  };

  // ----------------------------------------------------------------------------
  // CRUD Actions for Announcements
  // ----------------------------------------------------------------------------
  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormTitle('');
    setFormDesc('');
    setFormTag('📢 ข่าวสารร้านค้า');
    setFormTagColor('from-amber-400 to-amber-500 text-slate-950');
    setFormActionText('ดูรายละเอียด');
    setFormTargetTab('overview');
    setFormCatMood('proud');
    setActiveModalTab('form');
    setIsManageModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormDesc(item.desc);
    setFormTag(item.tag);
    setFormTagColor(item.tagColor || 'from-amber-400 to-amber-500 text-slate-950');
    setFormActionText(item.actionText || 'ดูรายละเอียด');
    setFormTargetTab(item.targetTab || 'overview');
    setFormCatMood(item.catMood || 'proud');
    setActiveModalTab('form');
    setIsManageModalOpen(true);
  };

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingId) {
      // Edit existing
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: formTitle.trim(),
                desc: formDesc.trim(),
                tag: formTag,
                tagColor: formTagColor,
                actionText: formActionText.trim() || 'ดูรายละเอียด',
                targetTab: formTargetTab,
                catMood: formCatMood
              }
            : item
        )
      );
    } else {
      // Create new
      const newItem = {
        id: 'ann-' + Date.now(),
        active: true,
        pinned: false,
        title: formTitle.trim(),
        desc: formDesc.trim(),
        tag: formTag,
        tagColor: formTagColor,
        actionText: formActionText.trim() || 'ดูรายละเอียด',
        targetTab: formTargetTab,
        catMood: formCatMood,
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      };
      setAnnouncements((prev) => [newItem, ...prev]);
      setCurrentIndex(0);
    }

    if (soundEnabled) playRealCatMeow(1);
    setIsManageModalOpen(false);
    triggerCatBounce();
  };

  const handleDeleteAnnouncement = (id) => {
    if (confirm(tx('คุณต้องการลบประกาศนี้ใช่หรือไม่?', 'Delete this announcement?'))) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      if (currentIndex > 0) setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleToggleActive = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const handleTogglePin = (id) => {
    setAnnouncements((prev) => {
      const target = prev.find((a) => a.id === id);
      if (!target) return prev;
      const otherItems = prev.filter((a) => a.id !== id);
      const isPinned = !target.pinned;
      const updated = { ...target, pinned: isPinned };
      return isPinned ? [updated, ...otherItems] : [...otherItems, updated];
    });
    setCurrentIndex(0);
  };

  const handleResetToDefault = () => {
    if (confirm(tx('ต้องการรีเซ็ตประกาศทั้งหมดกลับสู่ค่าเริ่มต้นของระบบใช่หรือไม่?', 'Reset all announcements to system defaults?'))) {
      setAnnouncements(DEFAULT_ANNOUNCEMENTS);
      setCurrentIndex(0);
      setIsManageModalOpen(false);
    }
  };

  // Sample quick templates for shop owners
  const handleApplyPreset = (type) => {
    if (type === 'promo') {
      setFormTitle('🔥 โปรโมชั่นพิเศษ: ลดทันที 20% เมื่อสั่งซื้อครบ 500 บาท!');
      setFormDesc('ใช้คูปองส่วนลดหน้าร้านได้ทุกสาขาถึงสิ้นเดือนนี้ เพื่อเร่งยอดขายและขยายฐานลูกค้าใหม่ เหมียว~');
      setFormTag('🔥 โปรโมชั่นด่วน');
      setFormTagColor('from-rose-500 to-orange-500 text-white');
      setFormActionText('ดูหน้าร้านสด POS');
      setFormTargetTab('staff_pos');
      setFormCatMood('happy');
    } else if (type === 'stock') {
      setFormTitle('📦 แจ้งเตือนคลังสินค้า: สินค้าขายดี 3 รายการใกล้หมดสต็อก!');
      setFormDesc('ระบบตรวจพบสต็อกเหลือน้อยกว่าจุดสั่งซื้อขั้นต่ำ แนะนำกดยืนยันใบสั่งซื้อรวมศูนย์เพื่อรับส่วนลดทันที');
      setFormTag('📦 แจ้งเตือนสต็อก');
      setFormTagColor('from-amber-400 to-amber-500 text-slate-950');
      setFormActionText('ไปที่คลังสินค้า');
      setFormTargetTab('inventory');
      setFormCatMood('alert');
    } else if (type === 'sales') {
      setFormTitle('🎉 ยอดขายทะลุเป้า! วันนี้ทำสถิติสูงสุด ฿125,000 บาท');
      setFormDesc('สาขาสุขุมวิทและช่องทางออนไลน์มียอดสั่งซื้อเติบโต +42% ระบบได้ส่งสรุปรายงานเข้า LINE เรียบร้อยแล้ว');
      setFormTag('🎉 ยอดขายทะลุเป้า');
      setFormTagColor('from-emerald-400 to-teal-500 text-slate-950');
      setFormActionText('ดูภาพรวมธุรกิจ');
      setFormTargetTab('overview');
      setFormCatMood('proud');
    }
  };

  // ----------------------------------------------------------------------------
  // Render Minimized Floating Mascot Capsule
  // ----------------------------------------------------------------------------
  if (isMinimized) {
    return (
      <aside
        aria-label="Cute Cat Announcement Mascot"
        className={`relative z-30 transition-all duration-300 ${className}`}
      >
        <button
          type="button"
          onClick={() => {
            setIsMinimized(false);
            triggerCatBounce();
            if (soundEnabled) playRealCatMeow(0);
          }}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900/95 to-amber-400/20 border-2 border-amber-400/60 shadow-[0_10px_30px_rgba(251,191,36,0.35)] backdrop-blur-xl hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
          title={tx('คลิกเพื่อเปิดป้ายประกาศน้องแมวส้ม', 'Click to open Cute Cat Announcement Board')}
        >
          <span className="absolute -inset-1 rounded-2xl border border-amber-400/40 animate-ping pointer-events-none" />

          {/* Mini Cute Cat Head Avatar */}
          <div className="relative w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow">
              <defs>
                <linearGradient id="miniCatFur" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FDBA74" />
                  <stop offset="60%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
              </defs>
              <polygon points="20,40 32,15 48,32" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
              <polygon points="52,32 68,15 80,40" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
              <polygon points="26,38 34,22 44,32" fill="#FDA4AF" />
              <polygon points="56,32 66,22 74,38" fill="#FDA4AF" />
              <ellipse cx="50" cy="55" rx="35" ry="30" fill="url(#miniCatFur)" stroke="#7C2D12" strokeWidth="3.5" />
              <ellipse cx="36" cy="52" rx="6" ry="7" fill="#047857" />
              <ellipse cx="36" cy="52" rx="2.5" ry="6.5" fill="#0F172A" />
              <circle cx="34" cy="49" r="2.2" fill="#FFFFFF" />
              <ellipse cx="64" cy="52" rx="6" ry="7" fill="#047857" />
              <ellipse cx="64" cy="52" rx="2.5" ry="6.5" fill="#0F172A" />
              <circle cx="62" cy="49" r="2.2" fill="#FFFFFF" />
              <polygon points="50,62 46,58 54,58" fill="#FDA4AF" stroke="#7C2D12" strokeWidth="1" />
              <path d="M45 64 Q50 67 50 63 Q50 67 55 64" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="50" cy="84" r="5" fill="#FBBF24" stroke="#78350F" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                {tx('ป้ายประกาศน้องแมวส้ม', 'Cat Notice Board')}
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950">
                {activeAnnouncements.length}
              </span>
            </div>
            <p className="text-[11px] text-amber-200/90 font-bold truncate max-w-[200px]">
              📢 {currentItem?.title || tx('มีประกาศใหม่', 'New Notice')}
            </p>
          </div>

          <span className="text-xs text-amber-400 font-black ml-1 group-hover:translate-x-1 transition-transform">
            👉
          </span>
        </button>
      </aside>
    );
  }

  // ----------------------------------------------------------------------------
  // Render Full Luxury Functional Announcement Billboard
  // ----------------------------------------------------------------------------
  return (
    <>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-400/50 bg-gradient-to-r from-[#070d1e]/98 via-[#0b162f]/98 to-[#0a1124]/98 shadow-[0_18px_50px_-10px_rgba(251,191,36,0.28),0_0_20px_rgba(56,189,248,0.18)] text-white backdrop-blur-2xl transition-all duration-300 ${className}`}
      >
        {/* Top Gold Shimmer Neon Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-[0_0_12px_#fbbf24]" />

        {/* Moving Ambient Laser Beam */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="toast-laser-beam absolute -inset-y-8 w-28 bg-gradient-to-r from-transparent via-amber-300/15 to-transparent" />
        </div>

        <div className="relative p-3.5 sm:p-5 flex flex-col md:flex-row items-center md:items-stretch gap-4 sm:gap-6">
          {/* ==================================================================== */}
          {/* LEFT: 3D ANIMATED ORANGE CAT MASCOT WITH LIVELY MOODS */}
          {/* ==================================================================== */}
          <div
            onClick={handlePetCat}
            className="relative flex-shrink-0 flex flex-col items-center justify-center cursor-pointer select-none group"
            title={tx('คลิกลูบหัวน้องแมวส้ม หรือฟังเสียงประกาศได้นะ! 🐾', 'Click to pet the cat or hear meow!')}
          >
            {/* Floating Hearts Container */}
            {petHearts.map((h) => (
              <div
                key={h.id}
                className="absolute text-rose-400 font-black text-xl cute-heart-float z-30 select-none pointer-events-none"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                {h.symbol || '💖'}
              </div>
            ))}

            {/* Speech Bubble when Clicked */}
            {catSpeech && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs shadow-xl border-2 border-white animate-bounce z-40">
                {catSpeech}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rotate-45 border-r-2 border-b-2 border-white" />
              </div>
            )}

            {/* Cat SVG Illustration Container */}
            <div
              className={`relative w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-300 ${
                isPetting
                  ? 'cute-cat-petting'
                  : isWiggling
                  ? 'scale-110 rotate-3'
                  : 'group-hover:scale-105'
              }`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 to-yellow-300/20 blur-xl pointer-events-none" />

              <svg
                viewBox="0 0 160 160"
                className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
              >
                <defs>
                  <linearGradient id="boardFurDeep" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#EA580C" />
                    <stop offset="50%" stopColor="#C2410C" />
                    <stop offset="100%" stopColor="#9A3412" />
                  </linearGradient>

                  <linearGradient id="boardFurLight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FED7AA" />
                    <stop offset="40%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>

                  <linearGradient id="boardStripes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C2410C" />
                    <stop offset="100%" stopColor="#7C2D12" />
                  </linearGradient>

                  <linearGradient id="boardPink" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FDA4AF" />
                    <stop offset="100%" stopColor="#F43F5E" />
                  </linearGradient>

                  <linearGradient id="boardCream" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="100%" stopColor="#FEF3C7" />
                  </linearGradient>

                  <radialGradient id="boardCatEye" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#6EE7B7" />
                    <stop offset="45%" stopColor="#10B981" />
                    <stop offset="85%" stopColor="#047857" />
                    <stop offset="100%" stopColor="#064E3B" />
                  </radialGradient>

                  <linearGradient id="goldMegaphone" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="35%" stopColor="#FDE047" />
                    <stop offset="70%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#B45309" />
                  </linearGradient>
                </defs>

                {/* 1. Tail Swishing */}
                <g className="cute-cat-tail origin-[35px_110px]">
                  <path
                    d="M38 115 C20 105 10 75 22 55 C28 45 42 50 36 62 C30 74 32 92 46 108 Z"
                    fill="url(#boardFurDeep)"
                    stroke="#7C2D12"
                    strokeWidth="3"
                  />
                  <path d="M20 60 C25 56 32 58 30 66" stroke="url(#boardStripes)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M23 75 C29 70 36 74 34 82" stroke="url(#boardStripes)" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* 2. Chubby Cat Body */}
                <ellipse
                  cx="80"
                  cy="110"
                  rx="38"
                  ry="32"
                  fill="url(#boardFurLight)"
                  stroke="#7C2D12"
                  strokeWidth="3.5"
                />

                <path d="M52 95 C62 90 68 96 66 106" stroke="url(#boardStripes)" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M48 108 C58 104 64 110 62 118" stroke="url(#boardStripes)" strokeWidth="3.5" strokeLinecap="round" />

                <path
                  d="M72 88 C88 88 98 98 94 116 C90 128 74 134 66 126 C72 116 72 98 72 88 Z"
                  fill="url(#boardCream)"
                  opacity="0.95"
                />

                {/* Hind Paws */}
                <ellipse cx="50" cy="136" rx="11" ry="8" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="2.5" />
                <ellipse cx="110" cy="136" rx="11" ry="8" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="2.5" />
                <circle cx="50" cy="136" r="3.2" fill="url(#boardPink)" />
                <circle cx="110" cy="136" r="3.2" fill="url(#boardPink)" />

                {/* 3. Front Left Paw */}
                <ellipse cx="68" cy="132" rx="9" ry="14" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="2.5" />
                <circle cx="68" cy="138" r="3" fill="url(#boardPink)" />

                {/* 4. Front Right Paw (Waving Paw or Megaphone depending on Cat Mood) */}
                <g className="cute-cat-waving-paw origin-[100px_100px]">
                  <ellipse cx="106" cy="98" rx="8" ry="16" fill="url(#boardFurLight)" stroke="#7C2D12" strokeWidth="2.5" />
                  <ellipse cx="106" cy="85" rx="9" ry="7" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="2.5" />
                  <circle cx="106" cy="85" r="3" fill="url(#boardPink)" />

                  {/* 3D Golden Megaphone in Paw */}
                  {currentItem?.catMood === 'proud' ? (
                    <g transform="translate(108, 68) rotate(-15)">
                      <polygon points="12,12 36,4 36,24" fill="url(#goldMegaphone)" stroke="#78350F" strokeWidth="2" />
                      <ellipse cx="36" cy="14" rx="4" ry="10" fill="#FEF08A" stroke="#78350F" strokeWidth="1.8" />
                      <rect x="2" y="9" width="10" height="6" rx="2" fill="url(#goldMegaphone)" stroke="#78350F" strokeWidth="1.5" />
                      <path d="M6 15 L4 25 L8 25 Z" fill="#92400E" stroke="#78350F" strokeWidth="1.2" />
                      <path d="M42 6 C48 10 48 18 42 22" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
                      <path d="M48 2 C56 8 56 22 48 28" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
                    </g>
                  ) : (
                    /* Waving Paw with Gold Sparkle */
                    <path
                      d="M120 72 L122 68 L124 72 L128 74 L124 76 L122 80 L120 76 L116 74 Z"
                      fill="#FDE047"
                      className="animate-spin origin-[122px_74px]"
                    />
                  )}
                </g>

                {/* 5. Cat Head */}
                <polygon points="46,45 60,15 76,40" fill="url(#boardFurDeep)" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
                <polygon points="52,42 61,22 70,38" fill="url(#boardPink)" opacity="0.9" />
                <polygon points="86,40 102,15 116,45" fill="url(#boardFurDeep)" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
                <polygon points="92,38 101,22 110,42" fill="url(#boardPink)" opacity="0.9" />

                <ellipse cx="80" cy="58" rx="35" ry="30" fill="url(#boardFurLight)" stroke="#7C2D12" strokeWidth="3.5" />

                <path d="M72 32 L80 42 L88 32" stroke="url(#boardStripes)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <line x1="80" y1="30" x2="80" y2="40" stroke="url(#boardStripes)" strokeWidth="2.8" strokeLinecap="round" />

                <ellipse cx="56" cy="65" rx={isPetting ? "7.5" : "6"} ry={isPetting ? "5" : "4"} fill="#FB7185" opacity={isPetting ? "0.95" : "0.8"} />
                <ellipse cx="104" cy="65" rx={isPetting ? "7.5" : "6"} ry={isPetting ? "5" : "4"} fill="#FB7185" opacity={isPetting ? "0.95" : "0.8"} />

                {/* Almond Emerald Eyes (or Happy Squint if pet) */}
                {isPetting || catSpeech || currentItem?.catMood === 'happy' ? (
                  <g>
                    <path d="M60 54 Q66 48 72 54" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M88 54 Q94 48 100 54" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </g>
                ) : currentItem?.catMood === 'alert' ? (
                  <g>
                    <circle cx="66" cy="54" r="8" fill="#FFFFFF" stroke="#BE123C" strokeWidth="1.8" />
                    <circle cx="66" cy="54" r="3.5" fill="#0F172A" />
                    <circle cx="64" cy="51" r="1.6" fill="#FFFFFF" />

                    <circle cx="94" cy="54" r="8" fill="#FFFFFF" stroke="#BE123C" strokeWidth="1.8" />
                    <circle cx="94" cy="54" r="3.5" fill="#0F172A" />
                    <circle cx="92" cy="51" r="1.6" fill="#FFFFFF" />
                  </g>
                ) : (
                  <g>
                    <ellipse cx="66" cy="54" rx="7" ry="8" fill="url(#boardCatEye)" stroke="#064E3B" strokeWidth="1.8" />
                    <ellipse cx="66" cy="54" rx="2.8" ry="7.2" fill="#020617" />
                    <circle cx="64" cy="50" r="2.8" fill="#FFFFFF" />
                    <circle cx="68" cy="56" r="1.4" fill="#FFFFFF" />

                    <ellipse cx="94" cy="54" rx="7" ry="8" fill="url(#boardCatEye)" stroke="#064E3B" strokeWidth="1.8" />
                    <ellipse cx="94" cy="54" rx="2.8" ry="7.2" fill="#020617" />
                    <circle cx="92" cy="50" r="2.8" fill="#FFFFFF" />
                    <circle cx="96" cy="56" r="1.4" fill="#FFFFFF" />
                  </g>
                )}

                <ellipse cx="80" cy="68" rx="13" ry="9" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="1.5" />
                <polygon points="80,65 75,61 85,61" fill="url(#boardPink)" stroke="#7C2D12" strokeWidth="1" />
                <path d="M74 68 Q80 72 80 67 Q80 72 86 68" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                <line x1="62" y1="64" x2="30" y2="68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="62" y1="68" x2="28" y2="78" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="98" y1="64" x2="130" y2="68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="98" y1="68" x2="132" y2="78" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                {/* Emerald Green Collar with Golden Bell */}
                <g transform="translate(80, 84)">
                  <path d="M-16,-2 Q0,6 16,-2" stroke="#059669" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <circle cx="0" cy="5" r="5" fill="#FBBF24" stroke="#78350F" strokeWidth="1.6" />
                  <circle cx="0" cy="6.2" r="1.8" fill="#78350F" />
                </g>
              </svg>
            </div>

            <div className="mt-1 text-[10px] font-black text-amber-300 bg-black/40 px-2.5 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1">
              <span>🐾</span>
              <span>{tx('ลูบหัวน้องแมว', 'Pet Me!')}</span>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* CENTER & RIGHT: ANNOUNCEMENT CONTENT, SLIDER CONTROLS & MANAGEMENT */}
          {/* ==================================================================== */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Header Bar inside Announcement Board */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r shadow-sm flex items-center gap-1 ${
                    currentItem?.tagColor || 'from-amber-400 to-amber-500 text-slate-950'
                  }`}
                >
                  <span>{currentItem?.tag || tx('📢 ประกาศร้านค้า', '📢 Store Notice')}</span>
                </span>

                {currentItem?.pinned && (
                  <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                    📌 {tx('ปักหมุด', 'Pinned')}
                  </span>
                )}

                <span className="text-[11px] font-bold text-amber-300/90 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {tx(
                      `ประกาศที่ ${safeIndex + 1} จาก ${activeAnnouncements.length}`,
                      `Notice ${safeIndex + 1} of ${activeAnnouncements.length}`
                    )}
                  </span>
                </span>
              </div>

              {/* Top Controls: Sound, Manage, Prev, Next, Minimize */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    if (next) playRealCatMeow(0);
                  }}
                  className={`w-7 h-7 rounded-xl border text-xs font-black flex items-center justify-center transition active:scale-95 cursor-pointer ${
                    soundEnabled
                      ? 'bg-amber-500/25 text-amber-300 border-amber-400/50 shadow-[0_0_10px_rgba(251,191,36,0.35)]'
                      : 'bg-white/5 hover:bg-white/15 border-white/15 text-slate-400'
                  }`}
                  title={
                    soundEnabled
                      ? tx('ปิดเสียงร้องแมว', 'Mute Cat Sounds')
                      : tx('เปิดเสียงร้องแมวอ้อนๆ', 'Enable Affectionate Cat Sounds')
                  }
                >
                  {soundEnabled ? '🔔' : '🔕'}
                </button>

                {/* Real Management Button */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalTab('list');
                    setIsManageModalOpen(true);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-sky-500/20 to-blue-500/20 hover:from-sky-500/30 hover:to-blue-500/30 border border-sky-400/40 text-sky-300 text-xs font-black flex items-center gap-1 transition active:scale-95 cursor-pointer"
                  title={tx('จัดการป้ายประกาศ (เพิ่ม/แก้ไข/ลบประกาศจริง)', 'Manage Announcements (Add/Edit/Delete)')}
                >
                  <span>⚙️</span>
                  <span className="hidden sm:inline">{tx('จัดการประกาศ', 'Manage')}</span>
                </button>

                {/* Prev / Next Slider Controls */}
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  disabled={activeAnnouncements.length <= 1}
                  className="w-7 h-7 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-40 border border-white/15 text-slate-200 text-xs font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
                  title={tx('ประกาศก่อนหน้า', 'Previous notice')}
                >
                  ◀
                </button>

                <button
                  type="button"
                  onClick={handleNextSlide}
                  disabled={activeAnnouncements.length <= 1}
                  className="w-7 h-7 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-40 border border-white/15 text-slate-200 text-xs font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
                  title={tx('ประกาศถัดไป', 'Next notice')}
                >
                  ▶
                </button>

                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="w-7 h-7 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/15 text-slate-400 text-xs font-bold flex items-center justify-center transition active:scale-95 cursor-pointer ml-1"
                  title={tx('ย่อป้ายประกาศ', 'Minimize notice board')}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Dynamic Announcement Title & Description */}
            <div className="my-1">
              <h3 className="text-sm sm:text-base md:text-lg font-black text-white leading-snug tracking-tight">
                {currentItem?.title || tx('ไม่มีประกาศที่เปิดใช้งานอยู่', 'No active announcements')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {currentItem?.desc || tx('คุณสามารถกดปุ่ม "⚙️ จัดการประกาศ" เพื่อสร้างประกาศใหม่ได้ทันทีครับ', 'Click "⚙️ Manage" to create a new store announcement.')}
              </p>
            </div>

            {/* Footer Controls: Dots Indicator & Direct Action CTA Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 mt-2">
              {/* Slide Navigation Dots */}
              <div className="flex items-center gap-1.5">
                {activeAnnouncements.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      triggerCatBounce();
                      if (soundEnabled) playMeowChime();
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      safeIndex === idx
                        ? 'w-6 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_8px_#fbbf24]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    title={item.title}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenCreateModal}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>➕</span>
                  <span>{tx('เพิ่มประกาศ', 'Add Notice')}</span>
                </button>

                {currentItem?.actionText && (
                  <button
                    type="button"
                    onClick={handleActionClick}
                    className="group relative overflow-hidden px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
                    <span>{currentItem.actionText}</span>
                    <span className="text-base group-hover:translate-x-1 transition-transform">👉</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. REAL ANNOUNCEMENT MANAGEMENT MODAL (เพิ่ม/แก้ไข/ลบ/ปักหมุด) */}
      {/* ==================================================================== */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#091124] border-2 border-amber-400/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐱📢</span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-amber-300">
                    {tx('ระบบจัดการป้ายประกาศน้องแมวส้ม (Real Announcement Hub)', 'Cute Cat Announcement Management Hub')}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {tx('เพิ่ม, แก้ไขข้อความ และตั้งค่าประกาศที่ให้น้องแมวส้มออกมาประกาศแบบสดๆ', 'Create, edit & broadcast live announcements through your cat mascot')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsManageModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 text-sm font-black flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Subtabs (List vs Form) */}
            <div className="flex items-center gap-2 px-5 pt-3 border-b border-white/10 bg-slate-950/60">
              <button
                type="button"
                onClick={() => setActiveModalTab('list')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-black border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  activeModalTab === 'list'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <span>📋 {tx('รายการประกาศทั้งหมด', 'All Notices')}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px]">
                  {announcements.length}
                </span>
              </button>

              <button
                type="button"
                onClick={handleOpenCreateModal}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-black border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  activeModalTab === 'form'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <span>{editingId ? `✏️ ${tx('แก้ไขประกาศ', 'Edit Notice')}` : `➕ ${tx('สร้างประกาศใหม่', 'Create New Notice')}`}</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              {/* TAB 1: LIST OF ANNOUNCEMENTS */}
              {activeModalTab === 'list' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <span className="text-xs text-slate-300 font-bold">
                      {tx('สามารถคลิกเปิด/ปิดการแสดงผล หรือปักหมุดประกาศสำคัญได้ทันที', 'Toggle active status or pin priority announcements')}
                    </span>

                    <button
                      type="button"
                      onClick={handleResetToDefault}
                      className="text-xs text-rose-300 hover:underline cursor-pointer"
                    >
                      {tx('↺ รีเซ็ตกลับสู่ประกาศระบบเริ่มต้น', '↺ Reset to system defaults')}
                    </button>
                  </div>

                  {announcements.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-slate-400 text-sm">{tx('ยังไม่มีประกาศในระบบ', 'No announcements yet.')}</p>
                      <button
                        type="button"
                        onClick={handleOpenCreateModal}
                        className="mt-3 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
                      >
                        ➕ {tx('สร้างประกาศแรกเลย!', 'Create First Notice')}
                      </button>
                    </div>
                  ) : (
                    announcements.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                          item.active
                            ? 'bg-slate-900/90 border-amber-400/40 shadow-sm'
                            : 'bg-slate-900/40 border-white/10 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${item.tagColor}`}
                              >
                                {item.tag}
                              </span>

                              {item.pinned && (
                                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                  📌 {tx('ปักหมุด', 'Pinned')}
                                </span>
                              )}

                              <span className="text-[10px] text-slate-400">
                                {item.createdAt}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-white leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>

                          {/* Item Actions */}
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {/* Toggle Pin */}
                            <button
                              type="button"
                              onClick={() => handleTogglePin(item.id)}
                              className={`w-7 h-7 rounded-lg border text-xs flex items-center justify-center transition cursor-pointer ${
                                item.pinned
                                  ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                                  : 'bg-white/5 border-white/15 text-slate-400 hover:text-white'
                              }`}
                              title={item.pinned ? tx('ยกเลิกปักหมุด', 'Unpin') : tx('ปักหมุดประกาศนี้', 'Pin to top')}
                            >
                              📌
                            </button>

                            {/* Toggle Active */}
                            <button
                              type="button"
                              onClick={() => handleToggleActive(item.id)}
                              className={`px-2 py-1 rounded-lg border text-[11px] font-black transition cursor-pointer ${
                                item.active
                                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                                  : 'bg-slate-800 border-white/15 text-slate-400'
                              }`}
                              title={item.active ? tx('กดเพื่อซ่อน', 'Hide') : tx('กดเพื่อแสดง', 'Show')}
                            >
                              {item.active ? '🟢 ' + tx('แสดง', 'Live') : '⚪ ' + tx('ซ่อน', 'Off')}
                            </button>

                            {/* Edit */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(item)}
                              className="w-7 h-7 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-xs flex items-center justify-center transition cursor-pointer"
                              title={tx('แก้ไขข้อความ', 'Edit')}
                            >
                              ✏️
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteAnnouncement(item.id)}
                              className="w-7 h-7 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 text-xs flex items-center justify-center transition cursor-pointer"
                              title={tx('ลบประกาศ', 'Delete')}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: CREATE / EDIT FORM */}
              {activeModalTab === 'form' && (
                <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                  {/* Preset Template Quick Fill Buttons */}
                  <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/25 space-y-1.5">
                    <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                      <span>💡</span>
                      <span>{tx('เลือกเทมเพลตตัวอย่างร้านค้า (กดใส่ข้อความอัตโนมัติ):', 'Quick Store Presets (Auto-fill):')}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => handleApplyPreset('promo')}
                        className="px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 text-xs font-bold cursor-pointer transition"
                      >
                        🔥 {tx('โปรโมชั่นลด 20%', '20% Sale Promo')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyPreset('stock')}
                        className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold cursor-pointer transition"
                      >
                        📦 {tx('เตือนของใกล้หมดสต็อก', 'Low Stock Alert')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyPreset('sales')}
                        className="px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold cursor-pointer transition"
                      >
                        🎉 {tx('ยอดขายทะลุเป้า', 'Sales Target Hit')}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {tx('หัวข้อประกาศ * (ที่น้องแมวส้มจะอ่านเป็นหัวข้อเด่น)', 'Announcement Title *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder={tx('เช่น โปรโมชั่นวันหยุด ซื้อ 1 แถม 1 ถึงสิ้นสัปดาห์นี้!', 'e.g. Weekend Flash Sale Buy 1 Get 1 Free!')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {tx('รายละเอียดเนื้อหาประกาศ (ข้อความอธิบายของน้องแมวส้ม)', 'Announcement Details')}
                    </label>
                    <textarea
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder={tx('พิมพ์รายละเอียดที่ต้องการแจ้งลูกค้าหรือทีมงานร้านค้าที่นี่ครับ...', 'Type announcement details here...')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Category Tag & Badge Color */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {tx('ป้ายกำกับ / หมวดหมู่', 'Category Tag')}
                      </label>
                      <select
                        value={formTag}
                        onChange={(e) => {
                          setFormTag(e.target.value);
                          if (e.target.value.includes('โปรโมชั่น')) {
                            setFormTagColor('from-rose-500 to-orange-500 text-white');
                          } else if (e.target.value.includes('สต็อก')) {
                            setFormTagColor('from-amber-400 to-amber-500 text-slate-950');
                          } else if (e.target.value.includes('AI') || e.target.value.includes('ปัญญา')) {
                            setFormTagColor('from-sky-400 to-blue-500 text-slate-950');
                          } else if (e.target.value.includes('เป้า') || e.target.value.includes('สำเร็จ')) {
                            setFormTagColor('from-emerald-400 to-teal-500 text-slate-950');
                          } else {
                            setFormTagColor('from-purple-400 to-pink-500 text-white');
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-sm focus:border-amber-400 focus:outline-none cursor-pointer"
                      >
                        <option value="📢 ข่าวสารร้านค้า">📢 ข่าวสารร้านค้า (General Store News)</option>
                        <option value="🔥 โปรโมชั่นด่วน">🔥 โปรโมชั่นด่วน (Flash Promo)</option>
                        <option value="📦 แจ้งเตือนสต็อก">📦 แจ้งเตือนสต็อก (Stock Alert)</option>
                        <option value="⚡ อัปเดตใหญ่">⚡ อัปเดตใหญ่ (Major Update)</option>
                        <option value="🤖 ปัญญาประดิษฐ์ AI">🤖 ปัญญาประดิษฐ์ AI (AI Engine)</option>
                        <option value="🛡️ มาตรฐานองค์กร">🛡️ มาตรฐานองค์กร (Security & RBAC)</option>
                        <option value="🎉 ยอดขายทะลุเป้า">🎉 ยอดขายทะลุเป้า (Sales Milestone)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {tx('อารมณ์และท่าทางน้องแมวส้ม 🐱', 'Cat Mascot Mood & Pose')}
                      </label>
                      <select
                        value={formCatMood}
                        onChange={(e) => setFormCatMood(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-sm focus:border-amber-400 focus:outline-none cursor-pointer"
                      >
                        <option value="proud">📣 ภูมิใจ ถือโทรโข่งทองคำ (Holding Megaphone)</option>
                        <option value="waving">🐾 ร่าเริง โบกอุ้งเท้าทักทาย (Waving Paw)</option>
                        <option value="happy">💖 มีความสุข ยิ้มตาหยีมีประกาย (Happy Squint)</option>
                        <option value="alert">🚨 ตื่นตัว ตาโตแจ้งเตือนด่วน (Surprised Alert)</option>
                      </select>
                    </div>
                  </div>

                  {/* Action Button & Target Navigation Tab */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {tx('ข้อความบนปุ่ม Action', 'Action Button Label')}
                      </label>
                      <input
                        type="text"
                        value={formActionText}
                        onChange={(e) => setFormActionText(e.target.value)}
                        placeholder="เช่น ดูโปรโมชั่น, เปิดหน้าสต็อก"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-sm focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {tx('กดปุ่มแล้วให้เปิดไปที่หน้าไหนของระบบ?', 'Target Page to Open')}
                      </label>
                      <select
                        value={formTargetTab}
                        onChange={(e) => setFormTargetTab(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-sm focus:border-amber-400 focus:outline-none cursor-pointer"
                      >
                        <option value="overview">📊 ภาพรวมธุรกิจ (Business Overview)</option>
                        <option value="inventory">📦 คลังสินค้าอัจฉริยะ (Smart Inventory)</option>
                        <option value="staff_pos">🛒 พนักงานและจุดขาย POS (Staff & POS Audit)</option>
                        <option value="multi_channel">🏪 เปรียบเทียบสาขา & ออนไลน์ (Multi-Channel)</option>
                        <option value="procurement">🚚 จัดซื้อรวมศูนย์ (Central Procurement)</option>
                        <option value="insights">🤖 วิเคราะห์ข้อมูลด้วย AI (AI Analytics)</option>
                        <option value="live">🔴 สถานะหน้าร้านสด (Live Store Stream)</option>
                        <option value="database">🗄️ ฐานข้อมูลร้านค้า & ETL (Database & ETL)</option>
                        <option value="customers">👥 วิเคราะห์ลูกค้า CRM (Customer CRM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab('list')}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs transition cursor-pointer"
                    >
                      {tx('ยกเลิก', 'Cancel')}
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition cursor-pointer"
                    >
                      💾 {editingId ? tx('บันทึกการแก้ไข', 'Save Changes') : tx('เผยแพร่ประกาศนี้ทันที', 'Publish Announcement Live')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
