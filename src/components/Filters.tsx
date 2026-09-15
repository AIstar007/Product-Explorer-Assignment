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
      <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-3 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="group relative block flex-1" htmlFor="product-search">
            <span className="sr-only">Search products</span>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-700">
              <SearchIcon />
            </span>
            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search products by title..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-11 pr-11 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-100"
              >
                ×
              </button>
            )}
          </label>

          <div className="relative lg:w-64">
            <label htmlFor="category-filter" className="sr-only">Filter by category</label>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/80 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
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
              className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-100"
            >
              Clear filters
            </motion.button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-1 pt-3 text-xs">
          <p className="font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{resultCount}</span> of {totalCount} products
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {search.trim() && (
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                Search: “{search.trim()}”
              </span>
            )}
            {category !== "all" && (
              <span className="rounded-full bg-slate-900 px-3 py-1 font-semibold text-white">
                {formatCategory(category)}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
