import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductBySlug,
  products,
  getStatusColor,
  getStatusLabel,
  formatNumber,
} from "@/lib/mock-data";
// Using inline link styles since Button is a client component
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  FileText,
  Users,
  TrendingUp,
  Activity,
  Shield,
  CheckCircle,
} from "lucide-react";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const statusClasses = getStatusColor(product.status);
  const statusLabel = getStatusLabel(product.status);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-aqua-marine/15 text-aqua-marine font-bold text-xl shrink-0">
          {product.name
            .split(/\s+/)
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">
              {product.name}
            </h1>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusClasses}`}
            >
              {statusLabel}
            </span>
            {product.originType !== "manual" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-aqua-marine/20 bg-aqua-marine/5 px-2.5 py-0.5 text-xs font-medium text-aqua-marine">
                <Shield className="h-3 w-3" />
                Verified on Boundless
              </span>
            )}
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            {product.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.liveUrl && (
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-aqua-marine px-2.5 text-[0.8rem] font-semibold text-rangoon-green transition-colors hover:bg-aqua-marine/90"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Visit Site
              </a>
            )}
            {product.githubUrl && (
              <a
                href={product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-[0.8rem] font-medium transition-colors hover:bg-muted"
              >
                <GitBranch className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
            {product.docsUrl && (
              <a
                href={product.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-[0.8rem] font-medium transition-colors hover:bg-muted"
              >
                <FileText className="h-3.5 w-3.5" />
                Docs
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Metrics */}
          {Object.keys(product.metrics).length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {product.metrics.tvl !== undefined && (
                <div className="rounded-xl border border-border/60 bg-card p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Total Value Locked
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    ${formatNumber(product.metrics.tvl)}
                  </p>
                </div>
              )}
              {product.metrics.users !== undefined && (
                <div className="rounded-xl border border-border/60 bg-card p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Users className="h-3.5 w-3.5" />
                    Users
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {formatNumber(product.metrics.users)}
                  </p>
                </div>
              )}
              {product.metrics.transactions !== undefined && (
                <div className="rounded-xl border border-border/60 bg-card p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Activity className="h-3.5 w-3.5" />
                    Transactions
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {formatNumber(product.metrics.transactions)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* About */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              About
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Journey */}
          {product.originType !== "manual" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Journey
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-aqua-marine/15 text-aqua-marine">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div className="w-px flex-1 bg-border/60 mt-1" />
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-foreground text-sm">
                      {product.originType === "hackathon"
                        ? "Hackathon Winner"
                        : product.originType === "grant"
                          ? "Grant Completed"
                          : product.originType === "crowdfunding"
                            ? "Crowdfunding Funded"
                            : "Bounty Completed"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(product.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                {product.launchDate && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Launched
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(product.launchDate).toLocaleDateString(
                          "en-US",
                          { month: "long", year: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="rounded-xl border border-border/60 bg-card p-5 space-y-4">
            <h3 className="font-semibold text-foreground text-sm">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium text-foreground">
                  {product.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Origin</span>
                <span className="font-medium text-foreground capitalize">
                  {product.originType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium text-foreground">
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              {product.launchDate && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Launched</span>
                  <span className="font-medium text-foreground">
                    {new Date(product.launchDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Team */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="font-semibold text-foreground text-sm mb-4">Team</h3>
            <div className="space-y-3">
              {product.teamMembers.map(({ builder, role }) => (
                <Link
                  key={builder.id}
                  href={`/builders/${builder.username}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-aqua-marine/15 text-aqua-marine text-xs font-bold shrink-0">
                    {builder.displayName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-aqua-marine transition-colors truncate">
                      {builder.displayName}
                    </p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
