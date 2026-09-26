// Every fact the page shows lives here, so the run header, each suite, and
// the command console count and quote the same source. Nothing in this file
// is decorative: if it isn't true, it doesn't go in.

export type Status = "passed" | "skipped";

export interface HeadlineAssertion {
  /** Rendered at livery scale; kept short so it never wraps. */
  numeral: string;
  /** Screen-reader phrasing of the numeral. */
  numeralLabel: string;
  claim: string;
  source: string;
  /** In-page anchor to where the evidence is shown in full. */
  evidence: string;
}

export const HEADLINE_ASSERTIONS: HeadlineAssertion[] = [
  {
    numeral: "3",
    numeralLabel: "3",
    claim: "Live products built end to end and deployed: MedVault, Canopy and NexDev.",
    source: "Work, 2026",
    evidence: "#work",
  },
  {
    numeral: "10",
    numeralLabel: "10",
    claim: "Languages Canopy parses in one pass to map a repository down to its call graph.",
    source: "Canopy, 2026",
    evidence: "#canopy",
  },
  {
    numeral: "96→2",
    numeralLabel: "96 to 2",
    claim: "Sequential API calls collapsed into batched queries on a 96-sample analysis page.",
    source: "Internship, 2026",
    evidence: "#trace",
  },
];

export const RUN_TAGS = ["@full-stack", "@ai-integration", "@sdet", "@open-source"];

export interface Project {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  tags: string[];
  area: string;
  dates: string;
  href: string;
  image: string;
  imageAlt: string;
  /** "contain" for screenshots whose shape isn't 16:10, so nothing is cropped away. */
  imageFit?: "cover" | "contain";
  live: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "medvault",
    title: "MedVault",
    summary: "A personal health vault that reads your lab reports back to you in plain language.",
    steps: [
      "Explains an uploaded lab-report PDF in plain language",
      "Answers follow-up questions and keeps private notes",
      "Runs Gemini behind a hard-coded JSON schema with explicit anti-diagnosis constraints",
      "Isolates every user's rows behind JWT auth in Django REST Framework",
    ],
    tags: ["Django", "PostgreSQL", "Gemini API", "React", "TypeScript"],
    area: "AI, health-tech",
    dates: "Feb – Aug 2026",
    href: "https://medvault-xor.vercel.app",
    image: "/work/medvault.webp",
    imageAlt: "MedVault dashboard showing lab report, analysis and note counts",
    imageFit: "contain",
    live: true,
  },
  {
    id: "canopy",
    title: "Canopy",
    summary: "Paste in a GitHub repo and get an explorable map of its architecture.",
    steps: [
      "Maps a repository into modules, files, classes and functions",
      "Shows each function's source alongside its callers and callees",
      "Parses 10 languages in one pass with tree-sitter",
      "Grounds the optional AI chat strictly in that repo's own call graph",
    ],
    tags: ["Python", "Django", "tree-sitter", "Gemini API"],
    area: "Dev tooling, AI",
    dates: "Aug – Sep 2026",
    href: "https://canopy-v7hb.onrender.com/analyze/",
    image: "/work/canopy.webp",
    imageAlt: "Canopy landing page: read the structure before you read the code",
    live: true,
  },
  {
    id: "nexdev",
    title: "NexDev",
    summary: "A course-selling platform with a RESTful Node and Express backend and a React frontend.",
    steps: [
      "Role-based JWT auth for admin and user roles",
      "Course creation and a working purchase flow",
      "Validates every request with Zod and hashes passwords with bcrypt",
      "Containerized with Docker and deployed on Vercel",
    ],
    tags: ["Node.js", "Express", "MongoDB", "Docker"],
    area: "Full stack",
    dates: "Apr – May 2026",
    href: "https://nex-m7gjfpkrv-adityamittal-dots-projects.vercel.app",
    image: "/work/nexdev.webp",
    imageAlt: "NexDev Academy landing page with course stats",
    live: true,
  },
  {
    id: "portfolio",
    title: "This portfolio",
    summary: "The page you are reading, built to be inspected like the rest of the work.",
    steps: [
      "Exports as static files served from a CDN, with no server to cold-start",
      "Opens a command console with / or Ctrl+K",
      "Holds WCAG AA contrast in both light and dark themes",
      "Respects reduced motion in every animation",
    ],
    tags: ["Next.js", "TypeScript", "React", "CSS Modules"],
    area: "Meta",
    dates: "Sep 2026",
    href: "https://github.com/adityamittal-dot/Portfolio",
    image: "/work/portfolio.webp",
    imageAlt: "This portfolio's run header: name, headline, run summary and headline results",
    live: false,
  },
];

export interface Role {
  id: string;
  company: string;
  role: string;
  location: string;
  industry: string;
  dates: string;
  stat: string | null;
  description: string;
  steps: string[];
}

export const ROLES: Role[] = [
  {
    id: "basepair",
    company: "Basepair",
    role: "SDET Intern",
    location: "Remote",
    industry: "Genomics and bioinformatics SaaS",
    dates: "Jun – Aug 2026",
    stat: "89 PRs across 7 repos",
    description:
      "Genomic-analysis platform and lab-report products: started on test authoring, moved into backend ownership.",
    steps: [
      "Built and migrated the Playwright E2E suite across 7 repositories.",
      "Resolved 100+ BLOCKER/HIGH SonarQube findings and wrote the team's first engineering-standards doc.",
      "Fixed a QuickBooks OAuth token-refresh race condition and a load-balancer file-storage bug in production.",
      "Cut a 96-sample analysis page from 96 sequential API calls to 2.",
    ],
  },
  {
    id: "spelll",
    company: "Spelll Production",
    role: "Frontend Intern",
    location: "Remote",
    industry: "Client services",
    dates: "Jun – Jul 2024",
    stat: null,
    description:
      "Owned client-facing marketing sites end to end, from first prototype to production deploy, working directly with clients on scope and revisions.",
    steps: [
      "Owned the full build lifecycle for multiple client marketing sites, from prototyping through production deployment.",
      "Built responsive, cross-browser interfaces in HTML5, SCSS and modern JavaScript against client-specific requirements.",
      "Acted as the direct point of contact with clients for scope, revisions and delivery.",
    ],
  },
];

export interface LabItem {
  name: string;
  description: string;
  image: string;
  href?: string;
  /** Why the entry is skipped; present only when there is nothing public to link. */
  skipReason?: string;
}

export const LAB: LabItem[] = [
  {
    name: "salvo-oss",
    description: "Zero-auth job discovery, fit-scoring and resume tailoring, open-sourced and customizable.",
    href: "https://github.com/adityamittal-dot/salvo-oss",
    image: "/lab/salvo-oss.webp",
  },
  {
    name: "dsa-sheet-cpp",
    description: "A 291-problem, 12-week DSA tracker with curated resources and per-problem notes.",
    href: "https://github.com/adityamittal-dot/DSA-Sheet-Cpp",
    image: "/lab/dsa-sheet-cpp.webp",
  },
  {
    name: "x-flow",
    description: "Turns real GitHub activity into build-in-public posts, drafted live and published via Buffer.",
    image: "/lab/x-flow.webp",
    skipReason: "no public repo yet",
  },
];

export interface EnvironmentRow {
  key: string;
  values: string[];
  /** Where this layer shows up in the work on this page: ids of projects or roles. */
  provenIn: string[];
}

export const ENVIRONMENT: EnvironmentRow[] = [
  { key: "frontend", values: ["React", "Next.js", "TypeScript", "shadcn/ui", "Tailwind", "EJS"], provenIn: ["medvault", "portfolio"] },
  { key: "backend", values: ["Django", "DRF", "Node/Express", "JWT", "OAuth 2.0", "Temporal"], provenIn: ["medvault", "canopy", "nexdev"] },
  {
    key: "ai integration",
    values: ["Gemini API", "Schema-constrained output", "Grounded chat", "Claude API", "Claude Code", "MCP"],
    provenIn: ["medvault", "canopy"],
  },
  { key: "languages", values: ["Python", "JavaScript (ES6+)", "TypeScript", "C/C++", "SQL", "HTML5", "CSS3/SCSS"], provenIn: ["canopy", "medvault", "dsa-sheet-cpp"] },
  { key: "databases", values: ["PostgreSQL", "MongoDB"], provenIn: ["medvault", "nexdev"] },
  { key: "testing", values: ["Playwright E2E", "Sentry", "Visual regression", "Test automation architecture"], provenIn: ["basepair"] },
  { key: "cloud", values: ["AWS S3", "Lambda", "RDS", "EC2", "IAM", "CloudWatch", "Vercel", "Kubernetes"], provenIn: ["nexdev", "medvault"] },
  {
    key: "aws, deeper",
    values: [
      "STS", "EKS", "ECS", "CloudFront", "SQS", "SNS", "DynamoDB", "API Gateway", "VPC", "ELB",
      "CloudFormation", "CDK", "Secrets Manager", "Parameter Store",
    ],
    provenIn: [],
  },
  {
    key: "devops",
    values: ["Docker", "Compose", "Terraform", "Git", "GitHub", "CI/CD", "npm workspaces", "Postman", "Linux/Bash"],
    provenIn: ["nexdev"],
  },
];

/** Display names for anything a stack row can point at. */
export function proofLabel(id: string): string {
  const project = PROJECTS.find((p) => p.id === id);
  if (project) return project.title;
  const role = ROLES.find((r) => r.id === id);
  if (role) return role.company;
  const lab = LAB.find((l) => l.name === id);
  return lab ? lab.name : id;
}

export const AI_PRACTICE: { title: string; body: string }[] = [
  {
    title: "Code review and debugging",
    body: "Reviewing diffs, tracing regressions and validating edge cases before merge.",
  },
  {
    title: "AI-native product development",
    body: "Building tools with LLMs as core infrastructure rather than a bolt-on feature.",
  },
  {
    title: "Workflow automation",
    body: "Scripting routine engineering tasks: test scaffolding, data validation, deploy checks.",
  },
  {
    title: "Prompt and context engineering",
    body: "Structuring prompts and tool integrations for reliable, repeatable output.",
  },
];

/** Every test case on the page, by suite; the run header and `test` command count these. */
export function runResults() {
  const suites = [
    { name: "work.spec", cases: PROJECTS.map((p) => ({ name: p.title, status: "passed" as Status })) },
    {
      name: "lab.spec",
      cases: LAB.map((l) => ({ name: l.name, status: (l.skipReason ? "skipped" : "passed") as Status })),
    },
    { name: "experience.spec", cases: ROLES.map((r) => ({ name: r.company, status: "passed" as Status })) },
  ];
  const all = suites.flatMap((s) => s.cases);
  return {
    suites,
    total: all.length,
    passed: all.filter((c) => c.status === "passed").length,
    skipped: all.filter((c) => c.status === "skipped").length,
  };
}
