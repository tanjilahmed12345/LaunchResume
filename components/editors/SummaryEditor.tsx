"use client"

import FormField from "@/components/Common/FormField"

interface SummaryEditorProps {
  content: any
  onChange: (content: any) => void
}

export default function SummaryEditor({ content, onChange }: SummaryEditorProps) {
  return (
    <FormField
      label="Professional Summary"
      type="textarea"
      rows={4}
      value={content.text || ""}
      onChange={(value) => onChange({ text: value })}
      placeholder="Write a compelling 2-4 line summary highlighting your experience, strengths, and career goals..."
    />
  )
}
