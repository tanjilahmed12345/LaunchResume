"use client"

import { useSelector, useDispatch } from "react-redux"
import { type RootState, updateSection } from "@/lib/store"
import { Edit3 } from "lucide-react"

// Import all editors
import PersonalEditor from "@/components/Editors/PersonalEditor"
import SummaryEditor from "@/components/Editors/SummaryEditor"
import ListItemEditor from "@/components/Editors/ListItemEditor"
import SkillsEditor from "@/components/Editors/SkillsEditor"
import SocialEditor from "@/components/Editors/SocialEditor"
import SimpleTextEditor from "@/components/Editors/SimpleTextEditor"

interface EditorPanelProps {
  activeSection: string
}

export default function EditorPanel({ activeSection }: EditorPanelProps) {
  const dispatch = useDispatch()
  const section = useSelector((state: RootState) => state.resume.sections.find((s) => s.id === activeSection))

  if (!section) return null

  const updateContent = (content: any) => {
    dispatch(updateSection({ id: activeSection, content }))
  }

  const getEditorContent = () => {
    const content = Array.isArray(section.content) ? section.content : []

    switch (section.type) {
      case "personal":
        return <PersonalEditor content={section.content} onChange={updateContent} />

      case "summary":
        return <SummaryEditor content={section.content} onChange={updateContent} />

      case "experience":
        return (
          <ListItemEditor
            title="Experience"
            items={content}
            fields={["title", "company", "location", "startDate", "endDate", "description"]}
            onChange={updateContent}
            placeholder="• Describe your key achievements and responsibilities&#10;• Use bullet points for better readability&#10;• Include quantifiable results when possible"
            gradientColor="from-blue-500 to-indigo-500"
          />
        )

      case "education":
        return (
          <ListItemEditor
            title="Education"
            items={content}
            fields={["degree", "school", "location", "year", "gpa"]}
            onChange={updateContent}
            gradientColor="from-purple-500 to-indigo-500"
          />
        )

      case "projects":
        return (
          <ListItemEditor
            title="Project"
            items={content}
            fields={["title", "description", "technologies", "startDate", "endDate", "url"]}
            onChange={updateContent}
            gradientColor="from-green-500 to-blue-500"
          />
        )

      case "certifications":
        return (
          <ListItemEditor
            title="Certification"
            items={content}
            fields={["name", "issuer", "date", "expiryDate", "credentialId"]}
            onChange={updateContent}
            gradientColor="from-yellow-500 to-orange-500"
          />
        )

      case "achievements":
        return (
          <ListItemEditor
            title="Achievement"
            items={content}
            fields={["title", "description", "date", "issuer"]}
            onChange={updateContent}
            gradientColor="from-pink-500 to-rose-500"
          />
        )

      case "volunteer":
        return (
          <ListItemEditor
            title="Volunteer Work"
            items={content}
            fields={["role", "organization", "location", "startDate", "endDate", "description"]}
            onChange={updateContent}
            gradientColor="from-teal-500 to-cyan-500"
          />
        )

      case "publications":
        return (
          <ListItemEditor
            title="Publication"
            items={content}
            fields={["title", "publisher", "date", "url", "description"]}
            onChange={updateContent}
            gradientColor="from-indigo-500 to-purple-500"
          />
        )

      case "conferences":
        return (
          <ListItemEditor
            title="Conference"
            items={content}
            fields={["title", "event", "location", "date", "description"]}
            onChange={updateContent}
            gradientColor="from-red-500 to-pink-500"
          />
        )

      case "courses":
        return (
          <ListItemEditor
            title="Course"
            items={content}
            fields={["name", "provider", "date", "duration", "description"]}
            onChange={updateContent}
            gradientColor="from-blue-500 to-cyan-500"
          />
        )

      case "extracurricular":
        return (
          <ListItemEditor
            title="Activity"
            items={content}
            fields={["title", "organization", "role", "startDate", "endDate", "description"]}
            onChange={updateContent}
            gradientColor="from-emerald-500 to-teal-500"
          />
        )

      case "testscores":
        return (
          <ListItemEditor
            title="Test Score"
            items={content}
            fields={["test", "score", "date", "maxScore"]}
            onChange={updateContent}
            gradientColor="from-violet-500 to-purple-500"
          />
        )

      case "clearances":
        return (
          <ListItemEditor
            title="Clearance"
            items={content}
            fields={["name", "issuer", "date", "expiryDate", "level"]}
            onChange={updateContent}
            gradientColor="from-slate-500 to-gray-500"
          />
        )

      case "skills":
        return <SkillsEditor content={content} onChange={updateContent} />

      case "languages":
        return (
          <ListItemEditor
            title="Language"
            items={content}
            fields={["language", "proficiency", "certification"]}
            onChange={updateContent}
            gradientColor="from-orange-500 to-red-500"
          />
        )

      case "social":
        return <SocialEditor content={content} onChange={updateContent} />

      case "interests":
        return (
          <SimpleTextEditor
            content={section.content}
            onChange={updateContent}
            placeholder="List your interests and hobbies, separated by commas..."
            fieldKey="items"
          />
        )

      case "references":
        return (
          <SimpleTextEditor
            content={section.content}
            onChange={updateContent}
            placeholder="e.g., Available upon request, or list specific references..."
          />
        )

      default:
        return <div>Editor not implemented for this section type.</div>
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Edit3 className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
        </h3>
      </div>

      {getEditorContent()}
    </div>
  )
}
