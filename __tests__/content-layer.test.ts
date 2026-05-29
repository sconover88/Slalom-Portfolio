import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import matter from "gray-matter";
import {
  mapFrontmatterToProject,
  sortProjectsByOrder,
} from "@/lib/projects";
import type { ProjectData } from "@/lib/types";

// ---------------------------------------------------------------------------
// Arbitraries (generators)
// ---------------------------------------------------------------------------

/** Generates a valid slug string (lowercase alphanumeric with hyphens). */
const slugArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,20}[a-z0-9]$/);

/** Generates a non-empty printable string (for titles, descriptions, etc.). */
const nonEmptyStringArb = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,40}$/);

/** Generates a list of non-empty strings (for tools, methods, images). */
const stringListArb = fc.array(nonEmptyStringArb, { minLength: 0, maxLength: 5 });

/** Generates a complete frontmatter data object with all fields present. */
const fullFrontmatterArb = fc.record({
  title: nonEmptyStringArb,
  description: nonEmptyStringArb,
  thumbnail: nonEmptyStringArb,
  role: nonEmptyStringArb,
  tools: stringListArb,
  methods: stringListArb,
  problem: nonEmptyStringArb,
  order: fc.integer({ min: -1000, max: 1000 }),
  date: fc.date({ min: new Date("2000-01-01"), max: new Date("2030-12-31") }).map(
    (d) => d.toISOString().slice(0, 10)
  ),
  images: stringListArb,
});

/** Generates a markdown body string. */
const bodyArb = fc.stringMatching(/^[A-Za-z0-9 .,!?\n]{0,100}$/);

// ---------------------------------------------------------------------------
// Property 2: Markdown files map one-to-one to project entries
// Validates: Requirements 3.1, 10.1
// ---------------------------------------------------------------------------

describe("Feature: slalom-ux-portfolio, Property 2: Markdown files map one-to-one to project entries", () => {
  it("each frontmatter object produces exactly one ProjectData entry with matching slug", () => {
    /**
     * **Validates: Requirements 3.1, 10.1**
     *
     * Strategy: Generate a random set of (slug, frontmatter, body) tuples,
     * serialize each as a markdown string with YAML frontmatter, parse with
     * gray-matter, then map through mapFrontmatterToProject. Assert:
     *   - The count of returned entries equals the count of inputs
     *   - Each entry's slug matches the corresponding input slug
     */
    fc.assert(
      fc.property(
        fc.array(
          fc.tuple(slugArb, fullFrontmatterArb, bodyArb),
          { minLength: 0, maxLength: 10 }
        ),
        (entries) => {
          // Deduplicate slugs to simulate unique filenames
          const seen = new Set<string>();
          const unique = entries.filter(([slug]) => {
            if (seen.has(slug)) return false;
            seen.add(slug);
            return true;
          });

          // Serialize each entry as a markdown string, parse, and map
          const projects = unique.map(([slug, frontmatterData, body]) => {
            // Build YAML frontmatter manually to avoid gray-matter stringify issues
            const yamlLines = ["---"];
            for (const [key, value] of Object.entries(frontmatterData)) {
              if (Array.isArray(value)) {
                yamlLines.push(`${key}:`);
                for (const item of value) {
                  yamlLines.push(`  - "${item}"`);
                }
              } else {
                yamlLines.push(`${key}: "${value}"`);
              }
            }
            yamlLines.push("---");
            yamlLines.push(body);
            const mdString = yamlLines.join("\n");

            const { data, content } = matter(mdString);
            return mapFrontmatterToProject(slug, data, content);
          });

          // Assert count matches
          expect(projects.length).toBe(unique.length);

          // Assert each slug matches
          unique.forEach(([slug], i) => {
            expect(projects[i].slug).toBe(slug);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 6: Projects sorted by order field
// Validates: Requirements 10.3
// ---------------------------------------------------------------------------

describe("Feature: slalom-ux-portfolio, Property 6: Projects sorted by order field", () => {
  it("sortProjectsByOrder returns projects in ascending order", () => {
    /**
     * **Validates: Requirements 10.3**
     *
     * Strategy: Generate a random array of ProjectData-like objects with
     * random order values. Pass through sortProjectsByOrder. Assert the
     * result is sorted in ascending order by the order field.
     */

    /** Generates a minimal ProjectData with a random order value. */
    const projectWithOrderArb = fc
      .tuple(slugArb, fc.integer({ min: -10000, max: 10000 }))
      .map(
        ([slug, order]): ProjectData => ({
          slug,
          title: slug,
          description: "",
          thumbnail: "",
          role: "",
          tools: [],
          methods: [],
          problem: "",
          order,
          date: "",
          images: [],
          body: "",
        })
      );

    fc.assert(
      fc.property(
        fc.array(projectWithOrderArb, { minLength: 0, maxLength: 20 }),
        (projects) => {
          const sorted = sortProjectsByOrder(projects);

          // Length preserved
          expect(sorted.length).toBe(projects.length);

          // Ascending order
          for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].order).toBeGreaterThanOrEqual(sorted[i - 1].order);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 5: Graceful handling of missing frontmatter fields
// Validates: Requirements 3.6
// ---------------------------------------------------------------------------

describe("Feature: slalom-ux-portfolio, Property 5: Graceful handling of missing frontmatter fields", () => {
  it("missing frontmatter fields do not throw and available fields are present", () => {
    /**
     * **Validates: Requirements 3.6**
     *
     * Strategy: Generate a full frontmatter object, then randomly omit a
     * subset of fields. Pass the partial frontmatter through
     * mapFrontmatterToProject. Assert:
     *   - No error is thrown
     *   - Fields that were provided are present in the result
     *   - Missing fields fall back to sensible defaults
     */

    const allFieldKeys = [
      "title",
      "description",
      "thumbnail",
      "role",
      "tools",
      "methods",
      "problem",
      "order",
      "date",
      "images",
    ] as const;

    const partialFrontmatterArb = fc
      .tuple(
        fullFrontmatterArb,
        fc.subarray([...allFieldKeys], { minLength: 0 })
      )
      .map(([full, keysToKeep]) => {
        const partial: Record<string, unknown> = {};
        for (const key of keysToKeep) {
          partial[key] = full[key];
        }
        return { full, partial, keptKeys: new Set(keysToKeep) };
      });

    fc.assert(
      fc.property(
        fc.tuple(slugArb, partialFrontmatterArb, bodyArb),
        ([slug, { partial, keptKeys }, body]) => {
          // Should not throw
          const project = mapFrontmatterToProject(slug, partial, body);

          // Slug is always set
          expect(project.slug).toBe(slug);

          // Body is always set
          expect(project.body).toBe(body);

          // Check kept fields are present with their provided values
          if (keptKeys.has("title")) {
            expect(project.title).toBe(partial.title);
          } else {
            // Falls back to slug
            expect(project.title).toBe(slug);
          }

          if (keptKeys.has("description")) {
            expect(project.description).toBe(partial.description);
          } else {
            expect(project.description).toBe("");
          }

          if (keptKeys.has("thumbnail")) {
            expect(project.thumbnail).toBe(partial.thumbnail);
          } else {
            expect(project.thumbnail).toBe("");
          }

          if (keptKeys.has("role")) {
            expect(project.role).toBe(partial.role);
          } else {
            expect(project.role).toBe("");
          }

          if (keptKeys.has("tools")) {
            expect(project.tools).toEqual(partial.tools);
          } else {
            expect(project.tools).toEqual([]);
          }

          if (keptKeys.has("methods")) {
            expect(project.methods).toEqual(partial.methods);
          } else {
            expect(project.methods).toEqual([]);
          }

          if (keptKeys.has("problem")) {
            expect(project.problem).toBe(partial.problem);
          } else {
            expect(project.problem).toBe("");
          }

          if (keptKeys.has("order")) {
            expect(project.order).toBe(partial.order);
          } else {
            expect(project.order).toBe(0);
          }

          if (keptKeys.has("date")) {
            expect(project.date).toBe(partial.date);
          } else {
            expect(project.date).toBe("");
          }

          if (keptKeys.has("images")) {
            expect(project.images).toEqual(partial.images);
          } else {
            expect(project.images).toEqual([]);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
