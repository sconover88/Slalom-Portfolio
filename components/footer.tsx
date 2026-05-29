import { SectionDivider } from "@/components/section-divider"
import { siteConfig } from "@/lib/config"

export function Footer() {
  return (
    <footer className="bg-muted">
      <SectionDivider />
      <div className="w-full px-6 lg:px-12 xl:px-16 py-8 text-center text-foreground">
        <p className="font-body text-sm">
          © {new Date().getFullYear()} {siteConfig.attribution}
        </p>
      </div>
    </footer>
  )
}

export default Footer
