import { ArrowLeft, Calendar, MapPin, Users, Share2, Ticket } from 'lucide-react';
import { motion } from 'motion/react';
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../HeaderContext';

export interface Workshop {
  id: string;
  location: string;
  country: string;
  date: string;
  status: string;
  description: string;
  attendees: number;
  organizer: string;
}

export function WorkshopDetailScreen({ workshop, onBack }: { workshop: Workshop; onBack: () => void }) {
  const { setHeader } = useContext(HeaderContext);

  useEffect(() => {
    setHeader(
      <div className="flex items-center justify-between w-full">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-[var(--md-surface-variant)] text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-[var(--md-surface-variant)] text-foreground">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    );
    return () => setHeader(null);
  }, [onBack, setHeader]);

  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 pt-4 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            workshop.status === 'Registration Open'
              ? 'bg-[var(--md-success-container)] text-[var(--md-on-success-container)]'
              : 'bg-[var(--md-warning-container)] text-[var(--md-on-warning-container)]'
          }`}>
            {workshop.status}
          </span>
          <h1 className="text-3xl font-bold mb-2 leading-tight">{workshop.location}</h1>
          <p className="text-lg text-muted-foreground mb-6">Hosted by {workshop.organizer}</p>

          <div className="space-y-4 mb-8 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Date & Time</p>
                <p className="text-sm text-muted-foreground">{workshop.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Location</p>
                <p className="text-sm text-muted-foreground">{workshop.location}, {workshop.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Attendees</p>
                <p className="text-sm text-muted-foreground">{workshop.attendees} Registered</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3">About this Workshop</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {workshop.description}
          </p>

          <h3 className="text-xl font-bold mb-3">Itinerary</h3>
          <div className="space-y-4 border-l-2 border-primary/20 ml-2 pl-4">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
              <p className="font-bold text-sm">09:00 AM - Registration</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
              <p className="font-bold text-sm">10:00 AM - Social Engineering 101</p>
              <p className="text-xs text-muted-foreground">Understanding modern phishing</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
              <p className="font-bold text-sm">11:30 AM - Mock Scenarios</p>
              <p className="text-xs text-muted-foreground">Interactive roleplay</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3">
        <button 
          disabled={workshop.status !== 'Registration Open'}
          className="flex-1 bg-primary text-primary-foreground py-4 rounded-full font-bold hover:shadow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <Ticket className="w-5 h-5" />
          {workshop.status === 'Registration Open' ? 'Register Now' : 'Join Waitlist'}
        </button>
      </div>
    </div>
  )
}
