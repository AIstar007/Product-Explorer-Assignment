# Product Explorer

A responsive product catalogue built with **Next.js, React, TypeScript, Tailwind CSS, and Framer Motion**. The application fetches products from the Fake Store API and provides search, category filtering, responsive layouts, and animated product details.

## Features

- Fetches products from the Fake Store API
- Responsive product grid
   - 1 column on mobile
   - 2 columns on tablet
   - 3 columns on desktop

- Search products by title
- Case-insensitive search
- Category filtering
- Search and category filters work together
- Product detail modal
- Animated product cards and filtering transitions using Framer Motion
- Smooth modal open/close animations
- Loading state
- Error state
- Empty search/filter state
- Product rating and review count
- Responsive navigation and filter controls
- Custom clear-search button
- Frontend category normalization for improved product categorization
- Keyboard-friendly interactions
- No external UI/component library

## Tech Stack

- **Next.js 14**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Fake Store API**

## API

Products are retrieved from:

`https://fakestoreapi.com/products`

The application validates the API response before using the product data.

## Project Structure

```text
product-explorer/
│
├── public/
│   └── ...
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Filters.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductModal.tsx
│   │   └── ...
│   │
│   ├── hooks/
│   │   └── useProducts.ts
│   │
│   └── types/
│       └── product.ts
│
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project

```bash
cd product-explorer
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the application in your browser at:

```text
http://localhost:3000
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Start Production Server

```bash
npm run start
```

Starts the application using the production build.

### Type Checking

```bash
npm run typecheck
```

Runs TypeScript type checking without generating files.

### Linting

```bash
npm run lint
```

Runs ESLint to identify code-quality issues.

## How It Works

### Product Fetching

The `useProducts` hook is responsible for retrieving products from the Fake Store API.

The response is validated before being stored in application state. This helps prevent unexpected API data from breaking the UI.

### Search

Users can search by product title.

The search is:

- Case-insensitive
- Trimmed before filtering
- Combined with the selected category

### Category Filtering

Products can be filtered by category using the category selector and quick filter controls.

The available categories are generated from the loaded product data.

The **All** option displays the complete catalogue.

### Combined Filtering

Search and category filtering are applied together.

For example:

```text
Search: jacket
Category: men's clothing
```

will display only products that satisfy **both** conditions.

### Product Details

Selecting a product opens a detailed product modal containing information such as:

- Product image
- Product title
- Category
- Price
- Description
- Rating
- Number of reviews

The modal can be closed using the close control or supported dismissal interactions.

## Animations

Framer Motion is used for meaningful interface transitions.

### Product Grid

When changing categories:

- Products leaving the result set fade and scale out
- Newly displayed products subtly fade and move into position
- Existing products smoothly reposition within the grid
- Animations do not use index-based delays

This keeps category switching responsive even when displaying the full catalogue.

### Product Modal

The product details modal uses animated entrance and exit transitions to make the interaction feel smooth without introducing unnecessary complexity.

## Responsive Design

The product grid adapts to the viewport:

```text
Mobile     → 1 column
Tablet     → 2 columns
Desktop    → 3 columns
```

The search and filtering controls also adapt to smaller screen sizes.

## Loading and Error Handling

The application handles different API states.

### Loading

A loading state is displayed while products are being retrieved.

### Error

If the API request fails or returns unexpected data, an error state is shown instead of allowing the application to fail silently.

### Empty Results

If no products match the current search/category combination, the application displays an appropriate empty state.

## Data Normalization

The application performs frontend-only category normalization where required.

This allows the UI to present a more appropriate category while keeping the original API as the product source.

The API data itself is not modified.

## Design Approach

The interface focuses on:

- Clear visual hierarchy
- Responsive layouts
- Easy product discovery
- Fast filtering
- Meaningful animation
- Accessible interactions
- Custom Tailwind-based components

No third-party component/UI library is used.

## Dependencies

The project intentionally keeps dependencies minimal.

Core dependencies include:

```text
next
react
react-dom
framer-motion
```

Development dependencies include TypeScript, Tailwind CSS, PostCSS, Autoprefixer, and the required type definitions.

## Validation

Before submitting the project, run:

```bash
npm run typecheck
npm run lint
npm run build
```

All three commands should complete successfully before deployment or submission.

## Deployment

The application can be deployed to a Next.js-compatible hosting platform.

For a production deployment:

```bash
npm install
npm run build
npm run start
```

Make sure the deployed environment has network access to:

```text
https://fakestoreapi.com/products
```

## Assignment Requirements Covered

| Requirement | Implementation |
|---|---|
| Next.js / React | ✅ |
| TypeScript | ✅ |
| Tailwind CSS | ✅ |
| Framer Motion | ✅ |
| Fake Store API | ✅ |
| Responsive product grid | ✅ |
| Product search | ✅ |
| Case-insensitive search | ✅ |
| Category filtering | ✅ |
| Combined search + category filtering | ✅ |
| Product details | ✅ |
| Animated transitions | ✅ |
| Loading state | ✅ |
| Error handling | ✅ |
| Empty state | ✅ |
| No UI component library | ✅ |
| Minimal dependencies | ✅ |

## Author

**Alen Thomas**

Built as a responsive Product Explorer application using modern React and Next.js practices.
