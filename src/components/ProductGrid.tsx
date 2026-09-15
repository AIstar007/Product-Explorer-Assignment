"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export function ProductGrid({ products, onSelect }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="mt-7 overflow-hidden rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm"
        aria-live="polite"
      >
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-900/10"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path d="m21 21-4.35-4.35m2.1-5.15a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </motion.div>
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">No match</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Nothing found</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Try a different product name or category. The catalogue has more to explore.
        </p>
      </motion.section>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: Math.min(index * 0.045, 0.24) }}
          >
            <ProductCard product={product} onClick={() => onSelect(product)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
