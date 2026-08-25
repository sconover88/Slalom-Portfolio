# Portfolio Project Context

## Project Overview
This is Scott Conover's UX portfolio built with Next.js, Tailwind CSS v4, and shadcn/ui. It follows the "Corporate Trust" design system defined in `content/styling-prompt.md`.

## Working Preferences
- Scott is a non-developer UX designer. Keep explanations simple and action-oriented.
- When asked to restart the dev server, just do it immediately without extra commentary.
- When creating SVG graphics, use XML-safe entities (&#x201C; not &ldquo;) to avoid parsing errors.
- SVG graphics should match the Corporate Trust style: light slate backgrounds (#F8FAFC), indigo-tinted colored shadows, gradient accents (indigo-600 to violet-600), Plus Jakarta Sans for all text.
- When Scott pastes markdown content for a new project, format it properly with correct YAML frontmatter and drop it into `content/projects/`.
- Project images go in `public/images/`. Frame templates for Figma are in `public/images/frames/`.
- The site uses a zoomable image component for large artifacts like service design blueprints. Config is in the ZOOMABLE_IMAGES object in `components/markdown-renderer.tsx`.

## Content Structure
- Projects live in `content/projects/` as markdown files with YAML frontmatter.
- The `order` field in frontmatter controls home page display order.
- The `images` field in frontmatter is no longer used (was removed). Images are referenced inline in the markdown body.
- Custom SVG infographics are created for Metrics & Impact sections instead of bullet lists.
- The template file `content/projects/_template.md` exists but Scott prefers to paste content directly.

## Design Decisions Made
- Design system: Corporate Trust (indigo/violet gradients, colored shadows, elevated cards)
- Single font: Plus Jakarta Sans for everything (headings and body)
- Project page hero: left-aligned title with role badge above, thumbnail image on right.
- Overview and Problem shown side by side below the hero (from frontmatter fields).
- Tools shown as dot-separated text below description. Methods shown as indigo pills.
- No tablet device frames needed — only desktop and mobile.
- Testimonials use a carousel (3 visible at a time) with slide animation.
- Slalom colleagues get indigo avatars, clients get emerald avatars.
- All image corners are rounded-2xl.
- Horizontal rules (---) in markdown are hidden. Heading underlines (border-b) are kept.
- The "Home" link was removed from nav since the name/logo links home.
- Decorative elements: gradient blur blobs (not geometric shapes)
- Card style: white bg, rounded-xl, border border-slate-100, colored shadow, hover lift

## Accessibility
- WCAG AA color contrast for all text (Slate 900 on Slate 50 background)
- Focus: ring-2 ring-indigo-500 ring-offset-2
- Decorative elements use -z-10 and aria-hidden
- All images need descriptive alt text (150 chars or less, no "image of" prefix)
- prefers-reduced-motion disables all animations
