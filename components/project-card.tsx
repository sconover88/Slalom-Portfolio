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

export function ProjectCard({
  slug,
  title,
  description,
  thumbnail,
  index,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        "group flex flex-col rounded-xl border border-slate-100 bg-white",
        "shadow-[0_4px_20px_-2px_rgba(79,70,229,0.1)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(79,70,229,0.15),0_8px_10px_-6px_rgba(79,70,229,0.1)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      )}
    >
      {/* Thumbnail */}
      <div className="p-4 pb-0">
        <div className="overflow-hidden rounded-lg">
          <ProjectImage
            src={thumbnail}
            alt={`${title} thumbnail`}
            variant="default"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-lg font-bold text-foreground leading-tight">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <span
          className={cn(
            "mt-4 inline-flex items-center gap-2 text-sm font-semibold",
            "text-indigo-600",
            "transition-all duration-200"
          )}
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export default ProjectCard
