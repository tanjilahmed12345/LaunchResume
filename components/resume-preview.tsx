import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

// Import all section components
import PersonalSection from "./preview/PersonalSection"
import ExperienceSection from "./preview/ExperienceSection"
import SkillsSection from "./preview/SkillsSection"
import GenericListSection from "./preview/GenericListSection"
import SimpleTextSection from "./preview/SimpleTextSection"
// import SectionHeader from "./Preview/SectionHeader"
import SectionCard from "./common/SectionCard"
import { socialPlatformIcons } from "@/lib/SectionConfig"
import { ExternalLink } from "lucide-react"
import SectionHeader from "./preview/SectionHeader"
// import SectionHeader from "./preview/SectionHeader"

export default function ResumePreview() {
  const resume = useSelector((state: RootState) => state.resume)
  const visibleSections = resume.sections.filter((section) => section.visible)
  const theme = resume.theme

  const renderSummarySection = (content: any) => (
    <div className="mb-12">
      <SectionHeader title="Professional Summary" />
      <SectionCard>
        <p className="text-lg text-slate-700 leading-relaxed" style={{ fontFamily: theme.fontFamily }}>
          {content.text}
        </p>
      </SectionCard>
    </div>
  )

  const renderProjectsSection = (content: any[]) => (
    <div className="mb-12">
      <SectionHeader title="Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.map((project: any) => (
          <SectionCard key={project.id}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: theme.fontFamily }}>
                {project.title}
              </h3>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  style={{ color: theme.primaryColor }}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-slate-700 mb-3">{project.description}</p>
            {project.technologies && (
              <p className="text-sm text-slate-600 mb-2">
                <span className="font-medium">Technologies:</span> {project.technologies}
              </p>
            )}
            <p className="text-sm text-slate-500">
              {project.startDate} - {project.endDate}
            </p>
          </SectionCard>
        ))}
      </div>
    </div>
  )

  const renderSocialSection = (content: any[]) => (
    <div className="mb-12">
      <SectionHeader title="Social Media" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.map((social: any) => {
          const Icon = socialPlatformIcons[social.platform] || socialPlatformIcons.Website
          const displayName = social.displayName || social.platform

          return (
            <SectionCard key={social.id} className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <Icon className="w-5 h-5" style={{ color: theme.primaryColor }} />
              <div className="flex-1">
                <span className="text-sm font-medium text-slate-900">{displayName}</span>
                {social.url && (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs hover:underline transition-colors"
                    style={{ color: theme.primaryColor }}
                  >
                    View Profile
                  </a>
                )}
              </div>
            </SectionCard>
          )
        })}
      </div>
    </div>
  )

  const renderSection = (section: any) => {
    if (!section.content) return null

    switch (section.type) {
      case "personal":
        return <PersonalSection content={section.content} />
      case "summary":
        return renderSummarySection(section.content)
      case "experience":
        return <ExperienceSection content={section.content} />
      case "skills":
        return <SkillsSection content={section.content} />
      case "projects":
        return renderProjectsSection(section.content)
      case "education":
        return (
          <GenericListSection
            title="Education"
            content={section.content}
            fields={["degree", "school", "location", "year", "gpa"]}
          />
        )
      case "certifications":
        return (
          <GenericListSection
            title="Certifications"
            content={section.content}
            fields={["name", "issuer", "date", "expiryDate"]}
          />
        )
      case "achievements":
        return (
          <GenericListSection
            title="Achievements & Awards"
            content={section.content}
            fields={["title", "description", "date", "issuer"]}
          />
        )
      case "volunteer":
        return (
          <GenericListSection
            title="Volunteer Work"
            content={section.content}
            fields={["role", "organization", "location", "startDate", "endDate", "description"]}
          />
        )
      case "publications":
        return (
          <GenericListSection
            title="Publications & Blogs"
            content={section.content}
            fields={["title", "publisher", "date", "url", "description"]}
          />
        )
      case "conferences":
        return (
          <GenericListSection
            title="Conferences & Speaking"
            content={section.content}
            fields={["title", "event", "location", "date", "description"]}
          />
        )
      case "courses":
        return (
          <GenericListSection
            title="Courses & Training"
            content={section.content}
            fields={["name", "provider", "date", "duration", "description"]}
          />
        )
      case "extracurricular":
        return (
          <GenericListSection
            title="Extracurricular Activities"
            content={section.content}
            fields={["title", "organization", "role", "startDate", "endDate", "description"]}
          />
        )
      case "testscores":
        return (
          <GenericListSection
            title="Test Scores"
            content={section.content}
            fields={["test", "score", "date", "maxScore"]}
          />
        )
      case "clearances":
        return (
          <GenericListSection
            title="Clearances & Licenses"
            content={section.content}
            fields={["name", "issuer", "date", "expiryDate", "level"]}
          />
        )
      case "languages":
        return (
          <GenericListSection
            title="Languages"
            content={section.content}
            fields={["language", "proficiency", "certification"]}
          />
        )
      case "social":
        return renderSocialSection(section.content)
      case "interests":
        return <SimpleTextSection title="Interests & Hobbies" content={section.content} />
      case "references":
        return <SimpleTextSection title="References" content={section.content} />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 min-h-screen">
      <div id="resume-preview" className="max-w-4xl mx-auto">
        {visibleSections.map((section) => (
          <div key={section.id}>{renderSection(section)}</div>
        ))}
      </div>
    </div>
  )
}
