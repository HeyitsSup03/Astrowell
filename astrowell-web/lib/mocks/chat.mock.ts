// ============================================================
// Mock Data: Chat Messages
// ============================================================

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatarUrl: string;
  text: string;
  sentAt: string;
  readAt: string | null;
  isOwn: boolean; // true if sent by current user
}

export interface Conversation {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatarUrl: string;
  customerId: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export const conversationsMock: Conversation[] = [
  {
    id: "conv-001",
    providerId: "prov-001",
    providerName: "Pandit Raghavendra Joshi",
    providerAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Raghavendra",
    customerId: "user-001",
    lastMessage: "Kindly share your birth time once more for the Navamsa chart.",
    lastMessageAt: "2026-08-09T18:45:00+05:30",
    unreadCount: 2,
  },
  {
    id: "conv-002",
    providerId: "prov-002",
    providerName: "Ananya Krishnamurthy",
    providerAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Ananya",
    customerId: "user-001",
    lastMessage: "The compatibility report has been sent to your email.",
    lastMessageAt: "2026-08-08T17:00:00+05:30",
    unreadCount: 0,
  },
  {
    id: "conv-003",
    providerId: "prov-004",
    providerName: "Yogacharya Suresh Iyer",
    providerAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Suresh",
    customerId: "user-001",
    lastMessage: "See you tomorrow at 7 AM for the pranayama session!",
    lastMessageAt: "2026-08-09T21:00:00+05:30",
    unreadCount: 1,
  },
];

export const chatMessagesMock: Record<string, ChatMessage[]> = {
  "conv-001": [
    {
      id: "msg-001",
      conversationId: "conv-001",
      senderId: "user-001",
      senderName: "Arjun Mehta",
      senderAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Arjun",
      text: "Namaste Panditji, I wanted to ask about my upcoming Saturn dasha.",
      sentAt: "2026-08-09T18:30:00+05:30",
      readAt: "2026-08-09T18:32:00+05:30",
      isOwn: true,
    },
    {
      id: "msg-002",
      conversationId: "conv-001",
      senderId: "prov-001",
      senderName: "Pandit Raghavendra Joshi",
      senderAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Raghavendra",
      text: "Namaste! Saturn dasha can bring both challenges and immense growth. Kindly share your birth time once more for the Navamsa chart.",
      sentAt: "2026-08-09T18:45:00+05:30",
      readAt: null,
      isOwn: false,
    },
  ],
  "conv-002": [
    {
      id: "msg-003",
      conversationId: "conv-002",
      senderId: "user-001",
      senderName: "Arjun Mehta",
      senderAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Arjun",
      text: "Thank you for the session today. It was very insightful!",
      sentAt: "2026-08-08T16:50:00+05:30",
      readAt: "2026-08-08T16:55:00+05:30",
      isOwn: true,
    },
    {
      id: "msg-004",
      conversationId: "conv-002",
      senderId: "prov-002",
      senderName: "Ananya Krishnamurthy",
      senderAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Ananya",
      text: "My pleasure! The compatibility report has been sent to your email. Do follow the remedies suggested. Wishing you both happiness 🌟",
      sentAt: "2026-08-08T17:00:00+05:30",
      readAt: "2026-08-08T17:02:00+05:30",
      isOwn: false,
    },
  ],
};
