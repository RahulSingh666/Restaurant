import { motion } from "framer-motion";
import { Plus, Minus, Star, Flame, Leaf } from "lucide-react";
import { MenuItem } from "../data/menu";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";
import { useThemeStore } from "../store/themeStore";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const { addToast } = useToastStore();
  const { isDark } = useThemeStore();

  const cartItem = items.find((i) => i.item.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem(item);
    addToast(`${item.name} added to cart!`, "success");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className={`group flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl transition-all duration-300 ${
        isDark
          ? "bg-stone-900/60 border border-stone-800/40 hover:border-orange-500/30 hover:bg-stone-900/80"
          : "bg-white border border-stone-200 hover:border-orange-300 hover:shadow-lg"
      }`}
    >
      {/* Image */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

        {/* Veg/Non-veg indicator */}
        <div className="absolute bottom-1.5 left-1.5">
          {item.isVeg ? (
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-green-500 rounded flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            </div>
          ) : (
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-red-500 rounded flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start gap-2 mb-1">
            <h3
              className={`font-bold text-sm sm:text-base leading-tight ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              {item.name}
            </h3>
            {item.isBestseller && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[10px] font-bold whitespace-nowrap">
                <Flame className="w-2.5 h-2.5" />
                Best
              </span>
            )}
          </div>
          <p
            className={`text-xs sm:text-sm line-clamp-2 mb-2 ${
              isDark ? "text-stone-500" : "text-stone-400"
            }`}
          >
            {item.description}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span
                className={`text-xs font-semibold ${
                  isDark ? "text-stone-300" : "text-stone-700"
                }`}
              >
                {item.rating}
              </span>
            </div>
            {item.isVeg && (
              <div className="flex items-center gap-1">
                <Leaf className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500 font-medium">Veg</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <span
            className="text-lg sm:text-xl font-bold bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ${item.price.toFixed(2)}
          </span>

          {quantity === 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-linear-to-r from-orange-500 to-amber-600 text-white text-xs sm:text-sm font-semibold shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 bg-linear-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center hover:bg-orange-500/30 transition-colors"
              >
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </motion.button>
              <span className="text-sm sm:text-base font-bold text-orange-500 min-w-4 text-center">
                {quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  addItem(item);
                  addToast(`Added another ${item.name}!`, "success");
                }}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
