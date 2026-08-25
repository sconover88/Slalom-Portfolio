interface SectionDividerProps {
  color?: string
}

export function SectionDivider({ color }: SectionDividerProps) {
  return (
    <hr className="border-t border-slate-200 my-8" style={color ? { borderColor: color } : undefined} />
  )
}

export default SectionDivider
