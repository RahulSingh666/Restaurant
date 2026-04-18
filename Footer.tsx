import { motion } from "framer-motion";
import { UtensilsCrossed, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

export default function Footer() {
  const { isDark } = useThemeStore();

  return (
    <footer
      id="contact"
      className={`py-16 sm:py-20 ${
        isDark
          ? "bg-stone-950 border-t border-stone-800/50"
          : "bg-stone-50 border-t border-stone-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-stone-900"
                  }`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Savory
                </h3>
                <p
                  className={`text-xs -mt-0.5 tracking-widest uppercase ${
                    isDark ? "text-stone-600" : "text-stone-400"
                  }`}
                >
                  Kitchen & Bar
                </p>
              </div>
            </div>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-stone-500" : "text-stone-500"
              }`}
            >
              From the bustling streets of Asia to the trattorias of Italy — every
              dish is a journey. Experience world-class dining delivered to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Menu", "About", "Contact", "Careers"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={`text-sm transition-colors hover:text-orange-500 ${
                      isDark ? "text-stone-500" : "text-stone-500"
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span
                  className={`text-sm ${
                    isDark ? "text-stone-500" : "text-stone-500"
                  }`}
                >
                  123 Flavor Street, NYC
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span
                  className={`text-sm ${
                    isDark ? "text-stone-500" : "text-stone-500"
                  }`}
                >
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span
                  className={`text-sm ${
                    isDark ? "text-stone-500" : "text-stone-500"
                  }`}
                >
                  hello@savory.kitchen
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isDark
                      ? "bg-stone-900 text-stone-400 hover:bg-orange-500/10 hover:text-orange-500 border border-stone-800/50"
                      : "bg-white text-stone-500 hover:bg-orange-50 hover:text-orange-500 border border-stone-200"
                  }`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="mt-6">
              <h5
                className={`text-sm font-semibold mb-2 ${
                  isDark ? "text-stone-300" : "text-stone-700"
                }`}
              >
                Hours
              </h5>
              <p
                className={`text-sm ${
                  isDark ? "text-stone-500" : "text-stone-500"
                }`}
              >
                Mon - Fri: 11am - 11pm
                <br />
                Sat - Sun: 10am - 12am
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 ${
            isDark ? "border-stone-800/50" : "border-stone-200"
          }`}
        >
          <p
            className={`text-sm ${
              isDark ? "text-stone-600" : "text-stone-400"
            }`}
          >
            © 2025 Savory Kitchen & Bar. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className={`text-sm transition-colors hover:text-orange-500 ${
                  isDark ? "text-stone-600" : "text-stone-400"
                }`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
