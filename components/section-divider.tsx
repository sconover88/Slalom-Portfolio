import { cn } from "@/lib/utils"

interface SectionDividerProps {
  color?: string
  className?: string
}

export function SectionDivider({ color = "#E2E8F0", className }: SectionDividerProps) {
  return (
    <div aria-hidden="true" className={cn("w-full", className)}>
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-6 w-full md:h-10"
      >
        <path
          d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 T900,20 T1000,20 T1100,20 T1200,20"
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default SectionDivider
