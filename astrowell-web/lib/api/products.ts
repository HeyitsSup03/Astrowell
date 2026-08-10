import { mockFetch } from "@/lib/mocks";
import { productsMock, type Product } from "@/lib/mocks/products.mock";

/** Fetch all products */
export async function getProducts(category?: Product["category"]): Promise<Product[]> {
  const data = category
    ? productsMock.filter((p) => p.category === category)
    : productsMock;
  return mockFetch(data);
}

/** Fetch a single product by ID */
export async function getProductById(id: string): Promise<Product | null> {
  return mockFetch(productsMock.find((p) => p.id === id) ?? null);
}

/** Fetch bestseller products */
export async function getBestsellers(): Promise<Product[]> {
  return mockFetch(productsMock.filter((p) => p.isBestseller));
}
