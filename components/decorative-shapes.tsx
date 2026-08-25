interface DecorativeShapesProps {
  variant: "hero" | "section" | "footer"
}

function HeroBlobs() {
  return (
    <>
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-200 to-violet-200 opacity-30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-violet-200 to-indigo-100 opacity-20 blur-3xl" />
    </>
  )
}

function SectionBlobs() {
  return (
    <>
      <div className="absolute top-0 right-0 h-[250px] w-[250px] rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 opacity-25 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-gradient-to-br from-violet-100 to-indigo-50 opacity-20 blur-3xl" />
    </>
  )
}

function FooterBlobs() {
  return (
    <>
      <div className="absolute top-0 right-1/4 h-[150px] w-[150px] rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 opacity-20 blur-3xl" />
    </>
  )
}

const VARIANT_MAP = {
  hero: HeroBlobs,
  section: SectionBlobs,
  footer: FooterBlobs,
}

export function DecorativeShapes({ variant }: DecorativeShapesProps) {
  const Blobs = VARIANT_MAP[variant]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <Blobs />
    </div>
  )
}

export default DecorativeShapes
