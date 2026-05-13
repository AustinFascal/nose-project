import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
  Smile,
  Paperclip,
  Mic,
  // Paperclip,
  // Mic,
  Check,
  CheckCheck,
} from "lucide-react";

interface Message {
  id: number;
  sender: "them" | "me";
  text: string;
  time: string;
  read?: boolean;
}

export const SCAM_MESSAGES: Message[] = [
  {
    id: 1,
    sender: "them",
    text: "Hello! I'm Rachel from TalentLink HR Solutions 👋 Are you looking for a part-time income opportunity?",
    time: "10:02 AM",
  },
  {
    id: 2,
    sender: "me",
    text: "Hi, what kind of job is it?",
    time: "10:05 AM",
    read: true,
  },
  {
    id: 3,
    sender: "them",
    text: "It's a simple online task — you help boost product ratings on Shopee & Lazada. Just 1-2 hours per day, earn up to RM800/day! 💰",
    time: "10:06 AM",
  },
  {
    id: 4,
    sender: "them",
    text: "We are currently recruiting for our ASEAN expansion. You will be assigned a supervisor who guides you through every task. No experience needed!",
    time: "10:06 AM",
  },
  {
    id: 5,
    sender: "me",
    text: "That sounds interesting. How do I get started?",
    time: "10:09 AM",
    read: true,
  },
  {
    id: 6,
    sender: "them",
    text: "Great! First, you register on our platform with a small activation fee of RM200 to unlock your account and first set of tasks. This is fully refundable with your first payout ✅",
    time: "10:10 AM",
  },
  {
    id: 7,
    sender: "them",
    text: "Here is our company website: talentlink-jobs.biz — please register and send me your reference code. You can start earning TODAY! 🔥",
    time: "10:11 AM",
  },
  {
    id: 8,
    sender: "me",
    text: "Wait, why do I need to pay first? Is this legit?",
    time: "10:14 AM",
    read: true,
  },
  {
    id: 9,
    sender: "them",
    text: "Of course it's legit! 😊 Many of our workers already earned RM3,000 last week. The RM200 is just a security deposit to prevent fake accounts. You get it back in your first withdrawal, I promise!",
    time: "10:15 AM",
  },
  {
    id: 10,
    sender: "them",
    text: "⚠️ Offer closes in 1 hour — only 3 slots left for your area! Transfer to: Maybank 1122334455 (RACHEL LIM). Please confirm once done! 🙏",
    time: "10:16 AM",
  },
];

interface WhatsAppChatScreenProps {
  onPanicActivate: () => void;
}

export function WhatsAppChatScreen({ onPanicActivate }: WhatsAppChatScreenProps) {
  const [typedText, setTypedText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-[#ECE5DD] relative overflow-hidden">
      <motion.div
        className="flex flex-col h-full"
      >
        {/* WhatsApp Header */}
        <div
          className="flex items-center gap-3 px-3 py-2 text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #075E54 0%, #128C7E 100%)" }}
        >
          <button className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            RL
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-tight truncate">
              Rachel Lim - TalentLink HR
            </p>
            <p className="text-xs opacity-80">online</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2"><Video className="w-5 h-5" /></button>
            <button className="p-2"><Phone className="w-5 h-5" /></button>
            <button className="p-2"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b2dfdb' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <div className="flex justify-center mb-3">
            <span className="bg-white/80 text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm">
              Today
            </span>
          </div>

          {SCAM_MESSAGES.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.25 }}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} mb-1`}
            >
              <div
                className={`relative max-w-[78%] px-3 pt-2 pb-4 rounded-2xl shadow-sm ${msg.sender === "me"
                    ? "bg-[#DCF8C6] rounded-tr-sm"
                    : "bg-white rounded-tl-sm"
                  }`}
              >
                <p className="text-sm text-gray-800 leading-relaxed">{msg.text}</p>
                <div className="absolute bottom-1 right-2 flex items-center gap-1">
                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                  {msg.sender === "me" && (
                    msg.read
                      ? <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
                      : <Check className="w-3 h-3 text-gray-400" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="flex items-center gap-2 px-2 py-2 flex-shrink-0" style={{ background: "#F0F0F0" }}>
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 gap-2 shadow-sm">
            <Smile className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              placeholder="Message"
              className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
            <Paperclip className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
          <button
            className="w-11 h-11 rounded-full flex items-center justify-center text-white flex-shrink-0"
            style={{ background: "#075E54" }}
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}