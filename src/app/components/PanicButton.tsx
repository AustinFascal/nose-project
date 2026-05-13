import { motion, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Camera, Mic, ShieldAlert } from 'lucide-react';

type CaptureState = "idle" | "selecting" | "flash" | "framed" | "notify" | "done";
export type PanicType = "screenshot" | "audio";

interface PanicButtonProps {
  onClick: (type: PanicType) => void;
  activeApp?: string;
}

export function PanicButton({ onClick }: PanicButtonProps) {
  const constraintsRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [captureState, setCaptureState] = useState<CaptureState>("idle");
  const [selectedType, setSelectedType] = useState<PanicType | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePanicClick = () => {
    if (captureState !== "idle" && captureState !== "done") return;
    setCaptureState("selecting");
  };

  const startPanic = (type: PanicType) => {
    setSelectedType(type);
    
    if (type === "screenshot") {
      setCaptureState("flash");
      setTimeout(() => setCaptureState("framed"), 180);
      setTimeout(() => setCaptureState("notify"), 500);
      setTimeout(() => {
        setCaptureState("done");
        onClick("screenshot");
        setCaptureState("idle");
      }, 1800);
    } else {
      setCaptureState("notify");
      setTimeout(() => {
        setCaptureState("done");
        onClick("audio");
        setCaptureState("idle");
      }, 1200);
    }
  };

  const isCapturing = captureState !== "idle" && captureState !== "done" && captureState !== "selecting";

  return (
    <>
      <AnimatePresence>
        {captureState === "selecting" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldAlert className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Emergency Analysis</h3>
                <p className="text-sm text-gray-500 mt-2">How should Nosè help you right now?</p>
              </div>

              <div className="p-4 space-y-3">
                <button 
                  onClick={() => startPanic("screenshot")}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Scan Screenshot</p>
                    <p className="text-xs text-gray-500">Analyze text, links, and fake profiles</p>
                  </div>
                </button>

                <button 
                  onClick={() => startPanic("audio")}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Live Audio Monitor</p>
                    <p className="text-xs text-gray-500">Transcribe and detect scam patterns in calls</p>
                  </div>
                </button>

                <button 
                  onClick={() => setCaptureState("idle")}
                  className="w-full py-4 text-sm font-semibold text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {captureState === "flash" && (
          <motion.div
            key="flash"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-white z-[200] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(captureState === "framed" || captureState === "notify") && selectedType === "screenshot" && (
          <motion.div
            key="frame"
            initial={{ opacity: 1 }}
            animate={{ opacity: captureState === "notify" ? 0.4 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[180] pointer-events-none"
            style={{
              boxShadow: "inset 0 0 0 4px #fff, inset 0 0 0 6px rgba(255,255,255,0.6)",
              borderRadius: 0,
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {captureState === "notify" && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-[210] flex items-center gap-3 bg-gray-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-2xl"
            style={{ minWidth: 240 }}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${selectedType === "audio" ? "bg-purple-600" : "bg-red-600"}`}>
              {selectedType === "audio" ? <Mic className="w-5 h-5 text-white" /> : <Camera className="w-5 h-5 text-white" />}
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">
                {selectedType === "audio" ? "Nosè is monitoring audio" : "Nosè captured screenshot"}
              </p>
              <p className="text-xs text-white/70 mt-0.5">Sending to Trusted Guardians…</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50" />
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-28 right-6 z-50 cursor-grab active:cursor-grabbing pointer-events-auto"
        style={{ touchAction: 'none' }}
      >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePanicClick}
        disabled={isCapturing}
        className="relative group"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[var(--md-error)] rounded-full blur-xl"
        />

        <motion.div 
          animate={isCapturing ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-br from-[var(--md-error)] to-[#B91C1C] text-white w-20 h-20 rounded-full shadow-2xl flex flex-col items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 mb-1 fill-white">
            <path d="M9.5,4 C9.5,3.44772 9.05228,3 8.5,3 C7.94772,3 7.5,3.44772 7.5,4 C7.5,5.82724 7.04443,7.67507 6.10557,9.55279 C5.65437,10.4552 5.01801,11.1536 4.31564,12.1216 C3.66521,13.0179 3,14.1126 3,15.5 C3,17.433 4.567,19 6.5,19 C7.07231,19 8.01211,18.6241 8.55279,18.8944 C8.95146,19.0938 9.20854,19.5539 9.50991,19.8735 C10.0291,20.4242 10.7741,21 12,21 C13.2259,21 13.9709,20.4242 14.4901,19.8735 C14.7847,19.561 15.0522,19.0919 15.4472,18.8944 C15.9879,18.6241 16.9277,19 17.5,19 C19.433,19 21,17.433 21,15.5 C21,14.1126 20.3348,13.0179 19.6844,12.1216 C18.982,11.1537 18.3456,10.4552 17.8944,9.55279 C16.9556,7.67507 16.5,5.82724 16.5,4 C16.5,3.44772 16.0523,3 15.5,3 C14.9477,3 14.5,3.44772 14.5,4 C14.5,6.17276 15.0444,8.32493 16.1056,10.4472 C16.6543,11.5448 17.518,12.5416 18.0656,13.2962 C18.6652,14.1224 19,14.7777 19,15.5 C19,16.3284 18.3284,17 17.5,17 C16.4837,17 15.5332,16.6153 14.5528,17.1056 C13.9114,17.4262 13.5129,17.9945 13.0349,18.5015 C12.7291,18.8258 12.4741,19 12,19 C11.5259,19 11.2709,18.8258 10.9651,18.5015 C10.4898,17.9974 10.0842,17.4241 9.44721,17.1056 C8.46675,16.6153 7.51632,17 6.5,17 C5.67157,17 5,16.3284 5,15.5 C5,14.7777 5.33479,14.1224 5.93436,13.2962 C6.48197,12.5415 7.34564,11.5448 7.89443,10.4472 C8.95557,8.32493 9.5,6.17276 9.5,4 Z" />
          </svg>
          <span className="text-xs font-bold">{isCapturing ? "SNAP!" : "HELP"}</span>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="absolute right-[110%] top-1/2 -translate-y-1/2 bg-[var(--md-surface-container-highest)] px-4 py-2 rounded-xl shadow-lg whitespace-nowrap pointer-events-none"
          >
            <p className="text-sm font-medium">Tap if you suspect a scam</p>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[var(--md-surface-container-highest)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </>
  );
}
