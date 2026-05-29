import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectImageProps {
  src: string
  alt: string
  priority?: boolean
  variant?: "blob" | "rounded" | "default"
}

const variantStyles: Record<NonNullable<ProjectImageProps["variant"]>, string> = {
  blob: "rounded-2xl",
  rounded: "rounded-xl",
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
    <div className={cn("overflow-hidden", variant !== "default" && "border-2 border-foreground", variantStyles[variant])}>
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
