"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "email" | "textarea" | "url"
  placeholder?: string
  rows?: number
  className?: string
}

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  rows = 3,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      {type === "textarea" ? (
        <Textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
          placeholder={placeholder}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
          placeholder={placeholder}
        />
      )}
    </div>
  )
}
