import { mockFetch } from "@/lib/mocks";
import {
  conversationsMock,
  chatMessagesMock,
  type Conversation,
  type ChatMessage,
} from "@/lib/mocks/chat.mock";

/** Fetch all conversations for the current user */
export async function getConversations(): Promise<Conversation[]> {
  return mockFetch(conversationsMock);
}

/** Fetch all messages for a specific conversation */
export async function getMessages(conversationId: string): Promise<ChatMessage[]> {
  const messages = chatMessagesMock[conversationId] ?? [];
  return mockFetch(messages);
}
