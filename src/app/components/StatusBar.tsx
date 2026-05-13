import { motion } from 'motion/react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { useState, useEffect } from 'react';

export function StatusBar() {
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

  return (
    <div className="fixed top-0 left-0 right-0 h-7 z-[650] flex items-center justify-between px-4 pointer-events-none bg-black/20 backdrop-blur-[2px]">
      {/* Left side: Time */}
      <span className="text-[11px] font-bold text-white drop-shadow-md">
        {formatTime(time)}
      </span>

      {/* Right side: Icons */}
      <div className="flex items-center gap-1.5 text-white">
        <Signal className="w-3 h-3 fill-current" />
        <Wifi className="w-3 h-3 fill-current" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-bold">85%</span>
          <Battery className="w-4 h-4 rotate-90" />
        </div>
      </div>
    </div>
  );
}
