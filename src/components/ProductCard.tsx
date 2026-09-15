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
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white text-left shadow-[0_14px_45px_-32px_rgba(15,23,42,0.55)] outline-none transition-[border-color,box-shadow] duration-300 hover:border-slate-300 hover:shadow-[0_28px_70px_-34px_rgba(15,23,42,0.58)] focus-visible:ring-4 focus-visible:ring-slate-200"
      aria-label={`View details for ${product.title}`}
    >
      <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_38%,#ffffff_0%,#f8fafc_52%,#e2e8f0_100%)] p-8 sm:h-80">
        <div className="absolute inset-x-10 bottom-5 h-12 rounded-full bg-slate-300/30 blur-2xl transition duration-500 group-hover:scale-125 group-hover:bg-slate-400/35" />
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-slate-200/50 blur-3xl transition duration-700 group-hover:scale-125" />
        <span className="absolute left-4 top-4 z-10 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600 shadow-sm backdrop-blur">
          {formatCategory(product.category)}
        </span>
        <span className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full border border-white/80 bg-slate-950/90 px-2.5 py-1.5 text-[11px] font-black text-white shadow-sm">
          <StarIcon /> {product.rating.rate.toFixed(1)}
        </span>
        <motion.div layoutId={`product-image-${product.id}`} className="relative z-[1] flex h-full w-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="max-h-56 w-auto max-w-[78%] object-contain drop-shadow-[0_24px_24px_rgba(15,23,42,0.14)] transition duration-700 ease-out group-hover:scale-[1.09]"
          />
        </motion.div>
        <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-slate-950 text-white opacity-0 shadow-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Product #{product.id}</p>
        <h2 className="mt-2 line-clamp-2 min-h-[3.6rem] text-[16px] font-extrabold leading-7 tracking-[-0.015em] text-slate-950">
          {product.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-2xl font-black tracking-tight text-slate-950">${product.price.toFixed(2)}</p>
            <p className="mt-1 text-[11px] font-semibold text-slate-400">{product.rating.count} reviews</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-black text-slate-800 shadow-sm transition duration-300 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white">
            View
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}
