import {
  Shield,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  Camera,
  AlertTriangle,
  Ban,
  Globe,
  Zap,
  Mic,
  MessageSquare,
  User,
  Users,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import wallpaper from "../../imports/android_wallpaper.png";
import { PanicType } from "./PanicButton";

// ── Mini screenshot preview of the WhatsApp scam chat ──────────────────────
function ChatScreenshotPreview({ annotated = false }: { annotated?: boolean }) {
  const previewMessages = [
    { from: "them", text: "…activation fee of RM200 to unlock your account…", flag: annotated ? "payment" : null },
    { from: "them", text: "talentlink-jobs.biz — register and send me your code", flag: annotated ? "domain" : null },
    { from: "me", text: "Wait, why do I need to pay first?", flag: null },
    { from: "them", text: "only 3 slots left! Transfer to: Maybank 1122334455", flag: annotated ? "urgency" : null },
  ];

  const flagColors: Record<string, string> = {
    payment: "border-red-500 bg-red-50",
    domain: "border-orange-400 bg-orange-50",
    urgency: "border-red-600 bg-red-100",
  };

  const flagLabels: Record<string, string> = {
    payment: "💸 Upfront payment",
    domain: "🌐 Phishing domain",
    urgency: "⏱ Urgency tactic",
  };

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl border border-black/10"
      style={{ background: "#ECE5DD" }}
    >
      {/* WhatsApp header strip */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#075E54" }}>
        <div className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center text-white text-[9px] font-bold">
          RL
        </div>
        <div>
          <p className="text-white text-[10px] font-semibold leading-tight">Rachel Lim - TalentLink HR</p>
          <p className="text-white/70 text-[8px]">online</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/60" />)}
        </div>
      </div>

      {/* Messages */}
      <div className="px-2 py-2 space-y-1.5">
        {previewMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`relative max-w-[85%] px-2 py-1.5 rounded-xl text-[10px] text-gray-800 leading-tight border-2 ${msg.flag
                ? flagColors[msg.flag]
                : msg.from === "me"
                  ? "bg-[#DCF8C6] border-transparent"
                  : "bg-white border-transparent"
                }`}
            >
              <p>{msg.text}</p>
              {msg.flag && annotated && (
                <p className="text-[8px] font-bold text-red-600 mt-0.5">{flagLabels[msg.flag]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Nosè capture stamp */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-t border-black/10" style={{ background: "#F0F0F0" }}>
        <Camera className="w-3 h-3 text-red-500" />
        <span className="text-[9px] text-gray-500 font-medium">
          Captured by Nosè · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}

// ── Phone Call Screenshot Preview ───────────────────────────────────────────
function PhoneCallScreenshotPreview({ annotated = false }: { annotated?: boolean }) {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-white/10 p-6 flex flex-col items-center gap-4 relative">
      <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
        <Users className="w-10 h-10 text-gray-400" />
      </div>
      <div className="text-center">
        <p className="text-white font-bold text-lg">+60 12-345 6789</p>
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider mt-1">Potential Fraud</p>
      </div>

      {annotated && (
        <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] px-2 py-1 rounded-full font-bold animate-bounce shadow-lg z-10">
          REPORTED SCAM
        </div>
      )}

      {/* Nosè capture stamp */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 border-t border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
        <Camera className="w-3 h-3 text-red-500" />
        <span className="text-[9px] text-gray-400 font-medium">
          Captured by Nosè · Phone Call Screen
        </span>
      </div>
    </div>
  );
}

// ── Voice Transcript Preview ────────────────────────────────────────────────
function VoiceTranscriptPreview({
  annotated = false,
  showStatus = false,
  type = "scam"
}: {
  annotated?: boolean,
  showStatus?: boolean,
  type?: "scam" | "safe"
}) {
  const scamTranscript = [
    { speaker: "Scammer", text: "Hello, this is officer Tan from Bank Negara. We noticed suspicious activity.", flag: null },
    { speaker: "Scammer", text: "To secure your account, I need you to read the 6-digit TAC code you just received.", flag: annotated ? "otp" : null },
    { speaker: "Me", text: "Wait, I thought Bank doesn't ask for TAC?", flag: null },
    { speaker: "Scammer", text: "This is an emergency! If you don't provide it now, your account will be frozen in 5 minutes.", flag: annotated ? "urgency" : null },
  ];

  const safeTranscript = [
    { speaker: "Friend", text: "Hey! Are we still on for the community workshop tomorrow?", flag: null },
    { speaker: "Me", text: "Yes, definitely. I've already prepared the materials.", flag: null },
    { speaker: "Friend", text: "Great. It's at the town hall at 10 AM. Don't forget your ID for registration.", flag: null },
    { speaker: "Me", text: "Got it. See you there!", flag: null },
  ];

  const transcript = type === "scam" ? scamTranscript : safeTranscript;

  const flagLabels: Record<string, string> = {
    otp: "🔑 OTP/TAC Solicitation",
    urgency: "⏱ Fear & Urgency tactic",
  };

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${type === "scam" ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {type === "scam" ? "Live Transcript" : "Offline Recording"}
          </span>
        </div>
        <Mic className={`w-4 h-4 ${type === "scam" ? "text-purple-400" : "text-emerald-400"}`} />
      </div>

      <div className="space-y-4">
        {transcript.map((line, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-bold uppercase ${line.speaker === "Me" ? "text-blue-400" : "text-gray-400"}`}>
                {line.speaker}
              </span>
              {line.flag && annotated && (
                <span className="bg-red-500/20 text-red-400 text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                  {flagLabels[line.flag]}
                </span>
              )}
            </div>
            <p className={`text-xs leading-relaxed ${line.flag && annotated ? "text-red-300 font-medium" : "text-gray-300"}`}>
              "{line.text}"
            </p>
          </div>
        ))}
      </div>

      {showStatus && (
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
          <div className="flex gap-0.5 items-end h-4">
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                animate={{ height: [8, 16, 8] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-purple-500 rounded-full"
              />
            ))}
          </div>
          <span className="text-[9px] text-gray-500">Guardian audio link active...</span>
        </div>
      )}
    </div>
  );
}

// ── Mini screenshot preview of the Launcher Home Screen ────────────────────
function LauncherScreenshotPreview() {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl border border-black/10 relative h-40 bg-gray-900 bg-cover bg-center"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full flex flex-col items-center justify-center">
        <span className="text-white font-semibold text-lg drop-shadow-md">Android Home Screen</span>
      </div>

      {/* Nosè capture stamp */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 border-t border-black/10" style={{ background: "#F0F0F0" }}>
        <Camera className="w-3 h-3 text-emerald-500" />
        <span className="text-[9px] text-gray-500 font-medium">
          Captured by Nosè · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}

// ── Guardian definitions ─────────────────────────────────────────────────────
interface GuardianDef {
  name: string;
  finding: string;
  icon: React.ReactNode;
  completeAt: number;
}

const GUARDIANS: GuardianDef[] = [
  { name: "Guardian #247", finding: "Upfront payment demand detected", icon: <Ban className="w-4 h-4" />, completeAt: 40 },
  { name: "Guardian #583", finding: "Phishing domain (.biz) identified", icon: <Globe className="w-4 h-4" />, completeAt: 68 },
  { name: "Guardian #912", finding: "Urgency & pressure tactics found", icon: <Zap className="w-4 h-4" />, completeAt: 90 },
];

const VOICE_GUARDIANS: GuardianDef[] = [
  { name: "Guardian #247", finding: "Social Engineering (Authority) detected", icon: <Shield className="w-4 h-4" />, completeAt: 40 },
  { name: "Guardian #583", finding: "Sensitive Data (OTP) request identified", icon: <Zap className="w-4 h-4" />, completeAt: 68 },
  { name: "Guardian #912", finding: "Coercive urgency tactics confirmed", icon: <Clock className="w-4 h-4" />, completeAt: 90 },
];

const PHONE_SCAM_GUARDIANS: GuardianDef[] = [
  { name: "Guardian #247", finding: "Reported vishing number (+60 12...) identified", icon: <Ban className="w-4 h-4" />, completeAt: 40 },
  { name: "Guardian #583", finding: "High-risk caller (Security database match)", icon: <Shield className="w-4 h-4" />, completeAt: 68 },
  { name: "Guardian #912", finding: "Spoofing signatures detected in signaling", icon: <Zap className="w-4 h-4" />, completeAt: 90 },
];

const SAFE_VOICE_GUARDIANS: GuardianDef[] = [
  { name: "Guardian #247", finding: "General safe conversation detected", icon: <CheckCircle className="w-4 h-4" />, completeAt: 40 },
  { name: "Guardian #583", finding: "No sensitive data requests (safe)", icon: <CheckCircle className="w-4 h-4" />, completeAt: 68 },
  { name: "Guardian #912", finding: "Normal safe conversational tone", icon: <CheckCircle className="w-4 h-4" />, completeAt: 90 },
];

// ── Guardian card ────────────────────────────────────────────────────────────
function GuardianCard({ guardian, progress }: { guardian: GuardianDef; progress: number }) {
  const done = progress >= guardian.completeAt;
  const isSafe = guardian.finding.includes("No payment") || guardian.finding.includes("safe") || guardian.finding.includes("No urgency");

  return (
    <motion.div layout className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-500 ${done ? (isSafe ? "bg-emerald-500 text-white" : "bg-red-500 text-white") : "bg-gray-100 text-gray-400"
            }`}
        >
          {done ? guardian.icon : <Eye className="w-4 h-4" />}
        </div>
        <div className="text-left">
          <p className="font-semibold text-sm text-gray-800">{guardian.name}</p>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p key="finding" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className={`text-xs font-semibold ${guardian.finding.includes("No payment") || guardian.finding.includes("safe") || guardian.finding.includes("No urgency") ? "text-emerald-600" : "text-red-600"}`}>
                {guardian.finding.includes("No payment") || guardian.finding.includes("safe") || guardian.finding.includes("No urgency") ? "✓" : "⚠"} {guardian.finding}
              </motion.p>
            ) : (
              <motion.p key="analyzing" className="text-xs text-gray-400">
                Analyzing content…
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-1">
            {guardian.finding.includes("No payment") || guardian.finding.includes("safe") || guardian.finding.includes("No urgency") ? (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-600">SAFE</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-xs font-bold text-red-600">SCAM</span>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div key="loading" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <Loader2 className="w-5 h-5 text-gray-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main AlertScreen ─────────────────────────────────────────────────────────
export function AlertScreen({
  onClose,
  hasScreenshot = true,
  source = "whatsapp",
  panicType = "screenshot",
  startAnalysis = true,
  onResultReady,
}: {
  onClose: () => void;
  hasScreenshot?: boolean;
  source?: "whatsapp" | "launcher" | "phone";
  panicType?: PanicType;
  startAnalysis?: boolean;
  onResultReady?: () => void;
}) {
  const [stage, setStage] = useState<"stalling" | "analyzing" | "result">("stalling");
  const [progress, setProgress] = useState(0);
  const [verdict, setVerdict] = useState<"safe" | "scam" | null>(null);

  const isLauncher = source === "launcher";
  const isAudio = panicType === "audio";
  const isSafeAudio = isAudio && isLauncher;

  const guardiansToUse = isAudio
    ? (isSafeAudio ? SAFE_VOICE_GUARDIANS : VOICE_GUARDIANS)
    : isLauncher
      ? [
        { name: "Guardian #247", finding: "No payment demands detected", icon: <CheckCircle className="w-4 h-4" />, completeAt: 40 },
        { name: "Guardian #583", finding: "Known safe application (Home Screen)", icon: <CheckCircle className="w-4 h-4" />, completeAt: 68 },
        { name: "Guardian #912", finding: "No urgency or pressure tactics", icon: <CheckCircle className="w-4 h-4" />, completeAt: 90 },
      ] : source === "phone"
        ? PHONE_SCAM_GUARDIANS
        : GUARDIANS;

  useEffect(() => {
    if (!startAnalysis) return;

    const stallingTimer = setTimeout(() => setStage("analyzing"), 3500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 7.2;
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setStage("result");
            // Launcher screenshots AND Launcher offline recordings are safe.
            // Other sources (whatsapp, phone call) are scam simulations.
            const finalVerdict = isLauncher ? "safe" : "scam";
            setVerdict(finalVerdict);
            onResultReady?.();
          }, 600);
          return 100;
        }
        return next;
      });
    }, 1000);

    return () => { clearTimeout(stallingTimer); clearInterval(progressInterval); };
  }, [startAnalysis]);

  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-indigo-900 to-purple-900">
      <AnimatePresence mode="wait">

        {/* ── Stage 1: Stalling ────────────────────────────────────────── */}
        {stage === "stalling" && (
          <motion.div key="stalling"
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
            className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center gap-6">

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full flex items-center justify-center relative mb-8 z-10"
            >
              <svg viewBox="0 0 24 24" className="w-16 h-16 fill-white drop-shadow-xl z-20">
                <path d="M9.5,4 C9.5,3.44772 9.05228,3 8.5,3 C7.94772,3 7.5,3.44772 7.5,4 C7.5,5.82724 7.04443,7.67507 6.10557,9.55279 C5.65437,10.4552 5.01801,11.1536 4.31564,12.1216 C3.66521,13.0179 3,14.1126 3,15.5 C3,17.433 4.567,19 6.5,19 C7.07231,19 8.01211,18.6241 8.55279,18.8944 C8.95146,19.0938 9.20854,19.5539 9.50991,19.8735 C10.0291,20.4242 10.7741,21 12,21 C13.2259,21 13.9709,20.4242 14.4901,19.8735 C14.7847,19.561 15.0522,19.0919 15.4472,18.8944 C15.9879,18.6241 16.9277,19 17.5,19 C19.433,19 21,17.433 21,15.5 C21,14.1126 20.3348,13.0179 19.6844,12.1216 C18.982,11.1537 18.3456,10.4552 17.8944,9.55279 C16.9556,7.67507 16.5,5.82724 16.5,4 C16.5,3.44772 16.0523,3 15.5,3 C14.9477,3 14.5,3.44772 14.5,4 C14.5,6.17276 15.0444,8.32493 16.1056,10.4472 C16.6543,11.5448 17.518,12.5416 18.0656,13.2962 C18.6652,14.1224 19,14.7777 19,15.5 C19,16.3284 18.3284,17 17.5,17 C16.4837,17 15.5332,16.6153 14.5528,17.1056 C13.9114,17.4262 13.5129,17.9945 13.0349,18.5015 C12.7291,18.8258 12.4741,19 12,19 C11.5259,19 11.2709,18.8258 10.9651,18.5015 C10.4898,17.9974 10.0842,17.4241 9.44721,17.1056 C8.46675,16.6153 7.51632,17 6.5,17 C5.67157,17 5,16.3284 5,15.5 C5,14.7777 5.33479,14.1224 5.93436,13.2962 C6.48197,12.5415 7.34564,11.5448 7.89443,10.4472 C8.95557,8.32493 9.5,6.17276 9.5,4 Z" />
              </svg>
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Take a Deep Breath</h2>
              <p className="text-base text-white opacity-80">
                You're safe. Nosè is now analyzing your {isAudio ? "conversation audio" : "screenshot"}.
              </p>
            </div>

            {(hasScreenshot || isAudio) && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="w-full max-w-xs">
                <div className="flex items-center gap-2 mb-2 justify-center">
                  {isAudio ? <Mic className="w-4 h-4 text-white opacity-70" /> : <Camera className="w-4 h-4 text-white opacity-70" />}
                  <span className="text-sm text-white opacity-70">{isAudio ? "Live Audio Monitor" : "Screenshot attached"}</span>
                </div>
                {isAudio ? (
                  <VoiceTranscriptPreview type={isSafeAudio ? "safe" : "scam"} showStatus={stage === "analyzing"} />
                ) : source === "phone" ? (
                  <PhoneCallScreenshotPreview />
                ) : isLauncher ? (
                  <LauncherScreenshotPreview />
                ) : (
                  <ChatScreenshotPreview />
                )}
              </motion.div>
            )}

            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-5 w-full max-w-xs">
              <BreathingExercise />
            </div>
          </motion.div>
        )}

        {/* ── Stage 2: Analyzing ───────────────────────────────────────── */}
        {stage === "analyzing" && (
          <motion.div key="analyzing"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col px-5 py-6 gap-4 overflow-y-auto">

            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                  <Loader2 className="w-9 h-9 text-white" />
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-white">Analyzing {isAudio ? "Voice" : "Screenshot"}</h2>
              <p className="text-sm text-white opacity-90 mt-1">
                3 Trusted Guardians are reviewing your case
              </p>
            </div>

            {/* Media preview */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              {isAudio ? (
                <VoiceTranscriptPreview type={isSafeAudio ? "safe" : "scam"} showStatus={stage === "analyzing"} />
              ) : source === "phone" ? (
                <PhoneCallScreenshotPreview />
              ) : isLauncher ? (
                <LauncherScreenshotPreview />
              ) : (
                <ChatScreenshotPreview />
              )}
            </motion.div>

            {/* Progress bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between text-xs text-gray-500 font-medium mb-2">
                <span>Analysis progress</span>
                <span className="font-bold text-gray-700">{Math.round(progress)}%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: isAudio ? "linear-gradient(90deg, #8b5cf6, #d946ef)" : "linear-gradient(90deg, #6366f1, #ec4899)" }}
                />
              </div>
            </div>

            {/* Guardian cards */}
            <div className="space-y-2.5">
              {guardiansToUse.map((g) => (
                <GuardianCard key={g.name} guardian={g} progress={progress} />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-white opacity-80">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">Avg. response time: ~14 seconds</span>
            </div>
          </motion.div>
        )}

        {/* ── Stage 3: Verdict ─────────────────────────────────────────── */}
        {stage === "result" && verdict && (
          <motion.div key="result"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="flex-1 flex flex-col px-5 py-6 gap-4 overflow-y-auto">

            {/* Verdict badge */}
            <div className="text-center">
                <div 
                  id="alert-verdict"
                  className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ background: verdict === "scam" ? "#DC2626" : "#16a34a" }}>
                {verdict === "scam"
                  ? <XCircle className="w-11 h-11 text-white" strokeWidth={2.5} />
                  : <CheckCircle className="w-11 h-11 text-white" strokeWidth={2.5} />}
                </div>
              <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-white">
                {verdict === "scam" ? "Scam Confirmed" : "Looks Safe"}
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="text-sm text-white opacity-90 mt-1">
                {verdict === "scam"
                  ? "All 3 Guardians flagged this as a scam"
                  : "Guardians verified this conversation is legitimate"}
              </motion.p>
            </div>

            {/* Annotated preview */}
            <motion.div 
              id="alert-evidence"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">
                  Evidence flagged by Guardians
                </span>
              </div>
              {isAudio ? (
                <VoiceTranscriptPreview annotated type={isSafeAudio ? "safe" : "scam"} showStatus={stage === "analyzing"} />
              ) : source === "phone" ? (
                <PhoneCallScreenshotPreview annotated />
              ) : isLauncher ? (
                <LauncherScreenshotPreview />
              ) : (
                <ChatScreenshotPreview annotated />
              )}
            </motion.div>

            {/* Guardian verdicts summary */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Guardian Findings</p>
              <div className="space-y-3">
                {guardiansToUse.map((g, i) => (
                  <div key={g.name} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${verdict === "scam" ? "bg-red-500" : "bg-emerald-500"}`}>
                      <span className="text-white text-[10px] font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{g.name}</p>
                      <p className={`text-xs ${verdict === "scam" ? "text-red-600" : "text-emerald-600"}`}>{g.finding}</p>
                    </div>
                    {verdict === "scam"
                      ? <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      : <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What to do */}
            {verdict === "scam" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">What to Do Now</p>
                <ul className="space-y-2.5">
                  {[
                    isAudio ? "Hang up the phone immediately" : "Do NOT send any money or personal information",
                    "Block and report this contact immediately",
                    "Save all evidence (recordings, screenshots)",
                    "Report to local authorities if you've paid",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 text-[10px] font-bold">{i + 1}</span>
                      </div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Action buttons */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              className="space-y-3 pb-4">
              <button 
                id="alert-reanalyze"
                onClick={() => {
                  setStage("stalling");
                  setProgress(0);
                  setVerdict(null);
                }}
                className="w-full bg-white text-gray-900 py-4 rounded-full font-bold text-base hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Re-analyze (2 new Guardians)
              </button>

              <button 
                id="alert-close"
                onClick={onClose}
                className={`w-full ${isAudio ? "bg-purple-600" : "bg-[var(--md-primary)]"} text-white py-4 rounded-full font-bold text-base hover:shadow-lg transition-shadow`}>
                Return to Safety
              </button>
              <button className="w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-full font-medium hover:bg-white/30 transition-colors">
                Report False Positive
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Breathing exercise ────────────────────────────────────────────────────────
function BreathingExercise() {
  const [breathPhase, setBreathPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const phases = ["in", "hold", "out"] as const;
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setBreathPhase(phases[idx]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <motion.div
        animate={{ scale: breathPhase === "out" ? 1 : 1.2 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="w-16 h-16 mx-auto mb-3 rounded-full bg-white opacity-40"
      />
      <p className="text-base font-medium text-white">
        {breathPhase === "in" && "Breathe In…"}
        {breathPhase === "hold" && "Hold…"}
        {breathPhase === "out" && "Breathe Out…"}
      </p>
    </div>
  );
}
