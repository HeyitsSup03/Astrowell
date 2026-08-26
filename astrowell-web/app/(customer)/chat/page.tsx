"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getConversations } from "@/lib/api/chat";
import { formatTime } from "@/lib/utils";
import type { Conversation } from "@/types";
import {
  Archive,
  CheckCircle2,
  Filter,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatListPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "astrologers" | "wellness" | "archives">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getConversations().then((data) => {
      setConversations(data);
      setIsLoading(false);
    });
  }, []);

  const totalUnreadCount = conversations.reduce((acc, curr) => acc + (curr.unreadCount || 0), 0);

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "unread") return (c.unreadCount || 0) > 0;
    if (activeFilter === "astrologers") return c.category?.toLowerCase().includes("astrologer");
    if (activeFilter === "wellness")
      return (
        c.category?.toLowerCase().includes("wellness") ||
        c.category?.toLowerCase().includes("yoga") ||
        c.category?.toLowerCase().includes("dietitian")
      );
    if (activeFilter === "archives") return c.isArchived === true;

    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* ── 1. HEADER ROW (OUTSIDE CARD) ──────────────────────────────────────── */}
      <div className="flex flex-row items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary dark:text-text-primary-dark tracking-tight">
            Messages
          </h1>
          <p className="text-xs md:text-sm text-text-muted dark:text-text-muted-dark mt-1 font-medium">
            Your conversations with astrologers & wellness gurus
          </p>
        </div>

        <Link href="/dashboard">
          <Button
            size="md"
            className="bg-primary hover:bg-primary-dark text-white rounded-2xl px-4 md:px-5 py-2.5 shadow-sm font-semibold gap-2 flex items-center text-xs md:text-sm cursor-pointer transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
            <Plus className="h-3.5 w-3.5 -ml-1" />
            <span>New Chat</span>
          </Button>
        </Link>
      </div>

      {/* ── 2. SEARCH BAR & FILTER ROW (OUTSIDE CARD) ─────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted dark:text-text-muted-dark" />
          <input
            type="text"
            placeholder="Search by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-xs md:text-sm rounded-2xl bg-surface dark:bg-surface-dark border border-black/8 dark:border-white/12 text-text-primary dark:text-text-primary-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-xs transition-all"
          />
        </div>

        <button
          type="button"
          aria-label="Filter conversations"
          className="p-3.5 rounded-2xl bg-surface dark:bg-surface-dark border border-black/8 dark:border-white/12 text-text-primary dark:text-text-primary-dark hover:bg-black/4 dark:hover:bg-white/5 transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* ── 3. FILTER CATEGORY PILLS BAR (OUTSIDE CARD) ───────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "all"
              ? "bg-primary text-white shadow-xs"
              : "bg-surface dark:bg-surface-dark border border-black/8 dark:border-white/12 text-text-primary dark:text-text-primary-dark hover:bg-black/3 dark:hover:bg-white/5"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>All</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("unread")}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "unread"
              ? "bg-primary text-white shadow-xs"
              : "bg-surface dark:bg-surface-dark border border-black/8 dark:border-white/12 text-text-primary dark:text-text-primary-dark hover:bg-black/3 dark:hover:bg-white/5"
          }`}
        >
          <span>Unread</span>
          {totalUnreadCount > 0 && (
            <span
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                activeFilter === "unread"
                  ? "bg-white/20 text-white"
                  : "bg-primary/10 text-primary dark:bg-white/10 dark:text-accent"
              }`}
            >
              {totalUnreadCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("astrologers")}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "astrologers"
              ? "bg-primary text-white shadow-xs"
              : "bg-surface dark:bg-surface-dark border border-black/8 dark:border-white/12 text-text-primary dark:text-text-primary-dark hover:bg-black/3 dark:hover:bg-white/5"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Astrologers</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("wellness")}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "wellness"
              ? "bg-primary text-white shadow-xs"
              : "bg-surface dark:bg-surface-dark border border-black/8 dark:border-white/12 text-text-primary dark:text-text-primary-dark hover:bg-black/3 dark:hover:bg-white/5"
          }`}
        >
          <Users className="h-3.5 w-3.5 text-emerald-500" />
          <span>Wellness</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("archives")}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "archives"
              ? "bg-primary text-white shadow-xs"
              : "bg-surface dark:bg-surface-dark border border-black/8 dark:border-white/12 text-text-primary dark:text-text-primary-dark hover:bg-black/3 dark:hover:bg-white/5"
          }`}
        >
          <Archive className="h-3.5 w-3.5" />
          <span>Archives</span>
        </button>
      </div>

      {/* ── 4. CHAT CARDS MASTER CONTAINER (ALL CHAT THREADS IN ONE CARD) ───── */}
      <Card className="p-3 md:p-5 rounded-3xl bg-surface dark:bg-surface-dark border border-black/8 dark:border-white/12 shadow-xl relative overflow-hidden">
        {isLoading ? (
          <div className="space-y-3 p-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-black/4 dark:bg-white/5 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3 rounded-2xl bg-black/2 dark:bg-white/2 border border-black/5 dark:border-white/8">
            <MessageSquare className="h-10 w-10 text-amber-500/60 mx-auto" />
            <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
              {searchQuery ? "No matching messages" : "No conversations found"}
            </h3>
            <p className="text-xs text-text-muted dark:text-text-muted-dark max-w-xs mx-auto">
              {searchQuery
                ? "Try searching for a different expert name or keyword."
                : "Start a consultation with any astrologer or wellness expert to open a message thread."}
            </p>
            {!searchQuery && (
              <Link href="/dashboard">
                <Button variant="accent" size="sm" className="mt-2 font-semibold">
                  Explore Certified Experts
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-black/6 dark:divide-white/8">
            {filteredConversations.map((conv) => (
              <Link key={conv.id} href={`/chat/${conv.id}`} className="block group">
                <div className="py-4 px-3 md:px-4 rounded-2xl hover:bg-black/3 dark:hover:bg-white/4 flex items-center gap-4 transition-all">
                  {/* Expert Avatar with Online Indicator */}
                  <Avatar
                    src={conv.providerAvatarUrl}
                    name={conv.providerName}
                    size="xl"
                    isOnline={conv.isOnline}
                    className="shrink-0"
                  />

                  {/* Content Block */}
                  <div className="flex-1 min-w-0 space-y-1">
                    {/* Top Line: Name + Verified Icon + Time */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h3 className="font-bold text-sm md:text-base text-text-primary dark:text-text-primary-dark truncate group-hover:text-primary dark:group-hover:text-accent transition-colors">
                          {conv.providerName}
                        </h3>
                        {conv.isVerified && (
                          <CheckCircle2 className="h-4 w-4 text-indigo-600 fill-indigo-600/15 dark:text-accent flex-shrink-0" />
                        )}
                      </div>

                      <span className="text-[11px] text-text-muted dark:text-text-muted-dark font-medium flex-shrink-0">
                        {formatTime(conv.lastMessageAt)}
                      </span>
                    </div>

                    {/* Middle Line: Category Badge + Rating */}
                    <div className="flex items-center gap-2">
                      {conv.category && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                          {conv.category}
                        </span>
                      )}
                      {conv.rating && (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>{conv.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Line: Last Message Snippet */}
                    <p className="text-xs text-text-muted dark:text-text-muted-dark truncate pt-0.5 leading-relaxed font-normal">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {/* Unread Counter Badge */}
                  {conv.unreadCount > 0 && (
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 shadow-xs">
                      {conv.unreadCount}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
