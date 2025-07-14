import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

interface SectionHeaderProps {
  title: string
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  const theme = useSelector((state: RootState) => state.resume.theme)

  return (
    <h2
      className="text-2xl font-bold text-slate-900 mb-8 pb-3 border-b-2 flex items-center gap-3"
      style={{ borderColor: theme.primaryColor, fontFamily: theme.fontFamily }}
    >
      <div className="w-2 h-8 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
      {title}
    </h2>
  )
}
