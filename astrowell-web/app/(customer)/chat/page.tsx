"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getConversations } from "@/lib/api/chat";
import { formatTime } from "@/lib/utils";
import type { Conversation } from "@/types";
import { MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatListPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getConversations().then((data) => {
      setConversations(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Consultation Messages
          </h1>
          <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
            Active chat threads with your astrologers and wellness gurus.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-black/5 dark:bg-white/5 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : conversations.length === 0 ? (
        <Card className="text-center py-12 px-4 space-y-3">
          <MessageSquare className="h-12 w-12 text-text-muted dark:text-text-muted-dark mx-auto" />
          <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
            No active conversations
          </h3>
          <p className="text-xs text-text-muted dark:text-text-muted-dark">
            Start a consultation from any expert's profile to open a chat thread.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {conversations.map((conv) => (
            <Link key={conv.id} href={`/chat/${conv.id}`}>
              <Card hoverable className="p-4 flex items-center gap-4 transition-all">
                <Avatar
                  src={conv.providerAvatarUrl}
                  name={conv.providerName}
                  size="lg"
                  isOnline
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-text-primary dark:text-text-primary-dark truncate">
                      {conv.providerName}
                    </h3>
                    <span className="text-[11px] text-text-muted dark:text-text-muted-dark flex-shrink-0">
                      {formatTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark truncate mt-1">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unreadCount > 0 && (
                  <Badge variant="accent" className="rounded-full px-2 py-0.5 text-xs font-bold">
                    {conv.unreadCount}
                  </Badge>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
