import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Play,
  Brain,
  ShieldAlert,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  Star,
  Lock,
} from "lucide-react";

interface ModuleDay1ScreenProps {
  onBack: () => void;
}

// ── Quiz data ────────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which of the following is the most common social engineering tactic?",
    options: [
      "Sending a physical letter",
      "Creating false urgency to pressure a decision",
      "Waiting patiently for a response",
      "Offering a fair market price",
    ],
    correct: 1,
    explanation: "Scammers create urgency (\"limited slots\", \"expires today\") to stop victims from thinking critically.",
  },
  {
    id: 2,
    question: "A job offer asks you to pay an 'activation fee' before you start. This is…",
    options: [
      "Normal — most jobs require setup costs",
      "A red flag — legitimate employers never ask for upfront payment",
      "Fine if the amount is small (under RM500)",
      "Acceptable if they promise a refund",
    ],
    correct: 1,
    explanation: "No legitimate employer requires payment to start working. This is the #1 sign of a job scam.",
  },
  {
    id: 3,
    question: "What should you do first when you suspect a message is a scam?",
    options: [
      "Reply asking for more details",
      "Send a small amount to test if it's real",
      "Stop all communication and verify through official channels",
      "Share the opportunity with friends",
    ],
    correct: 2,
    explanation: "Immediately stop communication. Never send money to verify — that's exactly what scammers want.",
  },
];

// ── Lesson sections ──────────────────────────────────────────────────────────
const LESSONS = [
  {
    id: 1,
    title: "What Is Social Engineering?",
    duration: "3 min",
    icon: <Brain className="w-5 h-5" />,
    color: "from-violet-500 to-indigo-600",
    content: [
      {
        type: "paragraph",
        text: "Social engineering is the psychological manipulation of people into performing actions or divulging confidential information. Unlike hacking software, it targets the human mind.",
      },
      {
        type: "highlight",
        text: "\"The weakest link in any security system is always the human being.\" — Kevin Mitnick",
      },
      {
        type: "paragraph",
        text: "In ASEAN, social engineering scams cost victims over USD 1.5 billion annually. The methods evolve rapidly — from phone calls to WhatsApp, Telegram, and dating apps.",
      },
      {
        type: "list",
        title: "Core manipulation tactics:",
        items: [
          "Authority — impersonating banks, government, or CEOs",
          "Urgency — 'Act now or lose your account!'",
          "Scarcity — 'Only 3 slots left!'",
          "Reciprocity — giving small gifts to build trust",
          "Liking — befriending you before the ask",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Top Scam Types in ASEAN",
    duration: "4 min",
    icon: <ShieldAlert className="w-5 h-5" />,
    color: "from-red-500 to-rose-600",
    content: [
      {
        type: "paragraph",
        text: "Southeast Asia is one of the most targeted regions for online scams due to rapid digital adoption and varying levels of financial literacy.",
      },
      {
        type: "scam-cards",
        cards: [
          { name: "Job Scams", desc: "Fake part-time jobs (rating, liking, reviewing) that ask for upfront fees", emoji: "💼", severity: "high" },
          { name: "Love Scams", desc: "Online relationships that eventually ask for money transfers", emoji: "💔", severity: "high" },
          { name: "Phishing", desc: "Fake bank/government links to steal your login credentials", emoji: "🎣", severity: "high" },
          { name: "Investment Scams", desc: "Crypto and forex 'opportunities' promising guaranteed returns", emoji: "📈", severity: "critical" },
          { name: "Parcel Scams", desc: "Fake delivery notifications requiring custom fees", emoji: "📦", severity: "medium" },
          { name: "Tech Support", desc: "Fake warnings saying your device is infected", emoji: "💻", severity: "medium" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Red Flags to Watch For",
    duration: "3 min",
    icon: <AlertTriangle className="w-5 h-5" />,
    color: "from-amber-500 to-orange-500",
    content: [
      {
        type: "paragraph",
        text: "Trained eyes can spot scams before any damage is done. Here are the universal red flags:",
      },
      {
        type: "checklist",
        items: [
          { text: "Requests for upfront payment in any form", level: "danger" },
          { text: "Guaranteed returns or 'risk-free' investments", level: "danger" },
          { text: "Urgency — 'Act now or lose your chance'", level: "danger" },
          { text: "Contact from unknown numbers via WhatsApp/Telegram", level: "warning" },
          { text: "Unprofessional or misspelled domain names", level: "warning" },
          { text: "Requests to switch to a private/encrypted channel", level: "warning" },
          { text: "Unusually high pay for simple tasks", level: "warning" },
          { text: "Pressure to keep the opportunity secret", level: "warning" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Real Case Study: The TalentLink Scam",
    duration: "2 min",
    icon: <Users className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-600",
    content: [
      {
        type: "paragraph",
        text: "In 2024, thousands of ASEAN victims lost money to \"product rating\" job scams. Here's how it worked:",
      },
      {
        type: "timeline",
        steps: [
          { step: "1", text: "Victim receives an unsolicited WhatsApp message offering part-time work" },
          { step: "2", text: "Small tasks are assigned with instant payouts to build trust" },
          { step: "3", text: "Larger tasks are introduced requiring an 'activation deposit'" },
          { step: "4", text: "The deposit amount keeps growing — victims are told more payment unlocks their funds" },
          { step: "5", text: "Contact goes dark. All money is lost." },
        ],
      },
      {
        type: "highlight",
        text: "Total losses in Malaysia alone: RM 156 million in 2023 (PDRM data)",
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
            <div key={i} className="bg-indigo-50 border-l-4 border-indigo-400 px-4 py-3 rounded-r-xl">
              <p className="text-sm text-indigo-700 italic">{block.text}</p>
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
                    <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (block.type === "scam-cards" && block.cards) {
          return (
            <div key={i} className="grid grid-cols-2 gap-2">
              {block.cards.map((card, j) => (
                <div key={j} className={`rounded-2xl p-3 border ${
                  card.severity === "critical" ? "bg-red-50 border-red-200"
                  : card.severity === "high" ? "bg-orange-50 border-orange-200"
                  : "bg-amber-50 border-amber-200"
                }`}>
                  <div className="text-2xl mb-1">{card.emoji}</div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">{card.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{card.desc}</p>
                </div>
              ))}
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
                    j === block.steps!.length - 1 ? "bg-red-500" : "bg-indigo-500"
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
                  className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-md transition-shadow"
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
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
        <span>{answers.filter(Boolean).length} correct so far</span>
      </div>
      <div className="bg-gray-100 rounded-full h-1.5">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
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
          className="w-full bg-indigo-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-indigo-600 transition-colors"
        >
          {isLast ? "See Results →" : "Next Question →"}
        </motion.button>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export function ModuleDay1Screen({ onBack }: ModuleDay1ScreenProps) {
  const [openLesson, setOpenLesson] = useState<number | null>(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const allLessonsComplete = completedLessons.size === LESSONS.length;
  const progress = Math.round((completedLessons.size / LESSONS.length) * 100);

  const handleComplete = (lessonId: number) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
    // Auto-open next lesson
    const nextIdx = LESSONS.findIndex((l) => l.id === lessonId) + 1;
    if (nextIdx < LESSONS.length) setOpenLesson(LESSONS[nextIdx].id);
    else setOpenLesson(null);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 px-5 pt-5 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Learning Hub</span>
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Day 1 of 3
              </span>
              <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Beginner
              </span>
            </div>
            <h1 className="text-xl font-bold text-white leading-tight">Understanding the Threat</h1>
            <p className="text-white/75 text-xs mt-1">Recognizing social engineering crimes in ASEAN</p>
          </div>
        </div>

        {/* Progress bar */}
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

      {/* Stats row */}
      <div className="bg-white mx-5 -mt-4 rounded-2xl shadow-sm px-4 py-3 flex items-center justify-around border border-gray-100">
        {[
          { label: "Duration", value: "12 min", icon: <Clock className="w-4 h-4 text-indigo-400" /> },
          { label: "Lessons", value: `${LESSONS.length}`, icon: <BookOpen className="w-4 h-4 text-violet-400" /> },
          { label: "XP Reward", value: "+150", icon: <Star className="w-4 h-4 text-amber-400" /> },
          { label: "Quiz", value: "3 Qs", icon: <Brain className="w-4 h-4 text-emerald-400" /> },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="flex justify-center mb-0.5">{s.icon}</div>
            <p className="font-bold text-sm text-gray-800">{s.value}</p>
            <p className="text-[10px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-5 space-y-3 pb-8">

        {/* Section title */}
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-indigo-500" />
          <span className="font-bold text-gray-700 text-sm">Lessons</span>
        </div>

        {/* Lesson accordions */}
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

        {/* Quiz section */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-violet-500" />
            <span className="font-bold text-gray-700 text-sm">Knowledge Check</span>
          </div>

          <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${allLessonsComplete ? "border-gray-100" : "border-gray-100 opacity-70"}`}>
            {!allLessonsComplete && !showQuiz && (
              <div className="p-4 flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <p className="text-sm text-gray-400">Complete all lessons to unlock the quiz</p>
              </div>
            )}

            {allLessonsComplete && !showQuiz && quizScore === null && (
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Day 1 Quiz</p>
                    <p className="text-xs text-gray-400">3 questions · 5 min</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">Test your knowledge of social engineering concepts and red flags you just learned.</p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white py-3 rounded-full font-semibold text-sm hover:shadow-md transition-shadow"
                >
                  Start Quiz →
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
                  {quizScore === 3 ? "Perfect Score!" : quizScore >= 2 ? "Good Job!" : "Keep Learning!"}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  You got <strong>{quizScore}/{QUIZ_QUESTIONS.length}</strong> correct
                </p>

                {quizScore === QUIZ_QUESTIONS.length && (
                  <div className="bg-emerald-50 rounded-xl px-4 py-3 mb-4">
                    <p className="text-emerald-700 text-sm font-semibold">+150 XP earned!</p>
                    <p className="text-emerald-600 text-xs mt-0.5">Day 1 badge unlocked 🎖</p>
                  </div>
                )}

                <div className="space-y-2">
                  <button
                    onClick={() => { setShowQuiz(false); setQuizScore(null); }}
                    className="w-full bg-indigo-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-indigo-600 transition-colors"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={onBack}
                    className="w-full border border-gray-200 text-gray-600 py-3 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Continue to Day 2
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
