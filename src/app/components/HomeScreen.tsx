import { Shield, Check, Eye, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function HomeScreen({ onActivatePanic, onExploreWorkshops }: { onActivatePanic: () => void, onExploreWorkshops: () => void }) {
  return (
    <div className="p-6 space-y-6 pb-32">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[var(--md-primary-container)] to-[var(--md-secondary-container)] rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-[var(--md-on-primary-container)]" />
            <span className="text-sm font-medium text-[var(--md-on-primary-container)]">Protection Active</span>
          </div>
          <h2 className="text-3xl font-bold text-[var(--md-on-primary-container)] mb-2">
            You're Protected
          </h2>
          <p className="text-[var(--md-on-primary-container)] opacity-90 mb-6">
            500+ Trusted Guardians are watching over our community
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard value="2,458" label="Protected" />
            <StatCard value="<15s" label="Response" />
            <StatCard value="94%" label="Success" />
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('start-tutorial'))}
            className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-[var(--md-on-primary-container)] rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Start Interactive Tutorial
          </button>
        </div>

        {/* Background Decoration */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary opacity-10 rounded-full blur-3xl" />
        <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-secondary opacity-10 rounded-full blur-3xl" />
      </motion.div>

      {/* How It Works */}
      <section>
        <h3 className="text-xl font-bold mb-4">How Nosè Protects You</h3>
        <div className="space-y-3">
          <FeatureCard
            icon={<AlertCircle className="w-6 h-6" />}
            title="Detect Suspicious Activity"
            description="Tap the panic button when something feels wrong"
            color="warning"
            delay={0.1}
          />
          <FeatureCard
            icon={<Eye className="w-6 h-6" />}
            title="Trusted Guardians Review"
            description="Verified experts analyze your situation instantly"
            color="primary"
            delay={0.2}
          />
          <FeatureCard
            icon={<Clock className="w-6 h-6" />}
            title="Get Help in <15 Seconds"
            description="Receive clear guidance before making decisions"
            color="success"
            delay={0.3}
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h3 className="text-xl font-bold mb-4">Community Protection</h3>
        <div className="space-y-3">
          <ActivityCard
            type="success"
            title="Phishing attempt blocked"
            time="2 minutes ago"
            location="Jakarta, Indonesia"
          />
          <ActivityCard
            type="success"
            title="Investment scam identified"
            time="15 minutes ago"
            location="Kuala Lumpur, Malaysia"
          />
          <ActivityCard
            type="warning"
            title="Suspicious call reported"
            time="1 hour ago"
            location="Bangkok, Thailand"
          />
        </div>
      </section>

      {/* CTA for Workshop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[var(--md-tertiary-container)] rounded-3xl p-6"
      >
        <h3 className="text-xl font-bold text-[var(--md-on-tertiary-container)] mb-2">
          Learn to Protect Yourself
        </h3>
        <p className="text-[var(--md-on-tertiary-container)] opacity-80 mb-4">
          Join our digital literacy workshops and become a Trusted Guardian
        </p>
        <button 
          onClick={onExploreWorkshops}
          className="bg-[var(--md-tertiary)] text-[var(--md-on-tertiary)] px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
        >
          Explore Workshops
        </button>
      </motion.div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
      <div className="text-2xl font-bold text-[var(--md-on-primary-container)]">{value}</div>
      <div className="text-xs text-[var(--md-on-primary-container)] opacity-80">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'warning' | 'success';
  delay: number;
}) {
  const colorMap = {
    primary: 'bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]',
    warning: 'bg-[var(--md-warning-container)] text-[var(--md-on-warning-container)]',
    success: 'bg-[var(--md-success-container)] text-[var(--md-on-success-container)]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-card rounded-2xl p-4 flex items-start gap-4 border border-border"
    >
      <div className={`${colorMap[color]} p-3 rounded-2xl`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

function ActivityCard({
  type,
  title,
  time,
  location
}: {
  type: 'success' | 'warning';
  title: string;
  time: string;
  location: string;
}) {
  return (
    <div className="bg-card rounded-2xl p-4 flex items-start gap-3 border border-border">
      <div className={`p-2 rounded-full ${
        type === 'success'
          ? 'bg-[var(--md-success-container)]'
          : 'bg-[var(--md-warning-container)]'
      }`}>
        <Check className={`w-5 h-5 ${
          type === 'success'
            ? 'text-[var(--md-on-success-container)]'
            : 'text-[var(--md-on-warning-container)]'
        }`} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium mb-1">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{time}</span>
          <span>•</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
