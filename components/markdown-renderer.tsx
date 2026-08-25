"use client"

import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ZoomableImage } from "@/components/zoomable-image"
import type { Components } from "react-markdown"

interface MarkdownRendererProps {
  content: string
}

function resolveImageSrc(src: string | undefined): string {
  if (!src) return "/images/placeholder.svg"
  if (src.startsWith("/") || src.startsWith("http")) return src
  return `/images/${src}`
}

const ZOOMABLE_IMAGES: Record<string, { zoomTargets: { label: string; x: number; y: number; scale: number }[]; crops?: { label: string; viewBox: string }[] }> = {
  "financial-blueprint.svg": {
    zoomTargets: [
      { label: "Discovery & Planning", x: 8, y: 50, scale: 3.5 },
      { label: "Account Initialization", x: 30, y: 50, scale: 3.5 },
    ],
    crops: [
      { label: "Discovery & Planning", viewBox: "0 1500 6000 4000" },
      { label: "Account Initialization", viewBox: "18000 1500 6000 4000" },
    ],
  },
}

const components: Components = {
  h2: ({ children, ...props }) => (
    <h2
      className="text-2xl font-bold text-slate-900 mb-6 mt-10 border-b border-slate-200 pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-xl font-bold text-slate-900 mb-4 mt-8"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, node, ...props }) => {
    // If the paragraph only contains an image, don't wrap in <p> to avoid hydration errors
    const hasOnlyImage = node && node.children && node.children.length === 1 && 
      node.children[0].type === "element" && node.children[0].tagName === "img"
    if (hasOnlyImage) {
      return <>{children}</>
    }
    // If paragraph contains multiple images, render them in a grid
    const imageCount = node && node.children ? node.children.filter(
      (child: any) => child.type === "element" && child.tagName === "img"
    ).length : 0
    if (imageCount > 1) {
      return <span className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">{children}</span>
    }
    return (
      <p
        className="text-base text-slate-700 leading-relaxed mb-4"
        {...props}
      >
        {children}
      </p>
    )
  },
  ul: ({ children, ...props }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base text-slate-700" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-slate-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-indigo-500 pl-4 my-4 italic text-slate-600"
      {...props}
    >
      {children}
    </blockquote>
  ),
  img: ({ src, alt, ...props }) => {
    const resolvedSrc = resolveImageSrc(typeof src === "string" ? src : undefined)
    const safeAlt = alt || "Project image"
    const filename = typeof src === "string" ? src.replace(/^.*\//, "") : ""
    
    // Check if this image should use the zoomable viewer
    const zoomConfig = ZOOMABLE_IMAGES[filename]
    if (zoomConfig) {
      return (
        <span className="my-6 block">
          <span className="flex flex-col gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Full Service Design Blueprint</span>
          </span>
          <ZoomableImage
            src={resolvedSrc}
            alt={safeAlt}
            zoomTargets={[]}
          />
        </span>
      )
    }

    return (
      <span className="my-6 block">
        {resolvedSrc.endsWith(".svg") ? (
          <span className="block">
            <img
              src={resolvedSrc}
              alt={safeAlt}
              width="1200"
              height="500"
              className="w-full h-auto rounded-2xl"
            />
          </span>
        ) : (
          <span className="block overflow-hidden">
            <img
              src={resolvedSrc}
              alt={safeAlt}
              className="h-auto w-full rounded-2xl"
            />
          </span>
        )}
      </span>
    )
  },
  hr: () => <hr className="hidden" />,
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-indigo-600 underline hover:text-indigo-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      {...props}
    >
      {children}
    </a>
  ),
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-corporate max-w-none">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
