import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WalkthroughOverlayProps {
  step: number;
  totalSteps: number;
  content: string[];
  targetIds?: (string | null)[];
  onNext: () => void;
  onClose: () => void;
  hideNext?: boolean;
  cannotSkip?: boolean;
  centerModal?: boolean;
}

export const WalkthroughOverlay: React.FC<WalkthroughOverlayProps> = ({
  step,
  totalSteps,
  content,
  targetIds = [],
  onNext,
  onClose,
  hideNext = false,
  cannotSkip = false,
  centerModal = false
}) => {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const targetId = targetIds[step];

  useEffect(() => {
    setTargetRect(null);

    if (targetId) {
      const updateRect = () => {
        const el = document.getElementById(targetId);
        if (el) setTargetRect(el.getBoundingClientRect());
      };

      let retries = 0;
      const interval = setInterval(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            setTargetRect(rect);
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (retries > 40) clearInterval(interval);
          }
        } else if (retries > 60) {
          clearInterval(interval);
        }
        retries++;
      }, 100);

      window.addEventListener('scroll', updateRect, true);
      return () => {
        clearInterval(interval);
        window.removeEventListener('scroll', updateRect, true);
      };
    }
  }, [step, targetId]);

  return (
    <div className="fixed inset-0 z-[999] pointer-events-auto">
      <AnimatePresence>
        {/* Spotlight / Dimmer */}
        <motion.div
          key="walkthrough-dimmer"
          className="absolute inset-0 bg-black/60 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            clipPath: targetRect
              ? `polygon(0% 0%, 0% 100%, ${targetRect.left}px 100%, ${targetRect.left}px ${targetRect.top}px, ${targetRect.right}px ${targetRect.top}px, ${targetRect.right}px ${targetRect.bottom}px, ${targetRect.left}px ${targetRect.bottom}px, ${targetRect.left}px 100%, 100% 100%, 100% 0%)`
              : 'none'
          }}
        />

        {/* Pulse Highlight */}
        {targetRect && (
          <motion.div
            key="walkthrough-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute border-2 border-primary rounded-xl pointer-events-none"
            style={{
              top: targetRect.top - 4,
              left: targetRect.left - 4,
              width: targetRect.width + 8,
              height: targetRect.height + 8,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-primary/20 rounded-xl"
            />
          </motion.div>
        )}

        {/* Tooltip */}
        <motion.div
          key={`walkthrough-modal-${step}`}
          className="absolute z-10 w-[280px] bg-white rounded-2xl shadow-2xl p-5 border border-gray-100"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            top: (centerModal || !targetRect)
              ? '50%'
              : (targetRect.bottom + 20 > window.innerHeight - 200 ? targetRect.top - 180 : targetRect.bottom + 20),
            left: (centerModal || !targetRect)
              ? '50%'
              : Math.max(20, Math.min(window.innerWidth - 300, targetRect.left)),
            transform: (centerModal || !targetRect) ? 'translate(-50%, -50%)' : 'none'
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/60">Tutorial {step + 1}/{totalSteps}</span>
            {!cannotSkip && (
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-sm text-gray-800 leading-relaxed mb-4">{content[step]}</p>
          <div className="flex justify-end items-center gap-3">
            {!cannotSkip && (
              <button
                onClick={onClose}
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                Skip
              </button>
            )}
            {!hideNext && (
              <button
                onClick={onNext}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-95 transition-all"
              >
                {step + 1 === totalSteps ? 'Start Now' : 'Next'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
