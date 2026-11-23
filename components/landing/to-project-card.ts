import type {
  OpportunityCardStatus,
  OpportunityCardView,
} from '@/components/cards/types';
import type { Schemas } from '@/lib/api/types';
import { projectUrl } from '@/lib/main-app';

/** One `/projects` or `/projects/featured` row. */
export type ProjectCardDto = Schemas['PublicProjectCardDto'];

const PROJECT_STATUS: Record<
  Schemas['ProjectPublicStatus'],
  OpportunityCardStatus
> = {
  LIVE: 'open',
  BETA: 'in_progress',
  IN_DEVELOPMENT: 'in_progress',
  ARCHIVED: 'completed',
};

const ORIGIN_LABEL: Record<Schemas['ProjectOriginType'], string> = {
  HACKATHON: 'Hackathon',
  GRANT: 'Grant',
  BOUNTY: 'Bounty',
  CROWDFUNDING: 'Crowdfunding',
  // Projects added by hand have no meaningful public origin label.
  MANUAL: '',
};

export function toProjectCard(
  project: ProjectCardDto,
  index: number
): OpportunityCardView {
  return {
    id: project.id,
    org: project.organization?.name ?? project.creator.name,
    index: index + 1,
    status: PROJECT_STATUS[project.publicStatus],
    title: project.title,
    category: project.category ?? 'Uncategorized',
    // A solo project has no team; the creator is the one participant.
    participants: project.team?.total ?? 1,
    mode: project.originType ? ORIGIN_LABEL[project.originType] : '',
    comments: project._count.comments,
    logo: project.logo ?? undefined,
    // Only link out when a slug exists; do not fall back to the id.
    detailUrl: project.slug ? projectUrl(project.slug) : undefined,
    isFeatured: project.isFeatured,
  };
}
