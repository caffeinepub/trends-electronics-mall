import { Loader2, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend.d";
import { useAddToCart, useFeaturedProducts } from "../hooks/useQueries";

const fallbackProducts = [
  {
    id: BigInt(1),
    name: "Trends Pro Max Ultra",
    description: "Next-gen flagship smartphone",
    price: 79999,
    rating: 4.8,
    isFeatured: true,
    isNew: true,
    brand: "Samsung",
    image: undefined,
    category: "Smartphones" as any,
    img: "/assets/generated/product-smartphone.dim_400x400.png",
  },
  {
    id: BigInt(2),
    name: "Trends AirPods Elite",
    description: "Premium wireless earbuds",
    price: 24999,
    rating: 4.9,
    isFeatured: true,
    isNew: false,
    brand: "Apple",
    image: undefined,
    category: "Audio" as any,
    img: "/assets/generated/product-audio.dim_400x400.png",
  },
  {
    id: BigInt(3),
    name: "Trends SmartWatch X",
    description: "Premium fitness & lifestyle watch",
    price: 34999,
    rating: 4.7,
    isFeatured: true,
    isNew: true,
    brand: "Google",
    image: undefined,
    category: "Wearables" as any,
    img: "/assets/generated/product-watch.dim_400x400.png",
  },
  {
    id: BigInt(4),
    name: "Trends ProBook Slim",
    description: "Ultralight power laptop",
    price: 89999,
    rating: 4.8,
    isFeatured: true,
    isNew: false,
    brand: "Asus",
    image: undefined,
    category: "LaptopsTablets" as any,
    img: "/assets/generated/product-laptop.dim_400x400.png",
  },
];

function ProductCard({
  product,
  index,
  onAddToCart,
  isAdding,
}: {
  product: Product | (typeof fallbackProducts)[0];
  index: number;
  onAddToCart: (id: bigint) => void;
  isAdding: boolean;
}) {
  const isCoral = index % 2 !== 0;
  const imgSrc =
    "img" in product && product.img
      ? product.img
      : [
          "/assets/generated/product-smartphone.dim_400x400.png",
          "/assets/generated/product-audio.dim_400x400.png",
          "/assets/generated/product-watch.dim_400x400.png",
          "/assets/generated/product-laptop.dim_400x400.png",
        ][index % 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      data-ocid={`product.item.${index + 1}`}
      className="group rounded-xl overflow-hidden"
      style={{
        background: "oklch(0.16 0.01 220)",
        border: "1px solid oklch(0.25 0.015 220)",
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span
            className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: "oklch(0.78 0.14 192)",
              color: "oklch(0.1 0.01 220)",
            }}
          >
            NEW
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-foreground text-sm mb-1 leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <Star
            className="h-3.5 w-3.5 fill-current"
            style={{ color: "oklch(0.82 0.16 84)" }}
          />
          <span className="text-xs" style={{ color: "oklch(0.82 0.16 84)" }}>
            {typeof product.rating === "number"
              ? product.rating.toFixed(1)
              : "4.8"}
            /5
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            ₹
            {typeof product.price === "number"
              ? product.price.toLocaleString("en-IN")
              : "N/A"}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(product.id)}
            disabled={isAdding}
            data-ocid={`product.add_to_cart.button.${index + 1}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
            style={{
              background: isCoral
                ? "oklch(0.65 0.19 22)"
                : "oklch(0.78 0.14 192)",
              color: "oklch(0.1 0.01 220)",
            }}
          >
            {isAdding ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ShoppingCart className="h-3 w-3" />
            )}
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const { data: products, isLoading } = useFeaturedProducts();
  const addToCart = useAddToCart();

  const displayProducts =
    products && products.length > 0 ? products.slice(0, 4) : fallbackProducts;

  return (
    <section
      id="featured"
      className="py-20"
      style={{ background: "oklch(0.12 0.008 220)" }}
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
            Hand-picked for You
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-wide">
            Featured Premium Selection
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="flex justify-center py-20"
            data-ocid="featured.loading_state"
          >
            <Loader2 className="h-8 w-8 animate-spin text-teal" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product as Product}
                index={i}
                onAddToCart={(id) => addToCart.mutate(id)}
                isAdding={addToCart.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
