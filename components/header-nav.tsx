"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"

const NAV_LINKS = [
  { href: "/about", label: "About" },
]

export function HeaderNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b-2 border-border bg-background"
    >
      <div className="w-full flex items-center justify-between px-6 lg:px-12 xl:px-16 py-3">
        {/* Brand */}
        <Link
          href="/"
          className="font-heading text-lg font-bold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Scott Conover
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {link.label}
            </Link>
          ))}

          {/* External deck link — small Candy Button */}
          <a
            href={siteConfig.deckUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2",
              "rounded-full border-2 border-foreground bg-accent px-4 py-1.5",
              "font-heading text-sm font-bold text-accent-foreground",
              "shadow-[2px_2px_0px_0px_#1E293B] md:shadow-pop",
              "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover",
              "active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            )}
          >
            View Deck
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <ArrowRight className="h-3 w-3 text-accent" strokeWidth={2.5} />
            </span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" strokeWidth={2.5} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t-2 border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-base font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {link.label}
              </Link>
            ))}

            <a
              href={siteConfig.deckUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex w-fit items-center gap-2",
                "rounded-full border-2 border-foreground bg-accent px-4 py-1.5",
                "font-heading text-sm font-bold text-accent-foreground",
                "shadow-[2px_2px_0px_0px_#1E293B] md:shadow-pop",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              )}
            >
              View Deck
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <ArrowRight className="h-3 w-3 text-accent" strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default HeaderNav
