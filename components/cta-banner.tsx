import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CTABannerProps {
  url: string
  text: string
}

export function CTABanner({ url, text }: CTABannerProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2",
        "rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3",
        "text-sm font-semibold text-white",
        "shadow-[0_4px_14px_0_rgba(79,70,229,0.3)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.4)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      )}
    >
      {text}
      <ArrowRight className="h-4 w-4" />
    </a>
  )
}

export default CTABanner
