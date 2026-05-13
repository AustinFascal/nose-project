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
  HelpCircle,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo, useEffect } from "react";
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
import { WalkthroughOverlay } from "./components/WalkthroughOverlay";
import { SettingsScreen } from "./components/SettingsScreen";
import { NotificationShade } from "./components/NotificationShade";
import { StatusBar } from "./components/StatusBar";

type Screen = "whatsapp" | "home" | "alert" | "education" | "stats" | "settings";

export default function App() {
  const [activeApp, setActiveApp] = useState<"launcher" | "whatsapp" | "phone">("launcher");
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [walkStep, setWalkStep] = useState(0);
  const [appVisible, setAppVisible] = useState(false);
  const [hasScreenshot, setHasScreenshot] = useState(false);
  const [panicType, setPanicType] = useState<PanicType>("screenshot");
  const [appHeader, setAppHeader] = useState<React.ReactNode | null>(null);
  const [initialEducationTab, setInitialEducationTab] = useState<string | null>(null);
  const [startTutorialAnalysis, setStartTutorialAnalysis] = useState(false);
  const [isWaitingForAnalysis, setIsWaitingForAnalysis] = useState(false);
  const [floatingEnabled, setFloatingEnabled] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [shadeOpen, setShadeOpen] = useState(false);

  // Define linear tutorial steps
  const tutorialSteps = useMemo(() => [
    {
      text: "Welcome to Nosè! Tap 'Next' to start our guided tour.",
      targetId: null,
    },
    {
      text: "Did you know? You can drag the Nosè button anywhere on your screen for your comfort.",
      targetId: "panic-button",
    },
    {
      text: "First, let's look at a simulation in the Phone app. Tap 'Next' to open the app.",
      targetId: "app-phone",
    },
    {
      text: "Great! You're in a call. Notice the Nosè help button that's always ready to assist.",
      targetId: "panic-button",
      action: () => handleOpenApp("phone")
    },
    {
      text: "Tap 'Next' to see the Emergency Analysis menu that helps you assess risks.",
      targetId: "panic-button",
    },
    {
      text: "Here you can choose a monitoring mode. 'Live Audio Monitor' detects fraud patterns in real-time.",
      targetId: "panic-audio",
      action: () => window.dispatchEvent(new CustomEvent('open-panic-menu'))
    },
    {
      text: "Now, let's see how Nosè works in WhatsApp. Tap 'Next' to switch apps.",
      targetId: "app-whatsapp",
      action: () => {
        window.dispatchEvent(new CustomEvent('close-panic-menu'));
        setAppVisible(false);
        setActiveApp("launcher");
      }
    },
    {
      text: "In WhatsApp, you can analyze suspicious messages. Look for the Nosè button on the chat screen.",
      targetId: "panic-button",
      action: () => setActiveApp("whatsapp")
    },
    {
      text: "Use 'Scan Screenshot' to instantly detect malicious links or fake profiles.",
      targetId: "panic-screenshot",
      action: () => window.dispatchEvent(new CustomEvent('open-panic-menu'))
    },
    {
      text: "Nosè will take a screenshot and send it to Trusted Guardians. Tap 'Next' to begin.",
      targetId: "alert-verdict",
      action: () => {
        window.dispatchEvent(new CustomEvent('close-panic-menu'));
        handlePanicActivate("screenshot");
        setStartTutorialAnalysis(false);
      }
    },
    {
      text: "Please wait... Our Trusted Guardians are currently reviewing your case in real-time.",
      targetId: null,
      hideNext: true,
      cannotSkip: true, // Cannot skip this part
      action: () => {
        setStartTutorialAnalysis(true);
        // setShowWalkthrough stays true now
        setIsWaitingForAnalysis(true);
      }
    },
    {
      text: "Analysis complete! This status indicates whether the conversation is safe or a scam.",
      targetId: "alert-verdict",
    },
    {
      text: "Guardians also flag suspicious evidence so you can better understand the risks.",
      targetId: "alert-evidence",
    },
    {
      text: "After that, you can tap this button to safely return to your main Dashboard.",
      targetId: "alert-close",
    },
    {
      text: "All set! This Dashboard is your security command center. You can also customize Nosè in Settings.",
      targetId: "nav-settings",
      action: () => {
        setAppVisible(false);
        setActiveApp("launcher");
        handleOpenApp("nose");
        setCurrentScreen("home");
      }
    },
    {
      text: "In Settings, you can choose to hide the floating button and use the notification shade.",
      targetId: "setting-notification",
      action: () => setCurrentScreen("settings")
    },
    {
      text: "Great! Now you can access Nosè Help by swiping down or tapping the top bar.",
      targetId: "status-bar-handle",
      action: () => {
        setNotificationEnabled(true);
        setFloatingEnabled(false);
      }
    },
    {
      text: "There it is! This tile allows you to get help instantly without cluttering your screen.",
      targetId: "shade-nose-tile",
      action: () => setShadeOpen(true)
    },
    {
      text: "You'll also see this persistent notification whenever Nosè is active, keeping you protected 24/7.",
      targetId: "shade-notification-item",
    },
    {
      text: "Now, swipe up or tap the bottom to close the shade and return home. You're all set!",
      targetId: null, // Centered
    }
  ], []);

  // Auto‑start walkthrough on first load
  useEffect(() => {
    setShowWalkthrough(true);

    const handleRestart = () => {
      setWalkStep(0);
      setShowWalkthrough(true);
    };

    window.addEventListener('start-tutorial', handleRestart);
    return () => window.removeEventListener('start-tutorial', handleRestart);
  }, []);

  const handleWalkthroughNext = () => {
    if (walkStep < tutorialSteps.length - 1) {
      const nextStep = walkStep + 1;
      setWalkStep(nextStep);
      // Trigger action for the current step we just arrived at
      if (tutorialSteps[nextStep].action) {
        tutorialSteps[nextStep].action!();
      }
    } else {
      setShowWalkthrough(false);
      setWalkStep(0);
    }
  };

  const handleWalkthroughClose = () => {
    setShowWalkthrough(false);
    setWalkStep(0);
    setAppVisible(false);
    setActiveApp("launcher");
    setCurrentScreen("home");
    setFloatingEnabled(true);
    setNotificationEnabled(false);
    setShadeOpen(false);
  };

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
          startAnalysis={showWalkthrough && walkStep === 9 ? startTutorialAnalysis : true}
          onResultReady={() => {
            if (isWaitingForAnalysis) {
              setIsWaitingForAnalysis(false);
              setWalkStep(11);
              setShowWalkthrough(true);
            }
          }}
          onClose={() => {
            setAppVisible(false);
            setCurrentScreen("home");
          }}
        />;
      case "education":
        return <EducationScreen
          initialTab={initialEducationTab}
          onClearTab={() => setInitialEducationTab(null)}
        />;
      case "settings":
        return <SettingsScreen
          floatingEnabled={floatingEnabled}
          onToggleFloating={setFloatingEnabled}
          notificationEnabled={notificationEnabled}
          onToggleNotification={setNotificationEnabled}
        />;
      case "stats":
        return <StatsScreen />;
      default:
        return (
          <HomeScreen onActivatePanic={() => setCurrentScreen("alert")} onExploreWorkshops={() => { }} />
        );
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden relative bg-black">
      {/* ── Base Layer: Android Launcher, WhatsApp, or Phone ── */}
      {activeApp === "launcher" && <AndroidHomeScreen onOpenApp={handleOpenApp} />}
      {activeApp === "whatsapp" && <WhatsAppChatScreen onPanicActivate={() => handlePanicActivate("screenshot")} />}
      {activeApp === "phone" && <PhoneCallScreen onPanicActivate={handlePanicActivate} />}

      {/* Status Bar (Always on top) */}
      <StatusBar />

      <motion.div
        id="status-bar-handle"
        onPanEnd={(_, info) => {
          if (info.offset.y > 10 || info.velocity.y > 100) setShadeOpen(true);
        }}
        onClick={() => setShadeOpen(true)}
        className="fixed top-0 left-0 right-0 h-10 z-[700] cursor-ns-resize pointer-events-auto"
      />

      <NotificationShade
        isOpen={shadeOpen}
        onClose={() => setShadeOpen(false)}
        nosEnabled={notificationEnabled}
        onNoseClick={() => handlePanicActivate("screenshot")}
      />

      {/* Floating Panic Button (always available unless alert screen is open) */}
      {floatingEnabled && (!appVisible || currentScreen !== "alert") && (
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
                className="bg-[var(--md-surface-container)] border-b border-[var(--md-outline-variant)] px-4 pb-4 pt-11 flex items-center justify-between"
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
                      <span className="text-xs font-medium">Home</span>
                    </motion.button>

                    {/* Notification Icon */}
                    <button className="relative p-2 hover:bg-[var(--md-surface-variant)] rounded-full transition-colors">
                      <Bell className="w-6 h-6 text-muted-foreground" />
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--md-error)] rounded-full border-2 border-[var(--md-surface-container)]" />
                    </button>

                    {/* Tutorial Help Icon */}
                    <button
                      onClick={() => {
                        setAppVisible(false);
                        setActiveApp("launcher");
                        setCurrentScreen("home");
                        setWalkStep(0);
                        setShowWalkthrough(true);
                      }}
                      className="p-2 hover:bg-[var(--md-surface-variant)] rounded-full transition-colors"
                    >
                      <HelpCircle className="w-6 h-6 text-muted-foreground" />
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
                  id="nav-home"
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
                  id="nav-learn"
                  icon={<ShieldAlert className="w-6 h-6" />}
                  label="Learn"
                  active={currentScreen === "education"}
                  onClick={() => setCurrentScreen("education")}
                />
                <NavButton
                  id="nav-stats"
                  icon={<TrendingUp className="w-6 h-6" />}
                  label="Stats"
                  active={currentScreen === "stats"}
                  onClick={() => setCurrentScreen("stats")}
                />
                <NavButton
                  id="nav-settings"
                  icon={<Settings className="w-6 h-6" />}
                  label="Settings"
                  active={currentScreen === "settings"}
                  onClick={() => setCurrentScreen("settings")}
                />
              </motion.nav>
            </HeaderContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>
      {showWalkthrough && (
        <WalkthroughOverlay
          step={walkStep}
          totalSteps={tutorialSteps.length}
          content={tutorialSteps.map(s => s.text)}
          targetIds={tutorialSteps.map(s => s.targetId || null)}
          hideNext={(tutorialSteps[walkStep] as any)?.hideNext}
          cannotSkip={(tutorialSteps[walkStep] as any)?.cannotSkip}
          onNext={handleWalkthroughNext}
          onClose={handleWalkthroughClose}
        />
      )}
    </div>
  );
}

function NavButton({
  id,
  icon,
  label,
  active,
  onClick,
}: {
  id?: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      id={id}
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