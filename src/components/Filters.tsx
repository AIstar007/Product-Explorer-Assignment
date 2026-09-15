"use client";

import { motion } from "framer-motion";

interface FiltersProps {
  search: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

function formatCategory(category: string): string {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="m21 21-4.35-4.35m2.1-5.15a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Filters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
  resultCount,
  totalCount,
}: FiltersProps) {
  const hasActiveFilters = search.trim().length > 0 || category !== "all";

  function clearFilters() {
    onSearchChange("");
    onCategoryChange("all");
  }

  return (
    <section aria-label="Product filters" className="relative z-10">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/95 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.45)] ring-1 ring-slate-900/[0.03] backdrop-blur-xl">
        <div className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
                <SlidersIcon />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-950">Explore</p>
                <p className="text-xs text-slate-400">Refine the catalogue</p>
              </div>
            </div>
            <motion.p
              key={`${resultCount}-${category}-${search}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden text-xs font-semibold text-slate-400 sm:block"
            >
              {resultCount === totalCount ? "All products" : `${resultCount} matching products`}
            </motion.p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="group relative block flex-1" htmlFor="product-search">
              <span className="sr-only">Search products</span>
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-950">
                <SearchIcon />
              </span>
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by product title..."
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-12 pr-12 text-sm font-semibold text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
              {search && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => onSearchChange("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-100"
                >
                  ×
                </motion.button>
              )}
            </label>

            <div className="relative lg:w-64">
              <label htmlFor="category-filter" className="sr-only">Filter by category</label>
              <select
                id="category-filter"
                value={category}
                onChange={(event) => onCategoryChange(event.target.value)}
                className="h-14 w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50/80 px-4 pr-11 text-sm font-bold text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All categories" : formatCategory(item)}
                  </option>
                ))}
              </select>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {hasActiveFilters && (
              <motion.button
                type="button"
                onClick={clearFilters}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.97 }}
                className="h-14 rounded-2xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-100"
              >
                Reset
              </motion.button>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((item) => {
              const active = item === category;
              return (
                <motion.button
                  key={item}
                  type="button"
                  onClick={() => onCategoryChange(item)}
                  whileTap={{ scale: 0.96 }}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-100 ${
                    active
                      ? "bg-slate-950 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-950"
                  }`}
                  aria-pressed={active}
                >
                  {item === "all" ? "All" : formatCategory(item)}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-3 sm:px-5">
          <motion.p
            key={resultCount}
            initial={{ opacity: 0.5, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold text-slate-500"
            aria-live="polite"
          >
            Showing <span className="font-black text-slate-950">{resultCount}</span> of {totalCount} products
          </motion.p>
          <div className="flex flex-wrap items-center gap-2">
            {search.trim() && (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600">
                Search: “{search.trim()}”
              </span>
            )}
            {category !== "all" && (
              <span className="rounded-full bg-slate-950 px-3 py-1.5 text-[11px] font-bold text-white">
                {formatCategory(category)}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
