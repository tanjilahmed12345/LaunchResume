"use client"

import { useSelector, useDispatch } from "react-redux"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
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

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    if (sourceIndex === destinationIndex) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(sourceIndex, 1)
    items.splice(destinationIndex, 0, reorderedItem)

    dispatch(reorderSections(items))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections" type="SECTION">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 mb-6 min-h-[200px] p-3 rounded-lg transition-all duration-200 ${
              snapshot.isDraggingOver
                ? "bg-blue-50 border-2 border-dashed border-blue-300 shadow-inner"
                : "bg-transparent"
            }`}
          >
            {sections.map((section, index) => (
              <div key={section.id} className="relative">
                {/* Drop indicator line */}
                {snapshot.isDraggingOver && (
                  <div className="absolute -top-1 left-0 right-0 h-0.5 bg-blue-400 opacity-0 transition-opacity duration-200 hover:opacity-100" />
                )}

                <SectionItem
                  section={section}
                  index={index}
                  isActive={activeSection === section.id}
                  onSelect={onSectionSelect}
                />

                {/* Drop indicator line */}
                {snapshot.isDraggingOver && index === sections.length - 1 && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 opacity-0 transition-opacity duration-200 hover:opacity-100" />
                )}
              </div>
            ))}
            {provided.placeholder}

            {/* Visual feedback when dragging */}
            {snapshot.isDraggingOver && (
              <div className="text-center py-4 text-blue-600 font-medium text-sm">Drop here to reorder sections</div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
