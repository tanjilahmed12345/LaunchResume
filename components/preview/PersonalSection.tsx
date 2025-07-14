import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { contactIcons, getDisplayNameFromUrl } from "@/lib/SectionConfig"

interface PersonalSectionProps {
  content: any
}

export default function PersonalSection({ content }: PersonalSectionProps) {
  const theme = useSelector((state: RootState) => state.resume.theme)

  const getFontSizeClasses = () => {
    switch (theme.fontSize) {
      case "small":
        return { base: "text-sm", xl: "text-lg", "3xl": "text-2xl" }
      case "large":
        return { base: "text-base", xl: "text-xl", "3xl": "text-3xl" }
      default:
        return { base: "text-sm", xl: "text-lg", "3xl": "text-2xl" }
    }
  }

  const fontSizes = getFontSizeClasses()

  const renderContactItem = (key: string, value: string, isLink = false) => {
    if (!value) return null

    const Icon = contactIcons[key as keyof typeof contactIcons]
    if (!Icon) return null

    const displayValue = isLink ? getDisplayNameFromUrl(value, key) : value

    return (
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className={`${fontSizes.base} hover:underline transition-colors`}
            style={{ color: theme.primaryColor }}
          >
            {displayValue}
          </a>
        ) : (
          <span className={fontSizes.base}>{displayValue}</span>
        )}
      </div>
    )
  }

  return (
    <div className="text-center mb-12">
      <h1 className={`${fontSizes["3xl"]} font-bold text-slate-900 mb-2`} style={{ fontFamily: theme.fontFamily }}>
        {content.name}
      </h1>
      {content.title && (
        <p
          className={`${fontSizes.xl} font-medium mb-4`}
          style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}
        >
          {content.title}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-6 text-slate-600 mb-6">
        {renderContactItem("email", content.email)}
        {renderContactItem("phone", content.phone)}
        {renderContactItem("location", content.location)}
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-slate-600 mb-6">
        {renderContactItem("website", content.website, true)}
        {renderContactItem("linkedin", content.linkedin, true)}
        {renderContactItem("github", content.github, true)}
      </div>
    </div>
  )
}
