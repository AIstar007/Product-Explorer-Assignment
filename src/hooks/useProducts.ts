"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

const CATEGORY_OVERRIDES: Record<string, string> = {
  "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "accessories",
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;

  const product = value as Record<string, unknown>;
  const rating = product.rating;

  return (
    typeof product.id === "number" &&
    typeof product.title === "string" &&
    typeof product.price === "number" &&
    typeof product.category === "string" &&
    typeof product.description === "string" &&
    typeof product.image === "string" &&
    typeof rating === "object" &&
    rating !== null &&
    typeof (rating as Record<string, unknown>).rate === "number" &&
    typeof (rating as Record<string, unknown>).count === "number"
  );
}

function isProductList(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct);
}

function normalizeProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    category: CATEGORY_OVERRIDES[product.title] ?? product.category,
  }));
}

// Fetches and validates the product catalogue from the public API.
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(PRODUCTS_URL);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data: unknown = await res.json();
        if (!isProductList(data)) {
          throw new Error("Unexpected product data received from the API.");
        }

        if (!cancelled) {
          setProducts(normalizeProducts(data));
        }
      } catch {
        if (!cancelled) {
          setError("Something went wrong while loading products. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
