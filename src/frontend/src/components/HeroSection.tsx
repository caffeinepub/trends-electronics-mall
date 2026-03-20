import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[88vh] flex items-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.10 0.01 220) 0%, oklch(0.13 0.012 215) 50%, oklch(0.11 0.008 220) 100%)",
      }}
    >
      {/* Background decorative rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            border: "1px solid oklch(0.78 0.14 192 / 0.08)",
            left: "-100px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            border: "1px solid oklch(0.78 0.14 192 / 0.12)",
            width: "520px",
            height: "520px",
            left: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            border: "1px solid oklch(0.78 0.14 192 / 0.18)",
            width: "360px",
            height: "360px",
            left: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        {/* Ambient glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            left: "-50px",
            top: "50%",
            transform: "translateY(-50%)",
            background:
              "radial-gradient(circle, oklch(0.78 0.14 192 / 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Phone visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center order-2 lg:order-1"
          >
            {/* Orbital rings */}
            <div
              className="absolute w-[480px] h-[480px] rounded-full animate-spin-slow"
              style={{ border: "1px dashed oklch(0.78 0.14 192 / 0.15)" }}
            />
            <div
              className="absolute w-[380px] h-[380px] rounded-full"
              style={{
                border: "1px solid oklch(0.78 0.14 192 / 0.12)",
                animation: "spin-slow 15s linear infinite reverse",
              }}
            />
            <div
              className="absolute w-[280px] h-[280px] rounded-full"
              style={{ border: "1px solid oklch(0.78 0.14 192 / 0.20)" }}
            />

            {/* Glow behind phone */}
            <div
              className="absolute w-56 h-56 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.78 0.14 192 / 0.2) 0%, transparent 70%)",
              }}
            />

            <motion.img
              src="/assets/generated/hero-phone.dim_600x700.png"
              alt="Premium Smartphone"
              className="relative z-10 w-64 sm:w-72 lg:w-80 drop-shadow-2xl"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* RRK Monogram */}
            <div
              className="absolute bottom-8 right-4 opacity-30 select-none"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "2.5rem",
                color: "oklch(0.78 0.14 192)",
                fontWeight: 700,
              }}
            >
              RRK
            </div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            {/* Brand label */}
            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-teal">
                TRENDS
              </span>
              <ChevronRight className="h-3 w-3 text-teal" />
              <span className="text-xs tracking-widest uppercase text-muted-foreground">
                Premium Electronics
              </span>
            </div>

            {/* Curated by signature */}
            <p className="mb-3 text-muted-foreground text-sm">
              Curated by{" "}
              <span
                className="text-teal"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                }}
              >
                Rahul Raja Khakha
              </span>
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Experience
              <br />
              <span className="text-teal">Innovation.</span>
              <br />
              Elevate Your
              <br />
              Tech Lifestyle.
            </h1>

            <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Discover the finest smartphones, cutting-edge gadgets, and premium
              electronics — hand-picked for the discerning tech enthusiast.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#featured"
                data-ocid="hero.shop.primary_button"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide uppercase transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "oklch(0.78 0.14 192)",
                  color: "oklch(0.1 0.01 220)",
                  boxShadow: "0 0 20px oklch(0.78 0.14 192 / 0.4)",
                }}
              >
                Shop Smartphones
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#categories"
                data-ocid="hero.categories.secondary_button"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide uppercase transition-all hover:bg-muted"
                style={{
                  border: "1px solid oklch(0.78 0.14 192)",
                  color: "oklch(0.78 0.14 192)",
                }}
              >
                Explore Gadgets
              </a>
            </div>

            {/* Carousel indicators */}
            <div className="flex gap-2 mt-10 justify-center lg:justify-start">
              <span className="h-1 w-8 rounded-full bg-teal" />
              <span
                className="h-1 w-4 rounded-full"
                style={{ background: "oklch(0.35 0.015 220)" }}
              />
              <span
                className="h-1 w-4 rounded-full"
                style={{ background: "oklch(0.35 0.015 220)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
