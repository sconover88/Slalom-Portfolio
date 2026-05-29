import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { DecorativeShapes } from "@/components/decorative-shapes"

interface CTABannerProps {
  url: string
  text: string
}

export function CTABanner({ url, text }: CTABannerProps) {
  return (
    <div className="relative flex items-center justify-center py-8">
      <DecorativeShapes variant="section" />

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative z-10 inline-flex items-center gap-3",
          "rounded-full border-2 border-foreground bg-accent px-6 py-3",
          "font-heading text-base font-bold text-accent-foreground",
          "shadow-[2px_2px_0px_0px_#1E293B] md:shadow-pop",
          "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover",
          "active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        )}
      >
        {text}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
          <ArrowRight className="h-4 w-4 text-accent" strokeWidth={2.5} />
        </span>
      </a>
    </div>
  )
}

export default CTABanner
