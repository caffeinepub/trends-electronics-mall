import { BadgeCheck, Crown, ShieldCheck, Truck } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Crown,
    title: "Expert Curation",
    description:
      "Every product is hand-selected by Rahul Raja Khakha for quality, innovation, and value.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "End-to-end encrypted transactions and 100% genuine products guaranteed.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description:
      "Pan-India express delivery with real-time tracking on all orders.",
  },
  {
    icon: BadgeCheck,
    title: "Founded by RRK",
    description:
      "Proudly owned and operated by Rahul Raja Khakha — a vision for premium tech retail.",
  },
];

export default function WhyShopTrends() {
  return (
    <section
      id="about"
      className="py-20"
      style={{ background: "oklch(0.13 0.009 218)" }}
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
            Our Promise
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-wide">
            Why Shop Trends
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl"
              style={{
                background: "oklch(0.16 0.01 220)",
                border: "1px solid oklch(0.25 0.015 220)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "oklch(0.78 0.14 192 / 0.1)",
                  border: "1px solid oklch(0.78 0.14 192 / 0.25)",
                }}
              >
                <feat.icon className="h-5 w-5 text-teal" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
