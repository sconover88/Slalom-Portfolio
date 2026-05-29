import { cn } from "@/lib/utils"

interface DecorativeShapesProps {
  variant: "hero" | "section" | "footer"
}

const COLORS = {
  violet: "#8B5CF6",
  pink: "#F472B6",
  yellow: "#FBBF24",
  emerald: "#34D399",
}

function Circle({ color, size, className }: { color: string; size: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("absolute", className)}
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
    </svg>
  )
}

function Triangle({ color, size, className }: { color: string; size: number; className?: string }) {
  const points = `${size / 2},0 ${size},${size} 0,${size}`
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("absolute", className)}
    >
      <polygon points={points} fill={color} />
    </svg>
  )
}

function Squiggle({ color, width, className }: { color: string; width: number; className?: string }) {
  const height = width * 0.3
  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("absolute", className)}
    >
      <path
        d={`M0,${height / 2} Q${width * 0.125},0 ${width * 0.25},${height / 2} T${width * 0.5},${height / 2} T${width * 0.75},${height / 2} T${width},${height / 2}`}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  )
}

function HeroShapes() {
  return (
    <>
      {/* Large yellow circle — top-left area */}
      <Circle
        color={COLORS.yellow}
        size={120}
        className="top-8 left-8 opacity-30"
      />
      {/* Small pink triangle — top-right */}
      <Triangle
        color={COLORS.pink}
        size={40}
        className="top-12 right-16 opacity-40"
      />
      {/* Small emerald circle — bottom-left */}
      <Circle
        color={COLORS.emerald}
        size={32}
        className="bottom-16 left-24 opacity-40"
      />
    </>
  )
}

function SectionShapes() {
  return (
    <>
      {/* Violet circle */}
      <Circle
        color={COLORS.violet}
        size={24}
        className="top-8 left-12 opacity-30"
      />
      {/* Pink triangle */}
      <Triangle
        color={COLORS.pink}
        size={28}
        className="top-16 right-20 opacity-30"
      />
      {/* Yellow squiggle */}
      <Squiggle
        color={COLORS.yellow}
        width={80}
        className="bottom-12 left-1/3 opacity-30"
      />
    </>
  )
}

function FooterShapes() {
  return (
    <>
      {/* Small emerald circle */}
      <Circle
        color={COLORS.emerald}
        size={20}
        className="top-4 right-16 opacity-30"
      />
      {/* Small violet triangle */}
      <Triangle
        color={COLORS.violet}
        size={24}
        className="bottom-4 left-12 opacity-30"
      />
    </>
  )
}

const VARIANT_MAP = {
  hero: HeroShapes,
  section: SectionShapes,
  footer: FooterShapes,
}

export function DecorativeShapes({ variant }: DecorativeShapesProps) {
  const Shapes = VARIANT_MAP[variant]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block"
    >
      <Shapes />
    </div>
  )
}

export default DecorativeShapes
