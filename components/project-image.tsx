import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectImageProps {
  src: string
  alt: string
  priority?: boolean
  variant?: "blob" | "rounded" | "default"
}

const variantStyles: Record<NonNullable<ProjectImageProps["variant"]>, string> = {
  blob: "rounded-2xl shadow-[0_4px_20px_-2px_rgba(79,70,229,0.1)]",
  rounded: "rounded-xl shadow-[0_4px_20px_-2px_rgba(79,70,229,0.1)]",
  default: "rounded-lg",
}

export function ProjectImage({
  src,
  alt,
  priority = false,
  variant = "default",
}: ProjectImageProps) {
  const resolvedSrc = `/images/${src}`

  return (
    <div className={cn("overflow-hidden", variantStyles[variant])}>
      <Image
        src={resolvedSrc}
        alt={alt}
        width={800}
        height={600}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  )
}

export default ProjectImage
