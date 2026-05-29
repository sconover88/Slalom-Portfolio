import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AboutData } from "@/lib/types";

const aboutFilePath = path.join(process.cwd(), "content", "about.md");

/**
 * Reads content/about.md, parses frontmatter with gray-matter,
 * and returns AboutData with sensible defaults for missing fields.
 */
export function getAboutContent(): AboutData {
  const fileContents = fs.readFileSync(aboutFilePath, "utf-8");
  const { data } = matter(fileContents);

  return {
    bio: data.bio || "",
    skills: Array.isArray(data.skills) ? data.skills : [],
    tools: Array.isArray(data.tools) ? data.tools : [],
    methods: Array.isArray(data.methods) ? data.methods : [],
  };
}
