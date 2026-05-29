# Portfolio Project Context

## Project Overview
This is Scott Conover's UX portfolio built with Next.js, Tailwind CSS v4, and shadcn/ui. It follows the "Playful Geometric" design system defined in `content/styling-prompt.md`.

## Working Preferences
- Scott is a non-developer UX designer. Keep explanations simple and action-oriented.
- When asked to restart the dev server, just do it immediately without extra commentary.
- When creating SVG graphics, use XML-safe entities (&#x201C; not &ldquo;) to avoid parsing errors.
- SVG graphics should match the Playful Geometric style: warm cream backgrounds (#FFFDF5) or dark (#1E293B), chunky 2px borders, confetti colors (violet #8B5CF6, pink #F472B6, yellow #FBBF24, emerald #34D399), Outfit for headings, Plus Jakarta Sans for body.
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
- Project page hero: left-aligned title with role badge above, thumbnail image on right.
- Overview and Problem shown side by side below the hero (from frontmatter fields).
- Tools shown as dot-separated text below description. Methods shown as colored pills.
- No tablet device frames needed — only desktop and mobile.
- Testimonials use a carousel (3 visible at a time) with slide animation.
- Slalom colleagues get purple avatars, clients get green avatars.
- All image corners are fully rounded (rounded-2xl), no blob/speech-bubble style.
- Horizontal rules (---) in markdown are hidden. Heading underlines (border-b) are kept.
- The "Home" link was removed from nav since the name/logo links home.

## Accessibility
- White text only on violet backgrounds. Dark foreground text on pink, yellow, and emerald.
- Decorative shapes use -z-10 to stay behind content.
- All images need descriptive alt text (150 chars or less, no "image of" prefix).
- prefers-reduced-motion disables all animations.
