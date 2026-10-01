import tipsJson from "@/content/tips.json";
import eventsJson from "@/content/events.json";
import projectsJson from "@/content/projects.json";
import postsJson from "@/content/posts.json";
// Content layer. Every getter is async so it can later be backed by a CMS or database
// (Sanity, Strapi, Supabase, Prisma) without changing any page.
export type Service = { slug: string; title: string; items: string[] };
export type PathStep = { title: string; stage: "Foundation" | "Beginner" | "Intermediate" | "Advanced" | "Project" };
export type LearnPath = { slug: string; title: string; summary: string; steps: PathStep[] };
export type TechTip = { number: number; title: string; summary: string; example?: string; challenge?: string; next?: string };
export type EventItem = { code: string; title: string; date?: string; speaker?: string; learn?: string[]; audience?: string; status: "upcoming" | "past" };
export type ProjectItem = { slug: string; image?: string; title: string; kind: "Client" | "Demo" | "Experiment" | "Community"; problem: string; solution: string; tech: string[]; status: string; date: string };
export type Post = { slug: string; summary?: string; image?: string; imageAlt?: string; title: string; category: string; author: string; date: string; readMins: number; body: string };

export const nav = ["about", "services", "learn", "d3s", "projects", "blog", "community", "contact"] as const;

const services: Service[] = [
  { slug: "networking", title: "Networking & IT Infrastructure", items: ["Network design", "Installation", "Router & switch configuration", "Wi-Fi deployment", "LAN/WAN", "Structured cabling", "Fibre networking", "Troubleshooting"] },
  { slug: "wireless", title: "Wireless & Connectivity", items: ["Wireless setup", "Point-to-point links", "Wi-Fi optimization", "Starlink setup", "Internet connectivity"] },
  { slug: "web", title: "Web & Digital Solutions", items: ["Website development", "Business websites", "Landing pages", "Web applications"] },
  { slug: "ai", title: "AI & Automation", items: ["AI solutions", "Workflow automation", "Business process automation", "AI productivity systems"] },
  { slug: "security", title: "Cybersecurity", items: ["Security awareness", "Basic security assessment", "Network security", "Best practices"] },
  { slug: "iot", title: "IoT & Smart Technology", items: ["IoT prototypes", "Smart systems", "Sensors", "Embedded technology"] },
  { slug: "installations", title: "Technical Installations", items: ["CCTV", "Access control", "IT equipment setup", "Device configuration"] },
  { slug: "solar", title: "Solar & Power Solutions", items: ["Solar installation", "Inverter systems", "Backup power"] },
  { slug: "electrical", title: "Electrical Installation", items: ["Electrical installation", "Electrical setup"] },
];
const names = ["What is Networking?", "Types of Networks", "Network Devices", "IP Addresses", "MAC Addresses", "DHCP", "DNS", "Default Gateway", "Subnetting", "Switching", "VLANs", "Routing", "Wireless Networking", "Network Security", "Troubleshooting", "Practical Network Project"];
const stageFor = (i: number): PathStep["stage"] => (i < 3 ? "Foundation" : i < 8 ? "Beginner" : i < 12 ? "Intermediate" : i < 15 ? "Advanced" : "Project");
const paths: LearnPath[] = [
  { slug: "networking", title: "Networking", summary: "From what a network is to building one.", steps: names.map((title, i) => ({ title, stage: stageFor(i) })) },
  ...["Cybersecurity", "AI", "Web Technology", "Linux & Systems", "IoT & Embedded Systems", "Digital Skills"].map((title) => ({ slug: title.toLowerCase().replace(/[^a-z]+/g, "-"), title, summary: "Path outline coming soon.", steps: [] })),
];
const tips = tipsJson as TechTip[]; // edited in /admin (content/tips.json)
const events = eventsJson as EventItem[];
const projects = projectsJson as ProjectItem[]; // never add placeholder projects
const posts = postsJson as Post[];

export const getServices = async () => services;
export const getPaths = async () => paths;
export const getPath = async (slug: string) => paths.find((p) => p.slug === slug);
export const getTips = async () => tips;
export const getEvents = async () => events;
export const getProjects = async () => projects;
export const getPosts = async () => posts;
