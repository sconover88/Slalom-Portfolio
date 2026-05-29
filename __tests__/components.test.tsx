import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import React from "react";
import { render, screen } from "@testing-library/react";

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
// Imports (after mocks)
// ---------------------------------------------------------------------------

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { ProjectCard } from "@/components/project-card";

// ---------------------------------------------------------------------------
// Arbitraries (generators)
// ---------------------------------------------------------------------------

/** Generates a safe alphanumeric base name (no special chars that break markdown). */
const alphanumBaseArb = fc.stringMatching(/^[a-z][a-z0-9]{0,15}$/);

/** Common image extensions. */
const imageExtArb = fc.constantFrom(".jpg", ".png", ".svg", ".webp", ".gif");

/** Generates a valid image filename like "photo123.jpg". */
const imageFilenameArb = fc
  .tuple(alphanumBaseArb, imageExtArb)
  .map(([base, ext]) => `${base}${ext}`);

/** Generates a non-empty printable string for text fields. */
const nonEmptyTextArb = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,30}$/);

/** Generates a valid slug. */
const slugArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,15}[a-z0-9]$/);

// ---------------------------------------------------------------------------
// Property 4: Image references resolve to correct paths with alt text
// Validates: Requirements 3.3, 7.4
// ---------------------------------------------------------------------------

describe("Feature: slalom-ux-portfolio, Property 4: Image references resolve to correct paths with alt text", () => {
  it("MarkdownRenderer resolves image filenames to /images/ paths with non-empty alt", () => {
    /**
     * **Validates: Requirements 3.3, 7.4**
     *
     * Strategy: Generate random image filenames and alt text, build a
     * markdown string with an image reference, render through
     * MarkdownRenderer, then assert the resulting <img> element has
     * src starting with "/images/" and a non-empty alt attribute.
     */
    fc.assert(
      fc.property(
        fc.tuple(imageFilenameArb, nonEmptyTextArb),
        ([filename, altText]) => {
          const markdown = `![${altText}](${filename})`;

          const { container } = render(
            <MarkdownRenderer content={markdown} />
          );

          const img = container.querySelector("img");
          expect(img).not.toBeNull();
          expect(img!.getAttribute("src")).toMatch(/^\/images\//);
          expect(img!.getAttribute("src")).toBe(`/images/${filename}`);
          expect(img!.getAttribute("alt")).toBeTruthy();
          expect(img!.getAttribute("alt")!.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 1: Project card displays frontmatter fields
// Validates: Requirements 1.2
// ---------------------------------------------------------------------------

describe("Feature: slalom-ux-portfolio, Property 1: Project card displays frontmatter fields", () => {
  it("ProjectCard renders title, description, and thumbnail reference", () => {
    /**
     * **Validates: Requirements 1.2**
     *
     * Strategy: Generate random ProjectData-like objects (title,
     * description, slug, thumbnail), render a ProjectCard, then assert
     * the output contains the title text, description text, and a
     * reference to the thumbnail filename in an image src.
     */
    fc.assert(
      fc.property(
        fc.record({
          slug: slugArb,
          title: nonEmptyTextArb,
          description: nonEmptyTextArb,
          thumbnail: imageFilenameArb,
          index: fc.integer({ min: 0, max: 20 }),
        }),
        ({ slug, title, description, thumbnail, index }) => {
          const { container } = render(
            <ProjectCard
              slug={slug}
              title={title}
              description={description}
              thumbnail={thumbnail}
              index={index}
            />
          );

          // Title is present in the rendered output
          expect(container.textContent).toContain(title);

          // Description is present in the rendered output
          expect(container.textContent).toContain(description);

          // Thumbnail is referenced in an img element's src
          const img = container.querySelector("img");
          expect(img).not.toBeNull();
          expect(img!.getAttribute("src")).toContain(thumbnail);
        }
      ),
      { numRuns: 100 }
    );
  });
});
