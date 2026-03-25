import Link from "next/link";
import {
  type Product,
  getStatusColor,
  getStatusLabel,
  formatNumber,
} from "@/lib/mock-data";
import { ExternalLink, GitBranch, Users } from "lucide-react";

function ProductLogo({ product }: { product: Product }) {
  const initials = product.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    "bg-aqua-marine/15 text-aqua-marine",
    "bg-boundless-blue/15 text-boundless-blue",
    "bg-boundless-purple/15 text-boundless-purple",
    "bg-boundless-orange/15 text-boundless-orange",
    "bg-forest-green/15 text-forest-green",
  ];
  const colorIndex =
    product.name.charCodeAt(0) % colors.length;

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold text-sm shrink-0 ${colors[colorIndex]}`}
    >
      {initials}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const statusClasses = getStatusColor(product.status);
  const statusLabel = getStatusLabel(product.status);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-xl border border-border/60 bg-card p-5 transition-all duration-200 hover:border-aqua-marine/30 hover:shadow-lg hover:shadow-aqua-marine/5"
    >
      <div className="flex items-start gap-3.5">
        <ProductLogo product={product} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate group-hover:text-aqua-marine transition-colors">
              {product.name}
            </h3>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold leading-none ${statusClasses}`}
            >
              {statusLabel}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            by @{product.primaryBuilder.username}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {product.tagline}
      </p>

      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded-md bg-muted/80 px-2 py-0.5 font-medium">
          {product.category}
        </span>
        {product.metrics.users !== undefined && (
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {formatNumber(product.metrics.users)}
          </span>
        )}
        {product.metrics.tvl !== undefined && (
          <span className="text-emerald-500 font-medium">
            ${formatNumber(product.metrics.tvl)} TVL
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-muted/80 px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
        {product.techStack.length > 4 && (
          <span className="rounded-md bg-muted/80 px-2 py-0.5 text-[11px] text-muted-foreground">
            +{product.techStack.length - 4}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3 pt-1 border-t border-border/40">
        {product.githubUrl && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <GitBranch className="h-3 w-3" />
            GitHub
          </span>
        )}
        {product.liveUrl && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ExternalLink className="h-3 w-3" />
            Live
          </span>
        )}
        <span className="ml-auto text-xs capitalize text-muted-foreground">
          {product.originType === "manual" ? "Community" : product.originType}
        </span>
      </div>
    </Link>
  );
}
