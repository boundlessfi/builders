import Link from "next/link";
import {
  type Builder,
  getReputationLevelName,
  getReputationLevelColor,
} from "@/lib/mock-data";
import { Trophy, Rocket, Star, MapPin } from "lucide-react";

function BuilderAvatar({ builder }: { builder: Builder }) {
  const initials = builder.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-aqua-marine/15 text-aqua-marine font-bold text-lg shrink-0">
      {initials}
    </div>
  );
}

export function BuilderCard({ builder }: { builder: Builder }) {
  const levelColor = getReputationLevelColor(builder.reputationLevel);
  const levelName = getReputationLevelName(builder.reputationLevel);

  return (
    <Link
      href={`/builders/${builder.username}`}
      className="group flex flex-col rounded-xl border border-border/60 bg-card p-5 transition-all duration-200 hover:border-aqua-marine/30 hover:shadow-lg hover:shadow-aqua-marine/5"
    >
      <div className="flex items-start gap-4">
        <BuilderAvatar builder={builder} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground truncate group-hover:text-aqua-marine transition-colors">
            {builder.displayName}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            @{builder.username}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={`text-xs font-semibold ${levelColor}`}
            >
              Lv.{builder.reputationLevel}
            </span>
            <span className="text-xs text-muted-foreground">{levelName}</span>
          </div>
        </div>
      </div>

      {builder.tagline && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {builder.tagline}
        </p>
      )}

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Trophy className="h-3.5 w-3.5 text-amber-400" />
          {builder.stats.hackathonsWon} wins
        </span>
        <span className="flex items-center gap-1">
          <Rocket className="h-3.5 w-3.5 text-blue-400" />
          {builder.stats.productsShipped} shipped
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-yellow-400" />
          {builder.stats.averageRating}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {builder.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-muted/80 px-2 py-0.5 text-xs text-muted-foreground"
          >
            {skill}
          </span>
        ))}
        {builder.skills.length > 3 && (
          <span className="rounded-md bg-muted/80 px-2 py-0.5 text-xs text-muted-foreground">
            +{builder.skills.length - 3}
          </span>
        )}
      </div>

      {builder.location && (
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {builder.location}
        </div>
      )}
    </Link>
  );
}
