import { TrendingUp, Shield, Clock, Users, Globe, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function StatsScreen() {
  return (
    <div className="p-6 space-y-6 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Community Impact</h2>
        <p className="text-muted-foreground">
          Real-time protection across Southeast Asia
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          icon={<Shield className="w-6 h-6" />}
          value="2,458"
          label="Users Protected"
          trend="+12%"
          color="primary"
          delay={0.1}
        />
        <MetricCard
          icon={<Users className="w-6 h-6" />}
          value="500"
          label="Trusted Guardians"
          trend="+8%"
          color="secondary"
          delay={0.2}
        />
        <MetricCard
          icon={<Clock className="w-6 h-6" />}
          value="12.3s"
          label="Avg Response"
          trend="-2s"
          color="success"
          delay={0.3}
        />
        <MetricCard
          icon={<TrendingUp className="w-6 h-6" />}
          value="94%"
          label="Success Rate"
          trend="+3%"
          color="tertiary"
          delay={0.4}
        />
      </div>

      {/* Regional Breakdown */}
      <section id="stats-regional">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6 text-primary" />
          Regional Coverage
        </h3>
        <div className="space-y-3">
          <RegionBar country="Indonesia" flag="🇮🇩" users={1245} percentage={51} />
          <RegionBar country="Malaysia" flag="🇲🇾" users={587} percentage={24} />
          <RegionBar country="Thailand" flag="🇹🇭" users={392} percentage={16} />
          <RegionBar country="Myanmar" flag="🇲🇲" users={147} percentage={6} />
          <RegionBar country="Brunei" flag="🇧🇳" users={87} percentage={3} />
        </div>
      </section>

      {/* Threat Intelligence */}
      <section id="stats-threats">
        <h3 className="text-xl font-bold mb-4">Top Scam Types Blocked</h3>
        <div className="space-y-3">
          <ThreatCard
            type="Phishing Attempts"
            count={847}
            percentage={45}
            color="error"
          />
          <ThreatCard
            type="Investment Scams"
            count={523}
            percentage={28}
            color="warning"
          />
          <ThreatCard
            type="Romance Scams"
            count={312}
            percentage={17}
            color="tertiary"
          />
          <ThreatCard
            type="Tech Support"
            count={189}
            percentage={10}
            color="secondary"
          />
        </div>
      </section>

      {/* Impact Story */}
      <motion.div
        id="stats-impact"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-[var(--md-success-container)] to-[var(--md-primary-container)] rounded-3xl p-6"
      >
        <Award className="w-12 h-12 text-[var(--md-on-success-container)] mb-4" />
        <h3 className="text-xl font-bold text-[var(--md-on-success-container)] mb-2">
          $1.2M USD Saved
        </h3>
        <p className="text-[var(--md-on-success-container)] opacity-90 mb-4">
          Total estimated financial losses prevented by our community
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-[var(--md-on-success-container)]">847</div>
            <div className="text-xs text-[var(--md-on-success-container)] opacity-80">Interventions</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-[var(--md-on-success-container)]">5</div>
            <div className="text-xs text-[var(--md-on-success-container)] opacity-80">Countries</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-[var(--md-on-success-container)]">24/7</div>
            <div className="text-xs text-[var(--md-on-success-container)] opacity-80">Protection</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MetricCard({
  icon,
  value,
  label,
  trend,
  color,
  delay
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend: string;
  color: 'primary' | 'secondary' | 'success' | 'tertiary';
  delay: number;
}) {
  const colorMap = {
    primary: 'bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]',
    secondary: 'bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)]',
    success: 'bg-[var(--md-success-container)] text-[var(--md-on-success-container)]',
    tertiary: 'bg-[var(--md-tertiary-container)] text-[var(--md-on-tertiary-container)]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`${colorMap[color]} rounded-3xl p-5`}
    >
      <div className="mb-3">{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
      <div className="mt-2 text-xs font-medium opacity-80">{trend} this week</div>
    </motion.div>
  );
}

function RegionBar({
  country,
  flag,
  users,
  percentage
}: {
  country: string;
  flag: string;
  users: number;
  percentage: number;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{flag}</span>
          <span className="font-medium">{country}</span>
        </div>
        <span className="text-sm text-muted-foreground">{users} users</span>
      </div>
      <div className="bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </div>
  );
}

function ThreatCard({
  type,
  count,
  percentage,
  color
}: {
  type: string;
  count: number;
  percentage: number;
  color: 'error' | 'warning' | 'secondary' | 'tertiary';
}) {
  const colorMap = {
    error: 'from-[var(--md-error)] to-[#B91C1C]',
    warning: 'from-[var(--md-warning)] to-[#D97706]',
    secondary: 'from-[var(--md-secondary)] to-[#7C3AED]',
    tertiary: 'from-[var(--md-tertiary)] to-[#DB2777]'
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium">{type}</h4>
        <span className="text-2xl font-bold text-primary">{count}</span>
      </div>
      <div className="bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`h-full bg-gradient-to-r ${colorMap[color]}`}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">{percentage}% of total threats</p>
    </div>
  );
}
