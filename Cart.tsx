import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import { useOrderStore } from "../store/orderStore";

export default function Cart() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();
  const { isDark } = useThemeStore();
  const { openCheckout } = useOrderStore();
  const total = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    closeCart();
    openCheckout();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[420px] ${
              isDark
                ? "bg-stone-950 border-l border-stone-800/50"
                : "bg-white border-l border-stone-200"
            } shadow-2xl flex flex-col`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 sm:p-6 border-b ${
                isDark ? "border-stone-800/50" : "border-stone-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2
                    className={`text-lg font-bold ${
                      isDark ? "text-white" : "text-stone-900"
                    }`}
                  >
                    Your Cart
                  </h2>
                  <p
                    className={`text-xs ${
                      isDark ? "text-stone-500" : "text-stone-400"
                    }`}
                  >
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? "text-stone-500 hover:text-red-400 hover:bg-red-400/10"
                        : "text-stone-400 hover:text-red-500 hover:bg-red-50"
                    }`}
                    title="Clear cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark
                      ? "text-stone-400 hover:bg-stone-800"
                      : "text-stone-500 hover:bg-stone-100"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🛒</div>
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      isDark ? "text-white" : "text-stone-900"
                    }`}
                  >
                    Cart is empty
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-stone-500" : "text-stone-400"
                    }`}
                  >
                    Add some delicious dishes!
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((cartItem) => (
                    <motion.div
                      key={cartItem.item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className={`flex gap-3 p-3 rounded-xl ${
                        isDark
                          ? "bg-stone-900/60 border border-stone-800/40"
                          : "bg-stone-50 border border-stone-200"
                      }`}
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-semibold text-sm truncate ${
                            isDark ? "text-white" : "text-stone-900"
                          }`}
                        >
                          {cartItem.item.name}
                        </h4>
                        <p
                          className={`text-xs mt-0.5 ${
                            isDark ? "text-stone-500" : "text-stone-400"
                          }`}
                        >
                          ${cartItem.item.price.toFixed(2)} each
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  cartItem.item.id,
                                  cartItem.quantity - 1
                                )
                              }
                              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                                isDark
                                  ? "bg-stone-800 text-stone-400 hover:bg-stone-700"
                                  : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                              }`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span
                              className={`text-sm font-semibold min-w-[20px] text-center ${
                                isDark ? "text-white" : "text-stone-900"
                              }`}
                            >
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                              className="w-6 h-6 rounded-md bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span
                            className={`text-sm font-bold ${
                              isDark ? "text-orange-400" : "text-orange-600"
                            }`}
                          >
                            ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(cartItem.item.id)}
                        className={`self-start p-1 rounded transition-colors ${
                          isDark
                            ? "text-stone-600 hover:text-red-400"
                            : "text-stone-300 hover:text-red-500"
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className={`p-4 sm:p-6 border-t ${
                  isDark ? "border-stone-800/50" : "border-stone-200"
                }`}
              >
                {/* Summary */}
                <div className="space-y-2 mb-4">
                  <div
                    className={`flex justify-between text-sm ${
                      isDark ? "text-stone-400" : "text-stone-500"
                    }`}
                  >
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div
                    className={`flex justify-between text-sm ${
                      isDark ? "text-stone-400" : "text-stone-500"
                    }`}
                  >
                    <span>Delivery</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div
                    className={`flex justify-between text-base font-bold pt-2 border-t ${
                      isDark
                        ? "text-white border-stone-800"
                        : "text-stone-900 border-stone-200"
                    }`}
                  >
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleCheckout}
                  className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-base shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow"
                >
                  Proceed to Checkout — ${total.toFixed(2)}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
