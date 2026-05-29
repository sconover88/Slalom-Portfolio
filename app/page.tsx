import Image from "next/image";
import { FlaskConical, Layers, MousePointerClick, Sparkles } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";
import { CTABanner } from "@/components/cta-banner";
import { ProjectCard } from "@/components/project-card";
import { Marquee } from "@/components/marquee";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { cn } from "@/lib/utils";

const WHAT_I_DO = [
  {
    icon: MousePointerClick,
    title: "Interaction Design",
    description: "Designing intuitive flows, micro-interactions, and navigation patterns that make complex products feel simple and delightful to use across all touchpoints.",
    color: "bg-accent",
    iconColor: "text-white",
  },
  {
    icon: FlaskConical,
    title: "Prototyping & Validation",
    description: "Building interactive prototypes and running usability tests to validate concepts before development begins — reducing risk and ensuring the right problems get solved.",
    color: "bg-secondary",
    iconColor: "text-foreground",
  },
  {
    icon: Layers,
    title: "Design Systems",
    description: "Building scalable, consistent component libraries and UI kits that unify products across platforms and empower teams to ship faster with less design debt.",
    color: "bg-tertiary",
    iconColor: "text-foreground",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    description: "Leveraging AI tools like Figma Make, Kiro, and prompt engineering to accelerate design workflows, explore more options, and deliver polished experiences at scale.",
    color: "bg-quaternary",
    iconColor: "text-foreground",
  },
];

const STATS = [
  { value: "32M+", label: "Users Impacted" },
  { value: "4", label: "Industries" },
  { value: "200+", label: "Components Built" },
  { value: "100%", label: "Accessible Design" },
];

const TESTIMONIALS = [
  { quote: "Despite having no access to the client's internal systems and working at risk for 7 weeks, Scott dug in, got up to speed and started adding immediate value — giving buyers the confidence to sign the contract.", name: "Lindsey Barron", role: "Director at Slalom" },
  { quote: "With very little direction, Scott created an animated powerpoint bringing to life the client's member experience vision. This deliverable was central to our sales pursuit and led the buyer to choose Slalom as their partner.", name: "Lindsey Barron", role: "Director at Slalom" },
  { quote: "We turned out SO MUCH in just half a PI. Really creative, above and beyond the requirements I even defined. It's amazing to see what you can do with a team of 6 awesome designers! Can't wait to share this more broadly.", name: "Angela", role: "Cable & Media Company Senior Leader" },
  { quote: "Scott puts forward clean designs that solve complex problems without looking like they're trying to do too much. He thinks about the nitty gritty things I sometimes overlook and keeps his cool through stressful interactions.", name: "Kendall van Horne", role: "Consultant at Slalom" },
  { quote: "I appreciated how you jumped right in on the Loveable prototyping and AI-generated imagery, taking initiative to explore the possibilities there vs. waiting for detailed instruction. That proactive mindset is invaluable.", name: "Lindsey Barron", role: "Director at Slalom" },
  { quote: "Scott has promoted best practices for scalable naming conventions, made thoughtful recommendations on Figma capabilities and plugins to increase productivity, and overall had a great attitude doing it. So impressed.", name: "Maile", role: "Cable & Media Company Senior Leader" },
  { quote: "Scott took a Service Design course on top of full-time delivery and immediately applied his learnings to produce an invaluable blueprint for product leaders. He's a trusted colleague for his poised demeanor and consistent delivery.", name: "Ariana de Ryss", role: "Principal at Slalom" },
  { quote: "Scott has been a staple with the Financial Company team for 6 months. He brought such great design perspective and the client was very sad to see him go. He will always have a lasting impact on the UX team.", name: "Gabe Macias", role: "UX Director at Slalom" },
  { quote: "This team hasn't just adapted to a complex, ever-changing client environment — they've thrived in it. Their exceptional delivery has sparked client enthusiasm and expanded work. 'I know I'm in great hands with you all!'", name: "Linda", role: "VP of Large Finance Company" },
];

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="w-full">
      {/* Hero section — text left, photo right */}
      <section className="relative w-full px-8 lg:px-16 xl:px-24 py-16 md:py-24 overflow-hidden">
        {/* Decorative shapes behind content */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          <svg className="absolute -top-10 -left-10 opacity-20" width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="100" fill="#F9A825" />
          </svg>
          <svg className="absolute top-16 left-24 opacity-30" width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#F472B6" strokeWidth="4" />
          </svg>
          <svg className="absolute top-20 right-12 opacity-20" width="60" height="60" viewBox="0 0 60 60">
            <rect x="10" y="10" width="40" height="40" fill="none" stroke="#F9A825" strokeWidth="3" transform="rotate(45 30 30)" />
          </svg>
          <svg className="absolute bottom-12 right-1/3 opacity-25" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#34D399" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center rounded-sm bg-tertiary px-4 py-2 border-2 border-foreground">
              <p className="font-heading text-xs md:text-sm font-bold uppercase tracking-wide text-foreground">
                User Experience &amp; Product Design Specialist
              </p>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight max-w-xl">
              I design end-to-end digital experiences
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Human-centered design accelerated by AI — from research and design systems to high-fidelity interfaces. I use AI-powered tools to move faster, iterate smarter, and deliver polished experiences at scale.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <CTABanner url={siteConfig.deckUrl} text="View Presentation Deck" />
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-2xl bg-secondary/30"
              />
              <div className="relative overflow-hidden rounded-2xl border-4 border-foreground bg-white p-3 shadow-card">
                <Image
                  src="/images/scott-headshot.JPG"
                  alt="Scott Conover smiling in a navy blazer against a neutral background"
                  width={500}
                  height={600}
                  priority
                  className="h-auto w-full max-w-sm md:max-w-md rounded-2xl object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <Marquee />

      {/* What I Do section */}
      <section className="w-full px-8 lg:px-16 xl:px-24 py-10 md:py-14">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            What I Do
          </h2>
          <p className="mt-3 font-body text-base text-muted-foreground max-w-2xl mx-auto">
            I bring a full-spectrum approach to UX — from early discovery and research through interaction design, prototyping, and polished delivery. Every project is an opportunity to simplify complexity and create experiences people genuinely enjoy using.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHAT_I_DO.map((item, index) => (
            <div
              key={item.title}
              className="flex flex-col items-start gap-4 rounded-2xl border-2 border-foreground bg-card p-6"
              style={{ boxShadow: `4px 4px 0px 0px ${["#8B5CF6", "#F472B6", "#F9A825", "#34D399"][index % 4]}` }}
            >
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-full border-2 border-foreground", item.color)}>
                <item.icon className={cn("h-6 w-6", item.iconColor)} strokeWidth={2.5} />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats section */}
      <section className="w-full py-10 md:py-14">
        <div className="text-center mb-8 px-8 lg:px-16 xl:px-24">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            By the Numbers
          </h2>
        </div>
        <div className="w-full bg-foreground p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {STATS.map((stat, index) => {
              const colors = ["bg-accent", "bg-tertiary", "bg-secondary", "bg-quaternary"]
              const textColors = ["text-white", "text-foreground", "text-foreground", "text-foreground"]
              const shapes = ["rounded-full", "rounded-xl", "rounded-xl skew-x-[-6deg]", "rounded-xl rounded-tl-[40px] rounded-br-[40px]"]
              const textFix = ["", "", "skew-x-[6deg]", ""]
              return (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 p-6 md:p-8",
                    colors[index % 4],
                    shapes[index % 4]
                  )}
                >
                  <span className={cn("font-heading text-2xl md:text-3xl font-extrabold", textColors[index % 4], textFix[index % 4])}>
                    {stat.value}
                  </span>
                  <span className={cn("font-heading text-[10px] md:text-xs font-bold uppercase tracking-widest", textColors[index % 4], "opacity-80", textFix[index % 4])}>
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="w-full py-10 md:py-14">
        <div className="w-full bg-tertiary px-8 lg:px-16 xl:px-24 py-8 md:py-10">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Client Feedback
            </h2>
            <p className="mt-3 font-body text-base text-foreground/70 max-w-2xl mx-auto">
              What colleagues and stakeholders have to say about working with me.
            </p>
          </div>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* Featured Work section */}
      <section className="w-full px-8 lg:px-16 xl:px-24 py-10 md:py-14">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Featured Work
          </h2>
          <p className="mt-3 font-body text-base text-muted-foreground max-w-2xl mx-auto">
            Here&apos;s a selection of recent work. Each project tells the story from problem to impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
              thumbnail={project.thumbnail}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
