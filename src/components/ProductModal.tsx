"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

function formatCategory(category: string): string {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.92 1.06-6.2L3 9.53l6.22-.9L12 3Z" />
    </svg>
  );
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (!product) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-lg sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            key={product.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/70 bg-white p-2 shadow-[0_40px_120px_-35px_rgba(0,0,0,0.65)] sm:p-3"
            initial={{ opacity: 0, scale: 0.9, y: 34 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.8 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-xl text-slate-500 shadow-sm backdrop-blur transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            >
              ×
            </button>

            <div className="grid overflow-hidden rounded-[1.5rem] bg-slate-50 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative flex min-h-[23rem] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,#f8fafc_52%,#e2e8f0_100%)] p-10 sm:min-h-[34rem]">
                <div className="absolute left-8 top-8 h-32 w-32 rounded-full bg-white/80 blur-3xl" />
                <div className="absolute bottom-10 h-10 w-52 rounded-full bg-slate-300/35 blur-2xl" />
                <motion.div layoutId={`product-image-${product.id}`} className="relative flex h-full w-full items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-[25rem] w-auto max-w-[82%] object-contain drop-shadow-[0_30px_30px_rgba(15,23,42,0.18)]"
                  />
                </motion.div>
                <span className="absolute bottom-6 left-6 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 shadow-sm backdrop-blur">
                  Product #{product.id}
                </span>
              </div>

              <div className="flex flex-col justify-center bg-white p-7 sm:p-11">
                <div className="flex flex-wrap items-center gap-2 pr-12">
                  <motion.span layout className="rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                    {formatCategory(product.category)}
                  </motion.span>
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700">
                    <StarIcon /> {product.rating.rate.toFixed(1)}
                  </span>
                </div>

                <h2 id="product-modal-title" className="mt-6 text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
                  {product.title}
                </h2>

                <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <span className="text-4xl font-black tracking-tight text-slate-950">${product.price.toFixed(2)}</span>
                  <span className="pb-1 text-sm font-semibold text-slate-400">{product.rating.count} customer reviews</span>
                </div>

                <div className="my-8 h-px bg-slate-100" />

                <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">{product.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Rating</p>
                    <p className="mt-2 text-lg font-black text-slate-950">{product.rating.rate.toFixed(1)} / 5</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Reviews</p>
                    <p className="mt-2 text-lg font-black text-slate-950">{product.rating.count}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-4 text-white">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Catalogue status</p>
                    <p className="mt-1 text-sm font-bold">Available to explore</p>
                  </div>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
