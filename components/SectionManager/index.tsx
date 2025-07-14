import SectionList from "./SectionList"
import AvailableSections from "./AvailableSections"
import { GripVertical } from "lucide-react"

interface SectionManagerProps {
  activeSection: string
  onSectionSelect: (sectionId: string) => void
}

export default function SectionManager({ activeSection, onSectionSelect }: SectionManagerProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Resume Sections</h3>
      </div>

      <SectionList activeSection={activeSection} onSectionSelect={onSectionSelect} />
      <AvailableSections />
    </div>
  )
}
