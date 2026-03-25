import Link from "next/link";
import {
  getFeaturedProducts,
  getTopBuilders,
  platformStats,
  formatNumber,
  products,
} from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { BuilderCard } from "@/components/builder-card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  Package,
  TrendingUp,
  Coins,
  Sparkles,
  Rocket,
  Shield,
} from "lucide-react";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const topBuilders = getTopBuilders(3);
  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-aqua-marine/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-aqua-marine/8 rounded-full blur-3xl -translate-y-1/2" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-aqua-marine/20 bg-aqua-marine/5 px-4 py-1.5 text-sm text-aqua-marine mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Discover what&apos;s being built on Stellar
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Where Stellar{" "}
              <span className="text-aqua-marine">Builders</span> Shine
            </h1>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              The premier showcase platform for developers, designers, and
              creators building in the Stellar ecosystem. Verifiable portfolios,
              real products, proven talent.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-aqua-marine px-6 text-sm font-semibold text-rangoon-green transition-colors hover:bg-aqua-marine/90 gap-2"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/builders"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted gap-2"
              >
                Find Builders
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Builders
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                {platformStats.totalBuilders}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <Package className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Products
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                {platformStats.totalProducts}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <Coins className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  XLM Earned
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                {formatNumber(platformStats.totalXlmEarned)}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Total TVL
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                ${formatNumber(platformStats.totalTvl)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Curated projects from the Stellar ecosystem
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Builders */}
      <section className="bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Top Builders
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Highest-rated builders in the ecosystem
              </p>
            </div>
            <Link
              href="/builders"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topBuilders.map((builder) => (
              <BuilderCard key={builder.id} builder={builder} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Launches */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Recent Launches
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Latest products added to the platform
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">
              Why Boundless Builders?
            </h2>
            <p className="mt-2 text-muted-foreground">
              More than a portfolio platform
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-aqua-marine/10 text-aqua-marine mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">
                Verified Provenance
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Products auto-imported from on-chain activity with full
                milestone history. No self-reported claims.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-boundless-blue/10 text-boundless-blue mb-4">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">
                Real Products Only
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Every product is admin-reviewed. Actual status displayed
                transparently &mdash; no vaporware.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-boundless-purple/10 text-boundless-purple mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">
                Cross-Module Reputation
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Unified reputation score from hackathons, grants, bounties, and
                crowdfunding activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl bg-linear-to-r from-aqua-marine/10 via-boundless-blue/10 to-boundless-purple/10 border border-border/40 p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ready to showcase your work?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Join hundreds of builders already showcasing their Stellar projects.
            Get discovered by the ecosystem.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="rounded-lg bg-aqua-marine text-rangoon-green font-semibold hover:bg-aqua-marine/90 gap-2 px-6"
            >
              Create Your Profile
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Link
              href="/products"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
