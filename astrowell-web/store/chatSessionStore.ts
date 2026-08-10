import { create } from "zustand";
import type { ChatMessage, Conversation } from "@/types";

interface ChatSessionState {
  activeConversationId: string | null;
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  isTyping: boolean;

  setActiveConversation: (id: string | null) => void;
  setConversations: (conversations: Conversation[]) => void;
  setMessages: (conversationId: string, messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  setTyping: (typing: boolean) => void;
  markConversationRead: (conversationId: string) => void;
}

export const useChatSessionStore = create<ChatSessionState>((set) => ({
  activeConversationId: null,
  conversations: [],
  messages: {},
  isTyping: false,

  setActiveConversation: (id) => set({ activeConversationId: id }),

  setConversations: (conversations) => set({ conversations }),

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages },
    })),

  addMessage: (message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [message.conversationId]: [
          ...(state.messages[message.conversationId] ?? []),
          message,
        ],
      },
    })),

  setTyping: (isTyping) => set({ isTyping }),

  markConversationRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
    })),
}));
