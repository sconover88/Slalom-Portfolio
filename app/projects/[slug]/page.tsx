import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { ProjectImage } from "@/components/project-image";
import { DecorativeShapes } from "@/components/decorative-shapes";
import { cn } from "@/lib/utils";

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
    <div className="w-full bg-[#F8FAFC]">
      {/* Hero section */}
      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-8 md:pb-12 overflow-hidden">
        <DecorativeShapes variant="hero" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            {project.role && (
              <div className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-4 py-1.5 mb-4">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-wide bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {project.role}
                </p>
              </div>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-2xl">
              {project.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {project.description}
            </p>

            {/* Tools */}
            {project.tools.length > 0 && (
              <p className="mt-4 text-sm text-slate-400">
                {project.tools.join(" · ")}
              </p>
            )}

            {/* Methods */}
            {project.methods.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.methods.map((method) => (
                  <span
                    key={method}
                    className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                  >
                    {method}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-2px_rgba(79,70,229,0.1)]">
              <ProjectImage
                src={project.thumbnail}
                alt={`${project.title} — hero image`}
                priority
                variant="rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Metadata section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {project.problem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 border-b border-slate-200 pb-2">
                  Overview
                </h2>
                <p className="text-base text-slate-600 mt-4 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 border-b border-slate-200 pb-2">
                  Problem
                </h2>
                <p className="text-base text-slate-600 mt-4 leading-relaxed">
                  {project.problem}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Markdown body */}
      <section className="relative py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MarkdownRenderer content={project.body} />
        </div>
      </section>

      {/* Back to home link */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2",
              "text-base font-semibold text-indigo-600",
              "transition-colors hover:text-indigo-500",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            )}
          >
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}
