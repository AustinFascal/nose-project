import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Mic, CloudRain, Clock as ClockIcon } from "lucide-react";
import wallpaper from "../../imports/android_wallpaper.png";

interface AndroidHomeScreenProps {
  onOpenApp: (app: "whatsapp" | "nose" | "phone") => void;
}

export function AndroidHomeScreen({ onOpenApp }: AndroidHomeScreenProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
      {/* Wallpaper Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      <div className="absolute inset-0 bg-black/20" /> {/* Slight dark overlay for readability */}

      {/* Status Bar Fake Area (Spacing) */}
      {/* <div className="h-8 w-full" /> */}

      {/* Content */}
      <div className="relative h-full flex flex-col px-4 pb-8">

        {/* Clock & Weather Widget */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-12 flex flex-col items-center"
        >
          <h1 className="text-6xl font-light text-white tracking-tight drop-shadow-md">
            {formatTime(time)}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-white/90 drop-shadow-sm font-medium">
            <span>{formatDate(time)}</span>
            <span>•</span>
            <CloudRain className="w-4 h-4 text-blue-200" />
            <span>24°C</span>
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Google Search Widget */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md rounded-full px-4 py-3 flex items-center justify-between shadow-lg mb-8 mx-2"
        >
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-500" />
            <span className="text-gray-400 text-sm font-medium">Search...</span>
          </div>
          <Mic className="w-5 h-5 text-blue-500" />
        </motion.div>

        {/* App Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-4 gap-y-6 gap-x-4 px-2"
        >
          {/* Phone Icon */}
          <button
            onClick={() => onOpenApp("phone")}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center shadow-md group-hover:scale-95 transition-transform">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
              </svg>
            </div>
            <span className="text-white text-xs font-medium drop-shadow-sm">Phone</span>
          </button>

          {/* WhatsApp Icon */}
          <button
            onClick={() => onOpenApp("whatsapp")}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-md group-hover:scale-95 transition-transform">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </div>
            <span className="text-white text-xs font-medium drop-shadow-sm">WhatsApp</span>
          </button>

          {/* Nosè App Icon */}
          <button
            onClick={() => onOpenApp("nose")}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-95 transition-transform p-3">
              {/* Custom SVG Icon as White */}
              <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                <path d="M9.5,4 C9.5,3.44772 9.05228,3 8.5,3 C7.94772,3 7.5,3.44772 7.5,4 C7.5,5.82724 7.04443,7.67507 6.10557,9.55279 C5.65437,10.4552 5.01801,11.1536 4.31564,12.1216 C3.66521,13.0179 3,14.1126 3,15.5 C3,17.433 4.567,19 6.5,19 C7.07231,19 8.01211,18.6241 8.55279,18.8944 C8.95146,19.0938 9.20854,19.5539 9.50991,19.8735 C10.0291,20.4242 10.7741,21 12,21 C13.2259,21 13.9709,20.4242 14.4901,19.8735 C14.7847,19.561 15.0522,19.0919 15.4472,18.8944 C15.9879,18.6241 16.9277,19 17.5,19 C19.433,19 21,17.433 21,15.5 C21,14.1126 20.3348,13.0179 19.6844,12.1216 C18.982,11.1537 18.3456,10.4552 17.8944,9.55279 C16.9556,7.67507 16.5,5.82724 16.5,4 C16.5,3.44772 16.0523,3 15.5,3 C14.9477,3 14.5,3.44772 14.5,4 C14.5,6.17276 15.0444,8.32493 16.1056,10.4472 C16.6543,11.5448 17.518,12.5416 18.0656,13.2962 C18.6652,14.1224 19,14.7777 19,15.5 C19,16.3284 18.3284,17 17.5,17 C16.4837,17 15.5332,16.6153 14.5528,17.1056 C13.9114,17.4262 13.5129,17.9945 13.0349,18.5015 C12.7291,18.8258 12.4741,19 12,19 C11.5259,19 11.2709,18.8258 10.9651,18.5015 C10.4898,17.9974 10.0842,17.4241 9.44721,17.1056 C8.46675,16.6153 7.51632,17 6.5,17 C5.67157,17 5,16.3284 5,15.5 C5,14.7777 5.33479,14.1224 5.93436,13.2962 C6.48197,12.5415 7.34564,11.5448 7.89443,10.4472 C8.95557,8.32493 9.5,6.17276 9.5,4 Z" />
              </svg>
            </div>
            <span className="text-white text-xs font-medium drop-shadow-sm">Nosè</span>
          </button>

          {/* Dummy Apps for aesthetic */}
          {/* <DummyApp color="bg-red-500" name="YouTube" /> */}

          <button
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-500 flex items-center justify-center shadow-md group-hover:scale-95 transition-transform p-3">
              {/* Custom SVG Icon as White */}
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <span className="text-white text-xs font-medium drop-shadow-sm">YouTube</span>
          </button>
          {/* <DummyApp color="bg-blue-400" name="Photos" /> */}
          {/* <DummyApp color="bg-orange-500" name="Maps" /> */}
        </motion.div>
      </div>
    </div>
  );
}

function DummyApp({ color, name }: { color: string, name: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 opacity-80">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-md`} />
      <span className="text-white text-xs font-medium drop-shadow-sm">{name}</span>
    </div>
  );
}
