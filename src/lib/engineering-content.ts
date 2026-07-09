import type { LucideIcon } from "lucide-react";
import {
  Bot,
  CheckCircle,
  Code2,
  Eye,
  Hammer,
  Layers,
  Lightbulb,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const ENGINEERING_ACCENT = "#F97316";

export const ENGINEERING_PRINCIPLES = [
  {
    id: "transparency",
    title: "Transparency",
    description:
      "We make reasoning visible — assumptions stated, trade-offs explained, and decisions traceable to evidence.",
    icon: Eye,
  },
  {
    id: "evidence",
    title: "Evidence",
    description:
      "Claims earn trust through verification. We test ideas, measure outcomes, and let new evidence replace old assumptions.",
    icon: Search,
  },
  {
    id: "craftsmanship",
    title: "Craftsmanship",
    description:
      "We build with care — thoughtful architecture, deliberate code, and products shaped by people who stay close to the work.",
    icon: Hammer,
  },
  {
    id: "quality",
    title: "Quality",
    description:
      "Quality is embedded throughout delivery, not deferred to the end. Verification, discipline, and honest standards guide what ships.",
    icon: Sparkles,
  },
  {
    id: "continuous-learning",
    title: "Continuous Learning",
    description:
      "Every project teaches us something. We capture knowledge, refine practice, and carry forward what compounds across products.",
    icon: RefreshCw,
  },
  {
    id: "responsible-ai",
    title: "Responsible AI",
    description:
      "AI accelerates execution within clear boundaries — application owns decisions, models assist narrative, and guardrails stay explicit.",
    icon: Bot,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>;

export const ENGINEERING_BUILD_STEPS = [
  {
    id: "discovery",
    title: "Discovery",
    description: "Understand the problem, constraints, and evidence before committing to a direction.",
    icon: Search,
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "Design systems with clear ownership, sustainable boundaries, and room to evolve.",
    icon: Layers,
  },
  {
    id: "engineering",
    title: "Engineering",
    description: "Build incrementally — scoped work, disciplined execution, and production-minded craft.",
    icon: Code2,
  },
  {
    id: "verification",
    title: "Verification",
    description: "Validate through testing, review, and honest assessment of what is ready to ship.",
    icon: CheckCircle,
  },
  {
    id: "learning",
    title: "Learning",
    description: "Capture what worked, what failed, and what should inform the next iteration.",
    icon: Lightbulb,
  },
  {
    id: "continuous-improvement",
    title: "Continuous Improvement",
    description: "Refine standards, promote reusable patterns, and begin the next cycle stronger.",
    icon: TrendingUp,
  },
] as const;

/** Public-safe links only — no internal docs, workspace, or methodology gateways. */
export const ENGINEERING_RESOURCE_LINKS = [
  {
    title: "How We Engineer",
    description:
      "The public engineering journey — from discovery through verification and continuous improvement.",
    href: "#how-we-build",
  },
  {
    title: "Our Principles",
    description:
      "The values that shape every product: transparency, evidence, craftsmanship, quality, learning, and responsible AI.",
    href: "#principles",
  },
  {
    title: "Projects",
    description:
      "See how this approach shows up in products across fitness, education, and operations.",
    href: "/projects",
  },
  {
    title: "Get in Touch",
    description:
      "Talk with us about how Aredir Labs approaches engineering for your product.",
    href: "/contact",
  },
] as const;
