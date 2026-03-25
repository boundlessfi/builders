import { products, categories } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { Package } from "lucide-react";

export const metadata = {
  title: "Products | Boundless Builders",
  description:
    "Browse Stellar ecosystem products — DeFi, Payments, Infrastructure, and more.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-aqua-marine mb-2">
          <Package className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Product Directory
          </span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Explore Products
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Discover verified products built on Stellar. Filter by category,
          status, or origin to find what you&apos;re looking for.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg bg-aqua-marine/10 border border-aqua-marine/20 px-3 py-1.5 text-sm font-medium text-aqua-marine"
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-aqua-marine/30 hover:text-foreground transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Status Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
        <span className="text-muted-foreground font-medium">Status:</span>
        <label className="flex items-center gap-1.5 text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="rounded border-border accent-aqua-marine"
          />
          Live
        </label>
        <label className="flex items-center gap-1.5 text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="rounded border-border accent-aqua-marine"
          />
          Beta
        </label>
        <label className="flex items-center gap-1.5 text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="rounded border-border accent-aqua-marine"
          />
          In Development
        </label>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{products.length}</span>{" "}
        products
      </div>

      {/* Product Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
