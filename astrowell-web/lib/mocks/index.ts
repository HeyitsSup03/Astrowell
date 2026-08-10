// ============================================================
// Shared Mock Utilities — single source for mockFetch
// ============================================================

/**
 * Simulates a network fetch with realistic latency.
 * Drop-in replacement for real fetch() — swap the import in lib/api/*.ts
 * to switch from mock data to a real API endpoint.
 */
export async function mockFetch<T>(data: T, delayMs = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}
