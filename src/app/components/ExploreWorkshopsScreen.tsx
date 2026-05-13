import { ArrowLeft, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../HeaderContext';

const EXTERNAL_WORKSHOPS = [
  {
    id: "ext1",
    title: "CyberSafe Community Training",
    organizer: "NGO CyberSafe Malaysia",
    location: "Kuala Lumpur, MY",
    date: "May 10, 2027",
    category: "Community"
  },
  {
    id: "ext2",
    title: "Elderly Digital Literacy",
    organizer: "Tech For Good ID",
    location: "Jakarta, ID",
    date: "May 15, 2027",
    category: "Seniors"
  },
  {
    id: "ext3",
    title: "Corporate Anti-Phishing Bootcamp",
    organizer: "CyberSec Asia",
    location: "Singapore, SG",
    date: "June 2, 2027",
    category: "Professional"
  }
];

export function ExploreWorkshopsScreen({ onBack }: { onBack: () => void }) {
  const { setHeader } = useContext(HeaderContext);

  useEffect(() => {
    setHeader(
      <div className="flex items-center gap-3 w-full">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-[var(--md-surface-variant)] text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-foreground">Explore Organizers</h2>
      </div>
    );
    return () => setHeader(null);
  }, [onBack, setHeader]);

  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 pt-4 pb-32">
        <div className="flex gap-2 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-[var(--md-surface-variant)] px-4 py-2.5 rounded-full text-muted-foreground">
            <Search className="w-4 h-4" />
            <input type="text" placeholder="Search workshops..." className="bg-transparent text-sm outline-none flex-1" />
          </div>
          <button className="w-10 h-10 rounded-full bg-[var(--md-surface-variant)] flex items-center justify-center text-muted-foreground">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {EXTERNAL_WORKSHOPS.map((workshop, i) => (
            <motion.div 
              key={workshop.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-5 flex flex-col hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{workshop.category}</span>
                <span className="text-xs text-muted-foreground">{workshop.date}</span>
              </div>
              <h3 className="font-bold text-base mb-1 leading-tight">{workshop.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">By {workshop.organizer}</p>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs font-medium px-2 py-1 bg-[var(--md-surface-variant)] rounded-md">
                  {workshop.location}
                </span>
                <button className="text-sm font-bold text-primary">View Details</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
