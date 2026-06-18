import React from 'react';
import { Volume2, Sparkles, Flame, PlayCircle } from 'lucide-react';

const TICKER_ITEMS = [
  "بث مباشر الآن: مباراة نادي الوحدات الأردني مع المريخ السوداني عبر قنوات الكأس والرياضية المباشرة بجودة HD عالية.",
  "تم إطلاق هذه المنصة برعاية MHD MARKETING للحلول التسويقية والبرمجية المتكاملة.",
  "سيتم اليوم بث المباراة الافتتاحية لكأس العالم 2026 مباشرة وحصرياً وبجودة فائقة تلائم الجميع."
];

export default function BreakingNewsTicker() {
  return (
    <div 
      className="relative w-full bg-red-950/20 border border-red-900/40 rounded-2xl md:rounded-3xl p-1 shadow-[0_4px_20px_rgba(239,68,68,0.06)] overflow-hidden flex items-center select-none"
      id="breaking-news-ticker"
      dir="rtl"
    >
      {/* Dynamic Ambient Red Pulse Glow behind the badge */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-red-600/10 blur-xl pointer-events-none" />

      {/* Red Glowing BADGE - Urgent (عاجل) */}
      <div className="relative z-10 bg-gradient-to-l from-red-600 to-red-700 text-white font-black text-xs md:text-sm px-4 py-2.5 rounded-xl md:rounded-2xl flex items-center gap-1.5 shadow-[2px_0_12px_rgba(239,68,68,0.4)] shrink-0 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <span className="tracking-wide">عاجـل</span>
        <Flame className="h-4 w-4 text-orange-200 animate-bounce" />
      </div>

      {/* Scrolling Container */}
      <div className="flex-1 overflow-hidden relative py-1.5 px-4 flex items-center">
        {/* Animated Slide Track */}
        <div 
          className="whitespace-nowrap flex gap-12 text-xs md:text-sm font-bold text-red-200/90 animate-marquee hover:[animation-play-state:paused] cursor-pointer"
          style={{
            animation: 'marquee 30s linear infinite'
          }}
        >
          {TICKER_ITEMS.map((text, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <span className="text-red-500 text-lg">•</span>
              <span>{text}</span>
              <span className="text-[10px] text-red-400 bg-red-650/30 px-2 py-0.5 rounded-md font-sans">MHD SPORTS</span>
            </div>
          ))}
          {/* Repeat once more to create infinite illusion */}
          {TICKER_ITEMS.map((text, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-2.5">
              <span className="text-red-500 text-lg">•</span>
              <span>{text}</span>
              <span className="text-[10px] text-red-400 bg-red-650/30 px-2 py-0.5 rounded-md font-sans">MHD SPORTS</span>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Style Tag for CSS Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
