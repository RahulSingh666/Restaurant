import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedDishes from "./components/FeaturedDishes";
import MenuSection from "./components/MenuSection";
import About from "./components/About";
import Cart from "./components/Cart";
import CartBar from "./components/CartBar";
import Checkout from "./components/Checkout";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

export default function App() {
  const { isDark } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-stone-950" : "bg-white"
      }`}
    >
      <Navbar />
      <main>
        <Hero />
        <FeaturedDishes />
        <MenuSection />
        <About />
      </main>
      <Footer />
      <Cart />
      <CartBar />
      <Checkout />
      <Toast />
    </div>
  );
}
