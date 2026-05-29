export interface ProjectData {
  slug: string;           // Derived from filename (e.g., "project-one")
  title: string;          // Project title
  description: string;    // Brief description (shown on card)
  thumbnail: string;      // Thumbnail image filename
  role: string;           // Role and responsibilities
  tools: string[];        // Tools used
  methods: string[];      // UX methods applied
  problem: string;        // Problem statement / challenge
  order: number;          // Sort order for home page grid
  date: string;           // Project date (ISO format)
  images: string[];       // List of image filenames used in the project
  body: string;           // Raw markdown body (process, deliverables, metrics, etc.)
}

export interface AboutData {
  bio: string;            // Professional biography (markdown)
  skills: string[];       // List of UX skills
  tools: string[];        // List of tools
  methods: string[];      // List of UX methods and processes
}
