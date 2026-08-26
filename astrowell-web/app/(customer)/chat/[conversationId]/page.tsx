"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getMessages } from "@/lib/api/chat";
import { getProviderById } from "@/lib/api/providers";
import { mockFetch } from "@/lib/mocks";
import { formatCurrency, formatTime } from "@/lib/utils";
import type { ChatMessage, Provider } from "@/types";
import {
  ArrowLeft,
  Clock,
  Info,
  Phone,
  Send,
  Sparkles,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const autoReplies = [
  "I am analyzing your Rahu placement in the 2nd house. It indicates financial growth through digital & creative mediums.",
  "Your Moon is in Scorpio, which gives deep intuition. Perform Om Namah Shivaya chanting on Mondays for mental peace.",
  "According to your Navamsa chart, the upcoming Jupiter Mahadasha starting next month will be highly favorable for your career.",
  "Do follow the gemstone recommendation (Blue Sapphire / Neelam) after verifying your birth chart details.",
];

export default function ChatSessionPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = (params.conversationId as string) || "conv-001";

  const [provider, setProvider] = useState<Provider | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(245); // 4 min 5 sec elapsed
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages(conversationId).then(setMessages);
    getProviderById("prov-001").then(setProvider);
  }, [conversationId]);

  // Session timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const textToSend = inputText.trim();
    setInputText("");

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: "user-001",
      senderName: "Arjun Mehta",
      senderAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Arjun",
      text: textToSend,
      sentAt: new Date().toISOString(),
      readAt: null,
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulate provider typing and auto reply
    setIsTyping(true);
    await mockFetch(null, 1200);

    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    const replyMsg: ChatMessage = {
      id: `msg-reply-${Date.now()}`,
      conversationId,
      senderId: provider?.id || "prov-001",
      senderName: provider?.name || "Pandit Raghavendra Joshi",
      senderAvatarUrl: provider?.avatarUrl || "https://api.dicebear.com/7.x/personas/svg?seed=Raghavendra",
      text: randomReply,
      sentAt: new Date().toISOString(),
      readAt: new Date().toISOString(),
      isOwn: false,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, replyMsg]);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto border border-black/5 dark:border-white/8 rounded-2xl overflow-hidden bg-background dark:bg-background-dark shadow-sm">
      {/* ── Top Header Bar ────────────────────────────────────────── */}
      <header className="p-2.5 sm:p-4 bg-surface dark:bg-surface-dark border-b border-black/5 dark:border-white/8 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        {/* Left Provider Info Section */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <button
            onClick={() => router.back()}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-text-muted dark:text-text-muted-dark shrink-0 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <Avatar
            src={provider?.avatarUrl}
            name={provider?.name || "Pandit Raghavendra Joshi"}
            size="md"
            isOnline
            className="shrink-0"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h2 className="font-bold text-xs sm:text-sm text-text-primary dark:text-text-primary-dark truncate">
                {provider?.name || "Pandit Raghavendra Joshi"}
              </h2>
              <Badge variant="success" dot className="text-[10px] px-2 py-0.5 whitespace-nowrap shrink-0 hidden xs:inline-flex">
                Live Session
              </Badge>
            </div>
            <p className="text-[10px] sm:text-[11px] text-text-muted dark:text-text-muted-dark truncate">
              {provider?.category === "astrologer" ? "Vedic Astrologer" : "Wellness Guru"} • Rate: {formatCurrency(provider?.ratePerMin || 30)}/min
            </p>
          </div>
        </div>

        {/* Live Session Timer & End Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-xs whitespace-nowrap">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatTimer(sessionSeconds)}</span>
          </div>

          <Link href="/appointments" className="shrink-0">
            <Button size="sm" variant="danger" className="text-xs px-2.5 sm:px-3.5 py-1.5 whitespace-nowrap font-semibold cursor-pointer shrink-0">
              End Session
            </Button>
          </Link>
        </div>
      </header>

      {/* ── Live Billing Banner ───────────────────────────────────── */}
      <div className="bg-primary/5 dark:bg-primary-light/10 px-4 py-1.5 border-b border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-text-muted dark:text-text-muted-dark">
        <span className="flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-accent" /> Per-minute billing active. Min wallet balance locked.
        </span>
        <span className="font-semibold text-primary dark:text-primary-light">
          Timer: {formatTimer(sessionSeconds)}
        </span>
      </div>

      {/* ── Messages Scroll Area ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isOwn ? "items-end" : "items-start"}`}
          >
            <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%]">
              {!msg.isOwn && (
                <Avatar src={msg.senderAvatarUrl} name={msg.senderName} size="xs" />
              )}

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.isOwn
                    ? "bg-primary text-white dark:bg-primary-light rounded-br-none"
                    : "bg-surface dark:bg-surface-dark border border-black/5 dark:border-white/8 text-text-primary dark:text-text-primary-dark rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>

            <span className="text-[10px] text-text-muted dark:text-text-muted-dark mt-1 px-1">
              {formatTime(msg.sentAt)}
            </span>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-text-muted dark:text-text-muted-dark animate-pulse">
            <Avatar src={provider?.avatarUrl} name={provider?.name || "Expert"} size="xs" />
            <span className="bg-surface dark:bg-surface-dark border border-black/5 dark:border-white/8 px-3 py-2 rounded-2xl italic">
              {provider?.name || "Expert"} is typing response...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Sticky Input Bar ──────────────────────────────────────── */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-surface dark:bg-surface-dark border-t border-black/5 dark:border-white/8 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask your query (e.g. Dasha, Kundli, Career, Remedies)..."
          className="flex-1 bg-black/4 dark:bg-white/5 border border-black/8 dark:border-white/8 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-text-primary dark:text-text-primary-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark focus:outline-none focus:border-primary"
        />

        <Button
          type="submit"
          variant="accent"
          size="md"
          disabled={!inputText.trim()}
          className="px-4 py-2.5 rounded-xl font-semibold"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
