import React, { useState } from 'react';
import { Megaphone, ExternalLink, Image as ImageIcon, Video, Star, Sparkles, X } from 'lucide-react';

interface AdBannerSpaceProps {
  id: string;
  size: 'horizontal' | 'square' | 'vertical';
  labelAr?: string;
}

export default function AdBannerSpace({ id, size, labelAr = "مساحة إعلانية شاغرة" }: AdBannerSpaceProps) {
  const [adMode, setAdMode] = useState<'empty' | 'custom-image' | 'custom-video'>('empty');
  const [customSrc, setCustomSrc] = useState('');
  const [targetUrl, setTargetUrl] = useState('https://mhd-marketing.com');
  const [showConfig, setShowConfig] = useState(false);

  const getAspectRatio = () => {
    switch (size) {
      case 'horizontal': return 'aspect-[320/100] md:aspect-[728/90]';
      case 'vertical': return 'aspect-[300/600]';
      case 'square': return 'aspect-square';
      default: return 'aspect-video';
    }
  };

  const getSizeLabel = () => {
    switch (size) {
      case 'horizontal': return 'Leaderboard Banner (728 × 90)';
      case 'vertical': return 'Skyscraper (300 × 600)';
      case 'square': return 'Medium Rectangle (300 × 250)';
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-purple-500/10 bg-neutral-950/40 p-1 backdrop-blur-xs shadow-md group/ad"
      id={`ad-space-${id}`}
    >
      {/* Visual Category Badge */}
      <div className="absolute top-3 right-3 z-15 flex items-center gap-1.5 bg-purple-950/90 border border-purple-500/30 px-2 py-0.5 rounded-full backdrop-blur-md select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
        <span className="text-[9px] font-black tracking-wide text-yellow-300 font-sans uppercase">ADVERTISEMENT</span>
      </div>

      {/* Reserve Button/Trigger Overlay on Hover */}
      <div className="absolute bottom-3 left-3 z-15 flex gap-1.5 opacity-40 group-hover/ad:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="bg-neutral-900/90 hover:bg-purple-900 border border-purple-500/40 p-1.5 rounded-xl text-purple-300 hover:text-white transition-all text-[10px] font-bold flex items-center gap-1 shadow-lg"
          title="تخصيص الإعلان ومحاكاة البث"
        >
          <Megaphone className="h-3 w-3" />
          <span>تعديل الإعلان</span>
        </button>
        <a
          href="https://t.me/MHDMARKETING"
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 hover:bg-green-500 px-3 py-1.5 rounded-xl text-white transition-all text-[10px] font-black flex items-center gap-1 shadow-lg"
        >
          <Sparkles className="h-3 w-3" />
          <span>احجز الآن</span>
        </a>
      </div>

      {/* Main Content Area */}
      <div className={`w-full ${getAspectRatio()} flex items-center justify-center relative overflow-hidden rounded-xl md:rounded-2xl`}>
        
        {/* Ad Mode display logic */}
        {adMode === 'empty' && (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-purple-950/15 to-neutral-950 flex flex-col items-center justify-center p-4 text-center">
            {/* Tech mesh grid overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
              style={{
                backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
                backgroundSize: '16px 16px'
              }}
            />
            
            <div className="relative z-10 flex flex-col items-center gap-2 max-w-sm">
              <div className="w-9 h-9 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 animate-bounce">
                {size === 'horizontal' ? <ImageIcon className="h-4 w-4" /> : <Megaphone className="h-4 w-4" />}
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-black text-white/90 tracking-wide">
                  {labelAr}
                </h4>
                <p className="text-[10px] text-purple-300/50 font-bold mt-1 dir-rtl leading-relaxed">
                  احجز مساحتك الإعلانية الآن وضاعف مبيعاتك بقوة مع MHD MARKETING بمعدل وصول استثنائي.
                </p>
              </div>
              <span className="text-[9px] font-mono font-bold bg-neutral-900 border border-neutral-800 text-purple-400/80 px-2.5 py-1 rounded-lg">
                {getSizeLabel()}
              </span>
            </div>
          </div>
        )}

        {adMode === 'custom-image' && (
          <a href={targetUrl} target="_blank" rel="noreferrer" className="absolute inset-0 block group">
            {customSrc ? (
              <img 
                src={customSrc} 
                alt="إعلان تجاري مخصص" 
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 bg-purple-950/30 flex flex-col items-center justify-center text-center p-4">
                <ImageIcon className="h-8 w-8 text-purple-400 mb-2" />
                <span className="text-xs font-bold text-purple-200">الرجاء إدخال رابط الصورة لعرضها هنا</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-full">
                <ExternalLink className="h-5 w-5 text-white animate-pulse" />
              </div>
            </div>
          </a>
        )}

        {adMode === 'custom-video' && (
          <div className="absolute inset-0 bg-black">
            {customSrc ? (
              <video 
                src={customSrc} 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center text-center p-4">
                <Video className="h-8 w-8 text-purple-500 mb-2 animate-pulse" />
                <span className="text-xs font-bold text-purple-300">الرجاء إدخال رابط ملف الفيديو (MP4) المباشر لعرضه هنا</span>
              </div>
            )}
            {/* Click to Visit Action link */}
            <a 
              href={targetUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="absolute bottom-3 right-3 bg-neutral-900/95 border border-purple-500/30 hover:border-purple-500/60 transition px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-black text-white"
            >
              <ExternalLink className="h-3 w-3 text-purple-400" />
              <span>زيارة الموقع المعلن</span>
            </a>
          </div>
        )}

      </div>

      {/* Setup Config Drawer Panel for Live Interactive Simulation */}
      {showConfig && (
        <div className="border-t border-purple-950 bg-neutral-900 p-4 animate-fade-in-item" dir="rtl">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-purple-950/60">
            <h5 className="text-xs font-black text-purple-300 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-yellow-500 animate-spin" />
              <span>محاكاة وتحكم بالمساحة الإعلانية</span>
            </h5>
            <button 
              onClick={() => setShowConfig(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            <div className="space-y-1.5">
              <label className="text-purple-300/80 font-bold">نوع محتوى الإعلان:</label>
              <div className="flex bg-neutral-950 p-1 rounded-xl border border-purple-950 gap-1">
                <button
                  type="button"
                  onClick={() => setAdMode('empty')}
                  className={`flex-1 py-1 px-2.5 rounded-lg font-black transition-all ${adMode === 'empty' ? 'bg-purple-900 text-white shadow' : 'text-neutral-400 hover:text-purple-200'}`}
                >
                  صورة حجز فارغة
                </button>
                <button
                  type="button"
                  onClick={() => setAdMode('custom-image')}
                  className={`flex-1 py-1 px-2.5 rounded-lg font-black transition-all ${adMode === 'custom-image' ? 'bg-purple-900 text-white shadow' : 'text-neutral-400 hover:text-purple-200'}`}
                >
                  صورة (Banner)
                </button>
                <button
                  type="button"
                  onClick={() => setAdMode('custom-video')}
                  className={`flex-1 py-1 px-2.5 rounded-lg font-black transition-all ${adMode === 'custom-video' ? 'bg-purple-900 text-white shadow' : 'text-neutral-400 hover:text-purple-200'}`}
                >
                  فيديو (MP4)
                </button>
              </div>
            </div>

            {adMode !== 'empty' && (
              <div className="space-y-1.5">
                <label className="text-purple-300/80 font-bold">
                  {adMode === 'custom-image' ? 'رابط الصورة (URL):' : 'رابط الفيديو المباشر (Direct MP4 URL):'}
                </label>
                <input
                  type="text"
                  value={customSrc}
                  onChange={(e) => setCustomSrc(e.target.value)}
                  placeholder={adMode === 'custom-image' ? 'https://example.com/banner.jpg' : 'https://example.com/video.mp4'}
                  className="w-full bg-neutral-950 border border-purple-950 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-purple-600 font-mono text-[11px]"
                />
              </div>
            )}

            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="text-purple-300/80 font-bold">رابط توجيه الزائر عند النقر (الموقع المستهدف):</label>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://mhd-marketing.com"
                className="w-full bg-neutral-950 border border-purple-950 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-600 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
