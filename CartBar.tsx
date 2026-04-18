import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";

export default function CartBar() {
  const { getTotalItems, getTotalPrice, openCart } = useCartStore();
  const { isDark } = useThemeStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-50"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={openCart}
        className={`w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 sm:gap-4 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow`}
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>
        <span className="text-lg">${totalPrice.toFixed(2)}</span>
      </motion.button>
    </motion.div>
  );
}
