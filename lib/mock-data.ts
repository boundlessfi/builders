export type ProductStatus = "live" | "beta" | "in_development" | "archived";
export type ProductOrigin =
  | "hackathon"
  | "grant"
  | "crowdfunding"
  | "bounty"
  | "manual";
export type ApprovalStatus =
  | "draft"
  | "pending"
  | "changes_requested"
  | "approved"
  | "rejected";

export interface Builder {
  id: string;
  username: string;
  displayName: string;
  profilePhoto: string;
  bio: string;
  tagline: string;
  location: string;
  websiteUrl: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    telegram?: string;
    discord?: string;
  };
  reputationScore: number;
  reputationLevel: 1 | 2 | 3 | 4 | 5;
  isProfilePublic: boolean;
  skills: string[];
  stats: {
    hackathonsWon: number;
    totalXlmEarned: number;
    bountiesCompleted: number;
    productsShipped: number;
    averageRating: number;
  };
  memberSince: string;
  availabilityStatus:
    | "available_bounties"
    | "open_hackathons"
    | "seeking_fulltime"
    | "not_available";
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  status: ProductStatus;
  originType: ProductOrigin;
  primaryBuilder: Builder;
  teamMembers: { builder: Builder; role: string }[];
  createdAt: string;
  launchDate: string | null;
  logoUrl: string;
  liveUrl: string | null;
  githubUrl: string | null;
  docsUrl: string | null;
  demoVideoUrl: string | null;
  techStack: string[];
  isFeatured: boolean;
  approvalStatus: ApprovalStatus;
  metrics: {
    tvl?: number;
    users?: number;
    transactions?: number;
  };
}

export const builders: Builder[] = [
  {
    id: "1",
    username: "alexchen",
    displayName: "Alex Chen",
    profilePhoto: "",
    bio: "Full-stack developer passionate about DeFi and cross-border payments. Building the future of finance on Stellar. Previously at Stripe and Coinbase.",
    tagline: "DeFi builder on Stellar",
    location: "San Francisco, USA",
    websiteUrl: "https://alexchen.dev",
    socialLinks: {
      twitter: "alexchen_dev",
      github: "alexchen",
      linkedin: "alexchen",
    },
    reputationScore: 850,
    reputationLevel: 4,
    isProfilePublic: true,
    skills: [
      "Soroban",
      "React",
      "TypeScript",
      "Rust",
      "DeFi",
      "Smart Contracts",
    ],
    stats: {
      hackathonsWon: 3,
      totalXlmEarned: 45000,
      bountiesCompleted: 12,
      productsShipped: 4,
      averageRating: 4.8,
    },
    memberSince: "2024-06-15",
    availabilityStatus: "available_bounties",
  },
  {
    id: "2",
    username: "mariarodriguez",
    displayName: "Maria Rodriguez",
    profilePhoto: "",
    bio: "Smart contract engineer specializing in Soroban. Passionate about creating secure and efficient decentralized applications for the Stellar ecosystem.",
    tagline: "Soroban smart contract wizard",
    location: "Buenos Aires, Argentina",
    websiteUrl: "https://maria.codes",
    socialLinks: {
      twitter: "maria_codes",
      github: "mariarodriguez",
      discord: "maria#1234",
    },
    reputationScore: 1200,
    reputationLevel: 5,
    isProfilePublic: true,
    skills: ["Soroban", "Rust", "Security Auditing", "DeFi", "WebAssembly"],
    stats: {
      hackathonsWon: 5,
      totalXlmEarned: 78000,
      bountiesCompleted: 20,
      productsShipped: 6,
      averageRating: 4.9,
    },
    memberSince: "2024-03-01",
    availabilityStatus: "open_hackathons",
  },
  {
    id: "3",
    username: "jamesobi",
    displayName: "James Obi",
    profilePhoto: "",
    bio: "Designer and frontend developer creating beautiful user experiences for blockchain applications. Focused on making Web3 accessible to everyone.",
    tagline: "Making Web3 beautiful",
    location: "Lagos, Nigeria",
    websiteUrl: "https://jamesobi.design",
    socialLinks: {
      twitter: "jamesobi_design",
      github: "jamesobi",
      linkedin: "jamesobi",
    },
    reputationScore: 450,
    reputationLevel: 3,
    isProfilePublic: true,
    skills: ["React", "Next.js", "UI/UX Design", "Figma", "TypeScript"],
    stats: {
      hackathonsWon: 2,
      totalXlmEarned: 22000,
      bountiesCompleted: 8,
      productsShipped: 3,
      averageRating: 4.7,
    },
    memberSince: "2024-09-10",
    availabilityStatus: "seeking_fulltime",
  },
  {
    id: "4",
    username: "sarahkim",
    displayName: "Sarah Kim",
    profilePhoto: "",
    bio: "Backend engineer with expertise in payment systems and financial infrastructure. Building cross-border payment solutions on Stellar.",
    tagline: "Payments infrastructure builder",
    location: "Seoul, South Korea",
    websiteUrl: "https://sarahkim.tech",
    socialLinks: {
      twitter: "sarahkim_tech",
      github: "sarahkim",
    },
    reputationScore: 620,
    reputationLevel: 4,
    isProfilePublic: true,
    skills: [
      "Node.js",
      "Stellar SDK",
      "PostgreSQL",
      "Payments",
      "API Design",
    ],
    stats: {
      hackathonsWon: 2,
      totalXlmEarned: 35000,
      bountiesCompleted: 15,
      productsShipped: 3,
      averageRating: 4.6,
    },
    memberSince: "2024-05-20",
    availabilityStatus: "available_bounties",
  },
  {
    id: "5",
    username: "devpatel",
    displayName: "Dev Patel",
    profilePhoto: "",
    bio: "Full-stack developer and open source contributor. Building developer tools and infrastructure for the Stellar ecosystem.",
    tagline: "Open source advocate",
    location: "Mumbai, India",
    websiteUrl: "https://devpatel.io",
    socialLinks: {
      twitter: "devpatel_io",
      github: "devpatel",
      telegram: "devpatel",
    },
    reputationScore: 320,
    reputationLevel: 3,
    isProfilePublic: true,
    skills: [
      "TypeScript",
      "Go",
      "Docker",
      "Kubernetes",
      "Stellar SDK",
      "DevOps",
    ],
    stats: {
      hackathonsWon: 1,
      totalXlmEarned: 18000,
      bountiesCompleted: 10,
      productsShipped: 2,
      averageRating: 4.5,
    },
    memberSince: "2025-01-15",
    availabilityStatus: "available_bounties",
  },
  {
    id: "6",
    username: "emmawright",
    displayName: "Emma Wright",
    profilePhoto: "",
    bio: "Blockchain researcher and developer. Focused on DeFi protocols and yield optimization strategies on Stellar.",
    tagline: "DeFi researcher & builder",
    location: "London, UK",
    websiteUrl: "https://emmawright.xyz",
    socialLinks: {
      twitter: "emmawright_xyz",
      github: "emmawright",
      linkedin: "emmawright",
    },
    reputationScore: 180,
    reputationLevel: 2,
    isProfilePublic: true,
    skills: ["Soroban", "DeFi", "Research", "Solidity", "Python"],
    stats: {
      hackathonsWon: 1,
      totalXlmEarned: 12000,
      bountiesCompleted: 5,
      productsShipped: 2,
      averageRating: 4.4,
    },
    memberSince: "2025-06-01",
    availabilityStatus: "open_hackathons",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "StellarSwap",
    slug: "stellarswap",
    tagline: "Decentralized exchange with concentrated liquidity on Stellar",
    description:
      "StellarSwap is a next-generation decentralized exchange built on Soroban smart contracts. It features concentrated liquidity positions, allowing liquidity providers to allocate capital more efficiently within custom price ranges. The protocol supports multi-hop swaps, limit orders, and yield farming strategies.",
    category: "DeFi",
    status: "live",
    originType: "hackathon",
    primaryBuilder: builders[0],
    teamMembers: [
      { builder: builders[0], role: "Lead Developer" },
      { builder: builders[2], role: "Frontend Developer" },
    ],
    createdAt: "2024-08-01",
    launchDate: "2025-02-15",
    logoUrl: "",
    liveUrl: "https://stellarswap.io",
    githubUrl: "https://github.com/stellarswap/protocol",
    docsUrl: "https://docs.stellarswap.io",
    demoVideoUrl: null,
    techStack: ["Soroban", "Rust", "React", "TypeScript", "PostgreSQL"],
    isFeatured: true,
    approvalStatus: "approved",
    metrics: {
      tvl: 2400000,
      users: 1200,
      transactions: 45000,
    },
  },
  {
    id: "2",
    name: "LumenPay",
    slug: "lumenpay",
    tagline:
      "Cross-border payroll platform powered by Stellar for global teams",
    description:
      "LumenPay enables companies to pay their global workforce instantly and cheaply using Stellar's network. With support for 30+ fiat currencies and automatic conversion, LumenPay reduces the cost of international payroll by up to 80%. The platform handles compliance, tax reporting, and multi-currency disbursements.",
    category: "Payments",
    status: "live",
    originType: "grant",
    primaryBuilder: builders[3],
    teamMembers: [
      { builder: builders[3], role: "Lead Developer" },
      { builder: builders[4], role: "Backend Engineer" },
    ],
    createdAt: "2024-09-15",
    launchDate: "2025-04-01",
    logoUrl: "",
    liveUrl: "https://lumenpay.co",
    githubUrl: "https://github.com/lumenpay/platform",
    docsUrl: "https://docs.lumenpay.co",
    demoVideoUrl: null,
    techStack: ["Node.js", "Stellar SDK", "React", "PostgreSQL", "Redis"],
    isFeatured: true,
    approvalStatus: "approved",
    metrics: {
      users: 850,
      transactions: 22000,
    },
  },
  {
    id: "3",
    name: "SoroGuard",
    slug: "soroguard",
    tagline: "Automated security auditing toolkit for Soroban smart contracts",
    description:
      "SoroGuard provides automated security analysis for Soroban smart contracts. It detects common vulnerabilities including reentrancy, integer overflow, unauthorized access patterns, and unsafe storage operations. The toolkit integrates with CI/CD pipelines and provides detailed reports with remediation guidance.",
    category: "Infrastructure",
    status: "live",
    originType: "hackathon",
    primaryBuilder: builders[1],
    teamMembers: [{ builder: builders[1], role: "Lead Developer" }],
    createdAt: "2024-07-20",
    launchDate: "2025-01-10",
    logoUrl: "",
    liveUrl: "https://soroguard.dev",
    githubUrl: "https://github.com/soroguard/toolkit",
    docsUrl: "https://docs.soroguard.dev",
    demoVideoUrl: null,
    techStack: ["Rust", "Soroban", "WebAssembly", "TypeScript", "Docker"],
    isFeatured: true,
    approvalStatus: "approved",
    metrics: {
      users: 340,
      transactions: 8500,
    },
  },
  {
    id: "4",
    name: "NovaBridge",
    slug: "novabridge",
    tagline: "Trustless bridge connecting Stellar with Ethereum and Polygon",
    description:
      "NovaBridge is a cross-chain bridge that enables seamless asset transfers between Stellar, Ethereum, and Polygon. Using threshold signature schemes and decentralized relayers, NovaBridge provides trustless bridging without centralized custody. The bridge supports native tokens and wrapped assets.",
    category: "Infrastructure",
    status: "beta",
    originType: "grant",
    primaryBuilder: builders[5],
    teamMembers: [
      { builder: builders[5], role: "Protocol Engineer" },
      { builder: builders[0], role: "Smart Contract Developer" },
    ],
    createdAt: "2025-01-05",
    launchDate: null,
    logoUrl: "",
    liveUrl: "https://testnet.novabridge.xyz",
    githubUrl: "https://github.com/novabridge/protocol",
    docsUrl: null,
    demoVideoUrl: null,
    techStack: ["Soroban", "Solidity", "Rust", "Go", "React"],
    isFeatured: false,
    approvalStatus: "approved",
    metrics: {
      users: 120,
      transactions: 3200,
    },
  },
  {
    id: "5",
    name: "StellarKit",
    slug: "stellarkit",
    tagline:
      "Open-source developer toolkit for rapid Stellar app development",
    description:
      "StellarKit is a comprehensive developer toolkit that accelerates building on Stellar. It includes pre-built UI components, smart contract templates, testing utilities, and deployment scripts. StellarKit integrates with popular frameworks like Next.js and supports both Soroban and classic Stellar operations.",
    category: "Infrastructure",
    status: "live",
    originType: "bounty",
    primaryBuilder: builders[4],
    teamMembers: [{ builder: builders[4], role: "Lead Developer" }],
    createdAt: "2025-03-01",
    launchDate: "2025-08-15",
    logoUrl: "",
    liveUrl: "https://stellarkit.dev",
    githubUrl: "https://github.com/stellarkit/toolkit",
    docsUrl: "https://docs.stellarkit.dev",
    demoVideoUrl: null,
    techStack: ["TypeScript", "React", "Stellar SDK", "Soroban"],
    isFeatured: false,
    approvalStatus: "approved",
    metrics: {
      users: 560,
    },
  },
  {
    id: "6",
    name: "LumenLend",
    slug: "lumenlend",
    tagline: "Peer-to-peer lending protocol with dynamic interest rates",
    description:
      "LumenLend is a decentralized lending protocol on Stellar that enables peer-to-peer borrowing and lending with algorithmic interest rates. The protocol features over-collateralized loans, liquidation mechanisms, and governance token distribution to active participants.",
    category: "DeFi",
    status: "beta",
    originType: "hackathon",
    primaryBuilder: builders[1],
    teamMembers: [
      { builder: builders[1], role: "Protocol Designer" },
      { builder: builders[5], role: "Smart Contract Developer" },
    ],
    createdAt: "2025-05-10",
    launchDate: null,
    logoUrl: "",
    liveUrl: "https://testnet.lumenlend.fi",
    githubUrl: "https://github.com/lumenlend/protocol",
    docsUrl: null,
    demoVideoUrl: null,
    techStack: ["Soroban", "Rust", "React", "TypeScript"],
    isFeatured: false,
    approvalStatus: "approved",
    metrics: {
      tvl: 180000,
      users: 95,
    },
  },
  {
    id: "7",
    name: "AnchorUI",
    slug: "anchorui",
    tagline: "Beautiful component library for Stellar-powered applications",
    description:
      "AnchorUI provides a complete set of ready-to-use React components designed specifically for Stellar applications. From wallet connection dialogs to transaction builders and asset displays, AnchorUI handles the complex UI patterns so developers can focus on their product logic.",
    category: "Infrastructure",
    status: "in_development",
    originType: "manual",
    primaryBuilder: builders[2],
    teamMembers: [{ builder: builders[2], role: "Lead Designer & Developer" }],
    createdAt: "2025-09-01",
    launchDate: null,
    logoUrl: "",
    liveUrl: null,
    githubUrl: "https://github.com/anchorui/components",
    docsUrl: null,
    demoVideoUrl: null,
    techStack: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
    isFeatured: false,
    approvalStatus: "approved",
    metrics: {},
  },
  {
    id: "8",
    name: "StellarID",
    slug: "stellarid",
    tagline:
      "Decentralized identity and credential verification on Stellar",
    description:
      "StellarID provides a self-sovereign identity solution built on Stellar. Users can create verifiable credentials, manage their digital identity, and share proofs without revealing underlying data. The platform is designed for KYC compliance while preserving user privacy.",
    category: "Identity & Credentials",
    status: "in_development",
    originType: "crowdfunding",
    primaryBuilder: builders[3],
    teamMembers: [
      { builder: builders[3], role: "Lead Developer" },
      { builder: builders[2], role: "UI/UX Designer" },
    ],
    createdAt: "2025-11-01",
    launchDate: null,
    logoUrl: "",
    liveUrl: null,
    githubUrl: "https://github.com/stellarid/protocol",
    docsUrl: null,
    demoVideoUrl: null,
    techStack: ["Soroban", "Rust", "React", "Zero-Knowledge Proofs"],
    isFeatured: false,
    approvalStatus: "approved",
    metrics: {},
  },
];

export const categories = [
  "DeFi",
  "Payments",
  "Infrastructure",
  "NFTs & Gaming",
  "Social & Community",
  "Identity & Credentials",
  "Other",
];

export const platformStats = {
  totalBuilders: 247,
  totalProducts: 143,
  totalXlmEarned: 1_250_000,
  totalTvl: 12_500_000,
};

export function getBuilderByUsername(username: string): Builder | undefined {
  return builders.find((b) => b.username === username);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getTopBuilders(count: number = 6): Builder[] {
  return [...builders]
    .sort((a, b) => b.reputationScore - a.reputationScore)
    .slice(0, count);
}

export function getReputationLevelName(level: number): string {
  const names: Record<number, string> = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
    4: "Expert",
    5: "Master",
  };
  return names[level] || "Unknown";
}

export function getReputationLevelColor(level: number): string {
  const colors: Record<number, string> = {
    1: "text-gray-400",
    2: "text-blue-400",
    3: "text-purple-400",
    4: "text-amber-400",
    5: "text-red-400",
  };
  return colors[level] || "text-gray-400";
}

export function getStatusColor(status: ProductStatus): string {
  const colors: Record<ProductStatus, string> = {
    live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    beta: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    in_development: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    archived: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  };
  return colors[status];
}

export function getStatusLabel(status: ProductStatus): string {
  const labels: Record<ProductStatus, string> = {
    live: "Live",
    beta: "Beta",
    in_development: "In Development",
    archived: "Archived",
  };
  return labels[status];
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}
