import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProjectImage } from "@/components/project-image"

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  thumbnail: string
  index: number
}

const ACCENT_COLORS = [
  "text-accent",       // violet
  "text-secondary",    // pink
  "text-tertiary",     // yellow
  "text-quaternary",   // emerald
]

const ACCENT_BG_COLORS = [
  "bg-accent",
  "bg-secondary",
  "bg-tertiary",
  "bg-quaternary",
]

const ARROW_ICON_COLORS = [
  "text-white",       // on violet
  "text-foreground",  // on pink
  "text-foreground",  // on yellow
  "text-foreground",  // on emerald
]

const ACCENT_HEX_COLORS = [
  "#8B5CF6",   // violet
  "#F472B6",   // pink
  "#F9A825",   // yellow
  "#34D399",   // emerald
]

export function ProjectCard({
  slug,
  title,
  description,
  thumbnail,
  index,
}: ProjectCardProps) {
  const accentTextClass = ACCENT_COLORS[index % ACCENT_COLORS.length]
  const accentBgClass = ACCENT_BG_COLORS[index % ACCENT_BG_COLORS.length]
  const accentHex = ACCENT_HEX_COLORS[index % ACCENT_HEX_COLORS.length]
  const arrowIconColor = ARROW_ICON_COLORS[index % ARROW_ICON_COLORS.length]

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-card",
        "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "motion-safe:hover:-rotate-1 motion-safe:hover:scale-[1.02]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      )}
      style={{ boxShadow: `6px 6px 0px 0px ${accentHex}` }}
    >
      {/* Thumbnail with padding */}
      <div className="p-4 pb-0">
        <div className="overflow-hidden rounded-xl border border-border">
          <ProjectImage src={thumbnail} alt={`${title} thumbnail`} variant="default" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 pt-4">
        <h3 className="font-heading text-xl font-bold text-foreground">
          {title}
        </h3>
        <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Learn More link */}
        <div className="mt-auto pt-4">
          <span
            className={cn(
              "inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide",
              accentTextClass,
              "transition-all duration-300 group-hover:gap-3"
            )}
          >
            Learn More
            <span className={cn("flex h-6 w-6 items-center justify-center rounded-full", accentBgClass)}>
              <ArrowRight className={cn("h-3.5 w-3.5", arrowIconColor)} strokeWidth={2.5} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
