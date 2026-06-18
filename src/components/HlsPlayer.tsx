import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Activity, ShieldAlert, Cpu } from 'lucide-react';

interface HlsPlayerProps {
  src: string;
  title: string;
  isPremium?: boolean;
  onUpdateUrl?: (newUrl: string) => void;
  type?: 'hls' | 'embed' | 'youtube' | 'mp4';
}

export default function HlsPlayer({ src, title, isPremium = false, onUpdateUrl, type = 'hls' }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewersCount, setViewersCount] = useState(1420); // Simulated live viewer count
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [editUrl, setEditUrl] = useState(src);
  const [reloadKey, setReloadKey] = useState(0);

  // Sync edit URL when stream changes
  useEffect(() => {
    setEditUrl(src);
    setErrorMsg(null);
  }, [src]);

  // Handle stream initialization
  useEffect(() => {
    if (type === 'embed') {
      setIsLoading(false);
      setErrorMsg(null);
      // Simulate casual viewer changes
      const interval = setInterval(() => {
        setViewersCount(prev => prev + Math.floor(Math.random() * 21) - 10);
      }, 4000);
      return () => {
        clearInterval(interval);
      };
    }

    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setErrorMsg(null);

    // Clean up previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Direct playback if native HLS is supported (Safari / iOS)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {
          setIsPlaying(false);
        });
        setIsPlaying(true);
        setIsLoading(false);
      });
      video.addEventListener('error', () => {
        setErrorMsg('فشل تحميل البث المباشر. قد يكون الرابط منتهي الصلاحية أو غير متوافق.');
        setIsLoading(false);
      });
    } 
    // Otherwise use Hls.js
    else if (Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch(() => {
          setIsPlaying(false);
        });
        setIsPlaying(true);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setErrorMsg('خطأ في شبكة البث. يرجى التحقق من اتصالك بالإنترنت أو تحديث الرابط.');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setErrorMsg('خطأ في معالجة ميديا البث المباشر.');
              hls.recoverMediaError();
              break;
            default:
              setErrorMsg('حدث خطأ أثناء تشغيل البث المباشر.');
              break;
          }
        }
        setIsLoading(false);
      });
    } else {
      setErrorMsg('متصفحك الحالي لا يدعم تقنية ميديا البث المباشر (HLS).');
      setIsLoading(false);
    }

    // Simulate casual viewer changes
    const interval = setInterval(() => {
      setViewersCount(prev => prev + Math.floor(Math.random() * 21) - 10);
    }, 4000);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      clearInterval(interval);
    };
  }, [src]);

  // Controls
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const reloadStream = () => {
    if (type === 'embed') {
      setReloadKey(prev => prev + 1);
      setErrorMsg(null);
      return;
    }
    if (hlsRef.current) {
      hlsRef.current.loadSource(src);
      videoRef.current?.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.src = src;
      videoRef.current.play().catch(() => {});
    }
    setErrorMsg(null);
  };

  const handleSaveNewUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUrl && editUrl.trim()) {
      onUpdateUrl(editUrl.trim());
      setShowEditPanel(false);
    }
  };

  return (
    <div className="flex flex-col bg-neutral-900 rounded-3xl border border-purple-950 overflow-hidden shadow-xl shadow-purple-900/10">
      
      {/* Target Container block including the video feed & overlays */}
      <div className="relative aspect-video w-full bg-neutral-950 flex items-center justify-center group overflow-hidden">
        
        {type === 'embed' ? (
          <iframe
            key={reloadKey}
            src={src}
            className="w-full h-full absolute inset-0 bg-black z-0 border-none"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
            referrerPolicy="no-referrer"
            title={title}
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            playsInline
            onClick={togglePlay}
            onDoubleClick={toggleFullscreen}
          />
        )}

        {/* Anti-Piracy Protective Watermark Overlay (MHD SPORTS 1 HD Corner Watermark like beIN SPORTS) */}
        <div 
          className="absolute top-14 left-4 z-20 pointer-events-none select-none flex flex-col items-start gap-0.5 opacity-60 hover:opacity-100 transition-opacity duration-350"
          style={{ 
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}
          id="mhd-stream-watermark-protection"
        >
          {/* Transparent live TV broadcast logo container with glassmorphism */}
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-[1.5px] px-2 py-0.5 pr-2.5 rounded-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            
            {/* The brand's signature icon - curved shield concept with dynamic dot */}
            <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-inner relative overflow-hidden">
              <span className="text-[8px] font-black text-white leading-none">M</span>
              <span className="absolute bottom-0 right-0 w-1 h-1 bg-green-400 rounded-full animate-ping" />
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-extrabold text-white/95 tracking-wide font-sans">MHD</span>
              <span className="text-[8px] font-black text-purple-300 bg-purple-500/20 border border-purple-500/40 px-1 rounded-xs leading-none">SPORTS</span>
            </div>

            {/* Channel indicator like beIN SPORTS 1 HD */}
            <div className="border-r border-white/20 h-3 mx-1" />
            <span className="text-[9px] font-black text-green-400 tracking-tighter">1 HD</span>
          </div>
          
          {/* Dynamic rotating protection key for genuine appearance */}
          <span className="text-[7px] text-white/30 font-mono tracking-tight ml-1 font-semibold uppercase">
            MHD-PROT-LIVE_CLK-1717
          </span>
        </div>

        {/* Loading Overlay */}
        {isLoading && !errorMsg && (
          <div className="absolute inset-0 bg-neutral-950/90 flex flex-col items-center justify-center z-10">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-purple-600 opacity-75"></span>
              <div className="relative bg-purple-700 text-white rounded-full p-4">
                <Activity className="h-6 w-6 animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-neutral-300 text-sm font-medium animate-pulse">جاري الاتصال بسيرفر البث...</p>
          </div>
        )}

        {/* Error overlay with recovery options */}
        {errorMsg && (
          <div className="absolute inset-0 bg-neutral-900/95 flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">
            <div className="bg-red-50 text-red-600 rounded-full p-3 mb-3 border border-red-100">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <h4 className="text-white font-bold text-lg mb-1">تنبيه البث المباشر</h4>
            <p className="text-neutral-400 text-sm max-w-md mb-4 leading-relaxed">{errorMsg}</p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <button 
                onClick={reloadStream}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-medium text-xs px-4 py-2 rounded-xl transition-all"
                id="btn-retry-stream"
              >
                <RotateCcw className="h-4.w-4" />
                إعادة محاولة الاتصال
              </button>
              
              <button 
                onClick={() => setShowEditPanel(!showEditPanel)}
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs px-4 py-2 rounded-xl border border-neutral-700 transition"
                id="btn-edit-url"
              >
                <Cpu className="h-4 w-4 text-purple-400" />
                تعديل رابط القناة
              </button>
            </div>
          </div>
        )}

        {/* Top Floating Badge Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10 transition">
          <div className="flex gap-2">
            <span className="bg-red-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md shadow-red-600/30 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-white block"></span>
              مباشر • LIVE
            </span>
            <span className="bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-neutral-700/50">
              {viewersCount.toLocaleString()} مشاهد
            </span>
          </div>

          <div className="flex gap-2">
            {isPremium && (
              <span className="bg-purple-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-full leading-none flex items-center shadow-lg shadow-purple-700/20 shadow-md">
                PREMIUM ★ 1717
              </span>
            )}
            <button 
              onClick={() => setShowEditPanel(!showEditPanel)}
              className="pointer-events-auto bg-neutral-900/80 hover:bg-purple-700 text-white p-1.5 rounded-full border border-neutral-700/50 transition-colors"
              title="تعديل الرابط يدوياً"
              id="btn-stream-options"
            >
              <Cpu className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Custom Video Controls Panel overlay (shows up on hover) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-transparent p-4 pt-12 flex flex-col gap-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-10">
          
          <div className="flex items-center justify-between">
            {/* Playback & Volume Control */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="bg-purple-700 hover:bg-purple-600 text-white p-2.5 rounded-full transition-all hover:scale-105 active:scale-95"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                id="btn-play-pause"
              >
                {isPlaying ? <Pause className="h-4.w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
              </button>

              <button
                onClick={reloadStream}
                className="text-neutral-300 hover:text-white transition"
                title="إعادة تحميل سيرفر البث"
                id="btn-retry-player"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 group/volume">
                <button
                  onClick={toggleMute}
                  className="text-neutral-300 hover:text-white transition"
                  id="btn-mute-toggle"
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 md:w-20 accent-purple-600 h-1 bg-neutral-700 rounded-lg cursor-pointer transition-all opacity-40 group-hover/volume:opacity-100"
                  id="volume-slider"
                />
              </div>
            </div>

            {/* Video Title Display */}
            <div className="hidden sm:block text-right">
              <div className="text-[11px] text-purple-400 font-bold tracking-widest uppercase">MHD SPORTS PLAYER</div>
              <div className="text-xs text-white font-medium">{title}</div>
            </div>

            {/* Scale Options */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-neutral-400 font-mono tracking-wider hidden xs:block bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700/50">
                AUTO HLS • FULL 1080P
              </span>
              <button
                onClick={toggleFullscreen}
                className="text-neutral-300 hover:text-white transition p-1 hover:bg-neutral-800 rounded"
                title="ملء الشاشة"
                id="btn-fs-toggle"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit stream source address overlay panel code */}
      {showEditPanel && (
        <div className="p-5 border-t border-purple-950 bg-neutral-950 animate-fade-in">
          <form onSubmit={handleSaveNewUrl} className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h5 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-purple-400 animate-spin" />
                تعديل رابط البث المباشر (M3U8 / HLS / MP4)
              </h5>
              <button 
                type="button" 
                onClick={() => setShowEditPanel(false)}
                className="text-purple-400 hover:text-purple-200 text-[11px] font-bold"
              >
                إلغاء التعديل
              </button>
            </div>
            <p className="text-[11px] text-purple-200/70 leading-relaxed -mt-1 font-sans">
              يمكنك استبدال رابط البث الخاص بـ <strong>{title}</strong> برابط IPTV خاص بك ليعمل على مدار الساعة دون انقطاع. يتم الحفظ محلياً.
            </p>
            <div className="flex gap-2">
              <input 
                type="url" 
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="أدخل رابط بث HLS m3u8 صالح هنا..."
                className="flex-1 bg-neutral-900 border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition font-mono"
                required
                dir="ltr"
                id="inp-stream-edit-url"
              />
              <button
                type="submit"
                className="bg-purple-800 hover:bg-purple-950 text-white font-semibold text-xs px-4 py-2 rounded-xl transition"
                id="btn-save-edit-url"
              >
                حفظ الرابط
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
