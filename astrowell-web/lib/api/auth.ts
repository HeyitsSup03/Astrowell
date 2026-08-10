import { mockFetch } from "@/lib/mocks";
import { currentUserMock, type User } from "@/lib/mocks/user.mock";

/** Fetch the currently authenticated user */
export async function getCurrentUser(): Promise<User> {
  return mockFetch(currentUserMock, 200);
}

/** Mock login — always succeeds in mock mode */
export async function login(
  _email: string,
  _password: string
): Promise<{ user: User; token: string }> {
  return mockFetch({ user: currentUserMock, token: "mock-jwt-token-xyz" }, 600);
}

/** Mock register */
export async function register(
  _name: string,
  _email: string,
  _password: string
): Promise<{ user: User; token: string }> {
  return mockFetch({ user: currentUserMock, token: "mock-jwt-token-xyz" }, 800);
}

/** Mock logout */
export async function logout(): Promise<void> {
  return mockFetch(undefined as unknown as void, 200);
}
