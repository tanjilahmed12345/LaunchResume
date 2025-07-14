"use client"

import { Button } from "@/components/ui/button"
import FormField from "@/components/Common/FormField"
import ActionButton from "@/components/Common/ActionButton"
import { Plus, Trash2, Edit3 } from "lucide-react"

interface SkillsEditorProps {
  content: any[]
  onChange: (content: any[]) => void
}

export default function SkillsEditor({ content, onChange }: SkillsEditorProps) {
  const addSkillCategory = () => {
    const newCategory = { id: Date.now().toString(), category: "", skills: "" }
    onChange([...content, newCategory])
  }

  const updateSkillCategory = (index: number, field: string, value: string) => {
    const updated = [...content]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeSkillCategory = (index: number) => {
    onChange(content.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {content.map((skill: any, index: number) => (
        <div key={skill.id} className="bg-slate-50 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Skill Category {index + 1}
            </h4>
            <ActionButton
              icon={Trash2}
              onClick={() => removeSkillCategory(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            />
          </div>

          <FormField
            label="Category Name"
            value={skill.category || ""}
            onChange={(value) => updateSkillCategory(index, "category", value)}
            placeholder="e.g., Programming Languages"
          />

          <FormField
            label="Skills (comma-separated)"
            type="textarea"
            rows={2}
            value={skill.skills || ""}
            onChange={(value) => updateSkillCategory(index, "skills", value)}
            placeholder="e.g., JavaScript, Python, React, Node.js"
          />
        </div>
      ))}

      <Button
        onClick={addSkillCategory}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Skill Category
      </Button>
    </div>
  )
}
