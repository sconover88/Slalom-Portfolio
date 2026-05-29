import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

/**
 * Integration tests — source code analysis
 *
 * These tests read component source files and verify patterns
 * rather than rendering components. This avoids complex mocking.
 *
 * Validates: Requirements 6.6, 4.5, 1.5
 */

function readComponent(filePath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), filePath), "utf-8");
}

describe("Integration: Internal navigation uses Next.js Link", () => {
  const files = [
    "components/header-nav.tsx",
    "components/project-card.tsx",
    "app/projects/[slug]/page.tsx",
  ];

  it.each(files)("%s imports from next/link", (filePath) => {
    const source = readComponent(filePath);
    expect(source).toMatch(/import\s+.*from\s+["']next\/link["']/);
  });

  it.each(files)("%s uses <Link component", (filePath) => {
    const source = readComponent(filePath);
    expect(source).toContain("<Link");
  });
});

describe("Integration: Project images use Next.js Image", () => {
  const files = [
    "components/project-image.tsx",
    "components/markdown-renderer.tsx",
  ];

  it.each(files)("%s imports from next/image", (filePath) => {
    const source = readComponent(filePath);
    expect(source).toMatch(/import\s+.*from\s+["']next\/image["']/);
  });

  it.each(files)("%s uses <Image component", (filePath) => {
    const source = readComponent(filePath);
    expect(source).toContain("<Image");
  });
});

describe("Integration: External deck link opens in new tab", () => {
  const files = [
    "components/header-nav.tsx",
    "components/cta-banner.tsx",
  ];

  it.each(files)('%s contains target="_blank"', (filePath) => {
    const source = readComponent(filePath);
    expect(source).toContain('target="_blank"');
  });

  it.each(files)('%s contains rel="noopener noreferrer"', (filePath) => {
    const source = readComponent(filePath);
    expect(source).toContain('rel="noopener noreferrer"');
  });
});
