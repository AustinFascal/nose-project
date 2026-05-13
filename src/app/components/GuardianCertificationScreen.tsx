import { ArrowLeft, Award, CheckCircle, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../HeaderContext';

export function GuardianCertificationScreen({ onBack }: { onBack: () => void }) {
  const { setHeader } = useContext(HeaderContext);

  useEffect(() => {
    setHeader(
      <div className="flex items-center gap-3 w-full">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-[var(--md-surface-variant)] text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-foreground">Certification</h2>
      </div>
    );
    return () => setHeader(null);
  }, [onBack, setHeader]);

  return (
    <div className="bg-background min-h-screen">
      <div className="p-6 space-y-6 pt-4 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--md-primary)] to-[var(--md-secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Trusted Guardian Certification</h1>
          <p className="text-muted-foreground text-sm">
            Complete the requirements below to earn your badge and join the community.
          </p>
        </motion.div>

        <section className="space-y-3">
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 opacity-50">
            <CheckCircle className="w-6 h-6 text-[var(--md-success)]" />
            <div className="flex-1">
              <h4 className="font-bold text-sm">1. Identity Verification (e-KYC)</h4>
              <p className="text-xs text-muted-foreground">Completed via Singpass</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 opacity-50">
            <CheckCircle className="w-6 h-6 text-[var(--md-success)]" />
            <div className="flex-1">
              <h4 className="font-bold text-sm">2. Core Training Modules</h4>
              <p className="text-xs text-muted-foreground">Completed Day 1 & Day 2</p>
            </div>
          </div>
          <div className="bg-card border-2 border-[var(--md-primary)] shadow-sm rounded-2xl p-5 flex items-center gap-4">
            <Lock className="w-6 h-6 text-[var(--md-primary)]" />
            <div className="flex-1">
              <h4 className="font-bold text-sm">3. Final Simulation</h4>
              <p className="text-xs text-muted-foreground">Score 100% to pass</p>
            </div>
          </div>
        </section>

        <button className="w-full bg-[var(--md-primary)] text-white py-4 rounded-full font-bold hover:shadow-lg transition-shadow">
          Begin Final Simulation
        </button>
      </div>
    </div>
  )
}
