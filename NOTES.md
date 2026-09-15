# Notes

## Bugs I found

### 1. Products state and API response were typed as `any`

**What was wrong:** `products` used `any[]`, and the API response was also stored as `any`.

**Why it was wrong:** The assignment explicitly requires proper TypeScript types. Using `any` removes compile-time guarantees around the API data and makes incorrect data easier to pass through the application.

**How I fixed it:** I typed the state as `Product[]`, changed the parsed response to `unknown`, and added a small runtime type guard for the API response. I also added the API's `rating` shape to the product types.

### 2. The data-fetching effect depended on `products`

**What was wrong:** The fetch effect had `[products]` as its dependency while also updating `products` inside the effect.

**Why it was wrong:** Updating `products` changes the dependency, which causes the effect to run again and fetch the catalogue repeatedly.

**How I fixed it:** The catalogue is fetched once on mount, so the dependency array is `[]`. The existing cancellation flag is retained so an unmounted component does not update state.

### 3. Search and category filtering did not compose

**What was wrong:** Search only ran when the category was `all`. Selecting a category disabled the search condition, and title matching was case-sensitive.

**Why it was wrong:** The acceptance criteria require search and category filtering to work together and require case-insensitive title search.

**How I fixed it:** I calculate independent `matchesSearch` and `matchesCategory` conditions and require both to match. The search term and product title are normalized to lowercase.

### 4. Product grid used the array index as the React key

**What was wrong:** Filtered products were rendered with `key={index}`.

**Why it was wrong:** An index is not a stable identity when a filtered list changes. This can cause React to associate an existing component with the wrong product and can make list animations less reliable.

**How I fixed it:** I changed the key to the stable product ID: `key={product.id}`.

### 5. The error state was never rendered

**What was wrong:** `useProducts` exposed `error`, but the page ignored it. The grid could also show an empty-filter message while the initial request was still loading.

**Why it was wrong:** A failed request needs a visible, graceful error state, and loading should have its own UI rather than being mixed with the empty-results state.

**How I fixed it:** The page now shows loading, error, or the product grid as mutually exclusive states.


### 6. One API product has a misleading category

**What was wrong:** The public API classifies the Fjallraven backpack as `men's clothing`, even though the product is better represented as an accessory in this catalogue.

**Why it was wrong:** This is a source-data quality issue rather than a filtering bug, but it makes the category UI confusing for users.

**How I fixed it:** I kept the API response untouched and added a small frontend-only category override in the product normalization step. Only the known backpack title is mapped to `accessories`; all other products retain their API category.

## Features I completed

- Case-insensitive product-title search.
- Search and category filters work together.
- Responsive product grid: 1 column on mobile, 2 on small screens, and 3 on desktop using Tailwind CSS.
- Product detail modal with a Framer Motion open/close transition.
- Frontend-only category correction for the backpack while preserving the raw API response.
- Interactive filter panel with result counts and a clear-filters action.
- Animated product cards and smooth list transitions using the existing Framer Motion dependency.
- Graceful loading and error states.
- Typed API response with no `any`.
- Stable product keys for the animated list.

## Decisions

- I kept the existing component structure and dependencies rather than introducing a UI library or restructuring the application.
- I used a runtime type guard because data from `fetch()` is external input; a TypeScript interface alone does not validate runtime JSON.
- I used `useMemo` for derived categories and filtered products so these values are calculated from state rather than stored as additional state.
- I kept the existing Framer Motion grid animation and added the requested modal animation with `AnimatePresence`.
- I used Tailwind utility classes and small inline SVG icons rather than adding a component/UI library, following the assignment rules.
- I kept the category correction narrow and explicit instead of guessing categories from product names.

## With more time

- Replace the page reload retry with a hook-level retry action.
- Add focus trapping/return-focus behavior for a more complete accessible dialog.
- Add automated tests for filtering, loading/error states, and modal behavior.
- Consider image loading/error handling for individual product images.

## UI polish

I kept the UI implementation within the assignment constraints: Tailwind CSS for layout/styling, the existing Framer Motion dependency for meaningful transitions, and custom React components rather than a component library. The visual polish focuses on hierarchy, responsive spacing, product-card interaction, filter feedback, skeleton loading, error/empty states, and a more intentional modal experience without adding unnecessary dependencies.
