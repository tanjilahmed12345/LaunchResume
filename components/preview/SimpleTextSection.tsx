import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import SectionHeader from "./SectionHeader"
import SectionCard from "@/components/common/SectionCard"

interface SimpleTextSectionProps {
  title: string
  content: any
}

export default function SimpleTextSection({ title, content }: SimpleTextSectionProps) {
  const theme = useSelector((state: RootState) => state.resume.theme)

  const getFontSizeClasses = () => {
    switch (theme.fontSize) {
      case "small":
        return { base: "text-sm" }
      case "large":
        return { base: "text-base" }
      default:
        return { base: "text-sm" }
    }
  }

  const fontSizes = getFontSizeClasses()

  return (
    <div className="mb-12">
      <SectionHeader title={title} />
      <SectionCard>
        <p className={`${fontSizes.base} text-slate-700 leading-relaxed`} style={{ fontFamily: theme.fontFamily }}>
          {content.text || content.items}
        </p>
      </SectionCard>
    </div>
  )
}
