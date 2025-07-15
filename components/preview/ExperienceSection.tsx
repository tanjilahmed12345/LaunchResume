import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import SectionHeader from "./SectionHeader"
import SectionCard from "@/components/common/SectionCard"

// import SectionCard from "../common/SectionCard"
// import SectionCard from "@/components/Common/SectionCard"

interface ExperienceSectionProps {
  content: any[]
}

export default function ExperienceSection({ content }: ExperienceSectionProps) {
  const theme = useSelector((state: RootState) => state.resume.theme)

  const getFontSizeClasses = () => {
    switch (theme.fontSize) {
      case "small":
        return { base: "text-sm", lg: "text-base", xl: "text-lg" }
      case "large":
        return { base: "text-base", lg: "text-lg", xl: "text-xl" }
      default:
        return { base: "text-sm", lg: "text-base", xl: "text-lg" }
    }
  }

  const fontSizes = getFontSizeClasses()

  return (
    <div className="mb-12">
      <SectionHeader title="Experience" />
      <div className="space-y-8">
        {content.map((exp: any) => (
          <div key={exp.id} className="relative pl-8">
            <div
              className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: theme.primaryColor }}
            ></div>
            <div className="absolute left-1.5 top-5 w-0.5 h-full bg-slate-200"></div>

            <SectionCard className="hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3
                    className={`${fontSizes.xl} font-bold text-slate-900 mb-1`}
                    style={{ fontFamily: theme.fontFamily }}
                  >
                    {exp.title}
                  </h3>
                  <p
                    className={`${fontSizes.lg} font-semibold mb-2`}
                    style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}
                  >
                    {exp.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`${fontSizes.base} font-medium text-slate-600`}>
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className={`${fontSizes.base} text-slate-500`}>{exp.location}</p>
                </div>
              </div>
              {exp.description && (
                <div
                  className={`${fontSizes.base} text-slate-700 leading-relaxed whitespace-pre-line`}
                  style={{ fontFamily: theme.fontFamily }}
                >
                  {exp.description}
                </div>
              )}
            </SectionCard>
          </div>
        ))}
      </div>
    </div>
  )
}
