import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import SectionHeader from "./SectionHeader"
import SectionCard from "@/components/common/SectionCard"

interface SkillsSectionProps {
  content: any[]
}

export default function SkillsSection({ content }: SkillsSectionProps) {
  const theme = useSelector((state: RootState) => state.resume.theme)

  const getFontSizeClasses = () => {
    switch (theme.fontSize) {
      case "small":
        return { base: "text-sm", lg: "text-base" }
      case "large":
        return { base: "text-base", lg: "text-lg" }
      default:
        return { base: "text-sm", lg: "text-base" }
    }
  }

  const fontSizes = getFontSizeClasses()

  return (
    <div className="mb-12">
      <SectionHeader title="Skills" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.map((skill: any) => (
          <SectionCard key={skill.id}>
            <h3 className={`${fontSizes.lg} font-bold text-slate-900 mb-3`} style={{ fontFamily: theme.fontFamily }}>
              {skill.category}
            </h3>
            <p className={`${fontSizes.base} text-slate-700 leading-relaxed`} style={{ fontFamily: theme.fontFamily }}>
              {skill.skills}
            </p>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}
