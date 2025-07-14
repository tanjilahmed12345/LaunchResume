"use client"

import type * as React from "react"
import { useDispatch } from "react-redux"
import { Draggable } from "@hello-pangea/dnd"
import { toggleSectionVisibility, removeSection } from "@/lib/store"
import { sectionIcons, sectionLabels } from "@/lib/SectionConfig"
import ActionButton from "@/components/Common/ActionButton"
import { GripVertical, Eye, EyeOff, Trash2 } from "lucide-react"
import type { ResumeSection } from "@/lib/store"

interface SectionItemProps {
  section: ResumeSection
  index: number
  isActive: boolean
  onSelect: (sectionId: string) => void
}

export default function SectionItem({ section, index, isActive, onSelect }: SectionItemProps) {
  const dispatch = useDispatch()
  const Icon = sectionIcons[section.type]

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(toggleSectionVisibility(section.id))
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (section.type !== "personal") {
      dispatch(removeSection(section.id))
    }
  }

  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
            isActive
              ? "bg-blue-50 border-blue-200 shadow-md"
              : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-sm"
          } ${snapshot.isDragging ? "shadow-2xl rotate-2 scale-105 z-50" : ""}`}
          onClick={() => onSelect(section.id)}
        >
          <div
            {...provided.dragHandleProps}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-5 h-5" />
          </div>

          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isActive ? "bg-blue-100" : "bg-white group-hover:bg-slate-100"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-600"}`} />
          </div>

          <span className="flex-1 font-medium text-slate-900">{sectionLabels[section.type]}</span>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ActionButton
              icon={section.visible ? Eye : EyeOff}
              onClick={handleToggleVisibility}
              className={`w-8 h-8 p-0 ${section.visible ? "text-green-600" : "text-slate-400"}`}
            />

            {section.type !== "personal" && (
              <ActionButton
                icon={Trash2}
                onClick={handleDelete}
                className="w-8 h-8 p-0 hover:bg-red-50 text-red-500 hover:text-red-600"
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}
