import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Truck, Clock, CheckCircle2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import { useOrderStore } from "../store/orderStore";
import { useToastStore } from "../store/toastStore";
import { useState } from "react";

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isDark } = useThemeStore();
  const { isCheckoutOpen, closeCheckout, placeOrder, isOrderPlaced, currentOrder, resetOrder } =
    useOrderStore();
  const { addToast } = useToastStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const total = getTotalPrice();

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    placeOrder(items, total);
    clearCart();
    addToast("Order placed successfully! 🎉", "success");
    setIsProcessing(false);
  };

  const handleClose = () => {
    if (isOrderPlaced) {
      resetOrder();
    }
    closeCheckout();
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />

          {/* Checkout Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-[90] ${
              isDark
                ? "bg-stone-950 border border-stone-800/50"
                : "bg-white border border-stone-200"
            } rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 sm:p-6 border-b ${
                isDark ? "border-stone-800/50" : "border-stone-200"
              }`}
            >
              <h2
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {isOrderPlaced ? "Order Confirmed!" : "Checkout"}
              </h2>
              <button
                onClick={handleClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "text-stone-400 hover:bg-stone-800"
                    : "text-stone-500 hover:bg-stone-100"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {isOrderPlaced && currentOrder ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-stone-900"
                    }`}
                  >
                    Thank You!
                  </h3>
                  <p
                    className={`text-sm mb-6 ${
                      isDark ? "text-stone-400" : "text-stone-500"
                    }`}
                  >
                    Your order has been confirmed
                  </p>
                  <div
                    className={`p-4 rounded-xl ${
                      isDark
                        ? "bg-stone-900/60 border border-stone-800/40"
                        : "bg-stone-50 border border-stone-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-medium ${
                          isDark ? "text-stone-500" : "text-stone-400"
                        }`}
                      >
                        Order ID
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          isDark ? "text-orange-400" : "text-orange-600"
                        }`}
                      >
                        {currentOrder.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-medium ${
                          isDark ? "text-stone-500" : "text-stone-400"
                        }`}
                      >
                        Total
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          isDark ? "text-white" : "text-stone-900"
                        }`}
                      >
                        ${currentOrder.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-medium ${
                          isDark ? "text-stone-500" : "text-stone-400"
                        }`}
                      >
                        Status
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-green-500">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirmed
                      </span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div
                    className={`mt-4 p-4 rounded-xl ${
                      isDark
                        ? "bg-stone-900/60 border border-stone-800/40"
                        : "bg-stone-50 border border-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-orange-500" />
                      <div className="text-left">
                        <p
                          className={`text-sm font-semibold ${
                            isDark ? "text-white" : "text-stone-900"
                          }`}
                        >
                          Estimated Delivery
                        </p>
                        <p
                          className={`text-xs ${
                            isDark ? "text-stone-500" : "text-stone-400"
                          }`}
                        >
                          30-45 minutes
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Order Summary */}
                  <div className="mb-6">
                    <h3
                      className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
                        isDark ? "text-stone-500" : "text-stone-400"
                      }`}
                    >
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      {items.map((cartItem) => (
                        <div
                          key={cartItem.item.id}
                          className={`flex items-center justify-between py-2 ${
                            isDark ? "text-stone-300" : "text-stone-700"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded ${
                                isDark ? "bg-stone-800" : "bg-stone-100"
                              }`}
                            >
                              {cartItem.quantity}x
                            </span>
                            <span className="text-sm">{cartItem.item.name}</span>
                          </div>
                          <span className="text-sm font-semibold">
                            ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div
                    className={`p-4 rounded-xl mb-6 ${
                      isDark
                        ? "bg-stone-900/60 border border-stone-800/40"
                        : "bg-stone-50 border border-stone-200"
                    }`}
                  >
                    <div
                      className={`flex justify-between text-sm mb-2 ${
                        isDark ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div
                      className={`flex justify-between text-sm mb-2 ${
                        isDark ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      <span>Delivery</span>
                      <span className="text-green-500">Free</span>
                    </div>
                    <div
                      className={`flex justify-between text-lg font-bold pt-2 border-t ${
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

                  {/* Delivery Info */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-6">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-semibold text-orange-500">
                        Estimated delivery: 30-45 min
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-stone-500" : "text-stone-400"
                        }`}
                      >
                        Free delivery on your first order!
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {!isOrderPlaced && (
              <div
                className={`p-4 sm:p-6 border-t ${
                  isDark ? "border-stone-800/50" : "border-stone-200"
                }`}
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-base shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Place Order — ${total.toFixed(2)}
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
