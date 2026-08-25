# Corporate Trust Design System

## Design Philosophy

**Corporate Trust** embodies the modern enterprise SaaS aesthetic — professional yet approachable, sophisticated yet friendly. It draws inspiration from tech unicorns and high-growth startups that have successfully humanized the corporate experience.

The core concept is **"Trustworthy Yet Vibrant"** — establishing credibility through clean structure and professional typography while maintaining visual energy through vibrant gradients and colorful accents.

### The Vibe
**Trustworthy. Vibrant. Polished. Dimensional. Modern. Approachable. Enterprise-Ready. Elegant.**

### Visual Signatures
- **Colored Shadows**: Soft shadows with indigo/violet tints instead of neutral grays
- **Gradient Text**: Strategic use of indigo-to-violet gradient text for emphasis in headlines
- **Soft Blobs**: Large, blurred gradient orbs in the background for atmospheric depth
- **Elevated Cards**: White cards that lift on hover with enhanced colored shadows
- **Dual-Tone Palette**: Indigo (primary) + Violet (secondary) creating a cohesive gradient spectrum

---

## Design Token System

### Colors (Light Mode)

```
background:        #F8FAFC    // Slate 50 — Subtle cool grey/white base
foreground:        #0F172A    // Slate 900 — High contrast text
card:              #FFFFFF    // White — Raised elements
primary:           #4F46E5    // Indigo 600 — Core brand color
secondary:         #7C3AED    // Violet 600 — Gradients and accents
muted:             #F1F5F9    // Slate 100
mutedForeground:   #64748B    // Slate 500 — Supporting text
accent:            #10B981    // Emerald 500 — Positive indicators
border:            #E2E8F0    // Slate 200 — Subtle separation
ring:              #4F46E5    // Indigo 600 — Focus states
```

### Typography

**Font Family**: `"Plus Jakarta Sans", system-ui, sans-serif` — Used for everything (headings and body).

**Font Weights**:
- Display/Headings: ExtraBold (800) for hero headlines, Bold (700) for section headings
- Subheadings: SemiBold (600) for card titles and emphasis
- Body Text: Regular (400) for paragraphs, Medium (500) for navigation and labels

**Line Heights**:
- Headlines: 1.1 (tight tracking for impact)
- Body Text: 1.6-1.7 (relaxed for readability)

**Letter Spacing**: Tight tracking (-0.02em) on large headlines for modern polish

### Radius & Border

```
radius-lg:   8px     // Inputs
radius-xl:   12px    // Cards
radius-full: 9999px  // Buttons (pill)
border-width: 1px    // Thin borders
```

### Shadows & Effects

**Colored Shadows** (indigo-tinted):
```
shadow-soft:    0 4px 20px -2px rgba(79, 70, 229, 0.1)
shadow-hover:   0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.1)
shadow-button:  0 4px 14px 0 rgba(79, 70, 229, 0.3)
```

**Gradients**:
- Primary: `from-indigo-600 to-violet-600` — Buttons and active states
- Text: `bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent`
- Background: Subtle `from-indigo-100 to-violet-100` for containers

**Background Blobs**: Large gradient orbs with blur-3xl, positioned absolutely, low opacity (20-40%)

---

## Component Stylings

### Buttons

**Primary**:
- Background: gradient (Indigo to Violet)
- Text: white, font-weight 600
- Radius: rounded-full (pill)
- Shadow: shadow-button
- Hover: -translate-y-0.5, increased shadow

**Secondary**:
- Background: white
- Border: 1px border-slate-200
- Text: Slate 700
- Hover: bg-slate-50, darker border

### Cards

**Base**: White bg, rounded-xl, border border-slate-100, shadow-soft
**Hover**: -translate-y-1, shadow-hover
**Transition**: duration-200 ease-out

### Navigation

- Clean white background with subtle bottom border
- Plus Jakarta Sans Medium (500) for links
- Primary gradient button for CTA
- Smooth hover transitions on links

---

## Animation & Transitions

**Philosophy**: "Refined Motion" — Smooth, professional, never jarring

- Base: `transition-all duration-200 ease-out`
- Cards: `hover:-translate-y-1` with shadow enhancement
- Buttons: `hover:-translate-y-0.5` for subtle lift
- Icons: `group-hover:translate-x-1` for directional cues
- Pulse: `animate-pulse duration-[4000ms]` on decorative blob elements
- Respect `prefers-reduced-motion`

---

## Iconography

**Library**: Lucide React
- Stroke width: 2px (standard)
- Size: h-4 w-4 inline, h-5 w-5 or h-6 w-6 featured
- Color: text-indigo-600 on bg-indigo-100 containers
- Accessibility: Decorative icons hidden from screen readers

---

## Responsive Strategy

- Mobile-first with progressive enhancement
- Touch targets: minimum 44x44px
- Headlines: text-4xl mobile → text-6xl desktop
- Two-column layouts stack on mobile
- Text width: max-w-xl or max-w-2xl for readability (60-75 chars)

---

## Accessibility

- WCAG AA color contrast for all text
- Focus: ring-2 ring-indigo-500 ring-offset-2
- Semantic HTML throughout
- prefers-reduced-motion respected
- Descriptive alt text on all images
