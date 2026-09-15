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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            key={product.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_35px_100px_-35px_rgba(0,0,0,0.55)] sm:p-4"
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 18 }}
            transition={{ type: "spring", stiffness: 330, damping: 28, mass: 0.8 }}
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

            <div className="grid overflow-hidden rounded-[1.5rem] bg-slate-50 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,white_0%,#f8fafc_55%,#e2e8f0_100%)] p-10 sm:min-h-[30rem]">
                <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-white/80 blur-2xl" />
                <motion.div
                  layoutId={`product-image-${product.id}`}
                  className="relative flex h-full w-full items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-[22rem] w-auto max-w-[80%] object-contain drop-shadow-[0_25px_25px_rgba(15,23,42,0.16)]"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col justify-center bg-white p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 pr-12">
                  <span className="rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                    {formatCategory(product.category)}
                  </span>
                  <span className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Product #{product.id}
                  </span>
                </div>

                <h2 id="product-modal-title" className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl">
                  {product.title}
                </h2>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="text-3xl font-black tracking-tight text-slate-950">${product.price.toFixed(2)}</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700">
                    <StarIcon />
                    {product.rating.rate.toFixed(1)}
                  </span>
                  <span className="text-sm font-medium text-slate-400">{product.rating.count} reviews</span>
                </div>

                <div className="my-7 h-px bg-slate-100" />

                <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">{product.description}</p>

                <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Catalogue status</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">Available to explore</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
