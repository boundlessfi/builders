import type { BuilderCardView } from '@/components/cards/types';
import { profileUrl } from '@/lib/main-app';

import type { BuilderListItemDto } from './use-builders';

const MAX_SKILLS = 4;

/**
 * Map a `/users/directory` row to the card view model. This is intentionally
 * separate from `to-builder-card.ts` (which maps `/users/top-builders` rows)
 * because the DTOs differ: the directory row has nullable name/username, no
 * followers/projects counts, and extra fields like bio, status, and joinedAt.
 */
export function toDirectoryBuilderCard(
  builder: BuilderListItemDto
): BuilderCardView {
  return {
    id: builder.id,
    displayName: builder.name ?? builder.username ?? 'Unknown',
    username: builder.username ?? '',
    avatarSrc: builder.image ?? undefined,
    status: builder.status ?? undefined,
    bio: builder.bio?.trim() || undefined,
    location: builder.location ?? builder.country ?? undefined,
    skills: builder.skills?.slice(0, MAX_SKILLS),
    // Only link out when a username exists; a null username would otherwise
    // produce a `/profile/null` href. Cards without a target render as plain
    // (non-clickable) cards.
    detailUrl: builder.username ? profileUrl(builder.username) : undefined,
  };
}
