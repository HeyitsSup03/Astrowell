import { MOCK_PRODUCTS, Product } from "@/lib/mocks/shop.mock";

export async function fetchProducts(category?: string, query?: string): Promise<Product[]> {
  await new Promise((res) => setTimeout(res, 200));

  let filtered = [...MOCK_PRODUCTS];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (query && query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.benefits.some((b) => b.toLowerCase().includes(q))
    );
  }

  return filtered;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await new Promise((res) => setTimeout(res, 150));
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}
