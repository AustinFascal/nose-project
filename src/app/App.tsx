import {
  Shield,
  AlertTriangle,
  Users,
  TrendingUp,
  // Bell,
  Bell,
  MessageSquare,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { PanicButton } from "./components/PanicButton";
import { AlertScreen } from "./components/AlertScreen";
import { EducationScreen } from "./components/EducationScreen";
import { StatsScreen } from "./components/StatsScreen";
import { WhatsAppChatScreen } from "./components/WhatsAppChatScreen";
import { AndroidHomeScreen } from "./components/AndroidHomeScreen";
import { PhoneCallScreen } from "./components/PhoneCallScreen";
import { PanicType } from "./components/PanicButton";
import { HeaderContext } from "./HeaderContext";

type Screen = "whatsapp" | "home" | "alert" | "education" | "stats";

export default function App() {
  const [activeApp, setActiveApp] = useState<"launcher" | "whatsapp" | "phone">("launcher");
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [appVisible, setAppVisible] = useState(false);
  const [hasScreenshot, setHasScreenshot] = useState(false);
  const [panicType, setPanicType] = useState<PanicType>("screenshot");
  const [appHeader, setAppHeader] = useState<React.ReactNode | null>(null);
  const [initialEducationTab, setInitialEducationTab] = useState<string | null>(null);
  
  const headerValue = useMemo(() => ({ setHeader: setAppHeader }), [setAppHeader]);

  // Called when the panic bubble is tapped
  const handlePanicActivate = (type: PanicType) => {
    setPanicType(type);
    setHasScreenshot(type === "screenshot");
    setAppVisible(true);
    setCurrentScreen("alert");
  };

  const handleOpenApp = (app: "whatsapp" | "nose" | "phone") => {
    if (app === "whatsapp") {
      setActiveApp("whatsapp");
    } else if (app === "phone") {
      setActiveApp("phone");
    } else {
      setAppVisible(true);
      setCurrentScreen("home");
    }
  };

  const renderAppScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen 
          onActivatePanic={() => setCurrentScreen("alert")} 
          onExploreWorkshops={() => {
            setCurrentScreen("education");
            setInitialEducationTab("explore");
          }}
        />;
      case "alert":
        return <AlertScreen 
          source={activeApp === "phone" ? "phone" : activeApp} 
          panicType={panicType}
          onClose={() => setCurrentScreen("home")} 
        />;
      case "education":
        return <EducationScreen 
          initialTab={initialEducationTab} 
          onClearTab={() => setInitialEducationTab(null)} 
        />;
      case "stats":
        return <StatsScreen />;
      default:
        return (
          <HomeScreen onActivatePanic={() => setCurrentScreen("alert")} onExploreWorkshops={() => {}} />
        );
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden relative bg-black">
      {/* ── Base Layer: Android Launcher, WhatsApp, or Phone ── */}
      {activeApp === "launcher" && <AndroidHomeScreen onOpenApp={handleOpenApp} />}
      {activeApp === "whatsapp" && <WhatsAppChatScreen onPanicActivate={() => handlePanicActivate("screenshot")} />}
      {activeApp === "phone" && <PhoneCallScreen onPanicActivate={handlePanicActivate} />}

      {/* Floating Panic Button (always available unless alert screen is open) */}
      {(!appVisible || currentScreen !== "alert") && (
        <PanicButton 
          activeApp={activeApp}
          onClick={handlePanicActivate} 
        />
      )}

      {/* ── Nosè App overlay (slides up when panic is triggered) ── */}
      <AnimatePresence>
        {appVisible && (
          <motion.div
            key="nose-app"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="absolute inset-0 z-50 bg-background flex flex-col overflow-hidden"
          >
            <HeaderContext.Provider value={headerValue}>
              {/* Top App Bar */}
              <motion.header
                initial={{ y: -60 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 28 }}
                className="bg-[var(--md-surface-container)] border-b border-[var(--md-outline-variant)] px-4 py-4 flex items-center justify-between"
              >
                {appHeader ? appHeader : (
                  <div className="flex items-center gap-3">
                    {/* Profile Picture */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-md">
                      NC
                    </div>
                    {/* Greeting and Username */}
                    <div>
                      <p className="text-sm text-muted-foreground">Good morning,</p>
                      <h1 className="text-lg font-bold text-foreground">Nur Cholisah</h1>
                    </div>
                  </div>
                )}

                {!appHeader && (
                  <div className="flex items-center gap-2">
                    {/* Reset button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setAppVisible(false);
                        setActiveApp("launcher");
                        setCurrentScreen("home");
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--md-surface-variant)] text-muted-foreground hover:bg-[var(--md-outline-variant)] transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-xs font-medium">Reset</span>
                    </motion.button>

                    {/* Notification Icon */}
                    <button className="relative p-2 hover:bg-[var(--md-surface-variant)] rounded-full transition-colors">
                      <Bell className="w-6 h-6 text-muted-foreground" />
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--md-error)] rounded-full border-2 border-[var(--md-surface-container)]" />
                    </button>
                  </div>
                )}
              </motion.header>

              {/* Main Content */}
              <main className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    {renderAppScreen()}
                  </motion.div>
                </AnimatePresence>
              </main>

              {/* Bottom Navigation */}
              <motion.nav
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 28 }}
                className="bg-[var(--md-surface-container)] border-t border-[var(--md-outline-variant)] px-2 py-3 flex items-center justify-around"
              >
                <NavButton
                  icon={
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path d="M9.5,4 C9.5,3.44772 9.05228,3 8.5,3 C7.94772,3 7.5,3.44772 7.5,4 C7.5,5.82724 7.04443,7.67507 6.10557,9.55279 C5.65437,10.4552 5.01801,11.1536 4.31564,12.1216 C3.66521,13.0179 3,14.1126 3,15.5 C3,17.433 4.567,19 6.5,19 C7.07231,19 8.01211,18.6241 8.55279,18.8944 C8.95146,19.0938 9.20854,19.5539 9.50991,19.8735 C10.0291,20.4242 10.7741,21 12,21 C13.2259,21 13.9709,20.4242 14.4901,19.8735 C14.7847,19.561 15.0522,19.0919 15.4472,18.8944 C15.9879,18.6241 16.9277,19 17.5,19 C19.433,19 21,17.433 21,15.5 C21,14.1126 20.3348,13.0179 19.6844,12.1216 C18.982,11.1537 18.3456,10.4552 17.8944,9.55279 C16.9556,7.67507 16.5,5.82724 16.5,4 C16.5,3.44772 16.0523,3 15.5,3 C14.9477,3 14.5,3.44772 14.5,4 C14.5,6.17276 15.0444,8.32493 16.1056,10.4472 C16.6543,11.5448 17.518,12.5416 18.0656,13.2962 C18.6652,14.1224 19,14.7777 19,15.5 C19,16.3284 18.3284,17 17.5,17 C16.4837,17 15.5332,16.6153 14.5528,17.1056 C13.9114,17.4262 13.5129,17.9945 13.0349,18.5015 C12.7291,18.8258 12.4741,19 12,19 C11.5259,19 11.2709,18.8258 10.9651,18.5015 C10.4898,17.9974 10.0842,17.4241 9.44721,17.1056 C8.46675,16.6153 7.51632,17 6.5,17 C5.67157,17 5,16.3284 5,15.5 C5,14.7777 5.33479,14.1224 5.93436,13.2962 C6.48197,12.5415 7.34564,11.5448 7.89443,10.4472 C8.95557,8.32493 9.5,6.17276 9.5,4 Z" />
                    </svg>
                  }
                  label="Home"
                  active={currentScreen === "home" || currentScreen === "alert"}
                  onClick={() => setCurrentScreen("home")}
                />
                <NavButton
                  icon={<ShieldAlert className="w-6 h-6" />}
                  label="Learn"
                  active={currentScreen === "education"}
                  onClick={() => setCurrentScreen("education")}
                />
                <NavButton
                  icon={<TrendingUp className="w-6 h-6" />}
                  label="Stats"
                  active={currentScreen === "stats"}
                  onClick={() => setCurrentScreen("stats")}
                />
              </motion.nav>
            </HeaderContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all ${active
          ? "bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)]"
          : "text-muted-foreground hover:bg-[var(--md-surface-variant)]"
        }`}
    >
      <div className={active ? "scale-110" : ""}>{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
}