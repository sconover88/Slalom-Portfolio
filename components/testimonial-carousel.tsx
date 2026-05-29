"use client"

import { useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  quote: string
  name: string
  role: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [isAnimating, setIsAnimating] = useState(false)
  const perPage = 3
  const totalPages = Math.ceil(testimonials.length / perPage)

  const currentItems = testimonials.slice(page * perPage, page * perPage + perPage)

  const navigate = useCallback((newPage: number, dir: "left" | "right") => {
    if (isAnimating) return
    setDirection(dir)
    setIsAnimating(true)
    setTimeout(() => {
      setPage(newPage)
      setTimeout(() => setIsAnimating(false), 50)
    }, 200)
  }, [isAnimating])

  const prev = () => navigate(page === 0 ? totalPages - 1 : page - 1, "left")
  const next = () => navigate(page === totalPages - 1 ? 0 : page + 1, "right")

  return (
    <div>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isAnimating && direction === "right" && "opacity-0 translate-x-8",
          isAnimating && direction === "left" && "opacity-0 -translate-x-8",
          !isAnimating && "opacity-100 translate-x-0"
        )}
        style={{ minHeight: "0" }}
      >
        {currentItems.map((testimonial, index) => {
          const avatarColor = testimonial.role.toLowerCase().includes("slalom") ? "bg-accent" : "bg-quaternary"
          return (
          <div key={page * perPage + index} className="flex flex-col h-full">
            <div
              className="relative rounded-2xl border-2 border-foreground bg-card p-6"
              style={{ boxShadow: "4px 4px 0px 0px #1E293B" }}
            >
              <p className="font-body text-sm text-foreground leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 pl-2 mt-4">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground", avatarColor)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="7" r="4" fill="white"/>
                  <path d="M2 18c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">{testimonial.name}</p>
                <p className="font-body text-xs text-foreground/70">{testimonial.role}</p>
              </div>
            </div>
          </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          aria-label="Previous testimonials"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-card",
            "shadow-[2px_2px_0px_0px_#1E293B] transition-all duration-200",
            "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#1E293B]",
            "active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1E293B]"
          )}
        >
          <ChevronLeft className="h-5 w-5 text-foreground" strokeWidth={2.5} />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i, i > page ? "right" : "left")}
              aria-label={`Go to page ${i + 1}`}
              className={cn(
                "h-3 w-3 rounded-full border-2 border-foreground transition-all",
                i === page ? "bg-foreground" : "bg-transparent"
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonials"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-card",
            "shadow-[2px_2px_0px_0px_#1E293B] transition-all duration-200",
            "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#1E293B]",
            "active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1E293B]"
          )}
        >
          <ChevronRight className="h-5 w-5 text-foreground" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

export default TestimonialCarousel
