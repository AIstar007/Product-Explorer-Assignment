"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { Filters } from "@/components/Filters";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/types/product";

function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="m12 3 1.3 5.7L19 10l-5.7 1.3L12 17l-1.3-5.7L5 10l5.7-1.3L12 3Zm6 12 .65 2.35L21 18l-2.35.65L18 21l-.65-2.35L15 18l2.35-.65L18 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ProductCount({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/10 px-4 py-3 text-white shadow-xl shadow-slate-950/10 backdrop-blur-md">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="m4 7.5 8 4.5 8-4.5M12 12v9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">Catalogue</p>
        <p className="text-lg font-black tracking-tight">{count} products</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return ["all", ...Array.from(unique).sort()];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-slate-700/40 blur-3xl" />
        <div className="absolute -bottom-56 right-0 h-[32rem] w-[32rem] rounded-full bg-slate-700/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200 backdrop-blur">
                <SparkleIcon /> Curated catalogue
              </span>
              <h1 className="mt-5 text-5xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">Product Explorer</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Search, filter, and discover products through a focused catalogue experience built for fast exploration.
              </p>
            </motion.div>

            {!loading && !error && <ProductCount count={products.length} />}
          </div>
        </div>
      </section>

      <div className="relative mx-auto -mt-9 max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        {!loading && !error && (
          <Filters
            search={search}
            category={category}
            categories={categories}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            resultCount={visibleProducts.length}
            totalCount={products.length}
          />
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading products">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="h-[430px] animate-pulse rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="h-64 rounded-2xl bg-slate-100" />
                <div className="mt-6 h-3 w-1/4 rounded-full bg-slate-100" />
                <div className="mt-4 h-4 w-4/5 rounded-full bg-slate-100" />
                <div className="mt-3 h-4 w-3/5 rounded-full bg-slate-100" />
                <div className="mt-8 h-8 w-1/3 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.5rem] border border-red-200 bg-white p-7 shadow-sm" role="alert">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                    <path d="M12 8v5m0 3h.01M10.3 4.5 2.8 18a2 2 0 0 0 1.75 3h14.9a2 2 0 0 0 1.75-3L13.7 4.5a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-black text-slate-950">Unable to load products</h2>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">{error}</p>
                </div>
              </div>
              <button type="button" onClick={() => window.location.reload()} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200">Try again</button>
            </div>
          </motion.section>
        )}

        {!loading && !error && <ProductGrid products={visibleProducts} onSelect={setSelected} />}
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-semibold text-slate-500">Product Explorer</p>
          <p>Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion</p>
        </div>
      </footer>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
