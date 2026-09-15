"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

function formatCategory(category: string): string {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.92 1.06-6.2L3 9.53l6.22-.9L12 3Z" />
    </svg>
  );
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white text-left shadow-[0_12px_40px_-28px_rgba(15,23,42,0.45)] outline-none transition-[border-color,box-shadow] duration-300 hover:border-slate-300 hover:shadow-[0_25px_60px_-30px_rgba(15,23,42,0.5)] focus-visible:ring-4 focus-visible:ring-slate-200"
      aria-label={`View details for ${product.title}`}
    >
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,1),rgba(241,245,249,0.9)_70%)] p-8">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-slate-200/40 blur-2xl transition duration-500 group-hover:bg-slate-300/50" />
        <span className="absolute left-4 top-4 z-10 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 shadow-sm backdrop-blur">
          {formatCategory(product.category)}
        </span>
        <motion.div layoutId={`product-image-${product.id}`} className="relative z-[1] flex h-full w-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="max-h-48 w-auto max-w-[78%] object-contain drop-shadow-[0_18px_18px_rgba(15,23,42,0.12)] transition duration-500 ease-out group-hover:scale-110"
          />
        </motion.div>
        <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-slate-950 text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Product #{product.id}</p>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
            <StarIcon />
            {product.rating.rate.toFixed(1)}
          </span>
        </div>

        <h2 className="mt-3 line-clamp-2 min-h-[3.5rem] text-[15px] font-bold leading-7 tracking-[-0.01em] text-slate-900">
          {product.title}
        </h2>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-2xl font-black tracking-tight text-slate-950">${product.price.toFixed(2)}</p>
            <p className="mt-1 text-xs font-medium text-slate-400">{product.rating.count} customer reviews</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs font-bold text-white transition group-hover:bg-slate-800">
            Details
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}
