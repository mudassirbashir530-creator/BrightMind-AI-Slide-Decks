'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { deckData as initialDecks, DayDeck, Slide } from '@/lib/deckData';
import Logo from '@/components/Logo';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  Maximize2,
  Minimize2,
  FileDown,
  Sparkles,
  Search,
  BookOpen,
  CheckCircle,
  Copy,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Layers,
  AlertCircle,
  HelpCircle,
  Compass,
  EyeOff,
  Printer,
  Undo2,
  FileText,
  Wifi,
  WifiOff,
  Upload,
  Download,
  Laptop,
  Users,
  Tv,
  Cast,
  Play,
  Pause,
  RefreshCw,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function AISummerCampSlideshow() {
  // States
  const [decks, setDecks] = useState<DayDeck[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('brightmind_decks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error loading saved decks', e);
        }
      }
    }
    return initialDecks;
  });
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | 'all'>('all');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isContinuousView, setIsContinuousView] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Live Sync / Co-Viewing States
  const [syncSessionCode, setSyncSessionCode] = useState<string>('');
  const [syncRole, setSyncRole] = useState<'host' | 'viewer' | null>(null);
  const [syncSessionInput, setSyncSessionInput] = useState<string>('');
  const [syncConnected, setSyncConnected] = useState<boolean>(false);
  const [isSyncPaused, setIsSyncPaused] = useState<boolean>(false);

  // Projector Custom Theme ('warm' - soft cream, 'light' - standard high contrast white, 'dark' - high contrast dark mode)
  const [projectorTheme, setProjectorTheme] = useState<'warm' | 'light' | 'dark'>('warm');

  // Track slide navigation direction for beautiful spring animations
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Interactive User Guide Onboarding State
  const [showQuickGuide, setShowQuickGuide] = useState<boolean>(true);

  // Fullscreen Slide Strip visibility state
  const [showFullscreenOutline, setShowFullscreenOutline] = useState<boolean>(false);

  // Mobile and Interactive States
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isChangingDay, setIsChangingDay] = useState<boolean>(false);
  const [showDayDropdown, setShowDayDropdown] = useState<boolean>(false);

  const dayTransitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const changeDay = useCallback((dayNum: number, startSlideIndex: number = 0) => {
    if (dayTransitionTimerRef.current) {
      clearTimeout(dayTransitionTimerRef.current);
    }
    setIsChangingDay(true);
    setSelectedDayNum(dayNum);
    setActiveSlideIndex(startSlideIndex);
    dayTransitionTimerRef.current = setTimeout(() => {
      setIsChangingDay(false);
    }, 250);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (dayTransitionTimerRef.current) {
        clearTimeout(dayTransitionTimerRef.current);
      }
    };
  }, []);

  // Helper for slide metadata (Urdu labels, icons, style)
  const getSlideTypeMeta = (type: string) => {
    switch (type) {
      case 'title':
        return { label: 'Title', urdu: 'عنوان', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' };
      case 'recap':
        return { label: 'Recap', urdu: 'دہرائی', icon: Undo2, color: 'text-amber-600 bg-amber-50 border-amber-100' };
      case 'agenda':
        return { label: 'Agenda', urdu: 'ایجنڈا', icon: FileText, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
      case 'concept1':
        return { label: 'Concept 1', urdu: 'تصور ۱', icon: Sparkles, color: 'text-purple-600 bg-purple-50 border-purple-100' };
      case 'concept2':
        return { label: 'Concept 2', urdu: 'تصور ۲', icon: Sparkles, color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100' };
      case 'example':
        return { label: 'Example', urdu: 'مثال', icon: HelpCircle, color: 'text-blue-600 bg-blue-50 border-blue-100' };
      case 'demo':
        return { label: 'Demo', urdu: 'ڈیمو', icon: Laptop, color: 'text-sky-600 bg-sky-50 border-sky-100' };
      case 'activity':
        return { label: 'Activity', urdu: 'سرگرمی', icon: Users, color: 'text-rose-600 bg-rose-50 border-rose-100' };
      case 'takeaways':
        return { label: 'Takeaways', urdu: 'اہم نکات', icon: CheckCircle, color: 'text-teal-600 bg-teal-50 border-teal-100' };
      case 'summary':
        return { label: 'Summary', urdu: 'خلاصہ', icon: FileText, color: 'text-cyan-600 bg-cyan-50 border-cyan-100' };
      case 'preview':
        return { label: 'Preview', urdu: 'اگلا سبق', icon: Tv, color: 'text-violet-600 bg-violet-50 border-violet-100' };
      default:
        return { label: 'Slide', urdu: 'سلائیڈ', icon: Layers, color: 'text-gray-600 bg-gray-50 border-gray-100' };
    }
  };

  // References
  const presentationContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Deck and Slide
  const currentDeck = decks.find((d) => d.day === selectedDayNum) || decks[0];
  const currentSlide = currentDeck.slides[activeSlideIndex] || currentDeck.slides[0];

  const saveDecks = (updatedDecks: DayDeck[]) => {
    setDecks(updatedDecks);
    if (typeof window !== 'undefined') {
      localStorage.setItem('brightmind_decks', JSON.stringify(updatedDecks));
    }
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to revert all slide changes back to default?')) {
      setDecks(initialDecks);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('brightmind_decks');
      }
      showNotification('success', 'Slide decks reverted to original default content.');
    }
  };

  // Toast notifications helper
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Handle slide step helper
  const nextSlide = useCallback(() => {
    setSlideDirection('next');
    if (activeSlideIndex < currentDeck.slides.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    } else {
      // Go to next Day deck if available
      const nextDay = decks.find((d) => d.day === selectedDayNum + 1);
      if (nextDay) {
        changeDay(selectedDayNum + 1, 0);
        showNotification('success', `Moved to Day ${selectedDayNum + 1}: ${nextDay.topic}`);
      } else {
        showNotification('success', 'End of Week 4 curriculum. Outstanding job!');
      }
    }
  }, [activeSlideIndex, currentDeck, selectedDayNum, decks, changeDay]);

  const prevSlide = useCallback(() => {
    setSlideDirection('prev');
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    } else {
      // Go to previous Day deck last slide if available
      const prevDay = decks.find((d) => d.day === selectedDayNum - 1);
      if (prevDay) {
        changeDay(selectedDayNum - 1, prevDay.slides.length - 1);
        showNotification('success', `Returned to Day ${selectedDayNum - 1}: ${prevDay.topic}`);
      }
    }
  }, [activeSlideIndex, selectedDayNum, decks, changeDay]);

  // Keyboard controls for the presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen || (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'Escape' && isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, nextSlide, prevSlide]);

  // Swipe gestures for touch screens
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Swipe threshold is 40px horizontally, and must be mostly horizontal (deltaX > deltaY)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  }, [nextSlide, prevSlide]);

  // Count words in a bullet point
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Edit slide live state helpers
  const handleEditChange = (field: string, value: any, index?: number) => {
    // Save back to the main deck array
    const updatedDecks = decks.map((d) => {
      if (d.day === selectedDayNum) {
        return {
          ...d,
          slides: d.slides.map((s) => {
            if (s.id === currentSlide.id) {
              const updated = { ...s } as any;
              if (index !== undefined && Array.isArray(updated[field])) {
                updated[field] = [...updated[field]];
                updated[field][index] = value;
              } else {
                updated[field] = value;
              }
              return updated;
            }
            return s;
          }),
        };
      }
      return d;
    });
    saveDecks(updatedDecks);
  };

  // Gemini AI Assistant Call
  const triggerAiPolish = async (bulletText: string, bulletIndex: number) => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'shorten', text: bulletText }),
      });

      const data = await response.json();
      if (data.result) {
        handleEditChange('bullets', data.result, bulletIndex);
        showNotification('success', 'AI successfully polished the bullet to under 8 words!');
      } else if (data.error) {
        showNotification('error', `AI Assistant failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Network error calling server-side Gemini service.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Copy current slide text
  const copySlideText = (slide: Slide) => {
    let text = `${slide.title}\n`;
    if (slide.subtitle) text += `${slide.subtitle}\n`;
    if (slide.paragraph) text += `${slide.paragraph}\n`;
    if (slide.bullets) {
      slide.bullets.forEach((b) => {
        text += `• ${b}\n`;
      });
    }
    if (slide.numberedSteps) {
      slide.numberedSteps.forEach((s, i) => {
        text += `${i + 1}. ${s}\n`;
      });
    }
    navigator.clipboard.writeText(text);
    showNotification('success', 'Slide text copied to clipboard.');
  };

  // Copy entire Day deck text as beautiful markdown
  const copyDayMarkdown = (deck: DayDeck) => {
    let md = `# Day ${deck.day}: ${deck.topic}\n\n`;
    deck.slides.forEach((slide, i) => {
      md += `### Slide ${i + 1}: ${slide.title}\n`;
      if (slide.subtitle) md += `*${slide.subtitle}*\n\n`;
      if (slide.paragraph) md += `> ${slide.paragraph}\n\n`;
      if (slide.bullets) {
        slide.bullets.forEach((b) => {
          md += `- ${b}\n`;
        });
        md += '\n';
      }
      if (slide.numberedSteps) {
        slide.numberedSteps.forEach((s, idx) => {
          md += `${idx + 1}. ${s}\n`;
        });
        md += '\n';
      }
      md += `---\n\n`;
    });

    navigator.clipboard.writeText(md);
    showNotification('success', `Day ${deck.day} Markdown copied. Ready to import to Google Slides!`);
  };

  // Download all 20 days as JSON
  const downloadAllDecksJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(decks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'BrightMind_AI_SummerCamp_20Days_Decks.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('success', 'مکمل 20 روزہ کورس فائل ڈاؤن لوڈ ہو گئی ہے! Complete 20-Day JSON schema downloaded.');
  };

  // Import decks from JSON file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json) && json.length > 0 && 'day' in json[0] && 'slides' in json[0]) {
          saveDecks(json);
          changeDay(1, 0);
          showNotification('success', 'فائل کامیابی سے لوڈ ہو گئی ہے! Slide decks successfully loaded!');
        } else {
          showNotification('error', 'غلط فائل فارمیٹ! File format is invalid. Must be a valid 20-day slide JSON.');
        }
      } catch (err) {
        showNotification('error', 'فائل پڑھنے میں غلطی! Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Start Live Session (as Host/Presenter)
  const startLiveSession = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'host',
          day: selectedDayNum,
          slideIndex: activeSlideIndex
        })
      });
      const data = await res.json();
      if (data.success) {
        setSyncSessionCode(data.sessionCode);
        setSyncRole('host');
        setSyncConnected(true);
        showNotification('success', `لائیو کلاس روم شروع! سیشن کوڈ: ${data.sessionCode}`);
      } else {
        showNotification('error', 'لائیو سیشن شروع کرنے میں ناکامی! Failed to start live session.');
      }
    } catch (err) {
      showNotification('error', 'نیٹ ورک کا مسئلہ! Network error creating session.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Join Live Session (as Viewer/Student)
  const joinLiveSession = async (code: string) => {
    if (!code.trim()) {
      showNotification('error', 'پلیز سیشن کوڈ لکھیں! Please enter a session code.');
      return;
    }
    setIsAiLoading(true);
    const cleanCode = code.trim().toUpperCase();
    try {
      const res = await fetch(`/api/sync?sessionCode=${encodeURIComponent(cleanCode)}`);
      const data = await res.json();
      if (data.success) {
        setSyncSessionCode(cleanCode);
        setSyncRole('viewer');
        setSyncConnected(true);
        setIsSyncPaused(false);
        changeDay(data.day, data.slideIndex);
        showNotification('success', `کامیابی سے لائیو کلاس ${cleanCode} میں شامل ہو گئے!`);
      } else {
        showNotification('error', `کوڈ ${cleanCode} کا کوئی سیشن نہیں ملا! Active session not found.`);
      }
    } catch (err) {
      showNotification('error', 'کنکشن فیل ہو گیا! Connection failed.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Disconnect Sync
  const disconnectSync = () => {
    setSyncRole(null);
    setSyncConnected(false);
    setSyncSessionCode('');
    showNotification('success', 'لائیو سیشن ختم ہو گیا ہے۔ Sync disconnected.');
  };

  // Host Sync broadcast effect
  useEffect(() => {
    if (syncRole !== 'host' || !syncConnected || !syncSessionCode) return;

    const updateRemote = async () => {
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update',
            sessionCode: syncSessionCode,
            day: selectedDayNum,
            slideIndex: activeSlideIndex
          })
        });
      } catch (err) {
        console.error('Failed to sync state to server', err);
      }
    };

    updateRemote();
  }, [selectedDayNum, activeSlideIndex, syncRole, syncConnected, syncSessionCode]);

  // Viewer Sync poll effect
  useEffect(() => {
    if (syncRole !== 'viewer' || !syncConnected || !syncSessionCode || isSyncPaused) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/sync?sessionCode=${encodeURIComponent(syncSessionCode)}`);
        const data = await res.json();
        if (data.success) {
          if (data.day !== selectedDayNum) {
            changeDay(data.day, data.slideIndex);
          } else if (data.slideIndex !== activeSlideIndex) {
            setActiveSlideIndex(data.slideIndex);
          }
        } else {
          setSyncConnected(false);
          setSyncRole(null);
          showNotification('error', 'لائیو سیشن کا رابطہ ٹوٹ گیا ہے! Sync session ended.');
        }
      } catch (err) {
        console.error('Sync polling failed', err);
      }
    }, 1500);

    return () => clearInterval(pollInterval);
  }, [syncRole, syncConnected, syncSessionCode, isSyncPaused, selectedDayNum, activeSlideIndex, changeDay]);

  // Get active presentation colors & backgrounds based on Projector Mode
  const getProjectorColors = () => {
    const isDarkType =
      currentSlide.type === 'title' ||
      currentSlide.type === 'recap' ||
      currentSlide.type === 'agenda' ||
      currentSlide.type === 'activity' ||
      currentSlide.type === 'preview';

    if (projectorTheme === 'dark') {
      return {
        bg: '#000000',
        text: '#FFFFFF',
        isDark: true,
        logoVariant: 'light' as 'light' | 'dark',
        themeLabel: 'Cinema Dark 🎬',
        conceptHeading: 'text-[#E05C1A]',
        bulletBg: 'bg-white/10 border border-white/15',
        bulletText: 'text-white font-semibold',
        bulletCheck: 'bg-[#E05C1A] text-white',
        quoteBg: 'bg-white/5 border-l-4 border-[#E05C1A]'
      };
    } else if (projectorTheme === 'light') {
      return {
        bg: '#FFFFFF',
        text: '#000000',
        isDark: false,
        logoVariant: 'dark' as 'light' | 'dark',
        themeLabel: 'Daylight White ☀️',
        conceptHeading: 'text-[#0E1C35]',
        bulletBg: 'bg-gray-100 border border-gray-200',
        bulletText: 'text-black font-bold',
        bulletCheck: 'bg-[#0E1C35] text-white',
        quoteBg: 'bg-gray-50 border-l-4 border-[#E05C1A]'
      };
    } else {
      // 'warm' cream mode (matches approved template)
      return {
        bg: isDarkType ? '#0E1C35' : '#FAF7F2',
        text: isDarkType ? '#FFFFFF' : '#12120E',
        isDark: isDarkType,
        logoVariant: (isDarkType ? 'light' : 'dark') as 'light' | 'dark',
        themeLabel: 'Cream Paper 📄',
        conceptHeading: isDarkType ? 'text-white' : 'text-[#0E1C35]',
        bulletBg: isDarkType ? 'bg-white/5 border border-white/10' : 'bg-white border-[#E4DFD5]',
        bulletText: isDarkType ? 'text-white' : 'text-[#12120E] font-semibold',
        bulletCheck: isDarkType ? 'bg-[#E05C1A] text-white' : 'bg-[#0D7A6B] text-white',
        quoteBg: isDarkType ? 'bg-white/5 border-l-4 border-[#E05C1A]' : 'bg-[#FAF7F2] border-l-4 border-[#E05C1A]'
      };
    }
  };

  const projectorStyles = getProjectorColors();

  // Search filter matching
  const filteredDecks = decks.filter((d) => {
    const matchesSearch =
      d.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.day.toString() === searchQuery ||
      d.slides.some(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.bullets?.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()))
      );

    const matchesWeek = selectedWeekFilter === 'all' || d.week === selectedWeekFilter;

    return matchesSearch && matchesWeek;
  });

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#12120E] flex flex-col font-sans selection:bg-[#E05C1A]/20 selection:text-[#E05C1A]" id="app-root">
      
      {/* HEADER BAR */}
      <header className="bg-[#0E1C35] text-white py-4 px-6 flex justify-between items-center border-b border-[#E05C1A]/30 z-20 sticky top-0 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden flex items-center justify-center p-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-[#E05C1A] text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E05C1A] outline-none"
            style={{ minWidth: '44px', minHeight: '44px' }}
            aria-label="Open Curriculum Menu"
            title="Open Curriculum Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo variant="light" />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3 text-xs bg-white/5 px-4 py-2 rounded-full border border-white/10 font-mono">
            <span className="flex items-center gap-1.5 text-[#00c896]">
              <span className="h-2 w-2 rounded-full bg-[#00c896] animate-pulse"></span>
              20 Days Curriculum
            </span>
            <span className="text-white/40">|</span>
            <span>220 Slides</span>
            <span className="text-white/40">|</span>
            <span className="text-[#E05C1A] font-semibold">0 Code Needed</span>
          </div>

          <button
            onClick={resetToDefault}
            className="flex items-center gap-1 text-xs hover:text-[#E05C1A] transition bg-white/5 border border-white/10 px-3 py-1.5 rounded-md"
            title="Reset to default content"
          >
            <Undo2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset Decks</span>
          </button>

          <button
            onClick={downloadAllDecksJson}
            className="flex items-center gap-1.5 text-xs font-semibold bg-[#E05C1A] text-white hover:bg-[#E05C1A]/90 transition px-4 py-2 rounded-md shadow-lg"
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>
        </div>
      </header>

      {/* DUAL WORKSPACE LAYOUT */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        
        {/* Backdrop for Mobile Sidebar Drawer */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* LEFT WORKSPACE: SIDEBAR DIRECTORY & SELECTOR */}
        <section className={`fixed inset-y-0 left-0 w-80 bg-[#0E1C35] text-white border-r border-[#E05C1A]/20 flex flex-col z-40 shadow-2xl transition-all duration-300 transform lg:static lg:translate-x-0 shrink-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Mobile Close Button */}
          <div className="lg:hidden p-4 border-b border-white/10 flex justify-between items-center bg-black/30 shrink-0">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#E05C1A]">Curriculum Map / نصاب</span>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-white text-xs font-bold font-mono uppercase cursor-pointer"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              ✕ Close
            </button>
          </div>
          
          {/* SEARCH & FILTERS */}
          <div className="p-4 border-b border-white/10 space-y-3 bg-black/25">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search topics or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white/10 border border-white/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E05C1A] text-white placeholder-white/40 font-sans transition-all"
              />
            </div>

            {/* WEEK SELECTOR TABS */}
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedWeekFilter('all')}
                className={`flex-1 text-center py-1.5 px-2 rounded text-xs font-semibold transition ${
                  selectedWeekFilter === 'all'
                    ? 'bg-[#E05C1A] text-white'
                    : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                All
              </button>
              {[1, 2, 3, 4].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeekFilter(w)}
                  className={`flex-1 text-center py-1.5 px-1 rounded text-xs font-semibold transition ${
                    selectedWeekFilter === w
                      ? 'bg-[#E05C1A] text-white'
                      : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  W{w}
                </button>
              ))}
            </div>
          </div>

          {/* LECTURE DECKS DIRECTORY LIST */}
          <div className="px-4 py-2.5 bg-black/30 text-[10px] font-bold uppercase tracking-widest text-[#E05C1A] border-b border-white/10 flex justify-between items-center shrink-0">
            <span>Select Day / سبق منتخب کریں</span>
            <span className="text-[9px] font-mono opacity-60">1 - 20 Days</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/10 max-h-[280px] lg:max-h-none">
            {filteredDecks.length === 0 ? (
              <div className="p-8 text-center text-white/40 text-sm">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-[#E05C1A]/65" />
                No matching days found. Try a different query.
              </div>
            ) : (
              filteredDecks.map((deck) => {
                const isActive = deck.day === selectedDayNum;
                return (
                  <div
                    key={deck.day}
                    onClick={() => {
                      changeDay(deck.day, 0);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`p-4 cursor-pointer transition relative group border-b border-white/5 ${
                      isActive ? 'bg-[#E05C1A]/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E05C1A]" />
                    )}
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-mono text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded transition ${
                        isActive ? 'bg-[#E05C1A]/20 text-[#E05C1A]' : 'bg-white/5 text-white/60'
                      }`}>
                        Week {deck.week} · Day {deck.day}
                      </span>
                      <span className="text-[10px] text-white/40 group-hover:text-white/60 transition">11 Slides</span>
                    </div>
                    
                    <div className="flex items-center justify-between gap-1.5 mt-1">
                      <h3 className={`font-sans font-bold text-sm line-clamp-1 transition flex-1 ${
                        isActive ? 'text-[#E05C1A]' : 'text-white/70 group-hover:text-white'
                      }`}>
                        {deck.topic}
                      </h3>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase shrink-0 transition-all ${
                        isActive 
                          ? 'bg-[#E05C1A]/20 text-[#E05C1A]' 
                          : 'opacity-0 group-hover:opacity-100 bg-white/5 text-white/50'
                      }`}>
                        {isActive ? 'Loaded' : 'Open ➔'}
                      </span>
                    </div>
                    
                    {/* Tiny visual progress bar representation of slides */}
                    <div className="flex gap-0.5 mt-2.5">
                      {deck.slides.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            isActive && idx === activeSlideIndex
                              ? 'bg-[#E05C1A] scale-y-125'
                              : isActive && idx < activeSlideIndex
                              ? 'bg-white'
                              : isActive
                              ? 'bg-white/20'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* LIVE SYNC & LOCAL FILE INTERACTION PANEL */}
          <div className="p-4 border-t border-white/10 bg-black/15 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-bold text-white/50 font-mono flex items-center gap-1.5">
                <Tv className="h-3.5 w-3.5 text-[#E05C1A]" />
                Live Class Sync
              </span>
              <span className="flex h-2 w-2 relative">
                {syncConnected ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white/20"></span>
                )}
              </span>
            </div>

            {/* IF DISCONNECTED */}
            {!syncRole && (
              <div className="space-y-3">
                <p className="text-[11px] text-white/60 leading-normal">
                  آن لائن پڑھانے کے لیے لائیو سیشن شروع کریں یا طالب علم کے طور پر کوڈ لکھ کر شامل ہوں۔
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={startLiveSession}
                    disabled={isAiLoading}
                    className="py-2 px-2 bg-[#E05C1A] hover:bg-[#E05C1A]/90 text-white rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Cast className="h-3 w-3 animate-pulse" />
                    Host Class
                  </button>
                  <button
                    onClick={() => setSyncRole('viewer')}
                    className="py-2 px-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Users className="h-3 w-3" />
                    Join Class
                  </button>
                </div>
              </div>
            )}

            {/* IF JOINING AS STUDENT STATE */}
            {syncRole === 'viewer' && !syncConnected && (
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider">
                  Enter Teacher&apos;s Code (کورس کوڈ درج کریں):
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="e.g. CAMP-1234"
                    value={syncSessionInput}
                    onChange={(e) => setSyncSessionInput(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 bg-black/30 border border-white/15 rounded-lg text-xs text-white placeholder-white/30 uppercase focus:outline-none focus:border-[#E05C1A] font-mono"
                  />
                  <button
                    onClick={() => joinLiveSession(syncSessionInput)}
                    className="bg-[#E05C1A] hover:bg-[#E05C1A]/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Join
                  </button>
                </div>
                <button
                  onClick={() => setSyncRole(null)}
                  className="text-[10px] text-white/40 hover:text-white transition cursor-pointer"
                >
                  ← Back / پیچھے جائیں
                </button>
              </div>
            )}

            {/* IF HOSTING PRESENTATION */}
            {syncRole === 'host' && syncConnected && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono tracking-wider flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Broadcasting Live
                  </span>
                  <button
                    onClick={disconnectSync}
                    className="text-[10px] text-white/40 hover:text-red-400 transition cursor-pointer"
                    title="Stop Session"
                  >
                    Stop
                  </button>
                </div>
                <div className="text-center bg-black/40 p-2 rounded border border-white/5 font-mono">
                  <div className="text-[10px] text-white/40 uppercase">Student Code</div>
                  <div className="text-base font-bold text-white tracking-widest">{syncSessionCode}</div>
                </div>
                <p className="text-[10px] text-white/50 leading-normal text-center italic">
                  جب آپ سلائیڈ تبدیل کریں گے، بچوں کے فون یا کمپیوٹر پر بھی خودکار تبدیل ہو گی۔
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(syncSessionCode);
                    showNotification('success', 'Session code copied!');
                  }}
                  className="w-full text-center py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-semibold text-white/80 transition cursor-pointer"
                >
                  Copy Join Code
                </button>
              </div>
            )}

            {/* IF CONNECTED AS VIEWER (STUDENT STATUS) */}
            {syncRole === 'viewer' && syncConnected && (
              <div className="bg-[#E05C1A]/10 border border-[#E05C1A]/20 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-[#E05C1A] font-mono tracking-wider flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E05C1A] animate-pulse"></span>
                    Connected (Student)
                  </span>
                  <button
                    onClick={disconnectSync}
                    className="text-[10px] text-white/40 hover:text-red-400 transition cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs font-mono bg-black/40 px-2 py-1.5 rounded border border-white/5">
                  <span className="text-white/40 text-[10px]">Session:</span>
                  <span className="text-white font-bold">{syncSessionCode}</span>
                </div>
                
                {/* PAUSE FOLLOW OPTION */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="pause-sync-check"
                    checked={isSyncPaused}
                    onChange={(e) => {
                      setIsSyncPaused(e.target.checked);
                      showNotification('success', e.target.checked ? 'Sync paused. Feel free to browse.' : 'Sync resumed. Catching up with teacher!');
                    }}
                    className="rounded border-white/20 bg-black/30 text-[#E05C1A] focus:ring-0 focus:ring-offset-0 cursor-pointer h-3.5 w-3.5"
                  />
                  <label htmlFor="pause-sync-check" className="text-[11px] text-white/70 select-none cursor-pointer leading-tight">
                    Pause Auto-Follow (دستی سکرول)
                  </label>
                </div>
              </div>
            )}

            {/* FILE IMPORTER/EXPORTER ACCORDION */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-white/35 flex items-center gap-1">
                <Laptop className="h-3 w-3" />
                Local Laptop File
              </span>
              <div className="flex gap-2">
                <button
                  onClick={triggerFileInput}
                  className="p-1 hover:text-[#E05C1A] text-white/60 transition cursor-pointer"
                  title="Load Saved Presentation File (.json) from Computer (لوکل فائل اپلوڈ)"
                >
                  <Upload className="h-3.5 w-3.5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".json"
                  className="hidden"
                />
                <button
                  onClick={downloadAllDecksJson}
                  className="p-1 hover:text-[#E05C1A] text-white/60 transition cursor-pointer"
                  title="Download All Decks as Backup JSON (فائل ڈاؤن لوڈ کریں)"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR FOOTER */}
          <div className="p-4 bg-black/35 text-white/80 border-t border-white/10 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-white/40 uppercase tracking-wider text-[9px] font-bold">Selected Lecture:</span>
              <span className="font-semibold text-[#E05C1A]">Day {currentDeck.day}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase tracking-wider text-[9px] font-bold">Topic:</span>
              <span className="font-semibold truncate max-w-[180px] text-white" title={currentDeck.topic}>
                {currentDeck.topic}
              </span>
            </div>
          </div>
        </section>

        {/* CENTER WORKSPACE: INTERACTIVE WIDESCREEN SLIDE STAGE & UTILITIES */}
        <section className="flex-1 bg-[#f0f2f5] p-4 lg:p-8 overflow-y-auto flex flex-col items-center">
          
          {/* VIEW SWITCHER & PRESENTATION OPTIONS */}
          <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsContinuousView(false)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  !isContinuousView
                    ? 'bg-[#0E1C35] text-white shadow-md border border-[#0E1C35]'
                    : 'bg-white border border-[#E4DFD5] hover:bg-gray-50 text-[#0E1C35] shadow-sm'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Slide Presenter View
              </button>
              <button
                onClick={() => setIsContinuousView(true)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  isContinuousView
                    ? 'bg-[#0E1C35] text-white shadow-md border border-[#0E1C35]'
                    : 'bg-white border border-[#E4DFD5] hover:bg-gray-50 text-[#0E1C35] shadow-sm'
                }`}
              >
                <Printer className="h-3.5 w-3.5" />
                Continuous Document View (All 20 Days)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyDayMarkdown(currentDeck)}
                className="px-3.5 py-2 bg-white border border-[#E4DFD5] hover:bg-gray-50 text-[#0E1C35] text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1.5"
                title="Copy current day slides text in Markdown"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy Day Markdown
              </button>
              <button
                onClick={() => setIsFullscreen(true)}
                className="px-4 py-2 bg-[#E05C1A] hover:bg-[#E05C1A]/90 text-white text-xs font-bold rounded-lg shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
                disabled={isContinuousView}
              >
                <Maximize2 className="h-3.5 w-3.5" />
                Full Screen Play
              </button>
            </div>
          </div>

          {/* USER WELCOME & QUICK WALKTHROUGH GUIDE (رہنمائی گائیڈ) */}
          {showQuickGuide && (
            <div className="w-full max-w-4xl bg-white border-2 border-[#E05C1A]/20 rounded-xl shadow-xl overflow-hidden mb-6 transition-all duration-300">
              <div className="bg-[#0E1C35] text-white px-6 py-4 flex justify-between items-center border-b border-[#E05C1A]/30">
                <div className="flex items-center gap-3">
                  <Compass className="h-5 w-5 text-[#E05C1A] animate-bounce shrink-0" />
                  <div>
                    <h3 className="font-sans font-bold text-sm tracking-wide uppercase flex items-center gap-2">
                      Quick Start Guide <span className="text-[#E05C1A] font-semibold text-xs font-mono">|</span> استعمال کرنے کا آسان طریقہ
                    </h3>
                    <p className="text-[10px] text-white/60 font-medium">New to BrightMind slides? Follow these simple steps below!</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuickGuide(false)}
                  className="text-xs hover:text-[#E05C1A] hover:bg-white/5 border border-white/10 px-3 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-all shrink-0"
                  title="Hide guide"
                >
                  <EyeOff className="h-3.5 w-3.5 text-[#E05C1A]" />
                  <span className="hidden sm:inline">Hide Guide (چھپائیں)</span>
                </button>
              </div>

              <div className="p-6 bg-gradient-to-br from-white to-gray-50/50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Step 1 */}
                  <div className="bg-white p-4 rounded-lg border border-gray-150 shadow-sm hover:border-[#E05C1A]/30 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-6 w-6 rounded-full bg-[#E05C1A]/10 text-[#E05C1A] flex items-center justify-center text-xs font-bold font-mono group-hover:scale-110 transition-transform shrink-0">
                        1
                      </span>
                      <h4 className="font-bold text-xs text-[#0E1C35] uppercase tracking-wider">Select Day</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                      بائیں طرف لسٹ سے <span className="text-[#E05C1A]">Day 1 to 20</span> میں سے کوئی بھی دن منتخب کریں، ہر دن کا الگ لیکچر لوڈ ہوگا۔
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-4 rounded-lg border border-gray-150 shadow-sm hover:border-[#E05C1A]/30 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-6 w-6 rounded-full bg-[#E05C1A]/10 text-[#E05C1A] flex items-center justify-center text-xs font-bold font-mono group-hover:scale-110 transition-transform shrink-0">
                        2
                      </span>
                      <h4 className="font-bold text-xs text-[#0E1C35] uppercase tracking-wider">Change Slides</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                      سلائیڈز کو تبدیل کرنے کے لیے نیچے دیے گئے <span className="text-[#0E1C35]">اگلی (Next)</span> اور <span className="text-[#0E1C35]">پچھلی (Prev)</span> بٹن استعمال کریں یا کی بورڈ کے <span className="font-mono bg-gray-100 px-1 rounded">← / →</span> بٹن دبائیں۔
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white p-4 rounded-lg border border-gray-150 shadow-sm hover:border-[#E05C1A]/30 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-6 w-6 rounded-full bg-[#E05C1A]/10 text-[#E05C1A] flex items-center justify-center text-xs font-bold font-mono group-hover:scale-110 transition-transform shrink-0">
                        3
                      </span>
                      <h4 className="font-bold text-xs text-[#0E1C35] uppercase tracking-wider">Edit with AI</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                      صفحے پر نیچے جائیں اور <span className="text-[#0E1C35]">AI Editor</span> کے ذریعے کسی بھی ٹیکسٹ کو ایڈٹ کریں۔ جادوئی <span className="text-[#E05C1A]">Gemini Sparkle ✨</span> بٹن سے فقرے چھوٹے کریں!
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white p-4 rounded-lg border border-gray-150 shadow-sm hover:border-[#E05C1A]/30 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-6 w-6 rounded-full bg-[#E05C1A]/10 text-[#E05C1A] flex items-center justify-center text-xs font-bold font-mono group-hover:scale-110 transition-transform shrink-0">
                        4
                      </span>
                      <h4 className="font-bold text-xs text-[#0E1C35] uppercase tracking-wider">Host Live Sync</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                      بائیں کونے میں <span className="text-[#0E1C35]">Host Class</span> دبائیں۔ کلاس کوڈ کاپی کریں اور بچوں کو دیں۔ اب سلائیڈ بدلیں گے تو بچوں کی سکرین پر بھی خود بخود بدلے گی!
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#E05C1A]/5 px-4 py-3 rounded-lg border border-[#E05C1A]/15">
                  <div className="flex items-center gap-2 text-xs text-[#0E1C35] font-semibold">
                    <Sparkles className="h-4 w-4 text-[#E05C1A]" />
                    <span><strong>Pro Tip:</strong> Click &quot;Full Screen Play&quot; to open the projector view with beautiful custom themes (Cream, Daylight, Cinema)!</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsFullscreen(true);
                      setShowQuickGuide(false);
                    }}
                    className="px-4 py-1.5 bg-[#0E1C35] hover:bg-black text-white text-xs font-bold rounded-md transition-all shadow cursor-pointer shrink-0"
                  >
                    Start Presentation Now! (سلائیڈ شو شروع کریں)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* IF QUICK GUIDE HIDDEN, SHOW AN EXPAND BUTTON */}
          {!showQuickGuide && (
            <div className="w-full max-w-4xl mb-4 flex justify-end">
              <button
                onClick={() => setShowQuickGuide(true)}
                className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-xs font-bold text-[#0E1C35] rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="h-3.5 w-3.5 text-[#E05C1A]" />
                <span>Show Quick Guide (رہنمائی گائیڈ دکھائیں)</span>
              </button>
            </div>
          )}

          {/* ACTIVE WORKSPACE RENDER VIEW */}
          {!isContinuousView ? (
            
            /* VIEW 1: SINGLE INTERACTIVE 16:9 SLIDE STAGE */
            <div className="w-full max-w-4xl flex flex-col items-center">
              
              {/* PERSISTENT DAY-SELECTOR & INTERACTIVE PROGRESS BAR */}
              <div className="w-full bg-white border border-gray-200/80 rounded-xl p-4 mb-4 shadow-md flex flex-col gap-3 relative z-25">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="h-9 w-9 bg-[#E05C1A] text-white flex items-center justify-center rounded-lg font-mono font-black text-sm shadow-md animate-pulse">
                      D{selectedDayNum}
                    </span>
                    <div>
                      <h3 className="font-sans font-extrabold text-sm text-[#0E1C35] flex items-center gap-1.5 flex-wrap">
                        {currentDeck.topic}
                      </h3>
                      <p className="text-[10px] text-gray-500 font-medium">
                        Week {currentDeck.week} · Curriculum Milestone
                      </p>
                    </div>
                  </div>

                  {/* Day Selector dropdown */}
                  <div className="relative w-full sm:w-auto self-stretch sm:self-auto shrink-0">
                    <button
                      onClick={() => setShowDayDropdown(!showDayDropdown)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 text-xs font-bold text-[#0E1C35] rounded-lg transition-all flex items-center justify-between sm:justify-start gap-2 cursor-pointer shadow-sm min-h-[44px]"
                      title="Jump directly to any Day's curriculum"
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-[#E05C1A]" />
                        <span>Jump to Day ({selectedDayNum}/20)</span>
                      </span>
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showDayDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showDayDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowDayDropdown(false)} />
                        <div className="absolute right-0 mt-1.5 w-full sm:w-72 bg-white border border-gray-200/95 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto divide-y divide-gray-100 py-1 transition-all">
                          {decks.map((deck) => (
                            <button
                              key={deck.day}
                              onClick={() => {
                                changeDay(deck.day, 0);
                                setShowDayDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors cursor-pointer text-xs ${
                                deck.day === selectedDayNum
                                  ? 'bg-[#E05C1A]/10 text-[#0E1C35] font-extrabold'
                                  : 'hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              <span className={`font-mono font-bold shrink-0 px-1.5 py-0.5 rounded text-[10px] ${
                                deck.day === selectedDayNum
                                  ? 'bg-[#E05C1A] text-white'
                                  : 'bg-gray-200 text-gray-500'
                              }`}>
                                Day {deck.day}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold truncate text-[11px]">{deck.topic}</p>
                                <p className="text-[9px] text-gray-400 font-medium">Week {deck.week} · 11 Slides</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Micro visual progress line of the active slide within active day */}
                <div className="space-y-1.5 mt-1 border-t border-gray-100 pt-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 font-bold">
                    <span className="text-[#E05C1A]">CURRICULUM TIMELINE / نصاب کا سفر</span>
                    <span>Day Progress: {Math.round(((activeSlideIndex + 1) / currentDeck.slides.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner flex">
                    {currentDeck.slides.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-full transition-all duration-500 border-r border-white/40 last:border-0 ${
                          idx === activeSlideIndex
                            ? 'bg-[#E05C1A] flex-1'
                            : idx < activeSlideIndex
                            ? 'bg-[#0E1C35] flex-1'
                            : 'bg-gray-200 flex-1'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* SLIDES OUTLINE STRIP (سلائیڈز پٹی) */}
              <div className="w-full bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#E05C1A] animate-pulse" />
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#0E1C35] uppercase tracking-wider flex items-center gap-1.5 flex-wrap">
                        Day {currentDeck.day} Lecture Roadmap <span className="text-gray-300">|</span> <span className="font-semibold text-[#E05C1A] font-sans tracking-normal">آج کے سبق کا مکمل نقشہ</span>
                      </h4>
                      <p className="text-[10px] text-gray-500 font-medium">Click any slide card to jump directly / کسی بھی سلائیڈ پر کلک کر کے فوراً وہاں جائیں</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <span className="text-[10px] font-mono font-bold bg-[#E05C1A]/10 text-[#E05C1A] px-2 py-1 rounded-md">
                      {activeSlideIndex + 1} / {currentDeck.slides.length} Slides
                    </span>
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="px-3 py-1 bg-[#0E1C35] hover:bg-black text-white text-[10px] font-bold rounded transition-all flex items-center gap-1 cursor-pointer shadow-sm hover:scale-102 active:scale-98 animate-pulse"
                      title="Play presentation in full screen mode"
                    >
                      <Maximize2 className="h-3 w-3 text-[#E05C1A]" />
                      <span>Full Screen (فل سکرین)</span>
                    </button>
                  </div>
                </div>

                {/* Horizontal slide thumbnails list */}
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                  {currentDeck.slides.map((slide, idx) => {
                    const isSlideActive = activeSlideIndex === idx;
                    const meta = getSlideTypeMeta(slide.type);
                    const MetaIcon = meta.icon;

                    return (
                      <button
                        key={slide.id || idx}
                        onClick={() => {
                          setSlideDirection(idx > activeSlideIndex ? 'next' : 'prev');
                          setActiveSlideIndex(idx);
                        }}
                        className={`flex-none w-[115px] p-2.5 rounded-lg border-2 text-left transition-all relative flex flex-col justify-between h-[86px] cursor-pointer group ${
                          isSlideActive
                            ? 'border-[#E05C1A] bg-[#E05C1A]/5 ring-2 ring-[#E05C1A]/10 shadow-sm'
                            : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-[#E05C1A]/50 hover:shadow-xs'
                        }`}
                      >
                        {/* Slide Type and Number */}
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${meta.color}`}>
                            {meta.urdu}
                          </span>
                          <span className={`text-[9px] font-mono font-bold ${isSlideActive ? 'text-[#E05C1A]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                            #{idx + 1}
                          </span>
                        </div>

                        {/* Slide Title */}
                        <h5 className={`text-[10px] font-bold font-sans line-clamp-2 leading-snug mt-1.5 ${
                          isSlideActive ? 'text-[#0E1C35]' : 'text-gray-600 group-hover:text-gray-800'
                        }`}>
                          {slide.title}
                        </h5>

                        {/* Subtle bottom indicator */}
                        <div className="w-full flex items-center gap-1 mt-1 text-[8px] text-gray-400">
                          <MetaIcon className="h-2.5 w-2.5 shrink-0 text-gray-400 group-hover:text-[#E05C1A]" />
                          <span className="truncate">{meta.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* THE 16:9 SLIDE BOX CONTAINER */}
              <div
                ref={presentationContainerRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="w-full min-h-[380px] aspect-auto md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl relative border border-gray-200/80 transition-all duration-300 group/slide focus-within:ring-2 focus-within:ring-[#E05C1A]/50 outline-none"
                style={{
                  backgroundColor:
                    isChangingDay ||
                    currentSlide.type === 'title' ||
                    currentSlide.type === 'recap' ||
                    currentSlide.type === 'agenda' ||
                    currentSlide.type === 'activity' ||
                    currentSlide.type === 'preview'
                      ? '#0E1C35'
                      : '#FFFFFF',
                  color:
                    isChangingDay ||
                    currentSlide.type === 'title' ||
                    currentSlide.type === 'recap' ||
                    currentSlide.type === 'agenda' ||
                    currentSlide.type === 'activity' ||
                    currentSlide.type === 'preview'
                      ? '#FFFFFF'
                      : '#12120E'
                }}
              >
                {isChangingDay ? (
                  <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-[#0E1C35] text-white p-6 sm:p-12 z-20 animate-fade-in">
                    <div className="relative flex items-center justify-center mb-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-[#E05C1A] border-r-transparent border-b-[#E05C1A]/20 border-l-[#E05C1A]/20" />
                      <Sparkles className="absolute h-5 w-5 text-[#E05C1A] animate-pulse" />
                    </div>
                    <span className="font-sans font-extrabold text-sm tracking-widest text-[#E05C1A] uppercase animate-pulse text-center">
                      Preparing Classroom Curriculum
                    </span>
                    <span className="font-sans font-semibold text-xs text-white/50 tracking-normal mt-2 text-center">
                      روزانہ کا نیا نصاب ترتیب دیا جا رہا ہے...
                    </span>
                  </div>
                ) : (
                  <>
                    {/* 1. BRIGHTMIND LOGO - CONSTANT POSITION ACCORDING TO GUIDELINES */}
                    <div className="absolute top-5 sm:top-6 left-5 sm:left-8 z-10">
                      <Logo
                        variant={
                          currentSlide.type === 'title' ||
                          currentSlide.type === 'recap' ||
                          currentSlide.type === 'agenda' ||
                          currentSlide.type === 'activity' ||
                          currentSlide.type === 'preview'
                            ? 'light'
                            : 'dark'
                        }
                        showText={true}
                        className="scale-90 transform origin-top-left"
                      />
                    </div>

                {/* 2. SLIDE COUNTER / TRACK TRACKER */}
                <div className="absolute bottom-6 right-8 text-[11px] font-mono uppercase tracking-widest opacity-60">
                  Slide {String(activeSlideIndex + 1).padStart(2, '0')} / 11
                </div>

                {/* 3. DYNAMIC CONTENT SLIDE WRAPPER */}
                <div className="w-full h-full p-5 sm:p-8 md:p-12 pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 md:pb-16 flex flex-col justify-between">
                  
                  {/* SLIDE TRANSITION ANIMATION FOR HIGHLY REASSURED LOOKS */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${selectedDayNum}-${activeSlideIndex}`}
                      initial={{ 
                        opacity: 0, 
                        x: slideDirection === 'next' ? 60 : -60,
                        scale: 0.99
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: 1
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: slideDirection === 'next' ? -60 : 60,
                        scale: 0.99
                      }}
                      transition={{ 
                        duration: 0.35, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className="flex-1 flex flex-col justify-center"
                    >
                      {/* LAYOUT LOGIC FOR TITLE SLIDE TYPE */}
                      {currentSlide.type === 'title' && (
                        <div className="text-center space-y-4 max-w-2xl mx-auto flex flex-col justify-center items-center h-full">
                          <span className="text-[#E05C1A] text-xs md:text-sm tracking-[0.25em] font-mono font-bold uppercase block">
                            CURRICULUM PRESENTATION
                          </span>
                          <h1 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                            {currentSlide.title}
                          </h1>
                          <div className="h-1 w-24 bg-[#E05C1A] mx-auto rounded-full my-2" />
                          <p className="font-mono text-xs md:text-sm text-white/75 tracking-widest uppercase">
                            {currentSlide.subtitle}
                          </p>
                        </div>
                      )}

                      {/* LAYOUT LOGIC FOR SECTION TYPE / RECAP / PREVIEW */}
                      {(currentSlide.type === 'recap' || currentSlide.type === 'preview') && (
                        <div className="max-w-2xl mx-auto text-center space-y-6 flex flex-col justify-center items-center h-full">
                          <span className="text-[#E05C1A] text-xs font-mono tracking-widest uppercase font-semibold">
                            {currentSlide.type === 'recap' ? 'Welcome & Session Opener' : 'Next Session Teaser'}
                          </span>
                          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                            {currentSlide.title}
                          </h2>
                          <p className="text-sm md:text-lg text-white/80 font-sans max-w-xl leading-relaxed italic">
                            &ldquo;{currentSlide.paragraph}&rdquo;
                          </p>
                        </div>
                      )}

                      {/* LAYOUT LOGIC FOR AGENDA SLIDE */}
                      {currentSlide.type === 'agenda' && (
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                          <div className="md:col-span-2 space-y-3">
                            <span className="text-[#E05C1A] text-xs font-mono tracking-widest uppercase font-semibold">
                              DAY 0{selectedDayNum} OUTLINE
                            </span>
                            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white">
                              {currentSlide.title}
                            </h2>
                            <p className="text-xs text-white/60 font-mono">
                              Four core segments designed for high engagement.
                            </p>
                          </div>
                          
                          <div className="md:col-span-3 bg-white/5 border border-white/10 p-6 rounded-lg space-y-3 shadow-xl">
                            {currentSlide.bullets?.map((b, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className="h-5 w-5 rounded-full bg-[#E05C1A] text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                                  0{i + 1}
                                </span>
                                <p className="text-sm font-sans text-white/90 font-medium">
                                  {b}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* LAYOUT LOGIC FOR STANDARD CONCEPT / TAKEAWAYS SLIDES */}
                      {(currentSlide.type === 'concept1' || currentSlide.type === 'concept2' || currentSlide.type === 'takeaways' || currentSlide.type === 'summary') && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                          <div className="md:col-span-5 space-y-3">
                            <span className="text-[#E05C1A] text-xs font-mono tracking-widest uppercase font-bold">
                              {currentSlide.type === 'takeaways' ? 'Review & Wrapup' : 'Core Learning Section'}
                            </span>
                            <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#0E1C35] leading-tight">
                              {currentSlide.title}
                            </h2>
                            <div className="h-1 w-16 bg-[#E05C1A] rounded" />
                          </div>

                          <div className="md:col-span-7 space-y-4">
                            {currentSlide.bullets?.map((bullet, i) => {
                              const overLimit = getWordCount(bullet) > 8;
                              return (
                                <div key={i} className="flex items-start gap-3 bg-gray-50/90 p-3.5 rounded-lg border border-gray-200 shadow-sm hover:border-[#E05C1A]/30 hover:bg-gray-50 transition-all">
                                  <div className="h-5 w-5 rounded-full bg-[#E05C1A]/10 text-[#E05C1A] flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                                    ✓
                                  </div>
                                  <div className="flex-1 flex justify-between items-start gap-4">
                                    <p className="text-sm font-sans text-[#12120E] font-medium leading-tight">
                                      {bullet}
                                    </p>
                                    
                                    {/* Inline bullet length helper for classroom presentation excellence */}
                                    {overLimit && (
                                      <span className="shrink-0 text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {getWordCount(bullet)} words
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* LAYOUT LOGIC FOR REAL-WORLD EXAMPLE SLIDE */}
                      {currentSlide.type === 'example' && (
                        <div className="max-w-3xl mx-auto flex flex-col justify-center items-center h-full text-center space-y-4">
                          <span className="text-[#E05C1A] text-xs font-mono tracking-widest uppercase font-bold px-3 py-1 rounded-full bg-[#E05C1A]/10">
                            Real-World Teen Analogy
                          </span>
                          <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#0E1C35]">
                            {currentSlide.title}
                          </h2>
                          <div className="bg-gray-50 p-6 rounded-r-xl border-l-4 border-[#E05C1A] shadow-md max-w-2xl text-left mt-2">
                            <p className="text-sm md:text-base text-[#12120E] leading-relaxed font-serif italic">
                              &ldquo;{currentSlide.paragraph}&rdquo;
                            </p>
                          </div>
                        </div>
                      )}

                      {/* LAYOUT LOGIC FOR LIVE DEMO SLIDE */}
                      {currentSlide.type === 'demo' && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                          <div className="md:col-span-5 space-y-3">
                            <span className="text-[#E05C1A] text-xs font-mono tracking-widest uppercase font-bold">
                              INSTRUCTOR DEMOSTRATION
                            </span>
                            <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#0E1C35]">
                              {currentSlide.title}
                            </h2>
                            <p className="text-xs text-[#7A7A72] font-sans">
                              Watch closely as the coach demonstrates the flow on screen.
                            </p>
                          </div>

                          <div className="md:col-span-7 bg-[#0E1C35] text-white p-6 rounded-xl border border-[#E4DFD5]/20 shadow-xl space-y-4">
                            <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded font-mono tracking-wider">
                              DEMO CHECKLIST
                            </span>
                            {currentSlide.bullets?.map((b, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className="h-5 w-5 rounded-full bg-[#FAF7F2]/10 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                                  {i + 1}
                                </span>
                                <p className="text-sm font-sans font-medium text-[#FAF7F2]">
                                  {b}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* LAYOUT LOGIC FOR HANDS-ON WORKSHOP ACTIVITY */}
                      {currentSlide.type === 'activity' && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                          <div className="md:col-span-5 space-y-3">
                            <span className="text-[#E05C1A] text-xs font-mono tracking-[0.2em] uppercase font-bold block">
                              WORKSHOP STAGE
                            </span>
                            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white">
                              {currentSlide.title}
                            </h2>
                            <div className="h-1 w-16 bg-[#E05C1A] rounded" />
                          </div>

                          <div className="md:col-span-7 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-2xl space-y-3">
                            {currentSlide.numberedSteps?.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <span className="h-6 w-6 rounded-md bg-[#E05C1A] text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                                  {idx + 1}
                                </span>
                                <p className="text-sm font-sans font-semibold text-white/95">
                                  {step}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                </>
                )}

                {/* FLOATING HOVER ACTION ARROWS FOR EXTREMELY EASY CLICKING */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  disabled={activeSlideIndex === 0 && selectedDayNum === 1}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/40 backdrop-blur-md hover:bg-[#E05C1A] text-white flex items-center justify-center opacity-0 group-hover/slide:opacity-100 disabled:opacity-0 transition-all duration-300 cursor-pointer border border-white/10 hover:scale-110 active:scale-95 shadow-lg"
                  title="Previous Slide (پیچھے جائیں) - Arrow Left"
                >
                  <ChevronLeft className="h-6 w-6 stroke-[3]" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/40 backdrop-blur-md hover:bg-[#E05C1A] text-white flex items-center justify-center opacity-0 group-hover/slide:opacity-100 transition-all duration-300 cursor-pointer border border-white/10 hover:scale-110 active:scale-95 shadow-lg"
                  title="Next Slide (آگے بڑھیں) - Arrow Right or Space"
                >
                  <ChevronRight className="h-6 w-6 stroke-[3]" />
                </button>
              </div>

              {/* SLIDE CONTROL NAVIGATION DOCK */}
              <div className="w-full mt-4 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-md">
                <div className="flex gap-2.5">
                  <button
                    onClick={prevSlide}
                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition text-[#0E1C35] font-bold text-xs disabled:opacity-35 disabled:hover:bg-gray-50 shadow-sm cursor-pointer"
                    disabled={activeSlideIndex === 0 && selectedDayNum === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Prev (پیچھے)</span>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#E05C1A] hover:bg-[#E05C1A]/90 active:bg-[#E05C1A]/85 text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <span>Next (آگے)</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* TRACK STIP DOTS FOR EASY SCANNING */}
                <div className="hidden sm:flex gap-1.5 items-center">
                  {currentDeck.slides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        idx === activeSlideIndex
                          ? 'bg-[#E05C1A] w-6'
                          : 'bg-gray-100 border border-gray-200 hover:border-[#E05C1A]'
                      }`}
                      title={`Go to Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copySlideText(currentSlide)}
                    className="px-3.5 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-[#0E1C35] text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                    title="Copy slide contents"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Text</span>
                  </button>
                </div>
              </div>

              {/* RE-ASSURED CONTENT AUDITOR & EDITOR BOX */}
              <div className="w-full mt-8 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300">
                <div className="bg-[#0E1C35] text-white px-6 py-4 flex justify-between items-center border-b border-[#E05C1A]/30">
                  <div className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4 text-[#E05C1A]" />
                    <span className="font-sans font-bold text-sm uppercase tracking-wide">Instructor Content Editor & AI Auditor</span>
                  </div>
                  <span className="text-xs bg-[#E05C1A] text-white px-2 py-0.5 rounded font-mono uppercase font-bold">
                    Interactive
                  </span>
                </div>

                <div className="p-6 space-y-5">
                  {/* EDIT TITLE */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                      Slide Header Title
                    </label>
                    <input
                      type="text"
                      value={currentSlide?.title || ''}
                      onChange={(e) => handleEditChange('title', e.target.value)}
                      className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E05C1A] focus:border-[#E05C1A] transition-all font-semibold"
                    />
                  </div>

                  {/* EDIT SUBTITLE / PARAGRAPH IF APPLICABLE */}
                  {currentSlide?.subtitle !== undefined && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                        Subtitle / Metadata Line
                      </label>
                      <input
                        type="text"
                        value={currentSlide?.subtitle || ''}
                        onChange={(e) => handleEditChange('subtitle', e.target.value)}
                        className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E05C1A] focus:border-[#E05C1A] transition-all"
                      />
                    </div>
                  )}

                  {currentSlide?.paragraph !== undefined && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                        Supporting Analogy / Description Paragraph
                      </label>
                      <textarea
                        value={currentSlide?.paragraph || ''}
                        onChange={(e) => handleEditChange('paragraph', e.target.value)}
                        rows={3}
                        className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E05C1A] focus:border-[#E05C1A] font-serif transition-all"
                      />
                    </div>
                  )}

                  {/* EDIT BULLETS AND CALL GEMINI FOR WORD COUNTS */}
                  {currentSlide?.bullets && currentSlide.bullets.length > 0 && (
                    <div className="space-y-3.5">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Slide Bullet List (Slashed strictly under 8 words!)
                      </label>
                      {currentSlide.bullets.map((bullet, i) => {
                        const wordCount = getWordCount(bullet);
                        const isOver = wordCount > 8;
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex gap-2 items-center">
                              <span className="font-mono text-xs text-[#7A7A72] w-6 shrink-0 text-center">
                                #{i + 1}
                              </span>
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => handleEditChange('bullets', e.target.value, i)}
                                className={`flex-1 p-2.5 text-sm bg-gray-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E05C1A] focus:border-[#E05C1A] transition-all ${
                                  isOver ? 'border-red-300 focus:ring-red-400' : 'border-gray-200'
                                }`}
                              />
                              
                              {/* GEMINI AI ASSISTANT BUTTON */}
                              <button
                                onClick={() => triggerAiPolish(bullet, i)}
                                disabled={isAiLoading}
                                className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 transition shadow-sm ${
                                  isOver
                                    ? 'bg-[#E05C1A] text-white hover:bg-[#E05C1A]/90'
                                    : 'bg-white border border-gray-200 hover:bg-gray-50 text-[#0E1C35]'
                                }`}
                                title="Use Gemini AI to shrink and polish this bullet to under 8 words"
                              >
                                <Sparkles className={`h-4 w-4 ${isAiLoading ? 'animate-pulse' : ''}`} />
                              </button>
                            </div>

                            {/* AUDITING WARNING BADGE */}
                            <div className="flex justify-between items-center pl-8 text-[11px]">
                              <span
                                className={`font-mono font-semibold ${
                                  isOver ? 'text-red-600' : 'text-emerald-700'
                                }`}
                              >
                                {wordCount} Words {isOver ? '— EXCEEDS 8-WORD LIMIT!' : '— Perfect length'}
                              </span>
                              {isOver && (
                                <span className="text-red-500 flex items-center gap-1 font-sans font-medium">
                                  <AlertCircle className="h-3 w-3" />
                                  Must be &lt; 8 words for students. Use AI Sparkle to fix!
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* EDIT NUMBERED STEPS */}
                  {currentSlide?.numberedSteps && currentSlide.numberedSteps.length > 0 && (
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Numbered Activity Steps
                      </label>
                      {currentSlide.numberedSteps.map((step, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <span className="font-mono text-xs text-[#E05C1A] font-bold w-6 shrink-0 text-center">
                            {i + 1}.
                          </span>
                          <input
                            type="text"
                            value={step}
                            onChange={(e) => handleEditChange('numberedSteps', e.target.value, i)}
                            className="flex-1 p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E05C1A] focus:border-[#E05C1A] transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            
            /* VIEW 2: CONTINUOUS SCROLL / PRINTER STYLE OF ALL SLIDES (Satisfies continuous output) */
            <div className="w-full max-w-4xl space-y-12 pb-24" id="continuous-print-stage">
              <div className="text-center p-8 bg-white border border-gray-200 rounded-xl shadow-lg space-y-3">
                <h2 className="font-serif font-bold text-2xl text-[#0E1C35]">
                  Continuous Slide Deck Publisher (20 Days Total)
                </h2>
                <p className="text-sm text-[#7A7A72] max-w-xl mx-auto">
                  Below you will find the complete lecture material for all 20 days sequentially generated in one continuous output. Perfect for easy reading, copy-pasting, printing, or dividing into individual presentations.
                </p>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="px-5 py-2.5 bg-[#0E1C35] hover:bg-black text-white text-xs font-bold rounded-lg transition shadow-md flex items-center gap-1.5"
                  >
                    <Printer className="h-4 w-4" />
                    Print / Export PDF
                  </button>
                </div>
              </div>

              {decks.map((deck) => (
                <div key={deck.day} className="space-y-6 pt-8 border-t border-gray-200" id={`print-day-${deck.day}`}>
                  <div className="flex justify-between items-center bg-[#0E1C35] text-white px-6 py-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-[#E05C1A] text-white font-mono uppercase font-bold px-3 py-1 rounded">
                        DAY {deck.day}
                      </span>
                      <h2 className="font-serif font-bold text-xl md:text-2xl leading-none">
                        {deck.topic}
                      </h2>
                    </div>
                    <button
                      onClick={() => copyDayMarkdown(deck)}
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy Markdown
                    </button>
                  </div>

                  {/* RENDER ALL 11 SLIDES FOR THIS DAY */}
                  <div className="space-y-4">
                    {deck.slides.map((slide, sIdx) => {
                      const isDark =
                        slide.type === 'title' ||
                        slide.type === 'recap' ||
                        slide.type === 'agenda' ||
                        slide.type === 'activity' ||
                        slide.type === 'preview';

                      return (
                        <div
                          key={slide.id}
                          className={`w-full p-8 rounded-xl border border-gray-200 relative overflow-hidden shadow-sm transition hover:shadow-md ${
                            isDark ? 'bg-[#0E1C35] text-white' : 'bg-white text-[#12120E]'
                          }`}
                        >
                          <div className="absolute top-4 right-4 text-[10px] font-mono opacity-50 uppercase tracking-widest">
                            Slide {sIdx + 1} / 11 · {slide.type.toUpperCase()}
                          </div>

                          <div className="space-y-4">
                            <span className="text-[#E05C1A] text-[10px] font-mono tracking-widest uppercase font-bold block">
                              BRIGHTMIND AI CAMP 2026
                            </span>
                            
                            <h3 className={`font-serif font-bold text-xl md:text-2xl ${isDark ? 'text-white' : 'text-[#0E1C35]'}`}>
                              {slide.title}
                            </h3>

                            {slide.subtitle && (
                              <p className="font-mono text-xs text-[#E05C1A] tracking-wider">
                                {slide.subtitle}
                              </p>
                            )}

                            {slide.paragraph && (
                              <p className={`text-sm italic ${isDark ? 'text-white/80' : 'text-[#7A7A72]'}`}>
                                &ldquo;{slide.paragraph}&rdquo;
                              </p>
                            )}

                            {slide.bullets && slide.bullets.length > 0 && (
                              <ul className="list-disc list-inside space-y-1.5 pl-2">
                                {slide.bullets.map((b, bIdx) => (
                                  <li key={bIdx} className="text-sm font-sans font-medium text-opacity-90">
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {slide.numberedSteps && slide.numberedSteps.length > 0 && (
                              <ol className="list-decimal list-inside space-y-1.5 pl-2">
                                {slide.numberedSteps.map((step, stepIdx) => (
                                  <li key={stepIdx} className="text-sm font-sans font-semibold text-opacity-95">
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FULL SCREEN LIGHTBOX MODAL OVERLAY FOR PRESENTING TO CLASS */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-8 transition-all duration-300 overflow-y-auto"
            style={{
              backgroundColor: projectorStyles.bg,
              color: projectorStyles.text
            }}
          >
            {/* CLOSE FULL SCREEN & INFO BAR */}
            <div className="flex justify-between items-center border-b border-current/10 pb-4">
              <div className="flex items-center gap-4">
                <Logo variant={projectorStyles.logoVariant} />
                {syncConnected && (
                  <span className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider bg-[#E05C1A]/15 text-[#E05C1A] border border-[#E05C1A]/20 uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E05C1A] animate-pulse"></span>
                    📡 {syncRole === 'host' ? 'Broadcasting Class' : 'Live Sync active'} ({syncSessionCode})
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 z-20">
                {/* PROJECTOR PRESETS SELECTOR */}
                <div className="flex items-center gap-1 bg-black/10 backdrop-blur-sm p-1 rounded-lg border border-current/10 text-xs">
                  <span className="px-2 text-[10px] font-bold font-mono opacity-60 uppercase hidden lg:inline">
                    Projector Presets (ڈسپلے):
                  </span>
                  {(['warm', 'light', 'dark'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setProjectorTheme(t)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        projectorTheme === t
                          ? 'bg-[#E05C1A] text-white shadow'
                          : 'opacity-60 hover:opacity-100 text-current'
                      }`}
                    >
                      {t === 'warm' ? 'Cream 📄' : t === 'light' ? 'Daylight ☀️' : 'Cinema 🎬'}
                    </button>
                  ))}
                </div>

                <span className="text-[11px] font-mono uppercase tracking-widest opacity-60">
                  Day {currentDeck.day} · Slide {activeSlideIndex + 1} / 11
                </span>

                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-full transition hover:bg-current/10 cursor-pointer"
                  title="Exit Presentation Mode"
                >
                  <Minimize2 className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* MAIN STAGE CONTENT - BIG FOCUS DISPLAY */}
            <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full my-8 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${selectedDayNum}-${activeSlideIndex}`}
                  initial={{ 
                    opacity: 0, 
                    x: slideDirection === 'next' ? 120 : -120,
                    scale: 0.98
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: slideDirection === 'next' ? -120 : 120,
                    scale: 0.98
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="w-full h-full flex flex-col justify-center"
                >
                  {/* SLIDE TYPE DISPATCH */}
                  {currentSlide.type === 'title' && (
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                  <span className="text-[#E05C1A] text-sm tracking-[0.25em] font-mono font-bold uppercase block">
                    BRIGHTMIND INSTITUTE OF EDUCATION
                  </span>
                  <h1 className={`font-serif font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight ${projectorStyles.conceptHeading}`}>
                    {currentSlide.title}
                  </h1>
                  <div className="h-1.5 w-32 bg-[#E05C1A] mx-auto rounded-full my-4" />
                  <p className="font-mono text-sm md:text-base opacity-75 tracking-widest uppercase">
                    {currentSlide.subtitle}
                  </p>
                </div>
              )}

              {(currentSlide.type === 'recap' || currentSlide.type === 'preview') && (
                <div className="max-w-3xl mx-auto text-center space-y-8">
                  <span className="text-[#E05C1A] text-sm font-mono tracking-widest uppercase font-semibold">
                    {currentSlide.type === 'recap' ? 'Welcome & Recap Session' : 'Teaser for Tomorrow'}
                  </span>
                  <h2 className={`font-serif font-bold text-4xl md:text-6xl leading-tight ${projectorStyles.conceptHeading}`}>
                    {currentSlide.title}
                  </h2>
                  <p className="text-lg md:text-2xl opacity-90 font-sans max-w-2xl leading-relaxed italic mx-auto">
                    &ldquo;{currentSlide.paragraph}&rdquo;
                  </p>
                </div>
              )}

              {currentSlide.type === 'agenda' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  <div className="md:col-span-4 space-y-4">
                    <span className="text-[#E05C1A] text-sm font-mono tracking-widest uppercase font-semibold">
                      PLAN OF ACTION
                    </span>
                    <h2 className={`font-serif font-bold text-4xl lg:text-5xl ${projectorStyles.conceptHeading}`}>
                      {currentSlide.title}
                    </h2>
                    <p className="text-xs opacity-60 font-mono leading-relaxed">
                      Please have your workshop tabs prepared before starting.
                    </p>
                  </div>
                  
                  <div className={`md:col-span-8 p-8 rounded-xl space-y-4 shadow-2xl ${projectorStyles.bulletBg}`}>
                    {currentSlide.bullets?.map((b, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="h-6 w-6 rounded-full bg-[#E05C1A] text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                          {i + 1}
                        </span>
                        <p className={`text-base font-sans font-medium ${projectorStyles.bulletText}`}>
                          {b}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(currentSlide.type === 'concept1' || currentSlide.type === 'concept2' || currentSlide.type === 'takeaways' || currentSlide.type === 'summary') && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  <div className="md:col-span-4 space-y-4">
                    <span className="text-[#E05C1A] text-sm font-mono tracking-widest uppercase font-bold">
                      {currentSlide.type === 'takeaways' ? 'Review Segment' : 'CORE CONCEPT'}
                    </span>
                    <h2 className={`font-serif font-bold text-4xl md:text-5xl leading-tight ${projectorStyles.conceptHeading}`}>
                      {currentSlide.title}
                    </h2>
                    <div className="h-1 w-24 bg-[#E05C1A] rounded" />
                  </div>

                  <div className="md:col-span-8 space-y-5">
                    {currentSlide.bullets?.map((bullet, i) => (
                      <div key={i} className={`flex items-start gap-4 p-5 rounded-xl shadow-lg backdrop-blur transition-all duration-300 ${projectorStyles.bulletBg}`}>
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 ${projectorStyles.bulletCheck}`}>
                          ✓
                        </div>
                        <p className={`text-base font-sans leading-normal ${projectorStyles.bulletText}`}>
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentSlide.type === 'example' && (
                <div className="max-w-4xl mx-auto flex flex-col justify-center items-center text-center space-y-6">
                  <span className="text-[#E05C1A] text-sm font-mono tracking-widest uppercase font-bold px-4 py-1.5 rounded-full bg-[#E05C1A]/10">
                    Teen Metaphor
                  </span>
                  <h2 className={`font-serif font-bold text-4xl md:text-5xl ${projectorStyles.conceptHeading}`}>
                    {currentSlide.title}
                  </h2>
                  <div className={`p-8 rounded-xl shadow-xl max-w-3xl text-left mt-4 border-l-4 border-[#E05C1A] ${projectorStyles.quoteBg}`}>
                    <p className={`text-base md:text-xl leading-relaxed font-serif italic font-medium ${projectorStyles.bulletText}`}>
                      &ldquo;{currentSlide.paragraph}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {currentSlide.type === 'demo' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  <div className="md:col-span-4 space-y-4">
                    <span className="text-[#E05C1A] text-sm font-mono tracking-widest uppercase font-bold">
                      LIVE INSTRUCTOR SCREENSHARE
                    </span>
                    <h2 className={`font-serif font-bold text-4xl md:text-5xl ${projectorStyles.conceptHeading}`}>
                      {currentSlide.title}
                    </h2>
                  </div>

                  <div className={`md:col-span-8 p-8 rounded-xl shadow-2xl space-y-5 ${projectorStyles.bulletBg}`}>
                    {currentSlide.bullets?.map((b, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="h-6 w-6 rounded-full bg-[#E05C1A] text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                          {i + 1}
                        </span>
                        <p className={`text-base font-sans font-semibold ${projectorStyles.bulletText}`}>
                          {b}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentSlide.type === 'activity' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  <div className="md:col-span-4 space-y-4">
                    <span className="text-[#E05C1A] text-sm font-mono tracking-[0.2em] uppercase font-bold block">
                      STUDENT CHALLENGE
                    </span>
                    <h2 className={`font-serif font-bold text-4xl lg:text-5xl ${projectorStyles.conceptHeading}`}>
                      {currentSlide.title}
                    </h2>
                    <div className="h-1.5 w-24 bg-[#E05C1A] rounded" />
                  </div>

                  <div className={`md:col-span-8 p-8 rounded-xl shadow-2xl space-y-4 ${projectorStyles.bulletBg}`}>
                    {currentSlide.numberedSteps?.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="h-7 w-7 rounded-md bg-[#E05C1A] text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                          {idx + 1}
                        </span>
                        <p className={`text-base font-sans font-semibold leading-relaxed ${projectorStyles.bulletText}`}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* FULL SCREEN SLIDES ROADMAP STRIP OVERLAY */}
            <AnimatePresence>
              {showFullscreenOutline && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  className={`w-full max-w-5xl mx-auto rounded-xl p-3 mb-4 border shadow-2xl transition-all duration-300 z-30 ${
                    projectorStyles.isDark
                      ? 'bg-black/80 border-white/15 text-white'
                      : 'bg-white/90 border-gray-200/80 text-[#0E1C35]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2 px-1 border-b border-current/10 pb-1.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <Layers className="h-3.5 w-3.5 text-[#E05C1A] animate-pulse" />
                      <span>Presentation Roadmap / سلائیڈز گائیڈ</span>
                    </div>
                    <span className="font-mono font-bold opacity-70">
                      {activeSlideIndex + 1} / {currentDeck.slides.length} Slides
                    </span>
                  </div>

                  <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    {currentDeck.slides.map((slide, idx) => {
                      const isSlideActive = activeSlideIndex === idx;
                      const meta = getSlideTypeMeta(slide.type);
                      const MetaIcon = meta.icon;

                      return (
                        <button
                          key={`fs-${slide.id || idx}`}
                          onClick={() => {
                            setSlideDirection(idx > activeSlideIndex ? 'next' : 'prev');
                            setActiveSlideIndex(idx);
                          }}
                          className={`flex-none w-[110px] p-2 rounded-lg border text-left transition-all relative flex flex-col justify-between h-[76px] cursor-pointer group ${
                            isSlideActive
                              ? 'border-[#E05C1A] bg-[#E05C1A]/10 ring-2 ring-[#E05C1A]/20 shadow-md font-bold'
                              : projectorStyles.isDark
                              ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white'
                              : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-[#E05C1A]/50 text-gray-700'
                          }`}
                        >
                          {/* Top row */}
                          <div className="flex items-center justify-between w-full">
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${meta.color}`}>
                              {meta.urdu}
                            </span>
                            <span className={`text-[8px] font-mono font-bold ${isSlideActive ? 'text-[#E05C1A]' : 'opacity-50 group-hover:opacity-80'}`}>
                              #{idx + 1}
                            </span>
                          </div>

                          {/* Slide Title */}
                          <h6 className={`text-[9px] font-bold font-sans line-clamp-2 leading-tight mt-1 ${
                            isSlideActive ? 'text-[#E05C1A]' : 'opacity-80 group-hover:opacity-100'
                          }`}>
                            {slide.title}
                          </h6>

                          {/* Meta type */}
                          <div className="w-full flex items-center gap-1 mt-0.5 text-[7px] opacity-40 group-hover:opacity-60">
                            <MetaIcon className="h-2 w-2 shrink-0 text-gray-400 group-hover:text-[#E05C1A]" />
                            <span className="truncate">{meta.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FOOTER NAV CONTROLS FOR FULL SCREEN */}
            <div className="flex justify-between items-center border-t border-current/10 pt-4 z-20">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono tracking-widest opacity-60 hidden md:inline">
                  AI Summer Camp 2026 · Use Arrow Keys or Space to Navigate
                </span>
                <button
                  onClick={() => setShowFullscreenOutline(!showFullscreenOutline)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102 active:scale-98 ${
                    showFullscreenOutline
                      ? 'bg-[#E05C1A] text-white border-[#E05C1A] shadow-md'
                      : 'border-current/20 hover:bg-current/10 text-current'
                  }`}
                  title="Toggle slides layout map"
                >
                  <Layers className="h-4 w-4" />
                  <span>{showFullscreenOutline ? 'Hide Slides Map (نقشۂ سلائیڈز چھپائیں)' : 'Show Slides Map (سلائیڈز کا نقشہ دیکھیں)'}</span>
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-md transition border border-current/20 hover:bg-current/10 text-current cursor-pointer"
                  disabled={activeSlideIndex === 0 && selectedDayNum === 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-md transition bg-[#E05C1A] hover:bg-[#E05C1A]/90 text-white shadow cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-xl z-50 flex items-center gap-3 border ${
              notification.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
            )}
            <p className="text-sm font-sans font-semibold leading-normal">
              {notification.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
