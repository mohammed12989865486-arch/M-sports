import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Download, 
  X, 
  Check, 
  Sparkles, 
  HelpCircle, 
  Chrome, 
  TrendingUp, 
  Compass, 
  ArrowLeft,
  ChevronRight,
  Monitor,
  Heart
} from 'lucide-react';

interface PWAInstallerModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any; // Captured beforeinstallprompt event
  onInstalled?: () => void;
}

export default function PWAInstallerModal({ isOpen, onClose, deferredPrompt, onInstalled }: PWAInstallerModalProps) {
  const [deviceOS, setDeviceOS] = useState<'android' | 'ios' | 'other'>('android');
  const [browser, setBrowser] = useState<'chrome' | 'safari' | 'other'>('chrome');
  const [installSuccess, setInstallSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Detect OS and Browser for custom instructions
    const ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
      setDeviceOS('android');
      if (/chrome|chromium|crios/.test(ua)) {
        setBrowser('chrome');
      } else {
        setBrowser('other');
      }
    } else if (/iphone|ipad|ipod/.test(ua)) {
      setDeviceOS('ios');
      setBrowser('safari');
    } else {
      setDeviceOS('other');
      setBrowser('chrome');
    }
  }, []);

  const triggerNativeInstall = async () => {
    if (!deferredPrompt) return;
    
    // Show the native browser install dialog
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    if (outcome === 'accepted') {
      setInstallSuccess(true);
      if (onInstalled) {
        onInstalled();
      }
    }
  };

  const stepsAndroid = [
    {
      title: "اضغط على زر الخيارات فوق بالمتصفح",
      desc: "افتح متصفح كروم (Google Chrome) في هاتفك، واضغط على النقاط الثلاث العمودية (⋮) بالزاوية العلوية.",
      badge: "الخطوة ١"
    },
    {
      title: "اضغط على 'تثبيت التطبيق' أو 'الاضافة للشاشة'",
      desc: "اختر خيار 'تثبيت التطبيق' (Install App) أو 'الإضافة للشاشة الرئيسية' (Add to Home screen) من القائمة.",
      badge: "الخطوة ٢"
    },
    {
      title: "أكد عملية التثبيت للهاتف",
      desc: "سيقوم هاتفك الأندرويد تلقائياً بتوليد وبناء حزمة التثبيت (APK) مخصصة آمنة وسوف تظهر أيقونة MHD SPORTS على شاشتك!",
      badge: "الخطوة ٣"
    }
  ];

  const stepsIos = [
    {
      title: "اضغط على زر المشاركة بمستعرض Safari",
      desc: "اضغط على أيقونة المشاركة (Share 📤) في شريط الأدوات بالأسفل.",
      badge: "الخطوة ١"
    },
    {
      title: "اختر 'بإضافة إلى الشاشة الرئيسية'",
      desc: "قم بسحب اللائحة لأعلى واختر خيار 'إضافة إلى الشاشة الرئيسية' (Add to Home Screen).",
      badge: "الخطوة ٢"
    },
    {
      title: "تشغيل التطبيق من شاشتك",
      desc: "اضغط على 'إضافة' بالزاوية العليا. ستجد أيقونة التطبيق تفتح بملء الشاشة وبشكل مستقل متميز.",
      badge: "الخطوة ٣"
    }
  ];

  const currentSteps = deviceOS === 'ios' ? stepsIos : stepsAndroid;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Glassmorphism Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
            id="pwa-modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-neutral-900 border border-purple-500/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(147,51,234,0.15)] flex flex-col justify-between"
            id="pwa-modal-body"
            dir="rtl"
          >
            {/* Header Glowing Design Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

            {/* Modal Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-xl bg-neutral-950/40 text-neutral-400 hover:text-white border border-white/5 active:scale-95 transition-all cursor-pointer z-10"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Main Modal Contents */}
            <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              
              {/* Heading Tab Title */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-950/50">
                  <Smartphone className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[9px] font-black text-purple-400 bg-purple-950/60 border border-purple-500/20 px-2 py-0.5 rounded-md font-sans uppercase tracking-widest inline-block">
                    MHD SPORTS APK / WEB-APP
                  </span>
                  <h3 className="text-lg md:text-xl font-black text-white mt-1">تنزيل وتثبيت التطبيق على الهاتف</h3>
                </div>
              </div>

              {/* CRITICAL IFRAME WARNING ALERT (EXPLAINING GOOGLE CHROME LIMITATION) */}
              <div className="bg-amber-950/30 border border-amber-600/30 rounded-2xl p-4 mb-4 text-right space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                  <h4 className="text-xs font-black text-amber-300">ملاحظة هامة جداً لمستخدمي متصفح كروم (Google Chrome):</h4>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed font-semibold">
                  تحذير: زر التثبيت لا يظهر في متصفحك حالياً لأنك تقوم باستعراض التطبيق داخل نافذة اختبار داخلية مغلقة (Iframe). لتتمكن من التثبيت بلمسة واحدة وحفظ التطبيق كـ APK، يجب فتح الرابط في صفحة خارجية مستقلة بالمتصفح!
                </p>
                
                {/* Standalone window trigger option */}
                <div className="pt-2">
                  <a 
                    href={typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-gdvrjuzuzbe7j5pacjq2qi-576709235285.europe-west2.run.app'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-950/30 text-white font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-150 active:scale-95"
                  >
                    <span>افتح التطبيق في صفحة خارجية جديدة للتثبيت 🌐🚀</span>
                  </a>
                </div>
              </div>

              {/* Success Screen state */}
              {installSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 mx-auto animate-bounce shadow-lg shadow-green-950/20">
                    <Check className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-green-450">مبروك! بدأت عملية التثبيت</h4>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-2 leading-relaxed">
                      يتم الآن توليد تطبيق الهاتف وتثبيته مباشرة على الشاشة الرئيسية كرمز حماية وبث مجهول. اذهب لشاشة هاتفك المحمول لتشغيله كـ APK متكامل!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  
                  {/* Mode Switching Tabs: WebAPK vs Raw APK converter */}
                  <div className="flex bg-neutral-950/80 p-1 rounded-2xl border border-purple-950 gap-1.5" id="install-method-tabs">
                    <button
                      type="button"
                      onClick={() => {
                        setDeviceOS('android');
                        setActiveStep(0);
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl font-black text-xs transition duration-150 flex items-center justify-center gap-1.5 ${deviceOS !== 'other' ? 'bg-purple-900 text-white shadow-md shadow-purple-950/30' : 'text-neutral-400 hover:text-neutral-200'}`}
                    >
                      <Chrome className="h-3.5 w-3.5" />
                      <span>تثبيت مباشر (سريع وآمن)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeviceOS('other');
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl font-black text-xs transition duration-150 flex items-center justify-center gap-1.5 ${deviceOS === 'other' ? 'bg-purple-900 text-white shadow-md shadow-purple-950/30' : 'text-neutral-400 hover:text-neutral-200'}`}
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>ملف APK مستقل (.apk)</span>
                    </button>
                  </div>

                  {deviceOS !== 'other' ? (
                    /* REGULAR PWA/WebAPK MODE */
                    <div className="space-y-5 animate-fade-in-item">
                      {/* Explanation card of how PWA APK installation works */}
                      <div className="bg-neutral-950/60 border border-purple-950/80 rounded-2xl p-4 flex gap-3.5 items-start">
                        <Sparkles className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-purple-205">التحويل التلقائي لتطبيق أندرويد (WebAPK)</h4>
                          <p className="text-[11px] text-neutral-400 leading-relaxed font-semibold">
                            تعتمد المنصة على تقنية الويب التقدمي الرسمية. عند الضغط على خيارات المتصفح واختيار "تثبيت التطبيق" أو "إضافة إلى الشاشة"، يقوم نظام الأندرويد تلقائياً ببناء حزمة APK قانونية آمنة خالية من الفيروسات وتثبيتها بهاتفك كصورة طبق الأصل من التطبيقات التجارية!
                          </p>
                        </div>
                      </div>

                      {/* OS Specific guide (Android / iOS) */}
                      <div className="flex bg-neutral-950 p-1.5 rounded-xl border border-neutral-800/60 gap-1.5 w-max mx-auto">
                        <button
                          type="button"
                          onClick={() => setDeviceOS('android')}
                          className={`py-1 px-3.5 rounded-lg font-bold text-[10px] transition ${deviceOS === 'android' ? 'bg-purple-950 text-purple-300 border border-purple-500/20' : 'text-neutral-400'}`}
                        >
                          شرح للأندرويد
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeviceOS('ios')}
                          className={`py-1 px-3.5 rounded-lg font-bold text-[10px] transition ${deviceOS === 'ios' ? 'bg-purple-950 text-purple-300 border border-purple-500/20' : 'text-neutral-400'}`}
                        >
                          شرح للآيفون iPhone
                        </button>
                      </div>

                      {deferredPrompt && deviceOS === 'android' ? (
                        <div className="p-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-2xl shadow-xl shadow-purple-950/40">
                          <button
                            type="button"
                            onClick={triggerNativeInstall}
                            className="w-full bg-neutral-900 hover:bg-neutral-800 px-6 py-4 rounded-xl text-white font-black text-sm flex items-center justify-center gap-3 transition cursor-pointer"
                          >
                            <Download className="h-5 w-5 text-purple-400 animate-bounce" />
                            <span>تثبيت فوري بلمسة واحدة (APK التلقائي)</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs border-b border-neutral-800 pb-2">
                            <span className="text-neutral-400 font-bold">خطوات التثبيت التلقائي:</span>
                            <span className="text-green-400 font-bold text-[10px]">بث مباشر مستقل وبدقة كاملة</span>
                          </div>

                          <div className="space-y-2.5">
                            {currentSteps.map((step, idx) => (
                              <div 
                                key={idx}
                                className={`flex gap-3.5 border transition items-center p-3 rounded-2xl ${activeStep === idx ? 'bg-purple-950/15 border-purple-500/30' : 'bg-neutral-900/40 border-white/5 opacity-80'}`}
                                onClick={() => setActiveStep(idx)}
                              >
                                <span className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-500/20 text-purple-400 font-black text-xs flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <div className="text-right">
                                  <h5 className="text-xs font-black text-white">{step.title}</h5>
                                  <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed font-semibold">{step.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* RAW APK EXPORT DIRECTORY & TOOLS */
                    <div className="space-y-5 animate-fade-in-item">
                      <div className="bg-purple-950/20 border border-purple-500/20 rounded-2xl p-4 space-y-3.5">
                        <div className="flex gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300">
                            <Smartphone className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-white">كيف تقوم بتحميل ملف APK خام وتثبيته؟</h4>
                            <p className="text-[10px] text-purple-300/80 mt-1 font-semibold">
                              لأن هذا الخادم سحابي لتطبيقات الويب، لا يمكنه إنتاج ملف ثنائي مباشرة. ولكن بإمكانك إنشاء ملف APK بنفسك وحفْظه بمدير الملفات بهاتفك مجاناً في دقيقة عبر الخطوات التالية:
                            </p>
                          </div>
                        </div>

                        {/* Copy App Link Action for converter */}
                        <div className="bg-neutral-950 p-2.5 rounded-xl border border-purple-950 flex items-center justify-between gap-3">
                          <div className="overflow-hidden">
                            <span className="text-[9px] text-neutral-400 block font-bold">1. انسخ رابط المنصة للمشاركة والتحويل:</span>
                            <span className="text-[11px] font-mono text-purple-300 font-semibold truncate block mt-0.5" id="app-origin-url-text">
                              {typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-gdvrjuzuzbe7j5pacjq2qi-576709235285.europe-west2.run.app'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const urlText = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-gdvrjuzuzbe7j5pacjq2qi-576709235285.europe-west2.run.app';
                              navigator.clipboard.writeText(urlText);
                              alert('تم نسخ رابط البث بنجاح!');
                            }}
                            className="bg-purple-900 hover:bg-purple-800 text-white text-[10px] font-black px-3 py-2 rounded-lg cursor-pointer transition shrink-0 active:scale-95"
                          >
                            نسخ الرابط 📋
                          </button>
                        </div>
                      </div>

                      {/* Web-to-APK Free Builders List */}
                      <div className="space-y-3">
                        <h5 className="text-xs font-black text-neutral-300">أفضل أدوات بناء ملف APK بلمسة واحدة:</h5>
                        
                        <div className="grid grid-cols-1 gap-2.5">
                          <div className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-3 flex justify-between items-center">
                            <div>
                              <span className="text-[11px] font-black text-white block">موقع WebIntoApp Builder</span>
                              <span className="text-[9px] text-neutral-400 block mt-0.5 leading-normal">
                                مخصص لتحويل مواقع الويب إلى ملف APK جاهز للتثبيت مع إضافة الأيقونة والاسم.
                              </span>
                            </div>
                            <a 
                              href="https://www.webintoapp.com/" 
                              target="_blank" 
                              rel="noreferrer"
                              className="bg-purple-950 border border-purple-500/30 hover:bg-purple-900 text-purple-300 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-black transition whitespace-nowrap"
                            >
                              افتح الموقع 🌐
                            </a>
                          </div>

                          <div className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-3 flex justify-between items-center">
                            <div>
                              <span className="text-[11px] font-black text-white block">موقع AppsGeyser Converter</span>
                              <span className="text-[9px] text-neutral-400 block mt-0.5 leading-normal">
                                أسرع صانع ملفات APK مجاني. كل ما عليك هو لصق الرابط المنسوخ بالأعلى واضغط على Build!
                              </span>
                            </div>
                            <a 
                              href="https://appsgeyser.com/create/url-app/" 
                              target="_blank" 
                              rel="noreferrer"
                              className="bg-purple-950 border border-purple-500/30 hover:bg-purple-900 text-purple-300 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-black transition whitespace-nowrap"
                            >
                              افتح الموقع 🌐
                            </a>
                          </div>
                        </div>

                        {/* File manager direct action steps */}
                        <div className="bg-neutral-900/60 rounded-xl p-3 border border-white/5 space-y-1 text-[10px] text-neutral-400 font-semibold leading-relaxed">
                          <span className="text-neutral-300 font-extrabold block text-[11px]">خطوات التثبيت من مدير الملفات:</span>
                          <span className="block">١. قم بلصق رابط المنصة في أحد مواقع التحويل المجانية السابقة واضغط بناء (Build APK).</span>
                          <span className="block">٢. قم بتحميل ملف الـ APK الناتج على هاتفك الاندرويد.</span>
                          <span className="block">٣. افتح تطبيق "الملفات" أو "My Files" واضغط على ملف APK ثم اختر "تثبيت" لبدء البث الآمن على شاشتك.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security certificate seal label Ar */}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-bold border-t border-neutral-800/40 pt-4 font-sans">
                    <Monitor className="h-3 w-3 text-purple-600" />
                    <span>تطبيق ويب آمن ومضمون 100% برعاية وتوثيق MHD MARKETING</span>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Actions Footer */}
            <div className="bg-neutral-950 border-t border-white/5 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-neutral-400 font-bold">متوافق مع جميع الهواتف الذكية</span>
              </div>
              <button
                onClick={onClose}
                className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs text-neutral-300 hover:text-white font-bold px-4 py-2 rounded-xl transition duration-150 active:scale-95 cursor-pointer"
              >
                حسناً، فهمت
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
