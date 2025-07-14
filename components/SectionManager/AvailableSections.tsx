"use client"

import { useSelector, useDispatch } from "react-redux"
import { type RootState, type SectionType, addSection } from "@/lib/store"
import { sectionIcons, sectionLabels } from "@/lib/SectionConfig"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AvailableSections() {
  const dispatch = useDispatch()
  const availableSections = useSelector((state: RootState) => state.resume.availableSections)

  const handleAddSection = (type: SectionType) => {
    dispatch(addSection(type))
  }

  if (availableSections.length === 0) return null

  return (
    <div className="border-t border-slate-200 pt-6">
      <p className="text-sm font-medium text-slate-700 mb-4">Add New Section</p>
      <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
        {availableSections.map((sectionType) => {
          const Icon = sectionIcons[sectionType]
          return (
            <Button
              key={sectionType}
              variant="outline"
              size="sm"
              onClick={() => handleAddSection(sectionType)}
              className="flex items-center gap-3 text-sm hover:bg-slate-50 transition-colors justify-start p-3 h-auto"
            >
              <Plus className="w-3 h-3 text-green-600" />
              <Icon className="w-4 h-4 text-slate-600" />
              <span className="text-left">{sectionLabels[sectionType]}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
