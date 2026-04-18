import { motion } from "framer-motion";
import { ShoppingCart, Moon, Sun, UtensilsCrossed, Menu, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import { useState } from "react";

export default function Navbar() {
  const { getTotalItems, openCart } = useCartStore();
  const { isDark, toggleTheme } = useThemeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDark
          ? "bg-stone-950/80 border-stone-800/50"
          : "bg-white/80 border-stone-200"
      } backdrop-blur-xl border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
              <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1
                className={`text-lg sm:text-xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
               Nam Phuong 
              </h1>
              <p
                className={`text-[10px] sm:text-xs -mt-1 tracking-widest uppercase ${
                  isDark ? "text-stone-500" : "text-stone-400"
                }`}
              >
              Restaurant
              </p>
            </div>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Menu", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  isDark ? "text-stone-400" : "text-stone-600"
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 rounded-xl transition-colors ${
                isDark
                  ? "bg-stone-800/80 text-amber-400 hover:bg-stone-700"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </motion.button>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative p-2 sm:p-2.5 rounded-xl bg-linear-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl ${
                isDark
                  ? "text-stone-400 hover:bg-stone-800"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden border-t ${
            isDark ? "border-stone-800 bg-stone-950/95" : "border-stone-200 bg-white/95"
          } backdrop-blur-xl`}
        >
          <div className="px-4 py-3 space-y-1">
            {["Menu", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? "text-stone-400 hover:text-orange-500 hover:bg-stone-800/50"
                    : "text-stone-600 hover:text-orange-500 hover:bg-stone-50"
                }`}
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
