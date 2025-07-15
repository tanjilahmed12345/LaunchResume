import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import SectionHeader from "./SectionHeader"
import SectionCard from "@/components/common/SectionCard"
import { ExternalLink } from "lucide-react"

interface GenericListSectionProps {
  title: string
  content: any[]
  fields: string[]
}

export default function GenericListSection({ title, content, fields }: GenericListSectionProps) {
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

  const renderFieldValue = (field: string, value: string) => {
    if (field === "url" && value) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
          style={{ color: theme.primaryColor }}
        >
          View Project <ExternalLink className="w-3 h-3" />
        </a>
      )
    }
    return value
  }

  return (
    <div className="mb-12">
      <SectionHeader title={title} />
      <div className="space-y-6">
        {content.map((item: any) => (
          <SectionCard key={item.id}>
            {fields.map((field) => {
              if (!item[field]) return null
              return (
                <div key={field} className="mb-2">
                  {field === fields[0] ? (
                    <h3 className={`${fontSizes.lg} font-bold text-slate-900`} style={{ fontFamily: theme.fontFamily }}>
                      {item[field]}
                    </h3>
                  ) : (
                    <p className={`${fontSizes.base} text-slate-700`}>
                      <span className="font-medium capitalize">{field.replace(/([A-Z])/g, " $1").trim()}:</span>{" "}
                      {renderFieldValue(field, item[field])}
                    </p>
                  )}
                </div>
              )
            })}
          </SectionCard>
        ))}
      </div>
    </div>
  )
}
