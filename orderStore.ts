import { create } from "zustand";
import { CartItem } from "./cartStore";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "delivered";
  createdAt: Date;
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isCheckoutOpen: boolean;
  isOrderPlaced: boolean;
  placeOrder: (items: CartItem[], total: number) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  resetOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  currentOrder: null,
  isCheckoutOpen: false,
  isOrderPlaced: false,

  placeOrder: (items: CartItem[], total: number) => {
    const order: Order = {
      id: "ORD-" + Date.now().toString(36).toUpperCase(),
      items,
      total,
      status: "confirmed",
      createdAt: new Date(),
    };
    set((state) => ({
      orders: [...state.orders, order],
      currentOrder: order,
      isOrderPlaced: true,
      isCheckoutOpen: false,
    }));
  },

  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
  resetOrder: () => set({ currentOrder: null, isOrderPlaced: false }),
}));
