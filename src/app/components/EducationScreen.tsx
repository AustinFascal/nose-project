import { BookOpen, Video, Award, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useCallback, useEffect } from 'react';
import { ModuleDay1Screen } from './ModuleDay1Screen';
import { ModuleDay2Screen } from './ModuleDay2Screen';
import { ModuleDay3Screen } from './ModuleDay3Screen';
import { GuardianCertificationScreen } from './GuardianCertificationScreen';
import { WorkshopDetailScreen, Workshop } from './WorkshopDetailScreen';
import { ExploreWorkshopsScreen } from './ExploreWorkshopsScreen';

const WORKSHOPS: Workshop[] = [
  {
    id: 'w1',
    location: "American Corner UNAIR, Surabaya",
    country: "Indonesia",
    date: "March 15-17, 2027",
    status: "Registration Open",
    description: "Join us for an intensive 3-day workshop at American Corner UNAIR. Learn how to identify the latest online scams and protect your community. This event includes hands-on simulation labs.",
    attendees: 120,
    organizer: "Nosè Team & Amcor UNAIR",
  },
  {
    id: 'w2',
    location: "@america, Jakarta",
    country: "Indonesia",
    date: "March 22-24, 2027",
    status: "Registration Open",
    description: "A flagship event hosted at @america Pacific Place. Engage with cybersecurity experts, network with other Guardians, and participate in a live hacking demonstration.",
    attendees: 250,
    organizer: "Nosè Team & @america",
  },
  {
    id: 'w3',
    location: "American Youth Corner, Kuala Lumpur",
    country: "Malaysia",
    date: "April 5-7, 2027",
    status: "Coming Soon",
    description: "Expanding our reach to Malaysia. This workshop focuses on local scam trends and cross-border digital literacy initiatives.",
    attendees: 0,
    organizer: "Nosè Regional Team",
  },
  {
    id: 'w4',
    location: "American Shelf, Brunei",
    country: "Brunei Darussalam",
    date: "April 12-14, 2027",
    status: "Coming Soon",
    description: "Our first workshop in Brunei. Learn fundamental digital literacy skills tailored for all age groups.",
    attendees: 0,
    organizer: "Nosè Regional Team",
  }
];

export function EducationScreen() {
  const [showDay1, setShowDay1] = useState(false);
  const [showDay2, setShowDay2] = useState(false);
  const [showDay3, setShowDay3] = useState(false);
  const [showCertification, setShowCertification] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  const handleBackDay1 = useCallback(() => setShowDay1(false), []);
  const handleBackDay2 = useCallback(() => setShowDay2(false), []);
  const handleBackDay3 = useCallback(() => setShowDay3(false), []);
  const handleBackCertification = useCallback(() => setShowCertification(false), []);
  const handleBackExplore = useCallback(() => setShowExplore(false), []);
  const handleBackWorkshop = useCallback(() => setSelectedWorkshop(null), []);

  useEffect(() => {
    const handleStartModule1 = () => setShowDay1(true);
    window.addEventListener('start-module-1', handleStartModule1);
    return () => window.removeEventListener('start-module-1', handleStartModule1);
  }, []);

  if (showDay1) return <ModuleDay1Screen onBack={handleBackDay1} />;
  if (showDay2) return <ModuleDay2Screen onBack={handleBackDay2} />;
  if (showDay3) return <ModuleDay3Screen onBack={handleBackDay3} />;
  if (showCertification) return <GuardianCertificationScreen onBack={handleBackCertification} />;
  if (showExplore) return <ExploreWorkshopsScreen onBack={handleBackExplore} />;
  if (selectedWorkshop) return <WorkshopDetailScreen workshop={selectedWorkshop} onBack={handleBackWorkshop} />;

  return (
    <div className="p-6 space-y-6 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Digital Literacy Hub</h2>
        <p className="text-muted-foreground">
          Learn to protect yourself and become a Trusted Guardian
        </p>
      </motion.div>

      {/* Workshop Locations */}
      <section id="learn-workshops">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          Upcoming Workshops
        </h3>
        <div className="space-y-3">
          {WORKSHOPS.map((w, index) => (
            <WorkshopCard
              key={w.id}
              location={w.location}
              country={w.country}
              date={w.date}
              status={w.status}
              delay={0.1 * (index + 1)}
              onClick={() => setSelectedWorkshop(w)}
            />
          ))}
        </div>
        <button
          onClick={() => setShowExplore(true)}
          className="mt-4 w-full py-3 border-2 border-[var(--md-outline-variant)] text-muted-foreground font-bold rounded-2xl hover:bg-[var(--md-surface-variant)] transition-colors">
          Explore Other Organizers
        </button>
      </section>

      {/* Training Modules */}
      <section id="learn-modules">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-secondary" />
          Self-Paced Learning
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <ModuleCard
            id="learn-start-module-1"
            title="Day 1: Understanding the Threat"
            description="Recognizing social engineering crimes"
            icon={<BookOpen className="w-6 h-6" />}
            progress={0}
            color="primary"
            onStart={() => setShowDay1(true)}
          />
          <ModuleCard
            title="Day 2: Human Behavior"
            description="Why people fall for scams"
            icon={<Video className="w-6 h-6" />}
            progress={0}
            color="secondary"
            onStart={() => setShowDay2(true)}
          />
          <ModuleCard
            title="Day 3: Becoming a Guardian"
            description="Certification and practice"
            icon={<Award className="w-6 h-6" />}
            progress={0}
            color="tertiary"
            onStart={() => setShowDay3(true)}
          />
        </div>
      </section>

      {/* Guardian Program CTA */}
      <motion.div
        id="learn-guardian-cta"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-[var(--md-primary)] to-[var(--md-secondary)] rounded-3xl p-8 text-center"
      >
        <Award className="w-16 h-16 text-white mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Become a Trusted Guardian
        </h3>
        <p className="text-white opacity-90 mb-6">
          Join 500+ verified experts protecting our community from scams
        </p>
        <div className="space-y-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left">
            <h4 className="font-medium text-white mb-2">Requirements:</h4>
            <ul className="space-y-1 text-white text-sm opacity-90">
              <li>✓ Complete 3-day training program</li>
              <li>✓ Pass e-KYC verification</li>
              <li>✓ Achieve 100% on simulation test</li>
            </ul>
          </div>
          <button
            onClick={() => setShowCertification(true)}
            className="w-full bg-white text-primary py-4 rounded-full font-bold hover:shadow-lg transition-shadow">
            Get Certified Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function WorkshopCard({
  location,
  country,
  date,
  status,
  delay,
  onClick
}: {
  location: string;
  country: string;
  date: string;
  status: string;
  delay: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-bold mb-1">{location}</h4>
          <p className="text-sm text-muted-foreground">{country}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Registration Open'
            ? 'bg-[var(--md-success-container)] text-[var(--md-on-success-container)]'
            : 'bg-[var(--md-warning-container)] text-[var(--md-on-warning-container)]'
          }`}>
          {status}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>{date}</span>
      </div>
    </motion.div>
  );
}

function ModuleCard({
  title,
  description,
  icon,
  progress,
  color,
  onStart,
  id,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  color: 'primary' | 'secondary' | 'tertiary';
  onStart?: () => void;
  id?: string;
}) {
  const colorMap = {
    primary: 'bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]',
    secondary: 'bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)]',
    tertiary: 'bg-[var(--md-tertiary-container)] text-[var(--md-on-tertiary-container)]'
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-3">
        <div className={`${colorMap[color]} p-3 rounded-2xl`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {progress > 0 && (
        <div className="space-y-2">
          <div className="bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">{progress}% Complete</p>
        </div>
      )}

      {progress === 0 && (
        <button
          id={id}
          onClick={onStart}
          className="w-full mt-3 bg-primary text-primary-foreground py-3 rounded-full font-medium hover:shadow-md transition-shadow">
          Start Module
        </button>
      )}
    </div>
  );
}