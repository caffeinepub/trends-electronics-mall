import { Headphones, Laptop, Smartphone, Watch } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    image: "/assets/generated/product-smartphone.dim_400x400.png",
    href: "#smartphones",
  },
  {
    name: "Laptops & Tablets",
    icon: Laptop,
    image: "/assets/generated/product-laptop.dim_400x400.png",
    href: "#laptops",
  },
  {
    name: "Audio",
    icon: Headphones,
    image: "/assets/generated/product-audio.dim_400x400.png",
    href: "#audio",
  },
  {
    name: "Wearables",
    icon: Watch,
    image: "/assets/generated/product-watch.dim_400x400.png",
    href: "#wearables",
  },
];

export default function CategorySpotlight() {
  return (
    <section
      id="categories"
      className="py-20"
      style={{ background: "oklch(0.14 0.009 220)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-teal mb-3">
            Browse By
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-wide">
            Category Spotlight
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href={cat.href}
              data-ocid={`category.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group block rounded-xl overflow-hidden cursor-pointer"
              style={{
                background: "oklch(0.16 0.01 220)",
                border: "1px solid oklch(0.25 0.015 220)",
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, oklch(0.16 0.01 220) 100%)",
                  }}
                />
                {/* Icon badge */}
                <div
                  className="absolute top-3 left-3 p-2 rounded-lg"
                  style={{
                    background: "oklch(0.78 0.14 192 / 0.15)",
                    border: "1px solid oklch(0.78 0.14 192 / 0.3)",
                  }}
                >
                  <cat.icon className="h-4 w-4 text-teal" />
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">
                  {cat.name}
                </h3>
                <span className="text-xs text-teal font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  SHOP NOW <span>→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
