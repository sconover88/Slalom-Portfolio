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
  },
  {
    icon: FlaskConical,
    title: "Prototyping & Validation",
    description: "Building interactive prototypes and running usability tests to validate concepts before development begins — reducing risk and ensuring the right problems get solved.",
  },
  {
    icon: Layers,
    title: "Design Systems",
    description: "Building scalable, consistent component libraries and UI kits that unify products across platforms and empower teams to ship faster with less design debt.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    description: "Leveraging AI tools like Figma Make, Kiro, and prompt engineering to accelerate design workflows, explore more options, and deliver polished experiences at scale.",
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
    <div className="w-full bg-[#F8FAFC]">
      {/* Hero section — text left, photo right */}
      <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Gradient blob backgrounds */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-4 py-2">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wide bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                User Experience &amp; Product Design Specialist
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-xl">
              I design end-to-end digital experiences
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
              Human-centered design accelerated by AI — from research and design systems to high-fidelity interfaces. I use AI-powered tools to move faster, iterate smarter, and deliver polished experiences at scale.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <CTABanner url={siteConfig.deckUrl} text="View Presentation Deck" />
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-white p-3 shadow-[0_4px_20px_-2px_rgba(79,70,229,0.1)]">
                <Image
                  src="/images/shared/scott-headshot.jpg"
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
      <section className="w-full py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              What I Do
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
              I bring a full-spectrum approach to UX — from early discovery and research through interaction design, prototyping, and polished delivery. Every project is an opportunity to simplify complexity and create experiences people genuinely enjoy using.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_I_DO.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(79,70,229,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(79,70,229,0.15)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                  <item.icon className="h-6 w-6 text-indigo-600" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-indigo-50 to-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              By the Numbers
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((stat, index) => {
              const shadowColors = [
                "shadow-[0_4px_20px_-2px_rgba(99,102,241,0.15)]",
                "shadow-[0_4px_20px_-2px_rgba(139,92,246,0.15)]",
                "shadow-[0_4px_20px_-2px_rgba(79,70,229,0.15)]",
                "shadow-[0_4px_20px_-2px_rgba(124,58,237,0.15)]",
              ];
              return (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 rounded-xl bg-white p-6 md:p-8 border border-slate-100 transition-all duration-300 hover:-translate-y-1",
                    shadowColors[index % 4]
                  )}
                >
                  <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Client Feedback
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
              What colleagues and stakeholders have to say about working with me.
            </p>
          </div>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* Featured Work section */}
      <section className="w-full py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Featured Work
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
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
        </div>
      </section>
    </div>
  );
}
