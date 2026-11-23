/**
 * View models for the project / opportunity cards. These are presentation
 * types: the display app receives already-shaped data (built in the main
 * Boundless app / backend) and renders it. Keep them free of API-schema
 * imports so the cards stay portable.
 */

export type OpportunityCardStatus =
  | 'open'
  | 'applications'
  | 'in_progress'
  | 'review'
  | 'completed';

export type BuilderCardStatus =
  | 'AVAILABLE'
  | 'OPEN_TO_WORK'
  | 'BUSY'
  | 'UNAVAILABLE';

export interface BuilderCardView {
  id: string;
  /** The builder's display name (e.g. "Jane Doe"). */
  displayName: string;
  /** URL-safe username (e.g. "janedoe"). */
  username: string;
  /** Optional avatar image URL. */
  avatarSrc?: string;
  /** Availability status when set (e.g. "OPEN_TO_WORK"). */
  status?: BuilderCardStatus;
  /** Short bio shown under the name when available. */
  bio?: string;
  /** Professional role or title (e.g. "Full-stack developer"). */
  role?: string;
  /** Country or city label (e.g. "Nigeria"). */
  location?: string;
  /** Up to 3-4 skill labels. */
  skills?: string[];
  /** Follower count when available. */
  followers?: number;
  /** Project count when available. */
  projects?: number;
  /** Profile page path so cards can link out. Absent when no profile target exists (e.g. a directory row with a null username). */
  detailUrl?: string;
}

export interface OpportunityCardView {
  id: string;
  org: string;
  /** Display number rendered as `#42` next to the org. Pillar-local sequence. */
  index: number;
  status: OpportunityCardStatus;
  title: string;
  category: string;
  participants: number;
  /** Sub-mode label or pillar name. Empty string when nothing better is available. */
  mode: string;
  comments: number;
  /** Optional project logo image URL. */
  logo?: string;
  /** Pre-formatted countdown like `4D:22H:49M` when a deadline is available. */
  endsIn?: string;
  reward?: { amount: number; currency: string };
  /** Detail page URL so cards can link out. Absent when there is no target. */
  detailUrl?: string;
  isFeatured: boolean;
}
