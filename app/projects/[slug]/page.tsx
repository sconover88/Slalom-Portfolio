import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { ProjectImage } from "@/components/project-image";
import { DecorativeShapes } from "@/components/decorative-shapes";
import { cn } from "@/lib/utils";

const CONFETTI_COLORS = [
  "bg-accent",      // violet
  "bg-secondary",   // pink
  "bg-tertiary",    // yellow
  "bg-quaternary",  // emerald
];

const TEXT_COLORS = [
  "text-white",           // on violet (4.6:1 — passes)
  "text-foreground",      // on pink (use dark for better contrast)
  "text-foreground",      // on yellow
  "text-foreground",      // on emerald
];

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} — Scott Conover`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full px-6 lg:px-12 xl:px-16">
      {/* Hero section */}
      <section className="relative pt-16 md:pt-24 pb-8 md:pb-12">
        <DecorativeShapes variant="hero" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            {project.role && (
              <div className="inline-flex w-fit items-center rounded-full bg-accent/10 border-2 border-accent px-4 py-1.5 mb-4">
                <p className="font-heading text-xs md:text-sm font-bold text-accent uppercase tracking-wide">
                  {project.role}
                </p>
              </div>
            )}
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground max-w-2xl">
              {project.title}
            </h1>
            <p className="mt-4 font-body text-lg md:text-xl text-foreground/85 max-w-2xl">
              {project.description}
            </p>

            {/* Tools — simple text list below description */}
            {project.tools.length > 0 && (
              <p className="mt-4 font-body text-sm text-muted-foreground">
                {project.tools.join(" · ")}
              </p>
            )}

            {/* Methods */}
            {project.methods.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.methods.map((method, index) => (
                  <span
                    key={method}
                    className={cn(
                      "inline-flex items-center rounded-full border-2 border-foreground px-3 py-1 text-xs font-bold",
                      "shadow-[2px_2px_0px_0px_#1E293B] md:shadow-pop",
                      CONFETTI_COLORS[index % CONFETTI_COLORS.length],
                      TEXT_COLORS[index % TEXT_COLORS.length]
                    )}
                  >
                    {method}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-2xl bg-accent/20"
              />
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-card">
                <ProjectImage
                  src={project.thumbnail}
                  alt={`${project.title} — hero image`}
                  priority
                  variant="rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metadata section */}
      <section className="py-8 md:py-12 space-y-8">
        {/* Overview & Problem — side by side */}
        {project.problem && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-2 border-b-2 border-border pb-2">
                Overview
              </h2>
              <p className="font-body text-base text-foreground/85 mt-4">
                {project.description}
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-2 border-b-2 border-border pb-2">
                Problem
              </h2>
              <p className="font-body text-base text-foreground/85 mt-4">
                {project.problem}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Markdown body */}
      <section className="relative py-8 md:py-12">
        <DecorativeShapes variant="section" />
        <MarkdownRenderer content={project.body} />
      </section>

      {/* Back to home link */}
      <section className="py-8 md:py-12">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2",
            "font-heading text-base font-bold text-accent",
            "transition-colors hover:text-accent/80",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          )}
        >
          ← Back to Portfolio
        </Link>
      </section>
    </div>
  );
}
