import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { menuItems, categories } from "../data/menu";
import { useThemeStore } from "../store/themeStore";
import MenuCard from "./MenuCard";

export default function MenuSection() {
  const { isDark } = useThemeStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <section
      id="menu"
      className={`py-16 sm:py-24 ${
        isDark
          ? "bg-linear-to-b from-stone-950 via-stone-950 to-stone-900/50"
          : "bg-linear-to-b from-white via-stone-50 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
            Our Menu
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-2 ${
              isDark ? "text-white" : "text-stone-900"
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Would You Like?
          </h2>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                  isDark ? "text-stone-500" : "text-stone-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base outline-none transition-all duration-200 ${
                  isDark
                    ? "bg-stone-900/80 border border-stone-800/50 text-white placeholder-stone-600 focus:border-orange-500/50 focus:bg-stone-900"
                    : "bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:border-orange-300 focus:shadow-md"
                }`}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 ${
                    isDark ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden flex items-center gap-2 px-4 py-3 rounded-xl sm:rounded-2xl text-sm font-medium transition-colors ${
                isDark
                  ? "bg-stone-900/80 border border-stone-800/50 text-stone-300"
                  : "bg-white border border-stone-200 text-stone-700"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Category Filters */}
          <div
            className={`mt-4 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-linear-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25"
                      : isDark
                      ? "bg-stone-900/80 border border-stone-800/50 text-stone-400 hover:border-orange-500/30 hover:text-orange-400"
                      : "bg-white border border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-500"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p
            className={`text-sm ${
              isDark ? "text-stone-500" : "text-stone-400"
            }`}
          >
            {filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"} found
            {search && ` for "${search}"`}
          </p>
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
            >
              {filteredItems.map((item, index) => (
                <MenuCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 sm:py-20"
            >
              <div className="text-5xl sm:text-6xl mb-4">🍽️</div>
              <h3
                className={`text-xl sm:text-2xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                No dishes found
              </h3>
              <p
                className={`text-sm sm:text-base ${
                  isDark ? "text-stone-500" : "text-stone-400"
                }`}
              >
                Try a different search or category
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-4 px-6 py-2 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
