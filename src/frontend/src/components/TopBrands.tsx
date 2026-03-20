import { motion } from "motion/react";

const brands = ["Samsung", "Apple", "Sony", "Bose", "Google", "Asus"];

function handleBrandEnter(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.color = "oklch(0.78 0.14 192)";
}
function handleBrandLeave(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.color = "oklch(0.55 0.01 220)";
}

export default function TopBrands() {
  return (
    <section
      className="py-16"
      style={{
        background: "oklch(0.15 0.01 220)",
        borderTop: "1px solid oklch(0.25 0.015 220)",
        borderBottom: "1px solid oklch(0.25 0.015 220)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-teal mb-2">
            Our Partners
          </h2>
          <p className="text-2xl font-bold text-foreground uppercase tracking-widest">
            Top Brands
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.1 }}
              className="text-xl sm:text-2xl font-bold tracking-widest uppercase cursor-pointer"
              style={{
                color: "oklch(0.55 0.01 220)",
                transition: "color 0.2s",
              }}
              onMouseEnter={handleBrandEnter}
              onMouseLeave={handleBrandLeave}
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
