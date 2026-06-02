export const siteConfig = {
  name: "Aredir Labs",
  tagline: "Independent software lab building focused SaaS products.",
  url: "https://aredirlabs.com",
  contactEmail: "hello@aredirlabs.com",
} as const;

export const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
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
      "AI-assisted training, nutrition, and wellness platform.",
    status: "Active Build",
    summary:
      "Practical tools for training, nutrition, and wellness workflows with AI-assisted guidance.",
  },
  {
    slug: "classforge",
    name: "ClassForge",
    description: "Educator workflow and lesson-planning toolkit.",
    status: "In Development",
    summary:
      "Lesson planning and classroom workflow tools built for educators who need clarity, not clutter.",
  },
  {
    slug: "leagueos",
    name: "LeagueOS",
    description:
      "Fantasy sports operations and league management platform.",
    status: "Concept",
    summary:
      "League operations and fantasy sports management for organizers who run real competitions.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
