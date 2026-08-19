import { create } from "zustand";
import { CartItem, Product } from "@/lib/mocks/shop.mock";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,

  setIsOpen: (isOpen) => set({ isOpen }),

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { product, quantity: 1 }],
        isOpen: true,
      };
    }),

  updateQuantity: (productId, delta) =>
    set((state) => ({
      items: state.items
        .map((i) => {
          if (i.product.id === productId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[],
    })),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),
}));
