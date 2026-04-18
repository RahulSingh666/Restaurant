import { create } from "zustand";
import { MenuItem } from "../data/menu";

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isCartOpen: false,

  addItem: (item: MenuItem) => {
    set((state) => {
      const existing = state.items.find((i) => i.item.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.item.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { item, quantity: 1 }] };
    });
  },

  removeItem: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.item.id !== itemId),
    }));
  },

  updateQuantity: (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      set((state) => ({
        items: state.items.filter((i) => i.item.id !== itemId),
      }));
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.item.id === itemId ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  getTotalItems: () => {
    return get().items.reduce((total, i) => total + i.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, i) => total + i.item.price * i.quantity,
      0
    );
  },
}));
