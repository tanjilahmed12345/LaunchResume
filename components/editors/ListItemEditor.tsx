"use client"

import { Button } from "@/components/ui/button"
import FormField from "@/components/common/FormField"
import ActionButton from "@/components/common/ActionButton"
import { Plus, Trash2, Edit3 } from "lucide-react"

interface ListItemEditorProps {
  title: string
  items: any[]
  fields: string[]
  onChange: (items: any[]) => void
  placeholder?: string
  gradientColor?: string
}

export default function ListItemEditor({
  title,
  items,
  fields,
  onChange,
  placeholder,
  gradientColor = "from-blue-500 to-indigo-500",
}: ListItemEditorProps) {
  const addItem = () => {
    const newItem: any = { id: Date.now().toString() }
    fields.forEach((field) => (newItem[field] = ""))
    onChange([...items, newItem])
  }

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {items.map((item: any, index: number) => (
        <div key={item.id} className="bg-slate-50 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              {title} {index + 1}
            </h4>
            <ActionButton
              icon={Trash2}
              onClick={() => removeItem(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <FormField
                key={field}
                label={field.replace(/([A-Z])/g, " $1").trim()}
                type={field === "description" ? "textarea" : field === "url" ? "url" : "text"}
                rows={3}
                value={item[field] || ""}
                onChange={(value) => updateItem(index, field, value)}
                placeholder={field === "description" ? placeholder : field === "url" ? "https://..." : undefined}
                className={field === "description" ? "md:col-span-2" : ""}
              />
            ))}
          </div>
        </div>
      ))}

      <Button onClick={addItem} className={`w-full bg-gradient-to-r ${gradientColor} hover:opacity-90 text-white`}>
        <Plus className="w-4 h-4 mr-2" />
        Add {title}
      </Button>
    </div>
  )
}
