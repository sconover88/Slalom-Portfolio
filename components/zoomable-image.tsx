"use client"

import { useState, useRef, useCallback } from "react"
import React from "react"
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ZoomTarget {
  label: string
  x: number // percentage from left (0-100)
  y: number // percentage from top (0-100)
  scale: number
}

interface ZoomableImageProps {
  src: string
  alt: string
  zoomTargets?: ZoomTarget[]
}

export function ZoomableImage({ src, alt, zoomTargets = [] }: ZoomableImageProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Prevent page scroll when wheel is used inside the container
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.deltaY < 0) {
        setScale((s) => Math.min(s * 1.2, 6))
      } else {
        setScale((s) => {
          const newScale = Math.max(s / 1.2, 1)
          if (newScale === 1) setPosition({ x: 0, y: 0 })
          return newScale
        })
      }
    }
    el.addEventListener("wheel", handler, { passive: false })
    return () => el.removeEventListener("wheel", handler)
  }, [])

  const resetView = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(s * 1.5, 6))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((s) => {
      const newScale = Math.max(s / 1.5, 1)
      if (newScale === 1) setPosition({ x: 0, y: 0 })
      return newScale
    })
  }, [])

  const jumpToTarget = useCallback((target: ZoomTarget) => {
    setScale(target.scale)
    setPosition({
      x: -(target.x - 50) * (target.scale - 1) * 2,
      y: -(target.y - 50) * (target.scale - 1) * 2,
    })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setHasDragged(false)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }, [position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setHasDragged(true)
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!hasDragged && isDragging) {
      // Zoom toward click position
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const clickX = e.clientX - rect.left
        const clickY = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const offsetX = (centerX - clickX) * 0.5
        const offsetY = (centerY - clickY) * 0.5
        setPosition((prev) => ({
          x: prev.x + offsetX,
          y: prev.y + offsetY,
        }))
      }
      zoomIn()
    }
    setIsDragging(false)
  }, [hasDragged, isDragging, zoomIn])

  return (
    <div>
      {/* Image viewer with floating controls */}
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden rounded-xl border border-slate-200 bg-muted",
          scale > 1 ? "cursor-grab" : "cursor-zoom-in",
          isDragging && hasDragged && "cursor-grabbing"
        )}
        style={{ height: "500px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Floating controls */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <button
            onClick={zoomIn}
            aria-label="Zoom in"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white",
              "shadow-[0_2px_8px_-2px_rgba(79,70,229,0.1)] transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-[0_4px_12px_-2px_rgba(79,70,229,0.15)] hover:bg-slate-50"
            )}
          >
            <ZoomIn className="h-4 w-4 text-slate-600" strokeWidth={2} />
          </button>
          <button
            onClick={zoomOut}
            aria-label="Zoom out"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white",
              "shadow-[0_2px_8px_-2px_rgba(79,70,229,0.1)] transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-[0_4px_12px_-2px_rgba(79,70,229,0.15)] hover:bg-slate-50"
            )}
          >
            <ZoomOut className="h-4 w-4 text-slate-600" strokeWidth={2} />
          </button>
          <button
            onClick={resetView}
            aria-label="Reset view"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white",
              "shadow-[0_2px_8px_-2px_rgba(79,70,229,0.1)] transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-[0_4px_12px_-2px_rgba(79,70,229,0.15)] hover:bg-slate-50"
            )}
          >
            <Maximize2 className="h-4 w-4 text-slate-600" strokeWidth={2} />
          </button>

          {/* Zoom target buttons */}
          {zoomTargets.map((target) => (
            <button
              key={target.label}
              onClick={() => jumpToTarget(target)}
              className={cn(
                "inline-flex items-center rounded-full border border-slate-200 px-3 py-1",
                "text-xs font-semibold text-slate-700 bg-white",
                "shadow-[0_2px_8px_-2px_rgba(79,70,229,0.1)] transition-all duration-200",
                "hover:-translate-y-0.5 hover:shadow-[0_4px_12px_-2px_rgba(79,70,229,0.15)] hover:bg-slate-50"
              )}
            >
              {target.label}
            </button>
          ))}
        </div>

        <img
          src={src}
          alt={alt}
          draggable={false}
          className="h-full w-full object-contain select-none transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          }}
        />
      </div>

      <p className="text-xs text-muted-foreground text-center mt-2">
        Scroll to zoom · Drag to pan
      </p>
    </div>
  )
}

export default ZoomableImage
