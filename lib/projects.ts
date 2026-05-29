import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ProjectData } from "@/lib/types";

const projectsDirectory = path.join(process.cwd(), "content", "projects");

/**
 * Maps raw gray-matter parsed data and body content into a ProjectData object.
 * Applies sensible defaults for missing fields.
 */
export function mapFrontmatterToProject(
  slug: string,
  data: Record<string, unknown>,
  content: string
): ProjectData {
  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || "",
    thumbnail: (data.thumbnail as string) || "",
    role: (data.role as string) || "",
    tools: Array.isArray(data.tools) ? data.tools : [],
    methods: Array.isArray(data.methods) ? data.methods : [],
    problem: (data.problem as string) || "",
    order: typeof data.order === "number" ? data.order : 0,
    date: (data.date as string) || "",
    images: Array.isArray(data.images) ? data.images : [],
    body: content,
  };
}

/**
 * Sorts an array of ProjectData by the order field in ascending order.
 */
export function sortProjectsByOrder(projects: ProjectData[]): ProjectData[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

/**
 * Reads all .md files from content/projects/ (excluding files starting with _),
 * parses frontmatter with gray-matter, and returns sorted by order field ascending.
 */
export function getAllProjects(): ProjectData[] {
  const filenames = fs.readdirSync(projectsDirectory);

  const projects = filenames
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(projectsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);

      return mapFrontmatterToProject(slug, data, content);
    });

  return sortProjectsByOrder(projects);
}

/**
 * Returns a single project by slug.
 */
export function getProjectBySlug(slug: string): ProjectData | undefined {
  const projects = getAllProjects();
  return projects.find((project) => project.slug === slug);
}

/**
 * Returns all slugs for generateStaticParams.
 */
export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug);
}
