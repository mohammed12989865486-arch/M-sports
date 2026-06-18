import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Cpu, Award } from 'lucide-react';

export default function PartnersBillboard() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-play insurance
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Auto-play blocked or failed, retrying on interaction background...', err);
      });
    }
  }, []);

  return (
    <div 
      className="relative w-full rounded-2xl md:rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] select-none pointer-events-none"
      id="partners-video-billboard"
    >
      {/* LED Screen Scanner effect of a real billboard */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/5 to-transparent h-2 w-full animate-pulse z-10 opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.03))] z-10 pointer-events-none" />

      {/* Main Grid/Dots Billboard Texture Overlay */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`,
          backgroundSize: '12px 12px'
        }}
      />

      {/* Flowing RGB neon side borders */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-500 via-purple-600 to-green-500 animate-pulse z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-green-500 via-purple-600 to-blue-500 animate-pulse z-20" />

      {/* 21:9 Aspect Ratio Container for Cinema Wide Screen Feeling */}
      <div className="relative w-full min-h-[220px] md:h-[260px] flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6 z-0 overflow-hidden">
        
        {/* Background Looping Tech Video */}
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41853-large.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-normal scale-105"
        />

        {/* Ambient Gradient Background Backup in Case Video Fails/Loads Slow */}
        <div className="absolute inset-0 bg-white -z-10" />
        
        {/* Animated Background Gradients & Particle Orbs */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-blue-500/5 blur-[80px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-green-500/5 blur-[100px] animate-pulse" />

        {/* RIGHT SIDE: Animated "MHD MARKETING" Logo exactly like user video */}
        <div className="flex-1 flex flex-col items-center justify-center md:items-start text-center md:text-right z-20 gap-3 md:order-2">
          
          <div className="flex flex-col items-center justify-center gap-2">
            {/* SVG Animated MHD Logo with blue/green curves & growing success arrow */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 drop-shadow-[0_4px_12px_rgba(22,163,74,0.15)]">
              <svg 
                viewBox="0 0 200 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Turquoise Left Curve representing letter "M" (Blue theme) */}
                <path 
                  d="M50,120 Q70,70 100,105 Q120,135 150,90" 
                  stroke="url(#blue-grad)" 
                  strokeWidth="11" 
                  strokeLinecap="round" 
                  className="animate-pulse"
                  style={{ animationDuration: '3s' }}
                />
                
                {/* Vivid Green Right Curve representing letter "M" (Green theme) */}
                <path 
                  d="M95,125 Q115,75 145,110 Q165,140 185,100" 
                  stroke="url(#green-grad)" 
                  strokeWidth="11" 
                  strokeLinecap="round" 
                  className="animate-pulse"
                  style={{ animationDuration: '4.5s' }}
                />

                {/* Growth Upward Arrow (Rising Marketing Graph Vector) */}
                <motion.g
                  initial={{ y: 15, x: -10, opacity: 0.6 }}
                  animate={{ 
                    y: [10, -5, 10], 
                    x: [-3, 3, -3],
                    opacity: [0.8, 1, 0.8] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  {/* The Arrow Shaft */}
                  <path 
                    d="M70,125 L125,55" 
                    stroke="url(#arrow-grad)" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                  />
                  {/* The Arrow Head */}
                  <path 
                    d="M102,51 L129,51 L129,78" 
                    stroke="url(#arrow-grad)" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </motion.g>

                {/* Sparkle particle details */}
                <circle cx="125" cy="51" r="5" fill="#0EA5E9" className="animate-ping" />
                <circle cx="150" cy="90" r="3" fill="#16A34A" className="animate-pulse" />

                {/* Definitions for gorgeous gradients */}
                <defs>
                  <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4ADE80" />
                    <stop offset="100%" stopColor="#16A34A" />
                  </linearGradient>
                  <linearGradient id="arrow-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22C55E" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Typography of the brand with animations */}
            <div className="text-center mt-[-10px] space-y-0.5">
              <h4 className="text-lg md:text-xl font-black tracking-wider text-slate-950 select-none whitespace-nowrap">
                MHD <span className="text-green-600">MARKETING</span>
              </h4>
              <p className="text-[9px] font-bold text-sky-600 tracking-widest uppercase text-center select-none">
                GROWTH & ADVERTISING AGENCY
              </p>
            </div>
          </div>

        </div>

        {/* LEFT SIDE: Flowing Partner Details, Sparkles, and Indicators */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left md:order-1 select-none">
          
          <div className="space-y-3 max-w-sm">
            {/* Header / Badge */}
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1 rounded-full w-fit mx-auto md:mx-0 animate-bounce">
              <Sparkles className="h-3.5 w-3.5 text-green-600" />
              <span className="text-[10px] font-black text-green-700 tracking-wide">الشريك الإعلاني والتسويقي المعتمد</span>
            </div>

            {/* Arabic Slogans & Info */}
            <div className="space-y-1 text-center md:text-right">
              <h3 className="text-sm md:text-base font-black text-slate-900 leading-snug select-none">
                مجموعة <span className="text-green-600">MHD MARKETING</span> للحلول التسويقية المتكاملة
              </h3>
              <p className="text-[10px] md:text-xs text-slate-600 select-none">
                شريككم الاستراتيجي لتصميم وبرمجة المواقع، إدارة الحملات الإعلانية، صناعة الهوية البصرية، ومضاعفة الأرباح بقوة وثقة.
              </p>
            </div>

            {/* Features Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-[9px] font-bold text-slate-800">
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                <TrendingUp className="h-3 w-3 text-green-600" />
                رؤية نـحو القمة
              </span>
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                <Cpu className="h-3 w-3 text-blue-500" />
                تكنولوجيا ذكية
              </span>
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                <Award className="h-3 w-3 text-amber-500" />
                جودة مضمونة
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Tilted Warning Label to feel like a real hardware screen billboard */}
      <div className="absolute bottom-2.5 right-6 text-[8px] font-bold text-slate-400 select-none">
        <span className="w-1 h-1 rounded-full bg-green-500 animate-ping"></span>
        <span>MHD OUTDOOR DIGITAL BILLBOARD • LIVE REFRESH CO-O17</span>
      </div>

    </div>
  );
}
