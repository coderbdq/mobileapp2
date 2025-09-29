// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../app/api/api";

export type Product = {
  id: number;
  name?: string;
  title?: string;
  subtitle?: string | null;
  price?: number;
  price_discount?: number | null;
  image_url?: string | null;
  image?: string | null;
};

export type ProductVM = {
  id: number;
  title: string;
  subtitle: string;
  priceText: string;
  image_url: string | null;
};

export function normalizeProduct(p: Product): ProductVM {
  return {
    id: p.id,
    title: p.title ?? p.name ?? "",
    subtitle: p.subtitle ?? "",
    priceText:
      typeof p.price === "number"
        ? `$ ${p.price}`
        : typeof (p as any).price_cents === "number"
        ? `$ ${((p as any).price_cents / 100).toFixed(2)}`
        : `$ 0`,
    image_url: p.image_url ?? p.image ?? null,
  };
}

// Response có thể là { data: Product[] } hoặc Product[]
type ProductsResponse = { data: Product[] } | Product[];

export function useProducts(limit = 20, search = "") {
  return useQuery<ProductVM[]>({
    queryKey: ["products", limit, search],
    queryFn: async () => {
      const res = await api.get<ProductsResponse>("/product-list", {
        params: { limit, search },
      });
      const payload = res.data;
      const items: Product[] = Array.isArray(payload)
        ? payload
        : payload?.data ?? [];
      return items.map(normalizeProduct);
    },
  });
}
