import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Phone, PhoneOff, MicOff, Grid, Volume2, User, Info } from "lucide-react";

interface PhoneCallScreenProps {
  onPanicActivate: (type: "screenshot" | "audio") => void;
}

export function PhoneCallScreen({ onPanicActivate }: PhoneCallScreenProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setDuration((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="absolute inset-0 z-10 bg-gray-950 flex flex-col items-center justify-between py-20 text-white">
      {/* Caller Info */}
      <div className="flex flex-col items-center gap-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center border-2 border-red-500/30 relative"
        >
          <User className="w-14 h-14 text-gray-400" />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-red-500/20"
          />
        </motion.div>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold">+60 12-345 6789</h2>
          <div className="flex items-center gap-2 justify-center text-red-400 mt-1">
            <Info className="w-4 h-4" />
            <p className="text-sm font-medium uppercase tracking-wider">Potential Fraud</p>
          </div>
          <p className="text-gray-400 mt-2 font-mono text-lg">{formatDuration(duration)}</p>
        </div>
      </div>

      {/* Call Actions */}
      <div className="grid grid-cols-3 gap-x-12 gap-y-10 px-12">
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
            <MicOff className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-gray-400">Mute</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
            <Grid className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-gray-400">Keypad</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-gray-400">Speaker</span>
        </div>
      </div>

      {/* End Call Button */}
      <div className="mb-10">
        <button className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40 active:scale-90 transition-transform">
          <PhoneOff className="w-8 h-8 text-white fill-white" />
        </button>
      </div>

      {/* Hint for simulation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full text-center px-10">
        <p className="text-xs text-gray-500 italic">
          Simulation: This caller is acting as a Bank Officer. 
          Use the Floating Panic Button to monitor this call.
        </p>
      </div>
    </div>
  );
}
