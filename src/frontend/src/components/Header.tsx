import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../hooks/useQueries";

const navLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "Smartphones", href: "#smartphones" },
  { label: "Gadgets", href: "#gadgets" },
  { label: "Accessories", href: "#accessories" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: cartItems } = useCart();
  const cartCount = cartItems?.length ?? 0;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "oklch(0.12 0.008 220 / 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.25 0.015 220)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center shrink-0"
            data-ocid="header.link"
          >
            <span className="text-2xl font-bold tracking-widest text-foreground font-jakarta uppercase">
              TREND<span className="text-teal">S</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
                className={`text-sm font-medium transition-colors hover:text-teal pb-0.5 ${
                  link.active
                    ? "text-teal border-b-2 border-teal"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className="hidden md:flex items-center gap-2 rounded-full px-3 py-1.5 text-sm"
              style={{
                background: "oklch(0.20 0.012 220)",
                border: "1px solid oklch(0.25 0.015 220)",
              }}
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-24 text-sm"
                data-ocid="header.search_input"
              />
            </div>

            <button
              type="button"
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              data-ocid="header.profile.button"
            >
              <User className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              data-ocid="header.wishlist.button"
            >
              <Heart className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="relative p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              data-ocid="header.cart.button"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-teal text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              data-ocid="header.menu.button"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "oklch(0.14 0.01 220)",
              borderTop: "1px solid oklch(0.25 0.015 220)",
            }}
          >
            <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-1 ${link.active ? "text-teal" : "text-muted-foreground"}`}
                >
                  {link.label}
                </a>
              ))}
              <div
                className="flex items-center gap-2 rounded-full px-3 py-2 mt-2"
                style={{
                  background: "oklch(0.20 0.012 220)",
                  border: "1px solid oklch(0.25 0.015 220)",
                }}
              >
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground flex-1 text-sm"
                  data-ocid="header.mobile.search_input"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
