"use client"

import { useState, useCallback } from "react"
import React from "react"
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
  const [hasDragged, setHasDragged] = useState(false)
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
          "grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ease-out",
          isAnimating && direction === "right" && "opacity-0 translate-x-8",
          isAnimating && direction === "left" && "opacity-0 -translate-x-8",
          !isAnimating && "opacity-100 translate-x-0"
        )}
      >
        {currentItems.map((testimonial, index) => {
          const isSlalom = testimonial.role.toLowerCase().includes("slalom")
          const avatarColor = isSlalom ? "bg-indigo-100 text-indigo-600" : "bg-emerald-100 text-emerald-600"
          return (
          <div key={page * perPage + index} className="flex flex-col h-full">
            <div
              className="relative rounded-xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(79,70,229,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(79,70,229,0.12)]"
            >
              <p className="text-sm text-slate-700 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 pl-2 mt-4">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", avatarColor)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="7" r="4" fill="currentColor" opacity="0.6"/>
                  <path d="M2 18c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="currentColor" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
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
            "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white",
            "shadow-[0_2px_8px_-2px_rgba(79,70,229,0.1)] transition-all duration-200",
            "hover:-translate-y-0.5 hover:shadow-[0_4px_12px_-2px_rgba(79,70,229,0.15)]"
          )}
        >
          <ChevronLeft className="h-5 w-5 text-slate-600" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i, i > page ? "right" : "left")}
              aria-label={`Go to page ${i + 1}`}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all",
                i === page ? "bg-indigo-600" : "bg-slate-300"
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonials"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white",
            "shadow-[0_2px_8px_-2px_rgba(79,70,229,0.1)] transition-all duration-200",
            "hover:-translate-y-0.5 hover:shadow-[0_4px_12px_-2px_rgba(79,70,229,0.15)]"
          )}
        >
          <ChevronRight className="h-5 w-5 text-slate-600" />
        </button>
      </div>
    </div>
  )
}

export default TestimonialCarousel
