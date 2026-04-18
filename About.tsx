import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import { Flame, Award, Clock } from "lucide-react";

export default function About() {
  const { isDark } = useThemeStore();

  return (
    <section
      id="about"
      className={`py-16 sm:py-24 ${
        isDark
          ? "bg-linear-to-b from-stone-900/50 to-stone-950"
          : "bg-linear-to-b from-stone-50 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-4/3">
              <img
                src="/images/hero-food.jpg"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-linear-to-br from-orange-500 to-amber-600 text-white shadow-2xl shadow-orange-500/30"
            >
              <div className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                15+
              </div>
              <div className="text-xs sm:text-sm opacity-90">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
              Our Story
            </span>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6 ${
                isDark ? "text-white" : "text-stone-900"
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Crafted with
              <br />
              Passion & Love
            </h2>
            <p
              className={`text-base sm:text-lg leading-relaxed mb-8 ${
                isDark ? "text-stone-400" : "text-stone-600"
              }`}
            >
              At Savory, we believe food is more than sustenance — it's an experience.
              Our chefs bring together flavors from around the world, using only the
              freshest ingredients and time-honored techniques.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: <Flame className="w-6 h-6" />,
                  title: "Fresh Daily",
                  desc: "Ingredients sourced every morning",
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "Award Winning",
                  desc: "3 Michelin star chefs",
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "Fast Delivery",
                  desc: "30 min or it's free",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`p-4 rounded-xl ${
                    isDark
                      ? "bg-stone-900/60 border border-stone-800/40"
                      : "bg-white border border-stone-200 shadow-sm"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-3">
                    {item.icon}
                  </div>
                  <h4
                    className={`font-semibold text-sm mb-1 ${
                      isDark ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={`text-xs ${
                      isDark ? "text-stone-500" : "text-stone-400"
                    }`}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
