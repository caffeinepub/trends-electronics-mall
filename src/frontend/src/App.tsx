import { Toaster } from "@/components/ui/sonner";
import CategorySpotlight from "./components/CategorySpotlight";
import ContactSection from "./components/ContactSection";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TopBrands from "./components/TopBrands";
import WhyShopTrends from "./components/WhyShopTrends";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-jakarta">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <HeroSection />
        <CategorySpotlight />
        <FeaturedProducts />
        <TopBrands />
        <WhyShopTrends />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
