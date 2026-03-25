import { builders } from "@/lib/mock-data";
import { BuilderCard } from "@/components/builder-card";
import { Users } from "lucide-react";

export const metadata = {
  title: "Builders | Boundless Builders",
  description:
    "Discover proven Stellar builders. Find talent by skills, reputation, and availability.",
};

export default function BuildersPage() {
  const sortedBuilders = [...builders].sort(
    (a, b) => b.reputationScore - a.reputationScore
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-aqua-marine mb-2">
          <Users className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Builder Directory
          </span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Find Builders</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Discover talented developers, designers, and creators building in the
          Stellar ecosystem. Every builder has a verifiable track record.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">
            Reputation:
          </span>
          {["All", "Lv.3+", "Lv.4+", "Lv.5"].map((level) => (
            <button
              key={level}
              type="button"
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                level === "All"
                  ? "bg-aqua-marine/10 border-aqua-marine/20 text-aqua-marine"
                  : "border-border/60 bg-card text-muted-foreground hover:border-aqua-marine/30 hover:text-foreground"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground font-medium mr-1 py-1.5">
          Skills:
        </span>
        {[
          "Soroban",
          "React",
          "Rust",
          "TypeScript",
          "DeFi",
          "Node.js",
          "UI/UX Design",
        ].map((skill) => (
          <button
            key={skill}
            type="button"
            className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-sm text-muted-foreground hover:border-aqua-marine/30 hover:text-foreground transition-colors"
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {sortedBuilders.length}
        </span>{" "}
        builders
      </div>

      {/* Builder Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedBuilders.map((builder) => (
          <BuilderCard key={builder.id} builder={builder} />
        ))}
      </div>
    </div>
  );
}
