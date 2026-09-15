"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

function BoxIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
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

  function clearFilters() {
    setSearch("");
    setCategory("all");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-40 -top-48 h-[30rem] w-[30rem] rounded-full bg-slate-700/35 blur-3xl" />
        <div className="absolute -bottom-72 right-[-8rem] h-[38rem] w-[38rem] rounded-full bg-slate-700/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pb-28 sm:pt-12 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 backdrop-blur-md">
              <SparkleIcon /> Curated catalogue
            </span>
            <span className="hidden items-center gap-2 text-xs font-semibold text-slate-400 sm:flex">
              <span className="h-2 w-2 rounded-full bg-white" /> Live catalogue
            </span>
          </motion.div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">Discover something worth keeping</p>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.4rem] xl:leading-[0.96]">Product Explorer</h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                A focused product catalogue designed for fast discovery — search by title, filter by category, and open any product for the full story.
              </p>
            </motion.div>

            {!loading && !error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.18 }} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 shadow-2xl shadow-black/10 backdrop-blur-xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950"><BoxIcon /></span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Catalogue</p>
                  <p className="mt-0.5 text-lg font-black tracking-tight">{products.length} products</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <div className="relative mx-auto -mt-10 max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!loading && !error && (
            <motion.div key="filters" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
              <Filters
                search={search}
                category={category}
                categories={categories}
                onSearchChange={setSearch}
                onCategoryChange={setCategory}
                resultCount={visibleProducts.length}
                totalCount={products.length}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading products">
            {Array.from({ length: 6 }, (_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.06 }}
                className="h-[470px] rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="h-72 animate-pulse rounded-[1.35rem] bg-slate-100 sm:h-80" />
                <div className="mt-6 h-2.5 w-1/4 animate-pulse rounded-full bg-slate-100" />
                <div className="mt-4 h-4 w-4/5 animate-pulse rounded-full bg-slate-100" />
                <div className="mt-3 h-4 w-3/5 animate-pulse rounded-full bg-slate-100" />
                <div className="mt-8 h-8 w-1/3 animate-pulse rounded-full bg-slate-100" />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && error && (
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.75rem] border border-red-200 bg-white p-8 shadow-sm" role="alert">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6"><path d="M12 8v5m0 3h.01M10.3 4.5 2.8 18a2 2 0 0 0 1.75 3h14.9a2 2 0 0 0 1.75-3L13.7 4.5a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
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

        {!loading && !error && (
          <>
            <ProductGrid products={visibleProducts} onSelect={setSelected} />
            {visibleProducts.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <span className="h-px w-12 bg-slate-200" /> End of catalogue <span className="h-px w-12 bg-slate-200" />
              </motion.div>
            )}
          </>
        )}
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="font-black text-slate-800">Product Explorer</p>
            <p className="mt-1">Explore. Filter. Discover.</p>
          </div>
          <p>Next.js · TypeScript · Tailwind CSS · Framer Motion</p>
        </div>
      </footer>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
