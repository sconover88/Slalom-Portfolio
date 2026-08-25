import { siteConfig } from "@/lib/config"

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.attribution}
        </p>
      </div>
    </footer>
  )
}

export default Footer
