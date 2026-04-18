import { motion } from "framer-motion";
import { Star, Flame } from "lucide-react";
import { menuItems } from "../data/menu";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";
import { useThemeStore } from "../store/themeStore";

export default function FeaturedDishes() {
  const { addItem } = useCartStore();
  const { addToast } = useToastStore();
  const { isDark } = useThemeStore();
  const featured = menuItems.filter((item) => item.isFeatured);

  const handleAdd = (item: typeof featured[0]) => {
    addItem(item);
    addToast(`${item.name} added to cart!`, "success");
  };

  return (
    <section className={`py-16 sm:py-24 ${isDark ? "bg-stone-950" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
              Chef's Picks
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
              isDark ? "text-white" : "text-stone-900"
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Dishes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden ${
                isDark
                  ? "bg-stone-900/80 border border-stone-800/50"
                  : "bg-white border border-stone-200 shadow-lg shadow-stone-200/50"
              } backdrop-blur-sm transition-all duration-300`}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.isBestseller && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/90 text-white text-xs font-bold backdrop-blur-sm">
                      <Flame className="w-3 h-3" /> Bestseller
                    </span>
                  )}
                  {item.isVeg && (
                    <span className="px-2.5 py-1 rounded-full bg-green-500/90 text-white text-xs font-bold backdrop-blur-sm">
                      Veg
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-bold backdrop-blur-sm">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {item.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3
                  className={`text-lg sm:text-xl font-bold mb-1 ${
                    isDark ? "text-white" : "text-stone-900"
                  }`}
                >
                  {item.name}
                </h3>
                <p
                  className={`text-sm mb-4 line-clamp-2 ${
                    isDark ? "text-stone-500" : "text-stone-500"
                  }`}
                >
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAdd(item)}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
