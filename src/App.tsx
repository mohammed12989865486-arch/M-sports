import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Tv, 
  Search, 
  Settings, 
  Check, 
  ListRestart, 
  Lock, 
  Key, 
  Volume2, 
  HelpCircle, 
  Eye, 
  Heart,
  Globe,
  Share2,
  Menu,
  X,
  Plus,
  Trash2,
  Radio,
  Gamepad,
  Sparkles,
  Trophy,
  Info,
  Smartphone,
  Download,
  ExternalLink,
  Copy,
  Database,
  Server,
  PlusCircle,
  Cpu,
  RotateCcw
} from 'lucide-react';
import { INITIAL_CHANNELS, MOCK_MATCHES, CATEGORY_LABELS } from './data';
import { Channel, MatchUpdate, ServiceServer } from './types';
import HlsPlayer from './components/HlsPlayer';
import PartnersBillboard from './components/PartnersBillboard';
import BreakingNewsTicker from './components/BreakingNewsTicker';
import AdBannerSpace from './components/AdBannerSpace';
import PWAInstallerModal from './components/PWAInstallerModal';

// MHD SPORTS custom high-fidelity responsive branding component mimicking the uploaded shield logo
function MhdSportsLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  if (size === 'sm') {
    return (
      <div className="relative select-none flex items-center shrink-0">
        <div className="relative w-10 h-11 bg-neutral-900 border-2 border-purple-500 rounded-xl overflow-hidden shadow-lg shadow-purple-950/40 flex flex-col justify-between">
          <div className="bg-white flex-1 flex flex-col items-center justify-center leading-none py-0.5">
            <span className="text-[10px] font-black text-purple-950 tracking-tighter">MHD</span>
          </div>
          <div className="bg-purple-800 text-center py-0.5 leading-none">
            <span className="text-[6px] font-black text-white tracking-widest block uppercase">SPORTS</span>
          </div>
        </div>
      </div>
    );
  }

  const sizes = {
    md: 'w-24 h-28',
    lg: 'w-28 h-32'
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${sizes[size === 'lg' ? 'lg' : 'md']} transition-transform duration-300`}>
      {/* Outer shield frame */}
      <div className="relative w-full h-full flex flex-col pt-3">
        {/* Core Shield */}
        <div className="w-full flex-1 bg-white border-2 border-purple-400 rounded-b-[24px] rounded-t-[8px] shadow-2xl overflow-hidden flex flex-col justify-between relative">
          
          {/* Soccer ball absolute bubble */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 -mt-3 z-10 w-7 h-7 rounded-full bg-purple-900 border border-white flex items-center justify-center shadow-lg">
            <span className="text-xs leading-none">⚽</span>
          </div>

          {/* White Upper Section */}
          <div className="flex-1 bg-white flex flex-col items-center justify-center pt-3.5 pb-0.5">
            <span className="text-2xl font-black text-purple-900 tracking-tight leading-none font-sans">
              MHD
            </span>
          </div>

          {/* Bottom Dark Banner Tag */}
          <div className="bg-purple-900 border-t border-purple-300 py-1.5 text-center flex items-center justify-center">
            <span className="text-[9px] font-black text-white tracking-widest uppercase font-sans">
              SPORTS
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Passcode states
  const [isUnlocked, setIsUnlocked] = useState(() => {
    // Keep user unlocked across hot-reloads/refresh if desired, or require code on launch
    const saved = localStorage.getItem('cap_sports_unlocked_session');
    return saved === 'true';
  });
  
  const [typedSequence, setTypedSequence] = useState<string>('');
  const [manualCode, setManualCode] = useState<string>('');
  const [showSecretModal, setShowSecretModal] = useState<boolean>(false);
  const [logoTaps, setLogoTaps] = useState<number>(0);
  const [passcodeError, setPasscodeError] = useState<boolean>(false);

  // Channels states
  const [channels, setChannels] = useState<Channel[]>(() => {
    const saved = localStorage.getItem('cap_sports_channels_custom_v3');
    return saved ? JSON.parse(saved) : INITIAL_CHANNELS;
  });
  const [selectedChannel, setSelectedChannel] = useState<Channel>(channels[0]);
  const [selectedServer, setSelectedServer] = useState<ServiceServer>(channels[0].servers[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('cap_sports_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Breaking News States
  const [news, setNews] = useState<string[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // beIN Sports Advanced Live Repair & Feed Upgrader States
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairProgress, setRepairProgress] = useState<string>('');
  const [repairSuccess, setRepairSuccess] = useState<boolean | null>(null);
  const [repairCount, setRepairCount] = useState<number>(0);
  const [pairedUrl, setPairedUrl] = useState<string>('');
  const [showRepairCenter, setShowRepairCenter] = useState(false);

  // Custom IPTV Playlist definition and management
  const [playlists, setPlaylists] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('cap_sports_user_playlists_v3');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [playlistChannels, setPlaylistChannels] = useState<Channel[]>([]);

  // Phone App (PWA APK) States
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Capture installation prompt and register PWA service worker
  useEffect(() => {
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    // Register Service Worker for official install eligibility
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => console.log('MHD SPORTS PWA Service Worker Registered', reg.scope))
          .catch((err) => console.warn('Service Worker registration skipped:', err));
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  // Update playlist channels when playlists list changes
  useEffect(() => {
    const activeChans: Channel[] = [];
    playlists.forEach(pl => {
      if (pl.enabled && Array.isArray(pl.channels)) {
        activeChans.push(...pl.channels);
      }
    });
    setPlaylistChannels(activeChans);
  }, [playlists]);

  // Playlist additions state
  const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false);
  const [newPlName, setNewPlName] = useState('');
  const [newPlType, setNewPlType] = useState<'m3u_url' | 'm3u_pasted' | 'xtream'>('m3u_url');
  const [newPlUrl, setNewPlUrl] = useState('');
  const [newPlUsername, setNewPlUsername] = useState('');
  const [newPlPassword, setNewPlPassword] = useState('');
  const [newPlPastedText, setNewPlPastedText] = useState('');
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [playlistError, setPlaylistError] = useState<string | null>(null);

  // Parse Raw M3U file contents to the application Channel format
  const parseM3UToChannels = (text: string, playlistId: string, playlistName: string): Channel[] => {
    const lines = text.split('\n');
    const result: Channel[] = [];
    let currentTitle = '';
    let currentLogo = '';
    let currentGroup = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('#EXTINF:')) {
        const logoMatch = line.match(/tvg-logo="([^"]*)"/i);
        currentLogo = logoMatch && logoMatch[1] ? logoMatch[1].trim() : '';

        const groupMatch = line.match(/group-title="([^"]*)"/i);
        currentGroup = groupMatch && groupMatch[1] ? groupMatch[1].trim() : '';

        // Extract title
        const commaIdx = line.lastIndexOf(',');
        if (commaIdx !== -1) {
          currentTitle = line.substring(commaIdx + 1).trim();
        } else {
          currentTitle = 'قناة مضافة';
        }
      } else if (line && !line.startsWith('#') && (line.startsWith('http://') || line.startsWith('https://') || line.startsWith('http') || line.startsWith('rtmp'))) {
        if (currentTitle) {
          const chId = `playlist-${playlistId}-ch-${result.length}`;
          result.push({
            id: chId,
            nameAr: currentTitle,
            nameEn: currentTitle,
            category: 'iptv' as any,
            logo: currentLogo || '📺',
            number: (result.length + 1).toString(),
            servers: [
              {
                id: 'srv-1',
                name: currentGroup || playlistName,
                url: line,
                type: 'hls'
              }
            ]
          });
          currentTitle = '';
          currentLogo = '';
          currentGroup = '';

          // Cap at 500 channels per playlist to keep performance blazing and save localStorage
          if (result.length >= 500) {
            break;
          }
        }
      }
    }
    return result;
  };

  const handleAddNewPlaylist = async () => {
    setPlaylistError(null);
    if (!newPlName.trim()) {
      setPlaylistError('يرجى كتابة اسم تعريفي للاشتراك أولاً');
      return;
    }

    setPlaylistLoading(true);
    const playlistId = 'pl-' + Math.random().toString(36).substring(2, 9);
    let parsedChannels: Channel[] = [];

    try {
      if (newPlType === 'm3u_pasted') {
        if (!newPlPastedText.trim()) {
          throw new Error('يرجى لصق كود أو نصوص قنوات M3U أولاً');
        }
        parsedChannels = parseM3UToChannels(newPlPastedText, playlistId, newPlName);
      } else if (newPlType === 'm3u_url') {
        if (!newPlUrl.trim()) {
          throw new Error('يرجى كتابة رابط قائمة M3U صحيح');
        }
        // Fetch via proxy
        const res = await fetch(`/api/proxy-m3u?url=${encodeURIComponent(newPlUrl.trim())}`);
        if (!res.ok) {
          throw new Error(`تعذر جلب ملف القائمة. تأكد من تفعيل السيرفر وصحة الرابط كود (${res.status})`);
        }
        const text = await res.text();
        parsedChannels = parseM3UToChannels(text, playlistId, newPlName);
      } else if (newPlType === 'xtream') {
        if (!newPlUrl.trim() || !newPlUsername.trim() || !newPlPassword.trim()) {
          throw new Error('يرجى تعبئة كافة بيانات سيرفر Xtream Codes الخاص بك');
        }

        // Fetch via proxy
        const queryStr = `serverUrl=${encodeURIComponent(newPlUrl.trim())}&username=${encodeURIComponent(newPlUsername.trim())}&password=${encodeURIComponent(newPlPassword.trim())}&action=get_live_streams`;
        const res = await fetch(`/api/proxy-xtream?${queryStr}`);
        if (!res.ok) {
          throw new Error(`فشل الاتصال بسيرفر Xtream الخاص بك. رمز الاستجابة (${res.status})`);
        }

        const xtreamStreams = await res.json();
        if (!Array.isArray(xtreamStreams)) {
          if (xtreamStreams && typeof xtreamStreams === 'object' && xtreamStreams.error) {
            throw new Error(xtreamStreams.error);
          }
          throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة، أو السيرفر لا يرجع قنوات حالياً');
        }

        // Map Xtream streams to our standard channel model
        parsedChannels = xtreamStreams.slice(0, 500).map((stream: any, idx: number) => {
          const ext = stream.container_extension || 'm3u8';
          let cleanServer = newPlUrl.trim();
          if (cleanServer.endsWith('/')) {
            cleanServer = cleanServer.slice(0, -1);
          }
          const streamUrl = `${cleanServer}/live/${newPlUsername.trim()}/${newPlPassword.trim()}/${stream.stream_id}.${ext}`;
          
          return {
            id: `xtream-${playlistId}-stream-${stream.stream_id}`,
            nameAr: stream.name || 'قناة Xtream',
            nameEn: stream.name || 'Xtream Channel',
            category: 'iptv' as any,
            logo: stream.stream_icon || '📺',
            number: (idx + 1).toString(),
            servers: [
              {
                id: 'srv-1',
                name: stream.live_category_name || newPlName,
                url: streamUrl,
                type: 'hls'
              }
            ]
          };
        });
      }

      if (parsedChannels.length === 0) {
        throw new Error('لم نعثر على أي قنوات تشغيل صالحة في القائمة المحددة');
      }

      const item = {
        id: playlistId,
        name: newPlName.trim(),
        type: newPlType,
        url: newPlUrl.trim(),
        username: newPlType === 'xtream' ? newPlUsername.trim() : undefined,
        password: newPlType === 'xtream' ? newPlPassword.trim() : undefined,
        enabled: true,
        channelsCount: parsedChannels.length,
        channels: parsedChannels,
        createdAt: Date.now()
      };

      const nextPlaylists = [...playlists, item];
      setPlaylists(nextPlaylists);
      localStorage.setItem('cap_sports_user_playlists_v3', JSON.stringify(nextPlaylists));
      
      // Select first channel instantly for preview
      setSelectedChannel(parsedChannels[0]);
      setSelectedServer(parsedChannels[0].servers[0]);
      setSelectedCategory('iptv');

      // Clear Form state
      setNewPlName('');
      setNewPlUrl('');
      setNewPlUsername('');
      setNewPlPassword('');
      setNewPlPastedText('');
      setShowAddPlaylistModal(false);
      setAlertMessage(`تم استيراد قائمة "${item.name}" بنجاح! تم استيراد وتحميل ${item.channelsCount} قناة بنجاح.`);
      setTimeout(() => setAlertMessage(null), 4000);
    } catch (err: any) {
      setPlaylistError(err.message || 'حدث خطأ غير متوقع أثناء الفحص وحفظ قنواتك');
    } finally {
      setPlaylistLoading(false);
    }
  };

  const handleTogglePlaylist = (id: string) => {
    const updated = playlists.map(pl => {
      if (pl.id === id) {
        return { ...pl, enabled: !pl.enabled };
      }
      return pl;
    });
    setPlaylists(updated);
    localStorage.setItem('cap_sports_user_playlists_v3', JSON.stringify(updated));
  };

  const handleRemovePlaylist = (id: string) => {
    const filtered = playlists.filter(pl => pl.id !== id);
    setPlaylists(filtered);
    localStorage.setItem('cap_sports_user_playlists_v3', JSON.stringify(filtered));
  };

  // Automated repair and pairing code for BeIN Sports channels
  const repairBeInChannels = async (presetUrl?: string) => {
    setIsRepairing(true);
    setRepairSuccess(null);
    setRepairProgress('جاري الاتصال بقاعدة خوادم البث المباشر المفتوحة...');
    
    const targetUrl = presetUrl || pairedUrl.trim() || 'https://raw.githubusercontent.com/mazenid/M3u/main/Sports.m3u';
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setRepairProgress('جاري جلب القنوات وفك التشفير عن البث المباشر المحدث...');
      
      const res = await fetch(`/api/proxy-m3u?url=${encodeURIComponent(targetUrl)}`);
      if (!res.ok) {
        throw new Error(`تعذر جلب ملف البث. السيرفر المستضيف لا يستجيب في المزامنة (رمز كود ${res.status})`);
      }
      
      const text = await res.text();
      setRepairProgress('جاري فحص القنوات ومطابقتها وتنشيط باقات BeIN Sports (1-16)...');
      await new Promise(resolve => setTimeout(resolve, 700));

      const lines = text.split('\n');
      let currentInfo = '';
      const parsedLinks: { name: string; url: string }[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('#EXTINF:')) {
          currentInfo = line;
        } else if (line && !line.startsWith('#') && (line.startsWith('http://') || line.startsWith('https://') || line.startsWith('http'))) {
          if (currentInfo) {
            let name = '';
            const match = currentInfo.match(/,(.*)$/);
            if (match && match[1]) {
              name = match[1].trim();
            }
            parsedLinks.push({ name, url: line });
          }
        }
      }

      if (parsedLinks.length === 0) {
        throw new Error('لم نعثر على أي روابط بث مباشر صالحة داخل الملف المعني.');
      }

      setRepairProgress('جاري تعديل الروابط وحفظ الإعدادات بأداء فائق ومباشر...');
      await new Promise(resolve => setTimeout(resolve, 600));

      let matchedNum = 0;
      const updated = channels.map(ch => {
        const patternAr = ch.nameAr.replace('بي إن سبورتس', '').trim();
        const patternEn = ch.nameEn.replace('beIN SPORTS', '').trim();
        
        const found = parsedLinks.find(link => {
          const lName = link.name.toLowerCase();
          const targetAr = ch.nameAr.toLowerCase();
          const targetEn = ch.nameEn.toLowerCase();
          
          return (
            lName.includes(targetAr) || 
            lName.includes(targetEn) ||
            (lName.includes('sports') && lName.includes(ch.number)) ||
            (lName.includes('bein') && lName.includes(ch.number)) ||
            (lName.includes('bein') && lName.includes(patternAr.toLowerCase())) ||
            (lName.includes('bein') && lName.includes(patternEn.toLowerCase()))
          );
        });

        if (found) {
          matchedNum++;
          const updatedServers = ch.servers.map((srv, idx) => {
            if (idx === 0) {
              return { 
                ...srv, 
                url: found.url,
                name: 'سيرفر البث المباشر (مُصلح بنشاط)'
              };
            }
            return srv;
          });
          return { ...ch, servers: updatedServers };
        }
        return ch;
      });

      if (matchedNum === 0) {
        throw new Error('لم يتم مطابقة أي قنوات بي إن سبورتس مع هذا السيرفر تلقائياً. يرجى تجربة خيار خادم أخر.');
      }

      setChannels(updated);
      localStorage.setItem('cap_sports_channels_custom_v3', JSON.stringify(updated));
      
      const nextChan = updated.find(c => c.id === selectedChannel.id);
      if (nextChan) {
        setSelectedChannel(nextChan);
        setSelectedServer(nextChan.servers[0]);
      }

      setRepairCount(matchedNum);
      setRepairSuccess(true);
      setRepairProgress(`نجحت المزامنة والإصلاح! تم ترقية وتربيط ${matchedNum} روابط قنوات بي إن سبورتس بنجاح.`);
      
      // Clear alerts after success
      setTimeout(() => {
        setRepairSuccess(null);
      }, 5000);
    } catch (err: any) {
      setRepairSuccess(false);
      setRepairProgress(err.message || 'حدث خطأ في جلب أو قراءة خادم البث التلقائي.');
    } finally {
      setIsRepairing(false);
    }
  };

  // App install assistance platform selection
  const [installPlatform, setInstallPlatform] = useState<'android' | 'ios'>('android');
  const [isIframe, setIsIframe] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto detect user platform and inside-iframe state
  useEffect(() => {
    try {
      const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        setInstallPlatform('ios');
      } else {
        setInstallPlatform('android');
      }
    } catch (e) {
      // safe fallback
    }

    try {
      if (window.self !== window.top) {
        setIsIframe(true);
      }
    } catch (e) {
      setIsIframe(true);
    }
  }, []);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.origin || window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (err) {
      // fallback
    }
  };

  // Fetch breaking news from full-stack Gemini Search Grounding endpoint
  useEffect(() => {
    let isMounted = true;
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (isMounted) {
          if (data && Array.isArray(data.news)) {
            setNews(data.news);
          } else {
            // fallback
            setNews([
              "عاجل: انطلاق جولة التصفيات المؤهلة للبطولة الكبرى اليوم وسط ترقب جماهيري كبير أولاً بأول",
              "متابعة حية: الكشف عن مواعيد مبارات القمة القادمة في الدوريات الكبرى وتفاصيل انتقال اللاعبين",
              "استعدادات مكثفة للمنتخبات والفرق لمباريات نصف النهائي المرتقبة وسرية تامة في التدريبات الأخيرة"
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch sports news ticker:", err);
      } finally {
        if (isMounted) {
          setLoadingNews(false);
        }
      }
    }
    fetchNews();
    
    // Refresh news every 3 minutes
    const interval = setInterval(fetchNews, 3 * 1000 * 60);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Settings Panel State
  const [showSettings, setShowSettings] = useState(false);
  const [showChannelsSidebar, setShowChannelsSidebar] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [newServerUrl, setNewServerUrl] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const parseM3UContent = (text: string) => {
    try {
      const lines = text.split('\n');
      let currentInfo = '';
      const parsedLinks: { name: string; url: string }[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('#EXTINF:')) {
          currentInfo = line;
        } else if (line.startsWith('http')) {
          if (currentInfo) {
            let name = '';
            const match = currentInfo.match(/,(.*)$/);
            if (match && match[1]) {
              name = match[1].trim();
            }
            parsedLinks.push({ name, url: line });
          }
        }
      }

      if (parsedLinks.length === 0) {
        throw new Error('الملف فارغ أو لا يحتوي على بنية M3U صالحة.');
      }

      // Map matching channels automatically based on keywords
      const updated = channels.map(ch => {
        const patternAr = ch.nameAr.replace('بي إن سبورتس', '').trim();
        const patternEn = ch.nameEn.replace('beIN SPORTS', '').trim();
        
        const found = parsedLinks.find(link => {
          const lName = link.name.toLowerCase();
          const targetAr = ch.nameAr.toLowerCase();
          const targetEn = ch.nameEn.toLowerCase();
          
          return (
            lName.includes(targetAr) || 
            lName.includes(targetEn) ||
            (lName.includes('sports') && lName.includes(ch.number)) ||
            (lName.includes('bein') && lName.includes(ch.number)) ||
            (lName.includes('bein') && lName.includes(patternAr.toLowerCase())) ||
            (lName.includes('bein') && lName.includes(patternEn.toLowerCase()))
          );
        });

        if (found) {
          const updatedServers = ch.servers.map((srv, idx) => {
            if (idx === 0) {
              return { ...srv, url: found.url };
            }
            return srv;
          });
          return { ...ch, servers: updatedServers };
        }
        return ch;
      });

      setChannels(updated);
      localStorage.setItem('cap_sports_channels_custom_v3', JSON.stringify(updated));
      
      const nextChan = updated.find(c => c.id === selectedChannel.id);
      if (nextChan) {
        setSelectedChannel(nextChan);
        setSelectedServer(nextChan.servers[0]);
      }

      setAlertMessage('تهانينا! تم تحميل ملف الـ M3U وتحديث قنوات بي إن سبورتس بنجاح!');
      setTimeout(() => setAlertMessage(null), 4000);
    } catch (err: any) {
      setAlertMessage('خطأ في معالجة ملف M3U. تأكد من سلامة البث.');
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  const handleM3UFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseM3UContent(text);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseM3UContent(text);
    };
    reader.readAsText(file);
  };

  // 1. Secret Key Sequence Listener (Keyboard 1717)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow numerical input
      if (/^[0-9]$/.test(e.key)) {
        setTypedSequence(prev => {
          const next = (prev + e.key).slice(-4); // Keep last 4 digits
          if (next === '1717') {
            triggerUnlock();
            return '';
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('cap_sports_unlocked_session', 'true');
    setShowSecretModal(false);
    setTypedSequence('');
    setLogoTaps(0);
  };

  const handleManualPasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode === '1717') {
      triggerUnlock();
      setManualCode('');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
      setManualCode('');
      setTimeout(() => setPasscodeError(false), 1500);
    }
  };

  // Invisible/Secret tap mechanism on the welcome logo. Tapping 3 times toggles code entry pad
  const handleLogoTap = () => {
    setLogoTaps(prev => {
      const next = prev + 1;
      if (next >= 3) {
        setShowSecretModal(true);
        return 0;
      }
      return next;
    });
  };

  // Reset Logo taps after a short timeout to avoid accidental activations
  useEffect(() => {
    if (logoTaps > 0) {
      const timer = setTimeout(() => {
        setLogoTaps(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [logoTaps]);

  // Favorites hander
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('cap_sports_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Switch channel
  const selectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    setSelectedServer(channel.servers[0]);
    setShowChannelsSidebar(false);
    // Scroll player into view on small screens
    const playerEl = document.getElementById('main-player-top');
    if (playerEl && window.innerWidth < 768) {
      playerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Combine native channels and playlist-loaded custom channels
  const allChannels = useMemo(() => {
    return [...channels, ...playlistChannels];
  }, [channels, playlistChannels]);

  // Filter channels
  const filteredChannels = allChannels.filter(channel => {
    const matchesSearch = channel.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          channel.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          channel.number.includes(searchQuery);
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'favorites') return matchesSearch && favorites.includes(channel.id);
    return matchesSearch && channel.category === selectedCategory;
  });

  // Handle player-level URL updates (saved back to the collection)
  const handlePlayerUrlUpdate = (newUrl: string) => {
    updateChannelServerUrl(selectedChannel.id, selectedServer.id, newUrl);
  };

  const updateChannelServerUrl = (channelId: string, serverId: string, newUrl: string) => {
    const updated = channels.map(ch => {
      if (ch.id === channelId) {
        const updatedServers = ch.servers.map(srv => {
          if (srv.id === serverId) {
            return { ...srv, url: newUrl };
          }
          return srv;
        });
        return { ...ch, servers: updatedServers };
      }
      return ch;
    });

    setChannels(updated);
    localStorage.setItem('cap_sports_channels_custom_v3', JSON.stringify(updated));
    
    // Live update selected server too
    const nextChan = updated.find(c => c.id === channelId);
    if (nextChan) {
      setSelectedChannel(nextChan);
      const nextSrv = nextChan.servers.find(s => s.id === serverId);
      if (nextSrv) {
        setSelectedServer(nextSrv);
      }
    }

    setAlertMessage('تم تحديث الرابط بنجاح وحفظه محلياً.');
    setTimeout(() => setAlertMessage(null), 3500);
  };

  // Reset to default BeIN configurations
  const resetToFactoryDefaults = () => {
    if (window.confirm('هل أنت متأكد من إعادة تعيين كافة القنوات وروابط التشغيل إلى الروابط الافتراضية؟')) {
      localStorage.removeItem('cap_sports_channels_custom_v3');
      setChannels(INITIAL_CHANNELS);
      setSelectedChannel(INITIAL_CHANNELS[0]);
      setSelectedServer(INITIAL_CHANNELS[0].servers[0]);
      setAlertMessage('تم إعادة التعيين إلى القائمة الافتراضية بنجاح.');
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  // Lock Out application again
  const handleLockAgain = () => {
    localStorage.removeItem('cap_sports_unlocked_session');
    setIsUnlocked(false);
  };

  // Helper to render the shared Channels List structure
  const renderSidebarContent = (isDrawer = false) => {
    return (
      <div className="flex flex-col gap-3">
        {/* Search bar */}
        <div className="relative">
          <input 
            type="text"
            placeholder="ابحث عن اسم القناة أو بلدها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-purple-950/85 rounded-2xl pr-9 pl-4 py-2 text-xs text-purple-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            dir="rtl"
            id={isDrawer ? "search-channels-input-drawer" : "search-channels-input-sidebar"}
          />
          <Search className="absolute right-3 top-2.5 h-4.5 w-4.5 text-purple-400 animate-pulse" />
        </div>

        {/* Horizontal Scroll category badges */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1 select-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-[11px] px-3 py-1 rounded-full font-bold whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-purple-700 text-white'
                : 'bg-neutral-950 text-purple-300/80 border border-purple-950 hover:bg-neutral-850'
            }`}
            id={isDrawer ? "cat-badge-all-drawer" : "cat-badge-all-sidebar"}
          >
            الكل
          </button>

          <button
            onClick={() => setSelectedCategory('favorites')}
            className={`text-[11px] px-3 py-1 rounded-full font-bold whitespace-nowrap transition flex items-center gap-1 ${
              selectedCategory === 'favorites'
                ? 'bg-purple-700 text-white'
                : 'bg-neutral-950 text-purple-300/80 border border-purple-950 hover:bg-neutral-850'
            }`}
            id={isDrawer ? "cat-badge-fav-drawer" : "cat-badge-fav-sidebar"}
          >
            <Heart className="h-3 w-3 fill-current" />
            المفضلة
          </button>

          {Object.entries({
            ...CATEGORY_LABELS,
            iptv: '📺 اشتراكاتي الشخصية (IPTV / Xtream)'
          }).map(([key, value]) => {
            if (key === 'all') return null;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`text-[11px] px-3 py-1 rounded-full font-bold whitespace-nowrap transition ${
                  selectedCategory === key
                    ? 'bg-purple-700 text-white'
                    : 'bg-neutral-950 text-purple-300/80 border border-purple-950 hover:bg-neutral-850'
                }`}
                id={isDrawer ? `cat-badge-${key}-drawer` : `cat-badge-${key}-sidebar`}
              >
                {value}
              </button>
            );
          })}
        </div>

        {/* Channels Counter */}
        <div className="text-[10px] text-purple-400 font-bold flex justify-between px-1">
          <span>قائمة القنوات الرياضية العالمية والمحلية</span>
          <span>{filteredChannels.length} قناة</span>
        </div>

        {/* Vertical Channel buttons */}
        <div className={`flex flex-col gap-1.5 overflow-y-auto pr-1 scrollbar-thin ${
          isDrawer ? 'max-h-[calc(100vh-230px)]' : 'max-h-[500px]'
        }`}>
          <AnimatePresence mode="popLayout">
            {filteredChannels.length > 0 ? (
              filteredChannels.map((channel) => {
                const isSelected = selectedChannel.id === channel.id;
                const isFav = favorites.includes(channel.id);
                
                return (
                  <motion.button
                    layout
                    key={channel.id}
                    onClick={() => selectChannel(channel)}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`w-full text-right flex items-center justify-between p-3 rounded-2xl border transition duration-150 ${
                      isSelected 
                        ? 'bg-purple-950/40 border-purple-500 shadow-sm shadow-purple-900/20 text-purple-100' 
                        : 'bg-neutral-950 border-purple-950/50 text-purple-300 hover:bg-neutral-900/60'
                    }`}
                    id={isDrawer ? `channel-card-${channel.id}-drawer` : `channel-card-${channel.id}-sidebar`}
                  >
                    <div className="flex items-center gap-3 animate-fade-in-item">
                      {/* Channel Number styling in purple background */}
                      <div className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition ${
                        isSelected 
                          ? 'bg-purple-700 text-white' 
                          : 'bg-purple-950/60 border border-purple-900/40 text-purple-300'
                      }`}>
                        {channel.number}
                      </div>

                      <div className="text-right">
                        <h4 className={`text-xs font-bold transition-colors ${
                          isSelected ? 'text-white font-extrabold' : 'text-purple-100'
                        }`}>
                          {channel.nameAr}
                        </h4>
                        <span className="text-[10px] text-purple-400 font-mono">
                          {channel.nameEn}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Favorite heart tag */}
                      <button
                        onClick={(e) => toggleFavorite(channel.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isFav 
                            ? 'text-red-500 hover:bg-red-950/40' 
                            : 'text-neutral-600 hover:text-purple-300'
                        }`}
                        id={isDrawer ? `btn-fav-toggle-${channel.id}-drawer` : `btn-fav-toggle-${channel.id}-sidebar`}
                      >
                        <Heart className="h-3.8 w-3.8 fill-current" />
                      </button>

                      {/* Tag indicator */}
                      {channel.isPremium && (
                        <span className="text-[8px] bg-amber-950/20 text-amber-400 border border-amber-900/30 font-extrabold px-1.5 py-0.5 rounded uppercase font-sans">
                          VIP
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })
            ) : (
              <div className="text-center py-10 px-4 text-xs text-purple-400/80 space-y-2">
                <div>لا توجد قنوات تطابق عملية البحث الحالية.</div>
                {selectedCategory === 'favorites' && (
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="text-purple-400 font-bold underline"
                  >
                    عرض جميع القنوات
                  </button>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic ad space within sidebar */}
        <div className="pt-2.5 border-t border-purple-950/40 mt-1.5">
          <AdBannerSpace id="sidebar-square" size="square" labelAr="مساحة إعلانية بالمرونة التامة" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-purple-600 selection:text-white flex flex-col antialiased">
      
      {/* Alert toast notification bar */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-purple-900 border border-purple-800 text-white font-semibold text-xs py-3 px-6 rounded-2xl shadow-xl z-50 flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-purple-300 animate-pulse" />
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          
          /* ================= LOCKED SPLASH SCREEN ================= */
          <motion.div 
            key="lock-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center bg-black p-6 relative overflow-hidden"
          >
            {/* Background design accents (soft shadows and light minimal shapes) */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-950/20 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-950/20 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3" />

            {/* Secret keyboard listener note visible only during inspection */}
            <div className="hidden">
              Secret access: click anywhere on the screen and type 1717 to bypass.
            </div>

            <div className="relative text-center max-w-md w-full flex flex-col items-center">
              
              {/* Premium Branding Logo Wrapper */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogoTap}
                className="cursor-pointer mb-6 relative group"
                title="اضغط هنا لتفعيل لوحة الدخول السري"
              >
                <div className="absolute inset-0 bg-purple-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <MhdSportsLogo size="lg" />
              </motion.div>

              {/* Welcome text */}
              <h1 className="text-3xl font-black text-purple-300 tracking-tight select-none">
                MHD SPORTS
              </h1>
              <p className="mt-2 text-purple-400/80 text-xs font-semibold uppercase tracking-widest select-none font-sans">
                PREMIUM LIVE CHANNELS
              </p>
              
              <div className="w-16 h-1 bg-purple-600 my-4 rounded-full" />

              <span className="text-purple-200/95 text-xs text-center py-2.5 px-5 rounded-full border border-purple-900/60 bg-neutral-950 shadow-sm leading-relaxed max-w-sm">
                مرحباً بك في منصة البث المباشر. يرجى إدخال رمز الدخول السري للاستمرار.
              </span>

              {/* Helpful minimal guide for developer: "If you don't have a physical keyboard, double click the logo/brand" */}
              <button 
                onClick={() => setShowSecretModal(true)}
                className="mt-8 text-[11px] font-bold text-purple-400 hover:text-purple-300 transition underline tracking-wide"
                id="btn-trigger-passcode"
              >
                الدخول عبر لوحة الأرقام السريّة
              </button>

              <div className="mt-14 flex items-center gap-1.5 text-purple-400/60 text-[10px] font-medium uppercase tracking-wider select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-700 animate-pulse"></span>
                MHD SPORTS V1.2 • SECURED BY 1717
              </div>
            </div>

            {/* SECRET PIN-PAD MODAL */}
            <AnimatePresence>
              {showSecretModal && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                  onClick={() => setShowSecretModal(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.95, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 15 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-neutral-900 rounded-3xl p-6 border border-purple-950 shadow-2xl max-w-xs w-full text-center"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-6" />
                      <span className="text-xs font-bold text-purple-300">رمز التحقق الأمني</span>
                      <button 
                        onClick={() => setShowSecretModal(false)}
                        className="text-neutral-400 hover:text-purple-300 p-1 rounded-full hover:bg-neutral-850 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-purple-200/70 mb-5 font-sans">
                      أدخل رمز عبور التطبيق السري المكون من 4 أرقام للدخول
                    </p>

                    <form onSubmit={handleManualPasscodeSubmit} className="flex flex-col gap-4">
                      <input 
                        type="password"
                        maxLength={4}
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value.replace(/\D/g, ''))}
                        className={`w-full text-center text-xl font-bold tracking-widest border px-4 py-3 rounded-2xl bg-neutral-950 text-purple-200 focus:outline-none focus:ring-2 transition-all ${
                          passcodeError 
                            ? 'border-red-500 focus:ring-red-500 animate-shake' 
                            : 'border-purple-900 focus:ring-purple-600'
                        }`}
                        placeholder="••••"
                        autoFocus
                        dir="ltr"
                        id="passcode-input"
                      />

                      {passcodeError && (
                        <span className="text-[10px] text-red-600 font-bold animate-pulse">
                          الرمز السري غير صحيح! حاول مجدداً.
                        </span>
                      )}

                      <div className="grid grid-cols-4 gap-2 text-center text-xs mt-2">
                        {['1','7','1','7'].map((num, i) => (
                          <div 
                            key={i} 
                            onClick={() => {
                              if (manualCode.length < 4) {
                                setManualCode(prev => prev + num);
                              }
                            }}
                            className="bg-purple-950/40 text-purple-300 border border-purple-900/40 font-bold p-3.5 rounded-xl cursor-pointer hover:bg-purple-900/40 transition active:scale-95 select-none"
                          >
                            {num}
                          </div>
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs py-3 rounded-xl transition shadow-md shadow-purple-900/10 mt-2"
                        id="btn-verify-passcode"
                      >
                        تأكيد الدخول السري
                      </button>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        ) : (
          
          /* ================= MAIN INTERFACE (MHD SPORTS PLATFORM) ================= */
          <motion.div 
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col bg-black text-white"
          >
            {/* Warning when viewed inside sandboxed iFrame */}
            {isIframe && (
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-b border-amber-500/30 px-4 py-3 text-right relative z-30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" dir="rtl">
                <div className="flex items-center gap-2 justify-end">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse block shrink-0" />
                  <p className="text-xs text-amber-200 font-sans font-medium">
                    تنبيه: أنت تتصفح التطبيق داخل نافذة المعاينة المحدودة. لتشغيل البث البث المباشر وتثبيت التطبيق على شاشة هاتفك، يرجى فتح الرابط مباشرة في متصفح هاتفك الأصلي.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2.5">
                  <button 
                    onClick={handleCopyLink}
                    className="bg-neutral-900 border border-amber-500/20 text-[10px] text-amber-300 px-3 py-1 rounded-lg hover:bg-neutral-850 hover:border-amber-500 transition-all flex items-center gap-1 font-bold font-sans cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3 w-3 text-green-400" />
                        تم نسخ الرابط!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        نسخ رابط المنصة
                      </>
                    )}
                  </button>
                  <a 
                    href={typeof window !== 'undefined' ? window.location.href : '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-400 text-black text-[10px] px-3.5 py-1.5 rounded-lg font-black transition-all flex items-center gap-1 shrink-0 font-sans"
                  >
                    <ExternalLink className="h-3 w-3" />
                    فتح في متصفح خارجي 🔴
                  </a>
                </div>
              </div>
            )}

            {/* Header / Top Navigation Bar (Black Background, Purple Brand & Accents) */}
            <header className="sticky top-0 bg-neutral-950/95 backdrop-blur-md border-b border-purple-950/80 py-3.5 px-4 md:px-8 flex items-center justify-between z-30">
              
              <div className="flex items-center gap-2">
                <MhdSportsLogo size="sm" />
                <div>
                  <h2 className="text-base font-black text-purple-300 leading-none">MHD SPORTS</h2>
                  <span className="text-[10px] font-bold text-purple-500/80 tracking-tight uppercase">
                    البث المباشر للقنوات العالمية والمحلية
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                {/* Install App Button */}
                <button
                  onClick={() => setShowPwaModal(true)}
                  className="bg-neutral-900 border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-950/20 active:scale-95 text-purple-200 text-xs py-2.5 px-3 md:px-4 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer font-bold"
                  title="تثبيت تطبيق MHD SPORTS APK"
                >
                  <Smartphone className="h-4 w-4 text-purple-400 animate-pulse" />
                  <span className="hidden sm:inline">تثبيت تطبيق الهاتف 📱</span>
                  <span className="inline sm:hidden font-black text-[10px]">تثبيت APK</span>
                </button>

                {/* Header Collapsible Menu Toggle Button */}
                <button
                  onClick={() => setShowMainMenu(!showMainMenu)}
                  className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-black text-xs px-5 py-2.5 rounded-2xl transition duration-150 flex items-center gap-2 shadow-lg shadow-purple-950/50 cursor-pointer"
                >
                  <Menu className={`h-4 w-4 text-purple-200 transition-transform ${showMainMenu ? 'rotate-90' : ''}`} />
                  <span>القائمة</span>
                </button>
              </div>

            </header>



            {/* MAIN TWO-COLUMN RESPONSIVE LAYOUT */}
            <main className={`flex-1 w-full mx-auto px-4 md:px-8 py-6 flex flex-col gap-6 transition-all duration-300 ${
              showChannelsSidebar ? 'max-w-7xl md:grid md:grid-cols-12' : 'max-w-4xl'
            }`}>
              
              {/* PLAYBACK STYLED SECTION - Left Column if side list open, Full centered width if closed */}
              <div className={`flex flex-col gap-5 transition-all duration-300 ${
                showChannelsSidebar ? 'md:col-span-8' : 'w-full'
              }`}>
                
                {/* Visual anchor for scrolling back on mobile */}
                <div id="main-player-top" className="scroll-mt-24" />

                {/* Active Channel & Selector Card Bar */}
                <div className="bg-neutral-900 px-5 py-4 rounded-3xl border border-purple-950/80 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-right">
                    <span className="text-[10px] bg-purple-950/80 text-purple-300 border border-purple-900/40 px-2 py-0.5 rounded-full font-bold animate-pulse inline-block">
                      تبث الآن مباشر 🔴
                    </span>
                    <h3 className="text-base font-black text-purple-300 flex items-center gap-2 justify-end">
                      <Radio className="h-4.5 w-4.5 text-purple-500 animate-pulse" />
                      {selectedChannel.nameAr}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 justify-end">
                    <button
                      onClick={() => setShowMainMenu(!showMainMenu)}
                      className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-black text-xs px-6 py-3 rounded-2xl transition duration-150 flex items-center justify-center gap-2.5 shadow-lg shadow-purple-950/50 cursor-pointer"
                      id="btn-trigger-main-menu"
                    >
                      <Menu className={`h-4.5 w-4.5 text-purple-200 transition-transform ${showMainMenu ? 'rotate-90' : ''}`} />
                      <span>{showMainMenu ? 'إغلاق القائمة' : 'القائمة'}</span>
                    </button>
                    
                    <button
                      onClick={() => setShowChannelsSidebar(!showChannelsSidebar)}
                      className="w-full sm:w-auto bg-neutral-950 border border-purple-950 hover:bg-purple-950/30 active:scale-95 text-purple-200 font-extrabold text-xs px-5 py-3 rounded-2xl transition duration-150 flex items-center justify-center gap-2"
                      id="btn-trigger-sidebar"
                    >
                      <Tv className="h-4 w-4" />
                      <span>القائمة الجانبية</span>
                    </button>
                  </div>
                </div>

                {/* VIDEO FEEDS PLAYER */}
                <HlsPlayer 
                  src={selectedServer.url}
                  title={`${selectedChannel.nameAr} - ${selectedServer.name}`}
                  isPremium={selectedChannel.isPremium}
                  onUpdateUrl={handlePlayerUrlUpdate}
                  type={selectedServer.type}
                />

                {/* BREAKING NEWS MARQUEE TICKER */}
                <BreakingNewsTicker />

                {/* MAIN LARGE HORIZONTAL HIGH-IMPACT AD SPACE */}
                <AdBannerSpace id="main-horizontal" size="horizontal" labelAr="مساحة إعلانية عريضة فائقة الجودة" />

                {/* UNSTOPPABLE PARTNERS VIDEO BILLBOARD */}
                <PartnersBillboard />

              </div>

              {/* DOCKET SIDEBAR - Left Side Edge on Desktop */}
              {showChannelsSidebar && (
                <div className="hidden md:flex md:col-span-4 flex-col gap-4 animate-fade-in-item">
                  <div className="bg-neutral-900 rounded-3xl border border-purple-950 p-5 shadow-lg flex flex-col gap-4">
                    
                    {/* Sidebar Header */}
                    <div className="flex justify-between items-center pb-3 border-b border-purple-950/80">
                      <button 
                        onClick={() => setShowChannelsSidebar(false)}
                        className="text-purple-400 hover:text-purple-200 p-2 rounded-xl hover:bg-neutral-850 transition"
                        title="إغلاق القائمة الجانبية"
                      >
                        <X className="h-4.5 w-4.5" />
                      </button>

                      <div className="text-right">
                        <h3 className="text-sm font-black text-purple-300 flex items-center gap-2 justify-end">
                          <Tv className="h-4 w-4 text-purple-400" />
                          <span>قنوات البث المباشر</span>
                        </h3>
                        <p className="text-[10px] text-purple-400/80 mt-0.5">انقر على القناة وسيتم إخفاء القائمة تلقائياً</p>
                      </div>
                    </div>

                    {/* Shared Content list */}
                    {renderSidebarContent(false)}

                  </div>
                </div>
              )}

            </main>


            {/* BRAND CHANNELS SLIDE-OUT PANEL (SIDEBAR DRAWER) FOR MOBILE ONLY */}
            <AnimatePresence>
              {showChannelsSidebar && (
                <div 
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex justify-end md:hidden"
                  onClick={() => setShowChannelsSidebar(false)}
                >
                  <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                    className="w-full max-w-sm bg-neutral-900 h-full shadow-2xl overflow-y-auto p-5 flex flex-col gap-4 border-l border-purple-950"
                    onClick={(e) => e.stopPropagation()}
                  >
                    
                    {/* Drawer Header */}
                    <div className="flex justify-between items-center pb-3 border-b border-purple-950/80">
                      <button 
                        onClick={() => setShowChannelsSidebar(false)}
                        className="text-purple-400 hover:text-purple-250 p-2 rounded-xl hover:bg-neutral-850 transition"
                      >
                        <X className="h-5 w-5" />
                      </button>

                      <div className="text-right">
                        <h3 className="text-sm font-black text-purple-300 flex items-center gap-2 justify-end">
                          <Tv className="h-4 w-4 text-purple-400" />
                          <span>قنوات البث المباشر</span>
                        </h3>
                        <p className="text-[10px] text-purple-400/80 mt-0.5">انقر على القناة وسيختفي هذا المعرض تلقائياً</p>
                      </div>
                    </div>

                    {/* Shared Content list */}
                    {renderSidebarContent(true)}

                  </motion.div>
                </div>
              )}
            </AnimatePresence>


            {/* DETAILED CHANNELS EDITING PANEL (SETTINGS) */}
            <AnimatePresence>
              {showSettings && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex justify-end">
                  <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                    className="w-full max-w-md bg-neutral-900 h-full shadow-2xl overflow-y-auto p-6 flex flex-col gap-6 border-l border-purple-950"
                  >
                    
                    {/* Settings Header */}
                    <div className="flex justify-between items-center pb-4 border-b border-purple-950/80">
                      <div className="text-right">
                        <h3 className="text-sm font-bold text-purple-300">إعدادات القنوات والروابط</h3>
                        <p className="text-[11px] text-purple-400/80 mt-0.5">تعديل روفرات ومجموعة قنوات BeIN Sports</p>
                      </div>
                      <button 
                        onClick={() => setShowSettings(false)}
                        className="text-purple-400 hover:text-purple-200 p-2 rounded-xl hover:bg-neutral-850 transition"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Reset button action */}
                    <div className="bg-red-950/20 rounded-2xl p-4 border border-red-900/30 flex items-center justify-between text-xs gap-4">
                      <button 
                        onClick={resetToFactoryDefaults}
                        className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition shrink-0"
                        id="btn-factory-reset"
                      >
                        استعادة المصنع
                      </button>

                      <div className="space-y-0.5 text-right flex-1">
                        <div className="font-bold text-red-200">استعادة الروابط الافتراضية</div>
                        <div className="text-[10px] text-red-400/80">إرجاع جميع قنوات BeIN إلى روابط التشغيل الافتراضية</div>
                      </div>
                    </div>

                    {/* beIN Sports Automatic Repair & Feed Upgrader Card */}
                    <div className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 border border-purple-900/50 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="text-right">
                        <div className="text-xs font-black text-purple-300 flex items-center gap-1.5 justify-end">
                          <span>إصلاح وترقية قنوات beIN Sports تلقائياً</span>
                          <Sparkles className="h-4.5 w-4.5 text-purple-400 animate-pulse" />
                        </div>
                        <p className="text-[10px] text-purple-400/80 mt-1 leading-normal">
                          إذا كانت باقة بي إن سبورتس لا تعمل، اضغط على زر الإصلاح أدناه للاتصال التلقائي بسيرفرات التحديث المباشر وتنشيط الروابط فوراً.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        {isRepairing ? (
                          <div className="bg-neutral-950 p-3 rounded-xl border border-purple-900/30 flex flex-col items-center gap-2">
                            <span className="h-4 w-4 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></span>
                            <span className="text-[10px] text-purple-300 font-medium text-center leading-normal animate-pulse">
                              {repairProgress}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-1.5">
                              <input 
                                type="url"
                                value={pairedUrl}
                                onChange={(e) => setPairedUrl(e.target.value)}
                                placeholder="أو ضع رابط سيرفر تشغيل M3U مخصص..."
                                className="flex-1 bg-neutral-950 border border-purple-900/40 rounded-xl px-2.5 py-1.5 text-[10px] text-purple-200 placeholder-purple-500/30 ltr font-mono text-left focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent transition"
                              />
                              <button
                                onClick={() => repairBeInChannels()}
                                className="bg-purple-700 hover:bg-purple-600 text-white text-[10px] font-black px-3.5 py-1.5 rounded-xl transition cursor-pointer shrink-0"
                              >
                                إصلاح البث
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-1.5 mt-0.5" dir="rtl">
                              <button
                                onClick={() => repairBeInChannels('https://raw.githubusercontent.com/mazenid/M3u/main/Sports.m3u')}
                                className="bg-neutral-950 hover:bg-purple-950/30 border border-purple-950 hover:border-purple-800 text-[9px] text-purple-200 font-bold py-1.5 rounded-lg transition cursor-pointer"
                              >
                                السيرفر الرئيسي (Mazen)
                              </button>
                              <button
                                onClick={() => repairBeInChannels('https://iptv-org.github.io/iptv/categories/sports.m3u')}
                                className="bg-neutral-950 hover:bg-purple-950/30 border border-purple-950 hover:border-purple-800 text-[9px] text-purple-200 font-bold py-1.5 rounded-lg transition cursor-pointer"
                              >
                                السيرفر العالمي (IPTV-Org)
                              </button>
                            </div>
                          </div>
                        )}

                        {repairSuccess === true && (
                          <div className="bg-emerald-950/20 border border-emerald-900/30 p-2.5 rounded-xl text-emerald-400 font-black text-[10px] text-center leading-relaxed">
                            {repairProgress}
                          </div>
                        )}
                        {repairSuccess === false && (
                          <div className="bg-red-950/20 border border-red-900/30 p-2.5 rounded-xl text-red-400 font-bold text-[10px] text-center leading-relaxed">
                            {repairProgress}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Drag and drop M3U upload segment */}
                    <div className="bg-purple-950/20 border border-purple-950 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="text-right">
                        <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5 justify-end">
                          <span>استيراد ملف قنوات IPTV (M3U)</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-700 animate-pulse"></span>
                        </div>
                        <p className="text-[10px] text-purple-400/70 mt-0.5">اسحب وأسقط ملف الـ M3U الخاص بك لتحديث روابط جميع القنوات في ثوانٍ معدودة</p>
                      </div>

                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-150 ${
                          isDragging 
                            ? 'border-purple-600 bg-purple-950/50 scale-[0.99]' 
                            : 'border-purple-900/50 hover:border-purple-700 bg-neutral-950'
                        }`}
                        onClick={() => document.getElementById('m3u-file-uploader')?.click()}
                      >
                        <input 
                          type="file" 
                          id="m3u-file-uploader" 
                          accept=".m3u" 
                          onChange={handleM3UFileSelect} 
                          className="hidden" 
                        />
                        <div className="flex flex-col items-center gap-2">
                          <Radio className="h-7 w-7 text-purple-500 animate-pulse" />
                          <span className="text-[11px] font-bold text-purple-300">
                            {isDragging ? 'اترك الملف لبدء الاستيراد الأوتوماتيكي...' : 'اضغط هنا لاختيار الملف أو اسحبه إلى هنا'}
                          </span>
                          <span className="text-[9px] text-purple-400/60">يدعم صيغ وقوائم تشغيل IPTV القياسية بذكاء</span>
                        </div>
                      </div>
                    </div>

                    {/* IPTV & Xtream Playlists Segment */}
                    <div className="bg-purple-950/20 border border-purple-950/80 rounded-2xl p-4 flex flex-col gap-4">
                      <div className="flex justify-between items-center pb-2 border-b border-purple-950/40">
                        <button 
                          onClick={() => setShowAddPlaylistModal(!showAddPlaylistModal)}
                          className="bg-purple-850 hover:bg-purple-750 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer border border-purple-800"
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span>إضافة اشتراك</span>
                        </button>
                        <div className="text-right">
                          <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5 justify-end">
                            <span>اشتراكاتك (IPTV & Xtream)</span>
                            <Database className="h-4 w-4 text-purple-400" />
                          </div>
                          <p className="text-[10px] text-purple-400/70 mt-0.5">أضف حسابات Xtream أو روابط وقوائم M3U لتشغيل قنواتك الخاصة</p>
                        </div>
                      </div>

                      {/* Active Playlists List */}
                      <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
                        {playlists.length === 0 ? (
                          <div className="text-center py-4 bg-neutral-950/40 rounded-xl border border-purple-950/30 text-purple-400/60 text-[11px] leading-relaxed px-4">
                            لا توجد قنوات أو اشتراكات خارجية مفعلة حالياً. اضغط على "إضافة اشتراك" لإدخال اشتراكاتك الخاصة في ثوانٍ.
                          </div>
                        ) : (
                          playlists.map((pl) => (
                            <div key={pl.id} className="bg-neutral-950/80 border border-purple-950/40 p-2.5 rounded-xl flex items-center justify-between gap-3 text-right">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleRemovePlaylist(pl.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-950/30 p-1.5 rounded-lg transition shrink-0 cursor-pointer"
                                  title="حذف الاشتراك"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                                <div className="flex items-center gap-1 bg-neutral-900 border border-purple-950/30 rounded-lg p-0.5 shrink-0">
                                  <span className="text-[9px] text-purple-300 font-bold px-1">{pl.channelsCount} ق</span>
                                  <button 
                                    onClick={() => handleTogglePlaylist(pl.id)}
                                    className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                                      pl.enabled 
                                        ? 'bg-purple-850 text-white' 
                                        : 'bg-neutral-850 text-neutral-400'
                                    }`}
                                  >
                                    {pl.enabled ? 'مفعل' : 'معطل'}
                                  </button>
                                </div>
                              </div>

                              <div className="flex-1 space-y-0.5 text-right overflow-hidden">
                                <div className="text-[11px] font-bold text-purple-100 flex items-center gap-1.5 justify-end">
                                  <span className="truncate max-w-[120px]">{pl.name}</span>
                                  <span className={`text-[8px] px-1.5 py-0.2 rounded font-black shrink-0 ${
                                    pl.type === 'xtream' 
                                      ? 'bg-teal-950/40 text-teal-300 border border-teal-900/30' 
                                      : 'bg-indigo-950/40 text-indigo-300 border border-indigo-900/40'
                                  }`}>
                                    {pl.type === 'xtream' ? 'Xtream' : 'M3U'}
                                  </span>
                                </div>
                                <div className="text-[8px] text-purple-400/60 truncate max-w-[150px] font-mono select-all">
                                  {pl.type === 'm3u_pasted' ? 'نص ملقن يدوياً' : pl.url}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Form for adding playlist */}
                      <AnimatePresence>
                        {showAddPlaylistModal && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-neutral-950 border border-purple-950 p-3 rounded-xl flex flex-col gap-3 overflow-hidden text-right"
                            dir="rtl"
                          >
                            <div className="flex justify-between items-center border-b border-purple-950/40 pb-1.5">
                              <span className="text-[11px] font-bold text-purple-300">نموذج استيراد القنوات والاشتراكات</span>
                              <button 
                                onClick={() => {
                                  setShowAddPlaylistModal(false);
                                  setPlaylistError(null);
                                }} 
                                className="text-purple-400 hover:text-purple-200 cursor-pointer"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {/* Type tabs switch */}
                            <div className="grid grid-cols-3 gap-1 bg-neutral-900 p-1 border border-purple-950/30 rounded-lg">
                              <button 
                                type="button"
                                onClick={() => {
                                  setNewPlType('m3u_url');
                                  setPlaylistError(null);
                                }}
                                className={`text-[9px] py-1 rounded font-bold transition-all cursor-pointer ${
                                  newPlType === 'm3u_url' 
                                    ? 'bg-purple-800 text-white' 
                                    : 'text-purple-400 hover:text-purple-200'
                                }`}
                              >
                                رابط M3U
                              </button>
                              <button 
                                type="button"
                                onClick={() => {
                                  setNewPlType('xtream');
                                  setPlaylistError(null);
                                }}
                                className={`text-[9px] py-1 rounded font-bold transition-all cursor-pointer ${
                                  newPlType === 'xtream' 
                                    ? 'bg-purple-800 text-white' 
                                    : 'text-purple-400 hover:text-purple-200'
                                }`}
                              >
                                حساب Xtream
                              </button>
                              <button 
                                type="button"
                                onClick={() => {
                                  setNewPlType('m3u_pasted');
                                  setPlaylistError(null);
                                }}
                                className={`text-[9px] py-1 rounded font-bold transition-all cursor-pointer ${
                                  newPlType === 'm3u_pasted' 
                                    ? 'bg-purple-800 text-white' 
                                    : 'text-purple-400 hover:text-purple-200'
                                }`}
                              >
                                لصق كود
                              </button>
                            </div>

                            {/* Form Inputs */}
                            <div className="flex flex-col gap-2.5">
                              <div className="space-y-1">
                                <label className="text-[10px] text-purple-300 font-bold block">اسم مخصص للاشتراك:</label>
                                <input 
                                  type="text" 
                                  placeholder="مثال: باقتي الذهبية، قنواتي المفضلة"
                                  value={newPlName}
                                  onChange={(e) => setNewPlName(e.target.value)}
                                  className="w-full bg-neutral-900 border border-purple-950/70 p-2 text-xs rounded-lg text-white placeholder-purple-400/40 font-bold focus:outline-none focus:border-purple-600 text-right"
                                />
                              </div>

                              {newPlType === 'm3u_url' && (
                                <div className="space-y-1">
                                  <label className="text-[10px] text-purple-300 font-bold block">رابط تشغيل M3U (Playlist URL):</label>
                                  <input 
                                    type="url" 
                                    placeholder="https://domain.com/get.php?auth=xxx"
                                    value={newPlUrl}
                                    onChange={(e) => setNewPlUrl(e.target.value)}
                                    className="w-full bg-neutral-900 border border-purple-950/70 p-2 text-[10px] rounded-lg text-white placeholder-purple-400/40 font-mono focus:outline-none focus:border-purple-600 text-left ltr"
                                  />
                                </div>
                              )}

                              {newPlType === 'm3u_pasted' && (
                                <div className="space-y-1">
                                  <label className="text-[10px] text-purple-300 font-bold block">لصق كود ملف M3U هنا:</label>
                                  <textarea 
                                    placeholder="#EXTM3U&#10;#EXTINF:-1,اسم القناة&#10;http://server.com/live.m3u8"
                                    value={newPlPastedText}
                                    onChange={(e) => setNewPlPastedText(e.target.value)}
                                    rows={4}
                                    className="w-full bg-neutral-900 border border-purple-950/70 p-2 text-[10px] rounded-lg text-white placeholder-purple-400/40 font-mono focus:outline-none focus:border-purple-600 text-left ltr"
                                  />
                                </div>
                              )}

                              {newPlType === 'xtream' && (
                                <div className="flex flex-col gap-2 bg-neutral-900/60 p-2 border border-purple-950/20 rounded-lg">
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-purple-300 font-bold block">رابط سيرفر Xtream (Host & Port):</label>
                                    <input 
                                      type="text" 
                                      placeholder="http://example.com:8080"
                                      value={newPlUrl}
                                      onChange={(e) => setNewPlUrl(e.target.value)}
                                      className="w-full bg-neutral-900 border border-purple-950/70 p-1.5 text-[10px] rounded-lg text-white placeholder-purple-400/40 font-mono focus:outline-none focus:border-purple-600 text-left ltr"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    <div className="space-y-1">
                                      <label className="text-[9px] text-purple-300 font-bold block">كلمة المرور:</label>
                                      <input 
                                        type="password" 
                                        placeholder="Password"
                                        value={newPlPassword}
                                        onChange={(e) => setNewPlPassword(e.target.value)}
                                        className="w-full bg-neutral-900 border border-purple-950/70 p-1.5 text-[10px] rounded-lg text-white placeholder-purple-400/40 font-mono focus:outline-none focus:border-purple-600 text-left ltr"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[9px] text-purple-300 font-bold block">اسم المستخدم:</label>
                                      <input 
                                        type="text" 
                                        placeholder="Username"
                                        value={newPlUsername}
                                        onChange={(e) => setNewPlUsername(e.target.value)}
                                        className="w-full bg-neutral-900 border border-purple-950/70 p-1.5 text-[10px] rounded-lg text-white placeholder-purple-400/40 font-mono focus:outline-none focus:border-purple-600 text-left ltr"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Alert of 500 cap limitation */}
                              <div className="bg-purple-950/10 border border-purple-950/30 p-2 rounded-lg text-[9px] text-purple-400 leading-normal">
                                ⚙️ ملاحظة: يتم استيراد وتحميل أول 500 قناة فقط للحفاظ على توفير التصفح ومستويات الأداء والاستجابة العالية في هاتفك المحمول.
                              </div>

                              {playlistError && (
                                <div className="bg-red-950/30 border border-red-900/40 p-2 rounded-lg text-[9px] text-red-400 font-bold">
                                  {playlistError}
                                </div>
                              )}

                              {/* Action buttons */}
                              <div className="flex gap-2 justify-end mt-1">
                                <button 
                                  type="button"
                                  disabled={playlistLoading}
                                  onClick={() => {
                                    setShowAddPlaylistModal(false);
                                    setPlaylistError(null);
                                  }}
                                  className="bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-neutral-200 text-[10px] font-bold px-3.5 py-1.5 rounded-lg transition border border-purple-950/40 cursor-pointer"
                                >
                                  إلغاء
                                </button>
                                <button 
                                  type="button"
                                  disabled={playlistLoading}
                                  onClick={handleAddNewPlaylist}
                                  className="bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 text-white text-[10px] font-black px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                                >
                                  {playlistLoading ? (
                                    <>
                                      <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                                      جاري الجلب والاستيراد...
                                    </>
                                  ) : (
                                    <>
                                      <Check className="h-3.5 w-3.5" />
                                      تحميل وحفظ القنوات
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Edit Specific Channels Area */}
                    <div className="flex-1 flex flex-col gap-3">
                      <h4 className="text-xs font-bold text-purple-300 text-right">تعديل روابط قنوات BeIN المحددة:</h4>
                      <p className="text-[11px] text-purple-400/70 -mt-1 leading-normal text-right">
                        اختر أي قناة لتغيير رابط m3u8 الخاص بها. سيتم الحفظ مباشرة في ذاكرة المتصفح المحلية لتظل جاهزة للتشغيل دائمًا.
                      </p>

                      <div className="flex flex-col gap-2 flex-1 overflow-y-auto max-h-[400px] border border-purple-950 rounded-2xl p-2 bg-neutral-950">
                        {channels.map((chan) => (
                          <div 
                            key={chan.id}
                            className={`p-3 rounded-xl border flex flex-col gap-2 transition ${
                              editingChannel?.id === chan.id 
                                ? 'bg-purple-950/40 border-purple-800' 
                                : 'bg-neutral-900 border-purple-950/40'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <button
                                onClick={() => {
                                  if (editingChannel?.id === chan.id) {
                                    setEditingChannel(null);
                                  } else {
                                    setEditingChannel(chan);
                                    setNewServerUrl(chan.servers[0].url);
                                  }
                                }}
                                className="text-[11px] font-semibold text-purple-400 hover:text-purple-200"
                                id={`btn-edit-details-${chan.id}`}
                              >
                                {editingChannel?.id === chan.id ? 'إخفاء التعديل' : 'تعديل الرابط'}
                              </button>

                              <span className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                                <span className="text-purple-300 font-mono text-[10px] bg-purple-950 border border-purple-900/40 px-1.5 py-0.5 rounded font-extrabold">{chan.number}</span>
                                {chan.nameAr}
                              </span>
                            </div>

                            {editingChannel?.id === chan.id && (
                              <div className="bg-neutral-950 p-3 rounded-lg border border-purple-900/50 flex flex-col gap-2 animate-fade-in">
                                <span className="text-[10px] text-purple-300 font-bold text-right">رابط سيرفر البث الرئيسي:</span>
                                <input 
                                  type="url" 
                                  value={newServerUrl}
                                  onChange={(e) => setNewServerUrl(e.target.value)}
                                  className="w-full bg-neutral-900 border border-purple-900/60 rounded-lg px-2 py-1.5 text-[11px] font-mono text-purple-300"
                                  dir="ltr"
                                  id={`edit-url-field-${chan.id}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => updateChannelServerUrl(chan.id, chan.servers[0].id, newServerUrl)}
                                  className="self-end bg-purple-700 hover:bg-purple-800 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition"
                                >
                                  حفظ الرابط الجديد
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-center text-purple-400/40 mt-auto pt-4 border-t border-purple-950">
                      قنوات المشاهدة المباشرة MHD SPORTS • حماية برمز 1717
                    </div>

                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* FLOATING OVERLAY DIALOG FOR MAIN CHANNELS MENU */}
            <AnimatePresence>
              {showMainMenu && (
                <div 
                  className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 text-right"
                  onClick={() => setShowMainMenu(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.95, y: 15, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: 15, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-neutral-900 border border-purple-950/80 rounded-3xl p-5 md:p-6 shadow-2xl max-w-5xl w-full flex flex-col gap-5 max-h-[92vh]"
                  >
                    {/* Modal Header */}
                    <div className="flex justify-between items-center pb-4 border-b border-purple-950/60">
                      <button 
                        onClick={() => setShowMainMenu(false)}
                        className="text-purple-400 hover:text-purple-200 p-2 rounded-xl hover:bg-neutral-800 transition cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>

                      <div className="text-right">
                        <h3 className="text-sm md:text-base font-black text-purple-300 flex items-center gap-2 justify-end">
                          <Radio className="h-4 w-4 text-purple-500 animate-pulse animate-bounce" />
                          <span>قائمة القنوات المتاحة للبث المباشر</span>
                        </h3>
                        <p className="text-[10px] md:text-xs text-purple-400/80 mt-0.5">انقر على أي قناة لتشغيلها والبدء في المشاهدة فوراً</p>
                      </div>
                    </div>

                    {/* TWO CATEGORIZED QUICK CHANNELS SECTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 flex-1">
                      <div className="bg-neutral-950/80 border border-purple-950/60 p-4 rounded-2xl flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-purple-950/40 pb-2">
                          <span className="text-[10px] font-bold text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-full font-sans">
                            {channels.filter(c => ['sports', 'premium', 'max', 'xtra', 'afc', 'news'].includes(c.category)).length} قنوات رياضية
                          </span>
                          <div className="flex items-center gap-1.5 text-right">
                            <span className="text-xs font-black text-purple-200">beIN / قنوات سبورتس</span>
                            <Trophy className="h-4 w-4 text-yellow-400" />
                          </div>
                        </div>
                        
                        <div className="max-h-[320px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-right pr-0.5 scrollbar-thin scrollbar-thumb-purple-900/60 scrollbar-track-transparent">
                          {channels
                            .filter(c => ['sports', 'premium', 'max', 'xtra', 'afc', 'news'].includes(c.category))
                            .map((chan) => (
                              <button
                                key={chan.id}
                                onClick={() => {
                                  selectChannel(chan);
                                  setShowMainMenu(false);
                                }}
                                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-150 border cursor-pointer ${
                                  selectedChannel.id === chan.id
                                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-950/40 text-[11px] font-black'
                                    : 'bg-neutral-900 hover:bg-purple-950/50 text-purple-200 border-purple-900/30'
                                }`}
                              >
                                <span className="text-xs shrink-0">{chan.logo}</span>
                                <span className="truncate">{chan.nameAr.replace('بي إن سبورتس ', '').replace('الرياضية المغربية الأرضية ', 'الرياضية')}</span>
                              </button>
                            ))
                          }
                        </div>
                      </div>

                      {/* Global & European Channels Box */}
                      <div className="bg-neutral-950/80 border border-purple-950/60 p-4 rounded-2xl flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-purple-950/40 pb-2">
                          <span className="text-[10px] font-bold text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-full font-sans font-black">
                            {channels.filter(c => ['global-euro-am', 'latam-asia-af', 'local-maghreb'].includes(c.category)).length} قنوات عالمية
                          </span>
                          <div className="flex items-center gap-1.5 text-right">
                            <span className="text-xs font-black text-purple-200">القنوات العالمية</span>
                            <Globe className="h-4 w-4 text-purple-400 animate-pulse" />
                          </div>
                        </div>
                        
                        <div className="max-h-[320px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-right pr-0.5 scrollbar-thin scrollbar-thumb-purple-900/60 scrollbar-track-transparent">
                          {channels
                            .filter(c => ['global-euro-am', 'latam-asia-af', 'local-maghreb'].includes(c.category))
                            .map((chan) => (
                              <button
                                key={chan.id}
                                onClick={() => {
                                  selectChannel(chan);
                                  setShowMainMenu(false);
                                }}
                                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-150 border cursor-pointer ${
                                  selectedChannel.id === chan.id
                                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-950/40 text-[11px] font-black'
                                    : 'bg-neutral-900 hover:bg-purple-950/50 text-purple-200 border-purple-900/30'
                                }`}
                              >
                                <span className="text-xs shrink-0">{chan.logo}</span>
                                <span className="truncate">
                                  {chan.nameAr
                                    .replace('العربية ', '')
                                    .replace('الجزائرية ', '')
                                    .replace('الرياضية المغربية الأرضية ', 'المغربية')
                                    .replace('الأرضية الجزائرية ', 'الجزائرية')
                                    .replace(' (الولايات المتحدة)', '')
                                    .replace(' (أمريكا)', '')
                                    .replace(' (المملكة المتحدة)', '')
                                    .replace(' (فرنسا)', '')
                                    .replace(' (ألمانيا)', '')
                                    .replace(' (إسبانيا)', '')
                                    .replace(' (إيطاليا)', '')
                                    .replace(' (البرتغال)', '')
                                    .replace(' (هولندا)', '')
                                    .replace(' (بلجيكا)', '')
                                    .replace(' (سويسرا)', '')
                                    .replace(' (السويد)', '')
                                    .replace(' (النرويج)', '')
                                    .replace(' (الدنمارك)', '')
                                    .replace(' (فنلندا)', '')
                                    .replace(' (بولندا)', '')
                                    .replace(' (رومانيا)', '')
                                    .replace(' (كرواتيا)', '')
                                    .replace(' (صربيا)', '')
                                    .replace(' (البرازيل)', '')
                                    .replace(' (الأرجنتين)', '')
                                    .replace(' (كولومبيا)', '')
                                    .replace(' (تشيلي)', '')
                                    .replace(' (الإكوادور)', '')
                                    .replace(' (كوستاريكا)', '')
                                    .replace(' (الصين)', '')
                                    .replace(' (اليابان)', '')
                                    .replace(' (كوريا الجنوبية)', '')
                                    .replace(' (إندونيسيا)', '')
                                    .replace(' (ماليزيا)', '')
                                    .replace(' (هونغ كونغ)', '')
                                    .replace(' (باكستان)', '')
                                    .replace(' (الهند)', '')
                                    .replace(' (جنوب إفريقيا)', '')
                                    .replace(' (نيجيريا)', '')
                                  }
                                </span>
                              </button>
                            ))
                          }
                        </div>
                      </div>

                    </div>

                    {/* Menu Footer with Settings trigger */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-3 border-t border-purple-950/60 mt-2 text-right">
                      <div className="text-[10px] text-purple-400 font-bold font-sans">
                        MHD SPORTS PREMIUM • V1.2
                      </div>
                      
                      <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => {
                            setShowMainMenu(false);
                            setShowPwaModal(true);
                          }}
                          className="flex-1 sm:flex-initial bg-gradient-to-l from-purple-600 to-purple-800 hover:from-purple-550 hover:to-purple-700 text-white text-xs font-black px-5 py-2.5 rounded-xl transition flex items-center justify-center gap-2 border border-purple-500/25 cursor-pointer shadow-md shadow-purple-950/40"
                          id="btn-install-apk-shortcut"
                        >
                          <Smartphone className="h-4 w-4 text-purple-200" />
                          <span>تحميل تطبيق الهاتف (PWA APK)</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowMainMenu(false);
                            setShowSettings(true);
                          }}
                          className="flex-1 sm:flex-initial bg-purple-900/40 hover:bg-purple-900/70 text-purple-300 hover:text-white text-xs font-black px-5 py-2.5 rounded-xl border border-purple-850 transition flex items-center justify-center gap-2 cursor-pointer"
                          id="btn-settings-shortcut"
                        >
                          <Settings className="h-4 w-4 text-purple-200" />
                          <span>إعدادات السيرفر وإصلاح القنوات</span>
                        </button>
                        
                        <button
                          onClick={() => setShowMainMenu(false)}
                          className="bg-neutral-800 hover:bg-neutral-750 text-purple-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-neutral-700/50 transition cursor-pointer"
                        >
                          إغلاق
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* PHONE INSTALLER PWA MODAL (APK INSTANT RUN) */}
            <PWAInstallerModal 
              isOpen={showPwaModal}
              onClose={() => setShowPwaModal(false)}
              deferredPrompt={deferredPrompt}
            />

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
