"use client"

import { useSelector, useDispatch } from "react-redux"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { type RootState, reorderSections } from "@/lib/store"
import SectionItem from "./SectionItem"

interface SectionListProps {
  activeSection: string
  onSectionSelect: (sectionId: string) => void
}

export default function SectionList({ activeSection, onSectionSelect }: SectionListProps) {
  const dispatch = useDispatch()
  const sections = useSelector((state: RootState) => state.resume.sections)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    dispatch(reorderSections(items))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-3 mb-6 min-h-[100px] p-2 rounded-lg transition-colors ${
              snapshot.isDraggingOver ? "bg-blue-50 border-2 border-dashed border-blue-300" : ""
            }`}
          >
            {sections.map((section, index) => (
              <SectionItem
                key={section.id}
                section={section}
                index={index}
                isActive={activeSection === section.id}
                onSelect={onSectionSelect}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
