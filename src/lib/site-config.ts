export const siteConfig = {
  name: "Aredir Labs",
  tagline:
    "Building intelligent software that helps people learn, perform, and make better decisions.",
  url: "https://aredirlabs.com",
  contactEmail: "info@aredirlabs.com",
} as const;

export const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/engineering", label: "Engineering" },
  { href: "/contact", label: "Contact" },
] as const;

export type ProjectStatus = "Active Build" | "In Development" | "Concept";

export type Project = {
  slug: string;
  name: string;
  description: string;
  status: ProjectStatus;
  summary?: string;
};

export const projects: Project[] = [
  {
    slug: "alignfit",
    name: "AlignFit",
    description:
      "AI-powered fitness, nutrition, recovery, and coaching platform.",
    status: "Active Build",
    summary:
      "An AI-powered platform for fitness, nutrition, recovery, and coaching—currently in active development and user acceptance testing.",
  },
  {
    slug: "classforge",
    name: "ClassForge",
    description:
      "AI-assisted education platform for lesson planning and educator productivity.",
    status: "In Development",
    summary:
      "AI-assisted lesson planning, educator productivity, and classroom preparation—built for educators who need clarity, not clutter.",
  },
  {
    slug: "leagueos",
    name: "LeagueOS",
    description:
      "Fantasy sports franchise management platform.",
    status: "Concept",
    summary:
      "A fantasy sports franchise management platform, currently in early-stage design and development.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
