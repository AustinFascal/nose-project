import { motion } from 'motion/react';
import { Wifi, Bluetooth, Zap, Moon, Plane, ShieldAlert, ChevronUp, Settings as SettingsIcon } from 'lucide-react';

interface NotificationShadeProps {
  isOpen: boolean;
  onClose: () => void;
  nosEnabled: boolean;
  onNoseClick: () => void;
}

export function NotificationShade({ isOpen, onClose, nosEnabled, onNoseClick }: NotificationShadeProps) {
  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: window.innerHeight }}
      dragElastic={0.1}
      onDragEnd={(_, info) => {
        if (info.offset.y > 100 || info.velocity.y > 500) {
          // Keep open if dragged far enough
        } else {
          onClose();
        }
      }}
      initial={{ y: '-100%' }}
      animate={{ y: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-[600] bg-black/90 backdrop-blur-md flex flex-col pt-12"
    >
      {/* Quick Settings Grid */}
      <div className="px-6 py-4 flex-1">
        <div className="grid grid-cols-4 gap-y-8 gap-x-4 mb-8">
          <QuickTile icon={<Wifi className="w-5 h-5" />} label="Wi-Fi" active />
          <QuickTile icon={<Bluetooth className="w-5 h-5" />} label="Bluetooth" active />
          <QuickTile icon={<Zap className="w-5 h-5" />} label="Flashlight" />
          <QuickTile icon={<Moon className="w-5 h-5" />} label="DND" />
          <QuickTile icon={<Plane className="w-5 h-5" />} label="Airplane" />

          {/* Nosè Panic Tile */}
          {nosEnabled && (
            <motion.button
              id="shade-nose-tile"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onNoseClick();
                onClose();
              }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-900/40">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-medium text-white">Nosè Help</span>
            </motion.button>
          )}

          <QuickTile icon={<SettingsIcon className="w-5 h-5" />} label="Auto-rotate" />
          <QuickTile icon={<Zap className="w-5 h-5" />} label="Battery" />
        </div>

        {/* Notifications Area */}
        <div className="space-y-3">
          <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider px-2 mb-4">Notifications</h3>
          <div
            id="shade-notification-item"
            className="bg-white/10 rounded-3xl p-4 border border-white/10"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white">Nosè Protection</h4>
                  <span className="text-[10px] text-white/40">Just now</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Real-time fraud monitoring is active. Tap to open dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drag Handle to Close */}
      <div
        onClick={onClose}
        className="h-20 w-full flex flex-col items-center justify-center cursor-pointer border-t border-white/5"
      >
        <div className="w-12 h-1.5 bg-white/30 rounded-full mb-1" />
        <ChevronUp className="w-6 h-6 text-white/50" />
      </div>
    </motion.div>
  );
}

function QuickTile({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${active ? 'bg-blue-600 text-white' : 'bg-white/10 text-white'
        }`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium text-white">{label}</span>
    </div>
  );
}
