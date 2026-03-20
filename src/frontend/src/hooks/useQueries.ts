import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Category, type Product } from "../backend.d";
import { useActor } from "./useActor";

export { Category };

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["allProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: Category) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["productsByCategory", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCart() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.addToCart(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart!", {
        description: "Item has been added to your cart.",
        style: {
          background: "oklch(0.16 0.01 220)",
          color: "oklch(0.95 0.005 220)",
          border: "1px solid oklch(0.78 0.14 192)",
        },
      });
    },
    onError: () => {
      toast.error("Failed to add to cart");
    },
  });
}

export function useRemoveFromCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.removeFromCart(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Removed from cart");
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(input);
    },
    onSuccess: () => {
      toast.success("Message sent!", {
        description: "Rahul Raja Khakha will get back to you soon.",
      });
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });
}
