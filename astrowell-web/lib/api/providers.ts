import { mockFetch } from "@/lib/mocks";
import { providersMock, type Provider } from "@/lib/mocks/providers.mock";

/** Fetch all providers (optionally filtered by category) */
export async function getProviders(category?: Provider["category"]): Promise<Provider[]> {
  const data = category
    ? providersMock.filter((p) => p.category === category)
    : providersMock;
  return mockFetch(data);
}

/** Fetch a single provider by ID */
export async function getProviderById(id: string): Promise<Provider | null> {
  const provider = providersMock.find((p) => p.id === id) ?? null;
  return mockFetch(provider);
}

/** Fetch online providers */
export async function getOnlineProviders(): Promise<Provider[]> {
  return mockFetch(providersMock.filter((p) => p.isOnline));
}
