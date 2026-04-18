import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

export default function Hero() {
  const { isDark } = useThemeStore();

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-food.jpg"
          alt="Gourmet food"
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-linear-to-r from-stone-950 via-stone-950/90 to-stone-950/60"
              : "bg-linear-to-r from-white via-white/90 to-white/60"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-linear-to-t from-stone-950 via-transparent to-transparent"
              : "bg-linear-to-t from-white via-transparent to-transparent"
          }`}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/8 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">
                #1 Rated Restaurant in Town
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 ${
              isDark ? "text-white" : "text-stone-900"
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Flavors That
            <br />
            <span className="bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              Tell Stories
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-lg ${
              isDark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            From the bustling streets of Asia to the trattorias of Italy — every
            dish is a journey. Order now and taste the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-linear-to-r from-orange-500 to-amber-600 text-white font-semibold text-lg shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-300"
            >
              Explore Menu
              <ChevronDown className="w-5 h-5" />
            </a>
            <a
              href="#about"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border-2 transition-all duration-300 hover:scale-[1.02] ${
                isDark
                  ? "border-stone-700 text-stone-300 hover:border-orange-500/50 hover:text-orange-500"
                  : "border-stone-300 text-stone-700 hover:border-orange-500/50 hover:text-orange-500"
              }`}
            >
              Our Story
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex gap-8 sm:gap-12 mt-12 pt-8 border-t border-stone-800/50"
          >
            {[
              { value: "4.9", label: "Rating" },
              { value: "2K+", label: "Reviews" },
              { value: "50+", label: "Dishes" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-xs sm:text-sm ${
                    isDark ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2 ${
            isDark ? "border-stone-700" : "border-stone-300"
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
