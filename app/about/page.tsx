import type { Metadata } from "next";
import Image from "next/image";
import { DecorativeShapes } from "@/components/decorative-shapes";
import { cn } from "@/lib/utils";
import { Sparkles, Palette, Layers, Search, Users, Zap, Monitor, Accessibility } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Scott Conover",
};

const EXPERIENCE = [
  {
    client: "Government Power & Energy Organization",
    role: "Experience Design",
    color: "bg-indigo-500",
    bullets: [
      "Created and maintained scalable design systems, low and high-fidelity prototypes, user journeys, and flows in Figma to support complex energy sector platforms.",
      "Leveraged Figma Make, VS Code, GitHub, and Vercel to rapidly prototype, iterate, and deploy interactive mockups, accelerating the design-to-development workflow with AI-assisted tools.",
      "Led design workshops with stakeholders to uncover solutions to emerging challenges and facilitated client working sessions to finalize design decisions.",
      "Translated designs into detailed specifications for development teams, bridging the gap between business goals and technical implementation.",
      "Actively participated in sprint planning, standups, and design reviews to negotiate technical feasibility and resolve discrepancies.",
    ],
  },
  {
    client: "Telecommunications Company",
    role: "Experience Design",
    color: "bg-violet-500",
    bullets: [
      "Designed and maintained responsive, visually compelling web, mobile, and tablet interfaces for consumer and B2B platforms, impacting over 32 million users.",
      "Led the creation of scalable design systems and UI kits in Figma, ensuring consistency across all digital products.",
      "Produced high-fidelity mockups, prototypes, wireframes, user journeys, and more through Figma to deliver polished, accessible designs.",
      "Collaborated with product managers, developers, and UX designers to align product visuals across apps.",
    ],
  },
  {
    client: "Financial Company",
    role: "Experience Design",
    color: "bg-emerald-500",
    bullets: [
      "Updated design systems, conducted user research, and used AI-driven tools to create wireframes, collaborating with development, marketing, and product teams for seamless project delivery.",
      "Led design feedback sessions and quickly implemented changes, adapting to evolving project requirements in a fast-paced financial environment.",
    ],
  },
];

const SKILLS = [
  { icon: Palette, label: "Experience Design" },
  { icon: Layers, label: "Design Systems" },
  { icon: Monitor, label: "Visual Design" },
  { icon: Users, label: "Cross-Team Collaboration" },
  { icon: Search, label: "User Research" },
  { icon: Sparkles, label: "AI-Assisted Design" },
  { icon: Zap, label: "Rapid Prototyping" },
  { icon: Accessibility, label: "Accessibility" },
];

export default function AboutPage() {
  return (
    <div className="w-full px-8 lg:px-16 xl:px-24">
      {/* Hero section */}
      <section className="relative py-12 md:py-16">
        <DecorativeShapes variant="hero" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content */}
          <div className="flex flex-col gap-4 order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Scott Conover
            </h1>
            <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              User Experience &amp; Product Design Specialist
            </p>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
              I specialize in human-centered, end-to-end experience design accelerated by AI. My work spans research, design systems, and high-fidelity interfaces, with a focus on creating empathetic, accessible, and scalable solutions. I leverage AI-powered tools like Figma Make and front-end prototyping to move faster from concept to production.
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <Image
              src="/images/about-illustration.svg"
              alt="Designer workspace illustration with screen, cursor, pen tool, and geometric shapes"
              width={400}
              height={400}
              priority
              className="h-auto w-full max-w-xs md:max-w-sm lg:max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Main content — experience left, skills right */}
      <section className="py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
          {/* Experience column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Relevant Experience
            </h2>

            <div className="flex flex-col gap-10">
              {EXPERIENCE.map((exp) => (
                <div key={exp.client} className="relative">
                  {/* Client header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={cn("mt-1 h-3 w-3 rounded-full shrink-0", exp.color)} />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {exp.client}
                      </h3>
                      <p className="text-sm text-slate-500">{exp.role}</p>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="ml-6 flex flex-col gap-3">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="relative pl-5 text-sm text-slate-700 leading-relaxed">
                        <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills sidebar */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Skills
            </h2>
            <div className="flex flex-col gap-3">
              {SKILLS.map((skill) => (
                <div
                  key={skill.label}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-[0_2px_8px_-2px_rgba(79,70,229,0.06)]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                    <skill.icon className="h-4.5 w-4.5 text-indigo-600" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-slate-900">{skill.label}</span>
                </div>
              ))}
            </div>

            {/* Tools */}
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">
              Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Figma",
                "Figma Make",
                "VS Code",
                "GitHub",
                "Vercel",
                "Kiro",
                "Miro",
                "Lucid Spark",
              ].map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
