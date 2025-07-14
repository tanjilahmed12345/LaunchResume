"use client"

import FormField from "@/components/common/FormField"

interface SimpleTextEditorProps {
  content: any
  onChange: (content: any) => void
  placeholder: string
  fieldKey?: string
}

export default function SimpleTextEditor({ content, onChange, placeholder, fieldKey = "text" }: SimpleTextEditorProps) {
  const currentValue = content[fieldKey] || content.items || ""

  const handleChange = (value: string) => {
    if (fieldKey === "text") {
      onChange({ text: value })
    } else {
      onChange({ items: value })
    }
  }

  return (
    <FormField
      label="Content"
      type="textarea"
      rows={4}
      value={currentValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  )
}
