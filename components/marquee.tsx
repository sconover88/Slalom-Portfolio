const KEYWORDS = [
  "UX Design",
  "AI-Assisted Design",
  "Design Systems",
  "Figma Make",
  "Prototyping",
  "User Research",
  "AI Workflows",
  "Interaction Design",
  "Visual Design",
  "Prompt Engineering",
  "Rapid Iteration",
  "Accessibility",
]

export function Marquee() {
  const items = [...KEYWORDS, ...KEYWORDS]

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden border-y-2 border-foreground bg-foreground py-4"
    >
      <div
        className="flex w-max gap-8 motion-safe:animate-[marquee_30s_linear_infinite]"
      >
        {items.map((keyword, i) => (
          <span
            key={`${keyword}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap font-heading text-lg font-bold uppercase tracking-wider text-background"
          >
            {keyword}
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
