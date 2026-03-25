import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getBuilderByUsername,
  builders,
  products,
  getReputationLevelName,
  getReputationLevelColor,
  formatNumber,
} from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Calendar,
  Trophy,
  Rocket,
  Star,
  Coins,
  Target,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export function generateStaticParams() {
  return builders.map((builder) => ({ username: builder.username }));
}

export default async function BuilderProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const builder = getBuilderByUsername(username);

  if (!builder) {
    notFound();
  }

  const levelColor = getReputationLevelColor(builder.reputationLevel);
  const levelName = getReputationLevelName(builder.reputationLevel);
  const builderProducts = products.filter(
    (p) =>
      p.primaryBuilder.username === builder.username ||
      p.teamMembers.some((tm) => tm.builder.username === builder.username)
  );

  const availabilityLabels: Record<string, string> = {
    available_bounties: "Available for Bounties",
    open_hackathons: "Open to Hackathon Teams",
    seeking_fulltime: "Seeking Full-time",
    not_available: "Not Currently Available",
  };

  const availabilityColors: Record<string, string> = {
    available_bounties: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    open_hackathons: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    seeking_fulltime: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    not_available: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  // Reputation progress within level
  const levelThresholds = [0, 100, 300, 600, 1000, Infinity];
  const currentMin = levelThresholds[builder.reputationLevel - 1];
  const currentMax = levelThresholds[builder.reputationLevel];
  const progress =
    currentMax === Infinity
      ? 100
      : Math.min(
          100,
          ((builder.reputationScore - currentMin) / (currentMax - currentMin)) *
            100
        );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Link */}
      <Link
        href="/builders"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Builders
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar - Profile Info */}
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-aqua-marine/15 text-aqua-marine font-bold text-2xl">
                {builder.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <h1 className="mt-4 text-xl font-bold text-foreground">
                {builder.displayName}
              </h1>
              <p className="text-sm text-muted-foreground">
                @{builder.username}
              </p>

              {/* Reputation */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`text-sm font-bold ${levelColor}`}>
                  Level {builder.reputationLevel}
                </span>
                <span className="text-sm text-muted-foreground">
                  {levelName}
                </span>
              </div>
              <div className="mt-2 w-full">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{builder.reputationScore} pts</span>
                  {currentMax !== Infinity && <span>{currentMax} pts</span>}
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-aqua-marine transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="mt-4 w-full">
                <span
                  className={`inline-flex w-full justify-center rounded-lg border px-3 py-1.5 text-xs font-medium ${availabilityColors[builder.availabilityStatus]}`}
                >
                  {availabilityLabels[builder.availabilityStatus]}
                </span>
              </div>
            </div>

            {/* Bio */}
            {builder.bio && (
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                {builder.bio}
              </p>
            )}

            {/* Meta Info */}
            <div className="mt-4 space-y-2 border-t border-border/40 pt-4">
              {builder.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {builder.location}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                Member since{" "}
                {new Date(builder.memberSince).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              {builder.websiteUrl && (
                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <a
                    href={builder.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-aqua-marine hover:underline truncate"
                  >
                    {builder.websiteUrl.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-4 flex items-center gap-2 border-t border-border/40 pt-4">
              {builder.socialLinks.github && (
                <a
                  href={`https://github.com/${builder.socialLinks.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {builder.socialLinks.twitter && (
                <a
                  href={`https://x.com/${builder.socialLinks.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {builder.socialLinks.linkedin && (
                <a
                  href={`https://linkedin.com/in/${builder.socialLinks.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="font-semibold text-foreground text-sm mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {builder.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-border/60 bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-card p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Trophy className="h-3.5 w-3.5 text-amber-400" />
                Hackathons Won
              </div>
              <p className="text-xl font-bold text-foreground">
                {builder.stats.hackathonsWon}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Rocket className="h-3.5 w-3.5 text-blue-400" />
                Products Shipped
              </div>
              <p className="text-xl font-bold text-foreground">
                {builder.stats.productsShipped}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Target className="h-3.5 w-3.5 text-purple-400" />
                Bounties Completed
              </div>
              <p className="text-xl font-bold text-foreground">
                {builder.stats.bountiesCompleted}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Coins className="h-3.5 w-3.5 text-aqua-marine" />
                XLM Earned
              </div>
              <p className="text-xl font-bold text-foreground">
                {formatNumber(builder.stats.totalXlmEarned)}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Star className="h-3.5 w-3.5 text-yellow-400" />
                Average Rating
              </div>
              <p className="text-xl font-bold text-foreground">
                {builder.stats.averageRating}/5
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Products ({builderProducts.length})
            </h2>
            {builderProducts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {builderProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border/60 bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  No products yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
