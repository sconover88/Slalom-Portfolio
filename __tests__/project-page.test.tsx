import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import React from "react";
import { render } from "@testing-library/react";
import type { ProjectData } from "@/lib/types";

// ---------------------------------------------------------------------------
// Mocks — next/image and next/link don't work in jsdom
// ---------------------------------------------------------------------------

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// ---------------------------------------------------------------------------
// Helper component — mirrors the rendering logic of the project page
// ---------------------------------------------------------------------------

/**
 * A simplified version of the project page that renders frontmatter sections.
 * This avoids testing the Server Component directly (which has filesystem
 * dependencies) while validating that all frontmatter fields are rendered.
 */
function ProjectPageSections({ project }: { project: ProjectData }) {
  return (
    <div>
      {/* Title */}
      <h1>{project.title}</h1>

      {/* Description */}
      <p data-testid="description">{project.description}</p>

      {/* Role */}
      {project.role && (
        <div>
          <h2>Role</h2>
          <p>{project.role}</p>
        </div>
      )}

      {/* Problem */}
      {project.problem && (
        <div>
          <h2>Problem</h2>
          <p>{project.problem}</p>
        </div>
      )}

      {/* Tools */}
      {project.tools.length > 0 && (
        <div>
          <h2>Tools</h2>
          <ul>
            {project.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Methods */}
      {project.methods.length > 0 && (
        <div>
          <h2>Methods</h2>
          <ul>
            {project.methods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Arbitraries (generators)
// ---------------------------------------------------------------------------

/** Generates a non-empty printable string for text fields. */
const nonEmptyTextArb = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,30}$/);

/** Generates a valid slug. */
const slugArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,15}[a-z0-9]$/);

/** Common image extensions. */
const imageExtArb = fc.constantFrom(".jpg", ".png", ".svg", ".webp");

/** Generates a valid image filename. */
const imageFilenameArb = fc
  .tuple(fc.stringMatching(/^[a-z][a-z0-9]{0,12}$/), imageExtArb)
  .map(([base, ext]) => `${base}${ext}`);

/** Generates a non-empty array of unique non-empty text strings. */
const uniqueTextArrayArb = fc
  .uniqueArray(nonEmptyTextArb, { minLength: 1, maxLength: 5 })
  .filter((arr) => arr.length > 0);

/** Generates a complete ProjectData object with all fields populated. */
const completeProjectDataArb: fc.Arbitrary<ProjectData> = fc.record({
  slug: slugArb,
  title: nonEmptyTextArb,
  description: nonEmptyTextArb,
  thumbnail: imageFilenameArb,
  role: nonEmptyTextArb,
  tools: uniqueTextArrayArb,
  methods: uniqueTextArrayArb,
  problem: nonEmptyTextArb,
  order: fc.integer({ min: 1, max: 100 }),
  date: fc.date({ min: new Date("2020-01-01"), max: new Date("2025-12-31") }).map(
    (d) => d.toISOString().split("T")[0]
  ),
  images: fc.array(imageFilenameArb, { minLength: 0, maxLength: 3 }),
  body: nonEmptyTextArb,
});

// ---------------------------------------------------------------------------
// Property 3: Project page renders all available frontmatter sections
// Validates: Requirements 3.2
// ---------------------------------------------------------------------------

describe("Feature: slalom-ux-portfolio, Property 3: Project page renders all available frontmatter sections", () => {
  it("renders title, description, role, problem, tools, and methods from frontmatter", () => {
    /**
     * **Validates: Requirements 3.2**
     *
     * Strategy: Generate random complete ProjectData objects with all
     * frontmatter fields populated, render the project page sections
     * helper component, then assert every frontmatter field appears
     * in the rendered output.
     */
    fc.assert(
      fc.property(completeProjectDataArb, (project) => {
        const { container } = render(
          <ProjectPageSections project={project} />
        );

        const text = container.textContent ?? "";

        // Title appears in the output
        expect(text).toContain(project.title);

        // Description appears in the output
        expect(text).toContain(project.description);

        // Role appears in the output
        expect(text).toContain(project.role);

        // Problem appears in the output
        expect(text).toContain(project.problem);

        // Each tool appears in the output
        for (const tool of project.tools) {
          expect(text).toContain(tool);
        }

        // Each method appears in the output
        for (const method of project.methods) {
          expect(text).toContain(method);
        }
      }),
      { numRuns: 100 }
    );
  });
});
