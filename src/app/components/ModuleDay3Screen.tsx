import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Play,
  Brain,
  ShieldAlert,
  Lock,
  Star,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface ModuleDay3ScreenProps {
  onBack: () => void;
}

// ── Quiz data ────────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "If a friend is panicking about a supposed bank freeze message, what should you tell them first?",
    options: [
      "Quickly move your money to another account",
      "Take a deep breath, don't click anything, and call the bank's official number",
      "Reply to the message asking for proof",
      "Ignore it, banks don't freeze accounts",
    ],
    correct: 1,
    explanation: "De-escalation is key. Calm the victim down, prevent them from acting hastily, and verify through official channels.",
  },
  {
    id: 2,
    question: "What is the role of a 'Trusted Guardian'?",
    options: [
      "To hack scammers and get revenge",
      "To investigate crimes and arrest suspects",
      "To educate others, spot red flags, and guide victims to official help",
      "To lend money to victims of scams",
    ],
    correct: 2,
    explanation: "A Guardian acts as a first line of defense in the community by raising awareness and guiding victims to report to the authorities (e.g., NSRC in Malaysia).",
  },
  {
    id: 3,
    question: "Which of these is a strong practice for securing your digital footprint?",
    options: [
      "Using your pet's name for all passwords",
      "Enabling Two-Factor Authentication (2FA) on all important accounts",
      "Sharing your daily routine publicly on social media",
      "Only accepting friend requests from attractive profiles",
    ],
    correct: 1,
    explanation: "2FA (Two-Factor Authentication) adds an essential layer of security, making it much harder for scammers to access your accounts even if they have your password.",
  },
];

// ── Lesson sections ──────────────────────────────────────────────────────────
const LESSONS = [
  {
    id: 1,
    title: "The Guardian Code",
    duration: "3 min",
    icon: <Award className="w-5 h-5" />,
    color: "from-amber-500 to-orange-500",
    content: [
      {
        type: "paragraph",
        text: "As a Trusted Guardian, your role is not to be a vigilante. Your role is to be the calm voice of reason in a panicked situation.",
      },
      {
        type: "list",
        title: "The 3 Pillars of a Guardian:",
        items: [
          "Educate: Share knowledge about common scams with family and friends.",
          "De-escalate: Help potential victims calm down before they transfer money.",
          "Report: Guide victims to official reporting channels (e.g., 997 NSRC in Malaysia).",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "De-escalation and Verification",
    duration: "4 min",
    icon: <ShieldAlert className="w-5 h-5" />,
    color: "from-orange-500 to-red-500",
    content: [
      {
        type: "paragraph",
        text: "When someone is in the middle of a scam, they are experiencing an Amygdala Hijack. They cannot think logically. Here is how you help them:",
      },
      {
        type: "timeline",
        steps: [
          { step: "1", text: "Listen without judgment. Do not say 'How could you be so stupid?'" },
          { step: "2", text: "Create space. Tell them to wait 15 minutes before doing anything." },
          { step: "3", text: "Verify independently. Look up the official bank/police number yourself and call it." },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Securing Digital Footprints",
    duration: "5 min",
    icon: <Lock className="w-5 h-5" />,
    color: "from-yellow-500 to-amber-600",
    content: [
      {
        type: "paragraph",
        text: "Scammers use public information on social media to craft highly personalized attacks (Spear Phishing).",
      },
      {
        type: "checklist",
        items: [
          { text: "Enable Two-Factor Authentication (2FA) on WhatsApp, email, and banking apps.", level: "warning" },
          { text: "Set social media profiles to private. Don't broadcast your location in real-time.", level: "warning" },
          { text: "Regularly review and remove connected apps that you no longer use.", level: "warning" },
        ],
      },
    ],
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────
function LessonContent({ lesson }: { lesson: typeof LESSONS[0] }) {
  return (
    <div className="space-y-4">
      {lesson.content.map((block, i) => {
        if (block.type === "paragraph") {
          return <p key={i} className="text-sm text-gray-600 leading-relaxed">{block.text}</p>;
        }
        if (block.type === "highlight") {
          return (
            <div key={i} className="bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-xl">
              <p className="text-sm text-amber-700 italic">{block.text}</p>
            </div>
          );
        }
        if (block.type === "list" && block.items) {
          return (
            <div key={i}>
              {block.title && <p className="text-sm font-semibold text-gray-700 mb-2">{block.title}</p>}
              <ul className="space-y-1.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (block.type === "checklist" && block.items) {
          return (
            <div key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <div key={j} className={`flex items-start gap-2.5 rounded-xl px-3 py-2 ${
                  item.level === "danger" ? "bg-red-50" : "bg-amber-50"
                }`}>
                  <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                    item.level === "danger" ? "text-red-500" : "text-amber-500"
                  }`} />
                  <span className="text-sm text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          );
        }
        if (block.type === "timeline" && block.steps) {
          return (
            <div key={i} className="space-y-3">
              {block.steps.map((step, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${
                    j === block.steps!.length - 1 ? "bg-orange-500" : "bg-amber-500"
                  }`}>
                    {step.step}
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{step.text}</p>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function LessonAccordion({
  lesson,
  isOpen,
  isCompleted,
  onToggle,
  onComplete,
}: {
  lesson: typeof LESSONS[0];
  isOpen: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onComplete: () => void;
}) {
  return (
    <motion.div layout className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lesson.color} flex items-center justify-center text-white flex-shrink-0`}>
          {isCompleted ? <CheckCircle className="w-5 h-5" /> : lesson.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm ${isCompleted ? "text-gray-400 line-through" : "text-gray-800"}`}>
            {lesson.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">{lesson.duration} read</span>
            {isCompleted && <span className="text-xs text-emerald-500 font-semibold">✓ Done</span>}
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-gray-100 pt-4">
              <LessonContent lesson={lesson} />
              {!isCompleted && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => { e.stopPropagation(); onComplete(); }}
                  className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Complete
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = QUIZ_QUESTIONS[currentQ];
  const isLast = currentQ === QUIZ_QUESTIONS.length - 1;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
  };

  const handleNext = () => {
    const correct = selected === q.correct;
    const newAnswers = [...answers, correct];
    if (isLast) {
      onComplete(newAnswers.filter(Boolean).length);
    } else {
      setAnswers(newAnswers);
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
        <span>{answers.filter(Boolean).length} correct so far</span>
      </div>
      <div className="bg-gray-100 rounded-full h-1.5">
        <div
          className="h-full bg-amber-500 rounded-full transition-all"
          style={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <p className="font-semibold text-gray-800 text-sm leading-snug">{q.question}</p>

      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let style = "bg-gray-50 border-gray-200 text-gray-700";
          if (selected !== null) {
            if (i === q.correct) style = "bg-emerald-50 border-emerald-400 text-emerald-800";
            else if (i === selected && selected !== q.correct) style = "bg-red-50 border-red-400 text-red-700";
            else style = "bg-gray-50 border-gray-200 text-gray-400";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${style}`}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 text-sm ${selected === q.correct ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}
          >
            <p className={`font-semibold mb-1 ${selected === q.correct ? "text-emerald-700" : "text-red-700"}`}>
              {selected === q.correct ? "✓ Correct!" : "✗ Not quite."}
            </p>
            <p className={selected === q.correct ? "text-emerald-600" : "text-red-600"}>{q.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {showExplanation && (
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="w-full bg-amber-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-amber-600 transition-colors"
        >
          {isLast ? "See Final Results →" : "Next Question →"}
        </motion.button>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export function ModuleDay3Screen({ onBack }: ModuleDay3ScreenProps) {
  const [openLesson, setOpenLesson] = useState<number | null>(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const allLessonsComplete = completedLessons.size === LESSONS.length;
  const progress = Math.round((completedLessons.size / LESSONS.length) * 100);

  const handleComplete = (lessonId: number) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
    const nextIdx = LESSONS.findIndex((l) => l.id === lessonId) + 1;
    if (nextIdx < LESSONS.length) setOpenLesson(LESSONS[nextIdx].id);
    else setOpenLesson(null);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-br from-amber-500 to-orange-500 px-5 pt-5 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Learning Hub</span>
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Day 3 of 3
              </span>
              <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Advanced
              </span>
            </div>
            <h1 className="text-xl font-bold text-white leading-tight">Becoming a Guardian</h1>
            <p className="text-white/75 text-xs mt-1">Certification and real-world practice</p>
          </div>
        </div>

        <div className="bg-white/20 rounded-full h-2.5 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-white rounded-full"
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-white/70 text-xs">{completedLessons.size}/{LESSONS.length} lessons complete</span>
          <span className="text-white text-xs font-bold">{progress}%</span>
        </div>
      </div>

      <div className="bg-white mx-5 -mt-4 rounded-2xl shadow-sm px-4 py-3 flex items-center justify-around border border-gray-100">
        {[
          { label: "Duration", value: "12 min", icon: <Clock className="w-4 h-4 text-amber-500" /> },
          { label: "Lessons", value: `${LESSONS.length}`, icon: <Award className="w-4 h-4 text-orange-400" /> },
          { label: "XP Reward", value: "+300", icon: <Star className="w-4 h-4 text-yellow-500" /> },
          { label: "Quiz", value: "Final", icon: <Brain className="w-4 h-4 text-emerald-400" /> },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="flex justify-center mb-0.5">{s.icon}</div>
            <p className="font-bold text-sm text-gray-800">{s.value}</p>
            <p className="text-[10px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 px-5 py-5 space-y-3 pb-8">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-gray-700 text-sm">Lessons</span>
        </div>

        {LESSONS.map((lesson) => (
          <LessonAccordion
            key={lesson.id}
            lesson={lesson}
            isOpen={openLesson === lesson.id}
            isCompleted={completedLessons.has(lesson.id)}
            onToggle={() => setOpenLesson(openLesson === lesson.id ? null : lesson.id)}
            onComplete={() => handleComplete(lesson.id)}
          />
        ))}

        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-orange-500" />
            <span className="font-bold text-gray-700 text-sm">Guardian Certification Test</span>
          </div>

          <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${allLessonsComplete ? "border-gray-100" : "border-gray-100 opacity-70"}`}>
            {!allLessonsComplete && !showQuiz && (
              <div className="p-4 flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <p className="text-sm text-gray-400">Complete all lessons to unlock the certification test</p>
              </div>
            )}

            {allLessonsComplete && !showQuiz && quizScore === null && (
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Final Certification</p>
                    <p className="text-xs text-gray-400">3 questions · 5 min</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">Pass this test to earn your Trusted Guardian badge and certificate.</p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-full font-semibold text-sm hover:shadow-md transition-shadow"
                >
                  Start Certification →
                </motion.button>
              </div>
            )}

            {showQuiz && quizScore === null && (
              <div className="p-4">
                <Quiz onComplete={handleQuizComplete} />
              </div>
            )}

            {quizScore !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    quizScore === 3 ? "bg-emerald-100" : quizScore >= 2 ? "bg-amber-100" : "bg-red-100"
                  }`}
                >
                  <span className="text-3xl">{quizScore === 3 ? "🏆" : quizScore >= 2 ? "👍" : "📚"}</span>
                </motion.div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {quizScore === 3 ? "Certified Guardian!" : quizScore >= 2 ? "Good Job!" : "Keep Learning!"}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  You got <strong>{quizScore}/{QUIZ_QUESTIONS.length}</strong> correct
                </p>

                {quizScore === QUIZ_QUESTIONS.length && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-4 mb-4">
                    <Award className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
                    <p className="text-emerald-700 text-sm font-semibold">Official Guardian Status Unlocked!</p>
                    <p className="text-emerald-600 text-xs mt-1">+300 XP earned</p>
                  </div>
                )}

                <div className="space-y-2">
                  <button
                    onClick={() => { setShowQuiz(false); setQuizScore(null); }}
                    className="w-full bg-amber-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-amber-600 transition-colors"
                  >
                    Retake Test
                  </button>
                  <button
                    onClick={onBack}
                    className="w-full border border-gray-200 text-gray-600 py-3 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Back to Learning Hub
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
