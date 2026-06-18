export interface ServiceServer {
  id: string;
  name: string;
  url: string; // The M3U8 streaming link or embed code
  type: 'hls' | 'embed' | 'youtube' | 'mp4';
}

export interface Channel {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'sports' | 'premium' | 'max' | 'xtra' | 'afc' | 'news' | 'global-euro-am' | 'latam-asia-af' | 'local-maghreb';
  logo: string; // Custom styled logo identifier
  number: string;
  servers: ServiceServer[];
  isPremium?: boolean;
}

export interface MatchUpdate {
  teamA: string;
  teamALogo?: string;
  teamB: string;
  teamBLogo?: string;
  scoreA: number;
  scoreB: number;
  time: string;
  league: string;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  channelId: string;
}

export interface UserSettings {
  defaultQuality: 'auto' | 'high' | 'medium' | 'low';
  savedChannels: string[];
}
