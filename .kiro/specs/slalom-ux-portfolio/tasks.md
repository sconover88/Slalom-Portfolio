# Implementation Plan: Slalom UX Portfolio

## Overview

Build a statically generated UX portfolio website for Scott Conover using Next.js (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui. The site renders project case studies from markdown files, follows the "Playful Geometric" design system, and deploys to Vercel. Implementation proceeds incrementally: project scaffolding → content layer → shared components → pages → styling/animation → documentation.

## Tasks

- [x] 1. Initialize Next.js project and configure tooling
  - [x] 1.1 Scaffold Next.js project with TypeScript and App Router
    - Run `npx create-next-app@latest` with TypeScript, Tailwind CSS v4, App Router, and `src/` disabled
    - Ensure `tsconfig.json`, `next.config.ts`, and `package.json` are properly configured
    - _Requirements: 8.1, 8.4_

  - [x] 1.2 Install dependencies
    - Install `gray-matter`, `react-markdown`, `lucide-react`
    - Install dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `fast-check`
    - _Requirements: 5.2, 5.3_

  - [x] 1.3 Initialize shadcn/ui
    - Run `npx shadcn@latest init` and configure for Tailwind CSS v4
    - Add Button and Card components via `npx shadcn@latest add button card`
    - _Requirements: 5.3_

  - [x] 1.4 Configure Tailwind CSS v4 theme with Playful Geometric design tokens
    - Define all color tokens (background, foreground, accent, secondary, tertiary, quaternary, etc.) in the `tailwind.css` `@theme` block
    - Define radius tokens (sm, md, lg, full), shadow tokens (pop, pop-hover, pop-active, card, card-featured), and font-family tokens (heading, body)
    - Reference `content/styling-prompt.md` for exact values
    - _Requirements: 5.1, 5.2, 5.4_

  - [x] 1.5 Configure Google Fonts via next/font
    - Set up Outfit (weights 700, 800) and Plus Jakarta Sans (weights 400, 500) using `next/font/google`
    - Export font class names for use in the root layout
    - _Requirements: 5.2, 5.4_

  - [x] 1.6 Set up Vitest configuration
    - Create `vitest.config.ts` with jsdom environment, path aliases matching `tsconfig.json`, and setup file for `@testing-library/jest-dom`
    - Add `test` script to `package.json`
    - _Requirements: (testing infrastructure)_

- [x] 2. Create TypeScript interfaces and site configuration
  - [x] 2.1 Define TypeScript interfaces
    - Create `lib/types.ts` with `ProjectData` and `AboutData` interfaces matching the design document schemas
    - Include all frontmatter fields: slug, title, description, thumbnail, role, tools, methods, problem, order, date, images, body
    - _Requirements: 3.2, 4.1_

  - [x] 2.2 Create site configuration
    - Create `lib/config.ts` with `siteConfig` object containing site name, description, deckUrl (placeholder), and attribution text
    - _Requirements: 1.4, 1.6, 6.3, 6.5_

- [x] 3. Implement content data layer
  - [x] 3.1 Implement project content utilities
    - Create `lib/projects.ts` with `getAllProjects()`, `getProjectBySlug()`, and `getAllProjectSlugs()` functions
    - Use `gray-matter` to parse frontmatter from `content/projects/*.md` files
    - Sort projects by `order` field ascending
    - Handle missing optional frontmatter fields gracefully with sensible defaults (slug as title, empty strings, empty arrays)
    - _Requirements: 3.1, 3.4, 3.6, 10.1, 10.3_

  - [x] 3.2 Implement about page content utility
    - Create `lib/about.ts` with `getAboutContent()` function
    - Parse `content/about.md` using `gray-matter` to extract bio, skills, tools, and methods
    - _Requirements: 2.6_

  - [x]* 3.3 Write property tests for content data layer
    - **Property 2: Markdown files map one-to-one to project entries**
    - Generate random sets of frontmatter objects, serialize as markdown strings, pass through parsing logic, assert count and slug matching
    - **Validates: Requirements 3.1, 10.1**

  - [x]* 3.4 Write property test for sort order
    - **Property 6: Projects sorted by order field**
    - Generate random arrays of ProjectData with random order values, pass through sorting, assert ascending order
    - **Validates: Requirements 10.3**

  - [x]* 3.5 Write property test for graceful missing fields
    - **Property 5: Graceful handling of missing frontmatter fields**
    - Generate random frontmatter with random subsets of fields omitted, pass through parser, assert no errors and available fields present
    - **Validates: Requirements 3.6**

- [x] 4. Checkpoint — Verify content layer
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Create content files and templates
  - [x] 5.1 Create project markdown template
    - Create `content/projects/_template.md` with all frontmatter fields, placeholder content, and inline comments explaining each section
    - Include sections for Process, Deliverables, and Metrics & Impact
    - _Requirements: 4.1, 4.2_

  - [x] 5.2 Create two placeholder project files
    - Create `content/projects/project-one.md` and `content/projects/project-two.md` with realistic placeholder content
    - Include sample frontmatter with title, description, thumbnail, role, tools, methods, problem, order, date, and images fields
    - _Requirements: 3.5_

  - [x] 5.3 Create about page content file
    - Create `content/about.md` with frontmatter containing bio, skills, tools, and methods arrays with placeholder content
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 5.4 Add placeholder images
    - Create placeholder SVG images in `public/images/` for project thumbnails and project content images referenced in the markdown files
    - _Requirements: 4.3_

- [x] 6. Build shared UI components
  - [x] 6.1 Create DecorativeShapes component
    - Create `components/decorative-shapes.tsx` with absolutely-positioned SVG shapes (circles, triangles, squiggles)
    - Support `variant` prop for "hero", "section", and "footer" arrangements
    - Use confetti color palette (violet, pink, yellow, emerald) rotationally
    - Hide on mobile with responsive classes to prevent overlap
    - _Requirements: 5.4, 7.1_

  - [x] 6.2 Create SectionDivider component
    - Create `components/section-divider.tsx` with a squiggly SVG line divider
    - Support optional color override prop, default to border color
    - _Requirements: 5.4_

  - [x] 6.3 Create ProjectImage component
    - Create `components/project-image.tsx` wrapping Next.js `<Image>` with blob-radius mask, optional hard shadow, and decorative dot-grid pattern
    - Support `variant` prop for "blob", "rounded", and "default" shapes
    - Resolve image filenames to `/images/` directory path
    - Include descriptive `alt` text prop (required)
    - _Requirements: 3.3, 4.4, 4.5, 7.4_

  - [x] 6.4 Create MarkdownRenderer component
    - Create `components/markdown-renderer.tsx` using `react-markdown` with custom component overrides
    - Apply Outfit headings, Plus Jakarta Sans body text
    - Style blockquotes with colored left borders
    - Override image rendering to resolve filenames from `/images/` with blob-radius masks and non-empty alt text
    - _Requirements: 3.2, 3.3, 3.6, 7.4_

  - [x]* 6.5 Write property test for image path resolution
    - **Property 4: Image references resolve to correct paths with alt text**
    - Generate random image filenames, pass markdown with image references through MarkdownRenderer, assert src starts with `/images/` and alt is non-empty
    - **Validates: Requirements 3.3, 7.4**

  - [x] 6.6 Create ProjectCard component
    - Create `components/project-card.tsx` with "Sticker" card styling: white bg, 2px dark border, rounded-xl, 8px hard shadow
    - Implement hover animation: rotate -1deg, scale 1.02 with bouncy cubic-bezier easing
    - Accept `index` prop for rotating accent colors across cards
    - Link entire card to `/projects/[slug]` using Next.js Link
    - Display thumbnail via ProjectImage, title in Outfit bold, description in Plus Jakarta Sans
    - _Requirements: 1.2, 1.3, 5.4_

  - [x]* 6.7 Write property test for ProjectCard frontmatter display
    - **Property 1: Project card displays frontmatter fields**
    - Generate random ProjectData objects, render ProjectCard, assert output contains title, description, and thumbnail reference
    - **Validates: Requirements 1.2**

  - [x] 6.8 Create CTABanner component
    - Create `components/cta-banner.tsx` with "Candy Button" styling: accent violet bg, white text, pill shape, 2px dark border, hard shadow
    - Implement bouncy hover animation (translate + shadow extension)
    - Link opens external URL in new tab with `target="_blank"` and `rel="noopener noreferrer"`
    - Add decorative floating shapes behind the CTA
    - _Requirements: 1.4, 1.5_

  - [x] 6.9 Create HeaderNav component
    - Create `components/header-nav.tsx` with warm cream background and 2px bottom border
    - Include links to Home ("/") and About ("/about") using Next.js Link for client-side navigation
    - Include external deck link styled as "Candy Button" with `target="_blank"`
    - Display "Scott Conover" in Outfit bold font
    - Implement responsive hamburger menu on mobile with slide-in panel
    - Use semantic `<nav>` element and proper ARIA attributes for accessibility
    - _Requirements: 1.6, 6.1, 6.2, 6.3, 6.6, 7.5, 7.6_

  - [x] 6.10 Create Footer component
    - Create `components/footer.tsx` with SectionDivider squiggly line above, attribution text from siteConfig
    - Use muted background with foreground text
    - Use semantic `<footer>` element
    - _Requirements: 6.5, 7.6_

- [x] 7. Checkpoint — Verify shared components
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Build page components
  - [x] 8.1 Create root layout
    - Create `app/layout.tsx` with HeaderNav, Footer, and global font/style setup
    - Apply Outfit and Plus Jakarta Sans font classes to the document
    - Set warm cream (#FFFDF5) background on body
    - Use semantic HTML structure: `<header>`, `<main>`, `<footer>`
    - Include site metadata (title, description) from siteConfig
    - _Requirements: 6.1, 6.5, 7.6, 8.4_

  - [x] 8.2 Create Home page
    - Create `app/page.tsx` as a Server Component calling `getAllProjects()`
    - Render hero section with Outfit ExtraBold heading and decorative floating shapes
    - Render CTABanner linking to external deck
    - Render responsive project card grid: 3 columns desktop, 2 tablet, 1 mobile
    - Pass rotating index to each ProjectCard for accent color variation
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.7, 7.1_

  - [x] 8.3 Create About page
    - Create `app/about/page.tsx` as a Server Component calling `getAboutContent()`
    - Render bio section with large Outfit heading and Plus Jakarta Sans body
    - Render skills, tools, and methods as pill-shaped tags with rotating confetti colors and hard shadows
    - Add decorative background shapes
    - Ensure no form elements, contact forms, or download links are present
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 8.4 Create dynamic Project page
    - Create `app/projects/[slug]/page.tsx` as a Server Component
    - Implement `generateStaticParams()` using `getAllProjectSlugs()` for static generation
    - Call `getProjectBySlug(slug)` to get project data
    - Render project title, description, role, tools, methods, problem statement from frontmatter
    - Render markdown body via MarkdownRenderer
    - Display project images via ProjectImage component
    - Provide navigation back to Home page
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 6.4, 10.1_

  - [x]* 8.5 Write property test for project page frontmatter rendering
    - **Property 3: Project page renders all available frontmatter sections**
    - Generate random complete ProjectData objects, render project page sections, assert all frontmatter fields appear in output
    - **Validates: Requirements 3.2**

- [x] 9. Apply Playful Geometric styling and animations
  - [x] 9.1 Apply global animation utilities
    - Add bouncy cubic-bezier transition utility classes in tailwind.css
    - Add `prefers-reduced-motion` media query to disable bounce, wiggle, and pop animations
    - Add wiggle keyframe animation for icon hover effects
    - _Requirements: 5.4, 7.2_

  - [x] 9.2 Style all components with Playful Geometric system
    - Apply "Candy Button" styling to all primary buttons (pill, hard shadow, bouncy hover/active states)
    - Apply "Sticker" card styling to all cards (border, hard shadow, wiggle hover)
    - Apply Lucide React icons with 2.5px stroke width enclosed in colored shapes throughout
    - Ensure responsive shadow reduction on mobile (8px → 2px)
    - _Requirements: 5.2, 5.3, 5.4, 7.1, 7.2_

  - [x] 9.3 Verify accessibility requirements
    - Ensure WCAG 2.1 Level AA color contrast for all text on background combinations
    - Verify all interactive elements are keyboard-focusable with visible focus states (thick colored border + hard shadow)
    - Verify all images have descriptive alt text
    - Verify semantic HTML elements are used throughout (nav, main, article, section, header, footer)
    - _Requirements: 7.3, 7.4, 7.5, 7.6_

- [x] 10. Checkpoint — Verify pages and styling
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Create non-developer documentation
  - [x] 11.1 Write comprehensive README
    - Explain the purpose and goals of the portfolio site
    - Describe the architecture and tech stack in non-technical language
    - Provide step-by-step instructions for adding a new project (create markdown from template, add images, request AI build)
    - Provide instructions for updating the styling prompt file and requesting a styling refresh
    - Provide instructions for deploying updates via GitHub-to-Vercel pipeline
    - Include a folder structure section with descriptions of each file and folder in the content directory
    - Use plain language throughout, avoid technical jargon
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [x] 12. Final build verification
  - [x] 12.1 Run full build and verify static generation
    - Run `next build` and verify it completes without errors
    - Verify static HTML files are generated for all expected routes: `/`, `/about`, `/projects/project-one`, `/projects/project-two`
    - Verify no runtime database or server dependencies are required
    - _Requirements: 8.1, 8.4, 10.1, 10.4_

  - [x]* 12.2 Write integration tests
    - Verify Next.js Link component is used for all internal navigation (client-side transitions)
    - Verify Next.js Image component is used for all project images
    - Verify external deck link has `target="_blank"` attribute
    - _Requirements: 6.6, 4.5, 1.5_

- [x] 13. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation throughout the build
- Property tests validate universal correctness properties from the design document
- The site uses TypeScript throughout — all components, utilities, and configuration files
- All styling follows the Playful Geometric design system defined in `content/styling-prompt.md`
- The `content/styling-prompt.md` file is not consumed by the build — it's a reference for the AI assistant
