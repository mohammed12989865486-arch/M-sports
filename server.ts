import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client with standard environment key and User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Cache for live sports news
interface NewsCache {
  data: string[];
  timestamp: number;
}

const fallbackNews = [
  "عاجل: انطلاق جولة التصفيات المؤهلة للبطولة الكبرى اليوم وسط ترقب جماهيري كبير أولاً بأول",
  "متابعة حية: الكشف عن مواعيد مبارات القمة القادمة في الدوريات الكبرى وتفاصيل انتقال اللاعبين",
  "استعدادات مكثفة للمنتخبات والفرق لمباريات نصف النهائي المرتقبة وسرية تامة في التدريبات الأخيرة",
  "رسمياً: تعيين الحكام الدوليين لإدارة قمة الغد المرتقبة وتصريحات حماسية من كلا المعسكرين",
  "عاجل: الكشف عن القفزة التاريخية لقيمة العقود الاستثمارية للأندية والشبكات الرياضية هذا الموسم",
  "تغطية مستمرة: مراجعة نتائج المباريات الودية الأخيرة وتقييم مستويات اللاعبين البارزين في خط الوسط"
];

// Pre-seed cache with fallback news so the app always displays sports news immediately
let newsCache: NewsCache = {
  data: fallbackNews,
  timestamp: 0
};

const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes cache
let lastErrorTime = 0;
const COOLDOWN_DURATION_MS = 15 * 60 * 1000; // 15 minutes cooldown after 429 rate limit or quota exceeded

// Serve PWA manifest
app.get("/manifest.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    short_name: "MHD SPORTS",
    name: "MHD SPORTS - منصة البث الرياضي المباشر",
    icons: [
      {
        src: "https://cdn-icons-png.flaticon.com/512/5312/5312061.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any maskable"
      }
    ],
    start_url: "/",
    background_color: "#050014",
    theme_color: "#120024",
    display: "standalone",
    orientation: "portrait"
  });
});

// Serve PWA service worker
app.get("/sw.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`
    const CACHE_NAME = 'mhd-sports-pwa-v1';
    self.addEventListener('install', (e) => {
      self.skipWaiting();
    });
    self.addEventListener('activate', (e) => {
      e.waitUntil(clients.claim());
    });
    self.addEventListener('fetch', (event) => {
      // Direct pass-through for streaming data and layout files
      event.respondWith(fetch(event.request).catch(() => {
        return new Response("Offline Mode: There is no internet connection.");
      }));
    });
  `);
});

// Proxy M3U Playlist requests to prevent CORS problems
app.get("/api/proxy-m3u", async (req, res) => {
  const m3uUrl = req.query.url as string;
  if (!m3uUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const response = await fetch(m3uUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*"
      },
      signal: AbortSignal.timeout(15000) // 15 seconds timeout
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Failed to fetch M3U file: ${response.statusText}` });
    }

    const text = await response.text();
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.send(text);
  } catch (err: any) {
    console.error("Proxy M3U error:", err);
    return res.status(500).json({ error: err.message || "Failed to fetch M3U playlist" });
  }
});

// Proxy Xtream Codes api requests
app.get("/api/proxy-xtream", async (req, res) => {
  const { serverUrl, username, password, action } = req.query;

  if (!serverUrl || !username || !password) {
    return res.status(400).json({ error: "Missing required query parameters: serverUrl, username, password" });
  }

  // Sanitize serverUrl: ensure no trailing slash
  let cleanServerUrl = (serverUrl as string).trim();
  if (cleanServerUrl.endsWith("/")) {
    cleanServerUrl = cleanServerUrl.slice(0, -1);
  }

  let targetUrl = `${cleanServerUrl}/player_api.php?username=${username}&password=${password}`;
  if (action) {
    targetUrl += `&action=${action}`;
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*"
      },
      signal: AbortSignal.timeout(15000) // 15 seconds timeout
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Connection failed with status ${response.status}` });
    }

    // Try parsing JSON, if fail return raw text
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return res.json(json);
    } catch {
      return res.send(text);
    }
  } catch (err: any) {
    console.error("Proxy Xtream error:", err);
    return res.status(500).json({ error: err.message || "Failed to connect to Xtream server" });
  }
});

app.get("/api/news", async (req, res) => {
  const now = Date.now();

  // If we have valid cached data within CACHE_DURATION_MS, serve it instantly
  if (newsCache.timestamp > 0 && (now - newsCache.timestamp < CACHE_DURATION_MS)) {
    return res.json({ news: newsCache.data, fromCache: true });
  }

  // If we recently hit a rate limit error (429), enter cooldown to avoid spamming the Gemini API
  if (now - lastErrorTime < COOLDOWN_DURATION_MS) {
    return res.json({ news: newsCache.data, fromCache: true, status: "cooldown" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ news: fallbackNews, warning: "Missing GEMINI_API_KEY. Showing fallback news.", fromCache: false });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "ما هي أحدث وأهم الأخبار الرياضية والنتائج والمباريات الجارية حالياً في العالم؟ صِغ 6 إلى 8 عناوين إخبارية رياضية عاجلة وحقيقية باللغة العربية الفصحى. يجب استقصاء الأحداث الجارية في الساعات الأخيرة.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "عنوان خبر عاجل رياضي حديث وحقيقي، يبدأ بكلمات مثل 'عاجل:' أو 'رسمياً:'"
          }
        },
        systemInstruction: "أنت محرر الأخبار العاجلة لشبكة MHD SPORTS. مهمتك صياغة عناوين إخبارية رياضية دقيقة، وموثوقة وممتازة، وتعتمد تماماً على نتائج البحث الفورية لأعلى الأحداث الرياضية الحالية في الساعات الأخيرة والمباريات اليوم وسوق الانتقالات. تأكد من جلب نتائج بحث حقيقية."
      }
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        newsCache = {
          data: parsed,
          timestamp: now
        };
        return res.json({ news: parsed, fromCache: false });
      }
    }
    throw new Error("Invalid response format from Gemini");
  } catch (error: any) {
    const errMsg = error.message || String(error);
    const isRateLimit = errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED");

    if (isRateLimit) {
      console.warn("Gemini API Rate Limit hit (429/quota exceeded). Activating safe 15-minute cooldown. Serving cached sports news.");
      lastErrorTime = now;
    } else {
      console.warn("Gemini News Fetch warning:", errMsg);
    }

    // Set cache timestamp to 'now' so we wait at least CACHE_DURATION_MS before trying again
    newsCache.timestamp = now;

    return res.json({ 
      news: newsCache.data, 
      warning: "Serving fallback news due to Gemini rate limits.",
      fromCache: true 
    });
  }
});

// Start the full-stack server
async function startMyServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startMyServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
